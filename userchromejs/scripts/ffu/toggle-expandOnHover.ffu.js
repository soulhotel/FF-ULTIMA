// ==UserScript==
// @pref            ffu.expandonhover.toggle
// @name            toggle expand on hover in right click menu
// @author          soulhotel
// @description     right click tab container to toggle expand on hover
// @include         main
// ==/UserScript==

(function () {
  const ITEM_ID = 'uc-toggle-expandOnHover';
  const root = document.documentElement;
  const isOn = () => root.hasAttribute('sidebar-expand-on-hover');

  const menu = document.getElementById('toolbar-context-menu');
  if (!menu || document.getElementById(ITEM_ID)) return;

  const item = document.createXULElement('menuitem');
  item.id = ITEM_ID;
  item.setAttribute('type', 'checkbox');
  item.setAttribute('autocheck', 'false');
  item.setAttribute('label', 'Toggle Expand on Hover');
  item.addEventListener('command', () => {
    if (!window.SidebarController) return;
    SidebarController.toggleExpandOnHover(!isOn());
  });

  // reflect the REAL STATE!
  const sync = e => {
    if (e.target !== menu) return;

    const sidebarCustomize = document.getElementById('toolbar-context-customize-sidebar');
    const inSidebarContext = !!sidebarCustomize && !sidebarCustomize.hidden;

    item.hidden = !inSidebarContext;
    if (!inSidebarContext) return;

    if (isOn()) item.setAttribute('checked', 'true');
    else item.removeAttribute('checked');
  };
  menu.addEventListener('popupshown', sync);

  const ref = document.getElementById('toolbar-context-customize-sidebar');
  if (ref && ref.parentElement === menu) menu.insertBefore(item, ref);
  else menu.appendChild(item);

  window.ffuDisableScript?.(() => {
    menu.removeEventListener('popupshown', sync);
    item.remove();
  });
})();