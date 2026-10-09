// ==UserScript==
// @pref            ffu.userChromeCompanion.enabled
// @name            userChrome Companion enabled checker
// @description     Ensures userChrome Companion is enabled
// @include         main
// ==/UserScript==

(function () {
  const ID = 'userChromeCompanion@soulhotel.net';
  const MUST_BE_SIGNED = true;
  const PREF = 'ffu.userChromeCompanion.enabled';
  const LOG = '[FF Ultima][userChromeCompanion checker]';

  const PB_PERM = 'internal:privateBrowsingAllowed'; // run in private windows
  const QUARANTINE_PERM = 'internal:quarantineIgnoredByUser'; // run on sites with restrict

  const { AddonManager } = ChromeUtils.importESModule('resource://gre/modules/AddonManager.sys.mjs');
  const { ExtensionPermissions } = ChromeUtils.importESModule('resource://gre/modules/ExtensionPermissions.sys.mjs');

  let cancelled = false;

  window.ffuDisableScript?.(async () => {
    cancelled = true;
    try {
      const addon = await AddonManager.getAddonByID(ID);
      if (addon && !addon.userDisabled) await addon.disable();
      console.log(`${LOG} pref off, extension disabled`);
    } catch (e) {
      console.error(`${LOG} cleanup failed`, e);
    }
  });

  const isOn = () => {
    try {
      return Services.prefs.getBoolPref(PREF, false) === true;
    } catch {
      return false;
    }
  };

  async function grantPermissions(addon) {
    const granted = (await ExtensionPermissions.get(ID)) || { permissions: [], origins: [] };
    const have = new Set(granted.permissions);
    const haveOrigins = new Set(granted.origins);

    const wanted = [PB_PERM, QUARANTINE_PERM].filter(p => !have.has(p));

    const optional = addon.optionalPermissions || {};
    for (const p of optional.permissions || []) if (!have.has(p)) wanted.push(p);
    const origins = (optional.origins || []).filter(o => !haveOrigins.has(o));

    try {
      const manifest = WebExtensionPolicy.getByID(ID)?.extension?.manifest;
      if (manifest?.manifest_version === 3) {
        for (const o of manifest.host_permissions || []) {
          if (!haveOrigins.has(o) && !origins.includes(o)) origins.push(o);
        }
      }
    } catch {}

    if (wanted.length || origins.length) {
      await ExtensionPermissions.add(ID, { permissions: wanted, origins });
      console.log(`${LOG}[grantPermissions] granted`, { permissions: wanted, origins });
    }
  }

  async function discovery() {
    const addon = await AddonManager.getAddonByID(ID);
    if (cancelled) return;
    if (!addon) {
      console.warn(`${LOG}[discovery] ${ID} not found on this Profile`);
      return;
    }

    // safety measure
    if (MUST_BE_SIGNED) {
      const signed =
        addon.signedState === AddonManager.SIGNEDSTATE_SIGNED ||
        addon.signedState === AddonManager.SIGNEDSTATE_PRIVILEGED;
      if (!signed) {
        console.warn(`${LOG}[SIGNED CHECK] ${ID} is not signed, is this the right userChromeCompanion?`);
        return;
      }
    }

    if (addon.applyBackgroundUpdates !== AddonManager.AUTOUPDATE_ENABLE) {
      addon.applyBackgroundUpdates = AddonManager.AUTOUPDATE_ENABLE;
    }

    try {
      await grantPermissions(addon);
    } catch (e) {
      console.error(`${LOG}[grantPermissions] permission grant failed`, e);
    }
    if (cancelled) return;

    if (isOn() && addon.userDisabled) {
      await addon.enable();
      console.log(`${LOG}${ID} extension enabled`);
    }
  }

  discovery().catch(e => console.error(`${LOG} failed`, e));
})();
