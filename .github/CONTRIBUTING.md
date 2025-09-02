## Before contributing

Contributing to FF Ultima can range from creation of color-schemes, to feature request, to wiki documentation, to brainstorming solutions for problems in the issues forum. This guide will focus mostly on Pull Request for new features, changes, and fixes for existing issues.

If you havent done so already, skim through the [wiki](https://github.com/soulhotel/FF-ULTIMA/wiki) or [settings wiki](https://github.com/soulhotel/FF-ULTIMA/wiki/SETTINGS) in case your request might have already been addressed. For any other questions regarding contributing, feel free to open an [issue](https://github.com/soulhotel/FF-ULTIMA/issues).

## How to contribute

FF Ultima is a pretty modular theme. Every feature is accounted for while built on top of a very solid foundation. With over 80+ settings and a number of combinations between them, it's important to protect the structural integrity of the theme, so.. here are a few guidelines that can help do just that.

> *Assuming that you already know the basics of forking and pulling*

1. Focus on one subject/feature per pull request.
2. The amount of commits or changes do not matter so long as they do not conflict with other existing features.
3. Follow the themes structure for placement of subject/feature
4. Your request can most likely be segregated to one existing source file.
5. Your request, if to an existing feature, should be placed accordingly to the features existing code block (determined by moz-pref sections in the related source file).
    - For example: a change to a tab related setting like `tabs.belowurlbar` would belong to `chrome/theme/settings-TABS.css` & a change to `urlbar.float` would belong to `chrome/theme/settings-urlbar.css`. In their relevant sections.
6. Try to limit your changes to an existing directory.
7. New settings should be given a literal (straight-forward) name. Example: `urlbar.do.this`
8. No AI generated code. For my sanity.

## Theme structure

The theme is organized in such a way that finding specific subjects, categories, or features are easy.
And user preferences try to follow the naming convention based on their file placements as well. The settings are seperated and indexed within the relevant file for easy finding (visually & with ctrl+f).
> *Below is a tree of the major source files. This structure should be easy to navigate, but feel free to open an issue if you see room for improvement.*

```
├── theme
│   ├── ffu-global-positioning.css
│   ├── ffu-internal-appearance.css
│   ├── ffu-private-browsing.css
│   ├── ffu-special-configs.css
│   ├── settings-context-menus.css
│   ├── settings-extensions-panel.css
│   ├── settings-icons.css
│   ├── settings-navbar.css
│   ├── settings-navbar-windowcontrols.css
│   ├── settings-sidebar-sidebery.css
│   ├── settings-TABS.css
│   ├── settings-urlbar.css
│   ├── website-aboutaddons.css
│   ├── website-aboutconfig.css
│   ├── website-newtab.css
│   ├── website-private.css
│   ├── website-reddit.css
│   ├── website-styles.css
│   └── website-yt.css
│   ├── color-schemes/
│   │   ├── (color scheme folders)
│   │   └── (wallpaper folder)
│   ├── icons/
│   │   ├── (icons)
├── userChrome.css
├── userContent.css
└── user.js
└── changelog.md (feel free to document/credit your change here if you want to)
```

## Documentation

A lot of the documentation is made up of comments, descriptions, images, gifs, and previews from the wiki, change logs, and issues as well. If you want Users to see something a specific way, feel free to make previews for the documentation and include them either in the change-log or when Submitting PR. There is no direct way to contribute to the Wiki right now, but feel free to open an [issue](https://github.com/soulhotel/FF-ULTIMA/issues) if you see room for improvement there.

# Thank you for reading!
