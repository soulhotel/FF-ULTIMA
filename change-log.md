### <ins> FF Ultima Version 3.1 Release
- **[Click Me ⬇️ Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/3.1/ffultima3.1.zip)**
- **[Click Me ⬇️ Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)**
- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki).
- ⚙️ [Change settings](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings), tab size, autohiding, spacing, and more.
- ⚙️ [How to Update](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme) the Theme to a new version.
  
### <ins> Version Notes
- This is a tiny *quality of life* update focused on stability & fine tuning the theme.
- User.js (recommended) not required.
- Firefox 138+ required.
<!--
- User.js required. 
- User.js not required.
- User.js (recommended) not required. 
-->

### <ins> Change Log:
- `fyi • ℹ️ •` "The Hard Way" installation method fully [automates](https://github.com/soulhotel/FF-ULTIMA?tab=readme-ov-file#installation) install & updates for all Operating Systems
- `fix • 🔴 •` As of Firefox 141-142 window controls (in Windows) are no longer toolbarbutton-icons, they are now appended via ::before elements that inherit the default style. However, the original toolbar-icons are still in the browser source, they just default to display:none now. I reverted this change and applied display:none to the new ::before elements when using custom controls window controls. So custom window controls for Windows are restored. 7baa6e5
- `fix • 🔴 •` Find bar visibility adjustment 92cba3d
- `fix • 🔴 •` About:config will now notify you about setting `user.theme.transparent`
- `fix • 🔴 •` Setting `ultima.tabs.tabgroups.background.4` no longer increases width of vertical tabs, no more shift 23f0311
- `new • 🟢 •` Setting `ultima.tabs.tabgroups.label.3` is now the new default tab groups style 23f0311
- `qol • 🟡 •` Tab groups background colors adjustments
- `fix • 🟡 •` Setting `ultima.navbar.bookmarks.centered` adjust when Window width is smaller 5283649
- `qol • 🟡 •` Window controls spacing (in Windows) & consistent colors when window is active/inactive/colorscheme 0422b64

<!--
`fyi • ℹ️ •` 
`fix • 🔴 •` 
`new • 🟢 •` 
`qol • 🟡 •` 
`wip • ℹ️ •` 
-->

> FF Ultima *Kanagawa Wave* Edition by @pitchaya-s

![image](https://github.com/user-attachments/assets/748ab6bb-b2c9-421e-abf7-4a05415eb198)

> Setting `user.theme.transparent`. See the [wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/Transparent-Theming).

![transparentt](https://github.com/user-attachments/assets/f78d6606-e194-4b48-a395-145874789575)
![Screenshot_20250624_050538](https://github.com/user-attachments/assets/3be6c64b-338a-4c65-a183-3a0ac16896b5)

> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
