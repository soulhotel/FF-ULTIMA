# About userchromejs/

This implementation of userchromejs is sourced from MrOtherGuy's fx-autoconfig https://github.com/MrOtherGuy/fx-autoconfig.

Modified for integration into FF Ultima by simply redirecting the loader towards `chrome/userchromejs/` instead of what is typically `chrome/` (to keep from dumping all these files straight into the chrome folder).

Any uc.js scripts compatible with autoconfig should remain compatible with this integration.

# Modifications made to fx-autoconfig

- Most userchromejs integrations direct scripts to `chrome/JS` or `chrome/scripts`. Here scripts belong in `chrome/userchrome/scripts`.
- The `firefox/config.js` that belongs in the Firefox install directory has been modified to point to `cmanifest.append('userchromejs');` (this folder)
- The `firefox/config.js` that belongs in the Firefox install directory has been modified to enable `defaultPref('userChromeJS.gBrowser_hack.enabled', true);`
- The `utils/chrome.manifest` file has been modified to also point to our `scripts` folder.