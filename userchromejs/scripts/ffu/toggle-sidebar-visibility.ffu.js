// ==UserScript==
// @pref            ffu.sidebery.autohide.button
// @name            Sidebery autohide button
// @description     Navbar button that toggles the ultima.sidebery.autohide
// @include         main
// ==/UserScript==

(function () {
  const WIDGET_ID = 'bmf-btn-sidebar';
  const AUTOHIDE_PREF = 'ultima.sidebery.autohide';
  const prefs = Services.prefs;
  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);

  const isOn = () => prefs.getBoolPref(AUTOHIDE_PREF, false);
  const myNode = () => document.getElementById(WIDGET_ID);

  const sheetURI = Services.io.newURI(
    'data:text/css;charset=utf-8,' +
      encodeURIComponent(`
    #${WIDGET_ID} .toolbarbutton-icon { fill: var(--toolbar-color); }
    #${WIDGET_ID}[autohide="on"] .toolbarbutton-icon {
      list-style-image: url("chrome://browser/skin/sidebar-collapsed.svg");
    }
    #${WIDGET_ID}[autohide="off"] .toolbarbutton-icon {
      list-style-image: url("chrome://browser/skin/sidebar-expanded.svg");
    }
  `)
  );
  if (!sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) {
    sss.loadAndRegisterSheet(sheetURI, sss.AGENT_SHEET);
  }

  function refresh(node) {
    if (!node) return;
    const on = isOn();
    node.setAttribute('autohide', on ? 'on' : 'off');
    node.setAttribute('tooltiptext', `Sidebery autohide: ${on ? 'On' : 'Off'} (click to toggle)`);
  }

  try {
    CustomizableUI.createWidget({
      id: WIDGET_ID,
      type: 'button',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      label: 'Sidebery autohide',
      tooltiptext: 'Toggle Sidebery autohide',
      overflows: false,
      onCommand() {
        prefs.setBoolPref(AUTOHIDE_PREF, !isOn());
      },
      onCreated(node) {
        refresh(node);
      },
    });
  } catch (e) {
  }

  const observer = {
    observe() {
      refresh(myNode());
    },
  };
  prefs.addObserver(AUTOHIDE_PREF, observer);
  refresh(myNode());

  const stop = () => {
    try {
      prefs.removeObserver(AUTOHIDE_PREF, observer);
    } catch (e) {}
  };
  window.addEventListener('unload', stop, {once: true});

  window.ffuDisableScript?.(() => {
    stop();
    try {
      CustomizableUI.destroyWidget(WIDGET_ID);
    } catch (e) {}
    try {
      if (sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) {
        sss.unregisterSheet(sheetURI, sss.AGENT_SHEET);
      }
    } catch (e) {}
  });
})();