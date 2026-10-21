// ==UserScript==
// @name            Clear old FF Ultima prefs (prior to 5.0)
// @description     Clear old FF Ultima prefs that no longer exist after the update (one-time)
// @include         main
// ==/UserScript==

// This script serves as a temporary migration assistant tasked with
// removing old/discarded/renamed theme preferences from the users about:config page
// can be safely removed from source once "handled" for everyone (or practically 2 weeks after 5.0's initial launch)

(function () {
  const DONE_PREF = 'ffu.migration-prefs-removed';
  const HANDLED = 'handled';
  const oldPrefs = [];

  const prefs = Services.prefs;
  if (prefs.getStringPref(DONE_PREF, '') === HANDLED) return;

  let removed = 0;
  for (const name of oldPrefs) {
    try {
      if (prefs.prefHasUserValue(name)) {
        prefs.clearUserPref(name);
        removed++;
      }
    } catch (e) {
      console.error(`[FF Ultima][migration] couldnt remove ${name}`, e);
    }
  }

  prefs.setStringPref(DONE_PREF, HANDLED);
  console.log(`[FF Ultima][migration] removed ${removed} old preferences`);
})();