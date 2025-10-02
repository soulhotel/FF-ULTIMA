// ==UserScript==
// @name            toggle expand on hover in right click menu
// @author          soulhotel
// @description     right click tab container to toggle expand on hover
// @include         main
// @include         *
// @shutdown        UC.ToggleExpandOnHover.destroy();
// @onlyonce
// ==/UserScript==

// created with https://github.com/mozilla/gecko-dev/blob/master/browser/components/sidebar/tests/browser/browser_sidebar_expand_on_hover.js

UC.ToggleExpandOnHover = {
    isHoverEnabled: false,
    init: function () {
        let win = Services.wm.getMostRecentWindow("navigator:browser");
        if (!win) return;
        let doc = win.document;
        let menu = doc.getElementById("toolbar-context-menu");
        if (!menu || doc.getElementById("uc-toggle-expandOnHover")) return;
        let item = doc.createXULElement("menuitem");
        item.id = "uc-toggle-expandOnHover";
        item.setAttribute("label", "Toggle Expand on Hover");
        item.setAttribute("tooltiptext", "Enable/Disable native sidebar expand on hover");
        item.addEventListener("command", () => {
            let sidebar = win.SidebarController;
            if (!sidebar) {
                console.warn("SidebarController not available, trying global SidebarController");
                sidebar = SidebarController;
                if (!sidebar) {
                    console.error("SidebarController not found");
                    return;
                }
            }
            // Toggle the native behavior
            // May need panel.expandOnHoverInput.click() for persistence (as if clicking the option in sidebar settings)
            this.isHoverEnabled = !this.isHoverEnabled;
            sidebar.toggleExpandOnHover(this.isHoverEnabled);
            console.log("Native expand-on-hover behavior toggled to:", this.isHoverEnabled);
        });

        let refItem = doc.getElementById("toolbar-context-customize-sidebar");
        if (refItem && refItem.parentElement) {
            menu.insertBefore(item, refItem);
        } else {
            menu.appendChild(item);
        }
    },

    destroy: function () {
        let win = Services.wm.getMostRecentWindow("navigator:browser");
        if (!win) return;
        let doc = win.document;
        let item = doc.getElementById("uc-toggle-expandOnHover");
        if (item) item.remove();
        delete UC.ToggleExpandOnHover;
    }
};

UC.ToggleExpandOnHover.init();