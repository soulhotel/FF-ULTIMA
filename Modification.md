## Switching between XS, S, L
### /userChrome.css
- very simple. in userChrome change `all-global-positioning.css` to: <br>
[XS, 40px] --> `all-global-positioning-xs.css` <br>
[S, 140px] --> `all-global-positioning-s.css` <br>
[L, 250px] --> `all-global-positioning.css` <br>

![Screenshot_1](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/bc163429-8cc5-4bf2-9f05-c24913840756)
![Screenshot_2](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/cda8598e-7725-475d-9966-bdfc277c7797)

---

## Switching between color schemes

### /theme/switch color scheme/
###### there are two options. Full Moon Ultima. Dusky Ultima.
- find the `switch color scheme folder` located in chrome/theme/switchcolorscheme/
- copy and paste the `all-global-theme.css` file from one of these folders,
- copy it into your [ chrome > theme ] folder.
- it should replace the file there.
- same for [ icons ] folder
- restart firefox.
- enjoy.

---
---

### I was able to create Dusky, just like this.
##### You atleast need to have knowledge on what live debugging is to proceed.
- Open up Live Debugger `ctrl+shift+alt+I`
- Type `--uc-ultima-window`
- Find the full list of my variables
- start tinkering. Once you find color combinations that you like, take those combinations and replace the ones in the original file. `global-theme.css`
##### Note: When creating color schemes its important to use consistent layers of colors. For Dusky I had to Invert every white and every black. Then I had to coordinate proper accent colors to compliment the white backgrounds i decided on.

![Screenshot_7](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/88e4ac9e-68e0-48de-a9bc-517c14f1a23f)

---
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

### /verttab/mini-button-bar

- delete the mini button bar BUT, you can also drag all buttons out and it will be gone
- the following buttons work for the button bar, NO EXTENSIONS:
![mini button bar](https://github.com/soulhotel/FF-CSS-ULTIMA/assets/155501797/c0322340-9c81-47f3-bdda-44bd520cb14a)
- you can adjust when the buttons dissappear, line 93
- with minor adjustments you can adjust the number of buttons allowed, and size them based on view height

### /theme/all-global-positioning.css

- everything related to color, borders, shadows, are located here
- line 21 to 36
  - `--uc-tabs-background`, sidebar header: `--uc-sb-themed`, sidebar body: `--uc-sb-themed-two`, `--uc-sb-background`

