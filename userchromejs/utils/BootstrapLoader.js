/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const Services = globalThis.Services;

ChromeUtils.defineESModuleGetters(this, {
  Blocklist: 'resource://gre/modules/Blocklist.sys.mjs',
  ConsoleAPI: 'resource://gre/modules/Console.sys.mjs',
  InstallRDF: 'chrome://userchromejs/content/RDFManifestConverter.sys.mjs',
  NetUtil: 'resource://gre/modules/NetUtil.sys.mjs',
});

const {AddonManager, AddonManagerPrivate} = ChromeUtils.importESModule(
  'resource://gre/modules/AddonManager.sys.mjs'
);
const {XPIDatabase, AddonInternal} = ChromeUtils.importESModule(
  'resource://gre/modules/addons/XPIDatabase.sys.mjs'
);
const {XPIExports} = ChromeUtils.importESModule('resource://gre/modules/addons/XPIExports.sys.mjs');

ChromeUtils.defineLazyGetter(this, 'BOOTSTRAP_REASONS', () => {
  const {XPIProvider} = ChromeUtils.importESModule(
    'resource://gre/modules/addons/XPIProvider.sys.mjs'
  );
  return XPIProvider.BOOTSTRAP_REASONS;
});

ChromeUtils.defineLazyGetter(this, 'logger', () => {
  const {ConsoleAPI} = ChromeUtils.importESModule('resource://gre/modules/Console.sys.mjs');
  const consoleOptions = {
    maxLogLevel: 'all',
    prefix: 'BootstrapLoader',
  };
  return new ConsoleAPI(consoleOptions);
});

/**
 * True when a legacy-extension loader equivalent to this file is already
 * provided by the browser itself.
 *
 * Waterfox bundles its own BootstrapLoader, so this copy must stay inert there
 * (config.js skips loading this file on Waterfox for the same reason; this
 * guard also covers a user-modified config.js that loads it unconditionally).
 * The brand regex is the primary, deterministic signal — autoconfig runs before
 * AddonManager startup, so the registry is empty at this point on every
 * browser; it protects only later evaluations. The external-loader registry is
 * the secondary, name-independent signal: AddonManagerPrivate (internal export
 * of AddonManager.sys.mjs, the same surface XPIProvider and XPIInstall consume)
 * exposes externalExtensionLoaders, a Map keyed by loader.name. NOTE: the
 * public AddonManager object does NOT expose the registry. Because
 * addExternalExtensionLoader registers under the key 'bootstrap' as well, the
 * registry also makes a re-evaluation of this file (e.g. a user script loading
 * it into its own sandbox after AddonManager startup) inert on any browser.
 */
function bootstrapLoaderBundled() {
  if (/waterfox/i.test(Services.appinfo.name)) {
    return true;
  }
  try {
    const registry = AddonManagerPrivate?.externalExtensionLoaders;
    if (!registry) {
      return false;
    }
    if (registry.get('bootstrap')) {
      return true;
    }
    for (const loader of registry.values()) {
      if (loader && loader.manifestFile === 'install.rdf') {
        return true;
      }
    }
  } catch {
    // Registry unavailable (older Gecko / exotic build): brand check only.
  }
  return false;
}

/** Valid IDs fit this pattern. */
const gIDTest =
  // eslint-disable-next-line no-useless-escape
  /^(\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}|[a-z0-9-\._]*\@[a-z0-9-\._]+)$/i;

// Properties that exist in the install manifest
const PROP_METADATA = [
  'id',
  'version',
  'type',
  'internalName',
  'updateURL',
  'optionsURL',
  'optionsType',
  'aboutURL',
  'iconURL',
];
const PROP_LOCALE_SINGLE = ['name', 'description', 'creator', 'homepageURL'];
const PROP_LOCALE_MULTI = ['developers', 'translators', 'contributors'];

// Map new string type identifiers to old style nsIUpdateItem types.
// Retired values:
// 32 = multipackage xpi file
// 8 = locale
// 256 = apiextension
// 128 = experiment
// theme = 4
const TYPES = {
  extension: 2,
  dictionary: 64,
};

const COMPATIBLE_BY_DEFAULT_TYPES = {
  extension: true,
  dictionary: true,
};

const hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

function isXPI(filename) {
  const ext = filename.slice(-4).toLowerCase();
  return ext === '.xpi' || ext === '.zip';
}

