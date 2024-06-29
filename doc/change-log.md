### [Click Me ⬇️](https://github.com/soulhotel/FF-ULTIMA/releases/download/1.7.9.5/ffultima1.7.9.5.zip) 1.7.9.5 latest

###### ⬇️ Please follow the [installation instructions](https://github.com/soulhotel/FF-ULTIMA#installation) on main page.

###### 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Documentation](https://github.com/soulhotel/FF-ULTIMA/tree/main/doc).

###### ⚙️ [Change settings](https://github.com/soulhotel/FF-ULTIMA/blob/main/doc/Modification.md), tab size, no borders, spacing, autohiding, more.

>[!WARNING]
> Returning Users: **Some user preferences were renamed in 1.7.9!** If you haven't done so already, please reapply your user.js to get the corrected settings. This change is to reflect future updates/features while organizing the names for easier readability. Setting names will be carefully considered moving forward and renaming will **NOT** happen again. Thank you.
> <details><summary>(CLICK ME) Settings List Preview</summary>
>
> <br>
>  Older named preferences such as ultima.tabs.xs(s,l), ultima.tabs.vertical, ultima.OS.linux, etc, can be deleted.
>
>  ![newpreferencelist](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/ba6c024a-f26a-4459-9b7c-2550f1f2c9ee)
> </details>

### Change Log:
- `new` Setting `ultima.sidebery.autohide` to autohide Sidebery only, leaving other Sidebar panels in a static state by @frandmb [#88](https://github.com/soulhotel/FF-ULTIMA/pull/88).
- `new` Setting `ultima.OS.kdedecoration` adds compatibility for KDE Users with themed window decoration buttons.
> ![2024-06-20_14-35](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/168821f4-75b3-4f36-9264-250cf72653fc)
- `fix` Close button for tabs not visible when in Fullscreen Mode, [#30](https://github.com/soulhotel/FF-ULTIMA/issues/30).
- `qol` About config warning dialog set to false.
- `qol` Code miniaturization, slowly cleaning up the source, simplifying some functions, shrinking some files.
- `todo` Setting to keep default tabs-on-top layout (not a priority).
- `todo` More layering for the alternate lwtheme preference.
- `qol` Color Variables have been adjusted; excess removed, readability improved (hopefully). Some changes include but are not limited to:
  - Name shortening from `uc-ultima-etc` to `uc-etc`
  - `uc-light-dark` and `uc-dark-light` removed/merged into `uc-text`. Functionality has not changed.
  - `uc-panel-border` is utilized more often, specifically for every element that has a modified border.
  - Many nested elements (with altered backgrounds) now adopt their parents related background variable.
  - The application of variables can sometimes rely on user preference.. so feedback is appreciated for these and future changes.


