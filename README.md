# <p align="center"> FF ULTIMA... </p>

###### <p align="center">. . . a sequel to [Perfection FF CSS Theme](https://github.com/soulhotel/Perfection-Firefox-CSS-Theme) </p>

###### <p align="center">Beautiful. light-weight. a 100% easy-mode theme. and a 100% over-the-top name to break the fourth wall!</p>

<div align="center">

![GitHub Release](https://img.shields.io/github/v/release/soulhotel/FF-CSS-ULTIMA?style=for-the-badge) ![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/soulhotel/ff-ultima/total?style=for-the-badge&color=blue) ![GitHub Repo stars](https://img.shields.io/github/stars/soulhotel/FF-CSS-ULTIMA?style=for-the-badge)

</div>

![ffultimaeditions](https://github.com/user-attachments/assets/77eeae82-d910-4169-ace1-c3bdc49a9b07)

## Features

- `Vertical Tabs` and a `One Line Nav Bar`.
- Color Scheme support, Create your own (with Guides) or just go to the add-on store.
- Dark or Light mode themes, automatically cycle depending on your systems current Color Mode.
- Windows, Linux and Mac OS Support.
- Multiple Options - for Tab Size, Autohiding Tabs, Sidebar, Spacing, OS compatibility [and More](doc/Modification.md)
- The Mini Button Bar - pin/unpin up to 15 buttons, drag and drop functional. Works with the following buttons:

![prevautohide](doc/preview/prevmini-bar.png)

## Installation

###### 🚨 Do not skip the installation instructions! Firefox v120+ Required. 🚨

<details>
<summary>Need help finding your Profile Folder? (Click Me)</summary>

<br>

> userChrome Themes work by communicating with a chrome folder located in your Firefox Profile folder, think of it as your User Interface. This folder typically holds `.css` files with the purpose of customizing elements of the Browser. There are two easy ways to access this folder:

1. Go to the `about:support` page
- In the URL Bar, type `about:support`.
- Look for the **Profile Folder** row. Open the folder.
- In that folder, create a new folder named `chrome` (If it doesnt already exist).

![aboutsupport](doc/preview/about_support.png)

2. Go to the `about:profiles` page
- In the URL Bar, type `about:profiles`.
- Your profile will say `This is the profile in use and...`.
- Look for the **Root Directory** row, and click **Open Directory**.
- In the opened Folder, create a new folder named `chrome` (if it doesnt already exist).
 
![alt text](doc/preview/profilelocation.png)
</details>

<details>
<summary>Have system theme enabled for first install, not firefox dark/light, they are different. (Click me) </summary>
  
![install1](doc/preview/install1.jpg) ![install2](doc/preview/install2.jpg)
</details>

###### :warning: There are 2 ways to install this theme, both have their drawbacks and strengths. Choose one.

<details><summary>The Easy Way</summary>
 
>
1. Download the latest version on the [release page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest).
2. Copy everything in the ffultima(version).zip into your chrome folder.
3. For first time installation, you will need to apply the `user.js` to your profile to access theme settings.
4. In the chrome folder, youll see the `user.js`, move it <ins>out the chrome folder and into the Profile Folder<ins>.
5. Restart Firefox.
6. **Wait** for Firefox to open, then delete the `user.js` file.
7. Go to `about:config` and search for `ultima` to see all of your settings.

###### :warning: You only need to touch the user.js when installing the theme for the first time. It's function is to enable userChrome and add theme settings to the about:config page. Do not copy the user.js file into the Profile Folder <ins>if you are just updating the theme to a new version</ins>. Unless you want all of your saved settings to be reset :). 
</details>

<details><summary>The Hard Way</summary>

>
###### This method involves using Git and the Terminal - allowing easier updates. Harder for the less technical of people.
1. Open a terminal in your Profiles `chrome` folder.
2. Or in the terminal, navigate to your Profiles chrome folder `cd your\profile\folder\path\chrome`.
3. In the terminal: `git clone https://github.com/soulhotel/FF-ULTIMA.git` to clone/update to the latest version.
4. In your chrome folder you'll have a file named `user.js`.
5. Move the `user.js` file <ins>OUT of the chrome folder and INTO your Profile Folder.</ins>
6. Restart Firefox.
7. **Wait** for Firefox to open, then delete the `user.js` file.
8. Go to `about:config` and search for `ultima` to see all of your settings.

###### :warning: You only need to touch the user.js when installing the theme for the first time. It's function is to enable userChrome and add theme settings to the about:config page. Do not copy the user.js file into the Profile Folder <ins>if you are just updating the theme to a new version</ins>. Unless you want all of your saved settings to be reset :). 
</details>

## Documentation and Previews.
- [Release Page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest)
Details changes, fixes, and new features (change-log), that users should be aware of.

- [Modification Page](https://github.com/soulhotel/FF-ULTIMA/blob/next-release/doc/Modification.md)
Details every setting found on the about:config page, Optional Sidebery configuration, Spreadsheets for power users, etc.

- [Browse Color Schemes]
Full Moon (default dark mode), Dusky (default light mode), [Catppuccin](https://github.com/soulhotel/FF-ULTIMA/tree/next-release/theme/color-schemes/catppuccin), [Catppuccin-Mocha](https://github.com/soulhotel/FF-ULTIMA/tree/next-release/theme/color-schemes/catppuccin-mocha) by Darff, [Gruvbox](https://github.com/soulhotel/FF-ULTIMA/tree/next-release/theme/color-schemes/grubbox), [Gruvbox Light](https://github.com/soulhotel/FF-ULTIMA/tree/next-release/theme/color-schemes/grubbox-light)

- [Create a Color Scheme]
Written guide for creation and optional contribution

#### Enjoy
