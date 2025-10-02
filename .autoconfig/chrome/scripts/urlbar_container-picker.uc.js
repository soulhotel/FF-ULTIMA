// Container Selection Script for Firefox
//
// left-click on container icon: reopen current tab in selected container
// middle/right-click on container icon: open new tab in selected container

var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
  .getService(Components.interfaces.nsIStyleSheetService);

(function(){
let elementId = "userContext-icons";

let listener = {
  onWidgetCreated: function(aWidgetId, aArea) {
    if (aWidgetId != elementId)
      return;

    if(listener.css !== undefined)
      sss.unregisterSheet(listener.css, sss.AGENT_SHEET);

    listener.css = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
      #bmf-container-picker {
        background: var(--arrowpanel-background);
        border: 1px solid var(--arrowpanel-border-color);
        border-radius: 4px;
        padding: 4px;
        margin: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      #bmf-container-picker li {
        padding: 4px 8px;
        cursor: pointer;
        white-space: nowrap;
      }
      #bmf-container-picker li:hover {
        background-color: var(--arrowpanel-dimmed);
      }
    `), null, null);

    sss.loadAndRegisterSheet(listener.css, sss.AGENT_SHEET);
  }
}

function showPopupMenu(event) {
  event.stopPropagation();

  let existingDropdown = document.getElementById('bmf-container-picker');
  if (existingDropdown) {
    existingDropdown.remove();
  }

  let dropdown = document.createElement('ul');
  dropdown.id = 'bmf-container-picker';
  dropdown.style.position = 'absolute';
  dropdown.style.listStyle = 'none';
  dropdown.style.zIndex = '1000';

  const containers = window.ContextualIdentityService.getPublicIdentities();

  containers.forEach(context => {
    if (!context?.name || context.name.startsWith("tmp") ||
        context.name.startsWith("Facebook")) {
      return;
    }

    let item = document.createElement('li');
    item.className = `identity-color-${context.color}`;

    let hbox = document.createElement('hbox');
    hbox.className = `identity-color-${context.color}`;

    let label = document.createElement('label');
    label.textContent = window.ContextualIdentityService.getUserContextLabel(context.userContextId);

    let image = document.createElement('image');
    image.className = `identity-icon-${context.icon}`;

    hbox.appendChild(image);
    hbox.appendChild(label);
    item.appendChild(hbox);
    item.dataset.usercontextid = context.userContextId;

    item.addEventListener('mousedown', function(e) {
      if (e.button === 0) {
        reopenInContainer(window, context.userContextId);
        dropdown.remove();
      } else if (e.button === 1 || e.button === 2) {
        e.preventDefault();
        openNewTabInContainer(window, context.userContextId);
        dropdown.remove();
      }
    });

    dropdown.appendChild(item);
  });

  document.body.appendChild(dropdown);

  let rect = event.target.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px';
  dropdown.style.top = rect.bottom + 'px';

  document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target) &&
        event.target !== document.getElementById(elementId)) {
      dropdown.remove();
    }
  }, { once: true });
}

function reopenInContainer(win, userContextId) {
  let gBrowser = win.gBrowser;
  let tab = gBrowser.selectedTab;
  let newTab = gBrowser.addTab(tab.linkedBrowser.currentURI.spec, {
    userContextId: userContextId,
    triggeringPrincipal: tab.linkedBrowser.contentPrincipal,
  });
  gBrowser.removeTab(tab);
  gBrowser.selectedTab = newTab;
}

function openNewTabInContainer(win, userContextId) {
  let gBrowser = win.gBrowser;
  let tab = gBrowser.selectedTab;
  let newTab = gBrowser.addTab(tab.linkedBrowser.currentURI.spec, {
    userContextId: userContextId,
    triggeringPrincipal: tab.linkedBrowser.contentPrincipal,
  });
  gBrowser.selectedTab = newTab;
}

function init() {
  let userContextIcons = document.getElementById(elementId);
  if (userContextIcons) {
    userContextIcons.addEventListener('click', showPopupMenu);
  } else {
    console.warn(`Element #${elementId} not found.`);
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

CustomizableUI.addListener(listener);
})();