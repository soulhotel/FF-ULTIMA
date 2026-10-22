// ==UserScript==
// @pref            ffu.navbar.unified
// @name            Unified Nav bar
// @description     Puts the nav bar in the Vertical Tab Bar
// @include         main
// ==/UserScript==

// chrome/theme/settings/ucjs-navbar.css for style

(() => {
  const ROOT = document.documentElement;
  const STARTUP_TOPIC = "browser-delayed-startup-finished";

  let navbar, unified, anchor, origParent, origNext, ro, mo, startupObs;
  let customizing = false;
  let destroyed = false;
  let lastWidth = 0;
  let resizeTimer = 0;

  // only apply to vertical tab usage
  const isVertical = () =>
    document.getElementById("tabbrowser-tabs")?.getAttribute("orient") === "vertical";

  function sync() {
    if (!anchor || !unified) return;
    const w = anchor.getBoundingClientRect().width;
    ROOT.style.setProperty("--ultima-sidebar-width", w + "px");
    ROOT.style.setProperty("--ultima-navbar-height", unified.getBoundingClientRect().height + "px");
    // the toolbar's overflow logic listens to window resize, which doesn't fire when only the sidebar changes
    const rounded = Math.round(w);
    if (rounded !== lastWidth) {
      lastWidth = rounded;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!destroyed && unified) window.dispatchEvent(new Event("resize"));
      }, 50);
    }
  }

  // can also experiment with inserting in sidebar-box for sidebery setups (gated by ultima.tabs.hide-for-sidebery). for the future..
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
        if (destroyed || !unified) return;
        const dl = document.getElementById("downloadsPanel");
        if (id === "downloads-button" && dl && !["open", "showing"].includes(dl.state)) DownloadsPanel.showPanel();
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

    ro?.disconnect();
    ROOT.removeAttribute("ultima-navbar-unified");
    ROOT.style.removeProperty("--ultima-sidebar-width");
    ROOT.style.removeProperty("--ultima-navbar-height");

    const next = origNext && origNext.parentNode === origParent ? origNext : null;
    origParent.insertBefore(navbar, next);

    unified.remove();
    unified = anchor = null;
  }

  function update() {
    if (destroyed) return;
    if (isVertical() && !customizing) attach();
    else detach();
  }

  const onCustomizeStart = () => {
    customizing = true;
    detach();
  };
  const onCustomizeEnd = () => {
    customizing = false;
    update();
  };

  // need this ready, if we're not dealing with a sidebery setup (no ultima.tabs.hide-for-sidebery)
  function ensureVertical() {
    if (isVertical()) return;
    try {
      Services.prefs.setBoolPref("sidebar.revamp", true);
      Services.prefs.setBoolPref("sidebar.verticalTabs", true);
    } catch (e) {
      console.error("[FF Ultima][unified navbar] could not enable vertical tabs", e);
    }
  }

  // need sidebar ready if ultima.tabs.hide-for-sidebery (future)
  // function ensureSidebar() {

  // }

  function init() {
    if (destroyed) return;
    navbar = document.getElementById("nav-bar");
    const tabs = document.getElementById("tabbrowser-tabs");
    if (!navbar || !tabs) return;
    // enabled while customize mode is open is ifne
    customizing = ROOT.hasAttribute("customizing");
    ro = new ResizeObserver(sync);
    mo = new MutationObserver(update);
    mo.observe(tabs, { attributes: true, attributeFilter: ["orient"] });

    gNavToolbox.addEventListener("customizationstarting", onCustomizeStart);
    gNavToolbox.addEventListener("aftercustomization", onCustomizeEnd);

    ensureVertical();
    update();
  }

  if (gBrowserInit.delayedStartupFinished) init();
  else {
    startupObs = (subject, topic) => {
      if (subject !== window) return;
      Services.obs.removeObserver(startupObs, topic);
      startupObs = null;
      init();
    };
    Services.obs.addObserver(startupObs, STARTUP_TOPIC);
  }

  window.ffuDisableScript?.(() => {
    destroyed = true;
    if (startupObs) {
      try { Services.obs.removeObserver(startupObs, STARTUP_TOPIC); } catch (e) {}
      startupObs = null;
    }
    mo?.disconnect();
    try {
      gNavToolbox.removeEventListener("customizationstarting", onCustomizeStart);
      gNavToolbox.removeEventListener("aftercustomization", onCustomizeEnd);
    } catch (e) {}
    detach();
    ro = mo = navbar = null;
  });
})();