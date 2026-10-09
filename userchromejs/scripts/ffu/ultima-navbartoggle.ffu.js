// ==UserScript==
// @pref            ffu.navbar.autohide.btn
// @name            Ultima navbar autohide toggle
// @description     Left-click toggles ultima.navbar.autohide, right/middle-click toggles ultima.navbar.float (mutually exclusive)
// @include         main
// ==/UserScript==

(function () {
  const WIDGET_ID = 'bmf-btn-compact';
  const P_AUTO = 'ultima.navbar.autohide';
  const P_FLOAT = 'ultima.navbar.float';
  const prefs = Services.prefs;
  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);

  const getBool = p => {
    try {
      return prefs.getBoolPref(p, false);
    } catch (e) {
      return false;
    }
  };
  const setBool = (p, v) => {
    try {
      prefs.setBoolPref(p, !!v);
    } catch (e) {}
  };
  const myNode = () => document.getElementById(WIDGET_ID);

  for (const p of [P_AUTO, P_FLOAT]) {
    if (prefs.getPrefType(p) === prefs.PREF_INVALID) setBool(p, false);
  }

  const sheetURI = Services.io.newURI(
    'data:text/css;charset=utf-8,' +
      encodeURIComponent(`
    #${WIDGET_ID} .toolbarbutton-icon {
      list-style-image: url("chrome://devtools/skin/images/arrowhead-down.svg");
      fill: var(--toolbar-color);
    }
  `)
  );
  if (!sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) {
    sss.loadAndRegisterSheet(sheetURI, sss.AGENT_SHEET);
  }

  function enforce(changed) {
    if (!(getBool(P_AUTO) && getBool(P_FLOAT))) return;
    setBool(changed === P_FLOAT ? P_AUTO : P_FLOAT, false);
  }

  function toggle(pref, other) {
    const next = !getBool(pref);
    setBool(pref, next);
    if (next) setBool(other, false);
  }

  function refresh(node) {
    if (!node) return;
    const auto = getBool(P_AUTO);
    const flo = getBool(P_FLOAT);
    const mode = auto ? 'autohide' : flo ? 'float' : 'off';
    const anyOn = mode !== 'off';
    node.classList.toggle('is-on', anyOn);
    node.classList.toggle('is-off', !anyOn);
    node.classList.toggle('mode-autohide', mode === 'autohide');
    node.classList.toggle('mode-float', mode === 'float');
    node.classList.toggle('mode-off', mode === 'off');
    node.setAttribute('aria-pressed', anyOn ? 'true' : 'false');
    node.setAttribute('overflows', 'false');
    node.setAttribute(
      'tooltiptext',
      `Navbar (Autohide: ${auto ? 'On' : 'Off'}, Float: ${flo ? 'On' : 'Off'})`
    );
  }

  try {
    CustomizableUI.createWidget({
      id: WIDGET_ID,
      type: 'button',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      label: 'Navbar Autohide',
      tooltiptext: 'Toggle Navbar Autohide',
      overflows: false,
      onCommand() {
        toggle(P_AUTO, P_FLOAT);
      },
      onCreated(node) {
        node.addEventListener('contextmenu', e => {
          e.preventDefault();
          toggle(P_FLOAT, P_AUTO);
        });
        node.addEventListener('auxclick', e => {
          if (e.button !== 1) return;
          e.preventDefault();
          toggle(P_FLOAT, P_AUTO);
        });
        refresh(node);
      },
    });
  } catch (e) {
  }

  const observer = {
    observe(_subject, _topic, data) {
      enforce(data);
      refresh(myNode());
    },
  };
  prefs.addObserver(P_AUTO, observer);
  prefs.addObserver(P_FLOAT, observer);
  enforce(null);
  refresh(myNode());

  const stop = () => {
    for (const p of [P_AUTO, P_FLOAT]) {
      try {
        prefs.removeObserver(p, observer);
      } catch (e) {}
    }
  };
  window.addEventListener('unload', stop, {once: true});

  window.ffuDisableScript?.(() => {
    stop();
    try {
      CustomizableUI.destroyWidget(WIDGET_ID);
    } catch (e) {}
    try {
      if (sss.sheetRegistered(sheetURI, sss.AGENT_SHEET)) sss.unregisterSheet(sheetURI, sss.AGENT_SHEET);
    } catch (e) {}
  });
})();