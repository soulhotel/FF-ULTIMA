"use strict";
// ==UserScript==
// @name            Sidebar Auto-Hide
// @author          Taylore Thornton
// @version         0.1
// @description     Patches the sidebar to allow you to auto-hide it once more!
// @include         main
// @startup         UC.sidebarAutoHide.startup(win);
// @shutdown        UC.sidebarAutoHide.shutdown(win);
// @onlyonce
// ==/UserScript==

UC.sidebarAutoHide = {

    originalHandler: null,

    startup: function (window) {
        console.log('starting up...');
        window.SidebarController._initDeferred.promise.then(() => window.SidebarController._state.__defineSetter__('launcherWidth', function(val) {
            // Doesn't seem like we need anything here to make this work.
        })); 
    },

    shutdown: function (window) {
        console.log('shutting down...');
        window.SidebarController._state.__defineSetter__('launcherWidth', window.SidebarController.SidebarState.prototype.__lookupSetter__('launcherWidth')); 
    }
}
