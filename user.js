/*///////////////////////////////////////////////////////////////////////////////////////\

┏┓┏┓  ┳┳┓ ┏┳┓┳┳┳┓┏┓
┣ ┣   ┃┃┃  ┃ ┃┃┃┃┣┫
┻ ┻   ┗┛┗┛ ┻ ┻┛ ┗┛┗
                   
FF Ultima:         https://github.com/soulhotel/FF-ULTIMA
Wiki:              https://github.com/soulhotel/FF-ULTIMA/wiki
Latest Version:    https://github.com/soulhotel/FF-ULTIMA/releases/latest                 
License:           MPL 2.0 https://github.com/soulhotel/FF-ULTIMA/blob/main/LICENSE

\////////////////////////////////////////////////////////////////////////////////////////*/

/*color schemes*/
user_pref("user.theme.dark.a", true); /*default dark mode*/
user_pref("user.theme.light.a", true); /*default light mode*/
user_pref("user.theme.adaptive", false); /*adaptive, wip*/
user_pref("user.theme.dark.catppuccin", false);
user_pref("user.theme.dark.catppuccin-mocha", false); /*by Draff*/
user_pref("user.theme.dark.gruvbox", false);
user_pref("user.theme.light.gruvbox", false);
user_pref("user.theme.dark.midnight", false);

/*titlebar and tabs*/
user_pref("ultima.disable.alltabs.button", true);
user_pref("ultima.disable.windowcontrols.button", false);
user_pref("ultima.disable.verticaltab.bar", false);
user_pref("ultima.disable.verticaltab.bar.withindicator", false);
user_pref("ultima.tabs.autohide", true);
user_pref("ultima.tabs.belowURLbar", true);
user_pref("ultima.tabs.width.small", false);
user_pref("ultima.tabs.width.medium", true);
user_pref("ultima.tabs.width.large", false);
user_pref("ultima.tabs.width.huge", false);
user_pref("ultima.spacing.compact.tabs", false);

/*sidebar*/
user_pref("ultima.sidebar.autohide", false);
user_pref("ultima.sidebery.autohide", true);
user_pref("ultima.sidebar.hidden", false);
user_pref("ultima.sidebar.longer", true);

/*extra theming*/
user_pref("ultima.theme.extensions", true);
user_pref("ultima.theme.icons", true);
user_pref("ultima.theme.menubar", true);
user_pref("ultima.theme.color.swap", false);

/*url bar*/
user_pref("ultima.navbar.autohide", false);
user_pref("ultima.urlbar.suggestions", true);
user_pref("ultima.urlbar.centered", true);
user_pref("ultima.urlbar.hidebuttons", false);
user_pref("ultima.xstyle.urlbar", false);

/*alternate styles*/
user_pref("ultima.spacing.compact", false);
user_pref("ultima.xstyle.tabgroups.i", true);
user_pref("ultima.xstyle.tabgroups.ii", false);
user_pref("ultima.xstyle.containertabs.i", false);
user_pref("ultima.xstyle.containertabs.ii", false);
user_pref("ultima.xstyle.containertabs.iii", true);
user_pref("ultima.xstyle.pinnedtabs.i", false); 
user_pref("ultima.xstyle.private", false);
user_pref("ultima.xstyle.bookmarks.fading", false);

/*other*/
user_pref("nightly.override", true);
user_pref("browser.aboutConfig.showWarning", false);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.prompt-connection", false);
user_pref("svg.context-properties.content.enabled", true);
user_pref("layout.css.has-selector.enabled", true);
user_pref("toolkit.tabbox.switchByScrolling", false);
user_pref("widget.gtk.ignore-bogus-leave-notify", 1);
user_pref("widget.gtk.rounded-bottom-corners.enabled", true);
user_pref("widget.gtk.native-context-menus", false);
user_pref("sidebar.revamp", true);
user_pref("sidebar.verticalTabs", true);
user_pref("browser.tabs.groups.enabled", true);
user_pref("browser.tabs.hoverPreview.enabled", true);
user_pref("browser.newtabpage.activity-stream.newtabWallpapers.v2.enabled", false);
user_pref("media.videocontrols.picture-in-picture.enable-when-switching-tabs.enabled", false);

/*accessibility*/
user_pref("findbar.highlightAll", true); 
user_pref("browser.tabs.insertAfterCurrent", true);
user_pref("browser.bookmarks.openInTabClosesMenu", false);
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
user_pref("full-screen-api.warning.timeout", 0);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("network.http.max-connections", 300);
user_pref("browser.urlbar.suggest.calculator", false);
user_pref("apz.overscroll.enabled", true);
user_pref("general.smoothScroll", true);
user_pref("general.smoothScroll.msdPhysics.enabled", true);

/*privacy*/
user_pref("browser.send_pings", false); 
user_pref("dom.event.clipboardevents.enabled", false); /* clipboard telemetry */
user_pref("dom.battery.enabled", false); /* battery telemetry.. */
user_pref("extensions.pocket.enabled", false); 
user_pref("datareporting.healthreport.uploadEnabled", false);
