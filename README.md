# <p align="center"> FF ULTIMA... </p>

###### <p align="center">. . . A theme with too many options. And a sequel to [FF Perfection CSS](https://github.com/soulhotel/Perfection-Firefox-CSS-Theme).</p>

<div align="center">

![GitHub Release](https://img.shields.io/github/v/release/soulhotel/FF-CSS-ULTIMA?style=for-the-badge) <!-- ![GitHub Release Date](https://img.shields.io/github/release-date/soulhotel/FF-ULTIMA?style=for-the-badge&color=blue) --> ![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/soulhotel/ff-ultima/total?style=for-the-badge&color=blue) ![GitHub Repo stars](https://img.shields.io/github/stars/soulhotel/FF-CSS-ULTIMA?style=for-the-badge) ![GitHub contributors](https://img.shields.io/github/contributors/soulhotel/FF-ULTIMA?style=for-the-badge&color=blue)

</div>

<!--
<div align='center'><a href='https://www.websitecounterfree.com'><img src='https://www.websitecounterfree.com/c.php?d=9&id=65926&s=1' border='0' alt='Free Website Counter'></a><br / ><small><a href='https://www.websitecounterfree.com' title="Free Website Counter">Free Website Counter</a></small></div>
-->

![ffultima-editions](https://github.com/user-attachments/assets/061d124e-d846-4da1-8466-03e2341e0802)


## Features

- Windows, Linux and Mac OS Support.
>
- `Vertical Tabs` and a `One Line Nav Bar`.
>
- Add-on theme support, FF ULTIMA can be used with Firefox add-on themes.
>
- Color Scheme support, choose from the [many options](https://github.com/soulhotel/FF-ULTIMA/wiki/Color-Schemes) or learn how to [create your own](https://github.com/soulhotel/FF-ULTIMA/wiki/Create-a-Color-Scheme).
>
- Dark or Light mode themes, automatically cycle depending on your systems current Color Mode.
>
- Multiple Options for Tabs, autohiding, spacing, accessibility [and more](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings).
>
- See more detail on [what FF Ultima has to offer](https://github.com/soulhotel/FF-ULTIMA/wiki#what-does-ff-ultima-offer) through the Wiki.
>
- Autoconfig Integration
>

## Installation

###### 🚨 Do not skip the installation instructions! Firefox v133+ Required. 🚨

<details>
<summary>Need help finding your Profile Folder? (Click Me)</summary>

<br>

> userChrome Themes work by communicating with a chrome folder located in your Firefox Profile folder, think of it as your User Interface. This folder typically holds `.css` files with the purpose of customizing elements of the Browser. There are two easy ways to access this folder:

1. Go to the `about:support` page
- In the URL Bar, type `about:support`.
- Look for the **Profile Folder** row. Open the folder.
- In that folder, create a new folder named `chrome` (If it doesnt already exist).

![aboutsupport](theme/pic/assets/about_support.png)

2. Go to the `about:profiles` page
- In the URL Bar, type `about:profiles`.
- Your profile will say `This is the profile in use and...`.
- Look for the **Root Directory** row, and click **Open Directory**.
- In the opened Folder, create a new folder named `chrome` (if it doesnt already exist).
 
![alt text](theme/pic/assets/profilelocation.png)
</details>

<details>
<summary>Have system theme enabled for first install, not firefox dark/light. (Click Me) </summary>
  
![addonthemespage](theme/pic/assets/installprep.png)
</details>

###### ⬇️ Choose *one* of the installation methods below. ⬇️

<details><summary>The Easy Way</summary>

###### ℹ️ Autoconfig Users should download the Source instead of the release Zip ℹ️

1. Download the latest version on the [release page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest).
2. Copy everything in the ffultima.zip into your `chrome` folder.
3. For first time installation, you need to apply the `user.js` to firefox to access the theme settings.
4. In the chrome folder, youll see the `user.js`, move it <ins>out the chrome folder and into the Profile Folder<ins>.
5. Restart Firefox.
6. <ins>**Wait** for Firefox to open</ins>, then delete the `user.js` file.
7. Go to `about:config` and search for `ultima` to see all of your settings.

###### :warning: You only need to touch the user.js when installing the theme for the first time. It's function is to enable userChrome and add theme settings to the about:config page. Do not copy the user.js file into the Profile Folder <ins>if you are just updating the theme to a new version</ins>. Unless you want all of your saved settings to be reset or unless told otherwise :).
</details>

<details><summary>The Hard Way</summary>

>
###### This method involves using Git and the Terminal - allowing easier updates. Harder for the less technical of people.
1. Open a terminal in your Profiles `chrome` folder.
2. Or in the terminal, navigate to your Profiles chrome folder `cd your\profile-folder\chrome`.
3. In the terminal, git clone the repo to install/update to the latest version:
```
# WINDOWS

# 1. Navigate to your Firefox Profile Folder
# 2. Git clone FF-Ultima into a `chrome` folder

cd C:\Users\You\AppData\Roaming\Mozilla\Firefox\Profiles\YourProfileFolder
git clone https://github.com/soulhotel/FF-ULTIMA.git chrome
```
```
# LINUX

cd ~/.mozilla/firefox/YourProfileFolder
git clone https://github.com/soulhotel/FF-ULTIMA.git chrome
```
5. In your chrome folder you'll have a file named `user.js`.
6. Move the `user.js` file <ins>OUT of the chrome folder and INTO your Profile Folder.</ins>
7. Restart Firefox.
8. **Wait** for Firefox to open, then delete the `user.js` file.
9. Go to `about:config` and search for `ultima` to see all of your settings.

###### :warning: You only need to touch the user.js when installing the theme for the first time. It's function is to enable userChrome and add theme settings to the about:config page. Do not copy the user.js file into the Profile Folder <ins>if you are just updating the theme to a new version</ins>. Unless you want all of your saved settings to be reset :).

###### :accessibility: Reading the [release page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest) is always recommended. When new versions of the theme come out - and they include new preferences in the about:config page, you may want to open the new user.js file and compare it to your current settings. You can either add the settings manually in the about:config page... or load your own editted user.js file to add the new settings and keep your old the same way.
</details>


## Documentation

[Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki)
- FAQ
- Theme settings overview
- Sidebery config
- List of Color schemes
- Color scheme creation
- Spreadsheets

## Enjoy
