// Custom Sidebar Toggle Button Script
//
// left-click on sidebar button: toggles sidebar collapsible state
// middle-click on sidebar button: toggles sidebar visibility
// right-click on sidebar button: hides sidebar

var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
  .getService(Components.interfaces.nsIStyleSheetService);

(function(){
let widgetId = "bmf-btn-sidebar";
const prefs = Services.prefs;
const PREF_SIDEBAR_HIDDEN = "userChrome.sidebar.hidden";
const PREF_SIDEBAR_COLLAPSIBLE = "userChrome.sidebar.collapsible";
const PREF_SIDEBERY_AUTOHIDE = "ultima.sidebery.autohide";

let listener = {
  onWidgetCreated: function(aWidgetId, aArea) {
    if (aWidgetId != widgetId)
      return;

    if(listener.css !== undefined)
      sss.unregisterSheet(listener.css, sss.AGENT_SHEET);

    listener.css = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
      #${aWidgetId}.sb-hidden .toolbarbutton-icon {
        list-style-image: url("chrome://browser/skin/sidebar-collapsed.svg");
        fill: var(--toolbar-color);
        opacity: var(--toolbarbutton-disabled-opacity);
      }
      #${aWidgetId}.sb-collapsible .toolbarbutton-icon {
        list-style-image: url("chrome://browser/skin/sidebar-collapsed.svg");
        fill: var(--toolbar-color);
      }
      #${aWidgetId}.sb-default .toolbarbutton-icon {
        list-style-image: url("chrome://browser/skin/sidebar-expanded.svg");
        fill: var(--toolbar-color);
      }
    `), null, null);

    sss.loadAndRegisterSheet(listener.css, sss.AGENT_SHEET);
  }
}

function saveSidebarState(sidebarBox) {
  prefs.setBoolPref(PREF_SIDEBAR_HIDDEN, sidebarBox.classList.contains("hidden"));
  prefs.setBoolPref(PREF_SIDEBAR_COLLAPSIBLE, sidebarBox.classList.contains("collapsible"));
}

function restoreSidebarState(sidebarBox) {
  try {
    if (prefs.getBoolPref(PREF_SIDEBAR_HIDDEN)) {
      sidebarBox.classList.add("hidden");
      sidebarBox.classList.remove("collapsible");
    } else if (prefs.getBoolPref(PREF_SIDEBAR_COLLAPSIBLE)) {
      sidebarBox.classList.add("collapsible");
      sidebarBox.classList.remove("hidden");
    }
  } catch (e) {
    prefs.setBoolPref(PREF_SIDEBAR_HIDDEN, false);
    prefs.setBoolPref(PREF_SIDEBAR_COLLAPSIBLE, false);
  }
}

function updateButtonIcon(button, sidebarBox) {
  // Ensure we're working on the toolbarbutton, not its inner icon/label
  try {
    if (button && button.tagName && button.tagName.toLowerCase() !== 'toolbarbutton' && button.closest) {
      const tb = button.closest('toolbarbutton');
      if (tb) button = tb;
    }
  } catch (e) {}

  if (!button || !sidebarBox) return;
  button.classList.remove('sb-hidden', 'sb-collapsible', 'sb-default');
  if (sidebarBox.classList.contains("hidden")) {
    button.classList.add('sb-hidden');
    // remove checked when sidebar is hidden
    // try { button.removeAttribute('checked'); } catch (e) {}
    // Sidebery autohide off when hidden
    try { prefs.setBoolPref(PREF_SIDEBERY_AUTOHIDE, false); } catch (e) {}
  } else if (sidebarBox.classList.contains("collapsible")) {
    button.classList.add('sb-collapsible');
    // mark checked when collapsible
    // try { button.setAttribute('checked', 'true'); } catch (e) {}
    // Sidebery autohide on when collapsible
    try { prefs.setBoolPref(PREF_SIDEBERY_AUTOHIDE, true); } catch (e) {}
  } else {
    button.classList.add('sb-default');
    // mark checked for default (expanded) state as well
    // try { button.setAttribute('checked', 'true'); } catch (e) {}
    // Sidebery autohide off when default (expanded)
    try { prefs.setBoolPref(PREF_SIDEBERY_AUTOHIDE, false); } catch (e) {}
  }
}

function emulateF1(win) {
  const keyEvent = new win.KeyboardEvent("keydown", {
    key: "F1", keyCode: 112, code: "F1", bubbles: true, cancelable: true
  });
  win.document.documentElement.dispatchEvent(keyEvent);
}

CustomizableUI.addListener(listener);
CustomizableUI.createWidget({
  id: widgetId,
  type: "button",
  defaultArea: CustomizableUI.AREA_NAVBAR,
  label: "Left-click to toggle sidebery autohide. Right-click to hide it.",
  tooltiptext: "Left-click to toggle sidebery autohide. Right-click to hide it.",

  onClick: function(event) {
    if (event.button === 2) return; // Let contextmenu event handle right-click

    // Always operate on the toolbarbutton itself
    const button = event.currentTarget || event.target;
    const win = button.ownerGlobal || (event.target && event.target.ownerGlobal);
    const doc = win.document;
    let sidebarBox = doc.getElementById("sidebar-box");
    const sidebarSplitter = doc.getElementById("sidebar-splitter");

    if (event.button === 0) {
      // Left-click: if sidebar is open (splitter not hidden), toggle collapsible; otherwise open it
      if (sidebarBox && sidebarSplitter && !sidebarSplitter.hidden) {
        try {
          // Ensure hidden marker is off when working with collapsible state
          sidebarBox.classList.remove('hidden');
          sidebarBox.classList.toggle("collapsible");
        } catch (e) {}
        saveSidebarState(sidebarBox);
        updateButtonIcon(button, sidebarBox);
      } else {
        emulateF1(win);
        // After toggling via F1, update the icon/classes in the next tick
        setTimeout(() => {
          const sb = doc.getElementById("sidebar-box");
          try { if (sb) sb.classList.remove('hidden'); } catch (e) {}
          updateButtonIcon(button, sb);
        }, 0);
      }
    } else if (event.button === 1) {
      // Middle-click: toggle visibility
      const wasHidden = sidebarSplitter && sidebarSplitter.hidden;
      const willHide = !wasHidden;
      emulateF1(win);
      // Maintain marker classes to reflect the new state
      setTimeout(() => {
        const sb = doc.getElementById("sidebar-box");
        try {
          if (sb) {
            if (willHide) {
              sb.classList.add('hidden');
              sb.classList.remove('collapsible');
            } else {
              sb.classList.remove('hidden');
            }
            saveSidebarState(sb);
          }
        } catch (e) {}
        updateButtonIcon(button, sb);
      }, 0);
    }
  },

  onCreated: function(node) {
    const win = node.ownerGlobal;
    const sidebarBox = win.document.getElementById("sidebar-box");

    node.addEventListener("contextmenu", function(event) {
      event.preventDefault();
      const splitter = win.document.getElementById("sidebar-splitter");
      const wasHidden = splitter && splitter.hidden;
      const willHide = !wasHidden;
      emulateF1(win);
      setTimeout(() => {
        const sb = win.document.getElementById("sidebar-box");
        try {
          if (sb) {
            if (willHide) {
              sb.classList.add('hidden');
              sb.classList.remove('collapsible');
            } else {
              sb.classList.remove('hidden');
            }
            saveSidebarState(sb);
          }
        } catch (e) {}
        updateButtonIcon(node, sb);
      }, 0);
    });

    restoreSidebarState(sidebarBox);
    updateButtonIcon(node, sidebarBox);
    return node;
  }
});
})();