// ==UserScript==
// @pref            ffu.urlbar.favicon
// @name            Urlbar favicons
// @description     Shows current tab's favicon inside the urlbar identity box
// @include         main
// @author          Aris
// ==/UserScript==

// 'Favicon in urlbars identity box' script for Firefox 115+ by Aris
//
// This script restores current pages favicon inside urlbar (aka location bar, address bar or awesome bar).
// [!] If a page does not offer a favicon, browser default branch icon is shown.
// [!] In a multi-window environment pages without favicons might show wrong icons.
// option: set icon for pages without favicon

(function () {
  const ID = 'favimginurlbar';
  const FALLBACK = 'chrome://branding/content/icon32.png'; // shown for pages without a favicon
  const EVENTS = ['TabAttrModified', 'TabSelect', 'TabClose'];

  const box = document.getElementById('identity-box');
  if (!box || document.getElementById(ID)) return;

  const img = document.createXULElement('image');
  img.id = ID;
  img.setAttribute('align', 'center');
  Object.assign(img.style, {
    width: '18px',
    height: '18px',
    margin: 'auto 3px',
    borderRadius: '4px',
  });

  const onClick = () => {
    const input = document.getElementById('urlbar-input');
    if (input) {
      input.focus();
      input.select();
    }
  };
  img.addEventListener('click', onClick);
  box.appendChild(img);

  // clear the timer, the delay does help the tab settle
  let timer = null;
  const update = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const src = gBrowser.selectedTab?.image || FALLBACK;
      img.style.listStyleImage = `url("${src.replace(/"/g, '\\"')}")`;
    }, 100);
  };
  for (const ev of EVENTS) document.addEventListener(ev, update);
  update();

  window.ffuDisableScript?.(() => {
    window.clearTimeout(timer);
    for (const ev of EVENTS) document.removeEventListener(ev, update);
    img.remove();
  });
})();