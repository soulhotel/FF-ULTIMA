// Custom URL Visibility Toggle Button Script
//
// left-click on custom URL toggle button: cycles through URL visibility states

var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
  .getService(Components.interfaces.nsIStyleSheetService);

(function(){
let widgetId = "bmf-btn-urlhide";
const prefs = Services.prefs;
const PREF_URL_STATE = "userChrome.urlbar.state";
const PREF_NAVBAR_HIDE = "ultima.navbar.hidebuttons"; // true = hide buttons, false = show

// Observer to keep all windows in sync when the state changes in any window
let statePrefObserver = {
  observe(subject, topic, data) {
    if (topic !== "nsPref:changed" || data !== PREF_URL_STATE) return;
    try {
      let newState = prefs.getIntPref(PREF_URL_STATE);
      // Apply without saving to avoid write loops
      applyUrlbarState(newState, window, null, /*shouldSave*/ false);
    } catch (e) {}
  },
};

// URL states
const URL_STATES = {
  DEFAULT: 0,    // Show everything
  SIMPLIFIED: 1, // Hide subdomain and path
  PRIVATE: 2     // Simplified + no history suggestions
};

// Add CSS
let uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
  #${widgetId} {
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
`), null, null);

sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

function toggleHistoryAutocomplete(enabled) {
  Services.prefs.setBoolPref("browser.urlbar.suggest.history", enabled);
  Services.prefs.setBoolPref("browser.urlbar.suggest.bookmark", enabled);
  Services.prefs.setBoolPref("browser.urlbar.suggest.openpage", enabled);
  Services.prefs.setBoolPref("browser.urlbar.suggest.searches", enabled);
  Services.prefs.setBoolPref("browser.urlbar.suggest.shortcuts", enabled);
  Services.prefs.setBoolPref("browser.urlbar.suggest.topsites", enabled);
  Services.prefs.setBoolPref("browser.urlbar.suggest.engines", enabled);
}

function saveUrlbarState(state) {
  prefs.setIntPref(PREF_URL_STATE, state);
}

function restoreUrlbarState() {
  try {
    return prefs.getIntPref(PREF_URL_STATE);
  } catch (e) {
    prefs.setIntPref(PREF_URL_STATE, URL_STATES.DEFAULT);
    return URL_STATES.DEFAULT;
  }
}

function applyUrlbarState(state, win, node, shouldSave = true) {
  let urlbar = win.document.getElementById("urlbar-container");
  let toggleButton = node || win.document.getElementById(widgetId);

  if (!urlbar || !toggleButton) return;

  // Ensure no interference with navbar height classes (handled by Compact Mode script)
  urlbar.classList.remove("urlbar-domain-only");
  toggleButton.classList.remove("state-default", "state-simplified", "state-private");

  switch (state) {
    case URL_STATES.DEFAULT:
      toggleButton.classList.add("state-default");
      toggleHistoryAutocomplete(true);
      // In default mode, show navbar buttons
      prefs.setBoolPref(PREF_NAVBAR_HIDE, false);
      break;
    case URL_STATES.SIMPLIFIED:
      urlbar.classList.add("urlbar-domain-only");
      toggleButton.classList.add("state-simplified");
      toggleHistoryAutocomplete(true);
      // In simplified mode, hide navbar buttons
      prefs.setBoolPref(PREF_NAVBAR_HIDE, true);
      break;
    case URL_STATES.PRIVATE:
      urlbar.classList.add("urlbar-domain-only");
      toggleButton.classList.add("state-private");
      toggleHistoryAutocomplete(false);
      // In private-like mode, hide navbar buttons
      prefs.setBoolPref(PREF_NAVBAR_HIDE, true);
      break;
  }

  if (shouldSave) {
    saveUrlbarState(state);
  }
}

// Removed navbar hover/resize handlers here; Compact Mode script owns toolbar height behavior.

function createToggleButton(retries = 20) {
  // Use the current window; do not target the most recent window globally.
  let currentWindow = window;
  let doc = currentWindow.document;
  let pageActionButtons = doc.getElementById("page-action-buttons");

  // During session restore, the UI can be constructed lazily; retry briefly.
  if (!pageActionButtons) {
    if (retries > 0) currentWindow.setTimeout(() => createToggleButton(retries - 1), 150);
    return;
  }

  if (doc.getElementById(widgetId)) return;

  let toggleButton = doc.createElement("toolbarbutton");
  toggleButton.id = widgetId;
  toggleButton.setAttribute("label", "Toggle URL Visibility");
  toggleButton.setAttribute("tooltiptext", "Toggle URL Visibility");
  toggleButton.classList.add("toolbarbutton-1");
  toggleButton.classList.add("chromeclass-toolbar-additional");

  toggleButton.addEventListener("click", function(event) {
    let currentState = restoreUrlbarState();
    let nextState = (currentState + 1) % 3;
    applyUrlbarState(nextState, currentWindow, toggleButton);
  });

  toggleButton.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    let currentState = restoreUrlbarState();
    let nextState = (currentState + 1) % 3;
    applyUrlbarState(nextState, currentWindow, toggleButton);
  });

  pageActionButtons.appendChild(toggleButton);

  // Initialize UI from saved state without re-writing prefs
  applyUrlbarState(restoreUrlbarState(), currentWindow, toggleButton, /*shouldSave*/ false);
}

function registerObservers() {
  try { prefs.addObserver(PREF_URL_STATE, statePrefObserver); } catch (e) {}
  window.addEventListener("unload", () => {
    try { prefs.removeObserver(PREF_URL_STATE, statePrefObserver); } catch (e) {}
  }, { once: true });
}

// Initialize per window
if (document.readyState === "complete" || document.readyState === "interactive") {
  createToggleButton();
  registerObservers();
} else {
  document.addEventListener("DOMContentLoaded", () => { createToggleButton(); registerObservers(); });
}

})();