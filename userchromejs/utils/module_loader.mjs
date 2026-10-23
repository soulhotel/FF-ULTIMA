{
  const PREF_SCRIPTSDISABLED = 'userChromeJS.scriptsDisabled';
  
  let { loaderModuleLink } = ChromeUtils.importESModule("chrome://userchromejs/content/utils.sys.mjs");
  
  let disabledScripts = Services.prefs.getStringPref(PREF_SCRIPTSDISABLED,"").split(",");
  
  let moduleScripts = loaderModuleLink.matchScripts(s => s.isESM
    && s.regex?.test(window.location.href)
    && !disabledScripts.includes(s.filename)
    && !s.noExec
    && !(s.onlyonce && s.isRunning)
    && !s.injectionFailed
  ,true);
  for(let script of moduleScripts){
    import(script.chromeURI)
    .catch(ex => {
      console.error(new Error(`@ ${script.filename}:${ex.lineNumber}`,{cause:ex}));
      loaderModuleLink.markScriptInjectionFailure(script.filename);
    })
    .finally(()=>loaderModuleLink.setScriptRunning(script.filename))
  }
}