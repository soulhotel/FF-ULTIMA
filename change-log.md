### <ins> FF Ultima Version 3.9 Release
- **⬇️ [Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/3.9/ffultima3.9.zip)** direct link.<!--- **⬇️ [Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)** direct link.-->
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://ff-ultima.github.io/docs/getting-started).
- ⚙️ [Change settings](https://ff-ultima.github.io/docs/category/settings), tab size, autohiding, spacing, and more.
- ⚙️ [How to Update](https://ff-ultima.github.io/docs/how-to/how-to-update) the theme to a new version.
  
### <ins> Version Notes
- This update brings some pretty cool new features with the help of some first time contributors seen below, a very good fix for sidebery users, and some other qol updates to the theme. You can find specific previews for each setting by clicking on it's wiki link below.
- User.js (recommended) not required.
- Firefox ~~143+~~ 138+ required.
<!--
- User.js required. 
- User.js not required.
- User.js (recommended) not required. 
-->

### <ins> Change Log:
- `fix • 🔴 •` Sidebery autohide positioning correction when using autohide settings. Thank you #370 @PONYMODZ
- `new • 🟢 •` Setting [`ultima.findbar.position.top`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#findbarpositiontop) positions the find bar on top of browser content #383 by @he23251
- `new • 🟢 •` Setting [`ultima.urlbar.scrollable`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimatabshorizontalfullwidth) let's you scroll through options within the urlbar
- `new • 🟢 •` Setting [`ultima.urlbar.focus.blur`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#urlbarfocusblur) blurs browser content when the urlbar is in focus
- `new • 🟢 •` Setting [`ultima.urlbar.focus.blur.all`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#urlbarfocusblurall) blurs everything except for the urlbar, when the urlbar is in focus #383 by @he23251
- `new • 🟢 •` Setting [`ultima.urlbar.focus.text.aligns.left`](https://ff-ultima.github.io/docs/settings/all/tab-settings#urlbarfocustextalignsleft) aligns urlbar text left when focused (even when text is centered) #383 by @he23251
- `new • 🟢 •` Setting [`ultima.navbar.text.for.icons`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbartextforicons) replaces navbar icons for text labels
- `new • 🟢 •` Setting [`ultima.navbar.update.ready.label`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbarupdatereadylabel) when a Firefox update is available, present an update text label
- `new • 🟢 •` Setting [`ultima.tab.focus.blur`](https://ff-ultima.github.io/docs/settings/all/tab-settings#tabfocusblur) when focus/hover over a tab, other tabs become blurred
- `new • 🟢 •` Setting [`ultima.tabs.horizontal.fullwidth`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabshorizontalfullwidth) to make horizontal tabs take up all available width
- `new • 🟢 •` Setting [`ultima.privatebrowsing.gradient.border`](https://ff-ultima.github.io/docs/settings/all/other-settings#privatebrowsinggradientborder) adds an animated border to private browser windows, making it very obvious which windows are private and which are not #383 by @he23251
- `qol • 🟡 •` Setting [`ultima.tabs.always.show.pinned`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsalwaysshowpinned) now also applies to horizontal tab layout 87adf51
- `qol • 🟡 •` MacOS handles fullscreen/maximized state differently than other OS's, so full screen compacting will also acknowledge that difference for MacOS (3.8+) #375
- `qol • 🟡 •` Tab group "counter" adjustment
- `qol • 🟡 •` Transparent color scheme adjustments #379 8bd577b
- `qol • 🟡 •` Unloaded tabs that are inside of tab groups now appear more opaque than before
- `qol • 🟡 •` Toolbar button badges have been restored/unmodified to default colors #382 568e62f
- `qol • 🟡 •` Add-on themes (when in light mode) see some improvement to menu contrast and accent color #383 e9ebb67
<!--
- `fyi • ℹ️ •`
- `fix • 🔴 •` 
- `new • 🟢 •` 
- `qol • 🟡 •` 
- `wip • ℹ️ •` 
-->

>

---

> ultima.navbar.text.for.icons

<img width="1655" height="54" alt="navbartextforicons" src="https://github.com/user-attachments/assets/2906f7a1-46bf-4a7e-a2d6-dfd75398d9fe" />

> ultima.findbar.position.top

![findbarontop](https://github.com/user-attachments/assets/afdf6bbe-996a-4b32-be76-27858bdc09e6)

> Setup: tabs.horizontal.fullwidth, tabs.belowURLbar, navbar.bookmarks.hide.icons, navbar.autohide

https://github.com/user-attachments/assets/f088369a-d4d0-48dd-ac16-129398969d47

> How Firefox's default Light theme looks now

https://github.com/user-attachments/assets/321f4280-47c0-4e7f-af73-a1202ae289b3

>

> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
