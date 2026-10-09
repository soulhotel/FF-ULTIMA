// ==UserScript==
// @pref            ffu.lasttab.buttons
// @name            Last tab / reopen tab buttons
// @description     Navbar buttons: switch to last used tab (right/middle-click reopens a closed tab) and reopen last closed tab
// @include         main
// ==/UserScript==

(function () {
  const SWITCH_ID = 'bmf-switch-last-tab-button';
  const REOPEN_ID = 'bmf-reopen-last-tab-button';
  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);

  const ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 14">' +
    '<g fill="context-fill" fill-rule="evenodd">' +
    '<path d="M13.297 6.912C12.595 4.39 10.167 2.5 7.398 2.5A5.9 5.9 0 0 0 1.5 8.398a.5.5 0 0 0 1 0A4.9 4.9 0 0 1 7.398 3.5c2.75 0 5.102 2.236 5.102 4.898v.004L8.669 7.029a.5.5 0 0 0-.338.942l4.462 1.598a.5.5 0 0 0 .651-.34l.02-.043 2-5a.5.5 0 1 0-.928-.372l-1.24 3.098z"/>' +
    '<circle cx="7" cy="12" r="1"/></g></svg>';
  const ICON_URI = 'data:image/svg+xml,' + encodeURIComponent(ICON_SVG);

  const sheetURI = Services.io.newURI(
    'data:text/css;charset=utf-8,' +
      encodeURIComponent(`
    #${SWITCH_ID} .toolbarbutton-icon,
    #${REOPEN_ID} .toolbarbutton-icon {
      list-style-image: url("${ICON_URI}");
      -moz-context-properties: fill;
      fill: var(--toolbarbutton-icon-fill);
      width: 16px !important;
      height: 16px !important;
    }
    #${SWITCH_ID} .toolbarbutton-icon { transform: scaleX(-1); }
  `)
  );
  if (!sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) {
    sss.loadAndRegisterSheet(sheetURI, sss.AGENT_SHEET);
  }

  const undoClose = win => win.document.getElementById('History:UndoCloseTab').doCommand();

  // most recently used tab other than the current one
  function previousTab(win) {
    const {gBrowser} = win;
    const cur = gBrowser.selectedTab;
    let best = null;
    for (const t of gBrowser.tabs) {
      if (t === cur || t.closing) continue;
      if (!best || t.lastAccessed > best.lastAccessed) best = t;
    }
    return best;
  }

  function makeButton(id, label, tooltip, isSwitch) {
    try {
      CustomizableUI.createWidget({
        id,
        type: 'button',
        defaultArea: CustomizableUI.AREA_NAVBAR,
        label,
        tooltiptext: tooltip,
        overflows: false,
        onCommand(event) {
          const win = event.target.ownerGlobal;
          if (isSwitch) {
            const t = previousTab(win);
            if (t) win.gBrowser.selectedTab = t;
          } else {
            undoClose(win);
          }
        },
        onCreated(node) {
          if (!isSwitch) return;
          const win = node.ownerGlobal;
          node.addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopPropagation();
            undoClose(win);
          });
          node.addEventListener('auxclick', e => {
            if (e.button !== 1) return;
            e.preventDefault();
            undoClose(win);
          });
        },
      });
    } catch (e) {
    }
  }

  makeButton(
    SWITCH_ID,
    'Switch to last tab',
    'Switch to last used tab (right/middle-click: reopen closed tab)',
    true
  );
  makeButton(REOPEN_ID, 'Reopen closed tab', 'Reopen last closed tab', false);

  window.ffuDisableScript?.(() => {
    for (const id of [SWITCH_ID, REOPEN_ID]) {
      try {
        CustomizableUI.destroyWidget(id);
      } catch (e) {}
    }
    try {
      if (sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) sss.unregisterSheet(sheetURI, sss.AGENT_SHEET);
    } catch (e) {}
  });
})();