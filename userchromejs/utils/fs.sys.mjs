export class FileSystem{
  static RESULT_CONTENT = Symbol("Content");
  static RESULT_DIRECTORY = Symbol("Directory");
  static RESULT_ERROR = Symbol("Error");
  static RESULT_FILE = Symbol("File");

  static getFileURIForFile(aEntry, type){
    let qi = Services.io.getProtocolHandler('file').QueryInterface(Ci.nsIFileProtocolHandler);
    if(type === FileSystem.RESULT_DIRECTORY){
      return qi.getURLSpecFromDir(aEntry)
    }
    if(type === FileSystem.RESULT_FILE){
      return qi.getURLSpecFromActualFile(aEntry)
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "FileSystem.RESULT_FILE | FileSystem.RESULT_DIRECTORY"})
  }
  
  static convertChromeURIToFileURI(aURI){
    const registry = Cc["@mozilla.org/chrome/chrome-registry;1"].getService(Ci.nsIChromeRegistry);
    return registry.convertChromeURL(
      aURI instanceof Ci.nsIURI
        ? aURI
        : Services.io.newURI(aURI)
    );
  }
  // Call to .parent is needed because chrome urls get implicit "filename" based on the provider
  static #SCRIPT_URI;
  static #STYLE_URI;
  static #RESOURCE_URI;
  static{
    this.#RESOURCE_URI = FileSystem.getFileURIForFile(
      FileSystem.convertChromeURIToFileURI('chrome://userchrome/content/')
      .QueryInterface(Ci.nsIFileURL).file.parent,
      FileSystem.RESULT_DIRECTORY
    );
    this.#SCRIPT_URI = FileSystem.getFileURIForFile(
      FileSystem.convertChromeURIToFileURI('chrome://userscripts/content/')
      .QueryInterface(Ci.nsIFileURL).file.parent,
      FileSystem.RESULT_DIRECTORY
    );
    this.#STYLE_URI = FileSystem.getFileURIForFile(
      FileSystem.convertChromeURIToFileURI('chrome://userstyles/skin/')
      .QueryInterface(Ci.nsIFileURL).file.parent,
      FileSystem.RESULT_DIRECTORY
    );
  }
  
  static get SCRIPT_URI(){
    return Services.io.newURI(FileSystem.#SCRIPT_URI)
  }
  
  static get STYLE_URI(){
    return Services.io.newURI(FileSystem.#STYLE_URI)
  }
  
  static get RESOURCE_URI(){
    return Services.io.newURI(FileSystem.#RESOURCE_URI)
  }
  
  static getResourceDir(){
    return FileSystemResult.fromNsIFile(FileSystem.RESOURCE_URI.QueryInterface(Ci.nsIFileURL).file)
  }
  
  static getScriptDir(){
    return FileSystemResult.fromNsIFile(FileSystem.SCRIPT_URI.QueryInterface(Ci.nsIFileURL).file)
  }
  
  static getStyleDir(){
    return FileSystemResult.fromNsIFile(FileSystem.STYLE_URI.QueryInterface(Ci.nsIFileURL).file)
  }
  
  static #getEntryFromString(aFilename, baseFileURI){
    let baseDirectory = baseFileURI.QueryInterface(Ci.nsIFileURL).file;
    if(typeof aFilename !== "string"){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected:"String"});
    }
    const parts = aFilename.replaceAll("\\","/").split("/").filter(a => a.length > 0);
    while(parts[0] === ".."){
      baseDirectory = baseDirectory.parent;
      parts.shift();
    }
    try{
      for(let part of parts){
        baseDirectory.append(part)
      }
    }catch(ex){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{type:"Invalid path"})
    }
    return FileSystemResult.fromNsIFile(baseDirectory)
  }
  
  static getEntry(aFilename, options = {}){
    if(aFilename instanceof Ci.nsIURI){
      if(aFilename.scheme === "chrome"){
        return FileSystemResult.fromNsIFile(FileSystem.convertChromeURIToFileURI(aFilename).QueryInterface(Ci.nsIFileURL).file)
      }
      if(aFilename.scheme === "file"){
        return FileSystemResult.fromNsIFile(aFilename.QueryInterface(Ci.nsIFileURL).file)
      }
      throw new Error("unsupported nsIURI conversion")
    }
    return FileSystem.#getEntryFromString(aFilename, options.baseDirectory || FileSystem.RESOURCE_URI)
  }
  static readNSIFileSyncUncheckedWithOptions(aFile,options){
    let stream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
    let cvstream = Cc['@mozilla.org/intl/converter-input-stream;1'].createInstance(Ci.nsIConverterInputStream);
    try{
      stream.init(aFile, 0x01, 0, 0);
      cvstream.init(stream, 'UTF-8', 1024, Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
    }catch(e){
      console.error(e);
      cvstream.close();
      stream.close();
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_READABLE,{cause: e, filename: aFile.leafName})
    }
    let rv = {content:'',path: FileSystem.getFileURIForFile(aFile,FileSystem.RESULT_FILE)};
    let data = {};
    const metaOnly = !!options.metaOnly;
    while (cvstream.readString(4096, data)) {
      rv.content += data.value;
      if (metaOnly && rv.content.indexOf('// ==/UserScript==') > 0) {
        break;
      }
    }
    cvstream.close();
    stream.close();
    
    return FileSystemResult.fromContent(rv)
  }
  static readFileSync(aFile, options = {}) {
    if(typeof aFile === "string"){
      const fsResult = FileSystem.#getEntryFromString(aFile, FileSystem.RESOURCE_URI);
      if(fsResult.isFile()){
        return FileSystem.readNSIFileSyncUncheckedWithOptions(fsResult.entry(),options);
      }
      return fsResult.isError()
        ? fsResult
        : FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_FILE,{topic: aFile})
    }
    if(aFile instanceof Ci.nsIFile){
      return FileSystem.readNSIFileSyncUncheckedWithOptions(aFile,options);
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string | Ci.nsIFile"})
  }
  static async readFile(aPath){
    if(typeof aPath !== "string"){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string"})
    }
    try{
      let path = FileSystem.#appendToBaseURI(aPath);
      return FileSystemResult.fromContent({ content: await IOUtils.readUTF8(path), path: PathUtils.toFileURI(path) })
    }catch(ex){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_READABLE,{cause: ex})
    }
  }  
  static async readJSON(path){
    try{
      let result = await FileSystem.readFile(path);
      return result.isError()
            ? null
            : JSON.parse(result.content())
    }catch(ex){
      console.error(ex)
    }
    return null
  }
  static readIni(path){
    let fileURI = FileSystem.convertChromeURIToFileURI(Services.io.newURI(`chrome://userchrome/content/${path}`));
    return IniFile.parse(fileURI.QueryInterface(Ci.nsIFileURL).file)
  }
  static readConfig(path){
    let fileURI = FileSystem.convertChromeURIToFileURI(Services.io.newURI(`chrome://userchrome/content/${path}`));
    return IniConfig.fromURI(fileURI)
  }
  static #appendToBaseURI(aPath,aFileURI){
    // Normally, this API can only write into resources directory
    // Writing outside of resources can be enabled using following pref
    const disallowUnsafeWrites = !Services.prefs.getBoolPref("userChromeJS.allowUnsafeWrites",false);
    
    const baseURI = aFileURI || FileSystem.RESOURCE_URI;
    let baseParts = PathUtils.split(baseURI.QueryInterface(Ci.nsIFileURL).file.path);
    let pathParts = aPath.split(/[\\\/]/);
    while(pathParts[0] === ".."){
      baseParts.pop();
      pathParts.shift();
      if(disallowUnsafeWrites){
        throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_ALLOWED)
      }
    }
    return PathUtils.join(...baseParts.concat(pathParts))
  }
  static IO = new Proxy(IOUtils,{
    get(target,prop){
      if(typeof target[prop] != "function"){
        return undefined
      }
      const func = target[prop];
      return (path, ...args) => Reflect.apply(func,null,[FileSystem.#appendToBaseURI(path),...args]) 
    }
  });
  static async writeFile(path, content, options = {}){
    if(!path || typeof path !== "string"){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string"})
    }
    if(typeof content !== "string"){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "string"})
    }
    const fileName = FileSystem.#appendToBaseURI(path);
    if(!options.tmpPath){
      options.tmpPath = fileName + ".tmp";
    }
    return IOUtils.writeUTF8( fileName, content, options );
  }
  static createFileURI(fileName){
    if(!fileName){
      return FileSystem.#RESOURCE_URI
    }
    return FileSystem.convertChromeURIToFileURI(`chrome://userchrome/content/${fileName}`).spec
  }
  static chromeDir(){
    return FileSystemResult.fromDirectory(Services.dirsvc.get('UChrm',Ci.nsIFile))
  }
  static StringContent(obj){
    return FileSystemResult.fromContent(obj)
  }
  static ERROR_KIND_NOT_EXIST = 1;
  static ERROR_KIND_NOT_DIRECTORY = 2;
  static ERROR_KIND_NOT_FILE = 3;
  static ERROR_KIND_NOT_CONTENT = 4;
  static ERROR_KIND_UNKNOWN_RESULT = 5;
  static ERROR_KIND_INVALID_ARGUMENT = 6;
  static ERROR_KIND_NOT_READABLE = 7;
  static ERROR_KIND_NOT_ALLOWED = 8;
}

