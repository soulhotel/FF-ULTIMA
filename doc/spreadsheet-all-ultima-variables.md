###### a quick reference table for what each variable in the theme effects; Recommended to use the live-debugger/browser-tools to make live changes and see the results.


### chrome/theme/`all-global-positioning.css`

| Variable                         | Line | Customizable? | Function            |
|----------------------------------|------|---------------|---------------------|
| --uc-vertical-tabs-width         | 8-28 | ⚠️ | Controls the width of the tabs panel for the users prefered size option. XS (41px - icon only view) is the smallest option. Be cautious going any lower than 41px. Then there is S, then L (250px) the default option |
| --uc-vertical-tabs-width-revert  | 8-28 | ⚠️ | This variable is used to match the widths of the tabs panel set above, always keep it parallel to the user preference it is paired with |
| --uc-navbar-height               |  33  | ⚠️ | This variable DOES NOT alter the nav bar. However, it is used to calculate height adjustments for the tabs panel, based on the nav bars default height |
| --uc-collapsed-tabs-width        |  34  | ⚠️ | The width of the tabs panel when collapsed. This is used for the autohide feature, full screen mode, and when the screen width falls below 800-850px. Be cautious when going below 41px |
| --uc-bookbar-height              |  44  | ✅ | Change the height of the bookmarks toolbar |
| --uc-tabbar-height               |      | ❌ | Tab panel height, calculated with other variables |
| --uc-tabbar-height-adjust        |      | ❌ | Tab panel height, after calculated adjustments (like bookmarks toolbar being collapsed or not) |
| --uc-all-border-radius           |  53  | ✅ | The rounded border/corners you see touching everything. There's an option in `about:config` called `ultima.xstyle.squared` try setting it to `true` and see the difference before making changes to this in-file. |
| --tab-border-radius              |  54  | ✅ | Rounded corners on the tabs panel |
| --uc-button-border               |  55  | ✅ | Increased rounding on all buttons |
| --uc-all-margins                 |  59  | ✅ | Margins/Spacing between (tabs panel <> browser content <> sidebar) |
| --uc-margin-inline               |  60  | ⚠️ | Margins/Spacing used to keep certain elements in sync, this number should match the margin of `--uc-all-margins` above |
| --uc-margin-top                  |  61  | ⚠️ | Margins/Spacing used to keep certain elements in sync, this number should match the "top margin" for `--uc-all-margins` above |
| --uc-margin-bottom               |  62  | ✅ | Margins/Spacing used to keep certain elements in sync, this number should match the "bottom margin" for `--uc-all-margins` above |
| --uc-tab-margins                 |  63  | ✅ | Margins/Spacing used for the tabs panel, it usually shares the exact same values as `--uc-all-margins`above but for the sake of customization, users can give it its own custom margins/spacing |
| --uc-sb-margin-leftside          |  64  | ✅ | Sidebery has its own margins/spacing as well, however it needs to be specified for which side of the screen it is on |
| --uc-sb-margin-rightside         |  65  | ✅ | Sidebar margins/spacing when on the right side of the screen |
| --uc-tab-padding                 |  66  | ✅ | Self explanatory, padding for an individual tab |
| --tab-min-height                 |  69  | ✅ | Individial tab height            |
| --tab-min-width                  |      | ❌ | a tabs min width (caution)       |
| --tab-overflow-pinned-tabs-width |      | ❌ | pinned tabs min width (caution)  |
| --inline-tab-padding             |  72  | ✅ | Individial tab padding <>        |
| --tab-block-margin               |  73  | ✅ | Spacing between individual tabs  |
| place                            |  ##  | ✅ | holder                           |
| place                            |  ##  | ✅ | holder                           |

<BR>

### chrome/theme/`all-global-theme-fullmoon.css`
### chrome/theme/`all-global-theme-dusky.css`

| Variable                         | Line | Customizable? | Function            |
|----------------------------------|------|---------------|---------------------|
| --uc-ultima-window               | 17-- | ✅ | This variable is the main window default grey background |
| --uc-dark                        |      | ⚠️ | Used as a global black                    |
| --uc-light                       |      | ⚠️ | Used as a global white                    |
| --uc-light-dark                  |      | ⚠️ | Used to swap text from black/white depending on dark/lightmode |
| --uc-dark-light                  |      | ⚠️ | Used to swap text from black/white depending on dark/lightmode |
| --uc-ultima-accent-i             |      | ✅ | A yellow accent color                     |
| --uc-ultima-accent-ii            |      | ✅ | A blue accent color                       |
| --uc-ultima-accent-iii           |      | ✅ | A white accent color                      |
| --uc-ultima-accent-iv            |      | ✅ | A darker rgb accent color                 |
| --uc-ultima-background-i         |      | ⚠️ | ultima-backgrounds i-iv all share the same dark rgb, however they have different transparent levels depending on the element they are assigned to. |
| --uc-ultima-background-ii        |      | ✅ | "^" more opacity than above               |
| --uc-ultima-background-iii       |      | ✅ | "^" more opacity than above and above     |
| --uc-ultima-background-iv        |      | ✅ | the solid rgb version to the backgrounds above |
| --uc-transparent                 |      | ❌ | transparent color                         |
| --uc-selected                    |      | ✅ | the background color for hovered buttons  |
| --uc-active                      |      | ✅ | the background color for active buttons, also applies to default unthemed tab background  |
| --uc-text                        |      | ✅ | Text color for context, panel menus, should be consistently changed depending on dark or light mode |
| --uc-panel-border                |      | ✅ | Context menus, popup panels border color  |
| --uc-panel-border-ii             |      | ✅ | Context menus, popup panels border color  |
| --uc-context-menu                |      | ⚠️ | Context menu background color             |
| --uc-tabs-background             |      | ✅ | Tabs background color                     |
| --uc-sb-themed                   |      | ⚠️ | Sidebar body background, should match or imitate `--uc-ultima-background-iv`  for a consistent theme |
| --uc-sb-themed-ii                |      | ⚠️ | Sidebar header background, should match or imitate `--uc-ultima-background`  for a consistent theme  |
| --uc-sb-background               |      | ⚠️ | By default uses `--uc-transparent` and is color layered by the sidebar body and header |
| --uc-tabs-lwt                    |      | ✅ | The color of the tabs panel background when a theme is in use, usually a lightly transparent color hue |
| --uc-sb-lwt                      |      | ✅ | The color of the sidebar background when a theme is in use, "^" |
| --uc-panel-background            | --46 | ✅ | Background color for popup-menus,popup-panels, extensions panel, etc |

  
  
