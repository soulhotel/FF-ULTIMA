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
  let customizing = false;

  // only apply to vertical tab usage
  const isVertical = () =>
    document.getElementById("tabbrowser-tabs")?.getAttribute("orient") === "vertical";

  function sync() {
    if (!anchor || !unified) return;
    ROOT.style.setProperty("--ultima-sidebar-width", anchor.getBoundingClientRect().width + "px");
    ROOT.style.setProperty("--ultima-navbar-height", unified.getBoundingClientRect().height + "px");
  }

  function attach() {
    if (customizing || unified || !isVertical()) return;

    const container = document.getElementById("sidebar-container");
    anchor = container?.querySelector("sidebar-main");
    if (!navbar || !container || !anchor) { anchor = null; return; }

    unified = document.createXULElement("vbox");
    unified.id = "ultima-unified-navbar";
    unified.addEventListener("contextmenu", e => e.stopPropagation()); // don't let the context menu be captured
    unified.addEventListener("command", e => { // somewhere in internal function prevents normal menu/panel behavior, this is not a recommended fix, but it works
      const id = e.target.closest("toolbarbutton")?.id;
      setTimeout(() => {
        const dl = document.getElementById("downloadsPanel");
        if (id === "downloads-button" && !["open", "showing"].includes(dl.state)) DownloadsPanel.showPanel();
        if (id === "unified-extensions-button" && !["open", "showing"].includes(gUnifiedExtensions.panel.state)) gUnifiedExtensions.togglePanel();
      }, 50);
    });
    container.prepend(unified);

    origParent = navbar.parentNode;
    origNext = navbar.nextSibling;
    unified.appendChild(navbar);

    ROOT.setAttribute("ultima-navbar-unified", "");
    ro.observe(anchor);
    ro.observe(unified);
    sync();
  }

  function detach() {
    if (!unified) return;

    ro.disconnect();
    ROOT.removeAttribute("ultima-navbar-unified");
    ROOT.style.removeProperty("--ultima-sidebar-width");
    ROOT.style.removeProperty("--ultima-navbar-height");

    const next = origNext && origNext.parentNode === origParent ? origNext : null;
    origParent.insertBefore(navbar, next);

    unified.remove();
    unified = anchor = null;
  }

  function update() {
    if (isVertical() && !customizing) attach();
    else detach();
  }

  function init() {
    navbar = document.getElementById("nav-bar");
    const tabs = document.getElementById("tabbrowser-tabs");
    if (!navbar || !tabs) return;

    ro = new ResizeObserver(sync);

    new MutationObserver(update).observe(tabs, {
      attributes: true,
      attributeFilter: ["orient"],
    });

    gNavToolbox.addEventListener("customizationstarting", () => {
      customizing = true;
      detach();
    });
    gNavToolbox.addEventListener("aftercustomization", () => {
      customizing = false;
      update();
    });

    update();
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