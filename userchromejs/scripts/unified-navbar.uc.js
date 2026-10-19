// ==UserScript==
// @pref            ffu.unified.navbar
// @name            Unified Nav bar
// @description     Puts the nav bar in the Vertical Tab Bar
// @include         main
// ==/UserScript==

// will adjust this for ffu when it's in a comfortable place

(() => {
  const ROOT = document.documentElement;
  let navbar, unified, anchor, origParent, origNext, ro;

  function sync() {
    ROOT.style.setProperty("--ultima-sidebar-width", anchor.getBoundingClientRect().width + "px");
    ROOT.style.setProperty("--ultima-navbar-height", unified.getBoundingClientRect().height + "px");
  }

  function attach() {
    if (ROOT.hasAttribute("customizing") || unified.contains(navbar)) return;
    origParent = navbar.parentNode;
    origNext = navbar.nextSibling;
    unified.appendChild(navbar);
    ROOT.setAttribute("ultima-navbar-unified", "");
    ro.observe(anchor);
    ro.observe(unified);
    sync();
  }

  function detach() {
    if (!origParent || !unified.contains(navbar)) return;
    ro.disconnect();
    ROOT.removeAttribute("ultima-navbar-unified");
    const next = origNext && origNext.parentNode === origParent ? origNext : null;
    origParent.insertBefore(navbar, next);
  }

  function init() {
    navbar = document.getElementById("nav-bar");
    anchor = document.querySelector("#sidebar-container sidebar-main");
    if (!navbar || !anchor) return;

    unified = document.createXULElement("vbox");
    unified.id = "ultima-unified-navbar";
    document.getElementById("sidebar-container").prepend(unified);

    ro = new ResizeObserver(sync);

    unified.addEventListener("contextmenu", e => e.stopPropagation()); /* dont let the context menu be captured */

    gNavToolbox.addEventListener("customizationstarting", detach);
    gNavToolbox.addEventListener("aftercustomization", attach);

    attach();
  }

  if (gBrowserInit.delayedStartupFinished) init();
  else {
    const obs = (subject, topic) => {
      if (subject !== window) return;
      Services.obs.removeObserver(obs, topic);
      init();
    };
    Services.obs.addObserver(obs, "browser-delayed-startup-finished");
  }
})();