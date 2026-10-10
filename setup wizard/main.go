package main

import (
	"archive/zip"
	"bufio"
	"crypto/rand"
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"mime"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"runtime"
	"sort"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"
)

//go:embed src/index.html src/dist src/css src/assets
var uiFiles embed.FS

const (
	repoZip = "https://github.com/soulhotel/FF-Ultima/archive/refs/heads/main.zip"
	extID   = "userChromeCompanion@soulhotel.net"
	// AMO's API says where the current signed file is (and its checksum); the plain "latest" redirect is the fallback
	amoAPIURL    = "https://addons.mozilla.org/api/v5/addons/addon/userchrome-companion/"
	amoLatestURL = "https://addons.mozilla.org/firefox/downloads/latest/userchrome-companion/"
	amoPageURL   = "https://addons.mozilla.org/en-US/firefox/addon/userchrome-companion/"
	userAgent    = "ff-ultima-setup/1.0 (+https://github.com/soulhotel/FF-Ultima)"
)

type Step struct {
	ID    string `json:"id"`
	Label string `json:"label"`
	State string `json:"state"` // pending | running | done | error
	Msg   string `json:"msg"`
	Pct   int    `json:"pct"` // -1 = unknown
}

// one entry of profiles.ini, for the profile picker
type ProfileInfo struct {
	Name      string `json:"name"`
	Dir       string `json:"dir"`
	HasChrome bool   `json:"hasChrome"`
}

type State struct {
	ChromeDir   string `json:"chromeDir"`
	ChromeOK    bool   `json:"chromeOK"`
	ProfileName string `json:"profileName"`
	ProfileOK   bool   `json:"profileOK"`
	FirefoxDir  string `json:"firefoxDir"`
	FirefoxOK   bool   `json:"firefoxOK"`
	// from application.ini: a second opinion on what is installed there
	FirefoxName    string `json:"firefoxName"`
	FirefoxVersion string `json:"firefoxVersion"`
	FirefoxNote    string `json:"firefoxNote"`
	// the profile being targeted, and every profile in the same profiles.ini
	ProfileDir string        `json:"profileDir"`
	Profiles   []ProfileInfo `json:"profiles"`
	Steps       []Step `json:"steps"`
	Running     bool   `json:"running"`
}

var (
	mu              sync.Mutex
	steps           []Step
	running         bool
	firefoxOverride string
	chromeDir       string
	chromeOK        bool
	profileDir      string
	token           string
	exeInfo         fs.FileInfo
	profilesRoot    string // folder holding profiles.ini, kept so switching profiles keeps working
)

// ---------- detection ----------

func locate(flagChrome string) {
	exeDir := ""
	if exe, err := os.Executable(); err == nil {
		if r, err := filepath.EvalSymlinks(exe); err == nil {
			exe = r
		}
		exeInfo, _ = os.Stat(exe)
		exeDir = filepath.Dir(exe)
	}
	if flagChrome != "" {
		chromeDir, _ = filepath.Abs(flagChrome)
	} else {
		chromeDir = exeDir // the wizard lives directly in chrome/
	}
	chromeOK = chromeDir != "" && filepath.Base(chromeDir) == "chrome"
	if chromeOK {
		profileDir = filepath.Dir(chromeDir)
		detectProfilesRoot()
	}
}

func parseINI(p string) map[string]map[string]string {
	out := map[string]map[string]string{}
	f, err := os.Open(p)
	if err != nil {
		return out
	}
	defer f.Close()
	sec := ""
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		l := strings.TrimSpace(strings.TrimPrefix(sc.Text(), "\ufeff"))
		if l == "" || l[0] == ';' || l[0] == '#' {
			continue
		}
		if l[0] == '[' && strings.HasSuffix(l, "]") {
			sec = l[1 : len(l)-1]
			out[sec] = map[string]string{}
			continue
		}
		if k, v, ok := strings.Cut(l, "="); ok && out[sec] != nil {
			out[sec][strings.TrimSpace(k)] = strings.TrimSpace(v)
		}
	}
	return out
}

// profiles.ini sits one level above the profile on Linux, two on Windows/macOS
// profiles.ini is one level above the profile on Linux, two on Windows/macOS. Found once at startup.
func profilesRoots() []string {
	if profilesRoot != "" {
		return []string{profilesRoot}
	}
	return []string{filepath.Dir(profileDir), filepath.Dir(filepath.Dir(profileDir))}
}

func detectProfilesRoot() {
	base := filepath.Base(profileDir)
	for _, dir := range profilesRoots() {
		for sec, kv := range parseINI(filepath.Join(dir, "profiles.ini")) {
			if strings.HasPrefix(sec, "Profile") && filepath.Base(filepath.FromSlash(kv["Path"])) == base {
				profilesRoot = dir
				return
			}
		}
	}
}

// every profile in that profiles.ini
func listProfiles() []ProfileInfo {
	if profilesRoot == "" {
		return nil
	}
	var out []ProfileInfo
	for sec, kv := range parseINI(filepath.Join(profilesRoot, "profiles.ini")) {
		if !strings.HasPrefix(sec, "Profile") || kv["Path"] == "" {
			continue
		}
		dir := filepath.FromSlash(kv["Path"])
		if kv["IsRelative"] != "0" {
			dir = filepath.Join(profilesRoot, dir)
		}
		name := kv["Name"]
		if name == "" {
			name = filepath.Base(dir)
		}
		out = append(out, ProfileInfo{Name: name, Dir: dir, HasChrome: exists(filepath.Join(dir, "chrome"))})
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Name < out[j].Name })
	return out
}

