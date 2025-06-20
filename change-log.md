### <ins> FF Ultima Version 2.8 Release
- **[Click Me ⬇️ Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/2.8/ffultima2.8.zip)**
- **[Click Me ⬇️ Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)**
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki).
- ⚙️ [Change settings](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings), tab size, autohiding, spacing, and more.
- ⚙️ [How to Update](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme) the Theme to a new version.
  
### <ins> Version Notes
- 2.8 could possibly wait a month or two for release. As long as there are no major Firefox changes coming up.
- Firefox 138+ required.
- User.js not required.
<!--
- User.js required.
- User.js not required.
- User.js (recommended) not required.
-->

### <ins> Change Log:
- `fyi • ℹ️ •` If you use [Adaptive Tab Color](https://github.com/soulhotel/FF-ULTIMA/wiki/Adaptive-Tab-Color-Configuration) be advised that `user.theme.adaptive` is no longer needed.
- `new • 🟢 •` Settings `ultima.navbar.bookmarks.float` new style and usability for bookmarks bar (see preview) 5d6aab1
- `qol • 🟡 •` Ublock Origin extension panel automatically adjust to color scheme e1ddb8c
- `qol • 🟡 •` Floating Url Bar optimization, max width & positioning adjustment for smaller windows to bigger (Ultrawide) windows d288238
- `wip • ℹ️ •` The current color scheme logic is a bit bloated; Reworking it to be more *simple* is a goal for the next release;
<!--
`fyi • ℹ️ •` 
`fix • 🔴 •` 
`new • 🟢 •` 
`qol • 🟡 •` 
`wip • ℹ️ •` 
-->

> Color Schemes can rely on a simple `user.theme.default` format, which would then handle both dark mode `full moon (default)` and light mode `dusky (default)`. One file to manage both. Managing add on themes, color modes, becomes a lot easier. Number of files in the source would then be reduced by 3. Simplifying this makes transparency `user.theme.transparent` easier to implement as well. And other color schemes (like `user.theme.gruvbox`) can have both dark/light managed in the same place.

![image](https://github.com/user-attachments/assets/161e4fb5-610a-42dc-9b61-dc16f554e32f)

> Ublock automatic theming

![ublock](https://github.com/user-attachments/assets/c51b8cdd-d519-4233-8429-c20d98726131)
