// ==UserScript==
// @name           mdlclick space to undo closed tab
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    Middleclick empty space in the tab container to undo closed tab
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
if (gBrowserInit.delayedStartupFinished) {
  gBrowser.tabContainer.addEventListener('click', ucjsUndoCloseTab, true);
  try {
    document.getElementById('new-tab-button').onclick = ucjsUndoCloseTab;
    document.getElementById('alltabs-button').onclick = ucjsUndoCloseTab;
  } catch(e) {}
} else {
  let delayedStartupFinished = (subject, topic) => {
    if (topic == "browser-delayed-startup-finished" &&
        subject == window) {
      Services.obs.removeObserver(delayedStartupFinished, topic);
      gBrowser.tabContainer.addEventListener('click', ucjsUndoCloseTab, true);
      try {
        document.getElementById('new-tab-button').onclick = ucjsUndoCloseTab;
        document.getElementById('alltabs-button').onclick = ucjsUndoCloseTab;
      } catch(e) {}
    }
  };
  Services.obs.addObserver(delayedStartupFinished,
                           "browser-delayed-startup-finished");
}

var ucjsUndoCloseTab = function(e) {
  Services.console.logStringMessage(e.target.localName);
    // Only with middle click
    if (e.button != 1) {
        return;
    }

    // Click on Tab bar and the New Tab buttons
    if ((e.target.localName != 'arrowscrollbox' && e.target.localName != 'tabs') && e.target.localName != 'toolbarbutton') {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("History:UndoCloseTab").doCommand()
}
