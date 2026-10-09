---
sidebar_position: 6
description: Version History
---

## <ins> 4.2 </ins>

- `fix • 🔴 •` Sidebery tab text labels, spacing and visibility when collapsed b56ec63
- `fix • 🔴 •` Setting `ultima.tabs.vertical.hide` and `hide.in.screenedge/screencorner` settings are no more.. The core logic has been rewritten and improved to no longer rely on expandonHover.
- `new • 🟢 •` Setting `ultima.tabs.tabbar.autohide` now handles autohiding the tabs bar.
- `new • 🟢 •` Setticng `ultima.tabs.tabbar.disabled` will completely disable the tabs bar.
- Both of these settings above work for both vertical and horizontal tabs bars.And can be used reliably for both sidebery only users, or those that just want the tab bar hidden completely. See video below.
- `new • 🟢 •` Split View is coming to Firefox in Version 146, along with it comes some (5) [new settings](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabssplitviewcontentoutline). See video below c4a4401 89593ba 1d008ca
- `new • 🟢 •` Setting `ultima.tabs.hide.splitter` hides the resizable bar (splitter) after pinned tabs and before the tabs button strip (when not hovered)
- `qol • 🟡 •` [Second Sidebar](https://github.com/aminought/firefox-second-sidebar) has some optimizations to work alongside the theme #397
- `qol • 🟡 •` There is now an empty `customChrome.css` import in userChrome.css, this can be used to store custom styles alongside the theme
- `qol • 🟡 •` Some context menu items were previously hidden to declutter the menu's, this change has been reverted and limited to the `ultima.contextmenu.reduce.options` setting #405
- Setting `ultima.tabs.tabbar.hide.buttonstrip` replaces both `ultima.tabs.vertical.hide.the.bottom.buttons` and `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover` for a more simple execution

<iframe width="100%" height="490" src="https://github.com/user-attachments/assets/7577452c-c13c-4473-96f7-5664f2c1c22f" title="GitHub video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## <ins> 4.1 </ins>
- `fyi • ℹ️ •` If you are <ins>not</ins> using hardware acceleration, blur settings are best left off.
- `fix • 🔴 •` Fixed an issue where the all tabs button menu was affected by navbar.hide.buttons #394 a4d342b
- `fix • 🔴 •` Dropdown menu's for websites now respect default appearances #392 fc16e2b
- `fix • 🔴 •` Setting [`urlbar.focus.blur.all`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarfocusblur) corrections #390 d36d022
- `fix • 🔴 •` Some (4) settings have been renamed for organization, if you are actively using these settings you'll be notified of the change and updated name, on the about:config page decc546
- `new • 🟢 •` Setting [`ultima.tabs.tabCounter`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabstabcounter) for a *total number of tabs* indicator decc546
- `new • 🟢 •` Setting [`ultima.content.toolbox.ontop`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimacontenttoolboxontop) reverses the position of the content toolbox when docked bottom
- `new • 🟢 •` Setting [`ultima.navbar.bookmarks.focus.blur`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbarbookmarksfocusblur) blurs browser content when viewing bookmark toolbar folders
- `new • 🟢 •` Setting `ultima.urlbar.hide.trackingprotection.icon`, by @AuRiMaS666 #398
- `qol • 🟡 •` Setting `disable.alltabs.button` is no more.. Since Firefox lets us remove this from the toolbar now
- `qol • 🟡 •` Adaptive Tab Color support sees some improvement 3b2a859 2dea82e d20d045
- `qol • 🟡 •` Setting [`tabs.vertical.hide`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsverticalhide-hiding-the-vertical-tab-bar) (in screen-edge) transition sees some adjustment, including a more *standard* height #393 1fc96b8
- `qol • 🟡 •` The [fluent](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/fluent) color-scheme wallpapers have been added to `user.theme.wallpaper` settings 033c3c4
- `qol • 🟡 •` The urlbars search term toggle has been added to the `urlbar.hide.button` list #396 e514b6a
- `qol • 🟡 •` Color Scheme wallpaper logic has been rewritten to respect the new tab page wallpaper menu, where `Reset to default` defaults to Color Scheme wallpapers #399
- `qol • 🟡 •` The `Add Bookmarks Menu` now displays url input editting function (hidden by default firefox), by @AuRiMaS666 #398 f7bdab9 
- `qol • 🟡 •` Theme size reduction

> setup: sidebar.seperator, navbar.autohide, navbar.bookmarks.focus.blur, tabs.multiline.labels, tabs.tabCounter, urlbar.float, ultima.urlbar.focus.blur

![4 1preview](https://github.com/user-attachments/assets/c66d95b2-76f5-4e0a-8479-bb39b393d5f8)

> wallpaper switcher

![walls](https://github.com/user-attachments/assets/16fcccab-1934-4b2b-aa51-f8923ee7f254)

## <ins> 4.0 </ins>

- `fyi • ℹ️ •` The [wiki](https://ff-ultima.github.io/) now has extensive search/index capabilities, thanks to [Algolia](https://docsearch.algolia.com/)
- `fyi • ℹ️ •` Autoconfig and userChromeJS integration has been "refreshed" thanks to @he23251. It's completely optional and may be changed for a better approach, but you can learn more or contribute to it's development in #386
- `fix • 🔴 •` Sidebery positioning correction when using autohide settings. Thank you #380 @PONYMODZ
- `fix • 🔴 •` MacOS handles fullscreen/maximized state differently than other OS's, so full screen compacting will also acknowledge that difference for Mac, thank you for pointing this out #375 @stellophiliac
- `new • 🟢 •` Setting [`ultima.urlbar.scrollable`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarscrollable) let's you scroll through options within the urlbar
- `new • 🟢 •` Setting [`ultima.urlbar.focus.blur`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarfocusblur) blurs browser content when the urlbar is in focus
- `new • 🟢 •` Setting [`ultima.urlbar.focus.blur.all`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarfocusblurall) blurs everything except for the urlbar, when focused #383 by @he23251
- `new • 🟢 •` Setting [`ultima.urlbar.focus.text.aligns.left`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbarfocustextalignsleft) forces urlbar text left, when focused #383 also by @he23251
- `new • 🟢 •` Setting [`ultima.navbar.text.for.icons`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbartextforicons) replaces navbar icons for text labels
- `new • 🟢 •` Setting [`ultima.navbar.update.ready.label`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbarupdatereadylabel) when a Firefox update is available, presents an update label
- `new • 🟢 •` Setting [`ultima.tabs.focus.blur`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsfocusblur) when focus/hover over a tab, other tabs become blurred
- `new • 🟢 •` Setting [`ultima.tabs.horizontal.fullwidth`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabshorizontalfullwidth) to make horizontal tabs take up all available width
- `new • 🟢 •` Setting [`ultima.privatebrowsing.gradient.border`](https://ff-ultima.github.io/docs/settings/all/other-settings#ultimaprivatebrowsinggradientborder) an animated border for private windows #383 by @he23251
- `new • 🟢 •` Setting [`ultima.navbar.bookmarks.tab.indicator`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimanavbarbookmarkstabindicator) highlights content when the current tab is bookmarked
- `new • 🟢 •` Setting [`ultima.findbar.position.top`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimafindbarpositiontop) positions the find bar on top of browser content #383 by @he23251
- `new • 🟢 •` Setting [`ultima.findbar.disable.background.image`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimafindbardisablebackgroundimage) this setting hides the background image that some add-on themes attach to the findbar, often these images don't blend with the themes rounded appearance. The disabled background also fixes add on themes that produce a different solid color than the overall browser color.
- `qol • 🟡 •` Setting [`ultima.tabs.always.show.pinned`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsalwaysshowpinned) now also applies to horizontal tab layout 87adf51
- `qol • 🟡 •` Tab group "counter" adjustment
- `qol • 🟡 •` Transparent color scheme adjustments #379 8bd577b
- `qol • 🟡 •` Tab group label 3 sees visibility improvement with light mode themes
- `qol • 🟡 •` Multiple lwtheme adjustments to improve Adaptive Tab Color appearance
- `qol • 🟡 •` Unloaded tabs that are inside of tab groups now appear more opaque than before
- `qol • 🟡 •` Toolbar button badges have been restored/unmodified to default colors #382 568e62f
- `qol • 🟡 •` Add-on themes (when in light mode) see some improvement to menu contrast and accent color #383 e9ebb67
- `qol • 🟡 •` All tab groups and container tabs related code has been moved to `settings-tabs-group-and-containers.css` for organization


> setup: findbar.position.top, navbar.autohide, urlbar.float, urlbar.focus.blur, tabs.multiline.labels, navbar.text.for.icons

![preview4settings](https://github.com/user-attachments/assets/d0089078-f543-44df-81a0-80bd45853ca8)

## <ins> 3.8 (Doc Website Published) </ins>

"*This update focuses on qol improvements to existing settings and Firefox 143 adjustments. And the Wiki has been moved to it's own dedicated website. So better documentation, better searching and organization, more/better quality video demonstrations, more detail.*"

- `fyi • ℹ️ •` Contributing [guidelines](https://github.com/soulhotel/ff-ultima?tab=contributing-ov-file) have been created #368
- `fix • 🔴 •` Horizontal tabs grow/shrink animation has been restored to original state #366 823b916
- `fix • 🔴 •` Setting [`tabs.newtabbutton.ontop.2`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsnewtabbuttonontop) fixed for 143 4be070c #376
- `fix • 🔴 •` Sidebery autohide positioning correction when using autohide settings. Thank you #370 @PONYMODZ
- `new • 🟢 •` Setting [`ultima.scrollbar.thin`](https://ff-ultima.github.io/docs/settings/all/content-area-settings#ultimascrollbarthin) forces a thinner scrollbar, very useful for Windows 10 users #368 @mrodyhin
- `new • 🟢 •` Setting `ultima.disable.contextmenu.icons` disables extension icons in context menus #366 095b014
- `new • 🟢 •` Setting `ultima.disable.contextmenu.icons.all` also removes back, forward, reload icons 095b014
- `new • 🟢 •` Setting [`ultima.urlbar.drags.window`](https://ff-ultima.github.io/docs/settings/all/urlbar-settings#ultimaurlbardragswindow) lets you reposition the browser by dragging the urlbar cae7765
- `new • 🟢 •` Setting `ultima.navbar.bookmarks.hide.icons` hides bookmark toolbar icons for a clean look cae7765
- `qol • 🟡 •` Setting [`ultima.navbar.float`](https://ff-ultima.github.io/docs/settings/all/topbar-settings#ultimanavbarfloat) transition speed has been reduced (it reveals itself faster) #367 bd1b34f
- `qol • 🟡 •` Setting [`ultima.tabs.multiline.labels`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsmultilinelabels), after some adjustments to the close button on hover, this option is no longer experimental!
- `qol • 🟡 •` Default Color Scheme (dark mode) pinned tabs adopt a faded out blue instead of chaotic yellow 225b69a
- `qol • 🟡 •` Instead of relying on "hover", `navbar.autohide` & `navbar.float` visibility becomes more persistent when accounting for menu panels that are "open" 9b77063
- `qol • 🟡 •` tab group label 3 spacing is more consistent with regular tabs, and new highlight background (Firefox Nightly 144) removed 9b77063 ([wiki](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabstabgroups))
- `qol • 🟡 •` Setting [`ultima.tabs.always.show.pinned`](https://ff-ultima.github.io/docs/settings/all/tab-settings#ultimatabsalwaysshowpinned) now also applies to horizontal tab layout 87adf51
- `qol • 🟡 •` Gradient outline color is no longer a default config
- `qol • 🟡 •` MacOS handles fullscreen/maximized state differently than other OS's, so full screen compacting will also acknowledge that difference for MacOS (3.8+) #375
- `qol • 🟡 •` Extensions panel management button restored (3.8+)
- `qol • 🟡 •` common dialog box button color correction (3.8+)

![github-ezgif com-optimize](https://github.com/user-attachments/assets/2e15a262-931c-4dd8-a3d8-3b5ef2a0c6b5)

## <ins> 3.7 </ins>
- `fyi • ℹ️ •` [gituserChrome](https://github.com/soulhotel/git-userChrome) can download or update ff ultima in one click
- `fix • 🔴 •` Setting `navbar.autohide` now respects the customize toolbar page, and stops autohiding
- `fix • 🔴 •` Setting `bookmarks.autohide` transition enforced, to prevent bookmarks randomly losing visibility #360 095b014
- `fix • 🔴 •` Vertical tabs error when used with `newtabbutton.on.top` #362
- `new • 🟢 •` Setting `ultima.disable.contextmenu.icons` to disable the extension icons in context menus 095b014
- `new • 🟢 •` Setting `ultima.spacing.compact.menus` for a compact menu panel #358 @dreadbalaur
- `new • 🟢 •` Setting `ultima.navbar.float` for a floating navbar. Rewriting navbar.autohide made this easy to get done. Thank #355 @mrodyhin for that fa44b48
- `qol • 🟡 •` Fluent color scheme, adjustments to identity box border radius, lighter font in sidebar, lighter shadows
- `qol • 🟡 •` Setting `navbar.autohide` now has a slight box shadow on reveal for visual clarity
- `qol • 🟡 •` Setting `urlbar.float` has some adjustment for +1920 resolutions 6050fe3
- `qol • 🟡 •` Setting `ultima.urlbar.hidebuttons` renamed to `ultima.urlbar.hide.buttons` fa44b48
- `qol • 🟡 •` Bookmarks positioning is now handled via `ultima.navbar.bookmarks.position`. Set it to `left`, `right` or `center`.
- `qol • 🟡 •` Setting `ultima.urlbar.suggestions` renamed to `ultima.urlbar.hide.searchsuggestions` it now also hides the new search "bonnet" switcher fa44b48
- `qol • 🟡 •` About:config notifications updated

<img width="100%" alt="fluent" src="https://github.com/user-attachments/assets/be397407-ecc0-43f5-bfbe-821777605f13" />

## <ins> 3.5 </ins>
- `fyi • ℹ️ •` [gituserChrome](https://github.com/soulhotel/git-userChrome), a tool for installing & managing userchrome themes.
- `fyi • ℹ️ •` [Settings Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/SETTINGS) is up to date.
- `fix • 🔴 •` Setting `navbar.autohide` rewritten. It's more smooth now™ 7b2ed66
- `fix • 🔴 •` Some adjustments were made to browser content outlines
- `fix • 🔴 •` Some redefinitions occured in firefox source, bug fixes for bookmarks autohide pulled from upstream 9d70934
- `new • 🟢 •` New [Fluent](https://github.com/soulhotel/FF-ULTIMA/blob/firefox-upstream/theme/color-schemes/fluent/readme.md) Color Schemes, created by @dreadbalaur 
- `new • 🟢 •` Setting `ultima.tabs.not.a.progress.bar`, shows the progress of a loading page 98910fd @imshinyu
- `new • 🟢 •` Setting `ultima.tabs.reverse.content.order` & `ultima.tabs.closetabbutton.on.icon` can switch around the position of content inside of an individual tab.
- `qol • 🟡 •` Bookmark Autohide now has a light linear transition/animation.
- `qol • 🟡 •` Setting `ultima.tabs.multiline.labels` adjustments

<img width="1864" height="1050" alt="fluent" src="https://github.com/user-attachments/assets/6c704a1c-3792-4e9f-b2ef-cc12dbf24f41" />

## <ins> 3.3 </ins>
- `fix • 🔴 •` Sidebery tab indentation when collapsed, fixed #347 8b37f1f
- `new • 🟢 •` New infinite gradient tab outline color `user.theme.xtras.tab.outline.color.gradient`
- `new • 🟢 •` Setting `ultima.tabs.closetabbutton.on.icon` presents the "close tab" button when you hover over a tabs icon
- `qol • 🟡 •` Setting `user.theme.xtension.newtab.compact` had a small adjustment to expand griding properly based on number of shortcuts (on 1700px browser width)
- `qol • 🟡 •` History Sidebar themed for consistency
- `qol • 🟡 •` Bookmarks Sidebar adjusted for consistency
- `qol • 🟡 •` Settings Sidebar, finally took care of those grey borders
- `qol • 🟡 •` Window Control restoration (for Windows) moved out of nightly.config
- `wip • ℹ️ •` Setting `ultima.tabs.multiline.labels` makes tabs labels span multiple lines, only for vertical tabs & very experimental, I'm a bit hesitant when it comes to manipulating individual tab heights.. so time will tell if this sticks around.

> Gradient outline (setting) | Tab group label 4 spacing | Consistent theming for Sidebar pages

<img width="49%" alt="image" src="https://github.com/user-attachments/assets/dbb5a88f-096d-424a-963d-c8a091737d02" />
<img width="40%" alt="image" src="https://github.com/user-attachments/assets/087da9c0-9a6c-4bd4-960a-e2b1eff1549a" />

> After 1700px, new tab page shortcuts take up more spacing (user.theme.xtension.newtab.compact) (could use some work)

![newtabgridspacing-ezgif com-optimize](https://github.com/user-attachments/assets/f5e95548-3a08-48d5-a943-b26f442be15a)

> Setting `ultima.tabs.closetabbutton.on.icon`, only applies to expanded/expandOnHover

![Vid_20250728_233140](https://github.com/user-attachments/assets/f3a19f47-a16a-4ee8-b909-7429d7f1a296)

> Setting `ultima.tabs.multiline.labels`, wip, very experimental

<img width="331" height="244" alt="image" src="https://github.com/user-attachments/assets/c1e09736-18e8-4921-8dd5-0ab8630fb987" />

## <ins> 3.2 </ins>
- `fix • 🔴 •` `navbar.autohide` and `bookmark.autohide` now respect when a bookmark dropdown/folder is active/open #335 d05a47c
- `fix • 🔴 •` Url bar was **too** transparent in `user.theme.transparent` #336
- `new • 🟢 •` Setting `ultima.sidebar.revamped.hide.when.horizontal` can keep or hide the revamped sidebar even when using Horizontal Tabs #338
- `new • 🟢 •` You can now override individual custom icons with (multiple) `user.theme.xtension...icon` settings
- `new • 🟢 •` You can now force a specific tab outline color using `user.theme.xtras.tab.outline.color` settings
- `new • 🟢 •` Reduce the spacing between the new tab page shortcuts with `user.theme.xtension.newtab.compact`
- `qol • 🟡 •` button hover adjustment, menu panel adjustments in `user.theme.transparent` #336
- `qol • 🟡 •` The Adaptive Tab Color [Wiki has been updated](https://github.com/soulhotel/FF-ULTIMA/wiki/Adaptive-Tab-Color-Configuration) with extra configuration testing, by @flick36 #336
- `qol • 🟡 •` yt theming header inconsistencies with certain color schemes #340
- `qol • 🟡 •` yt theming shorts cinematic container adjustment #340
- `qol • 🟡 •` Tab groups background #4 outline reduced by 2px
- `qol • 🟡 •` color correction for carl themed window controls @ShKev03 #341

## <ins> 3.1 </ins>
- `fix • 🔴 •` Find bar visibility adjustment 92cba3d
- `fix • 🔴 •` Setting `ultima.tabs.tabgroups.background.4` no longer increases width of vertical tabs, no more shift 23f0311
- `fix • 🔴 •` Setting `user.theme.xtension.swap.addon.colors` replaces `ultima.theme.color.swap` to handle swapping of color variables for certain addon themes #330 @rabbit-time
- `new • 🟢 •` Setting `ultima.tabs.tabgroups.label.3` is now the new default tab groups style 23f0311
- `new • 🟢 •` Setting `ultima.spacing.compact.addonmanager` for a compact grid style add on manager page #326
- `new • 🟢 •` Setting `ultima.navbar.bookmarks.scrollable` lets you scroll the bookmarks toolbar credit to @dreadbalaur for the inspiration 58efa73
- `new • 🟢 •` Setting `ultima.navbar.bookmarks.scrollable` works when using only buttons on the bookmarks bar e0d5e30
- `new • 🟢 •` Setting `ultima.navbar.bookmarks.compact` shrinks the height of the bookmarks toolbar, when floating, the bookmarks shrink both height & width instead a8d8174.
- `qol • 🟡 •` Setting `ultima.navbar.bookmarks.fading` is no more
- `qol • 🟡 •` Setting `ultima.navbar.bookmarks.float.autohide` is no more
- `qol • 🟡 •` Setting `ultima.navbar.bookmarks.float.compact` is no more
- `qol • 🟡 •` Setting `ultima.navbar.bookmarks.float.left` is no more
- `qol • 🟡 •` Setting `ultima.navbar.bookmarks.float.smaller` is no more
- `qol • 🟡 •` Positioning and autohiding of the "floating bookmarks bar" now works with the existing `ultima.navbar.bookmarks.autohide` & `ultima.navbar.bookmarks.centered` settings. This allows for consistent positioning and less settings clogging up your about:config page a8d8174 #328
- `qol • 🟡 •` Tab groups background colors adjustments
- `qol • 🟡 •` Leave Page dialog now highlights the "Leave Page" button in red, instead of the default firefox blue
- `fix • 🟡 •` Setting `ultima.navbar.bookmarks.centered` adjust when Window width is smaller 5283649
- `qol • 🟡 •` Window controls (on windows) spacing & sizing adjustments 7baa6e5
- `qol • 🟡 •` Window controls spacing (in Windows) & consistent colors when window is active/inactive/colorscheme 0422b64
- `qol • 🟡 •` Setting `ultima.tabs.pinnedtabs.style.1` renamed to `ultima.tabs.always.show.pinned` for clarity. `pinnedtabs.style.1` will still work for now, but it will soon be removed in favor of the new name 84f48fe
- `qol • 🟡 •` Transparent color scheme adjustments
- `qol • 🟡 •` YT styling, transparent adjustments 
- `qol • 🟡 •` Floating urlbar adjustments #329 83d9f80
- `qol • 🟡 •` Autoscroller icon restoration

> Bookmarks toolbar settings & combinations

![Image](https://github.com/user-attachments/assets/f50d37fb-a2ad-4522-aad2-fa22852ee9cb)

![Image](https://github.com/user-attachments/assets/8caa9c6d-af6c-4b11-bfdf-a732dda55642)

![Image](https://github.com/user-attachments/assets/a498711b-ac46-4fc4-a768-020674241f12)

> Tab Groups label 3 & background 4

<img src="https://github.com/user-attachments/assets/2ee59d1c-33ff-4b0e-9eb5-06658c22a5b4" width="40%" /> <img src="https://github.com/user-attachments/assets/63ecece7-17a4-40e5-9ec6-91bbd2f8a7f5" width="40%" />


![Image](https://github.com/user-attachments/assets/a5e55f4d-32cf-4073-bcb9-de96f5f7cf30)

## <ins> 3.0 (Ultima gets a big makeover) </ins>

"*This is a big *quality of life* update focused on stability. With a full restructure of source files, and a less = more approach. Using less code but keeping the same look & functionality. Organizing code categorically to improve readability. Also some major improvements for Color Scheme handling.*"

- The theme see's a huge rewrite of the entire source code, structure and logic, requiring returning user's to reapply the user.js (which is a rare occasion)

https://github.com/user-attachments/assets/e0dfb849-cf89-4818-b196-118757e85c4a

<img src="https://github.com/user-attachments/assets/5dfaa05b-d838-4f5b-9883-148708ba714a" width="50%" />

- `fix • 🔴 •` Tabs shifting 1 pixel when expanding-on-hover is no more
- `fix • 🔴 •` Reductions in modifying the sidebar splitters have improved handling everywhere
- `new • 🟢 •` New Color Scheme [Kanagawa Wave](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/kanagawa-wave) by **@pitchaya-s**! #313
- `new • 🟢 •` Introducing Transparency support for Mica/Blurred Windows for all OS's. See the [wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/Transparent-Theming).
- `qol • 🟡 •` Setting `ultima.spacing.compact` improvements (see below)
- `qol • 🟡 •` Theme size reduced by 7mb
- `qol • 🟡 •` Total number of File(s) reduced by 10
- `qol • 🟡 •` There are now a total of 16 color schemes
- `qol • 🟡 •` By default, the sidebars box-shadow is removed @calciferchang
- `qol • 🟡 •` Youtube theming can be turned off with `user.theme.xtension.YT`
- `qol • 🟡 •` Every color scheme now has a dark/light version per `user.theme`
- `qol • 🟡 •` You can create a Color Scheme in 10 minutes. Learn how in the [wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/Create-a-Color-Scheme).
- `qol • 🟡 •` New Tab Page can automatically adjust colors based on color scheme
- `qol • 🟡 •` Turning off all color schemes now adapts to using default firefox colors
- `fyi • 🟡 •` Setting `user.theme.adaptive` deleted. [Adaptive Tab Color](https://github.com/soulhotel/FF-ULTIMA/wiki/Adaptive-Tab-Color-Configuration) now works without it
- `qol • 🟡 •` Ublock Origin extension panel now automatically adjust to color scheme e1ddb8c
- `qol • 🟡 •` Setting `ultima.xstyle.sidebar.theming` deleted. It is now handled automatically via color schemes
- `qol • 🟡 •` Floating Url Bar optimization, max width & positioning adjustment for smaller windows to bigger (Ultrawide) windows d288238

> FF Ultima *Kanagawa Wave* Edition by @pitchaya-s

![image](https://github.com/user-attachments/assets/748ab6bb-b2c9-421e-abf7-4a05415eb198)

> Setting `user.theme.transparent`. See the [wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/Transparent-Theming).

![transparentt](https://github.com/user-attachments/assets/f78d6606-e194-4b48-a395-145874789575)
![Screenshot_20250624_050538](https://github.com/user-attachments/assets/3be6c64b-338a-4c65-a183-3a0ac16896b5)

> Setting `user.theme.compact` improvements

![Vid_20250622_214445](https://github.com/user-attachments/assets/0457c8ac-16c3-4e87-a4a3-03a845b5dd3a)

> Preview of the new sidebar splitter handling & `Scarlet` Color Scheme

![Vid_20250624_235601-ezgif com-optimize](https://github.com/user-attachments/assets/b2edb724-efc2-4409-ac26-49fb3119c8aa)

> Mac OS Current State

![Image](https://github.com/user-attachments/assets/0a84886f-c471-4ce9-9bf5-9ce31073625f)

## <ins> 2.7 </ins>

- `fyi • ℹ️ • ` gituserChrome introduced as a tool to [automate](https://github.com/soulhotel/git-userChrome) installation of userChrome themes for Linux, Mac, Windows de7e58e b15b828
- `fix • 🔴 • ` Corrections for Fullscreen scenarios
- `fix • 🔴 • ` Context menu's `panel shadow` changes are not theme related (but fixed) dad3532
- `new • 🟢 • ` Setting `ultima.tabs.tabgroups.4` to wrap all tabs for a group inside of a *dashed* style box 0fe9bc4
- `new • 🟢 • ` Setting `ultima.urlbar.float` url bar transitions into a floating center when in use 4cb9bb8
- `qol • 🟡 • ` New Tab Page hover color correction, weather widget scaling removed
- `qol • 🟡 • ` Setting `ultima.tabs.pinnedtabs.style.1` enabled by default to revert the new limited visibility (user.js)
- `qol • 🟡 • ` All Tab related settings are now organized within [`theme-tab-styles.css`](https://github.com/soulhotel/FF-ULTIMA/blob/main/theme/theme-tab-styles.css) instead of `theme-xstyle.css`
- `qol • 🟡 • ` Container Tab Styles have been revamped: `ultima.tabs.tabContainers.1`,2,3. Functionality is now fully independant of Tab groups, and styles can be mixed/matched/seperated in a total of 8 to 128 style combinations (when considering tab groups or not) 18d3473
- `qol • 🟡 • ` New Search Mode Switcher adjustments for theme e5827b4 08125a8
- `qol • 🟡 • ` Setting `ultima.tabs.vertical.hide.private` can be used to enable hide behavior when in Private windows #309
- `qol • 🟡 • ` [Adaptive Tab Color](https://github.com/soulhotel/FF-ULTIMA/wiki/Adaptive-Tab-Color-Configuration) improvements. It no longer needs `user.theme.adaptive` 498cf06
- `qol • 🟡 • ` When no color scheme is selected, Firefox will default to its default appearance (with minor theme enhancements)
- `wip • ℹ️ • ` The current color scheme logic is a bit bloated; Reworking it to be more *simple* is a goal for the next release.
<!-- - `new • 🟢 • ` Settings `ultima.navbar.bookmarks.float` new style and usability for bookmarks bar (see preview) 5d6aab1 -->

> New Tab Page Corrections (light mode as well)

<img src="https://github.com/user-attachments/assets/f145fbab-e716-4a43-8be2-26e3cc02511b" height="300px" /> <img src="https://github.com/user-attachments/assets/f680d1e5-2f0b-4b80-81ca-b621aed23b5b" height="300px" />

> New Floating URL Bar Setting

https://github.com/user-attachments/assets/f0c7744a-f527-4025-b300-191922babacb

> This is [userChrome Companion](https://github.com/soulhotel/userChrome-Companion). *Instead of* relying on the **about:config** page and **user.js**, I see a future where FF Ultima works alongside userChrome Companion. Maybe you see that future as well. Depending on the development of `UCC` and how **easier** it is for both you and me, it can become a possibility. Definitely want opinions on this.

https://github.com/user-attachments/assets/3aeadb12-dd2a-403b-a31f-0cb5784489ba
###### Full 4k Video uncropped on [Youtube](https://www.youtube.com/watch?v=Mz7gmYP2_1A&list=PLTVs0Y4lTV56Kapji1pVjMsMqE6PAHwzl&index=1)


## <ins> 2.6 </ins>

- `fyi • ℹ️ • ` `.tabgroups.background.2` originates from a modification of a style, authored by @probe2k da4fb84
- `fix • 🔴 • ` Sidebery animation fluidity #300 0fa0db8 @TBroderick99
- `fix • 🔴 • ` Pinned tab spacing correction when not using expand on hover #302 e3bfba5 @rh1nehart
- `fix • 🔴 • ` With `ultima.tabs.newtabbutton.ontop.2`, the new tab button now remains under pinned tabs when there are enough opened tabs to trigger the scrollbar #301 dd35439
- `fix • 🔴 • ` With `ultima.tabs.newtabbutton.ontop.1`, the new tab button no longer duplicates when there are enough opened tabs to trigger the scrollbar #301 0cdc8ae @dreadbalaur
- `new • 🟢 • ` Setting `ultima.sidebar.hide.header` to hide the new sidebar header/title f29aa49
- `new • 🟢 • ` Setting `ultima.tabs.disable.update.dot` to remove the Dot (indicator) that shows up on tabs (4 @rh1nehart)
- `new • 🟢 • ` Setting `ultima.tabs.tabgroups.label.2` a *compact* pill style for tab groups (see video below)
- `new • 🟢 • ` Setting `ultima.tabs.vertical.hide.the.bottom.buttons` to hide the action buttons from the vertical tabs c04d148
- `new • 🟢 • ` Setting `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover` to hide the action buttons, when not hovering the vertical tabs c04d148
- `new • 🟢 • ` Setting `ultima.urlbar.animate.options` just a visual slide of selected options 8cfb8aa
- `qol • 🟡 • ` PiP mini video player's volume slider will now always be visible (when smaller sizes) 0aab3b1
- `qol • 🟡 • ` Tab group backgrounds can now be completely combined/seperated (color background, blurred tab color, color line)
- `qol • 🟡 • ` Tab group backgrounds animated to appear in a subtle manner, instead of a hard on/off ffbcfd6
- `qol • 🟡 • ` Vertical Tab animation speed fluidity & first-time visibility trigger (user.js) 6fd8b17
- `qol • 🟡 • ` Pinned tabs container height unlimited with `ultima.tabs.pinned.style.1` 83bce1e 899e820
- `qol • 🟡 • ` Unloaded/discarded tabs will now respect browser.tabs.fadeOutUnloadedTabs when set to false #303 6bc1723 @fefdbi
- `qol • 🟡 • ` Firefox 140+ New Tab Page changes reverted
- `qol • 🟡 • ` Tab Group optimization 7667d13


![PiP](https://github.com/user-attachments/assets/f872e39b-5546-4e3e-8304-774d3c266f19) ![tabgroups](https://github.com/user-attachments/assets/a5cfc33c-9627-48b7-8c96-798912b0a68e)

## <ins> 2.5 </ins>

- Theme settings go through a bit of re-organization.
- Theme source goes through a re-structuring for organizaiton.
- `fyi • ℹ️ • ` File `function-urlbar.css` renamed to `theme-urlbar.css` 29ee54a 00b5eb8
- `fix • 🔴 • ` Much of the global positioning logic needed to be improved, and so revisions have begun. Positioning of margins, borders, spacing between sidebars, are the best they've ever been.
- `fix • 🔴 • ` Color scheme creation tutorial link fix @ApenasOLinco #296
- `new • 🟢 • ` Setting `ultima.tabs.vertical.hide.in.screenedge` fully hide the vertical tabs, hovering the screen edge will expand them
- `new • 🟢 • ` Setting `ultima.xstyle.tabgroups.background.2` a new background style for grouped tabs
- `new • 🟢 • ` Setting `ultima.urlbar.animate.open` urlbar animates height when first opened/triggered 0b40670
- `new • 🟢 • ` Setting `ultima.xstyle.highlight.aboutconfig` now matches aboutconfig page colors to color scheme, tab border also removed
- `new • 🟢 • ` Settings `ultima.spacing.compact.contextmenu`/`ultima.spacing.relaxed.contextmenu` to change context menu spacing 8c208c2
- `new • 🟢 • ` Setting `ultima.navbar.hidebuttons` to hide all navbar buttons excluding menus that are triggered, or download button when downloading d82e1cc
- `qol • 🟡 • ` The `Unload Tab` context menu option has been in firefox for a long time, for some reason this option is disabled in some instances. It is now forcefully enabled in the theme e63a57a
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


## <ins> 2.1 </ins>
- `new • 🟢 • ` Sidebery AUTOMATIC theming based on current Color Scheme. Enabled through `user.theme.sidebery` #291
- `new • 🟢 • `  Adaptive Tab Color [Extension supported](https://github.com/soulhotel/FF-ULTIMA/wiki/Adaptive-Tab-Color-Configuration)  as of ffu 2.0
- `new • 🟢 • ` Setting `ultima.navbar.windowcontrols` to customize window controls (3 traffic light options) #285
- `new • 🟢 • ` Setting `ultima.disable.verticaltab.bar.notprivate` to disable the vertical tab bar, but keep it when in Private Mode Windows #292 @whatsnewsisyphus
- `qol • 🟡 • ` Theme size reduced by 5-9Mib (all wallpapers converted to JPG & some even upscaled)
- `qol • 🟡 • ` The [Settings Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/SETTINGS) is better than ever.
- `qol • 🟡 • ` Midnight Color Scheme adjustments. More Black. Only White accents. Animated background only with `user.theme.dark.midnight.animated` #243
- `qol • 🟡 • ` Dusky color scheme adjustments, less blue, more Dusky
- `qol • 🟡 • ` Gruvbox-light color scheme adjustments
- `qol • 🟡 • ` Tab Groups visual optimization
- `qol • 🟡 • ` New Tab pinned tab change reverted

> Sidebery automatic theming

https://github.com/user-attachments/assets/38df6a16-157e-4378-b340-cdda5d48b2ba

> Carl Window controls

![Image](https://github.com/user-attachments/assets/4d04d204-023c-4c7c-b4e8-72237538d122)

> Midnight Color Scheme

https://github.com/user-attachments/assets/116143ff-b0b7-4a50-bd85-7d773871f5fc

> Tab Groups 

https://github.com/user-attachments/assets/434ba0b7-5916-4294-97d8-ac439c2e3f9b

> New Warning Message (aboutconfig)

*When two conflicting settings are turned `on` when they shouldn't be, this little guy will appear until you turn one off.*

![image](https://github.com/user-attachments/assets/a7fb7d29-0906-4609-9864-286b7a0509d5)

## <ins> 2.0 </ins>

*"For the first time in a long time, nothing’s falling apart. Like singing along to your favorite song - to that part where no other can sway your heart. All the pieces are strung so that you cant bite your tongue. So enjoy it while it last. Stability."*

- Theme minimum requirement jumps to Firefox 138
- `fyi • ℹ️ • ` Vertical Tab autohiding can be enabled/disabled in the Settings Sidebar
- `fyi • ℹ️ • ` Firefox 138, tab groups can now be dragged/moved & tabs can now be moved around them
- `fyi • ℹ️ • ` Remove Settings `ultima.sidebar.longer`,`ultima.sidebar.hidden`,`ultima.disable.contextmenu.collapsing`
- `fix • 🔴 • ` Window outlines in fullscreen videos, fixed #280
- `fix • 🔴 • ` spacing corrections, left/right
- `fix • 🔴 • ` All sidebar splitters (resizeable bar) are styled and work great
- `fix • 🔴 • ` Setting `ultima.sidebery.autohide` overlays webpage when verttabs are disabled #283
- `fix • 🔴 • ` Sidebar splitter no longer visibility when in full screen videos #280
- `new • 🟢 • ` Setting `ultima.xstyle.bookmarks.autohide` autohide bookmarks bar
- `new • 🟢 • ` Setting `ultima.xstyle.bookmarks.centered` center the bookmarks bar #284 @imshinyu
- `new • 🟢 • ` Setting `ultima.sidebar.seperator` seperate the two sidebars to opposite sides of the Browser #279 @NyukiFrost
- `new • 🟢 • ` Setting `ultima.xstyle.newtabbutton.ontop.i` puts the New Tab button at the top of the Verttabs
- `new • 🟢 • ` Setting `ultima.xstyle.newtabbutton.ontop.ii` puts the New Tab button at top / under pinned tabs
- `new • 🟢 • ` Setting `ultima.xstyle.highlight.aboutconfig` highlights the aboutconfig Tab
- `new • 🟢 • `  Adaptive Tab Color [Extension now supported](https://github.com/soulhotel/FF-ULTIMA/wiki/Adaptive-Tab-Color-Configuration) #247
- `new • 🟢 • ` Setting `ultima.sidebery.expandon.inactive.windows` to keep sidebars expanded on inactive windows. (accessibility) #248 @whatsnewsisyphus
- `qol • 🟡 • ` Sidebar white/gray border removed
- `qol • 🟡 • ` Thinner Vertical Tabs
- `qol • 🟡 • ` Tab group white border removed
- `qol • 🟡 • ` Mini toolbar buttons under vertical tabs are now centered
- `qol • 🟡 • ` Setting `ultima.spacing.compact` now shrinks tab margins slightly

https://github.com/user-attachments/assets/789a31ea-d17a-4292-994e-97147f2c2a59

https://github.com/user-attachments/assets/b66c4dd4-c38b-4774-8182-80e67a0a1369

https://github.com/user-attachments/assets/1d27e58a-197e-4fc6-9889-7ec439e4cd7d

https://github.com/user-attachments/assets/02e408a6-0cc1-496f-9388-1f4ef0958327

https://github.com/user-attachments/assets/ecbba1bf-7535-4d6e-bfb7-0db2dd5db4c5

## <ins> 1.9.9 (expandonHover introduced to Firefox) </ins>

- Theme minimum requirement jumps to Firefox 137 (due to the rapid development of Firefox Developers recent changes require a new minimum requirement). 
- The theme's core positioning logic had to go through another rewrite to adjust to the new expandonHover feature
- Some recommendations were [pitched](https://connect.mozilla.org/t5/discussions/firefox-sidebar-and-vertical-tabs-try-them-out-in-nightly/m-p/87361/highlight/true#M33460) and [acknowledged](https://connect.mozilla.org/t5/discussions/firefox-sidebar-and-vertical-tabs-try-them-out-in-nightly/m-p/87360/highlight/true#M33459) for the future of Vertical Tabs default appearances
- `info` Vertical Tab autohiding is now just Firefox's native ExpandOnHover with some adjustment, this can be enabled/disabled in Sidebar Settings. You can also now change the size (width) of the vertical tabs by dragging it with your mouse to a desired width.
- `new` Setting `ultima.xstyle.tabgroups.with.colormix` Tab group styles are fully restore and this setting will add the group-colored background like before.
- `new` Setting `ultima.xstyle.pinnedtabs.i` when using tab autohiding the pinned tabs will be listed vertically.
- `qol` Undoing some privacy preferences that were previously altered by the theme back to their default values, these should left to be dealt with by the user. [ea1711a](https://github.com/soulhotel/FF-ULTIMA/commit/ea1711a0eface7392e1ba3ce71bec1b2537988de)
- `fix` Media Playing Icon on tabs restored.
- `fix` New Tab buttons functionality restored.
- `wip` Autoconfig support restoration.
- *** Adaptive Color Scheme, Adjustments for adaptive tab extension compatibility.

https://github.com/user-attachments/assets/a618cb6b-1435-409b-b0f9-7e199a87a6eb

https://github.com/user-attachments/assets/32edce46-943d-43fb-b977-682f98e6fa73

## <ins> 1.9.8.5 </ins>
- Theme minimum requirement jumps to Firefox 135 (due to recent changes to the browser that require a new minimum requirement).
- `fix` Vertical tabs overlay priority restored to overlay the secondary sidebar when hovered.
- `fix` Tab groups have been restored. Code snippets simplified as well. #250
- `new` Setting `ultima.xstyle.tabgroups.withcolormix` to use a colored background with either the 1 or 2 style.
- `qol` Midnight *color-scheme* Color adjustments, less yellow's. #243
- `fix` Overlay positioning for "Unsent Crash Report" Notification. #242
- `fix` Tab audio indicator positioning restored.
- `wip` Autoconfig support restoration.

https://github.com/user-attachments/assets/32edce46-943d-43fb-b977-682f98e6fa73

## <ins> 1.9.8 </ins>
- `new` Autoconfig support (Thank you @tthornton3-chwy for the contribution!)
- `new` Setting `ultima.enable.js.config` to restore old autohiding mod with **no** visual stutter [#227](https://github.com/soulhotel/FF-ULTIMA/pull/227) @tthornton3-chwy
- `new` Autoconfig wiki todo
- `new` Setting `ultima.enable.nightly.config` to maintain necessary quick-patches for future Nightly Updates that may break a certain feature
- `fix` Vertical Tabs autohiding for Nightly #207 #212
- `fix` Adjustments for new audio indicator overlay #225
- `fix` New Tab Page Shortcut Visibility #232
- `fix` Catppuccin Color Adjustment, Thank you @ItsLogic [#234](https://github.com/soulhotel/FF-ULTIMA/pull/234)

## <ins> 1.9.7 </ins>
- `new` Catpuccin Frappe Edition *`color-scheme`* created, inspired by [reddit post](https://www.reddit.com/r/FirefoxCSS/comments/1gvrm1e/comment/ly69zbn/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- `qol` Wallpapers for `Full Moon` and `Midnight` have been updated/changed for better resolution
- `new` Use whatever wallpaper you want with `user.theme.wallpaper`
- `qol` you can now drag/move the Browser Window *with* the Vertical-Tab Sidebar
- `fix` text and button spacing for Vertical Tabs Toolbar buttons #186 
- `new` Setting `ultima.navbar.autohide` autohide the Navigation Bar, unless hovered or URL bar focused
- `fix` Setting `ultima.spacing.compact` now removes the top background showing over browser content #206 
- `fix` Windows Sidebar visibility (z-index correction) #205 
- `fix` Windows (OS) titlebar button size/positioning `- o x`
- `qol` Navbar Autohiding now works with Maximized Windows #209 (Thank you @boarder2 for the heads up!)
- `fix` Navbar Autohiding now works properly under Windows (OS)
- `wip` when using tabs autohide, the context menu (right click menu) will keep the sidebar expanded.
- `fix` Vertical Tabs autohiding adaption (Nightly) #207 #210 #212 
- `fix` Container tabs theming restored #208 
- `qol` the New Tab Page has been optimized. Improved spacing, less saturation, better hover, visual accessibility, compatibility with Firefox's awesome bar #189 , new `ultima.xstyle.newtab.rounded` setting
- `qol` Midnight *`color-scheme`* Animated background extended to cover the all of the top bars.
- `qol` Ublock Origin and bookmark Icons (svg) will now follow toolbar button colors.

![image](https://github.com/user-attachments/assets/ed259b50-fd2e-4a5c-a017-085f99e8e5f1)

## <ins> 1.9.5 </ins>
- `fix` text and button spacing for Vertical Tabs Toolbar buttons #186
- `new` Set the width of Vertical Tabs with: `ultima.tabs.width.small` to `ultima.tabs.width.huge`
- `new` Tab Groups! Style them with: `ultima.xstyle.tabgroups.i` by @tthornton3-chwy or `ultima.xstyle.tabgroups.ii`
- `qol` Using `ultima.disable.verticaltab.bar` now completely removes the Vertical Bar, with an **optional** quick access option `ultima.disable.verticaltab.bar.withindicator` #193
- `new` Setting `ultima.tabs.belowURLbar` to have horizontal tabs (tab on top) layout below the URL bar
- `new` Setting `ultima.navbar.autohide` autohide the Navigation Bar, unless hovered or URL bar focused
- `qol` Setting `ultima.spacing.compact` now reduces 2 to 18 more pixels vertically (Navigation Bar)
- `new` When using add on themes, users can [quickly fix](https://github.com/soulhotel/FF-ULTIMA/wiki/Using-Add%E2%80%90On-Themes) **most** color issues with `ultima.theme.color.swap`. Note, optimization for add on themes with ff ultima are now at their best state, but there are still a 10% of themes that just wont look great. This is because of the variety of ways that an add-on theme developer may choose to use their color variables, it is impossible to have an all-for-one solution mixed in with ff ultima.
- `fix` Midnight color scheme code bleeding into light mode #196
- `fix` vertical tab width patched for Nightly (Thank you for the heads up! @dreadbalaur
- `fix` pinned tab container grid behavior #198 (Thank you @tbeest)

https://github.com/user-attachments/assets/998fb2ef-3eca-4d0a-ab2e-76dec44cc15f

## <ins> 1.9.3 </ins>

A showcase of FF Ultima 1.9.3.... https://www.youtube.com/watch?v=KDwWr7QMV8s

- Theme minimum requirement jumps to Firefox 133 (due to the rapid development of Firefox Developers recent changes require a new minimum requirement).
- `qol` Setting `ultima.tabs.autohide` autohides the Vertical Tabs with a smooth animation
- `new` Set the width of Vertical Tabs with: `ultima.tabs.width.small` to `ultima.tabs.width.huge`
- `new` Tab Groups! Style them with: `ultima.xstyle.tabgroups.i` by [@tthornton3-chwy](https://github.com/tthornton3-chwy) or `ultima.xstyle.tabgroups.ii`
- `fix` MacOS titlebar bugs are patched #166 (Thank you @alejandrosanchezcabana for confirming)
- `new` Setting `ultima.spacing.compact.tabs` to reduce spacing between tabs (vertical), letting you see more at once
- `qol` Using `ultima.disable.verticaltab.bar` now completely removes the Vertical Bar, still accessible via shortcut button
- `qol` With sidebar autohiding and `ultima.disable.verticaltab.bar`, hovering the screen-edge will trigger the sidebar to expand #168 (Thank you [@awwpotato](https://github.com/awwpotato))
- `qol` Using the theme *with* Add-On themes has been optimized a bit! #182
- `new` When using add on themes, users can quickly fix **most** color issues with `ultima.theme.color.swap`. Note, optimization for add on themes with ff ultima are now at their best state, but there are still a 10% of themes that just wont look great. This is because of the variety of ways that an add-on theme developer may choose to use their color variables, it is impossible to have an all-for-one solution mixed in with ff ultima.
- `wip` Setting `user.theme.adaptive` for use with Autotab color extension :warning: WIP, just a foundation
- `qol` New Tab Page menu background - blue tint reduced
- `qol` tab audio indicator border removed
- `fix` vertical tabs top alignment fixed #172
- `qol` Theme colors for `Full moon` (Default Dark Mode) adjusted/improved #172
- `qol` PiP (mini video player) buttons - now follows theme/color-scheme primary accent color
- `qol` Audio indicator (for tabs) - now follows theme/color-scheme primary accent color
- `qol` new tab button under vertical tabs - now follows selected tab color
- `qol` autoscroller restored to default style #172
- `fix` readjusted sidebar positioning adjustments when using the tabs-on-top layout
- `qol` Sidebar margin corrections *when in fullscreen* and added toolbar padding [#179](https://github.com/soulhotel/FF-ULTIMA/pull/179)
- `qol` overflow icon on navigation bar changed to a "more" icon
- `qol` context menu seperators reduced visibility
- `qol` pointer cursor added to certain buttons around the navigation bar (accessibility)
- `qol` vertical tabs scrollbar increased visibility (accessibility)
- `qol` hovering the edge of the screen where the titlebar `x` close button is, will trigger as a hover (accessibility) #112 #141

## <ins> 1.9.1 </ins>
- Theme minimum requirement jumps to Firefox 132 (due to the rapid development of Firefox Developers recent changes require a new minimum requirement). 
- Firefox developers have merged the window controls into the navigation bar
- `fix` setting `ultima.tabs.autohide` is enabled & improved (For Firefox 132 - Default Release) #162 #167
- `fix` setting `ultima.tabs.autohide` is now stable and visual optimized with animation, overflow, overlay (For Firefox version 133+)
- `fix` MacOS toolbar bug
- `fix` fullscreen spacing correction for the autohide vertical tabs feature [#165](https://github.com/soulhotel/FF-ULTIMA/pull/165) @tthornton3-chwy
- `qol` notes and documentation corrections for Color Scheme customizations [#161](https://github.com/soulhotel/FF-ULTIMA/pull/161) @emmanuel-ferdman
- `new` | `fix` setting `ultima.theme.color.swap` to swap around colors when using Firefox themes. #146 
- `new` setting `ultima.theme.icons` to use default firefox icons or Ultima themed icons #146
- `new` setting `ultima.theme.menubar` for one line menubar style
- `new` setting `ultima.disable.windowcontrols.button` disable window controls (`ultima.keep.titlebar` renamed/removed)
- `new` setting `ultima.disable.alltabs.button` to disable the all tabs button (`ultima.xstyle.disable.alltabsbutton` renamed/removed)
- `new` setting `ultima.disable.verticaltab.bar` to hide the verttabbar for sidebery like setups, will need to use the sidebar button once to hide the bar (`ultima.tabs.disabled` renamed/removed)
- `fix` sidebar spacing correction, when vertical tabs are expanded
- `qol` tab audio indicator border removed.
- `fix` vertical tabs top alignment fixed #172
- `qol` Theme colors for `Full moon` (Default Dark Mode) adjusted/improved #172
- `qol` PiP (mini video player) buttons - now follows theme/color-scheme primary accent color
- `qol` Audio indicator (for tabs) - now follows theme/color-scheme primary accent color
- `qol` new tab button under vertical tabs - now follows selected tab color
- `qol` autoscroller restored to default style #172 

## <ins> 1.9 (Firefox introduces Native Vertical Tabs) </ins>

*"You may or may not have noticed, but many custom themes that target tabs have broken recently. This is because - as of Firefox version 131, Firefox has made their own vertical tabs implementation. Firefox's implementation is missing a lot, the spacing is extreme.. auto-hiding tabs isn't a thing, etc, etc, but most importantly.. This forces a bit of a reset onto the FF Ultima theme.

As the developers continue to make progress, the theme will only improve, while restoring many of the lost features. With all of that said..."*

- Theme minimum requirement jumps to Firefox 131. 
- Theme size reduced to `12mb`
- All prior positioning bugs, Fullscreen effects on Mac, have been corrected
- `user.theme` settings for different color-schemes have been saved, functional
- `ultima.disable.windowcontrols` setting to merge the window controls into the navigation bar
- `ultima.tabs.autohide` - ongoing development, may (was) be implemented by Firefox Developers
- `ultima.disable.verticaltabs.bar` - to hide tabs completely (for sidebery setups)
- `ultima.sidebery.autohide` - show/hide sidebery on hover, keep all other sidebars expanded
- `ultima.sidebar.autohide` - show/hide all sidebars on hover
- `ultima.sidebar.longer` - when using autohide the sidebar will expand to a longer/bigger 400px view
- `ultima.spacing.compact` - setting to remove rounded borders from window, and reduce spacing between panels, this replaces and improves on xstyle.squared and xstyle.squished
- `ultima.theme.extensions` - theme extension menu
- `ultima.urlbar.suggestions` - remove urlbar suggestions clutter
- `ultima.urlbar.centered` - center urlbar text
- `ultima.urlbar.hidebuttons` - hide excessive urlbar buttons, unless hovering
- `ultima.xstyle.urlbar` - makes the urlbar transparent when not in use
- `ultima.xstyle.containertabs` - provides alternative styles for container tabs, ongoing progression for vertical tabs
- `ultima.xstyle.pinnedtabs` - provides alternative styles for pinned tabs, ongoing progression for vertical tabs
- `ultima.xstyle.private` - when on, private browsing page can use a custom background, with less clutter on screen
- `qol` Youtube styling - notification badge changed from yellow to default red #142 
- `qol` override-styles.css file has been reformatted to `theme-xstyle.css` organizing all code/functions that relate to alternative styles (ultima.xstyle)
- `qol` new tab wallpapers have been enabled by default, post Firefox v131, this feature conflicted with the new tab wallpapers toggle in about:config
- `new`|`qol` vertical tab end margin spacing reduced
- `new`|`qol` current/selected tab box shadow added for improved visibility
- `new`|`fix` titlebar/navbar spacing improved when window width reaches smaller sizes
- `new` | `fix` setting `ultima.fix.gnome.titlebar` for linux gnome titlebar buttons
- `new` | `fix` setting `ultima.theme.color.swap` to swap around colors when using Firefox themes. #146 
- `new` setting `ultima.theme.icons` to use default firefox icons or Ultima themed icons (extension menu, back, forward, ublock) #146 

## <ins> 1.8.6 </ins>
- `new` Setting `ultima.xstyle.squished` to remove margins and borders, allowing hovering absolute corners to trigger tabs or sidebar display. (similar to `xstyle.squared` but keeping the rounded aesthetic). [#124](https://github.com/soulhotel/FF-ULTIMA/issues/124)
- `new` Setting `ultima.sidebar.hidden` can fully hide/collapse the sidebar when used with autohide, also allows hovering screen edge when in fullscreen/maximized when used with xstyle.squared or xstyle.squished. [#124](https://github.com/soulhotel/FF-ULTIMA/issues/124)
- `new` Setting `ultima.OS.notitlebar` for [#122](https://github.com/soulhotel/FF-ULTIMA/issues/122)
- `new`|`qol` Setting `ultima.sidebar.longer` when using sidebar.autohide the sidebar will be 350px long (bigger).
- `qol` When in fullscreen mode (F11) the navigation bar animation has been overwritten. Smoother transition when handling window control visibility.
- `qol` Setting `ultima.xstyle.lwtheme` given more functionality. Making the vertical tabs and sidebar match the Main Window color.
- `qol` The `doc` folder has been removed from the theme. This cut the theme's source-size in half (-10mb). View the [Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki) for all help & documentation.
- `fix` Mac OS titlebuttons display in fullscreen, mistargetted. [#124](https://github.com/soulhotel/FF-ULTIMA/issues/124)
- `fix` specifying scrollbar styling for webpages with unusual scrollbar utilization (google search). [#123](https://github.com/soulhotel/FF-ULTIMA/issues/123)
- `todo` Code Miniaturization. position-tabs.css is a mess.

## <ins> 1.8.5 </ins>
- `new` Turning **off** `ultima.tabs.vertical` now provides a *Tabs on Top* layout.
- `new` Toggle vertical tabs to the right side of the Browser with `ultima.tabs.vertical.rightside`. [#29](https://github.com/soulhotel/FF-ULTIMA/issues/29) [#111](https://github.com/soulhotel/FF-ULTIMA/issues/111)
- `qol` When in Fullscreen mode (F11) rounded borders and spacing will be disabled. [#115](https://github.com/soulhotel/FF-ULTIMA/issues/115)
- `qol` When in Fullscreen mode (F11) vertical tabs / sidebar become fully hidden, still accessible. 
- `qol` When in Fullscreen mode (F11) hidden tabs / sidebar are fully responsive to hovering absolute screen corners and edges.
- `qol` Increased responsiveness to hovering vertical tabs area and mini-button-bar area.
- `qol` Improvement++ to full screen navigation-bar responsiveness.
- `qol` YT theming, notifications menu saturation decreased. [#119](https://github.com/soulhotel/FF-ULTIMA/issues/119)
- `qol` Code Miniaturization.
- `qol` Setting `browser.newtabpage.activity-stream.newtabWallpapers.v2.enabled` will enable Firefoxs *New-Tab Wallpapers* feature. Overriding FF Ultima wallpapers.

![Screenshot from 2024-07-20 02-21-11](https://github.com/user-attachments/assets/d312964e-f4bc-4377-993b-f81495aebe2a)

![Screenshot from 2024-07-28 20-42-09](https://github.com/user-attachments/assets/481937e4-7653-407c-bba8-69fb00b201f1)

## <ins> 1.8.1 </ins>
- `new` A couple of other Color Schemes were created: [Gruvbox Edition](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/gruvbox/readme.md), [Gruvbox Light Edition](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/gruvbox-light/readme.md), [Midnight Edition](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/midnight/readme.md)
- `new` [Catppuccin-Mocha Edition](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/catppuccin-mocha/readme.md) by Draff (@ItsLogic).
- `new` Change between Color Schemes and New Tab Backgrounds by typing `user.theme` in the about:config page.
- `new` Setting `ultima.xstyle.urlbar` provides an alternate style for the URL BAR - blending into the nav bar, with no box-shadow or border [#96](https://github.com/soulhotel/FF-ULTIMA/issues/96).
- `qol` Improvement to full screen navigation-bar responsiveness.
- `qol`|`new` Additional OS settings for Linux Users with themed window decorations.
- `fix` fade out the use of `customizing="true"` selector in response to Firefox v129.0b4 changes.

![0000](https://github.com/user-attachments/assets/138ea75c-d083-4d2c-8ab6-c7844e17a43b)

![ff-editions](https://github.com/user-attachments/assets/b7ca4a8c-1a8d-4f38-adae-be7a99b69e29)

## <ins> 1.8 </ins>

- Ultima restructures how color is applied to the browser via Color Schemes.
- This is kick started with the new [Catppuccin Edition](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/catppuccin) Color Scheme and the Default Dark (Full Moon) and Light (Dusky) Schemes
- `new` Color schemes creation guide via the [New Color Scheme](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/New-Color-scheme.md) page.
- `new` Setting `ultima.sidebery.autohide` autohide's Sidebery **only**, while other Sidebar Tabs remain static, by [@frandmb](https://github.com/frandmb) [#88](https://github.com/soulhotel/FF-ULTIMA/pull/88).
- `new` Setting `ultima.OS.mac` can now be used for any OS, to simulate left side title bar buttons.
- `fix` Close button for tabs not visible when in Fullscreen Mode, [#30](https://github.com/soulhotel/FF-ULTIMA/issues/30).
- `fix` When in fullscreen mode, title bar buttons will now only display when the navigation bar is hovered.
- `qol` Styling for pinned tabs vs selected tabs have been adjusted and simplified.
- `qol` About:config warning-dialog automatically set to false through user.js.
- `qol` Code miniaturization.
- `qol` Setting `ultima.OS.kdedecoration` for KDE Users who may have themed window decoration applied to firefox.

![catppuccin preview](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/5695ac7e-2e65-4256-b430-176271851e95)

![lightmode preview](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/87b6c813-a824-49b1-9038-c64514178d72)

![darkmode preview](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/d7c92728-8e60-4cac-88ec-de95ea560428)

## <ins> 1.7.9 </ins>
- Ultima settings adopt a new naming structure, *"literal and to the point"*
- Ultima also adopts a new format for the change-log, or organization
- `new` Setting `ultima.tabs.vertical.hide` will hide vertical tabs (renamed).
- `new` Setting `ultima.tabs.vertical.onlyprivate` hides vertical tabs ~ except for in private windows.
- `new` Setting `ultima.urlbar.suggestions` to toggle url bar suggestions on/off, [#6](https://github.com/soulhotel/FF-ULTIMA/issues/6).
- `new` Setting `ultima.urlbar.centered` to toggle url bar centered text and overflow.
- `new` Setting `ultima.urlbar.hidebuttons` to show excess buttons only on hover.
- `new` Audio indicator (in Sidebery) positioned similar to native vertical tabs by [DarkDipper](https://github.com/DarkDipper), [#73](https://github.com/soulhotel/FF-ULTIMA/pull/73).
- `fix` Mac OS toolbar width patched, tested on Sonama and Ventura.
- `fix` Group Indentations improved (in Sidebery) @DarkDipper, [#73](https://github.com/soulhotel/FF-ULTIMA/pull/73).
- `fix` Added padding (2px) added to the bottom of the mini-button-bar.
- `fix` Bad spacing, mathematical error, when tabs autohide is disabled.
- `fix` Removed duplicate code regarding context menu theme.
- `removed` Vertical tab toggle `ultima.tabs.vertical` no longer needed. You can delete in about:config.
- `todo` Alternative lwtheme variables (experimental).
- `todo` Setting to keep default tabs-on-top layout (not a priority).
- `todo` Code miniaturization, slowly cleaning up the source, simplifying some functions, shrinking some files.
- `todo` New preference for alternate pinned tab styling, still havent decided on a style yet. Feedback is appreciated.
- Current Theme State on all OS's (I became a fan of `Pop_OS`)


|windows                   | ![1 7](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/ed741f9f-cac6-4339-8913-a697a8b3ade9) |
|---                       |---|
|Linux                     | ![lin](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/6d6e1a97-d17e-4b9d-8bb7-73e47b688558) |
|Mac (screenshot from LowSpecGamer25) | ![mac-user](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/e814cc59-ae96-4e8a-a128-261daecd9094) |

## <ins> 1.7.8 </ins>
- Url bar text color adjustments
- New Tab Page styling adjustments [#59](https://github.com/soulhotel/FF-ULTIMA/pull/59)
- Sidebar adjustments by [bigshans](https://github.com/bigshans) [#62](https://github.com/soulhotel/FF-ULTIMA/pull/62)
- Sidebar visibility corrections
- bug fixes

## <ins> 1.7.7 </ins>
- Discussion about Native Vertical Tabs coming to Firefox start to heat up. Via, Jon (Community Manager @Mozilla) [discussing a potential future for Firefox](https://connect.mozilla.org/t5/discussions/here-s-what-we-re-working-on-in-firefox/m-p/57694#M20261) that may interest you. Topics: Native Vertical Tabs, Tab Grouping, Profile Management, and more.
- bug fixes

## <ins> 1.7.6 </ins>
- Firefox 126-127.0b1 introduces changes to `-moz` selector, fixed
- Linux titlebar buttons see some corrections for the firefox update (and I finally started spending more time on linux :) )
- bug fixes

![2024-05-16_14-00](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/59129e23-d6ca-449f-92c1-8ba1f4c4ed60)


## <ins> 1.7.5 </ins>
- Firefox 126-127.0b1 quick patches [#48](https://github.com/soulhotel/FF-ULTIMA/issues/48)
- userchrome toggle setting for expanding/collapsing the vertical tabs bar [#31](https://github.com/soulhotel/FF-ULTIMA/issues/31)
- bug fixes

## <ins> 1.7.4 </ins>
- FF Ultima adopts the MPL-2.0 license [#39](https://github.com/soulhotel/FF-ULTIMA/issues/39)
- userchrome toggle support begins [#31](https://github.com/soulhotel/FF-ULTIMA/issues/31)
- Sidebery only setups see support via sidebery.autohide and tabs.vertical settings
- bug fixes

![explorer_Iyz3pZjiWT](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/0b73c1d5-7c41-464c-b6a2-839d8485dfdc)

## <ins> 1.7.3 </ins>
- Linux users see some improvement to titlebar buttons via DE specific settings
- Mac OS users see some improvements to title bar button positioning
- Firefox 126 brings some breaking changes to lwtheme attribute, fixed
- Pinned tabs adopt an outline color as styling
- Tab dragging behavior corrections

## <ins> 1.7.1 </ins>
- Linux Users see some improvement to window controls (titlebar buttons) appearance
- Container tabs styles see some improvements by [Kaedriz](https://github.com/Kaedriz)
- Source restructured for users expecting forking behavior (I was still new to github at the time :) )

![1 7](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/ed741f9f-cac6-4339-8913-a697a8b3ade9)

## <ins> 1.7 </ins>
- User preferences and user.js introduced as a more convenient way to change/toggle optional settings https://github.com/soulhotel/FF-ULTIMA/blob/1.7/doc/Modification.md
- theme styles begin to adopt the user preference format, allowing users to decide what they want or dont want
- extensions panel theming, vertical tab sizes, compact spacing all become settings (13 settings at the time)
- new installation method to match the inclusion of user.js
- container tabs styling introduced by [Kaedriz](https://github.com/Kaedriz)
- new tab page styling introduced (foundation by [hachikoharuno](https://github.com/hachikoharuno)) https://github.com/hachikoharuno/Beautiful-newtab-Firefox
- website styling for specific websites introduced
- big fixes

![l1ypna5AU1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/51c5733d-b394-4a88-a0aa-4a643d03a82c)

## <ins> 1.6.6 </ins>
- The border/outline method for browser content was introduced here (put in place to prevent certain webpages from breaking the border-radius boundary)
- big fixes & spacing corrections

## <ins> 1.6.5 </ins>
- Optional features were introduced, enabled and disabled by commenting out files in userChrome.css
- tab audio indicator styling introduced
- bug fixes

## <ins> 1.6 </ins>
- Back when FF Ultima was first created, it was centered around a hacky implementation of Vertical Tabs. Where horizontal tabs were forced into a Vertical Position.
- Full moon and Dusky Color Schemes automically adapt to the Systems current Color Mode
- The extension menu panel compact theme was introduced
- A Tab button strip feature was introduced
- Unloaded tab styling introduced
- Bug fixes

![optional-autohide-tabs](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/3e8c77eb-7e90-486a-89ca-5a3e608f97db)


## <ins> No documentation </ins>




