<div align="center">

# FF ULTIMA...

###### . . . A theme with too many options. And a sequel to [FF Perfection CSS](https://github.com/soulhotel/Perfection-Firefox-CSS-Theme).

![GitHub Release](https://img.shields.io/github/v/release/soulhotel/FF-CSS-ULTIMA?style=for-the-badge)  ![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/soulhotel/ff-ultima/total?style=for-the-badge&color=blue) ![GitHub Repo stars](https://img.shields.io/github/stars/soulhotel/FF-CSS-ULTIMA?style=for-the-badge)  ![GitHub contributors](https://img.shields.io/github/contributors/soulhotel/FF-ULTIMA?style=for-the-badge&color=blue)

</div>

<!-- ![ffultima-editions](https://github.com/user-attachments/assets/061d124e-d846-4da1-8466-03e2341e0802) -->
![ffultima-editions-2.0](https://github.com/user-attachments/assets/dc1882e6-6543-41bd-aff7-ded2b96ffb97)

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
- Autoconfig integration, Sidebery integration, Auto Tab Color integration.
>
- See more detail on [what FF Ultima has to offer](https://github.com/soulhotel/FF-ULTIMA/wiki#what-does-ff-ultima-offer) through the Wiki.
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
- [x] The theme will automatically enable userChrome stylesheets via user.js.
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
</details>

<details><summary>The Hard Way</summary>
 
###### 🛈 This method involves using Git and the Terminal - allowing easier updates. Harder for the less technical of people. 🛈
- This method automates every step of the "Easy Way" Installation.
- Replace *`YourProfileFolder`* with the name of your Profile Folder.
- Only use the *`# restart firefox`* line, for the Firefox Browser that you are using.
- This method assumes (in *`# CLEANUP USER.JS`*) that your Firefox Browser can restart in 5 seconds.

> 🛈 What that Code do? These codeblocks can be copy/pasted/entered in one go. It navigates to your Firefox Profile Folder... Downloads the theme into a chrome folder via Git... Then copies the user.js found inside to your Profile Folder... It then restarts Firefox and removes the user.js... It waits for running commands to finish before moving on to the next. Fully automating the Installation Process.

###### LINUX (BASH)
```
# DOWNLOAD FF ULTIMA -----------------------

cd ~/.mozilla/firefox/YourProfileFolder
git clone https://github.com/soulhotel/FF-ULTIMA.git chrome
cd chrome && cp "user.js" "../user.js"

# RESTART FIREFOX --------------------------

pkill -9 -f firefox && while pgrep -f firefox >/dev/null; do sleep 0.5; done
pkill -9 -f librewolf && while pgrep -f librewolf >/dev/null; do sleep 0.5; done
firefox &                    # restart firefox
firefox-developer-edition &  # restart developer edition
firefox-nightly &            # restart nightly
librewolf &                  # restart librewolf

# CLEANUP USER.JS --------------------------

sleep 5 && cd ../ && rm user.js
```
###### WINDOWS (POWERSHELL NOT CMD)
```
# DOWNLOAD FF ULTIMA -----------------------

Set-Location "$env:APPDATA\Mozilla\Firefox\Profiles\YourProfileFolder"
git clone https://github.com/soulhotel/FF-ULTIMA.git chrome
Set-Location "chrome"; Copy-Item "user.js" "..\user.js"

# RESTART FIREFOX --------------------------

Get-Process -Name firefox, firefox-developer-edition, firefox-nightly, librewolf -ErrorAction SilentlyContinue | ForEach-Object { $_.Kill() }
while (Get-Process -Name firefox, firefox-developer-edition, firefox-nightly, librewolf -ErrorAction SilentlyContinue) { Start-Sleep -Milliseconds 500 }
Start-Process "firefox.exe"                    # restart firefox
Start-Process "firefox-developer-edition.exe"  # restart developer edition
Start-Process "firefox-nightly.exe"            # restart nightly
Start-Process "librewolf.exe"                  # restart librewolf

# CLEANUP USER.JS --------------------------

Start-Sleep -Seconds 5; Set-Location ".."; Remove-Item "user.js" -ErrorAction SilentlyContinue
```
###### MAC (just copy Linux because Mac is *basically Linux*)
```
  ,-.       _,---._ __  / \
 /  )    .-'       `./ /   \
(  (   ,'            `/    /|         
 \  `-"             \'\   / |         whats in the box? oh..
  `.              ,  \ \ /  |         
   /`.          ,'-`----Y   |         it's linux.
  (            ;        |   '
  |  ,-.    ,-'         |  /
  |  | (   |        hjw | /
  )  |  \  `.___________|/
  `--'   `--'
```
</details>

###### ✅ What to do *after* you Install FF Ultima ✅
<details><summary>Post Installation</summary>

>
- Go to `about:config` and search for `ultima` to see all of your settings. You should also see:

![image](https://github.com/user-attachments/assets/7c3c1fb9-8080-4823-9994-23e6af91498e)
- Visit [the Wiki](https://github.com/soulhotel/FF-ULTIMA/wiki) to learn more about what is possible:
    - Frequently asked questions
    - All theme settings (previews & explanations)
    - How to install, [uninstall](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Uninstall-the-Theme), [update](https://github.com/soulhotel/FF-ULTIMA/wiki/How-to-Update-the-Theme)
    - Sidebery configuration (optional)
    - Videos, documentation, and a whole lot more..
</details>

## Enjoy
>[!WARNING]
> **PLEASE,** If you have any issue related to the theme.. Do not treat The [FirefoxCSS subreddit](https://www.reddit.com/r/FirefoxCSS/) as theme support.
>
> You will get the best help here, by [submitting an "Issue"](https://github.com/soulhotel/FF-ULTIMA/issues?q=is%3Aissue).

