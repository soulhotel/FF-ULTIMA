# Creating a Color Scheme.
###### It's recommended to use the Browser Toolbox (for live editting & debugging)

![preview](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/5695ac7e-2e65-4256-b430-176271851e95)

### So you want to create a color scheme?

- First `decide` if it's going to be a `dark mode` scheme or `light mode` scheme.
- For this example we will focus on creating a dark mode theme, using catppuccin as the foundation.
- Take a look at the [catppuccin folder](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/catppuccin) located in `chrome/theme/color-scheme`. This will be your template.
- Read the [readme.md](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/catppuccin) and follow the steps. 
- Setting Catppuccin as your Dark Mode theme will allow you to create a new color scheme in real-time.
- Restart Firefox to see the theme before you proceed.

### Making a color palette.

- In `all-global-theme-catppuccin.css` you will find everything you need in the first 115 lines.
- Line 18 to line 55 - are all of the color variables that make the color-scheme. Choose your colors.
- Line 63 to 115 - are variables you can use to fine-tune elements effected by the colors above.
- You should only need lines 18-55, still everything is organized in a way for you to truly get your desired outcome.

### Using the Browser Toolbox to make & see your edits in real-time.

- Open the browser toolbox (live debugger) with `ctrl+shift+alt+I`.
- On the right side (css properties) you'll notice at the very top, all of the `-uc-etc` variables in one place.
- These are the variables from line 18-55, all the colors used to create the catppuccin theme.
- Try changing `--uc-ultima-window` to `red`, or `rgb(255,0,0)`. You'll notice the browser window is now red.
- Make your edits, see the results, and carry them over to the color scheme file. (easier method below)

![prev](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/499509f7-a9fc-4d14-bbba-262e2c1922b9)

### Using the Browser Toolbox - An even better way.

- Open the browser toolbox (live debugger) with `ctrl+shift+alt+I`
- At the top you will see tabs, by default you will be on the `Inspector` tab.
- Switch to the `Style Editor` tab.
- Use the search bar to find `all-global-theme-catppuccin`.
- Just like above, you can edit the color variables here and see the results live.
- Pressing ctrl+s after making changes, will save the changes straight to the file.
- This eliminates the need to copy and paste your changes back and forth.
- This is also how the Catppuccin color-scheme was made.

![prev22](https://github.com/soulhotel/FF-ULTIMA/assets/155501797/2ef0e790-3285-4a89-a9f2-44774c64c41b)

### Finalizing your color-scheme.

- Now that you've decided on a color-scheme. You'll want to do a few more things.
- Name the color scheme. (all-global-theme-fancyname.css)
- Change the file name in userchrome.css too.
- Change the new tab page wallpaper if you want to as well. `chrome/theme/site-icons/newtab.png` (Dark) `chrome/theme/site-icons/newtabw.png` (Light)

### Sharing your color-scheme.

- Use the [Catppuccin template](https://github.com/soulhotel/FF-ULTIMA/tree/main/theme/color-schemes/catppuccin).
- You can download the folder, or find it in your chrome/theme/ folder.
- Enter your color-scheme details in the readme.
- Replace the Catppuccin theme with your own in the theme/ folder
- Replace the wallpaper with your own in the theme/site-icons/ folder (optional)
- Submit an issue or pull request to share.

  
