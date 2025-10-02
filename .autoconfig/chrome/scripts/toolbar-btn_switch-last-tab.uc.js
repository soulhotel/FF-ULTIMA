// Custom Tab Switch and Reopen Button Script
// left-click on custom tab switch button: Go to last accessed tab
// right-click or middle-click on custom tab switch button: Reopen last closed tab
//
// Additional Reopen Last Closed Tab Button
// left-click on custom reopen tab button: Reopen last closed tab

var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
    .getService(Components.interfaces.nsIStyleSheetService);

(function() {
let accessedTabs = new WeakMap();
let switchTabWidgetId = "bmf-switch-last-tab-button";
let reopenTabWidgetId = "bmf-reopen-last-tab-button";

// Tab tracking listener functions
let tabListeners = {
  onTabSelect: function(event) {
    let window = event.target.ownerGlobal;
    let tabs = accessedTabs.get(window) || [];
    let selectedTab = window.gBrowser.selectedTab;
    let tabIndex = tabs.indexOf(selectedTab);

    if (tabIndex > -1) tabs.splice(tabIndex, 1);
    tabs.push(selectedTab);
    accessedTabs.set(window, tabs);
  },

  onTabClose: function(event) {
    let window = event.target.ownerGlobal;
    let tabs = accessedTabs.get(window) || [];
    let closedTabIndex = tabs.indexOf(event.target);
    if (closedTabIndex > -1) tabs.splice(closedTabIndex, 1);
    accessedTabs.set(window, tabs);
  }
};

// Initialize tab tracking for a window
function initializeWindow(window) {
  if (!window.gBrowser) return;

  // Initialize tab tracking for this window
  let tabs = [];
  Array.from(window.gBrowser.tabs).forEach(tab => tabs.push(tab));
  accessedTabs.set(window, tabs);

  // Add listeners
  window.gBrowser.tabContainer.addEventListener("TabSelect", tabListeners.onTabSelect);
  window.gBrowser.tabContainer.addEventListener("TabClose", tabListeners.onTabClose);
}

// Widget style listener
let styleListener = {
  cssSheets: new Map(),

  onWidgetCreated: function(aWidgetId) {
    if (aWidgetId !== switchTabWidgetId && aWidgetId !== reopenTabWidgetId) return;

    // Unregister existing sheet for this specific widget if it exists
    if (this.cssSheets.has(aWidgetId)) {
      sss.unregisterSheet(this.cssSheets.get(aWidgetId), sss.AGENT_SHEET);
    }

    let transform = aWidgetId === switchTabWidgetId ? 'transform: scaleX(-1);' : '';
    let css = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
      #${aWidgetId} .toolbarbutton-icon {
        fill: var(--toolbarbutton-icon-fill);
        color: var(--toolbarbutton-icon-fill);
        width: 16px !important;
        height: 16px !important;
        ${transform}
      }
    `), null, null);

    this.cssSheets.set(aWidgetId, css);
    sss.loadAndRegisterSheet(css, sss.AGENT_SHEET);
  }
};

// Create widgets
function createTabButton(id, label, isSwitchButton) {
  CustomizableUI.createWidget({
    id: id,
    type: "button",
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: label,
    tooltiptext: label,
    overflows: false,

    onCreated: function(node) {
      let window = node.ownerGlobal;
      // Ensure the button never ends up in the overflow panel
      try { node.setAttribute("overflows", "false"); } catch (e) {}

      // Ensure window is initialized
      if (!accessedTabs.has(window)) {
        initializeWindow(window);
      }

      // Add the SVG icon
      node.innerHTML = iconSVG;

      node.addEventListener('click', function(event) {
        event.stopPropagation();
        let window = event.view;
        let tabs = accessedTabs.get(window) || [];

        if (isSwitchButton && event.button === 0) {
          // Switch to last accessed tab
          let currentIndex = tabs.indexOf(window.gBrowser.selectedTab);
          let lastTab = tabs[currentIndex - 1];
          if (lastTab && lastTab !== window.gBrowser.selectedTab) {
            window.gBrowser.selectedTab = lastTab;
          }
        } else if (event.button === 1 || (!isSwitchButton && event.button === 0)) {
          // Reopen last closed tab
          window.document.getElementById("History:UndoCloseTab").doCommand();
        }
      });

      node.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        event.stopPropagation();
        let window = event.view;
        if (isSwitchButton) {
          window.document.getElementById("History:UndoCloseTab").doCommand();
        }
      });
    }
  });
}

const iconSVG = `
  <svg class="toolbarbutton-icon" width="16" height="16" viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fill-rule="evenodd">
      <path d="M13.297 6.912C12.595 4.39 10.167 2.5 7.398 2.5A5.9 5.9 0 0 0 1.5 8.398a.5.5 0 0 0 1 0A4.9 4.9 0 0 1 7.398 3.5c2.75 0 5.102 2.236 5.102 4.898v.004L8.669 7.029a.5.5 0 0 0-.338.942l4.462 1.598a.5.5 0 0 0 .651-.34l.02-.043 2-5a.5.5 0 1 0-.928-.372l-1.24 3.098z"/>
      <circle cx="7" cy="12" r="1"/>
    </g>
  </svg>
`;

// Initialize
CustomizableUI.addListener(styleListener);

createTabButton(
  switchTabWidgetId,
  "Switch to last used tab. Right-click to reopen closed tab.",
  true
);

createTabButton(
  reopenTabWidgetId,
  "Reopen last closed tab.",
  false
);

// Initialize existing windows
let windows = Services.wm.getEnumerator("navigator:browser");
while (windows.hasMoreElements()) {
  let window = windows.getNext();
  initializeWindow(window);
}

// Listen for new windows
Services.wm.addListener({
  onOpenWindow: function(xulWindow) {
    let window = xulWindow.QueryInterface(Ci.nsIInterfaceRequestor)
                         .getInterface(Ci.nsIDOMWindow);
    window.addEventListener("load", function() {
      if (window.document.documentElement.getAttribute("windowtype") === "navigator:browser") {
        initializeWindow(window);
      }
    }, {once: true});
  }
});

})();