export class IniConfig{
  #error;
  constructor(iniFile,ex){
    if(ex){
      this.#error = ex;
      return
    }
    this.#error = null;
    
    let keys = Object.keys(iniFile.data);
    let iniSections = iniFile.sections();
    let removedSections = new Set();
    for(let [sectionName,sectionData] of iniSections){
      if(removedSections.has(sectionName)){
        continue
      }
      for(let [key,value] of sectionData){
        if(keys.includes(key)){
          if(!iniFile.data[key].has("enabled")){
            iniFile.data[key].set("enabled",value)
          }
          sectionData.set(key,Object.fromEntries(iniFile.data[key]));
          removedSections.add(key);
        }
      }
    }
    for(let [sectionName,sectionData] of iniSections){
      if(!removedSections.has(sectionName)){
        this[sectionName] = Object.fromEntries(sectionData)
      }
    }
  }
  
  isError(){
    return this.#error != null
  }
  error(){
    return this.#error
  }
  static fromFile(aFile){
    if(!(aFile instanceof Ci.nsIFile)){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "Ci.nsIFile"})
    }
    try{
      return new IniConfig(IniUtils.parseFileSync(aFile))
    }catch(ex){
      return new IniConfig(null,ex)
    }
  }
  static fromFileURI(aURI){
    return IniConfig.fromFile(aURI.QueryInterface(Ci.nsIFileURL).file)
  }
}

