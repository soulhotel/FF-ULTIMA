# Modifications
###### IF you cant find what you are looking for, submit an issue or browse [previous ones](https://github.com/soulhotel/FF-ULTIMA/issues?q=is%3Aissue+is%3Aclosed)
- [Settings and Preferences](./Modification.md#settings-and-preferences-found-on-the-aboutconfig-page)
- [Sidebery optional styling](./Modification.md#sidebery-optional-styling)
- [Switching from Dark Mode to Light Mode](./Modification.md#switching-from-dark-mode-to-light-mode)
- [Userchrome-Toggle extension support](./Modification.md#userchrome-toggle-extension-support)
- [Spreadsheets for power users](./Modification.md#spreadsheets-for-power-users)
- [Create a color scheme](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/New-Color-scheme.md)


## Settings and Preferences, found on the `about:config` page.
###### <p align="right">(click images for bigger resolution)</p>

| Preferences          | Function            | Preview             |
|----------------------------------|---------------------|---------------------|
| Switching Tab Size               |  [40px] -> `ultima.tabs.size.xs` <br> [165px] -> `ultima.tabs.size.s` <br> [250px] -> `ultima.tabs.size.l` <br> :warning: Set one to true, the others false. | ![tabsizechange](preview/tabsizechange.gif) |
| ultima.tabs.autohide             | Enable/Disable Autohide for tabs | ![tabsize](preview/autohideon.gif) |
| ultima.tabs.vertical.hide        | Hide/Show vertical tabs | ![firefox_dnANLwlC7F](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/fd1153a0-95ef-4490-a929-92e0de632804) |
| ultima.tabs.vertical.onlyprivate | Hide vertical tabs ~ except for in Private Windows | ![vtip](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/9f4f4f65-74e3-4a2b-b552-f501429ccb21) |
| ultima.sidebar.autohide          | Autohide the sidebar. Only works when vertical tabs are hidden | ![firefox_dnANLwlC7F](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/fd1153a0-95ef-4490-a929-92e0de632804) |
| ultima.sideberry.autohide          | Autohide only sideberry, leaving other sidebar tabs static | [343008543-c6140b4c-7331-4c15-be0a-41af08037d5d.webm](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/b6412401-afe3-469b-8674-0dbd92ce6708) |
| ultima.tabs.closetabsbutton      | Restore visual close button for tabs, works with autohiding on or off, works with closing multiselected tabs | ![OyarZ6xz4D](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/1c190448-7502-435d-a27e-86f7a96364f3) |
| ultima.theme.extensions          | Extensions-Panel theme, compact-icons or default list-view | ![themeextensions](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/b81bce27-5927-4a0d-9bd5-e970477458d9) |
| ultima.xstyle.containertabs      | Three optional styles for container tabs, make your pick | ![tc1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/6b867554-6e9c-41a3-9c96-9ebc14d15b42) ![tc2](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/15fb335d-e9fa-402e-83a9-0ddd67581f94) ![tc3](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/afda38b4-5c4b-4093-b98f-63c138af2023) |
| ultima.xstyle.squared            | Square the theme; No margins, borders, or rounded corners | ![themesquared](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/ba858526-3178-462c-9bf0-4be3e4bc9ab0) |
| ultima.xstyle.urlbar | when add-on-themes are in use the url bar default view becomes transparent with no shadow | ![prev](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/6dcf6a31-c5cd-4b34-9885-9cb6022afb02) |
| ultima.urlbar.suggestions | Toggle URL Bar suggestions on/off | ... |
| ultima.urlbar.centered | Center URL Bar text | ... |
| ultima.urlbar.hidebuttons | Hide URL Bar buttons unless hovered | ... |
| ultima.OS.(etc) | For linux title buttons to render correctly, select your DE | ... |
| ultima.OS.mac | This can be used regardless of OS, to simulate left side titlebar buttons. Mac Users will automatically have correct placement. | ![os mac](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/66226d4f-0a10-4c25-be5e-4d244c29ae92) |
| toolkit.tabbox.switchByScrolling | Enables scrolling on the tabs bar, to switch between tabs | ... |
| ... | ... | ... |

---

# Sidebery optional styling
###### [Sidebery configuration](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/sideberyimport.json) for those that want to opt out of the native vertical tabs. You can turn off `ultima.tabs.vertical` in `about:config`, and (if you want to) then turn on `ultima.sidebar.autohide`. Import the config file into your sidebery sync. The config file is also already inside of your chrome/theme folder.

| Sidebery Data                            | Preview                      |
|------------------------------------------|------------------------------|
| `/theme/#sideberyultimastyling.json` | ![explorer_Iyz3pZjiWT](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/0b73c1d5-7c41-464c-b6a2-839d8485dfdc) |

If importing, doesn't fully copy the css. Try resetting Sidebery to default first, then reload the add-on. Then import the json.

![1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/3bbc954e-aeba-416b-955e-da5aac9d4446)

You can view/copy-paste the Sidebery CSS here as well:
- [Default Sidebery CSS](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/style-editor.css)
- [Alternate Dark Style](https://github.com/soulhotel/FF-ULTIMA/blob/main.update.branch/doc/sidebery-alt-dark.css) by [frandmb](https://github.com/frandmb)
- [Catppuccin Mocha Style](https://github.com/soulhotel/FF-ULTIMA/blob/main/theme/color-schemes/catppuccin-mocha/sidebery.css) by [Draff](https://github.com/ItsLogic)

---

# Switching from Dark Mode to Light Mode
###### This is fully reliant on your systems current Color state. `Personalize - Color Mode` for Windows. `Setting a dark theme like 'Dark Breeze' globally and to windows` for Linux. And Mac follows a similar structure I believe.

![Main Preview](preview/prev1.gif)

---

# [Userchrome-Toggle extension](https://addons.mozilla.org/en-US/firefox/addon/userchrome-toggle/) support
With `ultima.tabs.autohide` set to false. And `ultima.tabs.size.xs` set to true; You can toggle the tabs-view using the extension button, or keyboard shortcut.

[userchrome-toggle test..webm](https://github.com/soulhotel/FF-ULTIMA/assets/44523955/252b3bae-f1c8-41ad-afa7-1e67d7f441cb)

---

# Spreadsheets for power users.
<-- [spreadsheets for all variables](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/spreadsheet-all-ultima-variables.md) (sectioned off by global color modifications, and global positioning modifications)

---
<br>



