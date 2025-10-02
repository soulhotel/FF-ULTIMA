// ==UserScript==
// @name            Custom New/Close Tab Button
// @author          he23251
// @description     Left click → new tab, Middle/Right click → close tab
// @include         main
// @shutdown        UC.CustomNewTabButton.destroy();
// @onlyonce
// ==/UserScript==

// Custom New Tab Button Script
//
// left-click on custom new tab button: opens a new tab
// middle-click/right-click on custom new tab button: closes the current tab

UC.CustomNewTabButton = {
    init: function () {
        this.STYLE = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
            @-moz-document url('${_uc.BROWSERCHROME}') {
                #custom-newtab-button .toolbarbutton-icon {
                    list-style-image: url(chrome://global/skin/icons/plus.svg);
                    fill: var(--toolbar-color);
                }
            }
        `));

        _uc.sss.loadAndRegisterSheet(this.STYLE, _uc.sss.USER_SHEET);
        const { CustomizableUI } = window;
        if (CustomizableUI.getWidget('custom-newtab-button')?.provider) {
            console.log('Widget custom-newtab-button already exists, skipping creation.');
            return;
        }
        CustomizableUI.createWidget({
            id: 'custom-newtab-button',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function (doc) {
                let node = _uc.createElement(doc, 'toolbarbutton', {
                    id: 'custom-newtab-button',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: 'New Tab',
                    tooltiptext: 'Left: New Tab | Middle/Right: Close Tab',
                });
                // Left click → new tab, Middle click → close tab
                node.addEventListener('click', function (event) {
                    let win = event.target.ownerGlobal;
                    if (event.button === 0) {
                        const broadcaster = win.document.getElementById('cmd_newNavigatorTab');
                        if (broadcaster) {
                            broadcaster.doCommand();
                        }
                    } else if (event.button === 1) {
                        win.gBrowser.removeCurrentTab();
                    }
                });
                node.addEventListener('contextmenu', function (event) {
                    event.preventDefault();
                    let win = event.target.ownerGlobal;
                    win.gBrowser.removeCurrentTab();
                });
                return node;
            }
        });
    },
    destroy: function () {
        let win = Services.wm.getMostRecentBrowserWindow();
        win.CustomizableUI.destroyWidget('custom-newtab-button');
        _uc.sss.unregisterSheet(this.STYLE, _uc.sss.USER_SHEET);
        delete UC.CustomNewTabButton;
    }
};

UC.CustomNewTabButton.init();