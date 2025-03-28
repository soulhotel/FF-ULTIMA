### <ins> FF Ultima Version 1.9.9 Release
- **[Click Me ⬇️ Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/1.9.9/ffultima1.9.9.zip)**
- **[Click Me ⬇️ Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)**
- ⬇️ Please follow the [installation instructions](https://github.com/soulhotel/FF-ULTIMA#installation) on main page.
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki).
- ⚙️ [Change settings](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings), tab size, autohiding, spacing, and more.
- 🎨 Learn how to [create a Color Scheme](https://github.com/soulhotel/FF-ULTIMA/wiki/Create-a-Color-Scheme) like [Catppuccin](https://github.com/soulhotel/FF-ULTIMA/blob/next-release/theme/color-schemes/catppuccin/readme.md) or [Gruvbox](https://github.com/soulhotel/FF-ULTIMA/blob/next-release/theme/color-schemes/gruvbox-light/readme.md).

### <ins> Version Notes
- `Firefox 137 delivers ExpandOnHover Auto-hiding!` *And most* of FF Ultima's source went through edit to work for FF 137.
- Theme settings, like tab auto-hiding and tab width, are no longer needed. Other tab related settings have been adjusted to work with firefox's Vertical Tab ExpandOnHover. Changes are reflected in the user.js list.
- :warning: There is a bug where the second sidebar will sometimes [glitch out of position](https://connect.mozilla.org/t5/discussions/firefox-sidebar-and-vertical-tabs-try-them-out-in-nightly/m-p/87361/highlight/true#M33460) when you hover the verttabs (when both are visible). This is a Firefox issue, not caused by the theme. They are aware of it.
- I've brought some issues and recommendations to the attention and acknowledgement of Mozilla Staff via the original Vertical Tabs Announcement thread on Mozilla:
   - [Recommended styling of the sidebar views](https://connect.mozilla.org/t5/discussions/firefox-sidebar-and-vertical-tabs-try-them-out-in-nightly/m-p/87361/highlight/true#M33460)
   - [Keeping the Verttabs expanded even when the context menu (right click menu) is triggered](https://connect.mozilla.org/t5/discussions/firefox-sidebar-and-vertical-tabs-try-them-out-in-nightly/m-p/87360/highlight/true#M33459)
- Firefox 137+ required.
- User.js required.
- Video below!

### <ins> Change Log:
- `info` Vertical Tab autohiding is now just Firefox's native ExpandOnHover with some adjustment, this can be enabled/disabled in Sidebar Settings. You can also now change the size (width) of the vertical tabs by dragging it with your mouse to a desired width.
- `new` Setting `ultima.xstyle.tabgroups.with.colormix` Tab group styles are fully restore and this setting will add the group-colored background like before.
- `new` Setting `ultima.xstyle.pinnedtabs.i` when using tab autohiding the pinned tabs will be listed vertically.
- `qol` Undoing some privacy preferences that were previously altered by the theme back to their default values, these should left to be dealt with by the user. [ea1711a](https://github.com/soulhotel/FF-ULTIMA/commit/ea1711a0eface7392e1ba3ce71bec1b2537988de)
- `fix` Media Playing Icon on tabs restored.
- `fix` New Tab buttons functionality restored.
- `wip` Autoconfig support restoration.
- *** Adaptive Color Scheme, Adjustments for adaptive tab extension compatibility.

> toggle expandonhover via the settings sidebar

https://github.com/user-attachments/assets/a618cb6b-1435-409b-b0f9-7e199a87a6eb

> more tab groups preview

https://github.com/user-attachments/assets/32edce46-943d-43fb-b977-682f98e6fa73

> tab audio indicator adjustments

![2025-02-09_01-21](https://github.com/user-attachments/assets/0392493f-2dad-407a-addf-b073f6ccab41)


> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
