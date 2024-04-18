###### this list the services as a quick reference for what each variable touches and effects; Its still recommended to use the live Debugger tool if your goal is to create a theme or make changes.


chrome/theme/`all-global-positioning.css`

| Variable                         | Line | Customizable? | Function            |
|----------------------------------|------|---------------|---------------------|
| --uc-vertical-tabs-width         | 8-28 | ⚠️ | Controls the width of the tabs panel for the users prefered size option. XS (41px                                                  - icon only view) is the smallest option. Be cautious going any lower than 41px.                                                   Then there is S, then L (250px) the default option |
| --uc-vertical-tabs-width-revert  |      | ⚠️ | This variable is used to match the widths of the tabs panel set above, always                                                      keep it parallel to the user preference it is paired with |
| --uc-navbar-height               |      | ⚠️ | This variable DOES NOT alter the nav bar. However, it is used to calculate height                                                  adjustments for the tabs panel, based on the nav bars default height |
| --uc-collapsed-tabs-width        |      | ⚠️ | The width of the tabs panel when collapsed. This is used for the autohide                                                          feature, full screen mode, and when the screen width falls below 800ish. Be                                                        cautious when going below 41px |
| --uc-bookbar-height              |      | ✅ | Change the height of the bookmarks toolbar |
| --uc-tabbar-height               |      | ❌ | Tab panel height, calculated with other variables, do not change |
| --uc-tabbar-height-adjust        |      | ❌ | Tab panel height adjustments made with necessary calculations |
| --uc-all-border-radius           |      | ✅ | The rounded border/corners you see touching everything, there is an option in                                                      `about:config` called `ultima.xstyle.squared` try setting it to true to see the                                                    difference, before making changes in the file. |
| --tab-border-radius              |      | ✅ | Test                          |
| --uc-button-border               |      | ✅ | Test                          |
| --uc-all-margins                 |      | ✅ | Test                          |
| --uc-margin-inline               |      | ✅ | Test                          |
| --uc-margin-top                  |      | ✅ | Test                          |
| --uc-margin-bottom               |      | ✅ | Test                          |
| --uc-tab-margins                 |      | ✅ | Test                          |
| --uc-sb-margin-leftside          |      | ✅ | Test                          |
| --uc-sb-margin-rightside         |      | ✅ | Test                          |
| --uc-tab-padding                 |      | ✅ | Test                          |
| --tab-min-height                 |      | ✅ | Test                          |
| --tab-min-width                  |      | ❌ | Test                          |
| --tab-overflow-pinned-tabs-width |      | ❌ | Test                          |
| --inline-tab-padding             |      | ✅ | Test                          |
| --tab-block-margin               |      | ✅ | Test                          |