/**
 * Gets an nsIURI for a file within another file, either a directory or an XPI
 * file. If aFile is a directory then this will return a file: URI, if it is an
 * XPI file then it will return a jar: URI.
 *
 * @param {nsIFile} aFile The file containing the resources, must be either a
 *   directory or an XPI file
 * @param {string} aPath The path to find the resource at, '/' separated. If
 *   aPath is empty then the uri to the root of the contained files will be
 *   returned
 * @returns {nsIURI} An nsIURI pointing at the resource
 */
function getURIForResourceInFile(aFile, aPath) {
  if (!isXPI(aFile.leafName)) {
    const resource = aFile.clone();
    if (aPath) aPath.split('/').forEach(part => resource.append(part));

    return Services.io.newFileURI(resource);
  }

  return buildJarURI(aFile, aPath);
}

/**
 * Creates a jar: URI for a file inside a ZIP file.
 *
 * @param {nsIFile} aJarfile The ZIP file as an nsIFile
 * @param {string} aPath The path inside the ZIP file
 * @returns {nsIURI} An nsIURI for the file
 */
function buildJarURI(aJarfile, aPath) {
  let uri = Services.io.newFileURI(aJarfile);
  uri = 'jar:' + uri.spec + '!/' + aPath;
  return Services.io.newURI(uri);
}

