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
user_pref("ultima.tabs.autohide", true);
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

/*url bar*/
user_pref("ultima.urlbar.suggestions", true);
user_pref("ultima.urlbar.centered", true);
user_pref("ultima.urlbar.hidebuttons", false);
user_pref("ultima.xstyle.urlbar", false);

/*alternate styles*/
user_pref("ultima.spacing.compact", false);
user_pref("ultima.spacing.compact.tabs", false);
user_pref("ultima.xstyle.tabgroups.i", true);
user_pref("ultima.xstyle.tabgroups.ii", false);
user_pref("ultima.xstyle.containertabs.i", false);
user_pref("ultima.xstyle.containertabs.ii", false);
user_pref("ultima.xstyle.containertabs.iii", true);
user_pref("ultima.xstyle.pinnedtabs.i", false); 
user_pref("ultima.xstyle.private", false);
user_pref("ultima.xstyle.bookmarks.fading", false);

/*other*/
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
/*user_pref("widget.gtk.non-native-titlebar-buttons.enabled", false);*/

user_pref("sidebar.revamp", true);
user_pref("sidebar.verticalTabs", true);
user_pref("browser.tabs.groups.enabled", true);
user_pref("browser.tabs.hoverPreview.enabled", true);
user_pref("browser.newtabpage.activity-stream.newtabWallpapers.v2.enabled", false);
user_pref("media.videocontrols.picture-in-picture.enable-when-switching-tabs.enabled", false);

/*
enable userchrome,
disable about config warning,
enable browsertoolbox,
no need to jump through firefox settings,
turn on vertical tabs native feature,
disable newtab wallpapers,
etc
*/
