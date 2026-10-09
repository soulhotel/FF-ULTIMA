/* exported ChromeManifest */
"use strict";

/**
 * A default map, which assumes a default value on get() if the key doesn't exist
 */
class DefaultMap extends Map {
  /**
   * Constructs the default map
   *
   * @param {Function} _default     A function that returns the default value for this map
   * @param {*} iterable            An iterable to initialize the map with
   */
  constructor(_default, iterable) {
    super(iterable);
    this._default = _default;
  }

  /**
   * Get the given key, creating if necessary
   *
   * @param {String} key            The key of the map to get
   * @param {Boolean} create        True, if the key should be created in case it doesn't exist.
   */
  get(key, create = true) {
    if (this.has(key)) {
      return super.get(key);
    } else if (create) {
      this.set(key, this._default());
      return super.get(key);
    }

    return this._default();
  }
}

/**
 * A parser for chrome.manifest files. Implements a subset of
 * https://developer.mozilla.org/en-US/docs/Mozilla/Chrome_Registration
 */
export class ChromeManifest {
  /**
   * Constucts the chrome.manifest parser
   *
   * @param {Function} loader           An asynchronous function that will load further files, e.g.
   *                                      those included via the |manifest| instruction. The
   *                                      function will take the file as an argument and should
   *                                      resolve with the string contents of that file
   * @param {Object} options            Object describing the current system. The keys are manifest
   *                                      instructions
   */
  constructor(loader, options) {
    this.loader = loader;
    this.options = options;

    this.overlay = new DefaultMap(() => []);
    this.locales = new DefaultMap(() => new Map());
    this.style = new DefaultMap(() => new Set());
    this.category = new DefaultMap(() => new Map());

    this.component = new Map();
    this.contract = new Map();

    this.content = new Map();
    this.skin = new DefaultMap(() => new Map());
    this.resource = new Map();
    this.override = new Map();
  }

  /**
   * Parse the given file.
   *
   * @param {String} filename           The filename to load
   * @param {String} base               The relative directory this file is expected to be in.
   * @return {Promise}                  Resolved when loading completes
   */
  async parse(filename = "chrome.manifest", base = "") {
    await this.parseString(await this.loader(filename), base);
  }

  /**
   * Parse the given string.
   *
   * @param {String} data               The file data to load
   * @param {String} base               The relative directory this file is expected to be in.
   * @return {Promise}                  Resolved when loading completes
   */
  async parseString(data, base = "") {
    const lines = data.split("\n");
    const extraManifests = [];
    for (const line of lines) {
      const parts = line.split(/\s+/);
      const directive = parts.shift();
      switch (directive) {
        case "manifest":
          extraManifests.push(this._parseManifest(base, ...parts));
          break;
        case "component": this._parseComponent(...parts);
          break;
        case "contract": this._parseContract(...parts);
          break;
        case "category": this._parseCategory(...parts);
          break;
        case "content": this._parseContent(...parts);
          break;
        case "locale": this._parseLocale(...parts);
          break;
        case "skin": this._parseSkin(...parts);
          break;
        case "resource": this._parseResource(...parts);
          break;
        case "overlay": this._parseOverlay(...parts);
          break;
        case "style": this._parseStyle(...parts);
          break;
        case "override": this._parseOverride(...parts);
          break;
      }
    }

    await Promise.all(extraManifests);
  }

