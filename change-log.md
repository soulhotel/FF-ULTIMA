### <ins> FF Ultima Version 2.6 Release- **[Click Me ⬇️ Release Download](https://github.com/soulhotel/FF-ULTIMA/releases/download/2.6/ffultima2.6.zip)** - **[Click Me ⬇️ Source Download](https://github.com/soulhotel/FF-ULTIMA/archive/refs/heads/main.zip)**- 🗨️ [Submit an issue](https://github.com/soulhotel/FF-ULTIMA/issues/new/choose) or ask questions not answered in [the Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki).- ⚙️ [Change settings](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings), tab size, autohiding, spacing, and more.- ⚙️ How to [Update the Theme](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme) to a new version.
  
### <ins> Version Notes
- This is a very small but impactful update. Mostly centered around *quality of life*, with some minor fixes.
- As of Firefox 140: The extensions button (`e`,`🧩`) can now be removed from the Navbar.
- User.js recommended (but not required).
- Firefox 138+ required.

### <ins> Change Log:
- `fyi • ℹ️ • ` If you depend on Sidebery, please visit [the Sidebery Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/Sidebery-Configuration)
- `fix • 🔴 • ` Sidebery animation fluidity #300 0fa0db8 @TBroderick99
- `fix • 🔴 • ` Pinned tab spacing correction when not using expand on hover #302 e3bfba5 @rh1nehart
- `fix • 🔴 • ` Setting `ultima.tabs.newtabbutton.ontop.2`, the new tab button now remains under pinned tabs when there are enough opened tabs to trigger the scrollbar #301 dd35439
- `new • 🟢 • ` Setting `ultima.sidebar.hide.header` to hide the new sidebar header/title f29aa49
- `new • 🟢 • ` Setting `ultima.tabs.disable.update.dot` to remove the Dot (indicator) that shows up on tabs
- `new • 🟢 • ` Setting `ultima.tabs.tabgroups.label.2` a *compact* pill style for tab groups (see video below)
- `new • 🟢 • ` Setting `ultima.tabs.vertical.hide.the.bottom.buttons` to hide the action buttons from the vertical tabs c04d148
- `new • 🟢 • ` Setting `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover` to hide the action buttons, when not hovering the vertical tabs c04d148
- `qol • 🟡 • ` PiP mini video player's volume slider will now always be visible (when smaller sizes) 0aab3b1
- `qol • 🟡 • ` Tab group backgrounds can now be completely combined/seperated (color background, blurred tab color, color line)
- `qol • 🟡 • ` Vertical Tab animation speed fluidity & first-time visibility trigger (user.js) 6fd8b17
- `qol • 🟡 • ` Pinned tabs container height unlimited with `ultima.tabs.pinned.style.1` 83bce1e 899e820
- `qol • 🟡 • ` With `ultima.tabs.newtabbutton.ontop.1`, the new tab button no longer duplicates when there are enough opened tabs to trigger the scrollbar #301 0cdc8ae @dreadbalaur
- `qol • 🟡 • ` Unloaded/discarded tabs will now respect browser.tabs.fadeOutUnloadedTabs when set to false #303 6bc1723 @fefdbi
- `qol • 🟡 • ` Firefox 140+ New Tab Page changes reverted
- `qol • 🟡 • ` Tab Group optimization

> Sidebar transition animation

https://github.com/user-attachments/assets/da331532-efbc-4268-9e89-018f0da86742

> When the PiP reaches a very small size, the volume slider dissappears, but now, it will always be accessible

![PiP](https://github.com/user-attachments/assets/f872e39b-5546-4e3e-8304-774d3c266f19)

> New `ultima.tabs.vertical.hide.the.bottom.buttons.off.hover`, gives you more space to see tabs by hiding excess action buttons. While `ultima.tabs.vertical.hide.the.bottom.buttons` will always hide the action buttons, except for Settings.

![Vid_20250529_174426](https://github.com/user-attachments/assets/c84d3411-1f7b-4a5d-86ac-915e8a042096)

![Vid_20250529_180401](https://github.com/user-attachments/assets/f78123cf-a299-40b7-b3bb-803a3c75b4a8)

> Tab groups backgrounds can be combined and/or seperated

https://github.com/user-attachments/assets/7131ab0a-8fd8-4976-a670-ae33ba03a06c

> Tab groups new `label.2` Setting

https://github.com/user-attachments/assets/0d8e0127-7910-4eb7-96ac-622417bb7d5d

> Preview of ultima.spacing.relaxed Setting. Trying to make something "comfy" for Fullscreen/Ultrawide/Split-View enjoyers like myself. Still in a design stage but recommendations are welcome.

![Screenshot_20250520_225549](https://github.com/user-attachments/assets/dd41b966-c48e-405d-8378-30d76fc19734)


> FF Ultima is reaching it's maturity, additional updates to the theme will most likely only focus on bugs, patches, and fine-tuning. If you'd like to see more features added to the list, feel free to fork or push via pull request. Contributors, like always - are always welcome. Otherwise, enjoy.
