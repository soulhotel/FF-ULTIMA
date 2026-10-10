## Before contributing

Looking to [Contribute to the Wiki?](https://github.com/ff-ultima/ff-ultima.github.io?tab=contributing-ov-file)

---

Looking to contribute to the Theme? Any of these below are considered contributions to FF Ultima:
- Color schemes
- New features
- Wiki documentation
- Issue resolutions
- Feature request implementations

This guide will focus mostly on Pull Request for new features, changes, and fixes for existing issues. If your contribution is a new setting/feature, skim through the [wiki](https://ff-ultima.github.io/docs/getting-started#theme-settings) or [settings wiki](https://ff-ultima.github.io/docs/category/settings) in case the feature/setting might already exist. If you can't find an answer below - regarding your contribution, feel free to open an [issue](https://github.com/soulhotel/FF-ULTIMA/issues).

## How to contribute

FF Ultima is a pretty modular theme. With over 100+ settings and a number of combinations between them, it's important to protect the structural integrity of the theme. So.. here are a few guidelines that can help you implement features, without breaking compatibilities:

> *Assuming that you already know the basics of forking, PR's, git commands, etc...*

1. Focus on one subject/feature per pull request.
2. The amount of commits or changes do not matter as long as they don't conflict with other existing features. 
    - I know some people are able to work through the source a bit easier, so clean implementations are acceptable.
3. Follow the themes structure for placement of subject/feature. More on that below.
4. Your feature can most likely be implemented in an already existing source file.
5. Your feature, if to an existing feature, should be placed accordingly to the features existing code block (determined by moz-pref sections or description comments in the related source file).
    - For example: a change to a tab related setting like `tabs.belowurlbar` would belong to `/theme/settings/settings-tabs-horizontal.css` & a change to `urlbar.float` would belong to `/theme/settings/settings-urlbar.css`. In their relevant sections.
6. New settings should be given a literal (straight-forward) name. Example: `urlbar.do.this`
7. And we append `ultima` to settings names, example: `ultima.urlbar.do.this`. Mostly to keep them all organized.

## Theme structure

The theme is organized in such a way that finding specific subjects, categories, or features are easy.
And user preferences try to follow the naming convention based on their file location as well. The settings are seperated and indexed within the relevant file for easy finding (visually & with ctrl+f).
> *Below is a tree of the major source files. This structure should be easy to navigate, but feel free to open an issue if you see room for improvement.*

```
├── theme
│   ├── color-schemes/ (all color scheme files & wallpapers)
│   ├── globals/ 
│   │   ├── global-positioning.css (global positioning of main browser elements are handled here)
│   │   ├── global-theme.css (sets up the default ff ultima appearance, color schemes are mini versions of this file)
│   │   ├── global-special-configs.css (elements of userchromejs are modified throughout this file)
│   ├── icons/ 
│   │   ├── (icons)
│   ├── settings/ (all theme settings are categorized and filed in here) 
│   ├── websites/ (anything related to web content (userContent) is categorized and filed here)
├── userChrome.css
├── userContent.css
└── ucc.json (all theme settings are categorized in here, with -moz-pref and description)
└── release.md (feel free to document/credit your change here if you want to, I'll do it if anything)
```

- new files can be recorded into userChrome.css or userContent.css depending on if it relates to browser style or content style.
- new changes can be recorded into changelog.md, credit your changes here if you want to.

## AI

I previously stated in this contributing guide, "No AI". My stance on AI has changed a bit. I Still don't really think AI can properly work with firefox source in relation to css, too many nuances to account for, but I know it can be useful somehow. I'm open to AI commits as long as you are able to babysit/review/confirm the validity of whatever the implementation might be.

## Documentation

A lot of the FF Ultima documentation (wiki) is pulled from comments and descriptions taken straight from the themes source files. Images/gifs/previews are created on the spot to give users a visual idea of what a setting or feature will do. If you want Users to see or understand something in a specific way, feel free to leave comments throughout the source and/or include previews in PR. they can also be used in the Wiki. https://github.com/ff-ultima/ff-ultima.github.io.

For contributing to the Wiki (seperately from the theme).. it's as simple as creating a new markdown file [here](https://github.com/ff-ultima/ff-ultima.github.io/tree/main/docs), or editting the existing documents found in the docs/ folder. So if you ever see room for improvement, any and all help is welcome.

### Thanks for reading!
