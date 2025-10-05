### <ins> FF Ultima Version 4.0 Release
- **⬇️ [Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/4.0/ffultima4.0.zip)** direct link.<!--- **⬇️ [Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)** direct link.-->
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://ff-ultima.github.io/docs/getting-started).
- ⚙️ [Change settings](https://ff-ultima.github.io/docs/category/settings), tab size, autohiding, spacing, and more.
- ⚙️ [How to Update](https://ff-ultima.github.io/docs/how-to/how-to-update) the theme to a new version.
  
### <ins> Version Notes
- Happy Sunday! This update brings some pretty cool new features with the help of some first time contributors. A very good fix for sidebery users and add-on theme users. And some other qol updates to the theme. You can find specific previews for each setting by clicking on their wiki link below.
- User.js (recommended) not required.
- Firefox ~~143+~~ 138+ required.
<!--
- User.js required. 
- User.js not required.
- User.js (recommended) not required. 
-->

### <ins> Change Log
- `fyi • ℹ️ •` The [wiki](https://ff-ultima.github.io/) now has extensive search/searchbar capabilities, thanks to [Algolia](https://docsearch.algolia.com/)
- `fix • 🔴 •` Sidebery autohide positioning correction when using autohide settings. Thank you #370 @PONYMODZ
- `fix • 🔴 •` MacOS handles fullscreen/maximized state differently than other OS's, so full screen compacting will also acknowledge that difference for Mac #375
- `new • 🟢 •` Setting [`ultima.findbar.position.top`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimafindbarpositiontop) positions the find bar on top of browser content #383 by @he23251
- `new • 🟢 •` Setting [`ultima.findbar.disable.background.image`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimafindbardisablebackgroundimage) this setting hides the background image that some add-on themes attached to the findbar, often these images don't blend with the themes rounded appearance. Using `spacing.compact` is another solution to this issue. The disabled background also fixes add on themes that produce a different solid color than the overall browser color.
- `new • 🟢 •` Setting [`ultima.urlbar.scrollable`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimatabshorizontalfullwidth) let's you scroll through options within the urlbar
- `new • 🟢 •` Setting [`ultima.urlbar.focus.blur`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarfocusblur) blurs browser content when the urlbar is in focus
- `new • 🟢 •` Setting [`ultima.urlbar.focus.blur.all`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarfocusblurall) blurs everything except for the urlbar, when the urlbar is in focus #383 by @he23251
- `new • 🟢 •` Setting [`ultima.urlbar.focus.text.aligns.left`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimaurlbarfocustextalignsleft) aligns urlbar text left when focused (even when text is centered) #383 by @he23251
- `new • 🟢 •` Setting [`ultima.navbar.text.for.icons`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbartextforicons) replaces navbar icons for text labels
- `new • 🟢 •` Setting [`ultima.navbar.update.ready.label`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbarupdatereadylabel) when a Firefox update is available, present an update text label
- `new • 🟢 •` Setting [`ultima.tabs.focus.blur`](https://ff-ultima.github.io/docs/settings/all/tab-settings#tabfocusblur) when focus/hover over a tab, other tabs become blurred
- `new • 🟢 •` Setting [`ultima.tabs.horizontal.fullwidth`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabshorizontalfullwidth) to make horizontal tabs take up all available width
- `new • 🟢 •` Setting [`ultima.privatebrowsing.gradient.border`](https://ff-ultima.github.io/docs/settings/all/other-settings#ultimaprivatebrowsinggradientborder) adds an animated border to private browser windows, making it very obvious which windows are private and which are not #383 by @he23251
- `new • 🟢 •` Setting [`ultima.navbar.bookmarks.tab.indicator`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbarbookmarkstabindicator) adds an outline to browser content when the currently selected tab is bookmarked
- `qol • 🟡 •` Setting [`ultima.tabs.always.show.pinned`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsalwaysshowpinned) now also applies to horizontal tab layout 87adf51
- `qol • 🟡 •` Tab group "counter" adjustment
- `qol • 🟡 •` Transparent color scheme adjustments #379 8bd577b
- `qol • 🟡 •` Unloaded tabs that are inside of tab groups now appear more opaque than before
- `qol • 🟡 •` Toolbar button badges have been restored/unmodified to default colors #382 568e62f
- `qol • 🟡 •` Add-on themes (when in light mode) see some improvement to menu contrast and accent color #383 e9ebb67
- `qol • 🟡 •` All tab groups and container tabs related code has been moved to `settings-tabs-group-and-containers.css` for organization
<!--
- `fyi • ℹ️ •` 
- `fix • 🔴 •` 
- `new • 🟢 •` 
- `qol • 🟡 •` 
- `wip • ℹ️ •` 
-->

### <ins> Setup

findbar.position.top, navbar.autohide, urlbar.focus.blur, tabs.multiline.labels

![preview4settings](https://github.com/user-attachments/assets/d0089078-f543-44df-81a0-80bd45853ca8)
<!-- ![findbarontop](https://github.com/user-attachments/assets/afdf6bbe-996a-4b32-be76-27858bdc09e6) -->


> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
