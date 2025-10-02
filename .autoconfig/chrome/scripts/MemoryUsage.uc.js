// ==UserScript==
// @name          memory usage in toolbar
// @namespace     http://space.geocities.yahoo.co.jp/gl/alice0775
// @description   Shows Firefox Memory Usage in Toolbar
// @include       main
// @async          true
// @charset       UTF-8
// @author        Alice0775
// @compatibility 140
// @version       2025/10/01 use LocaleString
// @version       2025/07/12 display resident-unique memory
// @version       2025/07/12 display gpu memory
// @version       2025/06/09 remove removal attribute
// @version       2025/06/08 use onCreaded instead of onBuild
// @version       2025/05/01 fix command
// @version       2025/04/14 fix register eventListener
// @version       2025/04/07 fix working within sandbox
// @version       2024/12/22 fix Bug 1936336 - Disallow inline event handlers// @version       2022/03/31 23:00 Clicking on the button minimizes memory and updates the usage display.
// @version       2021/06/17 19:00
// @version       2021/06/15
// ==/UserScript==
window.ucjsMemoryUsage = {
  INTERVAL: 60, //sec 重いかも

  MRM : Components.classes['@mozilla.org/memory-reporter-manager;1']
         .getService(Components.interfaces.nsIMemoryReporterManager),

  init: function() {
    if (!document.getElementById("memoryUsageButton"))
    try {
      CustomizableUI.createWidget({
          id: 'memoryUsageButton',
          type: 'button',
          defaultArea: CustomizableUI.AREA_NAVBAR,
          class: 'toolbarbutton-1 chromeclass-toolbar-additional',
          label: 'MemoryUsage',
          tooltiptext: 'MinimizeMemoryUsage',
          onClick(event) {
              event.target.ownerGlobal.ucjsMemoryUsage.MRM.minimizeMemoryUsage(()=>{});
              event.target.ownerGlobal.ucjsMemoryUsage.requestMemory()
          },
         	onCreated(toolbaritem) {
        	}
      });
    } catch(e) {}

    style = `#memoryUsageButton .toolbarbutton-text {
              display: inline-block !important;
            }
            #memoryUsageButton .toolbarbutton-icon {
              display: none !important;
            }`
    let sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    let uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(style));
    if(!sss.sheetRegistered(uri, sss.AUTHOR_SHEET))
      sss.loadAndRegisterSheet(uri, sss.AUTHOR_SHEET);


    window.addEventListener("unload", this, false);
    window.setInterval(() => this.requestMemory(), this.INTERVAL * 1000);
    this.requestMemory();
  },

  uninit: function() {
    window.removeEventListener("unload", this, false);
  },

  getTotalMemoryUsage: async function getTotalMemoryUsage() {
    const procInfo = await ChromeUtils.requestProcInfo();
    let gpuMemoryUsage = 0;
    let totalMemoryUsage = procInfo.memory;
    //console.log(totalMemoryUsage/1024/1024);
    for (const child of procInfo.children) {
      //console.log(child);
      if (child.type == "gpu") {
        gpuMemoryUsage = child.memory;
        continue;
      }
      //console.log(child.memory/1024/1024);
      totalMemoryUsage += child.memory;
    }
    return [totalMemoryUsage, gpuMemoryUsage];
  },

  requestMemory: async function() {
    let winTop = Services.wm.getMostRecentWindow("navigator:browser");
    if (winTop == window) {
      let [total, gpu] = await this.getTotalMemoryUsage();
      total =0; // resident
      const regex = new RegExp("^resident-unique$");
      const handleReport = (aProcess, aPath, aKind, aUnits, aAmount) => {
        if (aAmount > 0) {
          //console.log(aPath, aAmount);
          if(regex.test(aPath)) {
            //Services.console.logStringMessage("aPath " + aPath);
            total += aAmount;
          }
        }
      };

      await new Promise((r) => {
        ucjsMemoryUsage.MRM
           .getReports(handleReport, null, r, null, false);
        }
      );
      //Services.console.logStringMessage("total " + txt);
      let txt = Math.ceil(total/1024/1024).toLocaleString();
      let txtGpu = Math.ceil(gpu/1024/1024).toLocaleString();
      for (let win of Services.wm.getEnumerator("navigator:browser")) {
        if (win.closed || !win.gBrowser) {
          continue;
        }
        let btn = win.document.getElementById("memoryUsageButton");
        if (btn) {
          //btn.setAttribute("label", txt + "MB");
          btn.setAttribute("label", txt + "/" + txtGpu+ "MB");
        }
      }
    }
  },

  handleEvent: function(event) {
    switch (event.type) {
      case "unload":
        this.uninit();
        break;
    }
  }
}
ucjsMemoryUsage.init();


