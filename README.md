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
- `Vertical Tabs`, `Tabs on Top/Bottom`, or `Autohide Everything` layouts.
>
- Add-on theme support, FF ULTIMA can be used with Firefox add-on themes.
>
- Color Scheme support, choose from the [many options](https://github.com/soulhotel/FF-ULTIMA/wiki/Color-Schemes) or learn how to [create your own](https://github.com/soulhotel/FF-ULTIMA/wiki/Create-a-Color-Scheme).
>
- Dark or Light mode themes, automatically cycle depending on your systems current Color Mode.
>
- Multiple Options for tabs, autohiding, spacing, theming, accessibility [and more](https://github.com/soulhotel/FF-ULTIMA/wiki/Settings).
>
- See more detail on [what FF Ultima has to offer](https://github.com/soulhotel/FF-ULTIMA/wiki#what-does-ff-ultima-offer) through the Wiki.
>
- Autoconfig integration, Sidebery integration, Auto Tab Color integration
>

## Installation

###### 🚨 Do not skip the installation instructions! 🚨

<details>
<summary>Finding your Profile Folder (where the theme files go)</summary>

###### 🛈 Two ways to find your Profile Folder. Choose one: 🛈
1. Go to the about:support page/url.
2. Open directory
3. This takes you to your profile folder, typically named "default.release"

<img src="https://github.com/user-attachments/assets/e520eb35-f09c-4925-92f6-44be4ec18d51" width="850" />

>
1. Go to the about:profiles page/url.
2. If you have multiple firefox profiles, make sure you are working with the right one.
3. Open directory
4. This takes you to your profile folder, typically named "default.release"
 
<img src="https://github.com/user-attachments/assets/8e58c276-1015-436d-8414-6d4db3a4be4b" width="850" />
</details>

<details>
<summary>Initial Setup</summary>

###### 🛈 This is mostly for first time Installation: 🛈

- [x] If your Profile Folder does not have a `chrome` folder, create one.
- [x] If your Profile Folder already has a `chrome` folder, empty it.
- [x] The theme will automatically enable userChrome stylesheets via user.js
- [x] Please have Firefox's System-Theme enabled. You can change this later.

<img src="https://github.com/user-attachments/assets/c65972cf-88bf-41da-87d1-5d5a780230ba" width="650" />
</details>

###### ⬇️ Choose *one* of the installation methods below. ⬇️

<details><summary>The Easy Way</summary>

###### 🛈 Autoconfig Users should download the Source instead of the release Zip 🛈

1. Download the latest version on the [release page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest).
2. Copy everything in the ffultima.zip into your `chrome` folder.
3. For first time installation, you need to apply the `user.js` to firefox to access the theme settings.
4. In the chrome folder, youll see the `user.js`, move it <ins>out the chrome folder and into the Profile Folder<ins>.
5. Restart Firefox.
6. <ins>**Wait** for Firefox to open</ins>, then delete the `user.js` file.
7. Go to `about:config` and search for `ultima` to see all of your settings. You should also see:

![image](https://github.com/user-attachments/assets/7c3c1fb9-8080-4823-9994-23e6af91498e)

###### 🛈 The user.js only needs to be applied in two scenarios: 🛈
- It's your first time installing the theme.
- Or the [release page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest) says "user.js required" for new settings/versions of the theme.

###### 🛈 How to [update the theme (wiki)](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme) to a new theme version 🛈

###### 🛈 Video for [installing FF Ultima](https://www.youtube.com/watch?v=FDYYm-Tt39I&list=PLTVs0Y4lTV55tEwbkGwlooQinDbge3a6O&index=3) 2.0 (youtube) 🛈
</details>

<details><summary>The Hard Way</summary>

###### 🛈 This method involves using Git and the Terminal - allowing easier updates. Harder for the less technical of people. 🛈
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
9. Go to `about:config` and search for `ultima` to see all of your settings. You should also see:

![image](https://github.com/user-attachments/assets/7c3c1fb9-8080-4823-9994-23e6af91498e)

###### 🛈 The user.js only needs to be applied in two scenarios: 🛈
- It's your first time installing the theme.
- Or the [release page](https://github.com/soulhotel/FF-CSS-ULTIMA/releases/latest) says "user.js required" for new settings/versions of the theme.

###### 🛈 How to [update the theme (wiki)](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme) to a new theme version 🛈
</details>


## Documentation

[Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki)
- FAQ
- All theme settings
- How to create color schemes
- How to install, uninstall, update
- Autotab color configuration
- Sidebery configurations
- List of Color Schemes
- Variable Spreadsheet
- More

## Enjoy
