### <ins> FF Ultima Version 4.2 Release
- **⬇️ [Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/4.2/ffultima4.2.zip)** direct link.<!--- **⬇️ [Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)** direct link.-->
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://ff-ultima.github.io/docs/getting-started).
- ⚙️ [Change settings](https://ff-ultima.github.io/docs/category/settings), tab size, autohiding, spacing, and more.
- ⚙️ [How to Update](https://ff-ultima.github.io/docs/how-to/how-to-update) the theme to a new version.
  
### <ins> Version Notes
- This is mostly a fix and qol update. Big changes have been made to hiding the tab bar for both Sidebery and native vertical tab Users. Nightly Users can also see optimizations to the new Split View feature available in Firefox 146+
- User.js (recommended) not required.
- Firefox 138+ required.
<!--
- User.js required. 
- User.js not required.
- User.js (recommended) not required. 
-->

### <ins> Change Log
- `fyi • ℹ️ •` Setting `ultima.tabs.vertical.hide` and `hide.in.screenedge/screencorner` settings are no more.. The core logic has been rewritten and improved to no longer rely on expandonHover. Setting `ultima.tabs.tabbar.disabled` and `ultima.tabs.tabbar.autohide` replace them for way better performance and consistent completely-hidden tab autohiding. Both of these settings work for hiding both vertical and horizontal tab bars. See video below.
- `fix • 🔴 •` Sideberys tab text-labels see improved spacing and visibility when collapsed b56ec63
- `new • 🟢 •` Setting `ultima.tabs.tabbar.autohide` now handles autohiding the tabs bar.
- `new • 🟢 •` Setting `ultima.tabs.tabbar.disabled` will completely disable the tabs bar.
- `new • 🟢 •` Split View is coming to Firefox in Version 146, along with it comes some (5) [new settings](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabssplitviewcontentoutline). See video below c4a4401 89593ba 1d008ca
- `new • 🟢 •` Setting `ultima.tabs.hide.splitter` hides the resizable bar (splitter) that seperates pinned tabs and the tab button strip (when not hovered)
- `new • 🟢 •` Setting `ultima.navbar.autohide.ignore.urlbar` keeps the navbar hidden, when triggering the url bar #407
- `new • 🟢 •` Setting `ultima.tabs.pinned.transparent.background` removes the background color from pinned tabs
- `qol • 🟡 •` [Second Sidebar](https://github.com/aminought/firefox-second-sidebar) has some optimizations to work alongside FF Ultima #397
- `qol • 🟡 •` There is now an empty `customChrome.css` import in userChrome.css, this can be used to store custom styles alongside the theme
- `qol • 🟡 •` Some context menu items were previously hidden to declutter the menu's, this change has been reverted and limited to the `ultima.contextmenu.reduce.options` setting #405
- Setting `ultima.tabs.tabbar.hide.buttonstrip` replaces both `ultima.tabs.vertical.hide.the.bottom.buttons` and `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover` for a more simple execution
- `qol • 🟡 •` Nav bar download button indicator now adopts color scheme accent color when showing progress
- `qol • 🟡 •` Newtabbutton.on.top settings see some improved overall spacing, including adjustment to tabCounter when using the setting.

### <ins> Update Preview

https://github.com/user-attachments/assets/7577452c-c13c-4473-96f7-5664f2c1c22f

> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
