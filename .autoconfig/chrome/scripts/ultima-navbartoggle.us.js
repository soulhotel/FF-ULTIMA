// Navbar Autohide Toggle Button (userChromeJS)
// - Simplified: only toggles and reflects the about:config pref "ultima.navbar.autohide" and "ultima.navbar.float"
// Left-click controls Nav bar autohide
// Right-click controls Nav bar float

var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(
  Components.interfaces.nsIStyleSheetService
);

(function () {
  // Keep the same ID so existing toolbar placement is preserved
  const widgetId = "bmf-btn-compact";
  const prefs = Services.prefs;
  const PREF_AUTOHIDE = "ultima.navbar.autohide"; // bool
  const PREF_FLOAT = "ultima.navbar.float"; // bool

  try {
    const css = `
      /* Icon */
      #${widgetId} .toolbarbutton-icon {
        list-style-image: url("chrome://devtools/skin/images/arrowhead-down.svg");
        fill: var(--toolbar-color);
      }
    `;
    let uri = Services.io.newURI(
      "data:text/css;charset=utf-8," + encodeURIComponent(css),
      null,
      null
    );
    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
  } catch (e) {}

  function getPrefBool(prefName) {
    try {
      return prefs.getBoolPref(prefName);
    } catch (e) {
      try { prefs.setBoolPref(prefName, false); } catch (e2) {}
      return false;
    }
  }

  function setPrefBool(prefName, v) {
    try { prefs.setBoolPref(prefName, !!v); } catch (e) {}
  }

  function enforceMutualExclusion(changedPref) {
    // If both are true, prefer the changed pref and disable the other
    const auto = getPrefBool(PREF_AUTOHIDE);
    const flo = getPrefBool(PREF_FLOAT);
    if (auto && flo) {
      if (changedPref === PREF_AUTOHIDE) {
        setPrefBool(PREF_FLOAT, false);
      } else if (changedPref === PREF_FLOAT) {
        setPrefBool(PREF_AUTOHIDE, false);
      } else {
        // Default: prefer autohide
        setPrefBool(PREF_FLOAT, false);
      }
    }
  }

  function updateButtonState(node) {
    const auto = getPrefBool(PREF_AUTOHIDE);
    const flo = getPrefBool(PREF_FLOAT);

    // Normalize impossible state if both true (should be prevented, but just in case)
    if (auto && flo) {
      // Prefer autohide unless float changed just now; caller should have enforced
      setPrefBool(PREF_FLOAT, false);
    }

    const anyOn = getPrefBool(PREF_AUTOHIDE) || getPrefBool(PREF_FLOAT);
    const mode = getPrefBool(PREF_AUTOHIDE) ? "autohide" : (getPrefBool(PREF_FLOAT) ? "float" : "off");

    node.classList.toggle("is-on", anyOn);
    node.classList.toggle("is-off", !anyOn);
    node.classList.toggle("mode-autohide", mode === "autohide");
    node.classList.toggle("mode-float", mode === "float");
    node.classList.toggle("mode-off", mode === "off");
    node.setAttribute("aria-pressed", anyOn ? "true" : "false");
    node.setAttribute("tooltiptext", `Navbar (Autohide: ${getPrefBool(PREF_AUTOHIDE) ? "On" : "Off"}, Float: ${getPrefBool(PREF_FLOAT) ? "On" : "Off"})`);

    // Ensure overflows attribute is always set to false
    node.setAttribute("overflows", "false");

    // checked="true" only when mode=float and is-on
    // if (mode === "float" && anyOn) {
    //   node.setAttribute("checked", "true");
    // } else {
    //   node.removeAttribute("checked");
    // }
  }

  CustomizableUI.createWidget({
    id: widgetId,
    type: "button",
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: "Navbar Autohide",
    tooltiptext: "Toggle Navbar Autohide",
    overflows: false,

    onCreated(node) {
      const win = node.ownerGlobal;

      // Ensure attribute is present at all times
      node.setAttribute("overflows", "false");

      // Left-click toggles Autohide
      node.addEventListener("click", () => {
        const next = !getPrefBool(PREF_AUTOHIDE);
        setPrefBool(PREF_AUTOHIDE, next);
        if (next) setPrefBool(PREF_FLOAT, false); // enforce exclusivity
        enforceMutualExclusion(PREF_AUTOHIDE);
        updateButtonState(node);
      });

      // Right-click toggles Float (suppress context menu)
      node.addEventListener("contextmenu", (ev) => {
        ev.preventDefault();
        const next = !getPrefBool(PREF_FLOAT);
        setPrefBool(PREF_FLOAT, next);
        if (next) setPrefBool(PREF_AUTOHIDE, false); // enforce exclusivity
        enforceMutualExclusion(PREF_FLOAT);
        updateButtonState(node);
      });

      // Middle-click also toggles Float
      node.addEventListener("auxclick", (ev) => {
        if (ev.button !== 1) return;
        ev.preventDefault();
        const next = !getPrefBool(PREF_FLOAT);
        setPrefBool(PREF_FLOAT, next);
        if (next) setPrefBool(PREF_AUTOHIDE, false); // enforce exclusivity
        enforceMutualExclusion(PREF_FLOAT);
        updateButtonState(node);
      });

      // Keep the button in sync if the pref changes elsewhere (about:config, other window)
      const prefObserver = {
        observe(subject, topic, data) {
          if (topic !== "nsPref:changed") return;
          if (data !== PREF_AUTOHIDE && data !== PREF_FLOAT) return;
          enforceMutualExclusion(data);
          updateButtonState(node);
        },
      };
      try { prefs.addObserver(PREF_AUTOHIDE, prefObserver); } catch (e) {}
      try { prefs.addObserver(PREF_FLOAT, prefObserver); } catch (e) {}
      win.addEventListener(
        "unload",
        () => {
          try { prefs.removeObserver(PREF_AUTOHIDE, prefObserver); } catch (e) {}
          try { prefs.removeObserver(PREF_FLOAT, prefObserver); } catch (e) {}
        },
        { once: true }
      );

      // Initial state
      updateButtonState(node);
      return node;
    },
  });
})();