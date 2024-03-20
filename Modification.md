## Switching between XS, S, L
### /userChrome.css
- very simple. in userChrome change `all-global-positioning.css` to: <br>
[XS, 40px TABS] --> `all-global-positioning-xs.css` <br>
[S, 140px TABS] --> `all-global-positioning-s.css` <br>
[L, 250px TABS] --> `all-global-positioning.css` <br>

![Untitled](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/9a75ae49-2217-4757-ba89-15d99b545a26)
<details>
  <summary>(Click me for picture instruction)</summary>

![Screenshot_1](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/bc163429-8cc5-4bf2-9f05-c24913840756)
![Screenshot_2](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/cda8598e-7725-475d-9966-bdfc277c7797)
</details>

---

## Switching between color schemes

### /theme/switch color scheme/
###### there are two options. Full Moon Ultima. Dusky Ultima.
- find the `switch color scheme folder` located in [ chrome/theme/switch color scheme/ ]
- copy and paste the `all-global-theme.css` file from one of these folders,
- copy it into your [ chrome > theme ] folder.
- it should replace the file there.
- same for [ icons ] folder
- restart firefox.
- enjoy.

---

### Create a theme. I was able to create Dusky, just like this.
##### You atleast need to have knowledge on what live debugging is to proceed.
- Open up Live Debugger `ctrl+shift+alt+I`
- Type `--uc-ultima-window` on the right side searchbar for css properties
- Find the full list of my variables
- Start tinkering.
- And when you find color combinations that you like, copy and replace them in the original file. `all-global-theme.css`

![Screenshot_7](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/88e4ac9e-68e0-48de-a9bc-517c14f1a23f)

- Window-Color is only active for [ Dusky ] not for [ Full Moon ], to change window-color with the Full Moon Edition add this line to the list:
- `--toolbar-bgcolor: var(--uc-ultima-window);`
- When creating color schemes its important to use consistent layers of colors. For Dusky I had to Invert every white and every black. Then I had to coordinate proper accent colors to compliment the white backgrounds i decided on.

<details>
  <summary>(Click me for example of themes file)</summary>

![Screenshot_2](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/4e3a989c-8366-4fcc-8933-d42449c8f51c)
</details>
<details>
  <summary>(Using 'Firefox Colors app' to create themes)</summary>

![Screenshot_1](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/50ede808-227d-4ef0-b49b-692c8cf70b64)
</details>

---

## Modifications for power users

### /theme/all-global-positioning.css

- adjust the size of the tabs, line 6, set your desired value `--uc-vertical-tabs-width`MINIMUM '40px'
- remove tabs, set `--uc-vertical-tabs-width` to `0.1` not 0
- bookmarks toolbar height `--uc-bookbar-height` line 16
- all rounded corners `--uc-all-border-radius` line 25-26
- all margins, "spacing between windows" `--uc-all-margins` line 31-37
- inidividual tabs height `--tab-min-height` line 41
- do not touch tabs width.
- fatter, skinnier tabs `--tab-block-margin` line 45

---

### /verttab/mini-button-bar.css

- for deletion, you can just drag all buttons out and it will be gone
- the following buttons work for the button bar, NO EXTENSIONS:
![mini button bar](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/c0322340-9c81-47f3-bdda-44bd520cb14a)
- you can adjust when the buttons dissappear, line 93
- 15 buttons are allowed, you can edit the file to increase this number, and size them based on view height
- you can get creative and use the vertical tabs window ONLY for buttons
  - first, target tabs `.tabbrowser-tab{opacity: 0 !important;}`
  - then, remove mouse events `.tabbrowser-tab{pointer-events: none !important;}`
  - then, increase the number of buttons in the mini-button-bar.css file
  - and use sidebery or treestyle tabs for your tabs instead

---

### /theme/all-global-positioning.css

- everything related to color, borders, shadows, are located here
- line 21 to 36
  - `--uc-tabs-background`, sidebar header: `--uc-sb-themed`, sidebar body: `--uc-sb-themed-two`, `--uc-sb-background`

