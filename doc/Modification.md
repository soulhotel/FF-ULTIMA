## Modifications




###### IF you cant find what you are looking for, submit an issue or browse the [replace-features.md](replace-features.md)

### Switching Tabs Size

- in the URL BAR type `about:config` and search for `ultima`
- there are three options, double click to set one to true, and make sure you set the other as false.
- [XS, 40px TABS] --> `ultima.tabs.xs`
- [S, 140px TABS] --> `ultima.tabs.s`
- [L, 250px TABS] --> `ultima.tabs.l`

| preview                                      |
|----------------------------------------------|
| ![tabsizechange](preview/tabsizechange.gif)  |

---

### Enable/Disable Autohide

- in the URL BAR type `about:config` and search for `ultima`
- set `ultima.tabs.autohide` to true or false

| preview                                      |
|----------------------------------------------|
| ![tabsize](preview/autohideon.gif)           |

---

###### more preferences found on the `about:config` page.

| More Custom Preferences          | Function            | Preview             |
|----------------------------------|---------------------|---------------------|
| ultima.tabs.vertical             | Completely remove the tabs panel, for users who rather use an extension like sidebery/treestyle. This preference can be paired with 'ultima.sidebar.autohide' |  |
| ultima.xstyle.containertabs      | There are three styling options for how container tabs look, change them and pick to your liking | ![2024-04-23_13-31](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/6b867554-6e9c-41a3-9c96-9ebc14d15b42) ![2024-04-23_13-32](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/15fb335d-e9fa-402e-83a9-0ddd67581f94) ![2024-04-23_13-32_1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/afda38b4-5c4b-4093-b98f-63c138af2023) |
| ultima.xstyle.squared            | Square the theme; No margins, borders, or rounded corners | ![l1ypna5AU1](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/51c5733d-b394-4a88-a0aa-4a643d03a82c) |
| ultima.theme.extensions          | Disable Extensions Menu theme, compact icons only to default list view |![firefox_l7mrOb3I9H](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/43181381-ff46-4ed5-b6a7-cd4cbdfddbd4)|

---

## Modifications for power users
- Spreadsheet of [positioning variables](var-pos.html)
- Spreadsheet of  [theme variables](var-pos.html)

---

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



---