  /**
   * Ensure the flags provided for the instruction match our options
   *
   * @param {String[]} flags        An array of raw flag values in the form key=value.
   * @return {Boolean}              True, if the flags match the options provided in the constructor
   */
  _parseFlags(flags) {
    const matchString = (a, sign, b) => {
      if (sign != "=") {
        console.warn(`Invalid sign ${sign} in ${a}${sign}${b}, dropping manifest instruction`);
        return false;
      }
      return a == b;
    };

    const matchVersion = (a, sign, b) => {
      switch (sign) {
        case "=": return Services.vc.compare(a, b) == 0;
        case ">": return Services.vc.compare(a, b) > 0;
        case "<": return Services.vc.compare(a, b) < 0;
        case ">=": return Services.vc.compare(a, b) >= 0;
        case "<=": return Services.vc.compare(a, b) <= 0;
        default:
          console.warn(`Invalid sign ${sign} in ${a}${sign}${b}, dropping manifest instruction`);
          return false;
      }
    };

    const flagdata = new DefaultMap(() => []);

    const flagMatches = (key, typeMatch) => {
      return !flagdata.has(key) || flagdata.get(key).some(val => typeMatch(this.options[key], ...val));
    };

    for (const flag of flags) {
      const match = flag.match(/(\w+)(>=|<=|<|>|=)(.*)/);
      if (match) {
        flagdata.get(match[1]).push([match[2], match[3]]);
      } else {
        console.warn(`Invalid flag ${flag}, dropping manifest instruction`);
      }
    }

    return flagMatches("application", matchString) &&
           flagMatches("appversion", matchVersion) &&
           flagMatches("platformversion", matchVersion) &&
           flagMatches("os", matchString) &&
           flagMatches("osversion", matchVersion) &&
           flagMatches("abi", matchString);
  }

  /**
   * Parse the manifest instruction, to load other files
   *
   * @param {String} base       The base directory the manifest file is in
   * @param {String} filename   The file and path to load
   * @param {...String} flags   The flags for this instruction
   * @return {Promise}          Promise resolved when the manifest is loaded
   */
  async _parseManifest(base, filename, ...flags) {
    if (this._parseFlags(flags)) {
      const dirparts = filename.split("/");
      dirparts.pop();

      try {
        await this.parse(filename, base + "/" + dirparts.join("/"));
      } catch (e) {
        console.log(`Could not read manifest '${base}/${filename}'.`);
      }
    }
    return null;
  }

  /**
   * Parse the component instruction, to load xpcom components
   *
   * @param {String} classid        The xpcom class id to load
   * @param {String} loction        The file location of this component
   * @param {...String} flags       The flags for this instruction
   */
  _parseComponent(classid, location, ...flags) {
    if (this._parseFlags(flags)) {
      this.component.set(classid, location);
    }
  }

  /**
   * Parse the contract instruction, to load xpcom contract ids
   *
   * @param {String} contractid     The xpcom contract id to load
   * @param {String} location       The file location of this component
   * @param {...String} flags       The flags for this instruction
   */
  _parseContract(contractid, location, ...flags) {
    if (this._parseFlags(flags)) {
      this.contract.set(contractid, location);
    }
  }

  /**
   * Parse the category instruction, to set up xpcom categories
   *
   * @param {String} category       The name of the category
   * @param {String} entryName      The category entry name
   * @param {String} value          The category entry value
   * @param {...String} flags       The flags for this instruction
   */
  _parseCategory(category, entryName, value, ...flags) {
    if (this._parseFlags(flags)) {
      this.category.get(category).set(entryName, value);
    }
  }

  /**
   * Parse the content instruction, to set chrome content locations
   *
   * @param {String} shortname      The content short name, e.g. chrome://shortname/content/
   * @param {String} location       The location for this content registration
   * @param {...String} flags       The flags for this instruction
   */
  _parseContent(shortname, location, ...flags) {
    if (this._parseFlags(flags)) {
      this.content.set(shortname, location);
    }
  }

  /**
   * Parse the locale instruction, to set chrome locale locations
   *
   * @param {String} shortname      The locale short name, e.g. chrome://shortname/locale/
   * @param {String} location       The location for this locale registration
   * @param {...String} flags       The flags for this instruction
   */
  _parseLocale(shortname, locale, location, ...flags) {
    if (this._parseFlags(flags)) {
      this.locales.get(shortname).set(locale, location);
    }
  }

  /**
   * Parse the skin instruction, to set chrome skin locations
   *
   * @param {String} shortname      The skin short name, e.g. chrome://shortname/skin/
   * @param {String} location       The location for this skin registration
   * @param {...String} flags       The flags for this instruction
   */
  _parseSkin(packagename, skinname, location, ...flags) {
    if (this._parseFlags(flags)) {
      this.skin.get(packagename).set(skinname, location);
    }
  }

