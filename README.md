<div align="center">

# FF ULTIMA...

###### . . . A theme with too many options. And a sequel to [FF Perfection CSS](https://github.com/soulhotel/Perfection-Firefox-CSS-Theme).

![GitHub Release](https://img.shields.io/github/v/release/soulhotel/FF-CSS-ULTIMA?style=for-the-badge)
![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/soulhotel/ff-ultima/total?style=for-the-badge&color=blue)
![GitHub Repo stars](https://img.shields.io/github/stars/soulhotel/FF-CSS-ULTIMA?style=for-the-badge) 
![GitHub contributors](https://img.shields.io/github/contributors/soulhotel/FF-ULTIMA?style=for-the-badge&color=blue)
[![Sponsors 💖](https://img.shields.io/github/sponsors/soulhotel?style=for-the-badge&label=Sponsors%20💖&color=f19ef7)](https://github.com/sponsors/soulhotel)

<!-- ![ffultima-editions](https://github.com/user-attachments/assets/061d124e-d846-4da1-8466-03e2341e0802) -->
![ffultima-editions-2.0](https://github.com/user-attachments/assets/dc1882e6-6543-41bd-aff7-ded2b96ffb97)

</div>


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
</details>

<details><summary>The Hard Way</summary>

###### 🛈 For this method, all you need is Git and a Terminal. It's harder for the less technical of people 🛈

- This automated tool requires no download. It runs by fetching [gituserChrome](https://github.com/soulhotel/git-userChrome)
- Locates all profile folders and allows you to specify which one to install FF Ultima to
- It renames any present chrome/ folder to chrome.old/, then uses git to install the theme to a new chrome/ folder
- It also handles moving user.js, specifying which firefox to restart, and user.js removal
- To Install FF Ultima - copy/paste the command for your operating system

###### LINUX ([BASH SCRIPT](https://github.com/soulhotel/git-userChrome)):
```
bash <(curl -s https://raw.githubusercontent.com/soulhotel/git-userChrome/main/gituserChrome.sh)
```

###### WINDOWS ([POWERSHELL SCRIPT](https://github.com/soulhotel/git-userChrome)):
```
powershell -NoProfile -ExecutionPolicy Bypass -Command "iex (irm 'https://raw.githubusercontent.com/soulhotel/git-userChrome/main/gituserChrome.ps1')"
```

###### MAC ([COPY LINUX](https://github.com/soulhotel/git-userChrome))
```
  ,-.       _,---._ __  / \
 /  )    .-'       `./ /   \
(  (   ,'            `/    /|         
 \  `-"             \'\   / |         whats in the box? oh..
  `.              ,  \ \ /  |         
   /`.          ,'-`----Y   |         it's linux.
  (            ;        |   '
  |  ,-.    ,-'         |  /          because Mac is basically linux..
  |  | (   |        hjw | /
  )  |  \  `.___________|/
  `--'   `--'
```
>

> More on [gituserChrome](https://github.com/soulhotel/git-userChrome): When inspecting the source, the tool is pretty simple, but suprisingly it isn't the standard when sharing userChrome themes.. It's set up so that it can download any userChrome theme (not just FF Ultima) with just 1 command (example: `curl gituserChrome randomTheme.git`). And factors in scenarios where you want to target a specific Profile Folder, specific Firefox install, handling clean firefox restarts across any OS and user.js cases and clean ups. I'd love to see it used by more theme creators and obviously since it's just a simple script (1 for windows, 1 for linux/mac) it can be used locally & can be changed by anyone that wants to expand on it.

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

*And a special Thank You, for sponsoring this project*

<!-- sponsors --><a href="https://github.com/s0flY" target="_blank" rel="noopener noreferrer" style="display:inline-block; text-align:center; margin: 0 10px;"> <img src="https://github.com/s0flY.png" width="80" alt="s0flY" /><br/> <span>@s0flY</span> </a><!-- sponsors -->