// switch the target to another profile. Its chrome folder is created when the job starts.
func selectProfile(dir string) {
	mu.Lock()
	defer mu.Unlock()
	profileDir = dir
	chromeDir = filepath.Join(dir, "chrome")
	chromeOK = true
	firefoxOverride = "" // a manually set Firefox folder belonged to the previous profile
}

func findProfile() (string, bool) {
	base := filepath.Base(profileDir)
	for _, dir := range profilesRoots() {
		for sec, kv := range parseINI(filepath.Join(dir, "profiles.ini")) {
			if strings.HasPrefix(sec, "Profile") && filepath.Base(filepath.FromSlash(kv["Path"])) == base {
				if kv["Name"] != "" {
					return kv["Name"], true
				}
				return base, true
			}
		}
	}
	return base, false
}

func firefoxPath() (string, bool) {
	mu.Lock()
	d := firefoxOverride
	mu.Unlock()
	if d == "" && profileDir != "" {
		d = parseINI(filepath.Join(profileDir, "compatibility.ini"))["Compatibility"]["LastPlatformDir"]
	}
	if d == "" {
		return "", false
	}
	_, err := os.Stat(filepath.Join(d, "omni.ja"))
	return d, err == nil
}

// Firefox loads exactly one AutoConfig file (the general.config.filename pref). Some installs already use it
// (LibreWolf: librewolf.cfg), so our pointer has to win and our config.js has to carry their config as well.
//
// Default pref files are read in reverse alphabetical order and later reads override earlier ones, so the
// alphabetically first file wins: "config-prefs.js" beats "local-settings.js", and a copy named "0-config-prefs.js"
// beats a vendor pointer with any letter name (e.g. "autoconfig.js").
const (
	ourPointerFile = "defaults/pref/config-prefs.js" // inside userchromejs/firefox and inside the install
	ourPointerCopy = "defaults/pref/0-config-prefs.js"
	ourConfigFile  = "config.js"
)

var (
	cfgFilenameRe = regexp.MustCompile(`general\.config\.filename["']\s*,\s*["']([^"']+)["']`)
	cfgObscureRe  = regexp.MustCompile(`general\.config\.obscure_value["']\s*,\s*(\d+)`)
)

// another AutoConfig already set up in the install
type otherConfig struct {
	cfg   string // path of the config file its pointer names, e.g. .../librewolf.cfg
	plain bool   // readable as text (obscure_value 0); an obfuscated file can't be merged
}

func findOtherConfig(ffDir string) *otherConfig {
	files, _ := filepath.Glob(filepath.Join(ffDir, "defaults", "pref", "*.js")) // sorted by name
	for _, f := range files {
		if base := filepath.Base(f); base == "config-prefs.js" || base == "0-config-prefs.js" {
			continue // ours
		}
		data, err := os.ReadFile(f)
		if err != nil {
			continue
		}
		var code []string // commented-out prefs don't count
		for _, line := range strings.Split(string(data), "\n") {
			if !strings.HasPrefix(strings.TrimSpace(line), "//") {
				code = append(code, line)
			}
		}
		text := strings.Join(code, "\n")
		m := cfgFilenameRe.FindStringSubmatch(text)
		if m == nil || m[1] == ourConfigFile {
			continue
		}
		o := cfgObscureRe.FindStringSubmatch(text)
		return &otherConfig{cfg: filepath.Join(ffDir, filepath.FromSlash(m[1])), plain: o != nil && o[1] == "0"}
	}
	return nil
}

// Copies our Firefox-side files into a temp folder and, when the install already has an AutoConfig, adjusts them:
// a second copy of our pointer that sorts first, and a config.js that has the other config's text above ours.
// Re-running is safe: it always starts from the repo's files, never from the installed config.js.
func stageFirefoxFiles(src, ffDir string) (stage, note string, err error) {
	stage, err = os.MkdirTemp("", "ffu-firefox-*")
	if err != nil {
		return "", "", err
	}
	if err = copyTree(src, stage, nil); err != nil {
		os.RemoveAll(stage)
		return "", "", err
	}
	oc := findOtherConfig(ffDir)
	if oc == nil {
		return stage, "", nil
	}
	if err = copyFile(filepath.Join(stage, filepath.FromSlash(ourPointerFile)), filepath.Join(stage, filepath.FromSlash(ourPointerCopy))); err != nil {
		os.RemoveAll(stage)
		return "", "", err
	}
	if !oc.plain {
		return stage, filepath.Base(oc.cfg) + " is obfuscated, so it was not merged", nil
	}
	theirs, err := os.ReadFile(oc.cfg)
	if err != nil {
		return stage, "", nil // the named file isn't there: nothing to merge
	}
	ours, err := os.ReadFile(filepath.Join(stage, ourConfigFile))
	if err != nil {
		os.RemoveAll(stage)
		return "", "", err
	}
	merged := append(append(theirs, '\n'), ours...)
	if err = os.WriteFile(filepath.Join(stage, ourConfigFile), merged, 0o644); err != nil {
		os.RemoveAll(stage)
		return "", "", err
	}
	return stage, "merged " + filepath.Base(oc.cfg), nil
}

// application.ini (next to omni.ja) says what is really installed in a folder
type appInfo struct {
	Name, Display, Vendor, RemotingName, Version, BuildID, ID string
}

// the application ID shared by Firefox and its derivatives (release, Nightly, Developer Edition, LibreWolf...)
const firefoxAppID = "{ec8030f7-c20a-464f-9b0e-13a3a9e97384}"

