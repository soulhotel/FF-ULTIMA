```
/*///////////////////////////////////////////////////////////////////////////////////////\

┏┓┏┓  ┳┳┓ ┏┳┓┳┳┳┓┏┓
┣ ┣   ┃┃┃  ┃ ┃┃┃┃┣┫
┻ ┻   ┗┛┗┛ ┻ ┻┛ ┗┛┗
                   
FF Ultima:         https://github.com/soulhotel/FF-ULTIMA
Wiki:              https://ff-ultima.github.io/docs/getting-started
Latest Version:    https://github.com/soulhotel/FF-ULTIMA/releases/latest                 
License:           https://github.com/soulhotel/FF-ULTIMA/blob/main/LICENSE MPL 2.0

\////////////////////////////////////////////////////////////////////////////////////////*/
```

This folder contains the source of FF Ultima's Setup Wizard. A webpage/webapp embedded/served via binary. It automates the downloading of our userchrome theme, moving theme files & autoconfig files in the appropriate directories, setting up userChrome Companion via mozilla AMO.

> Also don't mind the 1000 line main :) organization is planned.

<!-- Could consolidate these setup binaries into one .py, 
-------------------------------------------------------------------------------------------------

- The main process is altered after restarting Firefox,
- Release version of Firefox does not respect xpi non signature requirement
- It deletes the extension from the Browser on launch...
- Rude..
- Other versions (dev, nightly, etc) are fine but...
- userChrome Companion not being available to Release Firefox on first launch leaves the user with no FF Ultima configs existing yet
- userChrome Companion needs to be signed in order to avoid this behavior
- So this current iteration heavily relies on ucc next version making it into the Add On Store

-------------------------------------------------------------------------------------------------

A fall back if all else fails:

- something like this, extensionSideLoader.ucc.uc.js:
```js
const { AddonManager } = ChromeUtils.importESModule(
  "resource://gre/modules/AddonManager.sys.mjs"
);

(async () => {
  const ID = "userChromeCompanion@soulhotel.net";
  const existing = await AddonManager.getAddonByID(ID);
  if (existing?.isActive) return;

  const file = Services.dirsvc.get("ProfD", Ci.nsIFile);
  file.append("chrome");
  file.append("userChromeCompanion@soulhotel.net.xpi");             // or point at an unpacked source folder
  await AddonManager.installTemporaryAddon(file);
})();
```
- and an adjustment to main.go, source extension via chrome/userchromejs/extensionSideLoader.ucc.uc.js

-------------------------------------------------------------------------------------------------

main process restructure (todo)

- names.go or paths.go - need to consolidate all expected paths, files, etc, into 1 place. having them spread out amongst the files is a no no.
- install, uninstall, update, or steps/(individual steps)
- lastly, a good chunk of the logic is reusable -> utils/
- main.go should just be an entry point -->