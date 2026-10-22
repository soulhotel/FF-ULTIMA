// ==UserScript==
// @name            userChrome live reload / watcher
// @description     Watch the chrome folder for .css and .ffu.js changes -> reload them live
// @include         main
// @pref            ffu.chrome.watcher
// ==/UserScript==

// I was hoping this could co-exist with stylesheets being enabled eventually. Not the case.
// the watcher will continue to toggle it off, and anticipate a next launch environment where it is off.
// This means the case of a user having a persistent user.js with stylesheets true must be remedied.
// I believe the entire chain of operation is close enough to native loading application of stylesheets,
// for userChrome specifically, we're targetting mostly all of chrome now, so this captures layered html, library, PiP, sidebar panels, dialogs, etc.

(function () {
  const POLL_MS = 1000;
  const NATIVE_PREF = 'toolkit.legacyUserProfileCustomizations.stylesheets';

  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  const chromeDir = Services.dirsvc.get('UChrm', Ci.nsIFile);

  const CHROME_TYPE = Ci.nsIDOMWindowUtils.USER_SHEET;
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

  const isChromeDoc = doc => {
    try { return !!doc?.nodePrincipal?.isSystemPrincipal; } catch (e) { return false; }
  };

  function applyChromeSheet(win) {
    if (win.closed) return;
    const uri = Services.io.newFileURI(chromeFile);
    try { win.windowUtils.removeSheet(uri, CHROME_TYPE); } catch (e) {}
    if (!chromeFile.exists()) return;
    try {
      win.windowUtils.loadSheet(uri, CHROME_TYPE);
    } catch (ex) {
      console.error('[chromeWatcher] failed to load userChrome.css into', win.document?.documentURI, ex);
    }
  }

  function chromeWindows() {
    const found = new Set([window]);
    for (const top of Services.wm.getEnumerator(null)) {
      let contexts;
      try {
        contexts = top.browsingContext.getAllBrowsingContextsInSubtree();
      } catch (e) {
        contexts = [top.browsingContext];
      }
      for (const bc of contexts) {
        try {
          if (bc.window && isChromeDoc(bc.window.document)) found.add(bc.window);
        } catch (e) {}
      }
    }
    return found;
  }

  function reloadChromeSheet() {
    const wins = chromeWindows();
    for (const win of wins) applyChromeSheet(win);
    console.log(`[chromeWatcher] userChrome.css applied to ${wins.size} chrome document(s)`);
  }

  function reloadContentSheet() {
    const uri = Services.io.newFileURI(contentFile);
    try {
      // clear any copy before adding ours
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

  // native css loader caches sheets by URI.. without clearing it, remove+load re-applies the cached imports, as if no changes occured
  function clearSheetCache() {
    try {
      if (typeof ChromeUtils.clearResourceCache === 'function') {
        ChromeUtils.clearResourceCache({ types: ['stylesheet'] });
      } else if (typeof ChromeUtils.clearStyleSheetCache === 'function') {
        ChromeUtils.clearStyleSheetCache();
      }
    } catch (ex) {
      console.error('[chromeWatcher] could not clear stylesheet cache', ex);
    }
  }

  function reloadCss() {
    console.log('[chromeWatcher] css change detected, reloading userChrome.css / userContent.css');
    clearSheetCache();
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

  // every window's watcher does this which is safe: applyChromeSheet removes before it loads.
  const docObserver = {
    observe(subject, topic) {
      if (topic !== 'document-element-inserted') return;
      try {
        const win = subject.defaultView;
        if (win && isChromeDoc(subject)) applyChromeSheet(win);
      } catch (e) {}
    },
  };// what a piece of work..
  Services.obs.addObserver(docObserver, 'document-element-inserted');
  const stopObserving = () => {
    try { Services.obs.removeObserver(docObserver, 'document-element-inserted'); } catch (e) {}
  };
  window.addEventListener('unload', stopObserving, { once: true });

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
    stopObserving();
    try { Services.prefs.setBoolPref(NATIVE_PREF, true); } catch (e) {}
  });
})();