func readAppInfo(dir string) (appInfo, bool) {
	app := parseINI(filepath.Join(dir, "application.ini"))["App"]
	if app == nil || app["Name"] == "" {
		return appInfo{}, false
	}
	a := appInfo{Name: app["Name"], Vendor: app["Vendor"], RemotingName: app["RemotingName"],
		Version: app["Version"], BuildID: app["BuildID"], ID: app["ID"]}
	a.Display = app["CodeName"] // the display name when the build has one, otherwise Name
	if a.Display == "" {
		a.Display = a.Name
	}
	return a, true
}

// Cross-checks the install folder against the profile. Nothing here blocks the wizard, it only informs:
// a version mismatch is normal when Firefox was updated since the profile last ran.
func describeFirefox(dir string) (name, version, note string) {
	app, ok := readAppInfo(dir)
	if !ok {
		return "", "", "Could not read application.ini in this folder, it was recognised by omni.ja only."
	}
	var notes []string
	if app.ID != "" && app.ID != firefoxAppID {
		notes = append(notes, app.Display+" does not use Firefox's application ID, double-check this is the right folder.")
	}
	if last := parseINI(filepath.Join(profileDir, "compatibility.ini"))["Compatibility"]["LastVersion"]; last != "" {
		lv, _, _ := strings.Cut(last, "/") // "131.0_20240926/20240926" -> "131.0_20240926"
		ver, build, _ := strings.Cut(lv, "_")
		if ver != "" && (ver != app.Version || (build != "" && app.BuildID != "" && build != app.BuildID)) {
			notes = append(notes, fmt.Sprintf("This profile last ran %s, the install in this folder is %s (normal if it was updated since).", ver, app.Version))
		}
	}
	return app.Display, app.Version, strings.Join(notes, " ")
}

// the browser's executable inside its install folder, using the names application.ini gives
func findBinary(dir string, app appInfo, suffix string) string {
	for _, n := range []string{strings.ToLower(app.Name), app.RemotingName, "firefox"} {
		if n == "" {
			continue
		}
		if p := filepath.Join(dir, n+suffix); exists(p) {
			return p
		}
	}
	return ""
}

func currentState() State {
	s := State{ChromeDir: chromeDir, ChromeOK: chromeOK}
	if chromeOK {
		s.ProfileName, s.ProfileOK = findProfile()
		s.ProfileDir, s.Profiles = profileDir, listProfiles()
		s.FirefoxDir, s.FirefoxOK = firefoxPath()
		if s.FirefoxOK {
			s.FirefoxName, s.FirefoxVersion, s.FirefoxNote = describeFirefox(s.FirefoxDir)
		}
	}
	mu.Lock()
	s.Steps = append([]Step(nil), steps...)
	s.Running = running
	mu.Unlock()
	return s
}

// ---------- steps ----------

func setStep(id, state, msg string, pct int) {
	mu.Lock()
	defer mu.Unlock()
	for i := range steps {
		if steps[i].ID == id {
			steps[i].State, steps[i].Msg, steps[i].Pct = state, msg, pct
		}
	}
}

type counter struct {
	total, n int64
	id       string
}

func (c *counter) Write(p []byte) (int, error) {
	c.n += int64(len(p))
	pct := -1
	if c.total > 0 {
		pct = int(c.n * 100 / c.total)
	}
	setStep(c.id, "running", "", pct)
	return len(p), nil
}

// Go's default User-Agent ("Go-http-client/1.1") is refused by some CDNs, so every request sends our own.
type uaTransport struct{ next http.RoundTripper }

func (t uaTransport) RoundTrip(r *http.Request) (*http.Response, error) {
	r = r.Clone(r.Context())
	r.Header.Set("User-Agent", userAgent)
	return t.next.RoundTrip(r)
}

var httpClient = &http.Client{Transport: uaTransport{http.DefaultTransport}}

