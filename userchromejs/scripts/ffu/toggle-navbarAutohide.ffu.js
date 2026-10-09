// ==UserScript==
// @pref            ffu.navbar.autohide.menu
// @name            toggle navbar autohide/float in right click menu
// @description     toggle Ultima navbar autohide / float - in right click menu
// @include         main
// ==/UserScript==

(function () {
  const ITEM_AUTOHIDE_ID = 'uc-toggle-navbar-autohide';
  const ITEM_FLOAT_ID = 'uc-toggle-navbar-float';
  const P_AUTO = 'ultima.navbar.autohide';
  const P_FLOAT = 'ultima.navbar.float';

  const menu = document.getElementById('toolbar-context-menu');
  if (!menu || document.getElementById(ITEM_AUTOHIDE_ID) || document.getElementById(ITEM_FLOAT_ID)) return;

  const getBool = p => {
    try {
      return Services.prefs.getBoolPref(p, false);
    } catch (e) {
      return false;
    }
  };
  const setBool = (p, v) => {
    try {
      Services.prefs.setBoolPref(p, !!v);
    } catch (e) {}
  };

  function toggle(pref, other) {
    const next = !getBool(pref);
    setBool(pref, next);
    if (next) setBool(other, false);
  }

  const itemAutohide = document.createXULElement('menuitem');
  itemAutohide.id = ITEM_AUTOHIDE_ID;
  itemAutohide.setAttribute('type', 'checkbox');
  itemAutohide.setAttribute('autocheck', 'false');
  itemAutohide.setAttribute('label', 'Toggle Navbar Autohide');
  itemAutohide.addEventListener('command', () => toggle(P_AUTO, P_FLOAT));

  const itemFloat = document.createXULElement('menuitem');
  itemFloat.id = ITEM_FLOAT_ID;
  itemFloat.setAttribute('type', 'checkbox');
  itemFloat.setAttribute('autocheck', 'false');
  itemFloat.setAttribute('label', 'Toggle Navbar Float');
  itemFloat.addEventListener('command', () => toggle(P_FLOAT, P_AUTO));

  const sync = e => {
    if (e.target !== menu) return;
    const customizeItem = document.getElementById('toolbar-context-customize');
    const inNavbarContext = !!customizeItem && !customizeItem.hidden;
    itemAutohide.hidden = !inNavbarContext;
    itemFloat.hidden = !inNavbarContext;
    if (!inNavbarContext) return;

    if (getBool(P_AUTO)) itemAutohide.setAttribute('checked', 'true');
    else itemAutohide.removeAttribute('checked');

    if (getBool(P_FLOAT)) itemFloat.setAttribute('checked', 'true');
    else itemFloat.removeAttribute('checked');
  };
  menu.addEventListener('popupshown', sync);

  const ref = document.getElementById('toolbar-context-customize');
  if (ref && ref.parentElement === menu) {
    menu.insertBefore(itemAutohide, ref);
    menu.insertBefore(itemFloat, ref);
  } else {
    menu.appendChild(itemAutohide);
    menu.appendChild(itemFloat);
  }

  window.ffuDisableScript?.(() => {
    menu.removeEventListener('popupshown', sync);
    itemAutohide.remove();
    itemFloat.remove();
  });
})();