  /**
   * Parse the resource instruction, to set up resource uri subtitutions
   *
   * @param {String} packagename    The resource package name, e.g. resource://packagename/
   * @param {String} url            The location for this content registration
   * @param {...String} flags       The flags for this instruction
   */
  _parseResource(packagename, location, ...flags) {
    if (this._parseFlags(flags)) {
      this.resource.set(packagename, location);
    }
  }

  /**
   * Parse the overlay instruction, to set up xul overlays
   *
   * @param {String} targetUrl      The chrome target url
   * @param {String} overlayUrl     The url of the xul overlay
   * @param {...String} flags       The flags for this instruction
   */
  _parseOverlay(targetUrl, overlayUrl, ...flags) {
    if (this._parseFlags(flags)) {
      this.overlay.get(targetUrl).push(overlayUrl);
    }
  }

  /**
   * Parse the style instruction, to add stylesheets into chrome windows
   *
   * @param {String} uri            The uri of the chrome window
   * @param {String} sheet          The uri of the css sheet
   * @param {...String} flags       The flags for this instruction
   */
  _parseStyle(uri, sheet, ...flags) {
    if (this._parseFlags(flags)) {
      this.style.get(uri).add(sheet);
    }
  }

  /**
   * Parse the override instruction, to set chrome uri overrides
   *
   * @param {String} uri            The uri being overridden
   * @param {String} newuri         The replacement uri for the original location
   * @param {...String} flags       The flags for this instruction
   */
  _parseOverride(uri, newuri, ...flags) {
    if (this._parseFlags(flags)) {
      this.override.set(uri, newuri);
    }
  }

  /**
   * Output the manifest data as a string in chrome.manifest format
   * If root is provided, convert all relative locations to absolute paths.
   *
   * @param {String} [root]   The absolute path root to resolve relative locations
   * @return {String}         The manifest contents as a string
   */
  toString(root = "") {
    const lines = [];
    const isRelative = loc => {
      // Not absolute if doesn't start with /, \, or protocol (chrome://, resource://, etc)
      return (
        typeof loc === "string" &&
        !loc.match(/^(?:[a-zA-Z]+:|\\|\/)/)
      );
    };
    const absolutize = loc => {
      if (!root) return loc;
      if (loc === "/") return root;
      if (isRelative(loc)) {
        return root.replace(/[\\/]$/, "") + "/" + loc.replace(/^([\\\/])/, "");
      }
      return loc;
    };

    // Output components
    for (const [classid, location] of this.component) {
      lines.push(`component ${classid} ${absolutize(location)}`);
    }

    // Output contracts
    for (const [contractid, location] of this.contract) {
      lines.push(`contract ${contractid} ${absolutize(location)}`);
    }

    // Output categories
    for (const [category, entries] of this.category) {
      for (const [entryName, value] of entries) {
        lines.push(`category ${category} ${entryName} ${value}`);
      }
    }

    // Output content
    for (const [shortname, location] of this.content) {
      lines.push(`content ${shortname} ${absolutize(location)}`);
    }

    // Output locales
    for (const [shortname, locales] of this.locales) {
      for (const [locale, location] of locales) {
        lines.push(`locale ${shortname} ${locale} ${absolutize(location)}`);
      }
    }

    // Output skins
    for (const [packagename, skins] of this.skin) {
      for (const [skinname, location] of skins) {
        lines.push(`skin ${packagename} ${skinname} ${absolutize(location)}`);
      }
    }

    // Output resources
    for (const [packagename, location] of this.resource) {
      lines.push(`resource ${packagename} ${absolutize(location)}`);
    }

    // Output overlays
    for (const [targetUrl, overlays] of this.overlay) {
      for (const overlayUrl of overlays) {
        lines.push(`overlay ${targetUrl} ${absolutize(overlayUrl)}`);
      }
    }

    // Output styles
    for (const [uri, sheets] of this.style) {
      for (const sheet of sheets) {
        lines.push(`style ${uri} ${absolutize(sheet)}`);
      }
    }

    // Output overrides
    for (const [uri, newuri] of this.override) {
      lines.push(`override ${uri} ${newuri}`);
    }

    return lines.join("\n");
  }
}