// The current signed file of the companion according to AMO's API: its direct URL and sha256.
func companionFile() (fileURL, sum string, err error) {
	req, err := http.NewRequest("GET", amoAPIURL, nil)
	if err != nil {
		return "", "", err
	}
	req.Header.Set("Accept", "application/json")
	resp, err := httpClient.Do(req)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return "", "", fmt.Errorf("amo api: %s", resp.Status)
	}
	var body struct {
		CurrentVersion struct {
			File struct {
				URL  string `json:"url"`
				Hash string `json:"hash"` // "sha256:<hex>"
			} `json:"file"`
		} `json:"current_version"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		return "", "", err
	}
	f := body.CurrentVersion.File
	if f.URL == "" {
		return "", "", errors.New("amo api returned no file for the add-on")
	}
	return f.URL, strings.TrimPrefix(f.Hash, "sha256:"), nil
}

func sha256File(p string) (string, error) {
	f, err := os.Open(p)
	if err != nil {
		return "", err
	}
	defer f.Close()
	h := sha256.New()
	if _, err := io.Copy(h, f); err != nil {
		return "", err
	}
	return hex.EncodeToString(h.Sum(nil)), nil
}

func download(dst string) error { return downloadTo(repoZip, dst, "download") }

// true if the zip carries a Mozilla signature (META-INF/)
func isSignedXPI(p string) bool {
	zr, err := zip.OpenReader(p)
	if err != nil {
		return false
	}
	defer zr.Close()
	for _, f := range zr.File {
		if strings.HasPrefix(f.Name, "META-INF/") {
			return true
		}
	}
	return false
}

func downloadTo(url, dst, id string) error {
	if err := os.MkdirAll(filepath.Dir(dst), 0o755); err != nil {
		return err
	}
	resp, err := httpClient.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return fmt.Errorf("download failed: %s", resp.Status)
	}
	f, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer f.Close()
	_, err = io.Copy(f, io.TeeReader(resp.Body, &counter{total: resp.ContentLength, id: id}))
	return err
}

// extracts zip into dest, dropping the top-level "FF-Ultima-main/" folder
func unzip(zipPath, dest string) error {
	zr, err := zip.OpenReader(zipPath)
	if err != nil {
		return err
	}
	defer zr.Close()
	root := filepath.Clean(dest) + string(os.PathSeparator)
	for _, f := range zr.File {
		_, rel, ok := strings.Cut(f.Name, "/")
		if !ok || rel == "" {
			continue
		}
		target := filepath.Join(dest, filepath.FromSlash(rel))
		if !strings.HasPrefix(target, root) {
			return errors.New("unsafe path in zip: " + f.Name)
		}
		if f.FileInfo().IsDir() {
			if err := os.MkdirAll(target, 0o755); err != nil {
				return err
			}
			continue
		}
		if err := os.MkdirAll(filepath.Dir(target), 0o755); err != nil {
			return err
		}
		rc, err := f.Open()
		if err != nil {
			return err
		}
		out, err := os.OpenFile(target, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, f.Mode()|0o600)
		if err != nil {
			rc.Close()
			return err
		}
		_, err = io.Copy(out, rc)
		rc.Close()
		out.Close()
		if err != nil {
			return err
		}
	}
	return nil
}

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()
	fi, err := in.Stat()
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(dst), 0o755); err != nil {
		return err
	}
	out, err := os.OpenFile(dst, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, fi.Mode()|0o600)
	if err != nil {
		return err
	}
	defer out.Close()
	_, err = io.Copy(out, in)
	return err
}

// copy + overwrite; never overwrites the running wizard binary
func copyTree(src, dst string, skip func(rel string) bool) error {
	return filepath.WalkDir(src, func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		rel, _ := filepath.Rel(src, p)
		if rel == "." {
			return os.MkdirAll(dst, 0o755)
		}
		if skip != nil && skip(rel) {
			if d.IsDir() {
				return filepath.SkipDir
			}
			return nil
		}
		t := filepath.Join(dst, rel)
		if d.IsDir() {
			return os.MkdirAll(t, 0o755)
		}
		if fi, err := os.Stat(t); err == nil && exeInfo != nil && os.SameFile(fi, exeInfo) {
			return nil
		}
		return copyFile(p, t)
	})
}

func friendly(err error, where string) error {
	if errors.Is(err, fs.ErrPermission) {
		return fmt.Errorf("permission denied writing to %s. Run the wizard with admin rights, or copy the files manually", where)
	}
	return err
}

// relaunches this binary with admin rights to run one tree operation (--copy-tree or --remove-list) on the Firefox dir
func elevatedTree(op, src, dst string) error {
	exe, err := os.Executable()
	if err != nil {
		return err
	}
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		q := func(s string) string { return "'" + strings.ReplaceAll(s, "'", "''") + "'" }
		ps := fmt.Sprintf("$p=Start-Process -FilePath %s -ArgumentList %s,%s,%s -Verb RunAs -Wait -PassThru -WindowStyle Hidden; exit $p.ExitCode",
			q(exe), q(op), q(`"`+src+`"`), q(`"`+dst+`"`))
		cmd = exec.Command("powershell", "-NoProfile", "-Command", ps)
	case "darwin":
		sq := func(s string) string { return "'" + strings.ReplaceAll(s, "'", `'\''`) + "'" }
		sh := strings.Join([]string{sq(exe), op, sq(src), sq(dst)}, " ")
		sh = strings.ReplaceAll(strings.ReplaceAll(sh, `\`, `\\`), `"`, `\"`)
		cmd = exec.Command("osascript", "-e", `do shell script "`+sh+`" with administrator privileges`)
	default:
		cmd = exec.Command("pkexec", exe, op, src, dst)
	}
	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("administrator action failed or was cancelled: %s", strings.TrimSpace(string(out)))
	}
	return nil
}

// ---------- uninstall: the repo's file list comes from one GitHub tree API request, nothing is downloaded ----------

const repoTreeURL = "https://api.github.com/repos/soulhotel/FF-Ultima/git/trees/main?recursive=1"

// one file or folder of the repo: path relative to the repo root, forward slashes
type item struct {
	rel string
	dir bool
}

