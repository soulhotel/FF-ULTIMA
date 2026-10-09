// ==UserScript==
// @pref            ffu.navbar.menu
// @name            Ultima navbar selection menu
// @description     Toolbar button opens a panel to pick navbar mode: autohide / float / float full width
// @include         main
// ==/UserScript==

(function () {
  const WIDGET_ID = 'ultima-navbar-menu-button';
  const PANEL_ID = 'ultima-navbar-menu';
  const P_AUTO = 'ultima.navbar.autohide';
  const P_FLOAT = 'ultima.navbar.float';
  const P_FULL = 'ultima.navbar.float.full';
  const HTML_NS = 'http://www.w3.org/1999/xhtml';

  const prefs = Services.prefs;
  const getBool = p => {
    try {
      return prefs.getBoolPref(p, false);
    } catch (e) {
      return false;
    }
  };
  const setBool = (p, v) => {
    try {
      prefs.setBoolPref(p, !!v);
    } catch (e) {}
  };

  function currentMode() {
    if (getBool(P_FLOAT) && getBool(P_FULL)) return 'floatFull';
    if (getBool(P_FLOAT)) return 'float';
    if (getBool(P_AUTO)) return 'autohide';
    return 'default';
  }

  function selectMode(mode) {
    switch (mode) {
      case 'default':
        setBool(P_AUTO, false);
        setBool(P_FLOAT, false);
        setBool(P_FULL, false);
        break;
      case 'autohide':
        setBool(P_AUTO, true);
        setBool(P_FLOAT, false);
        setBool(P_FULL, false);
        break;
      case 'float':
        setBool(P_AUTO, false);
        setBool(P_FLOAT, true);
        setBool(P_FULL, false);
        break;
      case 'floatFull':
        setBool(P_AUTO, false);
        setBool(P_FLOAT, true);
        setBool(P_FULL, true);
        break;
    }
  }

  const h = (doc, tag) => doc.createElementNS(HTML_NS, tag);

  function buildCard(doc, mode, labelText, previewBuilder) {
    const card = h(doc, 'div');
    card.className = 'navbar-card';
    card.dataset.mode = mode;

    const preview = h(doc, 'div');
    preview.className = 'navbar-preview';
    previewBuilder(preview);
    card.appendChild(preview);

    const label = h(doc, 'div');
    label.className = 'navbar-label';
    label.textContent = labelText;
    card.appendChild(label);

    card.addEventListener('click', () => {
      selectMode(mode);
      const panel = doc.getElementById(PANEL_ID);
      panel?.hidePopup();
    });

    return card;
  }

  function createPanel(doc) {
    const popupSet = doc.getElementById('mainPopupSet');
    if (!popupSet) return null;

    const panel = doc.createXULElement('panel');
    panel.id = PANEL_ID;
    panel.setAttribute('type', 'arrow');
    panel.setAttribute('noautofocus', 'true');
    panel.setAttribute('position', 'after_start');

    const style = h(doc, 'style');
    style.textContent = `
      .navbar-menu-container {
        display: flex;
        flex-direction: column;
        --menu-gap: 8px;
        gap: var(--menu-gap);
      }
      .navbar-menu-header {
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
        padding-block: 0 12px;
        margin-block: 0 var(--menu-gap);
        border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent);
      }    
      .navbar-menu-row {
        display: flex;
        gap: var(--menu-gap);
      }
      .navbar-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--menu-gaps) - 2px);
        cursor: pointer;
        padding: 4px;
        padding-top: calc(var(--menu-gaps) + 6px);
        border-radius: 8px;
        border: 2px solid transparent;
      }
      .navbar-card:hover {
        background: var(--button-background-color-menu-hover);
      }
      .navbar-card.selected {
        background: var(--button-background-color-menu-hover);
      }
      .navbar-preview {
        position: relative;
        width: 96px;
        height: 60px;
        border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
        border-radius: 6px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .navbar-bar {
        position: absolute;
        height: 7px;
        top: 7px;
        border: 1px solid currentColor;
        box-sizing: border-box;
      }
      .navbar-bar.autohide {
        left: 6px;
        right: 6px;
        border-radius: 2px;
      }
      .navbar-bar.default {
        top: 0;
        left: 0;
        right: 0;
        height: 10px;
        border: none;
        border-bottom: 1px solid color-mix(in srgb, currentColor 35%, transparent);
        border-radius: 0;
      }
      .navbar-bar.pill {
        border-radius: 999px;
      }
      .navbar-arrow {
        position: absolute;
        top: 22px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        line-height: 1;
      }
      .navbar-label {
        font-size: 13px;
        text-align: center;
      }
    `;
    panel.appendChild(style);

    const content = h(doc, 'div');
    content.className = 'navbar-menu-container';
    panel.appendChild(content);

    const header = h(doc, 'div');
    header.className = 'navbar-menu-header';
    header.textContent = 'Nav Bar Styles';
    content.appendChild(header);

    const row = h(doc, 'div');
    row.className = 'navbar-menu-row';
    content.appendChild(row);

    row.appendChild(
      buildCard(doc, 'default', 'Default', preview => {
        const bar = h(doc, 'div');
        bar.className = 'navbar-bar default';
        preview.appendChild(bar);
      })
    );

    row.appendChild(
      buildCard(doc, 'autohide', 'Autohide', preview => {
        const bar = h(doc, 'div');
        bar.className = 'navbar-bar autohide';
        preview.appendChild(bar);
        const arrow = h(doc, 'div');
        arrow.className = 'navbar-arrow';
        arrow.textContent = '\u2191';
        preview.appendChild(arrow);
      })
    );

    row.appendChild(
      buildCard(doc, 'float', 'Float', preview => {
        const bar = h(doc, 'div');
        bar.className = 'navbar-bar pill';
        bar.style.left = '28px';
        bar.style.right = '28px';
        preview.appendChild(bar);
      })
    );

    row.appendChild(
      buildCard(doc, 'floatFull', 'Float Full Width', preview => {
        const bar = h(doc, 'div');
        bar.className = 'navbar-bar pill';
        bar.style.left = '14px';
        bar.style.right = '14px';
        preview.appendChild(bar);
      })
    );

    panel.addEventListener('popupshowing', () => {
      const mode = currentMode();
      for (const card of row.children) {
        card.classList.toggle('selected', card.dataset.mode === mode);
      }
    });

    popupSet.appendChild(panel);
    return panel;
  }

  function getOrCreatePanel(doc) {
    return doc.getElementById(PANEL_ID) || createPanel(doc);
  }

  const ICON_SVG =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>" +
    "<rect x='1' y='1' width='14' height='14' rx='2' ry='2' fill='none' stroke='context-fill' stroke-width='1.2'/>" +
    "<line x1='3.5' y1='4.5' x2='12.5' y2='4.5' stroke='context-fill' stroke-width='1.2' stroke-linecap='round'/>" +
    "<path d='M8 12.5V7M5.8 9.2L8 7l2.2 2.2' fill='none' stroke='context-fill' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/>" +
    "</svg>";

  const sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
  const iconCSS = `#${WIDGET_ID} .toolbarbutton-icon {
    list-style-image: url("data:image/svg+xml,${encodeURIComponent(ICON_SVG)}");
    -moz-context-properties: fill, stroke;
    fill: var(--toolbar-color);
    stroke: var(--toolbar-color);
  }`;
  const iconSheetURI = Services.io.newURI('data:text/css;charset=utf-8,' + encodeURIComponent(iconCSS));
  if (!sss.sheetRegistered(iconSheetURI, sss.AUTHOR_SHEET)) {
    sss.loadAndRegisterSheet(iconSheetURI, sss.AUTHOR_SHEET);
  }

  try {
    CustomizableUI.createWidget({
      id: WIDGET_ID,
      type: 'button',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      label: 'Toggle Navbar Styles',
      tooltiptext: 'Choose Navbar Style',
      onCommand(event) {
        const doc = event.target.ownerDocument;
        const panel = getOrCreatePanel(doc);
        panel?.openPopup(event.target, 'after_end');
      },
    });
  } catch (e) {}

  window.ffuDisableScript?.(() => {
    try {
      CustomizableUI.destroyWidget(WIDGET_ID);
    } catch (e) {}
    for (const win of Services.wm.getEnumerator('navigator:browser')) {
      const panel = win.document.getElementById(PANEL_ID);
      panel?.remove();
    }
    try {
      if (sss.sheetRegistered(iconSheetURI, sss.AUTHOR_SHEET)) sss.unregisterSheet(iconSheetURI, sss.AUTHOR_SHEET);
    } catch (e) {}
  });
})();