// this is a script loader for ffu.js scripts.

// The ffu/ folder contains various scripts sourced from the userChrome JS community, or created by me
// The scripts have been optimized for FF Ultima, either in functionality or general cleanup (many lacked destroy logic to prevent memory leaks)
// The scripts also feature a @pref (moz-pref) entry in their headers, allowing them to be enabled/disabled via about:config or the UCC extension

// If you want a custom script, button, functionality added to FF Ultima. Simple create it like any other uc.js script.
// Give it the ffu.js file extension, and a @pref to toggle it on/off. Files in ffu/ can serve as examples.

(function () {
  const SUFFIX = /\.ffu\.js$/i;
  const entries = [];
  let currentCleanups = null;

  const isOn = pref => {
    try {
      return Services.prefs.getBoolPref(pref, false) === true;
    } catch {
      return false;
    }
  };

  // our scripts call ffuDisableScript?.(fn) at load time to register cleanups
  window.ffuDisableScript = fn => {
    if (currentCleanups && typeof fn === 'function') currentCleanups.push(fn);
  };

  // scripts like userChromeWatcher, can call this to ensure a clean rebuild
  window.ffuReloadScript = (filePath) => {
    const entry = entries.find((e) => e.file.path === filePath);
    if (!entry) return;
    unload(entry);
    load(entry);
    console.log(`[FF Ultima Loader] script reloaded, ${entry.file.leafName}`);
  };


  function scanDir(dir, subpath) {
    if (!dir.exists() || !dir.isDirectory()) return;
    const files = dir.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
    while (files.hasMoreElements()) {
      const file = files.getNext().QueryInterface(Ci.nsIFile);
      if (!SUFFIX.test(file.leafName)) continue;
      if (entries.some(e => e.file.leafName === file.leafName)) {
        console.warn(`[FF Ultima Loader][discovery] script skipped, duplicate ${file.leafName} in scripts/ and scripts/ffu/, skipping the second one`);
        continue;
      }
      const head = _uc.readFile(file, true);
      const pref = (head.match(/^\/\/\s*@pref\s+(\S+)\s*$/m) || [])[1];
      if (!pref) {
        console.warn(`[FF Ultima Loader][discovery] ${file.leafName} has no @pref header, skipped`);
        continue;
      }
      entries.push({file, pref, active: false, cleanups: [], subpath});
    }
  }

  function discovery() {
    const ucDir = _uc.chromedir.clone();
    ucDir.append('ffu');
    scanDir(_uc.chromedir.clone(), '');
    scanDir(ucDir, 'ffu/');
  }

  function load(e) {
    e.cleanups = [];
    currentCleanups = e.cleanups;
    try {
      // mtime so edits are picked up without new window/restart
      Services.scriptloader.loadSubScript(
        `resource://userchromejs/${e.subpath}${e.file.leafName}?${e.file.lastModifiedTime}`,
        window
      );
      e.active = true;
    } catch (ex) {
      console.error(`[FF Ultima Loader][load] script failed to load, ${e.file.leafName}`, ex);
      unload(e);
    } finally {
      currentCleanups = null;
    }
  }

  function unload(e) {
    while (e.cleanups.length) {
      try {
        e.cleanups.pop()();
      } catch (ex) {
        console.error(`[FF Ultima Loader][unload] script cleanup failed, ${e.file.leafName}`, ex);
      }
    }
    e.active = false;
  }

  function sync(e) {
    const on = isOn(e.pref);
    if (on && !e.active) load(e);
    else if (!on && e.active) unload(e);
  }

  discovery();

  const observer = {
    observe(_subject, topic, data) {
      if (topic === 'nsPref:changed') entries.filter(e => e.pref === data).forEach(sync);
    },
  };
  const prefs = [...new Set(entries.map(e => e.pref))];
  prefs.forEach(p => Services.prefs.addObserver(p, observer));
  entries.forEach(sync);

  window.addEventListener(
    'unload',
    () => prefs.forEach(p => Services.prefs.removeObserver(p, observer)),
    {once: true}
  );
})();