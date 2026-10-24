# About userchromejs/

This implementation of userchromejs is sourced from MrOtherGuy's fx-autoconfig https://github.com/MrOtherGuy/fx-autoconfig.

Modified for integration into FF Ultima by simply redirecting the loader towards `chrome/userchromejs/` instead of what is typically `chrome/` (to keep from dumping all these files straight into the chrome folder).

Any uc.js scripts compatible with autoconfig should remain compatible with this integration.

# Modifications made to fx-autoconfig

- Most userchromejs integrations direct scripts to `chrome/JS` or `chrome/scripts`. Here scripts belong in `chrome/userchrome/scripts`.
- The `firefox/config.js` that belongs in the Firefox install directory has been modified to point to `cmanifest.append('userchromejs');` (this folder)
- The `firefox/config.js` that belongs in the Firefox install directory has been modified to enable `defaultPref('userChromeJS.gBrowser_hack.enabled', true);`
- The `utils/chrome.manifest` file has been modified to also point to our `scripts` folder.

# Other Modifications seperate from fx-autoconfig

fx-autoconfig does not ship with legacy extension support, support is added via two modifications sourced from onemen's https://github.com/onemen/firefox-scripts. This allows support for extensions like TabMixPlus. The sourced utility scripts also remain unmodified. 
- The `firefox/config.js` that belongs in the Firefox install directory has been modified to include bootstraploader `Services.scriptloader.loadSubScript('chrome://userchromejs/content/BootstrapLoader.js');`
- And both `BootstrapLoader.js` & `RDFManifestConverter.sys.mjs` utilities have been added to `chrome/userchromejs/utils`

<!--bootstraploader notes:
the expected scripts updater is harmless, can just let that error out. waterfox harmless. i see where xpi patching takes place now, makes sense.

config:
i didnt try for this but seems fine, and loadsubscript call should be true

ChromeUtils.importESModule('resource://gre/modules/AddonManager.sys.mjs').AddonManagerPrivate.externalExtensionLoaders.has('bootstrap')-->
