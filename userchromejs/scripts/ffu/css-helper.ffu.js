// ==UserScript==
// @pref            ffu.css.helper
// @name            CSS Helper
// @description     Small DOM helpers for CSS, helps us find and identify elements, especially in layered doms, allowing us to more accurately target them on the css side
// @include         main
// ==/UserScript==

// RULES
// find elements by matching selector
// add attributes, classes, inline custom properties
// root is also labeled with [css-helper]

(() => {
  const TAG = "[FF Ultima][css helper]";
  const ROOT = document.documentElement;
  ROOT.setAttribute("css-helper", "");
 
  const RULES = [
    {
      name: "tab-group hook",
      root: () => document.getElementById("tabbrowser-tabs"),
      selector: "tab-group",
      add(group) {
        group.setAttribute("ultima-tab-group", "");
      },
      remove(group) {
        group.removeAttribute("ultima-tab-group");
      },
    },
  ]; // dissappointing i have to rethink this one
 
  let destroyed = false;
  const handles = [];
 
  function track(rule) {
    const root = rule.root();
    if (!root) {
      console.warn(`${TAG} "${rule.name}": root not found, skipped`);
      return null;
    }
 
    const applied = new Set();
 
    const apply = el => {
      if (applied.has(el)) return;
      applied.add(el);
      try {
        rule.add(el);
      } catch (e) {
        console.error(`${TAG} "${rule.name}" add() failed`, e);
      }
    };
 
    const release = el => {
      if (!applied.delete(el)) return;
      try {
        rule.remove?.(el);
      } catch (e) {
        console.error(`${TAG} "${rule.name}" remove() failed`, e);
      }
    };
 
    const each = (node, fn) => {
      if (node.nodeType !== 1) return;
      if (node.matches(rule.selector)) fn(node);
      for (const el of node.querySelectorAll(rule.selector)) fn(el);
    };
 
    const mo = new MutationObserver(records => {
      if (destroyed) return;
      for (const r of records) {
        for (const n of r.removedNodes) each(n, el => { if (!el.isConnected) release(el); });
        for (const n of r.addedNodes) each(n, apply);
      }
    });
    mo.observe(root, { childList: true, subtree: true });
 
    for (const el of root.querySelectorAll(rule.selector)) apply(el);
 
    return {
      stop() {
        mo.disconnect();
        for (const el of [...applied]) release(el);
      },
    };
  }
 
  // PREF GUARD
  // some prefs (settings) need additional help to fully operate,
  // for example: tabs.autohide/tabs.float, ideally shouldnt operate when vertical tabs expandonhover is enabled.
  // can simply force expandonhover off
  // sidebar.verticalTabs

  const GUARD_PREFS = ["ultima.tabs.autohide", "ultima.tabs.float"];
  const SIDEBAR_VISIBILITY = "sidebar.visibility";
  const OBSERVED = [...GUARD_PREFS];
  let guarding = false;
 
  const prefOn = pref => {
    try {
      return Services.prefs.getBoolPref(pref, false) === true;
    } catch {
      return false;
    }
  };
 
  function enforceSidebarVisibility() {
    if (destroyed || !GUARD_PREFS.some(prefOn)) return;
    try {
      if (Services.prefs.getStringPref(SIDEBAR_VISIBILITY, "") === "expand-on-hover") {
        Services.prefs.setStringPref(SIDEBAR_VISIBILITY, "always-show");
      }
    } catch (e) {
      console.error(`${TAG} could not update ${SIDEBAR_VISIBILITY}`, e);
    }
  }
 
  const prefObserver = {
    observe(_subject, topic) {
      if (topic === "nsPref:changed") enforceSidebarVisibility();
    },
  };
 
  function startGuard() {
    if (guarding) return;
    for (const pref of OBSERVED) Services.prefs.addObserver(pref, prefObserver);
    guarding = true;
    enforceSidebarVisibility();
  }
 
  function stopGuard() {
    if (!guarding) return;
    for (const pref of OBSERVED) {
      try { Services.prefs.removeObserver(pref, prefObserver); } catch {}
    }
    guarding = false;
  }
 
  function init() {
    if (destroyed) return;
    for (const rule of RULES) {
      const handle = track(rule);
      if (handle) handles.push(handle);
    }
    startGuard();
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
 
  window.ffuDisableScript?.(() => {
    destroyed = true;
    stopGuard();
    for (const h of handles.splice(0)) h.stop();
    ROOT.removeAttribute("css-helper");
  });
})();