func fetchRepoTree() ([]item, error) {
	req, err := http.NewRequest("GET", repoTreeURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("User-Agent", "ff-ultima-setup")
	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("github api: %s", resp.Status)
	}
	var body struct {
		Tree []struct {
			Path string `json:"path"`
			Type string `json:"type"` // blob = file, tree = folder
		} `json:"tree"`
		Truncated bool `json:"truncated"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		return nil, err
	}
	if body.Truncated {
		return nil, errors.New("github api: repo tree is too large for a single request")
	}
	var items []item
	for _, e := range body.Tree {
		if e.Type == "blob" || e.Type == "tree" {
			items = append(items, item{rel: e.Path, dir: e.Type == "tree"})
		}
	}
	return items, nil
}

// Removes from dst every listed file that exists there (content is ignored), then the listed folders
// that are now empty. Anything that is not on the list is left alone.
func removeListed(items []item, dst string) error {
	var dirs []string
	for _, it := range items {
		for _, part := range strings.Split(it.rel, "/") {
			if part == ".." {
				return errors.New("refusing unsafe path: " + it.rel)
			}
		}
		rel := filepath.FromSlash(it.rel)
		if filepath.IsAbs(rel) {
			return errors.New("refusing unsafe path: " + it.rel)
		}
		t := filepath.Join(dst, rel)
		if it.dir {
			dirs = append(dirs, t)
			continue
		}
		fi, err := os.Lstat(t)
		if err != nil || fi.IsDir() {
			continue // not there (or not a file): nothing to remove
		}
		if exeInfo != nil && os.SameFile(fi, exeInfo) {
			continue // never delete the running wizard
		}
		if err := os.Remove(t); err != nil {
			return err
		}
	}
	sort.Slice(dirs, func(a, b int) bool { return len(dirs[a]) > len(dirs[b]) }) // deepest first
	for _, d := range dirs {
		os.Remove(d) // only succeeds when the folder is empty
	}
	return nil
}

// list file for the elevated helper: "f<TAB>path" for a file, "d<TAB>path" for a folder, one per line
func removeElevated(items []item, dst string) error {
	f, err := os.CreateTemp("", "ffu-remove-*.txt")
	if err != nil {
		return err
	}
	defer os.Remove(f.Name())
	for _, it := range items {
		kind := "f"
		if it.dir {
			kind = "d"
		}
		fmt.Fprintf(f, "%s\t%s\n", kind, it.rel)
	}
	f.Close()
	return elevatedTree("--remove-list", f.Name(), dst)
}

func removeFromList(listPath, dst string) error {
	data, err := os.ReadFile(listPath)
	if err != nil {
		return err
	}
	var items []item
	for _, line := range strings.Split(string(data), "\n") {
		if kind, rel, ok := strings.Cut(line, "\t"); ok {
			items = append(items, item{rel: rel, dir: kind == "d"})
		}
	}
	return removeListed(items, dst)
}

func uninstallSteps() []Step {
	return []Step{
		{ID: "list", Label: "Reading FF Ultima file list", State: "pending", Pct: -1},
		{ID: "ucjs", Label: "Removing userChromeJS", State: "pending", Pct: -1},
		{ID: "files", Label: "Removing FF Ultima files", State: "pending", Pct: -1},
	}
}

// Where the repo keeps the files that go into the Firefox install (config.js, defaults/). Forward slashes.
const firefoxFilesDir = "userchromejs/firefox"

// on disk (install): that folder under root
func findFirefoxFiles(root string) (string, bool) {
	p := filepath.Join(root, filepath.FromSlash(firefoxFilesDir))
	fi, err := os.Stat(p)
	return p, err == nil && fi.IsDir()
}

// in the repo listing (uninstall): the files in that folder, relative to it
func firefoxItems(items []item) ([]item, bool) {
	var out []item
	for _, it := range items {
		if rel, ok := strings.CutPrefix(it.rel, firefoxFilesDir+"/"); ok {
			out = append(out, item{rel: rel, dir: it.dir})
		}
	}
	return out, len(out) > 0
}

func runUninstall() {
	defer func() { mu.Lock(); running = false; mu.Unlock() }()

	setStep("list", "running", "", -1)
	items, err := fetchRepoTree()
	if err != nil {
		setStep("list", "error", err.Error(), 0)
		return
	}
	setStep("list", "done", "", 100)

	// Firefox install first: it is the step that can need admin approval, so cancelling leaves everything intact
	setStep("ucjs", "running", "", -1)
	ff, ok := firefoxPath()
	if !ok {
		setStep("ucjs", "error", "Firefox location not found, set it manually and try again", 0)
		return
	}
	ffItems, found := firefoxItems(items)
	if !found {
		setStep("ucjs", "error", "userChromeJS files not found in the repo", 0)
		return
	}
	ffItems = append(ffItems, item{rel: ourPointerCopy}) // only exists where another AutoConfig was found
	err = removeListed(ffItems, ff)
	if errors.Is(err, fs.ErrPermission) {
		setStep("ucjs", "running", "Waiting for administrator approval...", -1)
		err = removeElevated(ffItems, ff)
	}
	if err != nil {
		setStep("ucjs", "error", err.Error(), 0)
		return
	}
	setStep("ucjs", "done", "", 100)

	setStep("files", "running", "", -1)
	skip := func(rel string) bool {
		top, _, nested := strings.Cut(rel, "/")
		if !nested && strings.HasPrefix(strings.ToUpper(top), "LICENSE") {
			return true
		}
		switch top {
		case "dev", "setup wizard", ".github": // never installed by us (or can't tell who owns it)
			return true
		}
		return false
	}
	var mine []item
	for _, it := range items {
		if !skip(it.rel) {
			mine = append(mine, it)
		}
	}
	if err := removeListed(mine, chromeDir); err != nil {
		setStep("files", "error", friendly(err, chromeDir).Error(), 0)
		return
	}
	setStep("files", "done", "", 100)
}

func exists(p string) bool { _, err := os.Stat(p); return err == nil }

// user.js is read by Firefox at every startup and never rewritten by it. Install adds this block so the first launch
// after the install already loads userChrome.css (flipping the pref at runtime only takes effect on the next start).
// The block is removed again by ffu-userjs-cleanup.uc.js once Firefox is up.
const (
	userJSBegin = "// FF Ultima"
	userJSEnd   = "// End - FF Ultima"
)

var stylesheetPrefRe = regexp.MustCompile(`user_pref\(\s*["']toolkit\.legacyUserProfileCustomizations\.stylesheets["']\s*,\s*(true|false)\s*\)`)

// the last value a file assigns to the pref ("" when it never does), ignoring commented-out lines
func lastStylesheetValue(text string) string {
	var code []string
	for _, line := range strings.Split(text, "\n") {
		if !strings.HasPrefix(strings.TrimSpace(line), "//") {
			code = append(code, line)
		}
	}
	all := stylesheetPrefRe.FindAllStringSubmatch(strings.Join(code, "\n"), -1)
	if len(all) == 0 {
		return ""
	}
	return all[len(all)-1][1]
}

// Adds the user.js block unless the pref is already going to be true at startup. alreadyOn reports that case.
func addStylesheetPref(profile string) (alreadyOn bool, err error) {
	userPath := filepath.Join(profile, "user.js")
	userData, readErr := os.ReadFile(userPath)
	if readErr != nil && !errors.Is(readErr, fs.ErrNotExist) {
		return false, readErr
	}
	userText := string(userData)
	if strings.Contains(userText, userJSBegin) && strings.Contains(userText, userJSEnd) {
		return true, nil // our block is already there
	}

	// effective value at startup: prefs.js first, then user.js on top of it
	on := false
	if prefs, e := os.ReadFile(filepath.Join(profile, "prefs.js")); e == nil {
		on = lastStylesheetValue(string(prefs)) == "true"
	}
	if v := lastStylesheetValue(userText); v != "" {
		on = v == "true"
	}
	if on {
		return true, nil
	}

	if userText != "" && !strings.HasSuffix(userText, "\n") {
		userText += "\n"
	}
	block := "\n" + userJSBegin + "\n" +
		`user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);` + "\n" +
		userJSEnd + "\n\n"
	return false, os.WriteFile(userPath, []byte(userText+block), 0o644)
}

func newSteps(full bool) []Step {
	copyLabel := "Installing FF Ultima files"
	if !full {
		copyLabel = "Updating FF Ultima files"
	}
	st := []Step{
		{ID: "download", Label: "Downloading FF Ultima", State: "pending", Pct: -1},
		{ID: "copy", Label: copyLabel, State: "pending", Pct: -1},
	}
	if full {
		st = append(st,
			Step{ID: "companion", Label: "Installing userChrome Companion", State: "pending", Pct: -1},
			Step{ID: "ucjs", Label: "Setting up userChromeJS", State: "pending", Pct: -1},
		)
	}
	return st
}

// full: install (theme files + companion + userChromeJS). !full: update (theme files only).
// Downloads the signed companion from AMO into <profile>/extensions/. A failure here never stops the install.
func installCompanion(tmp string) (note string, err error) {
	extDir := filepath.Join(profileDir, "extensions")
	dst := filepath.Join(extDir, extID+".xpi")
	reg, _ := os.ReadFile(filepath.Join(profileDir, "extensions.json"))
	if exists(dst) || exists(filepath.Join(extDir, extID)) || strings.Contains(string(reg), extID) {
		return "already installed", nil
	}
	xpiURL, wantSum, apiErr := companionFile()
	if apiErr != nil {
		xpiURL, wantSum = amoLatestURL, "" // API unreachable: fall back to the redirect URL
	}
	xpi := filepath.Join(tmp, "companion.xpi")
	if err := downloadTo(xpiURL, xpi, "companion"); err != nil {
		return "", err
	}
	if wantSum != "" {
		if got, err := sha256File(xpi); err != nil || !strings.EqualFold(got, wantSum) {
			return "", errors.New("the downloaded file does not match the checksum AMO gave")
		}
	}
	if !isSignedXPI(xpi) {
		return "", errors.New("downloaded file is not a signed add-on")
	}
	if err := os.MkdirAll(extDir, 0o755); err != nil {
		return "", err
	}
	return "", copyFile(xpi, dst)
}

func runJob(full bool) {
	defer func() { mu.Lock(); running = false; mu.Unlock() }()
	tmp := filepath.Join(chromeDir, "tmp")
	os.RemoveAll(tmp)
	defer os.RemoveAll(tmp)
	src := filepath.Join(tmp, "src")

	setStep("download", "running", "", -1)
	if err := os.MkdirAll(chromeDir, 0o755); err != nil { // a profile that has no chrome folder yet gets one
		setStep("download", "error", friendly(err, chromeDir).Error(), 0)
		return
	}
	if err := download(filepath.Join(tmp, "ff-ultima.zip")); err != nil {
		setStep("download", "error", err.Error(), 0)
		return
	}
	if err := unzip(filepath.Join(tmp, "ff-ultima.zip"), src); err != nil {
		setStep("download", "error", err.Error(), 0)
		return
	}
	setStep("download", "done", "", 100)

	setStep("copy", "running", "", -1)
	skip := func(rel string) bool {
		top := strings.Split(rel, string(os.PathSeparator))[0]
		if top == rel && strings.HasPrefix(strings.ToUpper(top), "LICENSE") {
			return true
		}
		switch top {
		case "dev", "setup wizard": // repo-only folders, never copied
			return true
		case ".github": // install keeps an existing one, update never touches it
			return !full || exists(filepath.Join(chromeDir, ".github"))
		}
		return false
	}
	if err := copyTree(src, chromeDir, skip); err != nil {
		setStep("copy", "error", friendly(err, chromeDir).Error(), 0)
		return
	}
	copyNote := ""
	if full { // installs only, an update never touches user.js
		switch on, err := addStylesheetPref(profileDir); {
		case err != nil:
			copyNote = "could not write user.js, userChrome.css may need a second restart"
		case on:
			copyNote = "stylesheets already enabled"
		default:
			copyNote = "stylesheets enabled in user.js"
		}
	}
	setStep("copy", "done", copyNote, 100)
	if !full {
		return
	}

	setStep("companion", "running", "", -1)
	if note, err := installCompanion(tmp); err != nil {
		// not fatal: nothing after this depends on it, so the install carries on
		fmt.Println("companion install failed:", err)
		setStep("companion", "warn", "failed to install, you can still install the extension straight from the [Firefox Add On Store]("+amoPageURL+")", 0)
	} else {
		setStep("companion", "done", note, 100)
	}

	setStep("ucjs", "running", "", -1)
	ff, ok := firefoxPath()
	if !ok {
		setStep("ucjs", "error", "Firefox location not found, set it manually and try again", 0)
		return
	}
	ffSrc, found := findFirefoxFiles(chromeDir)
	if !found {
		setStep("ucjs", "error", "userChromeJS files not found in the chrome folder", 0)
		return
	}
	stage, note, err := stageFirefoxFiles(ffSrc, ff)
	if err != nil {
		setStep("ucjs", "error", err.Error(), 0)
		return
	}
	defer os.RemoveAll(stage)
	err = copyTree(stage, ff, nil)
	if errors.Is(err, fs.ErrPermission) {
		setStep("ucjs", "running", "Waiting for administrator approval...", -1)
		err = elevatedTree("--copy-tree", stage, ff)
	}
	if err != nil {
		setStep("ucjs", "error", err.Error(), 0)
		return
	}
	setStep("ucjs", "done", note, 100)
}

// ---------- http ----------

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(v)
}

func guard(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("X-Token") != token {
			writeJSON(w, 403, map[string]string{"error": "forbidden"})
			return
		}
		h(w, r)
	}
}

// waits for the profile to be released after a quit request
func waitForExit() {
	if runtime.GOOS == "linux" {
		for i := 0; i < 30; i++ { // up to ~15s for the profile lock to clear
			if _, err := os.Lstat(filepath.Join(profileDir, "lock")); err != nil {
				break
			}
			time.Sleep(500 * time.Millisecond)
		}
		time.Sleep(500 * time.Millisecond)
		return
	}
	time.Sleep(4 * time.Second)
}

// same as about:support "Clear startup cache", done while Firefox is closed so it isn't rewritten on quit
func clearStartupCache() {
	dirs := []string{filepath.Join(profileDir, "startupCache")}
	if base, err := os.UserCacheDir(); err == nil {
		name := filepath.Base(profileDir)
		switch runtime.GOOS {
		case "windows":
			dirs = append(dirs, filepath.Join(base, "Mozilla", "Firefox", "Profiles", name, "startupCache"))
		case "darwin":
			dirs = append(dirs, filepath.Join(base, "Firefox", "Profiles", name, "startupCache"))
		default:
			dirs = append(dirs, filepath.Join(base, "mozilla", "firefox", name, "startupCache"))
		}
	}
	for _, d := range dirs {
		os.RemoveAll(d)
	}
}

// Linux: the pid of the Firefox that has this profile open. Firefox keeps a "lock" symlink in the
// profile that points at "<ip>:+<pid>", so only the instance using this profile is ever touched.
func profilePID() (int, bool) {
	target, err := os.Readlink(filepath.Join(profileDir, "lock"))
	if err != nil {
		return 0, false
	}
	_, pidStr, ok := strings.Cut(target, "+")
	if !ok {
		return 0, false
	}
	pid, err := strconv.Atoi(pidStr)
	return pid, err == nil && pid > 0
}

// Quits only the Firefox this wizard is pointed at (never other editions or other profiles on Linux),
// waits for it to exit, clears the startup cache and relaunches the profile with the same install.
func restartFirefox() {
	ff, _ := firefoxPath()
	app, _ := readAppInfo(ff)
	var start *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		exe := findBinary(ff, app, ".exe")
		if exe == "" {
			exe = filepath.Join(ff, "firefox.exe")
		}
		// close only processes that run from the target install (Nightly, Developer Edition... are left alone)
		ps := fmt.Sprintf("Get-Process '%s' -ErrorAction SilentlyContinue | Where-Object { $_.Path -eq '%s' } | ForEach-Object { taskkill /PID $_.Id | Out-Null }",
			strings.ReplaceAll(strings.TrimSuffix(filepath.Base(exe), ".exe"), "'", "''"), strings.ReplaceAll(exe, "'", "''"))
		exec.Command("powershell", "-NoProfile", "-Command", ps).Run()
		start = exec.Command(exe, "-profile", profileDir)
	case "darwin":
		app := filepath.Dir(filepath.Dir(ff)) // .../Firefox Nightly.app
		name := strings.TrimSuffix(filepath.Base(app), ".app")
		exec.Command("osascript", "-e", `quit app "`+name+`"`).Run()
		start = exec.Command("open", "-a", app, "--args", "-profile", profileDir)
	default:
		if pid, ok := profilePID(); ok {
			if proc, err := os.FindProcess(pid); err == nil {
				proc.Signal(syscall.SIGTERM)
			}
		}
		bin := findBinary(ff, app, "") // the target install's own binary, not whichever firefox is first on PATH
		if bin == "" {
			if p, err := exec.LookPath("firefox"); err == nil {
				bin = p
			}
		}
		start = exec.Command(bin, "-profile", profileDir)
	}
	waitForExit()
	clearStartupCache()
	start.Start()
}

// the UI is src/ next to the binary (binary in "setup wizard/"), or setup wizard/src (binary in the repo root / chrome/)
func findUIDir() string {
	exe, _ := os.Executable()
	if r, err := filepath.EvalSymlinks(exe); err == nil {
		exe = r
	}
	dir := filepath.Dir(exe)
	for _, d := range []string{
		filepath.Join(dir, "src"),
		filepath.Join(dir, "setup wizard", "src"),
		filepath.Join("setup wizard", "src"),
		"src",
	} {
		if exists(filepath.Join(d, "index.html")) {
			return d
		}
	}
	return filepath.Join(dir, "src")
}

func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	cmd.Start()
}

