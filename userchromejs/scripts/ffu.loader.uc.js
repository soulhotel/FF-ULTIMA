// This is a script loader for ffu.js scripts found in the ffu/ folder. Refer to ffu/readme.md for more info.

(function () {
  const scriptsDir = UC_API.FileSystem.getScriptDir().entry();
  const readHead = file => UC_API.FileSystem.readFileSync(file, {metaOnly: true}).content();

  const SUFFIX = /\.ffu\.js$/i;
  const entries = [];
  const observed = new Set();
  let currentCleanups = null;

  const isOn = pref => {
    try {
      return Services.prefs.getBoolPref(pref, false) === true;
    } catch {
      return false;
    }
  };

  const readPref = file => {
    const head = readHead(file);
    return (head.match(/^\/\/\s*@pref\s+(\S+)\s*$/m) || [])[1];
  };

  const observer = {
    observe(_subject, topic, data) {
      if (topic === 'nsPref:changed') entries.filter(e => e.pref === data).forEach(sync);
    },
  };

  function observePref(pref) {
    if (observed.has(pref)) return;
    Services.prefs.addObserver(pref, observer);
    observed.add(pref);
  }

  // dropped if script deleted or maybe editted with a @pref change
  function pruneObservers() {
    for (const pref of [...observed]) {
      if (entries.some(e => e.pref === pref)) continue;
      try { Services.prefs.removeObserver(pref, observer); } catch {}
      observed.delete(pref);
    }
  }

  // our scripts call ffuDisableScript?.(fn) at load time to register cleanups
  window.ffuDisableScript = fn => {
    if (currentCleanups && typeof fn === 'function') currentCleanups.push(fn);
  };

  function subpathFor(file) {
    const dir = file.parent;
    if (!dir) return null;
    if (dir.equals(scriptsDir)) return '';
    const ffuDir = scriptsDir.clone();
    ffuDir.append('ffu');
    return dir.equals(ffuDir) ? 'ffu/' : null;
  }

  // validate/register as an entry, dont load
  function addEntry(file, subpath) {
    if (entries.some(e => e.file.equals(file))) return null;
    if (entries.some(e => e.file.leafName === file.leafName)) {
      console.warn(`[FF Ultima Loader][discovery] script skipped, duplicate ${file.leafName} in scripts/ and scripts/ffu/, skipping the second one`);
      return null;
    }
    let pref;
    try {
      pref = readPref(file);
    } catch (ex) {
      console.error(`[FF Ultima Loader][discovery] could not read ${file.leafName}`, ex);
      return null;
    }
    if (!pref) {
      console.warn(`[FF Ultima Loader][discovery] ${file.leafName} has no @pref header, skipped`);
      return null;
    }
    const entry = {file, pref, active: false, cleanups: [], subpath};
    entries.push(entry);
    return entry;
  }

  function removeEntry(entry) {
    unload(entry);
    const i = entries.indexOf(entry);
    if (i !== -1) entries.splice(i, 1);
    pruneObservers();
  }

  // scripts like userChromeWatcher call this with an absolute path whenever a change is discovered.
  window.ffuReloadScript = filePath => {
    let file;
    try {
      file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile);
      file.initWithPath(filePath);
    } catch (ex) {
      console.warn(`[FF Ultima Loader] invalid path passed to ffuReloadScript, ${filePath}`);
      return;
    }
    const entry = entries.find(e => e.file.equals(file));
    // script deleted?
    if (!file.exists()) {
      if (!entry) return;
      removeEntry(entry);
      console.log(`[FF Ultima Loader] script removed, ${file.leafName}`);
      return;
    }
    // new script?
    if (!entry) {
      if (!SUFFIX.test(file.leafName)) return;
      const subpath = subpathFor(file);
      if (subpath === null) {
        console.warn(`[FF Ultima Loader][discovery] ${file.leafName} is outside scripts/ and scripts/ffu/, ignored`);
        return;
      }
      const added = addEntry(file, subpath);
      if (!added) return;
      observePref(added.pref);
      sync(added);
      console.log(`[FF Ultima Loader] script discovered, ${file.leafName}`);
      return;
    }
    // edited? unload, re-register
    unload(entry);
    let pref;
    try { pref = readPref(entry.file); } catch {}
    if (!pref) {
      console.warn(`[FF Ultima Loader] ${entry.file.leafName} lost its @pref header, removed`);
      removeEntry(entry);
      return;
    }
    if (pref !== entry.pref) {
      entry.pref = pref;
      observePref(pref);
      pruneObservers();
    }
    sync(entry);
    console.log(`[FF Ultima Loader] script reloaded, ${entry.file.leafName}`);
  };

  function scanDir(dir, subpath) {
    if (!dir.exists() || !dir.isDirectory()) return;
    const files = dir.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
    while (files.hasMoreElements()) {
      const file = files.getNext().QueryInterface(Ci.nsIFile);
      if (!SUFFIX.test(file.leafName)) continue;
      addEntry(file, subpath);
    }
  }

  function discovery() {
    const ucDir = scriptsDir.clone();
    ucDir.append('ffu');
    scanDir(scriptsDir.clone(), '');
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
  entries.forEach(e => observePref(e.pref));
  entries.forEach(sync);

  window.addEventListener(
    'unload',
    () => {
      for (const p of observed) {
        try { Services.prefs.removeObserver(p, observer); } catch {}
      }
      observed.clear();
    },
    {once: true}
  );
})();