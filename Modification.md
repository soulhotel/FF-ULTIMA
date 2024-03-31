## Switching Tab Size, Turning Autohide On/Off
###### chrome/userChrome.css
► first tab size, in userChrome change `all-global-positioning-L` to: <br>
- [XS, 40px TABS] --> `all-global-positioning-xs.css` <br>
- [S, 140px TABS] --> `all-global-positioning-s.css` <br>
- [L, 250px TABS] --> `all-global-positioning-l.css` <br>

![Untitled](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/9a75ae49-2217-4757-ba89-15d99b545a26)

<details>
  <summary>(Click me) Then Autohiding + animated example</summary>

###### changing size to L, and enabling autohide if you want that too.  
![changing settings](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/8c471fac-a96a-45b6-85d2-48b4f111fd81)

###### the outcome: 250px size tabs, and they auto collapse to 40px if you add autohiding feature.
![outcome](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/978d6c07-7d31-41e2-88b6-fae566fce387)

</details>

---

[Options to replace](https://github.com/soulhotel/FF-ULTIMA/blob/main/replace%20features/%23replace-replace-features.md) certain features, list will be updated as time progresses.

---

## Create a theme. I was able to create Dusky, just like this.
###### You atleast need to have knowledge on what live debugging is, to proceed.
###### chrome/theme/all-global-theme-dusky.css
- Make a copy of `all-global-theme-dusky.css`, for a light color scheme
- And/Or a copy of `all-global-theme-fullmoon.css`, for a dark color scheme
- Name your theme file `all-global-theme-dracula.css` ( just an example :/ )
- In userChrome, rename the theme file above with the one you just created
- Open up Live Debugger `ctrl+shift+alt+I`
- Type `--uc-ultima-window` on the right side searchbar for css properties
- Here you will find the full list of all theming variables used
- Start tinkering.
- You can create your theme live and see how the windows, colors, all look
- Find color combinations that you like, copy them into your custom theme file
- Congrats.

![hQGFbQ4wcK](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/e95de06b-40d1-4ceb-aa42-b2afcb97d5e1)

- Note: The variable `--uc-ultima-window` is only active for [ Dusky ] not for [ Full Moon ]
- to change window-color in dark themes add this line to the list of variables:
- `--toolbar-bgcolor: var(--uc-ultima-window);`, my variables will ensure the rest of the body, backgrounds, etc, match your desired color.
<details>
  <summary>(Click me) All the variables used in the theme file</summary>

![Screenshot_2](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/4e3a989c-8366-4fcc-8933-d42449c8f51c)
</details>
<details>
  <summary>(Using 'Firefox Colors app' to create themes)</summary>

###### Did this in 2 minutes, just showing that it is definitely possible.
![Screenshot_1](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/50ede808-227d-4ef0-b49b-692c8cf70b64)
</details>

---

## Modifications for power users (Outdated line #'s, however the variables are still in the respected file)

### /theme/all-global-positioning.css

- adjust the width of the tabs panel, line 6, set your desired value `--uc-vertical-tabs-width`MINIMUM '40px'
- remove tabs, set `--uc-vertical-tabs-width` to `0.1` not '0'
- bookmarks toolbar height `--uc-bookbar-height` line 16
- all rounded corners `--uc-all-border-radius` line 25-26
- all margins, "spacing between windows" `--uc-all-margins` line 31-37
- inidividual tabs height `--tab-min-height` line 41
- do not touch (individual) tabs width.
- fatter/skinnier tabs `--tab-block-margin` line 45

---

### /theme/function-mini-button-bar.css (Outdated line #'s, however the variables are still in the respected file)

- for deletion, you can just drag all buttons out and it will be gone
- Color of Bar on customize-toolbar page, line 12, defaults black in `Full Moon`, yellow in `Dusky`
- the following buttons work for the button bar, NO EXTENSIONS:
![mini button bar](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/c0322340-9c81-47f3-bdda-44bd520cb14a)
- you can adjust when the buttons dissappear, line 93
- 15 buttons are allowed, you can edit the file to increase this number, and size them based on view height
- you can get creative and use the vertical tabs window ONLY for buttons
  - first, target tabs `.tabbrowser-tab{opacity: 0 !important;}`
  - then, remove mouse events `.tabbrowser-tab{pointer-events: none !important;}`
  - then, increase the number of buttons in the mini-button-bar.css file
  - and use sidebery or treestyle tabs for your tabs instead
  - you can use the S(40px tabs) Version of the theme, and the button bar will already be positioned to sit inside of the unused tabs space.

---

### /theme/all-global-theme.css (Outdated line #'s, however the variables are still in the respected file)

- everything related to color, borders, shadows, are located here
- line 21 to 36
  - `--uc-tabs-background`, sidebar header: `--uc-sb-themed`, sidebar body: `--uc-sb-themed-two`, `--uc-sb-background`
- tabs auto collapse on full screen, line 290
- tabs auto collapse when screen width falls below 850px, line 313
