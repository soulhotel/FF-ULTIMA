## Modifications

###### IF you cant find what you are looking for, submit an issue or browse the [replace-features.md](replace-features.md)

### Switching Tabs Size

- in the URL BAR type `about:config` and search for `ultima`
- there are three options, double click to set one to true, and make sure you set the other as false.
- [XS, 40px TABS] --> `ultima.tabs.xs`
- [S, 140px TABS] --> `ultima.tabs.s`
- [L, 250px TABS] --> `ultima.tabs.l`

![tabsizechange](preview/tabsizechange.gif)

---

### Enable/Disable Autohide

- in the URL BAR type `about:config` and search for `ultima`
- set `ultima.tabs.autohide` to true or false

![tabsize](preview/autohideon.gif)

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

## Modifications for power users

- :warning: spreadsheet WIP [positioning variables](var-pos.html)
- :warning: spreadsheet WIP [theme variables](var-pos.html)

---
