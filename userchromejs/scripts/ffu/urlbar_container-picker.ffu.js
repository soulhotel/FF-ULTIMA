// ==UserScript==
// @pref            ffu.container.picker
// @name            Container Selection Picker for Firefox
// @description     Click the container indicator in the urlbar for a container list: left-click reopens the tab in that container, middle/right-click opens a new tab in it
// @include         main
// ==/UserScript==

// Container Selection Script for Firefox
//
// left-click on container icon: reopen current tab in selected container
// middle/right-click on container icon: open new tab in selected container

(function () {
  const ICON_ID = 'userContext-icons';
  const MENU_ID = 'bmf-container-picker';
  const HIDE_THESE = ['tmp', 'Facebook'];
  const CSS_URL = 'resource://userchromejs/urlbar_container-picker.ffu.css';
  const DEFAULT_CTX = {userContextId: 0, name: 'Default', color: 'black', icon: 'fingerprint'};

  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  const cssURI = Services.io.newURI(CSS_URL);
  const extraURI = Services.io.newURI(
    'data:text/css;charset=utf-8,' +
      encodeURIComponent(`
    .identity-color-black {
      --identity-tab-color: #424242;
      --identity-icon-color: #424242;
    }
  `)
  );
  const registered = [];
  function register(uri, type) {
    try {
      if (!sss.sheetRegistered(uri, type)) sss.loadAndRegisterSheet(uri, type);
      registered.push([uri, type]);
    } catch (e) {
      console.warn('[container picker] could not load ' + uri.spec, e);
    }
  }
  register(cssURI, sss.AUTHOR_SHEET);
  register(extraURI, sss.AGENT_SHEET);

  const icon = document.getElementById(ICON_ID);
  let menu = null;

  // always visible like multifoxContainer does?
  function showDefaultIndicator() {
    try {
      if (gBrowser.selectedTab.userContextId != 0) return;
      icon.className = 'identity-color-black';
      document.getElementById('userContext-label').textContent = 'Default';
      document.getElementById('userContext-indicator').className = 'identity-icon-fingerprint';
    } catch (e) {}
  }

  if (icon) {
    icon.hidden = false;
    Object.defineProperty(icon, 'hidden', {get: () => false, set: () => {}, configurable: true});
    gBrowser.tabContainer.addEventListener('TabSelect', showDefaultIndicator);
    if (gBrowserInit.delayedStartupFinished) showDefaultIndicator();
  }

  function onOutside(e) {
    if (menu && !menu.contains(e.target) && !icon?.contains(e.target)) closeMenu();
  }

  function closeMenu() {
    document.removeEventListener('mousedown', onOutside, true);
    menu?.remove();
    menu = null;
  }

  function reopenInContainer(userContextId) {
    const tab = gBrowser.selectedTab;
    const index = [...gBrowser.tabs].indexOf(tab);
    const newTab = gBrowser.addTab(tab.linkedBrowser.currentURI.spec, {
      userContextId,
      pinned: tab.pinned,
      index: index + 1,
      triggeringPrincipal: tab.linkedBrowser.contentPrincipal,
    });
    gBrowser.selectedTab = newTab;
    gBrowser.removeTab(tab);
  }

  function openNewTabInContainer(userContextId) {
    const tab = gBrowser.selectedTab;
    const newTab = gBrowser.addTab(tab.linkedBrowser.currentURI.spec, {
      userContextId,
      triggeringPrincipal: tab.linkedBrowser.contentPrincipal,
    });
    gBrowser.selectedTab = newTab;
  }

  function showMenu(event) {
    event.stopPropagation();
    if (menu) {
      closeMenu();
      return;
    }

    menu = document.createElement('ul');
    menu.id = MENU_ID;
    menu.style.position = 'absolute';
    menu.style.listStyle = 'none';
    menu.style.zIndex = '1000';

    const contexts = [DEFAULT_CTX, ...window.ContextualIdentityService.getPublicIdentities()];
    for (const ctx of contexts) {
      if (!ctx?.name || HIDE_THESE.some(p => ctx.name.startsWith(p))) continue;

      const item = document.createElement('li');
      item.className = `identity-color-${ctx.color}`;
      const box = document.createElement('hbox');
      box.className = `identity-color-${ctx.color}`;
      const image = document.createElement('image');
      image.className = `identity-icon-${ctx.icon}`;
      const label = document.createElement('label');
      label.textContent =
        ctx.userContextId === 0
          ? 'Default'
          : window.ContextualIdentityService.getUserContextLabel(ctx.userContextId);
      box.append(image, label);
      item.append(box);
      item.dataset.usercontextid = ctx.userContextId;

      item.addEventListener('contextmenu', e => e.preventDefault());
      item.addEventListener('mousedown', e => {
        e.preventDefault();
        if (e.button === 0) reopenInContainer(ctx.userContextId);
        else if (e.button === 1 || e.button === 2) openNewTabInContainer(ctx.userContextId);
        else return;
        closeMenu();
      });
      menu.append(item);
    }

    (document.body || document.documentElement).append(menu);
    const rect = event.currentTarget.getBoundingClientRect();
    menu.style.left = rect.left + 'px';
    menu.style.top = rect.bottom + 'px';
    document.addEventListener('mousedown', onOutside, true);
  }

  if (icon) icon.addEventListener('click', showMenu);
  else console.warn(`[container picker] #${ICON_ID} not found`);

  window.ffuDisableScript?.(() => {
    closeMenu();
    if (icon) {
      icon.removeEventListener('click', showMenu);
      delete icon.hidden; // back to Firefox's own hidden handling
      gBrowser.tabContainer.removeEventListener('TabSelect', showDefaultIndicator);
    }
    window.updateUserContextUIIndicator?.(); // let Firefox redraw on its own
    for (const [uri, type] of registered) {
      try {
        if (sss.sheetRegistered(uri, type)) sss.unregisterSheet(uri, type);
      } catch (e) {}
    }
  });
})();