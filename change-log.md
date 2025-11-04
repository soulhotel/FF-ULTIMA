### <ins> FF Ultima Version 4.2 Release
- **⬇️ [Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/4.2/ffultima4.2.zip)** direct link.<!--- **⬇️ [Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)** direct link.-->
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://ff-ultima.github.io/docs/getting-started).
- ⚙️ [Change settings](https://ff-ultima.github.io/docs/category/settings), tab size, autohiding, spacing, and more.
- ⚙️ [How to Update](https://ff-ultima.github.io/docs/how-to/how-to-update) the theme to a new version.
  
### <ins> Version Notes
- This update focuses on qol changes. A couple of newly requested qol settings. And a big improvement to Native Tab Bar autohiding. Both Sidebery and Native vertical tab users can make the most of the new tab bar autohiding method. And Nightly Users (Firefox 146+) will be the first to see the new Split View feature with 5 new settings for split tabs.
- User.js (recommended) not required.
- Firefox 138+ required.
<!--
- User.js required. 
- User.js not required.
- User.js (recommended) not required. 
-->

### <ins> Change Log
- `fyi • ℹ️ •` Setting `ultima.tabs.vertical.hide` and `hide.in.screenedge/screencorner` settings are no more.. The core logic has been rewritten and improved to no longer rely on expandonHover. Settings `ultima.tabs.tabbar.disabled` and `ultima.tabs.tabbar.autohide` have replaced them for way better performance and consistent-completely-hidden tab autohiding. Both of these settings work for hiding both vertical and horizontal tab bars. See video below. #409
- `fix • 🔴 •` Sideberys tab text-labels see improved spacing and visibility when collapsed b56ec63
- `new • 🟢 •` Setting [`ultima.tabs.tabbar.autohide`](http://ff-ultima.github.io/docs/settings/tab-settings#ultimatabstabbardisabled--ultimatabstabbarautohide) now handles autohiding the tabs bar
- `new • 🟢 •` Setting [`ultima.tabs.tabbar.disabled`](http://ff-ultima.github.io/docs/settings/tab-settings#ultimatabstabbardisabled--ultimatabstabbarautohide) will completely disable the tabs bar
- `new • 🟢 •` A couple of (5) [split view settings](https://ff-ultima.github.io/docs/settings/tab-settings#ultimatabssplitviewcontentoutline) were added to the theme. See video below c4a4401 89593ba 1d008ca
- `new • 🟢 •` The new tab page [wallpaper switcher](https://ff-ultima.github.io/docs/settings/wallpaper-settings) now features a Color Scheme wallpaper section
- `new • 🟢 •` Setting [`ultima.tabs.hide.splitter`](http://ff-ultima.github.io/docs/settings/tab-settings#ultimatabshidesplitter) hides the tabs bar resizable bar (splitter) (when not hovered) #406 34f6932
- `new • 🟢 •` Setting [`ultima.navbar.autohide.ignore.urlbar`](http://ff-ultima.github.io/docs/settings/topbar-settings#ultimanavbarautohideignoreurlbar) keeps the nav hidden when triggering the url bar #407 283461e
- `new • 🟢 •` Setting [`ultima.tabs.pinned.transparent.background`](http://ff-ultima.github.io/docs/settings/tab-settings#ultimatabspinnedtransparentbackground) removes the background color from pinned tabs
- `qol • 🟡 •` [Second Sidebar](https://github.com/aminought/firefox-second-sidebar) has some optimizations to work alongside FF Ultima #397
- `qol • 🟡 •` There is now an empty `customChrome.css` import in userChrome.css, it can be used to store personal CSS
- `qol • 🟡 •` Some context menu items were previously hidden to declutter the menu's, this change has been reverted and limited to the `ultima.contextmenu.reduce.options` setting #405
- `qol • 🟡 •` Setting [`ultima.tabs.tabbar.hide.buttonstrip`](http://ff-ultima.github.io/docs/settings/tab-settings#ultimatabstabbarhidebuttonstrip) replaces both `ultima.tabs.vertical.hide.the.bottom.buttons` and `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover` for a more simple execution
- `qol • 🟡 •` Nav bar download button indicator now adopts color scheme accent color when showing progress
- `qol • 🟡 •` Newtabbutton.on.top settings see some improved overall spacing, including adjustment to tabCounter when using the setting.
- `qol • 🟡 •` Bookmarks Sidebar adjustments to tree item styling, and removal of the bottom margin #412 bcfc7f3
- `qol • 🟡 •` Adjustments to bookmarks panel theming in regards to recent Firefox update #412 bcfc7f3
- `qol • 🟡 •` Sidebar Inner context menu consistent-to-theme-styling #412 bcfc7f3

### <ins> Update Preview

https://github.com/user-attachments/assets/7577452c-c13c-4473-96f7-5664f2c1c22f

> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
