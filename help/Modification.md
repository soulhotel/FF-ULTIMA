## Modifications

###### includes tab size switching, autohide toggling, theme creation, references for power users. IF you cant find what you are looking for submit an issue, or browse the [replace-features.md](replace-features.md)

---

### Switching Tabs Size

###### chrome/userChrome.css

► in userChrome change `all-global-positioning-L` to: <br>
- [XS, 40px TABS] --> `all-global-positioning-xs.css` <br>
- [S, 140px TABS] --> `all-global-positioning-s.css` <br>
- [L, 250px TABS] --> `all-global-positioning-l.css` <br>

<details>
  <summary>(Click me) Live Tutorial</summary>

![tabsize](preview/tabsize.png)
![tabsizechange](preview/tabsizechange.gif)
</details>

---

### Enable Autohide

###### chrome/userChrome.css

► in userChrome there are two options:<br>
- tabs overlay content `@import url(theme/function-tabs-autohide-i.css);`
- tabs push content to the side `@import url(theme/function-tabs-autohide-ii.css);`
- remove `/**/` to enable tabs autohiding

<details>
  <summary>(Click me) Live Tutorial</summary>

![tabsizechange](preview/autohidechange.gif)
![tabsize](preview/autohideon.gif)
</details>

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

###### chrome/theme/all-global-positioning-s.css (xs,s,l)

- remove tabs, Please refer to [replace-features.md](#replace-features.md), ive made a replacement file that will remove tabs completely, and add autohiding to the sidebar
- adjust the width of the tabs panel `--uc-vertical-tabs-width` MINIMUM '40px'
- bookmarks toolbar height `--uc-bookbar-height`
- all rounded corners `--uc-all-border-radius`
- all margins, "spacing between windows" `--uc-all-margins`
- inidividual tabs height `--tab-min-height`
- do not touch (individual) tabs width.
- fatter/skinnier tabs `--tab-block-margin`

---

###### chrome/theme/function-mini-button-bar.css

- for deletion, you can just drag all buttons out and it will be gone
- Color of Bar on customize-toolbar page, line 12, defaults black in `Full Moon`, yellow in `Dusky`
- the following buttons work for the button bar, NO EXTENSIONS:

![prevminibar](preview/prevminibar.png)

- adjust when the buttons dissappear, line 93
- 15 buttons are allowed, you can edit the file to increase this number, and size them based on view height
- you can get creative and use the vertical tabs window ONLY for buttons
  - first, target tabs `.tabbrowser-tab{opacity: 0 !important;}`
  - then, remove mouse events `.tabbrowser-tab{pointer-events: none !important;}`
  - then, increase the number of buttons in the mini-button-bar.css file
  - and use sidebery or treestyle tabs for your tabs instead
  - you can use the S(40px tabs) Version of the theme, and the button bar will already be positioned to sit inside of the unused tabs space.

---

###### chrome/theme/all-global-theme-dusky.css , all-global-theme-fullmoon.css

- everything related to color, borders, shadows, are located here
- tabs background color `--uc-tabs-background`
- sidebar background is split with sidebar sidebar-header sidebar-box `--uc-sb-themed` `--uc-sb-themed-two` `--uc-sb-background`
- tabs auto collapse on full screen, line 290
- tabs auto collapse when screen width falls below 850px, line 313