const BootstrapLoader = {
  name: 'bootstrap',
  manifestFile: 'install.rdf',
  async loadManifest(pkg) {
    /**
     * Reads locale properties from either the main install manifest root or an
     * em:localized section in the install manifest.
     *
     * @param {Object} aSource The resource to read the properties from.
     * @param {boolean} isDefault True if the locale is to be read from the main
     *   install manifest root
     * @param {string[]} aSeenLocales An array of locale names already seen for
     *   this install manifest. Any locale names seen as a part of this function
     *   will be added to this array
     * @returns {Object} an object containing the locale properties
     */
    function readLocale(aSource, isDefault, aSeenLocales) {
      const locale = {};
      if (!isDefault) {
        locale.locales = [];
        for (const localeName of aSource.locales || []) {
          if (!localeName) {
            logger.warn('Ignoring empty locale in localized properties');
            continue;
          }
          if (aSeenLocales.includes(localeName)) {
            logger.warn('Ignoring duplicate locale in localized properties');
            continue;
          }
          aSeenLocales.push(localeName);
          locale.locales.push(localeName);
        }

        if (locale.locales.length == 0) {
          logger.warn('Ignoring localized properties with no listed locales');
          return null;
        }
      }

      for (const prop of [...PROP_LOCALE_SINGLE, ...PROP_LOCALE_MULTI]) {
        if (hasOwnProperty(aSource, prop)) {
          locale[prop] = aSource[prop];
        }
      }

      return locale;
    }

    const manifestData = await pkg.readString('install.rdf');
    const manifest = InstallRDF.loadFromString(manifestData).decode();

    const addon = new AddonInternal();
    for (const prop of PROP_METADATA) {
      if (hasOwnProperty(manifest, prop)) {
        addon[prop] = manifest[prop];
      }
    }

    if (!addon.type) {
      addon.type = 'extension';
    } else {
      const type = addon.type;
      addon.type = null;
      for (const name in TYPES) {
        if (TYPES[name] == type) {
          addon.type = name;
          break;
        }
      }
    }

    if (!(addon.type in TYPES))
      throw new Error('Install manifest specifies unknown type: ' + addon.type);

    if (!addon.id) throw new Error('No ID in install manifest');
    if (!gIDTest.test(addon.id)) throw new Error('Illegal add-on ID ' + addon.id);
    if (!addon.version) throw new Error('No version in install manifest');

    addon.strictCompatibility =
      !(addon.type in COMPATIBLE_BY_DEFAULT_TYPES) || manifest.strictCompatibility == 'true';

    // Only read these properties for extensions.
    if (addon.type == 'extension') {
      if (manifest.bootstrap != 'true') {
        throw new Error('Non-restartless extensions no longer supported');
      }

      if (
        addon.optionsType &&
        addon.optionsType != 1 /*AddonManager.OPTIONS_TYPE_DIALOG*/ &&
        addon.optionsType != AddonManager.OPTIONS_TYPE_INLINE_BROWSER &&
        addon.optionsType != AddonManager.OPTIONS_TYPE_TAB
      ) {
        throw new Error('Install manifest specifies unknown optionsType: ' + addon.optionsType);
      }

      if (addon.optionsType) addon.optionsType = parseInt(addon.optionsType);
    }

    addon.defaultLocale = readLocale(manifest, true);

    const seenLocales = [];
    addon.locales = [];
    for (const localeData of manifest.localized || []) {
      const locale = readLocale(localeData, false, seenLocales);
      if (locale) addon.locales.push(locale);
    }

    const dependencies = new Set(manifest.dependencies);
    addon.dependencies = Object.freeze(Array.from(dependencies));

    const seenApplications = [];
    addon.targetApplications = [];
    for (const targetApp of manifest.targetApplications || []) {
      if (!targetApp.id || !targetApp.minVersion || !targetApp.maxVersion) {
        logger.warn('Ignoring invalid targetApplication entry in install manifest');
        continue;
      }
      if (seenApplications.includes(targetApp.id)) {
        logger.warn(
          'Ignoring duplicate targetApplication entry for ' + targetApp.id + ' in install manifest'
        );
        continue;
      }
      seenApplications.push(targetApp.id);
      addon.targetApplications.push(targetApp);
    }

    // Note that we don't need to check for duplicate targetPlatform entries since
    // the RDF service coalesces them for us.
    addon.targetPlatforms = [];
    for (const targetPlatform of manifest.targetPlatforms || []) {
      const platform = {
        os: null,
        abi: null,
      };

      const pos = targetPlatform.indexOf('_');
      if (pos != -1) {
        platform.os = targetPlatform.substring(0, pos);
        platform.abi = targetPlatform.substring(pos + 1);
      } else {
        platform.os = targetPlatform;
      }

      addon.targetPlatforms.push(platform);
    }

    addon.userDisabled = false;
    addon.softDisabled = addon.blocklistState == Blocklist.STATE_SOFTBLOCKED;
    addon.applyBackgroundUpdates = AddonManager.AUTOUPDATE_DEFAULT;

    addon.userPermissions = null;

    addon.icons = {};
    if (await pkg.hasResource('icon.png')) {
      addon.icons[32] = 'icon.png';
      addon.icons[48] = 'icon.png';
    }

    if (await pkg.hasResource('icon64.png')) {
      addon.icons[64] = 'icon64.png';
    }

    Object.defineProperty(addon, 'appDisabled', {
      set: _ => {},
      get: _ => false,
    });

    Object.defineProperty(addon, 'signedState', {
      set: _ => {},
      get: _ => AddonManager.SIGNEDSTATE_NOT_REQUIRED,
    });

    return addon;
  },

  loadScope(addon) {
    const file = addon.file || addon._sourceBundle;
    const uri = getURIForResourceInFile(file, 'bootstrap.js').spec;
    const principal = Services.scriptSecurityManager.getSystemPrincipal();

    const sandbox = new Cu.Sandbox(principal, {
      sandboxName: uri,
      addonId: addon.id,
      wantGlobalProperties: ['ChromeUtils'],
      metadata: {addonID: addon.id, URI: uri},
    });

    try {
      Object.assign(sandbox, BOOTSTRAP_REASONS);

      ChromeUtils.defineLazyGetter(
        sandbox,
        'console',
        () => new ConsoleAPI({consoleID: `addon/${addon.id}`})
      );

      // prepare for bug 1974213 Don't allow file: and jar: schemes in Services.scriptloader.loadSubScript
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1974213
      let isDone = false;
      let loadError;
      let loadFailed = false;
      ChromeUtils.compileScript(uri)
        .then(script => script.executeInGlobal(sandbox))
        .catch(error => {
          loadError = error;
          loadFailed = true;
        })
        .finally(() => {
          isDone = true;
        });
      Services.tm.spinEventLoopUntil('Waiting for bootstrap.js to load', () => isDone);
      if (loadFailed) throw loadError;
    } catch (e) {
      logger.warn(`Error loading bootstrap.js for ${addon.id}`, e);
    }

    function findMethod(name) {
      if (sandbox[name]) {
        return sandbox[name];
      }

      try {
        const method = Cu.evalInSandbox(name, sandbox);
        return method;
      } catch {
        //
      }

      return () => {
        logger.warn(`Add-on ${addon.id} is missing bootstrap method ${name}`);
      };
    }

    const install = findMethod('install');
    const uninstall = findMethod('uninstall');
    const startup = findMethod('startup');
    const shutdown = findMethod('shutdown');

    /**
     * Reads content from a jar/folder URI
     *
     * @param {nsIURI} jarURI - The jar/folder URI to read from
     * @returns {string} The content of the file inside the JAR
     */
    function readFromJarURI(jarURI) {
      const input = Services.io
        .newChannelFromURI(
          jarURI,
          null,
          Services.scriptSecurityManager.getSystemPrincipal(),
          null,
          Ci.nsILoadInfo.SEC_ALLOW_CROSS_ORIGIN_SEC_CONTEXT_IS_NULL,
          Ci.nsIContentPolicy.TYPE_OTHER
        )
        .open();

      const data = NetUtil.readInputStreamToString(input, input.available(), {charset: 'UTF-8'});
      input.close();
      return data;
    }

    function absolutizePaths(file, line) {
      const manifestMethodPathLocation = {
        component: 2, // component classid uri/to/files/ [flags]
        contract: 2, // contract contractid uri/to/files/ [flags]
        content: 2, // content shortname uri/to/files/ [flags]
        locale: 3, // locale shortname localename uri/to/files/ [flags]
        skin: 3, // skin shortname skinname uri/to/files/ [flags]
        resource: 2, // resource packagename uri/to/files/ [flags]
        overlay: 2, // overlay targetUrl uri/to/files/ [flags]
        style: 2, // style uri uri/to/files/ [flags]
      };
      const isRelative = loc => {
        // Not absolute if doesn't start with \\, or protocol (chrome://, resource://, etc)
        return typeof loc === 'string' && !loc.match(/^(?:[a-zA-Z]+:|\\)/);
      };

      const words = line.trim().split(/\s+/);
      const index = manifestMethodPathLocation[words[0]];

      if (index && isRelative(words[index])) {
        words[index] = getURIForResourceInFile(file, words[index]).spec;
        line = words.join(' ');
      }

      return line;
    }

    // Register a chrome manifest temporarily and return a function which un-does
    // the registrarion when no longer needed.
    const tempDir = Services.dirsvc.get('ProfD', Ci.nsIFile);
    tempDir.append('browser-extension-data');
    tempDir.append(addon.id);

    // A killed session can leave a stale temporary manifest behind: a 0-byte
    // chrome.manifest (crash between truncate and remove) or a
    // chrome.manifest.<uuid> (leftover from a uuid-named temp-manifest loader
    // variant). Registrations are re-derived from what gets autoRegister'ed
    // this session, so leftovers are pure litter — sweep them at startup
    // before writing the fresh manifest.
    function sweepStaleManifests() {
      const stale = [];
      try {
        const entries = tempDir.directoryEntries;
        while (entries.hasMoreElements()) {
          const entry = entries.getNext().QueryInterface(Ci.nsIFile);
          if (entry.isFile() && entry.leafName.startsWith('chrome.manifest')) {
            stale.push(entry);
          }
        }
      } catch {
        return; // dir missing — nothing to sweep
      }
      for (const entry of stale) {
        try {
          entry.remove(false);
        } catch (e) {
          logger.warn(`Failed to remove stale manifest ${entry.path}`, e);
        }
      }
    }

    function createManifestTemporarily(manifestText) {
      sweepStaleManifests();
      const tempFile = tempDir.clone();
      tempFile.append('chrome.manifest');
      tempFile.exists();

      const foStream = Cc['@mozilla.org/network/file-output-stream;1'].createInstance(
        Ci.nsIFileOutputStream
      );
      foStream.init(tempFile, 0x02 | 0x08 | 0x20, 0o664, 0); // write, create, truncate
      foStream.write(manifestText, manifestText.length);
      foStream.close();

      Components.manager.QueryInterface(Ci.nsIComponentRegistrar).autoRegister(tempFile);

      Cc['@mozilla.org/chrome/chrome-registry;1']
        .getService(Ci.nsIXULChromeRegistry)
        .checkForNewChrome();

      return function () {
        tempFile.fileSize = 0; // truncate the manifest
        Cc['@mozilla.org/chrome/chrome-registry;1']
          .getService(Ci.nsIXULChromeRegistry)
          .checkForNewChrome();
        tempFile.remove(false);
      };
    }

    return {
      install(...args) {
        install(...args);
        // Forget any cached files we might've had from this extension.
        Services.obs.notifyObservers(null, 'startupcache-invalidate');
      },

      uninstall(...args) {
        uninstall(...args);
        // Forget any cached files we might've had from this extension.
        Services.obs.notifyObservers(null, 'startupcache-invalidate');
      },

      startup(...args) {
        if (addon.type == 'extension') {
          const installURI = getURIForResourceInFile(file, 'install.rdf');
          const installData = readFromJarURI(installURI);
          const {name, version} = InstallRDF.loadFromString(installData).getProps([
            'name',
            'version',
          ]);
          if (name && version) {
            logger.debug(`Registering manifest for: ${name} version ${version}\n${file.path}\n`);
          } else {
            logger.debug(`Registering manifest for ${file.path}\n`);
          }
          const manifestURI = getURIForResourceInFile(file, 'chrome.manifest');
          const manifestData = readFromJarURI(manifestURI);
          const chromeManifest = manifestData
            .split('\n')
            .map(absolutizePaths.bind(null, file))
            .join('\n');
          this._clearManifest = createManifestTemporarily(chromeManifest);
        }
        return startup(...args);
      },

      shutdown(data, reason) {
        try {
          return shutdown(data, reason);
        } finally {
          if (reason != BOOTSTRAP_REASONS.APP_SHUTDOWN) {
            logger.debug(`Removing manifest for ${file.path}\n`);
            this._clearManifest();
            this._clearManifest = null;
          }
        }
      },
    };
  },
};