func main() {
	// elevated helper mode: only ever copies into a real Firefox directory
	if len(os.Args) == 4 && (os.Args[1] == "--copy-tree" || os.Args[1] == "--remove-list") {
		if !exists(filepath.Join(os.Args[3], "omni.ja")) {
			fmt.Fprintln(os.Stderr, "refusing: destination is not a Firefox directory")
			os.Exit(1)
		}
		var err error
		if os.Args[1] == "--copy-tree" {
			err = copyTree(os.Args[2], os.Args[3], nil)
		} else {
			err = removeFromList(os.Args[2], os.Args[3])
		}
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			os.Exit(1)
		}
		os.Exit(0)
	}

	// Windows can map .js to text/plain via the registry, which breaks <script type="module">
	mime.AddExtensionType(".js", "text/javascript")
	mime.AddExtensionType(".css", "text/css")

	flagChrome := flag.String("chrome", "", "chrome folder (dev override)")
	flagDry := flag.Bool("dry-run", false, "preview the UI with fake data, nothing is touched")
	flagDev := flag.Bool("dev", false, "serve the UI from src/ on disk instead of the copy embedded in the binary")
	flag.Parse()
	locate(*flagChrome)

	b := make([]byte, 16)
	rand.Read(b)
	token = hex.EncodeToString(b)

	var ui http.FileSystem
	if *flagDev {
		dir := findUIDir()
		fmt.Println("serving UI from disk:", dir)
		ui = http.Dir(dir)
	} else {
		sub, err := fs.Sub(uiFiles, "src")
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		ui = http.FS(sub)
	}

	mux := http.NewServeMux()
	files := http.FileServer(ui)
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		files.ServeHTTP(w, r)
	})
	mux.HandleFunc("/api/state", guard(func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, 200, currentState())
	}))
	mux.HandleFunc("/api/profile", guard(func(w http.ResponseWriter, r *http.Request) {
		var body struct{ Dir string }
		json.NewDecoder(r.Body).Decode(&body)
		mu.Lock()
		busy := running
		mu.Unlock()
		if busy {
			writeJSON(w, 409, map[string]string{"error": "wait for the current job to finish"})
			return
		}
		for _, p := range listProfiles() {
			if p.Dir == body.Dir { // only profiles listed in profiles.ini can be picked
				selectProfile(p.Dir)
				writeJSON(w, 200, map[string]bool{"ok": true})
				return
			}
		}
		writeJSON(w, 400, map[string]string{"error": "unknown profile"})
	}))
	mux.HandleFunc("/api/firefox", guard(func(w http.ResponseWriter, r *http.Request) {
		var body struct{ Path string }
		json.NewDecoder(r.Body).Decode(&body)
		p := strings.TrimSpace(body.Path)
		if !exists(filepath.Join(p, "omni.ja")) {
			writeJSON(w, 400, map[string]string{"error": "omni.ja not found in that folder"})
			return
		}
		mu.Lock()
		firefoxOverride = p
		mu.Unlock()
		writeJSON(w, 200, map[string]bool{"ok": true})
	}))
	startJob := func(needFirefox bool, newSteps func() []Step, run func()) http.HandlerFunc {
		return guard(func(w http.ResponseWriter, r *http.Request) {
			st := currentState()
			if !st.ChromeOK || !st.ProfileOK || (needFirefox && !st.FirefoxOK) {
				writeJSON(w, 400, map[string]string{"error": "checks have not passed"})
				return
			}
			mu.Lock()
			if running {
				mu.Unlock()
				writeJSON(w, 409, map[string]string{"error": "already running"})
				return
			}
			running = true
			steps = newSteps()
			mu.Unlock()
			go run()
			writeJSON(w, 200, map[string]bool{"ok": true})
		})
	}
	mux.HandleFunc("/api/install", startJob(true, func() []Step { return newSteps(true) }, func() { runJob(true) }))
	mux.HandleFunc("/api/update", startJob(false, func() []Step { return newSteps(false) }, func() { runJob(false) }))
	mux.HandleFunc("/api/uninstall", startJob(true, uninstallSteps, runUninstall))
	mux.HandleFunc("/api/restart", guard(func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, 200, map[string]bool{"ok": true})
		go func() { time.Sleep(300 * time.Millisecond); restartFirefox(); os.Exit(0) }()
	}))
	mux.HandleFunc("/api/quit", guard(func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, 200, map[string]bool{"ok": true})
		go func() { time.Sleep(300 * time.Millisecond); os.Exit(0) }()
	}))

	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	url := fmt.Sprintf("http://%s/?t=%s", ln.Addr(), token)
	if *flagDry {
		url += "&dry=1"
	}
	fmt.Println("FF Ultima Setup Wizard:", url)
	go openBrowser(url)
	http.Serve(ln, mux)
}