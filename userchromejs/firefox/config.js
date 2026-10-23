// skip 1st line
defaultPref('userChromeJS.gBrowser_hack.enabled', true);
defaultPref('userChromeJS.firstRunShown', true);

try {
    
  let cmanifest = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get('UChrm', Ci.nsIFile);
  cmanifest.append('userchromejs');
  cmanifest.append('utils');
  cmanifest.append('chrome.manifest');
  
  if(cmanifest.exists()){
    Components.manager.QueryInterface(Ci.nsIComponentRegistrar).autoRegister(cmanifest);
    ChromeUtils.importESModule('chrome://userchromejs/content/boot.sys.mjs');
  }

} catch(ex) {};