// ==UserScript==
// @pref            ffu.clear.restart
// @name            Clear startup cache and restart
// @description     Flipping ffu.clearrestart true or false either way, clears startup cache and restarts browser, same as the about:support button
// @include         main
// ==/UserScript==

(function () {
  const PREF = 'ffu.clear.restart';
  const SEEN_PREF = 'tmp.clear.restart.triggered';

  function getBool(p, def = false) {
    try { return Services.prefs.getBoolPref(p, def); } catch (e) { return def; }
  }

  function fireIfChanged() {
    const current = getBool(PREF, false);
    const seen = getBool(SEEN_PREF, false);
    if (current === seen) return;
    Services.prefs.setBoolPref(SEEN_PREF, current);

    const ok = Services.prompt.confirm(
      window,
      'Restart Firefox',
      'This will clear the startup cache and restart Firefox. Continue?'
    );
    if (!ok) return;

    try {
      Services.appinfo.invalidateCachesOnRestart();
      const cancelQuit = Cc['@mozilla.org/supports-PRBool;1'].createInstance(Ci.nsISupportsPRBool);
      Services.obs.notifyObservers(cancelQuit, 'quit-application-requested', 'restart');
      if (cancelQuit.data) return;

      if (Services.appinfo.inSafeMode) {
        Services.startup.restartInSafeMode(Ci.nsIAppStartup.eAttemptQuit);
      } else {
        Services.startup.quit(Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart);
      }
    } catch (e) {
      console.error('[clearrestart] failed to restart', e);
    }
  }

  fireIfChanged();
  window.ffuDisableScript?.(fireIfChanged);
})();