/**
 * All top-level side effects of this file. Kept in one function so the
 * bundled-loader decision (bootstrapLoaderBundled) happens in exactly one
 * place, and so none of these blocks leak new global bindings on any browser.
 */
function initBootstrapLoader() {
  try {
    Services.obs.addObserver(doc => {
      if (doc.documentURI === 'chrome://browser/content/browser.xhtml') {
        const win = doc.defaultView;
        try {
          const {initScriptsUpdater} = ChromeUtils.importESModule(
            'chrome://firefox-scripts/content/scriptsUpdater.sys.mjs'
          );
          initScriptsUpdater(win);
        } catch (e2) {
          logger.warn('Firefox Scripts updater not available', e2);
        }
      }
    }, 'chrome-document-loaded');
  } catch (e) {
    logger.warn('Firefox Scripts updater init failed', e);
  }

  Services.obs.addObserver(doc => {
    if (
      doc.location.protocol + doc.location.pathname === 'about:addons' ||
      doc.location.protocol + doc.location.pathname ===
        'chrome:/content/extensions/aboutaddons.html'
    ) {
      const win = doc.defaultView;
      const handleEvent_orig = win.customElements.get('addon-card').prototype.handleEvent;
      win.customElements.get('addon-card').prototype.handleEvent = function (e) {
        if (
          e.type === 'click' &&
          e.target.getAttribute('action') === 'preferences' &&
          this.addon.__AddonInternal__.optionsType == 1 /*AddonManager.OPTIONS_TYPE_DIALOG*/ &&
          !!this.addon.optionsURL
        ) {
          const windows = Services.wm.getEnumerator(null);
          while (windows.hasMoreElements()) {
            const win2 = windows.getNext();
            if (win2.closed) {
              continue;
            }
            if (win2.document.documentURI == this.addon.optionsURL) {
              win2.focus();
              return;
            }
          }
          const features = 'chrome,titlebar,toolbar,centerscreen';
          win.docShell.rootTreeItem.domWindow.openDialog(
            this.addon.optionsURL,
            this.addon.id,
            features
          );
        } else {
          handleEvent_orig.apply(this, arguments);
        }
      };
      const update_orig = win.customElements.get('addon-options').prototype.update;
      win.customElements.get('addon-options').prototype.update = function (card, addon) {
        update_orig.apply(this, arguments);
        if (
          addon.__AddonInternal__?.optionsType == 1 /*AddonManager.OPTIONS_TYPE_DIALOG*/ &&
          !!addon.optionsURL
        )
          this.querySelector('panel-item[data-l10n-id="preferences-addon-button"]').hidden = false;
      };
    }
  }, 'chrome-document-loaded');

  XPIDatabase.isDisabledLegacy = () => false;

  const orig_verifyBundleSignedState = XPIExports.verifyBundleSignedState;
  XPIExports.verifyBundleSignedState = async (aBundle, aAddon) => {
    if ((!aAddon.isWebExtension && aAddon.type === 'extension') || aAddon.id.includes('_N_SIGN_'))
      return {signedState: undefined, signedTypes: []};
    return orig_verifyBundleSignedState(aBundle, aAddon);
  };

  AddonManager.addExternalExtensionLoader(BootstrapLoader);

  if (AddonManager.isReady) {
    AddonManager.getAllAddons().then(addons => {
      addons.forEach(addon => {
        if (addon.type == 'extension' && !addon.isWebExtension && !addon.userDisabled) {
          addon.reload();
        }
      });
    });
  }
}

if (!bootstrapLoaderBundled()) {
  initBootstrapLoader();
}