export class IniUtils{
  static #createParser(aSource){
    const factory = Cc["@mozilla.org/xpcom/ini-parser-factory;1"].getService(Ci.nsIINIParserFactory);
    return factory.createINIParser(aSource);
  }
  static async parseFile(aIniFile){
    if(!(aIniFile instanceof Ci.nsIFile)){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "Ci.nsIFile"})
    }
    const ini = IniUtils.#createParser(null);
    ini.initFromString(await IOUtils.readUTF8(aIniFile.path));
    return IniUtils.#parse(ini,PathUtils.toFileURI(aIniFile.path))
  }
  static parseFileSync(aIniFile){
    if(!(aIniFile instanceof Ci.nsIFile)){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_INVALID_ARGUMENT,{expected: "Ci.nsIFile"})
    }
    return IniUtils.#parse(IniUtils.#createParser(aIniFile),PathUtils.toFileURI(aIniFile.path))
  }
  static parseContent(aIniContent){
    const ini = IniUtils.#createParser(null);
    if(aIniContent instanceof FileSystemResult){
      ini.initFromString(aIniContent.content())
    }else if(typeof aIniContent === "string"){
      ini.initFromString(aIniContent)
    }else{
      throw new TypeError("unsupported argument")
    }
    return IniUtils.#parse(ini,aIniContent.fileURI || null)
  }
  static #parse(ini,fileURI){
    const sections = ini.getSections();
    const result = new IniUtils.IniFile(fileURI);
    while (sections.hasMore()) {
      const section = sections.getNext();
      const uniqueKeys = new Map();
      for(let iniKey of Array.from(ini.getKeys(section))){
        let leafName = iniKey.trim();
        if(uniqueKeys.has(leafName)){
          console.warn("ini has duplicate keys: "+leafName);
          continue
        }
        uniqueKeys.set(
          leafName,
          IniUtils.#iniValue(ini.getString(section,iniKey).trim())
        )
      }
      result.addSection(section,uniqueKeys);
    }
    return result
  }
  static write(aIniFile){
    
    IOUtils.writeUTF8( fileName, content, options )
  }
  
  static #iniValue(str){
    if(str === "true")
      return true
    if(str === "false")
      return false
    if(/^".*"$/.test(str))
      return str
    let n = Number.parseFloat(str)
    return Number.isNaN(n)
      ? str
      : n
  }
  
  static IniFile = class{
    constructor(filename){
      this.urispec = filename;
      this.data = {}
    }
    addSection(name,data){
      this.data[name] = data;
    }
    sections(){
      return Object.entries(this.data)
    }
  }
}

class ResultError extends Error{
  
  constructor(kind,options,info = {}){
    super(ResultError.toMessage(kind,info),options);
    this.kind = kind;
    this.name = "ResultError";
  }
  static toMessage(kind,info){
    const strInfo = ResultError.parseInfo(info);
    switch(kind){
      case FileSystem.ERROR_KIND_NOT_EXIST:
        return `Entry doesn't exist: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_DIRECTORY:
        return `Result is not a directory: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_FILE:
        return `Result is not a file: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_CONTENT:
        return `Result is not content: ${strInfo}`
      case FileSystem.ERROR_KIND_UNKNOWN_RESULT:
        return `Unknown result type: ${strInfo}`
      case FileSystem.ERROR_KIND_INVALID_ARGUMENT:
        return `Invalid argument: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_READABLE:
        return `File stream is not readable: ${strInfo}`
      case FileSystem.ERROR_KIND_NOT_ALLOWED:
        return "Writing outside of resources directory is not allowed"
      default:
        return "Unknown error"
    }
  }
  static parseInfo(aInfo){
    return Object.entries(aInfo).map(a => `${a[0]}: ${a[1]}`).join("; ")
  }
  static fromKind(aKind,info){
    return info instanceof ResultError
      ? info
      : new ResultError(aKind,{},info)
  }
}

