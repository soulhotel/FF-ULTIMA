// ==UserScript==
// @pref            ffu.urlbar.visibility
// @name            URL visibility toggle
// @description     Urlbar button cycling URL visibility: default > domain only > domain only + no suggestions
// @include         main
// ==/UserScript==

// UCC controller already load this at the right point so ready states arent needed (in this structure) uhhh
// saved state restored without rewriting, re-enabling (disablepref, reenable pref) still restores the saved state,
// whatever mode it was in should be untouched, but still need to be able to destroy

(function () {
  const BTN_ID = 'bmf-btn-urlhide';
  const PREF_STATE = 'userChrome.urlbar.state';
  const PREF_BACKUP = 'userChrome.urlbar.suggestBackup'; // can restore from snapshot, like when entering/leaving private browsing
  const PREF_NAVBAR_HIDE = 'ultima.navbar.hidebuttons'; // true = hide navbar buttons
  const STATES = {DEFAULT: 0, SIMPLIFIED: 1, PRIVATE: 2};
  const STATE_CLASSES = ['state-default', 'state-simplified', 'state-private'];
  const SUGGEST_PREFS = [
    'history', 'bookmark', 'openpage', 'searches', 'shortcuts', 'topsites', 'engines',
  ].map(s => 'browser.urlbar.suggest.' + s);

  const prefs = Services.prefs;
  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  let retryTimer = null;

  const sheetURI = Services.io.newURI(
    'data:text/css;charset=utf-8,' +
      encodeURIComponent(`
    #${BTN_ID} {
      background-image: url("chrome://browser/skin/privateBrowsing.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 16px;
      width: 24px;
      height: 24px;
      fill: var(--toolbar-color);
      border: none;
      padding: 0;
      margin: 0;
      order: 99;
    }
  `)
  );
  if (!sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) {
    sss.loadAndRegisterSheet(sheetURI, sss.AGENT_SHEET);
  }

  function getState() {
    try {
      return prefs.getIntPref(PREF_STATE);
    } catch (e) {
      prefs.setIntPref(PREF_STATE, STATES.DEFAULT);
      return STATES.DEFAULT;
    }
  }

  function backupSuggest() {
    if (prefs.prefHasUserValue(PREF_BACKUP)) return;
    const snap = {};
    for (const p of SUGGEST_PREFS) {
      snap[p] = prefs.prefHasUserValue(p) ? prefs.getBoolPref(p) : null;
    }
    prefs.setStringPref(PREF_BACKUP, JSON.stringify(snap));
  }

  function suggestOff() {
    backupSuggest();
    for (const p of SUGGEST_PREFS) prefs.setBoolPref(p, false);
  }

  function restoreSuggest() {
    let snap = null;
    try {
      snap = JSON.parse(prefs.getStringPref(PREF_BACKUP, ''));
    } catch (e) {}
    for (const p of SUGGEST_PREFS) {
      if (snap && p in snap) {
        if (snap[p] === null) prefs.clearUserPref(p);
        else prefs.setBoolPref(p, snap[p]);
      } else {
        prefs.setBoolPref(p, true);
      }
    }
    prefs.clearUserPref(PREF_BACKUP);
  }

  // per-window UI only
  function applyUI(state, node) {
    const urlbar = document.getElementById('urlbar-container');
    if (!urlbar || ![0, 1, 2].includes(state)) return;
    node = node || document.getElementById(BTN_ID);
    urlbar.classList.toggle('urlbar-domain-only', state !== STATES.DEFAULT);
    if (node) {
      node.classList.remove(...STATE_CLASSES);
      node.classList.add(STATE_CLASSES[state]);
    }
  }

  function changeState(next) {
    const prev = getState();
    if (next === STATES.PRIVATE && prev !== STATES.PRIVATE) suggestOff();
    else if (prev === STATES.PRIVATE && next !== STATES.PRIVATE) restoreSuggest();
    prefs.setBoolPref(PREF_NAVBAR_HIDE, next !== STATES.DEFAULT);
    prefs.setIntPref(PREF_STATE, next);
  }

  function createButton(retries = 20) {
    const host = document.getElementById('page-action-buttons');
    // during session restore the UI can be built lazily; so retry
    if (!host) {
      if (retries > 0) retryTimer = window.setTimeout(() => createButton(retries - 1), 150);
      return;
    }
    if (document.getElementById(BTN_ID)) return;

    const btn = document.createElement('toolbarbutton');
    btn.id = BTN_ID;
    btn.setAttribute('label', 'Toggle URL Visibility');
    btn.setAttribute('tooltiptext', 'Toggle URL Visibility');
    btn.classList.add('toolbarbutton-1', 'chromeclass-toolbar-additional');

    const cycle = e => {
      if (e.type === 'contextmenu') e.preventDefault();
      changeState((getState() + 1) % 3);
    };
    btn.addEventListener('click', cycle);
    btn.addEventListener('contextmenu', cycle);
    host.appendChild(btn);

    // restore snapshot
    const state = getState();
    if (state === STATES.PRIVATE) suggestOff();
    prefs.setBoolPref(PREF_NAVBAR_HIDE, state !== STATES.DEFAULT);
    applyUI(state, btn);
  }

  const observer = {
    observe() {
      applyUI(getState());
    },
  };
  prefs.addObserver(PREF_STATE, observer);
  const stop = () => {
    try {
      prefs.removeObserver(PREF_STATE, observer);
    } catch (e) {}
  };
  window.addEventListener('unload', stop, {once: true});

  createButton();

  window.ffuDisableScript?.(() => {
    window.clearTimeout(retryTimer);
    stop();
    document.getElementById(BTN_ID)?.remove();
    document.getElementById('urlbar-container')?.classList.remove('urlbar-domain-only');
    if (getState() === STATES.PRIVATE) restoreSuggest();
    prefs.setBoolPref(PREF_NAVBAR_HIDE, false);
    try {
      if (sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) sss.unregisterSheet(sheetURI, sss.AGENT_SHEET);
    } catch (e) {}
  });
})();