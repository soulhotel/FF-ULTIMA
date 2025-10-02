// ==UserScript==
// @name          dont focus when dragging tab
// @namespace     http://space.geocities.yahoo.co.jp/gl/alice0775
// @description   when dragging a tab to rearrange position, do not select it
// @include       main
// @async          true
// @compatibility Firefox 140
// @version        2025/09/19 fix an issue where slightly dragging a loaded, non-selected tab would cause it to be discarded.
// @version        2025/06/30 fix advanceSelectedTab does not work
// @version        2025/03/07 fix bug of select tab
// @version        2025/03/05 fix under sidebar.verticalTabs=true
// @version        2020/09/20 workarround for Bug 1590573
// @version        2019/11/14 workarround for busy icon
// @version        2019/11/14 wait for init gBrowser
// @version        2019/02/22 00:00 fix 67 Bug 675539 - Make tab discard functionality work on tab object directly
// @version       2018/12/26 11:50 ignore close button 
// @version       2018/10/03 23:00 more aggressive pending tab 
// @version       2018/10/03 19:00 fix should not react on newtab button and other button, wip
// @version       2018/10/03 00:20 fix do not load tab when if it is pending background tab, wip
// @version       2018/10/02 23:10 fix do not select tab when right click, wip
// @version       2018/10/02 23:00 fix do not select tab when click on speeker icon, wip
// @version       2018/10/02 wip
// @todo          should investigate side effects due to event.stopPropagation when mousedown
// ==/UserScript==
let do_not_select_tab_when_mousedown = {
  init: function() {
    gBrowser.tabContainer.addEventListener("mousedown", this, true);
    window.addEventListener("unload", this. false);
    gBrowser.explicitUnloadTabs2 = async function explicitUnloadTabs2(aTab, discarded){
      await gBrowser.explicitUnloadTabs([aTab]);
      if (!discarded)
        aTab.removeAttribute("discarded");
      else
        aTab.setAttribute("discarded", "");
    }
  },

  uninit() {
    gBrowser.tabContainer.removeEventListener("mousedown", this, true);
    window.removeEventListener("unload", this. false);
 },

  onselect: function(event) {
    if (event.target == gBrowser.tabpanels) {
      console.log("cancel select");
      //event.stopPropagation(); 
      let that = do_not_select_tab_when_mousedown;
      console.log(that._mousedownTab);
      gBrowser.selectedTab = that._selectedTab;
      gBrowser.explicitUnloadTabs2(that._mousedownTab, that._discarded);
    }
  },

  _mousedownTab : null,
  _mousedownTimer: null,
  _selectedTab: null,
  _pending: null,
  _discarded: null,
  
  handleEvent(event) {
    let tab, selectedTab;
    switch(event.type) {
      case "unload":
        this.uninit();
        break;
      case "mousedown":
        if (event.button != 0)
          return;
        tab = event.originalTarget;
        if (tab.classList.contains("tab-icon-sound")) {
          //console.log("tab-icon-sound")
          return;
        }
        if (tab.classList.contains("tab-close-button")) {
          //console.log("tab-close-button")
          return;
        }
        tab = event.target.closest('tab');
        if (!tab)
          return;
        //console.log("tab")
        if (tab.selected || !(tab.hasAttribute("discarded") || tab.hasAttribute("pending")))
          return;
        if (event.button == 0 && !tab.selected && (event.ctrlKey || event.shiftKey))
          break;
        this._selectedTab = gBrowser.selectedTab;
        this._mousedownTab = tab;
        this._pending = tab.hasAttribute("pending");
        this._discarded = tab.hasAttribute("discarded");
        // xxx should investigate side effects due to event.stopPropagation when mousedown
        event.stopPropagation(); 
        tab.addEventListener("dragstart", this, true);
        tab.addEventListener("mouseup", this, true);

        //console.log("mousedown event.stopPropagation()")
        break;
      case "dragstart":
        if (!this._mousedownTab)
          break;
        gBrowser.tabpanels.addEventListener("select", this.onselect, {once: true, capture: true});        
        this._mousedownTimer = setTimeout(() => {
          gBrowser.tabpanels.removeEventListener("select", this.onselect, {once: true, capture: true});
        }, 0);

        this._mousedownTab.removeEventListener("dragstart", this, true);
        this._mousedownTab.removeEventListener("mouseup", this, true);
        //console.log("dragstart")

        break;
      case "mouseup":
        if (event.button != 0)
          return;
        if (!this._mousedownTab)
          break;
        this._mousedownTab.removeEventListener("dragstart", this, true);
        this._mousedownTab.removeEventListener("mouseup", this, true);
        gBrowser.tabpanels.removeEventListener("select", this.onselect, {once: true, capture: true});
        tab = event.target.closest('tab');
        if (!tab)
          return;
        let originalTarget = event.originalTarget;
        let soundPlayingIcon = tab.soundPlayingIcon;
        let overlayIcon = tab.overlayIcon;
        //console.log(this._mousedownTab == tab)
        //console.log(!(soundPlayingIcon == originalTarget || overlayIcon == originalTarget))
        if (this._mousedownTab == tab &&
            !(soundPlayingIcon == originalTarget || overlayIcon == originalTarget)) {
          console.log("mouseup selected "+tab.label)
          gBrowser.selectedTab = tab;
          if (tab.selected && this._mousedownTimer) {
            gBrowser.updateCurrentBrowser();
            console.log("updateCurrentBrowser "+tab.label)
          }
          this._mousedownTimer = null;
        }
        break;
    }
  },
}


// We should only start the redirection if the browser window has finished
// starting up. Otherwise, we should wait until the startup is done.
if (gBrowserInit.delayedStartupFinished) {
  do_not_select_tab_when_mousedown.init();
} else {
  let delayedStartupFinished = (subject, topic) => {
    if (topic == "browser-delayed-startup-finished" &&
        subject == window) {
      Services.obs.removeObserver(delayedStartupFinished, topic);
      do_not_select_tab_when_mousedown.init();
    }
  };
  Services.obs.addObserver(delayedStartupFinished,
                           "browser-delayed-startup-finished");
}
