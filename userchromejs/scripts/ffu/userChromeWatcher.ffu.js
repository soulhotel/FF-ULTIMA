// ==UserScript==
// @name            userChrome live reload / watcher
// @description     Watch the chrome folder for .css and .ffu.js changes -> reload them live
// @include         main
// @pref            ffu.chrome.watcher
// ==/UserScript==

(function () {
  const POLL_MS = 1000;
  const NATIVE_PREF = 'toolkit.legacyUserProfileCustomizations.stylesheets';

  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  const chromeDir = Services.dirsvc.get('UChrm', Ci.nsIFile);

  // userChrome.css -> this window's own document only (windowUtils is per-window, can't reach web pages)
  // userContent.css -> sheet service (global), the only live path into web content
  const CHROME_TYPE = Ci.nsIDOMWindowUtils.AGENT_SHEET;
  const CONTENT_TYPE = sss.USER_SHEET;

  const chromeFile = chromeDir.clone();
  chromeFile.append('userChrome.css');
  const contentFile = chromeDir.clone();
  contentFile.append('userContent.css');

  // while the watcher is on it is the only loader, Firefox's native loader must stay off
  try {
    if (Services.prefs.getBoolPref(NATIVE_PREF, false)) {
      Services.prefs.setBoolPref(NATIVE_PREF, false);
      console.warn('[chromeWatcher] native userChrome loading was on and is now off. Restart Firefox once, otherwise the sheets stay doubled this session.');
    }
  } catch (ex) {
    console.error('[chromeWatcher] could not turn off native userChrome loading', ex);
  }

  function reloadChromeSheet() {
    const uri = Services.io.newFileURI(chromeFile);
    try { window.windowUtils.removeSheet(uri, CHROME_TYPE); } catch (e) {}
    if (!chromeFile.exists()) return;
    try {
      window.windowUtils.loadSheet(uri, CHROME_TYPE);
    } catch (ex) {
      console.error('[chromeWatcher] failed to load userChrome.css', ex);
    }
  }

  function reloadContentSheet() {
    const uri = Services.io.newFileURI(contentFile);
    try {
      // every window runs this script, so clear any copy before adding ours
      for (let i = 0; i < 10 && sss.sheetRegistered(uri, CONTENT_TYPE); i++) {
        sss.unregisterSheet(uri, CONTENT_TYPE);
      }
    } catch (e) {}
    if (!contentFile.exists()) return;
    try {
      sss.loadAndRegisterSheet(uri, CONTENT_TYPE);
    } catch (ex) {
      console.error('[chromeWatcher] failed to load userContent.css', ex);
    }
  }

  function reloadCss() {
    console.log('[chromeWatcher] css change detected, reloading userChrome.css / userContent.css');
    reloadChromeSheet();
    reloadContentSheet();
  }

  function walk(dir, out, pattern) {
    let entries;
    try {
      entries = dir.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
    } catch (e) {
      return;
    }
    while (entries.hasMoreElements()) {
      const entry = entries.getNext().QueryInterface(Ci.nsIFile);
      if (entry.isDirectory()) {
        walk(entry, out, pattern);
      } else if (pattern.test(entry.leafName)) {
        out.set(entry.path, entry.lastModifiedTime);
      }
    }
  }

  function takeSnapshot(pattern) {
    const out = new Map();
    walk(chromeDir, out, pattern);
    return out;
  }

  function diffPaths(a, b) {
    const changed = [];
    for (const path of new Set([...a.keys(), ...b.keys()])) {
      if (a.get(path) !== b.get(path)) changed.push(path);
    }
    return changed;
  }

  function reloadScripts(changedPaths) {
    if (typeof window.ffuReloadScript !== 'function') {
      console.warn('[chromeWatcher] .ffu.js change detected, but ffuReloadScript is unavailable');
      return;
    }
    for (const path of changedPaths) {
      console.log('[chromeWatcher] .ffu.js change detected, reloading:', path);
      window.ffuReloadScript(path);
    }
  }

  reloadCss();
  let cssSnapshot = takeSnapshot(/\.css$/i);
  let scriptSnapshot = takeSnapshot(/\.ffu\.js$/i);

  const timer = window.setInterval(() => {
    const nextCss = takeSnapshot(/\.css$/i);
    if (diffPaths(cssSnapshot, nextCss).length) {
      cssSnapshot = nextCss;
      reloadCss();
    }

    const nextScripts = takeSnapshot(/\.ffu\.js$/i);
    const changedScripts = diffPaths(scriptSnapshot, nextScripts);
    if (changedScripts.length) {
      scriptSnapshot = nextScripts;
      reloadScripts(changedScripts);
    }
  }, POLL_MS);

  // disabling stops watching and hands loading back to Firefox on next start.
  // the sheets already loaded stay put, so toggling this off doesn't strip your theme mid-session.
  window.ffuDisableScript?.(() => {
    window.clearInterval(timer);
    try { Services.prefs.setBoolPref(NATIVE_PREF, true); } catch (e) {}
  });
})();