class FileSystemResult{
  #result;
  #type;
  #fileuri;
  constructor(data,resultType){
    this.#result = data;
    this.#type = resultType;
  }
  
  get fileURI(){
    if(this.isError()){
      return null
    }
    if(!this.#fileuri){
      this.#fileuri = FileSystemResult.#getFileURI(this)
    }
    return this.#fileuri
  }
  content(replaceNewlines){
    if(this.isContent()){
      return replaceNewlines
          ? this.#result.content.replace(/\r\n?/g, '\n')
          : this.#result.content
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_CONTENT,{type:this.#type.description})
  }
  get size(){
    return this.isContent()
          ? this.#result.content.length
          : this.#result.fileSize
  }
  entry(){
    if(this.isDirectory() || this.isFile()){
      return this.#result
    }
    throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_EXIST,FileSystemResult.#generateErrorInfo(this))
  }
  error(){
    return this.isError()
          ? this.#result
          : null
  }
  readSync(){
    if(!this.isFile()){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_FILE,FileSystemResult.#generateErrorInfo(this))
    }
    return FileSystem.readNSIFileSyncUncheckedWithOptions(this.#result,{}).content()
  }
  read(){
    if(!this.isFile()){
      return Promise.reject(ResultError.fromKind(FileSystem.ERROR_KIND_NOT_FILE,FileSystemResult.#generateErrorInfo(this)))
    }
    return IOUtils.readUTF8(this.#result.path)
  }
  get type(){
    return this.#type
  }
  isContent(){
    return this.#type === FileSystem.RESULT_CONTENT
  }
  isFile(){
    return this.#type === FileSystem.RESULT_FILE
  }
  isDirectory(){
    return this.#type === FileSystem.RESULT_DIRECTORY
  }
  isError(){
    return this.#type === FileSystem.RESULT_ERROR
  }
  [Symbol.iterator](){
    try{
      return this.entries()
    }catch(e){
      console.warn(e)
    }
    return { next() { return { done: true } } }
  };
  entries(){
    if(!this.isDirectory()){
      throw ResultError.fromKind(FileSystem.ERROR_KIND_NOT_DIRECTORY,FileSystemResult.#generateErrorInfo(this))
    }
    let enumerator = this.#result.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);
    return {
      next() {
        return enumerator.hasMoreElements()
        ? {
            value: enumerator.getNext().QueryInterface(Ci.nsIFile),
            done: false
          }
        : { done: true }
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  showInFileManager(){
    try{
      if(this.isFile()){
        this.#result.reveal();
        return true
      }
      if(this.isDirectory()){
        this.#result.launch();
        return true
      }
    }catch(ex){
      console.error("Could not open file manager for: " + this.#result.leafName);
    }
    return false 
  }
  static #generateErrorInfo(aResult){
    if(aResult.isError()){
      return aResult.#result
    }
    return {
      topic: aResult.isContent()
        ? aResult.#result.path
        : aResult.#result.leafName
      }
  }
  static #getFileURI(aResult){
    if(aResult.isContent()){
      return aResult.#result.path
    }
    return FileSystem.getFileURIForFile(aResult.#result,aResult.#type)
  }
  static fromDirectory(dir){
    return new FileSystemResult(dir, FileSystem.RESULT_DIRECTORY)
  }
  static fromContent(content){
    return new FileSystemResult(content, FileSystem.RESULT_CONTENT)
  }
  static fromErrorKind(aKind,aErrorDescription){
    return new FileSystemResult(ResultError.fromKind(aKind,aErrorDescription), FileSystem.RESULT_ERROR)
  }
  static fromFile(file){
    return new FileSystemResult(file, FileSystem.RESULT_FILE)
  }
  static fromNsIFile(entry){
    if(!entry.exists()){
      return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_NOT_EXIST,{topic: entry.leafName})
    }
    if(entry.isDirectory()){
      return FileSystemResult.fromDirectory(entry)
    }else if(entry.isFile()){
      return FileSystemResult.fromFile(entry)
    }
    return FileSystemResult.fromErrorKind(FileSystem.ERROR_KIND_UNKNOWN_RESULT,{topic: entry.leafName})
  }
}
