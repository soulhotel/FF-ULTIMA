### <ins> FF Ultima Version 4.1 Release
- **⬇️ [Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/4.1/ffultima4.1.zip)** direct link.<!--- **⬇️ [Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)** direct link.-->
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
- `fix • 🔴 •` Sidebery tab text labels, spacing and visibility when collapsed b56ec63
- `fix • 🔴 •` Setting `ultima.tabs.vertical.hide` and `hide.in.screenedge/screencorner` settings are no more.. The core logic has been rewritten and improved to no longer rely on expandonHover.
- `new • 🟢 •` Setting `ultima.tabs.tabbar.autohide` now handles autohiding the tabs bar.
- `new • 🟢 •` Setting `ultima.tabs.tabbar.disabled` will completely disable the tabs bar.
- Both of these settings above work for both vertical and horizontal tabs bars.And can be used reliably for both sidebery only users, or those that just want the tab bar hidden completely. See video below.
- `new • 🟢 •` Split View is coming to Firefox in Version 146, along with it comes some (5) new settings. See video below or wiki c4a4401 89593ba 1d008ca
- `new • 🟢 •` Setting `ultima.tabs.hide.splitter` hides the resizable bar (splitter) after pinned tabs and before the tabs button strip (when not hovered)
- `qol • 🟡 •` [Second Sidebar](https://github.com/aminought/firefox-second-sidebar) has some optimizations to work alongside the theme #397
- `qol • 🟡 •` There is now an empty `customChrome.css` import in userChrome.css, this can be used to store custom styles alongside the theme
- `qol • 🟡 •` Some context menu items were previously hidden to declutter the menu's, this change has been reverted and limited to the `ultima.contextmenu.reduce.options` setting #405
- Setting `ultima.tabs.tabbar.hide.buttonstrip` replaces both `ultima.tabs.vertical.hide.the.bottom.buttons` and `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover` for a more simple execution
<!--
- `fyi • ℹ️ •` 
- `fix • 🔴 •` 
- `new • 🟢 •` 
- `qol • 🟡 •` 
- `wip • ℹ️ •` 
-->

### <ins> Setup

sidebar.seperator, navbar.autohide, navbar.bookmarks.focus.blur, tabs.multiline.labels, tabs.tabCounter, urlbar.float, ultima.urlbar.focus.blur

![walls](https://github.com/user-attachments/assets/16fcccab-1934-4b2b-aa51-f8923ee7f254)

> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
