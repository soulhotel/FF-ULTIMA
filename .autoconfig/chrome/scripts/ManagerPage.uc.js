// ==UserScript==
// @name            userChrome Manager Page
// @author          soulhotel
// @description     Page to manage everything userchromejs
// @include         main
// @shutdown        UC.ManagerPage.destroy();
// @onlyonce
// ==/UserScript==

UC.ManagerPage = {
    init: function () {
        // Load toolbar button CSS
        this.STYLE = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent(`
            @-moz-document url('${_uc.BROWSERCHROME}') {
                #userChromeManager-btn .toolbarbutton-icon {
                    list-style-image: url(chrome://global/skin/icons/settings.svg);
                    fill: var(--toolbar-color);
                }
            }
        `));
        _uc.sss.loadAndRegisterSheet(this.STYLE, _uc.sss.USER_SHEET);
        const { CustomizableUI } = window;

        // Toolbar button
        CustomizableUI.createWidget({
            id: 'userChromeManager-btn',
            type: 'custom',
            defaultArea: CustomizableUI.AREA_NAVBAR,
            onBuild: function (doc) {
                let btn = _uc.createElement(doc, 'toolbarbutton', {
                    id: 'userChromeManager-btn',
                    class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                    label: 'userChrome Manager',
                    tooltiptext: 'Open userChrome Manager',
                });
                btn.addEventListener('click', () => {
                    UC.ManagerPage.openManagerPage();
                });
                return btn;
            }
        });

        // Hamburger menu button
        window.addEventListener('load', () => {
            const document = window.document;
            const menu = document.getElementById('appMenu-viewCache')?.content || document.getElementById('appMenu-multiView') || document.getElementById('appMenu-mainView');
            if (!menu) return;
            if (menu.querySelector('#appMenu-userChromeManager-btn')) return;

            const btn = document.createXULElement('toolbarbutton');
            btn.id = 'appMenu-userChromeManager-btn';
            btn.className = 'subviewbutton subviewbutton-iconic';
            btn.setAttribute('label', 'userChrome Manager');
            btn.style.listStyleImage = 'url(chrome://global/skin/icons/settings.svg)';
            btn.setAttribute('closemenu', 'none');
            btn.addEventListener('command', () => UC.ManagerPage.openManagerPage());

            const addonsButton = document.getElementById('appMenu-extensions-themes-button') ??
                                document.getElementById('appmenu_addons') ??
                                menu.querySelector('#appMenu-extensions-themes-button');
            const profileButton = document.getElementById('appMenu-profiles-button');
            if (profileButton && profileButton.parentElement) {
                profileButton.parentElement.insertBefore(btn, profileButton.nextSibling);
            } else if (addonsButton && addonsButton.parentElement) {
                addonsButton.parentElement.insertBefore(btn, addonsButton);
            } else {
                menu.appendChild(btn); // fallback
            }
        });

    },

    openManagerPage: function () {
        let win = Services.wm.getMostRecentBrowserWindow();
        win.gBrowser.selectedTab = win.gBrowser.addTrustedTab("chrome://userchromemanager/content/userChromeManager.html");
    },

    destroy: function () {
        let win = Services.wm.getMostRecentBrowserWindow();
        if (win) CustomizableUI.destroyWidget('userChromeManager-btn');
        _uc.sss.unregisterSheet(this.STYLE, _uc.sss.USER_SHEET);
        delete UC.ManagerPage;
    }
};

UC.ManagerPage.init();
