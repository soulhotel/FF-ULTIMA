### <ins> FF Ultima Version 2.2 Release
- **[Click Me ⬇️ Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/2.2/ffultima2.2.zip)** - **[Click Me ⬇️ Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)**
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki).
- ⚙️ [Change settings](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings), tab size, autohiding, spacing, and more.
- ⚙️ How to [Update the Theme](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme) to a new version.
  
### <ins> Version Notes
- Once again, a big Thank You, to everyone that's been reporting issues to me early. You guys are the ones keeping the theme one step ahead. Same goes for those who made recommendations that I've been able to incorporate into the theme, thank you for the contributions. 🎉 @dreadbalaur 🎉 @ApenasOLinco 🎉 @whatsnewsisyphus 🎉 @alexacon 🎉 @ShKev03
- User.js required.
- Firefox 138+ required.


<details><summary>Settings have been changed! (returning Users please click here) ⚠️</summary>
  
>
- Theme settings were a bit of a mess. `1`, Some settings had names that were confusing for what they do. `2`, Some settings were not organized in their relevant sections. Ive made some modifications to fix those two issues once and for all. Please delete these old setting names in your about config page.

![image](https://github.com/user-attachments/assets/e8fcd7f0-1e13-431e-b3de-765545c444bd)

| Old Setting                                      | New Setting                                       |
|--------------------------------------------------|---------------------------------------------------|
| ultima.disable.verticaltab.bar                   | ultima.tabs.vertical.hide                         |
| ultima.disable.verticaltab.bar.withindicator     | ultima.tabs.vertical.hide.in.screencorner         |
| ultima.disable.verticaltab.bar.withindicator     | ultima.tabs.vertical.hide.in.screenedge (new)     |
| ultima.theme.extensions                                        | ultima.navbar.theme.extensionspanel |
| ultima.xstyle.bookmarks.autohide                                  | ultima.navbar.bookmarks.autohide |
| ultima.xstyle.bookmarks.centered                                  | ultima.navbar.bookmarks.centered |
| ultima.xstyle.bookmarks.fading                                      | ultima.navbar.bookmarks.fadout |
| ultima.xstyle.newtabbutton.ontop.i                                | ultima.tabs.newtabbutton.ontop.1 |
| ultima.xstyle.newtabbutton.ontop.ii                               | ultima.tabs.newtabbutton.ontop.2 |
| ultima.xstyle.pinnedtabs.i                                                | ultima.tabs.pinnedtabs.1 |
| ultima.xstyle.tabgroups.i                                            | ultima.tabs.tabgroups.label.1 |
| ultima.xstyle.tabgroups.ii                                           | ultima.tabs.tabgroups.label.2 |
| ultima.xstyle.tabgroups.with.colormix                           | ultima.tabs.tabgroups.background.1 |
| ultima.xstyle.tabgroups.with.colormix.ii                  | ultima.tabs.tabgroups.background.2 (new) |
| ultima.xstyle.urlbar | ultima.urlbar.transparent                                                     |

</details>


### <ins> Change Log:
- `fyi • ℹ️ • ` If you depend on Sidebery, please visit [the Sidebery Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/Sidebery-Configuration)
- `fyi • ℹ️ • ` File `function-urlbar.css` --renamed--> `theme-urlbar.css` 29ee54a 00b5eb8
- `fix • 🔴 • ` Much of the global positioning logic needed to be improved, and so revisions have begun. Positioning of margins, borders, spacing between sidebars, are the best they've ever been.
- `fix • 🔴 • ` Color scheme creation tutorial link fix @ApenasOLinco #296
- `new • 🟢 • ` Setting `ultima.tabs.vertical.hide.in.screenedge` fully hide the vertical tabs, hovering the screen edge will expand them
- `new • 🟢 • ` Setting `ultima.xstyle.tabgroups.background.2` a new background style for grouped tabs
- `new • 🟢 • ` Setting `ultima.urlbar.animate.open` urlbar animates height when first opened/triggered 0b40670
- `new • 🟢 • ` Setting `ultima.xstyle.highlight.aboutconfig` now matches aboutconfig page colors to color scheme, tab border also removed
- `new • 🟢 • ` Settings `ultima.spacing.compact.contextmenu`/`ultima.spacing.relaxed.contextmenu` to change context menu spacing 8c208c2
- `new • 🟢 • ` Setting `ultima.navbar.hidebuttons` to hide all navbar buttons excluding menus that are triggered, or download button when downloading d82e1cc
- `qol • 🟡 • ` The `Unload Tab` context menu option has been in firefox for a long time, for some reason this option is disabled in some instances. It is now forcefully enabled in the theme e63a57a
- `qol • 🟡 • ` As of Firefox 140, pinned tabs are now limited to a scrollable box with limited size. I've reverted this change *inside of* `ultima.tabs.pinnedtabs.style.1` 899e820
- `qol • 🟡 • ` Tab Groups visual optimization

> Vertical Tab Hide Settings

https://github.com/user-attachments/assets/20241a30-a7c5-4430-a6b5-ad65433005f9

> Navbar hide buttons

![navbar hide buttons](https://github.com/user-attachments/assets/a6b169c5-a16f-46f3-bbd9-79c9ef654fa0)

> Context Menu Spacing

![context menu spacing](https://github.com/user-attachments/assets/5632017f-518c-4e00-b3ef-6d8cf58c0085)

> Aboutconfig adaptive colors

![Vid_20250514_045957](https://github.com/user-attachments/assets/7cf5bfe7-f2a7-4d4a-90fb-e0781476c972)

![image](https://github.com/user-attachments/assets/72247b14-67e3-4043-b061-0df6ed11e36a)

> Preview of ultima.spacing.relaxed Setting. Trying to make something "comfy" for Fullscreen/Ultrawide/Split-View enjoyers like myself. Still in a design stage but recommendations are welcome.

![Screenshot_20250520_225549](https://github.com/user-attachments/assets/dd41b966-c48e-405d-8378-30d76fc19734)


> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
