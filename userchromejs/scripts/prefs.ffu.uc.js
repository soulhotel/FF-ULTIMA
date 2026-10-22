// ==UserScript==
// @name            Enables recommended preferences for FF Ultima
// @description     Enables preferences like userChrome stylesheets, aboutconfig warning (off), css has selector, sidebar animation speed tweak, & more
// @include         main
// ==/UserScript==

// this prefs script serves as a sort of "First Time - Preference Check"..
// apply these once, mark as handled (ffu.enable-recommended-prefs = handled),
// then never touch them again, anything the user changes after is respected.

(function () {
  
  const ENABLER_PREF = 'ffu.enable-recommended-prefs';
  const HANDLED = 'handled';

  const recommendedPrefs = [
    ['ffu.userChromeCompanion.enabled', true], /*triggers */
    ['toolkit.legacyUserProfileCustomizations.stylesheets', true], /* the idea was to ensure css is enabled in browser, but these scripts operate at a later threshold than runtime, so setupwizard handles this now instead */
    ['browser.aboutConfig.showWarning', false], /* this is everything below it are mostly qol */
    ['devtools.debugger.remote-enabled', true],
    ['devtools.chrome.enabled', true],
    ['devtools.debugger.prompt-connection', false],
    ['svg.context-properties.content.enabled', true],
    ['layout.css.has-selector.enabled', true],
    ['widget.gtk.ignore-bogus-leave-notify', 1],
    ['widget.gtk.rounded-bottom-corners.enabled', true],
    ['widget.gtk.native-context-menus', false],
    ['sidebar.animation.expand-on-hover.duration-ms', 200],
    ['sidebar.animation.expand-on-hover.delay-duration-ms', 0],
    ['browser.newtabpage.activity-stream.newtabWallpapers.user.enabled', false],
    ['widget.macos.native-context-menus', false]
  ];

  const prefs = Services.prefs;

  if (prefs.getStringPref(ENABLER_PREF, '') === HANDLED) return;

  for (const [name, value] of recommendedPrefs) {
    try {
      if (typeof value === 'boolean') prefs.setBoolPref(name, value);
      else if (typeof value === 'number') prefs.setIntPref(name, value);
      else prefs.setStringPref(name, String(value));
    } catch (e) {
      console.error(`[FF Ultima][prefs] could not set ${name}`, e);
    }
  }

  prefs.setStringPref(ENABLER_PREF, HANDLED);
  console.log('[FF Ultima][prefs] recommended preferences applied');
})();