// this script & the UCC extension both rely on each other
// when preferences are toggled in the extension, they are sent as events
// this script takes those preferences, treats them as moz-pref
// and toggles them in the browser

console.log("[userChromeCompanion][bridge] loaded");

// register communication bridge
try {
  ChromeUtils.registerWindowActor("UCCBridge", {
    parent: { esModuleURI: "resource://userchromejs/extensionBridgeParent.ucc.sys.mjs" },
    child: {
      esModuleURI: "resource://userchromejs/extensionBridgeChild.ucc.sys.mjs",
      events: {
        DOMContentLoaded: {},
        uccPing: { wantUntrusted: true },
        uccSetPrefs: { wantUntrusted: true },
        uccDeletePrefs: { wantUntrusted: true },
        uccGetPrefValues: { wantUntrusted: true },
      },
    },
    // child will identify and only operate within UCC
    matches: ["moz-extension://*/*"],
    allFrames: true,
    safeForUntrustedWebProcess: true,
  });
  console.log("[userChromeCompanion][bridge] registered successfully");
} catch (ex) { console.error("[userChromeCompanion][bridge] registration error ", ex); }

// i know wildcarding all extensions is risky, however UCC is generally safe,
// UCCBridge is single responsibility, read preference -> toggle preference.