# Creating a Color Scheme.
###### It's recommended to use the Browser Toolbox (for live editting & debugging)

![preview](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/5695ac7e-2e65-4256-b430-176271851e95)

### So you want to create a color scheme?

First decide if it's going to be a `dark mode` theme or `light mode` theme. Then name your Color Scheme:
- `dark`
- `Dracula`
> Example: a Dark Mode theme, named Dracula.

With this, we will first enable the theme, then create it in real-time. Change `Dracula` to whatever name you want.

### Enabling the Color Scheme

1. open > chrome/`user.js`
   - at the top, you will see the 'color schemes' section.
   - enter your theme into the list.
   - user_pref("user.theme.dark.`dracula`", false);
   - this will enter your theme into the about:config page.

<details><summary>(Click me) Preview of the list format</summary>

![2024-07-16_20-53_1](https://github.com/user-attachments/assets/3165c5ea-f6ff-4b2b-82f0-eb6a92c5de04)
</details>

2. open > chrome/themes/`all-color-schemes.css`
   - enter your theme into the list.
   - @import url('all-global-theme-`dracula`.css') (-moz-bool-pref: "user.theme.dark.`dracula`");
   - this will take your theme file, and apply it to the browser when enabled.
  
<details><summary>(Click me) Preview of the list format</summary>

![2024-07-16_20-52](https://github.com/user-attachments/assets/0d2af3ab-8e4f-4407-a6e4-774051de770f)
</details>

3. custom new tab page background
   - name your background after the theme: `dracula.png` (jpg,etc)
   - put the background in `chrome/themes/site-icons/`dracula.png
   - open > `chrome/themes/all-color-schemes-newtab.css`
   - enter your theme into the list.
   - if you have no background, use any background in the site-icons folder.
   
<details><summary>(Click me) Preview of the list format</summary>

![2024-07-16_20-53](https://github.com/user-attachments/assets/d21ca554-fc9e-4b56-8d85-b19d2943395c)
</details>

### Making the Theme

- To make a color scheme you need to make `all-global-theme.dracula.css`
- Luckily for you, this is already taken care of.
- open > `chrome/themes` folder
- Make a copy of `all-global-theme-catppuccin.css` (for dark mode)
- Or make a copy of `all-global-theme-gruvbox-l.css` (for light mode)
- It doesnt matter which one you copy, but these two above are configured very well for new colors.
- Rename the copy > all-global-theme-`dracula`.css
- Line 18 to line 55 - are all of the colors that make the color-scheme.
- Choose your colors.
- Line 63 to 115 - are variables you can use to fine-tune elements effected by the colors above.
- You only need to edit lines 18-55.
- But the freedom is yours to create a Theme however you want it.
- To see and use your theme, you still need to enable it in about:config.
- So, restart firefox.
- Go to about:config > and type in your theme: user.theme.dark.dracula
- Press the `+` Plus button. To enable it.


### Using the Browser Toolbox to see & edit your Color Scheme in real-time.

> In this tutorial I'm editting the catppuccin theme, but the same applies to your custom theme.

- Open the browser toolbox (live debugger) with `ctrl+shift+alt+I`.
- On the right side (css properties) you'll notice at the very top, all of the `-uc-etc` variables in one place.
- These are the variables from line 18-55, all the colors used to create the catppuccin theme. :)
- Try changing `--uc-ultima-window` to `red`, or `rgb(255,0,0)`. You'll notice the browser window is now red.
- Make your edits, see the results, and carry them over to the your theme file. (easier method below)

![prev](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/499509f7-a9fc-4d14-bbba-262e2c1922b9)

### Using the Browser Toolbox - An even better way.

- Open the browser toolbox (live debugger) with `ctrl+shift+alt+I`
- At the top you will see tabs, by default you will be on the `Inspector` tab.
- Switch to the `Style Editor` tab.
- Use the search bar to find your theme `all-global-theme-dracula.css`.
- Just like above, you can edit the colors here and see the results live.
- Pressing `ctrl+s` after making changes, will save the changes straight to the file!
- This means you don't have to copy and paste your changes back and forth.

![prev22](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/2ef0e790-3285-4a89-a9f2-44774c64c41b)

### Finalizing your Color Scheme.

Now that you have your New Shiny Theme, you can switch between the theme and others anytime in about:config

Note: If you would like your theme to be included in future updates of FF ULTIMA you can share it through the github.

You will be considered a Contributor to the FF ULTIMA Project by providing an alternate Style to many other Users of the theme.

Your Color Scheme will be easily enabled and updated in future versions of FF ULTIMA.

To share your theme, you can submit a pull request (recommended) or open an issue, with the editted files. See also: [Color Scheme Presentation](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/catppuccin). This is a template for creditting yourself and presenting the color scheme.

With that said, I'll take care of the rest. Best regards, Soul Hotel.

  
