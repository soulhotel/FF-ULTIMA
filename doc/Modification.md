## Modifications

### Settings and Preferences, found on the `about:config` page.

###### IF you cant find what you are looking for, submit an issue or browse the [replace-features.md](replace-features.md)

###### <p align="right">(click images for bigger resolution)</p>

| Preferences          | Function            | Preview             |
|----------------------------------|---------------------|---------------------|
| Switching Tab Size               | [XS, 40px TABS] --> `ultima.tabs.xs` <br> [S, 165px TABS] --> `ultima.tabs.s` <br> [L, 250px TABS] --> `ultima.tabs.l` <br> :warning: Set one to true, the others false. | ![tabsizechange](preview/tabsizechange.gif) |
| ultima.tabs.autohide             | Enable/Disable Autohide for tabs. | ![tabsize](preview/autohideon.gif) |
| ultima.tabs.vertical             | Remove the tabs panel, for users who rather use an extension like sidebery/treestyle. | ![firefox_dnANLwlC7F](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/fd1153a0-95ef-4490-a929-92e0de632804) |
| ultima.sidebar.autohide          | Autohide the sidebar. Only works when vertical tabs is disabled/turned-off. | ⬆⬆⬆ |
| ultima.xstyle.containertabs      | Three optional styles for container tabs, make your pick. | ![tc1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/6b867554-6e9c-41a3-9c96-9ebc14d15b42) ![tc2](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/15fb335d-e9fa-402e-83a9-0ddd67581f94) ![tc3](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/afda38b4-5c4b-4093-b98f-63c138af2023) |
| ultima.xstyle.squared            | Square the theme; No margins, borders, or rounded corners. | ![themesquared](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/ba858526-3178-462c-9bf0-4be3e4bc9ab0) |
| ultima.theme.extensions          | Extensions-Panel theme, compact-icons or default list-view. | ![themeextensions](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/b81bce27-5927-4a0d-9bd5-e970477458d9) |
| toolkit.tabbox.switchByScrolling | Enables scrolling on the tabs bar, to switch between tabs | ... |
| ultima.xstyle.closetabsbutton    | Restore visual close button for tabs, works with autohiding on or off, works with closing multiselected tabs | ![OyarZ6xz4D](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/1c190448-7502-435d-a27e-86f7a96364f3) |
| ... | ... | ... |

---
<br>

### Sidebery Optional styling

###### [Sidebery configuration](https://github.com/soulhotel/FF-ULTIMA/blob/main/theme/%23sideberyultimastyling.json) for those that want to opt out of the native vertical tabs. You can turn off `ultima.tabs.vertical` in `about:config`, and (if you want to) then turn on `ultima.sidebar.autohide`. Import the config file into your sidebery sync. The config file is also already inside of your chrome/theme folder.

| Sidebery Data                            | Preview                      |
|------------------------------------------|------------------------------|
| `/theme/#sideberyultimastyling.json` | ![explorer_Iyz3pZjiWT](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/0b73c1d5-7c41-464c-b6a2-839d8485dfdc) |

If importing this .json above doesn't copy over the css styling. Try resetting Sidebery to default first, and reloading the add-on. Then import the json.

![1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/3bbc954e-aeba-416b-955e-da5aac9d4446)

Optional : you can also copy and paste this [Sidebery CSS](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/replace-features/style-editor.css) into your Sidebery Style Editor. But this should already be handled by the .json.

---
<br>

### Switching from Dark Mode to Light Mode

###### This is fully reliant on your systems current Color state. `Personalize - Color Mode` for Windows. `Setting a dark theme like 'Dark Breeze' globally and to windows` for Linux. And Mac follows a similar structure I believe.

![Main Preview](preview/prev1.gif)

---
<br>

### [Userchrome-Toggle extension](https://addons.mozilla.org/en-US/firefox/addon/userchrome-toggle/) support
With `ultima.tabs.autohide` set to false. And `ultima.tabs.xs` set to true; You can toggle the tabs-view using the extension button, or keyboard shortcut.

[userchrome-toggle test..webm](https://github.com/soulhotel/FF-ULTIMA/assets/44523955/252b3bae-f1c8-41ad-afa7-1e67d7f441cb)

---
<br>

### Spreadsheets for power users.
<-- [spreadsheets for all variables](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/spreadsheet-all-ultima-variables.md) (sectioned off by global color modifications, and global positioning modifications)

---
<br>

### Create a theme. I was able to create Dusky (Light Mode), just like this.
###### You atleast need to have knowledge on what live debugging is to proceed.
###### chrome/theme/all-global-theme-dusky.css , chrome/theme/all-global-theme-fullmoon.css

- Live preview of instructions below
- Make a copy of `all-global-theme-dusky.css`, for a light color scheme
- And/Or a copy of `all-global-theme-fullmoon.css`, for a dark color scheme
- Name your theme file `all-global-theme-dracula.css` ( just an example :/ )
- In userChrome, rename the theme file above with the one you just created
- Open up Live Debugger `ctrl+shift+alt+I`
- Type `--uc-ultima-window` on the right side searchbar for css properties
- Here you will find the full list of all theming variables used
- Start tinkering.
- You can create your theme live and see how the windows, colors, etc, look
- Find color combinations that you like, copy them into your new custom theme file `all-global-theme-dracula.css`
- Congrats! Youve just created a Light Mode theme

<details>
  <summary>(Click me) Live Tutorial</summary>

![tabsizechange](preview/createtheme.gif)
![tabsize](preview/createthemelive.gif)
</details>

<details>
  <summary>(Using 'Firefox Colors app' to create themes)</summary>

###### Did this in 2 minutes, just showing that it is definitely possible.
![Screenshot_1](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/50ede808-227d-4ef0-b49b-692c8cf70b64)
</details>

---
<br>



