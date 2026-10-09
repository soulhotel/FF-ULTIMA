// ==UserScript==
// @pref           ffu.middleclick.undoclosedtab
// @name           Middle click space in tab container to undo closed tab
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    Middleclick empty space in the tab container to undo a closed tab
// @include        main
// @compatibility  Firefox 141
// @author         Alice0775
// @version        2025/06/17 Bug 1959616
// @version        2025/02/26 fix bug
// @version        2025/01/29 remove async
// @version        2025/01/17 10:00
// @version        2024/08/23 00:00
// @version        2020/09/27 00:00
// ==/UserScript==
// We should only start the redirection if the browser window has finished
// starting up. Otherwise, we should wait until the startup is done.

(function () {
  const BUTTON_IDS = ['new-tab-button', 'alltabs-button'];
  let waiting = null;

  function onAuxClick(e) {
    if (e.button !== 1) return;
    const t = e.target;
    const ok = t.localName === 'arrowscrollbox' || t.localName === 'tabs' || t.localName === 'toolbarbutton';
    if (!ok) return;
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('History:UndoCloseTab').doCommand();
  }

  function attach() {
    gBrowser.tabContainer.addEventListener('auxclick', onAuxClick, true);
    for (const id of BUTTON_IDS) document.getElementById(id)?.addEventListener('auxclick', onAuxClick);
  }
  function detach() {
    gBrowser.tabContainer.removeEventListener('auxclick', onAuxClick, true);
    for (const id of BUTTON_IDS) document.getElementById(id)?.removeEventListener('auxclick', onAuxClick);
    if (waiting) {
      Services.obs.removeObserver(waiting, 'browser-delayed-startup-finished');
      waiting = null;
    }
  }

  if (gBrowserInit.delayedStartupFinished) {
    attach();
  } else {
    waiting = (subject, topic) => {
      if (topic === 'browser-delayed-startup-finished' && subject === window) {
        Services.obs.removeObserver(waiting, topic);
        waiting = null;
        attach();
      }
    };
    Services.obs.addObserver(waiting, 'browser-delayed-startup-finished');
  }
  window.ffuDisableScript?.(detach);
})();