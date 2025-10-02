```
/*///////////////////////////////////////////////////////////////////////////////////////\

┏┓┏┓  ┳┳┓ ┏┳┓┳┳┳┓┏┓
┣ ┣   ┃┃┃  ┃ ┃┃┃┃┣┫
┻ ┻   ┗┛┗┛ ┻ ┻┛ ┗┛┗
                   
FF Ultima:         https://github.com/soulhotel/FF-ULTIMA
Wiki:              https://ff-ultima.github.io/docs/getting-started
Latest Version:    https://github.com/soulhotel/FF-ULTIMA/releases/latest                 
License:           MPL 2.0 https://github.com/soulhotel/FF-ULTIMA/blob/main/LICENSE

\////////////////////////////////////////////////////////////////////////////////////////*/
```

The `.autoconfig/` folder sources userchromejs/autoconfig setup files from https://github.com/AlexVallat/firefox-scripts, these files include 1 minor modification that allows users to organize their custom scripts in `chrome/scripts/`.

You can setup autoconfig by simply moving these foundational files out of `.autoconfig/` and into `chrome` and the `firefox directory`. See the wiki documentation for more detail and customization.

https://ff-ultima.github.io/docs/settings/userchrome-and-autoconfig/setup


<!--
add buttons into the vertical tabs button group should be [AREA_VERTICAL_TABSTRIP](https://github.com/mozilla/gecko-dev/blob/master/browser/components/customizableui/CustomizableUI.sys.mjs) but it's failing. Injecting the button into tools-and-extensions while copying the styling of the other tab strip buttons failing, it might have been due to the shadow-root, but i either couldnt identify it properly or just didn't know what I was doing.

https://github.com/mozilla/gecko-dev/tree/master/browser/components/customizableui
-->