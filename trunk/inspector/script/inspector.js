(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!window.qxsettings) qxsettings = {};
var settings = {"qx.application":"inspector.Application","qx.theme":"inspector.theme.Theme","qx.version":"1.2"};
for (var k in settings) qxsettings[k] = settings[k];

if (!window.qxvariants) qxvariants = {};
var variants = {"qx.debug":"off"};
for (var k in variants) qxvariants[k] = variants[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"../inspector/script"},"inspector":{"resourceUri":"../inspector/resource","sourceUri":"../inspector/script","version":"trunk"},"qx":{"resourceUri":"../inspector/resource","sourceUri":"../inspector/script","version":"1.2"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {};
qx.$$locales = {};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  uris : [["__out__:inspector.js"]],
  urisBefore : [],
  packageHashes : {"0":"0f6884435c19"},
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function()
  {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")
    {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  loadScript(list.shift(), function() {
    if (isWebkit) {
      // force asynchronous load
      // Safari fails with an "maximum recursion depth exceeded" error if it is
      // called sync.      
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){return;});
  }
  var bootPackageHash=l.packageHashes[l.parts[l.boot][0]];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.uris[l.parts[l.boot]]), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0f6884435c19']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EEEd":"d EEE","cldr_date_time_format_Hm":"H:mm","cldr_date_time_format_Hms":"H:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMMEd":"E, MMMM d","cldr_date_time_format_MMMMd":"MMMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/yyyy","cldr_date_time_format_yMEd":"EEE, M/d/yyyy","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"EEE, MMM d, y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yQ":"Q yyyy","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"T","cldr_day_format_narrow_tue":"T","cldr_day_format_narrow_wed":"W","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_abbreviated_fri":"Fri","cldr_day_stand-alone_abbreviated_mon":"Mon","cldr_day_stand-alone_abbreviated_sat":"Sat","cldr_day_stand-alone_abbreviated_sun":"Sun","cldr_day_stand-alone_abbreviated_thu":"Thu","cldr_day_stand-alone_abbreviated_tue":"Tue","cldr_day_stand-alone_abbreviated_wed":"Wed","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_day_stand-alone_wide_fri":"Friday","cldr_day_stand-alone_wide_mon":"Monday","cldr_day_stand-alone_wide_sat":"Saturday","cldr_day_stand-alone_wide_sun":"Sunday","cldr_day_stand-alone_wide_thu":"Thursday","cldr_day_stand-alone_wide_tue":"Tuesday","cldr_day_stand-alone_wide_wed":"Wednesday","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"}},"resources":{"inspector/css/consoleview.css":"inspector","inspector/css/domview.css":"inspector","inspector/css/propertylisthtml.css":"inspector","inspector/css/sourceview.css":"inspector","inspector/html/index.html":"inspector","inspector/images/autocomplete/method_private18.gif":[18,18,"gif","inspector"],"inspector/images/autocomplete/method_protected18.gif":[18,18,"gif","inspector"],"inspector/images/autocomplete/method_public18.gif":[18,18,"gif","inspector"],"inspector/images/autocomplete/property_private18.gif":[18,18,"gif","inspector"],"inspector/images/autocomplete/property_protected18.gif":[18,18,"gif","inspector"],"inspector/images/autocomplete/property_public18.gif":[18,18,"gif","inspector"],"inspector/images/close.gif":[17,13,"gif","inspector"],"inspector/images/close.png":[17,13,"png","inspector"],"inspector/images/components/atom.png":[16,16,"png","inspector"],"inspector/images/components/button.png":[16,16,"png","inspector"],"inspector/images/components/checkbox.png":[16,16,"png","inspector"],"inspector/images/components/combobox.png":[16,16,"png","inspector"],"inspector/images/components/document.png":[16,16,"png","inspector"],"inspector/images/components/groupbox.png":[16,16,"png","inspector"],"inspector/images/components/horizontallayout.png":[16,16,"png","inspector"],"inspector/images/components/image.png":[16,16,"png","inspector"],"inspector/images/components/label.png":[16,16,"png","inspector"],"inspector/images/components/layout.png":[16,16,"png","inspector"],"inspector/images/components/listview.png":[16,16,"png","inspector"],"inspector/images/components/menu.png":[16,16,"png","inspector"],"inspector/images/components/radiobutton.png":[16,16,"png","inspector"],"inspector/images/components/spinner.png":[16,16,"png","inspector"],"inspector/images/components/splitpane.png":[16,16,"png","inspector"],"inspector/images/components/table.png":[16,16,"png","inspector"],"inspector/images/components/textarea.png":[16,16,"png","inspector"],"inspector/images/components/textfield.png":[16,16,"png","inspector"],"inspector/images/components/toolbar.png":[16,16,"png","inspector"],"inspector/images/components/tree.png":[16,16,"png","inspector"],"inspector/images/components/verticallayout.png":[16,16,"png","inspector"],"inspector/images/components/window.png":[16,16,"png","inspector"],"inspector/images/icons/api.png":[22,22,"png","inspector"],"inspector/images/icons/edit-find-disabled.png":[16,16,"png","inspector"],"inspector/images/icons/edit-find.png":[16,16,"png","inspector"],"inspector/images/icons/goto.png":[22,22,"png","inspector"],"inspector/images/icons/highlight.png":[22,22,"png","inspector"],"inspector/images/icons/setinit-disabled.png":[22,22,"png","inspector"],"inspector/images/icons/setinit.png":[22,22,"png","inspector"],"inspector/images/icons/setnull-disabled.png":[22,22,"png","inspector"],"inspector/images/icons/setnull.png":[22,22,"png","inspector"],"inspector/images/null.png":[15,15,"png","inspector"],"inspector/images/open.gif":[17,13,"gif","inspector"],"inspector/images/open.png":[17,13,"png","inspector"],"inspector/images/shell/errorIcon.png":[14,14,"png","inspector"],"inspector/images/shell/infoIcon.png":[14,14,"png","inspector"],"inspector/images/shell/warningIcon.png":[14,14,"png","inspector"],"inspector/images/spacer.gif":[17,13,"gif","inspector"],"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-next.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/actions/document-properties.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/list-add.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/list-remove.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-start.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-record.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/view-refresh.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/window-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/system.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]},"translations":{"C":{},"en":{}}};
(function(){var bw="toString",bv=".",bu="default",bt="Object",bs='"',br="Array",bq="()",bp="String",bo="Function",bn=".prototype",bV="function",bU="Boolean",bT="Error",bS="constructor",bR="warn",bQ="hasOwnProperty",bP="string",bO="toLocaleString",bN="RegExp",bM='\", "',bD="info",bE="BROKEN_IE",bB="isPrototypeOf",bC="Date",bz="",bA="qx.Bootstrap",bx="]",by="Class",bF="error",bG="[Class ",bI="valueOf",bH="Number",bK="count",bJ="debug",bL="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return bG+this.classname+bx;
},createNamespace:function(name,W){var Y=name.split(bv);
var parent=window;
var X=Y[0];

for(var i=0,ba=Y.length-1;i<ba;i++,X=Y[i]){if(!parent[X]){parent=parent[X]={};
}else{parent=parent[X];
}}parent[X]=W;
return X;
},setDisplayName:function(cj,ck,name){cj.displayName=ck+bv+name+bq;
},setDisplayNames:function(bc,bd){for(var name in bc){var be=bc[name];

if(be instanceof Function){be.displayName=bd+bv+name+bq;
}}},define:function(name,bf){if(!bf){var bf={statics:{}};
}var bk;
var bi=null;
qx.Bootstrap.setDisplayNames(bf.statics,name);

if(bf.members||bf.extend){qx.Bootstrap.setDisplayNames(bf.members,name+bn);
bk=bf.construct||new Function;

if(bf.extend){this.extendClass(bk,bk,bf.extend,name,bj);
}var bg=bf.statics||{};
for(var i=0,bl=qx.Bootstrap.getKeys(bg),l=bl.length;i<l;i++){var bm=bl[i];
bk[bm]=bg[bm];
}bi=bk.prototype;
var bh=bf.members||{};
for(var i=0,bl=qx.Bootstrap.getKeys(bh),l=bl.length;i<l;i++){var bm=bl[i];
bi[bm]=bh[bm];
}}else{bk=bf.statics||{};
}var bj=this.createNamespace(name,bk);
bk.name=bk.classname=name;
bk.basename=bj;
bk.$$type=by;
if(!bk.hasOwnProperty(bw)){bk.toString=this.genericToString;
}if(bf.defer){bf.defer(bk,bi);
}qx.Bootstrap.$$registry[name]=bf.statics;
return bk;
}};
qx.Bootstrap.define(bA,{statics:{LOADSTART:qx.$$start||new Date(),createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(k,m,n,name,o){var r=n.prototype;
var q=new Function;
q.prototype=r;
var p=new q;
k.prototype=p;
p.name=p.classname=name;
p.basename=o;
m.base=k.superclass=n;
m.self=k.constructor=p.constructor=k;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(D){return D.__count__;
},"default":function(T){var length=0;

for(var U in T){length++;
}return length;
}})[(({}).__count__==0)?bK:bu],objectMergeWith:function(u,v,w){if(w===undefined){w=true;
}
for(var x in v){if(w||u[x]===undefined){u[x]=v[x];
}}return u;
},__a:[bB,bQ,bO,bw,bI,bS],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(b){var c=[];
var e=Object.prototype.hasOwnProperty;

for(var f in b){if(e.call(b,f)){c.push(f);
}}var d=qx.Bootstrap.__a;

for(var i=0,a=d,l=a.length;i<l;i++){if(e.call(b,a[i])){c.push(a[i]);
}}return c;
},"default":function(J){var K=[];
var L=Object.prototype.hasOwnProperty;

for(var M in J){if(L.call(J,M)){K.push(M);
}}return K;
}})[typeof (Object.keys)==
bV?bL:
(function(){for(var s in {toString:1}){return s;
}})()!==bw?bE:bu],getKeysAsString:function(cd){var ce=qx.Bootstrap.getKeys(cd);

if(ce.length==0){return bz;
}return bs+ce.join(bM)+bs;
},__b:{"[object String]":bp,"[object Array]":br,"[object Object]":bt,"[object RegExp]":bN,"[object Number]":bH,"[object Boolean]":bU,"[object Date]":bC,"[object Function]":bo,"[object Error]":bT},bind:function(cf,self,cg){var ch=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var A=Array.prototype.slice.call(arguments,0,arguments.length);
return cf.apply(self,ch.concat(A));
};
},firstUp:function(cc){return cc.charAt(0).toUpperCase()+cc.substr(1);
},firstLow:function(j){return j.charAt(0).toLowerCase()+j.substr(1);
},getClass:function(bX){var bY=Object.prototype.toString.call(bX);
return (qx.Bootstrap.__b[bY]||bY.slice(8,-1));
},isString:function(E){return (E!==null&&(typeof E===bP||qx.Bootstrap.getClass(E)==bp||E instanceof String||(!!E&&!!E.$$isString)));
},isArray:function(t){return (t!==null&&(t instanceof Array||(t&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(t.constructor,qx.data.IListData))||qx.Bootstrap.getClass(t)==br||(!!t&&!!t.$$isArray)));
},isObject:function(bb){return (bb!==undefined&&bb!==null&&qx.Bootstrap.getClass(bb)==bt);
},isFunction:function(bW){return qx.Bootstrap.getClass(bW)==bo;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(N,name){while(N){if(N.$$properties&&N.$$properties[name]){return N.$$properties[name];
}N=N.superclass;
}return null;
},hasProperty:function(V,name){return !!qx.Bootstrap.getPropertyDefinition(V,name);
},getEventType:function(h,name){var h=h.constructor;

while(h.superclass){if(h.$$events&&h.$$events[name]!==undefined){return h.$$events[name];
}h=h.superclass;
}return null;
},supportsEvent:function(g,name){return !!qx.Bootstrap.getEventType(g,name);
},getByInterface:function(Q,R){var S,i,l;

while(Q){if(Q.$$implements){S=Q.$$flatImplements;

for(i=0,l=S.length;i<l;i++){if(S[i]===R){return Q;
}}}Q=Q.superclass;
}return null;
},hasInterface:function(y,z){return !!qx.Bootstrap.getByInterface(y,z);
},getMixins:function(F){var G=[];

while(F){if(F.$$includes){G.push.apply(G,F.$$flatIncludes);
}F=F.superclass;
}return G;
},$$logs:[],debug:function(H,I){qx.Bootstrap.$$logs.push([bJ,arguments]);
},info:function(ca,cb){qx.Bootstrap.$$logs.push([bD,arguments]);
},warn:function(O,P){qx.Bootstrap.$$logs.push([bR,arguments]);
},error:function(B,C){qx.Bootstrap.$$logs.push([bF,arguments]);
},trace:function(ci){}}});
})();
(function(){var p="other",o="widgets",n="fonts",m="appearances",k="qx.Theme",j="]",h="[Theme ",g="colors",f="decorations",e="Theme",b="meta",d="borders",c="icons";
qx.Bootstrap.define(k,{statics:{define:function(name,P){if(!P){var P={};
}P.include=this.__dx(P.include);
P.patch=this.__dx(P.patch);
{};
var Q={$$type:e,name:name,title:P.title,toString:this.genericToString};
if(P.extend){Q.supertheme=P.extend;
}Q.basename=qx.Bootstrap.createNamespace(name,Q);
this.__dA(Q,P);
this.__dy(Q,P);
this.$$registry[name]=Q;
for(var i=0,a=P.include,l=a.length;i<l;i++){this.include(Q,a[i]);
}
for(var i=0,a=P.patch,l=a.length;i<l;i++){this.patch(Q,a[i]);
}},__dx:function(w){if(!w){return [];
}
if(qx.Bootstrap.isArray(w)){return w;
}else{return [w];
}},__dy:function(M,N){var O=N.aliases||{};

if(N.extend&&N.extend.aliases){qx.Bootstrap.objectMergeWith(O,N.extend.aliases,false);
}M.aliases=O;
},getAll:function(){return this.$$registry;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},genericToString:function(){return h+this.name+j;
},__dz:function(K){for(var i=0,L=this.__dB,l=L.length;i<l;i++){if(K[L[i]]){return L[i];
}}},__dA:function(x,y){var B=this.__dz(y);
if(y.extend&&!B){B=y.extend.type;
}x.type=B||p;
if(!B){return;
}var D=function(){};
if(y.extend){D.prototype=new y.extend.$$clazz;
}var C=D.prototype;
var A=y[B];
for(var z in A){C[z]=A[z];
if(C[z].base){{};
C[z].base=y.extend;
}}x.$$clazz=D;
x[B]=new D;
},$$registry:{},__dB:[g,d,f,n,c,o,m,b],__dC:null,__dD:null,__dE:function(){},patch:function(q,r){var t=this.__dz(r);

if(t!==this.__dz(q)){throw new Error("The mixins '"+q.name+"' are not compatible '"+r.name+"'!");
}var s=r[t];
var u=q.$$clazz.prototype;

for(var v in s){u[v]=s[v];
}},include:function(E,F){var H=F.type;

if(H!==E.type){throw new Error("The mixins '"+E.name+"' are not compatible '"+F.name+"'!");
}var G=F[H];
var I=E.$$clazz.prototype;

for(var J in G){if(I[J]!==undefined){continue;
}I[J]=G[J];
}}}});
})();
(function(){var j="#CCCCCC",i="#F3F3F3",h="#E4E4E4",g="#1a1a1a",f="#084FAB",e="gray",d="#fffefe",c="white",b="#4a4a4a",a="#EEEEEE",K="#80B4EF",J="#C72B2B",I="#ffffdd",H="#334866",G="#00204D",F="#666666",E="#CBC8CD",D="#99C3FE",C="#808080",B="#F4F4F4",q="#001533",r="#909090",o="#FCFCFC",p="#314a6e",m="#B6B6B6",n="#0880EF",k="#4d4d4d",l="#DFDFDF",s="#000000",t="#FF9999",w="#7B7A7E",v="#26364D",y="#990000",x="#AFAFAF",A="#404955",z="#AAAAAA",u="qx.theme.modern.Color";
qx.Theme.define(u,{colors:{"background-application":l,"background-pane":i,"background-light":o,"background-medium":a,"background-splitpane":x,"background-tip":I,"background-tip-error":J,"background-odd":h,"text-light":r,"text-gray":b,"text-label":g,"text-title":p,"text-input":s,"text-hovered":q,"text-disabled":w,"text-selected":d,"text-active":v,"text-inactive":A,"text-placeholder":E,"border-main":k,"border-separator":C,"border-input":H,"border-disabled":m,"border-pane":G,"border-button":F,"border-column":j,"border-focused":D,"invalid":y,"border-focused-invalid":t,"table-pane":i,"table-focus-indicator":n,"table-row-background-focused-selected":f,"table-row-background-focused":K,"table-row-background-selected":f,"table-row-background-even":i,"table-row-background-odd":h,"table-row-selected":d,"table-row":g,"table-row-line":j,"table-column-line":j,"progressive-table-header":z,"progressive-table-row-background-even":B,"progressive-table-row-background-odd":h,"progressive-progressbar-background":e,"progressive-progressbar-indicator-done":j,"progressive-progressbar-indicator-undone":c,"progressive-progressbar-percent-background":e,"progressive-progressbar-percent-text":c}});
})();
(function(){var a="inspector.theme.Color";
qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});
})();
(function(){var h="qx.allowUrlSettings",g="&",f="qx.core.Setting",e="qx.allowUrlVariants",d="qx.propertyDebugLevel",c="qxsetting",b=":",a=".";
qx.Bootstrap.define(f,{statics:{__c:{},define:function(j,k){if(k===undefined){throw new Error('Default value of setting "'+j+'" must be defined!');
}
if(!this.__c[j]){this.__c[j]={};
}else if(this.__c[j].defaultValue!==undefined){throw new Error('Setting "'+j+'" is already defined!');
}this.__c[j].defaultValue=k;
},get:function(q){var r=this.__c[q];

if(r===undefined){throw new Error('Setting "'+q+'" is not defined.');
}
if(r.value!==undefined){return r.value;
}return r.defaultValue;
},set:function(l,m){if((l.split(a)).length<2){throw new Error('Malformed settings key "'+l+'". Must be following the schema "namespace.key".');
}
if(!this.__c[l]){this.__c[l]={};
}this.__c[l].value=m;
},__d:function(){if(window.qxsettings){for(var p in window.qxsettings){this.set(p,window.qxsettings[p]);
}window.qxsettings=undefined;

try{delete window.qxsettings;
}catch(s){}this.__e();
}},__e:function(){if(this.get(h)!=true){return;
}var o=document.location.search.slice(1).split(g);

for(var i=0;i<o.length;i++){var n=o[i].split(b);

if(n.length!=3||n[0]!=c){continue;
}this.set(n[1],decodeURIComponent(n[2]));
}}},defer:function(t){t.define(h,false);
t.define(e,false);
t.define(d,0);
t.__d();
}});
})();
(function(){var h="function",g="Boolean",f="qx.Interface",e="]",d="toggle",c="Interface",b="is",a="[Interface ";
qx.Bootstrap.define(f,{statics:{define:function(name,j){if(j){if(j.extend&&!(j.extend instanceof Array)){j.extend=[j.extend];
}{};
var k=j.statics?j.statics:{};
if(j.extend){k.$$extends=j.extend;
}
if(j.properties){k.$$properties=j.properties;
}
if(j.members){k.$$members=j.members;
}
if(j.events){k.$$events=j.events;
}}else{var k={};
}k.$$type=c;
k.name=name;
k.toString=this.genericToString;
k.basename=qx.Bootstrap.createNamespace(name,k);
qx.Interface.$$registry[name]=k;
return k;
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(F){if(!F){return [];
}var G=F.concat();

for(var i=0,l=F.length;i<l;i++){if(F[i].$$extends){G.push.apply(G,this.flatten(F[i].$$extends));
}}return G;
},__f:function(w,x,y,z){var D=y.$$members;

if(D){for(var C in D){if(qx.Bootstrap.isFunction(D[C])){var B=this.__g(x,C);
var A=B||qx.Bootstrap.isFunction(w[C]);

if(!A){throw new Error('Implementation of method "'+C+'" is missing in class "'+x.classname+'" required by interface "'+y.name+'"');
}var E=z===true&&!B&&!qx.Bootstrap.hasInterface(x,y);

if(E){w[C]=this.__j(y,w[C],C,D[C]);
}}else{if(typeof w[C]===undefined){if(typeof w[C]!==h){throw new Error('Implementation of member "'+C+'" is missing in class "'+x.classname+'" required by interface "'+y.name+'"');
}}}}}},__g:function(H,I){var M=I.match(/^(is|toggle|get|set|reset)(.*)$/);

if(!M){return false;
}var J=qx.Bootstrap.firstLow(M[2]);
var K=qx.Bootstrap.getPropertyDefinition(H,J);

if(!K){return false;
}var L=M[0]==b||M[0]==d;

if(L){return qx.Bootstrap.getPropertyDefinition(H,J).check==g;
}return true;
},__h:function(t,u){if(u.$$properties){for(var v in u.$$properties){if(!qx.Bootstrap.getPropertyDefinition(t,v)){throw new Error('The property "'+v+'" is not supported by Class "'+t.classname+'"!');
}}}},__i:function(q,r){if(r.$$events){for(var s in r.$$events){if(!qx.Bootstrap.supportsEvent(q,s)){throw new Error('The event "'+s+'" is not supported by Class "'+q.classname+'"!');
}}}},assertObject:function(N,O){var Q=N.constructor;
this.__f(N,Q,O,false);
this.__h(Q,O);
this.__i(Q,O);
var P=O.$$extends;

if(P){for(var i=0,l=P.length;i<l;i++){this.assertObject(N,P[i]);
}}},assert:function(m,n,o){this.__f(m.prototype,m,n,o);
this.__h(m,n);
this.__i(m,n);
var p=n.$$extends;

if(p){for(var i=0,l=p.length;i<l;i++){this.assert(m,p[i],o);
}}},genericToString:function(){return a+this.name+e;
},$$registry:{},__j:function(){},__k:null,__l:function(){}}});
})();
(function(){var g="qx.Mixin",f=".prototype",e="constructor",d="[Mixin ",c="]",b="destruct",a="Mixin";
qx.Bootstrap.define(g,{statics:{define:function(name,w){if(w){if(w.include&&!(w.include instanceof Array)){w.include=[w.include];
}{};
var y=w.statics?w.statics:{};
qx.Bootstrap.setDisplayNames(y,name);

for(var x in y){if(y[x] instanceof Function){y[x].$$mixin=y;
}}if(w.construct){y.$$constructor=w.construct;
qx.Bootstrap.setDisplayName(w.construct,name,e);
}
if(w.include){y.$$includes=w.include;
}
if(w.properties){y.$$properties=w.properties;
}
if(w.members){y.$$members=w.members;
qx.Bootstrap.setDisplayNames(w.members,name+f);
}
for(var x in y.$$members){if(y.$$members[x] instanceof Function){y.$$members[x].$$mixin=y;
}}
if(w.events){y.$$events=w.events;
}
if(w.destruct){y.$$destructor=w.destruct;
qx.Bootstrap.setDisplayName(w.destruct,name,b);
}}else{var y={};
}y.$$type=a;
y.name=name;
y.toString=this.genericToString;
y.basename=qx.Bootstrap.createNamespace(name,y);
this.$$registry[name]=y;
return y;
},checkCompatibility:function(m){var p=this.flatten(m);
var q=p.length;

if(q<2){return true;
}var t={};
var s={};
var r={};
var o;

for(var i=0;i<q;i++){o=p[i];

for(var n in o.events){if(r[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+r[n]+'" in member "'+n+'"!');
}r[n]=o.name;
}
for(var n in o.properties){if(t[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+t[n]+'" in property "'+n+'"!');
}t[n]=o.name;
}
for(var n in o.members){if(s[n]){throw new Error('Conflict between mixin "'+o.name+'" and "'+s[n]+'" in member "'+n+'"!');
}s[n]=o.name;
}}return true;
},isCompatible:function(h,j){var k=qx.Bootstrap.getMixins(j);
k.push(h);
return qx.Mixin.checkCompatibility(k);
},getByName:function(name){return this.$$registry[name];
},isDefined:function(name){return this.getByName(name)!==undefined;
},getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},flatten:function(u){if(!u){return [];
}var v=u.concat();

for(var i=0,l=u.length;i<l;i++){if(u[i].$$includes){v.push.apply(v,this.flatten(u[i].$$includes));
}}return v;
},genericToString:function(){return d+this.name+c;
},$$registry:{},__m:null,__n:function(){}}});
})();
(function(){var dq=';',dp='return this.',dn="string",dm="boolean",dl="",dk="setThemed",dj='!==undefined)',di="this.",dh="set",dg="resetThemed",cU="setRuntime",cT="init",cS='else if(this.',cR="resetRuntime",cQ="reset",cP="();",cO='else ',cN='if(this.',cM="return this.",cL="get",dx=";",dy="(a[",dv=' of an instance of ',dw="refresh",dt=' is not (yet) ready!");',du="]);",dr='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',ds='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',dz='value !== null && value.nodeType === 9 && value.documentElement',dA='value !== null && value.$$type === "Mixin"',cY='return init;',cX='var init=this.',db='value !== null && value.nodeType === 1 && value.attributes',da="var parent = this.getLayoutParent();",dd="Error in property ",dc="property",df='qx.core.Assert.assertInstance(value, Date, msg) || true',de="if (!parent) return;",cW=" in method ",cV='qx.core.Assert.assertInstance(value, Error, msg) || true',bL='Undefined value is not allowed!',bM="inherit",bN='Is invalid!',bO="MSIE 6.0",bP="': ",bQ=" of class ",bR='value !== null && value.nodeType !== undefined',bS='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bT='qx.core.Assert.assertPositiveInteger(value, msg) || true',bU='if(init==qx.core.Property.$$inherit)init=null;',dE='value !== null && value.$$type === "Interface"',dD='var inherit=prop.$$inherit;',dC="var value = parent.",dB="$$useinit_",dI="(value);",dH=".",dG="$$runtime_",dF='Requires exactly one argument!',dK="$$user_",dJ='qx.core.Assert.assertArray(value, msg) || true',cu='qx.core.Assert.assertPositiveNumber(value, msg) || true',cv=".prototype",cs="Boolean",ct='return value;',cy='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',cz='Does not allow any arguments!',cw="()",cx="var a=arguments[0] instanceof Array?arguments[0]:arguments;",cq='value !== null && value.$$type === "Theme"',cr="())",cd='return null;',cc='qx.core.Assert.assertObject(value, msg) || true',cf='qx.core.Assert.assertString(value, msg) || true',ce="if (value===undefined) value = parent.",bY='value !== null && value.$$type === "Class"',bX='qx.core.Assert.assertFunction(value, msg) || true',cb="on",ca="object",bW="$$init_",bV="$$theme_",cE='qx.core.Assert.assertMap(value, msg) || true',cF="qx.aspects",cG='qx.core.Assert.assertNumber(value, msg) || true',cH='Null value is not allowed!',cA='qx.core.Assert.assertInteger(value, msg) || true',cB="value",cC="rv:1.8.1",cD="shorthand",cI='qx.core.Assert.assertInstance(value, RegExp, msg) || true',cJ='value !== null && value.type !== undefined',cn='value !== null && value.document',cm='throw new Error("Property ',cl="(!this.",ck='qx.core.Assert.assertBoolean(value, msg) || true',cj="toggle",ci="$$inherit_",ch=" with incoming value '",cg="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",cp="qx.core.Property",co="is",cK='Could not change or apply init value after constructing phase!';
qx.Bootstrap.define(cp,{statics:{__o:{"Boolean":ck,"String":cf,"Number":cG,"Integer":cA,"PositiveNumber":cu,"PositiveInteger":bT,"Error":cV,"RegExp":cI,"Object":cc,"Array":dJ,"Map":cE,"Function":bX,"Date":df,"Node":bR,"Element":db,"Document":dz,"Window":cn,"Event":cJ,"Class":bY,"Mixin":dA,"Interface":dE,"Theme":cq,"Color":dr,"Decorator":bS,"Font":ds},__p:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:bM,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:dn,dereference:dm,inheritable:dm,nullable:dm,themeable:dm,refine:dm,init:null,apply:dn,event:dn,check:null,transform:dn,deferredInit:dm,validate:null},$$allowedGroupKeys:{name:dn,group:ca,mode:dn,themeable:dm},$$inheritable:{},__q:function(bb){var bc=this.__r(bb);

if(!bc.length){var bd=qx.lang.Function.empty;
}else{bd=this.__s(bc);
}bb.prototype.$$refreshInheritables=bd;
},__r:function(H){var J=[];

while(H){var I=H.$$properties;

if(I){for(var name in this.$$inheritable){if(I[name]&&I[name].inheritable){J.push(name);
}}}H=H.superclass;
}return J;
},__s:function(bw){var bA=this.$$store.inherit;
var bz=this.$$store.init;
var by=this.$$method.refresh;
var bx=[da,de];

for(var i=0,l=bw.length;i<l;i++){var name=bw[i];
bx.push(dC,bA[name],dx,ce,bz[name],dx,di,by[name],dI);
}return new Function(bx.join(dl));
},attachRefreshInheritables:function(dQ){dQ.prototype.$$refreshInheritables=function(){qx.core.Property.__q(dQ);
return this.$$refreshInheritables();
};
},attachMethods:function(T,name,U){U.group?this.__t(T,U,name):this.__u(T,U,name);
},__t:function(u,v,name){var C=qx.Bootstrap.firstUp(name);
var B=u.prototype;
var D=v.themeable===true;
{};
var E=[];
var y=[];

if(D){var w=[];
var A=[];
}var z=cx;
E.push(z);

if(D){w.push(z);
}
if(v.mode==cD){var x=cg;
E.push(x);

if(D){w.push(x);
}}
for(var i=0,a=v.group,l=a.length;i<l;i++){{};
E.push(di,this.$$method.set[a[i]],dy,i,du);
y.push(di,this.$$method.reset[a[i]],cP);

if(D){{};
w.push(di,this.$$method.setThemed[a[i]],dy,i,du);
A.push(di,this.$$method.resetThemed[a[i]],cP);
}}this.$$method.set[name]=dh+C;
B[this.$$method.set[name]]=new Function(E.join(dl));
this.$$method.reset[name]=cQ+C;
B[this.$$method.reset[name]]=new Function(y.join(dl));

if(D){this.$$method.setThemed[name]=dk+C;
B[this.$$method.setThemed[name]]=new Function(w.join(dl));
this.$$method.resetThemed[name]=dg+C;
B[this.$$method.resetThemed[name]]=new Function(A.join(dl));
}},__u:function(k,m,name){var o=qx.Bootstrap.firstUp(name);
var q=k.prototype;
{};
if(m.dereference===undefined&&typeof m.check===dn){m.dereference=this.__v(m.check);
}var p=this.$$method;
var n=this.$$store;
n.runtime[name]=dG+name;
n.user[name]=dK+name;
n.theme[name]=bV+name;
n.init[name]=bW+name;
n.inherit[name]=ci+name;
n.useinit[name]=dB+name;
p.get[name]=cL+o;
q[p.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,k,name,cL);
};
p.set[name]=dh+o;
q[p.set[name]]=function(ba){return qx.core.Property.executeOptimizedSetter(this,k,name,dh,arguments);
};
p.reset[name]=cQ+o;
q[p.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,k,name,cQ);
};

if(m.inheritable||m.apply||m.event||m.deferredInit){p.init[name]=cT+o;
q[p.init[name]]=function(O){return qx.core.Property.executeOptimizedSetter(this,k,name,cT,arguments);
};
}
if(m.inheritable){p.refresh[name]=dw+o;
q[p.refresh[name]]=function(F){return qx.core.Property.executeOptimizedSetter(this,k,name,dw,arguments);
};
}p.setRuntime[name]=cU+o;
q[p.setRuntime[name]]=function(S){return qx.core.Property.executeOptimizedSetter(this,k,name,cU,arguments);
};
p.resetRuntime[name]=cR+o;
q[p.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,k,name,cR);
};

if(m.themeable){p.setThemed[name]=dk+o;
q[p.setThemed[name]]=function(bK){return qx.core.Property.executeOptimizedSetter(this,k,name,dk,arguments);
};
p.resetThemed[name]=dg+o;
q[p.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,k,name,dg);
};
}
if(m.check===cs){q[cj+o]=new Function(cM+p.set[name]+cl+p.get[name]+cr);
q[co+o]=new Function(cM+p.get[name]+cw);
}},__v:function(V){return !!this.__p[V];
},__w:function(G){return this.__p[G]||qx.Bootstrap.classIsDefined(G)||(qx.Interface&&qx.Interface.isDefined(G));
},__x:{0:cK,1:dF,2:bL,3:cz,4:cH,5:bN},error:function(dU,dV,dW,dX,dY){var ea=dU.constructor.classname;
var eb=dd+dW+bQ+ea+cW+this.$$method[dX][dW]+ch+dY+bP;
throw new Error(eb+(this.__x[dV]||"Unknown reason: "+dV));
},__y:function(bE,bF,name,bG,bH,bI){var bJ=this.$$method[bG][name];
{bF[bJ]=new Function(cB,bH.join(dl));
};
if(qx.core.Variant.isSet(cF,cb)){bF[bJ]=qx.core.Aspect.wrap(bE.classname+dH+bJ,bF[bJ],dc);
}qx.Bootstrap.setDisplayName(bF[bJ],bE.classname+cv,bJ);
if(bI===undefined){return bE[bJ]();
}else{return bE[bJ](bI[0]);
}},executeOptimizedGetter:function(bp,bq,name,br){var bt=bq.$$properties[name];
var bv=bq.prototype;
var bs=[];
var bu=this.$$store;
bs.push(cN,bu.runtime[name],dj);
bs.push(dp,bu.runtime[name],dq);

if(bt.inheritable){bs.push(cS,bu.inherit[name],dj);
bs.push(dp,bu.inherit[name],dq);
bs.push(cO);
}bs.push(cN,bu.user[name],dj);
bs.push(dp,bu.user[name],dq);

if(bt.themeable){bs.push(cS,bu.theme[name],dj);
bs.push(dp,bu.theme[name],dq);
}
if(bt.deferredInit&&bt.init===undefined){bs.push(cS,bu.init[name],dj);
bs.push(dp,bu.init[name],dq);
}bs.push(cO);

if(bt.init!==undefined){if(bt.inheritable){bs.push(cX,bu.init[name],dq);

if(bt.nullable){bs.push(bU);
}else if(bt.init!==undefined){bs.push(dp,bu.init[name],dq);
}else{bs.push(cy,name,dv,bq.classname,dt);
}bs.push(cY);
}else{bs.push(dp,bu.init[name],dq);
}}else if(bt.inheritable||bt.nullable){bs.push(cd);
}else{bs.push(cm,name,dv,bq.classname,dt);
}return this.__y(bp,bv,name,br,bs);
},executeOptimizedSetter:function(be,bf,name,bg,bh){var bm=bf.$$properties[name];
var bl=bf.prototype;
var bj=[];
var bi=bg===dh||bg===dk||bg===cU||(bg===cT&&bm.init===undefined);
var bk=bm.apply||bm.event||bm.inheritable;
var bn=this.__z(bg,name);
this.__A(bj,bm,name,bg,bi);

if(bi){this.__B(bj,bf,bm,name);
}
if(bk){this.__C(bj,bi,bn,bg);
}
if(bm.inheritable){bj.push(dD);
}{};

if(!bk){this.__E(bj,name,bg,bi);
}else{this.__F(bj,bm,name,bg,bi);
}
if(bm.inheritable){this.__G(bj,bm,name,bg);
}else if(bk){this.__H(bj,bm,name,bg);
}
if(bk){this.__I(bj,bm,name);
if(bm.inheritable&&bl._getChildren){this.__J(bj,name);
}}if(bi){bj.push(ct);
}return this.__y(be,bl,name,bg,bj,bh);
},__z:function(h,name){if(h===cU||h===cR){var j=this.$$store.runtime[name];
}else if(h===dk||h===dg){j=this.$$store.theme[name];
}else if(h===cT){j=this.$$store.init[name];
}else{j=this.$$store.user[name];
}return j;
},__A:function(b,c,name,d,e){{if(!c.nullable||c.check||c.inheritable){b.push('var prop=qx.core.Property;');
}if(d==="set"){b.push('if(value===undefined)prop.error(this,2,"',name,'","',d,'",value);');
}};
},__B:function(dR,dS,dT,name){if(dT.transform){dR.push('value=this.',dT.transform,'(value);');
}if(dT.validate){if(typeof dT.validate==="string"){dR.push('this.',dT.validate,'(value);');
}else if(dT.validate instanceof Function){dR.push(dS.classname,'.$$properties.',name);
dR.push('.validate.call(this, value);');
}}},__C:function(dL,dM,dN,dO){var dP=(dO==="reset"||dO==="resetThemed"||dO==="resetRuntime");

if(dM){dL.push('if(this.',dN,'===value)return value;');
}else if(dP){dL.push('if(this.',dN,'===undefined)return;');
}},__D:undefined,__E:function(P,name,Q,R){if(Q==="setRuntime"){P.push('this.',this.$$store.runtime[name],'=value;');
}else if(Q==="resetRuntime"){P.push('if(this.',this.$$store.runtime[name],'!==undefined)');
P.push('delete this.',this.$$store.runtime[name],';');
}else if(Q==="set"){P.push('this.',this.$$store.user[name],'=value;');
}else if(Q==="reset"){P.push('if(this.',this.$$store.user[name],'!==undefined)');
P.push('delete this.',this.$$store.user[name],';');
}else if(Q==="setThemed"){P.push('this.',this.$$store.theme[name],'=value;');
}else if(Q==="resetThemed"){P.push('if(this.',this.$$store.theme[name],'!==undefined)');
P.push('delete this.',this.$$store.theme[name],';');
}else if(Q==="init"&&R){P.push('this.',this.$$store.init[name],'=value;');
}},__F:function(K,L,name,M,N){if(L.inheritable){K.push('var computed, old=this.',this.$$store.inherit[name],';');
}else{K.push('var computed, old;');
}K.push('if(this.',this.$$store.runtime[name],'!==undefined){');

if(M==="setRuntime"){K.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(M==="resetRuntime"){K.push('delete this.',this.$$store.runtime[name],';');
K.push('if(this.',this.$$store.user[name],'!==undefined)');
K.push('computed=this.',this.$$store.user[name],';');
K.push('else if(this.',this.$$store.theme[name],'!==undefined)');
K.push('computed=this.',this.$$store.theme[name],';');
K.push('else if(this.',this.$$store.init[name],'!==undefined){');
K.push('computed=this.',this.$$store.init[name],';');
K.push('this.',this.$$store.useinit[name],'=true;');
K.push('}');
}else{K.push('old=computed=this.',this.$$store.runtime[name],';');
if(M==="set"){K.push('this.',this.$$store.user[name],'=value;');
}else if(M==="reset"){K.push('delete this.',this.$$store.user[name],';');
}else if(M==="setThemed"){K.push('this.',this.$$store.theme[name],'=value;');
}else if(M==="resetThemed"){K.push('delete this.',this.$$store.theme[name],';');
}else if(M==="init"&&N){K.push('this.',this.$$store.init[name],'=value;');
}}K.push('}');
K.push('else if(this.',this.$$store.user[name],'!==undefined){');

if(M==="set"){if(!L.inheritable){K.push('old=this.',this.$$store.user[name],';');
}K.push('computed=this.',this.$$store.user[name],'=value;');
}else if(M==="reset"){if(!L.inheritable){K.push('old=this.',this.$$store.user[name],';');
}K.push('delete this.',this.$$store.user[name],';');
K.push('if(this.',this.$$store.runtime[name],'!==undefined)');
K.push('computed=this.',this.$$store.runtime[name],';');
K.push('if(this.',this.$$store.theme[name],'!==undefined)');
K.push('computed=this.',this.$$store.theme[name],';');
K.push('else if(this.',this.$$store.init[name],'!==undefined){');
K.push('computed=this.',this.$$store.init[name],';');
K.push('this.',this.$$store.useinit[name],'=true;');
K.push('}');
}else{if(M==="setRuntime"){K.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(L.inheritable){K.push('computed=this.',this.$$store.user[name],';');
}else{K.push('old=computed=this.',this.$$store.user[name],';');
}if(M==="setThemed"){K.push('this.',this.$$store.theme[name],'=value;');
}else if(M==="resetThemed"){K.push('delete this.',this.$$store.theme[name],';');
}else if(M==="init"&&N){K.push('this.',this.$$store.init[name],'=value;');
}}K.push('}');
if(L.themeable){K.push('else if(this.',this.$$store.theme[name],'!==undefined){');

if(!L.inheritable){K.push('old=this.',this.$$store.theme[name],';');
}
if(M==="setRuntime"){K.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(M==="set"){K.push('computed=this.',this.$$store.user[name],'=value;');
}else if(M==="setThemed"){K.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(M==="resetThemed"){K.push('delete this.',this.$$store.theme[name],';');
K.push('if(this.',this.$$store.init[name],'!==undefined){');
K.push('computed=this.',this.$$store.init[name],';');
K.push('this.',this.$$store.useinit[name],'=true;');
K.push('}');
}else if(M==="init"){if(N){K.push('this.',this.$$store.init[name],'=value;');
}K.push('computed=this.',this.$$store.theme[name],';');
}else if(M==="refresh"){K.push('computed=this.',this.$$store.theme[name],';');
}K.push('}');
}K.push('else if(this.',this.$$store.useinit[name],'){');

if(!L.inheritable){K.push('old=this.',this.$$store.init[name],';');
}
if(M==="init"){if(N){K.push('computed=this.',this.$$store.init[name],'=value;');
}else{K.push('computed=this.',this.$$store.init[name],';');
}}else if(M==="set"||M==="setRuntime"||M==="setThemed"||M==="refresh"){K.push('delete this.',this.$$store.useinit[name],';');

if(M==="setRuntime"){K.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(M==="set"){K.push('computed=this.',this.$$store.user[name],'=value;');
}else if(M==="setThemed"){K.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(M==="refresh"){K.push('computed=this.',this.$$store.init[name],';');
}}K.push('}');
if(M==="set"||M==="setRuntime"||M==="setThemed"||M==="init"){K.push('else{');

if(M==="setRuntime"){K.push('computed=this.',this.$$store.runtime[name],'=value;');
}else if(M==="set"){K.push('computed=this.',this.$$store.user[name],'=value;');
}else if(M==="setThemed"){K.push('computed=this.',this.$$store.theme[name],'=value;');
}else if(M==="init"){if(N){K.push('computed=this.',this.$$store.init[name],'=value;');
}else{K.push('computed=this.',this.$$store.init[name],';');
}K.push('this.',this.$$store.useinit[name],'=true;');
}K.push('}');
}},__G:function(bB,bC,name,bD){bB.push('if(computed===undefined||computed===inherit){');

if(bD==="refresh"){bB.push('computed=value;');
}else{bB.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');
}bB.push('if((computed===undefined||computed===inherit)&&');
bB.push('this.',this.$$store.init[name],'!==undefined&&');
bB.push('this.',this.$$store.init[name],'!==inherit){');
bB.push('computed=this.',this.$$store.init[name],';');
bB.push('this.',this.$$store.useinit[name],'=true;');
bB.push('}else{');
bB.push('delete this.',this.$$store.useinit[name],';}');
bB.push('}');
bB.push('if(old===computed)return value;');
bB.push('if(computed===inherit){');
bB.push('computed=undefined;delete this.',this.$$store.inherit[name],';');
bB.push('}');
bB.push('else if(computed===undefined)');
bB.push('delete this.',this.$$store.inherit[name],';');
bB.push('else this.',this.$$store.inherit[name],'=computed;');
bB.push('var backup=computed;');
if(bC.init!==undefined&&bD!=="init"){bB.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{bB.push('if(old===undefined)old=null;');
}bB.push('if(computed===undefined||computed==inherit)computed=null;');
},__H:function(r,s,name,t){if(t!=="set"&&t!=="setRuntime"&&t!=="setThemed"){r.push('if(computed===undefined)computed=null;');
}r.push('if(old===computed)return value;');
if(s.init!==undefined&&t!=="init"){r.push('if(old===undefined)old=this.',this.$$store.init[name],";");
}else{r.push('if(old===undefined)old=null;');
}},__I:function(f,g,name){if(g.apply){f.push('this.',g.apply,'(computed, old, "',name,'");');
}if(g.event){f.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",g.event,"')){","reg.fireEvent(this, '",g.event,"', qx.event.type.Data, [computed, old]",")}");
}},__J:function(bo,name){bo.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');
bo.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');
bo.push('}');
}},defer:function(W){var Y=navigator.userAgent.indexOf(bO)!=-1;
var X=navigator.userAgent.indexOf(cC)!=-1;
if(Y||X){W.__v=W.__w;
}}});
})();
(function(){var g="emulated",f="native",e='"',d="qx.lang.Core",c="\\\\",b="\\\"",a="[object Error]";
qx.Bootstrap.define(d,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;
}}[(!Error.prototype.toString||Error.prototype.toString()==a)?g:f],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(w,x){if(x==null){x=0;
}else if(x<0){x=Math.max(0,this.length+x);
}
for(var i=x;i<this.length;i++){if(this[i]===w){return i;
}}return -1;
}}[Array.prototype.indexOf?f:g],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(C,D){if(D==null){D=this.length-1;
}else if(D<0){D=Math.max(0,this.length+D);
}
for(var i=D;i>=0;i--){if(this[i]===C){return i;
}}return -1;
}}[Array.prototype.lastIndexOf?f:g],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(p,q){var l=this.length;

for(var i=0;i<l;i++){var r=this[i];

if(r!==undefined){p.call(q||window,r,i,this);
}}}}[Array.prototype.forEach?f:g],arrayFilter:{"native":Array.prototype.filter,"emulated":function(y,z){var A=[];
var l=this.length;

for(var i=0;i<l;i++){var B=this[i];

if(B!==undefined){if(y.call(z||window,B,i,this)){A.push(this[i]);
}}}return A;
}}[Array.prototype.filter?f:g],arrayMap:{"native":Array.prototype.map,"emulated":function(s,t){var u=[];
var l=this.length;

for(var i=0;i<l;i++){var v=this[i];

if(v!==undefined){u[i]=s.call(t||window,v,i,this);
}}return u;
}}[Array.prototype.map?f:g],arraySome:{"native":Array.prototype.some,"emulated":function(h,j){var l=this.length;

for(var i=0;i<l;i++){var k=this[i];

if(k!==undefined){if(h.call(j||window,k,i,this)){return true;
}}}return false;
}}[Array.prototype.some?f:g],arrayEvery:{"native":Array.prototype.every,"emulated":function(m,n){var l=this.length;

for(var i=0;i<l;i++){var o=this[i];

if(o!==undefined){if(!m.call(n||window,o,i,this)){return false;
}}}return true;
}}[Array.prototype.every?f:g],stringQuote:{"native":String.prototype.quote,"emulated":function(){return e+this.replace(/\\/g,c).replace(/\"/g,b)+e;
}}[String.prototype.quote?f:g]}});
Error.prototype.toString=qx.lang.Core.errorToString;
Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;
Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
Array.prototype.forEach=qx.lang.Core.arrayForEach;
Array.prototype.filter=qx.lang.Core.arrayFilter;
Array.prototype.map=qx.lang.Core.arrayMap;
Array.prototype.some=qx.lang.Core.arraySome;
Array.prototype.every=qx.lang.Core.arrayEvery;
String.prototype.quote=qx.lang.Core.stringQuote;
})();
(function(){var a="qx.bom.client.Engine";
qx.Bootstrap.define(a,{statics:{NAME:"",FULLVERSION:"0.0.0",VERSION:0.0,OPERA:false,WEBKIT:false,GECKO:false,MSHTML:false,UNKNOWN_ENGINE:false,UNKNOWN_VERSION:false,DOCUMENT_MODE:null,__K:function(){var b="unknown";
var f="0.0.0";
var e=window.navigator.userAgent;
var h=false;
var d=false;

if(window.opera&&Object.prototype.toString.call(window.opera)=="[object Opera]"){b="opera";
this.OPERA=true;
if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(e)){f=RegExp.$1+"."+RegExp.$2;

if(RegExp.$3!=""){f+="."+RegExp.$3;
}}else{d=true;
f="9.6.0";
}}else if(window.navigator.userAgent.indexOf("AppleWebKit/")!=-1){b="webkit";
this.WEBKIT=true;

if(/AppleWebKit\/([^ ]+)/.test(e)){f=RegExp.$1;
var g=RegExp("[^\\.0-9]").exec(f);

if(g){f=f.slice(0,g.index);
}}else{d=true;
f="525.26";
}}else if(window.controllers&&window.navigator.product==="Gecko"){b="gecko";
this.GECKO=true;
if(/rv\:([^\);]+)(\)|;)/.test(e)){f=RegExp.$1;
}else{d=true;
f="1.9.0.0";
}}else if(window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(e)){b="mshtml";
f=RegExp.$1;

if(document.documentMode){this.DOCUMENT_MODE=document.documentMode;
}if(f<8&&/Trident\/([^\);]+)(\)|;)/.test(e)){if(RegExp.$1==="4.0"){f="8.0";
}}this.MSHTML=true;
}else{var c=window.qxFail;

if(c&&typeof c==="function"){var b=c();

if(b.NAME&&b.FULLVERSION){b=b.NAME;
this[b.toUpperCase()]=true;
f=b.FULLVERSION;
}}else{h=true;
d=true;
f="1.9.0.0";
b="gecko";
this.GECKO=true;
qx.Bootstrap.warn("Unsupported client: "+e+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");
}}this.UNKNOWN_ENGINE=h;
this.UNKNOWN_VERSION=d;
this.NAME=b;
this.FULLVERSION=f;
this.VERSION=parseFloat(f);
}},defer:function(i){i.__K();
}});
})();
(function(){var p="on",o="off",n="|",m="default",k="gecko",j="qx.aspects",h="$",g="qx.debug",f="qx.dynlocale",e="webkit",b="opera",d="qx.client",c="qx.core.Variant",a="mshtml";
qx.Bootstrap.define(c,{statics:{__L:{},__M:{},compilerIsSet:function(){return true;
},define:function(u,w,x){{};

if(!this.__L[u]){this.__L[u]={};
}else{}this.__L[u].allowedValues=w;
this.__L[u].defaultValue=x;
},get:function(I){var J=this.__L[I];
{};

if(J.value!==undefined){return J.value;
}return J.defaultValue;
},__N:function(){if(window.qxvariants){for(var H in qxvariants){{};

if(!this.__L[H]){this.__L[H]={};
}this.__L[H].value=qxvariants[H];
}window.qxvariants=undefined;

try{delete window.qxvariants;
}catch(B){}this.__O(this.__L);
}},__O:function(){if(qx.core.Setting.get("qx.allowUrlVariants")!=true){return;
}var q=document.location.search.slice(1).split("&");

for(var i=0;i<q.length;i++){var r=q[i].split(":");

if(r.length!=3||r[0]!="qxvariant"){continue;
}var s=r[1];

if(!this.__L[s]){this.__L[s]={};
}this.__L[s].value=decodeURIComponent(r[2]);
}},select:function(y,z){{};

for(var A in z){if(this.isSet(y,A)){return z[A];
}}
if(z[m]!==undefined){return z[m];
}{};
},isSet:function(C,D){var E=C+h+D;

if(this.__M[E]!==undefined){return this.__M[E];
}var G=false;
if(D.indexOf(n)<0){G=this.get(C)===D;
}else{var F=D.split(n);

for(var i=0,l=F.length;i<l;i++){if(this.get(C)===F[i]){G=true;
break;
}}}this.__M[E]=G;
return G;
},__P:function(v){return typeof v==="object"&&v!==null&&v instanceof Array;
},__Q:function(v){return typeof v==="object"&&v!==null&&!(v instanceof Array);
},__R:function(K,L){for(var i=0,l=K.length;i<l;i++){if(K[i]==L){return true;
}}return false;
}},defer:function(t){t.define(d,[k,a,b,e],qx.bom.client.Engine.NAME);
t.define(g,[p,o],p);
t.define(j,[p,o],o);
t.define(f,[p,o],p);
t.__N();
}});
})();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";
qx.Bootstrap.define(d,{statics:{__S:[],wrap:function(e,f,g){var m=[];
var h=[];
var l=this.__S;
var k;

for(var i=0;i<l.length;i++){k=l[i];

if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);
}}
if(m.length===0&&h.length===0){return f;
}var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);
}var n=f.apply(this,arguments);

for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);
}return n;
};

if(g!==a){j.self=f.self;
j.base=f.base;
}f.wrapper=j;
j.original=f;
return j;
},addAdvice:function(o,p,q,name){this.__S.push({fcn:o,pos:p===c?-1:1,type:q,name:name});
}}});
})();
(function(){var bW="qx.aspects",bV="on",bU=".",bT="static",bS="[Class ",bR="]",bQ="$$init_",bP="constructor",bO="member",bN=".prototype",bK="extend",bM="qx.Class",bL="qx.event.type.Data";
qx.Bootstrap.define(bM,{statics:{define:function(name,f){if(!f){var f={};
}if(f.include&&!(f.include instanceof Array)){f.include=[f.include];
}if(f.implement&&!(f.implement instanceof Array)){f.implement=[f.implement];
}var g=false;

if(!f.hasOwnProperty(bK)&&!f.type){f.type=bT;
g=true;
}{};
var h=this.__X(name,f.type,f.extend,f.statics,f.construct,f.destruct,f.include);
if(f.extend){if(f.properties){this.__ba(h,f.properties,true);
}if(f.members){this.__bc(h,f.members,true,true,false);
}if(f.events){this.__Y(h,f.events,true);
}if(f.include){for(var i=0,l=f.include.length;i<l;i++){this.__bg(h,f.include[i],false);
}}}if(f.settings){for(var j in f.settings){qx.core.Setting.define(j,f.settings[j]);
}}if(f.variants){for(var j in f.variants){qx.core.Variant.define(j,f.variants[j].allowedValues,f.variants[j].defaultValue);
}}if(f.implement){for(var i=0,l=f.implement.length;i<l;i++){this.__be(h,f.implement[i]);
}}{};
if(f.defer){f.defer.self=h;
f.defer(h,h.prototype,{add:function(name,k){var m={};
m[name]=k;
qx.Class.__ba(h,m,true);
}});
}return h;
},undefine:function(name){delete this.$$registry[name];
var Q=name.split(bU);
var S=[window];

for(var i=0;i<Q.length;i++){S.push(S[i][Q[i]]);
}for(var i=S.length-1;i>=1;i--){var R=S[i];
var parent=S[i-1];

if(qx.Bootstrap.isFunction(R)||qx.Bootstrap.objectGetLength(R)===0){delete parent[Q[i-1]];
}else{break;
}}},isDefined:qx.Bootstrap.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);
},getByName:qx.Bootstrap.getByName,include:function(u,v){{};
qx.Class.__bg(u,v,false);
},patch:function(bY,ca){{};
qx.Class.__bg(bY,ca,true);
},isSubClassOf:function(w,x){if(!w){return false;
}
if(w==x){return true;
}
if(w.prototype instanceof x){return true;
}return false;
},getPropertyDefinition:qx.Bootstrap.getPropertyDefinition,getProperties:function(y){var z=[];

while(y){if(y.$$properties){z.push.apply(z,qx.Bootstrap.getKeys(y.$$properties));
}y=y.superclass;
}return z;
},getByProperty:function(bH,name){while(bH){if(bH.$$properties&&bH.$$properties[name]){return bH;
}bH=bH.superclass;
}return null;
},hasProperty:qx.Bootstrap.hasProperty,getEventType:qx.Bootstrap.getEventType,supportsEvent:qx.Bootstrap.supportsEvent,hasOwnMixin:function(F,G){return F.$$includes&&F.$$includes.indexOf(G)!==-1;
},getByMixin:function(br,bs){var bt,i,l;

while(br){if(br.$$includes){bt=br.$$flatIncludes;

for(i=0,l=bt.length;i<l;i++){if(bt[i]===bs){return br;
}}}br=br.superclass;
}return null;
},getMixins:qx.Bootstrap.getMixins,hasMixin:function(A,B){return !!this.getByMixin(A,B);
},hasOwnInterface:function(cb,cc){return cb.$$implements&&cb.$$implements.indexOf(cc)!==-1;
},getByInterface:qx.Bootstrap.getByInterface,getInterfaces:function(bu){var bv=[];

while(bu){if(bu.$$implements){bv.push.apply(bv,bu.$$flatImplements);
}bu=bu.superclass;
}return bv;
},hasInterface:qx.Bootstrap.hasInterface,implementsInterface:function(T,U){var V=T.constructor;

if(this.hasInterface(V,U)){return true;
}
try{qx.Interface.assertObject(T,U);
return true;
}catch(bX){}
try{qx.Interface.assert(V,U,false);
return true;
}catch(n){}return false;
},getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;
this.$$instance=new this;
delete this.$$allowconstruct;
}return this.$$instance;
},genericToString:function(){return bS+this.classname+bR;
},$$registry:qx.Bootstrap.$$registry,__T:null,__U:null,__V:function(){},__W:function(){},__X:function(name,bw,bx,by,bz,bA,bB){var bE;

if(!bx&&qx.core.Variant.isSet("qx.aspects","off")){bE=by||{};
qx.Bootstrap.setDisplayNames(bE,name);
}else{var bE={};

if(bx){if(!bz){bz=this.__bh();
}
if(this.__bj(bx,bB)){bE=this.__bk(bz,name,bw);
}else{bE=bz;
}if(bw==="singleton"){bE.getInstance=this.getInstance;
}qx.Bootstrap.setDisplayName(bz,name,"constructor");
}if(by){qx.Bootstrap.setDisplayNames(by,name);
var bF;

for(var i=0,a=qx.Bootstrap.getKeys(by),l=a.length;i<l;i++){bF=a[i];
var bC=by[bF];

if(qx.core.Variant.isSet("qx.aspects","on")){if(bC instanceof Function){bC=qx.core.Aspect.wrap(name+"."+bF,bC,"static");
}bE[bF]=bC;
}else{bE[bF]=bC;
}}}}var bD=qx.Bootstrap.createNamespace(name,bE);
bE.name=bE.classname=name;
bE.basename=bD;
bE.$$type="Class";

if(bw){bE.$$classtype=bw;
}if(!bE.hasOwnProperty("toString")){bE.toString=this.genericToString;
}
if(bx){qx.Bootstrap.extendClass(bE,bz,bx,name,bD);
if(bA){if(qx.core.Variant.isSet("qx.aspects","on")){bA=qx.core.Aspect.wrap(name,bA,"destructor");
}bE.$$destructor=bA;
qx.Bootstrap.setDisplayName(bA,name,"destruct");
}}this.$$registry[name]=bE;
return bE;
},__Y:function(cf,cg,ch){var ci,ci;
{};

if(cf.$$events){for(var ci in cg){cf.$$events[ci]=cg[ci];
}}else{cf.$$events=cg;
}},__ba:function(L,M,N){var O;

if(N===undefined){N=false;
}var P=L.prototype;

for(var name in M){O=M[name];
{};
O.name=name;
if(!O.refine){if(L.$$properties===undefined){L.$$properties={};
}L.$$properties[name]=O;
}if(O.init!==undefined){L.prototype[bQ+name]=O.init;
}if(O.event!==undefined){var event={};
event[O.event]=bL;
this.__Y(L,event,N);
}if(O.inheritable){qx.core.Property.$$inheritable[name]=true;

if(!P.$$refreshInheritables){qx.core.Property.attachRefreshInheritables(L);
}}
if(!O.refine){qx.core.Property.attachMethods(L,name,O);
}}},__bb:null,__bc:function(bd,be,bf,bg,bh){var bi=bd.prototype;
var bk,bj;
qx.Bootstrap.setDisplayNames(be,bd.classname+bN);

for(var i=0,a=qx.Bootstrap.getKeys(be),l=a.length;i<l;i++){bk=a[i];
bj=be[bk];
{};
if(bg!==false&&bj instanceof Function&&bj.$$type==null){if(bh==true){bj=this.__bd(bj,bi[bk]);
}else{if(bi[bk]){bj.base=bi[bk];
}bj.self=bd;
}
if(qx.core.Variant.isSet(bW,bV)){bj=qx.core.Aspect.wrap(bd.classname+bU+bk,bj,bO);
}}bi[bk]=bj;
}},__bd:function(cd,ce){if(ce){return function(){var bJ=cd.base;
cd.base=ce;
var bI=cd.apply(this,arguments);
cd.base=bJ;
return bI;
};
}else{return cd;
}},__be:function(C,D){{};
var E=qx.Interface.flatten([D]);

if(C.$$implements){C.$$implements.push(D);
C.$$flatImplements.push.apply(C.$$flatImplements,E);
}else{C.$$implements=[D];
C.$$flatImplements=E;
}},__bf:function(bl){var name=bl.classname;
var bm=this.__bk(bl,name,bl.$$classtype);
for(var i=0,a=qx.Bootstrap.getKeys(bl),l=a.length;i<l;i++){bn=a[i];
bm[bn]=bl[bn];
}bm.prototype=bl.prototype;
var bp=bl.prototype;

for(var i=0,a=qx.Bootstrap.getKeys(bp),l=a.length;i<l;i++){bn=a[i];
var bq=bp[bn];
if(bq&&bq.self==bl){bq.self=bm;
}}for(var bn in this.$$registry){var bo=this.$$registry[bn];

if(!bo){continue;
}
if(bo.base==bl){bo.base=bm;
}
if(bo.superclass==bl){bo.superclass=bm;
}
if(bo.$$original){if(bo.$$original.base==bl){bo.$$original.base=bm;
}
if(bo.$$original.superclass==bl){bo.$$original.superclass=bm;
}}}qx.Bootstrap.createNamespace(name,bm);
this.$$registry[name]=bm;
return bm;
},__bg:function(o,p,q){{};

if(this.hasMixin(o,p)){return;
}var t=o.$$original;

if(p.$$constructor&&!t){o=this.__bf(o);
}var s=qx.Mixin.flatten([p]);
var r;

for(var i=0,l=s.length;i<l;i++){r=s[i];
if(r.$$events){this.__Y(o,r.$$events,q);
}if(r.$$properties){this.__ba(o,r.$$properties,q);
}if(r.$$members){this.__bc(o,r.$$members,q,q,q);
}}if(o.$$includes){o.$$includes.push(p);
o.$$flatIncludes.push.apply(o.$$flatIncludes,s);
}else{o.$$includes=[p];
o.$$flatIncludes=s;
}},__bh:function(){function bG(){bG.base.apply(this,arguments);
}return bG;
},__bi:function(){return function(){};
},__bj:function(H,I){{};
if(H&&H.$$includes){var J=H.$$flatIncludes;

for(var i=0,l=J.length;i<l;i++){if(J[i].$$constructor){return true;
}}}if(I){var K=qx.Mixin.flatten(I);

for(var i=0,l=K.length;i<l;i++){if(K[i].$$constructor){return true;
}}}return false;
},__bk:function(b,name,c){var e=function(){var bc=e;
{};
var bb=bc.$$original.apply(this,arguments);
if(bc.$$includes){var ba=bc.$$flatIncludes;

for(var i=0,l=ba.length;i<l;i++){if(ba[i].$$constructor){ba[i].$$constructor.apply(this,arguments);
}}}{};
return bb;
};

if(qx.core.Variant.isSet(bW,bV)){var d=qx.core.Aspect.wrap(name,e,bP);
e.$$original=b;
e.constructor=d;
e=d;
}e.$$original=b;
b.wrapper=e;
return e;
}},defer:function(){if(qx.core.Variant.isSet(bW,bV)){for(var W in qx.Bootstrap.$$registry){var X=qx.Bootstrap.$$registry[W];

for(var Y in X){if(X[Y] instanceof Function){X[Y]=qx.core.Aspect.wrap(W+bU+Y,X[Y],bT);
}}}}}});
})();
(function(){var e="$$hash",d="",c="qx.core.ObjectRegistry";
qx.Class.define(c,{statics:{inShutDown:false,__bz:{},__bA:0,__bB:[],register:function(k){var o=this.__bz;

if(!o){return;
}var n=k.$$hash;

if(n==null){var m=this.__bB;

if(m.length>0){n=m.pop();
}else{n=(this.__bA++)+d;
}k.$$hash=n;
}{};
o[n]=k;
},unregister:function(w){var x=w.$$hash;

if(x==null){return;
}var y=this.__bz;

if(y&&y[x]){delete y[x];
this.__bB.push(x);
}try{delete w.$$hash;
}catch(f){if(w.removeAttribute){w.removeAttribute(e);
}}},toHashCode:function(g){{};
var j=g.$$hash;

if(j!=null){return j;
}var h=this.__bB;

if(h.length>0){j=h.pop();
}else{j=(this.__bA++)+d;
}return g.$$hash=j;
},clearHashCode:function(z){{};
var A=z.$$hash;

if(A!=null){this.__bB.push(A);
try{delete z.$$hash;
}catch(q){if(z.removeAttribute){z.removeAttribute(e);
}}}},fromHashCode:function(p){return this.__bz[p]||null;
},shutdown:function(){this.inShutDown=true;
var t=this.__bz;
var v=[];

for(var u in t){v.push(u);
}v.sort(function(a,b){return parseInt(b)-parseInt(a);
});
var s,i=0,l=v.length;

while(true){try{for(;i<l;i++){u=v[i];
s=t[u];

if(s&&s.dispose){s.dispose();
}}}catch(r){qx.Bootstrap.error(this,"Could not dispose object "+s.toString()+": "+r);

if(i!==l){i++;
continue;
}}break;
}qx.Bootstrap.debug(this,"Disposed "+l+" objects");
delete this.__bz;
},getRegistry:function(){return this.__bz;
}}});
})();
(function(){var a="qx.data.MBinding";
qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);
},removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);
},removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);
},getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);
}}});
})();
(function(){var j="qx.client",i="on",h="function",g="mousedown",f="qx.bom.Event",d="return;",c="mouseover",b="HTMLEvents";
qx.Class.define(f,{statics:{addNativeListener:qx.core.Variant.select(j,{"mshtml":function(k,l,m){k.attachEvent(i+l,m);
},"default":function(q,r,s){q.addEventListener(r,s,false);
}}),removeNativeListener:qx.core.Variant.select(j,{"mshtml":function(z,A,B){try{z.detachEvent(i+A,B);
}catch(e){if(e.number!==-2146828218){throw e;
}}},"default":function(C,D,E){C.removeEventListener(D,E,false);
}}),getTarget:function(e){return e.target||e.srcElement;
},getRelatedTarget:qx.core.Variant.select(j,{"mshtml":function(e){if(e.type===c){return e.fromEvent;
}else{return e.toElement;
}},"gecko":function(e){try{e.relatedTarget&&e.relatedTarget.nodeType;
}catch(e){return null;
}return e.relatedTarget;
},"default":function(e){return e.relatedTarget;
}}),preventDefault:qx.core.Variant.select(j,{"gecko":function(e){if(qx.bom.client.Engine.VERSION>=1.9&&e.type==g&&e.button==2){return;
}e.preventDefault();
if(qx.bom.client.Engine.VERSION<1.9){try{e.keyCode=0;
}catch(a){}}},"mshtml":function(e){try{e.keyCode=0;
}catch(F){}e.returnValue=false;
},"default":function(e){e.preventDefault();
}}),stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();
}e.cancelBubble=true;
},fire:function(n,o){if(document.createEventObject){var p=document.createEventObject();
return n.fireEvent(i+o,p);
}else{var p=document.createEvent(b);
p.initEvent(o,true,true);
return !n.dispatchEvent(p);
}},supportsEvent:qx.core.Variant.select(j,{"webkit":function(x,y){return x.hasOwnProperty(i+y);
},"default":function(t,u){var v=i+u;
var w=(v in t);

if(!w){w=typeof t[v]==h;

if(!w&&t.setAttribute){t.setAttribute(v,d);
w=typeof t[v]==h;
t.removeAttribute(v);
}}return w;
}})}});
})();
(function(){var cF="|bubble",cE="|capture",cD="|",cC="",cB="_",cA="unload",cz="UNKNOWN_",cy="__bq",cx="c",cw="DOM_",ct="WIN_",cv="__bp",cu="capture",cs="qx.event.Manager",cr="QX_";
qx.Class.define(cs,{extend:Object,construct:function(n,o){this.__bl=n;
this.__bm=qx.core.ObjectRegistry.toHashCode(n);
this.__bn=o;
if(n.qx!==qx){var self=this;
qx.bom.Event.addNativeListener(n,cA,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(n,cA,arguments.callee);
self.dispose();
}));
}this.__bo={};
this.__bp={};
this.__bq={};
this.__br={};
},statics:{__bs:0,getNextUniqueId:function(){return (this.__bs++)+cC;
}},members:{__bn:null,__bo:null,__bq:null,__bt:null,__bp:null,__br:null,__bl:null,__bm:null,getWindow:function(){return this.__bl;
},getWindowId:function(){return this.__bm;
},getHandler:function(bE){var bF=this.__bp[bE.classname];

if(bF){return bF;
}return this.__bp[bE.classname]=new bE(this);
},getDispatcher:function(C){var D=this.__bq[C.classname];

if(D){return D;
}return this.__bq[C.classname]=new C(this,this.__bn);
},getListeners:function(bW,bX,bY){var ca=bW.$$hash||qx.core.ObjectRegistry.toHashCode(bW);
var cc=this.__bo[ca];

if(!cc){return null;
}var cd=bX+(bY?cE:cF);
var cb=cc[cd];
return cb?cb.concat():null;
},serializeListeners:function(L){var S=L.$$hash||qx.core.ObjectRegistry.toHashCode(L);
var U=this.__bo[S];
var Q=[];

if(U){var O,T,M,P,R;

for(var N in U){O=N.indexOf(cD);
T=N.substring(0,O);
M=N.charAt(O+1)==cx;
P=U[N];

for(var i=0,l=P.length;i<l;i++){R=P[i];
Q.push({self:R.context,handler:R.handler,type:T,capture:M});
}}}return Q;
},toggleAttachedEvents:function(bN,bO){var bT=bN.$$hash||qx.core.ObjectRegistry.toHashCode(bN);
var bV=this.__bo[bT];

if(bV){var bQ,bU,bP,bR;

for(var bS in bV){bQ=bS.indexOf(cD);
bU=bS.substring(0,bQ);
bP=bS.charCodeAt(bQ+1)===99;
bR=bV[bS];

if(bO){this.__bu(bN,bU,bP);
}else{this.__bv(bN,bU,bP);
}}}},hasListener:function(E,F,G){{};
var H=E.$$hash||qx.core.ObjectRegistry.toHashCode(E);
var J=this.__bo[H];

if(!J){return false;
}var K=F+(G?cE:cF);
var I=J[K];
return I&&I.length>0;
},importListeners:function(ci,cj){{};
var cp=ci.$$hash||qx.core.ObjectRegistry.toHashCode(ci);
var cq=this.__bo[cp]={};
var cm=qx.event.Manager;

for(var ck in cj){var cn=cj[ck];
var co=cn.type+(cn.capture?cE:cF);
var cl=cq[co];

if(!cl){cl=cq[co]=[];
this.__bu(ci,cn.type,cn.capture);
}cl.push({handler:cn.listener,context:cn.self,unique:cn.unique||(cm.__bs++)+cC});
}},addListener:function(a,b,c,self,d){var h;
{};
var j=a.$$hash||qx.core.ObjectRegistry.toHashCode(a);
var m=this.__bo[j];

if(!m){m=this.__bo[j]={};
}var g=b+(d?cE:cF);
var f=m[g];

if(!f){f=m[g]=[];
}if(f.length===0){this.__bu(a,b,d);
}var k=(qx.event.Manager.__bs++)+cC;
var e={handler:c,context:self,unique:k};
f.push(e);
return g+cD+k;
},findHandler:function(p,q){var A=false,t=false,B=false;
var z;

if(p.nodeType===1){A=true;
z=cw+p.tagName.toLowerCase()+cB+q;
}else if(p==this.__bl){t=true;
z=ct+q;
}else if(p.classname){B=true;
z=cr+p.classname+cB+q;
}else{z=cz+p+cB+q;
}var v=this.__br;

if(v[z]){return v[z];
}var y=this.__bn.getHandlers();
var u=qx.event.IEventHandler;
var w,x,s,r;

for(var i=0,l=y.length;i<l;i++){w=y[i];
s=w.SUPPORTED_TYPES;

if(s&&!s[q]){continue;
}r=w.TARGET_CHECK;

if(r){if(!A&&r===u.TARGET_DOMNODE){continue;
}else if(!t&&r===u.TARGET_WINDOW){continue;
}else if(!B&&r===u.TARGET_OBJECT){continue;
}}x=this.getHandler(y[i]);

if(w.IGNORE_CAN_HANDLE||x.canHandleEvent(p,q)){v[z]=x;
return x;
}}return null;
},__bu:function(bo,bp,bq){var br=this.findHandler(bo,bp);

if(br){br.registerEvent(bo,bp,bq);
return;
}{};
},removeListener:function(be,bf,bg,self,bh){var bl;
{};
var bm=be.$$hash||qx.core.ObjectRegistry.toHashCode(be);
var bn=this.__bo[bm];

if(!bn){return false;
}var bi=bf+(bh?cE:cF);
var bj=bn[bi];

if(!bj){return false;
}var bk;

for(var i=0,l=bj.length;i<l;i++){bk=bj[i];

if(bk.handler===bg&&bk.context===self){qx.lang.Array.removeAt(bj,i);

if(bj.length==0){this.__bv(be,bf,bh);
}return true;
}}return false;
},removeListenerById:function(bs,bt){var bz;
{};
var bx=bt.split(cD);
var bC=bx[0];
var bu=bx[1].charCodeAt(0)==99;
var bB=bx[2];
var bA=bs.$$hash||qx.core.ObjectRegistry.toHashCode(bs);
var bD=this.__bo[bA];

if(!bD){return false;
}var by=bC+(bu?cE:cF);
var bw=bD[by];

if(!bw){return false;
}var bv;

for(var i=0,l=bw.length;i<l;i++){bv=bw[i];

if(bv.unique===bB){qx.lang.Array.removeAt(bw,i);

if(bw.length==0){this.__bv(bs,bC,bu);
}return true;
}}return false;
},removeAllListeners:function(W){var bb=W.$$hash||qx.core.ObjectRegistry.toHashCode(W);
var bd=this.__bo[bb];

if(!bd){return false;
}var Y,bc,X;

for(var ba in bd){if(bd[ba].length>0){Y=ba.split(cD);
bc=Y[0];
X=Y[1]===cu;
this.__bv(W,bc,X);
}}delete this.__bo[bb];
return true;
},deleteAllListeners:function(V){delete this.__bo[V];
},__bv:function(ce,cf,cg){var ch=this.findHandler(ce,cf);

if(ch){ch.unregisterEvent(ce,cf,cg);
return;
}{};
},dispatchEvent:function(bG,event){var bL;
{};
var bM=event.getType();

if(!event.getBubbles()&&!this.hasListener(bG,bM)){qx.event.Pool.getInstance().poolObject(event);
return true;
}
if(!event.getTarget()){event.setTarget(bG);
}var bK=this.__bn.getDispatchers();
var bJ;
var bI=false;

for(var i=0,l=bK.length;i<l;i++){bJ=this.getDispatcher(bK[i]);
if(bJ.canDispatchEvent(bG,event,bM)){bJ.dispatchEvent(bG,event,bM);
bI=true;
break;
}}
if(!bI){{};
return true;
}var bH=event.getDefaultPrevented();
qx.event.Pool.getInstance().poolObject(event);
return !bH;
},dispose:function(){this.__bn.removeManager(this);
qx.util.DisposeUtil.disposeMap(this,cv);
qx.util.DisposeUtil.disposeMap(this,cy);
this.__bo=this.__bl=this.__bt=null;
this.__bn=this.__br=null;
}}});
})();
(function(){var d="qx.dom.Node",c="qx.client",b="";
qx.Class.define(d,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(l){return l.nodeType===
this.DOCUMENT?l:
l.ownerDocument||l.document;
},getWindow:qx.core.Variant.select(c,{"mshtml":function(k){if(k.nodeType==null){return k;
}if(k.nodeType!==this.DOCUMENT){k=k.ownerDocument;
}return k.parentWindow;
},"default":function(e){if(e.nodeType==null){return e;
}if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;
}return e.defaultView;
}}),getDocumentElement:function(h){return this.getDocument(h).documentElement;
},getBodyElement:function(p){return this.getDocument(p).body;
},isNode:function(j){return !!(j&&j.nodeType!=null);
},isElement:function(o){return !!(o&&o.nodeType===this.ELEMENT);
},isDocument:function(n){return !!(n&&n.nodeType===this.DOCUMENT);
},isText:function(t){return !!(t&&t.nodeType===this.TEXT);
},isWindow:function(s){return !!(s&&s.history&&s.location&&s.document);
},isNodeName:function(f,g){if(!g||!f||!f.nodeName){return false;
}return g.toLowerCase()==qx.dom.Node.getName(f);
},getName:function(m){if(!m||!m.nodeName){return null;
}return m.nodeName.toLowerCase();
},getText:function(q){if(!q||!q.nodeType){return null;
}
switch(q.nodeType){case 1:var i,a=[],r=q.childNodes,length=r.length;

for(i=0;i<length;i++){a[i]=this.getText(r[i]);
}return a.join(b);
case 2:return q.nodeValue;
break;
case 3:return q.nodeValue;
break;
}return null;
}}});
})();
(function(){var A="mshtml",z="qx.client",y="[object Array]",x="qx.lang.Array",w="qx",v="number",u="string";
qx.Class.define(x,{statics:{toArray:function(p,q){return this.cast(p,Array,q);
},cast:function(V,W,X){if(V.constructor===W){return V;
}
if(qx.Class.hasInterface(V,qx.data.IListData)){var V=V.toArray();
}var Y=new W;
if(qx.core.Variant.isSet(z,A)){if(V.item){for(var i=X||0,l=V.length;i<l;i++){Y.push(V[i]);
}return Y;
}}if(Object.prototype.toString.call(V)===y&&X==null){Y.push.apply(Y,V);
}else{Y.push.apply(Y,Array.prototype.slice.call(V,X||0));
}return Y;
},fromArguments:function(T,U){return Array.prototype.slice.call(T,U||0);
},fromCollection:function(bd){if(qx.core.Variant.isSet(z,A)){if(bd.item){var be=[];

for(var i=0,l=bd.length;i<l;i++){be[i]=bd[i];
}return be;
}}return Array.prototype.slice.call(bd,0);
},fromShortHand:function(bj){var bl=bj.length;
var bk=qx.lang.Array.clone(bj);
switch(bl){case 1:bk[1]=bk[2]=bk[3]=bk[0];
break;
case 2:bk[2]=bk[0];
case 3:bk[3]=bk[1];
}return bk;
},clone:function(bg){return bg.concat();
},insertAt:function(n,o,i){n.splice(i,0,o);
return n;
},insertBefore:function(r,s,t){var i=r.indexOf(t);

if(i==-1){r.push(s);
}else{r.splice(i,0,s);
}return r;
},insertAfter:function(c,d,e){var i=c.indexOf(e);

if(i==-1||i==(c.length-1)){c.push(d);
}else{c.splice(i+1,0,d);
}return c;
},removeAt:function(f,i){return f.splice(i,1)[0];
},removeAll:function(S){S.length=0;
return this;
},append:function(bm,bn){{};
Array.prototype.push.apply(bm,bn);
return bm;
},exclude:function(O,P){{};

for(var i=0,R=P.length,Q;i<R;i++){Q=O.indexOf(P[i]);

if(Q!=-1){O.splice(Q,1);
}}return O;
},remove:function(bb,bc){var i=bb.indexOf(bc);

if(i!=-1){bb.splice(i,1);
return bc;
}},contains:function(bh,bi){return bh.indexOf(bi)!==-1;
},equals:function(k,m){var length=k.length;

if(length!==m.length){return false;
}
for(var i=0;i<length;i++){if(k[i]!==m[i]){return false;
}}return true;
},sum:function(a){var b=0;

for(var i=0,l=a.length;i<l;i++){b+=a[i];
}return b;
},max:function(g){{};
var i,j=g.length,h=g[0];

for(i=1;i<j;i++){if(g[i]>h){h=g[i];
}}return h===undefined?null:h;
},min:function(bo){{};
var i,bq=bo.length,bp=bo[0];

for(i=1;i<bq;i++){if(bo[i]<bp){bp=bo[i];
}}return bp===undefined?null:bp;
},unique:function(B){var L=[],D={},G={},I={};
var H,C=0;
var M=w+qx.lang.Date.now();
var E=false,K=false,N=false;
for(var i=0,J=B.length;i<J;i++){H=B[i];
if(H===null){if(!E){E=true;
L.push(H);
}}else if(H===undefined){}else if(H===false){if(!K){K=true;
L.push(H);
}}else if(H===true){if(!N){N=true;
L.push(H);
}}else if(typeof H===u){if(!D[H]){D[H]=1;
L.push(H);
}}else if(typeof H===v){if(!G[H]){G[H]=1;
L.push(H);
}}else{F=H[M];

if(F==null){F=H[M]=C++;
}
if(!I[F]){I[F]=H;
L.push(H);
}}}for(var F in I){try{delete I[F][M];
}catch(bf){try{I[F][M]=null;
}catch(ba){throw new Error("Cannot clean-up map entry doneObjects["+F+"]["+M+"]");
}}}return L;
}}});
})();
(function(){var n="()",m=".",l=".prototype.",k='anonymous()',j="qx.lang.Function",i=".constructor()";
qx.Class.define(j,{statics:{getCaller:function(d){return d.caller?d.caller.callee:d.callee.caller;
},getName:function(e){if(e.displayName){return e.displayName;
}
if(e.$$original||e.wrapper||e.classname){return e.classname+i;
}
if(e.$$mixin){for(var g in e.$$mixin.$$members){if(e.$$mixin.$$members[g]==e){return e.$$mixin.name+l+g+n;
}}for(var g in e.$$mixin){if(e.$$mixin[g]==e){return e.$$mixin.name+m+g+n;
}}}
if(e.self){var h=e.self.constructor;

if(h){for(var g in h.prototype){if(h.prototype[g]==e){return h.classname+l+g+n;
}}for(var g in h){if(h[g]==e){return h.classname+m+g+n;
}}}}var f=e.toString().match(/function\s*(\w*)\s*\(.*/);

if(f&&f.length>=1&&f[1]){return f[1]+n;
}return k;
},globalEval:function(G){if(window.execScript){return window.execScript(G);
}else{return eval.call(window,G);
}},empty:function(){},returnTrue:function(){return true;
},returnFalse:function(){return false;
},returnNull:function(){return null;
},returnThis:function(){return this;
},returnZero:function(){return 0;
},create:function(w,x){{};
if(!x){return w;
}if(!(x.self||x.args||x.delay!=null||x.periodical!=null||x.attempt)){return w;
}return function(event){{};
var z=qx.lang.Array.fromArguments(arguments);
if(x.args){z=x.args.concat(z);
}
if(x.delay||x.periodical){var y=qx.event.GlobalError.observeMethod(function(){return w.apply(x.self||this,z);
});

if(x.delay){return window.setTimeout(y,x.delay);
}
if(x.periodical){return window.setInterval(y,x.periodical);
}}else if(x.attempt){var A=false;

try{A=w.apply(x.self||this,z);
}catch(s){}return A;
}else{return w.apply(x.self||this,z);
}};
},bind:function(q,self,r){return this.create(q,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});
},curry:function(B,C){return this.create(B,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});
},listener:function(t,self,u){if(arguments.length<3){return function(event){return t.call(self||this,event||window.event);
};
}else{var v=qx.lang.Array.fromArguments(arguments,2);
return function(event){var H=[event||window.event];
H.push.apply(H,v);
t.apply(self||this,H);
};
}},attempt:function(o,self,p){return this.create(o,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();
},delay:function(D,E,self,F){return this.create(D,{delay:E,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
},periodical:function(a,b,self,c){return this.create(a,{periodical:b,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();
}}});
})();
(function(){var i="qx.event.Registration";
qx.Class.define(i,{statics:{__bw:{},getManager:function(E){if(E==null){{};
E=window;
}else if(E.nodeType){E=qx.dom.Node.getWindow(E);
}else if(!qx.dom.Node.isWindow(E)){E=window;
}var G=E.$$hash||qx.core.ObjectRegistry.toHashCode(E);
var F=this.__bw[G];

if(!F){F=new qx.event.Manager(E,this);
this.__bw[G]=F;
}return F;
},removeManager:function(m){var n=m.getWindowId();
delete this.__bw[n];
},addListener:function(P,Q,R,self,S){return this.getManager(P).addListener(P,Q,R,self,S);
},removeListener:function(w,x,y,self,z){return this.getManager(w).removeListener(w,x,y,self,z);
},removeListenerById:function(p,q){return this.getManager(p).removeListenerById(p,q);
},removeAllListeners:function(v){return this.getManager(v).removeAllListeners(v);
},deleteAllListeners:function(k){var l=k.$$hash;

if(l){this.getManager(k).deleteAllListeners(l);
}},hasListener:function(A,B,C){return this.getManager(A).hasListener(A,B,C);
},serializeListeners:function(o){return this.getManager(o).serializeListeners(o);
},createEvent:function(r,s,t){{};
if(s==null){s=qx.event.type.Event;
}var u=qx.event.Pool.getInstance().getObject(s);
t?u.init.apply(u,t):u.init();
if(r){u.setType(r);
}return u;
},dispatchEvent:function(j,event){return this.getManager(j).dispatchEvent(j,event);
},fireEvent:function(J,K,L,M){var N;
{};
var O=this.createEvent(K,L||null,M);
return this.getManager(J).dispatchEvent(J,O);
},fireNonBubblingEvent:function(c,d,e,f){{};
var g=this.getManager(c);

if(!g.hasListener(c,d,false)){return true;
}var h=this.createEvent(d,e||null,f);
return g.dispatchEvent(c,h);
},PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__bx:[],addHandler:function(D){{};
this.__bx.push(D);
this.__bx.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getHandlers:function(){return this.__bx;
},__by:[],addDispatcher:function(H,I){{};
this.__by.push(H);
this.__by.sort(function(a,b){return a.PRIORITY-b.PRIORITY;
});
},getDispatchers:function(){return this.__by;
}}});
})();
(function(){var j=":",h="qx.client",g="anonymous",f="...",e="qx.dev.StackTrace",d="",c="\n",b="/source/class/",a=".";
qx.Class.define(e,{statics:{getStackTrace:qx.core.Variant.select(h,{"gecko":function(){try{throw new Error();
}catch(bb){var Q=this.getStackTraceFromError(bb);
qx.lang.Array.removeAt(Q,0);
var O=this.getStackTraceFromCaller(arguments);
var M=O.length>Q.length?O:Q;

for(var i=0;i<Math.min(O.length,Q.length);i++){var N=O[i];

if(N.indexOf(g)>=0){continue;
}var U=N.split(j);

if(U.length!=2){continue;
}var S=U[0];
var L=U[1];
var K=Q[i];
var V=K.split(j);
var R=V[0];
var J=V[1];

if(qx.Class.getByName(R)){var P=R;
}else{P=S;
}var T=P+j;

if(L){T+=L+j;
}T+=J;
M[i]=T;
}return M;
}},"mshtml|webkit":function(){return this.getStackTraceFromCaller(arguments);
},"opera":function(){var u;

try{u.bar();
}catch(s){var v=this.getStackTraceFromError(s);
qx.lang.Array.removeAt(v,0);
return v;
}return [];
}}),getStackTraceFromCaller:qx.core.Variant.select(h,{"opera":function(r){return [];
},"default":function(w){var B=[];
var A=qx.lang.Function.getCaller(w);
var x={};

while(A){var y=qx.lang.Function.getName(A);
B.push(y);

try{A=A.caller;
}catch(t){break;
}
if(!A){break;
}var z=qx.core.ObjectRegistry.toHashCode(A);

if(x[z]){B.push(f);
break;
}x[z]=A;
}return B;
}}),getStackTraceFromError:qx.core.Variant.select(h,{"gecko":function(C){if(!C.stack){return [];
}var I=/@(.+):(\d+)$/gm;
var D;
var E=[];

while((D=I.exec(C.stack))!=null){var F=D[1];
var H=D[2];
var G=this.__bC(F);
E.push(G+j+H);
}return E;
},"webkit":function(bc){if(bc.sourceURL&&bc.line){return [this.__bC(bc.sourceURL)+j+bc.line];
}else{return [];
}},"opera":function(k){if(k.message.indexOf("Backtrace:")<0){return [];
}var m=[];
var n=qx.lang.String.trim(k.message.split("Backtrace:")[1]);
var o=n.split(c);

for(var i=0;i<o.length;i++){var l=o[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);

if(l&&l.length>=2){var q=l[1];
var p=this.__bC(l[2]);
m.push(p+j+q);
}}return m;
},"default":function(){return [];
}}),__bC:function(W){var ba=b;
var X=W.indexOf(ba);
var Y=(X==-1)?W:W.substring(X+ba.length).replace(/\//g,a).replace(/\.js$/,d);
return Y;
}}});
})();
(function(){var a="qx.lang.RingBuffer";
qx.Class.define(a,{extend:Object,construct:function(d){this.setMaxEntries(d||50);
},members:{__bD:0,__bE:0,__bF:false,__bG:0,__bH:null,__bI:null,setMaxEntries:function(j){this.__bI=j;
this.clear();
},getMaxEntries:function(){return this.__bI;
},addEntry:function(b){this.__bH[this.__bD]=b;
this.__bD=this.__bJ(this.__bD,1);
var c=this.getMaxEntries();

if(this.__bE<c){this.__bE++;
}if(this.__bF&&(this.__bG<c)){this.__bG++;
}},mark:function(){this.__bF=true;
this.__bG=0;
},clearMark:function(){this.__bF=false;
},getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);
},getEntries:function(e,f){if(e>this.__bE){e=this.__bE;
}if(f&&this.__bF&&(e>this.__bG)){e=this.__bG;
}
if(e>0){var h=this.__bJ(this.__bD,-1);
var g=this.__bJ(h,-e+1);
var i;

if(g<=h){i=this.__bH.slice(g,h+1);
}else{i=this.__bH.slice(g,this.__bE).concat(this.__bH.slice(0,h+1));
}}else{i=[];
}return i;
},clear:function(){this.__bH=new Array(this.getMaxEntries());
this.__bE=0;
this.__bG=0;
this.__bD=0;
},__bJ:function(k,l){var m=this.getMaxEntries();
var n=(k+l)%m;
if(n<0){n+=m;
}return n;
}}});
})();
(function(){var a="qx.log.appender.RingBuffer";
qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(f){this.setMaxMessages(f||50);
},members:{setMaxMessages:function(b){this.setMaxEntries(b);
},getMaxMessages:function(){return this.getMaxEntries();
},process:function(e){this.addEntry(e);
},getAllLogEvents:function(){return this.getAllEntries();
},retrieveLogEvents:function(c,d){return this.getEntries(c,d);
},clearHistory:function(){this.clear();
}}});
})();
(function(){var k="node",j="error",h="...(+",g="array",f=")",e="info",d="instance",c="string",b="null",a="class",G="number",F="stringify",E="]",D="unknown",C="function",B="boolean",A="debug",z="map",y="undefined",x="qx.log.Logger",s=")}",t="#",q="warn",r="document",o="{...(",p="[",m="text[",n="[...(",u="\n",v=")]",w="object";
qx.Class.define(x,{statics:{__bK:A,setLevel:function(bv){this.__bK=bv;
},getLevel:function(){return this.__bK;
},setTreshold:function(M){this.__bN.setMaxMessages(M);
},getTreshold:function(){return this.__bN.getMaxMessages();
},__bL:{},__bM:0,register:function(J){if(J.$$id){return;
}var K=this.__bM++;
this.__bL[K]=J;
J.$$id=K;
var L=this.__bN.getAllLogEvents();

for(var i=0,l=L.length;i<l;i++){J.process(L[i]);
}},unregister:function(bO){var bP=bO.$$id;

if(bP==null){return;
}delete this.__bL[bP];
delete bO.$$id;
},debug:function(H,I){qx.log.Logger.__bP(A,arguments);
},info:function(bo,bp){qx.log.Logger.__bP(e,arguments);
},warn:function(bJ,bK){qx.log.Logger.__bP(q,arguments);
},error:function(U,V){qx.log.Logger.__bP(j,arguments);
},trace:function(bu){qx.log.Logger.__bP(e,[bu,qx.dev.StackTrace.getStackTrace().join(u)]);
},deprecatedMethodWarning:function(bw,bx){var by;
{};
},deprecatedClassWarning:function(bL,bM){var bN;
{};
},deprecatedEventWarning:function(W,event,X){var Y;
{};
},deprecatedMixinWarning:function(N,O){var P;
{};
},deprecatedConstantWarning:function(Q,R,S){var self,T;
{};
},deprecateMethodOverriding:function(ba,bb,bc,bd){var be;
{};
},clear:function(){this.__bN.clearHistory();
},__bN:new qx.log.appender.RingBuffer(50),__bO:{debug:0,info:1,warn:2,error:3},__bP:function(bz,bA){var bF=this.__bO;

if(bF[bz]<bF[this.__bK]){return;
}var bC=bA.length<2?null:bA[0];
var bE=bC?1:0;
var bB=[];

for(var i=bE,l=bA.length;i<l;i++){bB.push(this.__bR(bA[i],true));
}var bG=new Date;
var bH={time:bG,offset:bG-qx.Bootstrap.LOADSTART,level:bz,items:bB,win:window};
if(bC){if(bC instanceof qx.core.Object){bH.object=bC.$$hash;
}else if(bC.$$type){bH.clazz=bC;
}}this.__bN.process(bH);
var bI=this.__bL;

for(var bD in bI){bI[bD].process(bH);
}},__bQ:function(bq){if(bq===undefined){return y;
}else if(bq===null){return b;
}
if(bq.$$type){return a;
}var br=typeof bq;

if(br===C||br==c||br===G||br===B){return br;
}else if(br===w){if(bq.nodeType){return k;
}else if(bq.classname){return d;
}else if(bq instanceof Array){return g;
}else if(bq instanceof Error){return j;
}else{return z;
}}
if(bq.toString){return F;
}return D;
},__bR:function(bf,bg){var bn=this.__bQ(bf);
var bj=D;
var bi=[];

switch(bn){case b:case y:bj=bn;
break;
case c:case G:case B:bj=bf;
break;
case k:if(bf.nodeType===9){bj=r;
}else if(bf.nodeType===3){bj=m+bf.nodeValue+E;
}else if(bf.nodeType===1){bj=bf.nodeName.toLowerCase();

if(bf.id){bj+=t+bf.id;
}}else{bj=k;
}break;
case C:bj=qx.lang.Function.getName(bf)||bn;
break;
case d:bj=bf.basename+p+bf.$$hash+E;
break;
case a:case F:bj=bf.toString();
break;
case j:bi=qx.dev.StackTrace.getStackTraceFromError(bf);
bj=bf.toString();
break;
case g:if(bg){bj=[];

for(var i=0,l=bf.length;i<l;i++){if(bj.length>20){bj.push(h+(l-i)+f);
break;
}bj.push(this.__bR(bf[i],false));
}}else{bj=n+bf.length+v;
}break;
case z:if(bg){var bh;
var bm=[];

for(var bl in bf){bm.push(bl);
}bm.sort();
bj=[];

for(var i=0,l=bm.length;i<l;i++){if(bj.length>20){bj.push(h+(l-i)+f);
break;
}bl=bm[i];
bh=this.__bR(bf[bl],false);
bh.key=bl;
bj.push(bh);
}}else{var bk=0;

for(var bl in bf){bk++;
}bj=o+bk+s;
}break;
}return {type:bn,text:bj,trace:bi};
}},defer:function(bs){var bt=qx.Bootstrap.$$logs;

for(var i=0;i<bt.length;i++){bs.__bP(bt[i][0],bt[i][1]);
}qx.Bootstrap.debug=bs.debug;
qx.Bootstrap.info=bs.info;
qx.Bootstrap.warn=bs.warn;
qx.Bootstrap.error=bs.error;
qx.Bootstrap.trace=bs.trace;
}});
})();
(function(){var N="set",M="get",L="reset",K="MSIE 6.0",J="qx.core.Object",I="]",H="rv:1.8.1",G="[",F="$$user_",E="Object";
qx.Class.define(J,{extend:Object,include:[qx.data.MBinding],construct:function(){qx.core.ObjectRegistry.register(this);
},statics:{$$type:E},members:{toHashCode:function(){return this.$$hash;
},toString:function(){return this.classname+G+this.$$hash+I;
},base:function(X,Y){{};

if(arguments.length===1){return X.callee.base.call(this);
}else{return X.callee.base.apply(this,Array.prototype.slice.call(arguments,1));
}},self:function(u){return u.callee.self;
},clone:function(){var bs=this.constructor;
var br=new bs;
var bu=qx.Class.getProperties(bs);
var bt=qx.core.Property.$$store.user;
var bv=qx.core.Property.$$method.set;
var name;
for(var i=0,l=bu.length;i<l;i++){name=bu[i];

if(this.hasOwnProperty(bt[name])){br[bv[name]](this[bt[name]]);
}}return br;
},set:function(bw,bx){var bz=qx.core.Property.$$method.set;

if(qx.Bootstrap.isString(bw)){if(!this[bz[bw]]){if(this[N+qx.Bootstrap.firstUp(bw)]!=undefined){this[N+qx.Bootstrap.firstUp(bw)](bx);
return this;
}{};
}return this[bz[bw]](bx);
}else{for(var by in bw){if(!this[bz[by]]){if(this[N+qx.Bootstrap.firstUp(by)]!=undefined){this[N+qx.Bootstrap.firstUp(by)](bw[by]);
continue;
}{};
}this[bz[by]](bw[by]);
}return this;
}},get:function(o){var p=qx.core.Property.$$method.get;

if(!this[p[o]]){if(this[M+qx.Bootstrap.firstUp(o)]!=undefined){return this[M+qx.Bootstrap.firstUp(o)]();
}{};
}return this[p[o]]();
},reset:function(q){var r=qx.core.Property.$$method.reset;

if(!this[r[q]]){if(this[L+qx.Bootstrap.firstUp(q)]!=undefined){this[L+qx.Bootstrap.firstUp(q)]();
return;
}{};
}this[r[q]]();
},__bS:qx.event.Registration,addListener:function(bE,bF,self,bG){if(!this.$$disposed){return this.__bS.addListener(this,bE,bF,self,bG);
}return null;
},addListenerOnce:function(bi,bj,self,bk){var bl=function(e){bj.call(self||this,e);
this.removeListener(bi,bl,this,bk);
};
return this.addListener(bi,bl,this,bk);
},removeListener:function(bB,bC,self,bD){if(!this.$$disposed){return this.__bS.removeListener(this,bB,bC,self,bD);
}return false;
},removeListenerById:function(y){if(!this.$$disposed){return this.__bS.removeListenerById(this,y);
}return false;
},hasListener:function(S,T){return this.__bS.hasListener(this,S,T);
},dispatchEvent:function(O){if(!this.$$disposed){return this.__bS.dispatchEvent(this,O);
}return true;
},fireEvent:function(j,k,m){if(!this.$$disposed){return this.__bS.fireEvent(this,j,k,m);
}return true;
},fireNonBubblingEvent:function(U,V,W){if(!this.$$disposed){return this.__bS.fireNonBubblingEvent(this,U,V,W);
}return true;
},fireDataEvent:function(z,A,B,C){if(!this.$$disposed){if(B===undefined){B=null;
}return this.__bS.fireNonBubblingEvent(this,z,qx.event.type.Data,[A,B,!!C]);
}return true;
},__bT:null,setUserData:function(Q,R){if(!this.__bT){this.__bT={};
}this.__bT[Q]=R;
},getUserData:function(w){if(!this.__bT){return null;
}var x=this.__bT[w];
return x===undefined?null:x;
},__bU:qx.log.Logger,debug:function(D){this.__bU.debug(this,D);
},info:function(P){this.__bU.info(this,P);
},warn:function(a){this.__bU.warn(this,a);
},error:function(n){this.__bU.error(this,n);
},trace:function(){this.__bU.trace(this);
},isDisposed:function(){return this.$$disposed||false;
},dispose:function(){var g,d,c,h;
if(this.$$disposed){return;
}this.$$disposed=true;
this.$$instance=null;
this.$$allowconstruct=null;
{};
var f=this.constructor;
var b;

while(f.superclass){if(f.$$destructor){f.$$destructor.call(this);
}if(f.$$includes){b=f.$$flatIncludes;

for(var i=0,l=b.length;i<l;i++){if(b[i].$$destructor){b[i].$$destructor.call(this);
}}}f=f.superclass;
}if(this.__bV){this.__bV();
}{};
},__bV:null,__bW:function(){var v=qx.Class.getProperties(this.constructor);

for(var i=0,l=v.length;i<l;i++){delete this[F+v[i]];
}},_disposeObjects:function(bq){qx.util.DisposeUtil.disposeObjects(this,arguments);
},_disposeSingletonObjects:function(s){qx.util.DisposeUtil.disposeObjects(this,arguments,true);
},_disposeArray:function(t){qx.util.DisposeUtil.disposeArray(this,t);
},_disposeMap:function(bA){qx.util.DisposeUtil.disposeMap(this,bA);
}},settings:{"qx.disposerDebugLevel":0},defer:function(bm,bn){{};
var bp=navigator.userAgent.indexOf(K)!=-1;
var bo=navigator.userAgent.indexOf(H)!=-1;
if(bp||bo){bn.__bV=bn.__bW;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);
}else{qx.event.Registration.deleteAllListeners(this);
}qx.core.ObjectRegistry.unregister(this);
this.__bT=null;
var bc=this.constructor;
var bg;
var bh=qx.core.Property.$$store;
var be=bh.user;
var bf=bh.theme;
var ba=bh.inherit;
var bd=bh.useinit;
var bb=bh.init;

while(bc){bg=bc.$$properties;

if(bg){for(var name in bg){if(bg[name].dereference){this[be[name]]=this[bf[name]]=this[ba[name]]=this[bd[name]]=this[bb[name]]=undefined;
}}}bc=bc.superclass;
}}});
})();
(function(){var d="qx.ui.decoration.IDecorator";
qx.Interface.define(d,{members:{getMarkup:function(){},resize:function(a,b,c){},tint:function(e,f){},getInsets:function(){}}});
})();
(function(){var i="Number",h="_applyInsets",g="abstract",f="insetRight",e="insetTop",d="insetBottom",c="qx.ui.decoration.Abstract",b="shorthand",a="insetLeft";
qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:g,properties:{insetLeft:{check:i,nullable:true,apply:h},insetRight:{check:i,nullable:true,apply:h},insetBottom:{check:i,nullable:true,apply:h},insetTop:{check:i,nullable:true,apply:h},insets:{group:[e,f,d,a],mode:b}},members:{__qj:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");
},_isInitialized:function(){throw new Error("Abstract method called.");
},_resetInsets:function(){this.__qj=null;
},getInsets:function(){if(this.__qj){return this.__qj;
}var j=this._getDefaultInsets();
return this.__qj={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};
},_applyInsets:function(){{};
this.__qj=null;
}},destruct:function(){this.__qj=null;
}});
})();
(function(){var q="_applyBackground",p="repeat",o="mshtml",n="backgroundPositionX",m="",l="backgroundPositionY",k="no-repeat",j="scale",i=" ",h="repeat-x",c="qx.client",g="repeat-y",f="hidden",b="qx.ui.decoration.MBackgroundImage",a="String",e='"></div>',d='<div style="';
qx.Mixin.define(b,{properties:{backgroundImage:{check:a,nullable:true,apply:q},backgroundRepeat:{check:[p,h,g,k,j],init:p,apply:q},backgroundPositionX:{nullable:true,apply:q},backgroundPositionY:{nullable:true,apply:q},backgroundPosition:{group:[l,n]}},members:{_generateBackgroundMarkup:function(r){var v=m;
var u=this.getBackgroundImage();
var t=this.getBackgroundRepeat();
var top=this.getBackgroundPositionY();

if(top==null){top=0;
}var w=this.getBackgroundPositionX();

if(w==null){w=0;
}r.backgroundPosition=w+i+top;
if(u){var s=qx.util.AliasManager.getInstance().resolve(u);
v=qx.bom.element.Decoration.create(s,t,r);
}else{if(r){if(qx.core.Variant.isSet(c,o)){if(qx.bom.client.Engine.VERSION<7||qx.bom.client.Feature.QUIRKS_MODE){r.overflow=f;
}}v=d+qx.bom.element.Style.compile(r)+e;
}}return v;
},_applyBackground:function(){{};
}}});
})();
(function(){var o="_applyStyle",n="",m="Color",l="px",k="solid",j="dotted",i="double",h="dashed",g="_applyWidth",f="qx.ui.decoration.Uniform",c="px ",e=" ",d="scale",b="PositiveInteger",a="absolute";
qx.Class.define(f,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(s,t,u){qx.ui.decoration.Abstract.call(this);
if(s!=null){this.setWidth(s);
}
if(t!=null){this.setStyle(t);
}
if(u!=null){this.setColor(u);
}},properties:{width:{check:b,init:0,apply:g},style:{nullable:true,check:[k,j,h,i],init:k,apply:o},color:{nullable:true,check:m,apply:o},backgroundColor:{check:m,nullable:true,apply:o}},members:{__qk:null,_getDefaultInsets:function(){var z=this.getWidth();
return {top:z,right:z,bottom:z,left:z};
},_isInitialized:function(){return !!this.__qk;
},getMarkup:function(){if(this.__qk){return this.__qk;
}var v={position:a,top:0,left:0};
var w=this.getWidth();
{};
var y=qx.theme.manager.Color.getInstance();
v.border=w+c+this.getStyle()+e+(y.resolve(this.getColor())||n);
var x=this._generateBackgroundMarkup(v);
return this.__qk=x;
},resize:function(A,B,C){var E=this.getBackgroundImage()&&this.getBackgroundRepeat()==d;

if(E||qx.bom.client.Feature.CONTENT_BOX){var D=this.getWidth()*2;
B-=D;
C-=D;
if(B<0){B=0;
}
if(C<0){C=0;
}}A.style.width=B+l;
A.style.height=C+l;
},tint:function(p,q){var r=qx.theme.manager.Color.getInstance();

if(q==null){q=this.getBackgroundColor();
}p.style.backgroundColor=r.resolve(q)||n;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__qk=null;
}});
})();
(function(){var i="px",h="qx.ui.decoration.Background",g="",f="_applyStyle",e="Color",d="absolute";
qx.Class.define(h,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(m){qx.ui.decoration.Abstract.call(this);

if(m!=null){this.setBackgroundColor(m);
}},properties:{backgroundColor:{check:e,nullable:true,apply:f}},members:{__ql:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__ql;
},getMarkup:function(){if(this.__ql){return this.__ql;
}var n={position:d,top:0,left:0};
var o=this._generateBackgroundMarkup(n);
return this.__ql=o;
},resize:function(j,k,l){j.style.width=k+i;
j.style.height=l+i;
},tint:function(a,b){var c=qx.theme.manager.Color.getInstance();

if(b==null){b=this.getBackgroundColor();
}a.style.backgroundColor=c.resolve(b)||g;
},_applyStyle:function(){{};
}},destruct:function(){this.__ql=null;
}});
})();
(function(){var j="_applyStyle",i="solid",h="Color",g="",f="double",e="px ",d="dotted",c="_applyWidth",b="dashed",a="Number",F=" ",E="shorthand",D="px",C="widthTop",B="styleRight",A="styleLeft",z="widthLeft",y="widthBottom",x="styleTop",w="colorBottom",q="styleBottom",r="widthRight",o="colorLeft",p="colorRight",m="colorTop",n="scale",k="border-top",l="border-left",s="border-right",t="qx.ui.decoration.Single",v="border-bottom",u="absolute";
qx.Class.define(t,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(T,U,V){qx.ui.decoration.Abstract.call(this);
if(T!=null){this.setWidth(T);
}
if(U!=null){this.setStyle(U);
}
if(V!=null){this.setColor(V);
}},properties:{widthTop:{check:a,init:0,apply:c},widthRight:{check:a,init:0,apply:c},widthBottom:{check:a,init:0,apply:c},widthLeft:{check:a,init:0,apply:c},styleTop:{nullable:true,check:[i,d,b,f],init:i,apply:j},styleRight:{nullable:true,check:[i,d,b,f],init:i,apply:j},styleBottom:{nullable:true,check:[i,d,b,f],init:i,apply:j},styleLeft:{nullable:true,check:[i,d,b,f],init:i,apply:j},colorTop:{nullable:true,check:h,apply:j},colorRight:{nullable:true,check:h,apply:j},colorBottom:{nullable:true,check:h,apply:j},colorLeft:{nullable:true,check:h,apply:j},backgroundColor:{check:h,nullable:true,apply:j},left:{group:[z,A,o]},right:{group:[r,B,p]},top:{group:[C,x,m]},bottom:{group:[y,q,w]},width:{group:[C,r,y,z],mode:E},style:{group:[x,B,q,A],mode:E},color:{group:[m,p,w,o],mode:E}},members:{__qm:null,_getDefaultInsets:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};
},_isInitialized:function(){return !!this.__qm;
},getMarkup:function(G){if(this.__qm){return this.__qm;
}var H=qx.theme.manager.Color.getInstance();
var I={};
var K=this.getWidthTop();

if(K>0){I[k]=K+e+this.getStyleTop()+F+(H.resolve(this.getColorTop())||g);
}var K=this.getWidthRight();

if(K>0){I[s]=K+e+this.getStyleRight()+F+(H.resolve(this.getColorRight())||g);
}var K=this.getWidthBottom();

if(K>0){I[v]=K+e+this.getStyleBottom()+F+(H.resolve(this.getColorBottom())||g);
}var K=this.getWidthLeft();

if(K>0){I[l]=K+e+this.getStyleLeft()+F+(H.resolve(this.getColorLeft())||g);
}{};
I.position=u;
I.top=0;
I.left=0;
var J=this._generateBackgroundMarkup(I);
return this.__qm=J;
},resize:function(O,P,Q){var S=this.getBackgroundImage()&&this.getBackgroundRepeat()==n;

if(S||qx.bom.client.Feature.CONTENT_BOX){var R=this.getInsets();
P-=R.left+R.right;
Q-=R.top+R.bottom;
if(P<0){P=0;
}
if(Q<0){Q=0;
}}O.style.width=P+D;
O.style.height=Q+D;
},tint:function(L,M){var N=qx.theme.manager.Color.getInstance();

if(M==null){M=this.getBackgroundColor();
}L.style.backgroundColor=N.resolve(M)||g;
},_applyWidth:function(){{};
this._resetInsets();
},_applyStyle:function(){{};
}},destruct:function(){this.__qm=null;
}});
})();
(function(){var m="Number",l="_applyInsets",k="-l",j="insetRight",i="insetTop",h="_applyBaseImage",g="insetBottom",f="set",e="shorthand",d="-t",a="insetLeft",c="String",b="qx.ui.decoration.Grid";
qx.Class.define(b,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(t,u){qx.core.Object.call(this);

if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__qn=new qx.ui.decoration.css3.BorderImage();

if(t){this.__qo(t);
}}else{this.__qn=new qx.ui.decoration.GridDiv(t);
}
if(u!=null){this.__qn.setInsets(u);
}},properties:{baseImage:{check:c,nullable:true,apply:h},insetLeft:{check:m,nullable:true,apply:l},insetRight:{check:m,nullable:true,apply:l},insetBottom:{check:m,nullable:true,apply:l},insetTop:{check:m,nullable:true,apply:l},insets:{group:[i,j,g,a],mode:e}},members:{__qn:null,getMarkup:function(){return this.__qn.getMarkup();
},resize:function(q,r,s){this.__qn.resize(q,r,s);
},tint:function(x,y){},getInsets:function(){return this.__qn.getInsets();
},_applyInsets:function(n,o,name){var p=f+qx.lang.String.firstUp(name);
this.__qn[p](n);
},_applyBaseImage:function(v,w){if(this.__qn instanceof qx.ui.decoration.GridDiv){this.__qn.setBaseImage(v);
}else{this.__qo(v);
}},__qo:function(z){this.__qn.setBorderImage(z);
var D=qx.util.AliasManager.getInstance().resolve(z);
var E=/(.*)(\.[a-z]+)$/.exec(D);
var B=E[1];
var C=E[2];
var A=qx.util.ResourceManager.getInstance();
var F=A.getImageHeight(B+d+C);
var G=A.getImageWidth(B+k+C);
this.__qn.setSlice([F,G]);
}},destruct:function(){this.__qn=null;
}});
})();
(function(){var j="_applyStyle",i='"></div>',h="Color",g="1px",f='<div style="',e='border:',d="1px solid ",c="",b=";",a="px",v='</div>',u="qx.ui.decoration.Beveled",t='<div style="position:absolute;top:1px;left:1px;',s='border-bottom:',r='border-right:',q='border-left:',p='border-top:',o="Number",n='<div style="position:absolute;top:1px;left:0px;',m='position:absolute;top:0px;left:1px;',k='<div style="overflow:hidden;font-size:0;line-height:0;">',l="absolute";
qx.Class.define(u,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage],construct:function(H,I,J){qx.ui.decoration.Abstract.call(this);
if(H!=null){this.setOuterColor(H);
}
if(I!=null){this.setInnerColor(I);
}
if(J!=null){this.setInnerOpacity(J);
}},properties:{innerColor:{check:h,nullable:true,apply:j},innerOpacity:{check:o,init:1,apply:j},outerColor:{check:h,nullable:true,apply:j},backgroundColor:{check:h,nullable:true,apply:j}},members:{__qp:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};
},_isInitialized:function(){return !!this.__qp;
},_applyStyle:function(){{};
},getMarkup:function(){if(this.__qp){return this.__qp;
}var N=qx.theme.manager.Color.getInstance();
var O=[];
var R=d+N.resolve(this.getOuterColor())+b;
var Q=d+N.resolve(this.getInnerColor())+b;
O.push(k);
O.push(f);
O.push(e,R);
O.push(qx.bom.element.Opacity.compile(0.35));
O.push(i);
O.push(n);
O.push(q,R);
O.push(r,R);
O.push(i);
O.push(f);
O.push(m);
O.push(p,R);
O.push(s,R);
O.push(i);
var P={position:l,top:g,left:g};
O.push(this._generateBackgroundMarkup(P));
O.push(t);
O.push(e,Q);
O.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));
O.push(i);
O.push(v);
return this.__qp=O.join(c);
},resize:function(w,x,y){if(x<4){x=4;
}
if(y<4){y=4;
}if(qx.bom.client.Feature.CONTENT_BOX){var outerWidth=x-2;
var outerHeight=y-2;
var E=outerWidth;
var D=outerHeight;
var innerWidth=x-4;
var innerHeight=y-4;
}else{var outerWidth=x;
var outerHeight=y;
var E=x-2;
var D=y-2;
var innerWidth=E;
var innerHeight=D;
}var G=a;
var C=w.childNodes[0].style;
C.width=outerWidth+G;
C.height=outerHeight+G;
var B=w.childNodes[1].style;
B.width=outerWidth+G;
B.height=D+G;
var A=w.childNodes[2].style;
A.width=E+G;
A.height=outerHeight+G;
var z=w.childNodes[3].style;
z.width=E+G;
z.height=D+G;
var F=w.childNodes[4].style;
F.width=innerWidth+G;
F.height=innerHeight+G;
},tint:function(K,L){var M=qx.theme.manager.Color.getInstance();

if(L==null){L=this.getBackgroundColor();
}K.childNodes[3].style.backgroundColor=M.resolve(L)||c;
}},destruct:function(){this.__qp=null;
}});
})();
(function(){var m="solid",l="scale",k="border-main",j="white",i="repeat-x",h="border-separator",g="background-light",f="invalid",e="border-focused-invalid",d="border-disabled",bs="decoration/table/header-cell.png",br="decoration/form/input.png",bq="#f8f8f8",bp="decoration/scrollbar/scrollbar-button-bg-horizontal.png",bo="#b6b6b6",bn="background-pane",bm="repeat-y",bl="decoration/form/input-focused.png",bk="#33508D",bj="decoration/selection.png",t="border-input",u="decoration/scrollbar/scrollbar-button-bg-vertical.png",r="decoration/tabview/tab-button-top-active.png",s="black",p="decoration/form/button-c.png",q="decoration/scrollbar/scrollbar-bg-vertical.png",n="decoration/form/button.png",o="decoration/form/button-checked.png",B="decoration/tabview/tab-button-left-inactive.png",C="decoration/groupbox/groupbox.png",O="#FAFAFA",K="decoration/pane/pane.png",W="dotted",R="decoration/toolbar/toolbar-part.gif",bf="decoration/tabview/tab-button-top-inactive.png",bc="decoration/menu/bar-background.png",G="center",bi="decoration/tabview/tab-button-bottom-active.png",bh="decoration/form/button-hovered.png",bg="decoration/form/tooltip-error-arrow.png",F="decoration/window/captionbar-inactive.png",I="qx/decoration/Modern",J="decoration/menu/background.png",M="decoration/window/statusbar.png",P="border-focused",S="table-focus-indicator",Y="#F2F2F2",be="decoration/form/button-checked-c.png",v="decoration/scrollbar/scrollbar-bg-horizontal.png",w="qx.theme.modern.Decoration",H="#f4f4f4",V="decoration/shadow/shadow-small.png",U="decoration/app-header.png",T="decoration/tabview/tabview-pane.png",bb="decoration/form/tooltip-error.png",ba="decoration/form/button-focused.png",Q="decoration/tabview/tab-button-bottom-inactive.png",X="decoration/form/button-disabled.png",a="decoration/tabview/tab-button-right-active.png",bd="decoration/form/button-pressed.png",x="no-repeat",y="decoration/window/captionbar-active.png",L="decoration/tabview/tab-button-left-active.png",b="background-splitpane",c="decoration/form/button-checked-focused.png",E="#C5C5C5",z="decoration/toolbar/toolbar-gradient.png",A="decoration/tabview/tab-button-right-inactive.png",D="#b8b8b8",N="decoration/shadow/shadow.png";
qx.Theme.define(w,{aliases:{decoration:I},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:k}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bj,backgroundRepeat:l}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bj,backgroundRepeat:l,bottom:[2,m,bk]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,m,bk]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:K,insets:[0,2,3,0]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:C}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:s,style:W}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:h}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:h}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:bb,insets:[2,5,5,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bg,backgroundPositionY:G,backgroundRepeat:x,insets:[0,0,0,10]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:N,insets:[4,8,8,4]}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:V,insets:[0,3,3,0]}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:v,backgroundRepeat:i}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:q,backgroundRepeat:bm}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bp,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:k,innerColor:j,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:u,backgroundRepeat:l,outerColor:d,innerColor:j,innerOpacity:0.3}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:n,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:X,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:bh,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:bd,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:o,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:c,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[1]}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,insets:[0]}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:t,innerColor:P,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:f,innerColor:e,backgroundImage:bl,backgroundRepeat:i,backgroundColor:g,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:d,innerColor:j,innerOpacity:0.5,backgroundImage:br,backgroundRepeat:i,backgroundColor:g}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:z,backgroundRepeat:l}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:p,backgroundRepeat:l}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bo,innerColor:bq,backgroundImage:be,backgroundRepeat:l}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:D,colorRight:H,styleLeft:m,styleRight:m}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:R,backgroundRepeat:bm}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:T,insets:[4,6,7,4]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:r}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bf}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bi}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:Q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:L}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:B}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:a}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:A}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:bn,width:3,color:b,style:m}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:bn,width:1,color:k,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:y}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:F}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:M}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:k,style:m}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:h,styleRight:m,widthBottom:1,colorBottom:j,styleBottom:m}},"table-column-button":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthBottom:1,colorBottom:k,style:m}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:S,style:m}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:k,style:m}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bs,backgroundRepeat:l,widthRight:1,colorRight:Y,style:m}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:J,backgroundRepeat:l,width:1,color:k,style:m}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:E,widthBottom:1,colorBottom:O}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bc,backgroundRepeat:l,width:1,color:h,style:m}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:U,backgroundRepeat:l}}}});
})();
(function(){var d="decoration/toolbar/toolbar-gradient.png",c="border-main",b="inspector.theme.Decoration",a="scale";
qx.Theme.define(b,{extend:qx.theme.modern.Decoration,decorations:{"myToolbar":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:c,backgroundImage:d,backgroundRepeat:a}}}});
})();
(function(){var n="iPod",m="Win32",l="",k="Win64",j="Linux",i="BSD",h="Macintosh",g="iPhone",f="Windows",e="qx.bom.client.Platform",b="iPad",d="X11",c="MacIntel",a="MacPPC";
qx.Class.define(e,{statics:{NAME:"",WIN:false,MAC:false,UNIX:false,UNKNOWN_PLATFORM:false,__da:function(){var o=navigator.platform;
if(o==null||o===l){o=navigator.userAgent;
}
if(o.indexOf(f)!=-1||o.indexOf(m)!=-1||o.indexOf(k)!=-1){this.WIN=true;
this.NAME="win";
}else if(o.indexOf(h)!=-1||o.indexOf(a)!=-1||o.indexOf(c)!=-1||o.indexOf(n)!=-1||o.indexOf(g)!=-1||o.indexOf(b)!=-1){this.MAC=true;
this.NAME="mac";
}else if(o.indexOf(d)!=-1||o.indexOf(j)!=-1||o.indexOf(i)!=-1){this.UNIX=true;
this.NAME="unix";
}else{this.UNKNOWN_PLATFORM=true;
this.WIN=true;
this.NAME="win";
}}},defer:function(p){p.__da();
}});
})();
(function(){var j="win98",i="osx2",h="osx0",g="osx4",f="win95",e="win2000",d="osx1",c="osx5",b="osx3",a="Windows NT 5.01",H=")",G="winxp",F="freebsd",E="sunos",D="SV1",C="|",B="nintendods",A="winnt4",z="wince",y="winme",q="os9",r="\.",o="osx",p="linux",m="netbsd",n="winvista",k="openbsd",l="(",s="win2003",t="symbian",v="win7",u="g",x="qx.bom.client.System",w=" Mobile/";
qx.Class.define(x,{statics:{NAME:"",SP1:false,SP2:false,WIN95:false,WIN98:false,WINME:false,WINNT4:false,WIN2000:false,WINXP:false,WIN2003:false,WINVISTA:false,WIN7:false,WINCE:false,LINUX:false,SUNOS:false,FREEBSD:false,NETBSD:false,OPENBSD:false,OSX:false,OS9:false,SYMBIAN:false,NINTENDODS:false,PSP:false,IPHONE:false,UNKNOWN_SYSTEM:false,__db:{"Windows NT 6.1":v,"Windows NT 6.0":n,"Windows NT 5.2":s,"Windows NT 5.1":G,"Windows NT 5.0":e,"Windows 2000":e,"Windows NT 4.0":A,"Win 9x 4.90":y,"Windows CE":z,"Windows 98":j,"Win98":j,"Windows 95":f,"Win95":f,"Linux":p,"FreeBSD":F,"NetBSD":m,"OpenBSD":k,"SunOS":E,"Symbian System":t,"Nitro":B,"PSP":"sonypsp","Mac OS X 10_5":c,"Mac OS X 10.5":c,"Mac OS X 10_4":g,"Mac OS X 10.4":g,"Mac OS X 10_3":b,"Mac OS X 10.3":b,"Mac OS X 10_2":i,"Mac OS X 10.2":i,"Mac OS X 10_1":d,"Mac OS X 10.1":d,"Mac OS X 10_0":h,"Mac OS X 10.0":h,"Mac OS X":o,"Mac OS 9":q},__dc:function(){var K=navigator.userAgent;
var J=[];

for(var I in this.__db){J.push(I);
}var L=new RegExp(l+J.join(C).replace(/\./g,r)+H,u);

if(!L.test(K)){this.UNKNOWN_SYSTEM=true;

if(!qx.bom.client.Platform.UNKNOWN_PLATFORM){if(qx.bom.client.Platform.UNIX){this.NAME="linux";
this.LINUX=true;
}else if(qx.bom.client.Platform.MAC){this.NAME="osx5";
this.OSX=true;
}else{this.NAME="winxp";
this.WINXP=true;
}}else{this.NAME="winxp";
this.WINXP=true;
}return;
}
if(qx.bom.client.Engine.WEBKIT&&RegExp(w).test(navigator.userAgent)){this.IPHONE=true;
this.NAME="iphone";
}else{this.NAME=this.__db[RegExp.$1];
this[this.NAME.toUpperCase()]=true;

if(qx.bom.client.Platform.WIN){if(K.indexOf(a)!==-1){this.SP1=true;
}else if(qx.bom.client.Engine.MSHTML&&K.indexOf(D)!==-1){this.SP2=true;
}}}}},defer:function(M){M.__dc();
}});
})();
(function(){var n="Liberation Sans",m="Arial",l="Lucida Grande",k="sans-serif",j="Tahoma",i="Candara",h="Segoe UI",g="Consolas",f="Courier New",e="Monaco",b="monospace",d="Lucida Console",c="qx.theme.modern.Font",a="DejaVu Sans Mono";
qx.Theme.define(c,{fonts:{"default":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"bold":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?12:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k],bold:true},"small":{size:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?11:10,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[l]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[h,i]:[j,n,m,k]},"monospace":{size:11,lineHeight:1.4,family:qx.bom.client.Platform.MAC?[d,e]:(qx.bom.client.System.WINVISTA||qx.bom.client.System.WIN7)?[g]:[g,a,f,b]}}});
})();
(function(){var a="inspector.theme.Font";
qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});
})();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";
qx.Theme.define(a,{title:c,aliases:{"icon":b},icons:{}});
})();
(function(){var fm="button-frame",fl="atom",fk="widget",fj="main",fi="button",fh="text-selected",fg="image",ff="bold",fe="middle",fd="background-light",dQ="text-disabled",dP="groupbox",dO="decoration/arrows/down.png",dN="cell",dM="selected",dL="border-invalid",dK="input",dJ="input-disabled",dI="menu-button",dH="input-focused-invalid",ft="toolbar-button",fu="spinner",fr="input-focused",fs="popup",fp="tooltip",fq="label",fn="list",fo="white",fv="tree-item",fw="treevirtual-contract",eL="scrollbar",eK="datechooser/nav-button",eN="text-hovered",eM="center",eP="treevirtual-expand",eO="textfield",eR="decoration/arrows/right.png",eQ="background-application",eJ="radiobutton",eI="invalid",bM="combobox",bN="right-top",bO="checkbox",bP="text-title",bQ="qx/static/blank.gif",bR="scrollbar/button",bS="right",bT="combobox/button",bU="icon/16/places/folder.png",bV="text-label",fK="decoration/tree/closed.png",fJ="scrollbar-slider-horizontal",fI="decoration/arrows/left.png",fH="button-focused",fO="text-light",fN="menu-slidebar-button",fM="text-input",fL="slidebar/button-forward",fQ="background-splitpane",fP=".png",cO="decoration/tree/open.png",cP="default",cM="decoration/arrows/down-small.png",cN="datechooser",cS="slidebar/button-backward",cT="selectbox",cQ="treevirtual-folder",cR="shadow-popup",cK="icon/16/mimetypes/office-document.png",cL="background-medium",cq="table",cp="decoration/arrows/up.png",cs="decoration/form/",cr="",cm="-invalid",cl="icon/16/places/folder-open.png",co="button-checked",cn="decoration/window/maximize-active-hovered.png",ck="radiobutton-hovered",cj="keyboard-focus",da="decoration/cursors/",db="slidebar",dc="tooltip-error-arrow",dd="table-scroller-focus-indicator",cV="move-frame",cW="nodrop",cX="decoration/table/boolean-true.png",cY="table-header-cell",de="menu",df="app-header",cD="row-layer",cC="text-inactive",cB="move",cA="radiobutton-checked-focused",cz="decoration/window/restore-active-hovered.png",cy="shadow-window",cx="table-column-button",cw="right.png",cH="tabview-page-button-bottom-inactive",cG="tooltip-error",dg="window-statusbar",dh="button-hovered",di="decoration/scrollbar/scrollbar-",dj="background-tip",dk="scrollbar-slider-horizontal-disabled",dl="table-scroller-header",dm="button-pressed",dn="table-pane",dp="decoration/window/close-active.png",dq="native",dY="checkbox-hovered",dX="button-invalid-shadow",dW="checkbox-checked",dV="decoration/window/minimize-active-hovered.png",ed="menubar",ec="icon/16/actions/dialog-cancel.png",eb="tabview-page-button-top-inactive",ea="tabview-page-button-left-inactive",eh="menu-slidebar",eg="toolbar-button-checked",eE="decoration/tree/open-selected.png",eF="radiobutton-checked",eC="decoration/window/minimize-inactive.png",eD="icon/16/apps/office-calendar.png",eA="group",eB="tabview-page-button-right-inactive",ey="decoration/window/minimize-active.png",ez="decoration/window/restore-inactive.png",eG="checkbox-checked-focused",eH="splitpane",eV="combobox/textfield",eU="button-preselected-focused",eX="decoration/window/close-active-hovered.png",eW="qx/icon/Tango/16/actions/window-close.png",fa="checkbox-pressed",eY="button-disabled",fc="selected-dragover",fb="border-separator",eT="decoration/window/maximize-inactive.png",eS="dragover",fD="scrollarea",fE="scrollbar-vertical",fF="decoration/menu/checkbox-invert.gif",fG="decoration/toolbar/toolbar-handle-knob.gif",fz="icon/22/mimetypes/office-document.png",fA="button-preselected",fB="button-checked-focused",fC="up.png",fx="best-fit",fy="decoration/tree/closed-selected.png",bL="qx.theme.modern.Appearance",bK="text-active",bJ="toolbar-button-hovered",bI="progressive-table-header",bH="decoration/table/select-column-order.png",bG="decoration/menu/radiobutton.gif",bF="decoration/arrows/forward.png",bE="decoration/table/descending.png",bD="window-captionbar-active",bC="checkbox-checked-hovered",bY="scrollbar-slider-vertical",ca="toolbar",bW="alias",bX="decoration/window/restore-active.png",cd="decoration/table/boolean-false.png",ce="checkbox-checked-disabled",cb="icon/32/mimetypes/office-document.png",cc="radiobutton-checked-disabled",cg="tabview-pane",ch="decoration/arrows/rewind.png",el="checkbox-focused",ef="top",es="icon/16/actions/dialog-ok.png",eo="radiobutton-checked-hovered",dT="table-header-cell-hovered",dR="window",cu="text-gray",dU="decoration/menu/radiobutton-invert.gif",cF="text-placeholder",cE="slider",dz="keep-align",dA="down.png",dB="tabview-page-button-top-active",dC="icon/32/places/folder-open.png",dD="icon/22/places/folder.png",dE="decoration/window/maximize-active.png",dF="checkbox-checked-pressed",dG="decoration/window/close-inactive.png",dx="tabview-page-button-left-active",dy="toolbar-part",dS="decoration/splitpane/knob-vertical.png",er=".gif",eq="icon/22/places/folder-open.png",ep="radiobutton-checked-pressed",ew="table-statusbar",ev="radiobutton-pressed",eu="window-captionbar-inactive",et="copy",en="radiobutton-focused",em="decoration/arrows/down-invert.png",cf="decoration/menu/checkbox.gif",cJ="decoration/splitpane/knob-horizontal.png",cI="icon/32/places/folder.png",ee="toolbar-separator",cU="tabview-page-button-bottom-active",ek="decoration/arrows/up-small.png",ej="decoration/table/ascending.png",ei="decoration/arrows/up-invert.png",ct="small",ex="tabview-page-button-right-active",ci="-disabled",cv="scrollbar-horizontal",dr="progressive-table-header-cell",ds="menu-separator",dt="pane",du="decoration/arrows/right-invert.png",dv="left.png",dw="icon/16/actions/view-refresh.png";
qx.Theme.define(bL,{appearances:{"widget":{},"root":{style:function(fT){return {backgroundColor:eQ,textColor:bV,font:cP};
}},"label":{style:function(hW){return {textColor:hW.disabled?dQ:undefined};
}},"move-frame":{style:function(I){return {decorator:fj};
}},"resize-frame":cV,"dragdrop-cursor":{style:function(hm){var hn=cW;

if(hm.copy){hn=et;
}else if(hm.move){hn=cB;
}else if(hm.alias){hn=bW;
}return {source:da+hn+er,position:bN,offset:[2,16,2,6]};
}},"image":{style:function(fU){return {opacity:!fU.replacement&&fU.disabled?0.3:1};
}},"atom":{},"atom/label":fq,"atom/icon":fg,"popup":{style:function(gF){return {decorator:fj,backgroundColor:fd,shadow:cR};
}},"button-frame":{alias:fl,style:function(gA){var gC,gB;

if(gA.checked&&gA.focused&&!gA.inner){gC=fB;
gB=undefined;
}else if(gA.disabled){gC=eY;
gB=undefined;
}else if(gA.pressed){gC=dm;
gB=eN;
}else if(gA.checked){gC=co;
gB=undefined;
}else if(gA.hovered){gC=dh;
gB=eN;
}else if(gA.preselected&&gA.focused&&!gA.inner){gC=eU;
gB=eN;
}else if(gA.preselected){gC=fA;
gB=eN;
}else if(gA.focused&&!gA.inner){gC=fH;
gB=undefined;
}else{gC=fi;
gB=undefined;
}return {decorator:gC,textColor:gB,shadow:gA.invalid&&!gA.disabled?dX:undefined};
}},"button-frame/image":{style:function(O){return {opacity:!O.replacement&&O.disabled?0.5:1};
}},"button":{alias:fm,include:fm,style:function(G){return {padding:[2,8],center:true};
}},"hover-button":{alias:fl,include:fl,style:function(hT){return {decorator:hT.hovered?dM:undefined,textColor:hT.hovered?fh:undefined};
}},"splitbutton":{},"splitbutton/button":fi,"splitbutton/arrow":{alias:fi,include:fi,style:function(ba){return {icon:dO,padding:2,marginLeft:1};
}},"checkbox":{alias:fl,style:function(hd){var hf;

if(hd.checked&&hd.focused){hf=eG;
}else if(hd.checked&&hd.disabled){hf=ce;
}else if(hd.checked&&hd.pressed){hf=dF;
}else if(hd.checked&&hd.hovered){hf=bC;
}else if(hd.checked){hf=dW;
}else if(hd.focused){hf=el;
}else if(hd.pressed){hf=fa;
}else if(hd.hovered){hf=dY;
}else{hf=bO;
}var he=hd.invalid&&!hd.disabled?cm:cr;
return {icon:cs+hf+he+fP,gap:6};
}},"radiobutton":{alias:fl,style:function(hj){var hl;

if(hj.checked&&hj.focused){hl=cA;
}else if(hj.checked&&hj.disabled){hl=cc;
}else if(hj.checked&&hj.pressed){hl=ep;
}else if(hj.checked&&hj.hovered){hl=eo;
}else if(hj.checked){hl=eF;
}else if(hj.focused){hl=en;
}else if(hj.pressed){hl=ev;
}else if(hj.hovered){hl=ck;
}else{hl=eJ;
}var hk=hj.invalid&&!hj.disabled?cm:cr;
return {icon:cs+hl+hk+fP,gap:6};
}},"textfield":{style:function(hp){var hu;
var hs=!!hp.focused;
var ht=!!hp.invalid;
var hq=!!hp.disabled;

if(hs&&ht&&!hq){hu=dH;
}else if(hs&&!ht&&!hq){hu=fr;
}else if(hq){hu=dJ;
}else if(!hs&&ht&&!hq){hu=dL;
}else{hu=dK;
}var hr;

if(hp.disabled){hr=dQ;
}else if(hp.showingPlaceholder){hr=cF;
}else{hr=fM;
}return {decorator:hu,padding:[2,4,1],textColor:hr};
}},"textarea":{include:eO,style:function(n){return {padding:4};
}},"spinner":{style:function(gW){var hb;
var gY=!!gW.focused;
var ha=!!gW.invalid;
var gX=!!gW.disabled;

if(gY&&ha&&!gX){hb=dH;
}else if(gY&&!ha&&!gX){hb=fr;
}else if(gX){hb=dJ;
}else if(!gY&&ha&&!gX){hb=dL;
}else{hb=dK;
}return {decorator:hb};
}},"spinner/textfield":{style:function(by){return {marginRight:2,padding:[2,4,1],textColor:by.disabled?dQ:fM};
}},"spinner/upbutton":{alias:fm,include:fm,style:function(bB){return {icon:ek,padding:bB.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"spinner/downbutton":{alias:fm,include:fm,style:function(go){return {icon:cM,padding:go.pressed?[2,2,0,4]:[1,3,1,3],shadow:undefined};
}},"datefield":bM,"datefield/button":{alias:bT,include:bT,style:function(bi){return {icon:eD,padding:[0,3],decorator:undefined};
}},"datefield/textfield":eV,"datefield/list":{alias:cN,include:cN,style:function(ge){return {decorator:undefined};
}},"groupbox":{style:function(k){return {legendPosition:ef};
}},"groupbox/legend":{alias:fl,style:function(bn){return {padding:[1,0,1,4],textColor:bn.invalid?eI:bP,font:ff};
}},"groupbox/frame":{style:function(hS){return {padding:12,decorator:eA};
}},"check-groupbox":dP,"check-groupbox/legend":{alias:bO,include:bO,style:function(t){return {padding:[1,0,1,4],textColor:t.invalid?eI:bP,font:ff};
}},"radio-groupbox":dP,"radio-groupbox/legend":{alias:eJ,include:eJ,style:function(gl){return {padding:[1,0,1,4],textColor:gl.invalid?eI:bP,font:ff};
}},"scrollarea":{style:function(d){return {minWidth:50,minHeight:50};
}},"scrollarea/corner":{style:function(l){return {backgroundColor:eQ};
}},"scrollarea/pane":fk,"scrollarea/scrollbar-x":eL,"scrollarea/scrollbar-y":eL,"scrollbar":{style:function(b){if(b[dq]){return {};
}return {width:b.horizontal?undefined:16,height:b.horizontal?16:undefined,decorator:b.horizontal?cv:fE,padding:1};
}},"scrollbar/slider":{alias:cE,style:function(gy){return {padding:gy.horizontal?[0,1,0,1]:[1,0,1,0]};
}},"scrollbar/slider/knob":{include:fm,style:function(gM){var gN=gM.horizontal?fJ:bY;

if(gM.disabled){gN+=ci;
}return {decorator:gN,minHeight:gM.horizontal?undefined:9,minWidth:gM.horizontal?9:undefined};
}},"scrollbar/button":{alias:fm,include:fm,style:function(fV){var fW=di;

if(fV.left){fW+=dv;
}else if(fV.right){fW+=cw;
}else if(fV.up){fW+=fC;
}else{fW+=dA;
}
if(fV.left||fV.right){return {padding:[0,0,0,fV.left?3:4],icon:fW,width:15,height:14};
}else{return {padding:[0,0,0,2],icon:fW,width:14,height:15};
}}},"scrollbar/button-begin":bR,"scrollbar/button-end":bR,"slider":{style:function(gs){var gw;
var gu=!!gs.focused;
var gv=!!gs.invalid;
var gt=!!gs.disabled;

if(gu&&gv&&!gt){gw=dH;
}else if(gu&&!gv&&!gt){gw=fr;
}else if(gt){gw=dJ;
}else if(!gu&&gv&&!gt){gw=dL;
}else{gw=dK;
}return {decorator:gw};
}},"slider/knob":{include:fm,style:function(gh){return {decorator:gh.disabled?dk:fJ,shadow:undefined,height:14,width:14};
}},"list":{alias:fD,style:function(J){var N;
var L=!!J.focused;
var M=!!J.invalid;
var K=!!J.disabled;

if(L&&M&&!K){N=dH;
}else if(L&&!M&&!K){N=fr;
}else if(K){N=dJ;
}else if(!L&&M&&!K){N=dL;
}else{N=dK;
}return {backgroundColor:fd,decorator:N};
}},"list/pane":fk,"listitem":{alias:fl,style:function(ia){var ib;

if(ia.dragover){ib=ia.selected?fc:eS;
}else{ib=ia.selected?dM:undefined;
}return {padding:ia.dragover?[4,4,2,4]:4,textColor:ia.selected?fh:undefined,decorator:ib};
}},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:fm,include:fm,style:function(gE){return {padding:5,center:true,icon:gE.vertical?dO:eR};
}},"slidebar/button-backward":{alias:fm,include:fm,style:function(hC){return {padding:5,center:true,icon:hC.vertical?cp:fI};
}},"tabview":{style:function(hv){return {contentPadding:16};
}},"tabview/bar":{alias:db,style:function(i){var j={marginBottom:i.barTop?-1:0,marginTop:i.barBottom?-4:0,marginLeft:i.barRight?-3:0,marginRight:i.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};

if(i.barTop||i.barBottom){j.paddingLeft=5;
j.paddingRight=7;
}else{j.paddingTop=5;
j.paddingBottom=7;
}return j;
}},"tabview/bar/button-forward":{include:fL,alias:fL,style:function(ie){if(ie.barTop||ie.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/button-backward":{include:cS,alias:cS,style:function(gQ){if(gQ.barTop||gQ.barBottom){return {marginTop:2,marginBottom:2};
}else{return {marginLeft:2,marginRight:2};
}}},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(gI){return {decorator:cg,minHeight:100,marginBottom:gI.barBottom?-1:0,marginTop:gI.barTop?-1:0,marginLeft:gI.barLeft?-1:0,marginRight:gI.barRight?-1:0};
}},"tabview-page":fk,"tabview-page/button":{alias:fl,style:function(hH){var hN,hJ=0;
var hM=0,hI=0,hK=0,hL=0;

if(hH.checked){if(hH.barTop){hN=dB;
hJ=[6,14];
hK=hH.firstTab?0:-5;
hL=hH.lastTab?0:-5;
}else if(hH.barBottom){hN=cU;
hJ=[6,14];
hK=hH.firstTab?0:-5;
hL=hH.lastTab?0:-5;
}else if(hH.barRight){hN=ex;
hJ=[6,13];
hM=hH.firstTab?0:-5;
hI=hH.lastTab?0:-5;
}else{hN=dx;
hJ=[6,13];
hM=hH.firstTab?0:-5;
hI=hH.lastTab?0:-5;
}}else{if(hH.barTop){hN=eb;
hJ=[4,10];
hM=4;
hK=hH.firstTab?5:1;
hL=1;
}else if(hH.barBottom){hN=cH;
hJ=[4,10];
hI=4;
hK=hH.firstTab?5:1;
hL=1;
}else if(hH.barRight){hN=eB;
hJ=[4,10];
hL=5;
hM=hH.firstTab?5:1;
hI=1;
hK=1;
}else{hN=ea;
hJ=[4,10];
hK=5;
hM=hH.firstTab?5:1;
hI=1;
hL=1;
}}return {zIndex:hH.checked?10:5,decorator:hN,padding:hJ,marginTop:hM,marginBottom:hI,marginLeft:hK,marginRight:hL,textColor:hH.checked?bK:cC};
}},"tabview-page/button/label":{alias:fq,style:function(ga){return {padding:[0,1,0,1],margin:ga.focused?0:1,decorator:ga.focused?cj:undefined};
}},"tabview-page/button/close-button":{alias:fl,style:function(hY){return {icon:eW};
}},"toolbar":{style:function(r){return {decorator:ca,spacing:2};
}},"toolbar/part":{style:function(gH){return {decorator:dy,spacing:2};
}},"toolbar/part/container":{style:function(hU){return {paddingLeft:2,paddingRight:2};
}},"toolbar/part/handle":{style:function(bm){return {source:fG,marginLeft:3,marginRight:3};
}},"toolbar-button":{alias:fl,style:function(gn){return {marginTop:2,marginBottom:2,padding:(gn.pressed||gn.checked||gn.hovered)&&!gn.disabled||(gn.disabled&&gn.checked)?3:5,decorator:gn.pressed||(gn.checked&&!gn.hovered)||(gn.checked&&gn.disabled)?eg:gn.hovered&&!gn.disabled?bJ:undefined};
}},"toolbar-menubutton":{alias:ft,include:ft,style:function(gf){return {showArrow:true};
}},"toolbar-menubutton/arrow":{alias:fg,include:fg,style:function(bl){return {source:cM};
}},"toolbar-splitbutton":{style:function(fX){return {marginTop:2,marginBottom:2};
}},"toolbar-splitbutton/button":{alias:ft,include:ft,style:function(hQ){return {icon:dO,marginTop:undefined,marginBottom:undefined};
}},"toolbar-splitbutton/arrow":{alias:ft,include:ft,style:function(bf){return {padding:bf.pressed||bf.checked?1:bf.hovered?1:3,icon:dO,marginTop:undefined,marginBottom:undefined};
}},"toolbar-separator":{style:function(hA){return {decorator:ee,margin:7};
}},"tree":fn,"tree-item":{style:function(gq){return {padding:[2,6],textColor:gq.selected?fh:undefined,decorator:gq.selected?dM:undefined};
}},"tree-item/icon":{include:fg,style:function(gU){return {paddingRight:5};
}},"tree-item/label":fq,"tree-item/open":{include:fg,style:function(X){var Y;

if(X.selected&&X.opened){Y=eE;
}else if(X.selected&&!X.opened){Y=fy;
}else if(X.opened){Y=cO;
}else{Y=fK;
}return {padding:[0,5,0,2],source:Y};
}},"tree-folder":{include:fv,alias:fv,style:function(gj){var gk;

if(gj.small){gk=gj.opened?cl:bU;
}else if(gj.large){gk=gj.opened?dC:cI;
}else{gk=gj.opened?eq:dD;
}return {icon:gk};
}},"tree-file":{include:fv,alias:fv,style:function(bq){return {icon:bq.small?cK:bq.large?cb:fz};
}},"treevirtual":cq,"treevirtual-folder":{style:function(z){return {icon:z.opened?cl:bU};
}},"treevirtual-file":{include:cQ,alias:cQ,style:function(gP){return {icon:cK};
}},"treevirtual-line":{style:function(ic){return {icon:bQ};
}},"treevirtual-contract":{style:function(gK){return {icon:cO,paddingLeft:5,paddingTop:2};
}},"treevirtual-expand":{style:function(q){return {icon:fK,paddingLeft:5,paddingTop:2};
}},"treevirtual-only-contract":fw,"treevirtual-only-expand":eP,"treevirtual-start-contract":fw,"treevirtual-start-expand":eP,"treevirtual-end-contract":fw,"treevirtual-end-expand":eP,"treevirtual-cross-contract":fw,"treevirtual-cross-expand":eP,"treevirtual-end":{style:function(gD){return {icon:bQ};
}},"treevirtual-cross":{style:function(o){return {icon:bQ};
}},"tooltip":{include:fs,style:function(gT){return {backgroundColor:dj,padding:[1,3,2,3],offset:[15,5,5,5]};
}},"tooltip/atom":fl,"tooltip-error":{include:fp,style:function(W){return {textColor:fh,placeMethod:fk,offset:[0,0,0,14],marginTop:-2,position:bN,showTimeout:100,hideTimeout:10000,decorator:cG,shadow:dc,font:ff};
}},"tooltip-error/atom":fl,"window":{style:function(gG){return {shadow:cy,contentPadding:[10,10,10,10]};
}},"window/pane":{style:function(hy){return {decorator:dR};
}},"window/captionbar":{style:function(hV){return {decorator:hV.active?bD:eu,textColor:hV.active?fo:cu,minHeight:26,paddingRight:2};
}},"window/icon":{style:function(hD){return {margin:[5,0,3,6]};
}},"window/title":{style:function(hB){return {alignY:fe,font:ff,marginLeft:6,marginRight:12};
}},"window/minimize-button":{alias:fl,style:function(R){return {icon:R.active?R.hovered?dV:ey:eC,margin:[4,8,2,0]};
}},"window/restore-button":{alias:fl,style:function(F){return {icon:F.active?F.hovered?cz:bX:ez,margin:[5,8,2,0]};
}},"window/maximize-button":{alias:fl,style:function(br){return {icon:br.active?br.hovered?cn:dE:eT,margin:[4,8,2,0]};
}},"window/close-button":{alias:fl,style:function(bj){return {icon:bj.active?bj.hovered?eX:dp:dG,margin:[4,8,2,0]};
}},"window/statusbar":{style:function(bd){return {padding:[2,6],decorator:dg,minHeight:18};
}},"window/statusbar-text":{style:function(e){return {font:ct};
}},"iframe":{style:function(T){return {decorator:fj};
}},"resizer":{style:function(bp){return {decorator:dt};
}},"splitpane":{style:function(w){return {decorator:eH};
}},"splitpane/splitter":{style:function(bc){return {width:bc.horizontal?3:undefined,height:bc.vertical?3:undefined,backgroundColor:fQ};
}},"splitpane/splitter/knob":{style:function(s){return {source:s.horizontal?cJ:dS};
}},"splitpane/slider":{style:function(v){return {width:v.horizontal?3:undefined,height:v.vertical?3:undefined,backgroundColor:fQ};
}},"selectbox":{alias:fm,include:fm,style:function(gJ){return {padding:[2,8]};
}},"selectbox/atom":fl,"selectbox/popup":fs,"selectbox/list":{alias:fn},"selectbox/arrow":{include:fg,style:function(gg){return {source:dO,paddingLeft:5};
}},"datechooser":{style:function(A){var E;
var C=!!A.focused;
var D=!!A.invalid;
var B=!!A.disabled;

if(C&&D&&!B){E=dH;
}else if(C&&!D&&!B){E=fr;
}else if(B){E=dJ;
}else if(!C&&D&&!B){E=dL;
}else{E=dK;
}return {padding:2,decorator:E,backgroundColor:fd};
}},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:fm,alias:fm,style:function(hh){var hi={padding:[2,4],shadow:undefined};

if(hh.lastYear){hi.icon=ch;
hi.marginRight=1;
}else if(hh.lastMonth){hi.icon=fI;
}else if(hh.nextYear){hi.icon=bF;
hi.marginLeft=1;
}else if(hh.nextMonth){hi.icon=eR;
}return hi;
}},"datechooser/last-year-button-tooltip":fp,"datechooser/last-month-button-tooltip":fp,"datechooser/next-year-button-tooltip":fp,"datechooser/next-month-button-tooltip":fp,"datechooser/last-year-button":eK,"datechooser/last-month-button":eK,"datechooser/next-month-button":eK,"datechooser/next-year-button":eK,"datechooser/month-year-label":{style:function(a){return {font:ff,textAlign:eM,textColor:a.disabled?dQ:undefined};
}},"datechooser/date-pane":{style:function(fS){return {textColor:fS.disabled?dQ:undefined,marginTop:2};
}},"datechooser/weekday":{style:function(x){return {textColor:x.disabled?dQ:x.weekend?fO:undefined,textAlign:eM,paddingTop:2,backgroundColor:cL};
}},"datechooser/week":{style:function(ho){return {textAlign:eM,padding:[2,4],backgroundColor:cL};
}},"datechooser/day":{style:function(gz){return {textAlign:eM,decorator:gz.disabled?undefined:gz.selected?dM:undefined,textColor:gz.disabled?dQ:gz.selected?fh:gz.otherMonth?fO:undefined,font:gz.today?ff:undefined,padding:[2,4]};
}},"combobox":{style:function(bs){var bw;
var bu=!!bs.focused;
var bv=!!bs.invalid;
var bt=!!bs.disabled;

if(bu&&bv&&!bt){bw=dH;
}else if(bu&&!bv&&!bt){bw=fr;
}else if(bt){bw=dJ;
}else if(!bu&&bv&&!bt){bw=dL;
}else{bw=dK;
}return {decorator:bw};
}},"combobox/popup":fs,"combobox/list":{alias:fn},"combobox/button":{include:fm,alias:fm,style:function(bz){var bA={icon:dO,padding:2};

if(bz.selected){bA.decorator=fH;
}return bA;
}},"combobox/textfield":{include:eO,style:function(bg){return {decorator:undefined};
}},"menu":{style:function(hE){var hF={decorator:de,shadow:cR,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:hE.submenu||hE.contextmenu?fx:dz};

if(hE.submenu){hF.position=bN;
hF.offset=[-2,-3];
}return hF;
}},"menu/slidebar":eh,"menu-slidebar":fk,"menu-slidebar-button":{style:function(hx){return {decorator:hx.hovered?dM:undefined,padding:7,center:true};
}},"menu-slidebar/button-backward":{include:fN,style:function(id){return {icon:id.hovered?ei:cp};
}},"menu-slidebar/button-forward":{include:fN,style:function(P){return {icon:P.hovered?em:dO};
}},"menu-separator":{style:function(gO){return {height:0,decorator:ds,margin:[4,2]};
}},"menu-button":{alias:fl,style:function(f){return {decorator:f.selected?dM:undefined,textColor:f.selected?fh:undefined,padding:[4,6]};
}},"menu-button/icon":{include:fg,style:function(gS){return {alignY:fe};
}},"menu-button/label":{include:fq,style:function(U){return {alignY:fe,padding:1};
}},"menu-button/shortcut":{include:fq,style:function(bk){return {alignY:fe,marginLeft:14,padding:1};
}},"menu-button/arrow":{include:fg,style:function(gp){return {source:gp.selected?du:eR,alignY:fe};
}},"menu-checkbox":{alias:dI,include:dI,style:function(hw){return {icon:!hw.checked?undefined:hw.selected?fF:cf};
}},"menu-radiobutton":{alias:dI,include:dI,style:function(hP){return {icon:!hP.checked?undefined:hP.selected?dU:bG};
}},"menubar":{style:function(gc){return {decorator:ed};
}},"menubar-button":{alias:fl,style:function(V){return {decorator:V.pressed||V.hovered?dM:undefined,textColor:V.pressed||V.hovered?fh:undefined,padding:[3,8]};
}},"colorselector":fk,"colorselector/control-bar":fk,"colorselector/control-pane":fk,"colorselector/visual-pane":dP,"colorselector/preset-grid":fk,"colorselector/colorbucket":{style:function(bh){return {decorator:fj,width:16,height:16};
}},"colorselector/preset-field-set":dP,"colorselector/input-field-set":dP,"colorselector/preview-field-set":dP,"colorselector/hex-field-composite":fk,"colorselector/hex-field":eO,"colorselector/rgb-spinner-composite":fk,"colorselector/rgb-spinner-red":fu,"colorselector/rgb-spinner-green":fu,"colorselector/rgb-spinner-blue":fu,"colorselector/hsb-spinner-composite":fk,"colorselector/hsb-spinner-hue":fu,"colorselector/hsb-spinner-saturation":fu,"colorselector/hsb-spinner-brightness":fu,"colorselector/preview-content-old":{style:function(H){return {decorator:fj,width:50,height:10};
}},"colorselector/preview-content-new":{style:function(gR){return {decorator:fj,backgroundColor:fd,width:50,height:10};
}},"colorselector/hue-saturation-field":{style:function(gx){return {decorator:fj,margin:5};
}},"colorselector/brightness-field":{style:function(S){return {decorator:fj,margin:[5,7]};
}},"colorselector/hue-saturation-pane":fk,"colorselector/hue-saturation-handle":fk,"colorselector/brightness-pane":fk,"colorselector/brightness-handle":fk,"colorpopup":{alias:fs,include:fs,style:function(g){return {padding:5,backgroundColor:eQ};
}},"colorpopup/field":{style:function(gb){return {decorator:fj,margin:2,width:14,height:14,backgroundColor:fd};
}},"colorpopup/selector-button":fi,"colorpopup/auto-button":fi,"colorpopup/preview-pane":dP,"colorpopup/current-preview":{style:function(u){return {height:20,padding:4,marginLeft:4,decorator:fj,allowGrowX:true};
}},"colorpopup/selected-preview":{style:function(fR){return {height:20,padding:4,marginRight:4,decorator:fj,allowGrowX:true};
}},"colorpopup/colorselector-okbutton":{alias:fi,include:fi,style:function(Q){return {icon:es};
}},"colorpopup/colorselector-cancelbutton":{alias:fi,include:fi,style:function(gi){return {icon:ec};
}},"table":{alias:fk,style:function(gm){return {decorator:cq};
}},"table-header":{},"table/statusbar":{style:function(p){return {decorator:ew,padding:[0,2]};
}},"table/column-button":{alias:fm,style:function(gd){return {decorator:cx,padding:3,icon:bH};
}},"table-column-reset-button":{include:dI,alias:dI,style:function(){return {icon:dw};
}},"table-scroller":fk,"table-scroller/scrollbar-x":eL,"table-scroller/scrollbar-y":eL,"table-scroller/header":{style:function(bo){return {decorator:dl};
}},"table-scroller/pane":{style:function(fY){return {backgroundColor:dn};
}},"table-scroller/focus-indicator":{style:function(hc){return {decorator:dd};
}},"table-scroller/resize-line":{style:function(y){return {backgroundColor:fb,width:2};
}},"table-header-cell":{alias:fl,style:function(gV){return {minWidth:13,minHeight:20,padding:gV.hovered?[3,4,2,4]:[3,4],decorator:gV.hovered?dT:cY,sortIcon:gV.sorted?(gV.sortedAscending?ej:bE):undefined};
}},"table-header-cell/label":{style:function(gr){return {minWidth:0,alignY:fe,paddingRight:5};
}},"table-header-cell/sort-icon":{style:function(bx){return {alignY:fe,alignX:bS};
}},"table-header-cell/icon":{style:function(m){return {minWidth:0,alignY:fe,paddingRight:5};
}},"table-editor-textfield":{include:eO,style:function(bb){return {decorator:undefined,padding:[2,2],backgroundColor:fd};
}},"table-editor-selectbox":{include:cT,alias:cT,style:function(h){return {padding:[0,2],backgroundColor:fd};
}},"table-editor-combobox":{include:bM,alias:bM,style:function(hz){return {decorator:undefined,backgroundColor:fd};
}},"progressive-table-header":{alias:fk,style:function(hR){return {decorator:bI};
}},"progressive-table-header-cell":{alias:fl,style:function(be){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:dr};
}},"app-header":{style:function(gL){return {font:ff,textColor:fh,padding:[8,12],decorator:df};
}},"virtual-list":fn,"virtual-list/row-layer":cD,"row-layer":{style:function(hG){return {colorEven:fo,colorOdd:fo};
}},"column-layer":fk,"cell":{style:function(hg){return {textColor:hg.selected?fh:bV,padding:[3,6],font:cP};
}},"cell-string":dN,"cell-number":{include:dN,style:function(hX){return {textAlign:bS};
}},"cell-image":dN,"cell-boolean":{include:dN,style:function(c){return {iconTrue:cX,iconFalse:cd};
}},"cell-atom":dN,"cell-date":dN,"cell-html":dN,"htmlarea":{"include":fk,style:function(hO){return {backgroundColor:fo};
}}}});
})();
(function(){var h="textfield",g="table",f="window",e="toolbar",d="toolbar-button",c="bold",b="inspector.theme.Appearance",a="green";
qx.Theme.define(b,{extend:qx.theme.modern.Appearance,appearances:{"toolbar-button-bold":{alias:d,include:d,style:function(j){return {textColor:a,font:c};
}},"objectsWindow":{alias:f,include:f,style:function(k){return {contentPadding:[0,0,0,0],showMinimize:false,showMaximize:false,width:300,height:200};
}},"objects2-toolbar":{alias:e,include:e,style:function(i){return {paddingLeft:3,paddingRight:3};
}},"objects2-textfield":{alias:h,include:h,style:function(m){return {marginRight:5};
}},"objects2-table":{alias:g,include:g,style:function(l){return {decorator:null};
}}}});
})();
(function(){var a="inspector.theme.Theme";
qx.Theme.define(a,{meta:{color:inspector.theme.Color,decoration:inspector.theme.Decoration,font:inspector.theme.Font,icon:qx.theme.icon.Tango,appearance:inspector.theme.Appearance}});
})();
(function(){var f="qx.event.type.Event";
qx.Class.define(f,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(j,k){{};
this._type=null;
this._target=null;
this._currentTarget=null;
this._relatedTarget=null;
this._originalTarget=null;
this._stopPropagation=false;
this._preventDefault=false;
this._bubbles=!!j;
this._cancelable=!!k;
this._timeStamp=(new Date()).getTime();
this._eventPhase=null;
return this;
},clone:function(b){if(b){var c=b;
}else{var c=qx.event.Pool.getInstance().getObject(this.constructor);
}c._type=this._type;
c._target=this._target;
c._currentTarget=this._currentTarget;
c._relatedTarget=this._relatedTarget;
c._originalTarget=this._originalTarget;
c._stopPropagation=this._stopPropagation;
c._bubbles=this._bubbles;
c._preventDefault=this._preventDefault;
c._cancelable=this._cancelable;
return c;
},stop:function(){if(this._bubbles){this.stopPropagation();
}
if(this._cancelable){this.preventDefault();
}},stopPropagation:function(){{};
this._stopPropagation=true;
},getPropagationStopped:function(){return !!this._stopPropagation;
},preventDefault:function(){{};
this._preventDefault=true;
},getDefaultPrevented:function(){return !!this._preventDefault;
},getType:function(){return this._type;
},setType:function(g){this._type=g;
},getEventPhase:function(){return this._eventPhase;
},setEventPhase:function(e){this._eventPhase=e;
},getTimeStamp:function(){return this._timeStamp;
},getTarget:function(){return this._target;
},setTarget:function(m){this._target=m;
},getCurrentTarget:function(){return this._currentTarget||this._target;
},setCurrentTarget:function(h){this._currentTarget=h;
},getRelatedTarget:function(){return this._relatedTarget;
},setRelatedTarget:function(a){this._relatedTarget=a;
},getOriginalTarget:function(){return this._originalTarget;
},setOriginalTarget:function(i){this._originalTarget=i;
},getBubbles:function(){return this._bubbles;
},setBubbles:function(l){this._bubbles=l;
},isCancelable:function(){return this._cancelable;
},setCancelable:function(d){this._cancelable=d;
}},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;
}});
})();
(function(){var a="qx.event.type.Data";
qx.Class.define(a,{extend:qx.event.type.Event,members:{__cw:null,__cx:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);
this.__cw=b;
this.__cx=c;
return this;
},clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);
f.__cw=this.__cw;
f.__cx=this.__cx;
return f;
},getData:function(){return this.__cw;
},getOldData:function(){return this.__cx;
}},destruct:function(){this.__cw=this.__cx=null;
}});
})();
(function(){var bu="get",bt="",bs="[",br="last",bq="change",bp="]",bo=".",bn="Number",bm="String",bl="set",bJ="deepBinding",bI="item",bH="reset",bG="' (",bF="Boolean",bE=").",bD=") to the object '",bC="Integer",bB="qx.data.SingleValueBinding",bA="No event could be found for the property",by="PositiveNumber",bz="Binding from '",bw="PositiveInteger",bx="Binding does not exist!",bv="Date";
qx.Class.define(bB,{statics:{DEBUG_ON:false,__cy:{},bind:function(S,T,U,V,W){var bh=this.__cA(S,T,U,V,W);
var bc=T.split(bo);
var Y=this.__cH(bc);
var bg=[];
var bd=[];
var be=[];
var ba=[];
var bb=S;
for(var i=0;i<bc.length;i++){if(Y[i]!==bt){ba.push(bq);
}else{ba.push(this.__cC(bb,bc[i]));
}bg[i]=bb;
if(i==bc.length-1){if(Y[i]!==bt){var bk=Y[i]===br?bb.length-1:Y[i];
var X=bb.getItem(bk);
this.__cG(X,U,V,W,S);
be[i]=this.__cI(bb,ba[i],U,V,W,Y[i]);
}else{if(bc[i]!=null&&bb[bu+qx.lang.String.firstUp(bc[i])]!=null){var X=bb[bu+qx.lang.String.firstUp(bc[i])]();
this.__cG(X,U,V,W,S);
}be[i]=this.__cI(bb,ba[i],U,V,W);
}}else{var bi={index:i,propertyNames:bc,sources:bg,listenerIds:be,arrayIndexValues:Y,targetObject:U,targetPropertyChain:V,options:W,listeners:bd};
var bf=qx.lang.Function.bind(this.__cz,this,bi);
bd.push(bf);
be[i]=bb.addListener(ba[i],bf);
}if(bb[bu+qx.lang.String.firstUp(bc[i])]==null){bb=null;
}else if(Y[i]!==bt){bb=bb[bu+qx.lang.String.firstUp(bc[i])](Y[i]);
}else{bb=bb[bu+qx.lang.String.firstUp(bc[i])]();
}
if(!bb){break;
}}var bj={type:bJ,listenerIds:be,sources:bg,targetListenerIds:bh.listenerIds,targets:bh.targets};
this.__cJ(bj,S,T,U,V);
return bj;
},__cz:function(t){if(t.options&&t.options.onUpdate){t.options.onUpdate(t.sources[t.index],t.targetObject);
}for(var j=t.index+1;j<t.propertyNames.length;j++){var x=t.sources[j];
t.sources[j]=null;

if(!x){continue;
}x.removeListenerById(t.listenerIds[j]);
}var x=t.sources[t.index];
for(var j=t.index+1;j<t.propertyNames.length;j++){if(t.arrayIndexValues[j-1]!==bt){x=x[bu+qx.lang.String.firstUp(t.propertyNames[j-1])](t.arrayIndexValues[j-1]);
}else{x=x[bu+qx.lang.String.firstUp(t.propertyNames[j-1])]();
}t.sources[j]=x;
if(!x){this.__cD(t.targetObject,t.targetPropertyChain);
break;
}if(j==t.propertyNames.length-1){if(qx.Class.implementsInterface(x,qx.data.IListData)){var y=t.arrayIndexValues[j]===br?x.length-1:t.arrayIndexValues[j];
var v=x.getItem(y);
this.__cG(v,t.targetObject,t.targetPropertyChain,t.options,t.sources[t.index]);
t.listenerIds[j]=this.__cI(x,bq,t.targetObject,t.targetPropertyChain,t.options,t.arrayIndexValues[j]);
}else{if(t.propertyNames[j]!=null&&x[bu+qx.lang.String.firstUp(t.propertyNames[j])]!=null){var v=x[bu+qx.lang.String.firstUp(t.propertyNames[j])]();
this.__cG(v,t.targetObject,t.targetPropertyChain,t.options,t.sources[t.index]);
}var w=this.__cC(x,t.propertyNames[j]);
t.listenerIds[j]=this.__cI(x,w,t.targetObject,t.targetPropertyChain,t.options);
}}else{if(t.listeners[j]==null){var u=qx.lang.Function.bind(this.__cz,this,t);
t.listeners.push(u);
}if(qx.Class.implementsInterface(x,qx.data.IListData)){var w=bq;
}else{var w=this.__cC(x,t.propertyNames[j]);
}t.listenerIds[j]=x.addListener(w,t.listeners[j]);
}}},__cA:function(cn,co,cp,cq,cr){var cv=cq.split(bo);
var ct=this.__cH(cv);
var cA=[];
var cz=[];
var cx=[];
var cw=[];
var cu=cp;
for(var i=0;i<cv.length-1;i++){if(ct[i]!==bt){cw.push(bq);
}else{try{cw.push(this.__cC(cu,cv[i]));
}catch(e){break;
}}cA[i]=cu;
var cy=function(){for(var j=i+1;j<cv.length-1;j++){var o=cA[j];
cA[j]=null;

if(!o){continue;
}o.removeListenerById(cx[j]);
}var o=cA[i];
for(var j=i+1;j<cv.length-1;j++){var m=qx.lang.String.firstUp(cv[j-1]);
if(ct[j-1]!==bt){var p=ct[j-1]===br?o.getLength()-1:ct[j-1];
o=o[bu+m](p);
}else{o=o[bu+m]();
}cA[j]=o;
if(cz[j]==null){cz.push(cy);
}if(qx.Class.implementsInterface(o,qx.data.IListData)){var n=bq;
}else{try{var n=qx.data.SingleValueBinding.__cC(o,cv[j]);
}catch(e){break;
}}cx[j]=o.addListener(n,cz[j]);
}qx.data.SingleValueBinding.__cB(cn,co,cp,cq,cr);
};
cz.push(cy);
cx[i]=cu.addListener(cw[i],cy);
var cs=qx.lang.String.firstUp(cv[i]);
if(cu[bu+cs]==null){cu=null;
}else if(ct[i]!==bt){cu=cu[bu+cs](ct[i]);
}else{cu=cu[bu+cs]();
}
if(!cu){break;
}}return {listenerIds:cx,targets:cA};
},__cB:function(cQ,cR,cS,cT,cU){var cY=this.__cF(cQ,cR);

if(cY!=null){var db=cR.substring(cR.lastIndexOf(bo)+1,cR.length);
if(db.charAt(db.length-1)==bp){var cV=db.substring(db.lastIndexOf(bs)+1,db.length-1);
var cX=db.substring(0,db.lastIndexOf(bs));
var da=cY[bu+qx.lang.String.firstUp(cX)]();

if(cV==br){cV=da.length-1;
}
if(da!=null){var cW=da.getItem(cV);
}}else{var cW=cY[bu+qx.lang.String.firstUp(db)]();
}}cW=qx.data.SingleValueBinding.__cK(cW,cS,cT,cU);
this.__cE(cS,cT,cW);
},__cC:function(q,r){var s=this.__cL(q,r);
if(s==null){if(qx.Class.supportsEvent(q.constructor,r)){s=r;
}else if(qx.Class.supportsEvent(q.constructor,bq+qx.lang.String.firstUp(r))){s=bq+qx.lang.String.firstUp(r);
}else{throw new qx.core.AssertionError(bA,r);
}}return s;
},__cD:function(bK,bL){var bM=this.__cF(bK,bL);

if(bM!=null){var bN=bL.substring(bL.lastIndexOf(bo)+1,bL.length);
if(bN.charAt(bN.length-1)==bp){this.__cE(bK,bL,null);
return;
}if(bM[bH+qx.lang.String.firstUp(bN)]!=undefined){bM[bH+qx.lang.String.firstUp(bN)]();
}else{bM[bl+qx.lang.String.firstUp(bN)](null);
}}},__cE:function(cB,cC,cD){var cH=this.__cF(cB,cC);

if(cH!=null){var cI=cC.substring(cC.lastIndexOf(bo)+1,cC.length);
if(cI.charAt(cI.length-1)==bp){var cE=cI.substring(cI.lastIndexOf(bs)+1,cI.length-1);
var cG=cI.substring(0,cI.lastIndexOf(bs));
var cF=cH[bu+qx.lang.String.firstUp(cG)]();

if(cE==br){cE=cF.length-1;
}
if(cF!=null){cF.setItem(cE,cD);
}}else{cH[bl+qx.lang.String.firstUp(cI)](cD);
}}},__cF:function(I,J){var M=J.split(bo);
var N=I;
for(var i=0;i<M.length-1;i++){try{var L=M[i];
if(L.indexOf(bp)==L.length-1){var K=L.substring(L.indexOf(bs)+1,L.length-1);
L=L.substring(0,L.indexOf(bs));
}N=N[bu+qx.lang.String.firstUp(L)]();

if(K!=null){if(K==br){K=N.length-1;
}N=N.getItem(K);
K=null;
}}catch(O){return null;
}}return N;
},__cG:function(cf,cg,ch,ci,cj){cf=this.__cK(cf,cg,ch,ci);
if(cf==null){this.__cD(cg,ch);
}if(cf!=undefined){try{this.__cE(cg,ch,cf);
if(ci&&ci.onUpdate){ci.onUpdate(cj,cg,cf);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(ci&&ci.onSetFail){ci.onSetFail(e);
}else{this.warn("Failed so set value "+cf+" on "+cg+". Error message: "+e);
}}}},__cH:function(cL){var cM=[];
for(var i=0;i<cL.length;i++){var name=cL[i];
if(qx.lang.String.endsWith(name,bp)){var cN=name.substring(name.indexOf(bs)+1,name.indexOf(bp));
if(name.indexOf(bp)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");
}
if(cN!==br){if(cN==bt||isNaN(parseInt(cN))){throw new Error("No number or 'last' value hast been given"+" in a array binding: "+name+" does not work.");
}}if(name.indexOf(bs)!=0){cL[i]=name.substring(0,name.indexOf(bs));
cM[i]=bt;
cM[i+1]=cN;
cL.splice(i+1,0,bI);
i++;
}else{cM[i]=cN;
cL.splice(i,1,bI);
}}else{cM[i]=bt;
}}return cM;
},__cI:function(z,A,B,C,D,E){var F;
{};
var H=function(cb,e){if(cb!==bt){if(cb===br){cb=z.length-1;
}var ce=z.getItem(cb);
if(ce==undefined){qx.data.SingleValueBinding.__cD(B,C);
}var cc=e.getData().start;
var cd=e.getData().end;

if(cb<cc||cb>cd){return;
}}else{var ce=e.getData();
}if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Binding executed from "+z+" by "+A+" to "+B+" ("+C+")");
qx.log.Logger.debug("Data before conversion: "+ce);
}ce=qx.data.SingleValueBinding.__cK(ce,B,C,D);
if(qx.data.SingleValueBinding.DEBUG_ON){qx.log.Logger.debug("Data after conversion: "+ce);
}try{if(ce!=undefined){qx.data.SingleValueBinding.__cE(B,C,ce);
}else{qx.data.SingleValueBinding.__cD(B,C);
}if(D&&D.onUpdate){D.onUpdate(z,B,ce);
}}catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;
}
if(D&&D.onSetFail){D.onSetFail(e);
}else{this.warn("Failed so set value "+ce+" on "+B+". Error message: "+e);
}}};
if(!E){E=bt;
}H=qx.lang.Function.bind(H,z,E);
var G=z.addListener(A,H);
return G;
},__cJ:function(bV,bW,bX,bY,ca){if(this.__cy[bW.toHashCode()]===undefined){this.__cy[bW.toHashCode()]=[];
}this.__cy[bW.toHashCode()].push([bV,bW,bX,bY,ca]);
},__cK:function(a,b,c,d){if(d&&d.converter){var g;

if(b.getModel){g=b.getModel();
}return d.converter(a,g);
}else{var k=this.__cF(b,c);
var l=c.substring(c.lastIndexOf(bo)+1,c.length);
if(k==null){return a;
}var h=qx.Class.getPropertyDefinition(k.constructor,l);
var f=h==null?bt:h.check;
return this.__cM(a,f);
}},__cL:function(dc,dd){var de=qx.Class.getPropertyDefinition(dc.constructor,dd);

if(de==null){return null;
}return de.event;
},__cM:function(bO,bP){var bQ=qx.lang.Type.getClass(bO);
if((bQ==bn||bQ==bm)&&(bP==bC||bP==bw)){bO=parseInt(bO);
}if((bQ==bF||bQ==bn||bQ==bv)&&bP==bm){bO=bO+bt;
}if((bQ==bn||bQ==bm)&&(bP==bn||bP==by)){bO=parseFloat(bO);
}return bO;
},removeBindingFromObject:function(P,Q){if(Q.type==bJ){for(var i=0;i<Q.sources.length;i++){if(Q.sources[i]){Q.sources[i].removeListenerById(Q.listenerIds[i]);
}}for(var i=0;i<Q.targets.length;i++){if(Q.targets[i]){Q.targets[i].removeListenerById(Q.targetListenerIds[i]);
}}}else{P.removeListenerById(Q);
}var R=this.__cy[P.toHashCode()];
if(R!=undefined){for(var i=0;i<R.length;i++){if(R[i][0]==Q){qx.lang.Array.remove(R,R[i]);
return;
}}}throw new Error("Binding could not be found!");
},removeAllBindingsForObject:function(cO){{};
var cP=this.__cy[cO.toHashCode()];

if(cP!=undefined){for(var i=cP.length-1;i>=0;i--){this.removeBindingFromObject(cO,cP[i][0]);
}}},getAllBindingsForObject:function(cm){if(this.__cy[cm.toHashCode()]===undefined){this.__cy[cm.toHashCode()]=[];
}return this.__cy[cm.toHashCode()];
},removeAllBindings:function(){for(var cl in this.__cy){var ck=qx.core.ObjectRegistry.fromHashCode(cl);
if(ck==null){delete this.__cy[cl];
continue;
}this.removeAllBindingsForObject(ck);
}this.__cy={};
},getAllBindings:function(){return this.__cy;
},showBindingInLog:function(bR,bS){var bU;
for(var i=0;i<this.__cy[bR.toHashCode()].length;i++){if(this.__cy[bR.toHashCode()][i][0]==bS){bU=this.__cy[bR.toHashCode()][i];
break;
}}
if(bU===undefined){var bT=bx;
}else{var bT=bz+bU[1]+bG+bU[2]+bD+bU[3]+bG+bU[4]+bE;
}qx.log.Logger.debug(bT);
},showAllBindingsInLog:function(){for(var cK in this.__cy){var cJ=qx.core.ObjectRegistry.fromHashCode(cK);

for(var i=0;i<this.__cy[cK].length;i++){this.showBindingInLog(cJ,this.__cy[cK][i][0]);
}}}}});
})();
(function(){var l="",k="g",j="0",h='\\$1',g="%",f='-',e="qx.lang.String",d=' ',c='\n',b="undefined";
qx.Class.define(e,{statics:{camelCase:function(M){return M.replace(/\-([a-z])/g,function(D,E){return E.toUpperCase();
});
},hyphenate:function(o){return o.replace(/[A-Z]/g,function(m){return (f+m.charAt(0).toLowerCase());
});
},capitalize:function(r){return r.replace(/\b[a-z]/g,function(z){return z.toUpperCase();
});
},clean:function(n){return this.trim(n.replace(/\s+/g,d));
},trimLeft:function(K){return K.replace(/^\s+/,l);
},trimRight:function(C){return C.replace(/\s+$/,l);
},trim:function(y){return y.replace(/^\s+|\s+$/g,l);
},startsWith:function(I,J){return I.indexOf(J)===0;
},endsWith:function(A,B){return A.substring(A.length-B.length,A.length)===B;
},repeat:function(p,q){return p.length>0?new Array(q+1).join(p):l;
},pad:function(F,length,G){var H=length-F.length;

if(H>0){if(typeof G===b){G=j;
}return this.repeat(G,H)+F;
}else{return F;
}},firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(w,x){return w.indexOf(x)!=-1;
},format:function(N,O){var P=N;

for(var i=0;i<O.length;i++){P=P.replace(new RegExp(g+(i+1),k),O[i]+l);
}return P;
},escapeRegexpChars:function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,h);
},toArray:function(L){return L.split(/\B|\b/g);
},stripTags:function(Q){return Q.replace(/<\/?[^>]+>/gi,l);
},stripScripts:function(s,t){var v=l;
var u=s.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){v+=arguments[1]+c;
return l;
});

if(t===true){qx.lang.Function.globalEval(v);
}return u;
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";
qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(f){},setItem:function(d,e){},splice:function(h,i,j){},contains:function(g){},getLength:function(){},toArray:function(){}}});
})();
(function(){var a="qx.lang.Date";
qx.Class.define(a,{statics:{now:function(){return +new Date;
}}});
})();
(function(){var g="qx.globalErrorHandling",f="on",d="qx.event.GlobalError";
qx.Bootstrap.define(d,{statics:{setErrorHandler:function(l,m){this.__bX=l||null;
this.__bY=m||window;

if(qx.core.Setting.get(g)===f){if(l&&window.onerror){var n=qx.Bootstrap.bind(this.__cb,this);

if(this.__ca==null){this.__ca=window.onerror;
}var self=this;
window.onerror=function(e){self.__ca(e);
n(e);
};
}
if(l&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__cb,this);
}if(this.__bX==null){if(this.__ca!=null){window.onerror=this.__ca;
this.__ca=null;
}else{window.onerror=null;
}}}},__cb:function(a,b,c){if(this.__bX){this.handleError(new qx.core.WindowError(a,b,c));
return true;
}},observeMethod:function(h){if(qx.core.Setting.get(g)===f){var self=this;
return function(){if(!self.__bX){return h.apply(this,arguments);
}
try{return h.apply(this,arguments);
}catch(j){self.handleError(new qx.core.GlobalError(j,arguments));
}};
}else{return h;
}},handleError:function(k){if(this.__bX){this.__bX.call(this.__bY,k);
}}},defer:function(i){qx.core.Setting.define(g,f);
i.setErrorHandler(null,null);
}});
})();
(function(){var b="",a="qx.core.WindowError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){Error.call(this,c);
this.__cN=c;
this.__cO=d||b;
this.__cP=e===undefined?-1:e;
},members:{__cN:null,__cO:null,__cP:null,toString:function(){return this.__cN;
},getUri:function(){return this.__cO;
},getLineNumber:function(){return this.__cP;
}}});
})();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";
qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){{};
this.__cQ=b+(c&&c.message?c.message:c);
Error.call(this,this.__cQ);
this.__cR=d;
this.__cS=c;
},members:{__cS:null,__cR:null,__cQ:null,toString:function(){return this.__cQ;
},getArguments:function(){return this.__cR;
},getSourceException:function(){return this.__cS;
}},destruct:function(){this.__cS=null;
this.__cR=null;
this.__cQ=null;
}});
})();
(function(){var c=": ",b="qx.type.BaseError",a="";
qx.Class.define(b,{extend:Error,construct:function(d,e){Error.call(this,e);
this.__cT=d||a;
this.message=e||qx.type.BaseError.DEFAULTMESSAGE;
},statics:{DEFAULTMESSAGE:"error"},members:{__cT:null,message:null,getComment:function(){return this.__cT;
},toString:function(){return this.__cT+c+this.message;
}}});
})();
(function(){var a="qx.core.AssertionError";
qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);
this.__cU=qx.dev.StackTrace.getStackTrace();
},members:{__cU:null,getStackTrace:function(){return this.__cU;
}}});
})();
(function(){var a="qx.core.ValidationError";
qx.Class.define(a,{extend:qx.type.BaseError});
})();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";
qx.Class.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(i){return this.getClass(i)==d;
},isNumber:function(k){return (k!==null&&(this.getClass(k)==b||k instanceof Number));
},isBoolean:function(j){return (j!==null&&(this.getClass(j)==a||j instanceof Boolean));
},isDate:function(h){return (h!==null&&(this.getClass(h)==c||h instanceof Date));
},isError:function(g){return (g!==null&&(this.getClass(g)==e||g instanceof Error));
}}});
})();
(function(){var a="qx.event.IEventHandler";
qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:3},members:{canHandleEvent:function(b,c){},registerEvent:function(g,h,i){},unregisterEvent:function(d,e,f){}}});
})();
(function(){var b="qx.util.ObjectPool",a="Integer";
qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);
this.__cV={};

if(c!=null){this.setSize(c);
}},properties:{size:{check:a,init:Infinity}},members:{__cV:null,getObject:function(k){if(this.$$disposed){return new k;
}
if(!k){throw new Error("Class needs to be defined!");
}var m=null;
var n=this.__cV[k.classname];

if(n){m=n.pop();
}
if(m){m.$$pooled=false;
}else{m=new k;
}return m;
},poolObject:function(d){if(!this.__cV){return;
}var e=d.classname;
var f=this.__cV[e];

if(d.$$pooled){throw new Error("Object is already pooled: "+d);
}
if(!f){this.__cV[e]=f=[];
}if(f.length>this.getSize()){if(d.destroy){d.destroy();
}else{d.dispose();
}return;
}d.$$pooled=true;
f.push(d);
}},destruct:function(){var j=this.__cV;
var g,h,i,l;

for(g in j){h=j[g];

for(i=0,l=h.length;i<l;i++){h[i].dispose();
}}delete this.__cV;
}});
})();
(function(){var b="singleton",a="qx.event.Pool";
qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);
}});
})();
(function(){var a="qx.util.DisposeUtil";
qx.Class.define(a,{statics:{disposeObjects:function(p,q,r){var name;

for(var i=0,l=q.length;i<l;i++){name=q[i];

if(p[name]==null||!p.hasOwnProperty(name)){continue;
}
if(!qx.core.ObjectRegistry.inShutDown){if(p[name].dispose){if(!r&&p[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");
}else{p[name].dispose();
}}else{throw new Error("Has no disposable object under key: "+name+"!");
}}p[name]=null;
}},disposeArray:function(k,m){var o=k[m];

if(!o){return;
}if(qx.core.ObjectRegistry.inShutDown){k[m]=null;
return;
}try{var n;

for(var i=o.length-1;i>=0;i--){n=o[i];

if(n){n.dispose();
}}}catch(j){throw new Error("The array field: "+m+" of object: "+k+" has non disposable entries: "+j);
}o.length=0;
k[m]=null;
},disposeMap:function(e,f){var g=e[f];

if(!g){return;
}if(qx.core.ObjectRegistry.inShutDown){e[f]=null;
return;
}try{for(var h in g){if(g.hasOwnProperty(h)){g[h].dispose();
}}}catch(s){throw new Error("The map field: "+f+" of object: "+e+" has non disposable entries: "+s);
}e[f]=null;
},disposeTriggeredBy:function(b,c){var d=c.dispose;
c.dispose=function(){d.call(c);
b.dispose();
};
}}});
})();
(function(){var a="qx.event.IEventDispatcher";
qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);
this.assertString(c);
},dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);
this.assertString(e);
}}});
})();
(function(){var a="qx.event.dispatch.Direct";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(j){this._manager=j;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(k,event,m){return !event.getBubbles();
},dispatchEvent:function(b,event,c){var f,d;
{};
event.setEventPhase(qx.event.type.Event.AT_TARGET);
var g=this._manager.getListeners(b,c,false);

if(g){for(var i=0,l=g.length;i<l;i++){var e=g[i].context||b;
g[i].handler.call(e,event);
}}}},defer:function(h){qx.event.Registration.addDispatcher(h);
}});
})();
(function(){var a="qx.event.handler.Object";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);
},registerEvent:function(h,i,j){},unregisterEvent:function(e,f,g){}},defer:function(d){qx.event.Registration.addHandler(d);
}});
})();
(function(){var k="indexOf",j="lastIndexOf",h="slice",g="concat",f="join",e="toLocaleUpperCase",d="shift",c="substr",b="filter",a="unshift",I="match",H="quote",G="qx.lang.Generics",F="localeCompare",E="sort",D="some",C="charAt",B="split",A="substring",z="pop",t="toUpperCase",u="replace",q="push",r="charCodeAt",o="every",p="reverse",m="search",n="forEach",v="map",w="toLowerCase",y="splice",x="toLocaleLowerCase";
qx.Class.define(G,{statics:{__cW:{"Array":[f,p,E,q,z,d,a,y,g,h,k,j,n,v,b,D,o],"String":[H,A,w,t,C,r,k,j,x,e,F,I,m,u,B,c,g,h]},__cX:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));
};
},__cY:function(){var M=qx.lang.Generics.__cW;

for(var Q in M){var O=window[Q];
var N=M[Q];

for(var i=0,l=N.length;i<l;i++){var P=N[i];

if(!O[P]){O[P]=qx.lang.Generics.__cX(O,P);
}}}}},defer:function(L){L.__cY();
}});
})();
(function(){var b="qx.util.ValueManager",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this._dynamic={};
},members:{_dynamic:null,resolveDynamic:function(d){return this._dynamic[d];
},isDynamic:function(c){return !!this._dynamic[c];
},resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];
}return e;
},_setDynamic:function(f){this._dynamic=f;
},_getDynamic:function(){return this._dynamic;
}},destruct:function(){this._dynamic=null;
}});
})();
(function(){var j="/",i="0",h="qx/static",g="http://",f="https://",e="file://",d="qx.util.AliasManager",c="singleton",b=".",a="static";
qx.Class.define(d,{type:c,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);
this.__di={};
this.add(a,h);
},members:{__di:null,_preprocess:function(r){var u=this._getDynamic();

if(u[r]===false){return r;
}else if(u[r]===undefined){if(r.charAt(0)===j||r.charAt(0)===b||r.indexOf(g)===0||r.indexOf(f)===i||r.indexOf(e)===0){u[r]=false;
return r;
}
if(this.__di[r]){return this.__di[r];
}var t=r.substring(0,r.indexOf(j));
var s=this.__di[t];

if(s!==undefined){u[r]=s+r.substring(t.length);
}}return r;
},add:function(n,o){this.__di[n]=o;
var q=this._getDynamic();
for(var p in q){if(p.substring(0,p.indexOf(j))===n){q[p]=o+p.substring(n.length);
}}},remove:function(m){delete this.__di[m];
},resolve:function(k){var l=this._getDynamic();

if(k!=null){k=this._preprocess(k);
}return l[k]||k;
}},destruct:function(){this.__di=null;
}});
})();
(function(){var k="px",j="qx.client",i="div",h="img",g="",f="no-repeat",d="scale-x",c="mshtml",b="scale",a="scale-y",G="qx/icon",F="repeat",E=".png",D="crop",C="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",B='<div style="',A="repeat-y",z='<img src="',y="qx.bom.element.Decoration",x="', sizingMethod='",r="png",s="')",p='"></div>',q='"/>',n='" style="',o="none",l="webkit",m=" ",t="repeat-x",u="DXImageTransform.Microsoft.AlphaImageLoader",w="qx/static/blank.gif",v="absolute";
qx.Class.define(y,{statics:{DEBUG:false,__io:{},__ip:qx.core.Variant.isSet(j,c),__iq:qx.core.Variant.select(j,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__ir:{"scale-x":h,"scale-y":h,"scale":h,"repeat":i,"no-repeat":i,"repeat-x":i,"repeat-y":i},update:function(bM,bN,bO,bP){var bR=this.getTagName(bO,bN);

if(bR!=bM.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");
}var bS=this.getAttributes(bN,bO,bP);

if(bR===h){bM.src=bS.src||qx.util.ResourceManager.getInstance().toUri(w);
}if(bM.style.backgroundPosition!=g&&bS.style.backgroundPosition===undefined){bS.style.backgroundPosition=null;
}if(bM.style.clip!=g&&bS.style.clip===undefined){bS.style.clip=null;
}var bQ=qx.bom.element.Style;
bQ.setStyles(bM,bS.style);
if(this.__ip){try{bM.filters[u].apply();
}catch(e){}}},create:function(bo,bp,bq){var br=this.getTagName(bp,bo);
var bt=this.getAttributes(bo,bp,bq);
var bs=qx.bom.element.Style.compile(bt.style);

if(br===h){return z+bt.src+n+bs+q;
}else{return B+bs+p;
}},getTagName:function(bY,ca){if(qx.core.Variant.isSet(j,c)){if(ca&&this.__ip&&this.__iq[bY]&&qx.lang.String.endsWith(ca,E)){return i;
}}return this.__ir[bY];
},getAttributes:function(K,L,M){if(!M){M={};
}
if(!M.position){M.position=v;
}
if(qx.core.Variant.isSet(j,c)){M.fontSize=0;
M.lineHeight=0;
}else if(qx.core.Variant.isSet(j,l)){M.WebkitUserDrag=o;
}var O=qx.util.ResourceManager.getInstance().getImageFormat(K)||qx.io.ImageLoader.getFormat(K);
{};
var N;
if(this.__ip&&this.__iq[L]&&O===r){N=this.__iu(M,L,K);
}else{if(L===b){N=this.__iv(M,L,K);
}else if(L===d||L===a){N=this.__iw(M,L,K);
}else{N=this.__iz(M,L,K);
}}return N;
},__is:function(H,I,J){if(H.width==null&&I!=null){H.width=I+k;
}
if(H.height==null&&J!=null){H.height=J+k;
}return H;
},__it:function(P){var Q=qx.util.ResourceManager.getInstance().getImageWidth(P)||qx.io.ImageLoader.getWidth(P);
var R=qx.util.ResourceManager.getInstance().getImageHeight(P)||qx.io.ImageLoader.getHeight(P);
return {width:Q,height:R};
},__iu:function(bG,bH,bI){var bL=this.__it(bI);
bG=this.__is(bG,bL.width,bL.height);
var bK=bH==f?D:b;
var bJ=C+qx.util.ResourceManager.getInstance().toUri(bI)+x+bK+s;
bG.filter=bJ;
bG.backgroundImage=bG.backgroundRepeat=g;
return {style:bG};
},__iv:function(S,T,U){var V=qx.util.ResourceManager.getInstance().toUri(U);
var W=this.__it(U);
S=this.__is(S,W.width,W.height);
return {src:V,style:S};
},__iw:function(X,Y,ba){var be=qx.util.ResourceManager.getInstance();
var bd=be.isClippedImage(ba);
var bf=this.__it(ba);

if(bd){var bc=be.getData(ba);
var bb=be.toUri(bc[4]);

if(Y===d){X=this.__ix(X,bc,bf.height);
}else{X=this.__iy(X,bc,bf.width);
}return {src:bb,style:X};
}else{{};

if(Y==d){X.height=bf.height==null?null:bf.height+k;
}else if(Y==a){X.width=bf.width==null?null:bf.width+k;
}var bb=be.toUri(ba);
return {src:bb,style:X};
}},__ix:function(bu,bv,bw){var bx=qx.util.ResourceManager.getInstance().getImageHeight(bv[4]);
bu.clip={top:-bv[6],height:bw};
bu.height=bx+k;
if(bu.top!=null){bu.top=(parseInt(bu.top,10)+bv[6])+k;
}else if(bu.bottom!=null){bu.bottom=(parseInt(bu.bottom,10)+bw-bx-bv[6])+k;
}return bu;
},__iy:function(bT,bU,bV){var bW=qx.util.ResourceManager.getInstance().getImageWidth(bU[4]);
bT.clip={left:-bU[5],width:bV};
bT.width=bW+k;
if(bT.left!=null){bT.left=(parseInt(bT.left,10)+bU[5])+k;
}else if(bT.right!=null){bT.right=(parseInt(bT.right,10)+bV-bW-bU[5])+k;
}return bT;
},__iz:function(by,bz,bA){var bF=qx.util.ResourceManager.getInstance().isClippedImage(bA);
var bE=this.__it(bA);
if(bF&&bz!==F){var bD=qx.util.ResourceManager.getInstance().getData(bA);
var bC=qx.bom.element.Background.getStyles(bD[4],bz,bD[5],bD[6]);

for(var bB in bC){by[bB]=bC[bB];
}
if(bE.width!=null&&by.width==null&&(bz==A||bz===f)){by.width=bE.width+k;
}
if(bE.height!=null&&by.height==null&&(bz==t||bz===f)){by.height=bE.height+k;
}return {style:by};
}else{{};
by=this.__is(by,bE.width,bE.height);
by=this.__iA(by,bA,bz);
return {style:by};
}},__iA:function(bh,bi,bj){var top=null;
var bn=null;

if(bh.backgroundPosition){var bk=bh.backgroundPosition.split(m);
bn=parseInt(bk[0]);

if(isNaN(bn)){bn=bk[0];
}top=parseInt(bk[1]);

if(isNaN(top)){top=bk[1];
}}var bm=qx.bom.element.Background.getStyles(bi,bj,bn,top);

for(var bl in bm){bh[bl]=bm[bl];
}if(bh.filter){bh.filter=g;
}return bh;
},__iB:function(bX){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(bX)&&bX.indexOf(G)==-1){if(!this.__io[bX]){qx.log.Logger.debug("Potential clipped image candidate: "+bX);
this.__io[bX]=true;
}}},isAlphaImageLoaderEnabled:qx.core.Variant.select(j,{"mshtml":function(){return qx.bom.element.Decoration.__ip;
},"default":function(){return false;
}})}});
})();
(function(){var b="CSS1Compat",a="qx.bom.client.Feature";
qx.Class.define(a,{statics:{STANDARD_MODE:false,QUIRKS_MODE:false,CONTENT_BOX:false,BORDER_BOX:false,SVG:false,CANVAS:!!window.CanvasRenderingContext2D,VML:false,XPATH:!!document.evaluate,AIR:navigator.userAgent.indexOf("adobeair")!==-1,GEARS:!!(window.google&&window.google.gears),SSL:window.location.protocol==="https:",ECMA_OBJECT_COUNT:(({}).__count__==0),CSS_POINTER_EVENTS:"pointerEvents" in document.documentElement.style,HTML5_CLASSLIST:(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)==="DOMTokenList"),__dr:function(){this.QUIRKS_MODE=this.__ds();
this.STANDARD_MODE=!this.QUIRKS_MODE;
this.CONTENT_BOX=!qx.bom.client.Engine.MSHTML||this.STANDARD_MODE;
this.BORDER_BOX=!this.CONTENT_BOX;
this.SVG=document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature("org.w3c.dom.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));
this.VML=qx.bom.client.Engine.MSHTML;
},__ds:function(){if(qx.bom.client.Engine.MSHTML&&qx.bom.client.Engine.VERSION>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;
}else{return document.compatMode!==b;
}}},defer:function(c){c.__dr();
}});
})();
(function(){var j="/",i="mshtml",h="",g="qx.client",f="?",e="string",d="qx.util.ResourceManager",c="singleton";
qx.Class.define(d,{extend:qx.core.Object,type:c,statics:{__ib:qx.$$resources||{},__ic:{}},members:{has:function(o){return !!this.self(arguments).__ib[o];
},getData:function(v){return this.self(arguments).__ib[v]||null;
},getImageWidth:function(a){var b=this.self(arguments).__ib[a];
return b?b[0]:null;
},getImageHeight:function(k){var l=this.self(arguments).__ib[k];
return l?l[1]:null;
},getImageFormat:function(w){var x=this.self(arguments).__ib[w];
return x?x[2]:null;
},isClippedImage:function(m){var n=this.self(arguments).__ib[m];
return n&&n.length>4;
},toUri:function(y){if(y==null){return y;
}var z=this.self(arguments).__ib[y];

if(!z){return y;
}
if(typeof z===e){var B=z;
}else{var B=z[3];
if(!B){return y;
}}var A=h;

if(qx.core.Variant.isSet(g,i)&&qx.bom.client.Feature.SSL){A=this.self(arguments).__ic[B];
}return A+qx.$$libraries[B].resourceUri+j+y;
}},defer:function(p){if(qx.core.Variant.isSet(g,i)){if(qx.bom.client.Feature.SSL){for(var t in qx.$$libraries){var r;

if(qx.$$libraries[t].resourceUri){r=qx.$$libraries[t].resourceUri;
}else{p.__ic[t]=h;
continue;
}if(r.match(/^\/\//)!=null){p.__ic[t]=window.location.protocol;
}else if(r.match(/^\.\//)!=null){var q=document.URL;
p.__ic[t]=q.substring(0,q.lastIndexOf(j)+1);
}else if(r.match(/^http/)!=null){}else{var u=window.location.href.indexOf(f);
var s;

if(u==-1){s=window.location.href;
}else{s=window.location.href.substring(0,u);
}p.__ic[t]=s.substring(0,s.lastIndexOf(j)+1);
}}}}}});
})();
(function(){var u="auto",t="px",s=",",r="clip:auto;",q="rect(",p=");",o="",n=")",m="qx.bom.element.Clip",l="string",i="rect(auto)",k="clip:rect(",j="clip",h="rect(auto,auto,auto,auto)";
qx.Class.define(m,{statics:{compile:function(E){if(!E){return r;
}var J=E.left;
var top=E.top;
var I=E.width;
var H=E.height;
var F,G;

if(J==null){F=(I==null?u:I+t);
J=u;
}else{F=(I==null?u:J+I+t);
J=J+t;
}
if(top==null){G=(H==null?u:H+t);
top=u;
}else{G=(H==null?u:top+H+t);
top=top+t;
}return k+top+s+F+s+G+s+J+p;
},get:function(v,w){var y=qx.bom.element.Style.get(v,j,w,false);
var D,top,B,A;
var x,z;

if(typeof y===l&&y!==u&&y!==o){y=qx.lang.String.trim(y);
if(/\((.*)\)/.test(y)){var C=RegExp.$1.split(s);
top=qx.lang.String.trim(C[0]);
x=qx.lang.String.trim(C[1]);
z=qx.lang.String.trim(C[2]);
D=qx.lang.String.trim(C[3]);
if(D===u){D=null;
}
if(top===u){top=null;
}
if(x===u){x=null;
}
if(z===u){z=null;
}if(top!=null){top=parseInt(top,10);
}
if(x!=null){x=parseInt(x,10);
}
if(z!=null){z=parseInt(z,10);
}
if(D!=null){D=parseInt(D,10);
}if(x!=null&&D!=null){B=x-D;
}else if(x!=null){B=x;
}
if(z!=null&&top!=null){A=z-top;
}else if(z!=null){A=z;
}}else{throw new Error("Could not parse clip string: "+y);
}}return {left:D||null,top:top||null,width:B||null,height:A||null};
},set:function(a,b){if(!b){a.style.clip=h;
return;
}var g=b.left;
var top=b.top;
var f=b.width;
var e=b.height;
var c,d;

if(g==null){c=(f==null?u:f+t);
g=u;
}else{c=(f==null?u:g+f+t);
g=g+t;
}
if(top==null){d=(e==null?u:e+t);
top=u;
}else{d=(e==null?u:top+e+t);
top=top+t;
}a.style.clip=q+top+s+c+s+d+s+g+n;
},reset:function(K){K.style.clip=qx.bom.client.Engine.MSHTML?i:u;
}}});
})();
(function(){var k="n-resize",j="e-resize",i="nw-resize",h="ne-resize",g="",f="cursor:",e="qx.client",d=";",c="qx.bom.element.Cursor",b="cursor",a="hand";
qx.Class.define(c,{statics:{__hw:qx.core.Variant.select(e,{"mshtml":{"cursor":a,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"opera":{"col-resize":j,"row-resize":k,"ew-resize":j,"ns-resize":k,"nesw-resize":h,"nwse-resize":i},"default":{}}),compile:function(q){return f+(this.__hw[q]||q)+d;
},get:function(n,o){return qx.bom.element.Style.get(n,b,o,false);
},set:function(l,m){l.style.cursor=this.__hw[m]||m;
},reset:function(p){p.style.cursor=g;
}}});
})();
(function(){var m="",l="qx.client",k=";",j="filter",i="opacity:",h="opacity",g="MozOpacity",f=");",e=")",d="zoom:1;filter:alpha(opacity=",a="qx.bom.element.Opacity",c="alpha(opacity=",b="-moz-opacity:";
qx.Class.define(a,{statics:{compile:qx.core.Variant.select(l,{"mshtml":function(E){if(E>=1){return m;
}
if(E<0.00001){E=0;
}return d+(E*100)+f;
},"gecko":function(s){if(s==1){s=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){return b+s+k;
}else{return i+s+k;
}},"default":function(w){if(w==1){return m;
}return i+w+k;
}}),set:qx.core.Variant.select(l,{"mshtml":function(G,H){var I=qx.bom.element.Style.get(G,j,qx.bom.element.Style.COMPUTED_MODE,false);
if(H>=1){G.style.filter=I.replace(/alpha\([^\)]*\)/gi,m);
return;
}
if(H<0.00001){H=0;
}if(!G.currentStyle||!G.currentStyle.hasLayout){G.style.zoom=1;
}G.style.filter=I.replace(/alpha\([^\)]*\)/gi,m)+c+H*100+e;
},"gecko":function(q,r){if(r==1){r=0.999999;
}
if(qx.bom.client.Engine.VERSION<1.7){q.style.MozOpacity=r;
}else{q.style.opacity=r;
}},"default":function(x,y){if(y==1){y=m;
}x.style.opacity=y;
}}),reset:qx.core.Variant.select(l,{"mshtml":function(J){var K=qx.bom.element.Style.get(J,j,qx.bom.element.Style.COMPUTED_MODE,false);
J.style.filter=K.replace(/alpha\([^\)]*\)/gi,m);
},"gecko":function(z){if(qx.bom.client.Engine.VERSION<1.7){z.style.MozOpacity=m;
}else{z.style.opacity=m;
}},"default":function(F){F.style.opacity=m;
}}),get:qx.core.Variant.select(l,{"mshtml":function(A,B){var C=qx.bom.element.Style.get(A,j,B,false);

if(C){var D=C.match(/alpha\(opacity=(.*)\)/);

if(D&&D[1]){return parseFloat(D[1])/100;
}}return 1.0;
},"gecko":function(t,u){var v=qx.bom.element.Style.get(t,qx.bom.client.Engine.VERSION<1.7?g:h,u,false);

if(v==0.999999){v=1.0;
}
if(v!=null){return parseFloat(v);
}return 1.0;
},"default":function(n,o){var p=qx.bom.element.Style.get(n,h,o,false);

if(p!=null){return parseFloat(p);
}return 1.0;
}})}});
})();
(function(){var q="qx.client",p="",o="boxSizing",n="box-sizing",m=":",k="border-box",j="qx.bom.element.BoxSizing",h="KhtmlBoxSizing",g="-moz-box-sizing",f="WebkitBoxSizing",c=";",e="-khtml-box-sizing",d="content-box",b="-webkit-box-sizing",a="MozBoxSizing";
qx.Class.define(j,{statics:{__hx:qx.core.Variant.select(q,{"mshtml":null,"webkit":[o,h,f],"gecko":[a],"opera":[o]}),__hy:qx.core.Variant.select(q,{"mshtml":null,"webkit":[n,e,b],"gecko":[g],"opera":[n]}),__hz:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__hA:function(z){var A=this.__hz;
return A.tags[z.tagName.toLowerCase()]||A.types[z.type];
},compile:qx.core.Variant.select(q,{"mshtml":function(w){{};
},"default":function(E){var G=this.__hy;
var F=p;

if(G){for(var i=0,l=G.length;i<l;i++){F+=G[i]+m+E+c;
}}return F;
}}),get:qx.core.Variant.select(q,{"mshtml":function(v){if(qx.bom.Document.isStandardMode(qx.dom.Node.getDocument(v))){if(!this.__hA(v)){return d;
}}return k;
},"default":function(r){var t=this.__hx;
var s;

if(t){for(var i=0,l=t.length;i<l;i++){s=qx.bom.element.Style.get(r,t[i],null,false);

if(s!=null&&s!==p){return s;
}}}return p;
}}),set:qx.core.Variant.select(q,{"mshtml":function(x,y){{};
},"default":function(B,C){var D=this.__hx;

if(D){for(var i=0,l=D.length;i<l;i++){B.style[D[i]]=C;
}}}}),reset:function(u){this.set(u,p);
}}});
})();
(function(){var V="",U="qx.client",T="hidden",S="-moz-scrollbars-none",R="overflow",Q=";",P="overflowY",O=":",N="overflowX",M="overflow:",bi="none",bh="scroll",bg="borderLeftStyle",bf="borderRightStyle",be="div",bd="borderRightWidth",bc="overflow-y",bb="borderLeftWidth",ba="-moz-scrollbars-vertical",Y="100px",W="qx.bom.element.Overflow",X="overflow-x";
qx.Class.define(W,{statics:{__hv:null,getScrollbarWidth:function(){if(this.__hv!==null){return this.__hv;
}var bU=qx.bom.element.Style;
var bW=function(ce,cf){return parseInt(bU.get(ce,cf))||0;
};
var bX=function(D){return (bU.get(D,bf)==bi?0:bW(D,bd));
};
var bV=function(bl){return (bU.get(bl,bg)==bi?0:bW(bl,bb));
};
var ca=qx.core.Variant.select(U,{"mshtml":function(d){if(bU.get(d,P)==T||d.clientWidth==0){return bX(d);
}return Math.max(0,d.offsetWidth-d.clientLeft-d.clientWidth);
},"default":function(k){if(k.clientWidth==0){var l=bU.get(k,R);
var m=(l==bh||l==ba?16:0);
return Math.max(0,bX(k)+m);
}return Math.max(0,(k.offsetWidth-k.clientWidth-bV(k)));
}});
var bY=function(bu){return ca(bu)-bX(bu);
};
var t=document.createElement(be);
var s=t.style;
s.height=s.width=Y;
s.overflow=bh;
document.body.appendChild(t);
var c=bY(t);
this.__hv=c?c:16;
document.body.removeChild(t);
return this.__hv;
},_compile:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(y,z){if(z==T){z=S;
}return M+z+Q;
}:
function(bz,bA){return bz+O+bA+Q;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(bQ,bR){return M+bR+Q;
}:
function(bF,bG){return bF+O+bG+Q;
},"default":function(bH,bI){return bH+O+bI+Q;
}}),compileX:function(bx){return this._compile(X,bx);
},compileY:function(A){return this._compile(bc,A);
},getX:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(n,o){var p=qx.bom.element.Style.get(n,R,o,false);

if(p===S){p=T;
}return p;
}:
function(bD,bE){return qx.bom.element.Style.get(bD,N,bE,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(w,x){return qx.bom.element.Style.get(w,R,x,false);
}:
function(u,v){return qx.bom.element.Style.get(u,N,v,false);
},"default":function(bj,bk){return qx.bom.element.Style.get(bj,N,bk,false);
}}),setX:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(K,L){if(L==T){L=S;
}K.style.overflow=L;
}:
function(g,h){g.style.overflowX=h;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(I,J){I.style.overflow=J;
}:
function(bL,bM){bL.style.overflowX=bM;
},"default":function(br,bs){br.style.overflowX=bs;
}}),resetX:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bP){bP.style.overflow=V;
}:
function(bq){bq.style.overflowX=V;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(B,C){B.style.overflow=V;
}:
function(E,F){E.style.overflowX=V;
},"default":function(by){by.style.overflowX=V;
}}),getY:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(bm,bn){var bo=qx.bom.element.Style.get(bm,R,bn,false);

if(bo===S){bo=T;
}return bo;
}:
function(bJ,bK){return qx.bom.element.Style.get(bJ,P,bK,false);
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(q,r){return qx.bom.element.Style.get(q,R,r,false);
}:
function(bS,bT){return qx.bom.element.Style.get(bS,P,bT,false);
},"default":function(i,j){return qx.bom.element.Style.get(i,P,j,false);
}}),setY:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(e,f){if(f===T){f=S;
}e.style.overflow=f;
}:
function(cc,cd){cc.style.overflowY=cd;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(G,H){G.style.overflow=H;
}:
function(bN,bO){bN.style.overflowY=bO;
},"default":function(bv,bw){bv.style.overflowY=bw;
}}),resetY:qx.core.Variant.select(U,{"gecko":qx.bom.client.Engine.VERSION<
1.8?
function(cb){cb.style.overflow=V;
}:
function(bt){bt.style.overflowY=V;
},"opera":qx.bom.client.Engine.VERSION<
9.5?
function(a,b){a.style.overflow=V;
}:
function(bB,bC){bB.style.overflowY=V;
},"default":function(bp){bp.style.overflowY=V;
}})}});
})();
(function(){var r="",q="qx.client",p="userSelect",o="style",n="MozUserModify",m="px",k="float",h="borderImage",g="styleFloat",f="appearance",K="pixelHeight",J='Ms',I=":",H="cssFloat",G="pixelTop",F="pixelLeft",E='O',D="qx.bom.element.Style",C='Khtml',B='string',y="pixelRight",z='Moz',w="pixelWidth",x="pixelBottom",u=";",v="textOverflow",s="userModify",t='Webkit',A="WebkitUserModify";
qx.Class.define(D,{statics:{__hB:function(){var T=[f,p,v,h];
var X={};
var U=document.documentElement.style;
var Y=[z,t,C,E,J];

for(var i=0,l=T.length;i<l;i++){var ba=T[i];
var V=ba;

if(U[ba]){X[V]=ba;
continue;
}ba=qx.lang.String.firstUp(ba);

for(var j=0,bb=Y.length;j<bb;j++){var W=Y[j]+ba;

if(typeof U[W]==B){X[V]=W;
break;
}}}this.__hC=X;
this.__hC[s]=qx.core.Variant.select(q,{"gecko":n,"webkit":A,"default":p});
this.__hD={};

for(var V in X){this.__hD[V]=this.__hH(X[V]);
}this.__hC[k]=qx.core.Variant.select(q,{"mshtml":g,"default":H});
},__hE:{width:w,height:K,left:F,right:y,top:G,bottom:x},__hF:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(bg){var bi=[];
var bk=this.__hF;
var bj=this.__hD;
var name,bh;

for(name in bg){bh=bg[name];

if(bh==null){continue;
}name=bj[name]||name;
if(bk[name]){bi.push(bk[name].compile(bh));
}else{bi.push(this.__hH(name),I,bh,u);
}}return bi.join(r);
},__hG:{},__hH:function(P){var Q=this.__hG;
var R=Q[P];

if(!R){R=Q[P]=qx.lang.String.hyphenate(P);
}return R;
},setCss:qx.core.Variant.select(q,{"mshtml":function(bl,bm){bl.style.cssText=bm;
},"default":function(N,O){N.setAttribute(o,O);
}}),getCss:qx.core.Variant.select(q,{"mshtml":function(bc){return bc.style.cssText.toLowerCase();
},"default":function(L){return L.getAttribute(o);
}}),isPropertySupported:function(S){return (this.__hF[S]||this.__hC[S]||S in document.documentElement.style);
},COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(bd,name,be,bf){{};
name=this.__hC[name]||name;
if(bf!==false&&this.__hF[name]){return this.__hF[name].set(bd,be);
}else{bd.style[name]=be!==null?be:r;
}},setStyles:function(bw,bx,by){{};
var bB=this.__hC;
var bD=this.__hF;
var bz=bw.style;

for(var bC in bx){var bA=bx[bC];
var name=bB[bC]||bC;

if(bA===undefined){if(by!==false&&bD[name]){bD[name].reset(bw);
}else{bz[name]=r;
}}else{if(by!==false&&bD[name]){bD[name].set(bw,bA);
}else{bz[name]=bA!==null?bA:r;
}}}},reset:function(bu,name,bv){name=this.__hC[name]||name;
if(bv!==false&&this.__hF[name]){return this.__hF[name].reset(bu);
}else{bu.style[name]=r;
}},get:qx.core.Variant.select(q,{"mshtml":function(bn,name,bo,bp){name=this.__hC[name]||name;
if(bp!==false&&this.__hF[name]){return this.__hF[name].get(bn,bo);
}if(!bn.currentStyle){return bn.style[name]||r;
}switch(bo){case this.LOCAL_MODE:return bn.style[name]||r;
case this.CASCADED_MODE:return bn.currentStyle[name]||r;
default:var bt=bn.currentStyle[name]||r;
if(/^-?[\.\d]+(px)?$/i.test(bt)){return bt;
}var bs=this.__hE[name];

if(bs){var bq=bn.style[name];
bn.style[name]=bt||0;
var br=bn.style[bs]+m;
bn.style[name]=bq;
return br;
}if(/^-?[\.\d]+(em|pt|%)?$/i.test(bt)){throw new Error("Untranslated computed property value: "+name+". Only pixel values work well across different clients.");
}return bt;
}},"default":function(a,name,b,c){name=this.__hC[name]||name;
if(c!==false&&this.__hF[name]){return this.__hF[name].get(a,b);
}switch(b){case this.LOCAL_MODE:return a.style[name]||r;
case this.CASCADED_MODE:if(a.currentStyle){return a.currentStyle[name]||r;
}throw new Error("Cascaded styles are not supported in this browser!");
default:var d=qx.dom.Node.getDocument(a);
var e=d.defaultView.getComputedStyle(a,null);
return e?e[name]:r;
}}})},defer:function(M){M.__hB();
}});
})();
(function(){var h="CSS1Compat",g="position:absolute;width:0;height:0;width:1",f="qx.bom.Document",e="1px",d="qx.client",c="div";
qx.Class.define(f,{statics:{isQuirksMode:qx.core.Variant.select(d,{"mshtml":function(l){if(qx.bom.client.Engine.VERSION>=8){return (l||window).document.documentMode===5;
}else{return (l||window).document.compatMode!==h;
}},"webkit":function(a){if(document.compatMode===undefined){var b=(a||window).document.createElement(c);
b.style.cssText=g;
return b.style.width===e?true:false;
}else{return (a||window).document.compatMode!==h;
}},"default":function(m){return (m||window).document.compatMode!==h;
}}),isStandardMode:function(q){return !this.isQuirksMode(q);
},getWidth:function(i){var j=(i||window).document;
var k=qx.bom.Viewport.getWidth(i);
var scroll=this.isStandardMode(i)?j.documentElement.scrollWidth:j.body.scrollWidth;
return Math.max(scroll,k);
},getHeight:function(n){var o=(n||window).document;
var p=qx.bom.Viewport.getHeight(n);
var scroll=this.isStandardMode(n)?o.documentElement.scrollHeight:o.body.scrollHeight;
return Math.max(scroll,p);
}}});
})();
(function(){var b="qx.client",a="qx.bom.Viewport";
qx.Class.define(a,{statics:{getWidth:qx.core.Variant.select(b,{"opera":function(c){if(qx.bom.client.Engine.VERSION<9.5){return (c||window).document.body.clientWidth;
}else{var d=(c||window).document;
return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;
}},"webkit":function(l){if(qx.bom.client.Engine.VERSION<523.15){return (l||window).innerWidth;
}else{var m=(l||window).document;
return qx.bom.Document.isStandardMode(l)?m.documentElement.clientWidth:m.body.clientWidth;
}},"default":function(e){var f=(e||window).document;
return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;
}}),getHeight:qx.core.Variant.select(b,{"opera":function(s){if(qx.bom.client.Engine.VERSION<9.5){return (s||window).document.body.clientHeight;
}else{var t=(s||window).document;
return qx.bom.Document.isStandardMode(s)?t.documentElement.clientHeight:t.body.clientHeight;
}},"webkit":function(g){if(qx.bom.client.Engine.VERSION<523.15){return (g||window).innerHeight;
}else{var h=(g||window).document;
return qx.bom.Document.isStandardMode(g)?h.documentElement.clientHeight:h.body.clientHeight;
}},"default":function(q){var r=(q||window).document;
return qx.bom.Document.isStandardMode(q)?r.documentElement.clientHeight:r.body.clientHeight;
}}),getScrollLeft:qx.core.Variant.select(b,{"mshtml":function(j){var k=(j||window).document;
return k.documentElement.scrollLeft||k.body.scrollLeft;
},"default":function(p){return (p||window).pageXOffset;
}}),getScrollTop:qx.core.Variant.select(b,{"mshtml":function(n){var o=(n||window).document;
return o.documentElement.scrollTop||o.body.scrollTop;
},"default":function(i){return (i||window).pageYOffset;
}})}});
})();
(function(){var c="qx.client",b="load",a="qx.io.ImageLoader";
qx.Bootstrap.define(a,{statics:{__iC:{},__iD:{width:null,height:null},__iE:/\.(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(B){var C=this.__iC[B];
return !!(C&&C.loaded);
},isFailed:function(e){var f=this.__iC[e];
return !!(f&&f.failed);
},isLoading:function(D){var E=this.__iC[D];
return !!(E&&E.loading);
},getFormat:function(h){var j=this.__iC[h];
return j?j.format:null;
},getSize:function(k){var m=this.__iC[k];
return m?
{width:m.width,height:m.height}:this.__iD;
},getWidth:function(n){var o=this.__iC[n];
return o?o.width:null;
},getHeight:function(F){var G=this.__iC[F];
return G?G.height:null;
},load:function(p,q,r){var s=this.__iC[p];

if(!s){s=this.__iC[p]={};
}if(q&&!r){r=window;
}if(s.loaded||s.loading||s.failed){if(q){if(s.loading){s.callbacks.push(q,r);
}else{q.call(r,p,s);
}}}else{s.loading=true;
s.callbacks=[];

if(q){s.callbacks.push(q,r);
}var u=new Image();
var t=qx.lang.Function.listener(this.__iF,this,u,p);
u.onload=t;
u.onerror=t;
u.src=p;
}},__iF:qx.event.GlobalError.observeMethod(function(event,w,x){var y=this.__iC[x];
if(event.type===b){y.loaded=true;
y.width=this.__iG(w);
y.height=this.__iH(w);
var z=this.__iE.exec(x);

if(z!=null){y.format=z[1];
}}else{y.failed=true;
}w.onload=w.onerror=null;
var A=y.callbacks;
delete y.loading;
delete y.callbacks;
for(var i=0,l=A.length;i<l;i+=2){A[i].call(A[i+1],x,y);
}}),__iG:qx.core.Variant.select(c,{"gecko":function(H){return H.naturalWidth;
},"default":function(d){return d.width;
}}),__iH:qx.core.Variant.select(c,{"gecko":function(g){return g.naturalHeight;
},"default":function(v){return v.height;
}})}});
})();
(function(){var m="number",l="0",k="px",j=";",i="background-image:url(",h=");",g="",f=")",e="background-repeat:",d=" ",a="qx.bom.element.Background",c="url(",b="background-position:";
qx.Class.define(a,{statics:{__iI:[i,null,h,b,null,j,e,null,j],__iJ:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__iK:function(n,top){var o=qx.bom.client.Engine;

if(o.GECKO&&o.VERSION<1.9&&n==top&&typeof n==m){top+=0.01;
}
if(n){var p=(typeof n==m)?n+k:n;
}else{p=l;
}
if(top){var q=(typeof top==m)?top+k:top;
}else{q=l;
}return p+d+q;
},compile:function(x,y,z,top){var A=this.__iK(z,top);
var B=qx.util.ResourceManager.getInstance().toUri(x);
var C=this.__iI;
C[1]=B;
C[4]=A;
C[7]=y;
return C.join(g);
},getStyles:function(D,E,F,top){if(!D){return this.__iJ;
}var G=this.__iK(F,top);
var H=qx.util.ResourceManager.getInstance().toUri(D);
var I={backgroundPosition:G,backgroundImage:c+H+f};

if(E!=null){I.backgroundRepeat=E;
}return I;
},set:function(r,s,t,u,top){var v=this.getStyles(s,t,u,top);

for(var w in v){r.style[w]=v[w];
}}}});
})();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(n){var o={};

if(n){var p=n.colors;
var q=qx.util.ColorUtil;
var r;

for(var s in p){r=p[s];

if(typeof r===b){if(!q.isCssString(r)){throw new Error("Could not parse color: "+r);
}}else if(r instanceof Array){r=q.rgbToRgbString(r);
}else{throw new Error("Could not parse color: "+r);
}o[s]=r;
}}this._setDynamic(o);
},resolve:function(j){var m=this._dynamic;
var k=m[j];

if(k){return k;
}var l=this.getTheme();

if(l!==null&&l.colors[j]){return m[j]=l.colors[j];
}return j;
},isDynamic:function(g){var i=this._dynamic;

if(g&&(i[g]!==undefined)){return true;
}var h=this.getTheme();

if(h!==null&&g&&(h.colors[g]!==undefined)){i[g]=h.colors[g];
return true;
}return false;
}}});
})();
(function(){var z=",",y="rgb(",x=")",w="qx.theme.manager.Color",v="qx.util.ColorUtil";
qx.Class.define(v,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(Y){return this.NAMED[Y]!==undefined;
},isSystemColor:function(bb){return this.SYSTEM[bb]!==undefined;
},supportsThemes:function(){return qx.Class.isDefined(w);
},isThemedColor:function(u){if(!this.supportsThemes()){return false;
}return qx.theme.manager.Color.getInstance().isDynamic(u);
},stringToRgb:function(s){if(this.supportsThemes()&&this.isThemedColor(s)){var s=qx.theme.manager.Color.getInstance().resolveDynamic(s);
}
if(this.isNamedColor(s)){return this.NAMED[s];
}else if(this.isSystemColor(s)){throw new Error("Could not convert system colors to RGB: "+s);
}else if(this.isRgbString(s)){return this.__dd();
}else if(this.isHex3String(s)){return this.__df();
}else if(this.isHex6String(s)){return this.__dg();
}throw new Error("Could not parse color: "+s);
},cssStringToRgb:function(bi){if(this.isNamedColor(bi)){return this.NAMED[bi];
}else if(this.isSystemColor(bi)){throw new Error("Could not convert system colors to RGB: "+bi);
}else if(this.isRgbString(bi)){return this.__dd();
}else if(this.isRgbaString(bi)){return this.__de();
}else if(this.isHex3String(bi)){return this.__df();
}else if(this.isHex6String(bi)){return this.__dg();
}throw new Error("Could not parse color: "+bi);
},stringToRgbString:function(bf){return this.rgbToRgbString(this.stringToRgb(bf));
},rgbToRgbString:function(R){return y+R[0]+z+R[1]+z+R[2]+x;
},rgbToHexString:function(o){return (qx.lang.String.pad(o[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(o[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(o[2].toString(16).toUpperCase(),2));
},isValidPropertyValue:function(C){return this.isThemedColor(C)||this.isNamedColor(C)||this.isHex3String(C)||this.isHex6String(C)||this.isRgbString(C);
},isCssString:function(bg){return this.isSystemColor(bg)||this.isNamedColor(bg)||this.isHex3String(bg)||this.isHex6String(bg)||this.isRgbString(bg);
},isHex3String:function(B){return this.REGEXP.hex3.test(B);
},isHex6String:function(ba){return this.REGEXP.hex6.test(ba);
},isRgbString:function(D){return this.REGEXP.rgb.test(D);
},isRgbaString:function(k){return this.REGEXP.rgba.test(k);
},__dd:function(){var j=parseInt(RegExp.$1,10);
var h=parseInt(RegExp.$2,10);
var e=parseInt(RegExp.$3,10);
return [j,h,e];
},__de:function(){var be=parseInt(RegExp.$1,10);
var bd=parseInt(RegExp.$2,10);
var bc=parseInt(RegExp.$3,10);
return [be,bd,bc];
},__df:function(){var n=parseInt(RegExp.$1,16)*17;
var m=parseInt(RegExp.$2,16)*17;
var l=parseInt(RegExp.$3,16)*17;
return [n,m,l];
},__dg:function(){var d=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);
var c=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);
var a=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);
return [d,c,a];
},hex3StringToRgb:function(A){if(this.isHex3String(A)){return this.__df(A);
}throw new Error("Invalid hex3 value: "+A);
},hex6StringToRgb:function(Q){if(this.isHex6String(Q)){return this.__dg(Q);
}throw new Error("Invalid hex6 value: "+Q);
},hexStringToRgb:function(bh){if(this.isHex3String(bh)){return this.__df(bh);
}
if(this.isHex6String(bh)){return this.__dg(bh);
}throw new Error("Invalid hex value: "+bh);
},rgbToHsb:function(E){var G,H,J;
var P=E[0];
var M=E[1];
var F=E[2];
var O=(P>M)?P:M;

if(F>O){O=F;
}var I=(P<M)?P:M;

if(F<I){I=F;
}J=O/255.0;

if(O!=0){H=(O-I)/O;
}else{H=0;
}
if(H==0){G=0;
}else{var L=(O-P)/(O-I);
var N=(O-M)/(O-I);
var K=(O-F)/(O-I);

if(P==O){G=K-N;
}else if(M==O){G=2.0+L-K;
}else{G=4.0+N-L;
}G=G/6.0;

if(G<0){G=G+1.0;
}}return [Math.round(G*360),Math.round(H*100),Math.round(J*100)];
},hsbToRgb:function(S){var i,f,p,q,t;
var T=S[0]/360;
var U=S[1]/100;
var V=S[2]/100;

if(T>=1.0){T%=1.0;
}
if(U>1.0){U=1.0;
}
if(V>1.0){V=1.0;
}var W=Math.floor(255*V);
var X={};

if(U==0.0){X.red=X.green=X.blue=W;
}else{T*=6.0;
i=Math.floor(T);
f=T-i;
p=Math.floor(W*(1.0-U));
q=Math.floor(W*(1.0-(U*f)));
t=Math.floor(W*(1.0-(U*(1.0-f))));

switch(i){case 0:X.red=W;
X.green=t;
X.blue=p;
break;
case 1:X.red=q;
X.green=W;
X.blue=p;
break;
case 2:X.red=p;
X.green=W;
X.blue=t;
break;
case 3:X.red=p;
X.green=q;
X.blue=W;
break;
case 4:X.red=t;
X.green=p;
X.blue=W;
break;
case 5:X.red=W;
X.green=p;
X.blue=q;
break;
}}return [X.red,X.green,X.blue];
},randomColor:function(){var r=Math.round(Math.random()*255);
var g=Math.round(Math.random()*255);
var b=Math.round(Math.random()*255);
return this.rgbToRgbString([r,g,b]);
}}});
})();
(function(){var j="_applyStyle",i="stretch",h="Integer",g="px",f=" ",e="repeat",d="round",c="shorthand",b="px ",a="sliceBottom",y=";'></div>",x="<div style='",w="sliceLeft",v="sliceRight",u="repeatX",t="String",s="qx.ui.decoration.css3.BorderImage",r="border-box",q="",p='") ',n="sliceTop",o='url("',l="hidden",m="repeatY",k="absolute";
qx.Class.define(s,{extend:qx.ui.decoration.Abstract,construct:function(z,A){qx.ui.decoration.Abstract.call(this);
if(z!=null){this.setBorderImage(z);
}
if(A!=null){this.setSlice(A);
}},statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:t,nullable:true,apply:j},sliceTop:{check:h,init:0,apply:j},sliceRight:{check:h,init:0,apply:j},sliceBottom:{check:h,init:0,apply:j},sliceLeft:{check:h,init:0,apply:j},slice:{group:[n,v,a,w],mode:c},repeatX:{check:[i,e,d],init:i,apply:j},repeatY:{check:[i,e,d],init:i,apply:j},repeat:{group:[u,m],mode:c}},members:{__qq:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__qq;
},getMarkup:function(){if(this.__qq){return this.__qq;
}var B=this._resolveImageUrl(this.getBorderImage());
var C=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];
var D=[this.getRepeatX(),this.getRepeatY()].join(f);
this.__qq=[x,qx.bom.element.Style.compile({"borderImage":o+B+p+C.join(f)+f+D,position:k,lineHeight:0,fontSize:0,overflow:l,boxSizing:r,borderWidth:C.join(b)+g}),y].join(q);
return this.__qq;
},resize:function(E,F,G){E.style.width=F+g;
E.style.height=G+g;
},tint:function(I,J){},_applyStyle:function(){{};
},_resolveImageUrl:function(H){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(H));
}},destruct:function(){this.__qq=null;
}});
})();
(function(){var j="px",i="0px",h="-1px",g="no-repeat",f="scale-x",e="scale-y",d="-tr",c="-l",b='</div>',a="scale",x="qx.client",w="-br",v="-t",u="-tl",t="-r",s='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',r="_applyBaseImage",q="-b",p="String",o="",m="-bl",n="qx.ui.decoration.GridDiv",k="-c",l="mshtml";
qx.Class.define(n,{extend:qx.ui.decoration.Abstract,construct:function(S,T){qx.ui.decoration.Abstract.call(this);
if(S!=null){this.setBaseImage(S);
}
if(T!=null){this.setInsets(T);
}},properties:{baseImage:{check:p,nullable:true,apply:r}},members:{__qr:null,__qs:null,__qt:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};
},_isInitialized:function(){return !!this.__qr;
},getMarkup:function(){if(this.__qr){return this.__qr;
}var J=qx.bom.element.Decoration;
var K=this.__qs;
var L=this.__qt;
var M=[];
M.push(s);
M.push(J.create(K.tl,g,{top:0,left:0}));
M.push(J.create(K.t,f,{top:0,left:L.left+j}));
M.push(J.create(K.tr,g,{top:0,right:0}));
M.push(J.create(K.bl,g,{bottom:0,left:0}));
M.push(J.create(K.b,f,{bottom:0,left:L.left+j}));
M.push(J.create(K.br,g,{bottom:0,right:0}));
M.push(J.create(K.l,e,{top:L.top+j,left:0}));
M.push(J.create(K.c,a,{top:L.top+j,left:L.left+j}));
M.push(J.create(K.r,e,{top:L.top+j,right:0}));
M.push(b);
return this.__qr=M.join(o);
},resize:function(N,O,P){var Q=this.__qt;
var innerWidth=O-Q.left-Q.right;
var innerHeight=P-Q.top-Q.bottom;
if(innerWidth<0){innerWidth=0;
}
if(innerHeight<0){innerHeight=0;
}N.style.width=O+j;
N.style.height=P+j;
N.childNodes[1].style.width=innerWidth+j;
N.childNodes[4].style.width=innerWidth+j;
N.childNodes[7].style.width=innerWidth+j;
N.childNodes[6].style.height=innerHeight+j;
N.childNodes[7].style.height=innerHeight+j;
N.childNodes[8].style.height=innerHeight+j;

if(qx.core.Variant.isSet(x,l)){if(qx.bom.client.Engine.VERSION<7||(qx.bom.client.Feature.QUIRKS_MODE&&qx.bom.client.Engine.VERSION<8)){if(O%2==1){N.childNodes[2].style.marginRight=h;
N.childNodes[5].style.marginRight=h;
N.childNodes[8].style.marginRight=h;
}else{N.childNodes[2].style.marginRight=i;
N.childNodes[5].style.marginRight=i;
N.childNodes[8].style.marginRight=i;
}
if(P%2==1){N.childNodes[3].style.marginBottom=h;
N.childNodes[4].style.marginBottom=h;
N.childNodes[5].style.marginBottom=h;
}else{N.childNodes[3].style.marginBottom=i;
N.childNodes[4].style.marginBottom=i;
N.childNodes[5].style.marginBottom=i;
}}}},tint:function(F,G){},_applyBaseImage:function(y,z){{};

if(y){var D=this._resolveImageUrl(y);
var E=/(.*)(\.[a-z]+)$/.exec(D);
var C=E[1];
var B=E[2];
var A=this.__qs={tl:C+u+B,t:C+v+B,tr:C+d+B,bl:C+m+B,b:C+q+B,br:C+w+B,l:C+c+B,c:C+k+B,r:C+t+B};
this.__qt=this._computeEdgeSizes(A);
}},_resolveImageUrl:function(R){return qx.util.AliasManager.getInstance().resolve(R);
},_computeEdgeSizes:function(H){var I=qx.util.ResourceManager.getInstance();
return {top:I.getImageHeight(H.t),bottom:I.getImageHeight(H.b),left:I.getImageWidth(H.l),right:I.getImageWidth(H.r)};
}},destruct:function(){this.__qr=this.__qs=this.__qt=null;
}});
})();
(function(){var m="ready",l="qx.client",k="mshtml",j="load",i="unload",h="qx.event.handler.Application",g="complete",f="qx.application",d="gecko|opera|webkit",c="left",a="DOMContentLoaded",b="shutdown";
qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(r){qx.core.Object.call(this);
this._window=r.getWindow();
this.__cc=false;
this.__cd=false;
this._initObserver();
qx.event.handler.Application.$$instance=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var A=qx.event.handler.Application.$$instance;

if(A){A.__cg();
}}},members:{canHandleEvent:function(s,t){},registerEvent:function(u,v,w){},unregisterEvent:function(n,o,p){},__ce:null,__cc:null,__cd:null,__cf:null,__cg:function(){if(!this.__ce&&this.__cc&&qx.$$loader.scriptLoaded){try{var q=qx.core.Setting.get(f);

if(!qx.Class.getByName(q)){return;
}}catch(e){}if(qx.core.Variant.isSet(l,k)){if(qx.event.Registration.hasListener(this._window,m)){this.__ce=true;
qx.event.Registration.fireEvent(this._window,m);
}}else{this.__ce=true;
qx.event.Registration.fireEvent(this._window,m);
}}},isApplicationReady:function(){return this.__ce;
},_initObserver:function(){if(qx.$$domReady||document.readyState==g||document.readyState==m){this.__cc=true;
this.__cg();
}else{this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);

if(qx.core.Variant.isSet(l,d)){qx.bom.Event.addNativeListener(this._window,a,this._onNativeLoadWrapped);
}else if(qx.core.Variant.isSet(l,k)){var self=this;
var y=function(){try{document.documentElement.doScroll(c);

if(document.body){self._onNativeLoadWrapped();
}}catch(x){window.setTimeout(y,100);
}};
y();
}qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);
}this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);
qx.bom.Event.addNativeListener(this._window,i,this._onNativeUnloadWrapped);
},_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,j,this._onNativeLoadWrapped);
}qx.bom.Event.removeNativeListener(this._window,i,this._onNativeUnloadWrapped);
this._onNativeLoadWrapped=null;
this._onNativeUnloadWrapped=null;
},_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cc=true;
this.__cg();
}),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__cf){this.__cf=true;

try{qx.event.Registration.fireEvent(this._window,b);
}catch(e){throw e;
}finally{qx.core.ObjectRegistry.shutdown();
}}})},destruct:function(){this._stopObserver();
this._window=null;
},defer:function(z){qx.event.Registration.addHandler(z);
}});
})();
(function(){var a="qx.event.handler.Window";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(k){qx.core.Object.call(this);
this._manager=k;
this._window=k.getWindow();
this._initWindowObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(i,j){},registerEvent:function(q,r,s){},unregisterEvent:function(f,g,h){},_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);
var u=qx.event.handler.Window.SUPPORTED_TYPES;

for(var t in u){qx.bom.Event.addNativeListener(this._window,t,this._onNativeWrapper);
}},_stopWindowObserver:function(){var c=qx.event.handler.Window.SUPPORTED_TYPES;

for(var b in c){qx.bom.Event.removeNativeListener(this._window,b,this._onNativeWrapper);
}},_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;
}var m=this._window;

try{var p=m.document;
}catch(e){return ;
}var n=p.documentElement;
var l=e.target||e.srcElement;

if(l==null||l===m||l===p||l===n){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,m]);
qx.event.Registration.dispatchEvent(m,event);
var o=event.getReturnValue();

if(o!=null){e.returnValue=o;
return o;
}}})},destruct:function(){this._stopWindowObserver();
this._manager=this._window=null;
},defer:function(d){qx.event.Registration.addHandler(d);
}});
})();
(function(){var f="ready",d="qx.application",c="beforeunload",b="qx.core.Init",a="shutdown";
qx.Class.define(b,{statics:{getApplication:function(){return this.__ch||null;
},ready:function(){if(this.__ch){return;
}
if(qx.bom.client.Engine.UNKNOWN_ENGINE){qx.log.Logger.warn("Could not detect engine!");
}
if(qx.bom.client.Engine.UNKNOWN_VERSION){qx.log.Logger.warn("Could not detect the version of the engine!");
}
if(qx.bom.client.Platform.UNKNOWN_PLATFORM){qx.log.Logger.warn("Could not detect platform!");
}
if(qx.bom.client.System.UNKNOWN_SYSTEM){qx.log.Logger.warn("Could not detect system!");
}qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");
var h=qx.core.Setting.get(d);
var i=qx.Class.getByName(h);

if(i){this.__ch=new i;
var g=new Date;
this.__ch.main();
qx.log.Logger.debug(this,"Main runtime: "+(new Date-g)+"ms");
var g=new Date;
this.__ch.finalize();
qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-g)+"ms");
}else{qx.log.Logger.warn("Missing application class: "+h);
}},__ci:function(e){var l=this.__ch;

if(l){e.setReturnValue(l.close());
}},__cj:function(){var k=this.__ch;

if(k){k.terminate();
}}},defer:function(j){qx.event.Registration.addListener(window,f,j.ready,j);
qx.event.Registration.addListener(window,a,j.__cj,j);
qx.event.Registration.addListener(window,c,j.__ci,j);
}});
})();
(function(){var a="qx.application.IApplication";
qx.Interface.define(a,{members:{main:function(){},finalize:function(){},close:function(){},terminate:function(){}}});
})();
(function(){var a="qx.locale.MTranslation";
qx.Mixin.define(a,{members:{tr:function(m,n){var o=qx.locale.Manager;

if(o){return o.tr.apply(o,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trn:function(h,i,j,k){var l=qx.locale.Manager;

if(l){return l.trn.apply(l,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},trc:function(b,c,d){var e=qx.locale.Manager;

if(e){return e.trc.apply(e,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
},marktr:function(f){var g=qx.locale.Manager;

if(g){return g.marktr.apply(g,arguments);
}throw new Error("To enable localization please include qx.locale.Manager into your build!");
}}});
})();
(function(){var b="abstract",a="qx.application.AbstractGui";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__ck:null,_createRootWidget:function(){throw new Error("Abstract method call");
},getRoot:function(){return this.__ck;
},main:function(){qx.theme.manager.Meta.getInstance().initialize();
qx.ui.tooltip.Manager.getInstance();
this.__ck=this._createRootWidget();
},finalize:function(){this.render();
},render:function(){qx.ui.core.queue.Manager.flush();
},close:function(c){},terminate:function(){}},destruct:function(){this.__ck=null;
}});
})();
(function(){var a="qx.application.Standalone";
qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);
}}});
})();
(function(){var N="changeValue",M="console",L="_seleniumWindow",K="_propertyWindow",J="_consoleWindow",I="_widgetsWindow",H="selenium",G="_consoleButton",F="Left",E="execute",bO="_propertyButton",bN="Height",bM="property",bL="widgets",bK="url",bJ="Open",bI="Top",bH="_widgetsButton",bG="_seleniumButton",bF="Width",U="close",V="Objects",S="resize",T="_toolbar",Q="_reloadButton",R="true",O="Inspect widget",P="</tt>",bb="index.html",bc="myToolbar",bl="_objectsButton",bi="<tt>",bt="open",bo=" Can not access the javascript in the iframe!",bB="Properties",by="load",be="_selector",bE="changeSelection",bD="_container",bC="middle",bd="_objectsWindow",bg="..",bh="",bk="qooxdoo Inspector",bm="Lucida Grande",bp="move",bv="Selenium",bA="inspector.Application",W="Widgets",X="_selectedWidgetLabel",bf="inspector/images/icons/edit-find.png",bs="objects",br="_iFrame",bq="toolbar-button-bold",bx="Console",bw="inspector/css/propertylisthtml.css",bn="inspector/css/domview.css",bu="inspector/css/consoleview.css",C="_inspectButton",bz="hidden",Y="inspector/css/sourceview.css",ba="_urlTextField",bj="icon/16/actions/view-refresh.png",D="minimized";
qx.Class.define(bA,{extend:qx.application.Standalone,construct:function(){qx.application.Standalone.call(this);
qx.bom.Stylesheet.includeFile(bn);
qx.bom.Stylesheet.includeFile(bu);
qx.bom.Stylesheet.includeFile(Y);
qx.bom.Stylesheet.includeFile(bw);
},members:{__qD:null,_toolbar:null,_objectsButton:null,_widgetsButton:null,_consoleButton:null,_propertyButton:null,_seleniumButton:null,_inspectButton:null,_selectedWidgetLabel:null,_urlTextField:null,_reloadButton:null,_objectsWindow:null,_widgetsWindow:null,_consoleWindow:null,_propertyWindow:null,_seleniumWindow:null,_container:null,_iFrame:null,_loading:null,_selector:null,_loadedWindow:null,__qE:null,__qF:null,main:function(){qx.application.Standalone.prototype.main.call(this);
{};
this.__qE=new inspector.components.InspectorModel(this);
this.__qF=new inspector.components.State();
this._container=new qx.ui.container.Composite(new qx.ui.layout.VBox());
this.getRoot().add(this._container,{edge:0});
this.__qM();
this.__qP(false);
var r=bg;
var q=qx.bom.Cookie.get(bK);

if(q==undefined||q==bh){q=r;
}
if(window.qxinspector!=undefined&&qxinspector.local){this._urlTextField.setVisibility(bz);
r=bb;
}else{r=q;
}this._loading=true;
this._iFrame=new qx.ui.embed.Iframe(r);
this._iFrame.setDecorator(null);
this._container.add(this._iFrame,{flex:1});
this._iFrame.addListener(by,this.__qG,this);
this._urlTextField.setValue(r);
},__qG:function(){this.__qD=0;
this.__qH();
var s=this._iFrame.getSource();

try{s=this._iFrame.getWindow().location.pathname;
}catch(a){}
if(window.qxinspector==undefined){this._urlTextField.setValue(s);
}qx.bom.Cookie.set(bK,s,7);
},__qH:function(){this._loadedWindow=this._iFrame.getContentElement().getWindow();
this.__qP(false);
if(!this.__qL()){return;
}this.__qP(true);
if(!this._selector){this._selector=new inspector.components.Selector(this._loadedWindow);
}else{this._selector.setJSWindow(this._loadedWindow);
}this._selector.addListener(bE,this._changeSelection,this);
this._selector.setSelection(this._loadedWindow.qx.core.Init.getApplication());
this._loading=false;
this.__qI();
this.__qE.setObjectRegistry(this._loadedWindow.qx.core.ObjectRegistry);
this.select(this._loadedWindow.qx.core.Init.getApplication().getRoot());
this.__qF.restoreState();
this.__qK();
},__qI:function(){if(this._objectsWindow!=null&&this._objectsWindow.isVisible()){this._objectsWindow.load(this._loadedWindow);
}if(this._widgetsWindow!=null&&this._widgetsWindow.isVisible()){this._widgetsWindow.load(this._loadedWindow);
}},__qJ:function(t,u,name){var x=qx.bom.Cookie.get(name+bJ);

if(x==R||x===null){u.setValue(true);
var top=parseInt(qx.bom.Cookie.get(name+bI));
var y=parseInt(qx.bom.Cookie.get(name+F));

if(!isNaN(top)&&!isNaN(y)){this[t].moveTo(y,top);
}var v=parseInt(qx.bom.Cookie.get(name+bF));
var w=parseInt(qx.bom.Cookie.get(name+bN));

if(!isNaN(w)){this[t].setHeight(w);
}
if(!isNaN(v)){this[t].setWidth(v);
}}},__qK:function(){this.__qJ(I,this._widgetsButton,bL);
this.__qJ(J,this._consoleButton,M);
this.__qJ(K,this._propertyButton,bM);
this.__qJ(L,this._seleniumButton,H);
},__qL:function(){try{this.__qD++;
if(this.__qD>20){throw new Error("qooxdoo not found!");
}
try{this._loadedWindow.qx.core.Init.getApplication().getRoot();
return true;
}catch(B){qx.event.Timer.once(this.__qH,this,500);
throw new Error("qooxdoo isn't ready at the moment!");
}}catch(p){this._selectedWidgetLabel.setValue(bo);
return false;
}},__qM:function(){this._toolbar=new qx.ui.toolbar.ToolBar();
this._toolbar.setDecorator(bc);
this._toolbar._getLayout().setAlignY(bC);
this._container.add(this._toolbar);
var l=new qx.ui.basic.Label(bk);
l.setPaddingLeft(10);
l.setPaddingRight(5);
var k=new qx.bom.Font(12,[bm]);
k.setBold(true);
k.setItalic(true);
l.setFont(k);
this._toolbar.add(l);
this._toolbar.add(new qx.ui.toolbar.Separator());
var j=new inspector.objects2.Window(V,this.__qE);
this.__qF.add(j,bs);
this._objectsButton=new qx.ui.toolbar.CheckBox(V);
this._toolbar.add(this._objectsButton);
this._objectsButton.addListener(N,function(e){e.getData()?j.open():j.close();
},this);
j.addListener(bt,function(e){this._objectsButton.setValue(true);
},this);
j.addListener(U,function(e){this._objectsButton.setValue(false);
},this);
this.__qN(bH,W,I,inspector.widgets.WidgetsWindow,bL,function(){this._widgetsWindow.load();
});
this.__qN(bO,bB,K,inspector.property.PropertyWindow,bM,function(){this._propertyWindow.select(this._selector.getSelection());
});
this.__qN(G,bx,J,inspector.console.ConsoleWindow,M,function(){});
this.__qN(bG,bv,L,inspector.selenium.SeleniumWindow,H,function(){this._seleniumWindow.select(this._selector.getSelection());
});
this._toolbar.add(new qx.ui.toolbar.Separator());
this._inspectButton=new qx.ui.toolbar.CheckBox(O,bf);
this._inspectButton.setAppearance(bq);
this._toolbar.add(this._inspectButton);
this._inspectButton.addListener(N,function(e){if(e.getData()){this._selector.start();
}else{this._selector.end();
}},this);
this._selectedWidgetLabel=new qx.ui.basic.Label();
this._selectedWidgetLabel.setRich(true);
this._toolbar.add(this._selectedWidgetLabel);
this._toolbar.addSpacer();
this._urlTextField=new qx.ui.form.TextField();
this._urlTextField.setMarginRight(5);
this._urlTextField.setWidth(300);
this._toolbar.add(this._urlTextField);
this._urlTextField.addListener(N,this._reloadIframe,this);
this._reloadButton=new qx.ui.toolbar.Button(null,bj);
this._toolbar.add(this._reloadButton);
this._reloadButton.addListener(E,this._reloadIframe,this);
},_reloadIframe:function(e){this._loading=true;
var bV=this._iFrame.getSource();

try{bV=this._iFrame.getWindow().location.pathname;
}catch(b){}
if(bV!=this._urlTextField.getValue()){this._iFrame.setSource(this._urlTextField.getValue());
}else{if(e.getType()==E){if(this._iFrame.getSource!=bV){this._iFrame.setSource(bV);
}else{this._iFrame.reload();
}}}},__qN:function(bP,bQ,bR,bS,name,bT){this[bP]=new qx.ui.toolbar.CheckBox(bQ);
this._toolbar.add(this[bP]);
var bU=false;
this[bP].addListener(N,function(e){if(!bU){this[bR]=new bS();
this.getRoot().add(this[bR]);
this[bR].setInitSizeAndPosition();
this.__qO(this[bR],this[bP],name);
}e.getData()?this[bR].open():this[bR].close();
bT.call(this);
bU=true;
qx.bom.Cookie.set(name+bJ,e.getData(),7);
},this);
},__qO:function(f,g,name){f.addListener(U,function(){g.setValue(false);
},this);
f.addListener(bp,function(e){qx.bom.Cookie.set(name+F,e.getData().left,7);
qx.bom.Cookie.set(name+bI,e.getData().top,7);
},this);
f.addListener(S,function(e){qx.bom.Cookie.set(name+bF,e.getData().width,7);
qx.bom.Cookie.set(name+bN,e.getData().height,7);
},this);
},__qP:function(A){this._objectsButton.setEnabled(A);
this._widgetsButton.setEnabled(A);
this._consoleButton.setEnabled(A);
this._propertyButton.setEnabled(A);
this._seleniumButton.setEnabled(A);
this._inspectButton.setEnabled(A);
this._selectedWidgetLabel.setEnabled(A);
},_changeSelection:function(e){this._inspectButton.setValue(false);
this.select(e.getData(),this._selector);
},getSelectedObject:function(){return this._selector.getSelection();
},setWidgetByHash:function(m,n){if(n==M){n=this._consoleWindow;
this._consoleWindow.goToDefaultView();
}var o=this._loadedWindow.qx.core.ObjectRegistry.fromHashCode(m);
this.select(o,n);
},inspectObjectByDomSelecet:function(h,i){if(this._consoleWindow!=null){this._consoleWindow.inspectObjectByDomSelecet(h,i);
}},inspectObjectByInternalId:function(z){if(this._consoleWindow!=null){this._consoleWindow.inspectObjectByInternalId(z);
}},select:function(c,d){if(this._loading||!c){return;
}this._selectedWidgetLabel.setValue(bi+c.toString()+P);

if(d!=this._selector){if(c!==this._selector.getSelection()){this._selector.setSelection(c);
}}
if(this._objectsWindow!=null&&d!=this._objectsWindow){if(c!=this._objectsWindow.getSelection()){this._objectsWindow.select(c,true);
}}
if(this._widgetsWindow!=null&&d!=this._widgetsWindow){if(c!=this._widgetsWindow.getSelection()){this._widgetsWindow.select(c,true);
}}
if(this._propertyWindow!=null&&d!=this._propertyWindow){if(c!=this._propertyWindow.getSelection()&&this._propertyWindow.getMode()!=D){this._propertyWindow.select(c,true);
}}
if(this._seleniumWindow!=null&&d!=this._seleniumWindow){if(c!=this._seleniumWindow.getSelection()){this._seleniumWindow.select(c,true);
}}this.__qE.setInspected(c);
this._selector.highlightFor(c,1000);
},getIframeWindowObject:function(){return this._loadedWindow;
},getExcludes:function(){if(this._selector!=null){return this._selector.getAddedWidgets();
}else{return [];
}}},destruct:function(){this._loadedWindow=null;
this._disposeObjects(bD,T,bl,bH,bO,G,bG,C,X,ba,Q,br,be,bd,I,J,K,L);
}});
})();
(function(){var d="qx.event.type.Native";
qx.Class.define(d,{extend:qx.event.type.Event,members:{init:function(h,i,j,k,l){qx.event.type.Event.prototype.init.call(this,k,l);
this._target=i||qx.bom.Event.getTarget(h);
this._relatedTarget=j||qx.bom.Event.getRelatedTarget(h);

if(h.timeStamp){this._timeStamp=h.timeStamp;
}this._native=h;
this._returnValue=null;
return this;
},clone:function(a){var b=qx.event.type.Event.prototype.clone.call(this,a);
var c={};
b._native=this._cloneNativeEvent(this._native,c);
b._returnValue=this._returnValue;
return b;
},_cloneNativeEvent:function(e,f){f.preventDefault=qx.lang.Function.empty;
return f;
},preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);
qx.bom.Event.preventDefault(this._native);
},getNativeEvent:function(){return this._native;
},setReturnValue:function(g){this._returnValue=g;
},getReturnValue:function(){return this._returnValue;
}},destruct:function(){this._native=this._returnValue=null;
}});
})();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";
qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(g,h){var k=null;
var n=null;
var q=null;
var r=null;
var m=null;

if(g){k=g.meta.color||null;
n=g.meta.decoration||null;
q=g.meta.font||null;
r=g.meta.icon||null;
m=g.meta.appearance||null;
}var o=qx.theme.manager.Color.getInstance();
var p=qx.theme.manager.Decoration.getInstance();
var i=qx.theme.manager.Font.getInstance();
var l=qx.theme.manager.Icon.getInstance();
var j=qx.theme.manager.Appearance.getInstance();
o.setTheme(k);
p.setTheme(n);
i.setTheme(q);
l.setTheme(r);
j.setTheme(m);
},initialize:function(){var t=qx.core.Setting;
var s,u;
s=t.get(e);

if(s){u=qx.Theme.getByName(s);

if(!u){throw new Error("The theme to use is not available: "+s);
}this.setTheme(u);
}}},settings:{"qx.theme":c}});
})();
(function(){var h="object",g="__dh",f="_applyTheme",e="qx.theme.manager.Decoration",d="Theme",c="changeTheme",b="string",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{__dh:null,resolve:function(o){if(!o){return null;
}
if(typeof o===h){return o;
}var r=this.getTheme();

if(!r){return null;
}var r=this.getTheme();

if(!r){return null;
}var s=this.__dh;

if(!s){s=this.__dh={};
}var p=s[o];

if(p){return p;
}var q=r.decorations[o];

if(!q){return null;
}var t=q.decorator;

if(t==null){throw new Error("Missing definition of which decorator to use in entry: "+o+"!");
}return s[o]=(new t).set(q.style);
},isValidPropertyValue:function(i){if(typeof i===b){return this.isDynamic(i);
}else if(typeof i===h){var j=i.constructor;
return qx.Class.hasInterface(j,qx.ui.decoration.IDecorator);
}return false;
},isDynamic:function(u){if(!u){return false;
}var v=this.getTheme();

if(!v){return false;
}return !!v.decorations[u];
},_applyTheme:function(k,l){var n=qx.util.AliasManager.getInstance();

if(l){for(var m in l.aliases){n.remove(m);
}}
if(k){for(var m in k.aliases){n.add(m,k.aliases[m]);
}}
if(!k){this.__dh={};
}}},destruct:function(){this._disposeMap(g);
}});
})();
(function(){var e="qx.theme.manager.Font",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{resolveDynamic:function(f){var g=this._dynamic;
return f instanceof qx.bom.Font?f:g[f];
},resolve:function(k){var n=this._dynamic;
var l=n[k];

if(l){return l;
}var m=this.getTheme();

if(m!==null&&m.fonts[k]){return n[k]=(new qx.bom.Font).set(m.fonts[k]);
}return k;
},isDynamic:function(o){var q=this._dynamic;

if(o&&(o instanceof qx.bom.Font||q[o]!==undefined)){return true;
}var p=this.getTheme();

if(p!==null&&o&&p.fonts[o]){q[o]=(new qx.bom.Font).set(p.fonts[o]);
return true;
}return false;
},__dj:function(h,i){if(h[i].include){var j=h[h[i].include];
h[i].include=null;
delete h[i].include;
h[i]=qx.lang.Object.mergeWith(h[i],j,false);
this.__dj(h,i);
}},_applyTheme:function(r){var s=this._getDynamic();

for(var v in s){if(s[v].themed){s[v].dispose();
delete s[v];
}}
if(r){var t=r.fonts;
var u=qx.bom.Font;

for(var v in t){if(t[v].include&&t[t[v].include]){this.__dj(t,v);
}s[v]=(new u).set(t[v]);
s[v].themed=true;
}}this._setDynamic(s);
}}});
})();
(function(){var n="",m="underline",k="Boolean",j="px",h='"',g="italic",f="normal",e="bold",d="_applyItalic",c="_applyBold",z="Integer",y="_applyFamily",x="_applyLineHeight",w="Array",v="overline",u="line-through",t="qx.bom.Font",s="Number",r="_applyDecoration",q=" ",o="_applySize",p=",";
qx.Class.define(t,{extend:qx.core.Object,construct:function(E,F){qx.core.Object.call(this);

if(E!==undefined){this.setSize(E);
}
if(F!==undefined){this.setFamily(F);
}},statics:{fromString:function(K){var O=new qx.bom.Font();
var M=K.split(/\s+/);
var name=[];
var N;

for(var i=0;i<M.length;i++){switch(N=M[i]){case e:O.setBold(true);
break;
case g:O.setItalic(true);
break;
case m:O.setDecoration(m);
break;
default:var L=parseInt(N,10);

if(L==N||qx.lang.String.contains(N,j)){O.setSize(L);
}else{name.push(N);
}break;
}}
if(name.length>0){O.setFamily(name);
}return O;
},fromConfig:function(G){var H=new qx.bom.Font;
H.set(G);
return H;
},__dk:{fontFamily:n,fontSize:n,fontWeight:n,fontStyle:n,textDecoration:n,lineHeight:1.2},getDefaultStyles:function(){return this.__dk;
}},properties:{size:{check:z,nullable:true,apply:o},lineHeight:{check:s,nullable:true,apply:x},family:{check:w,nullable:true,apply:y},bold:{check:k,nullable:true,apply:c},italic:{check:k,nullable:true,apply:d},decoration:{check:[m,u,v],nullable:true,apply:r}},members:{__dl:null,__dm:null,__dn:null,__do:null,__dp:null,__dq:null,_applySize:function(a,b){this.__dl=a===null?null:a+j;
},_applyLineHeight:function(I,J){this.__dq=I===null?null:I;
},_applyFamily:function(R,S){var T=n;

for(var i=0,l=R.length;i<l;i++){if(R[i].indexOf(q)>0){T+=h+R[i]+h;
}else{T+=R[i];
}
if(i!==l-1){T+=p;
}}this.__dm=T;
},_applyBold:function(C,D){this.__dn=C===null?null:C?e:f;
},_applyItalic:function(P,Q){this.__do=P===null?null:P?g:f;
},_applyDecoration:function(A,B){this.__dp=A===null?null:A;
},getStyles:function(){return {fontFamily:this.__dm,fontSize:this.__dl,fontWeight:this.__dn,fontStyle:this.__do,textDecoration:this.__dp,lineHeight:this.__dq};
}}});
})();
(function(){var c="qx.lang.Object";
qx.Class.define(c,{statics:{empty:function(g){{};

for(var h in g){if(g.hasOwnProperty(h)){delete g[h];
}}},isEmpty:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(J){{};
return J.__count__===0;
}:
function(C){{};

for(var D in C){return false;
}return true;
},hasMinLength:(qx.bom.client.Feature.ECMA_OBJECT_COUNT)?
function(y,z){{};
return y.__count__>=z;
}:
function(j,k){{};

if(k<=0){return true;
}var length=0;

for(var m in j){if((++length)>=k){return true;
}}return false;
},getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(d){{};
var f=[];
var e=this.getKeys(d);

for(var i=0,l=e.length;i<l;i++){f.push(d[e[i]]);
}return f;
},mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(A,B){{};
return qx.lang.Object.mergeWith(A,B,false);
},merge:function(t,u){{};
var v=arguments.length;

for(var i=1;i<v;i++){qx.lang.Object.mergeWith(t,arguments[i]);
}return t;
},clone:function(n){{};
var o={};

for(var p in n){o[p]=n[p];
}return o;
},invert:function(E){{};
var F={};

for(var G in E){F[E[G].toString()]=G;
}return F;
},getKeyFromValue:function(q,r){{};

for(var s in q){if(q.hasOwnProperty(s)&&q[s]===r){return s;
}}return null;
},contains:function(H,I){{};
return this.getKeyFromValue(H,I)!==null;
},select:function(a,b){{};
return b[a];
},fromArray:function(w){{};
var x={};

for(var i=0,l=w.length;i<l;i++){{};
x[w[i].toString()]=true;
}return x;
}}});
})();
(function(){var e="qx.theme.manager.Icon",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";
qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();

if(g){for(var h in g.aliases){i.remove(h);
}}
if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);
}}}}});
})();
(function(){var h="string",g="_applyTheme",f="qx.theme.manager.Appearance",e=":",d="Theme",c="changeTheme",b="/",a="singleton";
qx.Class.define(f,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__dt={};
this.__du={};
},properties:{theme:{check:d,nullable:true,event:c,apply:g}},members:{__dv:{},__dt:null,__du:null,_applyTheme:function(t,u){this.__du={};
this.__dt={};
},__dw:function(i,j,k){var o=j.appearances;
var r=o[i];

if(!r){var s=b;
var l=[];
var q=i.split(s);
var p;

while(!r&&q.length>0){l.unshift(q.pop());
var m=q.join(s);
r=o[m];

if(r){p=r.alias||r;

if(typeof p===h){var n=p+s+l.join(s);
return this.__dw(n,j,k);
}}}if(k!=null){return this.__dw(k,j);
}return null;
}else if(typeof r===h){return this.__dw(r,j,k);
}else if(r.include&&!r.style){return this.__dw(r.include,j,k);
}return i;
},styleFrom:function(v,w,x,y){if(!x){x=this.getTheme();
}var E=this.__du;
var z=E[v];

if(!z){z=E[v]=this.__dw(v,x,y);
}var J=x.appearances[z];

if(!J){this.warn("Missing appearance: "+v);
return null;
}if(!J.style){return null;
}var K=z;

if(w){var L=J.$$bits;

if(!L){L=J.$$bits={};
J.$$length=0;
}var C=0;

for(var F in w){if(!w[F]){continue;
}
if(L[F]==null){L[F]=1<<J.$$length++;
}C+=L[F];
}if(C>0){K+=e+C;
}}var D=this.__dt;

if(D[K]!==undefined){return D[K];
}if(!w){w=this.__dv;
}var H;
if(J.include||J.base){var B=J.style(w);
var A;

if(J.include){A=this.styleFrom(J.include,w,x,y);
}H={};
if(J.base){var G=this.styleFrom(z,w,J.base,y);

if(J.include){for(var I in G){if(!A.hasOwnProperty(I)&&!B.hasOwnProperty(I)){H[I]=G[I];
}}}else{for(var I in G){if(!B.hasOwnProperty(I)){H[I]=G[I];
}}}}if(J.include){for(var I in A){if(!B.hasOwnProperty(I)){H[I]=A[I];
}}}for(var I in B){H[I]=B[I];
}}else{H=J.style(w);
}return D[K]=H||null;
}},destruct:function(){this.__dt=this.__du=null;
}});
})();
(function(){var v="Boolean",u="focusout",t="interval",s="mouseover",r="mouseout",q="mousemove",p="widget",o="Use isShowInvalidToolTips() instead.",n="qx.ui.tooltip.ToolTip",m="Use setShowInvalidToolTips() instead.",f="__dG",l="Use initShowInvalidToolTips() instead.",i="Use resetShowInvalidToolTips() instead.",c="_applyCurrent",b="qx.ui.tooltip.Manager",h="__dF",g="__dI",j="tooltip-error",a="Use toggleShowInvalidToolTips() instead.",k="singleton",d="Use getShowInvalidToolTips() instead.";
qx.Class.define(b,{type:k,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
qx.event.Registration.addListener(document.body,s,this.__dP,this,true);
this.__dF=new qx.event.Timer();
this.__dF.addListener(t,this.__dM,this);
this.__dG=new qx.event.Timer();
this.__dG.addListener(t,this.__dN,this);
this.__dH={left:0,top:0};
},properties:{current:{check:n,nullable:true,apply:c},showInvalidToolTips:{check:v,init:true},showToolTips:{check:v,init:true}},members:{__dH:null,__dG:null,__dF:null,__dI:null,__dJ:null,__dK:function(){if(!this.__dI){this.__dI=new qx.ui.tooltip.ToolTip().set({rich:true});
}return this.__dI;
},__dL:function(){if(!this.__dJ){this.__dJ=new qx.ui.tooltip.ToolTip().set({appearance:j});
this.__dJ.syncAppearance();
}return this.__dJ;
},_applyCurrent:function(x,y){if(y&&qx.ui.core.Widget.contains(y,x)){return;
}if(y){if(!y.isDisposed()){y.exclude();
}this.__dF.stop();
this.__dG.stop();
}var A=qx.event.Registration;
var z=document.body;
if(x){this.__dF.startWith(x.getShowTimeout());
A.addListener(z,r,this.__dQ,this,true);
A.addListener(z,u,this.__dR,this,true);
A.addListener(z,q,this.__dO,this,true);
}else{A.removeListener(z,r,this.__dQ,this,true);
A.removeListener(z,u,this.__dR,this,true);
A.removeListener(z,q,this.__dO,this,true);
}},__dM:function(e){var D=this.getCurrent();

if(D&&!D.isDisposed()){this.__dG.startWith(D.getHideTimeout());

if(D.getPlaceMethod()==p){D.placeToWidget(D.getOpener());
}else{D.placeToPoint(this.__dH);
}D.show();
}this.__dF.stop();
},__dN:function(e){var C=this.getCurrent();

if(C&&!C.isDisposed()){C.exclude();
}this.__dG.stop();
this.resetCurrent();
},__dO:function(e){var w=this.__dH;
w.left=e.getDocumentLeft();
w.top=e.getDocumentTop();
},__dP:function(e){var G=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!G){return;
}var H,I,F,E;
while(G!=null){H=G.getToolTip();
I=G.getToolTipText()||null;
F=G.getToolTipIcon()||null;

if(qx.Class.hasInterface(G.constructor,qx.ui.form.IForm)&&!G.isValid()){E=G.getInvalidMessage();
}
if(H||I||F||E){break;
}G=G.getLayoutParent();
}if(!G||
!G.getEnabled()||
G.isBlockToolTip()||
(!E&&!this.getShowToolTips())||(E&&!this.getShowInvalidToolTips())){return;
}
if(E){H=this.__dL().set({label:E});
}
if(!H){H=this.__dK().set({label:I,icon:F});
}this.setCurrent(H);
H.setOpener(G);
},__dQ:function(e){var J=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!J){return;
}var K=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

if(!K){return;
}var L=this.getCurrent();
if(L&&(K==L||qx.ui.core.Widget.contains(L,K))){return;
}if(K&&J&&qx.ui.core.Widget.contains(J,K)){return;
}if(L&&!K){this.setCurrent(null);
}else{this.resetCurrent();
}},__dR:function(e){var M=qx.ui.core.Widget.getWidgetByElement(e.getTarget());

if(!M){return;
}var N=this.getCurrent();
if(N&&N==M.getToolTip()){this.setCurrent(null);
}},setShowInvalidTooltips:function(B){qx.log.Logger.deprecatedMethodWarning(arguments.callee,m);
return this.setShowInvalidToolTips(B);
},getShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,d);
return this.getShowInvalidToolTips();
},resetShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,i);
return this.resetShowInvalidToolTips();
},isShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
return this.isShowInvalidToolTips();
},toggleShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,a);
return this.toggleShowInvalidToolTips();
},initShowInvalidTooltips:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,l);
return this.initShowInvalidToolTips();
}},destruct:function(){qx.event.Registration.removeListener(document.body,s,this.__dP,this,true);
this._disposeObjects(h,f,g);
this.__dH=null;
}});
})();
(function(){var j="interval",i="qx.event.Timer",h="_applyInterval",g="_applyEnabled",f="Boolean",d="qx.event.type.Event",c="Integer";
qx.Class.define(i,{extend:qx.core.Object,construct:function(o){qx.core.Object.call(this);
this.setEnabled(false);

if(o!=null){this.setInterval(o);
}var self=this;
this.__dS=function(){self._oninterval.call(self);
};
},events:{"interval":d},statics:{once:function(k,l,m){var n=new qx.event.Timer(m);
n.__dT=k;
n.addListener(j,function(e){n.stop();
k.call(l,e);
n.dispose();
l=null;
},l);
n.start();
return n;
}},properties:{enabled:{init:true,check:f,apply:g},interval:{check:c,init:1000,apply:h}},members:{__dU:null,__dS:null,_applyInterval:function(a,b){if(this.getEnabled()){this.restart();
}},_applyEnabled:function(q,r){if(r){window.clearInterval(this.__dU);
this.__dU=null;
}else if(q){this.__dU=window.setInterval(this.__dS,this.getInterval());
}},start:function(){this.setEnabled(true);
},startWith:function(p){this.setInterval(p);
this.start();
},stop:function(){this.setEnabled(false);
},restart:function(){this.stop();
this.start();
},restartWith:function(s){this.stop();
this.startWith(s);
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;
}
if(this.getEnabled()){this.fireEvent(j);
}})},destruct:function(){if(this.__dU){window.clearInterval(this.__dU);
}this.__dU=this.__dS=null;
}});
})();
(function(){var a="qx.ui.core.MChildrenHandling";
qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();
},hasChildren:function(){return this._hasChildren();
},indexOf:function(p){return this._indexOf(p);
},add:function(b,c){this._add(b,c);
},addAt:function(m,n,o){this._addAt(m,n,o);
},addBefore:function(h,i,j){this._addBefore(h,i,j);
},addAfter:function(e,f,g){this._addAfter(e,f,g);
},remove:function(k){this._remove(k);
},removeAt:function(l){return this._removeAt(l);
},removeAll:function(){this._removeAll();
}},statics:{remap:function(d){d.getChildren=d._getChildren;
d.hasChildren=d._hasChildren;
d.indexOf=d._indexOf;
d.add=d._add;
d.addAt=d._addAt;
d.addBefore=d._addBefore;
d.addAfter=d._addAfter;
d.remove=d._remove;
d.removeAt=d._removeAt;
d.removeAll=d._removeAll;
}}});
})();
(function(){var a="qx.ui.core.MLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);
},getLayout:function(){return this._getLayout();
}},statics:{remap:function(c){c.getLayout=c._getLayout;
c.setLayout=c._setLayout;
}}});
})();
(function(){var t="Integer",s="_applyDimension",r="Boolean",q="_applyStretching",p="_applyMargin",o="shorthand",n="_applyAlign",m="allowShrinkY",l="bottom",k="baseline",H="marginBottom",G="qx.ui.core.LayoutItem",F="center",E="marginTop",D="allowGrowX",C="middle",B="marginLeft",A="allowShrinkX",z="top",y="right",w="marginRight",x="abstract",u="allowGrowY",v="left";
qx.Class.define(G,{type:x,extend:qx.core.Object,properties:{minWidth:{check:t,nullable:true,apply:s,init:null,themeable:true},width:{check:t,nullable:true,apply:s,init:null,themeable:true},maxWidth:{check:t,nullable:true,apply:s,init:null,themeable:true},minHeight:{check:t,nullable:true,apply:s,init:null,themeable:true},height:{check:t,nullable:true,apply:s,init:null,themeable:true},maxHeight:{check:t,nullable:true,apply:s,init:null,themeable:true},allowGrowX:{check:r,apply:q,init:true,themeable:true},allowShrinkX:{check:r,apply:q,init:true,themeable:true},allowGrowY:{check:r,apply:q,init:true,themeable:true},allowShrinkY:{check:r,apply:q,init:true,themeable:true},allowStretchX:{group:[D,A],mode:o,themeable:true},allowStretchY:{group:[u,m],mode:o,themeable:true},marginTop:{check:t,init:0,apply:p,themeable:true},marginRight:{check:t,init:0,apply:p,themeable:true},marginBottom:{check:t,init:0,apply:p,themeable:true},marginLeft:{check:t,init:0,apply:p,themeable:true},margin:{group:[E,w,H,B],mode:o,themeable:true},alignX:{check:[v,F,y],nullable:true,apply:n,themeable:true},alignY:{check:[z,C,l,k],nullable:true,apply:n,themeable:true}},members:{__dV:null,__dW:null,__dX:null,__dY:null,__ea:null,__eb:null,__ec:null,getBounds:function(){return this.__eb||this.__dW||null;
},clearSeparators:function(){},renderSeparator:function(O,P){},renderLayout:function(S,top,T,U){var V;
{};
var W=null;

if(this.getHeight()==null&&this._hasHeightForWidth()){var W=this._getHeightForWidth(T);
}
if(W!=null&&W!==this.__dV){this.__dV=W;
qx.ui.core.queue.Layout.add(this);
return null;
}var Y=this.__dW;

if(!Y){Y=this.__dW={};
}var X={};

if(S!==Y.left||top!==Y.top){X.position=true;
Y.left=S;
Y.top=top;
}
if(T!==Y.width||U!==Y.height){X.size=true;
Y.width=T;
Y.height=U;
}if(this.__dX){X.local=true;
delete this.__dX;
}
if(this.__ea){X.margin=true;
delete this.__ea;
}return X;
},isExcluded:function(){return false;
},hasValidLayout:function(){return !this.__dX;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutCache:function(){this.__dX=true;
this.__dY=null;
},getSizeHint:function(ba){var bb=this.__dY;

if(bb){return bb;
}
if(ba===false){return null;
}bb=this.__dY=this._computeSizeHint();
if(this._hasHeightForWidth()&&this.__dV&&this.getHeight()==null){bb.height=this.__dV;
}if(bb.minWidth>bb.width){bb.width=bb.minWidth;
}
if(bb.maxWidth<bb.width){bb.width=bb.maxWidth;
}
if(!this.getAllowGrowX()){bb.maxWidth=bb.width;
}
if(!this.getAllowShrinkX()){bb.minWidth=bb.width;
}if(bb.minHeight>bb.height){bb.height=bb.minHeight;
}
if(bb.maxHeight<bb.height){bb.height=bb.maxHeight;
}
if(!this.getAllowGrowY()){bb.maxHeight=bb.height;
}
if(!this.getAllowShrinkY()){bb.minHeight=bb.height;
}return bb;
},_computeSizeHint:function(){var f=this.getMinWidth()||0;
var c=this.getMinHeight()||0;
var g=this.getWidth()||f;
var e=this.getHeight()||c;
var b=this.getMaxWidth()||Infinity;
var d=this.getMaxHeight()||Infinity;
return {minWidth:f,width:g,maxWidth:b,minHeight:c,height:e,maxHeight:d};
},_hasHeightForWidth:function(){var a=this._getLayout();

if(a){return a.hasHeightForWidth();
}return false;
},_getHeightForWidth:function(Q){var R=this._getLayout();

if(R&&R.hasHeightForWidth()){return R.getHeightForWidth(Q);
}return null;
},_getLayout:function(){return null;
},_applyMargin:function(){this.__ea=true;
var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyAlign:function(){var parent=this.$$parent;

if(parent){parent.updateLayoutProperties();
}},_applyDimension:function(){qx.ui.core.queue.Layout.add(this);
},_applyStretching:function(){qx.ui.core.queue.Layout.add(this);
},hasUserBounds:function(){return !!this.__eb;
},setUserBounds:function(h,top,i,j){this.__eb={left:h,top:top,width:i,height:j};
qx.ui.core.queue.Layout.add(this);
},resetUserBounds:function(){delete this.__eb;
qx.ui.core.queue.Layout.add(this);
},__ed:{},setLayoutProperties:function(L){if(L==null){return;
}var M=this.__ec;

if(!M){M=this.__ec={};
}var parent=this.getLayoutParent();

if(parent){parent.updateLayoutProperties(L);
}for(var N in L){if(L[N]==null){delete M[N];
}else{M[N]=L[N];
}}},getLayoutProperties:function(){return this.__ec||this.__ed;
},clearLayoutProperties:function(){delete this.__ec;
},updateLayoutProperties:function(I){var J=this._getLayout();

if(J){var K;
{};
J.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();
},getLayoutParent:function(){return this.$$parent||null;
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}this.$$parent=parent||null;
qx.ui.core.queue.Visibility.add(this);
},isRootWidget:function(){return false;
},_getRoot:function(){var parent=this;

while(parent){if(parent.isRootWidget()){return parent;
}parent=parent.$$parent;
}return null;
},clone:function(){var bc=qx.core.Object.prototype.clone.call(this);
var bd=this.__ec;

if(bd){bc.__ec=qx.lang.Object.clone(bd);
}return bc;
}},destruct:function(){this.$$parent=this.$$subparent=this.__ec=this.__dW=this.__eb=this.__dY=null;
}});
})();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__ee={};
},statics:{MAX_SIZE:15,__ef:a},members:{__ee:null,getDecoratorElement:function(j){var o=qx.ui.core.DecoratorFactory;

if(qx.lang.Type.isString(j)){var m=j;
var l=qx.theme.manager.Decoration.getInstance().resolve(j);
}else{var m=o.__ef;
l=j;
}var n=this.__ee;

if(n[m]&&n[m].length>0){var k=n[m].pop();
}else{var k=this._createDecoratorElement(l,m);
}k.$$pooled=false;
return k;
},poolDecorator:function(f){if(!f||f.$$pooled||f.isDisposed()){return;
}var i=qx.ui.core.DecoratorFactory;
var g=f.getId();

if(g==i.__ef){f.dispose();
return;
}var h=this.__ee;

if(!h[g]){h[g]=[];
}
if(h[g].length>i.MAX_SIZE){f.dispose();
}else{f.$$pooled=true;
h[g].push(f);
}},_createDecoratorElement:function(c,d){var e=new qx.html.Decorator(c,d);
{};
return e;
},toString:function(){return qx.core.Object.prototype.toString.call(this);
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var q=this.__ee;

for(var p in q){qx.util.DisposeUtil.disposeArray(q,p);
}}this.__ee=null;
}});
})();
(function(){var bU="px",bT="Boolean",bS="qx.event.type.Mouse",bR="qx.event.type.Drag",bQ="visible",bP="qx.event.type.Focus",bO="on",bN="Integer",bM="excluded",bL="qx.event.type.Data",bx="_applyPadding",bw="qx.event.type.Event",bv="hidden",bu="contextmenu",bt="String",bs="tabIndex",br="backgroundColor",bq="focused",bp="changeVisibility",bo="mshtml",cc="hovered",cd="qx.event.type.KeySequence",ca="qx.client",cb="absolute",bX="drag",bY="div",bV="disabled",bW="move",ce="dragstart",cf="qx.dynlocale",bE="dragchange",bD="dragend",bG="resize",bF="Decorator",bI="zIndex",bH="opacity",bK="default",bJ="Color",bC="changeToolTipText",bB="beforeContextmenuOpen",c="_applyNativeContextMenu",d="_applyBackgroundColor",f="_applyFocusable",g="changeShadow",h="qx.event.type.KeyInput",j="createChildControl",k="Font",m="_applyShadow",n="_applyEnabled",o="_applySelectable",cj="Number",ci="_applyKeepActive",ch="__er",cg="_applyVisibility",cn="__eg",cm="repeat",cl="qxDraggable",ck="syncAppearance",cp="paddingLeft",co="_applyDroppable",N="__eh",O="#",L="qx.event.type.MouseWheel",M="_applyCursor",R="_applyDraggable",S="changeTextColor",P="$$widget",Q="changeContextMenu",J="paddingTop",K="changeSelectable",w="hideFocus",v="none",y="outline",x="__ep",s="_applyAppearance",r="_applyOpacity",u="url(",t=")",q="qx.ui.core.Widget",p="_applyFont",X="cursor",Y="qxDroppable",ba="changeZIndex",bb="changeEnabled",T="changeFont",U="_applyDecorator",V="_applyZIndex",W="__ek",bc="_applyTextColor",bd="qx.ui.menu.Menu",G="__em",F="_applyToolTipText",E="true",D="widget",C="changeDecorator",B="_applyTabIndex",A="changeAppearance",z="__el",I="shorthand",H="/",be="",bf="_applyContextMenu",bg="paddingBottom",bh="changeNativeContextMenu",bi="qx.ui.tooltip.ToolTip",bj="qxKeepActive",bk="_applyKeepFocus",bl="paddingRight",bm="changeBackgroundColor",bn="changeLocale",bA="qxKeepFocus",bz="__et",by="qx/static/blank.gif";
qx.Class.define(q,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);
this.__eg=this._createContainerElement();
this.__eh=this.__es();
this.__eg.add(this.__eh);
this.initFocusable();
this.initSelectable();
this.initNativeContextMenu();
},events:{appear:bw,disappear:bw,createChildControl:bL,resize:bL,move:bL,syncAppearance:bL,mousemove:bS,mouseover:bS,mouseout:bS,mousedown:bS,mouseup:bS,click:bS,dblclick:bS,contextmenu:bS,beforeContextmenuOpen:bS,mousewheel:L,keyup:cd,keydown:cd,keypress:cd,keyinput:h,focus:bP,blur:bP,focusin:bP,focusout:bP,activate:bP,deactivate:bP,capture:bw,losecapture:bw,drop:bR,dragleave:bR,dragover:bR,drag:bR,dragstart:bR,dragend:bR,dragchange:bR,droprequest:bR},properties:{paddingTop:{check:bN,init:0,apply:bx,themeable:true},paddingRight:{check:bN,init:0,apply:bx,themeable:true},paddingBottom:{check:bN,init:0,apply:bx,themeable:true},paddingLeft:{check:bN,init:0,apply:bx,themeable:true},padding:{group:[J,bl,bg,cp],mode:I,themeable:true},zIndex:{nullable:true,init:null,apply:V,event:ba,check:bN,themeable:true},decorator:{nullable:true,init:null,apply:U,event:C,check:bF,themeable:true},shadow:{nullable:true,init:null,apply:m,event:g,check:bF,themeable:true},backgroundColor:{nullable:true,check:bJ,apply:d,event:bm,themeable:true},textColor:{nullable:true,check:bJ,apply:bc,event:S,themeable:true,inheritable:true},font:{nullable:true,apply:p,check:k,event:T,themeable:true,inheritable:true,dereference:true},opacity:{check:cj,apply:r,themeable:true,nullable:true,init:null},cursor:{check:bt,apply:M,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:bi,nullable:true},toolTipText:{check:bt,nullable:true,event:bC,apply:F},toolTipIcon:{check:bt,nullable:true,event:bC},blockToolTip:{check:bT,init:false},visibility:{check:[bQ,bv,bM],init:bQ,apply:cg,event:bp},enabled:{init:true,check:bT,inheritable:true,apply:n,event:bb},anonymous:{init:false,check:bT},tabIndex:{check:bN,nullable:true,apply:B},focusable:{check:bT,init:false,apply:f},keepFocus:{check:bT,init:false,apply:bk},keepActive:{check:bT,init:false,apply:ci},draggable:{check:bT,init:false,apply:R},droppable:{check:bT,init:false,apply:co},selectable:{check:bT,init:false,event:K,apply:o},contextMenu:{check:bd,apply:bf,nullable:true,event:Q},nativeContextMenu:{check:bT,init:false,themeable:true,event:bh,apply:c},appearance:{check:bt,init:D,apply:s,event:A}},statics:{DEBUG:false,getWidgetByElement:function(fd){while(fd){var fe=fd.$$widget;
if(fe!=null){return qx.core.ObjectRegistry.fromHashCode(fe);
}try{fd=fd.parentNode;
}catch(e){return null;
}}return null;
},contains:function(parent,fs){while(fs){if(parent==fs){return true;
}fs=fs.getLayoutParent();
}return false;
},__ei:new qx.ui.core.DecoratorFactory(),__ej:new qx.ui.core.DecoratorFactory()},members:{__eg:null,__eh:null,__ek:null,__el:null,__em:null,__en:null,__eo:null,__ep:null,_getLayout:function(){return this.__ep;
},_setLayout:function(ek){{};

if(this.__ep){this.__ep.connectToWidget(null);
}
if(ek){ek.connectToWidget(this);
}this.__ep=ek;
qx.ui.core.queue.Layout.add(this);
},setLayoutParent:function(parent){if(this.$$parent===parent){return;
}var gD=this.getContainerElement();

if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(gD);
}this.$$parent=parent||null;

if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(gD);
}this.$$refreshInheritables();
qx.ui.core.queue.Visibility.add(this);
},_updateInsets:null,__eq:function(a,b){if(a==b){return false;
}
if(a==null||b==null){return true;
}var ft=qx.theme.manager.Decoration.getInstance();
var fv=ft.resolve(a).getInsets();
var fu=ft.resolve(b).getInsets();

if(fv.top!=fu.top||fv.right!=fu.right||fv.bottom!=fu.bottom||fv.left!=fu.left){return true;
}return false;
},renderLayout:function(eJ,top,eK,eL){var eU=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,eJ,top,eK,eL);
if(!eU){return;
}var eN=this.getContainerElement();
var content=this.getContentElement();
var eR=eU.size||this._updateInsets;
var eV=bU;
var eS={};
if(eU.position){eS.left=eJ+eV;
eS.top=top+eV;
}if(eU.size){eS.width=eK+eV;
eS.height=eL+eV;
}
if(eU.position||eU.size){eN.setStyles(eS);
}
if(eR||eU.local||eU.margin){var eM=this.getInsets();
var innerWidth=eK-eM.left-eM.right;
var innerHeight=eL-eM.top-eM.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var eP={};

if(this._updateInsets){eP.left=eM.left+eV;
eP.top=eM.top+eV;
}
if(eR){eP.width=innerWidth+eV;
eP.height=innerHeight+eV;
}
if(eR||this._updateInsets){content.setStyles(eP);
}
if(eU.size){var eT=this.__em;

if(eT){eT.setStyles({width:eK+bU,height:eL+bU});
}}
if(eU.size||this._updateInsets){if(this.__ek){this.__ek.resize(eK,eL);
}}
if(eU.size){if(this.__el){var eM=this.__el.getInsets();
var eQ=eK+eM.left+eM.right;
var eO=eL+eM.top+eM.bottom;
this.__el.resize(eQ,eO);
}}
if(eR||eU.local||eU.margin){if(this.__ep&&this.hasLayoutChildren()){this.__ep.renderLayout(innerWidth,innerHeight);
}else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");
}}if(eU.position&&this.hasListener(bW)){this.fireDataEvent(bW,this.getBounds());
}
if(eU.size&&this.hasListener(bG)){this.fireDataEvent(bG,this.getBounds());
}delete this._updateInsets;
return eU;
},__er:null,clearSeparators:function(){var fG=this.__er;

if(!fG){return;
}var fH=qx.ui.core.Widget.__ei;
var content=this.getContentElement();
var fF;

for(var i=0,l=fG.length;i<l;i++){fF=fG[i];
fH.poolDecorator(fF);
content.remove(fF);
}fG.length=0;
},renderSeparator:function(ga,gb){var gc=qx.ui.core.Widget.__ei.getDecoratorElement(ga);
this.getContentElement().add(gc);
gc.resize(gb.width,gb.height);
gc.setStyles({left:gb.left+bU,top:gb.top+bU});
if(!this.__er){this.__er=[gc];
}else{this.__er.push(gc);
}},_computeSizeHint:function(){var fV=this.getWidth();
var fU=this.getMinWidth();
var fQ=this.getMaxWidth();
var fT=this.getHeight();
var fR=this.getMinHeight();
var fS=this.getMaxHeight();
{};
var fW=this._getContentHint();
var fP=this.getInsets();
var fY=fP.left+fP.right;
var fX=fP.top+fP.bottom;

if(fV==null){fV=fW.width+fY;
}
if(fT==null){fT=fW.height+fX;
}
if(fU==null){fU=fY;

if(fW.minWidth!=null){fU+=fW.minWidth;
}}
if(fR==null){fR=fX;

if(fW.minHeight!=null){fR+=fW.minHeight;
}}
if(fQ==null){if(fW.maxWidth==null){fQ=Infinity;
}else{fQ=fW.maxWidth+fY;
}}
if(fS==null){if(fW.maxHeight==null){fS=Infinity;
}else{fS=fW.maxHeight+fX;
}}return {width:fV,minWidth:fU,maxWidth:fQ,height:fT,minHeight:fR,maxHeight:fS};
},invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);

if(this.__ep){this.__ep.invalidateLayoutCache();
}},_getContentHint:function(){var dt=this.__ep;

if(dt){if(this.hasLayoutChildren()){var ds;
var du=dt.getSizeHint();
{};
return du;
}else{return {width:0,height:0};
}}else{return {width:100,height:50};
}},_getHeightForWidth:function(ey){var eC=this.getInsets();
var eF=eC.left+eC.right;
var eE=eC.top+eC.bottom;
var eD=ey-eF;
var eA=this._getLayout();

if(eA&&eA.hasHeightForWidth()){var ez=eA.getHeightForWidth(ey);
}else{ez=this._getContentHeightForWidth(eD);
}var eB=ez+eE;
return eB;
},_getContentHeightForWidth:function(fk){throw new Error("Abstract method call: _getContentHeightForWidth()!");
},getInsets:function(){var top=this.getPaddingTop();
var cz=this.getPaddingRight();
var cB=this.getPaddingBottom();
var cA=this.getPaddingLeft();

if(this.__ek){var cy=this.__ek.getInsets();
{};
top+=cy.top;
cz+=cy.right;
cB+=cy.bottom;
cA+=cy.left;
}return {"top":top,"right":cz,"bottom":cB,"left":cA};
},getInnerSize:function(){var cJ=this.getBounds();

if(!cJ){return null;
}var cI=this.getInsets();
return {width:cJ.width-cI.left-cI.right,height:cJ.height-cI.top-cI.bottom};
},show:function(){this.setVisibility(bQ);
},hide:function(){this.setVisibility(bv);
},exclude:function(){this.setVisibility(bM);
},isVisible:function(){return this.getVisibility()===bQ;
},isHidden:function(){return this.getVisibility()!==bQ;
},isExcluded:function(){return this.getVisibility()===bM;
},isSeeable:function(){var dn=this.getContainerElement().getDomElement();

if(dn){return dn.offsetWidth>0;
}var dm=this;

do{if(!dm.isVisible()){return false;
}
if(dm.isRootWidget()){return true;
}dm=dm.getLayoutParent();
}while(dm);
return false;
},_createContainerElement:function(){var gj={"$$widget":this.toHashCode()};
{};
var gi={zIndex:0,position:cb};
return new qx.html.Element(bY,gi,gj);
},__es:function(){var gG=this._createContentElement();
{};
gG.setStyles({"position":cb,"zIndex":10});
return gG;
},_createContentElement:function(){return new qx.html.Element(bY,{overflowX:bv,overflowY:bv});
},getContainerElement:function(){return this.__eg;
},getContentElement:function(){return this.__eh;
},getDecoratorElement:function(){return this.__ek||null;
},getShadowElement:function(){return this.__el||null;
},__et:null,getLayoutChildren:function(){var cL=this.__et;

if(!cL){return this.__eu;
}var cM;

for(var i=0,l=cL.length;i<l;i++){var cK=cL[i];

if(cK.hasUserBounds()||cK.isExcluded()){if(cM==null){cM=cL.concat();
}qx.lang.Array.remove(cM,cK);
}}return cM||cL;
},scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);
},invalidateLayoutChildren:function(){var gH=this.__ep;

if(gH){gH.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
},hasLayoutChildren:function(){var gm=this.__et;

if(!gm){return false;
}var gn;

for(var i=0,l=gm.length;i<l;i++){gn=gm[i];

if(!gn.hasUserBounds()&&!gn.isExcluded()){return true;
}}return false;
},getChildrenContainer:function(){return this;
},__eu:[],_getChildren:function(){return this.__et||this.__eu;
},_indexOf:function(cs){var ct=this.__et;

if(!ct){return -1;
}return ct.indexOf(cs);
},_hasChildren:function(){var gN=this.__et;
return gN!=null&&(!!gN[0]);
},addChildrenToQueue:function(er){var es=this.__et;

if(!es){return;
}var et;

for(var i=0,l=es.length;i<l;i++){et=es[i];
er[et.$$hash]=et;
et.addChildrenToQueue(er);
}},_add:function(dR,dS){if(dR.getLayoutParent()==this){qx.lang.Array.remove(this.__et,dR);
}
if(this.__et){this.__et.push(dR);
}else{this.__et=[dR];
}this.__ev(dR,dS);
},_addAt:function(go,gp,gq){if(!this.__et){this.__et=[];
}if(go.getLayoutParent()==this){qx.lang.Array.remove(this.__et,go);
}var gr=this.__et[gp];

if(gr===go){return go.setLayoutProperties(gq);
}
if(gr){qx.lang.Array.insertBefore(this.__et,go,gr);
}else{this.__et.push(go);
}this.__ev(go,gq);
},_addBefore:function(gz,gA,gB){{};

if(gz==gA){return;
}
if(!this.__et){this.__et=[];
}if(gz.getLayoutParent()==this){qx.lang.Array.remove(this.__et,gz);
}qx.lang.Array.insertBefore(this.__et,gz,gA);
this.__ev(gz,gB);
},_addAfter:function(fM,fN,fO){{};

if(fM==fN){return;
}
if(!this.__et){this.__et=[];
}if(fM.getLayoutParent()==this){qx.lang.Array.remove(this.__et,fM);
}qx.lang.Array.insertAfter(this.__et,fM,fN);
this.__ev(fM,fO);
},_remove:function(ex){if(!this.__et){throw new Error("This widget has no children!");
}qx.lang.Array.remove(this.__et,ex);
this.__ew(ex);
},_removeAt:function(cq){if(!this.__et){throw new Error("This widget has no children!");
}var cr=this.__et[cq];
qx.lang.Array.removeAt(this.__et,cq);
this.__ew(cr);
return cr;
},_removeAll:function(){if(!this.__et){return;
}var dT=this.__et.concat();
this.__et.length=0;

for(var i=dT.length-1;i>=0;i--){this.__ew(dT[i]);
}qx.ui.core.queue.Layout.add(this);
},_afterAddChild:null,_afterRemoveChild:null,__ev:function(dU,dV){{};
var parent=dU.getLayoutParent();

if(parent&&parent!=this){parent._remove(dU);
}dU.setLayoutParent(this);
if(dV){dU.setLayoutProperties(dV);
}else{this.updateLayoutProperties();
}if(this._afterAddChild){this._afterAddChild(dU);
}},__ew:function(gI){{};

if(gI.getLayoutParent()!==this){throw new Error("Remove Error: "+gI+" is not a child of this widget!");
}gI.setLayoutParent(null);
if(this.__ep){this.__ep.invalidateChildrenCache();
}qx.ui.core.queue.Layout.add(this);
if(this._afterRemoveChild){this._afterRemoveChild(gI);
}},capture:function(dO){this.getContainerElement().capture(dO);
},releaseCapture:function(){this.getContainerElement().releaseCapture();
},_applyPadding:function(dv,dw,name){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
},_createProtectorElement:function(){if(this.__em){return;
}var gL=this.__em=new qx.html.Element;
{};
gL.setStyles({position:cb,top:0,left:0,zIndex:7});
var gM=this.getBounds();

if(gM){this.__em.setStyles({width:gM.width+bU,height:gM.height+bU});
}if(qx.core.Variant.isSet(ca,bo)){gL.setStyles({backgroundImage:u+qx.util.ResourceManager.getInstance().toUri(by)+t,backgroundRepeat:cm});
}this.getContainerElement().add(gL);
},_applyDecorator:function(cS,cT){{};
var cX=qx.ui.core.Widget.__ei;
var cV=this.getContainerElement();
if(!this.__em&&!qx.bom.client.Feature.CSS_POINTER_EVENTS){this._createProtectorElement();
}if(cT){cV.remove(this.__ek);
cX.poolDecorator(this.__ek);
}if(cS){var cW=this.__ek=cX.getDecoratorElement(cS);
cW.setStyle(bI,5);
var cU=this.getBackgroundColor();
cW.tint(cU);
cV.add(cW);
}else{delete this.__ek;
this._applyBackgroundColor(this.getBackgroundColor());
}if(cS&&!cT&&cU){this.getContainerElement().setStyle(br,null);
}if(this.__eq(cT,cS)){this._updateInsets=true;
qx.ui.core.queue.Layout.add(this);
}else if(cS){var cY=this.getBounds();

if(cY){cW.resize(cY.width,cY.height);
this.__em&&
this.__em.setStyles({width:cY.width+bU,height:cY.height+bU});
}}},_applyShadow:function(dF,dG){var dN=qx.ui.core.Widget.__ej;
var dI=this.getContainerElement();
if(dG){dI.remove(this.__el);
dN.poolDecorator(this.__el);
}if(dF){var dK=this.__el=dN.getDecoratorElement(dF);
dI.add(dK);
var dM=dK.getInsets();
dK.setStyles({left:(-dM.left)+bU,top:(-dM.top)+bU});
var dL=this.getBounds();

if(dL){var dJ=dL.width+dM.left+dM.right;
var dH=dL.height+dM.top+dM.bottom;
dK.resize(dJ,dH);
}dK.tint(null);
}else{delete this.__el;
}},_applyToolTipText:function(fp,fq){if(qx.core.Variant.isSet(cf,bO)){if(this.__eo){return;
}var fr=qx.locale.Manager.getInstance();
this.__eo=fr.addListener(bn,function(){if(fp&&fp.translate){this.setToolTipText(fp.translate());
}},this);
}},_applyTextColor:function(dD,dE){},_applyZIndex:function(ff,fg){this.getContainerElement().setStyle(bI,ff==null?0:ff);
},_applyVisibility:function(dy,dz){var dA=this.getContainerElement();

if(dy===bQ){dA.show();
}else{dA.hide();
}var parent=this.$$parent;

if(parent&&(dz==null||dy==null||dz===bM||dy===bM)){parent.invalidateLayoutChildren();
}qx.ui.core.queue.Visibility.add(this);
},_applyOpacity:function(eG,eH){this.getContainerElement().setStyle(bH,eG==1?null:eG);
if(qx.core.Variant.isSet(ca,bo)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var eI=(eG==1||eG==null)?null:0.99;
this.getContentElement().setStyle(bH,eI);
}}},_applyCursor:function(fI,fJ){if(fI==null&&!this.isSelectable()){fI=bK;
}this.getContainerElement().setStyle(X,fI,qx.bom.client.Engine.OPERA);
},_applyBackgroundColor:function(ef,eg){var eh=this.getBackgroundColor();
var ej=this.getContainerElement();

if(this.__ek){this.__ek.tint(eh);
ej.setStyle(br,null);
}else{var ei=qx.theme.manager.Color.getInstance().resolve(eh);
ej.setStyle(br,ei);
}},_applyFont:function(cC,cD){},__ex:null,$$stateChanges:null,_forwardStates:null,hasState:function(dP){var dQ=this.__ex;
return !!dQ&&!!dQ[dP];
},addState:function(em){var en=this.__ex;

if(!en){en=this.__ex={};
}
if(en[em]){return;
}this.__ex[em]=true;
if(em===cc){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var eq=this.__eA;

if(forward&&forward[em]&&eq){var eo;

for(var ep in eq){eo=eq[ep];

if(eo instanceof qx.ui.core.Widget){eq[ep].addState(em);
}}}},removeState:function(cN){var cO=this.__ex;

if(!cO||!cO[cN]){return;
}delete this.__ex[cN];
if(cN===cc){this.syncAppearance();
}else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var cR=this.__eA;

if(forward&&forward[cN]&&cR){for(var cQ in cR){var cP=cR[cQ];

if(cP instanceof qx.ui.core.Widget){cP.removeState(cN);
}}}},replaceState:function(eW,eX){var eY=this.__ex;

if(!eY){eY=this.__ex={};
}
if(!eY[eX]){eY[eX]=true;
}
if(eY[eW]){delete eY[eW];
}
if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;
}else{qx.ui.core.queue.Appearance.add(this);
}var forward=this._forwardStates;
var fc=this.__eA;

if(forward&&forward[eX]&&fc){for(var fb in fc){var fa=fc[fb];

if(fa instanceof qx.ui.core.Widget){fa.replaceState(eW,eX);
}}}},__ey:null,__ez:null,syncAppearance:function(){var dg=this.__ex;
var df=this.__ey;
var dh=qx.theme.manager.Appearance.getInstance();
var dd=qx.core.Property.$$method.setThemed;
var dl=qx.core.Property.$$method.resetThemed;
if(this.__ez){delete this.__ez;
if(df){var dc=dh.styleFrom(df,dg,null,this.getAppearance());
if(dc){df=null;
}}}if(!df){var de=this;
var dk=[];

do{dk.push(de.$$subcontrol||de.getAppearance());
}while(de=de.$$subparent);
df=this.__ey=dk.reverse().join(H).replace(/#[0-9]+/g,be);
}var di=dh.styleFrom(df,dg,null,this.getAppearance());

if(di){var dj;

if(dc){for(var dj in dc){if(di[dj]===undefined){this[dl[dj]]();
}}}{};
for(var dj in di){di[dj]===undefined?this[dl[dj]]():this[dd[dj]](di[dj]);
}}else if(dc){for(var dj in dc){this[dl[dj]]();
}}this.fireDataEvent(ck,this.__ex);
},_applyAppearance:function(fw,fx){this.updateAppearance();
},checkAppearanceNeeds:function(){if(!this.__en){qx.ui.core.queue.Appearance.add(this);
this.__en=true;
}else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);
delete this.$$stateChanges;
}},updateAppearance:function(){this.__ez=true;
qx.ui.core.queue.Appearance.add(this);
var gU=this.__eA;

if(gU){var gS;

for(var gT in gU){gS=gU[gT];

if(gS instanceof qx.ui.core.Widget){gS.updateAppearance();
}}}},syncWidget:function(){},getEventTarget:function(){var fh=this;

while(fh.getAnonymous()){fh=fh.getLayoutParent();

if(!fh){return null;
}}return fh;
},getFocusTarget:function(){var dp=this;

if(!dp.getEnabled()){return null;
}
while(dp.getAnonymous()||!dp.getFocusable()){dp=dp.getLayoutParent();

if(!dp||!dp.getEnabled()){return null;
}}return dp;
},getFocusElement:function(){return this.getContainerElement();
},isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();
},_applyFocusable:function(dY,ea){var eb=this.getFocusElement();
if(dY){var ec=this.getTabIndex();

if(ec==null){ec=1;
}eb.setAttribute(bs,ec);
if(qx.core.Variant.isSet(ca,bo)){eb.setAttribute(w,E);
}else{eb.setStyle(y,v);
}}else{if(eb.isNativelyFocusable()){eb.setAttribute(bs,-1);
}else if(ea){eb.setAttribute(bs,null);
}}},_applyKeepFocus:function(gs){var gt=this.getFocusElement();
gt.setAttribute(bA,gs?bO:null);
},_applyKeepActive:function(eu){var ev=this.getContainerElement();
ev.setAttribute(bj,eu?bO:null);
},_applyTabIndex:function(gC){if(gC==null){gC=1;
}else if(gC<1||gC>32000){throw new Error("TabIndex property must be between 1 and 32000");
}
if(this.getFocusable()&&gC!=null){this.getFocusElement().setAttribute(bs,gC);
}},_applySelectable:function(cu,cv){if(cv!==null){this._applyCursor(this.getCursor());
}this.getContainerElement().setSelectable(cu);
this.getContentElement().setSelectable(cu);
},_applyEnabled:function(da,db){if(da===false){this.addState(bV);
this.removeState(cc);
if(this.isFocusable()){this.removeState(bq);
this._applyFocusable(false,true);
}if(this.isDraggable()){this._applyDraggable(false,true);
}if(this.isDroppable()){this._applyDroppable(false,true);
}}else{this.removeState(bV);
if(this.isFocusable()){this._applyFocusable(true,false);
}if(this.isDraggable()){this._applyDraggable(true,false);
}if(this.isDroppable()){this._applyDroppable(true,false);
}}},_applyNativeContextMenu:function(gJ,gK,name){},_applyContextMenu:function(cG,cH){if(cH){cH.removeState(bu);

if(cH.getOpener()==this){cH.resetOpener();
}
if(!cG){this.removeListener(bu,this._onContextMenuOpen);
cH.removeListener(bp,this._onBeforeContextMenuOpen,this);
}}
if(cG){cG.setOpener(this);
cG.addState(bu);

if(!cH){this.addListener(bu,this._onContextMenuOpen);
cG.addListener(bp,this._onBeforeContextMenuOpen,this);
}}},_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);
e.stop();
},_onBeforeContextMenuOpen:function(e){if(e.getData()==bQ&&this.hasListener(bB)){this.fireDataEvent(bB,e);
}},_onStopEvent:function(e){e.stopPropagation();
},_applyDraggable:function(gk,gl){if(!this.isEnabled()&&gk===true){gk=false;
}qx.ui.core.DragDropCursor.getInstance();
if(gk){this.addListener(ce,this._onDragStart);
this.addListener(bX,this._onDrag);
this.addListener(bD,this._onDragEnd);
this.addListener(bE,this._onDragChange);
}else{this.removeListener(ce,this._onDragStart);
this.removeListener(bX,this._onDrag);
this.removeListener(bD,this._onDragEnd);
this.removeListener(bE,this._onDragChange);
}this.getContainerElement().setAttribute(cl,gk?bO:null);
},_applyDroppable:function(dB,dC){if(!this.isEnabled()&&dB===true){dB=false;
}this.getContainerElement().setAttribute(Y,dB?bO:null);
},_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
this.getApplicationRoot().setGlobalCursor(bK);
},_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);
},_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);
this.getApplicationRoot().resetGlobalCursor();
},_onDragChange:function(e){var dW=qx.ui.core.DragDropCursor.getInstance();
var dX=e.getCurrentAction();
dX?dW.setAction(dX):dW.resetAction();
},visualizeFocus:function(){this.addState(bq);
},visualizeBlur:function(){this.removeState(bq);
},scrollChildIntoView:function(fl,fm,fn,fo){this.scrollChildIntoViewX(fl,fm,fo);
this.scrollChildIntoViewY(fl,fn,fo);
},scrollChildIntoViewX:function(fC,fD,fE){this.getContentElement().scrollChildIntoViewX(fC.getContainerElement(),fD,fE);
},scrollChildIntoViewY:function(gP,gQ,gR){this.getContentElement().scrollChildIntoViewY(gP.getContainerElement(),gQ,gR);
},focus:function(){if(this.isFocusable()){this.getFocusElement().focus();
}else{throw new Error("Widget is not focusable!");
}},blur:function(){if(this.isFocusable()){this.getFocusElement().blur();
}else{throw new Error("Widget is not focusable!");
}},activate:function(){this.getContainerElement().activate();
},deactivate:function(){this.getContainerElement().deactivate();
},tabFocus:function(){this.getFocusElement().focus();
},hasChildControl:function(dx){if(!this.__eA){return false;
}return !!this.__eA[dx];
},__eA:null,_getCreatedChildControls:function(){return this.__eA;
},getChildControl:function(gd,ge){if(!this.__eA){if(ge){return null;
}this.__eA={};
}var gf=this.__eA[gd];

if(gf){return gf;
}
if(ge===true){return null;
}return this._createChildControl(gd);
},_showChildControl:function(fA){var fB=this.getChildControl(fA);
fB.show();
return fB;
},_excludeChildControl:function(fy){var fz=this.getChildControl(fy,true);

if(fz){fz.exclude();
}},_isChildControlVisible:function(ed){var ee=this.getChildControl(ed,true);

if(ee){return ee.isVisible();
}return false;
},_createChildControl:function(gu){if(!this.__eA){this.__eA={};
}else if(this.__eA[gu]){throw new Error("Child control '"+gu+"' already created!");
}var gy=gu.indexOf(O);

if(gy==-1){var gv=this._createChildControlImpl(gu);
}else{var gv=this._createChildControlImpl(gu.substring(0,gy));
}
if(!gv){throw new Error("Unsupported control: "+gu);
}gv.$$subcontrol=gu;
gv.$$subparent=this;
var gw=this.__ex;
var forward=this._forwardStates;

if(gw&&forward&&gv instanceof qx.ui.core.Widget){for(var gx in gw){if(forward[gx]){gv.addState(gx);
}}}this.fireDataEvent(j,gv);
return this.__eA[gu]=gv;
},_createChildControlImpl:function(gO){return null;
},_disposeChildControls:function(){var gY=this.__eA;

if(!gY){return;
}var gW=qx.ui.core.Widget;

for(var gX in gY){var gV=gY[gX];

if(!gW.contains(this,gV)){gV.destroy();
}else{gV.dispose();
}}delete this.__eA;
},_findTopControl:function(){var ew=this;

while(ew){if(!ew.$$subparent){return ew;
}ew=ew.$$subparent;
}return null;
},getContainerLocation:function(gE){var gF=this.getContainerElement().getDomElement();
return gF?qx.bom.element.Location.get(gF,gE):null;
},getContentLocation:function(gg){var gh=this.getContentElement().getDomElement();
return gh?qx.bom.element.Location.get(gh,gg):null;
},setDomLeft:function(fK){var fL=this.getContainerElement().getDomElement();

if(fL){fL.style.left=fK+bU;
}else{throw new Error("DOM element is not yet created!");
}},setDomTop:function(dq){var dr=this.getContainerElement().getDomElement();

if(dr){dr.style.top=dq+bU;
}else{throw new Error("DOM element is not yet created!");
}},setDomPosition:function(cw,top){var cx=this.getContainerElement().getDomElement();

if(cx){cx.style.left=cw+bU;
cx.style.top=top+bU;
}else{throw new Error("DOM element is not yet created!");
}},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
},clone:function(){var fi=qx.ui.core.LayoutItem.prototype.clone.call(this);

if(this.getChildren){var fj=this.getChildren();

for(var i=0,l=fj.length;i<l;i++){fi.add(fj[i].clone());
}}return fi;
}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Variant.isSet(cf,bO)){if(this.__eo){qx.locale.Manager.getInstance().removeListenerById(this.__eo);
}}this.getContainerElement().setAttribute(P,null,true);
this._disposeChildControls();
qx.ui.core.queue.Appearance.remove(this);
qx.ui.core.queue.Layout.remove(this);
qx.ui.core.queue.Visibility.remove(this);
qx.ui.core.queue.Widget.remove(this);
}if(!qx.core.ObjectRegistry.inShutDown){var cF=qx.ui.core.Widget;
var cE=this.getContainerElement();

if(this.__ek){cE.remove(this.__ek);
cF.__ei.poolDecorator(this.__ek);
}
if(this.__el){cE.remove(this.__el);
cF.__ej.poolDecorator(this.__el);
}this.clearSeparators();
this.__ek=this.__el=this.__er=null;
}else{this._disposeArray(ch);
this._disposeObjects(W,z);
}this._disposeArray(bz);
this.__ex=this.__eA=null;
this._disposeObjects(x,cn,N,G);
}});
})();
(function(){var e="qx.event.type.Data",d="qx.ui.container.Composite",c="addChildWidget",b="removeChildWidget";
qx.Class.define(d,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(i){qx.ui.core.Widget.call(this);

if(i!=null){this._setLayout(i);
}},events:{addChildWidget:e,removeChildWidget:e},members:{_afterAddChild:function(a){this.fireNonBubblingEvent(c,qx.event.type.Data,[a]);
},_afterRemoveChild:function(f){this.fireNonBubblingEvent(b,qx.event.type.Data,[f]);
}},defer:function(g,h){qx.ui.core.MChildrenHandling.remap(h);
qx.ui.core.MLayoutHandling.remap(h);
}});
})();
(function(){var l="Integer",k="interval",j="keep-align",i="disappear",h="best-fit",g="mouse",f="bottom-left",e="direct",d="Boolean",c="bottom-right",z="widget",y="qx.ui.core.MPlacement",x="left-top",w="offsetRight",v="shorthand",u="offsetLeft",t="top-left",s="appear",r="offsetBottom",q="top-right",o="offsetTop",p="right-bottom",m="right-top",n="left-bottom";
qx.Mixin.define(y,{properties:{position:{check:[t,q,f,c,x,n,m,p],init:f,themeable:true},placeMethod:{check:[z,g],init:g,themeable:true},domMove:{check:d,init:false},placementModeX:{check:[e,j,h],init:j,themeable:true},placementModeY:{check:[e,j,h],init:j,themeable:true},offsetLeft:{check:l,init:0,themeable:true},offsetTop:{check:l,init:0,themeable:true},offsetRight:{check:l,init:0,themeable:true},offsetBottom:{check:l,init:0,themeable:true},offset:{group:[o,w,r,u],mode:v,themeable:true}},members:{__eB:null,__eC:null,__eD:null,getLayoutLocation:function(K){var N,M,O,top;
M=K.getBounds();
O=M.left;
top=M.top;
var P=M;
K=K.getLayoutParent();

while(K&&!K.isRootWidget()){M=K.getBounds();
O+=M.left;
top+=M.top;
N=K.getInsets();
O+=N.left;
top+=N.top;
K=K.getLayoutParent();
}if(K.isRootWidget()){var L=K.getContainerLocation();

if(L){O+=L.left;
top+=L.top;
}}return {left:O,top:top,right:O+P.width,bottom:top+P.height};
},moveTo:function(T,top){if(this.getDomMove()){this.setDomPosition(T,top);
}else{this.setLayoutProperties({left:T,top:top});
}},placeToWidget:function(Q,R){if(R){this.__eE();
this.__eB=qx.lang.Function.bind(this.placeToWidget,this,Q,false);
qx.event.Idle.getInstance().addListener(k,this.__eB);
this.__eD=function(){this.__eE();
};
this.addListener(i,this.__eD,this);
}var S=Q.getContainerLocation()||this.getLayoutLocation(Q);
this.__eG(S);
},__eE:function(){if(this.__eB){qx.event.Idle.getInstance().removeListener(k,this.__eB);
this.__eB=null;
}
if(this.__eD){this.removeListener(i,this.__eD,this);
this.__eD=null;
}},placeToMouse:function(event){var D=event.getDocumentLeft();
var top=event.getDocumentTop();
var C={left:D,top:top,right:D,bottom:top};
this.__eG(C);
},placeToElement:function(E,F){var location=qx.bom.element.Location.get(E);
var G={left:location.left,top:location.top,right:location.left+E.offsetWidth,bottom:location.top+E.offsetHeight};
if(F){this.__eB=qx.lang.Function.bind(this.placeToElement,this,E,false);
qx.event.Idle.getInstance().addListener(k,this.__eB);
this.addListener(i,function(){if(this.__eB){qx.event.Idle.getInstance().removeListener(k,this.__eB);
this.__eB=null;
}},this);
}this.__eG(G);
},placeToPoint:function(a){var b={left:a.left,top:a.top,right:a.left,bottom:a.top};
this.__eG(b);
},_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};
},__eF:function(H){var I=null;

if(this._computePlacementSize){var I=this._computePlacementSize();
}else if(this.isVisible()){var I=this.getBounds();
}
if(I==null){this.addListenerOnce(s,function(){this.__eF(H);
},this);
}else{H.call(this,I);
}},__eG:function(J){this.__eF(function(A){var B=qx.util.placement.Placement.compute(A,this.getLayoutParent().getBounds(),J,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());
this.moveTo(B.left,B.top);
});
}},destruct:function(){this.__eE();
}});
})();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";
qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
},properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{_applyVisibility:function(g,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,g,h);
var i=qx.ui.popup.Manager.getInstance();
g===d?i.add(this):i.remove(this);
}},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);
}});
})();
(function(){var l="atom",k="Integer",j="String",i="_applyRich",h="qx.ui.tooltip.ToolTip",g="_applyIcon",f="tooltip",d="qx.ui.core.Widget",c="mouseover",b="Boolean",a="_applyLabel";
qx.Class.define(h,{extend:qx.ui.popup.Popup,construct:function(x,y){qx.ui.popup.Popup.call(this);
this.setLayout(new qx.ui.layout.Grow);
this._createChildControl(l);
if(x!=null){this.setLabel(x);
}
if(y!=null){this.setIcon(y);
}this.addListener(c,this._onMouseOver,this);
},properties:{appearance:{refine:true,init:f},showTimeout:{check:k,init:700,themeable:true},hideTimeout:{check:k,init:4000,themeable:true},label:{check:j,nullable:true,apply:a},icon:{check:j,nullable:true,apply:g,themeable:true},rich:{check:b,init:false,apply:i},opener:{check:d,nullable:true}},members:{_createChildControlImpl:function(s){var t;

switch(s){case l:t=new qx.ui.basic.Atom;
this._add(t);
break;
}return t||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,s);
},_onMouseOver:function(e){this.hide();
},_applyIcon:function(m,n){var o=this.getChildControl(l);
m==null?o.resetIcon():o.setIcon(m);
},_applyLabel:function(p,q){var r=this.getChildControl(l);
p==null?r.resetLabel():r.setLabel(p);
},_applyRich:function(u,v){var w=this.getChildControl(l);
w.setRich(u);
}}});
})();
(function(){var f="qx.ui.core.queue.Layout",e="layout";
qx.Class.define(f,{statics:{__eH:{},remove:function(A){delete this.__eH[A.$$hash];
},add:function(z){this.__eH[z.$$hash]=z;
qx.ui.core.queue.Manager.scheduleFlush(e);
},flush:function(){var g=this.__eK();
for(var i=g.length-1;i>=0;i--){var h=g[i];
if(h.hasValidLayout()){continue;
}if(h.isRootWidget()&&!h.hasUserBounds()){var k=h.getSizeHint();
h.renderLayout(0,0,k.width,k.height);
}else{var j=h.getBounds();
h.renderLayout(j.left,j.top,j.width,j.height);
}}},getNestingLevel:function(a){var b=this.__eJ;
var d=0;
var parent=a;
while(true){if(b[parent.$$hash]!=null){d+=b[parent.$$hash];
break;
}
if(!parent.$$parent){break;
}parent=parent.$$parent;
d+=1;
}var c=d;

while(a&&a!==parent){b[a.$$hash]=c--;
a=a.$$parent;
}return d;
},__eI:function(){var y=qx.ui.core.queue.Visibility;
this.__eJ={};
var x=[];
var w=this.__eH;
var t,v;

for(var u in w){t=w[u];

if(y.isVisible(t)){v=this.getNestingLevel(t);
if(!x[v]){x[v]={};
}x[v][u]=t;
delete w[u];
}}return x;
},__eK:function(){var o=[];
var q=this.__eI();

for(var n=q.length-1;n>=0;n--){if(!q[n]){continue;
}
for(var m in q[n]){var l=q[n][m];
if(n==0||l.isRootWidget()||l.hasUserBounds()){o.push(l);
l.invalidateLayoutCache();
continue;
}var s=l.getSizeHint(false);

if(s){l.invalidateLayoutCache();
var p=l.getSizeHint();
var r=(!l.getBounds()||s.minWidth!==p.minWidth||s.width!==p.width||s.maxWidth!==p.maxWidth||s.minHeight!==p.minHeight||s.height!==p.height||s.maxHeight!==p.maxHeight);
}else{r=true;
}
if(r){var parent=l.getLayoutParent();

if(!q[n-1]){q[n-1]={};
}q[n-1][parent.$$hash]=parent;
}else{o.push(l);
}}}return o;
}}});
})();
(function(){var b="qx.event.handler.UserAction";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(a){qx.core.Object.call(this);
this.__eL=a;
this.__eM=a.getWindow();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eL:null,__eM:null,canHandleEvent:function(d,e){},registerEvent:function(i,j,k){},unregisterEvent:function(f,g,h){}},destruct:function(){this.__eL=this.__eM=null;
},defer:function(c){qx.event.Registration.addHandler(c);
}});
})();
(function(){var b="qx.util.DeferredCallManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__eN={};
this.__eO=qx.lang.Function.bind(this.__eS,this);
this.__eP=false;
},members:{__eQ:null,__eR:null,__eN:null,__eP:null,__eO:null,schedule:function(e){if(this.__eQ==null){this.__eQ=window.setTimeout(this.__eO,0);
}var f=e.toHashCode();
if(this.__eR&&this.__eR[f]){return;
}this.__eN[f]=e;
this.__eP=true;
},cancel:function(g){var h=g.toHashCode();
if(this.__eR&&this.__eR[h]){this.__eR[h]=null;
return;
}delete this.__eN[h];
if(qx.lang.Object.isEmpty(this.__eN)&&this.__eQ!=null){window.clearTimeout(this.__eQ);
this.__eQ=null;
}},__eS:qx.event.GlobalError.observeMethod(function(){this.__eQ=null;
while(this.__eP){this.__eR=qx.lang.Object.clone(this.__eN);
this.__eN={};
this.__eP=false;

for(var d in this.__eR){var c=this.__eR[d];

if(c){this.__eR[d]=null;
c.call();
}}}this.__eR=null;
})},destruct:function(){if(this.__eQ!=null){window.clearTimeout(this.__eQ);
}this.__eO=this.__eN=null;
}});
})();
(function(){var a="qx.util.DeferredCall";
qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){qx.core.Object.call(this);
this.__eT=b;
this.__eU=c||null;
this.__eV=qx.util.DeferredCallManager.getInstance();
},members:{__eT:null,__eU:null,__eV:null,cancel:function(){this.__eV.cancel(this);
},schedule:function(){this.__eV.schedule(this);
},call:function(){this.__eU?this.__eT.apply(this.__eU):this.__eT();
}},destruct:function(d,e){this.cancel();
this.__eU=this.__eT=this.__eV=null;
}});
})();
(function(){var cD="element",cC="qx.client",cB="qxSelectable",cA="off",cz="on",cy="div",cx="",cw="mshtml",cv="none",cu="scroll",cV="text",cU="qx.html.Element",cT="|capture|",cS="activate",cR="blur",cQ="deactivate",cP="capture",cO="userSelect",cN="-moz-none",cM="visible",cK="releaseCapture",cL="|bubble|",cI="tabIndex",cJ="focus",cG="MozUserSelect",cH="normal",cE="__ft",cF="hidden";
qx.Class.define(cU,{extend:qx.core.Object,construct:function(D,E,F){qx.core.Object.call(this);
this.__eW=D||cy;
this.__eX=E||null;
this.__eY=F||null;
},statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__fa:{},_scheduleFlush:function(T){qx.html.Element.__fE.schedule();
},flush:function(){var bh;
{};
var Y=this.__fb();
var X=Y.getFocus();

if(X&&this.__ff(X)){Y.blur(X);
}var bo=Y.getActive();

if(bo&&this.__ff(bo)){qx.bom.Element.deactivate(bo);
}var bc=this.__fd();

if(bc&&this.__ff(bc)){qx.bom.Element.releaseCapture(bc);
}var bi=[];
var bj=this._modified;

for(var bg in bj){bh=bj[bg];
if(bh.__fx()){if(bh.__fg&&qx.dom.Hierarchy.isRendered(bh.__fg)){bi.push(bh);
}else{{};
bh.__fw();
}delete bj[bg];
}}
for(var i=0,l=bi.length;i<l;i++){bh=bi[i];
{};
bh.__fw();
}var be=this._visibility;

for(var bg in be){bh=be[bg];
var bk=bh.__fg;

if(!bk){delete be[bg];
continue;
}{};
if(!bh.$$disposed){bk.style.display=bh.__fj?cx:cv;
if(qx.core.Variant.isSet(cC,cw)){if(!(document.documentMode>=8)){bk.style.visibility=bh.__fj?cM:cF;
}}}delete be[bg];
}var scroll=this._scroll;

for(var bg in scroll){bh=scroll[bg];
var bp=bh.__fg;

if(bp&&bp.offsetWidth){var bb=true;
if(bh.__fm!=null){bh.__fg.scrollLeft=bh.__fm;
delete bh.__fm;
}if(bh.__fn!=null){bh.__fg.scrollTop=bh.__fn;
delete bh.__fn;
}var bl=bh.__fk;

if(bl!=null){var bf=bl.element.getDomElement();

if(bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewX(bf,bp,bl.align);
delete bh.__fk;
}else{bb=false;
}}var bm=bh.__fl;

if(bm!=null){var bf=bm.element.getDomElement();

if(bf&&bf.offsetWidth){qx.bom.element.Scroll.intoViewY(bf,bp,bm.align);
delete bh.__fl;
}else{bb=false;
}}if(bb){delete scroll[bg];
}}}var ba={"releaseCapture":1,"blur":1,"deactivate":1};
for(var i=0;i<this._actions.length;i++){var bn=this._actions[i];
var bk=bn.element.__fg;

if(!bk||!ba[bn.type]&&!bn.element.__fx()){continue;
}var bd=bn.args;
bd.unshift(bk);
qx.bom.Element[bn.type].apply(qx.bom.Element,bd);
}this._actions=[];
for(var bg in this.__fa){var W=this.__fa[bg];
var bp=W.element.__fg;

if(bp){qx.bom.Selection.set(bp,W.start,W.end);
delete this.__fa[bg];
}}qx.event.handler.Appear.refresh();
},__fb:function(){if(!this.__fc){var C=qx.event.Registration.getManager(window);
this.__fc=C.getHandler(qx.event.handler.Focus);
}return this.__fc;
},__fd:function(){if(!this.__fe){var bM=qx.event.Registration.getManager(window);
this.__fe=bM.getDispatcher(qx.event.dispatch.MouseCapture);
}return this.__fe.getCaptureElement();
},__ff:function(dH){var dI=qx.core.ObjectRegistry.fromHashCode(dH.$$element);
return dI&&!dI.__fx();
}},members:{__eW:null,__fg:null,__fh:false,__fi:true,__fj:true,__fk:null,__fl:null,__fm:null,__fn:null,__fo:null,__fp:null,__fq:null,__eX:null,__eY:null,__fr:null,__fs:null,__ft:null,__fu:null,__fv:null,_scheduleChildrenUpdate:function(){if(this.__fu){return;
}this.__fu=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
},_createDomElement:function(){return qx.bom.Element.create(this.__eW);
},__fw:function(){{};
var s=this.__ft;

if(s){var length=s.length;
var t;

for(var i=0;i<length;i++){t=s[i];

if(t.__fj&&t.__fi&&!t.__fg){t.__fw();
}}}
if(!this.__fg){this.__fg=this._createDomElement();
this.__fg.$$element=this.$$hash;
this._copyData(false);

if(s&&length>0){this._insertChildren();
}}else{this._syncData();

if(this.__fu){this._syncChildren();
}}delete this.__fu;
},_insertChildren:function(){var bO=this.__ft;
var length=bO.length;
var bQ;

if(length>2){var bP=document.createDocumentFragment();

for(var i=0;i<length;i++){bQ=bO[i];

if(bQ.__fg&&bQ.__fi){bP.appendChild(bQ.__fg);
}}this.__fg.appendChild(bP);
}else{var bP=this.__fg;

for(var i=0;i<length;i++){bQ=bO[i];

if(bQ.__fg&&bQ.__fi){bP.appendChild(bQ.__fg);
}}}},_syncChildren:function(){var dp;
var du=qx.core.ObjectRegistry;
var dk=this.__ft;
var ds=dk.length;
var dl;
var dq;
var dn=this.__fg;
var dr=dn.childNodes;
var dm=0;
var dt;
{};
for(var i=dr.length-1;i>=0;i--){dt=dr[i];
dq=du.fromHashCode(dt.$$element);

if(!dq||!dq.__fi||dq.__fv!==this){dn.removeChild(dt);
{};
}}for(var i=0;i<ds;i++){dl=dk[i];
if(dl.__fi){dq=dl.__fg;
dt=dr[dm];

if(!dq){continue;
}if(dq!=dt){if(dt){dn.insertBefore(dq,dt);
}else{dn.appendChild(dq);
}{};
}dm++;
}}{};
},_copyData:function(ci){var cm=this.__fg;
var cl=this.__eY;

if(cl){var cj=qx.bom.element.Attribute;

for(var cn in cl){cj.set(cm,cn,cl[cn]);
}}var cl=this.__eX;

if(cl){var ck=qx.bom.element.Style;

if(ci){ck.setStyles(cm,cl);
}else{ck.setCss(cm,ck.compile(cl));
}}var cl=this.__fr;

if(cl){for(var cn in cl){this._applyProperty(cn,cl[cn]);
}}var cl=this.__fs;

if(cl){qx.event.Registration.getManager(cm).importListeners(cm,cl);
delete this.__fs;
}},_syncData:function(){var dz=this.__fg;
var dy=qx.bom.element.Attribute;
var dw=qx.bom.element.Style;
var dx=this.__fp;

if(dx){var dC=this.__eY;

if(dC){var dA;

for(var dB in dx){dA=dC[dB];

if(dA!==undefined){dy.set(dz,dB,dA);
}else{dy.reset(dz,dB);
}}}this.__fp=null;
}var dx=this.__fo;

if(dx){var dC=this.__eX;

if(dC){var dv={};

for(var dB in dx){dv[dB]=dC[dB];
}dw.setStyles(dz,dv);
}this.__fo=null;
}var dx=this.__fq;

if(dx){var dC=this.__fr;

if(dC){var dA;

for(var dB in dx){this._applyProperty(dB,dC[dB]);
}}this.__fq=null;
}},__fx:function(){var H=this;
while(H){if(H.__fh){return true;
}
if(!H.__fi||!H.__fj){return false;
}H=H.__fv;
}return false;
},__fy:function(ch){if(ch.__fv===this){throw new Error("Child is already in: "+ch);
}
if(ch.__fh){throw new Error("Root elements could not be inserted into other ones.");
}if(ch.__fv){ch.__fv.remove(ch);
}ch.__fv=this;
if(!this.__ft){this.__ft=[];
}if(this.__fg){this._scheduleChildrenUpdate();
}},__fz:function(G){if(G.__fv!==this){throw new Error("Has no child: "+G);
}if(this.__fg){this._scheduleChildrenUpdate();
}delete G.__fv;
},__fA:function(U){if(U.__fv!==this){throw new Error("Has no child: "+U);
}if(this.__fg){this._scheduleChildrenUpdate();
}},getChildren:function(){return this.__ft||null;
},getChild:function(cs){var ct=this.__ft;
return ct&&ct[cs]||null;
},hasChildren:function(){var dF=this.__ft;
return dF&&dF[0]!==undefined;
},indexOf:function(R){var S=this.__ft;
return S?S.indexOf(R):-1;
},hasChild:function(cq){var cr=this.__ft;
return cr&&cr.indexOf(cq)!==-1;
},add:function(bx){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fy(arguments[i]);
}this.__ft.push.apply(this.__ft,arguments);
}else{this.__fy(bx);
this.__ft.push(bx);
}return this;
},addAt:function(co,cp){this.__fy(co);
qx.lang.Array.insertAt(this.__ft,co,cp);
return this;
},remove:function(dY){var ea=this.__ft;

if(!ea){return;
}
if(arguments[1]){var eb;

for(var i=0,l=arguments.length;i<l;i++){eb=arguments[i];
this.__fz(eb);
qx.lang.Array.remove(ea,eb);
}}else{this.__fz(dY);
qx.lang.Array.remove(ea,dY);
}return this;
},removeAt:function(cc){var cd=this.__ft;

if(!cd){throw new Error("Has no children!");
}var ce=cd[cc];

if(!ce){throw new Error("Has no child at this position!");
}this.__fz(ce);
qx.lang.Array.removeAt(this.__ft,cc);
return this;
},removeAll:function(){var bI=this.__ft;

if(bI){for(var i=0,l=bI.length;i<l;i++){this.__fz(bI[i]);
}bI.length=0;
}return this;
},getParent:function(){return this.__fv||null;
},insertInto:function(parent,b){parent.__fy(this);

if(b==null){parent.__ft.push(this);
}else{qx.lang.Array.insertAt(this.__ft,this,b);
}return this;
},insertBefore:function(dD){var parent=dD.__fv;
parent.__fy(this);
qx.lang.Array.insertBefore(parent.__ft,this,dD);
return this;
},insertAfter:function(cg){var parent=cg.__fv;
parent.__fy(this);
qx.lang.Array.insertAfter(parent.__ft,this,cg);
return this;
},moveTo:function(bG){var parent=this.__fv;
parent.__fA(this);
var bH=parent.__ft.indexOf(this);

if(bH===bG){throw new Error("Could not move to same index!");
}else if(bH<bG){bG--;
}qx.lang.Array.removeAt(parent.__ft,bH);
qx.lang.Array.insertAt(parent.__ft,this,bG);
return this;
},moveBefore:function(bw){var parent=this.__fv;
return this.moveTo(parent.__ft.indexOf(bw));
},moveAfter:function(by){var parent=this.__fv;
return this.moveTo(parent.__ft.indexOf(by)+1);
},free:function(){var parent=this.__fv;

if(!parent){throw new Error("Has no parent to remove from.");
}
if(!parent.__ft){return;
}parent.__fz(this);
qx.lang.Array.remove(parent.__ft,this);
return this;
},getDomElement:function(){return this.__fg||null;
},getNodeName:function(){return this.__eW;
},setNodeName:function(name){this.__eW=name;
},setRoot:function(V){this.__fh=V;
},useMarkup:function(df){if(this.__fg){throw new Error("Could not overwrite existing element!");
}if(qx.core.Variant.isSet(cC,cw)){var dg=document.createElement(cy);
}else{var dg=qx.bom.Element.getHelperElement();
}dg.innerHTML=df;
this.useElement(dg.firstChild);
return this.__fg;
},useElement:function(bN){if(this.__fg){throw new Error("Could not overwrite existing element!");
}this.__fg=bN;
this.__fg.$$element=this.$$hash;
this._copyData(true);
},isFocusable:function(){var bE=this.getAttribute(cI);

if(bE>=1){return true;
}var bD=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bE>=0&&bD[this.__eW]){return true;
}return false;
},setSelectable:qx.core.Variant.select(cC,{"webkit":function(N){this.setAttribute(cB,N?cz:cA);
this.setStyle(cO,N?cH:cv);
},"gecko":function(B){this.setAttribute(cB,B?cz:cA);
this.setStyle(cG,B?cV:cN);
},"default":function(dc){this.setAttribute(cB,dc?cz:cA);
}}),isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__eW];
},include:function(){if(this.__fi){return;
}delete this.__fi;

if(this.__fv){this.__fv._scheduleChildrenUpdate();
}return this;
},exclude:function(){if(!this.__fi){return;
}this.__fi=false;

if(this.__fv){this.__fv._scheduleChildrenUpdate();
}return this;
},isIncluded:function(){return this.__fi===true;
},show:function(){if(this.__fj){return;
}
if(this.__fg){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}if(this.__fv){this.__fv._scheduleChildrenUpdate();
}delete this.__fj;
},hide:function(){if(!this.__fj){return;
}
if(this.__fg){qx.html.Element._visibility[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}this.__fj=false;
},isVisible:function(){return this.__fj===true;
},scrollChildIntoViewX:function(I,J,K){var L=this.__fg;
var M=I.getDomElement();

if(K!==false&&L&&L.offsetWidth&&M&&M.offsetWidth){qx.bom.element.Scroll.intoViewX(M,L,J);
}else{this.__fk={element:I,align:J};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}delete this.__fm;
},scrollChildIntoViewY:function(c,d,f){var g=this.__fg;
var h=c.getDomElement();

if(f!==false&&g&&g.offsetWidth&&h&&h.offsetWidth){qx.bom.element.Scroll.intoViewY(h,g,d);
}else{this.__fl={element:c,align:d};
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}delete this.__fn;
},scrollToX:function(x,bR){var bS=this.__fg;

if(bR!==true&&bS&&bS.offsetWidth){bS.scrollLeft=x;
}else{this.__fm=x;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}delete this.__fk;
},getScrollX:function(){var u=this.__fg;

if(u){return u.scrollLeft;
}return this.__fm||0;
},scrollToY:function(y,cY){var da=this.__fg;

if(cY!==true&&da&&da.offsetWidth){da.scrollTop=y;
}else{this.__fn=y;
qx.html.Element._scroll[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}delete this.__fl;
},getScrollY:function(){var cf=this.__fg;

if(cf){return cf.scrollTop;
}return this.__fn||0;
},disableScrolling:function(){this.enableScrolling();
this.scrollToX(0);
this.scrollToY(0);
this.addListener(cu,this.__fC,this);
},enableScrolling:function(){this.removeListener(cu,this.__fC,this);
},__fB:null,__fC:function(e){if(!this.__fB){this.__fB=true;
this.__fg.scrollTop=0;
this.__fg.scrollLeft=0;
delete this.__fB;
}},getTextSelection:function(){var cb=this.__fg;

if(cb){return qx.bom.Selection.get(cb);
}return null;
},getTextSelectionLength:function(){var dE=this.__fg;

if(dE){return qx.bom.Selection.getLength(dE);
}return null;
},getTextSelectionStart:function(){var bT=this.__fg;

if(bT){return qx.bom.Selection.getStart(bT);
}return null;
},getTextSelectionEnd:function(){var dh=this.__fg;

if(dh){return qx.bom.Selection.getEnd(dh);
}return null;
},setTextSelection:function(bA,bB){var bC=this.__fg;

if(bC){qx.bom.Selection.set(bC,bA,bB);
return;
}qx.html.Element.__fa[this.toHashCode()]={element:this,start:bA,end:bB};
qx.html.Element._scheduleFlush(cD);
},clearTextSelection:function(){var dX=this.__fg;

if(dX){qx.bom.Selection.clear(dX);
}delete qx.html.Element.__fa[this.toHashCode()];
},__fD:function(dP,dQ){var dR=qx.html.Element._actions;
dR.push({type:dP,element:this,args:dQ||[]});
qx.html.Element._scheduleFlush(cD);
},focus:function(){this.__fD(cJ);
},blur:function(){this.__fD(cR);
},activate:function(){this.__fD(cS);
},deactivate:function(){this.__fD(cQ);
},capture:function(dG){this.__fD(cP,[dG!==false]);
},releaseCapture:function(){this.__fD(cK);
},setStyle:function(bJ,bK,bL){if(!this.__eX){this.__eX={};
}
if(this.__eX[bJ]==bK){return;
}
if(bK==null){delete this.__eX[bJ];
}else{this.__eX[bJ]=bK;
}if(this.__fg){if(bL){qx.bom.element.Style.set(this.__fg,bJ,bK);
return this;
}if(!this.__fo){this.__fo={};
}this.__fo[bJ]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}return this;
},setStyles:function(dS,dT){var dU=qx.bom.element.Style;

if(!this.__eX){this.__eX={};
}
if(this.__fg){if(!this.__fo){this.__fo={};
}
for(var dW in dS){var dV=dS[dW];

if(this.__eX[dW]==dV){continue;
}
if(dV==null){delete this.__eX[dW];
}else{this.__eX[dW]=dV;
}if(dT){dU.set(this.__fg,dW,dV);
continue;
}this.__fo[dW]=true;
}qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}else{for(var dW in dS){var dV=dS[dW];

if(this.__eX[dW]==dV){continue;
}
if(dV==null){delete this.__eX[dW];
}else{this.__eX[dW]=dV;
}}}return this;
},removeStyle:function(cW,cX){this.setStyle(cW,null,cX);
},getStyle:function(j){return this.__eX?this.__eX[j]:null;
},getAllStyles:function(){return this.__eX||null;
},setAttribute:function(bX,bY,ca){if(!this.__eY){this.__eY={};
}
if(this.__eY[bX]==bY){return;
}
if(bY==null){delete this.__eY[bX];
}else{this.__eY[bX]=bY;
}if(this.__fg){if(ca){qx.bom.element.Attribute.set(this.__fg,bX,bY);
return this;
}if(!this.__fp){this.__fp={};
}this.__fp[bX]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}return this;
},setAttributes:function(bU,bV){for(var bW in bU){this.setAttribute(bW,bU[bW],bV);
}return this;
},removeAttribute:function(di,dj){this.setAttribute(di,null,dj);
},getAttribute:function(bz){return this.__eY?this.__eY[bz]:null;
},_applyProperty:function(name,bF){},_setProperty:function(w,z,A){if(!this.__fr){this.__fr={};
}
if(this.__fr[w]==z){return;
}
if(z==null){delete this.__fr[w];
}else{this.__fr[w]=z;
}if(this.__fg){if(A){this._applyProperty(w,z);
return this;
}if(!this.__fq){this.__fq={};
}this.__fq[w]=true;
qx.html.Element._modified[this.$$hash]=this;
qx.html.Element._scheduleFlush(cD);
}return this;
},_removeProperty:function(dd,de){this._setProperty(dd,null,de);
},_getProperty:function(O){var P=this.__fr;

if(!P){return null;
}var Q=P[O];
return Q==null?null:Q;
},addListener:function(bq,br,self,bs){var bt;

if(this.$$disposed){return null;
}{};

if(this.__fg){return qx.event.Registration.addListener(this.__fg,bq,br,self,bs);
}
if(!this.__fs){this.__fs={};
}
if(bs==null){bs=false;
}var bu=qx.event.Manager.getNextUniqueId();
var bv=bq+(bs?cT:cL)+bu;
this.__fs[bv]={type:bq,listener:br,self:self,capture:bs,unique:bu};
return bv;
},removeListener:function(k,m,self,n){var o;

if(this.$$disposed){return null;
}{};

if(this.__fg){qx.event.Registration.removeListener(this.__fg,k,m,self,n);
}else{var q=this.__fs;
var p;

if(n==null){n=false;
}
for(var r in q){p=q[r];
if(p.listener===m&&p.self===self&&p.capture===n&&p.type===k){delete q[r];
break;
}}}return this;
},removeListenerById:function(dO){if(this.$$disposed){return null;
}
if(this.__fg){qx.event.Registration.removeListenerById(this.__fg,dO);
}else{delete this.__fs[dO];
}return this;
},hasListener:function(dJ,dK){if(this.$$disposed){return false;
}
if(this.__fg){return qx.event.Registration.hasListener(this.__fg,dJ,dK);
}var dM=this.__fs;
var dL;

if(dK==null){dK=false;
}
for(var dN in dM){dL=dM[dN];
if(dL.capture===dK&&dL.type===dJ){return true;
}}return false;
}},defer:function(v){v.__fE=new qx.util.DeferredCall(v.flush,v);
},destruct:function(){var a=this.__fg;

if(a){qx.event.Registration.getManager(a).removeAllListeners(a);
a.$$element=cx;
}
if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fv;

if(parent&&!parent.$$disposed){parent.remove(this);
}}this._disposeArray(cE);
this.__eY=this.__eX=this.__fs=this.__fr=this.__fp=this.__fo=this.__fq=this.__fg=this.__fv=this.__fk=this.__fl=null;
}});
})();
(function(){var b="qx.ui.core.queue.Manager",a="useraction";
qx.Class.define(b,{statics:{__fF:false,__fG:{},__fH:0,MAX_RETRIES:10,scheduleFlush:function(g){var self=qx.ui.core.queue.Manager;
self.__fG[g]=true;

if(!self.__fF){self.__fK.schedule();
self.__fF=true;
}},flush:function(){var self=qx.ui.core.queue.Manager;
if(self.__fI){return;
}self.__fI=true;
self.__fK.cancel();
var h=self.__fG;
self.__fJ(function(){while(h.visibility||h.widget||h.appearance||h.layout||h.element){if(h.widget){delete h.widget;
qx.ui.core.queue.Widget.flush();
}
if(h.visibility){delete h.visibility;
qx.ui.core.queue.Visibility.flush();
}
if(h.appearance){delete h.appearance;
qx.ui.core.queue.Appearance.flush();
}if(h.widget||h.visibility||h.appearance){continue;
}
if(h.layout){delete h.layout;
qx.ui.core.queue.Layout.flush();
}if(h.widget||h.visibility||h.appearance||h.layout){continue;
}
if(h.element){delete h.element;
qx.html.Element.flush();
}}},function(){self.__fF=false;
});
self.__fJ(function(){if(h.dispose){delete h.dispose;
qx.ui.core.queue.Dispose.flush();
}},function(){self.__fI=false;
});
self.__fH=0;
},__fJ:function(c,d){var self=qx.ui.core.queue.Manager;

try{c();
}catch(e){{};
self.__fF=false;
self.__fI=false;
self.__fH+=1;

if(self.__fH<=self.MAX_RETRIES){self.scheduleFlush();
}else{throw new Error("Fatal Error: Flush terminated "+(self.__fH-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");
}throw e;
}finally{d();
}}},defer:function(f){f.__fK=new qx.util.DeferredCall(f.flush);
qx.html.Element._scheduleFlush=f.scheduleFlush;
qx.event.Registration.addListener(window,a,f.flush);
}});
})();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(c){this._manager=c;
},members:{_getParent:function(f){throw new Error("Missing implementation");
},canDispatchEvent:function(d,event,e){return event.getBubbles();
},dispatchEvent:function(g,event,h){var parent=g;
var s=this._manager;
var p,w;
var n;
var r,u;
var t;
var v=[];
p=s.getListeners(g,h,true);
w=s.getListeners(g,h,false);

if(p){v.push(p);
}
if(w){v.push(w);
}var parent=this._getParent(g);
var l=[];
var k=[];
var m=[];
var q=[];
while(parent!=null){p=s.getListeners(parent,h,true);

if(p){m.push(p);
q.push(parent);
}w=s.getListeners(parent,h,false);

if(w){l.push(w);
k.push(parent);
}parent=this._getParent(parent);
}event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);

for(var i=m.length-1;i>=0;i--){t=q[i];
event.setCurrentTarget(t);
n=m[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.AT_TARGET);
event.setCurrentTarget(g);

for(var i=0,x=v.length;i<x;i++){n=v[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||g;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);

for(var i=0,x=l.length;i<x;i++){t=k[i];
event.setCurrentTarget(t);
n=l[i];

for(var j=0,o=n.length;j<o;j++){r=n[j];
u=r.context||t;
r.handler.call(u,event);
}
if(event.getPropagationStopped()){return;
}}}}});
})();
(function(){var a="qx.event.dispatch.DomBubbling";
qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(c){return c.parentNode;
},canDispatchEvent:function(d,event,e){return d.nodeType!==undefined&&event.getBubbles();
}},defer:function(b){qx.event.Registration.addDispatcher(b);
}});
})();
(function(){var bl="keydown",bk="qx.client",bj="keypress",bi="NumLock",bh="keyup",bg="Enter",bf="0",be="9",bd="-",bc="PageUp",ct="+",cs="PrintScreen",cr="gecko",cq="A",cp="Z",co="Left",cn="F5",cm="Down",cl="Up",ck="F11",bs="F6",bt="useraction",bq="F3",br="keyinput",bo="Insert",bp="F8",bm="End",bn="/",bA="Delete",bB="*",bN="cmd",bJ="F1",bV="F4",bQ="Home",cg="F2",cb="F12",bF="PageDown",cj="F7",ci="Win",ch="F9",bE="F10",bH="Right",bI="text",bL="Escape",bO="webkit",bR="5",bX="3",cd="Meta",bu="7",bv="CapsLock",bG="input",bU="Control",bT="Space",bS="Tab",ca="Shift",bY="Pause",bP="Unidentified",bW="qx.event.handler.Keyboard",Y="mshtml|webkit",cc="6",bw="off",bx="Apps",bK="4",ba="Alt",bb="mshtml",bD="2",by="Scroll",bz="1",bC="8",bM="autoComplete",cf=",",ce="Backspace";
qx.Class.define(bW,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(s){qx.core.Object.call(this);
this.__fL=s;
this.__fM=s.getWindow();
if(qx.core.Variant.isSet(bk,cr)){this.__fN=this.__fM;
}else{this.__fN=this.__fM.document.documentElement;
}this.__fO={};
this._initKeyObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(P){if(this._identifierToKeyCodeMap[P]){return true;
}
if(P.length!=1){return false;
}
if(P>=bf&&P<=be){return true;
}
if(P>=cq&&P<=cp){return true;
}
switch(P){case ct:case bd:case bB:case bn:return true;
default:return false;
}}},members:{__fP:null,__fL:null,__fM:null,__fN:null,__fO:null,__fQ:null,__fR:null,__fS:null,canHandleEvent:function(u,v){},registerEvent:function(cC,cD,cE){},unregisterEvent:function(cH,cI,cJ){},_fireInputEvent:function(M,N){var O=this.__fT();
if(O&&O.offsetWidth!=0){var event=qx.event.Registration.createEvent(br,qx.event.type.KeyInput,[M,O,N]);
this.__fL.dispatchEvent(O,event);
}if(this.__fM){qx.event.Registration.fireEvent(this.__fM,bt,qx.event.type.Data,[br]);
}},_fireSequenceEvent:function(n,o,p){var q=this.__fT();
var r=n.keyCode;
var event=qx.event.Registration.createEvent(o,qx.event.type.KeySequence,[n,q,p]);
this.__fL.dispatchEvent(q,event);
if(qx.core.Variant.isSet(bk,Y)){if(o==bl&&event.getDefaultPrevented()){if(!this._isNonPrintableKeyCode(r)&&!this._emulateKeyPress[r]){this._fireSequenceEvent(n,bj,p);
}}}if(this.__fM){qx.event.Registration.fireEvent(this.__fM,bt,qx.event.type.Data,[o]);
}},__fT:function(){var cK=this.__fL.getHandler(qx.event.handler.Focus);
var cL=cK.getActive();
if(!cL||cL.offsetWidth==0){cL=cK.getFocus();
}if(!cL||cL.offsetWidth==0){cL=this.__fL.getWindow().document.body;
}return cL;
},_initKeyObserver:function(){this.__fP=qx.lang.Function.listener(this.__fU,this);
this.__fS=qx.lang.Function.listener(this.__fW,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__fN,bh,this.__fP);
Event.addNativeListener(this.__fN,bl,this.__fP);
Event.addNativeListener(this.__fN,bj,this.__fS);
},_stopKeyObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__fN,bh,this.__fP);
Event.removeNativeListener(this.__fN,bl,this.__fP);
Event.removeNativeListener(this.__fN,bj,this.__fS);

for(var T in (this.__fR||{})){var S=this.__fR[T];
Event.removeNativeListener(S.target,bj,S.callback);
}delete (this.__fR);
},__fU:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bk,{"mshtml":function(U){U=window.event||U;
var X=U.keyCode;
var V=0;
var W=U.type;
if(!(this.__fO[X]==bl&&W==bl)){this._idealKeyHandler(X,V,W,U);
}if(W==bl){if(this._isNonPrintableKeyCode(X)||this._emulateKeyPress[X]){this._idealKeyHandler(X,V,bj,U);
}}this.__fO[X]=W;
},"gecko":function(A){var E=this._keyCodeFix[A.keyCode]||A.keyCode;
var C=0;
var D=A.type;
if(qx.bom.client.Platform.WIN){var B=E?this._keyCodeToIdentifier(E):this._charCodeToIdentifier(C);

if(!(this.__fO[B]==bl&&D==bl)){this._idealKeyHandler(E,C,D,A);
}this.__fO[B]=D;
}else{this._idealKeyHandler(E,C,D,A);
}this.__fV(A.target,D,E);
},"webkit":function(I){var L=0;
var J=0;
var K=I.type;
if(qx.bom.client.Engine.VERSION<525.13){if(K==bh||K==bl){L=this._charCode2KeyCode[I.charCode]||I.keyCode;
}else{if(this._charCode2KeyCode[I.charCode]){L=this._charCode2KeyCode[I.charCode];
}else{J=I.charCode;
}}this._idealKeyHandler(L,J,K,I);
}else{L=I.keyCode;
this._idealKeyHandler(L,J,K,I);
if(K==bl){if(this._isNonPrintableKeyCode(L)||this._emulateKeyPress[L]){this._idealKeyHandler(L,J,bj,I);
}}this.__fO[L]=K;
}},"opera":function(w){this.__fQ=w.keyCode;
this._idealKeyHandler(w.keyCode,0,w.type,w);
}})),__fV:qx.core.Variant.select(bk,{"gecko":function(i,j,k){if(j===bl&&(k==33||k==34||k==38||k==40)&&i.type==bI&&i.tagName.toLowerCase()===bG&&i.getAttribute(bM)!==bw){if(!this.__fR){this.__fR={};
}var m=qx.core.ObjectRegistry.toHashCode(i);

if(this.__fR[m]){return;
}var self=this;
this.__fR[m]={target:i,callback:function(cF){qx.bom.Event.stopPropagation(cF);
self.__fW(cF);
}};
var l=qx.event.GlobalError.observeMethod(this.__fR[m].callback);
qx.bom.Event.addNativeListener(i,bj,l);
}},"default":null}),__fW:qx.event.GlobalError.observeMethod(qx.core.Variant.select(bk,{"mshtml":function(R){R=window.event||R;

if(this._charCode2KeyCode[R.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[R.keyCode],0,R.type,R);
}else{this._idealKeyHandler(0,R.keyCode,R.type,R);
}},"gecko":function(cy){var cB=this._keyCodeFix[cy.keyCode]||cy.keyCode;
var cz=cy.charCode;
var cA=cy.type;
this._idealKeyHandler(cB,cz,cA,cy);
},"webkit":function(cu){if(qx.bom.client.Engine.VERSION<525.13){var cx=0;
var cv=0;
var cw=cu.type;

if(cw==bh||cw==bl){cx=this._charCode2KeyCode[cu.charCode]||cu.keyCode;
}else{if(this._charCode2KeyCode[cu.charCode]){cx=this._charCode2KeyCode[cu.charCode];
}else{cv=cu.charCode;
}}this._idealKeyHandler(cx,cv,cw,cu);
}else{if(this._charCode2KeyCode[cu.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[cu.keyCode],0,cu.type,cu);
}else{this._idealKeyHandler(0,cu.keyCode,cu.type,cu);
}}},"opera":function(x){var z=x.keyCode;
var y=x.type;
if(z!=this.__fQ){this._idealKeyHandler(0,this.__fQ,y,x);
}else{if(this._keyCodeToIdentifierMap[x.keyCode]){this._idealKeyHandler(x.keyCode,0,x.type,x);
}else{this._idealKeyHandler(0,x.keyCode,x.type,x);
}}}})),_idealKeyHandler:function(d,e,f,g){var h;
if(d||(!d&&!e)){h=this._keyCodeToIdentifier(d);
this._fireSequenceEvent(g,f,h);
}else{h=this._charCodeToIdentifier(e);
this._fireSequenceEvent(g,bj,h);
this._fireInputEvent(g,e);
}},_specialCharCodeMap:{8:ce,9:bS,13:bg,27:bL,32:bT},_emulateKeyPress:qx.core.Variant.select(bk,{"mshtml":{8:true,9:true},"webkit":{8:true,9:true,27:true},"default":{}}),_keyCodeToIdentifierMap:{16:ca,17:bU,18:ba,20:bv,224:cd,37:co,38:cl,39:bH,40:cm,33:bc,34:bF,35:bm,36:bQ,45:bo,46:bA,112:bJ,113:cg,114:bq,115:bV,116:cn,117:bs,118:cj,119:bp,120:ch,121:bE,122:ck,123:cb,144:bi,44:cs,145:by,19:bY,91:qx.bom.client.Platform.MAC?bN:ci,92:ci,93:qx.bom.client.Platform.MAC?bN:bx},_numpadToCharCode:{96:bf.charCodeAt(0),97:bz.charCodeAt(0),98:bD.charCodeAt(0),99:bX.charCodeAt(0),100:bK.charCodeAt(0),101:bR.charCodeAt(0),102:cc.charCodeAt(0),103:bu.charCodeAt(0),104:bC.charCodeAt(0),105:be.charCodeAt(0),106:bB.charCodeAt(0),107:ct.charCodeAt(0),109:bd.charCodeAt(0),110:cf.charCodeAt(0),111:bn.charCodeAt(0)},_charCodeA:cq.charCodeAt(0),_charCodeZ:cp.charCodeAt(0),_charCode0:bf.charCodeAt(0),_charCode9:be.charCodeAt(0),_isNonPrintableKeyCode:function(t){return this._keyCodeToIdentifierMap[t]?true:false;
},_isIdentifiableKeyCode:function(cG){if(cG>=this._charCodeA&&cG<=this._charCodeZ){return true;
}if(cG>=this._charCode0&&cG<=this._charCode9){return true;
}if(this._specialCharCodeMap[cG]){return true;
}if(this._numpadToCharCode[cG]){return true;
}if(this._isNonPrintableKeyCode(cG)){return true;
}return false;
},_keyCodeToIdentifier:function(G){if(this._isIdentifiableKeyCode(G)){var H=this._numpadToCharCode[G];

if(H){return String.fromCharCode(H);
}return (this._keyCodeToIdentifierMap[G]||this._specialCharCodeMap[G]||String.fromCharCode(G));
}else{return bP;
}},_charCodeToIdentifier:function(Q){return this._specialCharCodeMap[Q]||String.fromCharCode(Q).toUpperCase();
},_identifierToKeyCode:function(F){return qx.event.handler.Keyboard._identifierToKeyCodeMap[F]||F.charCodeAt(0);
}},destruct:function(){this._stopKeyObserver();
this.__fQ=this.__fL=this.__fM=this.__fN=this.__fO=null;
},defer:function(a,b){qx.event.Registration.addHandler(a);
if(!a._identifierToKeyCodeMap){a._identifierToKeyCodeMap={};

for(var c in b._keyCodeToIdentifierMap){a._identifierToKeyCodeMap[b._keyCodeToIdentifierMap[c]]=parseInt(c,10);
}
for(var c in b._specialCharCodeMap){a._identifierToKeyCodeMap[b._specialCharCodeMap[c]]=parseInt(c,10);
}}
if(qx.core.Variant.isSet(bk,bb)){b._charCode2KeyCode={13:13,27:27};
}else if(qx.core.Variant.isSet(bk,cr)){b._keyCodeFix={12:b._identifierToKeyCode(bi)};
}else if(qx.core.Variant.isSet(bk,bO)){if(qx.bom.client.Engine.VERSION<525.13){b._charCode2KeyCode={63289:b._identifierToKeyCode(bi),63276:b._identifierToKeyCode(bc),63277:b._identifierToKeyCode(bF),63275:b._identifierToKeyCode(bm),63273:b._identifierToKeyCode(bQ),63234:b._identifierToKeyCode(co),63232:b._identifierToKeyCode(cl),63235:b._identifierToKeyCode(bH),63233:b._identifierToKeyCode(cm),63272:b._identifierToKeyCode(bA),63302:b._identifierToKeyCode(bo),63236:b._identifierToKeyCode(bJ),63237:b._identifierToKeyCode(cg),63238:b._identifierToKeyCode(bq),63239:b._identifierToKeyCode(bV),63240:b._identifierToKeyCode(cn),63241:b._identifierToKeyCode(bs),63242:b._identifierToKeyCode(cj),63243:b._identifierToKeyCode(bp),63244:b._identifierToKeyCode(ch),63245:b._identifierToKeyCode(bE),63246:b._identifierToKeyCode(ck),63247:b._identifierToKeyCode(cb),63248:b._identifierToKeyCode(cs),3:b._identifierToKeyCode(bg),12:b._identifierToKeyCode(bi),13:b._identifierToKeyCode(bg)};
}else{b._charCode2KeyCode={13:13,27:27};
}}}});
})();
(function(){var z="qx.client",y="mouseup",x="click",w="mousedown",v="contextmenu",u="mousewheel",t="dblclick",s="mshtml",r="mouseover",q="mouseout",l="DOMMouseScroll",p="mousemove",o="on",k="mshtml|webkit|opera",j="useraction",n="gecko|webkit",m="qx.event.handler.Mouse";
qx.Class.define(m,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(g){qx.core.Object.call(this);
this.__fX=g;
this.__fY=g.getWindow();
this.__ga=this.__fY.document;
this._initButtonObserver();
this._initMoveObserver();
this._initWheelObserver();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__gb:null,__gc:null,__gd:null,__ge:null,__gf:null,__fX:null,__fY:null,__ga:null,canHandleEvent:function(M,N){},registerEvent:qx.bom.client.System.IPHONE?
function(a,b,c){a[o+b]=qx.lang.Function.returnNull;
}:qx.lang.Function.returnNull,unregisterEvent:qx.bom.client.System.IPHONE?
function(C,D,E){C[o+D]=undefined;
}:qx.lang.Function.returnNull,__gg:function(W,X,Y){if(!Y){Y=W.target||W.srcElement;
}if(Y&&Y.nodeType){qx.event.Registration.fireEvent(Y,X||W.type,X==u?qx.event.type.MouseWheel:qx.event.type.Mouse,[W,Y,null,true,true]);
}qx.event.Registration.fireEvent(this.__fY,j,qx.event.type.Data,[X||W.type]);
},_initButtonObserver:function(){this.__gb=qx.lang.Function.listener(this._onButtonEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__ga,w,this.__gb);
Event.addNativeListener(this.__ga,y,this.__gb);
Event.addNativeListener(this.__ga,x,this.__gb);
Event.addNativeListener(this.__ga,t,this.__gb);
Event.addNativeListener(this.__ga,v,this.__gb);
},_initMoveObserver:function(){this.__gc=qx.lang.Function.listener(this._onMoveEvent,this);
var Event=qx.bom.Event;
Event.addNativeListener(this.__ga,p,this.__gc);
Event.addNativeListener(this.__ga,r,this.__gc);
Event.addNativeListener(this.__ga,q,this.__gc);
},_initWheelObserver:function(){this.__gd=qx.lang.Function.listener(this._onWheelEvent,this);
var Event=qx.bom.Event;
var A=qx.core.Variant.isSet(z,k)?u:l;
var B=qx.core.Variant.isSet(z,s)?this.__ga:this.__fY;
Event.addNativeListener(B,A,this.__gd);
},_stopButtonObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__ga,w,this.__gb);
Event.removeNativeListener(this.__ga,y,this.__gb);
Event.removeNativeListener(this.__ga,x,this.__gb);
Event.removeNativeListener(this.__ga,t,this.__gb);
Event.removeNativeListener(this.__ga,v,this.__gb);
},_stopMoveObserver:function(){var Event=qx.bom.Event;
Event.removeNativeListener(this.__ga,p,this.__gc);
Event.removeNativeListener(this.__ga,r,this.__gc);
Event.removeNativeListener(this.__ga,q,this.__gc);
},_stopWheelObserver:function(){var Event=qx.bom.Event;
var h=qx.core.Variant.isSet(z,k)?u:l;
var i=qx.core.Variant.isSet(z,s)?this.__ga:this.__fY;
Event.removeNativeListener(i,h,this.__gd);
},_onMoveEvent:qx.event.GlobalError.observeMethod(function(R){this.__gg(R);
}),_onButtonEvent:qx.event.GlobalError.observeMethod(function(d){var e=d.type;
var f=d.target||d.srcElement;
if(qx.core.Variant.isSet(z,n)){if(f&&f.nodeType==3){f=f.parentNode;
}}
if(this.__gh){this.__gh(d,e,f);
}
if(this.__gj){this.__gj(d,e,f);
}this.__gg(d,e,f);

if(this.__gi){this.__gi(d,e,f);
}
if(this.__gk){this.__gk(d,e,f);
}this.__ge=e;
}),_onWheelEvent:qx.event.GlobalError.observeMethod(function(V){this.__gg(V,u);
}),__gh:qx.core.Variant.select(z,{"webkit":function(S,T,U){if(qx.bom.client.Engine.VERSION<530){if(T==v){this.__gg(S,y,U);
}}},"default":null}),__gi:qx.core.Variant.select(z,{"opera":function(J,K,L){if(K==y&&J.button==2){this.__gg(J,v,L);
}},"default":null}),__gj:qx.core.Variant.select(z,{"mshtml":function(O,P,Q){if(P==y&&this.__ge==x){this.__gg(O,w,Q);
}else if(P==t){this.__gg(O,x,Q);
}},"default":null}),__gk:qx.core.Variant.select(z,{"mshtml":null,"default":function(F,G,H){switch(G){case w:this.__gf=H;
break;
case y:if(H!==this.__gf){var I=qx.dom.Hierarchy.getCommonParent(H,this.__gf);
this.__gg(F,x,I);
}}}})},destruct:function(){this._stopButtonObserver();
this._stopMoveObserver();
this._stopWheelObserver();
this.__fX=this.__fY=this.__ga=this.__gf=null;
},defer:function(ba){qx.event.Registration.addHandler(ba);
}});
})();
(function(){var a="qx.event.handler.Capture";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(e,f){},registerEvent:function(b,c,d){},unregisterEvent:function(g,h,i){}},defer:function(j){qx.event.Registration.addHandler(j);
}});
})();
(function(){var G="alias",F="copy",E="blur",D="mouseout",C="keydown",B="Ctrl",A="Shift",z="mousemove",y="move",x="mouseover",W="Alt",V="keyup",U="mouseup",T="dragend",S="on",R="mousedown",Q="qxDraggable",P="drag",O="drop",N="qxDroppable",L="qx.event.handler.DragDrop",M="droprequest",J="dragstart",K="dragchange",H="dragleave",I="dragover";
qx.Class.define(L,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(X){qx.core.Object.call(this);
this.__gl=X;
this.__gm=X.getWindow().document.documentElement;
this.__gl.addListener(this.__gm,R,this._onMouseDown,this);
this.__gy();
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__gl:null,__gm:null,__gn:null,__go:null,__gp:null,__gq:null,__gr:null,__gs:null,__gt:null,__gu:null,__gv:false,__gw:0,__gx:0,canHandleEvent:function(v,w){},registerEvent:function(bk,bl,bm){},unregisterEvent:function(g,h,i){},addType:function(k){this.__gp[k]=true;
},addAction:function(Y){this.__gq[Y]=true;
},supportsType:function(bf){return !!this.__gp[bf];
},supportsAction:function(j){return !!this.__gq[j];
},getData:function(bj){if(!this.__gF||!this.__gn){throw new Error("This method must not be used outside the drop event listener!");
}
if(!this.__gp[bj]){throw new Error("Unsupported data type: "+bj+"!");
}
if(!this.__gs[bj]){this.__gt=bj;
this.__gA(M,this.__go,this.__gn,false);
}
if(!this.__gs[bj]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");
}return this.__gs[bj]||null;
},getCurrentAction:function(){return this.__gu;
},addData:function(l,m){this.__gs[l]=m;
},getCurrentType:function(){return this.__gt;
},isSessionActive:function(){return this.__gv;
},__gy:function(){this.__gp={};
this.__gq={};
this.__gr={};
this.__gs={};
},__gz:function(){if(this.__go==null){return;
}var bc=this.__gq;
var ba=this.__gr;
var bb=null;

if(this.__gF){if(ba.Shift&&ba.Ctrl&&bc.alias){bb=G;
}else if(ba.Shift&&ba.Alt&&bc.copy){bb=F;
}else if(ba.Shift&&bc.move){bb=y;
}else if(ba.Alt&&bc.alias){bb=G;
}else if(ba.Ctrl&&bc.copy){bb=F;
}else if(bc.move){bb=y;
}else if(bc.copy){bb=F;
}else if(bc.alias){bb=G;
}}
if(bb!=this.__gu){this.__gu=bb;
this.__gA(K,this.__go,this.__gn,false);
}},__gA:function(o,p,q,r,s){var u=qx.event.Registration;
var t=u.createEvent(o,qx.event.type.Drag,[r,s]);

if(p!==q){t.setRelatedTarget(q);
}return u.dispatchEvent(p,t);
},__gB:function(n){while(n&&n.nodeType==1){if(n.getAttribute(Q)==S){return n;
}n=n.parentNode;
}return null;
},__gC:function(bi){while(bi&&bi.nodeType==1){if(bi.getAttribute(N)==S){return bi;
}bi=bi.parentNode;
}return null;
},__gD:function(){this.__go=null;
this.__gl.removeListener(this.__gm,z,this._onMouseMove,this,true);
this.__gl.removeListener(this.__gm,U,this._onMouseUp,this,true);
qx.event.Registration.removeListener(window,E,this._onWindowBlur,this);
this.__gy();
},__gE:function(){if(this.__gv){this.__gl.removeListener(this.__gm,x,this._onMouseOver,this,true);
this.__gl.removeListener(this.__gm,D,this._onMouseOut,this,true);
this.__gl.removeListener(this.__gm,C,this._onKeyDown,this,true);
this.__gl.removeListener(this.__gm,V,this._onKeyUp,this,true);
this.__gA(T,this.__go,this.__gn,false);
this.__gv=false;
}this.__gF=false;
this.__gn=null;
this.__gD();
},__gF:false,_onWindowBlur:function(e){this.__gE();
},_onKeyDown:function(e){var bd=e.getKeyIdentifier();

switch(bd){case W:case B:case A:if(!this.__gr[bd]){this.__gr[bd]=true;
this.__gz();
}}},_onKeyUp:function(e){var bg=e.getKeyIdentifier();

switch(bg){case W:case B:case A:if(this.__gr[bg]){this.__gr[bg]=false;
this.__gz();
}}},_onMouseDown:function(e){if(this.__gv){return;
}var a=this.__gB(e.getTarget());

if(a){this.__gw=e.getDocumentLeft();
this.__gx=e.getDocumentTop();
this.__go=a;
this.__gl.addListener(this.__gm,z,this._onMouseMove,this,true);
this.__gl.addListener(this.__gm,U,this._onMouseUp,this,true);
qx.event.Registration.addListener(window,E,this._onWindowBlur,this);
}},_onMouseUp:function(e){if(this.__gF){this.__gA(O,this.__gn,this.__go,false,e);
}if(this.__gv){e.stopPropagation();
}this.__gE();
},_onMouseMove:function(e){if(this.__gv){if(!this.__gA(P,this.__go,this.__gn,true,e)){this.__gE();
}}else{if(Math.abs(e.getDocumentLeft()-this.__gw)>3||Math.abs(e.getDocumentTop()-this.__gx)>3){if(this.__gA(J,this.__go,this.__gn,true,e)){this.__gv=true;
this.__gl.addListener(this.__gm,x,this._onMouseOver,this,true);
this.__gl.addListener(this.__gm,D,this._onMouseOut,this,true);
this.__gl.addListener(this.__gm,C,this._onKeyDown,this,true);
this.__gl.addListener(this.__gm,V,this._onKeyUp,this,true);
var bh=this.__gr;
bh.Ctrl=e.isCtrlPressed();
bh.Shift=e.isShiftPressed();
bh.Alt=e.isAltPressed();
this.__gz();
}else{this.__gA(T,this.__go,this.__gn,false);
this.__gD();
}}}},_onMouseOver:function(e){var d=e.getTarget();
var f=this.__gC(d);

if(f&&f!=this.__gn){this.__gF=this.__gA(I,f,this.__go,true,e);
this.__gn=f;
this.__gz();
}},_onMouseOut:function(e){var c=this.__gC(e.getTarget());
var b=this.__gC(e.getRelatedTarget());

if(c&&c!==b&&c==this.__gn){this.__gA(H,this.__gn,b,false,e);
this.__gn=null;
this.__gF=false;
qx.event.Timer.once(this.__gz,this,0);
}}},destruct:function(){this.__go=this.__gn=this.__gl=this.__gm=this.__gp=this.__gq=this.__gr=this.__gs=null;
},defer:function(be){qx.event.Registration.addHandler(be);
}});
})();
(function(){var c="-",b="qx.event.handler.Element";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);
this._manager=q;
this._registeredEvents={};
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,scroll:true,select:true,reset:true,submit:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(r,s){},registerEvent:function(d,e,f){var i=qx.core.ObjectRegistry.toHashCode(d);
var g=i+c+e;
var h=qx.lang.Function.listener(this._onNative,this,g);
qx.bom.Event.addNativeListener(d,e,h);
this._registeredEvents[g]={element:d,type:e,listener:h};
},unregisterEvent:function(j,k,l){var o=this._registeredEvents;

if(!o){return;
}var p=qx.core.ObjectRegistry.toHashCode(j);
var m=p+c+k;
var n=this._registeredEvents[m];

if(n){qx.bom.Event.removeNativeListener(j,k,n.listener);
}delete this._registeredEvents[m];
},_onNative:qx.event.GlobalError.observeMethod(function(w,x){var z=this._registeredEvents;

if(!z){return;
}var y=z[x];
qx.event.Registration.fireNonBubblingEvent(y.element,y.type,qx.event.type.Native,[w]);
})},destruct:function(){var t;
var u=this._registeredEvents;

for(var v in u){t=u[v];
qx.bom.Event.removeNativeListener(t.element,t.type,t.listener);
}this._manager=this._registeredEvents=null;
},defer:function(a){qx.event.Registration.addHandler(a);
}});
})();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";
qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(p){qx.core.Object.call(this);
this.__gG=p;
this.__gH={};
qx.event.handler.Appear.__gI[this.$$hash]=this;
},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gI:{},refresh:function(){var d=this.__gI;

for(var e in d){d[e].refresh();
}}},members:{__gG:null,__gH:null,canHandleEvent:function(v,w){},registerEvent:function(k,l,m){var n=qx.core.ObjectRegistry.toHashCode(k)+l;
var o=this.__gH;

if(o&&!o[n]){o[n]=k;
k.$$displayed=k.offsetWidth>0;
}},unregisterEvent:function(f,g,h){var i=qx.core.ObjectRegistry.toHashCode(f)+g;
var j=this.__gH;

if(!j){return;
}
if(j[i]){delete j[i];
}},refresh:function(){var t=this.__gH;
var u;

for(var s in t){u=t[s];
var q=u.offsetWidth>0;

if((!!u.$$displayed)!==q){u.$$displayed=q;
var r=qx.event.Registration.createEvent(q?a:b);
this.__gG.dispatchEvent(u,r);
}}}},destruct:function(){this.__gG=this.__gH=null;
delete qx.event.handler.Appear.__gI[this.$$hash];
},defer:function(x){qx.event.Registration.addHandler(x);
}});
})();
(function(){var p="mshtml",o="",n="qx.client",m=">",k=" ",h="<",g="='",f="none",e="qx.bom.Element",d="' ",b="div",c="></";
qx.Class.define(e,{statics:{__gJ:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},__gK:{},getHelperElement:function(M){if(!M){M=window;
}var O=M.location.href;

if(!qx.bom.Element.__gK[O]){var N=qx.bom.Element.__gK[O]=M.document.createElement(b);
if(qx.bom.client.Engine.WEBKIT){N.style.display=f;
M.document.body.appendChild(N);
}}return qx.bom.Element.__gK[O];
},create:function(name,W,X){if(!X){X=window;
}
if(!name){throw new Error("The tag name is missing!");
}var ba=this.__gJ;
var Y=o;

for(var bc in W){if(ba[bc]){Y+=bc+g+W[bc]+d;
}}var bd;
if(Y!=o){if(qx.bom.client.Engine.MSHTML){bd=X.document.createElement(h+name+k+Y+m);
}else{var bb=qx.bom.Element.getHelperElement(X);
bb.innerHTML=h+name+k+Y+c+name+m;
bd=bb.firstChild;
}}else{bd=X.document.createElement(name);
}
for(var bc in W){if(!ba[bc]){qx.bom.element.Attribute.set(bd,bc,W[bc]);
}}return bd;
},empty:function(a){return a.innerHTML=o;
},addListener:function(P,Q,R,self,S){return qx.event.Registration.addListener(P,Q,R,self,S);
},removeListener:function(r,s,t,self,u){return qx.event.Registration.removeListener(r,s,t,self,u);
},removeListenerById:function(T,U){return qx.event.Registration.removeListenerById(T,U);
},hasListener:function(J,K,L){return qx.event.Registration.hasListener(J,K,L);
},focus:function(bg){qx.event.Registration.getManager(bg).getHandler(qx.event.handler.Focus).focus(bg);
},blur:function(V){qx.event.Registration.getManager(V).getHandler(qx.event.handler.Focus).blur(V);
},activate:function(v){qx.event.Registration.getManager(v).getHandler(qx.event.handler.Focus).activate(v);
},deactivate:function(w){qx.event.Registration.getManager(w).getHandler(qx.event.handler.Focus).deactivate(w);
},capture:function(be,bf){qx.event.Registration.getManager(be).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(be,bf);
},releaseCapture:function(q){qx.event.Registration.getManager(q).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(q);
},clone:function(x,y){var B;

if(y||(qx.core.Variant.isSet(n,p)&&!qx.xml.Document.isXmlDocument(x))){var F=qx.event.Registration.getManager(x);
var z=qx.dom.Hierarchy.getDescendants(x);
z.push(x);
}if(qx.core.Variant.isSet(n,p)){for(var i=0,l=z.length;i<l;i++){F.toggleAttachedEvents(z[i],false);
}}var B=x.cloneNode(true);
if(qx.core.Variant.isSet(n,p)){for(var i=0,l=z.length;i<l;i++){F.toggleAttachedEvents(z[i],true);
}}if(y===true){var I=qx.dom.Hierarchy.getDescendants(B);
I.push(B);
var A,D,H,C;

for(var i=0,G=z.length;i<G;i++){H=z[i];
A=F.serializeListeners(H);

if(A.length>0){D=I[i];

for(var j=0,E=A.length;j<E;j++){C=A[j];
F.addListener(D,C.type,C.handler,C.self,C.capture);
}}}}return B;
}}});
})();
(function(){var a="qx.event.type.Dom";
qx.Class.define(a,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Native.prototype._cloneNativeEvent.call(this,b,c);
c.shiftKey=b.shiftKey;
c.ctrlKey=b.ctrlKey;
c.altKey=b.altKey;
c.metaKey=b.metaKey;
return c;
},getModifiers:function(){var e=0;
var d=this._native;

if(d.shiftKey){e|=qx.event.type.Dom.SHIFT_MASK;
}
if(d.ctrlKey){e|=qx.event.type.Dom.CTRL_MASK;
}
if(d.altKey){e|=qx.event.type.Dom.ALT_MASK;
}
if(d.metaKey){e|=qx.event.type.Dom.META_MASK;
}return e;
},isCtrlPressed:function(){return this._native.ctrlKey;
},isShiftPressed:function(){return this._native.shiftKey;
},isAltPressed:function(){return this._native.altKey;
},isMetaPressed:function(){return this._native.metaKey;
},isCtrlOrCommandPressed:function(){if(qx.bom.client.Platform.MAC){return this._native.metaKey;
}else{return this._native.ctrlKey;
}}}});
})();
(function(){var a="qx.event.type.KeyInput";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){qx.event.type.Dom.prototype.init.call(this,d,e,null,true,true);
this._charCode=f;
return this;
},clone:function(b){var c=qx.event.type.Dom.prototype.clone.call(this,b);
c._charCode=this._charCode;
return c;
},getCharCode:function(){return this._charCode;
},getChar:function(){return String.fromCharCode(this._charCode);
}}});
})();
(function(){var a="qx.event.type.KeySequence";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(d,e,f){qx.event.type.Dom.prototype.init.call(this,d,e,null,true,true);
this._identifier=f;
return this;
},clone:function(b){var c=qx.event.type.Dom.prototype.clone.call(this,b);
c._identifier=this._identifier;
return c;
},getKeyIdentifier:function(){return this._identifier;
}}});
})();
(function(){var D="qx.client",C="blur",B="focus",A="mousedown",z="on",y="mouseup",x="DOMFocusOut",w="DOMFocusIn",v="selectstart",u="onmousedown",X="onfocusout",W="onfocusin",V="onmouseup",U="onselectstart",T="draggesture",S="qx.event.handler.Focus",R="_applyFocus",Q="deactivate",P="textarea",O="_applyActive",K="input",L="focusin",I="qxSelectable",J="tabIndex",G="off",H="activate",E="mshtml",F="focusout",M="qxKeepFocus",N="qxKeepActive";
qx.Class.define(S,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(bq){qx.core.Object.call(this);
this._manager=bq;
this._window=bq.getWindow();
this._document=this._window.document;
this._root=this._document.documentElement;
this._body=this._document.body;
this._initObserver();
},properties:{active:{apply:O,nullable:true},focus:{apply:R,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Variant.select("qx.client",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gL:null,__gM:null,__gN:null,__gO:null,__gP:null,__gQ:null,__gR:null,__gS:null,__gT:null,__gU:null,canHandleEvent:function(k,l){},registerEvent:function(bG,bH,bI){},unregisterEvent:function(br,bs,bt){},focus:function(bN){if(qx.core.Variant.isSet(D,E)){window.setTimeout(function(){try{bN.focus();
}catch(bL){}},0);
}else{try{bN.focus();
}catch(bD){}}this.setFocus(bN);
this.setActive(bN);
},activate:function(d){this.setActive(d);
},blur:function(bM){try{bM.blur();
}catch(m){}
if(this.getActive()===bM){this.resetActive();
}
if(this.getFocus()===bM){this.resetFocus();
}},deactivate:function(q){if(this.getActive()===q){this.resetActive();
}},tryActivate:function(r){var s=this.__hk(r);

if(s){this.setActive(s);
}},__gV:function(bk,bl,bm,bn){var bp=qx.event.Registration;
var bo=bp.createEvent(bm,qx.event.type.Focus,[bk,bl,bn]);
bp.dispatchEvent(bk,bo);
},_windowFocused:true,__gW:function(){if(this._windowFocused){this._windowFocused=false;
this.__gV(this._window,null,C,false);
}},__gX:function(){if(!this._windowFocused){this._windowFocused=true;
this.__gV(this._window,null,B,false);
}},_initObserver:qx.core.Variant.select(D,{"gecko":function(){this.__gL=qx.lang.Function.listener(this.__he,this);
this.__gM=qx.lang.Function.listener(this.__hf,this);
this.__gN=qx.lang.Function.listener(this.__hd,this);
this.__gO=qx.lang.Function.listener(this.__hc,this);
this.__gP=qx.lang.Function.listener(this.__gY,this);
this._document.addEventListener(A,this.__gL,true);
this._document.addEventListener(y,this.__gM,true);
this._window.addEventListener(B,this.__gN,true);
this._window.addEventListener(C,this.__gO,true);
this._window.addEventListener(T,this.__gP,true);
},"mshtml":function(){this.__gL=qx.lang.Function.listener(this.__he,this);
this.__gM=qx.lang.Function.listener(this.__hf,this);
this.__gR=qx.lang.Function.listener(this.__ha,this);
this.__gS=qx.lang.Function.listener(this.__hb,this);
this.__gQ=qx.lang.Function.listener(this.__hh,this);
this._document.attachEvent(u,this.__gL);
this._document.attachEvent(V,this.__gM);
this._document.attachEvent(W,this.__gR);
this._document.attachEvent(X,this.__gS);
this._document.attachEvent(U,this.__gQ);
},"webkit":function(){this.__gL=qx.lang.Function.listener(this.__he,this);
this.__gM=qx.lang.Function.listener(this.__hf,this);
this.__gS=qx.lang.Function.listener(this.__hb,this);
this.__gN=qx.lang.Function.listener(this.__hd,this);
this.__gO=qx.lang.Function.listener(this.__hc,this);
this.__gQ=qx.lang.Function.listener(this.__hh,this);
this._document.addEventListener(A,this.__gL,true);
this._document.addEventListener(y,this.__gM,true);
this._document.addEventListener(v,this.__gQ,false);
this._window.addEventListener(x,this.__gS,true);
this._window.addEventListener(B,this.__gN,true);
this._window.addEventListener(C,this.__gO,true);
},"opera":function(){this.__gL=qx.lang.Function.listener(this.__he,this);
this.__gM=qx.lang.Function.listener(this.__hf,this);
this.__gR=qx.lang.Function.listener(this.__ha,this);
this.__gS=qx.lang.Function.listener(this.__hb,this);
this._document.addEventListener(A,this.__gL,true);
this._document.addEventListener(y,this.__gM,true);
this._window.addEventListener(w,this.__gR,true);
this._window.addEventListener(x,this.__gS,true);
}}),_stopObserver:qx.core.Variant.select(D,{"gecko":function(){this._document.removeEventListener(A,this.__gL,true);
this._document.removeEventListener(y,this.__gM,true);
this._window.removeEventListener(B,this.__gN,true);
this._window.removeEventListener(C,this.__gO,true);
this._window.removeEventListener(T,this.__gP,true);
},"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,u,this.__gL);
qx.bom.Event.removeNativeListener(this._document,V,this.__gM);
qx.bom.Event.removeNativeListener(this._document,W,this.__gR);
qx.bom.Event.removeNativeListener(this._document,X,this.__gS);
qx.bom.Event.removeNativeListener(this._document,U,this.__gQ);
},"webkit":function(){this._document.removeEventListener(A,this.__gL,true);
this._document.removeEventListener(v,this.__gQ,false);
this._window.removeEventListener(w,this.__gR,true);
this._window.removeEventListener(x,this.__gS,true);
this._window.removeEventListener(B,this.__gN,true);
this._window.removeEventListener(C,this.__gO,true);
},"opera":function(){this._document.removeEventListener(A,this.__gL,true);
this._window.removeEventListener(w,this.__gR,true);
this._window.removeEventListener(x,this.__gS,true);
this._window.removeEventListener(B,this.__gN,true);
this._window.removeEventListener(C,this.__gO,true);
}}),__gY:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"gecko":function(e){if(!this.__hl(e.target)){qx.bom.Event.preventDefault(e);
}},"default":null})),__ha:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"mshtml":function(e){this.__gX();
var bA=e.srcElement;
var bz=this.__hj(bA);

if(bz){this.setFocus(bz);
}this.tryActivate(bA);
},"opera":function(e){var be=e.target;

if(be==this._document||be==this._window){this.__gX();

if(this.__gT){this.setFocus(this.__gT);
delete this.__gT;
}
if(this.__gU){this.setActive(this.__gU);
delete this.__gU;
}}else{this.setFocus(be);
this.tryActivate(be);
if(!this.__hl(be)){be.selectionStart=0;
be.selectionEnd=0;
}}},"default":null})),__hb:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"mshtml":function(e){if(!e.toElement){this.__gW();
this.resetFocus();
this.resetActive();
}},"webkit":function(e){var c=e.target;

if(c===this.getFocus()){this.resetFocus();
}
if(c===this.getActive()){this.resetActive();
}},"opera":function(e){var bi=e.target;

if(bi==this._document){this.__gW();
this.__gT=this.getFocus();
this.__gU=this.getActive();
this.resetFocus();
this.resetActive();
}else{if(bi===this.getFocus()){this.resetFocus();
}
if(bi===this.getActive()){this.resetActive();
}}},"default":null})),__hc:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"gecko":function(e){if(e.target===this._window||e.target===this._document){this.__gW();
this.resetActive();
this.resetFocus();
}},"webkit":function(e){if(e.target===this._window||e.target===this._document){this.__gW();
this.__gT=this.getFocus();
this.__gU=this.getActive();
this.resetActive();
this.resetFocus();
}},"default":null})),__hd:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"gecko":function(e){var t=e.target;

if(t===this._window||t===this._document){this.__gX();
t=this._body;
}this.setFocus(t);
this.tryActivate(t);
},"webkit":function(e){var ba=e.target;

if(ba===this._window||ba===this._document){this.__gX();

if(this.__gT){this.setFocus(this.__gT);
delete this.__gT;
}
if(this.__gU){this.setActive(this.__gU);
delete this.__gU;
}}else{this.setFocus(ba);
this.tryActivate(ba);
}},"default":null})),__he:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"gecko":function(e){var by=this.__hj(e.target);

if(!by){qx.bom.Event.preventDefault(e);
}else if(by===this._body){this.setFocus(by);
}},"mshtml":function(e){var b=e.srcElement;
var a=this.__hj(b);

if(a){if(!this.__hl(b)){b.unselectable=z;
try{document.selection.empty();
}catch(e){}try{a.focus();
}catch(e){}}}else{qx.bom.Event.preventDefault(e);
if(!this.__hl(b)){b.unselectable=z;
}}},"webkit":function(e){var bC=e.target;
var bB=this.__hj(bC);

if(bB){this.setFocus(bB);
}else{qx.bom.Event.preventDefault(e);
}},"opera":function(e){var bh=e.target;
var bf=this.__hj(bh);

if(!this.__hl(bh)){qx.bom.Event.preventDefault(e);
if(bf){var bg=this.getFocus();

if(bg&&bg.selectionEnd){bg.selectionStart=0;
bg.selectionEnd=0;
bg.blur();
}if(bf){this.setFocus(bf);
}}}else if(bf){this.setFocus(bf);
}},"default":null})),__hf:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"mshtml":function(e){var p=e.srcElement;

if(p.unselectable){p.unselectable=G;
}this.tryActivate(this.__hg(p));
},"gecko":function(e){var bx=e.target;

while(bx&&bx.offsetWidth===undefined){bx=bx.parentNode;
}
if(bx){this.tryActivate(bx);
}},"webkit|opera":function(e){this.tryActivate(this.__hg(e.target));
},"default":null})),__hg:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"mshtml|webkit":function(bJ){var bK=this.getFocus();

if(bK&&bJ!=bK&&(bK.nodeName.toLowerCase()===K||bK.nodeName.toLowerCase()===P)){bJ=bK;
}return bJ;
},"default":function(bj){return bj;
}})),__hh:qx.event.GlobalError.observeMethod(qx.core.Variant.select(D,{"mshtml|webkit":function(e){var Y=qx.bom.client.Engine.MSHTML?e.srcElement:e.target;

if(!this.__hl(Y)){qx.bom.Event.preventDefault(e);
}},"default":null})),__hi:function(bu){var bv=qx.bom.element.Attribute.get(bu,J);

if(bv>=1){return true;
}var bw=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

if(bv>=0&&bw[bu.tagName]){return true;
}return false;
},__hj:function(bb){while(bb&&bb.nodeType===1){if(bb.getAttribute(M)==z){return null;
}
if(this.__hi(bb)){return bb;
}bb=bb.parentNode;
}return this._body;
},__hk:function(n){var o=n;

while(n&&n.nodeType===1){if(n.getAttribute(N)==z){return null;
}n=n.parentNode;
}return o;
},__hl:function(f){while(f&&f.nodeType===1){var g=f.getAttribute(I);

if(g!=null){return g===z;
}f=f.parentNode;
}return true;
},_applyActive:function(bc,bd){if(bd){this.__gV(bd,bc,Q,true);
}
if(bc){this.__gV(bc,bd,H,true);
}},_applyFocus:function(bE,bF){if(bF){this.__gV(bF,bE,F,true);
}
if(bE){this.__gV(bE,bF,L,true);
}if(bF){this.__gV(bF,bE,C,false);
}
if(bE){this.__gV(bE,bF,B,false);
}}},destruct:function(){this._stopObserver();
this._manager=this._window=this._document=this._root=this._body=this.__hm=null;
},defer:function(h){qx.event.Registration.addHandler(h);
var i=h.FOCUSABLE_ELEMENTS;

for(var j in i){i[j.toUpperCase()]=1;
}}});
})();
(function(){var a="qx.event.type.Focus";
qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);
this._target=b;
this._relatedTarget=c;
return this;
}}});
})();
(function(){var j="",i="undefined",h="qx.client",g="readOnly",f="accessKey",e="qx.bom.element.Attribute",d="rowSpan",c="vAlign",b="className",a="textContent",y="'",x="htmlFor",w="longDesc",v="cellSpacing",u="frameBorder",t="='",s="useMap",r="innerText",q="innerHTML",p="tabIndex",n="dateTime",o="maxLength",l="mshtml",m="cellPadding",k="colSpan";
qx.Class.define(e,{statics:{__hn:{names:{"class":b,"for":x,html:q,text:qx.core.Variant.isSet(h,l)?r:a,colspan:k,rowspan:d,valign:c,datetime:n,accesskey:f,tabindex:p,maxlength:o,readonly:g,longdesc:w,cellpadding:m,cellspacing:v,frameborder:u,usemap:s},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:j,className:j,innerHTML:j,innerText:j,textContent:j,htmlFor:j,tabIndex:0,maxLength:qx.core.Variant.select(h,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(D){var E=[];
var G=this.__hn.runtime;

for(var F in D){if(!G[F]){E.push(F,t,D[F],y);
}}return E.join(j);
},get:qx.core.Variant.select(h,{"mshtml":function(H,name){var J=this.__hn;
var I;
name=J.names[name]||name;
if(J.original[name]){I=H.getAttribute(name,2);
}else if(J.property[name]){I=H[name];

if(typeof J.propertyDefault[name]!==i&&I==J.propertyDefault[name]){if(typeof J.bools[name]===i){return null;
}else{return I;
}}}else{I=H.getAttribute(name);
}if(J.bools[name]){return !!I;
}return I;
},"default":function(z,name){var B=this.__hn;
var A;
name=B.names[name]||name;
if(B.property[name]){A=z[name];

if(typeof B.propertyDefault[name]!==i&&A==B.propertyDefault[name]){if(typeof B.bools[name]===i){return null;
}else{return A;
}}}else{A=z.getAttribute(name);
}if(B.bools[name]){return !!A;
}return A;
}}),set:function(K,name,L){var M=this.__hn;
name=M.names[name]||name;
if(M.bools[name]){L=!!L;
}if(M.property[name]&&(!(K[name]===undefined)||M.qxProperties[name])){if(L==null){if(M.removeableProperties[name]){K.removeAttribute(name);
return;
}else if(typeof M.propertyDefault[name]!==i){L=M.propertyDefault[name];
}}K[name]=L;
}else{if(L===true){K.setAttribute(name,name);
}else if(L===false||L===null){K.removeAttribute(name);
}else{K.setAttribute(name,L);
}}},reset:function(C,name){this.set(C,name,null);
}}});
})();
(function(){var i="left",h="right",g="middle",f="qx.client",e="dblclick",d="click",c="none",b="contextmenu",a="qx.event.type.Mouse";
qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(n,o,p,q,r){qx.event.type.Dom.prototype.init.call(this,n,o,p,q,r);

if(!p){this._relatedTarget=qx.bom.Event.getRelatedTarget(n);
}return this;
},_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);
l.button=k.button;
l.clientX=k.clientX;
l.clientY=k.clientY;
l.pageX=k.pageX;
l.pageY=k.pageY;
l.screenX=k.screenX;
l.screenY=k.screenY;
l.wheelDelta=k.wheelDelta;
l.detail=k.detail;
l.srcElement=k.srcElement;
return l;
},__ho:qx.core.Variant.select(f,{"mshtml":{1:i,2:h,4:g},"default":{0:i,2:h,1:g}}),stop:function(){this.stopPropagation();
},getButton:function(){switch(this._type){case d:case e:return i;
case b:return h;
default:return this.__ho[this._native.button]||c;
}},isLeftPressed:function(){return this.getButton()===i;
},isMiddlePressed:function(){return this.getButton()===g;
},isRightPressed:function(){return this.getButton()===h;
},getRelatedTarget:function(){return this._relatedTarget;
},getViewportLeft:function(){return this._native.clientX;
},getViewportTop:function(){return this._native.clientY;
},getDocumentLeft:qx.core.Variant.select(f,{"mshtml":function(){var j=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(j);
},"default":function(){return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(f,{"mshtml":function(){var m=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(m);
},"default":function(){return this._native.pageY;
}}),getScreenLeft:function(){return this._native.screenX;
},getScreenTop:function(){return this._native.screenY;
}}});
})();
(function(){var c="qx.client",b="chrome",a="qx.event.type.MouseWheel";
qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();
this.preventDefault();
},getWheelDelta:qx.core.Variant.select(c,{"default":function(){return -(this._native.wheelDelta/40);
},"gecko":function(){return this._native.detail;
},"webkit":function(){if(qx.bom.client.Browser.NAME==b){if(qx.bom.client.Platform.MAC){return -(this._native.wheelDelta/1200);
}else{return -(this._native.wheelDelta/120);
}}else{if(qx.bom.client.Platform.WIN){var d=120;
if(qx.bom.client.Engine.VERSION==533.16){d=1200;
}}else{d=40;
if(qx.bom.client.Engine.VERSION==533.16||qx.bom.client.Engine.VERSION==533.17){d=1200;
}}return -(this._native.wheelDelta/d);
}}})}});
})();
(function(){var j="qx.client",i="ie",h="msie",g="android",f="operamini",e="mobile chrome",d=")(/| )([0-9]+\.[0-9])",c="iemobile",b="opera mobi",a="Mobile Safari",x="operamobile",w="mobile safari",v="IEMobile|Maxthon|MSIE",u="qx.bom.client.Browser",t="opera mini",s="(",r="opera",q="mshtml",p="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",m="webkit",n="5.0",k="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Firefox",l="Mobile/";
qx.Bootstrap.define(u,{statics:{UNKNOWN:true,NAME:"unknown",TITLE:"unknown 0.0",VERSION:0.0,FULLVERSION:"0.0.0",__hp:function(z){var A=navigator.userAgent;
var C=new RegExp(s+z+d);
var D=A.match(C);

if(!D){return;
}var name=D[1].toLowerCase();
var B=D[3];
if(A.match(/Version(\/| )([0-9]+\.[0-9])/)){B=RegExp.$2;
}
if(qx.core.Variant.isSet(j,m)){if(name===g){name=e;
}else if(A.indexOf(a)!==-1||A.indexOf(l)!==-1){name=w;
}}else if(qx.core.Variant.isSet(j,q)){if(name===h){name=i;
if(qx.bom.client.System.WINCE&&name===i){name=c;
B=n;
}}}else if(qx.core.Variant.isSet(j,r)){if(name===b){name=x;
}else if(name===t){name=f;
}}this.NAME=name;
this.FULLVERSION=B;
this.VERSION=parseFloat(B,10);
this.TITLE=name+" "+this.VERSION;
this.UNKNOWN=false;
}},defer:qx.core.Variant.select(j,{"webkit":function(y){y.__hp(o);
},"gecko":function(F){F.__hp(k);
},"mshtml":function(G){G.__hp(v);
},"opera":function(E){E.__hp(p);
}})});
})();
(function(){var E="qx.client",D="qx.dom.Hierarchy",C="previousSibling",B="*",A="nextSibling",z="parentNode";
qx.Class.define(D,{statics:{getNodeIndex:function(u){var v=0;

while(u&&(u=u.previousSibling)){v++;
}return v;
},getElementIndex:function(O){var P=0;
var Q=qx.dom.Node.ELEMENT;

while(O&&(O=O.previousSibling)){if(O.nodeType==Q){P++;
}}return P;
},getNextElementSibling:function(s){while(s&&(s=s.nextSibling)&&!qx.dom.Node.isElement(s)){continue;
}return s||null;
},getPreviousElementSibling:function(b){while(b&&(b=b.previousSibling)&&!qx.dom.Node.isElement(b)){continue;
}return b||null;
},contains:qx.core.Variant.select(E,{"webkit|mshtml|opera":function(T,U){if(qx.dom.Node.isDocument(T)){var V=qx.dom.Node.getDocument(U);
return T&&V==T;
}else if(qx.dom.Node.isDocument(U)){return false;
}else{return T.contains(U);
}},"gecko":function(e,f){return !!(e.compareDocumentPosition(f)&16);
},"default":function(G,H){while(H){if(G==H){return true;
}H=H.parentNode;
}return false;
}}),isRendered:function(R){if(!R.parentNode||!R.offsetParent){return false;
}var S=R.ownerDocument||R.document;
if(S.body.contains){return S.body.contains(R);
}if(S.compareDocumentPosition){return !!(S.compareDocumentPosition(R)&16);
}throw new Error("Missing support for isRendered()!");
},isDescendantOf:function(c,d){return this.contains(d,c);
},getCommonParent:qx.core.Variant.select(E,{"mshtml|opera":function(n,o){if(n===o){return n;
}
while(n&&qx.dom.Node.isElement(n)){if(n.contains(o)){return n;
}n=n.parentNode;
}return null;
},"default":function(I,J){if(I===J){return I;
}var K={};
var N=qx.core.ObjectRegistry;
var M,L;

while(I||J){if(I){M=N.toHashCode(I);

if(K[M]){return K[M];
}K[M]=I;
I=I.parentNode;
}
if(J){L=N.toHashCode(J);

if(K[L]){return K[L];
}K[L]=J;
J=J.parentNode;
}}return null;
}}),getAncestors:function(F){return this._recursivelyCollect(F,z);
},getChildElements:function(x){x=x.firstChild;

if(!x){return [];
}var y=this.getNextSiblings(x);

if(x.nodeType===1){y.unshift(x);
}return y;
},getDescendants:function(p){return qx.lang.Array.fromCollection(p.getElementsByTagName(B));
},getFirstDescendant:function(t){t=t.firstChild;

while(t&&t.nodeType!=1){t=t.nextSibling;
}return t;
},getLastDescendant:function(a){a=a.lastChild;

while(a&&a.nodeType!=1){a=a.previousSibling;
}return a;
},getPreviousSiblings:function(q){return this._recursivelyCollect(q,C);
},getNextSiblings:function(j){return this._recursivelyCollect(j,A);
},_recursivelyCollect:function(g,h){var i=[];

while(g=g[h]){if(g.nodeType==1){i.push(g);
}}return i;
},getSiblings:function(r){return this.getPreviousSiblings(r).reverse().concat(this.getNextSiblings(r));
},isEmpty:function(w){w=w.firstChild;

while(w){if(w.nodeType===qx.dom.Node.ELEMENT||w.nodeType===qx.dom.Node.TEXT){return false;
}w=w.nextSibling;
}return true;
},cleanWhitespace:function(k){var l=k.firstChild;

while(l){var m=l.nextSibling;

if(l.nodeType==3&&!/\S/.test(l.nodeValue)){k.removeChild(l);
}l=m;
}}}});
})();
(function(){var c="qx.client",b="qx.event.type.Drag";
qx.Class.define(b,{extend:qx.event.type.Event,members:{init:function(j,k){qx.event.type.Event.prototype.init.call(this,true,j);

if(k){this._native=k.getNativeEvent()||null;
this._originalTarget=k.getTarget()||null;
}else{this._native=null;
this._originalTarget=null;
}return this;
},clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);
g._native=this._native;
return g;
},getDocumentLeft:qx.core.Variant.select(c,{"mshtml":function(){if(this._native==null){return 0;
}var e=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientX+qx.bom.Viewport.getScrollLeft(e);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageX;
}}),getDocumentTop:qx.core.Variant.select(c,{"mshtml":function(){if(this._native==null){return 0;
}var l=qx.dom.Node.getWindow(this._native.srcElement);
return this._native.clientY+qx.bom.Viewport.getScrollTop(l);
},"default":function(){if(this._native==null){return 0;
}return this._native.pageY;
}}),getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);
},addType:function(d){this.getManager().addType(d);
},addAction:function(m){this.getManager().addAction(m);
},supportsType:function(h){return this.getManager().supportsType(h);
},supportsAction:function(a){return this.getManager().supportsAction(a);
},addData:function(n,o){this.getManager().addData(n,o);
},getData:function(i){return this.getManager().getData(i);
},getCurrentType:function(){return this.getManager().getCurrentType();
},getCurrentAction:function(){return this.getManager().getCurrentAction();
}}});
})();
(function(){var h="losecapture",g="qx.client",f="blur",e="focus",d="click",c="qx.event.dispatch.MouseCapture",b="capture",a="scroll";
qx.Class.define(c,{extend:qx.event.dispatch.AbstractBubbling,construct:function(q,r){qx.event.dispatch.AbstractBubbling.call(this,q);
this.__hq=q.getWindow();
this.__hr=r;
q.addListener(this.__hq,f,this.releaseCapture,this);
q.addListener(this.__hq,e,this.releaseCapture,this);
q.addListener(this.__hq,a,this.releaseCapture,this);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__hr:null,__hs:null,__ht:true,__hq:null,_getParent:function(l){return l.parentNode;
},canDispatchEvent:function(u,event,v){return (this.__hs&&this.__hu[v]);
},dispatchEvent:function(m,event,n){if(n==d){event.stopPropagation();
this.releaseCapture();
return;
}
if(this.__ht||!qx.dom.Hierarchy.contains(this.__hs,m)){m=this.__hs;
}qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,m,event,n);
},__hu:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(o,p){var p=p!==false;

if(this.__hs===o&&this.__ht==p){return;
}
if(this.__hs){this.releaseCapture();
}this.nativeSetCapture(o,p);

if(this.hasNativeCapture){var self=this;
qx.bom.Event.addNativeListener(o,h,function(){qx.bom.Event.removeNativeListener(o,h,arguments.callee);
self.releaseCapture();
});
}this.__ht=p;
this.__hs=o;
this.__hr.fireEvent(o,b,qx.event.type.Event,[true,false]);
},getCaptureElement:function(){return this.__hs;
},releaseCapture:function(){var t=this.__hs;

if(!t){return;
}this.__hs=null;
this.__hr.fireEvent(t,h,qx.event.type.Event,[true,false]);
this.nativeReleaseCapture(t);
},hasNativeCapture:qx.bom.client.Engine.MSHTML,nativeSetCapture:qx.core.Variant.select(g,{"mshtml":function(j,k){j.setCapture(k!==false);
},"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Variant.select(g,{"mshtml":function(s){s.releaseCapture();
},"default":qx.lang.Function.empty})},destruct:function(){this.__hs=this.__hq=this.__hr=null;
},defer:function(i){qx.event.Registration.addDispatcher(i);
}});
})();
(function(){var r="qx.client",q="",p="mshtml",o="'",n="SelectionLanguage",m="qx.xml.Document",k=" />",j="MSXML2.DOMDocument.3.0",h='<\?xml version="1.0" encoding="utf-8"?>\n<',g="MSXML2.XMLHTTP.3.0",c="MSXML2.XMLHTTP.6.0",f=" xmlns='",e="text/xml",b="XPath",a="MSXML2.DOMDocument.6.0",d="HTML";
qx.Class.define(m,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(v){if(v.nodeType===9){return v.documentElement.nodeName!==d;
}else if(v.ownerDocument){return this.isXmlDocument(v.ownerDocument);
}else{return false;
}},create:qx.core.Variant.select(r,{"mshtml":function(w,x){var y=new ActiveXObject(this.DOMDOC);
y.setProperty(n,b);

if(x){var z=h;
z+=x;

if(w){z+=f+w+o;
}z+=k;
y.loadXML(z);
}return y;
},"default":function(s,t){return document.implementation.createDocument(s||q,t||q,null);
}}),fromString:qx.core.Variant.select(r,{"mshtml":function(C){var D=qx.xml.Document.create();
D.loadXML(C);
return D;
},"default":function(A){var B=new DOMParser();
return B.parseFromString(A,e);
}})},defer:function(E){if(qx.core.Variant.isSet(r,p)){var F=[a,j];
var G=[c,g];

for(var i=0,l=F.length;i<l;i++){try{new ActiveXObject(F[i]);
new ActiveXObject(G[i]);
}catch(u){continue;
}E.DOMDOC=F[i];
E.XMLHTTP=G[i];
break;
}}}});
})();
(function(){var k="visible",j="scroll",i="borderBottomWidth",h="borderTopWidth",g="left",f="borderLeftWidth",e="bottom",d="top",c="right",b="qx.bom.element.Scroll",a="borderRightWidth";
qx.Class.define(b,{statics:{intoViewX:function(K,stop,L){var parent=K.parentNode;
var Q=qx.dom.Node.getDocument(K);
var M=Q.body;
var Y,W,T;
var bb,R,bc;
var U,bd,bg;
var be,O,X,N;
var S,bf,V;
var P=L===g;
var ba=L===c;
stop=stop?stop.parentNode:Q;
while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===M||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===M){W=parent.scrollLeft;
T=W+qx.bom.Viewport.getWidth();
bb=qx.bom.Viewport.getWidth();
R=parent.clientWidth;
bc=parent.scrollWidth;
U=0;
bd=0;
bg=0;
}else{Y=qx.bom.element.Location.get(parent);
W=Y.left;
T=Y.right;
bb=parent.offsetWidth;
R=parent.clientWidth;
bc=parent.scrollWidth;
U=parseInt(qx.bom.element.Style.get(parent,f),10)||0;
bd=parseInt(qx.bom.element.Style.get(parent,a),10)||0;
bg=bb-R-U-bd;
}be=qx.bom.element.Location.get(K);
O=be.left;
X=be.right;
N=K.offsetWidth;
S=O-W-U;
bf=X-T+bd;
V=0;
if(P){V=S;
}else if(ba){V=bf+bg;
}else if(S<0||N>R){V=S;
}else if(bf>0){V=bf+bg;
}parent.scrollLeft+=V;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===M){break;
}parent=parent.parentNode;
}},intoViewY:function(o,stop,p){var parent=o.parentNode;
var v=qx.dom.Node.getDocument(o);
var q=v.body;
var D,r,z;
var F,C,x;
var t,u,s;
var H,I,E,y;
var B,w,J;
var G=p===d;
var A=p===e;
stop=stop?stop.parentNode:v;
while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===q||qx.bom.element.Overflow.getY(parent)!=k)){if(parent===q){r=parent.scrollTop;
z=r+qx.bom.Viewport.getHeight();
F=qx.bom.Viewport.getHeight();
C=parent.clientHeight;
x=parent.scrollHeight;
t=0;
u=0;
s=0;
}else{D=qx.bom.element.Location.get(parent);
r=D.top;
z=D.bottom;
F=parent.offsetHeight;
C=parent.clientHeight;
x=parent.scrollHeight;
t=parseInt(qx.bom.element.Style.get(parent,h),10)||0;
u=parseInt(qx.bom.element.Style.get(parent,i),10)||0;
s=F-C-t-u;
}H=qx.bom.element.Location.get(o);
I=H.top;
E=H.bottom;
y=o.offsetHeight;
B=I-r-t;
w=E-z+u;
J=0;
if(G){J=B;
}else if(A){J=w+s;
}else if(B<0||y>C){J=B;
}else if(w>0){J=w+s;
}parent.scrollTop+=J;
if(qx.bom.client.Engine.GECKO||qx.bom.client.Engine.OPERA){qx.event.Registration.fireNonBubblingEvent(parent,j);
}}
if(parent===q){break;
}parent=parent.parentNode;
}},intoView:function(l,stop,m,n){this.intoViewX(l,stop,m);
this.intoViewY(l,stop,n);
}}});
})();
(function(){var J="borderTopWidth",I="borderLeftWidth",H="marginTop",G="marginLeft",F="scroll",E="qx.client",D="border-box",C="borderBottomWidth",B="borderRightWidth",A="auto",Y="padding",X="qx.bom.element.Location",W="paddingLeft",V="static",U="marginBottom",T="visible",S="BODY",R="paddingBottom",Q="paddingTop",P="marginRight",N="position",O="margin",L="overflow",M="paddingRight",K="border";
qx.Class.define(X,{statics:{__hI:function(bm,bn){return qx.bom.element.Style.get(bm,bn,qx.bom.element.Style.COMPUTED_MODE,false);
},__hJ:function(bu,bv){return parseInt(qx.bom.element.Style.get(bu,bv,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;
},__hK:function(a){var d=0,top=0;
if(a.getBoundingClientRect&&!qx.bom.client.Engine.OPERA){var c=qx.dom.Node.getWindow(a);
d-=qx.bom.Viewport.getScrollLeft(c);
top-=qx.bom.Viewport.getScrollTop(c);
}else{var b=qx.dom.Node.getDocument(a).body;
a=a.parentNode;
while(a&&a!=b){d+=a.scrollLeft;
top+=a.scrollTop;
a=a.parentNode;
}}return {left:d,top:top};
},__hL:qx.core.Variant.select(E,{"mshtml":function(w){var y=qx.dom.Node.getDocument(w);
var x=y.body;
var z=0;
var top=0;
z-=x.clientLeft+y.documentElement.clientLeft;
top-=x.clientTop+y.documentElement.clientTop;

if(qx.bom.client.Feature.STANDARD_MODE){z+=this.__hJ(x,I);
top+=this.__hJ(x,J);
}return {left:z,top:top};
},"webkit":function(bo){var bq=qx.dom.Node.getDocument(bo);
var bp=bq.body;
var br=bp.offsetLeft;
var top=bp.offsetTop;
if(qx.bom.client.Engine.VERSION<530.17){br+=this.__hJ(bp,I);
top+=this.__hJ(bp,J);
}return {left:br,top:top};
},"gecko":function(bh){var bi=qx.dom.Node.getDocument(bh).body;
var bj=bi.offsetLeft;
var top=bi.offsetTop;
if(qx.bom.client.Engine.VERSION<1.9){bj+=this.__hJ(bi,G);
top+=this.__hJ(bi,H);
}if(qx.bom.element.BoxSizing.get(bi)!==D){bj+=this.__hJ(bi,I);
top+=this.__hJ(bi,J);
}return {left:bj,top:top};
},"default":function(bN){var bO=qx.dom.Node.getDocument(bN).body;
var bP=bO.offsetLeft;
var top=bO.offsetTop;
return {left:bP,top:top};
}}),__hM:qx.core.Variant.select(E,{"mshtml|webkit":function(bw){var by=qx.dom.Node.getDocument(bw);
if(bw.getBoundingClientRect){var bz=bw.getBoundingClientRect();
var bA=bz.left;
var top=bz.top;
}else{var bA=bw.offsetLeft;
var top=bw.offsetTop;
bw=bw.offsetParent;
var bx=by.body;
while(bw&&bw!=bx){bA+=bw.offsetLeft;
top+=bw.offsetTop;
bA+=this.__hJ(bw,I);
top+=this.__hJ(bw,J);
bw=bw.offsetParent;
}}return {left:bA,top:top};
},"gecko":function(bc){if(bc.getBoundingClientRect){var bf=bc.getBoundingClientRect();
var bg=Math.round(bf.left);
var top=Math.round(bf.top);
}else{var bg=0;
var top=0;
var bd=qx.dom.Node.getDocument(bc).body;
var be=qx.bom.element.BoxSizing;

if(be.get(bc)!==D){bg-=this.__hJ(bc,I);
top-=this.__hJ(bc,J);
}
while(bc&&bc!==bd){bg+=bc.offsetLeft;
top+=bc.offsetTop;
if(be.get(bc)!==D){bg+=this.__hJ(bc,I);
top+=this.__hJ(bc,J);
}if(bc.parentNode&&this.__hI(bc.parentNode,L)!=T){bg+=this.__hJ(bc.parentNode,I);
top+=this.__hJ(bc.parentNode,J);
}bc=bc.offsetParent;
}}return {left:bg,top:top};
},"default":function(r){var t=0;
var top=0;
var s=qx.dom.Node.getDocument(r).body;
while(r&&r!==s){t+=r.offsetLeft;
top+=r.offsetTop;
r=r.offsetParent;
}return {left:t,top:top};
}}),get:function(i,j){if(i.tagName==S){var location=this.__hN(i);
var q=location.left;
var top=location.top;
}else{var k=this.__hL(i);
var p=this.__hM(i);
var scroll=this.__hK(i);
var q=p.left+k.left-scroll.left;
var top=p.top+k.top-scroll.top;
}var l=q+i.offsetWidth;
var m=top+i.offsetHeight;

if(j){if(j==Y||j==F){var n=qx.bom.element.Overflow.getX(i);

if(n==F||n==A){l+=i.scrollWidth-i.offsetWidth+this.__hJ(i,I)+this.__hJ(i,B);
}var o=qx.bom.element.Overflow.getY(i);

if(o==F||o==A){m+=i.scrollHeight-i.offsetHeight+this.__hJ(i,J)+this.__hJ(i,C);
}}
switch(j){case Y:q+=this.__hJ(i,W);
top+=this.__hJ(i,Q);
l-=this.__hJ(i,M);
m-=this.__hJ(i,R);
case F:q-=i.scrollLeft;
top-=i.scrollTop;
l-=i.scrollLeft;
m-=i.scrollTop;
case K:q+=this.__hJ(i,I);
top+=this.__hJ(i,J);
l-=this.__hJ(i,B);
m-=this.__hJ(i,C);
break;
case O:q-=this.__hJ(i,G);
top-=this.__hJ(i,H);
l+=this.__hJ(i,P);
m+=this.__hJ(i,U);
break;
}}return {left:q,top:top,right:l,bottom:m};
},__hN:qx.core.Variant.select(E,{"default":function(u){var top=u.offsetTop+this.__hJ(u,H);
var v=u.offsetLeft+this.__hJ(u,G);
return {left:v,top:top};
},"mshtml":function(g){var top=g.offsetTop;
var h=g.offsetLeft;

if(!((qx.bom.client.Engine.VERSION<8||qx.bom.client.Engine.DOCUMENT_MODE<8)&&!qx.bom.client.Feature.QUIRKS_MODE)){top+=this.__hJ(g,H);
h+=this.__hJ(g,G);
}return {left:h,top:top};
},"gecko":function(bs){var top=bs.offsetTop+this.__hJ(bs,H)+this.__hJ(bs,I);
var bt=bs.offsetLeft+this.__hJ(bs,G)+this.__hJ(bs,J);
return {left:bt,top:top};
}}),getLeft:function(bk,bl){return this.get(bk,bl).left;
},getTop:function(ba,bb){return this.get(ba,bb).top;
},getRight:function(e,f){return this.get(e,f).right;
},getBottom:function(bL,bM){return this.get(bL,bM).bottom;
},getRelative:function(bF,bG,bH,bI){var bK=this.get(bF,bH);
var bJ=this.get(bG,bI);
return {left:bK.left-bJ.left,top:bK.top-bJ.top,right:bK.right-bJ.right,bottom:bK.bottom-bJ.bottom};
},getPosition:function(bB){return this.getRelative(bB,this.getOffsetParent(bB));
},getOffsetParent:function(bC){var bE=bC.offsetParent||document.body;
var bD=qx.bom.element.Style;

while(bE&&(!/^body|html$/i.test(bE.tagName)&&bD.get(bE,N)===V)){bE=bE.offsetParent;
}return bE;
}}});
})();
(function(){var l="qx.client",k="character",j="EndToEnd",i="input",h="textarea",g="StartToStart",f='character',e="qx.bom.Selection",d="button",c="#text",b="body";
qx.Class.define(e,{statics:{getSelectionObject:qx.core.Variant.select(l,{"mshtml":function(t){return t.selection;
},"default":function(by){return qx.dom.Node.getWindow(by).getSelection();
}}),get:qx.core.Variant.select(l,{"mshtml":function(bm){var bn=qx.bom.Range.get(qx.dom.Node.getDocument(bm));
return bn.text;
},"default":function(A){if(this.__hO(A)){return A.value.substring(A.selectionStart,A.selectionEnd);
}else{return this.getSelectionObject(qx.dom.Node.getDocument(A)).toString();
}}}),getLength:qx.core.Variant.select(l,{"mshtml":function(bi){var bk=this.get(bi);
var bj=qx.util.StringSplit.split(bk,/\r\n/);
return bk.length-(bj.length-1);
},"opera":function(bo){var bt,br,bp;

if(this.__hO(bo)){var bs=bo.selectionStart;
var bq=bo.selectionEnd;
bt=bo.value.substring(bs,bq);
br=bq-bs;
}else{bt=qx.bom.Selection.get(bo);
br=bt.length;
}bp=qx.util.StringSplit.split(bt,/\r\n/);
return br-(bp.length-1);
},"default":function(m){if(this.__hO(m)){return m.selectionEnd-m.selectionStart;
}else{return this.get(m).length;
}}}),getStart:qx.core.Variant.select(l,{"mshtml":function(K){if(this.__hO(K)){var P=qx.bom.Range.get();
if(!K.contains(P.parentElement())){return -1;
}var Q=qx.bom.Range.get(K);
var O=K.value.length;
Q.moveToBookmark(P.getBookmark());
Q.moveEnd(f,O);
return O-Q.text.length;
}else{var Q=qx.bom.Range.get(K);
var M=Q.parentElement();
var R=qx.bom.Range.get();
R.moveToElementText(M);
var L=qx.bom.Range.get(qx.dom.Node.getBodyElement(K));
L.setEndPoint(g,Q);
L.setEndPoint(j,R);
if(R.compareEndPoints(g,L)==0){return 0;
}var N;
var S=0;

while(true){N=L.moveStart(k,-1);
if(R.compareEndPoints(g,L)==0){break;
}if(N==0){break;
}else{S++;
}}return ++S;
}},"gecko|webkit":function(bv){if(this.__hO(bv)){return bv.selectionStart;
}else{var bx=qx.dom.Node.getDocument(bv);
var bw=this.getSelectionObject(bx);
if(bw.anchorOffset<bw.focusOffset){return bw.anchorOffset;
}else{return bw.focusOffset;
}}},"default":function(bl){if(this.__hO(bl)){return bl.selectionStart;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bl)).anchorOffset;
}}}),getEnd:qx.core.Variant.select(l,{"mshtml":function(B){if(this.__hO(B)){var G=qx.bom.Range.get();
if(!B.contains(G.parentElement())){return -1;
}var H=qx.bom.Range.get(B);
var F=B.value.length;
H.moveToBookmark(G.getBookmark());
H.moveStart(f,-F);
return H.text.length;
}else{var H=qx.bom.Range.get(B);
var D=H.parentElement();
var I=qx.bom.Range.get();
I.moveToElementText(D);
var F=I.text.length;
var C=qx.bom.Range.get(qx.dom.Node.getBodyElement(B));
C.setEndPoint(j,H);
C.setEndPoint(g,I);
if(I.compareEndPoints(j,C)==0){return F-1;
}var E;
var J=0;

while(true){E=C.moveEnd(k,1);
if(I.compareEndPoints(j,C)==0){break;
}if(E==0){break;
}else{J++;
}}return F-(++J);
}},"gecko|webkit":function(X){if(this.__hO(X)){return X.selectionEnd;
}else{var ba=qx.dom.Node.getDocument(X);
var Y=this.getSelectionObject(ba);
if(Y.focusOffset>Y.anchorOffset){return Y.focusOffset;
}else{return Y.anchorOffset;
}}},"default":function(bu){if(this.__hO(bu)){return bu.selectionEnd;
}else{return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bu)).focusOffset;
}}}),__hO:function(z){return qx.dom.Node.isElement(z)&&(z.nodeName.toLowerCase()==i||z.nodeName.toLowerCase()==h);
},set:qx.core.Variant.select(l,{"mshtml":function(u,v,w){var x;
if(qx.dom.Node.isDocument(u)){u=u.body;
}
if(qx.dom.Node.isElement(u)||qx.dom.Node.isText(u)){switch(u.nodeName.toLowerCase()){case i:case h:case d:if(w===undefined){w=u.value.length;
}
if(v>=0&&v<=u.value.length&&w>=0&&w<=u.value.length){x=qx.bom.Range.get(u);
x.collapse(true);
x.moveStart(k,v);
x.moveEnd(k,w-v);
x.select();
return true;
}break;
case c:if(w===undefined){w=u.nodeValue.length;
}
if(v>=0&&v<=u.nodeValue.length&&w>=0&&w<=u.nodeValue.length){x=qx.bom.Range.get(qx.dom.Node.getBodyElement(u));
x.moveToElementText(u.parentNode);
x.collapse(true);
x.moveStart(k,v);
x.moveEnd(k,w-v);
x.select();
return true;
}break;
default:if(w===undefined){w=u.childNodes.length-1;
}if(u.childNodes[v]&&u.childNodes[w]){x=qx.bom.Range.get(qx.dom.Node.getBodyElement(u));
x.moveToElementText(u.childNodes[v]);
x.collapse(true);
var y=qx.bom.Range.get(qx.dom.Node.getBodyElement(u));
y.moveToElementText(u.childNodes[w]);
x.setEndPoint(j,y);
x.select();
return true;
}}}return false;
},"default":function(bb,bc,bd){var bh=bb.nodeName.toLowerCase();

if(qx.dom.Node.isElement(bb)&&(bh==i||bh==h)){if(bd===undefined){bd=bb.value.length;
}if(bc>=0&&bc<=bb.value.length&&bd>=0&&bd<=bb.value.length){bb.focus();
bb.select();
bb.setSelectionRange(bc,bd);
return true;
}}else{var bf=false;
var bg=qx.dom.Node.getWindow(bb).getSelection();
var be=qx.bom.Range.get(bb);
if(qx.dom.Node.isText(bb)){if(bd===undefined){bd=bb.length;
}
if(bc>=0&&bc<bb.length&&bd>=0&&bd<=bb.length){bf=true;
}}else if(qx.dom.Node.isElement(bb)){if(bd===undefined){bd=bb.childNodes.length-1;
}
if(bc>=0&&bb.childNodes[bc]&&bd>=0&&bb.childNodes[bd]){bf=true;
}}else if(qx.dom.Node.isDocument(bb)){bb=bb.body;

if(bd===undefined){bd=bb.childNodes.length-1;
}
if(bc>=0&&bb.childNodes[bc]&&bd>=0&&bb.childNodes[bd]){bf=true;
}}
if(bf){if(!bg.isCollapsed){bg.collapseToStart();
}be.setStart(bb,bc);
if(qx.dom.Node.isText(bb)){be.setEnd(bb,bd);
}else{be.setEndAfter(bb.childNodes[bd]);
}if(bg.rangeCount>0){bg.removeAllRanges();
}bg.addRange(be);
return true;
}}return false;
}}),setAll:function(a){return qx.bom.Selection.set(a,0);
},clear:qx.core.Variant.select(l,{"mshtml":function(T){var U=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(T));
var V=qx.bom.Range.get(T);
var parent=V.parentElement();
var W=qx.bom.Range.get(qx.dom.Node.getDocument(T));
if(parent==W.parentElement()&&parent==T){U.empty();
}},"default":function(n){var p=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(n));
var r=n.nodeName.toLowerCase();
if(qx.dom.Node.isElement(n)&&(r==i||r==h)){n.setSelectionRange(0,0);
qx.bom.Element.blur(n);
}else if(qx.dom.Node.isDocument(n)||r==b){p.collapse(n.body?n.body:n,0);
}else{var q=qx.bom.Range.get(n);

if(!q.collapsed){var s;
var o=q.commonAncestorContainer;
if(qx.dom.Node.isElement(n)&&qx.dom.Node.isText(o)){s=o.parentNode;
}else{s=o;
}
if(s==n){p.collapse(n,0);
}}}}})}});
})();
(function(){var l="button",k="qx.bom.Range",j="text",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="qx.client",b="body";
qx.Class.define(k,{statics:{get:qx.core.Variant.select(a,{"mshtml":function(p){if(qx.dom.Node.isElement(p)){switch(p.nodeName.toLowerCase()){case d:switch(p.type){case j:case i:case c:case l:case f:case h:case g:return p.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}break;
case e:case b:case l:return p.createTextRange();
break;
default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}}else{if(p==null){p=window;
}return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(p)).createRange();
}},"default":function(m){var n=qx.dom.Node.getDocument(m);
var o=qx.bom.Selection.getSelectionObject(n);

if(o.rangeCount>0){return o.getRangeAt(0);
}else{return n.createRange();
}}})}});
})();
(function(){var j="",h="m",g="g",f="^",e="qx.util.StringSplit",d="i",c="$(?!\\s)",b="[object RegExp]",a="y";
qx.Class.define(e,{statics:{split:function(k,l,m){if(Object.prototype.toString.call(l)!==b){return String.prototype.split.call(k,l,m);
}var t=[],n=0,r=(l.ignoreCase?d:j)+(l.multiline?h:j)+(l.sticky?a:j),l=RegExp(l.source,r+g),q,u,o,p,s=/()??/.exec(j)[1]===undefined;
k=k+j;

if(!s){q=RegExp(f+l.source+c,r);
}if(m===undefined||+m<0){m=Infinity;
}else{m=Math.floor(+m);

if(!m){return [];
}}
while(u=l.exec(k)){o=u.index+u[0].length;

if(o>n){t.push(k.slice(n,u.index));
if(!s&&u.length>1){u[0].replace(q,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){u[i]=undefined;
}}});
}
if(u.length>1&&u.index<k.length){Array.prototype.push.apply(t,u.slice(1));
}p=u[0].length;
n=o;

if(t.length>=m){break;
}}
if(l.lastIndex===u.index){l.lastIndex++;
}}
if(n===k.length){if(p||!l.test(j)){t.push(j);
}}else{t.push(k.slice(n));
}return t.length>m?t.slice(0,m):t;
}}});
})();
(function(){var b="qx.ui.core.queue.Widget",a="widget";
qx.Class.define(b,{statics:{__hP:{},remove:function(e){delete this.__hP[e.$$hash];
},add:function(c){var d=this.__hP;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var f=this.__hP;
var h;

for(var g in f){h=f[g];
delete f[g];
h.syncWidget();
}for(var g in f){return;
}this.__hP={};
}}});
})();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";
qx.Class.define(b,{statics:{__hQ:{},__hR:{},remove:function(i){var j=i.$$hash;
delete this.__hR[j];
delete this.__hQ[j];
},isVisible:function(c){return this.__hR[c.$$hash]||false;
},__hS:function(m){var o=this.__hR;
var n=m.$$hash;
var p;
if(m.isExcluded()){p=false;
}else{var parent=m.$$parent;

if(parent){p=this.__hS(parent);
}else{p=m.isRootWidget();
}}return o[n]=p;
},add:function(k){var l=this.__hQ;

if(l[k.$$hash]){return;
}l[k.$$hash]=k;
qx.ui.core.queue.Manager.scheduleFlush(a);
},flush:function(){var d=this.__hQ;
var h=this.__hR;
for(var e in d){if(h[e]!=null){d[e].addChildrenToQueue(d);
}}var g={};

for(var e in d){g[e]=h[e];
h[e]=null;
}for(var e in d){var f=d[e];
delete d[e];
if(h[e]==null){this.__hS(f);
}if(h[e]&&h[e]!=g[e]){f.checkAppearanceNeeds();
}}this.__hQ={};
}}});
})();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";
qx.Class.define(a,{statics:{__hT:{},remove:function(j){delete this.__hT[j.$$hash];
},add:function(h){var i=this.__hT;

if(i[h.$$hash]){return;
}i[h.$$hash]=h;
qx.ui.core.queue.Manager.scheduleFlush(b);
},has:function(c){return !!this.__hT[c.$$hash];
},flush:function(){var g=qx.ui.core.queue.Visibility;
var d=this.__hT;
var f;

for(var e in d){f=d[e];
delete d[e];
if(g.isVisible(f)){f.syncAppearance();
}else{f.$$stateChanges=true;
}}}}});
})();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";
qx.Class.define(a,{statics:{__hU:{},add:function(c){var d=this.__hU;

if(d[c.$$hash]){return;
}d[c.$$hash]=c;
qx.ui.core.queue.Manager.scheduleFlush(b);
},flush:function(){var e=this.__hU;

for(var g in e){var f=e[g];
delete e[g];
f.dispose();
}for(var g in e){return;
}this.__hU={};
}}});
})();
(function(){var d="none",c="qx.html.Decorator",b="absolute";
qx.Class.define(c,{extend:qx.html.Element,construct:function(g,h){var i={position:b,top:0,left:0};

if(qx.bom.client.Feature.CSS_POINTER_EVENTS){i.pointerEvents=d;
}qx.html.Element.call(this,null,i);
this.__hV=g;
this.__hW=h||g.toHashCode();
this.useMarkup(g.getMarkup());
},members:{__hW:null,__hV:null,getId:function(){return this.__hW;
},getDecorator:function(){return this.__hV;
},resize:function(e,f){this.__hV.resize(this.getDomElement(),e,f);
},tint:function(a){this.__hV.tint(this.getDomElement(),a);
},getInsets:function(){return this.__hV.getInsets();
}},destruct:function(){this.__hV=null;
}});
})();
(function(){var f="blur",e="focus",d="input",c="load",b="qx.ui.core.EventHandler",a="activate";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this.__hX=qx.event.Registration.getManager(window);
},statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:false},members:{__hX:null,__hY:{focusin:1,focusout:1,focus:1,blur:1},__ia:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;
},_dispatchEvent:function(j){var p=j.getTarget();
var o=qx.ui.core.Widget.getWidgetByElement(p);
var q=false;

while(o&&o.isAnonymous()){var q=true;
o=o.getLayoutParent();
}if(o&&q&&j.getType()==a){o.getContainerElement().activate();
}if(this.__hY[j.getType()]){o=o&&o.getFocusTarget();
if(!o){return;
}}if(j.getRelatedTarget){var x=j.getRelatedTarget();
var w=qx.ui.core.Widget.getWidgetByElement(x);

while(w&&w.isAnonymous()){w=w.getLayoutParent();
}
if(w){if(this.__hY[j.getType()]){w=w.getFocusTarget();
}if(w===o){return;
}}}var s=j.getCurrentTarget();
var u=qx.ui.core.Widget.getWidgetByElement(s);

if(!u||u.isAnonymous()){return;
}if(this.__hY[j.getType()]){u=u.getFocusTarget();
}var v=j.getType();

if(!u||!(u.isEnabled()||this.__ia[v])){return;
}var k=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;
var r=this.__hX.getListeners(u,v,k);

if(!r||r.length===0){return;
}var m=qx.event.Pool.getInstance().getObject(j.constructor);
j.clone(m);
m.setTarget(o);
m.setRelatedTarget(w||null);
m.setCurrentTarget(u);
var y=j.getOriginalTarget();

if(y){var n=qx.ui.core.Widget.getWidgetByElement(y);

while(n&&n.isAnonymous()){n=n.getLayoutParent();
}m.setOriginalTarget(n);
}else{m.setOriginalTarget(p);
}for(var i=0,l=r.length;i<l;i++){var t=r[i].context||u;
r[i].handler.call(t,m);
}if(m.getPropagationStopped()){j.stopPropagation();
}
if(m.getDefaultPrevented()){j.preventDefault();
}qx.event.Pool.getInstance().poolObject(m);
},registerEvent:function(E,F,G){var H;

if(F===e||F===f){H=E.getFocusElement();
}else if(F===c||F===d){H=E.getContentElement();
}else{H=E.getContainerElement();
}
if(H){H.addListener(F,this._dispatchEvent,this,G);
}},unregisterEvent:function(z,A,B){var C;

if(A===e||A===f){C=z.getFocusElement();
}else if(A===c||A===d){C=z.getContentElement();
}else{C=z.getContainerElement();
}
if(C){C.removeListener(A,this._dispatchEvent,this,B);
}}},destruct:function(){this.__hX=null;
},defer:function(D){qx.event.Registration.addHandler(D);
}});
})();
(function(){var c="qx.bom.client.Locale",b="-",a="";
qx.Class.define(c,{statics:{LOCALE:"",VARIANT:"",__id:function(){var e=(navigator.userLanguage||navigator.language).toLowerCase();
var g=a;
var f=e.indexOf(b);

if(f!=-1){g=e.substr(f+1);
e=e.substr(0,f);
}this.LOCALE=e;
this.VARIANT=g;
}},defer:function(d){d.__id();
}});
})();
(function(){var t="",s='indexOf',r='slice',q='concat',p='toLocaleLowerCase',o="qx.type.BaseString",n='match',m='toLocaleUpperCase',k='search',j='replace',c='toLowerCase',h='charCodeAt',f='split',b='substring',a='lastIndexOf',e='substr',d='toUpperCase',g='charAt';
qx.Class.define(o,{extend:Object,construct:function(z){var z=z||t;
this.__ie=z;
this.length=z.length;
},members:{$$isString:true,length:0,__ie:null,toString:function(){return this.__ie;
},charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);
},toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(x,y){return qx.core.Object.prototype.base.apply(this,arguments);
}},defer:function(u,v){{};
var w=[g,h,q,s,a,n,j,k,r,f,e,b,c,d,p,m];
v.valueOf=v.toString;

if(new u(t).valueOf()==null){delete v.valueOf;
}
for(var i=0,l=w.length;i<l;i++){v[w[i]]=String.prototype[w[i]];
}}});
})();
(function(){var a="qx.locale.LocalizedString";
qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);
this.__if=c;
this.__ig=d;
},members:{__if:null,__ig:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__if,this.__ig);
}}});
})();
(function(){var k="_",j="",h="_applyLocale",g="changeLocale",f="C",e="qx.dynlocale",d="on",c="qx.locale.Manager",b="String",a="singleton";
qx.Class.define(c,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__ih=qx.$$translations||{};
this.__ii=qx.$$locales||{};
var G=qx.bom.client.Locale;
var E=G.LOCALE;
var F=G.VARIANT;

if(F!==j){E+=k+F;
}this.setLocale(E||this.__ij);
},statics:{tr:function(S,T){var U=qx.lang.Array.fromArguments(arguments);
U.splice(0,1);
return qx.locale.Manager.getInstance().translate(S,U);
},trn:function(l,m,n,o){var p=qx.lang.Array.fromArguments(arguments);
p.splice(0,3);
if(n!=1){return qx.locale.Manager.getInstance().translate(m,p);
}else{return qx.locale.Manager.getInstance().translate(l,p);
}},trc:function(bd,be,bf){var bg=qx.lang.Array.fromArguments(arguments);
bg.splice(0,2);
return qx.locale.Manager.getInstance().translate(be,bg);
},marktr:function(R){return R;
}},properties:{locale:{check:b,nullable:true,apply:h,event:g}},members:{__ij:f,__ik:null,__il:null,__ih:null,__ii:null,getLanguage:function(){return this.__il;
},getTerritory:function(){return this.getLocale().split(k)[1]||j;
},getAvailableLocales:function(){var M=[];

for(var L in this.__ii){if(L!=this.__ij){M.push(L);
}}return M;
},__im:function(ba){var bc;
var bb=ba.indexOf(k);

if(bb==-1){bc=ba;
}else{bc=ba.substring(0,bb);
}return bc;
},_applyLocale:function(q,r){this.__ik=q;
this.__il=this.__im(q);
},addTranslation:function(H,I){var J=this.__ih;

if(J[H]){for(var K in I){J[H][K]=I[K];
}}else{J[H]=I;
}},addLocale:function(V,W){var X=this.__ii;

if(X[V]){for(var Y in W){X[V][Y]=W[Y];
}}else{X[V]=W;
}},translate:function(A,B,C){var D=this.__ih;
return this.__in(D,A,B,C);
},localize:function(N,O,P){var Q=this.__ii;
return this.__in(Q,N,O,P);
},__in:function(s,t,u,v){var w;

if(!s){return t;
}
if(v){var y=this.__im(v);
}else{v=this.__ik;
y=this.__il;
}if(!w&&s[v]){w=s[v][t];
}if(!w&&s[y]){w=s[y][t];
}if(!w&&s[this.__ij]){w=s[this.__ij][t];
}
if(!w){w=t;
}
if(u.length>0){var x=[];

for(var i=0;i<u.length;i++){var z=u[i];

if(z&&z.translate){x[i]=z.translate();
}else{x[i]=z;
}}w=qx.lang.String.format(w,x);
}
if(qx.core.Variant.isSet(e,d)){w=new qx.locale.LocalizedString(w,t,u);
}return w;
}},destruct:function(){this.__ih=this.__ii=null;
}});
})();
(function(){var j="source",i="scale",h="no-repeat",g="qx.client",f="mshtml",e="webkit",d="backgroundImage",c="div",b="qx.html.Image",a="qx/static/blank.gif";
qx.Class.define(b,{extend:qx.html.Element,members:{tagNameHint:null,_applyProperty:function(name,q){qx.html.Element.prototype._applyProperty.call(this,name,q);

if(name===j){var u=this.getDomElement();
var r=this.getAllStyles();

if(this.getNodeName()==c&&this.getStyle(d)){r.backgroundPosition=null;
r.backgroundRepeat=null;
}var s=this._getProperty(j);
var t=this._getProperty(i);
var v=t?i:h;
if(s!=null){qx.bom.element.Decoration.update(u,s,v,r);
}}},_createDomElement:function(){var l=this._getProperty(i);
var m=l?i:h;

if(qx.core.Variant.isSet(g,f)){var k=this._getProperty(j);

if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);
}else{this.setNodeName(qx.bom.element.Decoration.getTagName(m,k));
}}else{this.setNodeName(qx.bom.element.Decoration.getTagName(m));
}return qx.html.Element.prototype._createDomElement.call(this);
},_copyData:function(n){return qx.html.Element.prototype._copyData.call(this,true);
},setSource:function(p){this._setProperty(j,p);
return this;
},getSource:function(){return this._getProperty(j);
},resetSource:function(){if(qx.core.Variant.isSet(g,e)){this._setProperty(j,qx.util.ResourceManager.getInstance().toUri(a));
}else{this._removeProperty(j,true);
}return this;
},setScale:function(o){this._setProperty(i,o);
return this;
},getScale:function(){return this._getProperty(i);
}}});
})();
(function(){var ba="nonScaled",Y="scaled",X="alphaScaled",W=".png",V="qx.client",U="div",T="replacement",S="qx.event.type.Event",R="hidden",Q="Boolean",bp="px",bo="scale",bn="changeSource",bm="qx.ui.basic.Image",bl="loaded",bk="-disabled.$1",bj="loadingFailed",bi="String",bh="_applySource",bg="img",be="image",bf="mshtml",bc="_applyScale",bd="no-repeat",bb="__iL";
qx.Class.define(bm,{extend:qx.ui.core.Widget,construct:function(D){this.__iL={};
qx.ui.core.Widget.call(this);

if(D){this.setSource(D);
}},properties:{source:{check:bi,init:null,nullable:true,event:bn,apply:bh,themeable:true},scale:{check:Q,init:false,themeable:true,apply:bc},appearance:{refine:true,init:be},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:S,loaded:S},members:{__iM:null,__iN:null,__iO:null,__iL:null,getContentElement:function(){return this.__iS();
},_createContentElement:function(){return this.__iS();
},_getContentHint:function(){return {width:this.__iM||0,height:this.__iN||0};
},_applyEnabled:function(c,d){qx.ui.core.Widget.prototype._applyEnabled.call(this,c,d);

if(this.getSource()){this._styleSource();
}},_applySource:function(a){this._styleSource();
},_applyScale:function(b){this._styleSource();
},__iP:function(v){this.__iO=v;
},__iQ:function(){if(this.__iO==null){var t=this.getSource();
var s=false;

if(t!=null){s=qx.lang.String.endsWith(t,W);
}
if(this.getScale()&&s&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__iO=X;
}else if(this.getScale()){this.__iO=Y;
}else{this.__iO=ba;
}}return this.__iO;
},__iR:function(o){var p;
var q;

if(o==X){p=true;
q=U;
}else if(o==ba){p=false;
q=U;
}else{p=true;
q=bg;
}var r=new qx.html.Image(q);
r.setScale(p);
r.setStyles({"overflowX":R,"overflowY":R});
return r;
},__iS:function(){var g=this.__iQ();

if(this.__iL[g]==null){this.__iL[g]=this.__iR(g);
}return this.__iL[g];
},_styleSource:function(){var e=qx.util.AliasManager.getInstance().resolve(this.getSource());

if(!e){this.getContentElement().resetSource();
return;
}this.__iT(e);

if(qx.core.Variant.isSet(V,bf)){var f=this.getScale()?bo:bd;
this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(f,e);
}if(qx.util.ResourceManager.getInstance().has(e)){this.__iV(this.getContentElement(),e);
}else if(qx.io.ImageLoader.isLoaded(e)){this.__iW(this.getContentElement(),e);
}else{this.__iX(this.getContentElement(),e);
}},__iT:qx.core.Variant.select(V,{"mshtml":function(I){var K=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();
var J=qx.lang.String.endsWith(I,W);

if(K&&J){if(this.getScale()&&this.__iQ()!=X){this.__iP(X);
}else if(!this.getScale()&&this.__iQ()!=ba){this.__iP(ba);
}}else{if(this.getScale()&&this.__iQ()!=Y){this.__iP(Y);
}else if(!this.getScale()&&this.__iQ()!=ba){this.__iP(ba);
}}this.__iU(this.__iS());
},"default":function(u){if(this.getScale()&&this.__iQ()!=Y){this.__iP(Y);
}else if(!this.getScale()&&this.__iQ(ba)){this.__iP(ba);
}this.__iU(this.__iS());
}}),__iU:function(w){var z=this.getContainerElement();
var A=z.getChild(0);

if(A!=w){if(A!=null){var C=bp;
var x={};
var y=this.getInnerSize();

if(y!=null){x.width=y.width+C;
x.height=y.height+C;
}var B=this.getInsets();
x.left=B.left+C;
x.top=B.top+C;
x.zIndex=10;
w.setStyles(x,true);
w.setSelectable(this.getSelectable());
}z.removeAt(0);
z.addAt(w,0);
}},__iV:function(E,F){var H=qx.util.ResourceManager.getInstance();
if(!this.getEnabled()){var G=F.replace(/\.([a-z]+)$/,bk);

if(H.has(G)){F=G;
this.addState(T);
}else{this.removeState(T);
}}if(E.getSource()===F){return;
}E.setSource(F);
this.__ja(H.getImageWidth(F),H.getImageHeight(F));
},__iW:function(h,i){var k=qx.io.ImageLoader;
h.setSource(i);
var j=k.getWidth(i);
var l=k.getHeight(i);
this.__ja(j,l);
},__iX:function(N,O){var self;
var P=qx.io.ImageLoader;
{};
if(!P.isFailed(O)){P.load(O,this.__iY,this);
}else{if(N!=null){N.resetSource();
}}},__iY:function(m,n){if(this.$$disposed===true){return;
}if(m!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;
}if(n.failed){this.warn("Image could not be loaded: "+m);
this.fireEvent(bj);
}else{this.fireEvent(bl);
}this._styleSource();
},__ja:function(L,M){if(L!==this.__iM||M!==this.__iN){this.__iM=L;
this.__iN=M;
qx.ui.core.queue.Layout.add(this);
}}},destruct:function(){this._disposeMap(bb);
}});
})();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){qx.ui.basic.Image.call(this);
this.setZIndex(1e8);
this.setDomMove(true);
var h=this.getApplicationRoot();
h.add(this,{left:-1000,top:-1000});
},properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);
}
if(i){this.addState(i);
}}}});
})();
(function(){var f="interval",e="Number",d="_applyTimeoutInterval",c="qx.event.type.Event",b="qx.event.Idle",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){qx.core.Object.call(this);
var g=new qx.event.Timer(this.getTimeoutInterval());
g.addListener(f,this._onInterval,this);
g.start();
this.__jb=g;
},events:{"interval":c},properties:{timeoutInterval:{check:e,init:100,apply:d}},members:{__jb:null,_applyTimeoutInterval:function(h){this.__jb.setInterval(h);
},_onInterval:function(){this.fireEvent(f);
}},destruct:function(){if(this.__jb){this.__jb.stop();
}this.__jb=null;
}});
})();
(function(){var o="top",n="right",m="bottom",l="left",k="align-start",j="qx.util.placement.AbstractAxis",i="edge-start",h="align-end",g="edge-end",f="-",c="best-fit",e="qx.util.placement.Placement",d='__jc',b="keep-align",a="direct";
qx.Class.define(e,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__jc=new qx.util.placement.DirectAxis();
},properties:{axisX:{check:j},axisY:{check:j},edge:{check:[o,n,m,l],init:o},align:{check:[o,n,m,l],init:n}},statics:{__jd:null,compute:function(p,q,r,s,t,u,v){this.__jd=this.__jd||new qx.util.placement.Placement();
var y=t.split(f);
var x=y[0];
var w=y[1];
this.__jd.set({axisX:this.__jh(u),axisY:this.__jh(v),edge:x,align:w});
return this.__jd.compute(p,q,r,s);
},__je:null,__jf:null,__jg:null,__jh:function(B){switch(B){case a:this.__je=this.__je||new qx.util.placement.DirectAxis();
return this.__je;
case b:this.__jf=this.__jf||new qx.util.placement.KeepAlignAxis();
return this.__jf;
case c:this.__jg=this.__jg||new qx.util.placement.BestFitAxis();
return this.__jg;
default:throw new Error("Invalid 'mode' argument!'");
}}},members:{__jc:null,compute:function(C,D,E,F){{};
var G=this.getAxisX()||this.__jc;
var I=G.computeStart(C.width,{start:E.left,end:E.right},{start:F.left,end:F.right},D.width,this.__ji());
var H=this.getAxisY()||this.__jc;
var top=H.computeStart(C.height,{start:E.top,end:E.bottom},{start:F.top,end:F.bottom},D.height,this.__jj());
return {left:I,top:top};
},__ji:function(){var A=this.getEdge();
var z=this.getAlign();

if(A==l){return i;
}else if(A==n){return g;
}else if(z==l){return k;
}else if(z==n){return h;
}},__jj:function(){var K=this.getEdge();
var J=this.getAlign();

if(K==o){return i;
}else if(K==m){return g;
}else if(J==o){return k;
}else if(J==m){return h;
}}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var e="edge-start",d="align-start",c="align-end",b="edge-end",a="qx.util.placement.AbstractAxis";
qx.Class.define(a,{extend:qx.core.Object,members:{computeStart:function(m,n,o,p,q){throw new Error("abstract method call!");
},_moveToEdgeAndAlign:function(i,j,k,l){switch(l){case e:return j.start-k.end-i;
case b:return j.end+k.start;
case d:return j.start+k.start;
case c:return j.end-k.end-i;
}},_isInRange:function(f,g,h){return f>=0&&f+g<=h;
}}});
})();
(function(){var a="qx.util.placement.DirectAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);
}}});
})();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";
qx.Class.define(c,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);
var j,k;

if(this._isInRange(i,d,g)){return i;
}
if(h==b||h==a){j=e.start-f.end;
k=e.end+f.start;
}else{j=e.end-f.end;
k=e.start+f.start;
}
if(j>g-k){i=j-d;
}else{i=k;
}return i;
}}});
})();
(function(){var a="qx.util.placement.BestFitAxis";
qx.Class.define(a,{extend:qx.util.placement.AbstractAxis,members:{computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);

if(this._isInRange(g,b,e)){return g;
}
if(g<0){g=Math.min(0,e-b);
}
if(g+b>e){g=Math.max(0,e-b);
}return g;
}}});
})();
(function(){var i="mousedown",h="__jk",g="blur",f="singleton",d="qx.ui.popup.Manager";
qx.Class.define(d,{type:f,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__jk={};
qx.event.Registration.addListener(document.documentElement,i,this.__jm,this,true);
qx.bom.Element.addListener(window,g,this.hideAll,this);
},members:{__jk:null,add:function(l){{};
this.__jk[l.$$hash]=l;
this.__jl();
},remove:function(j){{};
var k=this.__jk;

if(k){delete k[j.$$hash];
this.__jl();
}},hideAll:function(){var r=this.__jk;

if(r){for(var q in r){r[q].exclude();
}}},__jl:function(){var c=1e7;
var b=this.__jk;

for(var a in b){b[a].setZIndex(c++);
}},__jm:function(e){var o=qx.ui.core.Widget.getWidgetByElement(e.getTarget());
var p=this.__jk;

for(var n in p){var m=p[n];

if(!m.getAutoHide()||o==m||qx.ui.core.Widget.contains(m,o)){continue;
}m.exclude();
}}},destruct:function(){qx.event.Registration.removeListener(document.documentElement,i,this.__jm,this,true);
this._disposeMap(h);
}});
})();
(function(){var b="abstract",a="qx.ui.layout.Abstract";
qx.Class.define(a,{type:b,extend:qx.core.Object,members:{__jn:null,_invalidChildrenCache:null,__jo:null,invalidateLayoutCache:function(){this.__jn=null;
},renderLayout:function(h,i){this.warn("Missing renderLayout() implementation!");
},getSizeHint:function(){if(this.__jn){return this.__jn;
}return this.__jn=this._computeSizeHint();
},hasHeightForWidth:function(){return false;
},getHeightForWidth:function(c){this.warn("Missing getHeightForWidth() implementation!");
return null;
},_computeSizeHint:function(){return null;
},invalidateChildrenCache:function(){this._invalidChildrenCache=true;
},verifyLayoutProperty:null,_clearSeparators:function(){var f=this.__jo;

if(f instanceof qx.ui.core.LayoutItem){f.clearSeparators();
}},_renderSeparator:function(d,e){this.__jo.renderSeparator(d,e);
},connectToWidget:function(g){if(g&&this.__jo){throw new Error("It is not possible to manually set the connected widget.");
}this.__jo=g;
this.invalidateChildrenCache();
},_getWidget:function(){return this.__jo;
},_applyLayoutChange:function(){if(this.__jo){this.__jo.scheduleLayoutUpdate();
}},_getLayoutChildren:function(){return this.__jo.getLayoutChildren();
}},destruct:function(){this.__jo=this.__jn=null;
}});
})();
(function(){var a="qx.ui.layout.Grow";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(m,n){var r=this._getLayoutChildren();
var q,s,p,o;
for(var i=0,l=r.length;i<l;i++){q=r[i];
s=q.getSizeHint();
p=m;

if(p<s.minWidth){p=s.minWidth;
}else if(p>s.maxWidth){p=s.maxWidth;
}o=n;

if(o<s.minHeight){o=s.minHeight;
}else if(o>s.maxHeight){o=s.maxHeight;
}q.renderLayout(0,0,p,o);
}},_computeSizeHint:function(){var h=this._getLayoutChildren();
var f,k;
var j=0,g=0;
var e=0,c=0;
var b=Infinity,d=Infinity;
for(var i=0,l=h.length;i<l;i++){f=h[i];
k=f.getSizeHint();
j=Math.max(j,k.width);
g=Math.max(g,k.height);
e=Math.max(e,k.minWidth);
c=Math.max(c,k.minHeight);
b=Math.min(b,k.maxWidth);
d=Math.min(d,k.maxHeight);
}return {width:j,height:g,minWidth:e,minHeight:c,maxWidth:b,maxHeight:d};
}}});
})();
(function(){var j="label",i="icon",h="Boolean",g="both",f="String",e="left",d="changeGap",c="changeShow",b="bottom",a="_applyCenter",w="changeIcon",v="qx.ui.basic.Atom",u="changeLabel",t="Integer",s="_applyIconPosition",r="top",q="right",p="_applyRich",o="_applyIcon",n="_applyShow",l="_applyLabel",m="_applyGap",k="atom";
qx.Class.define(v,{extend:qx.ui.core.Widget,construct:function(M,N){{};
qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Atom());

if(M!=null){this.setLabel(M);
}
if(N!=null){this.setIcon(N);
}},properties:{appearance:{refine:true,init:k},label:{apply:l,nullable:true,check:f,event:u},rich:{check:h,init:false,apply:p},icon:{check:f,apply:o,nullable:true,themeable:true,event:w},gap:{check:t,nullable:false,event:d,apply:m,themeable:true,init:4},show:{init:g,check:[g,j,i],themeable:true,inheritable:true,apply:n,event:c},iconPosition:{init:e,check:[r,q,b,e],themeable:true,apply:s},center:{init:false,check:h,themeable:true,apply:a}},members:{_createChildControlImpl:function(H){var I;

switch(H){case j:I=new qx.ui.basic.Label(this.getLabel());
I.setAnonymous(true);
I.setRich(this.getRich());
this._add(I);

if(this.getLabel()==null||this.getShow()===i){I.exclude();
}break;
case i:I=new qx.ui.basic.Image(this.getIcon());
I.setAnonymous(true);
this._addAt(I,0);

if(this.getIcon()==null||this.getShow()===j){I.exclude();
}break;
}return I||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,H);
},_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===i){this._excludeChildControl(j);
}else{this._showChildControl(j);
}},_handleIcon:function(){if(this.getIcon()==null||this.getShow()===j){this._excludeChildControl(i);
}else{this._showChildControl(i);
}},_applyLabel:function(x,y){var z=this.getChildControl(j,true);

if(z){z.setValue(x);
}this._handleLabel();
},_applyRich:function(C,D){var E=this.getChildControl(j,true);

if(E){E.setRich(C);
}},_applyIcon:function(J,K){var L=this.getChildControl(i,true);

if(L){L.setSource(J);
}this._handleIcon();
},_applyGap:function(O,P){this._getLayout().setGap(O);
},_applyShow:function(F,G){this._handleLabel();
this._handleIcon();
},_applyIconPosition:function(A,B){this._getLayout().setIconPosition(A);
},_applyCenter:function(Q,R){this._getLayout().setCenter(Q);
}}});
})();
(function(){var k="bottom",j="_applyLayoutChange",h="top",g="left",f="right",e="middle",d="center",c="qx.ui.layout.Atom",b="Integer",a="Boolean";
qx.Class.define(c,{extend:qx.ui.layout.Abstract,properties:{gap:{check:b,init:4,apply:j},iconPosition:{check:[g,h,f,k],init:g,apply:j},center:{check:a,init:false,apply:j}},members:{verifyLayoutProperty:null,renderLayout:function(w,x){var G=qx.ui.layout.Util;
var z=this.getIconPosition();
var C=this._getLayoutChildren();
var length=C.length;
var Q,top,P,A;
var L,F;
var J=this.getGap();
var O=this.getCenter();
if(z===k||z===f){var H=length-1;
var D=-1;
var B=-1;
}else{var H=0;
var D=length;
var B=1;
}if(z==h||z==k){if(O){var K=0;

for(var i=H;i!=D;i+=B){A=C[i].getSizeHint().height;

if(A>0){K+=A;

if(i!=H){K+=J;
}}}top=Math.round((x-K)/2);
}else{top=0;
}
for(var i=H;i!=D;i+=B){L=C[i];
F=L.getSizeHint();
P=Math.min(F.maxWidth,Math.max(w,F.minWidth));
A=F.height;
Q=G.computeHorizontalAlignOffset(d,P,w);
L.renderLayout(Q,top,P,A);
if(A>0){top+=A+J;
}}}else{var E=w;
var y=null;
var N=0;

for(var i=H;i!=D;i+=B){L=C[i];
P=L.getSizeHint().width;

if(P>0){if(!y&&L instanceof qx.ui.basic.Label){y=L;
}else{E-=P;
}N++;
}}
if(N>1){var M=(N-1)*J;
E-=M;
}
if(y){var F=y.getSizeHint();
var I=Math.max(F.minWidth,Math.min(E,F.maxWidth));
E-=I;
}
if(O&&E>0){Q=Math.round(E/2);
}else{Q=0;
}
for(var i=H;i!=D;i+=B){L=C[i];
F=L.getSizeHint();
A=Math.min(F.maxHeight,Math.max(x,F.minHeight));

if(L===y){P=I;
}else{P=F.width;
}top=G.computeVerticalAlignOffset(e,F.height,x);
L.renderLayout(Q,top,P,A);
if(P>0){Q+=P+J;
}}}},_computeSizeHint:function(){var v=this._getLayoutChildren();
var length=v.length;
var n,t;
if(length===1){var n=v[0].getSizeHint();
t={width:n.width,height:n.height,minWidth:n.minWidth,minHeight:n.minHeight};
}else{var r=0,s=0;
var o=0,q=0;
var p=this.getIconPosition();
var u=this.getGap();

if(p===h||p===k){var l=0;

for(var i=0;i<length;i++){n=v[i].getSizeHint();
s=Math.max(s,n.width);
r=Math.max(r,n.minWidth);
if(n.height>0){q+=n.height;
o+=n.minHeight;
l++;
}}
if(l>1){var m=(l-1)*u;
q+=m;
o+=m;
}}else{var l=0;

for(var i=0;i<length;i++){n=v[i].getSizeHint();
q=Math.max(q,n.height);
o=Math.max(o,n.minHeight);
if(n.width>0){s+=n.width;
r+=n.minWidth;
l++;
}}
if(l>1){var m=(l-1)*u;
s+=m;
r+=m;
}}t={minWidth:r,width:s,minHeight:o,height:q};
}return t;
}}});
})();
(function(){var g="middle",f="qx.ui.layout.Util",e="left",d="center",c="top",b="bottom",a="right";
qx.Class.define(f,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(p,q,r){var t,x,s,y;
var u=q>r;
var z=Math.abs(q-r);
var A,v;
var w={};

for(x in p){t=p[x];
w[x]={potential:u?t.max-t.value:t.value-t.min,flex:u?t.flex:1/t.flex,offset:0};
}while(z!=0){y=Infinity;
s=0;

for(x in w){t=w[x];

if(t.potential>0){s+=t.flex;
y=Math.min(y,t.potential/t.flex);
}}if(s==0){break;
}y=Math.min(z,y*s)/s;
A=0;

for(x in w){t=w[x];

if(t.potential>0){v=Math.min(z,t.potential,Math.ceil(y*t.flex));
A+=v-y*t.flex;

if(A>=1){A-=1;
v-=1;
}t.potential-=v;

if(u){t.offset+=v;
}else{t.offset-=v;
}z-=v;
}}}return w;
},computeHorizontalAlignOffset:function(h,j,k,m,n){if(m==null){m=0;
}
if(n==null){n=0;
}var o=0;

switch(h){case e:o=m;
break;
case a:o=k-j-n;
break;
case d:o=Math.round((k-j)/2);
if(o<m){o=m;
}else if(o<n){o=Math.max(m,k-j-n);
}break;
}return o;
},computeVerticalAlignOffset:function(bk,bl,bm,bn,bo){if(bn==null){bn=0;
}
if(bo==null){bo=0;
}var bp=0;

switch(bk){case c:bp=bn;
break;
case b:bp=bm-bl-bo;
break;
case g:bp=Math.round((bm-bl)/2);
if(bp<bn){bp=bn;
}else if(bp<bo){bp=Math.max(bn,bm-bl-bo);
}break;
}return bp;
},collapseMargins:function(B){var C=0,E=0;

for(var i=0,l=arguments.length;i<l;i++){var D=arguments[i];

if(D<0){E=Math.min(E,D);
}else if(D>0){C=Math.max(C,D);
}}return C+E;
},computeHorizontalGaps:function(F,G,H){if(G==null){G=0;
}var I=0;

if(H){I+=F[0].getMarginLeft();

for(var i=1,l=F.length;i<l;i+=1){I+=this.collapseMargins(G,F[i-1].getMarginRight(),F[i].getMarginLeft());
}I+=F[l-1].getMarginRight();
}else{for(var i=1,l=F.length;i<l;i+=1){I+=F[i].getMarginLeft()+F[i].getMarginRight();
}I+=(G*(l-1));
}return I;
},computeVerticalGaps:function(bg,bh,bi){if(bh==null){bh=0;
}var bj=0;

if(bi){bj+=bg[0].getMarginTop();

for(var i=1,l=bg.length;i<l;i+=1){bj+=this.collapseMargins(bh,bg[i-1].getMarginBottom(),bg[i].getMarginTop());
}bj+=bg[l-1].getMarginBottom();
}else{for(var i=1,l=bg.length;i<l;i+=1){bj+=bg[i].getMarginTop()+bg[i].getMarginBottom();
}bj+=(bh*(l-1));
}return bj;
},computeHorizontalSeparatorGaps:function(X,Y,ba){var bd=qx.theme.manager.Decoration.getInstance().resolve(ba);
var bc=bd.getInsets();
var bb=bc.left+bc.right;
var be=0;

for(var i=0,l=X.length;i<l;i++){var bf=X[i];
be+=bf.getMarginLeft()+bf.getMarginRight();
}be+=(Y+bb+Y)*(l-1);
return be;
},computeVerticalSeparatorGaps:function(J,K,L){var O=qx.theme.manager.Decoration.getInstance().resolve(L);
var N=O.getInsets();
var M=N.top+N.bottom;
var P=0;

for(var i=0,l=J.length;i<l;i++){var Q=J[i];
P+=Q.getMarginTop()+Q.getMarginBottom();
}P+=(K+M+K)*(l-1);
return P;
},arrangeIdeals:function(R,S,T,U,V,W){if(S<R||V<U){if(S<R&&V<U){S=R;
V=U;
}else if(S<R){V-=(R-S);
S=R;
if(V<U){V=U;
}}else if(V<U){S-=(U-V);
V=U;
if(S<R){S=R;
}}}
if(S>T||V>W){if(S>T&&V>W){S=T;
V=W;
}else if(S>T){V+=(S-T);
S=T;
if(V>W){V=W;
}}else if(V>W){S+=(V-W);
V=W;
if(S>T){S=T;
}}}return {begin:S,end:V};
}}});
})();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";
qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var m="qx.dynlocale",l="text",k="Boolean",j="qx.client",i="color",h="userSelect",g="changeLocale",f="enabled",d="none",c="on",K="_applyTextAlign",J="qx.ui.core.Widget",I="nowrap",H="gecko",G="changeTextAlign",F="_applyWrap",E="changeValue",D="changeContent",C="qx.ui.basic.Label",B="A",t="whiteSpace",u="_applyValue",r="center",s="_applyBuddy",p="String",q="textAlign",n="right",o="changeRich",v="normal",w="_applyRich",y="click",x="label",A="webkit",z="left";
qx.Class.define(C,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(Q){qx.ui.core.Widget.call(this);

if(Q!=null){this.setValue(Q);
}
if(qx.core.Variant.isSet(m,c)){qx.locale.Manager.getInstance().addListener(g,this._onChangeLocale,this);
}},properties:{rich:{check:k,init:false,event:o,apply:w},wrap:{check:k,init:true,apply:F},value:{check:p,apply:u,event:E,nullable:true},buddy:{check:J,apply:s,nullable:true,init:null,dereference:true},textAlign:{check:[z,r,n],nullable:true,themeable:true,apply:K,event:G},appearance:{refine:true,init:x},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__jp:null,__jq:null,__jr:null,__js:null,_getContentHint:function(){if(this.__jq){this.__jt=this.__ju();
delete this.__jq;
}return {width:this.__jt.width,height:this.__jt.height};
},_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();
},_applySelectable:function(bf){if(qx.core.Variant.isSet(j,H)){if(bf&&!this.isRich()){{};
return;
}}qx.ui.core.Widget.prototype._applySelectable.call(this,bf);
if(qx.core.Variant.isSet(j,A)){this.getContainerElement().setStyle(h,bf?l:d);
this.getContentElement().setStyle(h,bf?l:d);
}},_getContentHeightForWidth:function(bg){if(!this.getRich()&&!this.getWrap()){return null;
}return this.__ju(bg).height;
},_createContentElement:function(){return new qx.html.Label;
},_applyTextAlign:function(a,b){this.getContentElement().setStyle(q,a);
},_applyTextColor:function(O,P){if(O){this.getContentElement().setStyle(i,qx.theme.manager.Color.getInstance().resolve(O));
}else{this.getContentElement().removeStyle(i);
}},__jt:{width:0,height:0},_applyFont:function(U,V){var W;

if(U){this.__jp=qx.theme.manager.Font.getInstance().resolve(U);
W=this.__jp.getStyles();
}else{this.__jp=null;
W=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(W);
this.__jq=true;
qx.ui.core.queue.Layout.add(this);
},__ju:function(ba){var be=qx.bom.Label;
var bc=this.getFont();
var bb=bc?this.__jp.getStyles():qx.bom.Font.getDefaultStyles();
var content=this.getValue()||B;
var bd=this.getRich();
return bd?be.getHtmlSize(content,bb,ba):be.getTextSize(content,bb);
},_applyBuddy:function(L,M){if(M!=null){M.removeBinding(this.__jr);
this.__jr=null;
this.removeListenerById(this.__js);
this.__js=null;
}
if(L!=null){this.__jr=L.bind(f,this,f);
this.__js=this.addListener(y,function(){if(L.isFocusable()){L.focus.apply(L);
}},this);
}},_applyRich:function(bh){this.getContentElement().setRich(bh);
this.__jq=true;
qx.ui.core.queue.Layout.add(this);
},_applyWrap:function(R,S){if(R&&!this.isRich()){{};
}
if(this.isRich()){var T=R?v:I;
this.getContentElement().setStyle(t,T);
}},_onChangeLocale:qx.core.Variant.select(m,{"on":function(e){var content=this.getValue();

if(content&&content.translate){this.setValue(content.translate());
}},"off":null}),_applyValue:function(X,Y){this.getContentElement().setValue(X);
this.__jq=true;
qx.ui.core.queue.Layout.add(this);
this.fireDataEvent(D,X,Y);
}},destruct:function(){if(qx.core.Variant.isSet(m,c)){qx.locale.Manager.getInstance().removeListener(g,this._onChangeLocale,this);
}if(this.__jr!=null){var N=this.getBuddy();

if(N!=null&&!N.isDisposed()){N.removeBinding(this.__jr);
}}this.__jp=this.__jr=null;
}});
})();
(function(){var b="value",a="qx.html.Label";
qx.Class.define(a,{extend:qx.html.Element,members:{__jv:null,_applyProperty:function(name,c){qx.html.Element.prototype._applyProperty.call(this,name,c);

if(name==b){var d=this.getDomElement();
qx.bom.Label.setValue(d,c);
}},_createDomElement:function(){var j=this.__jv;
var i=qx.bom.Label.create(this._content,j);
return i;
},_copyData:function(e){return qx.html.Element.prototype._copyData.call(this,true);
},setRich:function(g){var h=this.getDomElement();

if(h){throw new Error("The label mode cannot be modified after initial creation");
}g=!!g;

if(this.__jv==g){return;
}this.__jv=g;
return this;
},setValue:function(f){this._setProperty(b,f);
return this;
},getValue:function(){return this._getProperty(b);
}}});
})();
(function(){var j="qx.client",i="gecko",h="div",g="inherit",f="text",e="value",d="",c="hidden",b="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",a="nowrap",z="auto",y="0",x="ellipsis",w="normal",v="label",u="px",t="crop",s="end",r="100%",q="visible",o="qx.bom.Label",p="opera",m="block",n="none",k="-1000px",l="absolute";
qx.Class.define(o,{statics:{__jw:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__jx:function(){var U=this.__jz(false);
document.body.insertBefore(U,document.body.firstChild);
return this._textElement=U;
},__jy:function(){var T=this.__jz(true);
document.body.insertBefore(T,document.body.firstChild);
return this._htmlElement=T;
},__jz:function(D){var E=qx.bom.Element.create(h);
var F=E.style;
F.width=F.height=z;
F.left=F.top=k;
F.visibility=c;
F.position=l;
F.overflow=q;

if(D){F.whiteSpace=w;
}else{F.whiteSpace=a;

if(qx.core.Variant.isSet(j,i)){var G=document.createElementNS(b,v);
var F=G.style;
F.padding=y;

for(var H in this.__jw){F[H]=g;
}E.appendChild(G);
}}return E;
},__jA:function(bc){var bd={};

if(bc){bd.whiteSpace=w;
}else if(qx.core.Variant.isSet(j,i)){bd.display=m;
}else{bd.overflow=c;
bd.whiteSpace=a;
bd.textOverflow=x;
bd.userSelect=n;
if(qx.core.Variant.isSet(j,p)){bd.OTextOverflow=x;
}}return bd;
},create:function(content,V,W){if(!W){W=window;
}
if(V){var X=W.document.createElement(h);
X.useHtml=true;
}else if(qx.core.Variant.isSet(j,i)){var X=W.document.createElement(h);
var ba=W.document.createElementNS(b,v);
var Y=ba.style;
Y.cursor=g;
Y.color=g;
Y.overflow=c;
Y.maxWidth=r;
Y.padding=y;
for(var bb in this.__jw){ba.style[bb]=g;
}ba.setAttribute(t,s);
X.appendChild(ba);
}else{var X=W.document.createElement(h);
qx.bom.element.Style.setStyles(X,this.__jA(V));
}
if(content){this.setValue(X,content);
}return X;
},setValue:function(I,J){J=J||d;

if(I.useHtml){I.innerHTML=J;
}else if(qx.core.Variant.isSet(j,i)){I.firstChild.setAttribute(e,J);
}else{qx.bom.element.Attribute.set(I,f,J);
}},getValue:function(P){if(P.useHtml){return P.innerHTML;
}else if(qx.core.Variant.isSet(j,i)){return P.firstChild.getAttribute(e)||d;
}else{return qx.bom.element.Attribute.get(P,f);
}},getHtmlSize:function(content,Q,R){var S=this._htmlElement||this.__jy();
S.style.width=R!==undefined?R+u:z;
S.innerHTML=content;
return this.__jB(S,Q);
},getTextSize:function(A,B){var C=this._textElement||this.__jx();

if(qx.core.Variant.isSet(j,i)){C.firstChild.setAttribute(e,A);
}else{qx.bom.element.Attribute.set(C,f,A);
}return this.__jB(C,B);
},__jB:function(K,L){var M=this.__jw;

if(!L){L={};
}
for(var N in M){K.style[N]=L[N]||d;
}var O=qx.bom.element.Dimension.getSize(K);

if(qx.core.Variant.isSet(j,i)){if(!qx.bom.client.Platform.WIN){O.width++;
}}return O;
}}});
})();
(function(){var i="0px",h="mshtml",g="qx.client",f="qx.bom.element.Dimension",e="paddingRight",d="paddingLeft",c="paddingTop",b="paddingBottom";
qx.Class.define(f,{statics:{getWidth:qx.core.Variant.select(g,{"gecko":function(j){if(j.getBoundingClientRect){var k=j.getBoundingClientRect();
return Math.round(k.right)-Math.round(k.left);
}else{return j.offsetWidth;
}},"default":function(n){return n.offsetWidth;
}}),getHeight:qx.core.Variant.select(g,{"gecko":function(l){if(l.getBoundingClientRect){var m=l.getBoundingClientRect();
return Math.round(m.bottom)-Math.round(m.top);
}else{return l.offsetHeight;
}},"default":function(D){return D.offsetHeight;
}}),getSize:function(a){return {width:this.getWidth(a),height:this.getHeight(a)};
},__jC:{visible:true,hidden:true},getContentWidth:function(w){var y=qx.bom.element.Style;
var z=qx.bom.element.Overflow.getX(w);
var A=parseInt(y.get(w,d)||i,10);
var C=parseInt(y.get(w,e)||i,10);

if(this.__jC[z]){return w.clientWidth-A-C;
}else{if(w.clientWidth>=w.scrollWidth){return Math.max(w.clientWidth,w.scrollWidth)-A-C;
}else{var B=w.scrollWidth-A;
var x=qx.bom.client.Engine;

if(x.NAME===h&&x.VERSION==6){B-=C;
}return B;
}}},getContentHeight:function(o){var q=qx.bom.element.Style;
var s=qx.bom.element.Overflow.getY(o);
var t=parseInt(q.get(o,c)||i,10);
var r=parseInt(q.get(o,b)||i,10);

if(this.__jC[s]){return o.clientHeight-t-r;
}else{if(o.clientHeight>=o.scrollHeight){return Math.max(o.clientHeight,o.scrollHeight)-t-r;
}else{var u=o.scrollHeight-t;
var p=qx.bom.client.Engine;

if(p.NAME===h&&p.VERSION==6){u-=r;
}return u;
}}},getContentSize:function(v){return {width:this.getContentWidth(v),height:this.getContentHeight(v)};
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.ui.form.IForm";
qx.Interface.define(b,{events:{"changeEnabled":c,"changeValid":c,"changeInvalidMessage":c,"changeRequired":c},members:{setEnabled:function(a){return arguments.length==1;
},getEnabled:function(){},setRequired:function(d){return arguments.length==1;
},getRequired:function(){},setValid:function(e){return arguments.length==1;
},getValid:function(){},setInvalidMessage:function(g){return arguments.length==1;
},getInvalidMessage:function(){},setRequiredInvalidMessage:function(f){return arguments.length==1;
},getRequiredInvalidMessage:function(){}}});
})();
(function(){var f="_applyBlockerColor",e="Number",d="__jD",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";
qx.Mixin.define(c,{construct:function(){this.__jD=new qx.ui.core.Blocker(this);
},properties:{blockerColor:{check:a,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:b,themeable:true}},members:{__jD:null,_applyBlockerColor:function(h,i){this.__jD.setColor(h);
},_applyBlockerOpacity:function(j,k){this.__jD.setOpacity(j);
},block:function(){this.__jD.block();
},isBlocked:function(){return this.__jD.isBlocked();
},unblock:function(){this.__jD.unblock();
},forceUnblock:function(){this.__jD.forceUnblock();
},blockContent:function(g){this.__jD.blockContent(g);
},isContentBlocked:function(){return this.__jD.isContentBlocked();
},unblockContent:function(){this.__jD.unblockContent();
},forceUnblockContent:function(){this.__jD.forceUnblockContent();
},getBlocker:function(){return this.__jD;
}},destruct:function(){this._disposeObjects(d);
}});
})();
(function(){var i="qx.ui.window.Window",h="changeModal",g="changeVisibility",f="changeActive",d="_applyActiveWindow",c="__jF",b="__jE",a="qx.ui.window.MDesktop";
qx.Mixin.define(a,{properties:{activeWindow:{check:i,apply:d,init:null,nullable:true}},members:{__jE:null,__jF:null,getWindowManager:function(){if(!this.__jF){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());
}return this.__jF;
},supportsMaximize:function(){return true;
},setWindowManager:function(k){if(this.__jF){this.__jF.setDesktop(null);
}k.setDesktop(this);
this.__jF=k;
},_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());
}else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);
}},_applyActiveWindow:function(o,p){this.getWindowManager().changeActiveWindow(o,p);
},_onChangeModal:function(e){this.getWindowManager().updateStack();
},_onChangeVisibility:function(){this.getWindowManager().updateStack();
},_afterAddChild:function(n){if(qx.Class.isDefined(i)&&n instanceof qx.ui.window.Window){this._addWindow(n);
}},_addWindow:function(l){if(!qx.lang.Array.contains(this.getWindows(),l)){this.getWindows().push(l);
l.addListener(f,this._onChangeActive,this);
l.addListener(h,this._onChangeModal,this);
l.addListener(g,this._onChangeVisibility,this);
}
if(l.getActive()){this.setActiveWindow(l);
}this.getWindowManager().updateStack();
},_afterRemoveChild:function(m){if(qx.Class.isDefined(i)&&m instanceof qx.ui.window.Window){this._removeWindow(m);
}},_removeWindow:function(j){qx.lang.Array.remove(this.getWindows(),j);
j.removeListener(f,this._onChangeActive,this);
j.removeListener(h,this._onChangeModal,this);
j.removeListener(g,this._onChangeVisibility,this);
this.getWindowManager().updateStack();
},getWindows:function(){if(!this.__jE){this.__jE=[];
}return this.__jE;
}},destruct:function(){this._disposeArray(b);
this._disposeObjects(c);
}});
})();
(function(){var p="contextmenu",o="help",n="qx.client",m="changeGlobalCursor",l="abstract",k="Boolean",j="root",i="",h=" !important",g="_applyGlobalCursor",c="_applyNativeHelp",f=";",d="qx.ui.root.Abstract",b="String",a="*";
qx.Class.define(d,{type:l,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);
qx.ui.core.FocusHandler.getInstance().addRoot(this);
qx.ui.core.queue.Visibility.add(this);
this.initNativeHelp();
},properties:{appearance:{refine:true,init:j},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:b,nullable:true,themeable:true,apply:g,event:m},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:k,init:false,apply:c}},members:{__jG:null,isRootWidget:function(){return true;
},getLayout:function(){return this._getLayout();
},_applyGlobalCursor:qx.core.Variant.select(n,{"mshtml":function(w,x){},"default":function(y,z){var A=qx.bom.Stylesheet;
var B=this.__jG;

if(!B){this.__jG=B=A.createElement();
}A.removeAllRules(B);

if(y){A.addRule(B,a,qx.bom.element.Cursor.compile(y).replace(f,i)+h);
}}}),_applyNativeContextMenu:function(s,t){if(s){this.removeListener(p,this._onNativeContextMenu,this,true);
}else{this.addListener(p,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;
}e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(n,{"mshtml":function(u,v){if(v===false){qx.bom.Event.removeNativeListener(document,o,qx.lang.Function.returnFalse);
}
if(u===false){qx.bom.Event.addNativeListener(document,o,qx.lang.Function.returnFalse);
}},"default":function(){}})},destruct:function(){this.__jG=null;
},defer:function(q,r){qx.ui.core.MChildrenHandling.remap(r);
}});
})();
(function(){var n="resize",m="position",l="0px",k="webkit",j="paddingLeft",i="$$widget",h="qx.ui.root.Application",g="hidden",f="qx.client",d="div",a="paddingTop",c="100%",b="absolute";
qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(t){this.__jH=qx.dom.Node.getWindow(t);
this.__jI=t;
qx.ui.root.Abstract.call(this);
qx.event.Registration.addListener(this.__jH,n,this._onResize,this);
this._setLayout(new qx.ui.layout.Canvas());
qx.ui.core.queue.Layout.add(this);
qx.ui.core.FocusHandler.getInstance().connectTo(this);
this.getContentElement().disableScrolling();
},members:{__jH:null,__jI:null,_createContainerElement:function(){var w=this.__jI;
if(qx.core.Variant.isSet(f,k)){if(!w.body){alert("The application could not be started due to a missing body tag in the HTML file!");
}}var A=w.documentElement.style;
var x=w.body.style;
A.overflow=x.overflow=g;
A.padding=A.margin=x.padding=x.margin=l;
A.width=A.height=x.width=x.height=c;
var z=w.createElement(d);
w.body.appendChild(z);
var y=new qx.html.Root(z);
y.setStyle(m,b);
y.setAttribute(i,this.toHashCode());
return y;
},_onResize:function(e){qx.ui.core.queue.Layout.add(this);
},_computeSizeHint:function(){var o=qx.bom.Viewport.getWidth(this.__jH);
var p=qx.bom.Viewport.getHeight(this.__jH);
return {minWidth:o,width:o,maxWidth:o,minHeight:p,height:p,maxHeight:p};
},_applyPadding:function(u,v,name){if(u&&(name==a||name==j)){throw new Error("The root widget does not support 'left', or 'top' paddings!");
}qx.ui.root.Abstract.prototype._applyPadding.call(this,u,v,name);
},_applyDecorator:function(q,r){qx.ui.root.Abstract.prototype._applyDecorator.call(this,q,r);

if(!q){return;
}var s=this.getDecoratorElement().getInsets();

if(s.left||s.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");
}}},destruct:function(){this.__jH=this.__jI=null;
}});
})();
(function(){var t="zIndex",s="px",r="keydown",q="deactivate",p="resize",o="keyup",n="keypress",m="backgroundColor",l="_applyOpacity",k="Boolean",F="opacity",E="interval",D="Tab",C="Color",B="qx.ui.root.Page",A="__jO",z="Number",y="qx.ui.core.Blocker",x="qx.ui.root.Application",w="__jM",u="__jQ",v="_applyColor";
qx.Class.define(y,{extend:qx.core.Object,construct:function(j){qx.core.Object.call(this);
this._widget=j;
this._isPageRoot=(qx.Class.isDefined(B)&&j instanceof qx.ui.root.Page);

if(this._isPageRoot){j.addListener(p,this.__jR,this);
}
if(qx.Class.isDefined(x)&&j instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);
}this.__jJ=[];
this.__jK=[];
this.__jL=[];
},properties:{color:{check:C,init:null,nullable:true,apply:v,themeable:true},opacity:{check:z,init:1,apply:l,themeable:true},keepBlockerActive:{check:k,init:false}},members:{__jM:null,__jN:0,__jO:null,__jL:null,__jJ:null,__jK:null,__jP:null,__jQ:null,_isPageRoot:false,_widget:null,__jR:function(e){var U=e.getData();

if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:U.width,height:U.height});
}
if(this.isBlocked()){this.getBlockerElement().setStyles({width:U.width,height:U.height});
}},_applyColor:function(R,S){var T=qx.theme.manager.Color.getInstance().resolve(R);
this.__jS(m,T);
},_applyOpacity:function(K,L){this.__jS(F,K);
},__jS:function(G,H){var I=[];
this.__jM&&I.push(this.__jM);
this.__jO&&I.push(this.__jO);

for(var i=0;i<I.length;i++){I[i].setStyle(G,H);
}},_backupActiveWidget:function(){var J=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
this.__jJ.push(J.getActive());
this.__jK.push(J.getFocus());

if(this._widget.isFocusable()){this._widget.focus();
}},_restoreActiveWidget:function(){var c=this.__jJ.length;

if(c>0){var b=this.__jJ[c-1];

if(b){qx.bom.Element.activate(b);
}this.__jJ.pop();
}var a=this.__jK.length;

if(a>0){var b=this.__jK[a-1];

if(b){qx.bom.Element.focus(this.__jK[a-1]);
}this.__jK.pop();
}},__jT:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());
},getBlockerElement:function(){if(!this.__jM){this.__jM=this.__jT();
this.__jM.setStyle(t,15);
this._widget.getContainerElement().add(this.__jM);
this.__jM.exclude();
}return this.__jM;
},block:function(){this.__jN++;

if(this.__jN<2){this._backupActiveWidget();
var g=this.getBlockerElement();
g.include();
g.activate();
g.addListener(q,this.__jY,this);
g.addListener(n,this.__jX,this);
g.addListener(r,this.__jX,this);
g.addListener(o,this.__jX,this);
}},isBlocked:function(){return this.__jN>0;
},unblock:function(){if(!this.isBlocked()){return;
}this.__jN--;

if(this.__jN<1){this.__jU();
this.__jN=0;
}},forceUnblock:function(){if(!this.isBlocked()){return;
}this.__jN=0;
this.__jU();
},__jU:function(){this._restoreActiveWidget();
var h=this.getBlockerElement();
h.removeListener(q,this.__jY,this);
h.removeListener(n,this.__jX,this);
h.removeListener(r,this.__jX,this);
h.removeListener(o,this.__jX,this);
h.exclude();
},getContentBlockerElement:function(){if(!this.__jO){this.__jO=this.__jT();
this._widget.getContentElement().add(this.__jO);
this.__jO.exclude();
}return this.__jO;
},blockContent:function(M){var N=this.getContentBlockerElement();
N.setStyle(t,M);
this.__jL.push(M);

if(this.__jL.length<2){N.include();

if(this._isPageRoot){if(!this.__jQ){this.__jQ=new qx.event.Timer(300);
this.__jQ.addListener(E,this.__jW,this);
}this.__jQ.start();
this.__jW();
}}},isContentBlocked:function(){return this.__jL.length>0;
},unblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jL.pop();
var d=this.__jL[this.__jL.length-1];
var f=this.getContentBlockerElement();
f.setStyle(t,d);

if(this.__jL.length<1){this.__jV();
this.__jL=[];
}},forceUnblockContent:function(){if(!this.isContentBlocked()){return;
}this.__jL=[];
var O=this.getContentBlockerElement();
O.setStyle(t,null);
this.__jV();
},__jV:function(){this.getContentBlockerElement().exclude();

if(this._isPageRoot){this.__jQ.stop();
}},__jW:function(){var P=this._widget.getContainerElement().getDomElement();
var Q=qx.dom.Node.getDocument(P);
this.getContentBlockerElement().setStyles({height:Q.documentElement.scrollHeight+s,width:Q.documentElement.scrollWidth+s});
},__jX:function(e){if(e.getKeyIdentifier()==D){e.stop();
}},__jY:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();
}}},destruct:function(){if(this._isPageRoot){this._widget.removeListener(p,this.__jR,this);
}this._disposeObjects(A,w,u);
this.__jP=this.__jJ=this.__jK=this._widget=this.__jL=null;
}});
})();
(function(){var k="cursor",j="100%",i="repeat",h="mousedown",g="url(",f=")",d="mouseout",c="qx.client",b="div",a="dblclick",w="mousewheel",v="qx.html.Blocker",u="mousemove",t="mouseover",s="appear",r="click",q="mshtml",p="mouseup",o="contextmenu",n="disappear",l="qx/static/blank.gif",m="absolute";
qx.Class.define(v,{extend:qx.html.Element,construct:function(y,z){var y=y?qx.theme.manager.Color.getInstance().resolve(y):null;
var A={position:m,width:j,height:j,opacity:z||0,backgroundColor:y};
if(qx.core.Variant.isSet(c,q)){A.backgroundImage=g+qx.util.ResourceManager.getInstance().toUri(l)+f;
A.backgroundRepeat=i;
}qx.html.Element.call(this,b,A);
this.addListener(h,this._stopPropagation,this);
this.addListener(p,this._stopPropagation,this);
this.addListener(r,this._stopPropagation,this);
this.addListener(a,this._stopPropagation,this);
this.addListener(u,this._stopPropagation,this);
this.addListener(t,this._stopPropagation,this);
this.addListener(d,this._stopPropagation,this);
this.addListener(w,this._stopPropagation,this);
this.addListener(o,this._stopPropagation,this);
this.addListener(s,this.__ka,this);
this.addListener(n,this.__ka,this);
},members:{_stopPropagation:function(e){e.stopPropagation();
},__ka:function(){var x=this.getStyle(k);
this.setStyle(k,null,true);
this.setStyle(k,x,true);
}}});
})();
(function(){var M="keypress",L="focusout",K="activate",J="__kb",I="Tab",H="singleton",G="deactivate",F="focusin",E="qx.ui.core.FocusHandler";
qx.Class.define(E,{extend:qx.core.Object,type:H,construct:function(){qx.core.Object.call(this);
this.__kb={};
},members:{__kb:null,__kc:null,__kd:null,__ke:null,connectTo:function(bh){bh.addListener(M,this.__kf,this);
bh.addListener(F,this._onFocusIn,this,true);
bh.addListener(L,this._onFocusOut,this,true);
bh.addListener(K,this._onActivate,this,true);
bh.addListener(G,this._onDeactivate,this,true);
},addRoot:function(bi){this.__kb[bi.$$hash]=bi;
},removeRoot:function(C){delete this.__kb[C.$$hash];
},getActiveWidget:function(){return this.__kc;
},isActive:function(B){return this.__kc==B;
},getFocusedWidget:function(){return this.__kd;
},isFocused:function(o){return this.__kd==o;
},isFocusRoot:function(A){return !!this.__kb[A.$$hash];
},_onActivate:function(e){var m=e.getTarget();
this.__kc=m;
var k=this.__kg(m);

if(k!=this.__ke){this.__ke=k;
}},_onDeactivate:function(e){var bg=e.getTarget();

if(this.__kc==bg){this.__kc=null;
}},_onFocusIn:function(e){var n=e.getTarget();

if(n!=this.__kd){this.__kd=n;
n.visualizeFocus();
}},_onFocusOut:function(e){var D=e.getTarget();

if(D==this.__kd){this.__kd=null;
D.visualizeBlur();
}},__kf:function(e){if(e.getKeyIdentifier()!=I){return;
}
if(!this.__ke){return;
}e.stopPropagation();
e.preventDefault();
var N=this.__kd;

if(!e.isShiftPressed()){var O=N?this.__kk(N):this.__ki();
}else{var O=N?this.__kl(N):this.__kj();
}if(O){O.tabFocus();
}},__kg:function(bb){var bc=this.__kb;

while(bb){if(bc[bb.$$hash]){return bb;
}bb=bb.getLayoutParent();
}return null;
},__kh:function(P,Q){if(P===Q){return 0;
}var S=P.getTabIndex()||0;
var R=Q.getTabIndex()||0;

if(S!=R){return S-R;
}var X=P.getContainerElement().getDomElement();
var W=Q.getContainerElement().getDomElement();
var V=qx.bom.element.Location;
var U=V.get(X);
var T=V.get(W);
if(U.top!=T.top){return U.top-T.top;
}if(U.left!=T.left){return U.left-T.left;
}var Y=P.getZIndex();
var ba=Q.getZIndex();

if(Y!=ba){return Y-ba;
}return 0;
},__ki:function(){return this.__ko(this.__ke,null);
},__kj:function(){return this.__kp(this.__ke,null);
},__kk:function(t){var u=this.__ke;

if(u==t){return this.__ki();
}
while(t&&t.getAnonymous()){t=t.getLayoutParent();
}
if(t==null){return [];
}var v=[];
this.__km(u,t,v);
v.sort(this.__kh);
var w=v.length;
return w>0?v[0]:this.__ki();
},__kl:function(a){var b=this.__ke;

if(b==a){return this.__kj();
}
while(a&&a.getAnonymous()){a=a.getLayoutParent();
}
if(a==null){return [];
}var c=[];
this.__kn(b,a,c);
c.sort(this.__kh);
var d=c.length;
return d>0?c[d-1]:this.__kj();
},__km:function(parent,p,q){var r=parent.getLayoutChildren();
var s;

for(var i=0,l=r.length;i<l;i++){s=r[i];
if(!(s instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(s)&&s.isEnabled()&&s.isVisible()){if(s.isTabable()&&this.__kh(p,s)<0){q.push(s);
}this.__km(s,p,q);
}}},__kn:function(parent,f,g){var h=parent.getLayoutChildren();
var j;

for(var i=0,l=h.length;i<l;i++){j=h[i];
if(!(j instanceof qx.ui.core.Widget)){continue;
}
if(!this.isFocusRoot(j)&&j.isEnabled()&&j.isVisible()){if(j.isTabable()&&this.__kh(f,j)>0){g.push(j);
}this.__kn(j,f,g);
}}},__ko:function(parent,x){var y=parent.getLayoutChildren();
var z;

for(var i=0,l=y.length;i<l;i++){z=y[i];
if(!(z instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(z)&&z.isEnabled()&&z.isVisible()){if(z.isTabable()){if(x==null||this.__kh(z,x)<0){x=z;
}}x=this.__ko(z,x);
}}return x;
},__kp:function(parent,bd){var be=parent.getLayoutChildren();
var bf;

for(var i=0,l=be.length;i<l;i++){bf=be[i];
if(!(bf instanceof qx.ui.core.Widget)){continue;
}if(!this.isFocusRoot(bf)&&bf.isEnabled()&&bf.isVisible()){if(bf.isTabable()){if(bd==null||this.__kh(bf,bd)>0){bd=bf;
}}bd=this.__kp(bf,bd);
}}return bd;
}},destruct:function(){this._disposeMap(J);
this.__kd=this.__kc=this.__ke=null;
}});
})();
(function(){var l="qx.client",k="head",j="text/css",h="stylesheet",g="}",f='@import "',e="{",d='";',c="qx.bom.Stylesheet",b="link",a="style";
qx.Class.define(c,{statics:{includeFile:function(C,D){if(!D){D=document;
}var E=D.createElement(b);
E.type=j;
E.rel=h;
E.href=qx.util.ResourceManager.getInstance().toUri(C);
var F=D.getElementsByTagName(k)[0];
F.appendChild(E);
},createElement:qx.core.Variant.select(l,{"mshtml":function(y){var z=document.createStyleSheet();

if(y){z.cssText=y;
}return z;
},"default":function(G){var H=document.createElement(a);
H.type=j;

if(G){H.appendChild(document.createTextNode(G));
}document.getElementsByTagName(k)[0].appendChild(H);
return H.sheet;
}}),addRule:qx.core.Variant.select(l,{"mshtml":function(s,t,u){s.addRule(t,u);
},"default":function(bb,bc,bd){bb.insertRule(bc+e+bd+g,bb.cssRules.length);
}}),removeRule:qx.core.Variant.select(l,{"mshtml":function(M,N){var O=M.rules;
var P=O.length;

for(var i=P-1;i>=0;--i){if(O[i].selectorText==N){M.removeRule(i);
}}},"default":function(m,n){var o=m.cssRules;
var p=o.length;

for(var i=p-1;i>=0;--i){if(o[i].selectorText==n){m.deleteRule(i);
}}}}),removeAllRules:qx.core.Variant.select(l,{"mshtml":function(T){var U=T.rules;
var V=U.length;

for(var i=V-1;i>=0;i--){T.removeRule(i);
}},"default":function(be){var bf=be.cssRules;
var bg=bf.length;

for(var i=bg-1;i>=0;i--){be.deleteRule(i);
}}}),addImport:qx.core.Variant.select(l,{"mshtml":function(A,B){A.addImport(B);
},"default":function(q,r){q.insertRule(f+r+d,q.cssRules.length);
}}),removeImport:qx.core.Variant.select(l,{"mshtml":function(I,J){var K=I.imports;
var L=K.length;

for(var i=L-1;i>=0;i--){if(K[i].href==J){I.removeImport(i);
}}},"default":function(W,X){var Y=W.cssRules;
var ba=Y.length;

for(var i=ba-1;i>=0;i--){if(Y[i].href==X){W.deleteRule(i);
}}}}),removeAllImports:qx.core.Variant.select(l,{"mshtml":function(Q){var R=Q.imports;
var S=R.length;

for(var i=S-1;i>=0;i--){Q.removeImport(i);
}},"default":function(v){var w=v.cssRules;
var x=w.length;

for(var i=x-1;i>=0;i--){if(w[i].type==w[i].IMPORT_RULE){v.deleteRule(i);
}}}})}});
})();
(function(){var b="number",a="qx.ui.layout.Canvas";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(v,w){var H=this._getLayoutChildren();
var z,G,E;
var J,top,x,y,B,A;
var F,D,I,C;

for(var i=0,l=H.length;i<l;i++){z=H[i];
G=z.getSizeHint();
E=z.getLayoutProperties();
F=z.getMarginTop();
D=z.getMarginRight();
I=z.getMarginBottom();
C=z.getMarginLeft();
J=E.left!=null?E.left:E.edge;

if(qx.lang.Type.isString(J)){J=Math.round(parseFloat(J)*v/100);
}x=E.right!=null?E.right:E.edge;

if(qx.lang.Type.isString(x)){x=Math.round(parseFloat(x)*v/100);
}top=E.top!=null?E.top:E.edge;

if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*w/100);
}y=E.bottom!=null?E.bottom:E.edge;

if(qx.lang.Type.isString(y)){y=Math.round(parseFloat(y)*w/100);
}if(J!=null&&x!=null){B=v-J-x-C-D;
if(B<G.minWidth){B=G.minWidth;
}else if(B>G.maxWidth){B=G.maxWidth;
}J+=C;
}else{B=E.width;

if(B==null){B=G.width;
}else{B=Math.round(parseFloat(B)*v/100);
if(B<G.minWidth){B=G.minWidth;
}else if(B>G.maxWidth){B=G.maxWidth;
}}
if(x!=null){J=v-B-x-D-C;
}else if(J==null){J=C;
}else{J+=C;
}}if(top!=null&&y!=null){A=w-top-y-F-I;
if(A<G.minHeight){A=G.minHeight;
}else if(A>G.maxHeight){A=G.maxHeight;
}top+=F;
}else{A=E.height;

if(A==null){A=G.height;
}else{A=Math.round(parseFloat(A)*w/100);
if(A<G.minHeight){A=G.minHeight;
}else if(A>G.maxHeight){A=G.maxHeight;
}}
if(y!=null){top=w-A-y-I-F;
}else if(top==null){top=F;
}else{top+=F;
}}z.renderLayout(J,top,B,A);
}},_computeSizeHint:function(){var t=0,s=0;
var q=0,o=0;
var m,k;
var j,g;
var c=this._getLayoutChildren();
var f,r,e;
var u,top,d,h;

for(var i=0,l=c.length;i<l;i++){f=c[i];
r=f.getLayoutProperties();
e=f.getSizeHint();
var p=f.getMarginLeft()+f.getMarginRight();
var n=f.getMarginTop()+f.getMarginBottom();
m=e.width+p;
k=e.minWidth+p;
u=r.left!=null?r.left:r.edge;

if(u&&typeof u===b){m+=u;
k+=u;
}d=r.right!=null?r.right:r.edge;

if(d&&typeof d===b){m+=d;
k+=d;
}t=Math.max(t,m);
s=Math.max(s,k);
j=e.height+n;
g=e.minHeight+n;
top=r.top!=null?r.top:r.edge;

if(top&&typeof top===b){j+=top;
g+=top;
}h=r.bottom!=null?r.bottom:r.edge;

if(h&&typeof h===b){j+=h;
g+=h;
}q=Math.max(q,j);
o=Math.max(o,g);
}return {width:t,minWidth:s,height:q,minHeight:o};
}}});
})();
(function(){var a="qx.html.Root";
qx.Class.define(a,{extend:qx.html.Element,construct:function(b){qx.html.Element.call(this);

if(b!=null){this.useElement(b);
}},members:{useElement:function(c){qx.html.Element.prototype.useElement.call(this,c);
this.setRoot(true);
qx.html.Element._modified[this.$$hash]=this;
}}});
})();
(function(){var d="inspector.components.IInspectorModel",c="qx.event.type.Event",b="qx.event.type.Data";
qx.Interface.define(d,{events:{"changeObjects":c,"changeInspected":b},members:{getObjectRegistry:function(){return true;
},setObjectRegistry:function(a){return arguments.length==1;
},getApplication:function(){return true;
},setApplication:function(e){return arguments.length==1;
},getObjects:function(){return true;
},getInspected:function(){return true;
},setInspected:function(f){return arguments.length==1;
}}});
})();
(function(){var e="changeObjects",d="changeInspected",c="qx.event.type.Event",b="inspector.components.InspectorModel",a="qx.event.type.Data";
qx.Class.define(b,{extend:qx.core.Object,implement:[inspector.components.IInspectorModel],construct:function(l){qx.core.Object.call(this);
this.__qQ=l;
},events:{"changeObjects":c,"changeInspected":a},members:{__qR:null,__qQ:null,__qS:null,getObjectRegistry:function(){return this.__qR;
},setObjectRegistry:function(f){if(this.__qR!==f){this.__qR=f;
this.fireEvent(e);
}},getApplication:function(){return this.__qQ;
},setApplication:function(m){if(this.__qQ!==m){this.__qQ=m;
this.fireEvent(e);
}},getObjects:function(){var j=[];

if(this.__qR===null||this.__qQ===null){return j;
}var i=this.__qR.getRegistry();
var g=this.__qQ.getExcludes();

for(var h in i){var k=i[h];

if(!qx.lang.Array.contains(g,k)){j.push(k);
}}return j;
},getInspected:function(){return this.__qS;
},setInspected:function(n){if(this.__qS!==n){var o=this.__qS;
this.__qS=n;
this.__qQ.select(n);
this.fireDataEvent(d,this.__qS,o);
}}},destruct:function(){this.__qR=this.constructor=this.__qS=null;
}});
})();
(function(){var m="Open",l="cookieKey",k="Width",j="Height",h="Top",g="Left",f="resize",e="inspector.components.State",d="close",c="open",a="true",b="move";
qx.Class.define(e,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__qT=[];
},members:{__qT:null,add:function(u,v){if(!qx.lang.Array.contains(this.__qT,u)){u.setUserData(l,v);
this.__qT.push(u);
this.__qU(u);
}},__qU:function(n){var o=n.getUserData(l);
n.addListener(c,function(){qx.bom.Cookie.set(o+m,true,7);
},this);
n.addListener(d,function(){qx.bom.Cookie.set(o+m,false,7);
},this);
n.addListener(b,function(event){qx.bom.Cookie.set(o+g,event.getData().left,7);
qx.bom.Cookie.set(o+h,event.getData().top,7);
},this);
n.addListener(f,function(event){qx.bom.Cookie.set(o+k,event.getData().width,7);
qx.bom.Cookie.set(o+j,event.getData().height,7);
},this);
},restoreState:function(){for(var i=0;i<this.__qT.length;i++){this.__qV(this.__qT[i]);
}},__qV:function(p){var q=p.getUserData(l);
var open=qx.bom.Cookie.get(q+m);
var t=parseInt(qx.bom.Cookie.get(q+g));
var top=parseInt(qx.bom.Cookie.get(q+h));
var s=parseInt(qx.bom.Cookie.get(q+k));
var r=parseInt(qx.bom.Cookie.get(q+j));

if(open===a||open===null){p.open();

if(!isNaN(t)&&!isNaN(top)&&!isNaN(s)&&!isNaN(r)){p.setSizeAndPosition({top:top,left:t,width:s,height:r});
}}}},destruct:function(){this.__qT=null;
}});
})();
(function(){var i="=",h="",g=";path=",f=";domain=",e=";expires=Thu, 01-Jan-1970 00:00:01 GMT",d="qx.bom.Cookie",c=";expires=",b=";",a=";secure";
qx.Class.define(d,{statics:{get:function(j){var k=document.cookie.indexOf(j+i);
var m=k+j.length+1;

if((!k)&&(j!=document.cookie.substring(0,j.length))){return null;
}
if(k==-1){return null;
}var l=document.cookie.indexOf(b,m);

if(l==-1){l=document.cookie.length;
}return unescape(document.cookie.substring(m,l));
},set:function(r,s,t,u,v,w){var x=[r,i,escape(s)];

if(t){var y=new Date();
y.setTime(y.getTime());
x.push(c,new Date(y.getTime()+(t*1000*60*60*24)).toGMTString());
}
if(u){x.push(g,u);
}
if(v){x.push(f,v);
}
if(w){x.push(a);
}document.cookie=x.join(h);
},del:function(n,o,p){if(!qx.bom.Cookie.get(n)){return;
}var q=[n,i];

if(o){q.push(g,o);
}
if(p){q.push(f,p);
}q.push(e);
document.cookie=q.join(h);
}}});
})();
(function(){var n="_applyLayoutChange",m="top",k="left",j="middle",h="Decorator",g="center",f="_applyReversed",e="bottom",d="qx.ui.layout.VBox",c="Integer",a="right",b="Boolean";
qx.Class.define(d,{extend:qx.ui.layout.Abstract,construct:function(o,p,q){qx.ui.layout.Abstract.call(this);

if(o){this.setSpacing(o);
}
if(p){this.setAlignY(p);
}
if(q){this.setSeparator(q);
}},properties:{alignY:{check:[m,j,e],init:m,apply:n},alignX:{check:[k,g,a],init:k,apply:n},spacing:{check:c,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:b,init:false,apply:f}},members:{__ls:null,__lt:null,__lu:null,__lv:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__lw:function(){var w=this._getLayoutChildren();
var length=w.length;
var s=false;
var r=this.__ls&&this.__ls.length!=length&&this.__lt&&this.__ls;
var u;
var t=r?this.__ls:new Array(length);
var v=r?this.__lt:new Array(length);
if(this.getReversed()){w=w.concat().reverse();
}for(var i=0;i<length;i++){u=w[i].getLayoutProperties();

if(u.height!=null){t[i]=parseFloat(u.height)/100;
}
if(u.flex!=null){v[i]=u.flex;
s=true;
}else{v[i]=0;
}}if(!r){this.__ls=t;
this.__lt=v;
}this.__lu=s;
this.__lv=w;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(x,y){if(this._invalidChildrenCache){this.__lw();
}var F=this.__lv;
var length=F.length;
var P=qx.ui.layout.Util;
var O=this.getSpacing();
var S=this.getSeparator();

if(S){var C=P.computeVerticalSeparatorGaps(F,O,S);
}else{var C=P.computeVerticalGaps(F,O,true);
}var i,A,B,J;
var K=[];
var Q=C;

for(i=0;i<length;i+=1){J=this.__ls[i];
B=J!=null?Math.floor((y-C)*J):F[i].getSizeHint().height;
K.push(B);
Q+=B;
}if(this.__lu&&Q!=y){var H={};
var N,R;

for(i=0;i<length;i+=1){N=this.__lt[i];

if(N>0){G=F[i].getSizeHint();
H[i]={min:G.minHeight,value:K[i],max:G.maxHeight,flex:N};
}}var D=P.computeFlexOffsets(H,y,Q);

for(i in D){R=D[i].offset;
K[i]+=R;
Q+=R;
}}var top=F[0].getMarginTop();
if(Q<y&&this.getAlignY()!=m){top=y-Q;

if(this.getAlignY()===j){top=Math.round(top/2);
}}var G,U,L,B,I,M,E;
this._clearSeparators();
if(S){var T=qx.theme.manager.Decoration.getInstance().resolve(S).getInsets();
var z=T.top+T.bottom;
}for(i=0;i<length;i+=1){A=F[i];
B=K[i];
G=A.getSizeHint();
M=A.getMarginLeft();
E=A.getMarginRight();
L=Math.max(G.minWidth,Math.min(x-M-E,G.maxWidth));
U=P.computeHorizontalAlignOffset(A.getAlignX()||this.getAlignX(),L,x,M,E);
if(i>0){if(S){top+=I+O;
this._renderSeparator(S,{top:top,left:0,height:z,width:x});
top+=z+O+A.getMarginTop();
}else{top+=P.collapseMargins(O,I,A.getMarginTop());
}}A.renderLayout(U,top,L,B);
top+=B;
I=A.getMarginBottom();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__lw();
}var bc=qx.ui.layout.Util;
var bk=this.__lv;
var X=0,bb=0,ba=0;
var V=0,bd=0;
var bh,W,bj;
for(var i=0,l=bk.length;i<l;i+=1){bh=bk[i];
W=bh.getSizeHint();
bb+=W.height;
var bg=this.__lt[i];
var Y=this.__ls[i];

if(bg){X+=W.minHeight;
}else if(Y){ba=Math.max(ba,Math.round(W.minHeight/Y));
}else{X+=W.height;
}bj=bh.getMarginLeft()+bh.getMarginRight();
if((W.width+bj)>bd){bd=W.width+bj;
}if((W.minWidth+bj)>V){V=W.minWidth+bj;
}}X+=ba;
var bf=this.getSpacing();
var bi=this.getSeparator();

if(bi){var be=bc.computeVerticalSeparatorGaps(bk,bf,bi);
}else{var be=bc.computeVerticalGaps(bk,bf,true);
}return {minHeight:X+be,height:bb+be,minWidth:V,width:bd};
}},destruct:function(){this.__ls=this.__lt=this.__lv=null;
}});
})();
(function(){var g="String",f="qx.ui.embed.AbstractIframe",e="name",d="",c="_applySource",b="qx.event.type.Event",a="_applyFrameName";
qx.Class.define(f,{extend:qx.ui.core.Widget,construct:function(j){qx.ui.core.Widget.call(this);

if(j){this.setSource(j);
}},events:{"load":b},properties:{source:{check:g,apply:c,nullable:true},frameName:{check:g,init:d,apply:a}},members:{_getIframeElement:function(){throw new Error("Abstract method call");
},_applySource:function(h,i){this._getIframeElement().setSource(h);
},_applyFrameName:function(k,l){this._getIframeElement().setAttribute(e,k);
},getWindow:function(){return this._getIframeElement().getWindow();
},getDocument:function(){return this._getIframeElement().getDocument();
},getBody:function(){return this._getIframeElement().getBody();
},getName:function(){return this._getIframeElement().getName();
},reload:function(){this._getIframeElement().reload();
}}});
})();
(function(){var o="Please use the 'scrollbar' property instead.",n="qx.client",m="mousedown",l="load",k="help",j="overflowY",i="mouseup",h="losecapture",g="contextmenu",f="none",N="display",M="overflowX",L="no",K="Boolean",J="px",I="url(",H=")",G="gecko",F="repeat",E="div",v="auto",w="_applyScrollbar",t="DOMNodeInserted",u="_applyNativeHelp",r="yes",s="scrolling",p="/",q="appear",x="mshtml",y="block",A="qx.ui.embed.Iframe",z="iframe",C="__qX",B="qx/static/blank.gif",D="absolute";
qx.Class.define(A,{extend:qx.ui.embed.AbstractIframe,construct:function(bc){if(bc!=null){this.__qW=bc;
}qx.ui.embed.AbstractIframe.call(this,bc);
qx.event.Registration.addListener(document.body,m,this.block,this,true);
qx.event.Registration.addListener(document.body,i,this.release,this,true);
qx.event.Registration.addListener(document.body,h,this.release,this,true);
this.__qX=this._createBlockerElement();
this.getContainerElement().add(this.__qX);

if(qx.core.Variant.isSet(n,G)){this.addListenerOnce(q,function(e){var bi=this.getContainerElement().getDomElement();
qx.bom.Event.addNativeListener(bi,t,this._onDOMNodeInserted);
});
this._onDOMNodeInserted=qx.lang.Function.listener(this._syncSourceAfterDOMMove,this);
}},properties:{appearance:{refine:true,init:z},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:K,init:false,apply:u},scrollbar:{check:[v,L,r],nullable:true,themeable:true,apply:w}},members:{__qW:null,__qX:null,renderLayout:function(V,top,W,X){qx.ui.embed.AbstractIframe.prototype.renderLayout.call(this,V,top,W,X);
var ba=J;
var Y=this.getInsets();
this.__qX.setStyles({"left":Y.left+ba,"top":Y.top+ba,"width":(W-Y.left-Y.right)+ba,"height":(X-Y.top-Y.bottom)+ba});
},_createContentElement:function(){var bh=new qx.html.Iframe(this.__qW);
bh.addListener(l,this._onIframeLoad,this);
return bh;
},_getIframeElement:function(){return this.getContentElement();
},_createBlockerElement:function(){var b=new qx.html.Element(E);
b.setStyles({"zIndex":20,"position":D,"display":f});
if(qx.core.Variant.isSet(n,x)){b.setStyles({backgroundImage:I+qx.util.ResourceManager.getInstance().toUri(B)+H,backgroundRepeat:F});
}return b;
},_onIframeLoad:function(e){this._applyNativeContextMenu(this.getNativeContextMenu(),null);
this._applyNativeHelp(this.getNativeHelp(),null);
this.fireNonBubblingEvent(l);
},block:function(){this.__qX.setStyle(N,y);
},release:function(){this.__qX.setStyle(N,f);
},_applyNativeContextMenu:function(Q,R){if(Q!==false&&R!==false){return;
}var S=this.getDocument();

if(!S){return;
}
try{var T=S.documentElement;
}catch(e){return ;
}
if(R===false){qx.event.Registration.removeListener(T,g,this._onNativeContextMenu,this,true);
}
if(Q===false){qx.event.Registration.addListener(T,g,this._onNativeContextMenu,this,true);
}},_onNativeContextMenu:function(e){e.preventDefault();
},_applyNativeHelp:qx.core.Variant.select(n,{"mshtml":function(c,d){var document=this.getDocument();

if(!document){return;
}
try{if(d===false){qx.bom.Event.removeNativeListener(document,k,qx.lang.Function.returnFalse);
}
if(c===false){qx.bom.Event.addNativeListener(document,k,qx.lang.Function.returnFalse);
}}catch(e){}},"default":function(){}}),_syncSourceAfterDOMMove:function(){var P=this.getContentElement().getDomElement();
var O=P.src;
if(O.charAt(O.length-1)==p){O=O.substring(0,O.length-1);
}
if(O!=this.getSource()){qx.bom.Iframe.getWindow(P).stop();
P.src=this.getSource();
}},_applyScrollbar:function(a){this.getContentElement().setAttribute(s,a);
},setOverflow:function(bd,be){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);

if(arguments[0] instanceof Array){this.setOverflowX(bd[0]);
this.setOverflowY(bd[1]);
}else{this.setOverflowX(bd);
this.setOverflowY(be);
}},resetOverflow:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
this.resetOverflowX();
this.resetOverflowY();
},setOverflowX:function(bf){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
{};
this.getContentElement().setStyle(M,bf);
},getOverflowX:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
return this.getContentElement().getStyle(M);
},initOverflowX:function(bb){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
this.setOverflowX(bb);
},resetOverflowX:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
this.setOverflowX(null);
},setOverflowY:function(bg){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
{};
this.getContentElement().setStyle(j,bg);
},getOverflowY:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
return this.getContentElement().getStyle(j);
},initOverflowY:function(U){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
this.setOverflowY(U);
},resetOverflowY:function(){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);
this.setOverflowY(null);
}},destruct:function(){this._disposeObjects(C);
qx.event.Registration.removeListener(document.body,m,this.block,this,true);
qx.event.Registration.removeListener(document.body,i,this.release,this,true);
qx.event.Registration.removeListener(document.body,h,this.release,this,true);
}});
})();
(function(){var e="source",d="name",c="qx.html.Iframe",b="qx.event.type.Event",a="iframe";
qx.Class.define(c,{extend:qx.html.Element,construct:function(n,o,p){qx.html.Element.call(this,a,o,p);
this._setProperty(e,n);
},events:{"load":b},members:{_applyProperty:function(name,k){qx.html.Element.prototype._applyProperty.call(this,name,k);

if(name==e){var l=this.getDomElement();
qx.bom.Iframe.setSource(l,k);
}},_createDomElement:function(){return qx.bom.Iframe.create(this._content);
},getWindow:function(){var f=this.getDomElement();

if(f){return qx.bom.Iframe.getWindow(f);
}else{return null;
}},getDocument:function(){var m=this.getDomElement();

if(m){return qx.bom.Iframe.getDocument(m);
}else{return null;
}},getBody:function(){var g=this.getDomElement();

if(g){return qx.bom.Iframe.getBody(g);
}else{return null;
}},setSource:function(j){this._setProperty(e,j);
return this;
},getSource:function(){return this._getProperty(e);
},setName:function(name){this.setAttribute(d,name);
return this;
},getName:function(){return this.getAttribute(d);
},reload:function(){var i=this.getDomElement();

if(i){var h=this.getSource();
this.setSource(null);
this.setSource(h);
}}}});
})();
(function(){var e="qx.event.handler.Iframe",d="load",c="iframe";
qx.Class.define(e,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{load:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false,onevent:qx.event.GlobalError.observeMethod(function(i){qx.event.Registration.fireEvent(i,d);
})},members:{canHandleEvent:function(a,b){return a.tagName.toLowerCase()===c;
},registerEvent:function(j,k,l){},unregisterEvent:function(f,g,h){}},defer:function(m){qx.event.Registration.addHandler(m);
}});
})();
(function(){var f="qx.client",e="webkit",d="body",c="iframe",b="qx.bom.Iframe";
qx.Class.define(b,{statics:{DEFAULT_ATTRIBUTES:{onload:"qx.event.handler.Iframe.onevent(this)",frameBorder:0,frameSpacing:0,marginWidth:0,marginHeight:0,hspace:0,vspace:0,border:0,allowTransparency:true},create:function(o,p){var o=o?qx.lang.Object.clone(o):{};
var q=qx.bom.Iframe.DEFAULT_ATTRIBUTES;

for(var r in q){if(o[r]==null){o[r]=q[r];
}}return qx.bom.Element.create(c,o,p);
},getWindow:qx.core.Variant.select(f,{"mshtml|gecko":function(z){try{return z.contentWindow;
}catch(B){return null;
}},"default":function(s){try{var t=this.getDocument(s);
return t?t.defaultView:null;
}catch(a){return null;
}}}),getDocument:qx.core.Variant.select(f,{"mshtml":function(j){try{var k=this.getWindow(j);
return k?k.document:null;
}catch(y){return null;
}},"default":function(A){try{return A.contentDocument;
}catch(m){return null;
}}}),getBody:function(w){try{var x=this.getDocument(w);
return x?x.getElementsByTagName(d)[0]:null;
}catch(l){return null;
}},setSource:function(g,h){try{if(this.getWindow(g)&&qx.dom.Hierarchy.isRendered(g)){try{if(qx.core.Variant.isSet(f,e)&&qx.bom.client.Platform.MAC){var i=this.getContentWindow();

if(i){i.stop();
}}this.getWindow(g).location.replace(h);
}catch(n){g.src=h;
}}else{g.src=h;
}}catch(C){qx.log.Logger.warn("Iframe source could not be set!");
}},queryCurrentUrl:function(u){var v=this.getDocument(u);

try{if(v&&v.location){return v.location.href;
}}catch(D){}return null;
}}});
})();
(function(){var n="click",m="black",l="",k="red",j="inspector.components.Selector",h="qx.ui.root.Application",g="mousemove",f="_highlightOverlay",d="changeSelection",c="_catchClickLayer",a="solid",b="_highlightDecorator";
qx.Class.define(j,{extend:qx.core.Object,construct:function(r){qx.core.Object.call(this);
this.setJSWindow(r);
},properties:{selection:{event:d,nullable:true}},members:{setJSWindow:function(s){this._iFrameWindow=s;
this._addedWidgets=[];
this._root=this._iFrameWindow.qx.core.Init.getApplication().getRoot();
this._createCatchClickLayer();
this._createHighlightStuff();
this.setSelection(null);
},getAddedWidgets:function(){return this._addedWidgets;
},start:function(){this._catchClickLayer.show();
},end:function(){this._catchClickLayer.hide();
},highlightFor:function(G,H){if(G.classname==h){return;
}this._highlight(G);
if(this._highlightTimerId!=null){window.clearTimeout(this._highlightTimerId);
}var self=this;
self._highlightTimerId=window.setTimeout(function(){self._highlightOverlay.hide();
self._highlightTimerId=null;
},H);
},_createCatchClickLayer:function(){this._catchClickLayer=new this._iFrameWindow.qx.ui.core.Widget();
this._addedWidgets.push(this._catchClickLayer);
this._catchClickLayer.setBackgroundColor(m);
this._catchClickLayer.setOpacity(0.1);
this._catchClickLayer.setZIndex(1e6-1);
this._catchClickLayer.hide();
this._root.add(this._catchClickLayer,{left:0,top:0,right:0,bottom:0});
this._catchClickLayer.addListener(n,function(e){this._catchClickLayer.hide();
var o=e.getDocumentLeft();
var p=e.getDocumentTop();
var q=this._searchWidget(this._root,o,p);
this._highlightOverlay.hide();
this.setSelection(q);
},this);
this._catchClickLayer.addListener(g,function(e){var I=e.getDocumentLeft();
var J=e.getDocumentTop();
var K=this._searchWidget(this._root,I,J,l);
this._highlight(K);
},this);
},_createHighlightStuff:function(){this._highlightDecorator=new this._iFrameWindow.qx.ui.decoration.Single(2,a,k);
this._addedWidgets.push(this._highlightDecorator);
this._highlightOverlay=new this._iFrameWindow.qx.ui.core.Widget();
this._addedWidgets.push(this._highlightOverlay);
this._highlightOverlay.setDecorator(this._highlightDecorator);
this._highlightOverlay.setZIndex(1e6-2);
this._highlightOverlay.hide();
this._root.add(this._highlightOverlay);
},_searchWidget:function(B,x,y){var C=B;
for(var i=0;i<B._getChildren().length;i++){var E=B._getChildren()[i];
if(E==this._catchClickLayer||E==this._highlightOverlay){continue;
}try{if(E instanceof this._iFrameWindow.qx.ui.core.Spacer){continue;
}}catch(L){}if(E.getContainerElement){var F=E.getContainerElement().getDomElement();
}else if(E.getDomElement){var F=E.getDomElement();
}else{return E;
}var D=this._getCoordinates(F);
if(D!=null){if(D.right>=x&&D.left<=x&&D.bottom>=y&&D.top<=y){C=this._searchWidget(E,x,y);
}}}return C;
},_getCoordinates:function(M){if(M==null){return null;
}var N={};
N.left=qx.bom.element.Location.getLeft(M);
N.right=qx.bom.element.Location.getRight(M);
N.top=qx.bom.element.Location.getTop(M);
N.bottom=qx.bom.element.Location.getBottom(M);
return N;
},_highlight:function(t){var z=null;

if(t.getContainerElement&&t.getContainerElement().getDomElement){z=t.getContainerElement().getDomElement();
}else if(t.getDomElement){z=t.getDomElement();
}if(z==null){this._highlightOverlay.hide();
return;
}var w=this._getCoordinates(z);
var A=w.left-2;
var u=w.right+2;
var top=w.top-2;
var v=w.bottom+2;
this._highlightOverlay.renderLayout(A,top,u-A,v-top);
this._highlightOverlay.show();
}},destruct:function(){this._iFrameWindow=this._addedWidgets=this._root=null;
this._disposeObjects(c,b,f);
}});
})();
(function(){var k="both",j="qx.ui.menu.Menu",h="_applySpacing",g="icon",f="label",e="changeShow",d="Integer",c="qx.ui.toolbar.ToolBar",b="toolbar",a="changeOpenMenu";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:qx.ui.core.MChildrenHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
},properties:{appearance:{refine:true,init:b},openMenu:{check:j,event:a,nullable:true},show:{init:k,check:[k,f,g],inheritable:true,event:e},spacing:{nullable:true,check:d,themeable:true,apply:h}},members:{__lb:false,_setAllowMenuOpenHover:function(m){this.__lb=m;
},_isAllowMenuOpenHover:function(){return this.__lb;
},_applySpacing:function(q,r){var s=this._getLayout();
q==null?s.resetSpacing():s.setSpacing(q);
},addSpacer:function(){var t=new qx.ui.core.Spacer;
this._add(t,{flex:1});
return t;
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var o=this.getChildren();
var n=[];
var p;

for(var i=0,l=o.length;i<l;i++){p=o[i];

if(p instanceof qx.ui.menubar.Button){n.push(p);
}else if(p instanceof qx.ui.toolbar.Part){n.push.apply(n,p.getMenuButtons());
}}return n;
}}});
})();
(function(){var n="_applyLayoutChange",m="left",k="center",j="top",h="Decorator",g="middle",f="_applyReversed",e="bottom",d="Boolean",c="right",a="Integer",b="qx.ui.layout.HBox";
qx.Class.define(b,{extend:qx.ui.layout.Abstract,construct:function(o,p,q){qx.ui.layout.Abstract.call(this);

if(o){this.setSpacing(o);
}
if(p){this.setAlignX(p);
}
if(q){this.setSeparator(q);
}},properties:{alignX:{check:[m,k,c],init:m,apply:n},alignY:{check:[j,g,e],init:j,apply:n},spacing:{check:a,init:0,apply:n},separator:{check:h,nullable:true,apply:n},reversed:{check:d,init:false,apply:f}},members:{__kV:null,__kW:null,__kX:null,__kY:null,_applyReversed:function(){this._invalidChildrenCache=true;
this._applyLayoutChange();
},__la:function(){var w=this._getLayoutChildren();
var length=w.length;
var t=false;
var r=this.__kV&&this.__kV.length!=length&&this.__kW&&this.__kV;
var u;
var s=r?this.__kV:new Array(length);
var v=r?this.__kW:new Array(length);
if(this.getReversed()){w=w.concat().reverse();
}for(var i=0;i<length;i++){u=w[i].getLayoutProperties();

if(u.width!=null){s[i]=parseFloat(u.width)/100;
}
if(u.flex!=null){v[i]=u.flex;
t=true;
}else{v[i]=0;
}}if(!r){this.__kV=s;
this.__kW=v;
}this.__kX=t;
this.__kY=w;
delete this._invalidChildrenCache;
},verifyLayoutProperty:null,renderLayout:function(M,N){if(this._invalidChildrenCache){this.__la();
}var T=this.__kY;
var length=T.length;
var bd=qx.ui.layout.Util;
var bc=this.getSpacing();
var bg=this.getSeparator();

if(bg){var Q=bd.computeHorizontalSeparatorGaps(T,bc,bg);
}else{var Q=bd.computeHorizontalGaps(T,bc,true);
}var i,O,ba,Y;
var bf=[];
var U=Q;

for(i=0;i<length;i+=1){Y=this.__kV[i];
ba=Y!=null?Math.floor((M-Q)*Y):T[i].getSizeHint().width;
bf.push(ba);
U+=ba;
}if(this.__kX&&U!=M){var W={};
var bb,be;

for(i=0;i<length;i+=1){bb=this.__kW[i];

if(bb>0){V=T[i].getSizeHint();
W[i]={min:V.minWidth,value:bf[i],max:V.maxWidth,flex:bb};
}}var R=bd.computeFlexOffsets(W,M,U);

for(i in R){be=R[i].offset;
bf[i]+=be;
U+=be;
}}var bk=T[0].getMarginLeft();
if(U<M&&this.getAlignX()!=m){bk=M-U;

if(this.getAlignX()===k){bk=Math.round(bk/2);
}}var V,top,P,ba,S,bi,X;
var bc=this.getSpacing();
this._clearSeparators();
if(bg){var bh=qx.theme.manager.Decoration.getInstance().resolve(bg).getInsets();
var bj=bh.left+bh.right;
}for(i=0;i<length;i+=1){O=T[i];
ba=bf[i];
V=O.getSizeHint();
bi=O.getMarginTop();
X=O.getMarginBottom();
P=Math.max(V.minHeight,Math.min(N-bi-X,V.maxHeight));
top=bd.computeVerticalAlignOffset(O.getAlignY()||this.getAlignY(),P,N,bi,X);
if(i>0){if(bg){bk+=S+bc;
this._renderSeparator(bg,{left:bk,top:0,width:bj,height:N});
bk+=bj+bc+O.getMarginLeft();
}else{bk+=bd.collapseMargins(bc,S,O.getMarginLeft());
}}O.renderLayout(bk,top,ba,P);
bk+=ba;
S=O.getMarginRight();
}},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__la();
}var D=qx.ui.layout.Util;
var L=this.__kY;
var x=0,E=0,B=0;
var A=0,C=0;
var I,y,K;
for(var i=0,l=L.length;i<l;i+=1){I=L[i];
y=I.getSizeHint();
E+=y.width;
var H=this.__kW[i];
var z=this.__kV[i];

if(H){x+=y.minWidth;
}else if(z){B=Math.max(B,Math.round(y.minWidth/z));
}else{x+=y.width;
}K=I.getMarginTop()+I.getMarginBottom();
if((y.height+K)>C){C=y.height+K;
}if((y.minHeight+K)>A){A=y.minHeight+K;
}}x+=B;
var G=this.getSpacing();
var J=this.getSeparator();

if(J){var F=D.computeHorizontalSeparatorGaps(L,G,J);
}else{var F=D.computeHorizontalGaps(L,G,true);
}return {minWidth:x+F,width:E+F,minHeight:A,height:C};
}},destruct:function(){this.__kV=this.__kW=this.__kY=null;
}});
})();
(function(){var a="qx.ui.core.Spacer";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(b,c){qx.ui.core.LayoutItem.call(this);
this.setWidth(b!=null?b:0);
this.setHeight(c!=null?c:0);
},members:{checkAppearanceNeeds:function(){},addChildrenToQueue:function(d){},destroy:function(){if(this.$$disposed){return;
}var parent=this.$$parent;

if(parent){parent._remove(this);
}qx.ui.core.queue.Dispose.add(this);
}}});
})();
(function(){var b="toolbar-separator",a="qx.ui.toolbar.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true},width:{refine:true,init:0},height:{refine:true,init:0}}});
})();
(function(){var n="execute",m="toolTipText",l="icon",k="label",j="qx.ui.core.MExecutable",h="value",g="qx.event.type.Event",f="_applyCommand",d="enabled",c="menu",a="changeCommand",b="qx.ui.core.Command";
qx.Mixin.define(j,{events:{"execute":g},properties:{command:{check:b,apply:f,event:a,nullable:true}},members:{__lc:null,__ld:false,__le:null,_bindableProperties:[d,k,l,m,h,c],execute:function(){var u=this.getCommand();

if(u){if(this.__ld){this.__ld=false;
}else{this.__ld=true;
u.execute(this);
}}this.fireEvent(n);
},__lf:function(e){if(this.__ld){this.__ld=false;
return;
}this.__ld=true;
this.execute();
},_applyCommand:function(o,p){if(p!=null){p.removeListenerById(this.__le);
}
if(o!=null){this.__le=o.addListener(n,this.__lf,this);
}var s=this.__lc;

if(s==null){this.__lc=s={};
}
for(var i=0;i<this._bindableProperties.length;i++){var r=this._bindableProperties[i];
if(p!=null&&s[r]!=null){p.removeBinding(s[r]);
s[r]=null;
}if(o!=null&&qx.Class.hasProperty(this.constructor,r)){var q=o.get(r);

if(q==null){var t=this.get(r);
}s[r]=o.bind(r,this,r);
if(t){this.set(r,t);
}}}}},destruct:function(){this.__lc=null;
}});
})();
(function(){var b="qx.ui.form.IExecutable",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"execute":a},members:{setCommand:function(c){return arguments.length==1;
},getCommand:function(){},execute:function(){}}});
})();
(function(){var o="pressed",n="abandoned",m="hovered",l="Enter",k="Space",j="dblclick",i="qx.ui.form.Button",h="mouseup",g="mousedown",f="mouseover",b="mouseout",d="keydown",c="button",a="keyup";
qx.Class.define(i,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(r,s,t){qx.ui.basic.Atom.call(this,r,s);

if(t!=null){this.setCommand(t);
}this.addListener(f,this._onMouseOver);
this.addListener(b,this._onMouseOut);
this.addListener(g,this._onMouseDown);
this.addListener(h,this._onMouseUp);
this.addListener(d,this._onKeyDown);
this.addListener(a,this._onKeyUp);
this.addListener(j,this._onStopEvent);
},properties:{appearance:{refine:true,init:c},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(n)){return;
}this.addState(o);
},release:function(){if(this.hasState(o)){this.removeState(o);
}},reset:function(){this.removeState(o);
this.removeState(n);
this.removeState(m);
},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(n)){this.removeState(n);
this.addState(o);
}this.addState(m);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(m);

if(this.hasState(o)){this.removeState(o);
this.addState(n);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}e.stopPropagation();
this.capture();
this.removeState(n);
this.addState(o);
},_onMouseUp:function(e){this.releaseCapture();
var p=this.hasState(o);
var q=this.hasState(n);

if(p){this.removeState(o);
}
if(q){this.removeState(n);
}else{this.addState(m);

if(p){this.execute();
}}e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case l:case k:this.removeState(n);
this.addState(o);
e.stopPropagation();
}},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case l:case k:if(this.hasState(o)){this.removeState(n);
this.removeState(o);
this.execute();
e.stopPropagation();
}}}}});
})();
(function(){var l="pressed",k="hovered",j="changeVisibility",i="qx.ui.menu.Menu",h="submenu",g="Enter",f="contextmenu",d="changeMenu",c="qx.ui.form.MenuButton",b="abandoned",a="_applyMenu";
qx.Class.define(c,{extend:qx.ui.form.Button,construct:function(p,q,r){qx.ui.form.Button.call(this,p,q);
if(r!=null){this.setMenu(r);
}},properties:{menu:{check:i,nullable:true,apply:a,event:d}},members:{_applyMenu:function(m,n){if(n){n.removeListener(j,this._onMenuChange,this);
n.resetOpener();
}
if(m){m.addListener(j,this._onMenuChange,this);
m.setOpener(this);
m.removeState(h);
m.removeState(f);
}},open:function(s){var t=this.getMenu();

if(t){qx.ui.menu.Manager.getInstance().hideAll();
t.setOpener(this);
t.open();
if(s){var u=t.getSelectables()[0];

if(u){t.setSelectedButton(u);
}}}},_onMenuChange:function(e){var v=this.getMenu();

if(v.isVisible()){this.addState(l);
}else{this.removeState(l);
}},_onMouseDown:function(e){var o=this.getMenu();

if(o){if(!o.isVisible()){this.open();
}else{o.exclude();
}e.stopPropagation();
}},_onMouseUp:function(e){qx.ui.form.Button.prototype._onMouseUp.call(this,e);
e.stopPropagation();
},_onMouseOver:function(e){this.addState(k);
},_onMouseOut:function(e){this.removeState(k);
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case g:this.removeState(b);
this.addState(l);
var w=this.getMenu();

if(w){if(!w.isVisible()){this.open();
}else{w.exclude();
}}e.stopPropagation();
}},_onKeyUp:function(e){}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}}});
})();
(function(){var h="pressed",g="hovered",f="inherit",d="qx.ui.menubar.Button",c="keydown",b="menubar-button",a="keyup";
qx.Class.define(d,{extend:qx.ui.form.MenuButton,construct:function(k,l,m){qx.ui.form.MenuButton.call(this,k,l,m);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:b},show:{refine:true,init:f},focusable:{refine:true,init:false}},members:{getMenuBar:function(){var parent=this;

while(parent){if(parent instanceof qx.ui.toolbar.ToolBar){return parent;
}parent=parent.getLayoutParent();
}return null;
},open:function(j){qx.ui.form.MenuButton.prototype.open.call(this,j);
var menubar=this.getMenuBar();
menubar._setAllowMenuOpenHover(true);
},_onMenuChange:function(e){var n=this.getMenu();
var menubar=this.getMenuBar();

if(n.isVisible()){this.addState(h);
if(menubar){menubar.setOpenMenu(n);
}}else{this.removeState(h);
if(menubar&&menubar.getOpenMenu()==n){menubar.resetOpenMenu();
menubar._setAllowMenuOpenHover(false);
}}},_onMouseUp:function(e){qx.ui.form.MenuButton.prototype._onMouseUp.call(this,e);
var i=this.getMenu();

if(i&&i.isVisible()&&!this.hasState(h)){this.addState(h);
}},_onMouseOver:function(e){this.addState(g);
if(this.getMenu()){var menubar=this.getMenuBar();

if(menubar._isAllowMenuOpenHover()){qx.ui.menu.Manager.getInstance().hideAll();
menubar._setAllowMenuOpenHover(true);
if(this.isEnabled()){this.open();
}}}}}});
})();
(function(){var bd="keypress",bc="interval",bb="keydown",ba="mousedown",Y="keyup",X="__lg",W="blur",V="Enter",U="__li",T="__lh",N="Up",S="Escape",Q="qx.ui.menu.Manager",M="Left",L="Down",P="Right",O="singleton",R="Space";
qx.Class.define(Q,{type:O,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__lg=[];
var bw=document.body;
var bx=qx.event.Registration;
bx.addListener(window.document.documentElement,ba,this._onMouseDown,this,true);
bx.addListener(bw,bb,this._onKeyUpDown,this,true);
bx.addListener(bw,Y,this._onKeyUpDown,this,true);
bx.addListener(bw,bd,this._onKeyPress,this,true);
qx.bom.Element.addListener(window,W,this.hideAll,this);
this.__lh=new qx.event.Timer;
this.__lh.addListener(bc,this._onOpenInterval,this);
this.__li=new qx.event.Timer;
this.__li.addListener(bc,this._onCloseInterval,this);
},members:{__lj:null,__lk:null,__lh:null,__li:null,__lg:null,_getChild:function(a,b,c,d){var f=a.getChildren();
var length=f.length;
var g;

for(var i=b;i<length&&i>=0;i+=c){g=f[i];

if(g.isEnabled()&&!g.isAnonymous()){return g;
}}
if(d){i=i==length?0:length-1;

for(;i!=b;i+=c){g=f[i];

if(g.isEnabled()&&!g.isAnonymous()){return g;
}}}return null;
},_isInMenu:function(l){while(l){if(l instanceof qx.ui.menu.Menu){return true;
}l=l.getLayoutParent();
}return false;
},_getMenuButton:function(B){while(B){if(B instanceof qx.ui.menu.AbstractButton){return B;
}B=B.getLayoutParent();
}return null;
},add:function(D){{};
var E=this.__lg;
E.push(D);
D.setZIndex(1e6+E.length);
},remove:function(bq){{};
var br=this.__lg;

if(br){qx.lang.Array.remove(br,bq);
}},hideAll:function(){var by=this.__lg;

if(by){for(var i=by.length-1;i>=0;i--){by[i].exclude();
}}},getActiveMenu:function(){var A=this.__lg;
return A.length>0?A[A.length-1]:null;
},scheduleOpen:function(bn){this.cancelClose(bn);
if(bn.isVisible()){if(this.__lj){this.cancelOpen(this.__lj);
}}else if(this.__lj!=bn){this.__lj=bn;
this.__lh.restartWith(bn.getOpenInterval());
}},scheduleClose:function(C){this.cancelOpen(C);
if(!C.isVisible()){if(this.__lk){this.cancelClose(this.__lk);
}}else if(this.__lk!=C){this.__lk=C;
this.__li.restartWith(C.getCloseInterval());
}},cancelOpen:function(h){if(this.__lj==h){this.__lh.stop();
this.__lj=null;
}},cancelClose:function(j){if(this.__lk==j){this.__li.stop();
this.__lk=null;
}},_onOpenInterval:function(e){this.__lh.stop();
this.__lj.open();
this.__lj=null;
},_onCloseInterval:function(e){this.__li.stop();
this.__lk.exclude();
this.__lk=null;
},_onMouseDown:function(e){var k=e.getTarget();
k=qx.ui.core.Widget.getWidgetByElement(k);
if(k==null){this.hideAll();
return;
}if(k.getMenu&&k.getMenu()&&k.getMenu().isVisible()){return;
}if(this.__lg.length>0&&!this._isInMenu(k)){this.hideAll();
}},__ll:{"Enter":1,"Space":1},__lm:{"Escape":1,"Up":1,"Down":1,"Left":1,"Right":1},_onKeyUpDown:function(e){var bo=this.getActiveMenu();

if(!bo){return;
}var bp=e.getKeyIdentifier();

if(this.__lm[bp]||(this.__ll[bp]&&bo.getSelectedButton())){e.stopPropagation();
}},_onKeyPress:function(e){var m=this.getActiveMenu();

if(!m){return;
}var n=e.getKeyIdentifier();
var p=this.__lm[n];
var o=this.__ll[n];

if(p){switch(n){case N:this._onKeyPressUp(m);
break;
case L:this._onKeyPressDown(m);
break;
case M:this._onKeyPressLeft(m);
break;
case P:this._onKeyPressRight(m);
break;
case S:this.hideAll();
break;
}e.stopPropagation();
e.preventDefault();
}else if(o){var q=m.getSelectedButton();

if(q){switch(n){case V:this._onKeyPressEnter(m,q,e);
break;
case R:this._onKeyPressSpace(m,q,e);
break;
}e.stopPropagation();
e.preventDefault();
}}},_onKeyPressUp:function(bz){var bA=bz.getSelectedButton();
var bB=bz.getChildren();
var bD=bA?bz.indexOf(bA)-1:bB.length-1;
var bC=this._getChild(bz,bD,-1,true);
if(bC){bz.setSelectedButton(bC);
}else{bz.resetSelectedButton();
}},_onKeyPressDown:function(bs){var bt=bs.getSelectedButton();
var bv=bt?bs.indexOf(bt)+1:0;
var bu=this._getChild(bs,bv,1,true);
if(bu){bs.setSelectedButton(bu);
}else{bs.resetSelectedButton();
}},_onKeyPressLeft:function(bg){var bl=bg.getOpener();

if(!bl){return;
}if(bl instanceof qx.ui.menu.Button){var bi=bl.getLayoutParent();
bi.resetOpenedButton();
bi.setSelectedButton(bl);
}else if(bl instanceof qx.ui.menubar.Button){var bk=bl.getMenuBar().getMenuButtons();
var bh=bk.indexOf(bl);
if(bh===-1){return;
}var bm=null;
var length=bk.length;

for(var i=1;i<=length;i++){var bj=bk[(bh-i+length)%length];

if(bj.isEnabled()){bm=bj;
break;
}}
if(bm&&bm!=bl){bm.open(true);
}}},_onKeyPressRight:function(r){var t=r.getSelectedButton();
if(t){var s=t.getMenu();

if(s){r.setOpenedButton(t);
var z=this._getChild(s,0,1);

if(z){s.setSelectedButton(z);
}return;
}}else if(!r.getOpenedButton()){var z=this._getChild(r,0,1);

if(z){r.setSelectedButton(z);

if(z.getMenu()){r.setOpenedButton(z);
}return;
}}var x=r.getOpener();
if(x instanceof qx.ui.menu.Button&&t){while(x){x=x.getLayoutParent();

if(x instanceof qx.ui.menu.Menu){x=x.getOpener();

if(x instanceof qx.ui.menubar.Button){break;
}}else{break;
}}
if(!x){return;
}}if(x instanceof qx.ui.menubar.Button){var w=x.getMenuBar().getMenuButtons();
var u=w.indexOf(x);
if(u===-1){return;
}var y=null;
var length=w.length;

for(var i=1;i<=length;i++){var v=w[(u+i)%length];

if(v.isEnabled()){y=v;
break;
}}
if(y&&y!=x){y.open(true);
}}},_onKeyPressEnter:function(F,G,e){if(G.hasListener(bd)){var H=e.clone();
H.setBubbles(false);
H.setTarget(G);
G.dispatchEvent(H);
}this.hideAll();
},_onKeyPressSpace:function(I,J,e){if(J.hasListener(bd)){var K=e.clone();
K.setBubbles(false);
K.setTarget(J);
J.dispatchEvent(K);
}}},destruct:function(){var bf=qx.event.Registration;
var be=document.body;
bf.removeListener(window.document.documentElement,ba,this._onMouseDown,this,true);
bf.removeListener(be,bb,this._onKeyUpDown,this,true);
bf.removeListener(be,Y,this._onKeyUpDown,this,true);
bf.removeListener(be,bd,this._onKeyPress,this,true);
this._disposeObjects(T,U);
this._disposeArray(X);
}});
})();
(function(){var l="indexOf",k="addAfter",j="add",i="addBefore",h="_",g="addAt",f="hasChildren",e="removeAt",d="removeAll",c="getChildren",a="remove",b="qx.ui.core.MRemoteChildrenHandling";
qx.Mixin.define(b,{members:{__ln:function(u,v,w,x){var y=this.getChildrenContainer();

if(y===this){u=h+u;
}return (y[u])(v,w,x);
},getChildren:function(){return this.__ln(c);
},hasChildren:function(){return this.__ln(f);
},add:function(q,r){return this.__ln(j,q,r);
},remove:function(p){return this.__ln(a,p);
},removeAll:function(){return this.__ln(d);
},indexOf:function(s){return this.__ln(l,s);
},addAt:function(m,n,o){this.__ln(g,m,n,o);
},addBefore:function(z,A,B){this.__ln(i,z,A,B);
},addAfter:function(C,D,E){this.__ln(k,C,D,E);
},removeAt:function(t){this.__ln(e,t);
}}});
})();
(function(){var I="slidebar",H="Integer",G="resize",F="qx.ui.core.Widget",E="selected",D="visible",C="Boolean",B="mouseout",A="excluded",z="menu",X="_applySelectedButton",W="_applySpacingY",V="_blocker",U="_applyCloseInterval",T="_applyBlockerColor",S="_applyIconColumnWidth",R="mouseover",Q="_applyArrowColumnWidth",P="qx.ui.menu.Menu",O="Color",M="Number",N="_applyOpenInterval",K="_applySpacingX",L="_applyBlockerOpacity",J="_applyOpenedButton";
qx.Class.define(P,{extend:qx.ui.core.Widget,include:[qx.ui.core.MPlacement,qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.Layout);
var bd=this.getApplicationRoot();
bd.add(this);
this.addListener(R,this._onMouseOver);
this.addListener(B,this._onMouseOut);
this.addListener(G,this._onResize,this);
bd.addListener(G,this._onResize,this);
this._blocker=new qx.ui.core.Blocker(bd);
this.initVisibility();
this.initKeepFocus();
this.initKeepActive();
},properties:{appearance:{refine:true,init:z},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},visibility:{refine:true,init:A},keepFocus:{refine:true,init:true},keepActive:{refine:true,init:true},spacingX:{check:H,apply:K,init:0,themeable:true},spacingY:{check:H,apply:W,init:0,themeable:true},iconColumnWidth:{check:H,init:0,themeable:true,apply:S},arrowColumnWidth:{check:H,init:0,themeable:true,apply:Q},blockerColor:{check:O,init:null,nullable:true,apply:T,themeable:true},blockerOpacity:{check:M,init:1,apply:L,themeable:true},selectedButton:{check:F,nullable:true,apply:X},openedButton:{check:F,nullable:true,apply:J},opener:{check:F,nullable:true},openInterval:{check:H,themeable:true,init:250,apply:N},closeInterval:{check:H,themeable:true,init:250,apply:U},blockBackground:{check:C,themeable:true,init:false}},members:{__lo:null,__lp:null,_blocker:null,open:function(){if(this.getOpener()!=null){this.placeToWidget(this.getOpener());
this.__lr();
this.show();
this._placementTarget=this.getOpener();
}else{this.warn("The menu instance needs a configured 'opener' widget!");
}},openAtMouse:function(e){this.placeToMouse(e);
this.__lr();
this.show();
this._placementTarget={left:e.getDocumentLeft(),top:e.getDocumentTop()};
},openAtPoint:function(bq){this.placeToPoint(bq);
this.__lr();
this.show();
this._placementTarget=bq;
},addSeparator:function(){this.add(new qx.ui.menu.Separator);
},getColumnSizes:function(){return this._getMenuLayout().getColumnSizes();
},getSelectables:function(){var ba=[];
var bb=this.getChildren();

for(var i=0;i<bb.length;i++){if(bb[i].isEnabled()){ba.push(bb[i]);
}}return ba;
},_applyIconColumnWidth:function(be,bf){this._getMenuLayout().setIconColumnWidth(be);
},_applyArrowColumnWidth:function(bo,bp){this._getMenuLayout().setArrowColumnWidth(bo);
},_applySpacingX:function(bm,bn){this._getMenuLayout().setColumnSpacing(bm);
},_applySpacingY:function(k,l){this._getMenuLayout().setSpacing(k);
},_applyVisibility:function(bg,bh){qx.ui.core.Widget.prototype._applyVisibility.call(this,bg,bh);
var bi=qx.ui.menu.Manager.getInstance();

if(bg===D){bi.add(this);
var bj=this.getParentMenu();

if(bj){bj.setOpenedButton(this.getOpener());
}}else if(bh===D){bi.remove(this);
var bj=this.getParentMenu();

if(bj&&bj.getOpenedButton()==this.getOpener()){bj.resetOpenedButton();
}this.resetOpenedButton();
this.resetSelectedButton();
}this.__lq();
},__lq:function(){if(this.isVisible()){if(this.getBlockBackground()){var br=this.getZIndex();
this._blocker.blockContent(br-1);
}}else{if(this._blocker.isContentBlocked()){this._blocker.unblockContent();
}}},getParentMenu:function(){var bc=this.getOpener();

if(!bc||!(bc instanceof qx.ui.menu.AbstractButton)){return null;
}
while(bc&&!(bc instanceof qx.ui.menu.Menu)){bc=bc.getLayoutParent();
}return bc;
},_applySelectedButton:function(m,n){if(n){n.removeState(E);
}
if(m){m.addState(E);
}},_applyOpenedButton:function(f,g){if(g){g.getMenu().exclude();
}
if(f){f.getMenu().open();
}},_applyBlockerColor:function(x,y){this._blocker.setColor(x);
},_applyBlockerOpacity:function(bk,bl){this._blocker.setOpacity(bk);
},getChildrenContainer:function(){return this.getChildControl(I,true)||this;
},_createChildControlImpl:function(s){var t;

switch(s){case I:var t=new qx.ui.menu.MenuSlideBar();
var v=this._getLayout();
this._setLayout(new qx.ui.layout.Grow());
var u=t.getLayout();
t.setLayout(v);
u.dispose();
var w=qx.lang.Array.clone(this.getChildren());

for(var i=0;i<w.length;i++){t.add(w[i]);
}this.removeListener(G,this._onResize,this);
t.getChildrenContainer().addListener(G,this._onResize,this);
this._add(t);
break;
}return t||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,s);
},_getMenuLayout:function(){if(this.hasChildControl(I)){return this.getChildControl(I).getChildrenContainer().getLayout();
}else{return this._getLayout();
}},_getMenuBounds:function(){if(this.hasChildControl(I)){return this.getChildControl(I).getChildrenContainer().getBounds();
}else{return this.getBounds();
}},_computePlacementSize:function(){return this._getMenuBounds();
},__lr:function(){var p=this._getMenuBounds();

if(!p){this.addListenerOnce(G,this.__lr,this);
return;
}var o=this.getLayoutParent().getBounds().height;
var top=this.getLayoutProperties().top;
var q=this.getLayoutProperties().left;
if(top<0){this._assertSlideBar(function(){this.setHeight(p.height+top);
this.moveTo(q,0);
});
}else if(top+p.height>o){this._assertSlideBar(function(){this.setHeight(o-top);
});
}else{this.setHeight(null);
}},_assertSlideBar:function(r){if(this.hasChildControl(I)){return r.call(this);
}this.__lp=r;
qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.getChildControl(I);

if(this.__lp){this.__lp.call(this);
delete this.__lp;
}},_onResize:function(){if(this.isVisible()){var Y=this._placementTarget;

if(!Y){return;
}else if(Y instanceof qx.ui.core.Widget){this.placeToWidget(Y);
}else if(Y.top!==undefined){this.placeToPoint(Y);
}else{throw new Error("Unknown target: "+Y);
}this.__lr();
}},_onMouseOver:function(e){var b=qx.ui.menu.Manager.getInstance();
b.cancelClose(this);
var c=e.getTarget();

if(c.isEnabled()&&c instanceof qx.ui.menu.AbstractButton){this.setSelectedButton(c);
var a=c.getMenu&&c.getMenu();

if(a){a.setOpener(c);
b.scheduleOpen(a);
this.__lo=a;
}else{var d=this.getOpenedButton();

if(d){b.scheduleClose(d.getMenu());
}
if(this.__lo){b.cancelOpen(this.__lo);
this.__lo=null;
}}}else if(!this.getOpenedButton()){this.resetSelectedButton();
}},_onMouseOut:function(e){var h=qx.ui.menu.Manager.getInstance();
if(!qx.ui.core.Widget.contains(this,e.getRelatedTarget())){var j=this.getOpenedButton();
j?this.setSelectedButton(j):this.resetSelectedButton();
if(j){h.cancelClose(j.getMenu());
}if(this.__lo){h.cancelOpen(this.__lo);
}}}},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){qx.ui.menu.Manager.getInstance().remove(this);
}this.getApplicationRoot().removeListener(G,this._onResize,this);
this._placementTarget=null;
this._disposeObjects(V);
}});
})();
(function(){var c="Integer",b="_applyLayoutChange",a="qx.ui.menu.Layout";
qx.Class.define(a,{extend:qx.ui.layout.VBox,properties:{columnSpacing:{check:c,init:0,apply:b},spanColumn:{check:c,init:1,nullable:true,apply:b},iconColumnWidth:{check:c,init:0,themeable:true,apply:b},arrowColumnWidth:{check:c,init:0,themeable:true,apply:b}},members:{__lx:null,_computeSizeHint:function(){var q=this._getLayoutChildren();
var o,g,j;
var e=this.getSpanColumn();
var h=this.__lx=[0,0,0,0];
var m=this.getColumnSpacing();
var k=0;
var f=0;
for(var i=0,l=q.length;i<l;i++){o=q[i];

if(o.isAnonymous()){continue;
}g=o.getChildrenSizes();

for(var n=0;n<g.length;n++){if(e!=null&&n==e&&g[e+1]==0){k=Math.max(k,g[n]);
}else{h[n]=Math.max(h[n],g[n]);
}}var d=q[i].getInsets();
f=Math.max(f,d.left+d.right);
}if(e!=null&&h[e]+m+h[e+1]<k){h[e]=k-h[e+1]-m;
}if(k==0){j=m*2;
}else{j=m*3;
}if(h[0]==0){h[0]=this.getIconColumnWidth();
}if(h[3]==0){h[3]=this.getArrowColumnWidth();
}var p=qx.ui.layout.VBox.prototype._computeSizeHint.call(this).height;
return {minHeight:p,height:p,width:qx.lang.Array.sum(h)+f+j};
},getColumnSizes:function(){return this.__lx||null;
}},destruct:function(){this.__lx=null;
}});
})();
(function(){var b="menu-separator",a="qx.ui.menu.Separator";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{appearance:{refine:true,init:b},anonymous:{refine:true,init:true}}});
})();
(function(){var B="icon",A="label",z="arrow",y="shortcut",x="changeLocale",w="qx.dynlocale",v="submenu",u="on",t="String",s="qx.ui.menu.Menu",m="qx.ui.menu.AbstractButton",r="keypress",p="",l="_applyIcon",k="mouseup",o="abstract",n="_applyLabel",q="_applyMenu",j="changeCommand";
qx.Class.define(m,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],type:o,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.menu.ButtonLayout);
this.addListener(k,this._onMouseUp);
this.addListener(r,this._onKeyPress);
this.addListener(j,this._onChangeCommand,this);
},properties:{blockToolTip:{refine:true,init:true},label:{check:t,apply:n,nullable:true},menu:{check:s,apply:q,nullable:true},icon:{check:t,apply:l,themeable:true,nullable:true}},members:{_createChildControlImpl:function(J){var K;

switch(J){case B:K=new qx.ui.basic.Image;
K.setAnonymous(true);
this._add(K,{column:0});
break;
case A:K=new qx.ui.basic.Label;
K.setAnonymous(true);
this._add(K,{column:1});
break;
case y:K=new qx.ui.basic.Label;
K.setAnonymous(true);
this._add(K,{column:2});
break;
case z:K=new qx.ui.basic.Image;
K.setAnonymous(true);
this._add(K,{column:3});
break;
}return K||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,J);
},_forwardStates:{selected:1},getChildrenSizes:function(){var a=0,b=0,c=0,h=0;

if(this._isChildControlVisible(B)){var i=this.getChildControl(B);
a=i.getMarginLeft()+i.getSizeHint().width+i.getMarginRight();
}
if(this._isChildControlVisible(A)){var f=this.getChildControl(A);
b=f.getMarginLeft()+f.getSizeHint().width+f.getMarginRight();
}
if(this._isChildControlVisible(y)){var d=this.getChildControl(y);
c=d.getMarginLeft()+d.getSizeHint().width+d.getMarginRight();
}
if(this._isChildControlVisible(z)){var g=this.getChildControl(z);
h=g.getMarginLeft()+g.getSizeHint().width+g.getMarginRight();
}return [a,b,c,h];
},_onMouseUp:function(e){},_onKeyPress:function(e){},_onChangeCommand:function(e){var I=e.getData();

if(qx.core.Variant.isSet(w,u)){var G=e.getOldData();

if(!G){qx.locale.Manager.getInstance().addListener(x,this._onChangeLocale,this);
}
if(!I){qx.locale.Manager.getInstance().removeListener(x,this._onChangeLocale,this);
}}var H=I!=null?I.toString():p;
this.getChildControl(y).setValue(H);
},_onChangeLocale:qx.core.Variant.select(w,{"on":function(e){var N=this.getCommand();

if(N!=null){this.getChildControl(y).setValue(N.toString());
}},"off":null}),_applyIcon:function(E,F){if(E){this._showChildControl(B).setSource(E);
}else{this._excludeChildControl(B);
}},_applyLabel:function(C,D){if(C){this._showChildControl(A).setValue(C);
}else{this._excludeChildControl(A);
}},_applyMenu:function(L,M){if(M){M.resetOpener();
M.removeState(v);
}
if(L){this._showChildControl(z);
L.setOpener(this);
L.addState(v);
}else{this._excludeChildControl(z);
}}},destruct:function(){if(this.getMenu()){if(!qx.core.ObjectRegistry.inShutDown){this.getMenu().destroy();
}}
if(qx.core.Variant.isSet(w,u)){qx.locale.Manager.getInstance().removeListener(x,this._onChangeLocale,this);
}}});
})();
(function(){var c="middle",b="qx.ui.menu.ButtonLayout",a="left";
qx.Class.define(b,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(j,k){var v=this._getLayoutChildren();
var u;
var n;
var o=[];

for(var i=0,l=v.length;i<l;i++){u=v[i];
n=u.getLayoutProperties().column;
o[n]=u;
}var t=this.__ly(v[0]);
var w=t.getColumnSizes();
var q=t.getSpacingX();
var p=qx.lang.Array.sum(w)+q*(w.length-1);

if(p<j){w[1]+=j-p;
}var x=0,top=0;
var r=qx.ui.layout.Util;

for(var i=0,l=w.length;i<l;i++){u=o[i];

if(u){var m=u.getSizeHint();
var top=r.computeVerticalAlignOffset(u.getAlignY()||c,m.height,k,0,0);
var s=r.computeHorizontalAlignOffset(u.getAlignX()||a,m.width,w[i],u.getMarginLeft(),u.getMarginRight());
u.renderLayout(x+s,top,m.width,m.height);
}x+=w[i]+q;
}},__ly:function(d){while(!(d instanceof qx.ui.menu.Menu)){d=d.getLayoutParent();
}return d;
},_computeSizeHint:function(){var g=this._getLayoutChildren();
var f=0;
var h=0;

for(var i=0,l=g.length;i<l;i++){var e=g[i].getSizeHint();
h+=e.width;
f=Math.max(f,e.height);
}return {width:h,height:f};
}}});
})();
(function(){var a="qx.ui.core.MRemoteLayoutHandling";
qx.Mixin.define(a,{members:{setLayout:function(b){return this.getChildrenContainer().setLayout(b);
},getLayout:function(){return this.getChildrenContainer().getLayout();
}}});
})();
(function(){var q="horizontal",p="scrollpane",o="vertical",n="button-backward",m="button-forward",l="content",k="execute",j="qx.ui.container.SlideBar",i="scrollY",h="removeChildWidget",c="scrollX",g="_applyOrientation",f="mousewheel",b="Integer",a="slidebar",d="update";
qx.Class.define(j,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling],construct:function(w){qx.ui.core.Widget.call(this);
var x=this.getChildControl(p);
this._add(x,{flex:1});

if(w!=null){this.setOrientation(w);
}else{this.initOrientation();
}this.addListener(f,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:a},orientation:{check:[q,o],init:q,apply:g},scrollStep:{check:b,init:15,themeable:true}},members:{getChildrenContainer:function(){return this.getChildControl(l);
},_createChildControlImpl:function(u){var v;

switch(u){case m:v=new qx.ui.form.RepeatButton;
v.addListener(k,this._onExecuteForward,this);
v.setFocusable(false);
this._addAt(v,2);
break;
case n:v=new qx.ui.form.RepeatButton;
v.addListener(k,this._onExecuteBackward,this);
v.setFocusable(false);
this._addAt(v,0);
break;
case l:v=new qx.ui.container.Composite();
if(qx.bom.client.Engine.GECKO){v.addListener(h,this._onRemoveChild,this);
}this.getChildControl(p).add(v);
break;
case p:v=new qx.ui.core.scroll.ScrollPane();
v.addListener(d,this._onResize,this);
v.addListener(c,this._onScroll,this);
v.addListener(i,this._onScroll,this);
break;
}return v||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,u);
},_forwardStates:{barLeft:true,barTop:true,barRight:true,barBottom:true},scrollBy:function(A){var B=this.getChildControl(p);

if(this.getOrientation()===q){B.scrollByX(A);
}else{B.scrollByY(A);
}},scrollTo:function(y){var z=this.getChildControl(p);

if(this.getOrientation()===q){z.scrollToX(y);
}else{z.scrollToY(y);
}},_applyOrientation:function(C,D){var G=[this.getLayout(),this._getLayout()];
var F=this.getChildControl(m);
var E=this.getChildControl(n);
if(D==o){F.removeState(o);
E.removeState(o);
F.addState(q);
E.addState(q);
}else if(D==q){F.removeState(q);
E.removeState(q);
F.addState(o);
E.addState(o);
}
if(C==q){this._setLayout(new qx.ui.layout.HBox());
this.setLayout(new qx.ui.layout.HBox());
}else{this._setLayout(new qx.ui.layout.VBox());
this.setLayout(new qx.ui.layout.VBox());
}
if(G[0]){G[0].dispose();
}
if(G[1]){G[1].dispose();
}},_onMouseWheel:function(e){this.scrollBy(e.getWheelDelta()*this.getScrollStep());
e.stop();
},_onScroll:function(){this._updateArrowsEnabled();
},_onResize:function(e){var content=this.getChildControl(p).getChildren()[0];

if(!content){return;
}var r=this.getInnerSize();
var t=content.getBounds();
var s=(this.getOrientation()===q)?t.width>r.width:t.height>r.height;

if(s){this._showArrows();
this._updateArrowsEnabled();
}else{this._hideArrows();
}},_onExecuteBackward:function(){this.scrollBy(-this.getScrollStep());
},_onExecuteForward:function(){this.scrollBy(this.getScrollStep());
},_onRemoveChild:function(){qx.event.Timer.once(function(){this.scrollBy(this.getChildControl(p).getScrollX());
},this,50);
},_updateArrowsEnabled:function(){var I=this.getChildControl(p);

if(this.getOrientation()===q){var H=I.getScrollX();
var J=I.getScrollMaxX();
}else{var H=I.getScrollY();
var J=I.getScrollMaxY();
}this.getChildControl(n).setEnabled(H>0);
this.getChildControl(m).setEnabled(H<J);
},_showArrows:function(){this._showChildControl(m);
this._showChildControl(n);
},_hideArrows:function(){this._excludeChildControl(m);
this._excludeChildControl(n);
this.scrollTo(0);
}}});
})();
(function(){var f="execute",e="button-backward",d="vertical",c="button-forward",b="menu-slidebar",a="qx.ui.menu.MenuSlideBar";
qx.Class.define(a,{extend:qx.ui.container.SlideBar,construct:function(){qx.ui.container.SlideBar.call(this,d);
},properties:{appearance:{refine:true,init:b}},members:{_createChildControlImpl:function(g){var h;

switch(g){case c:h=new qx.ui.form.HoverButton();
h.addListener(f,this._onExecuteForward,this);
this._addAt(h,2);
break;
case e:h=new qx.ui.form.HoverButton();
h.addListener(f,this._onExecuteBackward,this);
this._addAt(h,0);
break;
}return h||qx.ui.container.SlideBar.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var n="pressed",m="abandoned",l="Integer",k="hovered",j="qx.event.type.Event",i="Enter",h="Space",g="press",f="qx.ui.form.RepeatButton",d="release",a="interval",c="__lz",b="execute";
qx.Class.define(f,{extend:qx.ui.form.Button,construct:function(q,r){qx.ui.form.Button.call(this,q,r);
this.__lz=new qx.event.AcceleratingTimer();
this.__lz.addListener(a,this._onInterval,this);
},events:{"execute":j,"press":j,"release":j},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__lA:null,__lz:null,press:function(){if(this.isEnabled()){if(!this.hasState(n)){this.__lB();
}this.removeState(m);
this.addState(n);
}},release:function(s){if(!this.isEnabled()){return;
}if(this.hasState(n)){if(!this.__lA){this.execute();
}}this.removeState(n);
this.removeState(m);
this.__lC();
},_applyEnabled:function(o,p){qx.ui.form.Button.prototype._applyEnabled.call(this,o,p);

if(!o){this.removeState(n);
this.removeState(m);
this.__lC();
}},_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}
if(this.hasState(m)){this.removeState(m);
this.addState(n);
this.__lz.start();
}this.addState(k);
},_onMouseOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.removeState(k);

if(this.hasState(n)){this.removeState(n);
this.addState(m);
this.__lz.stop();
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.__lB();
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(!this.hasState(m)){this.addState(k);

if(this.hasState(n)&&!this.__lA){this.execute();
}}this.__lC();
e.stopPropagation();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case i:case h:if(this.hasState(n)){if(!this.__lA){this.execute();
}this.removeState(n);
this.removeState(m);
e.stopPropagation();
this.__lC();
}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case i:case h:this.removeState(m);
this.addState(n);
e.stopPropagation();
this.__lB();
}},_onInterval:function(e){this.__lA=true;
this.fireEvent(b);
},__lB:function(){this.fireEvent(g);
this.__lA=false;
this.__lz.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.removeState(m);
this.addState(n);
},__lC:function(){this.fireEvent(d);
this.__lz.stop();
this.removeState(m);
this.removeState(n);
}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var e="Integer",d="interval",c="__lD",b="qx.event.type.Event",a="qx.event.AcceleratingTimer";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__lD=new qx.event.Timer(this.getInterval());
this.__lD.addListener(d,this._onInterval,this);
},events:{"interval":b},properties:{interval:{check:e,init:100},firstInterval:{check:e,init:500},minimum:{check:e,init:20},decrease:{check:e,init:2}},members:{__lD:null,__lE:null,start:function(){this.__lD.setInterval(this.getFirstInterval());
this.__lD.start();
},stop:function(){this.__lD.stop();
this.__lE=null;
},_onInterval:function(){this.__lD.stop();

if(this.__lE==null){this.__lE=this.getInterval();
}this.__lE=Math.max(this.getMinimum(),this.__lE-this.getDecrease());
this.__lD.setInterval(this.__lE);
this.__lD.start();
this.fireEvent(d);
}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var N="resize",M="scrollY",L="update",K="scrollX",J="_applyScrollX",I="_applyScrollY",H="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",G="appear",F="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",E="qx.event.type.Event",C="qx.ui.core.scroll.ScrollPane",D="scroll";
qx.Class.define(C,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);
this.set({minWidth:0,minHeight:0});
this._setLayout(new qx.ui.layout.Grow());
this.addListener(N,this._onUpdate);
var i=this.getContentElement();
i.addListener(D,this._onScroll,this);
i.addListener(G,this._onAppear,this);
},events:{update:E},properties:{scrollX:{check:H,apply:J,event:K,init:0},scrollY:{check:F,apply:I,event:M,init:0}},members:{add:function(l){var m=this._getChildren()[0];

if(m){this._remove(m);
m.removeListener(N,this._onUpdate,this);
}
if(l){this._add(l);
l.addListener(N,this._onUpdate,this);
}},remove:function(q){if(q){this._remove(q);
q.removeListener(N,this._onUpdate,this);
}},getChildren:function(){return this._getChildren();
},_onUpdate:function(e){this.fireEvent(L);
},_onScroll:function(e){var n=this.getContentElement();
this.setScrollX(n.getScrollX());
this.setScrollY(n.getScrollY());
},_onAppear:function(e){var g=this.getContentElement();
var c=this.getScrollX();
var d=g.getScrollX();

if(c!=d){g.scrollToX(c);
}var h=this.getScrollY();
var f=g.getScrollY();

if(h!=f){g.scrollToY(h);
}},getItemTop:function(t){var top=0;

do{top+=t.getBounds().top;
t=t.getLayoutParent();
}while(t&&t!==this);
return top;
},getItemBottom:function(B){return this.getItemTop(B)+B.getBounds().height;
},getItemLeft:function(a){var b=0;
var parent;

do{b+=a.getBounds().left;
parent=a.getLayoutParent();

if(parent){b+=parent.getInsets().left;
}a=parent;
}while(a&&a!==this);
return b;
},getItemRight:function(v){return this.getItemLeft(v)+v.getBounds().width;
},getScrollSize:function(){return this.getChildren()[0].getBounds();
},getScrollMaxX:function(){var k=this.getInnerSize();
var j=this.getScrollSize();

if(k&&j){return Math.max(0,j.width-k.width);
}return 0;
},getScrollMaxY:function(){var p=this.getInnerSize();
var o=this.getScrollSize();

if(p&&o){return Math.max(0,o.height-p.height);
}return 0;
},scrollToX:function(r){var s=this.getScrollMaxX();

if(r<0){r=0;
}else if(r>s){r=s;
}this.setScrollX(r);
},scrollToY:function(w){var z=this.getScrollMaxY();

if(w<0){w=0;
}else if(w>z){w=z;
}this.setScrollY(w);
},scrollByX:function(x){this.scrollToX(this.getScrollX()+x);
},scrollByY:function(y){this.scrollToY(this.getScrollY()+y);
},_applyScrollX:function(u){this.getContentElement().scrollToX(u);
},_applyScrollY:function(A){this.getContentElement().scrollToY(A);
}}});
})();
(function(){var i="Integer",h="hovered",g="hover-button",f="__lF",d="interval",c="mouseover",b="mouseout",a="qx.ui.form.HoverButton";
qx.Class.define(a,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(j,k){qx.ui.basic.Atom.call(this,j,k);
this.addListener(c,this._onMouseOver,this);
this.addListener(b,this._onMouseOut,this);
this.__lF=new qx.event.AcceleratingTimer();
this.__lF.addListener(d,this._onInterval,this);
},properties:{appearance:{refine:true,init:g},interval:{check:i,init:80},firstInterval:{check:i,init:200},minTimer:{check:i,init:20},timerDecrease:{check:i,init:2}},members:{__lF:null,_onMouseOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;
}this.__lF.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();
this.addState(h);
},_onMouseOut:function(e){this.__lF.stop();
this.removeState(h);

if(!this.isEnabled()||e.getTarget()!==this){return;
}},_onInterval:function(){if(this.isEnabled()){this.execute();
}else{this.__lF.stop();
}}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var b="qx.ui.menu.Button",a="menu-button";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,construct:function(c,d,f,g){qx.ui.menu.AbstractButton.call(this);
if(c!=null){this.setLabel(c);
}
if(d!=null){this.setIcon(d);
}
if(f!=null){this.setCommand(f);
}
if(g!=null){this.setMenu(g);
}},properties:{appearance:{refine:true,init:a}},members:{_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
if(this.getMenu()){return;
}}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var m="container",k="handle",j="both",h="Integer",g="middle",f="qx.ui.toolbar.Part",e="icon",d="label",c="changeShow",b="_applySpacing",a="toolbar/part";
qx.Class.define(f,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox);
this._createChildControl(k);
},properties:{appearance:{refine:true,init:a},show:{init:j,check:[j,d,e],inheritable:true,event:c},spacing:{nullable:true,check:h,themeable:true,apply:b}},members:{_createChildControlImpl:function(q){var r;

switch(q){case k:r=new qx.ui.basic.Image();
r.setAlignY(g);
this._add(r);
break;
case m:r=new qx.ui.toolbar.PartContainer;
this._add(r);
break;
}return r||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,q);
},getChildrenContainer:function(){return this.getChildControl(m);
},_applySpacing:function(n,o){var p=this.getChildControl(m).getLayout();
n==null?p.resetSpacing():p.setSpacing(n);
},addSeparator:function(){this.add(new qx.ui.toolbar.Separator);
},getMenuButtons:function(){var t=this.getChildren();
var s=[];
var u;

for(var i=0,l=t.length;i<l;i++){u=t[i];

if(u instanceof qx.ui.menubar.Button){s.push(u);
}}return s;
}}});
})();
(function(){var f="both",e="toolbar/part/container",d="icon",c="changeShow",b="qx.ui.toolbar.PartContainer",a="label";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
this._setLayout(new qx.ui.layout.HBox);
},properties:{appearance:{refine:true,init:e},show:{init:f,check:[f,a,d],inheritable:true,event:c}}});
})();
(function(){var l="Boolean",k="resize",j="mousedown",i="w-resize",h="sw-resize",g="n-resize",f="resizableRight",d="ne-resize",c="se-resize",b="Integer",A="e-resize",z="resizableLeft",y="mousemove",x="move",w="shorthand",v="maximized",u="nw-resize",t="mouseout",s="qx.ui.core.MResizable",r="mouseup",p="losecapture",q="resize-frame",n="resizableBottom",o="s-resize",m="resizableTop";
qx.Mixin.define(s,{construct:function(){this.addListener(j,this.__nK,this,true);
this.addListener(r,this.__nL,this);
this.addListener(y,this.__nN,this);
this.addListener(t,this.__nO,this);
this.addListener(p,this.__nM,this);
var ba=this.getContainerElement().getDomElement();

if(ba==null){ba=window;
}this.__ny=qx.event.Registration.getManager(ba).getHandler(qx.event.handler.DragDrop);
},properties:{resizableTop:{check:l,init:true},resizableRight:{check:l,init:true},resizableBottom:{check:l,init:true},resizableLeft:{check:l,init:true},resizable:{group:[m,f,n,z],mode:w},resizeSensitivity:{check:b,init:5},useResizeFrame:{check:l,init:true}},members:{__ny:null,__nz:null,__nA:null,__nB:null,__nC:null,__nD:null,__nE:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,__nF:function(){var I=this.__nz;

if(!I){I=this.__nz=new qx.ui.core.Widget();
I.setAppearance(q);
I.exclude();
qx.core.Init.getApplication().getRoot().add(I);
}return I;
},__nG:function(){var C=this.__nD;
var B=this.__nF();
B.setUserBounds(C.left,C.top,C.width,C.height);
B.show();
B.setZIndex(this.getZIndex()+1);
},__nH:function(e){var K=this.__nA;
var L=this.getSizeHint();
var O=this.__nE;
var N=this.__nD;
var J=N.width;
var M=N.height;
var Q=N.left;
var top=N.top;
var P;

if((K&this.RESIZE_TOP)||(K&this.RESIZE_BOTTOM)){P=Math.max(O.top,Math.min(O.bottom,e.getDocumentTop()))-this.__nC;

if(K&this.RESIZE_TOP){M-=P;
}else{M+=P;
}
if(M<L.minHeight){M=L.minHeight;
}else if(M>L.maxHeight){M=L.maxHeight;
}
if(K&this.RESIZE_TOP){top+=N.height-M;
}}
if((K&this.RESIZE_LEFT)||(K&this.RESIZE_RIGHT)){P=Math.max(O.left,Math.min(O.right,e.getDocumentLeft()))-this.__nB;

if(K&this.RESIZE_LEFT){J-=P;
}else{J+=P;
}
if(J<L.minWidth){J=L.minWidth;
}else if(J>L.maxWidth){J=L.maxWidth;
}
if(K&this.RESIZE_LEFT){Q+=N.width-J;
}}return {viewportLeft:Q,viewportTop:top,parentLeft:N.bounds.left+Q-N.left,parentTop:N.bounds.top+top-N.top,width:J,height:M};
},__nI:{1:g,2:o,4:i,8:A,5:u,6:h,9:d,10:c},__nJ:function(e){var F=this.getContentLocation();
var D=this.getResizeSensitivity();
var H=e.getDocumentLeft();
var G=e.getDocumentTop();
var E=0;

if(this.getResizableTop()&&Math.abs(F.top-G)<D){E+=this.RESIZE_TOP;
}else if(this.getResizableBottom()&&Math.abs(F.bottom-G)<D){E+=this.RESIZE_BOTTOM;
}
if(this.getResizableLeft()&&Math.abs(F.left-H)<D){E+=this.RESIZE_LEFT;
}else if(this.getResizableRight()&&Math.abs(F.right-H)<D){E+=this.RESIZE_RIGHT;
}this.__nA=E;
},__nK:function(e){if(!this.__nA){return;
}this.addState(k);
this.__nB=e.getDocumentLeft();
this.__nC=e.getDocumentTop();
var location=this.getContainerLocation();
var T=this.getBounds();
this.__nD={top:location.top,left:location.left,width:T.width,height:T.height,bounds:qx.lang.Object.clone(T)};
var parent=this.getLayoutParent();
var R=parent.getContentLocation();
var S=parent.getBounds();
this.__nE={left:R.left,top:R.top,right:R.left+S.width,bottom:R.top+S.height};
if(this.getUseResizeFrame()){this.__nG();
}this.capture();
e.stop();
},__nL:function(e){if(!this.hasState(k)){return;
}if(this.getUseResizeFrame()){this.__nF().exclude();
}var a=this.__nH(e);
this.setWidth(a.width);
this.setHeight(a.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:a.parentLeft,top:a.parentTop});
}this.__nA=0;
this.removeState(k);
this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.releaseCapture();
e.stopPropagation();
},__nM:function(e){if(!this.__nA){return;
}this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
this.removeState(x);
if(this.getUseResizeFrame()){this.__nF().exclude();
}},__nN:function(e){if(this.hasState(k)){var X=this.__nH(e);
if(this.getUseResizeFrame()){var V=this.__nF();
V.setUserBounds(X.viewportLeft,X.viewportTop,X.width,X.height);
}else{this.setWidth(X.width);
this.setHeight(X.height);
if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:X.parentLeft,top:X.parentTop});
}}e.stopPropagation();
}else if(!this.hasState(v)&&!this.__ny.isSessionActive()){this.__nJ(e);
var Y=this.__nA;
var W=this.getApplicationRoot();

if(Y){var U=this.__nI[Y];
this.setCursor(U);
W.setGlobalCursor(U);
}else if(this.getCursor()){this.resetCursor();
W.resetGlobalCursor();
}}},__nO:function(e){if(this.getCursor()&&!this.hasState(k)){this.resetCursor();
this.getApplicationRoot().resetGlobalCursor();
}}},destruct:function(){if(this.__nz!=null&&!qx.core.ObjectRegistry.inShutDown){this.__nz.destroy();
this.__nz=null;
}this.__ny=null;
}});
})();
(function(){var l="move",k="Boolean",j="mouseup",i="mousedown",h="losecapture",g="qx.ui.core.MMovable",f="__pc",d="mousemove",c="__pb",b="maximized",a="move-frame";
qx.Mixin.define(g,{properties:{movable:{check:k,init:true},useMoveFrame:{check:k,init:false}},members:{__pb:null,__pc:null,__pd:null,__pe:null,__pf:null,__pg:null,__ph:null,__pi:false,__pj:null,__pk:0,_activateMoveHandle:function(m){if(this.__pb){throw new Error("The move handle could not be redefined!");
}this.__pb=m;
m.addListener(i,this._onMoveMouseDown,this);
m.addListener(j,this._onMoveMouseUp,this);
m.addListener(d,this._onMoveMouseMove,this);
m.addListener(h,this.__po,this);
},__pl:function(){var n=this.__pc;

if(!n){n=this.__pc=new qx.ui.core.Widget();
n.setAppearance(a);
n.exclude();
qx.core.Init.getApplication().getRoot().add(n);
}return n;
},__pm:function(){var location=this.getContainerLocation();
var t=this.getBounds();
var s=this.__pl();
s.setUserBounds(location.left,location.top,t.width,t.height);
s.show();
s.setZIndex(this.getZIndex()+1);
},__pn:function(e){var w=this.__pd;
var z=Math.max(w.left,Math.min(w.right,e.getDocumentLeft()));
var y=Math.max(w.top,Math.min(w.bottom,e.getDocumentTop()));
var v=this.__pe+z;
var x=this.__pf+y;
return {viewportLeft:v,viewportTop:x,parentLeft:v-this.__pg,parentTop:x-this.__ph};
},_onMoveMouseDown:function(e){if(!this.getMovable()||this.hasState(b)){return;
}var parent=this.getLayoutParent();
var q=parent.getContentLocation();
var r=parent.getBounds();
if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isContentBlocked()){this.__pi=true;
this.__pj=parent.getBlockerColor();
this.__pk=parent.getBlockerOpacity();
parent.setBlockerColor(null);
parent.setBlockerOpacity(1);
parent.blockContent(this.getZIndex()-1);
}}this.__pd={left:q.left,top:q.top,right:q.left+r.width,bottom:q.top+r.height};
var p=this.getContainerLocation();
this.__pg=q.left;
this.__ph=q.top;
this.__pe=p.left-e.getDocumentLeft();
this.__pf=p.top-e.getDocumentTop();
this.addState(l);
this.__pb.capture();
if(this.getUseMoveFrame()){this.__pm();
}e.stop();
},_onMoveMouseMove:function(e){if(!this.hasState(l)){return;
}var u=this.__pn(e);

if(this.getUseMoveFrame()){this.__pl().setDomPosition(u.viewportLeft,u.viewportTop);
}else{this.setDomPosition(u.parentLeft,u.parentTop);
}e.stopPropagation();
},_onMoveMouseUp:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
var parent=this.getLayoutParent();

if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__pi){parent.unblockContent();
parent.setBlockerColor(this.__pj);
parent.setBlockerOpacity(this.__pk);
this.__pj=null;
this.__pk=0;
}}this.__pb.releaseCapture();
var o=this.__pn(e);
this.setLayoutProperties({left:o.parentLeft,top:o.parentTop});
if(this.getUseMoveFrame()){this.__pl().exclude();
}e.stopPropagation();
},__po:function(e){if(!this.hasState(l)){return;
}this.removeState(l);
if(this.getUseMoveFrame()){this.__pl().exclude();
}}},destruct:function(){this._disposeObjects(f,c);
this.__pd=null;
}});
})();
(function(){var p="Integer",o="_applyContentPadding",n="resetPaddingRight",m="setPaddingBottom",l="resetPaddingTop",k="qx.ui.core.MContentPadding",j="resetPaddingLeft",i="setPaddingTop",h="setPaddingRight",g="resetPaddingBottom",c="contentPaddingLeft",f="setPaddingLeft",e="contentPaddingTop",b="shorthand",a="contentPaddingRight",d="contentPaddingBottom";
qx.Mixin.define(k,{properties:{contentPaddingTop:{check:p,init:0,apply:o,themeable:true},contentPaddingRight:{check:p,init:0,apply:o,themeable:true},contentPaddingBottom:{check:p,init:0,apply:o,themeable:true},contentPaddingLeft:{check:p,init:0,apply:o,themeable:true},contentPadding:{group:[e,a,d,c],mode:b,themeable:true}},members:{__mo:{contentPaddingTop:i,contentPaddingRight:h,contentPaddingBottom:m,contentPaddingLeft:f},__mp:{contentPaddingTop:l,contentPaddingRight:n,contentPaddingBottom:g,contentPaddingLeft:j},_applyContentPadding:function(q,r,name){var s=this._getContentPaddingTarget();

if(q==null){var t=this.__mp[name];
s[t]();
}else{var u=this.__mo[name];
s[u](q);
}}}});
})();
(function(){var a="qx.ui.window.IWindowManager";
qx.Interface.define(a,{members:{setDesktop:function(b){this.assertInterface(b,qx.ui.window.IDesktop);
},changeActiveWindow:function(d,e){},updateStack:function(){},bringToFront:function(c){this.assertInstance(c,qx.ui.window.Window);
},sendToBack:function(f){this.assertInstance(f,qx.ui.window.Window);
}}});
})();
(function(){var c="__pp",b="qx.ui.window.Manager";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__pp:null,setDesktop:function(a){this.__pp=a;
this.updateStack();
},getDesktop:function(){return this.__pp;
},changeActiveWindow:function(k,m){if(k){this.updateStack();
this.bringToFront(k);
k.setActive(true);
}
if(m){m.resetActive();
}},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);
},syncWidget:function(){this.__pp.forceUnblockContent();
var d=this.__pp.getWindows();
var f=this._minZIndex;
var j=f+d.length*2;
var g=f+d.length*4;
var h=null;

for(var i=0,l=d.length;i<l;i++){var e=d[i];
if(!e.isVisible()){continue;
}if(h==null){h=e;
}if(e.isModal()){e.setZIndex(g);
this.__pp.blockContent(g-1);
g+=2;
}else if(e.isAlwaysOnTop()){e.setZIndex(j);
j+=2;
}else{e.setZIndex(f);
f+=2;
}if(e.isActive()){h=e;
}else{if(!h.isActive()){if(e.getZIndex()>h.getZIndex()){h=e;
}}}}
if(h){this.__pp.setActiveWindow(h);
}},bringToFront:function(q){var r=this.__pp.getWindows();
var s=qx.lang.Array.remove(r,q);

if(s){r.push(q);
this.updateStack();
}},sendToBack:function(n){var o=this.__pp.getWindows();
var p=qx.lang.Array.remove(o,n);

if(p){o.unshift(n);
this.updateStack();
}}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var H="Boolean",G="qx.event.type.Event",F="captionbar",E="_applyCaptionBarChange",D="maximize-button",C="restore-button",B="minimize-button",A="close-button",z="maximized",y="execute",bo="pane",bn="title",bm="icon",bl="statusbar-text",bk="statusbar",bj="String",bi="normal",bh="active",bg="beforeClose",bf="beforeMinimize",O="mousedown",P="changeStatus",M="changeIcon",N="excluded",K="dblclick",L="_applyActive",I="beforeRestore",J="minimize",Q="changeModal",R="changeAlwaysOnTop",W="_applyShowStatusbar",V="_applyStatus",Y="qx.ui.window.Window",X="changeCaption",bb="focusout",ba="beforeMaximize",T="maximize",be="restore",bd="window",bc="close",S="changeActive",U="minimized";
qx.Class.define(Y,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(s,t){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(F);
this._createChildControl(bo);
if(t!=null){this.setIcon(t);
}
if(s!=null){this.setCaption(s);
}this._updateCaptionBar();
this.addListener(O,this._onWindowMouseDown,this,true);
this.addListener(bb,this._onWindowFocusOut,this);
qx.core.Init.getApplication().getRoot().add(this);
this.initVisibility();
qx.ui.core.FocusHandler.getInstance().addRoot(this);
},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":G,"close":G,"beforeMinimize":G,"minimize":G,"beforeMaximize":G,"maximize":G,"beforeRestore":G,"restore":G},properties:{appearance:{refine:true,init:bd},visibility:{refine:true,init:N},focusable:{refine:true,init:true},active:{check:H,init:false,apply:L,event:S},alwaysOnTop:{check:H,init:false,event:R},modal:{check:H,init:false,event:Q},caption:{apply:E,event:X,nullable:true},icon:{check:bj,nullable:true,apply:E,event:M,themeable:true},status:{check:bj,nullable:true,apply:V,event:P},showClose:{check:H,init:true,apply:E,themeable:true},showMaximize:{check:H,init:true,apply:E,themeable:true},showMinimize:{check:H,init:true,apply:E,themeable:true},allowClose:{check:H,init:true,apply:E},allowMaximize:{check:H,init:true,apply:E},allowMinimize:{check:H,init:true,apply:E},showStatusbar:{check:H,init:false,apply:W}},members:{__pq:null,__pr:null,getChildrenContainer:function(){return this.getChildControl(bo);
},_forwardStates:{active:true,maximized:true},setLayoutParent:function(parent){{};
qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);
},_createChildControlImpl:function(f){var g;

switch(f){case bk:g=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(g);
g.add(this.getChildControl(bl));
break;
case bl:g=new qx.ui.basic.Label();
g.setValue(this.getStatus());
break;
case bo:g=new qx.ui.container.Composite();
this._add(g,{flex:1});
break;
case F:var i=new qx.ui.layout.Grid();
i.setRowFlex(0,1);
i.setColumnFlex(1,1);
g=new qx.ui.container.Composite(i);
this._add(g);
g.addListener(K,this._onCaptionMouseDblClick,this);
this._activateMoveHandle(g);
break;
case bm:g=new qx.ui.basic.Image(this.getIcon());
this.getChildControl(F).add(g,{row:0,column:0});
break;
case bn:g=new qx.ui.basic.Label(this.getCaption());
g.setWidth(0);
g.setAllowGrowX(true);
var h=this.getChildControl(F);
h.add(g,{row:0,column:1});
break;
case B:g=new qx.ui.form.Button();
g.setFocusable(false);
g.addListener(y,this._onMinimizeButtonClick,this);
this.getChildControl(F).add(g,{row:0,column:2});
break;
case C:g=new qx.ui.form.Button();
g.setFocusable(false);
g.addListener(y,this._onRestoreButtonClick,this);
this.getChildControl(F).add(g,{row:0,column:3});
break;
case D:g=new qx.ui.form.Button();
g.setFocusable(false);
g.addListener(y,this._onMaximizeButtonClick,this);
this.getChildControl(F).add(g,{row:0,column:4});
break;
case A:g=new qx.ui.form.Button();
g.setFocusable(false);
g.addListener(y,this._onCloseButtonClick,this);
this.getChildControl(F).add(g,{row:0,column:6});
break;
}return g||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,f);
},_updateCaptionBar:function(){var p;
var q=this.getIcon();

if(q){this.getChildControl(bm).setSource(q);
this._showChildControl(bm);
}else{this._excludeChildControl(bm);
}var o=this.getCaption();

if(o){this.getChildControl(bn).setValue(o);
this._showChildControl(bn);
}else{this._excludeChildControl(bn);
}
if(this.getShowMinimize()){this._showChildControl(B);
p=this.getChildControl(B);
this.getAllowMinimize()?p.resetEnabled():p.setEnabled(false);
}else{this._excludeChildControl(B);
}
if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(C);
this._excludeChildControl(D);
}else{this._showChildControl(D);
this._excludeChildControl(C);
}p=this.getChildControl(D);
this.getAllowMaximize()?p.resetEnabled():p.setEnabled(false);
}else{this._excludeChildControl(D);
this._excludeChildControl(C);
}
if(this.getShowClose()){this._showChildControl(A);
p=this.getChildControl(A);
this.getAllowClose()?p.resetEnabled():p.setEnabled(false);
}else{this._excludeChildControl(A);
}},close:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(bg,qx.event.type.Event,[false,true])){this.hide();
this.fireEvent(bc);
}},open:function(){this.show();
this.setActive(true);
this.focus();
},center:function(){var parent=this.getLayoutParent();

if(parent){var v=parent.getBounds();

if(v){var w=this.getSizeHint();
var u=Math.round((v.width-w.width)/2);
var top=Math.round((v.height-w.height)/2);

if(top<0){top=0;
}this.moveTo(u,top);
return;
}}{};
},maximize:function(){if(this.isMaximized()){return;
}var parent=this.getLayoutParent();

if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(ba,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var x=this.getLayoutProperties();
this.__pr=x.left===undefined?0:x.left;
this.__pq=x.top===undefined?0:x.top;
this.setLayoutProperties({left:null,top:null,edge:0});
this.addState(z);
this._updateCaptionBar();
this.fireEvent(T);
}}},minimize:function(){if(!this.isVisible()){return;
}
if(this.fireNonBubblingEvent(bf,qx.event.type.Event,[false,true])){var bp=this.getLayoutProperties();
this.__pr=bp.left===undefined?0:bp.left;
this.__pq=bp.top===undefined?0:bp.top;
this.removeState(z);
this.hide();
this.fireEvent(J);
}},restore:function(){if(this.getMode()===bi){return;
}
if(this.fireNonBubblingEvent(I,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();
}var c=this.__pr;
var top=this.__pq;
this.setLayoutProperties({edge:null,left:c,top:top});
this.removeState(z);
this._updateCaptionBar();
this.fireEvent(be);
}},moveTo:function(d,top){if(this.isMaximized()){return;
}this.setLayoutProperties({left:d,top:top});
},isMaximized:function(){return this.hasState(z);
},getMode:function(){if(!this.isVisible()){return U;
}else{if(this.isMaximized()){return z;
}else{return bi;
}}},_applyActive:function(bq,br){if(br){this.removeState(bh);
}else{this.addState(bh);
}},_getContentPaddingTarget:function(){return this.getChildControl(bo);
},_applyShowStatusbar:function(m,n){if(m){this._showChildControl(bk);
}else{this._excludeChildControl(bk);
}},_applyCaptionBarChange:function(a,b){this._updateCaptionBar();
},_applyStatus:function(j,k){var l=this.getChildControl(bl,true);

if(l){l.setValue(j);
}},_onWindowEventStop:function(e){e.stopPropagation();
},_onWindowMouseDown:function(e){this.setActive(true);
},_onWindowFocusOut:function(e){if(this.getModal()){return;
}var r=e.getRelatedTarget();

if(r!=null&&!qx.ui.core.Widget.contains(this,r)){this.setActive(false);
}},_onCaptionMouseDblClick:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();
}},_onMinimizeButtonClick:function(e){this.minimize();
this.getChildControl(B).reset();
},_onRestoreButtonClick:function(e){this.restore();
this.getChildControl(C).reset();
},_onMaximizeButtonClick:function(e){this.maximize();
this.getChildControl(D).reset();
},_onCloseButtonClick:function(e){this.close();
this.getChildControl(A).reset();
}}});
})();
(function(){var f="open",e="__ra",d="objectsWindow",c="qx.event.type.Event",b="inspector.objects2.Window",a="__qY";
qx.Class.define(b,{extend:qx.ui.window.Window,construct:function(name,g){qx.ui.window.Window.call(this,name);
this.setLayout(new qx.ui.layout.Canvas());
this.setAppearance(d);
this.syncAppearance();
this.setInitSizeAndPosition();
this.__qY=new inspector.objects2.Model(g);
this.__ra=new inspector.objects2.Controller(this.__qY);
this.add(this.__ra.getView(),{edge:0});
},events:{"open":c},members:{__qY:null,__ra:null,setSizeAndPosition:function(h){this.moveTo(h.left,h.top);
this.setWidth(h.width);
this.setHeight(h.height);
},setInitSizeAndPosition:function(){var j=parseInt(qx.bom.Viewport.getWidth()-this.getWidth());
var i=parseInt((qx.bom.Viewport.getHeight()-30)/3);
this.moveTo(j,30);
this.setHeight(i);
},open:function(){qx.ui.window.Window.prototype.open.call(this);
this.fireEvent(f);
}},destruct:function(){this._disposeObjects(a,e);
}});
})();
(function(){var a="qx.ui.window.IDesktop";
qx.Interface.define(a,{members:{setWindowManager:function(c){this.assertInterface(c,qx.ui.window.IWindowManager);
},getWindows:function(){},supportsMaximize:function(){},blockContent:function(b){this.assertInteger(b);
},unblockContent:function(){},isContentBlocked:function(){}}});
})();
(function(){var dy="left",dx="top",dw="_applyLayoutChange",dv="hAlign",du="flex",dt="vAlign",ds="Integer",dr="minWidth",dq="width",dp="minHeight",dl="qx.ui.layout.Grid",dn="height",dm="maxHeight",dk="maxWidth";
qx.Class.define(dl,{extend:qx.ui.layout.Abstract,construct:function(cc,cd){qx.ui.layout.Abstract.call(this);
this.__mI=[];
this.__mJ=[];

if(cc){this.setSpacingX(cc);
}
if(cd){this.setSpacingY(cd);
}},properties:{spacingX:{check:ds,init:0,apply:dw},spacingY:{check:ds,init:0,apply:dw}},members:{__mK:null,__mI:null,__mJ:null,__mL:null,__mM:null,__mN:null,__mO:null,__mP:null,__mQ:null,verifyLayoutProperty:null,__mR:function(){var V=[];
var U=[];
var W=[];
var S=-1;
var R=-1;
var Y=this._getLayoutChildren();

for(var i=0,l=Y.length;i<l;i++){var T=Y[i];
var X=T.getLayoutProperties();
var ba=X.row;
var Q=X.column;
X.colSpan=X.colSpan||1;
X.rowSpan=X.rowSpan||1;
if(ba==null||Q==null){throw new Error("The layout properties 'row' and 'column' of the child widget '"+T+"' must be defined!");
}
if(V[ba]&&V[ba][Q]){throw new Error("Cannot add widget '"+T+"'!. "+"There is already a widget '"+V[ba][Q]+"' in this cell ("+ba+", "+Q+")");
}
for(var x=Q;x<Q+X.colSpan;x++){for(var y=ba;y<ba+X.rowSpan;y++){if(V[y]==undefined){V[y]=[];
}V[y][x]=T;
R=Math.max(R,x);
S=Math.max(S,y);
}}
if(X.rowSpan>1){W.push(T);
}
if(X.colSpan>1){U.push(T);
}}for(var y=0;y<=S;y++){if(V[y]==undefined){V[y]=[];
}}this.__mK=V;
this.__mL=U;
this.__mM=W;
this.__mN=S;
this.__mO=R;
this.__mP=null;
this.__mQ=null;
delete this._invalidChildrenCache;
},_setRowData:function(bV,bW,bX){var bY=this.__mI[bV];

if(!bY){this.__mI[bV]={};
this.__mI[bV][bW]=bX;
}else{bY[bW]=bX;
}},_setColumnData:function(dI,dJ,dK){var dL=this.__mJ[dI];

if(!dL){this.__mJ[dI]={};
this.__mJ[dI][dJ]=dK;
}else{dL[dJ]=dK;
}},setSpacing:function(cn){this.setSpacingY(cn);
this.setSpacingX(cn);
return this;
},setColumnAlign:function(da,db,dc){{};
this._setColumnData(da,dv,db);
this._setColumnData(da,dt,dc);
this._applyLayoutChange();
return this;
},getColumnAlign:function(cX){var cY=this.__mJ[cX]||{};
return {vAlign:cY.vAlign||dx,hAlign:cY.hAlign||dy};
},setRowAlign:function(g,h,k){{};
this._setRowData(g,dv,h);
this._setRowData(g,dt,k);
this._applyLayoutChange();
return this;
},getRowAlign:function(cK){var cL=this.__mI[cK]||{};
return {vAlign:cL.vAlign||dx,hAlign:cL.hAlign||dy};
},getCellWidget:function(O,P){if(this._invalidChildrenCache){this.__mR();
}var O=this.__mK[O]||{};
return O[P]||null;
},getRowCount:function(){if(this._invalidChildrenCache){this.__mR();
}return this.__mN+1;
},getColumnCount:function(){if(this._invalidChildrenCache){this.__mR();
}return this.__mO+1;
},getCellAlign:function(E,F){var L=dx;
var J=dy;
var K=this.__mI[E];
var H=this.__mJ[F];
var G=this.__mK[E][F];

if(G){var I={vAlign:G.getAlignY(),hAlign:G.getAlignX()};
}else{I={};
}if(I.vAlign){L=I.vAlign;
}else if(K&&K.vAlign){L=K.vAlign;
}else if(H&&H.vAlign){L=H.vAlign;
}if(I.hAlign){J=I.hAlign;
}else if(H&&H.hAlign){J=H.hAlign;
}else if(K&&K.hAlign){J=K.hAlign;
}return {vAlign:L,hAlign:J};
},setColumnFlex:function(dG,dH){this._setColumnData(dG,du,dH);
this._applyLayoutChange();
return this;
},getColumnFlex:function(dE){var dF=this.__mJ[dE]||{};
return dF.flex!==undefined?dF.flex:0;
},setRowFlex:function(a,b){this._setRowData(a,du,b);
this._applyLayoutChange();
return this;
},getRowFlex:function(dz){var dA=this.__mI[dz]||{};
var dB=dA.flex!==undefined?dA.flex:0;
return dB;
},setColumnMaxWidth:function(m,n){this._setColumnData(m,dk,n);
this._applyLayoutChange();
return this;
},getColumnMaxWidth:function(ca){var cb=this.__mJ[ca]||{};
return cb.maxWidth!==undefined?cb.maxWidth:Infinity;
},setColumnWidth:function(di,dj){this._setColumnData(di,dq,dj);
this._applyLayoutChange();
return this;
},getColumnWidth:function(c){var d=this.__mJ[c]||{};
return d.width!==undefined?d.width:null;
},setColumnMinWidth:function(bI,bJ){this._setColumnData(bI,dr,bJ);
this._applyLayoutChange();
return this;
},getColumnMinWidth:function(M){var N=this.__mJ[M]||{};
return N.minWidth||0;
},setRowMaxHeight:function(ce,cf){this._setRowData(ce,dm,cf);
this._applyLayoutChange();
return this;
},getRowMaxHeight:function(co){var cp=this.__mI[co]||{};
return cp.maxHeight||Infinity;
},setRowHeight:function(cx,cy){this._setRowData(cx,dn,cy);
this._applyLayoutChange();
return this;
},getRowHeight:function(dC){var dD=this.__mI[dC]||{};
return dD.height!==undefined?dD.height:null;
},setRowMinHeight:function(e,f){this._setRowData(e,dp,f);
this._applyLayoutChange();
return this;
},getRowMinHeight:function(bb){var bc=this.__mI[bb]||{};
return bc.minHeight||0;
},__mS:function(dd){var dh=dd.getSizeHint();
var dg=dd.getMarginLeft()+dd.getMarginRight();
var df=dd.getMarginTop()+dd.getMarginBottom();
var de={height:dh.height+df,width:dh.width+dg,minHeight:dh.minHeight+df,minWidth:dh.minWidth+dg,maxHeight:dh.maxHeight+df,maxWidth:dh.maxWidth+dg};
return de;
},_fixHeightsRowSpan:function(dM){var dX=this.getSpacingY();

for(var i=0,l=this.__mM.length;i<l;i++){var dP=this.__mM[i];
var dR=this.__mS(dP);
var dS=dP.getLayoutProperties();
var dO=dS.row;
var dV=dX*(dS.rowSpan-1);
var dN=dV;
var dU={};

for(var j=0;j<dS.rowSpan;j++){var ea=dS.row+j;
var dQ=dM[ea];
var dY=this.getRowFlex(ea);

if(dY>0){dU[ea]={min:dQ.minHeight,value:dQ.height,max:dQ.maxHeight,flex:dY};
}dV+=dQ.height;
dN+=dQ.minHeight;
}if(dV<dR.height){var dW=qx.ui.layout.Util.computeFlexOffsets(dU,dR.height,dV);

for(var j=0;j<dS.rowSpan;j++){var dT=dW[dO+j]?dW[dO+j].offset:0;
dM[dO+j].height+=dT;
}}if(dN<dR.minHeight){var dW=qx.ui.layout.Util.computeFlexOffsets(dU,dR.minHeight,dN);

for(var j=0;j<dS.rowSpan;j++){var dT=dW[dO+j]?dW[dO+j].offset:0;
dM[dO+j].minHeight+=dT;
}}}},_fixWidthsColSpan:function(o){var s=this.getSpacingX();

for(var i=0,l=this.__mL.length;i<l;i++){var p=this.__mL[i];
var r=this.__mS(p);
var u=p.getLayoutProperties();
var q=u.column;
var C=s*(u.colSpan-1);
var t=C;
var v={};
var z;

for(var j=0;j<u.colSpan;j++){var D=u.column+j;
var B=o[D];
var A=this.getColumnFlex(D);
if(A>0){v[D]={min:B.minWidth,value:B.width,max:B.maxWidth,flex:A};
}C+=B.width;
t+=B.minWidth;
}if(C<r.width){var w=qx.ui.layout.Util.computeFlexOffsets(v,r.width,C);

for(var j=0;j<u.colSpan;j++){z=w[q+j]?w[q+j].offset:0;
o[q+j].width+=z;
}}if(t<r.minWidth){var w=qx.ui.layout.Util.computeFlexOffsets(v,r.minWidth,t);

for(var j=0;j<u.colSpan;j++){z=w[q+j]?w[q+j].offset:0;
o[q+j].minWidth+=z;
}}}},_getRowHeights:function(){if(this.__mP!=null){return this.__mP;
}var cV=[];
var cO=this.__mN;
var cN=this.__mO;

for(var cW=0;cW<=cO;cW++){var cP=0;
var cR=0;
var cQ=0;

for(var cU=0;cU<=cN;cU++){var cM=this.__mK[cW][cU];

if(!cM){continue;
}var cS=cM.getLayoutProperties().rowSpan||0;

if(cS>1){continue;
}var cT=this.__mS(cM);

if(this.getRowFlex(cW)>0){cP=Math.max(cP,cT.minHeight);
}else{cP=Math.max(cP,cT.height);
}cR=Math.max(cR,cT.height);
}var cP=Math.max(cP,this.getRowMinHeight(cW));
var cQ=this.getRowMaxHeight(cW);

if(this.getRowHeight(cW)!==null){var cR=this.getRowHeight(cW);
}else{var cR=Math.max(cP,Math.min(cR,cQ));
}cV[cW]={minHeight:cP,height:cR,maxHeight:cQ};
}
if(this.__mM.length>0){this._fixHeightsRowSpan(cV);
}this.__mP=cV;
return cV;
},_getColWidths:function(){if(this.__mQ!=null){return this.__mQ;
}var cD=[];
var cA=this.__mO;
var cC=this.__mN;

for(var cI=0;cI<=cA;cI++){var cG=0;
var cF=0;
var cB=Infinity;

for(var cJ=0;cJ<=cC;cJ++){var cz=this.__mK[cJ][cI];

if(!cz){continue;
}var cE=cz.getLayoutProperties().colSpan||0;

if(cE>1){continue;
}var cH=this.__mS(cz);

if(this.getColumnFlex(cI)>0){cF=Math.max(cF,cH.minWidth);
}else{cF=Math.max(cF,cH.width);
}cG=Math.max(cG,cH.width);
}var cF=Math.max(cF,this.getColumnMinWidth(cI));
var cB=this.getColumnMaxWidth(cI);

if(this.getColumnWidth(cI)!==null){var cG=this.getColumnWidth(cI);
}else{var cG=Math.max(cF,Math.min(cG,cB));
}cD[cI]={minWidth:cF,width:cG,maxWidth:cB};
}
if(this.__mL.length>0){this._fixWidthsColSpan(cD);
}this.__mQ=cD;
return cD;
},_getColumnFlexOffsets:function(cq){var cr=this.getSizeHint();
var cv=cq-cr.width;

if(cv==0){return {};
}var ct=this._getColWidths();
var cs={};

for(var i=0,l=ct.length;i<l;i++){var cw=ct[i];
var cu=this.getColumnFlex(i);

if((cu<=0)||(cw.width==cw.maxWidth&&cv>0)||(cw.width==cw.minWidth&&cv<0)){continue;
}cs[i]={min:cw.minWidth,value:cw.width,max:cw.maxWidth,flex:cu};
}return qx.ui.layout.Util.computeFlexOffsets(cs,cq,cr.width);
},_getRowFlexOffsets:function(cg){var ch=this.getSizeHint();
var ck=cg-ch.height;

if(ck==0){return {};
}var cl=this._getRowHeights();
var ci={};

for(var i=0,l=cl.length;i<l;i++){var cm=cl[i];
var cj=this.getRowFlex(i);

if((cj<=0)||(cm.height==cm.maxHeight&&ck>0)||(cm.height==cm.minHeight&&ck<0)){continue;
}ci[i]={min:cm.minHeight,value:cm.height,max:cm.maxHeight,flex:cj};
}return qx.ui.layout.Util.computeFlexOffsets(ci,cg,ch.height);
},renderLayout:function(bd,be){if(this._invalidChildrenCache){this.__mR();
}var bs=qx.ui.layout.Util;
var bg=this.getSpacingX();
var bm=this.getSpacingY();
var bx=this._getColWidths();
var bw=this._getColumnFlexOffsets(bd);
var bh=[];
var bz=this.__mO;
var bf=this.__mN;
var by;

for(var bA=0;bA<=bz;bA++){by=bw[bA]?bw[bA].offset:0;
bh[bA]=bx[bA].width+by;
}var bp=this._getRowHeights();
var br=this._getRowFlexOffsets(be);
var bG=[];

for(var bn=0;bn<=bf;bn++){by=br[bn]?br[bn].offset:0;
bG[bn]=bp[bn].height+by;
}var bH=0;

for(var bA=0;bA<=bz;bA++){var top=0;

for(var bn=0;bn<=bf;bn++){var bu=this.__mK[bn][bA];
if(!bu){top+=bG[bn]+bm;
continue;
}var bi=bu.getLayoutProperties();
if(bi.row!==bn||bi.column!==bA){top+=bG[bn]+bm;
continue;
}var bF=bg*(bi.colSpan-1);

for(var i=0;i<bi.colSpan;i++){bF+=bh[bA+i];
}var bv=bm*(bi.rowSpan-1);

for(var i=0;i<bi.rowSpan;i++){bv+=bG[bn+i];
}var bj=bu.getSizeHint();
var bD=bu.getMarginTop();
var bt=bu.getMarginLeft();
var bq=bu.getMarginBottom();
var bl=bu.getMarginRight();
var bo=Math.max(bj.minWidth,Math.min(bF-bt-bl,bj.maxWidth));
var bE=Math.max(bj.minHeight,Math.min(bv-bD-bq,bj.maxHeight));
var bB=this.getCellAlign(bn,bA);
var bC=bH+bs.computeHorizontalAlignOffset(bB.hAlign,bo,bF,bt,bl);
var bk=top+bs.computeVerticalAlignOffset(bB.vAlign,bE,bv,bD,bq);
bu.renderLayout(bC,bk,bo,bE);
top+=bG[bn]+bm;
}bH+=bh[bA]+bg;
}},invalidateLayoutCache:function(){qx.ui.layout.Abstract.prototype.invalidateLayoutCache.call(this);
this.__mQ=null;
this.__mP=null;
},_computeSizeHint:function(){if(this._invalidChildrenCache){this.__mR();
}var bO=this._getColWidths();
var bQ=0,bR=0;

for(var i=0,l=bO.length;i<l;i++){var bS=bO[i];

if(this.getColumnFlex(i)>0){bQ+=bS.minWidth;
}else{bQ+=bS.width;
}bR+=bS.width;
}var bT=this._getRowHeights();
var bM=0,bP=0;

for(var i=0,l=bT.length;i<l;i++){var bU=bT[i];

if(this.getRowFlex(i)>0){bM+=bU.minHeight;
}else{bM+=bU.height;
}bP+=bU.height;
}var bL=this.getSpacingX()*(bO.length-1);
var bK=this.getSpacingY()*(bT.length-1);
var bN={minWidth:bQ+bL,width:bR+bL,minHeight:bM+bK,height:bP+bK};
return bN;
}},destruct:function(){this.__mK=this.__mI=this.__mJ=this.__mL=this.__mM=this.__mQ=this.__mP=null;
}});
})();
(function(){var e="changeObjects",d="changeInspected",c="qx.event.type.Event",b="inspector.objects2.Model",a="qx.event.type.Data";
qx.Class.define(b,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);
this.__rb=i;
i.addListener(e,this.__rc,this);
i.addListener(d,this.__rd,this);
},events:{"changeObjects":c,"changeInspected":a},members:{__rb:null,getObjects:function(){return this.__rb.getObjects();
},getObjectFromHashCode:function(f){var g=this.__rb.getObjectRegistry();
return g.fromHashCode(f);
},getInspected:function(){return this.__rb.getInspected();
},setInspected:function(h){this.__rb.setInspected(h);
},__rc:function(event){this.fireEvent(e);
},__rd:function(event){this.fireDataEvent(d,event.getData(),event.getOldData());
}},destruct:function(){this.__rb.removeListener(e,this.__rc,this);
this.__rb.removeListener(d,this.__rd,this);
this.__rb=null;
}});
})();
(function(){var g="changeInspected",f="changeObjects",e="inspector.objects2.Controller",d="",c="appear";
qx.Class.define(e,{extend:qx.core.Object,construct:function(h){qx.core.Object.call(this);
{};
this.__re=h;
this.__re.addListener(g,this.__rn,this);
this.__re.addListener(f,this.__ro,this);
this.__rf=new inspector.objects2.View(this);
this.__rg=qx.util.TimerManager.getInstance();
this.__rf.addListenerOnce(c,function(event){this.__rf.selectObject(this.__re.getInspected());
},this);
this.__rl();
},members:{__rf:null,__re:null,__rh:null,__ri:null,__rg:null,__rj:null,__rk:false,getView:function(){return this.__rf;
},reload:function(){this.__rk=true;
this.__rq().reload();
this.__rp().reload();
this.__rk=false;
this.__rf.selectObject(this.__re.getInspected());
},showByHash:function(){this.__rf.setByHashActive(true);
this.__rf.setByCountActive(false);
this.__rf.setTableModel(this.__rp());
this.__rf.setTableSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
this.__rf.selectObject(this.__re.getInspected());
},showByCount:function(){this.__rf.setByHashActive(false);
this.__rf.setByCountActive(true);
this.__rf.setTableModel(this.__rq());
this.__rf.setTableSelectionMode(qx.ui.table.selection.Model.NO_SELECTION);
this.__rf.selectObject(null);
},setFilter:function(j){this.__rk=true;
this.__rm();
this.__rj=this.__rg.start(function(){this.__rj=null;
this.__rq().filter(j);
this.__rp().filter(j);
this.__rk=false;
this.__rf.selectObject(this.__re.getInspected());
},0,this,null,200);
},inspect:function(a){if(a==null){this.__rf.selectObject(this.__re.getInspected());
return;
}var b=this.__re.getObjectFromHashCode(a);

if(b!=null&&!this.__rk){this.__re.setInspected(b);
}},__rl:function(){this.__rf.setFilter(d);
this.showByHash();
},__rm:function(){if(this.__rj!=null){this.__rg.stop(this.__rj);
this.__rj=null;
}},__rn:function(event){var i=event.getData();
this.__rf.selectObject(i);
},__ro:function(event){this.reload();
},__rp:function(){if(this.__rh==null){this.__rh=new inspector.objects2.table.HashModel(this.__re);
}return this.__rh;
},__rq:function(){if(this.__ri==null){this.__ri=new inspector.objects2.table.CountModel(this.__re);
}return this.__ri;
}},destruct:function(){this.__rm();

if(this.__rh!=null){this.__rh.dispose();
}
if(this.__ri){this.__ri.dispose();
}this.__rf.destroy();
this.__rf=this.__re=this.__rh=this.__rj;
this.__ri=this.__rg=this.__rk=null;
}});
})();
(function(){var k="execute",j="show",h="count",g="hash",f="Show the objects by there hash value.",e="by Count",d="Reloads the view.",c="changeValue",b="objects2-textfield",a="Filter...",A="Select a item to inspect it or sort the table.",z="20%",y="by Hash",x="objects2-toolbar",w="Enter a case sensitive value to filter the table.",v="Show the objects by there count.",u="__rt",t="changeSelection",s="middle",r="",p="icon/22/actions/view-refresh.png",q="__rs",n="__ru",o="inspector.objects2.View",l="objects2-table",m="80%";
qx.Class.define(o,{extend:qx.ui.container.Composite,construct:function(S){qx.ui.container.Composite.call(this);
{};
this.__rr=S;
this.__rw();
},members:{__rs:null,__rt:null,__ru:null,__rv:null,__rr:null,setByHashActive:function(Q){{};
this.__rs.setValue(Q);
},setByCountActive:function(P){{};
this.__rt.setValue(P);
},setTableModel:function(K){{};
this.__ru.setTableModel(K);
this.__rx();
},setTableSelectionMode:function(L){{};
this.__ru.getSelectionModel().setSelectionMode(L);
},selectObject:function(B){var D=this.__ru.getSelectionModel();
D.resetSelection();

if(B!=null&&D.getSelectionMode()!=qx.ui.table.selection.Model.NO_SELECTION){var C=this.__ru.getTableModel().getData();

for(var i=0;i<C.length;i++){if(C[i][0]==B.toHashCode()){D.setSelectionInterval(i,i);
this.__ru.scrollCellVisible(0,i);
return;
}}}else{this.__ru.scrollCellVisible(0,0);
}},setFilter:function(R){this.__rv.setValue(R);
},__rw:function(){this.setLayout(new qx.ui.layout.VBox());
var toolbar=new qx.ui.toolbar.ToolBar();
toolbar.setAppearance(x);
toolbar._getLayout().setAlignY(s);
this.add(toolbar);
var N=new qx.ui.toolbar.Button(null,p);
N.setToolTipText(d);
N.addListener(k,this._onReaload,this);
toolbar.add(N);
toolbar.addSeparator();
this.__rs=new qx.ui.toolbar.RadioButton(y);
this.__rs.setUserData(j,g);
this.__rs.addListener(k,this._onShowByChanged,this);
this.__rs.setToolTipText(f);
toolbar.add(this.__rs);
this.__rt=new qx.ui.toolbar.RadioButton(e);
this.__rt.setUserData(j,h);
this.__rt.addListener(k,this._onShowByChanged,this);
this.__rt.setToolTipText(v);
toolbar.add(this.__rt);
toolbar.addSpacer();
this.__rv=new qx.ui.form.TextField().set({appearance:b,liveUpdate:true,placeholder:a,toolTipText:w});
this.__rv.addListener(c,this._onFilterChanged,this);
toolbar.add(this.__rv);
var O={tableColumnModel:function(E){return new qx.ui.table.columnmodel.Resize(E);
}};
this.__ru=new qx.ui.table.Table(null,O).set({appearance:l,columnVisibilityButtonVisible:false,toolTipText:A});
this.__ru.getSelectionModel().addListener(t,this._onModelChangeSelection,this);
this.__ru.getDataRowRenderer().setHighlightFocusRow(false);
this.add(this.__ru,{flex:1});
},_onReaload:function(event){this.__rr.reload();
},_onShowByChanged:function(event){var I=event.getTarget();
var J=I?I.getUserData(j):r;

switch(J){case g:this.__rr.showByHash();
break;
case h:this.__rr.showByCount();
break;
default:this.error("Method: '"+J+"' doesn't exist.");
break;
}},_onFilterChanged:function(event){this.__rr.setFilter(event.getData());
},_onModelChangeSelection:function(event){var H=this.__ru.getSelectionModel();

if(H.isSelectionEmpty()){this.__rr.inspect(null);
return;
}var F=H.getSelectedRanges()[0].minIndex;
var G=this.__ru.getTableModel().getData()[F];
this.__rr.inspect(G[0]);
},__rx:function(){var M=this.__ru.getTableColumnModel().getBehavior();
M.setWidth(0,z);
M.setMinWidth(0,50);
M.setMaxWidth(0,100);
M.setWidth(1,m);
M.setMinWidth(1,300);
}},destruct:function(){this.__rr=null;
this._disposeObjects(q,u,n);
}});
})();
(function(){var l="..",k="changeSelection",h="_applySelectionMode",g="]",f="qx.event.type.Event",d="Ranges:",c="qx.ui.table.selection.Model",b=" [";
qx.Class.define(c,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__ry=[];
this.__rz=-1;
this.__rA=-1;
this.hasBatchModeRefCount=0;
this.__rB=false;
},events:{"changeSelection":f},statics:{NO_SELECTION:1,SINGLE_SELECTION:2,SINGLE_INTERVAL_SELECTION:3,MULTIPLE_INTERVAL_SELECTION:4,MULTIPLE_INTERVAL_SELECTION_TOGGLE:5},properties:{selectionMode:{init:2,check:[1,2,3,4,5],apply:h}},members:{__rB:null,__rz:null,__rA:null,__ry:null,_applySelectionMode:function(D){this.resetSelection();
},setBatchMode:function(a){if(a){this.hasBatchModeRefCount+=1;
}else{if(this.hasBatchModeRefCount==0){throw new Error("Try to turn off batch mode althoug it was not turned on.");
}this.hasBatchModeRefCount-=1;

if(this.__rB){this.__rB=false;
this._fireChangeSelection();
}}return this.hasBatchMode();
},hasBatchMode:function(){return this.hasBatchModeRefCount>0;
},getAnchorSelectionIndex:function(){return this.__rz;
},_setAnchorSelectionIndex:function(S){this.__rz=S;
},getLeadSelectionIndex:function(){return this.__rA;
},_setLeadSelectionIndex:function(K){this.__rA=K;
},_getSelectedRangeArr:function(){return this.__ry;
},resetSelection:function(){if(!this.isSelectionEmpty()){this._resetSelection();
this._fireChangeSelection();
}},isSelectionEmpty:function(){return this.__ry.length==0;
},getSelectedCount:function(){var p=0;

for(var i=0;i<this.__ry.length;i++){var o=this.__ry[i];
p+=o.maxIndex-o.minIndex+1;
}return p;
},isSelectedIndex:function(m){for(var i=0;i<this.__ry.length;i++){var n=this.__ry[i];

if(m>=n.minIndex&&m<=n.maxIndex){return true;
}}return false;
},getSelectedRanges:function(){var J=[];

for(var i=0;i<this.__ry.length;i++){J.push({minIndex:this.__ry[i].minIndex,maxIndex:this.__ry[i].maxIndex});
}return J;
},iterateSelection:function(H,I){for(var i=0;i<this.__ry.length;i++){for(var j=this.__ry[i].minIndex;j<=this.__ry[i].maxIndex;j++){H.call(I,j);
}}},setSelectionInterval:function(E,F){var G=this.self(arguments);

switch(this.getSelectionMode()){case G.NO_SELECTION:return;
case G.SINGLE_SELECTION:if(this.isSelectedIndex(F)){return;
}E=F;
break;
case G.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this.setBatchMode(true);

try{for(var i=E;i<=F;i++){if(!this.isSelectedIndex(i)){this._addSelectionInterval(i,i);
}else{this.removeSelectionInterval(i,i);
}}}catch(e){throw e;
}finally{this.setBatchMode(false);
}this._fireChangeSelection();
return;
}this._resetSelection();
this._addSelectionInterval(E,F);
this._fireChangeSelection();
},addSelectionInterval:function(q,r){var s=qx.ui.table.selection.Model;

switch(this.getSelectionMode()){case s.NO_SELECTION:return;
case s.MULTIPLE_INTERVAL_SELECTION:case s.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this._addSelectionInterval(q,r);
this._fireChangeSelection();
break;
default:this.setSelectionInterval(q,r);
break;
}},removeSelectionInterval:function(t,u){this.__rz=t;
this.__rA=u;
var v=Math.min(t,u);
var x=Math.max(t,u);
for(var i=0;i<this.__ry.length;i++){var z=this.__ry[i];

if(z.minIndex>x){break;
}else if(z.maxIndex>=v){var A=(z.minIndex>=v)&&(z.minIndex<=x);
var y=(z.maxIndex>=v)&&(z.maxIndex<=x);

if(A&&y){this.__ry.splice(i,1);
i--;
}else if(A){z.minIndex=x+1;
}else if(y){z.maxIndex=v-1;
}else{var w={minIndex:x+1,maxIndex:z.maxIndex};
this.__ry.splice(i+1,0,w);
z.maxIndex=v-1;
break;
}}}this._fireChangeSelection();
},_resetSelection:function(){this.__ry=[];
this.__rz=-1;
this.__rA=-1;
},_addSelectionInterval:function(L,M){this.__rz=L;
this.__rA=M;
var N=Math.min(L,M);
var P=Math.max(L,M);
var O=0;

for(;O<this.__ry.length;O++){var Q=this.__ry[O];

if(Q.minIndex>N){break;
}}this.__ry.splice(O,0,{minIndex:N,maxIndex:P});
var R=this.__ry[0];

for(var i=1;i<this.__ry.length;i++){var Q=this.__ry[i];

if(R.maxIndex+1>=Q.minIndex){R.maxIndex=Math.max(R.maxIndex,Q.maxIndex);
this.__ry.splice(i,1);
i--;
}else{R=Q;
}}},_dumpRanges:function(){var B=d;

for(var i=0;i<this.__ry.length;i++){var C=this.__ry[i];
B+=b+C.minIndex+l+C.maxIndex+g;
}this.debug(B);
},_fireChangeSelection:function(){if(this.hasBatchMode()){this.__rB=true;
}else{this.fireEvent(k);
}}},destruct:function(){this.__ry=null;
}});
})();
(function(){var e="inherit",d="toolbar-button",c="keydown",b="qx.ui.toolbar.Button",a="keyup";
qx.Class.define(b,{extend:qx.ui.form.Button,construct:function(f,g,h){qx.ui.form.Button.call(this,f,g,h);
this.removeListener(c,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var b="qx.ui.form.IBooleanForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var s="pressed",r="abandoned",q="hovered",p="checked",o="Space",n="Enter",m="mouseup",l="mousedown",k="Boolean",j="_applyValue",c="mouseover",i="mouseout",g="qx.ui.form.ToggleButton",b="keydown",a="changeValue",f="button",d="keyup",h="execute";
qx.Class.define(g,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IBooleanForm,qx.ui.form.IExecutable],construct:function(t,u){qx.ui.basic.Atom.call(this,t,u);
this.addListener(c,this._onMouseOver);
this.addListener(i,this._onMouseOut);
this.addListener(l,this._onMouseDown);
this.addListener(m,this._onMouseUp);
this.addListener(b,this._onKeyDown);
this.addListener(d,this._onKeyUp);
this.addListener(h,this._onExecute,this);
},properties:{appearance:{refine:true,init:f},focusable:{refine:true,init:true},value:{check:k,nullable:true,event:a,apply:j,init:false}},members:{_applyValue:function(v,w){v?this.addState(p):this.removeState(p);
},_onExecute:function(e){this.toggleValue();
},_onMouseOver:function(e){if(e.getTarget()!==this){return;
}this.addState(q);

if(this.hasState(r)){this.removeState(r);
this.addState(s);
}},_onMouseOut:function(e){if(e.getTarget()!==this){return;
}this.removeState(q);

if(this.hasState(s)){if(!this.getValue()){this.removeState(s);
}this.addState(r);
}},_onMouseDown:function(e){if(!e.isLeftPressed()){return;
}this.capture();
this.removeState(r);
this.addState(s);
e.stopPropagation();
},_onMouseUp:function(e){this.releaseCapture();

if(this.hasState(r)){this.removeState(r);
}else if(this.hasState(s)){this.execute();
}this.removeState(s);
e.stopPropagation();
},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case n:case o:this.removeState(r);
this.addState(s);
e.stopPropagation();
}},_onKeyUp:function(e){if(!this.hasState(s)){return;
}
switch(e.getKeyIdentifier()){case n:case o:this.removeState(r);
this.execute();
this.removeState(s);
e.stopPropagation();
}}}});
})();
(function(){var e="inherit",d="toolbar-button",c="qx.ui.toolbar.CheckBox",b="keydown",a="keyup";
qx.Class.define(c,{extend:qx.ui.form.ToggleButton,construct:function(f,g){qx.ui.form.ToggleButton.call(this,f,g);
this.removeListener(b,this._onKeyDown);
this.removeListener(a,this._onKeyUp);
},properties:{appearance:{refine:true,init:d},show:{refine:true,init:e},focusable:{refine:true,init:false}}});
})();
(function(){var b="changeModel",a="qx.ui.form.MModelProperty";
qx.Mixin.define(a,{properties:{model:{nullable:true,event:b}}});
})();
(function(){var b="qx.ui.form.IModel",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeModel":a},members:{setModel:function(c){},getModel:function(){},resetModel:function(){}}});
})();
(function(){var b="qx.ui.form.IRadioItem",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(d){},getValue:function(){},setGroup:function(c){this.assertInstance(c,qx.ui.form.RadioGroup);
},getGroup:function(){}}});
})();
(function(){var c="qx.ui.form.RadioGroup",b="_applyGroup",a="qx.ui.toolbar.RadioButton";
qx.Class.define(a,{extend:qx.ui.toolbar.CheckBox,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel,qx.ui.form.IRadioItem],properties:{group:{check:c,apply:b,nullable:true}},members:{_applyValue:function(d,e){qx.ui.toolbar.CheckBox.prototype._applyValue.call(this,d,e);

if(d){var f=this.getGroup();

if(f){f.setSelection([this]);
}}},_applyGroup:function(g,h){if(h){h.remove(this);
}
if(g){g.add(this);
}}}});
})();
(function(){var b="qx.ui.core.ISingleSelection",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeSelection":a},members:{getSelection:function(){return true;
},setSelection:function(e){return arguments.length==1;
},resetSelection:function(){return true;
},isSelected:function(c){return arguments.length==1;
},isSelectionEmpty:function(){return true;
},getSelectables:function(d){return arguments.length==1;
}}});
})();
(function(){var a="qx.ui.form.IModelSelection";
qx.Interface.define(a,{members:{setModelSelection:function(b){},getModelSelection:function(){}}});
})();
(function(){var f="qx.ui.core.MSingleSelectionHandling",d="changeSelection",c="changeSelected",b="__lN",a="qx.event.type.Data";
qx.Mixin.define(f,{events:{"changeSelection":a},members:{__lN:null,getSelection:function(){var m=this.__lO().getSelected();

if(m){return [m];
}else{return [];
}},setSelection:function(n){switch(n.length){case 0:this.resetSelection();
break;
case 1:this.__lO().setSelected(n[0]);
break;
default:throw new Error("Could only select one item, but the selection "+" array contains "+n.length+" items!");
}},resetSelection:function(){this.__lO().resetSelected();
},isSelected:function(g){return this.__lO().isSelected(g);
},isSelectionEmpty:function(){return this.__lO().isSelectionEmpty();
},getSelectables:function(l){return this.__lO().getSelectables(l);
},_onChangeSelected:function(e){var k=e.getData();
var j=e.getOldData();
k==null?k=[]:k=[k];
j==null?j=[]:j=[j];
this.fireDataEvent(d,k,j);
},__lO:function(){if(this.__lN==null){var i=this;
this.__lN=new qx.ui.core.SingleSelectionManager({getItems:function(){return i._getItems();
},isItemSelectable:function(h){if(i._isItemSelectable){return i._isItemSelectable(h);
}else{return h.isVisible();
}}});
this.__lN.addListener(c,this._onChangeSelected,this);
}this.__lN.setAllowEmptySelection(this._isAllowEmptySelection());
return this.__lN;
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var e="change",d="qx.event.type.Data",c="__lP",b="qx.ui.form.MModelSelection",a="changeSelection";
qx.Mixin.define(b,{construct:function(){this.__lP=new qx.data.Array();
this.__lP.addListener(e,this.__lS,this);
this.addListener(a,this.__lR,this);
},events:{changeModelSelection:d},members:{__lP:null,__lQ:false,__lR:function(){if(this.__lQ){return;
}var s=this.getSelection();
var q=[];

for(var i=0;i<s.length;i++){var t=s[i];
var r=t.getModel?t.getModel():null;

if(r!==null){q.push(r);
}}if(q.length===s.length){this.setModelSelection(q);
}},__lS:function(){this.__lQ=true;
var g=this.getSelectables(true);
var k=[];
var h=this.__lP.toArray();

for(var i=0;i<h.length;i++){var m=h[i];

for(var j=0;j<g.length;j++){var n=g[j];
var f=n.getModel?n.getModel():null;

if(m===f){k.push(n);
break;
}}}this.setSelection(k);
this.__lQ=false;
var l=this.getSelection();

if(!qx.lang.Array.equals(l,k)){this.__lR();
}},getModelSelection:function(){return this.__lP;
},setModelSelection:function(o){if(!o){this.__lP.removeAll();
return;
}{};
o.unshift(this.__lP.getLength());
o.unshift(0);
var p=this.__lP.splice.apply(this.__lP,o);
p.dispose();
}},destruct:function(){this._disposeObjects(c);
}});
})();
(function(){var u="Boolean",t="changeInvalidMessage",s="changeValue",r="String",q="_applyAllowEmptySelection",p="_applyInvalidMessage",o="qx.ui.form.RadioGroup",n="_applyValid",m="",k="changeRequired",g="changeValid",j="changeEnabled",h="__lT",f="changeSelection",d="_applyEnabled";
qx.Class.define(o,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(C){qx.core.Object.call(this);
this.__lT=[];
this.addListener(f,this.__lU,this);

if(C!=null){this.add.apply(this,arguments);
}},properties:{enabled:{check:u,apply:d,event:j,init:true},wrap:{check:u,init:true},allowEmptySelection:{check:u,init:false,apply:q},valid:{check:u,init:true,apply:n,event:g},required:{check:u,init:false,event:k},invalidMessage:{check:r,init:m,event:t,apply:p},requiredInvalidMessage:{check:r,nullable:true,event:t}},members:{__lT:null,getItems:function(){return this.__lT;
},add:function(L){var M=this.__lT;
var N;

for(var i=0,l=arguments.length;i<l;i++){N=arguments[i];

if(qx.lang.Array.contains(M,N)){continue;
}N.addListener(s,this._onItemChangeChecked,this);
M.push(N);
N.setGroup(this);
if(N.getValue()){this.setSelection([N]);
}}if(!this.isAllowEmptySelection()&&M.length>0&&!this.getSelection()[0]){this.setSelection([M[0]]);
}},remove:function(x){var y=this.__lT;

if(qx.lang.Array.contains(y,x)){qx.lang.Array.remove(y,x);
if(x.getGroup()===this){x.resetGroup();
}x.removeListener(s,this._onItemChangeChecked,this);
if(x.getValue()){this.resetSelection();
}}},getChildren:function(){return this.__lT;
},_onItemChangeChecked:function(e){var K=e.getTarget();

if(K.getValue()){this.setSelection([K]);
}else if(this.getSelection()[0]==K){this.resetSelection();
}},_applyInvalidMessage:function(v,w){for(var i=0;i<this.__lT.length;i++){this.__lT[i].setInvalidMessage(v);
}},_applyValid:function(O,P){for(var i=0;i<this.__lT.length;i++){this.__lT[i].setValid(O);
}},_applyEnabled:function(H,I){var J=this.__lT;

if(H==null){for(var i=0,l=J.length;i<l;i++){J[i].resetEnabled();
}}else{for(var i=0,l=J.length;i<l;i++){J[i].setEnabled(H);
}}},_applyAllowEmptySelection:function(D,E){if(!D&&this.isSelectionEmpty()){this.resetSelection();
}},selectNext:function(){var z=this.getSelection()[0];
var B=this.__lT;
var A=B.indexOf(z);

if(A==-1){return;
}var i=0;
var length=B.length;
if(this.getWrap()){A=(A+1)%length;
}else{A=Math.min(A+1,length-1);
}
while(i<length&&!B[A].getEnabled()){A=(A+1)%length;
i++;
}this.setSelection([B[A]]);
},selectPrevious:function(){var a=this.getSelection()[0];
var c=this.__lT;
var b=c.indexOf(a);

if(b==-1){return;
}var i=0;
var length=c.length;
if(this.getWrap()){b=(b-1+length)%length;
}else{b=Math.max(b-1,0);
}
while(i<length&&!c[b].getEnabled()){b=(b-1+length)%length;
i++;
}this.setSelection([c[b]]);
},_getItems:function(){return this.getItems();
},_isAllowEmptySelection:function(){return this.isAllowEmptySelection();
},__lU:function(e){var G=e.getData()[0];
var F=e.getOldData()[0];

if(F){F.setValue(false);
}
if(G){G.setValue(true);
}}},destruct:function(){this._disposeArray(h);
}});
})();
(function(){var h="Boolean",g="qx.ui.core.SingleSelectionManager",f="__lW",e="__lV",d="changeSelected",c="__lX",b="qx.event.type.Data";
qx.Class.define(g,{extend:qx.core.Object,construct:function(a){qx.core.Object.call(this);
{};
this.__lV=a;
},events:{"changeSelected":b},properties:{allowEmptySelection:{check:h,init:true,apply:c}},members:{__lW:null,__lV:null,getSelected:function(){return this.__lW;
},setSelected:function(s){if(!this.__ma(s)){throw new Error("Could not select "+s+", because it is not a child element!");
}this.__lY(s);
},resetSelected:function(){this.__lY(null);
},isSelected:function(v){if(!this.__ma(v)){throw new Error("Could not check if "+v+" is selected,"+" because it is not a child element!");
}return this.__lW===v;
},isSelectionEmpty:function(){return this.__lW==null;
},getSelectables:function(l){var m=this.__lV.getItems();
var n=[];

for(var i=0;i<m.length;i++){if(this.__lV.isItemSelectable(m[i])){n.push(m[i]);
}}if(!l){for(var i=n.length-1;i>=0;i--){if(!n[i].getEnabled()){n.splice(i,1);
}}}return n;
},__lX:function(j,k){if(!j){this.__lY(this.__lW);
}},__lY:function(o){var r=this.__lW;
var q=o;

if(q!=null&&r===q){return;
}
if(!this.isAllowEmptySelection()&&q==null){var p=this.getSelectables(true)[0];

if(p){q=p;
}}this.__lW=q;
this.fireDataEvent(d,q,r);
},__ma:function(t){var u=this.__lV.getItems();

for(var i=0;i<u.length;i++){if(u[i]===t){return true;
}}return false;
}},destruct:function(){if(this.__lV.toHashCode){this._disposeObjects(e);
}else{this.__lV=null;
}this._disposeObjects(f);
}});
})();
(function(){var h="[",g="]",f=".",d="idBubble",c="changeBubble",b="qx.data.marshal.MEventBubbling",a="qx.event.type.Data";
qx.Mixin.define(b,{events:{"changeBubble":a},members:{_applyEventPropagation:function(i,j,name){this.fireDataEvent(c,{value:i,name:name,old:j});
this._registerEventChaining(i,j,name);
},_registerEventChaining:function(k,l,name){if((k instanceof qx.core.Object)&&qx.Class.hasMixin(k.constructor,qx.data.marshal.MEventBubbling)){var m=qx.lang.Function.bind(this.__mb,this,name);
var n=k.addListener(c,m,this);
k.setUserData(d,n);
}if(l!=null&&l.getUserData&&l.getUserData(d)!=null){l.removeListenerById(l.getUserData(d));
}},__mb:function(name,e){var v=e.getData();
var r=v.value;
var p=v.old;
if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(v.name.indexOf){var u=v.name.indexOf(f)!=-1?v.name.indexOf(f):v.name.length;
var s=v.name.indexOf(h)!=-1?v.name.indexOf(h):v.name.length;

if(u<s){var o=v.name.substring(0,u);
var t=v.name.substring(u+1,v.name.length);

if(t[0]!=h){t=f+t;
}var q=name+h+o+g+t;
}else if(s<u){var o=v.name.substring(0,s);
var t=v.name.substring(s,v.name.length);
var q=name+h+o+g+t;
}else{var q=name+h+v.name+g;
}}else{var q=name+h+v.name+g;
}}else{var q=name+f+v.name;
}this.fireDataEvent(c,{value:r,name:q,old:p});
}}});
})();
(function(){var I="change",H="add",G="remove",F="order",E="qx.event.type.Data",D="",C="qx.data.Array",B="?",A="changeBubble",z="number",y="changeLength";
qx.Class.define(C,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(a){qx.core.Object.call(this);
if(a==undefined){this.__mc=[];
}else if(arguments.length>1){this.__mc=[];

for(var i=0;i<arguments.length;i++){this.__mc.push(arguments[i]);
}}else if(typeof a==z){this.__mc=new Array(a);
}else if(a instanceof Array){this.__mc=qx.lang.Array.clone(a);
}else{this.__mc=[];
throw new Error("Type of the parameter not supported!");
}for(var i=0;i<this.__mc.length;i++){this._applyEventPropagation(this.__mc[i],null,i);
}this.__md();
},events:{"change":E,"changeLength":E},members:{__mc:null,concat:function(bb){if(bb){var bc=this.__mc.concat(bb);
}else{var bc=this.__mc.concat();
}return new qx.data.Array(bc);
},join:function(bh){return this.__mc.join(bh);
},pop:function(){var bg=this.__mc.pop();
this.__md();
this._applyEventPropagation(null,bg,this.length-1);
this.fireDataEvent(I,{start:this.length-1,end:this.length-1,type:G,items:[bg]},null);
return bg;
},push:function(bd){for(var i=0;i<arguments.length;i++){this.__mc.push(arguments[i]);
this.__md();
this._applyEventPropagation(arguments[i],null,this.length-1);
this.fireDataEvent(I,{start:this.length-1,end:this.length-1,type:H,items:[arguments[i]]},null);
}return this.length;
},reverse:function(){this.__mc.reverse();
this.fireDataEvent(I,{start:0,end:this.length-1,type:F,items:null},null);
},shift:function(){var bi=this.__mc.shift();
this.__md();
this._applyEventPropagation(null,bi,this.length-1);
this.fireDataEvent(I,{start:0,end:this.length-1,type:G,items:[bi]},null);
return bi;
},slice:function(X,Y){return new qx.data.Array(this.__mc.slice(X,Y));
},splice:function(d,e,f){var m=this.__mc.length;
var j=this.__mc.splice.apply(this.__mc,arguments);
if(this.__mc.length!=m){this.__md();
}var k=e>0;
var g=arguments.length>2;
var h=null;

if(k||g){if(this.__mc.length>m){var l=H;
}else if(this.__mc.length<m){var l=G;
h=j;
}else{var l=F;
}this.fireDataEvent(I,{start:d,end:this.length-1,type:l,items:h},null);
}for(var i=2;i<arguments.length;i++){this._registerEventChaining(arguments[i],null,d+i);
}this.fireDataEvent(A,{value:this,name:B,old:j});
for(var i=0;i<j.length;i++){this._applyEventPropagation(null,j[i],i);
}return (new qx.data.Array(j));
},sort:function(U){this.__mc.sort.apply(this.__mc,arguments);
this.fireDataEvent(I,{start:0,end:this.length-1,type:F,items:null},null);
},unshift:function(N){for(var i=arguments.length-1;i>=0;i--){this.__mc.unshift(arguments[i]);
this.__md();
this._applyEventPropagation(arguments[i],null,0);
this.fireDataEvent(I,{start:0,end:this.length-1,type:H,items:[arguments[i]]},null);
}return this.length;
},toArray:function(){return this.__mc;
},getItem:function(K){return this.__mc[K];
},setItem:function(r,s){var t=this.__mc[r];
this.__mc[r]=s;
this._applyEventPropagation(s,t,r);
if(this.length!=this.__mc.length){this.__md();
}this.fireDataEvent(I,{start:r,end:r,type:H,items:[s]},null);
},getLength:function(){return this.length;
},indexOf:function(J){return this.__mc.indexOf(J);
},toString:function(){if(this.__mc!=null){return this.__mc.toString();
}return D;
},contains:function(n){return this.__mc.indexOf(n)!==-1;
},copy:function(){return this.concat();
},insertAt:function(b,c){this.splice(b,0,c);
},insertBefore:function(O,P){var Q=this.indexOf(O);

if(Q==-1){this.push(P);
}else{this.splice(Q,0,P);
}},insertAfter:function(o,p){var q=this.indexOf(o);

if(q==-1||q==(this.length-1)){this.push(p);
}else{this.splice(q+1,0,p);
}},removeAt:function(ba){return this.splice(ba,1)[0];
},removeAll:function(){for(var i=0;i<this.__mc.length;i++){this._applyEventPropagation(null,this.__mc[i],i);
}var x=this.getLength();
var w=this.__mc.concat();
this.__mc.length=0;
this.__md();
this.fireDataEvent(I,{start:0,end:x-1,type:G,items:w},null);
},append:function(L){if(L instanceof qx.data.Array){L=L.toArray();
}{};
for(var i=0;i<L.length;i++){this._applyEventPropagation(L[i],null,this.__mc.length+i);
}Array.prototype.push.apply(this.__mc,L);
var M=this.length;
this.__md();
this.fireDataEvent(I,{start:M,end:this.length-1,type:H,items:L},null);
},remove:function(u){var v=this.indexOf(u);

if(v!=-1){this.splice(v,1);
return u;
}},equals:function(be){if(this.length!==be.length){return false;
}
for(var i=0;i<this.length;i++){if(this.getItem(i)!==be.getItem(i)){return false;
}}return true;
},sum:function(){var R=0;

for(var i=0;i<this.length;i++){R+=this.getItem(i);
}return R;
},max:function(){var bf=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)>bf){bf=this.getItem(i);
}}return bf===undefined?null:bf;
},min:function(){var S=this.getItem(0);

for(var i=1;i<this.length;i++){if(this.getItem(i)<S){S=this.getItem(i);
}}return S===undefined?null:S;
},forEach:function(V,W){for(var i=0;i<this.__mc.length;i++){V.call(W,this.__mc[i]);
}},__md:function(){var T=this.length;
this.length=this.__mc.length;
this.fireDataEvent(y,this.length,T);
}},destruct:function(){for(var i=0;i<this.__mc.length;i++){this._applyEventPropagation(null,this.__mc[i],i);
}this.__mc=null;
}});
})();
(function(){var i="Boolean",h="changeInvalidMessage",g="String",f="invalid",e="qx.ui.form.MForm",d="_applyValid",c="",b="changeRequired",a="changeValid";
qx.Mixin.define(e,{properties:{valid:{check:i,init:true,apply:d,event:a},required:{check:i,init:false,event:b},invalidMessage:{check:g,init:c,event:h},requiredInvalidMessage:{check:g,nullable:true,event:h}},members:{_applyValid:function(j,k){j?this.removeState(f):this.addState(f);
}}});
})();
(function(){var w="showingPlaceholder",v="color",u="",t="none",s="qx.dynlocale",r="Boolean",q="qx.client",p="qx.event.type.Data",o="readonly",n="input",bl="focusin",bk="visibility",bj="focusout",bi="changeLocale",bh="hidden",bg="on",bf="absolute",be="readOnly",bd="text",bc="_applyTextAlign",D="px",E="RegExp",B=")",C="syncAppearance",z="changeValue",A="A",x="change",y="textAlign",H="focused",I="center",P="visible",N="disabled",T="url(",R="off",X="String",V="resize",K="qx.ui.form.AbstractField",bb="transparent",ba="spellcheck",Y="false",J="right",L="PositiveInteger",M="mshtml",O="abstract",Q="block",S="webkit",U="_applyReadOnly",W="_applyPlaceholder",F="left",G="qx/static/blank.gif";
qx.Class.define(K,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:O,construct:function(bM){qx.ui.core.Widget.call(this);

if(bM!=null){this.setValue(bM);
}this.getContentElement().addListener(x,this._onChangeContent,this);
this.addListener(C,this._syncPlaceholder,this);
if(qx.core.Variant.isSet(s,bg)){qx.locale.Manager.getInstance().addListener(bi,this._onChangeLocale,this);
}},events:{"input":p,"changeValue":p},properties:{textAlign:{check:[F,I,J],nullable:true,themeable:true,apply:bc},readOnly:{check:r,apply:U,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{check:L,init:Infinity},liveUpdate:{check:r,init:false},placeholder:{check:X,nullable:true,apply:W},filter:{check:E,nullable:true,init:null}},members:{__nd:true,__ne:null,__nf:null,__ng:null,getFocusElement:function(){var bA=this.getContentElement();

if(bA){return bA;
}},_createInputElement:function(){return new qx.html.Input(bd);
},renderLayout:function(bB,top,bC,bD){var bE=this._updateInsets;
var bI=qx.ui.core.Widget.prototype.renderLayout.call(this,bB,top,bC,bD);
if(!bI){return;
}var bG=bI.size||bE;
var bJ=D;

if(bG||bI.local||bI.margin){var bF=this.getInsets();
var innerWidth=bC-bF.left-bF.right;
var innerHeight=bD-bF.top-bF.bottom;
innerWidth=innerWidth<0?0:innerWidth;
innerHeight=innerHeight<0?0:innerHeight;
}var bH=this.getContentElement();

if(bE){this.__nj().setStyles({"left":bF.left+bJ,"top":bF.top+bJ});
}
if(bG){this.__nj().setStyles({"width":innerWidth+bJ,"height":innerHeight+bJ});
bH.setStyles({"width":innerWidth+bJ,"height":innerHeight+bJ});
}},_createContentElement:function(){var bz=this._createInputElement();
bz.setStyles({"border":t,"padding":0,"margin":0,"display":Q,"background":bb,"outline":t,"appearance":t,"position":bf,"autoComplete":R});
bz.setSelectable(this.getSelectable());
bz.setEnabled(this.getEnabled());
bz.addListener(n,this._onHtmlInput,this);
bz.setAttribute(ba,Y);
if(qx.core.Variant.isSet(q,S)){bz.setStyle(V,t);
}if(qx.core.Variant.isSet(q,M)){bz.setStyles({backgroundImage:T+qx.util.ResourceManager.getInstance().toUri(G)+B});
}return bz;
},_applyEnabled:function(bp,bq){qx.ui.core.Widget.prototype._applyEnabled.call(this,bp,bq);
this.getContentElement().setEnabled(bp);

if(bp){this._showPlaceholder();
}else{this._removePlaceholder();
}},__nh:{width:16,height:16},_getContentHint:function(){return {width:this.__nh.width*10,height:this.__nh.height||16};
},_applyFont:function(bv,bw){var bx;

if(bv){var by=qx.theme.manager.Font.getInstance().resolve(bv);
bx=by.getStyles();
}else{bx=qx.bom.Font.getDefaultStyles();
}this.getContentElement().setStyles(bx);
this.__nj().setStyles(bx);
if(bv){this.__nh=qx.bom.Label.getTextSize(A,bx);
}else{delete this.__nh;
}qx.ui.core.queue.Layout.add(this);
},_applyTextColor:function(i,j){if(i){this.getContentElement().setStyle(v,qx.theme.manager.Color.getInstance().resolve(i));
this.__nj().setStyle(v,qx.theme.manager.Color.getInstance().resolve(i));
}else{this.getContentElement().removeStyle(v);
this.__nj().removeStyle(v);
}},tabFocus:function(){qx.ui.core.Widget.prototype.tabFocus.call(this);
this.selectAllText();
},_getTextSize:function(){return this.__nh;
},_onHtmlInput:function(e){var g=e.getData();
var f=true;
this.__nd=false;
if(this.getFilter()!=null){var h=u;
var c=g.search(this.getFilter());
var d=g;

while(c>=0){h=h+(d.charAt(c));
d=d.substring(c+1,d.length);
c=d.search(this.getFilter());
}
if(h!=g){f=false;
g=h;
this.getContentElement().setValue(g);
}}if(g.length>this.getMaxLength()){var f=false;
this.getContentElement().setValue(g.substr(0,this.getMaxLength()));
}if(f){this.fireDataEvent(n,g,this.__ng);
this.__ng=g;
if(this.getLiveUpdate()){this.__ni(g);
}}},__ni:function(bm){if(this.__nf!=bm){this.fireNonBubblingEvent(z,qx.event.type.Data,[bm,this.__nf]);
this.__nf=bm;
}},setValue:function(br){if(br===null){if(this.__nd){return br;
}br=u;
this.__nd=true;
}else{this.__nd=false;
this._removePlaceholder();
}
if(qx.lang.Type.isString(br)){var bt=this.getContentElement();

if(br.length>this.getMaxLength()){br=br.substr(0,this.getMaxLength());
}
if(bt.getValue()!=br){var bu=bt.getValue();
bt.setValue(br);
var bs=this.__nd?null:br;
this.__nf=bu;
this.__ni(bs);
}this._showPlaceholder();
return br;
}throw new Error("Invalid value type: "+br);
},getValue:function(){var k=this.getContentElement().getValue();
return this.__nd?null:k;
},resetValue:function(){this.setValue(null);
},_onChangeContent:function(e){this.__nd=e.getData()===null;
this.__ni(e.getData());
},getTextSelection:function(){return this.getContentElement().getTextSelection();
},getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();
},getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();
},getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();
},setTextSelection:function(bn,bo){this.getContentElement().setTextSelection(bn,bo);
},clearTextSelection:function(){this.getContentElement().clearTextSelection();
},selectAllText:function(){this.setTextSelection(0);
},_showPlaceholder:function(){var b=this.getValue()||u;
var a=this.getPlaceholder();

if(a!=null&&b==u&&!this.hasState(H)&&!this.hasState(N)){if(this.hasState(w)){this._syncPlaceholder();
}else{this.addState(w);
}}},_removePlaceholder:function(){if(this.hasState(w)){this.__nj().setStyle(bk,bh);
this.removeState(w);
}},_syncPlaceholder:function(){if(this.hasState(w)){this.__nj().setStyle(bk,P);
}},__nj:function(){if(this.__ne==null){this.__ne=new qx.html.Label();
this.__ne.setStyles({"visibility":bh,"zIndex":6,"position":bf});
this.getContainerElement().add(this.__ne);
}return this.__ne;
},_onChangeLocale:qx.core.Variant.select(s,{"on":function(e){var content=this.getPlaceholder();

if(content&&content.translate){this.setPlaceholder(content.translate());
}},"off":null}),_applyPlaceholder:function(bK,bL){this.__nj().setValue(bK);

if(bK!=null){this.addListener(bl,this._removePlaceholder,this);
this.addListener(bj,this._showPlaceholder,this);
this._showPlaceholder();
}else{this.removeListener(bl,this._removePlaceholder,this);
this.removeListener(bj,this._showPlaceholder,this);
this._removePlaceholder();
}},_applyTextAlign:function(l,m){this.getContentElement().setStyle(y,l);
},_applyReadOnly:function(bN,bO){var bP=this.getContentElement();
bP.setAttribute(be,bN);

if(bN){this.addState(o);
this.setFocusable(false);
}else{this.removeState(o);
this.setFocusable(true);
}}},destruct:function(){this.__ne=null;

if(qx.core.Variant.isSet(s,bg)){qx.locale.Manager.getInstance().removeListener(bi,this._onChangeLocale,this);
}}});
})();
(function(){var b="qx.ui.form.TextField",a="textfield";
qx.Class.define(b,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:a},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var p="none",o="wrap",n="value",m="qx.client",l="textarea",k="off",j="on",i="qxSelectable",h="",g="webkit",c="input",f="qx.html.Input",e="select",b="disabled",a="read-only",d="userSelect";
qx.Class.define(f,{extend:qx.html.Element,construct:function(q,r,s){if(q===e||q===l){var t=q;
}else{t=c;
}qx.html.Element.call(this,t,r,s);
this.__nk=q;
},members:{__nk:null,__nl:null,__nm:null,_createDomElement:function(){return qx.bom.Input.create(this.__nk);
},_applyProperty:function(name,w){qx.html.Element.prototype._applyProperty.call(this,name,w);
var x=this.getDomElement();

if(name===n){qx.bom.Input.setValue(x,w);
}else if(name===o){qx.bom.Input.setWrap(x,w);
}},setEnabled:qx.core.Variant.select(m,{"webkit":function(A){this.__nm=A;

if(!A){this.setStyles({"userModify":a,"userSelect":p});
}else{this.setStyles({"userModify":null,"userSelect":this.__nl?null:p});
}},"default":function(E){this.setAttribute(b,E===false);
}}),setSelectable:qx.core.Variant.select(m,{"webkit":function(u){this.__nl=u;
this.setAttribute(i,u?j:k);
if(qx.core.Variant.isSet(m,g)){var v=this.__nm?u?null:p:p;
this.setStyle(d,v);
}},"default":function(y){this.setAttribute(i,y?j:k);
}}),setValue:function(C){var D=this.getDomElement();

if(D){if(D.value!=C){qx.bom.Input.setValue(D,C);
}}else{this._setProperty(n,C);
}return this;
},getValue:function(){var z=this.getDomElement();

if(z){return qx.bom.Input.getValue(z);
}return this._getProperty(n)||h;
},setWrap:function(B){if(this.__nk===l){this._setProperty(o,B);
}else{throw new Error("Text wrapping is only support by textareas!");
}return this;
},getWrap:function(){if(this.__nk===l){return this._getProperty(o);
}else{throw new Error("Text wrapping is only support by textareas!");
}}}});
})();
(function(){var bd="change",bc="input",bb="qx.client",ba="text",Y="password",X="checkbox",W="radio",V="textarea",U="keypress",T="opera",N="propertychange",S="blur",Q="keydown",M="keyup",L="select-multiple",P="checked",O="value",R="select",K="qx.event.handler.Input";
qx.Class.define(K,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);
this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);
this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);
this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);
this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);
if(qx.core.Variant.isSet(bb,T)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);
this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);
this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);
}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__nn:false,__no:null,__np:null,canHandleEvent:function(H,I){var J=H.tagName.toLowerCase();

if(I===bc&&(J===bc||J===V)){return true;
}
if(I===bd&&(J===bc||J===V||J===R)){return true;
}return false;
},registerEvent:qx.core.Variant.select(bb,{"mshtml":function(n,p,q){if(!n.__nq){var r=n.tagName.toLowerCase();
var s=n.type;

if(s===ba||s===Y||r===V||s===X||s===W){qx.bom.Event.addNativeListener(n,N,this._onPropertyWrapper);
}
if(s!==X&&s!==W){qx.bom.Event.addNativeListener(n,bd,this._onChangeValueWrapper);
}
if(s===ba||s===Y){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,n);
qx.bom.Event.addNativeListener(n,U,this._onKeyPressWrapped);
}n.__nq=true;
}},"default":function(w,x,y){if(x===bc){this.__nr(w);
}else if(x===bd){if(w.type===W||w.type===X){qx.bom.Event.addNativeListener(w,bd,this._onChangeCheckedWrapper);
}else{qx.bom.Event.addNativeListener(w,bd,this._onChangeValueWrapper);
}if(qx.core.Variant.isSet(bb,T)){if(w.type===ba||w.type===Y){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,w);
qx.bom.Event.addNativeListener(w,U,this._onKeyPressWrapped);
}}}}}),__nr:qx.core.Variant.select(bb,{"mshtml":null,"webkit":function(D){var E=D.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&E==V){qx.bom.Event.addNativeListener(D,U,this._onInputWrapper);
}qx.bom.Event.addNativeListener(D,bc,this._onInputWrapper);
},"opera":function(bf){qx.bom.Event.addNativeListener(bf,M,this._onKeyUpWrapper);
qx.bom.Event.addNativeListener(bf,Q,this._onKeyDownWrapper);
qx.bom.Event.addNativeListener(bf,S,this._onBlurWrapper);
qx.bom.Event.addNativeListener(bf,bc,this._onInputWrapper);
},"default":function(g){qx.bom.Event.addNativeListener(g,bc,this._onInputWrapper);
}}),unregisterEvent:qx.core.Variant.select(bb,{"mshtml":function(z,A){if(z.__nq){var B=z.tagName.toLowerCase();
var C=z.type;

if(C===ba||C===Y||B===V||C===X||C===W){qx.bom.Event.removeNativeListener(z,N,this._onPropertyWrapper);
}
if(C!==X&&C!==W){qx.bom.Event.removeNativeListener(z,bd,this._onChangeValueWrapper);
}
if(C===ba||C===Y){qx.bom.Event.removeNativeListener(z,U,this._onKeyPressWrapped);
}
try{delete z.__nq;
}catch(c){z.__nq=null;
}}},"default":function(F,G){if(G===bc){this.__nr(F);
}else if(G===bd){if(F.type===W||F.type===X){qx.bom.Event.removeNativeListener(F,bd,this._onChangeCheckedWrapper);
}else{qx.bom.Event.removeNativeListener(F,bd,this._onChangeValueWrapper);
}}
if(qx.core.Variant.isSet(bb,T)){if(F.type===ba||F.type===Y){qx.bom.Event.removeNativeListener(F,U,this._onKeyPressWrapped);
}}}}),__ns:qx.core.Variant.select(bb,{"mshtml":null,"webkit":function(u){var v=u.tagName.toLowerCase();
if(qx.bom.client.Engine.VERSION<532&&v==V){qx.bom.Event.removeNativeListener(u,U,this._onInputWrapper);
}qx.bom.Event.removeNativeListener(u,bc,this._onInputWrapper);
},"opera":function(f){qx.bom.Event.removeNativeListener(f,M,this._onKeyUpWrapper);
qx.bom.Event.removeNativeListener(f,Q,this._onKeyDownWrapper);
qx.bom.Event.removeNativeListener(f,S,this._onBlurWrapper);
qx.bom.Event.removeNativeListener(f,bc,this._onInputWrapper);
},"default":function(be){qx.bom.Event.removeNativeListener(be,bc,this._onInputWrapper);
}}),_onKeyPress:qx.core.Variant.select(bb,{"mshtml|opera":function(e,a){if(e.keyCode===13){if(a.value!==this.__np){this.__np=a.value;
qx.event.Registration.fireEvent(a,bd,qx.event.type.Data,[a.value]);
}}},"default":null}),_onKeyDown:qx.core.Variant.select(bb,{"opera":function(e){if(e.keyCode===13){this.__nn=true;
}},"default":null}),_onKeyUp:qx.core.Variant.select(bb,{"opera":function(e){if(e.keyCode===13){this.__nn=false;
}},"default":null}),_onBlur:qx.core.Variant.select(bb,{"opera":function(e){if(this.__no){window.clearTimeout(this.__no);
}},"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var d=e.target;
if(!this.__nn){if(qx.core.Variant.isSet(bb,T)){this.__no=window.setTimeout(function(){qx.event.Registration.fireEvent(d,bc,qx.event.type.Data,[d.value]);
},0);
}else{qx.event.Registration.fireEvent(d,bc,qx.event.type.Data,[d.value]);
}}}),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var j=e.target||e.srcElement;
var h=j.value;

if(j.type===L){var h=[];

for(var i=0,o=j.options,l=o.length;i<l;i++){if(o[i].selected){h.push(o[i].value);
}}}qx.event.Registration.fireEvent(j,bd,qx.event.type.Data,[h]);
}),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var b=e.target;

if(b.type===W){if(b.checked){qx.event.Registration.fireEvent(b,bd,qx.event.type.Data,[b.value]);
}}else{qx.event.Registration.fireEvent(b,bd,qx.event.type.Data,[b.checked]);
}}),_onProperty:qx.core.Variant.select(bb,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var k=e.target||e.srcElement;
var m=e.propertyName;

if(m===O&&(k.type===ba||k.type===Y||k.tagName.toLowerCase()===V)){if(!k.$$inValueSet){qx.event.Registration.fireEvent(k,bc,qx.event.type.Data,[k.value]);
}}else if(m===P){if(k.type===X){qx.event.Registration.fireEvent(k,bd,qx.event.type.Data,[k.checked]);
}else if(k.checked){qx.event.Registration.fireEvent(k,bd,qx.event.type.Data,[k.value]);
}}}),"default":function(){}})},defer:function(t){qx.event.Registration.addHandler(t);
}});
})();
(function(){var v="",u="select",t="soft",s="off",r="qx.client",q="wrap",p="text",o="mshtml",n="number",m="checkbox",d="select-one",k="input",g="option",c="value",b="radio",f="qx.bom.Input",e="nowrap",h="textarea",a="auto",j="normal";
qx.Class.define(f,{statics:{__nt:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(H,I,J){{};
var I=I?qx.lang.Object.clone(I):{};
var K;

if(H===h||H===u){K=H;
}else{K=k;
I.type=H;
}return qx.bom.Element.create(K,I,J);
},setValue:function(w,x){var C=w.nodeName.toLowerCase();
var z=w.type;
var Array=qx.lang.Array;
var D=qx.lang.Type;

if(typeof x===n){x+=v;
}
if((z===m||z===b)){if(D.isArray(x)){w.checked=Array.contains(x,w.value);
}else{w.checked=w.value==x;
}}else if(C===u){var y=D.isArray(x);
var E=w.options;
var A,B;

for(var i=0,l=E.length;i<l;i++){A=E[i];
B=A.getAttribute(c);

if(B==null){B=A.text;
}A.selected=y?Array.contains(x,B):x==B;
}
if(y&&x.length==0){w.selectedIndex=-1;
}}else if(z===p&&qx.core.Variant.isSet(r,o)){w.$$inValueSet=true;
w.value=x;
w.$$inValueSet=null;
}else{w.value=x;
}},getValue:function(N){var T=N.nodeName.toLowerCase();

if(T===g){return (N.attributes.value||{}).specified?N.value:N.text;
}
if(T===u){var O=N.selectedIndex;
if(O<0){return null;
}var U=[];
var W=N.options;
var V=N.type==d;
var S=qx.bom.Input;
var R;
for(var i=V?O:0,Q=V?O+1:W.length;i<Q;i++){var P=W[i];

if(P.selected){R=S.getValue(P);
if(V){return R;
}U.push(R);
}}return U;
}else{return (N.value||v).replace(/\r/g,v);
}},setWrap:qx.core.Variant.select(r,{"mshtml":function(L,M){L.wrap=M?t:s;
},"gecko|webkit":function(X,Y){var bb=Y?t:s;
var ba=Y?v:a;
X.setAttribute(q,bb);
X.style.overflow=ba;
},"default":function(F,G){F.style.whiteSpace=G?j:e;
}})}});
})();
(function(){var a="qx.ui.table.IHeaderRenderer";
qx.Interface.define(a,{members:{createHeaderCell:function(d){return true;
},updateHeaderCell:function(b,c){return true;
}}});
})();
(function(){var b="qx.ui.table.headerrenderer.Default",a="String";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.table.IHeaderRenderer,statics:{STATE_SORTED:"sorted",STATE_SORTED_ASCENDING:"sortedAscending"},properties:{toolTip:{check:a,init:null,nullable:true}},members:{createHeaderCell:function(c){var d=new qx.ui.table.headerrenderer.HeaderCell();
this.updateHeaderCell(c,d);
return d;
},updateHeaderCell:function(e,f){var g=qx.ui.table.headerrenderer.Default;
if(e.name&&e.name.translate){f.setLabel(e.name.translate());
}else{f.setLabel(e.name);
}var h=f.getToolTip();

if(this.getToolTip()!=null){if(h==null){h=new qx.ui.tooltip.ToolTip(this.getToolTip());
f.setToolTip(h);
qx.util.DisposeUtil.disposeTriggeredBy(h,f);
}else{h.setLabel(this.getToolTip());
}}e.sorted?f.addState(g.STATE_SORTED):f.removeState(g.STATE_SORTED);
e.sortedAscending?f.addState(g.STATE_SORTED_ASCENDING):f.removeState(g.STATE_SORTED_ASCENDING);
}}});
})();
(function(){var a="qx.ui.table.ICellRenderer";
qx.Interface.define(a,{members:{createDataCellHtml:function(b,c){return true;
}}});
})();
(function(){var m="",l="px;",k=".qooxdoo-table-cell {",j="qooxdoo-table-cell",i='" ',h="nowrap",g="default",f="qx.client",e="}",d="width:",K=".qooxdoo-table-cell-right { text-align:right } ",J="0px 6px",I='<div class="',H="0px",G="height:",F="1px solid ",E=".qooxdoo-table-cell-bold { font-weight:bold } ",D="table-row-line",C="String",B='>',t="mshtml",u='</div>',r="ellipsis",s="content-box",p='left:',q="qx.ui.table.cellrenderer.Abstract",n='" style="',o="abstract",v="none",w="hidden",y="} ",x='px;',A=".qooxdoo-table-cell-italic { font-style:italic} ",z="absolute";
qx.Class.define(q,{type:o,implement:qx.ui.table.ICellRenderer,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
var a=qx.ui.table.cellrenderer.Abstract;

if(!a.__rC){var c=qx.theme.manager.Color.getInstance();
a.__rC=this.self(arguments);
var b=k+
qx.bom.element.Style.compile({position:z,top:H,overflow:w,whiteSpace:h,borderRight:F+c.resolve(D),padding:J,cursor:g,textOverflow:r,userSelect:v})+y+K+A+E;

if(!qx.core.Variant.isSet(f,t)){b+=k+qx.bom.element.BoxSizing.compile(s)+e;
}a.__rC.stylesheet=qx.bom.Stylesheet.createElement(b);
}},properties:{defaultCellStyle:{init:null,check:C,nullable:true}},members:{_insetX:6+6+1,_insetY:0,_getCellClass:function(O){return j;
},_getCellStyle:function(N){return N.style||m;
},_getCellAttributes:function(Q){return m;
},_getContentHtml:function(P){return P.value||m;
},_getCellSizeStyle:function(R,S,T,U){var V=m;

if(qx.bom.client.Feature.CONTENT_BOX){R-=T;
S-=U;
}V+=d+Math.max(R,0)+l;
V+=G+Math.max(S,0)+l;
return V;
},createDataCellHtml:function(L,M){M.push(I,this._getCellClass(L),n,p,L.styleLeft,x,this._getCellSizeStyle(L.styleWidth,L.styleHeight,this._insetX,this._insetY),this._getCellStyle(L),i,this._getCellAttributes(L),B+this._getContentHtml(L),u);
}}});
})();
(function(){var h="",g="number",f="Boolean",e="qx.ui.table.cellrenderer.Default",d=" qooxdoo-table-cell-bold",c=" qooxdoo-table-cell-right",b=" qooxdoo-table-cell-italic",a="string";
qx.Class.define(e,{extend:qx.ui.table.cellrenderer.Abstract,statics:{STYLEFLAG_ALIGN_RIGHT:1,STYLEFLAG_BOLD:2,STYLEFLAG_ITALIC:4,_numberFormat:null},properties:{useAutoAlign:{check:f,init:true}},members:{_getStyleFlags:function(l){if(this.getUseAutoAlign()){if(typeof l.value==g){return qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT;
}}return 0;
},_getCellClass:function(n){var o=qx.ui.table.cellrenderer.Abstract.prototype._getCellClass.call(this,n);

if(!o){return h;
}var p=this._getStyleFlags(n);

if(p&qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT){o+=c;
}
if(p&qx.ui.table.cellrenderer.Default.STYLEFLAG_BOLD){o+=d;
}
if(p&qx.ui.table.cellrenderer.Default.STYLEFLAG_ITALIC){o+=b;
}return o;
},_getContentHtml:function(m){return qx.bom.String.escape(this._formatValue(m));
},_formatValue:function(i){var k=i.value;
var j;

if(k==null){return h;
}
if(typeof k==a){return k;
}else if(typeof k==g){if(!qx.ui.table.cellrenderer.Default._numberFormat){qx.ui.table.cellrenderer.Default._numberFormat=new qx.util.format.NumberFormat();
qx.ui.table.cellrenderer.Default._numberFormat.setMaximumFractionDigits(2);
}var j=qx.ui.table.cellrenderer.Default._numberFormat.format(k);
}else if(k instanceof Date){j=qx.util.format.DateFormat.getDateInstance().format(k);
}else{j=k;
}return j;
}}});
})();
(function(){var a="qx.ui.table.ICellEditorFactory";
qx.Interface.define(a,{members:{createCellEditor:function(b){return true;
},getCellEditorValue:function(c){return true;
}}});
})();
(function(){var f="",e="Function",d="abstract",c="number",b="appear",a="qx.ui.table.celleditor.AbstractField";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.ui.table.ICellEditorFactory,type:d,properties:{validationFunction:{check:e,nullable:true,init:null}},members:{_createEditor:function(){throw new Error("Abstract method call!");
},createCellEditor:function(j){var k=this._createEditor();
k.originalValue=j.value;

if(j.value===null||j.value===undefined){j.value=f;
}k.setValue(f+j.value);
k.addListener(b,function(){k.selectAllText();
});
return k;
},getCellEditorValue:function(g){var i=g.getValue();
var h=this.getValidationFunction();

if(h){i=h(i,g.originalValue);
}
if(typeof g.originalValue==c){i=parseFloat(i);
}return i;
}}});
})();
(function(){var c="number",b="qx.ui.table.celleditor.TextField",a="table-editor-textfield";
qx.Class.define(b,{extend:qx.ui.table.celleditor.AbstractField,members:{getCellEditorValue:function(e){var g=e.getValue();
var f=this.getValidationFunction();

if(f){g=f(g,e.originalValue);
}
if(typeof e.originalValue==c){if(g!=null){g=parseFloat(g);
}}return g;
},_createEditor:function(){var d=new qx.ui.form.TextField();
d.setAppearance(a);
return d;
}}});
})();
(function(){var T="qx.event.type.Data",S="visibilityChanged",R="orderChanged",Q="visibilityChangedPre",P="__rJ",O="__rK",N="widthChanged",M="qx.ui.table.columnmodel.Basic",L="__rI";
qx.Class.define(M,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__rD=[];
this.__rE=[];
},events:{"widthChanged":T,"visibilityChangedPre":T,"visibilityChanged":T,"orderChanged":T},statics:{DEFAULT_WIDTH:100,DEFAULT_HEADER_RENDERER:qx.ui.table.headerrenderer.Default,DEFAULT_DATA_RENDERER:qx.ui.table.cellrenderer.Default,DEFAULT_EDITOR_FACTORY:qx.ui.table.celleditor.TextField},members:{__rF:null,__rG:null,__rE:null,__rD:null,__rH:null,__rI:null,__rJ:null,__rK:null,init:function(U){{};
this.__rH=[];
var X=qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
var Y=this.__rI||(this.__rI=new qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER());
var W=this.__rJ||(this.__rJ=new qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER());
var V=this.__rK||(this.__rK=new qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY());
this.__rD=[];
this.__rE=[];

for(var bb=0;bb<U;bb++){this.__rH[bb]={width:X,headerRenderer:Y,dataRenderer:W,editorFactory:V};
this.__rD[bb]=bb;
this.__rE[bb]=bb;
}this.__rG=null;

for(var bb=0;bb<U;bb++){var ba={col:bb,visible:true};
this.fireDataEvent(Q,ba);
this.fireDataEvent(S,ba);
}},getVisibleColumns:function(){return this.__rE!=null?this.__rE:[];
},setColumnWidth:function(t,u){{};
var w=this.__rH[t].width;

if(w!=u){this.__rH[t].width=u;
var v={col:t,newWidth:u,oldWidth:w};
this.fireDataEvent(N,v);
}},getColumnWidth:function(bc){{};
return this.__rH[bc].width;
},setHeaderCellRenderer:function(bh,bi){{};
var bj=this.__rH[bh].headerRenderer;

if(bj!==this.__rI){bj.dispose();
}this.__rH[bh].headerRenderer=bi;
},getHeaderCellRenderer:function(p){{};
return this.__rH[p].headerRenderer;
},setDataCellRenderer:function(z,A){{};
var B=this.__rH[z].dataRenderer;

if(B!==this.__rJ){B.dispose();
}this.__rH[z].dataRenderer=A;
},getDataCellRenderer:function(bd){{};
return this.__rH[bd].dataRenderer;
},setCellEditorFactory:function(be,bf){{};
var bg=this.__rH[be].headerRenderer;

if(bg!==this.__rK){bg.dispose();
}this.__rH[be].editorFactory=bf;
},getCellEditorFactory:function(I){{};
return this.__rH[I].editorFactory;
},_getColToXPosMap:function(){if(this.__rG==null){this.__rG={};

for(var s=0;s<this.__rD.length;s++){var r=this.__rD[s];
this.__rG[r]={overX:s};
}
for(var q=0;q<this.__rE.length;q++){var r=this.__rE[q];
this.__rG[r].visX=q;
}}return this.__rG;
},getVisibleColumnCount:function(){return this.__rE!=null?this.__rE.length:0;
},getVisibleColumnAtX:function(D){{};
return this.__rE[D];
},getVisibleX:function(K){{};
return this._getColToXPosMap()[K].visX;
},getOverallColumnCount:function(){return this.__rD.length;
},getOverallColumnAtX:function(J){{};
return this.__rD[J];
},getOverallX:function(y){{};
return this._getColToXPosMap()[y].overX;
},isColumnVisible:function(C){{};
return (this._getColToXPosMap()[C].visX!=null);
},setColumnVisible:function(a,b){{};

if(b!=this.isColumnVisible(a)){if(b){var h=this._getColToXPosMap();
var e=h[a].overX;

if(e==null){throw new Error("Showing column failed: "+a+". The column is not added to this TablePaneModel.");
}var f;

for(var x=e+1;x<this.__rD.length;x++){var g=this.__rD[x];
var c=h[g].visX;

if(c!=null){f=c;
break;
}}if(f==null){f=this.__rE.length;
}this.__rE.splice(f,0,a);
}else{var d=this.getVisibleX(a);
this.__rE.splice(d,1);
}this.__rG=null;
if(!this.__rF){var j={col:a,visible:b};
this.fireDataEvent(Q,j);
this.fireDataEvent(S,j);
}}},moveColumn:function(k,l){{};
this.__rF=true;
var o=this.__rD[k];
var m=this.isColumnVisible(o);

if(m){this.setColumnVisible(o,false);
}this.__rD.splice(k,1);
this.__rD.splice(l,0,o);
this.__rG=null;

if(m){this.setColumnVisible(o,true);
}this.__rF=false;
var n={col:o,fromOverXPos:k,toOverXPos:l};
this.fireDataEvent(R,n);
},setColumnsOrder:function(E){{};

if(E.length==this.__rD.length){this.__rF=true;
var H=new Array(E.length);

for(var F=0;F<this.__rD.length;F++){var G=this.isColumnVisible(F);
H[F]=G;

if(G){this.setColumnVisible(F,false);
}}this.__rD=qx.lang.Array.clone(E);
this.__rG=null;
for(var F=0;F<this.__rD.length;F++){if(H[F]){this.setColumnVisible(F,true);
}}this.__rF=false;
this.fireDataEvent(R);
}else{throw new Error("setColumnsOrder: Invalid number of column positions given, expected "+this.__rD.length+", got "+E.length);
}}},destruct:function(){for(var i=0;i<this.__rH.length;i++){this.__rH[i].headerRenderer.dispose();
this.__rH[i].dataRenderer.dispose();
this.__rH[i].editorFactory.dispose();
}this.__rD=this.__rE=this.__rH=this.__rG=null;
this._disposeObjects(L,P,O);
}});
})();
(function(){var n="appear",m="columnVisibilityMenuCreateEnd",l="tableWidthChanged",k="verticalScrollBarChanged",j="qx.ui.table.columnmodel.resizebehavior.Abstract",i="qx.ui.table.columnmodel.Resize",h="_applyBehavior",g="separator",f="visibilityChanged",e="Reset column widths",b="changeBehavior",d="user-button",c="widthChanged",a="execute";
qx.Class.define(i,{extend:qx.ui.table.columnmodel.Basic,include:qx.locale.MTranslation,construct:function(){qx.ui.table.columnmodel.Basic.call(this);
this.__rL=false;
this.__rM=false;
},properties:{behavior:{check:j,init:null,nullable:true,apply:h,event:b}},members:{__rM:null,__rL:null,__rN:null,_applyBehavior:function(p,q){if(q!=null){q.dispose();
q=null;
}p._setNumColumns(this.getOverallColumnCount());
p.setTableColumnModel(this);
},init:function(u,v){qx.ui.table.columnmodel.Basic.prototype.init.call(this,u);

if(this.__rN==null){this.__rN=v;
v.addListener(n,this._onappear,this);
v.addListener(l,this._onTableWidthChanged,this);
v.addListener(k,this._onverticalscrollbarchanged,this);
v.addListener(m,this._addResetColumnWidthButton,this);
this.addListener(c,this._oncolumnwidthchanged,this);
this.addListener(f,this._onvisibilitychanged,this);
}if(this.getBehavior()==null){this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
}this.getBehavior()._setNumColumns(u);
},getTable:function(){return this.__rN;
},_addResetColumnWidthButton:function(event){var t=event.getData();
var s=t.columnButton;
var r=t.menu;
var o;
o=s.factory(g);
r.add(o);
o=s.factory(d,{text:this.tr(e)});
r.add(o);
o.addListener(a,this._onappear,this);
},_onappear:function(event){if(this.__rL){return ;
}this.__rL=true;
{};
this.getBehavior().onAppear(event,event.getType()!==n);
this.__rN._updateScrollerWidths();
this.__rN._updateScrollBarVisibility();
this.__rL=false;
this.__rM=true;
},_onTableWidthChanged:function(event){if(this.__rL||!this.__rM){return ;
}this.__rL=true;
{};
this.getBehavior().onTableWidthChanged(event);
this.__rL=false;
},_onverticalscrollbarchanged:function(event){if(this.__rL||!this.__rM){return ;
}this.__rL=true;
{};
this.getBehavior().onVerticalScrollBarChanged(event);
qx.event.Timer.once(function(){if(this.__rN&&!this.__rN.isDisposed()){this.__rN._updateScrollerWidths();
this.__rN._updateScrollBarVisibility();
}},this,0);
this.__rL=false;
},_oncolumnwidthchanged:function(event){if(this.__rL||!this.__rM){return ;
}this.__rL=true;
{};
this.getBehavior().onColumnWidthChanged(event);
this.__rL=false;
},_onvisibilitychanged:function(event){if(this.__rL||!this.__rM){return ;
}this.__rL=true;
{};
this.getBehavior().onVisibilityChanged(event);
this.__rL=false;
}},destruct:function(){this.__rN=null;
}});
})();
(function(){var i="icon",h="label",g="String",f="sort-icon",e="_applySortIcon",d="_applyIcon",c="table-header-cell",b="qx.ui.table.headerrenderer.HeaderCell",a="_applyLabel";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
var j=new qx.ui.layout.Grid();
j.setRowFlex(0,1);
j.setColumnFlex(1,1);
j.setColumnFlex(2,1);
this.setLayout(j);
},properties:{appearance:{refine:true,init:c},label:{check:g,init:null,nullable:true,apply:a},sortIcon:{check:g,init:null,nullable:true,apply:e,themeable:true},icon:{check:g,init:null,nullable:true,apply:d}},members:{_applyLabel:function(k,l){if(k){this._showChildControl(h).setValue(k);
}else{this._excludeChildControl(h);
}},_applySortIcon:function(m,n){if(m){this._showChildControl(f).setSource(m);
}else{this._excludeChildControl(f);
}},_applyIcon:function(o,p){if(o){this._showChildControl(i).setSource(o);
}else{this._excludeChildControl(i);
}},_createChildControlImpl:function(q){var r;

switch(q){case h:r=new qx.ui.basic.Label(this.getLabel()).set({anonymous:true,allowShrinkX:true});
this._add(r,{row:0,column:1});
break;
case f:r=new qx.ui.basic.Image(this.getSortIcon());
r.setAnonymous(true);
this._add(r,{row:0,column:2});
break;
case i:r=new qx.ui.basic.Image(this.getIcon()).set({anonymous:true,allowShrinkX:true});
this._add(r,{row:0,column:0});
break;
}return r||qx.ui.container.Composite.prototype._createChildControlImpl.call(this,q);
}}});
})();
(function(){var g="",f="<br",e=" &nbsp;",d="<br>",c=" ",b="\n",a="qx.bom.String";
qx.Class.define(a,{statics:{TO_CHARCODE:{"quot":34,"amp":38,"lt":60,"gt":62,"nbsp":160,"iexcl":161,"cent":162,"pound":163,"curren":164,"yen":165,"brvbar":166,"sect":167,"uml":168,"copy":169,"ordf":170,"laquo":171,"not":172,"shy":173,"reg":174,"macr":175,"deg":176,"plusmn":177,"sup2":178,"sup3":179,"acute":180,"micro":181,"para":182,"middot":183,"cedil":184,"sup1":185,"ordm":186,"raquo":187,"frac14":188,"frac12":189,"frac34":190,"iquest":191,"Agrave":192,"Aacute":193,"Acirc":194,"Atilde":195,"Auml":196,"Aring":197,"AElig":198,"Ccedil":199,"Egrave":200,"Eacute":201,"Ecirc":202,"Euml":203,"Igrave":204,"Iacute":205,"Icirc":206,"Iuml":207,"ETH":208,"Ntilde":209,"Ograve":210,"Oacute":211,"Ocirc":212,"Otilde":213,"Ouml":214,"times":215,"Oslash":216,"Ugrave":217,"Uacute":218,"Ucirc":219,"Uuml":220,"Yacute":221,"THORN":222,"szlig":223,"agrave":224,"aacute":225,"acirc":226,"atilde":227,"auml":228,"aring":229,"aelig":230,"ccedil":231,"egrave":232,"eacute":233,"ecirc":234,"euml":235,"igrave":236,"iacute":237,"icirc":238,"iuml":239,"eth":240,"ntilde":241,"ograve":242,"oacute":243,"ocirc":244,"otilde":245,"ouml":246,"divide":247,"oslash":248,"ugrave":249,"uacute":250,"ucirc":251,"uuml":252,"yacute":253,"thorn":254,"yuml":255,"fnof":402,"Alpha":913,"Beta":914,"Gamma":915,"Delta":916,"Epsilon":917,"Zeta":918,"Eta":919,"Theta":920,"Iota":921,"Kappa":922,"Lambda":923,"Mu":924,"Nu":925,"Xi":926,"Omicron":927,"Pi":928,"Rho":929,"Sigma":931,"Tau":932,"Upsilon":933,"Phi":934,"Chi":935,"Psi":936,"Omega":937,"alpha":945,"beta":946,"gamma":947,"delta":948,"epsilon":949,"zeta":950,"eta":951,"theta":952,"iota":953,"kappa":954,"lambda":955,"mu":956,"nu":957,"xi":958,"omicron":959,"pi":960,"rho":961,"sigmaf":962,"sigma":963,"tau":964,"upsilon":965,"phi":966,"chi":967,"psi":968,"omega":969,"thetasym":977,"upsih":978,"piv":982,"bull":8226,"hellip":8230,"prime":8242,"Prime":8243,"oline":8254,"frasl":8260,"weierp":8472,"image":8465,"real":8476,"trade":8482,"alefsym":8501,"larr":8592,"uarr":8593,"rarr":8594,"darr":8595,"harr":8596,"crarr":8629,"lArr":8656,"uArr":8657,"rArr":8658,"dArr":8659,"hArr":8660,"forall":8704,"part":8706,"exist":8707,"empty":8709,"nabla":8711,"isin":8712,"notin":8713,"ni":8715,"prod":8719,"sum":8721,"minus":8722,"lowast":8727,"radic":8730,"prop":8733,"infin":8734,"ang":8736,"and":8743,"or":8744,"cap":8745,"cup":8746,"int":8747,"there4":8756,"sim":8764,"cong":8773,"asymp":8776,"ne":8800,"equiv":8801,"le":8804,"ge":8805,"sub":8834,"sup":8835,"sube":8838,"supe":8839,"oplus":8853,"otimes":8855,"perp":8869,"sdot":8901,"lceil":8968,"rceil":8969,"lfloor":8970,"rfloor":8971,"lang":9001,"rang":9002,"loz":9674,"spades":9824,"clubs":9827,"hearts":9829,"diams":9830,"OElig":338,"oelig":339,"Scaron":352,"scaron":353,"Yuml":376,"circ":710,"tilde":732,"ensp":8194,"emsp":8195,"thinsp":8201,"zwnj":8204,"zwj":8205,"lrm":8206,"rlm":8207,"ndash":8211,"mdash":8212,"lsquo":8216,"rsquo":8217,"sbquo":8218,"ldquo":8220,"rdquo":8221,"bdquo":8222,"dagger":8224,"Dagger":8225,"permil":8240,"lsaquo":8249,"rsaquo":8250,"euro":8364},escape:function(m){return qx.util.StringEscape.escape(m,qx.bom.String.FROM_CHARCODE);
},unescape:function(n){return qx.util.StringEscape.unescape(n,qx.bom.String.TO_CHARCODE);
},fromText:function(l){return qx.bom.String.escape(l).replace(/(  |\n)/g,function(j){var k={"  ":e,"\n":d};
return k[j]||j;
});
},toText:function(o){return qx.bom.String.unescape(o.replace(/\s+|<([^>])+>/gi,function(i){if(i.indexOf(f)===0){return b;
}else if(i.length>0&&i.replace(/^\s*/,g).replace(/\s*$/,g)==g){return c;
}else{return g;
}}));
}},defer:function(h){h.FROM_CHARCODE=qx.lang.Object.invert(h.TO_CHARCODE);
}});
})();
(function(){var g=";",f="&",e='X',d="",c='#',b="&#",a="qx.util.StringEscape";
qx.Class.define(a,{statics:{escape:function(h,j){var m,o=d;

for(var i=0,l=h.length;i<l;i++){var n=h.charAt(i);
var k=n.charCodeAt(0);

if(j[k]){m=f+j[k]+g;
}else{if(k>0x7F){m=b+k+g;
}else{m=n;
}}o+=m;
}return o;
},unescape:function(p,q){return p.replace(/&[#\w]+;/gi,function(r){var s=r;
var r=r.substring(1,r.length-1);
var t=q[r];

if(t){s=String.fromCharCode(t);
}else{if(r.charAt(0)==c){if(r.charAt(1).toUpperCase()==e){t=r.substring(2);
if(t.match(/^[0-9A-Fa-f]+$/gi)){s=String.fromCharCode(parseInt(t,16));
}}else{t=r.substring(1);
if(t.match(/^\d+$/gi)){s=String.fromCharCode(parseInt(t,10));
}}}}return s;
});
}}});
})();
(function(){var a="qx.util.format.IFormat";
qx.Interface.define(a,{members:{format:function(b){},parse:function(c){}}});
})();
(function(){var C="",B="Number",A="-",z="0",y="String",x="changeNumberFormat",w='(',v="g",u="Boolean",t="$",m="NaN",s='([0-9]{1,3}(?:',p='{0,1}[0-9]{3}){0,})',l='\\d+){0,1}',k="qx.util.format.NumberFormat",o="Infinity",n="^",q=".",j="-Infinity",r='([-+]){0,1}';
qx.Class.define(k,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(E){qx.core.Object.call(this);
this.__qc=E;
},statics:{getIntegerInstance:function(){var D=qx.util.format.NumberFormat;

if(D._integerInstance==null){D._integerInstance=new D();
D._integerInstance.setMaximumFractionDigits(0);
}return D._integerInstance;
},getInstance:function(){if(!this._instance){this._instance=new this;
}return this._instance;
}},properties:{minimumIntegerDigits:{check:B,init:0},maximumIntegerDigits:{check:B,nullable:true},minimumFractionDigits:{check:B,init:0},maximumFractionDigits:{check:B,nullable:true},groupingUsed:{check:u,init:true},prefix:{check:y,init:C,event:x},postfix:{check:y,init:C,event:x}},members:{__qc:null,format:function(F){switch(F){case Infinity:return o;
case -Infinity:return j;
case NaN:return m;
}var J=(F<0);

if(J){F=-F;
}
if(this.getMaximumFractionDigits()!=null){var Q=Math.pow(10,this.getMaximumFractionDigits());
F=Math.round(F*Q)/Q;
}var P=String(Math.floor(F)).length;
var G=C+F;
var M=G.substring(0,P);

while(M.length<this.getMinimumIntegerDigits()){M=z+M;
}
if(this.getMaximumIntegerDigits()!=null&&M.length>this.getMaximumIntegerDigits()){M=M.substring(M.length-this.getMaximumIntegerDigits());
}var L=G.substring(P+1);

while(L.length<this.getMinimumFractionDigits()){L+=z;
}
if(this.getMaximumFractionDigits()!=null&&L.length>this.getMaximumFractionDigits()){L=L.substring(0,this.getMaximumFractionDigits());
}if(this.getGroupingUsed()){var I=M;
M=C;
var O;

for(O=I.length;O>3;O-=3){M=C+qx.locale.Number.getGroupSeparator(this.__qc)+I.substring(O-3,O)+M;
}M=I.substring(0,O)+M;
}var K=this.getPrefix()?this.getPrefix():C;
var H=this.getPostfix()?this.getPostfix():C;
var N=K+(J?A:C)+M;

if(L.length>0){N+=C+qx.locale.Number.getDecimalSeparator(this.__qc)+L;
}N+=H;
return N;
},parse:function(a){var f=qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this.__qc)+C);
var d=qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this.__qc)+C);
var b=new RegExp(n+qx.lang.String.escapeRegexpChars(this.getPrefix())+r+s+f+p+w+d+l+qx.lang.String.escapeRegexpChars(this.getPostfix())+t);
var e=b.exec(a);

if(e==null){throw new Error("Number string '"+a+"' does not match the number format");
}var g=(e[1]==A);
var i=e[2];
var h=e[3];
i=i.replace(new RegExp(f,v),C);
var c=(g?A:C)+i;

if(h!=null&&h.length!=0){h=h.replace(new RegExp(d),C);
c+=q+h;
}return parseFloat(c);
}}});
})();
(function(){var d="cldr_number_decimal_separator",c="cldr_number_percent_format",b="qx.locale.Number",a="cldr_number_group_separator";
qx.Class.define(b,{statics:{getDecimalSeparator:function(g){return qx.locale.Manager.getInstance().localize(d,[],g);
},getGroupSeparator:function(e){return qx.locale.Manager.getInstance().localize(a,[],e);
},getPercentFormat:function(f){return qx.locale.Manager.getInstance().localize(c,[],f);
}}});
})();
(function(){var cn="(\\d\\d?)",cm="format",cl="",ck="abbreviated",cj="wide",ci="(",ch=")",cg="|",cf="stand-alone",ce="wildcard",bS="default",bR="literal",bQ="'",bP="hour",bO="(\\d\\d?\\d?)",bN="ms",bM="narrow",bL="-",bK="quoted_literal",bJ='a',cu="HH:mm:ss",cv="+",cs="HHmmss",ct="long",cq='z',cr="0",co="sec",cp="day",cw='Z',cx=" ",bW="min",bV="mm",bY="(\\d+)",bX="h",cb="KK",ca='L',cd="Z",cc="(\\d\\d+)",bU="EEEE",bT="^",K=":",L='y',M="K",N="a",O="([\\+\\-]\\d\\d:?\\d\\d)",P="GMT",Q="dd",R="qx.util.format.DateFormat",S="yyy",T="H",cB="YYYY",cA="y",cz="HH",cy="EE",cF='h',cE="S",cD='s',cC='A',cH="yyyyyy",cG="kk",bt="ss",bu='H',br='S',bs="MMMM",bx='c',by="d",bv="([a-zA-Z]+)",bw='k',bp="m",bq='Y',bc='D',bb="yyyyy",be='K',bd="hh",X="SSS",W="MM",ba="yy",Y="(\\d\\d\\d\\d\\d\\d+)",V="yyyy-MM-dd HH:mm:ss",U="(\\d\\d\\d\\d\\d+)",bD="short",bE='d',bF="unkown",bG='m',bz="(\\d\\d\\d\\d)",bA="(\\d\\d\\d+)",bB="k",bC='M',bH="(\\d\\d\\d\\d+)",bI="SS",bm="MMM",bl="s",bk="M",bj='w',bi="EEE",bh="$",bg="?",bf='E',bo="z",bn="yyyy";
qx.Class.define(R,{extend:qx.core.Object,implement:qx.util.format.IFormat,construct:function(cT,cU){qx.core.Object.call(this);

if(!cU){this.__oc=qx.locale.Manager.getInstance().getLocale();
}else{this.__oc=cU;
}
if(cT!=null){this.__od=cT.toString();
}else{this.__od=qx.locale.Date.getDateFormat(ct,this.__oc)+cx+qx.locale.Date.getDateTimeFormat(cs,cu,this.__oc);
}},statics:{getDateTimeInstance:function(){var g=qx.util.format.DateFormat;
var f=qx.locale.Date.getDateFormat(ct)+cx+qx.locale.Date.getDateTimeFormat(cs,cu);

if(g._dateInstance==null||g._dateInstance.__od!=f){g._dateTimeInstance=new g();
}return g._dateTimeInstance;
},getDateInstance:function(){var cN=qx.util.format.DateFormat;
var cM=qx.locale.Date.getDateFormat(bD)+cl;

if(cN._dateInstance==null||cN._dateInstance.__od!=cM){cN._dateInstance=new cN(cM);
}return cN._dateInstance;
},ASSUME_YEAR_2000_THRESHOLD:30,LOGGING_DATE_TIME__format:V,AM_MARKER:"am",PM_MARKER:"pm",MEDIUM_TIMEZONE_NAMES:["GMT"],FULL_TIMEZONE_NAMES:["Greenwich Mean Time"]},members:{__oc:null,__od:null,__oe:null,__of:null,__og:null,__oh:function(a,b){var c=cl+a;

while(c.length<b){c=cr+c;
}return c;
},__oi:function(cQ){var cR=new Date(cQ.getTime());
var cS=cR.getDate();

while(cR.getMonth()!=0){cR.setDate(-1);
cS+=cR.getDate()+1;
}return cS;
},__oj:function(h){return new Date(h.getTime()+(3-((h.getDay()+6)%7))*86400000);
},__ok:function(G){var I=this.__oj(G);
var J=I.getFullYear();
var H=this.__oj(new Date(J,0,4));
return Math.floor(1.5+(I.getTime()-H.getTime())/86400000/7);
},format:function(cV){if(cV==null){return null;
}var dc=qx.util.format.DateFormat;
var dd=this.__oc;
var dn=cV.getFullYear();
var dh=cV.getMonth();
var dq=cV.getDate();
var cW=cV.getDay();
var di=cV.getHours();
var de=cV.getMinutes();
var dj=cV.getSeconds();
var dl=cV.getMilliseconds();
var dp=cV.getTimezoneOffset();
var da=dp>0?1:-1;
var cX=Math.floor(Math.abs(dp)/60);
var df=Math.abs(dp)%60;
this.__ol();
var dm=cl;

for(var i=0;i<this.__og.length;i++){var dk=this.__og[i];

if(dk.type==bR){dm+=dk.text;
}else{var db=dk.character;
var dg=dk.size;
var cY=bg;

switch(db){case L:case bq:if(dg==2){cY=this.__oh(dn%100,2);
}else{cY=dn+cl;

if(dg>cY.length){for(var i=cY.length;i<dg;i++){cY=cr+cY;
}}}break;
case bc:cY=this.__oh(this.__oi(cV),dg);
break;
case bE:cY=this.__oh(dq,dg);
break;
case bj:cY=this.__oh(this.__ok(cV),dg);
break;
case bf:if(dg==2){cY=qx.locale.Date.getDayName(bM,cW,dd,cm);
}else if(dg==3){cY=qx.locale.Date.getDayName(ck,cW,dd,cm);
}else if(dg==4){cY=qx.locale.Date.getDayName(cj,cW,dd,cm);
}break;
case bx:if(dg==2){cY=qx.locale.Date.getDayName(bM,cW,dd,cf);
}else if(dg==3){cY=qx.locale.Date.getDayName(ck,cW,dd,cf);
}else if(dg==4){cY=qx.locale.Date.getDayName(cj,cW,dd,cf);
}break;
case bC:if(dg==1||dg==2){cY=this.__oh(dh+1,dg);
}else if(dg==3){cY=qx.locale.Date.getMonthName(ck,dh,dd,cm);
}else if(dg==4){cY=qx.locale.Date.getMonthName(cj,dh,dd,cm);
}break;
case ca:if(dg==1||dg==2){cY=this.__oh(dh+1,dg);
}else if(dg==3){cY=qx.locale.Date.getMonthName(ck,dh,dd,cf);
}else if(dg==4){cY=qx.locale.Date.getMonthName(cj,dh,dd,cf);
}break;
case bJ:cY=(di<12)?qx.locale.Date.getAmMarker(dd):qx.locale.Date.getPmMarker(dd);
break;
case bu:cY=this.__oh(di,dg);
break;
case bw:cY=this.__oh((di==0)?24:di,dg);
break;
case be:cY=this.__oh(di%12,dg);
break;
case cF:cY=this.__oh(((di%12)==0)?12:(di%12),dg);
break;
case bG:cY=this.__oh(de,dg);
break;
case cD:cY=this.__oh(dj,dg);
break;
case br:cY=this.__oh(dl,dg);
break;
case cq:if(dg==1){cY=P+((da>0)?bL:cv)+this.__oh(Math.abs(cX))+K+this.__oh(df,2);
}else if(dg==2){cY=dc.MEDIUM_TIMEZONE_NAMES[cX];
}else if(dg==3){cY=dc.FULL_TIMEZONE_NAMES[cX];
}break;
case cw:cY=((da>0)?bL:cv)+this.__oh(Math.abs(cX),2)+this.__oh(df,2);
break;
}dm+=cY;
}}return dm;
},parse:function(dM){this.__om();
var dS=this.__oe.regex.exec(dM);

if(dS==null){throw new Error("Date string '"+dM+"' does not match the date format: "+this.__od);
}var dN={year:1970,month:0,day:1,hour:0,ispm:false,min:0,sec:0,ms:0};
var dO=1;

for(var i=0;i<this.__oe.usedRules.length;i++){var dQ=this.__oe.usedRules[i];
var dP=dS[dO];

if(dQ.field!=null){dN[dQ.field]=parseInt(dP,10);
}else{dQ.manipulator(dN,dP);
}dO+=(dQ.groups==null)?1:dQ.groups;
}var dR=new Date(dN.year,dN.month,dN.day,(dN.ispm)?(dN.hour+12):dN.hour,dN.min,dN.sec,dN.ms);

if(dN.month!=dR.getMonth()||dN.year!=dR.getFullYear()){throw new Error("Error parsing date '"+dM+"': the value for day or month is too large");
}return dR;
},__ol:function(){if(this.__og!=null){return;
}this.__og=[];
var dX;
var dV=0;
var ea=cl;
var dT=this.__od;
var dW=bS;
var i=0;

while(i<dT.length){var dY=dT.charAt(i);

switch(dW){case bK:if(dY==bQ){if(i+1>=dT.length){i++;
break;
}var dU=dT.charAt(i+1);

if(dU==bQ){ea+=dY;
i++;
}else{i++;
dW=bF;
}}else{ea+=dY;
i++;
}break;
case ce:if(dY==dX){dV++;
i++;
}else{this.__og.push({type:ce,character:dX,size:dV});
dX=null;
dV=0;
dW=bS;
}break;
default:if((dY>=bJ&&dY<=cq)||(dY>=cC&&dY<=cw)){dX=dY;
dW=ce;
}else if(dY==bQ){if(i+1>=dT.length){ea+=dY;
i++;
break;
}var dU=dT.charAt(i+1);

if(dU==bQ){ea+=dY;
i++;
}i++;
dW=bK;
}else{dW=bS;
}
if(dW!=bS){if(ea.length>0){this.__og.push({type:bR,text:ea});
ea=cl;
}}else{ea+=dY;
i++;
}break;
}}if(dX!=null){this.__og.push({type:ce,character:dX,size:dV});
}else if(ea.length>0){this.__og.push({type:bR,text:ea});
}},__om:function(){if(this.__oe!=null){return ;
}var du=this.__od;
this.__on();
this.__ol();
var dA=[];
var dw=bT;

for(var ds=0;ds<this.__og.length;ds++){var dB=this.__og[ds];

if(dB.type==bR){dw+=qx.lang.String.escapeRegexpChars(dB.text);
}else{var dt=dB.character;
var dx=dB.size;
var dv;

for(var dC=0;dC<this.__of.length;dC++){var dy=this.__of[dC];

if(dt==dy.pattern.charAt(0)&&dx==dy.pattern.length){dv=dy;
break;
}}if(dv==null){var dz=cl;

for(var i=0;i<dx;i++){dz+=dt;
}throw new Error("Malformed date format: "+du+". Wildcard "+dz+" is not supported");
}else{dA.push(dv);
dw+=dv.regex;
}}}dw+=bh;
var dr;

try{dr=new RegExp(dw);
}catch(dF){throw new Error("Malformed date format: "+du);
}this.__oe={regex:dr,"usedRules":dA,pattern:dw};
},__on:function(){var q=qx.util.format.DateFormat;
var w=qx.lang.String;

if(this.__of!=null){return ;
}var r=this.__of=[];
var D=function(cK,cL){cL=parseInt(cL,10);

if(cL<q.ASSUME_YEAR_2000_THRESHOLD){cL+=2000;
}else if(cL<100){cL+=1900;
}cK.year=cL;
};
var x=function(E,F){E.month=parseInt(F,10)-1;
};
var u=function(cO,cP){cO.ispm=(cP==q.PM_MARKER);
};
var t=function(j,k){j.hour=parseInt(k,10)%24;
};
var s=function(dG,dH){dG.hour=parseInt(dH,10)%12;
};
var A=function(cI,cJ){return;
};
var y=qx.locale.Date.getMonthNames(ck,this.__oc,cm);

for(var i=0;i<y.length;i++){y[i]=w.escapeRegexpChars(y[i].toString());
}var z=function(d,e){e=w.escapeRegexpChars(e);
d.month=y.indexOf(e);
};
var n=qx.locale.Date.getMonthNames(cj,this.__oc,cm);

for(var i=0;i<n.length;i++){n[i]=w.escapeRegexpChars(n[i].toString());
}var m=function(dI,dJ){dJ=w.escapeRegexpChars(dJ);
dI.month=n.indexOf(dJ);
};
var p=qx.locale.Date.getDayNames(bM,this.__oc,cm);

for(var i=0;i<p.length;i++){p[i]=w.escapeRegexpChars(p[i].toString());
}var l=function(dK,dL){dL=w.escapeRegexpChars(dL);
dK.month=p.indexOf(dL);
};
var B=qx.locale.Date.getDayNames(ck,this.__oc,cm);

for(var i=0;i<B.length;i++){B[i]=w.escapeRegexpChars(B[i].toString());
}var v=function(dD,dE){dE=w.escapeRegexpChars(dE);
dD.month=B.indexOf(dE);
};
var C=qx.locale.Date.getDayNames(cj,this.__oc,cm);

for(var i=0;i<C.length;i++){C[i]=w.escapeRegexpChars(C[i].toString());
}var o=function(eb,ec){ec=w.escapeRegexpChars(ec);
eb.month=C.indexOf(ec);
};
r.push({pattern:cB,regex:bz,manipulator:D});
r.push({pattern:cA,regex:bY,manipulator:D});
r.push({pattern:ba,regex:cc,manipulator:D});
r.push({pattern:S,regex:bA,manipulator:D});
r.push({pattern:bn,regex:bH,manipulator:D});
r.push({pattern:bb,regex:U,manipulator:D});
r.push({pattern:cH,regex:Y,manipulator:D});
r.push({pattern:bk,regex:cn,manipulator:x});
r.push({pattern:W,regex:cn,manipulator:x});
r.push({pattern:bm,regex:ci+y.join(cg)+ch,manipulator:z});
r.push({pattern:bs,regex:ci+n.join(cg)+ch,manipulator:m});
r.push({pattern:Q,regex:cn,field:cp});
r.push({pattern:by,regex:cn,field:cp});
r.push({pattern:cy,regex:ci+p.join(cg)+ch,manipulator:l});
r.push({pattern:bi,regex:ci+B.join(cg)+ch,manipulator:v});
r.push({pattern:bU,regex:ci+C.join(cg)+ch,manipulator:o});
r.push({pattern:N,regex:ci+q.AM_MARKER+cg+q.PM_MARKER+ch,manipulator:u});
r.push({pattern:cz,regex:cn,field:bP});
r.push({pattern:T,regex:cn,field:bP});
r.push({pattern:cG,regex:cn,manipulator:t});
r.push({pattern:bB,regex:cn,manipulator:t});
r.push({pattern:cb,regex:cn,field:bP});
r.push({pattern:M,regex:cn,field:bP});
r.push({pattern:bd,regex:cn,manipulator:s});
r.push({pattern:bX,regex:cn,manipulator:s});
r.push({pattern:bV,regex:cn,field:bW});
r.push({pattern:bp,regex:cn,field:bW});
r.push({pattern:bt,regex:cn,field:co});
r.push({pattern:bl,regex:cn,field:co});
r.push({pattern:X,regex:bO,field:bN});
r.push({pattern:bI,regex:bO,field:bN});
r.push({pattern:cE,regex:bO,field:bN});
r.push({pattern:cd,regex:O,manipulator:A});
r.push({pattern:bo,regex:bv,manipulator:A});
}},destruct:function(){this.__og=this.__oe=this.__of=null;
}});
})();
(function(){var p="_",o="format",n="thu",m="sat",l="cldr_day_",k="cldr_month_",j="wed",h="fri",g="tue",f="mon",G="sun",F="short",E="HH:mm",D="HHmmsszz",C="HHmm",B="HHmmss",A="cldr_date_format_",z="HH:mm:ss zz",y="full",x="cldr_pm",v="long",w="medium",t="cldr_am",u="qx.locale.Date",r="cldr_date_time_format_",s="cldr_time_format_",q="HH:mm:ss";
qx.Class.define(u,{statics:{__oo:qx.locale.Manager.getInstance(),getAmMarker:function(bp){return this.__oo.localize(t,[],bp);
},getPmMarker:function(bx){return this.__oo.localize(x,[],bx);
},getDayNames:function(length,a,b){var b=b?b:o;
{};
var d=[G,f,g,j,n,h,m];
var e=[];

for(var i=0;i<d.length;i++){var c=l+b+p+length+p+d[i];
e.push(this.__oo.localize(c,[],a));
}return e;
},getDayName:function(length,K,L,M){var M=M?M:o;
{};
var O=[G,f,g,j,n,h,m];
var N=l+M+p+length+p+O[K];
return this.__oo.localize(N,[],L);
},getMonthNames:function(length,ba,bb){var bb=bb?bb:o;
{};
var bd=[];

for(var i=0;i<12;i++){var bc=k+bb+p+length+p+(i+1);
bd.push(this.__oo.localize(bc,[],ba));
}return bd;
},getMonthName:function(length,bt,bu,bv){var bv=bv?bv:o;
{};
var bw=k+bv+p+length+p+(bt+1);
return this.__oo.localize(bw,[],bu);
},getDateFormat:function(T,U){{};
var V=A+T;
return this.__oo.localize(V,[],U);
},getDateTimeFormat:function(bk,bl,bm){var bo=r+bk;
var bn=this.__oo.localize(bo,[],bm);

if(bn==bo){bn=bl;
}return bn;
},getTimeFormat:function(bg,bh){{};
var bj=s+bg;
var bi=this.__oo.localize(bj,[],bh);

if(bi!=bj){return bi;
}
switch(bg){case F:case w:return qx.locale.Date.getDateTimeFormat(C,E);
case v:return qx.locale.Date.getDateTimeFormat(B,q);
case y:return qx.locale.Date.getDateTimeFormat(D,z);
default:throw new Error("This case should never happen.");
}},getWeekStart:function(W){var X={"MV":5,"AE":6,"AF":6,"BH":6,"DJ":6,"DZ":6,"EG":6,"ER":6,"ET":6,"IQ":6,"IR":6,"JO":6,"KE":6,"KW":6,"LB":6,"LY":6,"MA":6,"OM":6,"QA":6,"SA":6,"SD":6,"SO":6,"TN":6,"YE":6,"AS":0,"AU":0,"AZ":0,"BW":0,"CA":0,"CN":0,"FO":0,"GE":0,"GL":0,"GU":0,"HK":0,"IE":0,"IL":0,"IS":0,"JM":0,"JP":0,"KG":0,"KR":0,"LA":0,"MH":0,"MN":0,"MO":0,"MP":0,"MT":0,"NZ":0,"PH":0,"PK":0,"SG":0,"TH":0,"TT":0,"TW":0,"UM":0,"US":0,"UZ":0,"VI":0,"ZA":0,"ZW":0,"MW":0,"NG":0,"TJ":0};
var Y=qx.locale.Date._getTerritory(W);
return X[Y]!=null?X[Y]:1;
},getWeekendStart:function(bq){var bs={"EG":5,"IL":5,"SY":5,"IN":0,"AE":4,"BH":4,"DZ":4,"IQ":4,"JO":4,"KW":4,"LB":4,"LY":4,"MA":4,"OM":4,"QA":4,"SA":4,"SD":4,"TN":4,"YE":4};
var br=qx.locale.Date._getTerritory(bq);
return bs[br]!=null?bs[br]:6;
},getWeekendEnd:function(H){var I={"AE":5,"BH":5,"DZ":5,"IQ":5,"JO":5,"KW":5,"LB":5,"LY":5,"MA":5,"OM":5,"QA":5,"SA":5,"SD":5,"TN":5,"YE":5,"AF":5,"IR":5,"EG":6,"IL":6,"SY":6};
var J=qx.locale.Date._getTerritory(H);
return I[J]!=null?I[J]:0;
},isWeekend:function(P,Q){var S=qx.locale.Date.getWeekendStart(Q);
var R=qx.locale.Date.getWeekendEnd(Q);

if(R>S){return ((P>=S)&&(P<=R));
}else{return ((P>=S)||(P<=R));
}},_getTerritory:function(be){if(be){var bf=be.split(p)[1]||be;
}else{bf=this.__oo.getTerritory()||this.__oo.getLanguage();
}return bf.toUpperCase();
}}});
})();
(function(){var e="auto",d="string",c="number",b="*",a="qx.ui.core.ColumnData";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(){qx.ui.core.LayoutItem.call(this);
this.setColumnWidth(e);
},members:{__rO:null,renderLayout:function(j,top,k,l){this.__rO=k;
},getComputedWidth:function(){return this.__rO;
},getFlex:function(){return this.getLayoutProperties().flex||0;
},setColumnWidth:function(f,g){var g=g||0;
var h=null;

if(typeof f==c){this.setWidth(f);
}else if(typeof f==d){if(f==e){g=1;
}else{var i=f.match(/^[0-9]+(?:\.[0-9]+)?([%\*])$/);

if(i){if(i[1]==b){g=parseFloat(f);
}else{h=f;
}}}}this.setLayoutProperties({flex:g,width:h});
}},settings:{"qx.tableResizeDebug":false}});
})();
(function(){var b="qx.ui.table.columnmodel.resizebehavior.Abstract",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,members:{_setNumColumns:function(d){throw new Error("_setNumColumns is abstract");
},onAppear:function(event,c){throw new Error("onAppear is abstract");
},onTableWidthChanged:function(event){throw new Error("onTableWidthChanged is abstract");
},onVerticalScrollBarChanged:function(event){throw new Error("onVerticalScrollBarChanged is abstract");
},onColumnWidthChanged:function(event){throw new Error("onColumnWidthChanged is abstract");
},onVisibilityChanged:function(event){throw new Error("onVisibilityChanged is abstract");
},_getAvailableWidth:function(){var f=this.getTableColumnModel();
var i=f.getTable();
var e=i._getPaneScrollerArr();

if(!e[0]||!e[0].getLayoutParent().getBounds()){return null;
}var h=e[0].getLayoutParent().getBounds().width;
var g=e[e.length-1];
h-=g.getPaneInsetRight();
return h;
}}});
})();
(function(){var m="Function",k="Boolean",j="minWidth",h="width",g="qx.ui.table.columnmodel.Resize",f="qx.ui.table.columnmodel.resizebehavior.Default",e="__rR",d="__rQ",c="maxWidth";
qx.Class.define(f,{extend:qx.ui.table.columnmodel.resizebehavior.Abstract,construct:function(){qx.ui.table.columnmodel.resizebehavior.Abstract.call(this);
this.__rP=[];
this.__rQ=new qx.ui.layout.HBox();
this.__rQ.connectToWidget(this);
this.__rR=new qx.util.DeferredCall(this._computeColumnsFlexWidth,this);
},properties:{newResizeBehaviorColumnData:{check:m,init:function(y){return new qx.ui.core.ColumnData();
}},initializeWidthsOnEveryAppear:{check:k,init:false},tableColumnModel:{check:g}},members:{__rQ:null,__rS:null,__rP:null,__rR:null,__rT:false,setWidth:function(N,O,P){if(N>=this.__rP.length){throw new Error("Column number out of range");
}this.__rP[N].setColumnWidth(O,P);
this.__rR.schedule();
},setMinWidth:function(n,o){if(n>=this.__rP.length){throw new Error("Column number out of range");
}this.__rP[n].setMinWidth(o);
this.__rR.schedule();
},setMaxWidth:function(a,b){if(a>=this.__rP.length){throw new Error("Column number out of range");
}this.__rP[a].setMaxWidth(b);
this.__rR.schedule();
},set:function(B,C){for(var D in C){switch(D){case h:this.setWidth(B,C[D]);
break;
case j:this.setMinWidth(B,C[D]);
break;
case c:this.setMaxWidth(B,C[D]);
break;
default:throw new Error("Unknown property: "+D);
}}},onAppear:function(event,p){if(p===true||!this.__rT||this.getInitializeWidthsOnEveryAppear()){this._computeColumnsFlexWidth();
this.__rT=true;
}},onTableWidthChanged:function(event){this._computeColumnsFlexWidth();
},onVerticalScrollBarChanged:function(event){this._computeColumnsFlexWidth();
},onColumnWidthChanged:function(event){this._extendNextColumn(event);
},onVisibilityChanged:function(event){var q=event.getData();
if(q.visible){this._computeColumnsFlexWidth();
return;
}this._extendLastColumn(event);
},_setNumColumns:function(z){var A=this.__rP;
if(z<=A.length){A.splice(z,A.length);
return;
}for(var i=A.length;i<z;i++){A[i]=this.getNewResizeBehaviorColumnData()();
A[i].columnNumber=i;
}},getLayoutChildren:function(){return this.__rS;
},_computeColumnsFlexWidth:function(){this.__rR.cancel();
var v=this._getAvailableWidth();

if(v===null){return;
}var r=this.getTableColumnModel();
var t=r.getVisibleColumns();
var u=t.length;
var s=this.__rP;
var i,l;

if(u===0){return;
}var x=[];

for(i=0;i<u;i++){x.push(s[t[i]]);
}this.__rS=x;
this.__rU();
this.__rQ.renderLayout(v,100);
for(i=0,l=x.length;i<l;i++){var w=x[i].getComputedWidth();
r.setColumnWidth(t[i],w);
}},__rU:function(){this.__rQ.invalidateChildrenCache();
var M=this.__rS;

for(var i=0,l=M.length;i<l;i++){M[i].invalidateLayoutCache();
}},_extendNextColumn:function(event){var I=this.getTableColumnModel();
var L=event.getData();
var G=I.getVisibleColumns();
var F=this._getAvailableWidth();
var E=G.length;
if(L.newWidth>L.oldWidth){return ;
}var i;
var H;
var K=0;

for(i=0;i<E;i++){K+=I.getColumnWidth(G[i]);
}if(K<F){for(i=0;i<G.length;i++){if(G[i]==L.col){H=G[i+1];
break;
}}
if(H){var J=(F-(K-I.getColumnWidth(H)));
I.setColumnWidth(H,J);
}}},_extendLastColumn:function(event){var T=this.getTableColumnModel();
var X=event.getData();
if(X.visible){return;
}var S=T.getVisibleColumns();
if(S.length==0){return;
}var R=this._getAvailableWidth(T);
var Q=S.length;
var i;
var V;
var W=0;

for(i=0;i<Q;i++){W+=T.getColumnWidth(S[i]);
}if(W<R){V=S[S.length-1];
var U=(R-(W-T.getColumnWidth(V)));
T.setColumnWidth(V,U);
}},_getResizeColumnData:function(){return this.__rP;
}},destruct:function(){this.__rP=this.__rS=null;
this._disposeObjects(d,e);
}});
})();
(function(){var dC="Boolean",dB="column-button",dA="Function",dz="qx.event.type.Data",dy="statusbar",dx="qx.ui.table.pane.CellEvent",dw="function",dv="PageUp",du="dataChanged",dt='"',eS="changeLocale",eR="changeSelection",eQ="qx.dynlocale",eP="Enter",eO="metaDataChanged",eN="on",eM="__sg",eL="_applyStatusBarVisible",eK="columnVisibilityMenuCreateStart",eJ="blur",dJ="qx.ui.table.Table",dK="columnVisibilityMenuCreateEnd",dH="changeVisible",dI="_applyResetSelectionOnHeaderClick",dF="_applyMetaColumnCounts",dG="focus",dD="changeDataRowRenderer",dE="changeHeaderCellHeight",dR="Escape",dS="A",el="changeSelectionModel",eh="Left",et="Down",eo="Integer",eF="__se",ez="_applyHeaderCellHeight",ea="visibilityChanged",eI="qx.ui.table.ITableModel",eH="orderChanged",eG="_applySelectionModel",dX="menu-button",ed="menu",ef="_applyAdditionalStatusBarText",ej="_applyFocusCellOnMouseMove",em="table",ep="_applyColumnVisibilityButtonVisible",ev="changeTableModel",eB="qx.event.type.Event",dL="tableWidthChanged",dM="_applyHeaderCellsVisible",ec="Object",es="_applyShowCellFocusIndicator",er="resize",eq="verticalScrollBarChanged",ex="changeScrollY",ew="_applyTableModel",en="End",eu="_applyKeepFirstVisibleRowComplete",dq="widthChanged",eA="one of one row",dN="Home",dO="_applyRowHeight",ei="F2",dr="appear",ds="Up",dW="%1 rows",dP="qx.ui.table.selection.Model",dQ="one row",dV="__rW",ek="PageDown",eD="%1 of %2 rows",eC="keypress",ee="changeRowHeight",eE="Number",dY="header",ey="__rV",dT="__sf",dU="qx.ui.table.IRowRenderer",eb="Right",eg="Space";
qx.Class.define(dJ,{extend:qx.ui.core.Widget,construct:function(bI,bJ){qx.ui.core.Widget.call(this);
if(!bJ){bJ={};
}
if(bJ.selectionManager){this.setNewSelectionManager(bJ.selectionManager);
}
if(bJ.selectionModel){this.setNewSelectionModel(bJ.selectionModel);
}
if(bJ.tableColumnModel){this.setNewTableColumnModel(bJ.tableColumnModel);
}
if(bJ.tablePane){this.setNewTablePane(bJ.tablePane);
}
if(bJ.tablePaneHeader){this.setNewTablePaneHeader(bJ.tablePaneHeader);
}
if(bJ.tablePaneScroller){this.setNewTablePaneScroller(bJ.tablePaneScroller);
}
if(bJ.tablePaneModel){this.setNewTablePaneModel(bJ.tablePaneModel);
}
if(bJ.columnMenu){this.setNewColumnMenu(bJ.columnMenu);
}this._setLayout(new qx.ui.layout.VBox());
this.__rV=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(this.__rV,{flex:1});
this.setDataRowRenderer(new qx.ui.table.rowrenderer.Default(this));
this.__rW=this.getNewSelectionManager()(this);
this.setSelectionModel(this.getNewSelectionModel()(this));
this.setTableModel(bI||this.getEmptyTableModel());
this.setMetaColumnCounts([-1]);
this.setTabIndex(1);
this.addListener(eC,this._onKeyPress);
this.addListener(dG,this._onFocusChanged);
this.addListener(eJ,this._onFocusChanged);
var bK=new qx.ui.core.Widget().set({height:0});
this._add(bK);
bK.addListener(er,this._onResize,this);
this.__rX=null;
this.__rY=null;
if(qx.core.Variant.isSet(eQ,eN)){qx.locale.Manager.getInstance().addListener(eS,this._onChangeLocale,this);
}this.initStatusBarVisible();
bI=this.getTableModel();

if(bI.init&&typeof (bI.init)==dw){bI.init(this);
}},events:{"columnVisibilityMenuCreateStart":dz,"columnVisibilityMenuCreateEnd":dz,"tableWidthChanged":eB,"verticalScrollBarChanged":dz,"cellClick":dx,"cellDblclick":dx,"cellContextmenu":dx,"dataEdited":dz},statics:{__sa:{cellClick:1,cellDblclick:1,cellContextmenu:1}},properties:{appearance:{refine:true,init:em},focusable:{refine:true,init:true},minWidth:{refine:true,init:50},selectable:{refine:true,init:false},selectionModel:{check:dP,apply:eG,event:el},tableModel:{check:eI,apply:ew,event:ev},rowHeight:{check:eE,init:20,apply:dO,event:ee},forceLineHeight:{check:dC,init:true},headerCellsVisible:{check:dC,init:true,apply:dM},headerCellHeight:{check:eo,init:16,apply:ez,event:dE,nullable:true},statusBarVisible:{check:dC,init:true,apply:eL},additionalStatusBarText:{nullable:true,init:null,apply:ef},columnVisibilityButtonVisible:{check:dC,init:true,apply:ep},metaColumnCounts:{check:ec,apply:dF},focusCellOnMouseMove:{check:dC,init:false,apply:ej},rowFocusChangeModifiesSelection:{check:dC,init:true},showCellFocusIndicator:{check:dC,init:true,apply:es},keepFirstVisibleRowComplete:{check:dC,init:true,apply:eu},alwaysUpdateCells:{check:dC,init:false},resetSelectionOnHeaderClick:{check:dC,init:true,apply:dI},dataRowRenderer:{check:dU,init:null,nullable:true,event:dD},modalCellEditorPreOpenFunction:{check:dA,init:null,nullable:true},newColumnMenu:{check:dA,init:function(){return new qx.ui.table.columnmenu.Button();
}},newSelectionManager:{check:dA,init:function(w){return new qx.ui.table.selection.Manager(w);
}},newSelectionModel:{check:dA,init:function(cQ){return new qx.ui.table.selection.Model(cQ);
}},newTableColumnModel:{check:dA,init:function(Y){return new qx.ui.table.columnmodel.Basic(Y);
}},newTablePane:{check:dA,init:function(I){return new qx.ui.table.pane.Pane(I);
}},newTablePaneHeader:{check:dA,init:function(cY){return new qx.ui.table.pane.Header(cY);
}},newTablePaneScroller:{check:dA,init:function(dm){return new qx.ui.table.pane.Scroller(dm);
}},newTablePaneModel:{check:dA,init:function(bR){return new qx.ui.table.pane.Model(bR);
}}},members:{__rX:null,__rY:null,__rV:null,__rW:null,__sb:null,__sc:null,__sd:null,__se:null,__sf:null,__sg:null,_createChildControlImpl:function(J){var K;

switch(J){case dy:K=new qx.ui.basic.Label();
K.set({allowGrowX:true});
this._add(K);
break;
case dB:K=this.getNewColumnMenu()();
K.set({focusable:false});
var L=K.factory(ed,{table:this});
L.addListener(dr,this._initColumnMenu,this);
break;
}return K||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,J);
},_applySelectionModel:function(bw,bx){this.__rW.setSelectionModel(bw);

if(bx!=null){bx.removeListener(eR,this._onSelectionChanged,this);
}bw.addListener(eR,this._onSelectionChanged,this);
},_applyRowHeight:function(t,u){var v=this._getPaneScrollerArr();

for(var i=0;i<v.length;i++){v[i].updateVerScrollBarMaximum();
}},_applyHeaderCellsVisible:function(cs,ct){var cu=this._getPaneScrollerArr();

for(var i=0;i<cu.length;i++){cu[i]._excludeChildControl(dY);
}},_applyHeaderCellHeight:function(k,m){var n=this._getPaneScrollerArr();

for(var i=0;i<n.length;i++){n[i].getHeader().setHeight(k);
}},getEmptyTableModel:function(){if(!this.__sg){this.__sg=new qx.ui.table.model.Simple();
this.__sg.setColumns([]);
this.__sg.setData([]);
}return this.__sg;
},_applyTableModel:function(dc,dd){this.getTableColumnModel().init(dc.getColumnCount(),this);

if(dd!=null){dd.removeListener(eO,this._onTableModelMetaDataChanged,this);
dd.removeListener(du,this._onTableModelDataChanged,this);
}dc.addListener(eO,this._onTableModelMetaDataChanged,this);
dc.addListener(du,this._onTableModelDataChanged,this);
this._updateStatusBar();
this._updateTableData(0,dc.getRowCount(),0,dc.getColumnCount());
this._onTableModelMetaDataChanged();
if(dd&&dc.init&&typeof (dc.init)==dw){dc.init(this);
}},getTableColumnModel:function(){if(!this.__sf){var fl=this.__sf=this.getNewTableColumnModel()(this);
fl.addListener(ea,this._onColVisibilityChanged,this);
fl.addListener(dq,this._onColWidthChanged,this);
fl.addListener(eH,this._onColOrderChanged,this);
var fk=this.getTableModel();
fl.init(fk.getColumnCount(),this);
var fi=this._getPaneScrollerArr();

for(var i=0;i<fi.length;i++){var fj=fi[i];
var fm=fj.getTablePaneModel();
fm.setTableColumnModel(fl);
}}return this.__sf;
},_applyStatusBarVisible:function(de,df){if(de){this._showChildControl(dy);
}else{this._excludeChildControl(dy);
}
if(de){this._updateStatusBar();
}},_applyAdditionalStatusBarText:function(y,z){this.__sb=y;
this._updateStatusBar();
},_applyColumnVisibilityButtonVisible:function(bP,bQ){if(bP){this._showChildControl(dB);
}else{this._excludeChildControl(dB);
}},_applyMetaColumnCounts:function(cw,cx){var cE=cw;
var cy=this._getPaneScrollerArr();
var cC={};

if(cw>cx){var cG=qx.event.Registration.getManager(cy[0]);

for(var cH in qx.ui.table.Table.__sa){cC[cH]={};
cC[cH].capture=cG.getListeners(cy[0],cH,true);
cC[cH].bubble=cG.getListeners(cy[0],cH,false);
}}this._cleanUpMetaColumns(cE.length);
var cD=0;

for(var i=0;i<cy.length;i++){var cI=cy[i];
var cF=cI.getTablePaneModel();
cF.setFirstColumnX(cD);
cF.setMaxColumnCount(cE[i]);
cD+=cE[i];
}if(cE.length>cy.length){var cB=this.getTableColumnModel();

for(var i=cy.length;i<cE.length;i++){var cF=this.getNewTablePaneModel()(cB);
cF.setFirstColumnX(cD);
cF.setMaxColumnCount(cE[i]);
cD+=cE[i];
var cI=this.getNewTablePaneScroller()(this);
cI.setTablePaneModel(cF);
cI.addListener(ex,this._onScrollY,this);
for(cH in qx.ui.table.Table.__sa){if(!cC[cH]){break;
}
if(cC[cH].capture&&cC[cH].capture.length>0){var cz=cC[cH].capture;

for(var i=0;i<cz.length;i++){var cA=cz[i].context;

if(!cA){cA=this;
}else if(cA==cy[0]){cA=cI;
}cI.addListener(cH,cz[i].handler,cA,true);
}}
if(cC[cH].bubble&&cC[cH].bubble.length>0){var cK=cC[cH].bubble;

for(var i=0;i<cK.length;i++){var cA=cK[i].context;

if(!cA){cA=this;
}else if(cA==cy[0]){cA=cI;
}cI.addListener(cH,cK[i].handler,cA,false);
}}}var cJ=(i==cE.length-1)?1:0;
this.__rV.add(cI,{flex:cJ});
cy=this._getPaneScrollerArr();
}}for(var i=0;i<cy.length;i++){var cI=cy[i];
var cL=(i==(cy.length-1));
cI.getHeader().setHeight(this.getHeaderCellHeight());
cI.setTopRightWidget(cL?this.getChildControl(dB):null);
}
if(!this.isColumnVisibilityButtonVisible()){this._excludeChildControl(dB);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_applyFocusCellOnMouseMove:function(bp,bq){var br=this._getPaneScrollerArr();

for(var i=0;i<br.length;i++){br[i].setFocusCellOnMouseMove(bp);
}},_applyShowCellFocusIndicator:function(cp,cq){var cr=this._getPaneScrollerArr();

for(var i=0;i<cr.length;i++){cr[i].setShowCellFocusIndicator(cp);
}},_applyKeepFirstVisibleRowComplete:function(cM,cN){var cO=this._getPaneScrollerArr();

for(var i=0;i<cO.length;i++){cO[i].onKeepFirstVisibleRowCompleteChanged();
}},_applyResetSelectionOnHeaderClick:function(ck,cl){var cm=this._getPaneScrollerArr();

for(var i=0;i<cm.length;i++){cm[i].setResetSelectionOnHeaderClick(ck);
}},getSelectionManager:function(){return this.__rW;
},_getPaneScrollerArr:function(){return this.__rV.getChildren();
},getPaneScroller:function(A){return this._getPaneScrollerArr()[A];
},_cleanUpMetaColumns:function(bS){var bT=this._getPaneScrollerArr();

if(bT!=null){for(var i=bT.length-1;i>=bS;i--){bT[i].destroy();
}}},_onChangeLocale:function(a){this.updateContent();
this._updateStatusBar();
},_onSelectionChanged:function(dk){var dl=this._getPaneScrollerArr();

for(var i=0;i<dl.length;i++){dl[i].onSelectionChanged();
}this._updateStatusBar();
},_onTableModelMetaDataChanged:function(ci){var cj=this._getPaneScrollerArr();

for(var i=0;i<cj.length;i++){cj[i].onTableModelMetaDataChanged();
}this._updateStatusBar();
},_onTableModelDataChanged:function(e){var f=e.getData();
this._updateTableData(f.firstRow,f.lastRow,f.firstColumn,f.lastColumn,f.removeStart,f.removeCount);
},_updateTableData:function(eX,eY,fa,fb,fc,fd){var fe=this._getPaneScrollerArr();
if(fd){this.getSelectionModel().removeSelectionInterval(fc,fc+fd);
}
for(var i=0;i<fe.length;i++){fe[i].onTableModelDataChanged(eX,eY,fa,fb);
}var ff=this.getTableModel().getRowCount();

if(ff!=this.__sc){this.__sc=ff;
this._updateScrollBarVisibility();
this._updateStatusBar();
}},_onScrollY:function(cR){if(!this.__sd){this.__sd=true;
var cS=this._getPaneScrollerArr();

for(var i=0;i<cS.length;i++){cS[i].setScrollY(cR.getData());
}this.__sd=false;
}},_onKeyPress:function(ba){if(!this.getEnabled()){return;
}var bh=this.__rY;
var be=true;
var bi=ba.getKeyIdentifier();

if(this.isEditing()){if(ba.getModifiers()==0){switch(bi){case eP:this.stopEditing();
var bh=this.__rY;
this.moveFocusedCell(0,1);

if(this.__rY!=bh){be=this.startEditing();
}break;
case dR:this.cancelEditing();
this.focus();
break;
default:be=false;
break;
}}}else{if(ba.isCtrlPressed()){be=true;

switch(bi){case dS:var bf=this.getTableModel().getRowCount();

if(bf>0){this.getSelectionModel().setSelectionInterval(0,bf-1);
}break;
default:be=false;
break;
}}else{switch(bi){case eg:this.__rW.handleSelectKeyDown(this.__rY,ba);
break;
case ei:case eP:this.startEditing();
be=true;
break;
case dN:this.setFocusedCell(this.__rX,0,true);
break;
case en:var bf=this.getTableModel().getRowCount();
this.setFocusedCell(this.__rX,bf-1,true);
break;
case eh:this.moveFocusedCell(-1,0);
break;
case eb:this.moveFocusedCell(1,0);
break;
case ds:this.moveFocusedCell(0,-1);
break;
case et:this.moveFocusedCell(0,1);
break;
case dv:case ek:var bd=this.getPaneScroller(0);
var bg=bd.getTablePane();
var bc=this.getRowHeight();
var bb=(bi==dv)?-1:1;
bf=bg.getVisibleRowCount()-1;
bd.setScrollY(bd.getScrollY()+bb*bf*bc);
this.moveFocusedCell(0,bb*bf);
break;
default:be=false;
}}}
if(bh!=this.__rY&&this.getRowFocusChangeModifiesSelection()){this.__rW.handleMoveKeyDown(this.__rY,ba);
}
if(be){ba.preventDefault();
ba.stopPropagation();
}},_onFocusChanged:function(fg){var fh=this._getPaneScrollerArr();

for(var i=0;i<fh.length;i++){fh[i].onFocusChanged();
}},_onColVisibilityChanged:function(by){var bz=this._getPaneScrollerArr();

for(var i=0;i<bz.length;i++){bz[i].onColVisibilityChanged();
}var bA=by.getData();

if(this.__se!=null&&bA.col!=null&&bA.visible!=null){this.__se[bA.col].setVisible(bA.visible);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_onColWidthChanged:function(bj){var bk=this._getPaneScrollerArr();

for(var i=0;i<bk.length;i++){var bl=bj.getData();
bk[i].setColumnWidth(bl.col,bl.newWidth);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_onColOrderChanged:function(bL){var bM=this._getPaneScrollerArr();

for(var i=0;i<bM.length;i++){bM[i].onColOrderChanged();
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},getTablePaneScrollerAtPageX:function(bN){var bO=this._getMetaColumnAtPageX(bN);
return (bO!=-1)?this.getPaneScroller(bO):null;
},setFocusedCell:function(dg,dh,di){if(!this.isEditing()&&(dg!=this.__rX||dh!=this.__rY)){if(dg===null){dg=0;
}this.__rX=dg;
this.__rY=dh;
var dj=this._getPaneScrollerArr();

for(var i=0;i<dj.length;i++){dj[i].setFocusedCell(dg,dh);
}
if(dg!==null&&di){this.scrollCellVisible(dg,dh);
}}},resetSelection:function(){this.getSelectionModel().resetSelection();
},resetCellFocus:function(){this.setFocusedCell(null,null,false);
},getFocusedColumn:function(){return this.__rX;
},getFocusedRow:function(){return this.__rY;
},highlightFocusedRow:function(g){this.getDataRowRenderer().setHighlightFocusRow(g);
},clearFocusedRowHighlight:function(bm){if(bm){var bo=bm.getRelatedTarget();

if(bo instanceof qx.ui.table.pane.Pane||bo instanceof qx.ui.table.pane.FocusIndicator){return;
}}this.resetCellFocus();
var bn=this._getPaneScrollerArr();

for(var i=0;i<bn.length;i++){bn[i].onFocusChanged();
}},moveFocusedCell:function(B,C){var G=this.__rX;
var H=this.__rY;

if(G===null||H===null){return;
}
if(B!=0){var F=this.getTableColumnModel();
var x=F.getVisibleX(G);
var E=F.getVisibleColumnCount();
x=qx.lang.Number.limit(x+B,0,E-1);
G=F.getVisibleColumnAtX(x);
}
if(C!=0){var D=this.getTableModel();
H=qx.lang.Number.limit(H+C,0,D.getRowCount()-1);
}this.setFocusedCell(G,H,true);
},scrollCellVisible:function(cc,cd){var ce=this.getTableColumnModel();
var x=ce.getVisibleX(cc);
var cf=this._getMetaColumnAtColumnX(x);

if(cf!=-1){this.getPaneScroller(cf).scrollCellVisible(cc,cd);
}},isEditing:function(){if(this.__rX!=null){var x=this.getTableColumnModel().getVisibleX(this.__rX);
var bY=this._getMetaColumnAtColumnX(x);
return this.getPaneScroller(bY).isEditing();
}return false;
},startEditing:function(){if(this.__rX!=null){var x=this.getTableColumnModel().getVisibleX(this.__rX);
var dp=this._getMetaColumnAtColumnX(x);
var dn=this.getPaneScroller(dp).startEditing();
return dn;
}return false;
},stopEditing:function(){if(this.__rX!=null){var x=this.getTableColumnModel().getVisibleX(this.__rX);
var j=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(j).stopEditing();
}},cancelEditing:function(){if(this.__rX!=null){var x=this.getTableColumnModel().getVisibleX(this.__rX);
var cg=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(cg).cancelEditing();
}},updateContent:function(){var h=this._getPaneScrollerArr();

for(var i=0;i<h.length;i++){h[i].getTablePane().updateContent(true);
}},blockHeaderElements:function(){var cv=this._getPaneScrollerArr();

for(var i=0;i<cv.length;i++){cv[i].getHeader().getBlocker().blockContent(20);
}this.getChildControl(dB).getBlocker().blockContent(20);
},unblockHeaderElements:function(){var cP=this._getPaneScrollerArr();

for(var i=0;i<cP.length;i++){cP[i].getHeader().getBlocker().unblockContent();
}this.getChildControl(dB).getBlocker().unblockContent();
},_getMetaColumnAtPageX:function(b){var c=this._getPaneScrollerArr();

for(var i=0;i<c.length;i++){var d=c[i].getContainerLocation();

if(b>=d.left&&b<=d.right){return i;
}}return -1;
},_getMetaColumnAtColumnX:function(bU){var bW=this.getMetaColumnCounts();
var bX=0;

for(var i=0;i<bW.length;i++){var bV=bW[i];
bX+=bV;

if(bV==-1||bU<bX){return i;
}}return -1;
},_updateStatusBar:function(){var eT=this.getTableModel();

if(this.getStatusBarVisible()){var eU=this.getSelectionModel().getSelectedCount();
var eW=eT.getRowCount();
var eV;

if(eW>=0){if(eU==0){eV=this.trn(dQ,dW,eW,eW);
}else{eV=this.trn(eA,eD,eW,eU,eW);
}}
if(this.__sb){if(eV){eV+=this.__sb;
}else{eV=this.__sb;
}}
if(eV){this.getChildControl(dy).setValue(eV);
}}},_updateScrollerWidths:function(){var bs=this._getPaneScrollerArr();

for(var i=0;i<bs.length;i++){var bu=(i==(bs.length-1));
var bv=bs[i].getTablePaneModel().getTotalWidth();
bs[i].setPaneWidth(bv);
var bt=bu?1:0;
bs[i].setLayoutProperties({flex:bt});
}},_updateScrollBarVisibility:function(){if(!this.getBounds()){return;
}var P=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var S=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
var M=this._getPaneScrollerArr();
var O=false;
var R=false;

for(var i=0;i<M.length;i++){var T=(i==(M.length-1));
var N=M[i].getNeededScrollBars(O,!T);

if(N&P){O=true;
}
if(T&&(N&S)){R=true;
}}for(var i=0;i<M.length;i++){var T=(i==(M.length-1));
var Q;
M[i].setHorizontalScrollBarVisible(O);
if(T){Q=M[i].getVerticalScrollBarVisible();
}M[i].setVerticalScrollBarVisible(T&&R);
if(T&&R!=Q){this.fireDataEvent(eq,R);
}}},_initColumnMenu:function(){var bD=this.getTableModel();
var bE=this.getTableColumnModel();
var bF=this.getChildControl(dB);
bF.empty();
var bC=bF.getMenu();
var bG={table:this,menu:bC,columnButton:bF};
this.fireDataEvent(eK,bG);
this.__se={};

for(var bH=0,l=bD.getColumnCount();bH<l;bH++){var bB=bF.factory(dX,{text:bD.getColumnName(bH),column:bH,bVisible:bE.isColumnVisible(bH)});
qx.core.Assert.assertInterface(bB,qx.ui.table.IColumnMenuItem);
bB.addListener(dH,this._createColumnVisibilityCheckBoxHandler(bH),this);
this.__se[bH]=bB;
}var bG={table:this,menu:bC,columnButton:bF};
this.fireDataEvent(dK,bG);
},_createColumnVisibilityCheckBoxHandler:function(ch){return function(ca){var cb=this.getTableColumnModel();
cb.setColumnVisible(ch,ca.getData());
};
},setColumnWidth:function(da,db){this.getTableColumnModel().setColumnWidth(da,db);
},_onResize:function(){this.fireEvent(dL);
this._updateScrollerWidths();
this._updateScrollBarVisibility();
},addListener:function(cT,cU,self,cV){if(this.self(arguments).__sa[cT]){var cX=[cT];

for(var i=0,cW=this._getPaneScrollerArr();i<cW.length;i++){cX.push(cW[i].addListener.apply(cW[i],arguments));
}return cX.join(dt);
}else{return qx.ui.core.Widget.prototype.addListener.call(this,cT,cU,self,cV);
}},removeListener:function(U,V,self,W){if(this.self(arguments).__sa[U]){for(var i=0,X=this._getPaneScrollerArr();i<X.length;i++){X[i].removeListener.apply(X[i],arguments);
}}else{qx.ui.core.Widget.prototype.removeListener.call(this,U,V,self,W);
}},removeListenerById:function(o){var s=o.split(dt);
var r=s.shift();

if(this.self(arguments).__sa[r]){var q=true;

for(var i=0,p=this._getPaneScrollerArr();i<p.length;i++){q=p[i].removeListenerById.call(p[i],s[i])&&q;
}return q;
}else{return qx.ui.core.Widget.prototype.removeListenerById.call(this,o);
}},destroy:function(){this.getChildControl(dB).getMenu().destroy();
qx.ui.core.Widget.prototype.destroy.call(this);
}},destruct:function(){if(qx.core.Variant.isSet(eQ,eN)){qx.locale.Manager.getInstance().removeListener(eS,this._onChangeLocale,this);
}var co=this.getSelectionModel();

if(co){co.dispose();
}var cn=this.getDataRowRenderer();

if(cn){cn.dispose();
}this._cleanUpMetaColumns(0);
this.getTableColumnModel().dispose();
this._disposeObjects(dV,ey,eM,eM,dT);
this._disposeMap(eF);
}});
})();
(function(){var a="qx.ui.table.IRowRenderer";
qx.Interface.define(a,{members:{updateDataRowElement:function(e,f){},getRowHeightStyle:function(d){},createRowStyle:function(c){},getRowClass:function(b){}}});
})();
(function(){var t="",s="table-row-background-even",r="table-row-background-selected",q="table-row",p="background-color:",o="table-row-background-focused",n=';border-bottom: 1px solid ',m=';color:',l="table-row-selected",k="table-row-background-odd",d="default",j="table-row-background-focused-selected",g="qx.ui.table.rowrenderer.Default",c="table-row-line",b="'",f="height:",e=";",h="px;",a="1px solid ",i="Boolean";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.ui.table.IRowRenderer,construct:function(){qx.core.Object.call(this);
this.__sh=t;
this.__sh={};
this.__si={};
this._renderFont(qx.theme.manager.Font.getInstance().resolve(d));
var C=qx.theme.manager.Color.getInstance();
this.__si.bgcolFocusedSelected=C.resolve(j);
this.__si.bgcolFocused=C.resolve(o);
this.__si.bgcolSelected=C.resolve(r);
this.__si.bgcolEven=C.resolve(s);
this.__si.bgcolOdd=C.resolve(k);
this.__si.colSelected=C.resolve(l);
this.__si.colNormal=C.resolve(q);
this.__si.horLine=C.resolve(c);
},properties:{highlightFocusRow:{check:i,init:true}},members:{__si:null,__sj:null,__sh:null,_insetY:1,_renderFont:function(B){if(B){this.__sj=B.getStyles();
this.__sh=qx.bom.element.Style.compile(this.__sj);
this.__sh=this.__sh.replace(/"/g,b);
}else{this.__sh=t;
this.__sj=qx.bom.Font.getDefaultStyles();
}},updateDataRowElement:function(x,y){var A=this.__sj;
var z=y.style;
qx.bom.element.Style.setStyles(y,A);

if(x.focusedRow&&this.getHighlightFocusRow()){z.backgroundColor=x.selected?this.__si.bgcolFocusedSelected:this.__si.bgcolFocused;
}else{if(x.selected){z.backgroundColor=this.__si.bgcolSelected;
}else{z.backgroundColor=(x.row%2==0)?this.__si.bgcolEven:this.__si.bgcolOdd;
}}z.color=x.selected?this.__si.colSelected:this.__si.colNormal;
z.borderBottom=a+this.__si.horLine;
},getRowHeightStyle:function(v){if(qx.bom.client.Feature.CONTENT_BOX){v-=this._insetY;
}return f+v+h;
},createRowStyle:function(D){var E=[];
E.push(e);
E.push(this.__sh);
E.push(p);

if(D.focusedRow&&this.getHighlightFocusRow()){E.push(D.selected?this.__si.bgcolFocusedSelected:this.__si.bgcolFocused);
}else{if(D.selected){E.push(this.__si.bgcolSelected);
}else{E.push((D.row%2==0)?this.__si.bgcolEven:this.__si.bgcolOdd);
}}E.push(m);
E.push(D.selected?this.__si.colSelected:this.__si.colNormal);
E.push(n,this.__si.horLine);
return E.join(t);
},getRowClass:function(u){return t;
},getRowAttributes:function(w){return t;
}},destruct:function(){this.__si=this.__sj=this.__sh=null;
}});
})();
(function(){var a="qx.ui.table.IColumnMenuButton";
qx.Interface.define(a,{properties:{menu:{}},members:{factory:function(b,c){return true;
},empty:function(){return true;
}}});
})();
(function(){var f="menu-button",e="table-column-reset-button",d="separator",c="user-button",b="qx.ui.table.columnmenu.Button",a="menu";
qx.Class.define(b,{extend:qx.ui.form.MenuButton,implement:qx.ui.table.IColumnMenuButton,construct:function(){qx.ui.form.MenuButton.call(this);
this.__sk=new qx.ui.core.Blocker(this);
},members:{__sl:null,__sk:null,factory:function(j,k){switch(j){case a:var m=new qx.ui.menu.Menu();
this.setMenu(m);
return m;
case f:var o=new qx.ui.table.columnmenu.MenuItem(k.text);
o.setVisible(k.bVisible);
this.getMenu().add(o);
return o;
case c:var n=new qx.ui.menu.Button(k.text);
n.set({appearance:e});
return n;
case d:return new qx.ui.menu.Separator();
default:throw new Error("Unrecognized factory request: "+j);
}},getBlocker:function(){return this.__sk;
},empty:function(){var g=this.getMenu();
var h=g.getChildren();

for(var i=0,l=h.length;i<l;i++){h[0].destroy();
}}},destruct:function(){this.__sk.dispose();
}});
})();
(function(){var h="checked",g="menu-checkbox",f="Boolean",d="_applyValue",c="changeValue",b="qx.ui.menu.CheckBox",a="execute";
qx.Class.define(b,{extend:qx.ui.menu.AbstractButton,implement:[qx.ui.form.IBooleanForm],construct:function(i,j){qx.ui.menu.AbstractButton.call(this);
if(i!=null){if(i.translate){this.setLabel(i.translate());
}else{this.setLabel(i);
}}
if(j!=null){this.setMenu(j);
}this.addListener(a,this._onExecute,this);
},properties:{appearance:{refine:true,init:g},value:{check:f,init:false,apply:d,event:c,nullable:true}},members:{_applyValue:function(k,l){k?this.addState(h):this.removeState(h);
},_onExecute:function(e){this.toggleValue();
},_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var b="qx.ui.table.IColumnMenuItem",a="qx.event.type.Data";
qx.Interface.define(b,{properties:{visible:{}},events:{changeVisible:a}});
})();
(function(){var f="changeVisible",d="qx.ui.table.columnmenu.MenuItem",c="_applyVisible",b="Boolean",a="changeValue";
qx.Class.define(d,{extend:qx.ui.menu.CheckBox,implement:qx.ui.table.IColumnMenuItem,properties:{visible:{check:b,init:true,apply:c,event:f}},construct:function(i){qx.ui.menu.CheckBox.call(this,i);
this.addListener(a,function(e){this.bInListener=true;
this.setVisible(e.getData());
this.bInListener=false;
});
},members:{__sm:false,_applyVisible:function(g,h){if(!this.bInListener){this.setValue(g);
}}}});
})();
(function(){var b="qx.ui.table.selection.Model",a="qx.ui.table.selection.Manager";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
},properties:{selectionModel:{check:b}},members:{__sn:null,handleMouseDown:function(c,d){if(d.isLeftPressed()){var e=this.getSelectionModel();

if(!e.isSelectedIndex(c)){this._handleSelectEvent(c,d);
this.__sn=true;
}else{this.__sn=false;
}}else if(d.isRightPressed()&&d.getModifiers()==0){var e=this.getSelectionModel();

if(!e.isSelectedIndex(c)){e.setSelectionInterval(c,c);
}}},handleMouseUp:function(f,g){if(g.isLeftPressed()&&!this.__sn){this._handleSelectEvent(f,g);
}},handleClick:function(s,t){},handleSelectKeyDown:function(q,r){this._handleSelectEvent(q,r);
},handleMoveKeyDown:function(m,n){var p=this.getSelectionModel();

switch(n.getModifiers()){case 0:p.setSelectionInterval(m,m);
break;
case qx.event.type.Dom.SHIFT_MASK:var o=p.getAnchorSelectionIndex();

if(o==-1){p.setSelectionInterval(m,m);
}else{p.setSelectionInterval(o,m);
}break;
}},_handleSelectEvent:function(h,i){var l=this.getSelectionModel();
var j=l.getLeadSelectionIndex();
var k=l.getAnchorSelectionIndex();

if(i.isShiftPressed()){if(h!=j||l.isSelectionEmpty()){if(k==-1){k=h;
}
if(i.isCtrlOrCommandPressed()){l.addSelectionInterval(k,h);
}else{l.setSelectionInterval(k,h);
}}}else if(i.isCtrlOrCommandPressed()){if(l.isSelectedIndex(h)){l.removeSelectionInterval(h,h);
}else{l.addSelectionInterval(h,h);
}}else{l.setSelectionInterval(h,h);
}}}});
})();
(function(){var cb="",ca="Number",bY='</div>',bX='" ',bW="paneUpdated",bV='<div>',bU="</div>",bT="overflow: hidden;",bS="qx.event.type.Data",bR="paneReloadsData",ct="div",cs='style="',cr="_applyMaxCacheLines",cq="qx.ui.table.pane.Pane",cp="width: 100%;",co="qx.event.type.Event",cn="_applyVisibleRowCount",cm='>',cl="line-height: ",ck="appear",ci='class="',cj="width:100%;",cg="px;",ch='<div ',ce="'>",cf="_applyFirstVisibleRow",cc="<div style='",cd=";position:relative;";
qx.Class.define(cq,{extend:qx.ui.core.Widget,construct:function(cu){qx.ui.core.Widget.call(this);
this.__so=cu;
this.__sp=0;
this.__sq=0;
this.__sr=[];
},events:{"paneReloadsData":bS,"paneUpdated":co},properties:{firstVisibleRow:{check:ca,init:0,apply:cf},visibleRowCount:{check:ca,init:0,apply:cn},maxCacheLines:{check:ca,init:1000,apply:cr},allowShrinkX:{refine:true,init:false}},members:{__sq:null,__sp:null,__so:null,__ss:null,__st:null,__su:null,__sr:null,__sv:0,_applyFirstVisibleRow:function(cz,cA){this.updateContent(false,cz-cA);
},_applyVisibleRowCount:function(f,g){this.updateContent(true);
},_getContentHint:function(){return {width:this.getPaneScroller().getTablePaneModel().getTotalWidth(),height:400};
},getPaneScroller:function(){return this.__so;
},getTable:function(){return this.__so.getTable();
},setFocusedCell:function(m,n,o){if(m!=this.__su||n!=this.__st){var p=this.__st;
this.__su=m;
this.__st=n;
if(n!=p&&!o){if(p!==null){this.updateContent(false,null,p,true);
}
if(n!==null){this.updateContent(false,null,n,true);
}}}},onSelectionChanged:function(){this.updateContent(false,null,null,true);
},onFocusChanged:function(){this.updateContent(false,null,null,true);
},setColumnWidth:function(k,l){this.updateContent(true);
},onColOrderChanged:function(){this.updateContent(true);
},onPaneModelChanged:function(){this.updateContent(true);
},onTableModelDataChanged:function(bi,bj,bk,bl){this.__sw();
var bn=this.getFirstVisibleRow();
var bm=this.getVisibleRowCount();

if(bj==-1||bj>=bn&&bi<bn+bm){this.updateContent();
}},onTableModelMetaDataChanged:function(){this.updateContent(true);
},_applyMaxCacheLines:function(h,j){if(this.__sv>=h&&h!==-1){this.__sw();
}},__sw:function(){this.__sr=[];
this.__sv=0;
},__sx:function(bo,bp,bq){if(!bp&&!bq&&this.__sr[bo]){return this.__sr[bo];
}else{return null;
}},__sy:function(a,b,c,d){var e=this.getMaxCacheLines();

if(!c&&!d&&!this.__sr[a]&&e>0){this._applyMaxCacheLines(e);
this.__sr[a]=b;
this.__sv+=1;
}},updateContent:function(cv,cw,cx,cy){if(cv){this.__sw();
}if(cw&&Math.abs(cw)<=Math.min(10,this.getVisibleRowCount())){this._scrollContent(cw);
}else if(cy&&!this.getTable().getAlwaysUpdateCells()){this._updateRowStyles(cx);
}else{this._updateAllRows();
}},_updateRowStyles:function(q){var u=this.getContentElement().getDomElement();

if(!u||!u.firstChild){this._updateAllRows();
return;
}var A=this.getTable();
var s=A.getSelectionModel();
var v=A.getTableModel();
var B=A.getDataRowRenderer();
var t=u.firstChild.childNodes;
var z={table:A};
var C=this.getFirstVisibleRow();
var y=0;
var r=t.length;

if(q!=null){var w=q-C;

if(w>=0&&w<r){C=q;
y=w;
r=w+1;
}else{return;
}}
for(;y<r;y++,C++){z.row=C;
z.selected=s.isSelectedIndex(C);
z.focusedRow=(this.__st==C);
z.rowData=v.getRowData(C);
B.updateDataRowElement(z,t[y]);
}},_getRowsHtml:function(D,E){var K=this.getTable();
var N=K.getSelectionModel();
var H=K.getTableModel();
var I=K.getTableColumnModel();
var bd=this.getPaneScroller().getTablePaneModel();
var S=K.getDataRowRenderer();
H.prefetchRows(D,D+E-1);
var ba=K.getRowHeight();
var bc=bd.getColumnCount();
var J=0;
var G=[];
for(var x=0;x<bc;x++){var bg=bd.getColumnAtX(x);
var M=I.getColumnWidth(bg);
G.push({col:bg,xPos:x,editable:H.isColumnEditable(bg),focusedCol:this.__su==bg,styleLeft:J,styleWidth:M});
J+=M;
}var bf=[];
var bh=false;

for(var L=D;L<D+E;L++){var O=N.isSelectedIndex(L);
var R=(this.__st==L);
var W=this.__sx(L,O,R);

if(W){bf.push(W);
continue;
}var F=[];
var Y={table:K};
Y.styleHeight=ba;
Y.row=L;
Y.selected=O;
Y.focusedRow=R;
Y.rowData=H.getRowData(L);

if(!Y.rowData){bh=true;
}F.push(ch);
var V=S.getRowAttributes(Y);

if(V){F.push(V);
}var U=S.getRowClass(Y);

if(U){F.push(ci,U,bX);
}var T=S.createRowStyle(Y);
T+=cd+S.getRowHeightStyle(ba)+cj;

if(T){F.push(cs,T,bX);
}F.push(cm);
var be=false;

for(x=0;x<bc&&!be;x++){var P=G[x];

for(var bb in P){Y[bb]=P[bb];
}var bg=Y.col;
Y.value=H.getValue(bg,L);
var Q=I.getDataCellRenderer(bg);
Y.style=Q.getDefaultCellStyle();
be=Q.createDataCellHtml(Y,F)||false;
}F.push(bY);
var X=F.join(cb);
this.__sy(L,X,O,R);
bf.push(X);
}this.fireDataEvent(bR,bh);
return bf.join(cb);
},_scrollContent:function(bs){var bt=this.getContentElement().getDomElement();

if(!(bt&&bt.firstChild)){this._updateAllRows();
return;
}var bC=bt.firstChild;
var bu=bC.childNodes;
var bA=this.getVisibleRowCount();
var bz=this.getFirstVisibleRow();
var bx=this.getTable().getTableModel();
var bD=0;
bD=bx.getRowCount();
if(bz+bA>bD){this._updateAllRows();
return;
}var bE=bs<0?bA+bs:0;
var bv=bs<0?0:bA-bs;

for(i=Math.abs(bs)-1;i>=0;i--){var by=bu[bE];

try{bC.removeChild(by);
}catch(br){break;
}}if(!this.__ss){this.__ss=document.createElement(ct);
}var bB=bV;
bB+=this._getRowsHtml(bz+bv,Math.abs(bs));
bB+=bY;
this.__ss.innerHTML=bB;
var bw=this.__ss.firstChild.childNodes;
if(bs>0){for(var i=bw.length-1;i>=0;i--){var by=bw[0];
bC.appendChild(by);
}}else{for(var i=bw.length-1;i>=0;i--){var by=bw[bw.length-1];
bC.insertBefore(by,bC.firstChild);
}}if(this.__st!==null){this._updateRowStyles(this.__st-bs);
this._updateRowStyles(this.__st);
}this.fireEvent(bW);
},_updateAllRows:function(){var bI=this.getContentElement().getDomElement();

if(!bI){this.addListenerOnce(ck,arguments.callee,this);
return;
}var bO=this.getTable();
var bL=bO.getTableModel();
var bN=this.getPaneScroller().getTablePaneModel();
var bM=bN.getColumnCount();
var bF=bO.getRowHeight();
var bJ=this.getFirstVisibleRow();
var bG=this.getVisibleRowCount();
var bP=bL.getRowCount();

if(bJ+bG>bP){bG=Math.max(0,bP-bJ);
}var bH=bN.getTotalWidth();
var bK;
if(bG>0){bK=[cc,cp,(bO.getForceLineHeight()?cl+bF+cg:cb),bT,ce,this._getRowsHtml(bJ,bG),bU];
}else{bK=[];
}var bQ=bK.join(cb);
bI.innerHTML=bQ;
this.setWidth(bH);
this.__sp=bM;
this.__sq=bG;
this.fireEvent(bW);
}},destruct:function(){this.__ss=this.__so=this.__sr=null;
}});
})();
(function(){var c="hovered",b="__sA",a="qx.ui.table.pane.Header";
qx.Class.define(a,{extend:qx.ui.core.Widget,construct:function(L){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
this.__sz=new qx.ui.core.Blocker(this);
this.__sA=L;
},members:{__sA:null,__sB:null,__sC:null,__sz:null,getPaneScroller:function(){return this.__sA;
},getTable:function(){return this.__sA.getTable();
},getBlocker:function(){return this.__sz;
},onColOrderChanged:function(){this._updateContent(true);
},onPaneModelChanged:function(){this._updateContent(true);
},onTableModelMetaDataChanged:function(){this._updateContent();
},setColumnWidth:function(d,e){var f=this.getHeaderWidgetAtColumn(d);

if(f!=null){f.setWidth(e);
}},setMouseOverColumn:function(F){if(F!=this.__sC){if(this.__sC!=null){var G=this.getHeaderWidgetAtColumn(this.__sC);

if(G!=null){G.removeState(c);
}}
if(F!=null){this.getHeaderWidgetAtColumn(F).addState(c);
}this.__sC=F;
}},getHeaderWidgetAtColumn:function(H){var I=this.getPaneScroller().getTablePaneModel().getX(H);
return this._getChildren()[I];
},showColumnMoveFeedback:function(g,x){var k=this.getContainerLocation();

if(this.__sB==null){var p=this.getTable();
var h=this.getPaneScroller().getTablePaneModel().getX(g);
var j=this._getChildren()[h];
var l=p.getTableModel();
var n=p.getTableColumnModel();
var o={xPos:h,col:g,name:l.getColumnName(g),table:p};
var m=n.getHeaderCellRenderer(g);
var i=m.createHeaderCell(o);
var q=j.getBounds();
i.setWidth(q.width);
i.setHeight(q.height);
i.setZIndex(1000000);
i.setOpacity(0.8);
i.setLayoutProperties({top:k.top});
this.getApplicationRoot().add(i);
this.__sB=i;
}this.__sB.setLayoutProperties({left:k.left+x});
this.__sB.show();
},hideColumnMoveFeedback:function(){if(this.__sB!=null){this.__sB.destroy();
this.__sB=null;
}},isShowingColumnMoveFeedback:function(){return this.__sB!=null;
},_updateContent:function(r){var C=this.getTable();
var v=C.getTableModel();
var z=C.getTableColumnModel();
var B=this.getPaneScroller().getTablePaneModel();
var E=this._getChildren();
var w=B.getColumnCount();
var A=v.getSortColumnIndex();
if(r){this._cleanUpCells();
}var s={};
s.sortedAscending=v.isSortAscending();

for(var x=0;x<w;x++){var u=B.getColumnAtX(x);

if(u===undefined){continue;
}var D=z.getColumnWidth(u);
var y=z.getHeaderCellRenderer(u);
s.xPos=x;
s.col=u;
s.name=v.getColumnName(u);
s.editable=v.isColumnEditable(u);
s.sorted=(u==A);
s.table=C;
var t=E[x];
if(t==null){t=y.createHeaderCell(s);
t.set({width:D});
this._add(t);
}else{y.updateHeaderCell(s,t);
}}},_cleanUpCells:function(){var K=this._getChildren();

for(var x=K.length-1;x>=0;x--){var J=K[x];
J.destroy();
}}},destruct:function(){this.__sz.dispose();
this._disposeObjects(b);
}});
})();
(function(){var b="qx.nativeScrollBars",a="qx.ui.core.scroll.MScrollBarFactory";
qx.core.Setting.define(b,false);
qx.Mixin.define(a,{members:{_createScrollBar:function(c){if(qx.core.Setting.get(b)){return new qx.ui.core.scroll.NativeScrollBar(c);
}else{return new qx.ui.core.scroll.ScrollBar(c);
}}}});
})();
(function(){var m="Boolean",l="resize-line",k="mousedown",j="qx.event.type.Data",i="mouseup",h="qx.ui.table.pane.CellEvent",g="scroll",d="focus-indicator",c="excluded",b="scrollbar-y",bm="table-scroller-focus-indicator",bl="visible",bk="mousemove",bj="header",bi="editing",bh="click",bg="modelChanged",bf="scrollbar-x",be="cellClick",bd="pane",t="__sH",u="mouseout",r="__sE",s="changeHorizontalScrollBarVisible",p="bottom",q="_applyScrollTimeout",n="changeScrollX",o="_applyTablePaneModel",z="Integer",A="dblclick",I="__sI",G="dataEdited",Q="__sL",L="mousewheel",Y="interval",V="qx.ui.table.pane.Scroller",C="__sJ",bc="_applyShowCellFocusIndicator",bb="resize",ba="vertical",B="changeScrollY",E="appear",F="__sF",H="table-scroller",J="beforeSort",M="__sM",S="cellDblclick",X="horizontal",v="losecapture",w="contextmenu",D="col-resize",P="disappear",O="_applyVerticalScrollBarVisible",N="_applyHorizontalScrollBarVisible",U="cellContextmenu",T="__sK",K="close",R="changeTablePaneModel",a="__sG",W="qx.ui.table.pane.Model",y="changeVerticalScrollBarVisible";
qx.Class.define(V,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,construct:function(el){qx.ui.core.Widget.call(this);
this.__sD=el;
var em=new qx.ui.layout.Grid();
em.setColumnFlex(0,1);
em.setRowFlex(1,1);
this._setLayout(em);
this.__sE=this._showChildControl(bf);
this.__sF=this._showChildControl(b);
this.__sG=this._showChildControl(bj);
this.__sH=this._showChildControl(bd);
this.__sI=new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({minWidth:0});
this._add(this.__sI,{row:0,column:0,colSpan:2});
this.__sJ=new qx.ui.table.pane.Clipper();
this.__sJ.add(this.__sG);
this.__sJ.addListener(v,this._onChangeCaptureHeader,this);
this.__sJ.addListener(bk,this._onMousemoveHeader,this);
this.__sJ.addListener(k,this._onMousedownHeader,this);
this.__sJ.addListener(i,this._onMouseupHeader,this);
this.__sJ.addListener(bh,this._onClickHeader,this);
this.__sI.add(this.__sJ,{flex:1});
this.__sK=new qx.ui.table.pane.Clipper();
this.__sK.add(this.__sH);
this.__sK.addListener(L,this._onMousewheel,this);
this.__sK.addListener(bk,this._onMousemovePane,this);
this.__sK.addListener(k,this._onMousedownPane,this);
this.__sK.addListener(i,this._onMouseupPane,this);
this.__sK.addListener(bh,this._onClickPane,this);
this.__sK.addListener(w,this._onContextMenu,this);
this.__sK.addListener(A,this._onDblclickPane,this);
this.__sK.addListener(bb,this._onResizePane,this);
this._add(this.__sK,{row:1,column:0});
this.__sL=this.getChildControl(d);
this.getChildControl(l).hide();
this.addListener(u,this._onMouseout,this);
this.addListener(E,this._onAppear,this);
this.addListener(P,this._onDisappear,this);
this.__sM=new qx.event.Timer();
this.__sM.addListener(Y,this._oninterval,this);
this.initScrollTimeout();
},statics:{MIN_COLUMN_WIDTH:10,RESIZE_REGION_RADIUS:5,CLICK_TOLERANCE:5,HORIZONTAL_SCROLLBAR:1,VERTICAL_SCROLLBAR:2},events:{"changeScrollY":j,"changeScrollX":j,"cellClick":h,"cellDblclick":h,"cellContextmenu":h,"beforeSort":j},properties:{horizontalScrollBarVisible:{check:m,init:true,apply:N,event:s},verticalScrollBarVisible:{check:m,init:true,apply:O,event:y},tablePaneModel:{check:W,apply:o,event:R},liveResize:{check:m,init:false},focusCellOnMouseMove:{check:m,init:false},selectBeforeFocus:{check:m,init:false},showCellFocusIndicator:{check:m,init:true,apply:bc},resetSelectionOnHeaderClick:{check:m,init:true},scrollTimeout:{check:z,init:100,apply:q},appearance:{refine:true,init:H}},members:{__sN:null,__sD:null,__sO:null,__sP:null,__sQ:null,__sR:null,__sS:null,__sT:null,__sU:null,__sV:null,__sW:null,__sX:null,__sY:null,__ta:null,__tb:false,__tc:null,__td:null,__te:null,__tf:null,__tg:null,__th:null,__ti:null,__tj:null,__sE:null,__sF:null,__sG:null,__sJ:null,__sH:null,__sK:null,__sL:null,__sI:null,__sM:null,getPaneInsetRight:function(){var eu=this.getTopRightWidget();
var ev=eu&&eu.isVisible()&&eu.getBounds()?eu.getBounds().width:0;
var et=this.getVerticalScrollBarVisible()?this.getVerticalScrollBarWidth():0;
return Math.max(ev,et);
},setPaneWidth:function(dR){if(this.isVerticalScrollBarVisible()){dR+=this.getPaneInsetRight();
}this.setWidth(dR);
},_createChildControlImpl:function(eV){var eW;

switch(eV){case bj:eW=(this.getTable().getNewTablePaneHeader())(this);
break;
case bd:eW=(this.getTable().getNewTablePane())(this);
break;
case d:eW=new qx.ui.table.pane.FocusIndicator(this);
eW.setUserBounds(0,0,0,0);
eW.setZIndex(1000);
eW.addListener(i,this._onMouseupFocusIndicator,this);
this.__sK.add(eW);
eW.show();
eW.setDecorator(null);
break;
case l:eW=new qx.ui.core.Widget();
eW.setUserBounds(0,0,0,0);
eW.setZIndex(1000);
this.__sK.add(eW);
break;
case bf:eW=this._createScrollBar(X).set({minWidth:0,alignY:p});
eW.addListener(g,this._onScrollX,this);
this._add(eW,{row:2,column:0});
break;
case b:eW=this._createScrollBar(ba);
eW.addListener(g,this._onScrollY,this);
this._add(eW,{row:1,column:1});
break;
}return eW||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,eV);
},_applyHorizontalScrollBarVisible:function(ej,ek){this.__sE.setVisibility(ej?bl:c);
},_applyVerticalScrollBarVisible:function(eT,eU){this.__sF.setVisibility(eT?bl:c);
},_applyTablePaneModel:function(fi,fj){if(fj!=null){fj.removeListener(bg,this._onPaneModelChanged,this);
}fi.addListener(bg,this._onPaneModelChanged,this);
},_applyShowCellFocusIndicator:function(cm,cn){if(cm){this.__sL.setDecorator(bm);
this._updateFocusIndicator();
}else{if(this.__sL){this.__sL.setDecorator(null);
}}},getScrollY:function(){return this.__sF.getPosition();
},setScrollY:function(scrollY,df){this.__sF.scrollTo(scrollY);

if(df){this._updateContent();
}},getScrollX:function(){return this.__sE.getPosition();
},setScrollX:function(scrollX){this.__sE.scrollTo(scrollX);
},getTable:function(){return this.__sD;
},onColVisibilityChanged:function(){this.updateHorScrollBarMaximum();
this._updateFocusIndicator();
},setColumnWidth:function(co,cp){this.__sG.setColumnWidth(co,cp);
this.__sH.setColumnWidth(co,cp);
var cq=this.getTablePaneModel();
var x=cq.getX(co);

if(x!=-1){this.updateHorScrollBarMaximum();
this._updateFocusIndicator();
}},onColOrderChanged:function(){this.__sG.onColOrderChanged();
this.__sH.onColOrderChanged();
this.updateHorScrollBarMaximum();
},onTableModelDataChanged:function(bI,bJ,bK,bL){this.__sH.onTableModelDataChanged(bI,bJ,bK,bL);
var bM=this.getTable().getTableModel().getRowCount();

if(bM!=this.__sN){this.updateVerScrollBarMaximum();

if(this.getFocusedRow()>=bM){if(bM==0){this.setFocusedCell(null,null);
}else{this.setFocusedCell(this.getFocusedColumn(),bM-1);
}}this.__sN=bM;
}},onSelectionChanged:function(){this.__sH.onSelectionChanged();
},onFocusChanged:function(){this.__sH.onFocusChanged();
},onTableModelMetaDataChanged:function(){this.__sG.onTableModelMetaDataChanged();
this.__sH.onTableModelMetaDataChanged();
},_onPaneModelChanged:function(){this.__sG.onPaneModelChanged();
this.__sH.onPaneModelChanged();
},_onResizePane:function(){this.updateHorScrollBarMaximum();
this.updateVerScrollBarMaximum();
this._updateContent();
this.__sG._updateContent();
this.__sD._updateScrollBarVisibility();
},updateHorScrollBarMaximum:function(){var eD=this.__sK.getInnerSize();

if(!eD){return ;
}var eB=this.getTablePaneModel().getTotalWidth();
var eC=this.__sE;

if(eD.width<eB){var eA=Math.max(0,eB-eD.width);
eC.setMaximum(eA);
eC.setKnobFactor(eD.width/eB);
var eE=eC.getPosition();
eC.setPosition(Math.min(eE,eA));
}else{eC.setMaximum(0);
eC.setKnobFactor(1);
eC.setPosition(0);
}},updateVerScrollBarMaximum:function(){var cl=this.__sK.getInnerSize();

if(!cl){return ;
}var cj=this.getTable().getTableModel();
var cf=cj.getRowCount();

if(this.getTable().getKeepFirstVisibleRowComplete()){cf+=1;
}var ce=this.getTable().getRowHeight();
var ch=cf*ce;
var ck=this.__sF;

if(cl.height<ch){var cg=Math.max(0,ch-cl.height);
ck.setMaximum(cg);
ck.setKnobFactor(cl.height/ch);
var ci=ck.getPosition();
ck.setPosition(Math.min(ci,cg));
}else{ck.setMaximum(0);
ck.setKnobFactor(1);
ck.setPosition(0);
}},onKeepFirstVisibleRowCompleteChanged:function(){this.updateVerScrollBarMaximum();
this._updateContent();
},_onAppear:function(){this._startInterval(this.getScrollTimeout());
},_onDisappear:function(){this._stopInterval();
},_onScrollX:function(e){var eY=e.getData();
this.fireDataEvent(n,eY,e.getOldData());
this.__sJ.scrollToX(eY);
this.__sK.scrollToX(eY);
},_onScrollY:function(e){this.fireDataEvent(B,e.getData(),e.getOldData());
this._postponedUpdateContent();
},_onMousewheel:function(e){var eF=this.getTable();

if(!eF.getEnabled()){return;
}var eH=qx.bom.client.Engine.GECKO?1:3;
var eG=this.__sF.getPosition()+((e.getWheelDelta()*eH)*eF.getRowHeight());
this.__sF.scrollTo(eG);
if(this.__td&&this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(this.__td,this.__te);
}e.stop();
},__tk:function(bO){var bT=this.getTable();
var bU=this.__sG.getHeaderWidgetAtColumn(this.__sW);
var bP=bU.getSizeHint().minWidth;
var bR=Math.max(bP,this.__sY+bO-this.__sX);

if(this.getLiveResize()){var bQ=bT.getTableColumnModel();
bQ.setColumnWidth(this.__sW,bR);
}else{this.__sG.setColumnWidth(this.__sW,bR);
var bS=this.getTablePaneModel();
this._showResizeLine(bS.getColumnLeft(this.__sW)+bR);
}this.__sX+=bR-this.__sY;
this.__sY=bR;
},__tl:function(cb){var cc=qx.ui.table.pane.Scroller.CLICK_TOLERANCE;

if(this.__sG.isShowingColumnMoveFeedback()||cb>this.__sV+cc||cb<this.__sV-cc){this.__sS+=cb-this.__sV;
this.__sG.showColumnMoveFeedback(this.__sR,this.__sS);
var cd=this.__sD.getTablePaneScrollerAtPageX(cb);

if(this.__sU&&this.__sU!=cd){this.__sU.hideColumnMoveFeedback();
}
if(cd!=null){this.__sT=cd.showColumnMoveFeedback(cb);
}else{this.__sT=null;
}this.__sU=cd;
this.__sV=cb;
}},_onMousemoveHeader:function(e){var dO=this.getTable();

if(!dO.getEnabled()){return;
}var dP=false;
var dI=null;
var dM=e.getDocumentLeft();
var dN=e.getDocumentTop();
this.__td=dM;
this.__te=dN;

if(this.__sW!=null){this.__tk(dM);
dP=true;
e.stopPropagation();
}else if(this.__sR!=null){this.__tl(dM);
e.stopPropagation();
}else{var dJ=this._getResizeColumnForPageX(dM);

if(dJ!=-1){dP=true;
}else{var dL=dO.getTableModel();
var dQ=this._getColumnForPageX(dM);

if(dQ!=null&&dL.isColumnSortable(dQ)){dI=dQ;
}}}var dK=dP?D:null;
this.getApplicationRoot().setGlobalCursor(dK);
this.setCursor(dK);
this.__sG.setMouseOverColumn(dI);
},_onMousemovePane:function(e){var ep=this.getTable();

if(!ep.getEnabled()){return;
}var er=e.getDocumentLeft();
var es=e.getDocumentTop();
this.__td=er;
this.__te=es;
var eq=this._getRowForPagePos(er,es);

if(eq!=null&&this._getColumnForPageX(er)!=null){if(this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(er,es);
}}this.__sG.setMouseOverColumn(null);
},_onMousedownHeader:function(e){if(!this.getTable().getEnabled()){return;
}var dv=e.getDocumentLeft();
var dw=this._getResizeColumnForPageX(dv);

if(dw!=-1){this._startResizeHeader(dw,dv);
e.stop();
}else{var du=this._getColumnForPageX(dv);

if(du!=null){this._startMoveHeader(du,dv);
e.stop();
}}},_startResizeHeader:function(dp,dq){var dr=this.getTable().getTableColumnModel();
this.__sW=dp;
this.__sX=dq;
this.__sY=dr.getColumnWidth(this.__sW);
this.__sJ.capture();
},_startMoveHeader:function(ey,ez){this.__sR=ey;
this.__sV=ez;
this.__sS=this.getTablePaneModel().getColumnLeft(ey);
this.__sJ.capture();
},_onMousedownPane:function(e){var ff=this.getTable();

if(!ff.getEnabled()){return;
}
if(ff.isEditing()){ff.stopEditing();
}var fc=e.getDocumentLeft();
var fe=e.getDocumentTop();
var fh=this._getRowForPagePos(fc,fe);
var fg=this._getColumnForPageX(fc);

if(fh!==null){this.__ta={row:fh,col:fg};
this.__tb=false;
var fd=this.getSelectBeforeFocus();

if(fd){ff.getSelectionManager().handleMouseDown(fh,e);
}if(!this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(fc,fe);
}
if(!fd){ff.getSelectionManager().handleMouseDown(fh,e);
}}},_onMouseupFocusIndicator:function(e){if(this.__ta&&!this.__tb&&!this.isEditing()&&this.__sL.getRow()==this.__ta.row&&this.__sL.getColumn()==this.__ta.col){this.fireEvent(be,qx.ui.table.pane.CellEvent,[this,e,this.__ta.row,this.__ta.col],true);
this.__tb=true;
}},_onChangeCaptureHeader:function(e){if(this.__sW!=null){this._stopResizeHeader();
}
if(this.__sR!=null){this._stopMoveHeader();
}},_stopResizeHeader:function(){var dx=this.getTable().getTableColumnModel();
if(!this.getLiveResize()){this._hideResizeLine();
dx.setColumnWidth(this.__sW,this.__sY);
}this.__sW=null;
this.__sJ.releaseCapture();
this.getApplicationRoot().setGlobalCursor(null);
this.setCursor(null);
if(this.isEditing()){var dy=this.__th.getBounds().height;
this.__th.setUserBounds(0,0,this.__sY,dy);
}},_stopMoveHeader:function(){var dW=this.getTable().getTableColumnModel();
var dX=this.getTablePaneModel();
this.__sG.hideColumnMoveFeedback();

if(this.__sU){this.__sU.hideColumnMoveFeedback();
}
if(this.__sT!=null){var ea=dX.getFirstColumnX()+dX.getX(this.__sR);
var dV=this.__sT;

if(dV!=ea&&dV!=ea+1){var dY=dW.getVisibleColumnAtX(ea);
var dU=dW.getVisibleColumnAtX(dV);
var dT=dW.getOverallX(dY);
var dS=(dU!=null)?dW.getOverallX(dU):dW.getOverallColumnCount();

if(dS>dT){dS--;
}dW.moveColumn(dT,dS);
this._updateFocusIndicator();
}}this.__sR=null;
this.__sT=null;
this.__sJ.releaseCapture();
},_onMouseupPane:function(e){var ds=this.getTable();

if(!ds.getEnabled()){return;
}var dt=this._getRowForPagePos(e.getDocumentLeft(),e.getDocumentTop());

if(dt!=-1&&dt!=null&&this._getColumnForPageX(e.getDocumentLeft())!=null){ds.getSelectionManager().handleMouseUp(dt,e);
}},_onMouseupHeader:function(e){var dH=this.getTable();

if(!dH.getEnabled()){return;
}
if(this.__sW!=null){this._stopResizeHeader();
this.__tc=true;
e.stop();
}else if(this.__sR!=null){this._stopMoveHeader();
e.stop();
}},_onClickHeader:function(e){if(this.__tc){this.__tc=false;
return;
}var da=this.getTable();

if(!da.getEnabled()){return;
}var cX=da.getTableModel();
var cY=e.getDocumentLeft();
var cW=this._getResizeColumnForPageX(cY);

if(cW==-1){var dd=this._getColumnForPageX(cY);

if(dd!=null&&cX.isColumnSortable(dd)){var cV=cX.getSortColumnIndex();
var db=(dd!=cV)?true:!cX.isSortAscending();
var dc={column:dd,ascending:db,clickEvent:e};

if(this.fireDataEvent(J,dc,null,true)){cX.sortByColumn(dd,db);

if(this.getResetSelectionOnHeaderClick()){da.getSelectionModel().resetSelection();
}}}}e.stop();
},_onClickPane:function(e){var ct=this.getTable();

if(!ct.getEnabled()){return;
}var cw=e.getDocumentLeft();
var cx=e.getDocumentTop();
var cu=this._getRowForPagePos(cw,cx);
var cv=this._getColumnForPageX(cw);

if(cu!=null&&cv!=null){ct.getSelectionManager().handleClick(cu,e);

if(this.__sL.isHidden()||(this.__ta&&!this.__tb&&!this.isEditing()&&cu==this.__ta.row&&cv==this.__ta.col)){this.fireEvent(be,qx.ui.table.pane.CellEvent,[this,e,cu,cv],true);
this.__tb=true;
}}},_onContextMenu:function(e){var bY=e.getDocumentLeft();
var ca=e.getDocumentTop();
var bW=this._getRowForPagePos(bY,ca);
var bX=this._getColumnForPageX(bY);

if(this.__sL.isHidden()||(this.__ta&&bW==this.__ta.row&&bX==this.__ta.col)){this.fireEvent(U,qx.ui.table.pane.CellEvent,[this,e,bW,bX],true);
var bV=this.getTable().getContextMenu();

if(bV){if(bV.getChildren().length>0){bV.openAtMouse(e);
}else{bV.exclude();
}e.preventDefault();
}}},_onContextMenuOpen:function(e){},_onDblclickPane:function(e){var cz=e.getDocumentLeft();
var cA=e.getDocumentTop();
this._focusCellAtPagePos(cz,cA);
this.startEditing();
var cy=this._getRowForPagePos(cz,cA);

if(cy!=-1&&cy!=null){this.fireEvent(S,qx.ui.table.pane.CellEvent,[this,e,cy],true);
}},_onMouseout:function(e){var bN=this.getTable();

if(!bN.getEnabled()){return;
}if(this.__sW==null){this.setCursor(null);
this.getApplicationRoot().setGlobalCursor(null);
}this.__sG.setMouseOverColumn(null);
},_showResizeLine:function(x){var bC=this._showChildControl(l);
var bB=bC.getWidth();
var bD=this.__sK.getBounds();
bC.setUserBounds(x-Math.round(bB/2),0,bB,bD.height);
},_hideResizeLine:function(){this._excludeChildControl(l);
},showColumnMoveFeedback:function(cI){var cR=this.getTablePaneModel();
var cQ=this.getTable().getTableColumnModel();
var cL=this.__sH.getContainerLocation().left;
var cP=cR.getColumnCount();
var cM=0;
var cK=0;
var cU=cL;

for(var cJ=0;cJ<cP;cJ++){var cN=cR.getColumnAtX(cJ);
var cS=cQ.getColumnWidth(cN);

if(cI<cU+cS/2){break;
}cU+=cS;
cM=cJ+1;
cK=cU-cL;
}var cO=this.__sK.getContainerLocation().left;
var cT=this.__sK.getBounds().width;
var scrollX=cO-cL;
cK=qx.lang.Number.limit(cK,scrollX+2,scrollX+cT-1);
this._showResizeLine(cK);
return cR.getFirstColumnX()+cM;
},hideColumnMoveFeedback:function(){this._hideResizeLine();
},_focusCellAtPagePos:function(bE,bF){var bH=this._getRowForPagePos(bE,bF);

if(bH!=-1&&bH!=null){var bG=this._getColumnForPageX(bE);
this.__sD.setFocusedCell(bG,bH);
}},setFocusedCell:function(en,eo){if(!this.isEditing()){this.__sH.setFocusedCell(en,eo,this.__sP);
this.__tf=en;
this.__tg=eo;
this._updateFocusIndicator();
}},getFocusedColumn:function(){return this.__tf;
},getFocusedRow:function(){return this.__tg;
},scrollCellVisible:function(fk,fl){var fv=this.getTablePaneModel();
var fm=fv.getX(fk);

if(fm!=-1){var fs=this.__sK.getInnerSize();

if(!fs){return;
}var ft=this.getTable().getTableColumnModel();
var fp=fv.getColumnLeft(fk);
var fw=ft.getColumnWidth(fk);
var fn=this.getTable().getRowHeight();
var fx=fl*fn;
var scrollX=this.getScrollX();
var scrollY=this.getScrollY();
var fu=Math.min(fp,fp+fw-fs.width);
var fr=fp;
this.setScrollX(Math.max(fu,Math.min(fr,scrollX)));
var fo=fx+fn-fs.height;

if(this.getTable().getKeepFirstVisibleRowComplete()){fo+=fn;
}var fq=fx;
this.setScrollY(Math.max(fo,Math.min(fq,scrollY)),true);
}},isEditing:function(){return this.__th!=null;
},startEditing:function(){var ef=this.getTable();
var ed=ef.getTableModel();
var eh=this.__tf;

if(!this.isEditing()&&(eh!=null)&&ed.isColumnEditable(eh)){var ei=this.__tg;
var eb=this.getTablePaneModel().getX(eh);
var ec=ed.getValue(eh,ei);
this.__ti=ef.getTableColumnModel().getCellEditorFactory(eh);
var ee={col:eh,row:ei,xPos:eb,value:ec,table:ef};
this.__th=this.__ti.createCellEditor(ee);
if(this.__th===null){return false;
}else if(this.__th instanceof qx.ui.window.Window){this.__th.setModal(true);
this.__th.setShowClose(false);
this.__th.addListener(K,this._onCellEditorModalWindowClose,this);
var f=ef.getModalCellEditorPreOpenFunction();

if(f!=null){f(this.__th,ee);
}this.__th.open();
}else{var eg=this.__sL.getInnerSize();
this.__th.setUserBounds(0,0,eg.width,eg.height);
this.__sL.addListener(k,function(e){this.__ta={row:this.__tg,col:this.__tf};
e.stopPropagation();
},this);
this.__sL.add(this.__th);
this.__sL.addState(bi);
this.__sL.setKeepActive(false);
this.__sL.setDecorator(bm);
this.__th.focus();
this.__th.activate();
}return true;
}return false;
},stopEditing:function(){if(!this.getShowCellFocusIndicator()){this.__sL.setDecorator(null);
}this.flushEditor();
this.cancelEditing();
},flushEditor:function(){if(this.isEditing()){var cs=this.__ti.getCellEditorValue(this.__th);
var cr=this.getTable().getTableModel().getValue(this.__tf,this.__tg);
this.getTable().getTableModel().setValue(this.__tf,this.__tg,cs);
this.__sD.focus();
this.__sD.fireDataEvent(G,{row:this.__tg,col:this.__tf,oldValue:cr,value:cs});
}},cancelEditing:function(){if(this.isEditing()&&!this.__th.pendingDispose){if(this._cellEditorIsModalWindow){this.__th.destroy();
this.__th=null;
this.__ti=null;
this.__th.pendingDispose=true;
}else{this.__sL.removeState(bi);
this.__sL.setKeepActive(true);
this.__th.destroy();
this.__th=null;
this.__ti=null;
}}},_onCellEditorModalWindowClose:function(e){this.stopEditing();
},_getColumnForPageX:function(cB){var cE=this.getTable().getTableColumnModel();
var cF=this.getTablePaneModel();
var cD=cF.getColumnCount();
var cH=this.__sG.getContainerLocation().left;

for(var x=0;x<cD;x++){var cC=cF.getColumnAtX(x);
var cG=cE.getColumnWidth(cC);
cH+=cG;

if(cB<cH){return cC;
}}return null;
},_getResizeColumnForPageX:function(dz){var dD=this.getTable().getTableColumnModel();
var dE=this.getTablePaneModel();
var dC=dE.getColumnCount();
var dG=this.__sG.getContainerLocation().left;
var dA=qx.ui.table.pane.Scroller.RESIZE_REGION_RADIUS;

for(var x=0;x<dC;x++){var dB=dE.getColumnAtX(x);
var dF=dD.getColumnWidth(dB);
dG+=dF;

if(dz>=(dG-dA)&&dz<=(dG+dA)){return dB;
}}return -1;
},_getRowForPagePos:function(eI,eJ){var eK=this.__sH.getContentLocation();

if(eI<eK.left||eI>eK.right){return null;
}
if(eJ>=eK.top&&eJ<=eK.bottom){var eL=this.getTable().getRowHeight();
var scrollY=this.__sF.getPosition();

if(this.getTable().getKeepFirstVisibleRowComplete()){scrollY=Math.floor(scrollY/eL)*eL;
}var eO=scrollY+eJ-eK.top;
var eQ=Math.floor(eO/eL);
var eP=this.getTable().getTableModel();
var eM=eP.getRowCount();
return (eQ<eM)?eQ:null;
}var eN=this.__sG.getContainerLocation();

if(eJ>=eN.top&&eJ<=eN.bottom&&eI<=eN.right){return -1;
}return null;
},setTopRightWidget:function(ew){var ex=this.__tj;

if(ex!=null){this.__sI.remove(ex);
}
if(ew!=null){this.__sI.add(ew);
}this.__tj=ew;
},getTopRightWidget:function(){return this.__tj;
},getHeader:function(){return this.__sG;
},getTablePane:function(){return this.__sH;
},getVerticalScrollBarWidth:function(){var fa=this.__sF;
return fa.isVisible()?(fa.getSizeHint().width||0):0;
},getNeededScrollBars:function(bn,bo){var bu=this.__sF.getSizeHint().width;
var bv=this.__sK.getInnerSize();
var bp=bv?bv.width:0;

if(this.getVerticalScrollBarVisible()){bp+=bu;
}var by=bv?bv.height:0;

if(this.getHorizontalScrollBarVisible()){by+=bu;
}var bs=this.getTable().getTableModel();
var bw=bs.getRowCount();
var bz=this.getTablePaneModel().getTotalWidth();
var bx=this.getTable().getRowHeight()*bw;
var br=false;
var bA=false;

if(bz>bp){br=true;

if(bx>by-bu){bA=true;
}}else if(bx>by){bA=true;

if(!bo&&(bz>bp-bu)){br=true;
}}var bt=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var bq=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
return ((bn||br)?bt:0)|((bo||!bA)?0:bq);
},getPaneClipper:function(){return this.__sK;
},_applyScrollTimeout:function(eR,eS){this._startInterval(eR);
},_startInterval:function(eX){this.__sM.setInterval(eX);
this.__sM.start();
},_stopInterval:function(){this.__sM.stop();
},_postponedUpdateContent:function(){this._updateContent();
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.__sP&&!this.__sH._layoutPending){this.__sP=false;
this._updateContent();
}}),_updateContent:function(){var dk=this.__sK.getInnerSize();

if(!dk){return;
}var dn=dk.height;
var scrollX=this.__sE.getPosition();
var scrollY=this.__sF.getPosition();
var dh=this.getTable().getRowHeight();
var di=Math.floor(scrollY/dh);
var dm=this.__sH.getFirstVisibleRow();
this.__sH.setFirstVisibleRow(di);
var dj=Math.ceil(dn/dh);
var dg=0;
var dl=this.getTable().getKeepFirstVisibleRowComplete();

if(!dl){dj++;
dg=scrollY%dh;
}this.__sH.setVisibleRowCount(dj);

if(di!=dm){this._updateFocusIndicator();
}this.__sK.scrollToX(scrollX);
if(!dl){this.__sK.scrollToY(dg);
}},_updateFocusIndicator:function(){var de=this.getTable();

if(!de.getEnabled()){return;
}this.__sL.moveToCell(this.__tf,this.__tg);
}},destruct:function(){this._stopInterval();
var fb=this.getTablePaneModel();

if(fb){fb.dispose();
}this.__ta=this.__tj=this.__sD=null;
this._disposeObjects(r,F,C,T,Q,a,t,I,M);
}});
})();
(function(){var b="qx.ui.core.scroll.IScrollBar",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"scroll":a},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(c){this.assertNumber(c);
},scrollBy:function(e){this.assertNumber(e);
},scrollBySteps:function(d){this.assertNumber(d);
}}});
})();
(function(){var l="horizontal",k="px",j="scroll",i="vertical",h="-1px",g="qx.client",f="0",d="hidden",c="mousedown",b="qx.ui.core.scroll.NativeScrollBar",A="PositiveNumber",z="Integer",y="mousemove",x="_applyMaximum",w="__mr",v="_applyOrientation",u="appear",t="opera",s="PositiveInteger",r="mshtml",p="mouseup",q="Number",n="_applyPosition",o="scrollbar",m="native";
qx.Class.define(b,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(U){qx.ui.core.Widget.call(this);
this.addState(m);
this.getContentElement().addListener(j,this._onScroll,this);
this.addListener(c,this._stopPropagation,this);
this.addListener(p,this._stopPropagation,this);
this.addListener(y,this._stopPropagation,this);

if(qx.core.Variant.isSet(g,t)){this.addListener(u,this._onAppear,this);
}this.getContentElement().add(this._getScrollPaneElement());
if(U!=null){this.setOrientation(U);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:o},orientation:{check:[l,i],init:l,apply:v},maximum:{check:s,apply:x,init:100},position:{check:q,init:0,apply:n,event:j},singleStep:{check:z,init:20},knobFactor:{check:A,nullable:true}},members:{__mq:null,__mr:null,_getScrollPaneElement:function(){if(!this.__mr){this.__mr=new qx.html.Element();
}return this.__mr;
},renderLayout:function(B,top,C,D){var E=qx.ui.core.Widget.prototype.renderLayout.call(this,B,top,C,D);
this._updateScrollBar();
return E;
},_getContentHint:function(){var S=qx.bom.element.Overflow.getScrollbarWidth();
return {width:this.__mq?100:S,maxWidth:this.__mq?null:S,minWidth:this.__mq?null:S,height:this.__mq?S:100,maxHeight:this.__mq?S:null,minHeight:this.__mq?S:null};
},_applyEnabled:function(H,I){qx.ui.core.Widget.prototype._applyEnabled.call(this,H,I);
this._updateScrollBar();
},_applyMaximum:function(T){this._updateScrollBar();
},_applyPosition:function(a){var content=this.getContentElement();

if(this.__mq){content.scrollToX(a);
}else{content.scrollToY(a);
}},_applyOrientation:function(K,L){var M=this.__mq=K===l;
this.set({allowGrowX:M,allowShrinkX:M,allowGrowY:!M,allowShrinkY:!M});

if(M){this.replaceState(i,l);
}else{this.replaceState(l,i);
}this.getContentElement().setStyles({overflowX:M?j:d,overflowY:M?d:j});
qx.ui.core.queue.Layout.add(this);
},_updateScrollBar:function(){var P=this.__mq;
var Q=this.getBounds();

if(!Q){return;
}
if(this.isEnabled()){var R=P?Q.width:Q.height;
var O=this.getMaximum()+R;
}else{O=0;
}if(qx.core.Variant.isSet(g,r)){var Q=this.getBounds();
this.getContentElement().setStyles({left:P?f:h,top:P?h:f,width:(P?Q.width:Q.width+1)+k,height:(P?Q.height+1:Q.height)+k});
}this._getScrollPaneElement().setStyles({left:0,top:0,width:(P?O:1)+k,height:(P?1:O)+k});
this.scrollTo(this.getPosition());
},scrollTo:function(J){this.setPosition(Math.max(0,Math.min(this.getMaximum(),J)));
},scrollBy:function(N){this.scrollTo(this.getPosition()+N);
},scrollBySteps:function(F){var G=this.getSingleStep();
this.scrollBy(F*G);
},_onScroll:function(e){var W=this.getContentElement();
var V=this.__mq?W.getScrollX():W.getScrollY();
this.setPosition(V);
},_onAppear:function(e){this.scrollTo(this.getPosition());
},_stopPropagation:function(e){e.stopPropagation();
}},destruct:function(){this._disposeObjects(w);
}});
})();
(function(){var m="slider",l="horizontal",k="button-begin",j="vertical",i="button-end",h="Integer",g="execute",f="right",d="left",c="down",B="up",A="PositiveNumber",z="changeValue",y="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",x="_applyKnobFactor",w="knob",v="qx.ui.core.scroll.ScrollBar",u="resize",t="_applyOrientation",s="_applyPageStep",q="PositiveInteger",r="scroll",o="_applyPosition",p="scrollbar",n="_applyMaximum";
qx.Class.define(v,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(F){qx.ui.core.Widget.call(this);
this._createChildControl(k);
this._createChildControl(m).addListener(u,this._onResizeSlider,this);
this._createChildControl(i);
if(F!=null){this.setOrientation(F);
}else{this.initOrientation();
}},properties:{appearance:{refine:true,init:p},orientation:{check:[l,j],init:l,apply:t},maximum:{check:q,apply:n,init:100},position:{check:y,init:0,apply:o,event:r},singleStep:{check:h,init:20},pageStep:{check:h,init:10,apply:s},knobFactor:{check:A,apply:x,nullable:true}},members:{__ms:2,_createChildControlImpl:function(a){var b;

switch(a){case m:b=new qx.ui.core.scroll.ScrollSlider();
b.setPageStep(100);
b.setFocusable(false);
b.addListener(z,this._onChangeSliderValue,this);
this._add(b,{flex:1});
break;
case k:b=new qx.ui.form.RepeatButton();
b.setFocusable(false);
b.addListener(g,this._onExecuteBegin,this);
this._add(b);
break;
case i:b=new qx.ui.form.RepeatButton();
b.setFocusable(false);
b.addListener(g,this._onExecuteEnd,this);
this._add(b);
break;
}return b||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,a);
},_applyMaximum:function(E){this.getChildControl(m).setMaximum(E);
},_applyPosition:function(G){this.getChildControl(m).setValue(G);
},_applyKnobFactor:function(D){this.getChildControl(m).setKnobFactor(D);
},_applyPageStep:function(M){this.getChildControl(m).setPageStep(M);
},_applyOrientation:function(J,K){var L=this._getLayout();

if(L){L.dispose();
}if(J===l){this._setLayout(new qx.ui.layout.HBox());
this.setAllowStretchX(true);
this.setAllowStretchY(false);
this.replaceState(j,l);
this.getChildControl(k).replaceState(B,d);
this.getChildControl(i).replaceState(c,f);
}else{this._setLayout(new qx.ui.layout.VBox());
this.setAllowStretchX(false);
this.setAllowStretchY(true);
this.replaceState(l,j);
this.getChildControl(k).replaceState(d,B);
this.getChildControl(i).replaceState(f,c);
}this.getChildControl(m).setOrientation(J);
},scrollTo:function(N){this.getChildControl(m).slideTo(N);
},scrollBy:function(C){this.getChildControl(m).slideBy(C);
},scrollBySteps:function(H){var I=this.getSingleStep();
this.getChildControl(m).slideBy(H*I);
},_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep());
},_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep());
},_onChangeSliderValue:function(e){this.setPosition(e.getData());
},_onResizeSlider:function(e){var O=this.getChildControl(m).getChildControl(w);
var R=O.getSizeHint();
var P=false;
var Q=this.getChildControl(m).getInnerSize();

if(this.getOrientation()==j){if(Q.height<R.minHeight+this.__ms){P=true;
}}else{if(Q.width<R.minWidth+this.__ms){P=true;
}}
if(P){O.exclude();
}else{O.show();
}}}});
})();
(function(){var b="qx.ui.form.INumberForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var a="qx.ui.form.IRange";
qx.Interface.define(a,{members:{setMinimum:function(e){return arguments.length==1;
},getMinimum:function(){},setMaximum:function(d){return arguments.length==1;
},getMaximum:function(){},setSingleStep:function(b){return arguments.length==1;
},getSingleStep:function(){},setPageStep:function(c){return arguments.length==1;
},getPageStep:function(){}}});
})();
(function(){var p="knob",o="horizontal",n="vertical",m="Integer",l="hovered",k="left",j="top",i="mouseup",h="pressed",g="px",bb="changeValue",ba="interval",Y="mousemove",X="resize",W="slider",V="mousedown",U="PageUp",T="mouseout",S='qx.event.type.Data',R="Left",w="Down",x="Up",u="dblclick",v="qx.ui.form.Slider",s="PageDown",t="mousewheel",q="_applyValue",r="_applyKnobFactor",y="End",z="height",G="Right",E="width",K="_applyOrientation",I="Home",N="mouseover",M="floor",B="_applyMinimum",Q="click",P="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",O="keypress",A="ceil",C="losecapture",D="contextmenu",F="_applyMaximum",H="Number",J="changeMaximum",L="changeMinimum";
qx.Class.define(v,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(bR){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas());
this.addListener(O,this._onKeyPress);
this.addListener(t,this._onMouseWheel);
this.addListener(V,this._onMouseDown);
this.addListener(i,this._onMouseUp);
this.addListener(C,this._onMouseUp);
this.addListener(X,this._onUpdate);
this.addListener(D,this._onStopEvent);
this.addListener(Q,this._onStopEvent);
this.addListener(u,this._onStopEvent);
if(bR!=null){this.setOrientation(bR);
}else{this.initOrientation();
}},events:{changeValue:S},properties:{appearance:{refine:true,init:W},focusable:{refine:true,init:true},orientation:{check:[o,n],init:o,apply:K},value:{check:P,init:0,apply:q,nullable:true},minimum:{check:m,init:0,apply:B,event:L},maximum:{check:m,init:100,apply:F,event:J},singleStep:{check:m,init:1},pageStep:{check:m,init:10},knobFactor:{check:H,apply:r,nullable:true}},members:{__mt:null,__mu:null,__mv:null,__mw:null,__mx:null,__my:null,__mz:null,__mA:null,__mB:null,__mC:null,__mD:null,__mE:null,_forwardStates:{invalid:true},_createChildControlImpl:function(bP){var bQ;

switch(bP){case p:bQ=new qx.ui.core.Widget();
bQ.addListener(X,this._onUpdate,this);
bQ.addListener(N,this._onMouseOver);
bQ.addListener(T,this._onMouseOut);
this._add(bQ);
break;
}return bQ||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bP);
},_onMouseOver:function(e){this.addState(l);
},_onMouseOut:function(e){this.removeState(l);
},_onMouseWheel:function(e){var bK=e.getWheelDelta()>0?1:-1;
this.slideBy(bK*this.getSingleStep());
e.stop();
},_onKeyPress:function(e){var cf=this.getOrientation()===o;
var ce=cf?R:x;
var forward=cf?G:w;

switch(e.getKeyIdentifier()){case forward:this.slideForward();
break;
case ce:this.slideBack();
break;
case s:this.slidePageForward();
break;
case U:this.slidePageBack();
break;
case I:this.slideToBegin();
break;
case y:this.slideToEnd();
break;
default:return;
}e.stop();
},_onMouseDown:function(e){if(this.__mw){return;
}var bE=this.__mG;
var bC=this.getChildControl(p);
var bD=bE?k:j;
var bG=bE?e.getDocumentLeft():e.getDocumentTop();
var bH=this.__mt=qx.bom.element.Location.get(this.getContentElement().getDomElement())[bD];
var bF=this.__mu=qx.bom.element.Location.get(bC.getContainerElement().getDomElement())[bD];

if(e.getTarget()===bC){this.__mw=true;

if(!this.__mC){this.__mC=new qx.event.Timer(100);
this.__mC.addListener(ba,this._fireValue,this);
}this.__mC.start();
this.__mx=bG+bH-bF;
bC.addState(h);
}else{this.__my=true;
this.__mz=bG<=bF?-1:1;
this.__mH(e);
this._onInterval();
if(!this.__mB){this.__mB=new qx.event.Timer(100);
this.__mB.addListener(ba,this._onInterval,this);
}this.__mB.start();
}this.addListener(Y,this._onMouseMove);
this.capture();
e.stopPropagation();
},_onMouseUp:function(e){if(this.__mw){this.releaseCapture();
delete this.__mw;
this.__mC.stop();
this._fireValue();
delete this.__mx;
this.getChildControl(p).removeState(h);
if(e.getType()===i){var bd;
var be;
var bc;

if(this.__mG){bd=e.getDocumentLeft()-(this._valueToPosition(this.getValue())+this.__mt);
bc=qx.bom.element.Location.get(this.getContentElement().getDomElement())[j];
be=e.getDocumentTop()-(bc+this.getChildControl(p).getBounds().top);
}else{bd=e.getDocumentTop()-(this._valueToPosition(this.getValue())+this.__mt);
bc=qx.bom.element.Location.get(this.getContentElement().getDomElement())[k];
be=e.getDocumentLeft()-(bc+this.getChildControl(p).getBounds().left);
}
if(be<0||be>this.__mv||bd<0||bd>this.__mv){this.getChildControl(p).removeState(l);
}}}else if(this.__my){this.__mB.stop();
this.releaseCapture();
delete this.__my;
delete this.__mz;
delete this.__mA;
}this.removeListener(Y,this._onMouseMove);
if(e.getType()===i){e.stopPropagation();
}},_onMouseMove:function(e){if(this.__mw){var bY=this.__mG?e.getDocumentLeft():e.getDocumentTop();
var bX=bY-this.__mx;
this.slideTo(this._positionToValue(bX));
}else if(this.__my){this.__mH(e);
}e.stopPropagation();
},_onInterval:function(e){var d=this.getValue()+(this.__mz*this.getPageStep());
if(d<this.getMinimum()){d=this.getMinimum();
}else if(d>this.getMaximum()){d=this.getMaximum();
}var f=this.__mz==-1;

if((f&&d<=this.__mA)||(!f&&d>=this.__mA)){d=this.__mA;
}this.slideTo(d);
},_onUpdate:function(e){var bg=this.getInnerSize();
var bh=this.getChildControl(p).getBounds();
var bf=this.__mG?E:z;
this._updateKnobSize();
this.__mF=bg[bf]-bh[bf];
this.__mv=bh[bf];
this._updateKnobPosition();
},__mG:false,__mF:0,__mH:function(e){var bk=this.__mG;
var br=bk?e.getDocumentLeft():e.getDocumentTop();
var bt=this.__mt;
var bl=this.__mu;
var bv=this.__mv;
var bs=br-bt;

if(br>=bl){bs-=bv;
}var bp=this._positionToValue(bs);
var bm=this.getMinimum();
var bn=this.getMaximum();

if(bp<bm){bp=bm;
}else if(bp>bn){bp=bn;
}else{var bq=this.getValue();
var bo=this.getPageStep();
var bu=this.__mz<0?M:A;
bp=bq+(Math[bu]((bp-bq)/bo)*bo);
}if(this.__mA==null||(this.__mz==-1&&bp<=this.__mA)||(this.__mz==1&&bp>=this.__mA)){this.__mA=bp;
}},_positionToValue:function(ca){var cb=this.__mF;
if(cb==null||cb==0){return 0;
}var cd=ca/cb;

if(cd<0){cd=0;
}else if(cd>1){cd=1;
}var cc=this.getMaximum()-this.getMinimum();
return this.getMinimum()+Math.round(cc*cd);
},_valueToPosition:function(by){var bz=this.__mF;

if(bz==null){return 0;
}var bA=this.getMaximum()-this.getMinimum();
if(bA==0){return 0;
}var by=by-this.getMinimum();
var bB=by/bA;

if(bB<0){bB=0;
}else if(bB>1){bB=1;
}return Math.round(bz*bB);
},_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));
},_setKnobPosition:function(bw){var bx=this.getChildControl(p).getContainerElement();

if(this.__mG){bx.setStyle(k,bw+g,true);
}else{bx.setStyle(j,bw+g,true);
}},_updateKnobSize:function(){var bT=this.getKnobFactor();

if(bT==null){return;
}var bS=this.getInnerSize();

if(bS==null){return;
}if(this.__mG){this.getChildControl(p).setWidth(Math.round(bT*bS.width));
}else{this.getChildControl(p).setHeight(Math.round(bT*bS.height));
}},slideToBegin:function(){this.slideTo(this.getMinimum());
},slideToEnd:function(){this.slideTo(this.getMaximum());
},slideForward:function(){this.slideBy(this.getSingleStep());
},slideBack:function(){this.slideBy(-this.getSingleStep());
},slidePageForward:function(){this.slideBy(this.getPageStep());
},slidePageBack:function(){this.slideBy(-this.getPageStep());
},slideBy:function(bL){this.slideTo(this.getValue()+bL);
},slideTo:function(bM){if(bM<this.getMinimum()){bM=this.getMinimum();
}else if(bM>this.getMaximum()){bM=this.getMaximum();
}else{bM=this.getMinimum()+Math.round((bM-this.getMinimum())/this.getSingleStep())*this.getSingleStep();
}this.setValue(bM);
},_applyOrientation:function(a,b){var c=this.getChildControl(p);
this.__mG=a===o;
if(this.__mG){this.removeState(n);
c.removeState(n);
this.addState(o);
c.addState(o);
c.setLayoutProperties({top:0,right:null,bottom:0});
}else{this.removeState(o);
c.removeState(o);
this.addState(n);
c.addState(n);
c.setLayoutProperties({right:0,bottom:null,left:0});
}this._updateKnobPosition();
},_applyKnobFactor:function(bI,bJ){if(bI!=null){this._updateKnobSize();
}else{if(this.__mG){this.getChildControl(p).resetWidth();
}else{this.getChildControl(p).resetHeight();
}}},_applyValue:function(bi,bj){if(bi!=null){this._updateKnobPosition();

if(this.__mw){this.__mE=[bi,bj];
}else{this.fireEvent(bb,qx.event.type.Data,[bi,bj]);
}}else{this.resetValue();
}},_fireValue:function(){if(!this.__mE){return;
}var bW=this.__mE;
this.__mE=null;
this.fireEvent(bb,qx.event.type.Data,bW);
},_applyMinimum:function(bU,bV){if(this.getValue()<bU){this.setValue(bU);
}this._updateKnobPosition();
},_applyMaximum:function(bN,bO){if(this.getValue()>bN){this.setValue(bN);
}this._updateKnobPosition();
}}});
})();
(function(){var d="horizontal",c="mousewheel",b="qx.ui.core.scroll.ScrollSlider",a="keypress";
qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(g){qx.ui.form.Slider.call(this,g);
this.removeListener(a,this._onKeyPress);
this.removeListener(c,this._onMouseWheel);
},members:{getSizeHint:function(e){var f=qx.ui.form.Slider.prototype.getSizeHint.call(this);
if(this.getOrientation()===d){f.width=0;
}else{f.height=0;
}return f;
}}});
})();
(function(){var a="qx.ui.table.pane.Clipper";
qx.Class.define(a,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this,new qx.ui.layout.Grow());
this.setMinWidth(0);
},members:{scrollToX:function(c){this.getContentElement().scrollToX(c,false);
},scrollToY:function(b){this.getContentElement().scrollToY(b,true);
}}});
})();
(function(){var g="Integer",f="Escape",d="keypress",c="Enter",b="excluded",a="qx.ui.table.pane.FocusIndicator";
qx.Class.define(a,{extend:qx.ui.container.Composite,construct:function(p){qx.ui.container.Composite.call(this);
this.__tm=p;
this.setKeepActive(true);
this.addListener(d,this._onKeyPress,this);
},properties:{visibility:{refine:true,init:b},row:{check:g,nullable:true},column:{check:g,nullable:true}},members:{__tm:null,_onKeyPress:function(e){var q=e.getKeyIdentifier();

if(q!==f&&q!==c){e.stopPropagation();
}},moveToCell:function(h,i){if(h==null){this.hide();
this.setRow(null);
this.setColumn(null);
}else{var j=this.__tm.getTablePaneModel().getX(h);

if(j==-1){this.hide();
this.setRow(null);
this.setColumn(null);
}else{var o=this.__tm.getTable();
var m=o.getTableColumnModel();
var n=this.__tm.getTablePaneModel();
var l=this.__tm.getTablePane().getFirstVisibleRow();
var k=o.getRowHeight();
this.setUserBounds(n.getColumnLeft(h)-2,(i-l)*k-2,m.getColumnWidth(h)+3,k+3);
this.show();
this.setRow(i);
this.setColumn(h);
}}}},destruct:function(){this.__tm=null;
}});
})();
(function(){var b="Integer",a="qx.ui.table.pane.CellEvent";
qx.Class.define(a,{extend:qx.event.type.Mouse,properties:{row:{check:b,nullable:true},column:{check:b,nullable:true}},members:{init:function(c,d,e,f){d.clone(this);
this.setBubbles(false);

if(e!=null){this.setRow(e);
}else{this.setRow(c._getRowForPagePos(this.getDocumentLeft(),this.getDocumentTop()));
}
if(f!=null){this.setColumn(f);
}else{this.setColumn(c._getColumnForPageX(this.getDocumentLeft()));
}},clone:function(g){var h=qx.event.type.Mouse.prototype.clone.call(this,g);
h.set({row:this.getRow(),column:this.getColumn()});
return h;
}}});
})();
(function(){var a="qx.lang.Number";
qx.Class.define(a,{statics:{isInRange:function(h,i,j){return h>=i&&h<=j;
},isBetweenRange:function(e,f,g){return e>f&&e<g;
},limit:function(b,c,d){if(d!=null&&b>d){return d;
}else if(c!=null&&b<c){return c;
}else{return b;
}}}});
})();
(function(){var g="Number",f="qx.event.type.Event",e="_applyFirstColumnX",d="Integer",c="qx.ui.table.pane.Model",b="_applyMaxColumnCount",a="visibilityChangedPre";
qx.Class.define(c,{extend:qx.core.Object,construct:function(w){qx.core.Object.call(this);
w.addListener(a,this._onColVisibilityChanged,this);
this.__tn=w;
},events:{"modelChanged":f},statics:{EVENT_TYPE_MODEL_CHANGED:"modelChanged"},properties:{firstColumnX:{check:d,init:0,apply:e},maxColumnCount:{check:g,init:-1,apply:b}},members:{__to:null,__tn:null,_applyFirstColumnX:function(o,p){this.__to=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},_applyMaxColumnCount:function(t,u){this.__to=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},setTableColumnModel:function(v){this.__tn=v;
this.__to=null;
},_onColVisibilityChanged:function(j){this.__to=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},getColumnCount:function(){if(this.__to==null){var q=this.getFirstColumnX();
var s=this.getMaxColumnCount();
var r=this.__tn.getVisibleColumnCount();

if(s==-1||(q+s)>r){this.__to=r-q;
}else{this.__to=s;
}}return this.__to;
},getColumnAtX:function(h){var i=this.getFirstColumnX();
return this.__tn.getVisibleColumnAtX(i+h);
},getX:function(y){var z=this.getFirstColumnX();
var A=this.getMaxColumnCount();
var x=this.__tn.getVisibleX(y)-z;

if(x>=0&&(A==-1||x<A)){return x;
}else{return -1;
}},getColumnLeft:function(k){var n=0;
var m=this.getColumnCount();

for(var x=0;x<m;x++){var l=this.getColumnAtX(x);

if(l==k){return n;
}n+=this.__tn.getColumnWidth(l);
}return -1;
},getTotalWidth:function(){var B=0;
var C=this.getColumnCount();

for(var x=0;x<C;x++){var D=this.getColumnAtX(x);
B+=this.__tn.getColumnWidth(D);
}return B;
}},destruct:function(){this.__tn=null;
}});
})();
(function(){var d="qx.event.type.Data",c="qx.event.type.Event",b="qx.ui.table.ITableModel";
qx.Interface.define(b,{events:{"dataChanged":d,"metaDataChanged":c,"sorted":d},members:{getRowCount:function(){},getRowData:function(r){},getColumnCount:function(){},getColumnId:function(e){},getColumnIndexById:function(o){},getColumnName:function(l){},isColumnEditable:function(w){},isColumnSortable:function(a){},sortByColumn:function(p,q){},getSortColumnIndex:function(){},isSortAscending:function(){},prefetchRows:function(s,t){},getValue:function(m,n){},getValueById:function(u,v){},setValue:function(f,g,h){},setValueById:function(i,j,k){}}});
})();
(function(){var x="metaDataChanged",w="qx.event.type.Data",v="qx.event.type.Event",u="abstract",t="qx.ui.table.model.Abstract";
qx.Class.define(t,{type:u,extend:qx.core.Object,implement:qx.ui.table.ITableModel,events:{"dataChanged":w,"metaDataChanged":v,"sorted":w},construct:function(){qx.core.Object.call(this);
this.__tp=[];
this.__tq=[];
this.__tr={};
},members:{__tp:null,__tq:null,__tr:null,__ts:null,init:function(c){},getRowCount:function(){throw new Error("getRowCount is abstract");
},getRowData:function(e){return null;
},isColumnEditable:function(l){return false;
},isColumnSortable:function(g){return false;
},sortByColumn:function(r,s){},getSortColumnIndex:function(){return -1;
},isSortAscending:function(){return true;
},prefetchRows:function(p,q){},getValue:function(F,G){throw new Error("getValue is abstract");
},getValueById:function(C,D){return this.getValue(this.getColumnIndexById(C),D);
},setValue:function(m,n,o){throw new Error("setValue is abstract");
},setValueById:function(h,j,k){this.setValue(this.getColumnIndexById(h),j,k);
},getColumnCount:function(){return this.__tp.length;
},getColumnIndexById:function(E){return this.__tr[E];
},getColumnId:function(f){return this.__tp[f];
},getColumnName:function(b){return this.__tq[b];
},setColumnIds:function(a){this.__tp=a;
this.__tr={};

for(var i=0;i<a.length;i++){this.__tr[a[i]]=i;
}this.__tq=new Array(a.length);
if(!this.__ts){this.fireEvent(x);
}},setColumnNamesByIndex:function(d){if(this.__tp.length!=d.length){throw new Error("this.__columnIdArr and columnNameArr have different length: "+this.__tp.length+" != "+d.length);
}this.__tq=d;
this.fireEvent(x);
},setColumnNamesById:function(y){this.__tq=new Array(this.__tp.length);

for(var i=0;i<this.__tp.length;++i){this.__tq[i]=y[this.__tp[i]];
}},setColumns:function(z,A){var B=this.__tp.length==0||A;

if(A==null){if(this.__tp.length==0){A=z;
}else{A=this.__tp;
}}
if(A.length!=z.length){throw new Error("columnIdArr and columnNameArr have different length: "+A.length+" != "+z.length);
}
if(B){this.__ts=true;
this.setColumnIds(A);
this.__ts=false;
}this.setColumnNamesByIndex(z);
}},destruct:function(){this.__tp=this.__tq=this.__tr=null;
}});
})();
(function(){var w="dataChanged",v="metaDataChanged",u="qx.ui.table.model.Simple",t="Boolean",s="sorted";
qx.Class.define(u,{extend:qx.ui.table.model.Abstract,construct:function(){qx.ui.table.model.Abstract.call(this);
this.__tt=[];
this.__tu=-1;
this.__tv=[];
this.__tw=null;
},properties:{caseSensitiveSorting:{check:t,init:true}},statics:{_defaultSortComparatorAscending:function(e,f){var g=e[arguments.callee.columnIndex];
var h=f[arguments.callee.columnIndex];

if(qx.lang.Type.isNumber(g)&&qx.lang.Type.isNumber(h)){var k=isNaN(g)?isNaN(h)?0:1:isNaN(h)?-1:null;

if(k!=null){return k;
}}return (g>h)?1:((g==h)?0:-1);
},_defaultSortComparatorInsensitiveAscending:function(W,X){var Y=(W[arguments.callee.columnIndex].toLowerCase?W[arguments.callee.columnIndex].toLowerCase():W[arguments.callee.columnIndex]);
var ba=(X[arguments.callee.columnIndex].toLowerCase?X[arguments.callee.columnIndex].toLowerCase():X[arguments.callee.columnIndex]);

if(qx.lang.Type.isNumber(Y)&&qx.lang.Type.isNumber(ba)){var bb=isNaN(Y)?isNaN(ba)?0:1:isNaN(ba)?-1:null;

if(bb!=null){return bb;
}}return (Y>ba)?1:((Y==ba)?0:-1);
},_defaultSortComparatorDescending:function(bo,bp){var bq=bo[arguments.callee.columnIndex];
var br=bp[arguments.callee.columnIndex];

if(qx.lang.Type.isNumber(bq)&&qx.lang.Type.isNumber(br)){var bs=isNaN(bq)?isNaN(br)?0:1:isNaN(br)?-1:null;

if(bs!=null){return bs;
}}return (bq<br)?1:((bq==br)?0:-1);
},_defaultSortComparatorInsensitiveDescending:function(K,L){var M=(K[arguments.callee.columnIndex].toLowerCase?K[arguments.callee.columnIndex].toLowerCase():K[arguments.callee.columnIndex]);
var N=(L[arguments.callee.columnIndex].toLowerCase?L[arguments.callee.columnIndex].toLowerCase():L[arguments.callee.columnIndex]);

if(qx.lang.Type.isNumber(M)&&qx.lang.Type.isNumber(N)){var O=isNaN(M)?isNaN(N)?0:1:isNaN(N)?-1:null;

if(O!=null){return O;
}}return (M<N)?1:((M==N)?0:-1);
}},members:{__tt:null,__tw:null,__tx:null,__tv:null,__tu:null,__ty:null,getRowData:function(bB){var bC=this.__tt[bB];

if(bC==null||bC.originalData==null){return bC;
}else{return bC.originalData;
}},getRowDataAsMap:function(bt){var bv=this.__tt[bt];
var bu={};

for(var bw=0;bw<this.getColumnCount();bw++){bu[this.getColumnId(bw)]=bv[bw];
}return bu;
},getDataAsMapArray:function(){var bE=this.getRowCount();
var bD=[];

for(var i=0;i<bE;i++){bD.push(this.getRowDataAsMap(i));
}return bD;
},setEditable:function(U){this.__tw=[];

for(var V=0;V<this.getColumnCount();V++){this.__tw[V]=U;
}this.fireEvent(v);
},setColumnEditable:function(bm,bn){if(bn!=this.isColumnEditable(bm)){if(this.__tw==null){this.__tw=[];
}this.__tw[bm]=bn;
this.fireEvent(v);
}},isColumnEditable:function(bx){return this.__tw?(this.__tw[bx]==true):false;
},setColumnSortable:function(bF,bG){if(bG!=this.isColumnSortable(bF)){if(this.__tx==null){this.__tx=[];
}this.__tx[bF]=bG;
this.fireEvent(v);
}},isColumnSortable:function(E){return (this.__tx?(this.__tx[E]!==false):true);
},sortByColumn:function(F,G){var J;
var I=this.__tv[F];

if(I){J=(G?I.ascending:I.descending);
}else{if(this.getCaseSensitiveSorting()){J=(G?qx.ui.table.model.Simple._defaultSortComparatorAscending:qx.ui.table.model.Simple._defaultSortComparatorDescending);
}else{J=(G?qx.ui.table.model.Simple._defaultSortComparatorInsensitiveAscending:qx.ui.table.model.Simple._defaultSortComparatorInsensitiveDescending);
}}J.columnIndex=F;
this.__tt.sort(J);
this.__tu=F;
this.__ty=G;
var H={columnIndex:F,ascending:G};
this.fireDataEvent(s,H);
this.fireEvent(v);
},setSortMethods:function(by,bz){var bA;

if(qx.lang.Type.isFunction(bz)){bA={ascending:bz,descending:function(l,m){return bz(m,l);
}};
}else{bA=bz;
}this.__tv[by]=bA;
},getSortMethods:function(r){return this.__tv[r];
},clearSorting:function(){if(this.__tu!=-1){this.__tu=-1;
this.__ty=true;
this.fireEvent(v);
}},getSortColumnIndex:function(){return this.__tu;
},isSortAscending:function(){return this.__ty;
},getRowCount:function(){return this.__tt.length;
},getValue:function(S,T){if(T<0||T>=this.__tt.length){throw new Error("this.__rowArr out of bounds: "+T+" (0.."+this.__tt.length+")");
}return this.__tt[T][S];
},setValue:function(bc,bd,be){if(this.__tt[bd][bc]!=be){this.__tt[bd][bc]=be;
if(this.hasListener(w)){var bf={firstRow:bd,lastRow:bd,firstColumn:bc,lastColumn:bc};
this.fireDataEvent(w,bf);
}
if(bc==this.__tu){this.clearSorting();
}}},setData:function(x,y){this.__tt=x;
if(this.hasListener(w)){var z={firstRow:0,lastRow:x.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(w,z);
}
if(y!==false){this.clearSorting();
}},getData:function(){return this.__tt;
},setDataAsMapArray:function(P,Q,R){this.setData(this._mapArray2RowArr(P,Q),R);
},addRows:function(bL,bM,bN){if(bM==null){bM=this.__tt.length;
}bL.splice(0,0,bM,0);
Array.prototype.splice.apply(this.__tt,bL);
var bO={firstRow:bM,lastRow:this.__tt.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(w,bO);

if(bN!==false){this.clearSorting();
}},addRowsAsMapArray:function(n,o,p,q){this.addRows(this._mapArray2RowArr(n,p),o,q);
},setRows:function(A,B,C){if(B==null){B=0;
}A.splice(0,0,B,A.length);
Array.prototype.splice.apply(this.__tt,A);
var D={firstRow:B,lastRow:this.__tt.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(w,D);

if(C!==false){this.clearSorting();
}},setRowsAsMapArray:function(bH,bI,bJ,bK){this.setRows(this._mapArray2RowArr(bH,bJ),bI,bK);
},removeRows:function(a,b,c){this.__tt.splice(a,b);
var d={firstRow:a,lastRow:this.__tt.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1,removeStart:a,removeCount:b};
this.fireDataEvent(w,d);

if(c!==false){this.clearSorting();
}},_mapArray2RowArr:function(bg,bh){var bl=bg.length;
var bi=this.getColumnCount();
var bk=new Array(bl);
var bj;

for(var i=0;i<bl;++i){bj=[];

if(bh){bj.originalData=bg[i];
}
for(var j=0;j<bi;++j){bj[j]=bg[i][this.getColumnId(j)];
}bk[i]=bj;
}return bk;
}},destruct:function(){this.__tt=this.__tw=this.__tv=this.__tx=null;
}});
})();
(function(){var A="",z="!",y="'!",x="'",w="Expected '",v="' (rgb(",u=",",t=")), but found value '",s="Event (",r="Expected value to be the CSS color '",bH="' but found ",bG="The value '",bF=" != ",bE="qx.core.Object",bD="Expected value to be an array but found ",bC=") was fired.",bB="Expected value to be an integer >= 0 but found ",bA="' to be not equal with '",bz="' to '",by="qx.ui.core.Widget",H="Called assertTrue with '",I="Expected value to be a map but found ",F="The function did not raise an exception!",G="Expected value to be undefined but found ",D="Expected value to be a DOM element but found  '",E="Expected value to be a regular expression but found ",B="' to implement the interface '",C="Expected value to be null but found ",P="Invalid argument 'type'",Q="Called assert with 'false'",bd="Assertion error! ",Y="Expected value to be a string but found ",bl="null",bg="' but found '",bu="' must must be a key of the map '",bq="The String '",U="Expected value not to be undefined but found ",bx="qx.util.ColorUtil",bw=": ",bv="The raised exception does not have the expected type! ",T=") not fired.",W="qx.core.Assert",X="Expected value to be typeof object but found ",bb="' (identical) but found '",be="' must have any of the values defined in the array '",bh="Expected value to be a number but found ",bn="Called assertFalse with '",bs="]",J="Expected value to be a qooxdoo object but found ",K="' arguments.",V="Expected value not to be null but found ",bk="Array[",bj="' does not match the regular expression '",bi="' to be not identical with '",bp="' arguments but found '",bo="', which cannot be converted to a CSS color!",bf="Expected object '",bm="qx.core.AssertionError",o="Expected value to be a boolean but found ",br="))!",L="Expected value to be a qooxdoo widget but found ",M="Expected value '%1' to be in the range '%2'..'%3'!",ba="Expected value to be typeof '",p="Expected value to be typeof function but found ",q="Expected value to be an integer but found ",S="Called fail().",N="The parameter 're' must be a string or a regular expression.",O="Expected value to be a number >= 0 but found ",R="Expected value to be instanceof '",bc="Wrong number of arguments given. Expected '",bt="object";
qx.Class.define(W,{statics:{__tz:true,__tA:function(dl,dm){var dn=A;

for(var i=1,l=arguments.length;i<l;i++){dn=dn+this.__tB(arguments[i]);
}var dq=bd+dl+bw+dn;

if(this.__tz){qx.Bootstrap.error(dq);
}
if(qx.Class.isDefined(bm)){var dp=new qx.core.AssertionError(dl,dn);

if(this.__tz){qx.Bootstrap.error("Stack trace: \n"+dp.getStackTrace());
}throw dp;
}else{throw new Error(dq);
}},__tB:function(bP){var bQ;

if(bP===null){bQ=bl;
}else if(qx.lang.Type.isArray(bP)&&bP.length>10){bQ=bk+bP.length+bs;
}else if((bP instanceof Object)&&(bP.toString==null)){bQ=qx.lang.Json.stringify(bP,null,2);
}else{try{bQ=bP.toString();
}catch(e){bQ=A;
}}return bQ;
},assert:function(bT,bU){bT==true||this.__tA(bU||A,Q);
},fail:function(d){this.__tA(d||A,S);
},assertTrue:function(dI,dJ){(dI===true)||this.__tA(dJ||A,H,dI,x);
},assertFalse:function(ck,cl){(ck===false)||this.__tA(cl||A,bn,ck,x);
},assertEquals:function(dd,de,df){dd==de||this.__tA(df||A,w,dd,bg,de,y);
},assertNotEquals:function(cA,cB,cC){cA!=cB||this.__tA(cC||A,w,cA,bA,cB,y);
},assertIdentical:function(co,cp,cq){co===cp||this.__tA(cq||A,w,co,bb,cp,y);
},assertNotIdentical:function(da,db,dc){da!==db||this.__tA(dc||A,w,da,bi,db,y);
},assertNotUndefined:function(cO,cP){cO!==undefined||this.__tA(cP||A,U,cO,z);
},assertUndefined:function(cM,cN){cM===undefined||this.__tA(cN||A,G,cM,z);
},assertNotNull:function(cr,cs){cr!==null||this.__tA(cs||A,V,cr,z);
},assertNull:function(cf,cg){cf===null||this.__tA(cg||A,C,cf,z);
},assertJsonEquals:function(cW,cX,cY){this.assertEquals(qx.lang.Json.stringify(cW),qx.lang.Json.stringify(cX),cY);
},assertMatch:function(bV,bW,bX){this.assertString(bV);
this.assert(qx.lang.Type.isRegExp(bW)||qx.lang.Type.isString(bW),N);
bV.search(bW)>=0||this.__tA(bX||A,bq,bV,bj,bW.toString(),y);
},assertArgumentsCount:function(dK,dL,dM,dN){var dO=dK.length;
(dO>=dL&&dO<=dM)||this.__tA(dN||A,bc,dL,bz,dM,bp,arguments.length,K);
},assertEventFired:function(dr,event,ds,dt,du){var dw=false;
var dv=function(e){if(dt){dt.call(dr,e);
}dw=true;
};
var dx=dr.addListener(event,dv,dr);
ds.call();
dw===true||this.__tA(du||A,s,event,T);
dr.removeListenerById(dx);
},assertEventNotFired:function(cQ,event,cR,cS){var cU=false;
var cT=function(e){cU=true;
};
var cV=cQ.addListener(event,cT,cQ);
cR.call();
cU===false||this.__tA(cS||A,s,event,bC);
cQ.removeListenerById(cV);
},assertException:function(f,g,h,j){var g=g||Error;
var k;

try{this.__tz=false;
f();
}catch(ce){k=ce;
}finally{this.__tz=true;
}
if(k==null){this.__tA(j||A,F);
}k instanceof g||this.__tA(j||A,bv,g,bF,k);

if(h){this.assertMatch(k.toString(),h,j);
}},assertInArray:function(cD,cE,cF){cE.indexOf(cD)!==-1||this.__tA(cF||A,bG,cD,be,cE,x);
},assertArrayEquals:function(ch,ci,cj){this.assertArray(ch,cj);
this.assertArray(ci,cj);
this.assertEquals(ch.length,ci.length,cj);

for(var i=0;i<ch.length;i++){this.assertIdentical(ch[i],ci[i],cj);
}},assertKeyInMap:function(bY,ca,cb){ca[bY]!==undefined||this.__tA(cb||A,bG,bY,bu,ca,x);
},assertFunction:function(dG,dH){qx.lang.Type.isFunction(dG)||this.__tA(dH||A,p,dG,z);
},assertString:function(bR,bS){qx.lang.Type.isString(bR)||this.__tA(bS||A,Y,bR,z);
},assertBoolean:function(m,n){qx.lang.Type.isBoolean(m)||this.__tA(n||A,o,m,z);
},assertNumber:function(cK,cL){(qx.lang.Type.isNumber(cK)&&isFinite(cK))||this.__tA(cL||A,bh,cK,z);
},assertPositiveNumber:function(cm,cn){(qx.lang.Type.isNumber(cm)&&isFinite(cm)&&cm>=0)||this.__tA(cn||A,O,cm,z);
},assertInteger:function(dU,dV){(qx.lang.Type.isNumber(dU)&&isFinite(dU)&&dU%1===0)||this.__tA(dV||A,q,dU,z);
},assertPositiveInteger:function(di,dj){var dk=(qx.lang.Type.isNumber(di)&&isFinite(di)&&di%1===0&&di>=0);
dk||this.__tA(dj||A,bB,di,z);
},assertInRange:function(ct,cu,cv,cw){(ct>=cu&&ct<=cv)||this.__tA(cw||A,qx.lang.String.format(M,[ct,cu,cv]));
},assertObject:function(a,b){var c=a!==null&&(qx.lang.Type.isObject(a)||typeof a===bt);
c||this.__tA(b||A,X,(a),z);
},assertArray:function(dS,dT){qx.lang.Type.isArray(dS)||this.__tA(dT||A,bD,dS,z);
},assertMap:function(dg,dh){qx.lang.Type.isObject(dg)||this.__tA(dh||A,I,dg,z);
},assertRegExp:function(cc,cd){qx.lang.Type.isRegExp(cc)||this.__tA(cd||A,E,cc,z);
},assertType:function(bM,bN,bO){this.assertString(bN,P);
typeof (bM)===bN||this.__tA(bO||A,ba,bN,bH,bM,z);
},assertInstance:function(cG,cH,cI){var cJ=cH.classname||cH+A;
cG instanceof cH||this.__tA(cI||A,R,cJ,bH,cG,z);
},assertInterface:function(dP,dQ,dR){qx.Class.implementsInterface(dP,dQ)||this.__tA(dR||A,bf,dP,B,dQ,y);
},assertCssColor:function(dz,dA,dB){var dC=qx.Class.getByName(bx);

if(!dC){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");
}var dE=dC.stringToRgb(dz);

try{var dD=dC.stringToRgb(dA);
}catch(dy){this.__tA(dB||A,r,dz,v,dE.join(u),t,dA,bo);
}var dF=dE[0]==dD[0]&&dE[1]==dD[1]&&dE[2]==dD[2];
dF||this.__tA(dB||A,r,dE,v,dE.join(u),t,dA,v,dD.join(u),br);
},assertElement:function(dW,dX){!!(dW&&dW.nodeType===1)||this.__tA(dX||A,D,dW,y);
},assertQxObject:function(bK,bL){this.__tC(bK,bE)||this.__tA(bL||A,J,bK,z);
},assertQxWidget:function(bI,bJ){this.__tC(bI,by)||this.__tA(bJ||A,L,bI,z);
},__tC:function(cx,cy){if(!cx){return false;
}var cz=cx.constructor;

while(cz){if(cz.classname===cy){return true;
}cz=cz.superclass;
}return false;
}}});
})();
(function(){var p='',o='"',m=':',l=']',h='null',g=': ',f='object',e='function',d=',',b='\n',ba='\\u',Y=',\n',X='0000',W='string',V="Cannot stringify a recursive object.",U='0',T='-',S='}',R='String',Q='Boolean',x='\\\\',y='\\f',u='\\t',w='{\n',s='[]',t="qx.lang.JsonImpl",q='Z',r='\\n',z='Object',A='{}',H='@',F='.',K='(',J='Array',M='T',L='\\r',C='{',P='JSON.parse',O=' ',N='[',B='Number',D=')',E='[\n',G='\\"',I='\\b';
qx.Class.define(t,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);
this.parse=qx.lang.Function.bind(this.parse,this);
},members:{__tD:null,__tE:null,__tF:null,__tG:null,stringify:function(bs,bt,bu){this.__tD=p;
this.__tE=p;
this.__tG=[];

if(qx.lang.Type.isNumber(bu)){var bu=Math.min(10,Math.floor(bu));

for(var i=0;i<bu;i+=1){this.__tE+=O;
}}else if(qx.lang.Type.isString(bu)){if(bu.length>10){bu=bu.slice(0,10);
}this.__tE=bu;
}if(bt&&(qx.lang.Type.isFunction(bt)||qx.lang.Type.isArray(bt))){this.__tF=bt;
}else{this.__tF=null;
}return this.__tH(p,{'':bs});
},__tH:function(bb,bc){var bf=this.__tD,bd,bg=bc[bb];
if(bg&&qx.lang.Type.isFunction(bg.toJSON)){bg=bg.toJSON(bb);
}else if(qx.lang.Type.isDate(bg)){bg=this.dateToJSON(bg);
}if(typeof this.__tF===e){bg=this.__tF.call(bc,bb,bg);
}
if(bg===null){return h;
}
if(bg===undefined){return undefined;
}switch(qx.lang.Type.getClass(bg)){case R:return this.__tI(bg);
case B:return isFinite(bg)?String(bg):h;
case Q:return String(bg);
case J:this.__tD+=this.__tE;
bd=[];

if(this.__tG.indexOf(bg)!==-1){throw new TypeError(V);
}this.__tG.push(bg);
var length=bg.length;

for(var i=0;i<length;i+=1){bd[i]=this.__tH(i,bg)||h;
}this.__tG.pop();
if(bd.length===0){var be=s;
}else if(this.__tD){be=E+this.__tD+bd.join(Y+this.__tD)+b+bf+l;
}else{be=N+bd.join(d)+l;
}this.__tD=bf;
return be;
case z:this.__tD+=this.__tE;
bd=[];

if(this.__tG.indexOf(bg)!==-1){throw new TypeError(V);
}this.__tG.push(bg);
if(this.__tF&&typeof this.__tF===f){var length=this.__tF.length;

for(var i=0;i<length;i+=1){var k=this.__tF[i];

if(typeof k===W){var v=this.__tH(k,bg);

if(v){bd.push(this.__tI(k)+(this.__tD?g:m)+v);
}}}}else{for(var k in bg){if(Object.hasOwnProperty.call(bg,k)){var v=this.__tH(k,bg);

if(v){bd.push(this.__tI(k)+(this.__tD?g:m)+v);
}}}}this.__tG.pop();
if(bd.length===0){var be=A;
}else if(this.__tD){be=w+this.__tD+bd.join(Y+this.__tD)+b+bf+S;
}else{be=C+bd.join(d)+S;
}this.__tD=bf;
return be;
}},dateToJSON:function(bl){var bm=function(n){return n<10?U+n:n;
};
var bn=function(n){var br=bm(n);
return n<100?U+br:br;
};
return isFinite(bl.valueOf())?bl.getUTCFullYear()+T+bm(bl.getUTCMonth()+1)+T+bm(bl.getUTCDate())+M+bm(bl.getUTCHours())+m+bm(bl.getUTCMinutes())+m+bm(bl.getUTCSeconds())+F+bn(bl.getUTCMilliseconds())+q:null;
},__tI:function(bv){var bw={'\b':I,'\t':u,'\n':r,'\f':y,'\r':L,'"':G,'\\':x};
var bx=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bx.lastIndex=0;

if(bx.test(bv)){return o+
bv.replace(bx,function(a){var c=bw[a];
return typeof c===W?c:ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
})+o;
}else{return o+bv+o;
}},parse:function(bo,bp){var bq=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
bq.lastIndex=0;
if(bq.test(bo)){bo=bo.replace(bq,function(a){return ba+(X+a.charCodeAt(0).toString(16)).slice(-4);
});
}if(/^[\],:{}\s]*$/.test(bo.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,H).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,l).replace(/(?:^|:|,)(?:\s*\[)+/g,p))){var j=eval(K+bo+D);
return typeof bp===e?this.__tJ({'':j},p,bp):j;
}throw new SyntaxError(P);
},__tJ:function(bh,bi,bj){var bk=bh[bi];

if(bk&&typeof bk===f){for(var k in bk){if(Object.hasOwnProperty.call(bk,k)){var v=this.__tJ(bk,k,bj);

if(v!==undefined){bk[k]=v;
}else{delete bk[k];
}}}}return bj.call(bh,bi,bk);
}}});
})();
(function(){var a="qx.lang.Json";
qx.Class.define(a,{statics:{JSON:(qx.lang.Type.getClass(window.JSON)=="JSON"&&JSON.parse('{"x":1}').x===1)?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;
b.parse=b.JSON.parse;
}});
})();
(function(){var c="interval",b="qx.util.TimerManager",a="singleton";
qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__tK:[],__tL:{},__tM:0},members:{__tN:false,start:function(h,j,k,l,m){if(!m){m=j||0;
}var n=(new Date()).getTime()+m;
this.self(arguments).__tL[++this.self(arguments).__tM]={callback:h,userData:l||null,expireAt:n,recurTime:j,context:k||this};
this.__tO(n,this.self(arguments).__tM);
return this.self(arguments).__tM;
},stop:function(u){var v=this.self(arguments).__tK;
var length=v.length;

for(var i=0;i<length;i++){if(v[i]==u){v.splice(i,1);
break;
}}delete this.self(arguments).__tL[u];
if(v.length==0&&this.__tN){qx.event.Idle.getInstance().removeListener(c,this.__tP,this);
this.__tN=false;
}},__tO:function(d,e){var g=this.self(arguments).__tK;
var f=this.self(arguments).__tL;
var length=g.length;

for(var i=0;i<length;i++){if(f[g[i]].expireAt>d){g.splice(i,0,e);
break;
}}if(g.length==length){g.push(e);
}if(!this.__tN){qx.event.Idle.getInstance().addListener(c,this.__tP,this);
this.__tN=true;
}},__tP:function(){var r=(new Date()).getTime();
var p=this.self(arguments).__tK;
var q=this.self(arguments).__tL;
while(p.length>0&&q[p[0]].expireAt<=r){var t=p.shift();
var o=q[t];
o.callback.call(o.context,o.userData,t);
if(o.recurTime&&q[t]){var s=(new Date()).getTime();
o.expireAt=s+o.recurTime;
this.__tO(o.expireAt,t);
}else{delete q[t];
}}if(p.length==0&&this.__tN){qx.event.Idle.getInstance().removeListener(c,this.__tP,this);
this.__tN=false;
}}}});
})();
(function(){var p='g',o="==",n=">",m="notregex",l="between",k="<",j="regex",h='gi',g="!between",f=">=",c="dataChanged",e="!=",d="<=",b="qx.ui.table.model.Filtered",a='';
qx.Class.define(b,{extend:qx.ui.table.model.Simple,construct:function(){qx.ui.table.model.Simple.call(this);
this.numericAllowed=new Array(o,e,n,k,f,d);
this.betweenAllowed=new Array(l,g);
this.__tQ=false;
this.Filters=new Array();
},members:{__tR:null,__tQ:null,_js_in_array:function(B,C){var D=C.toString();

if(D==a){return false;
}var F=new RegExp(B,p);
var E=F.test(C);
return E;
},addBetweenFilter:function(s,t,u,v){if(this._js_in_array(s,this.betweenAllowed)&&v!=null){if(t!=null&&u!=null){var w=new Array(s,t,u,v);
}}
if(w!=null){this.Filters.push(w);
}else{throw new Error("Filter not recognized or value1/value2 is null!");
}},addNumericFilter:function(x,y,z){var A=null;

if(this._js_in_array(x,this.numericAllowed)&&z!=null){if(y!=null){A=[x,y,z];
}}
if(A!=null){this.Filters.push(A);
}else{throw new Error("Filter not recognized: value or target is null!");
}},addRegex:function(X,Y,ba){var bc;

if(ba){bc=h;
}else{bc=p;
}
if(X!=null&&Y!=null){var bb=new Array(j,X,Y,bc);
}
if(bb!=null){this.Filters.push(bb);
}else{throw new Error("regex cannot be null!");
}},addNotRegex:function(G,H,I){var K;

if(I){K=h;
}else{K=p;
}
if(G!=null&&H!=null){var J=new Array(m,G,H,K);
}
if(J!=null){this.Filters.push(J);
}else{throw new Error("notregex cannot be null!");
}},applyFilters:function(){var i;
var U;
var Q;
var T=this.getData();
var R=T.length;

for(var W=0;W<R;W++){U=false;

for(i in this.Filters){if(this._js_in_array(this.Filters[i][0],this.numericAllowed)&&U==false){Q=this.getValueById(this.Filters[i][2],W);

switch(this.Filters[i][0]){case o:if(Q==this.Filters[i][1]){U=true;
}break;
case e:if(Q!=this.Filters[i][1]){U=true;
}break;
case n:if(Q>this.Filters[i][1]){U=true;
}break;
case k:if(Q<this.Filters[i][1]){U=true;
}break;
case f:if(Q>=this.Filters[i][1]){U=true;
}break;
case d:if(Q<=this.Filters[i][1]){U=true;
}break;
}}else if(this._js_in_array(this.Filters[i][0],this.betweenAllowed)&&U==false){Q=this.getValueById(this.Filters[i][3],W);

switch(this.Filters[i][0]){case l:if(Q>=this.Filters[i][1]&&Q<=this.Filters[i][2]){U=true;
}break;
case g:if(Q<this.Filters[i][1]&&Q>this.Filters[i][2]){U=true;
}break;
}}else if(this.Filters[i][0]==j&&U==false){Q=this.getValueById(this.Filters[i][2],W);
var S=new RegExp(this.Filters[i][1],this.Filters[i][3]);
U=S.test(Q);
}else if(this.Filters[i][0]==m&&U==false){Q=this.getValueById(this.Filters[i][2],W);
var S=new RegExp(this.Filters[i][1],this.Filters[i][3]);
U=!S.test(Q);
}}if(U==true){this.hideRows(W,1,false);
W--;
R--;
}}var V={firstRow:0,lastRow:R-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(c,V);
},hideRows:function(L,M,dispatchEvent){var O=this.getData();
dispatchEvent=(dispatchEvent!=null?dispatchEvent:true);

if(!this.__tQ){this.__tR=O.slice(0);
this.__tQ=true;
}
if(M==null||M<1){M=1;
}
for(var N=L;N<(O.length-M);N++){O[N]=O[N+M];
}this.removeRows(N,M);
if(dispatchEvent){var P={firstRow:0,lastRow:O.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(c,P);
}},resetHiddenRows:function(){if(!this.__tR){return ;
}this.Filters=[];
this.setData(qx.lang.Array.clone(this.__tR));
},setData:function(q,r){this.__tR=qx.lang.Array.clone(q);
this.Filters=[];
qx.ui.table.model.Simple.prototype.setData.call(this,q,r);
}},destruct:function(){this.__tR=this.numericAllowed=this.betweenAllowed=this.Filters=null;
}});
})();
(function(){var c="",b="Classname",a="inspector.objects2.table.AbstractModel";
qx.Class.define(a,{extend:qx.ui.table.model.Filtered,construct:function(e,f){qx.ui.table.model.Filtered.call(this);
this._model=e;
this.setColumns(f);
this.setData(this._getData());
},members:{__tS:c,_model:null,_getData:function(){throw Error("Abstract Method call!");
},reload:function(){this.setData(this._getData());
this.filter(this.__tS);
},filter:function(d){this.__tS=d;
this.resetHiddenRows();

if(d!=c){this.addNotRegex(d,b,true);
this.applyFilters();
}}},destruct:function(){this._model=null;
}});
})();
(function(){var c="Classname",b="Hash",a="inspector.objects2.table.HashModel";
qx.Class.define(a,{extend:inspector.objects2.table.AbstractModel,construct:function(g){inspector.objects2.table.AbstractModel.call(this,g,[b,c]);
},members:{_getData:function(){var d=this._model.getObjects();
var e=[];

for(var i=0;i<d.length;i++){var f=d[i];
e.push([parseInt(f.toHashCode()),f.classname]);
}return e;
}}});
})();
(function(){var e="inspector.objects2.table.CountModel",d="Count",c="Classname";
qx.Class.define(e,{extend:inspector.objects2.table.AbstractModel,construct:function(k){inspector.objects2.table.AbstractModel.call(this,k,[d,c]);
},members:{_getData:function(){var h=this._model.getObjects();
var g={};

for(var i=0;i<h.length;i++){var f=h[i].classname;

if(g[f]===undefined){g[f]=0;
}g[f]++;
}var j=[];

for(var f in g){j.push([g[f],f]);
}j.sort(function(a,b){return a[0]<b[0];
});
return j;
}}});
})();
(function(){var c="middle",b="_toolbar",a="inspector.components.AbstractWindow";
qx.Class.define(a,{extend:qx.ui.window.Window,construct:function(name){qx.ui.window.Window.call(this,name);
this.setLayout(new qx.ui.layout.VBox());
this.setWidth(300);
this.setHeight(200);
this.setContentPadding(0);
this.setShowMinimize(false);
this.setShowMaximize(false);
this._toolbar=new qx.ui.toolbar.ToolBar();
this._toolbar.setPaddingLeft(3);
this._toolbar.setPaddingRight(3);
this._toolbar._getLayout().setAlignY(c);
this.add(this._toolbar);
},members:{_toolbar:null,_iFrameWindow:null,setInitSizeAndPosition:function(){throw new Error("Abstract method call (setInitSizeAndPosition) in 'AbstractWindow'!");
}},destruct:function(){this._disposeObjects(b);
}});
})();
(function(){var s="instance",r="]",q='id',p=" [",o='instance',n="changeOpen",h="_getChildren",g="getChildren",f="inspector/images/components/image.png",d="qx.ui.form.TextField",bC="qx.ui.layout.DockLayout",bB="inspector/images/components/radiobutton.png",bA="_structureToggle",bz="qx.ui.pageview.buttonview.Button",by="inspector/images/components/verticallayout.png",bx="qx.ui.groupbox.RadioGroupBox",bw="inspector/images/components/horizontallayout.png",bv="inspector/images/components/label.png",bu="qx.ui.groupbox.CheckGroupBox",bt="qx.ui.treevirtual.TreeVirtual",A="qx.ui.basic.Image",B="qx.ui.basic.Label",y="qx.ui.pageview.tabview.Button",z="inspector/images/components/toolbar.png",v="qx.ui.toolbar.ToolBar",x="inspector/images/components/window.png",t="_reloadButton",u="_tree",I="inspector/images/components/button.png",J="inspector/images/components/textarea.png",W="qx.ui.form.RadioButton",S="qx.ui.window.Window",bf="changeSelection",ba="inspector/images/components/table.png",bp="qx.ui.tree.Tree",bk="qx.ui.layout.HBox",N="qx.ui.form.ComboBox",bs="inspector/images/components/textfield.png",br="inspector/images/components/groupbox.png",bq="icon/22/actions/view-refresh.png",M="inspector/images/components/checkbox.png",P="qx.ui.form.CheckBox",R="Display internal widget structure.",U="qx.ui.table.Table",X="Reload the window.",bb="qx.ui.layout.VBox",bh="qx.ui.menu.Layout",bm="inspector/images/components/atom.png",C="qx.ui.toolbar.Button",D="qx.ui.menu.Button",O="qx.ui.layout.CanvasLayout",be="inspector/images/components/spinner.png",bd="qx.ui.layout.FlowLayout",bc="qx.ui.menu.Menu",bj="Widgets",bi="qx.ui.form.Button",Y="click",bg="inspector.widgets.WidgetsWindow",a="inspector/images/components/tree.png",bl="qx.ui.layout.GridLayout",E="qx.ui.pageview.radioview.Button",F="qx.ui.form.TextArea",T="qx.ui.groupbox.Groupbox",b="qx.ui.menubar.Button",c="inspector/images/components/menu.png",L="qx.ui.menubar.MenuBar",G="inspector/images/components/layout.png",H="qx.ui.splitpane.SplitPane",K="inspector/images/components/combobox.png",V="qx.ui.basic.Atom",bo="inspector/images/components/splitpane.png",bn="icon/22/actions/document-properties.png",Q="qx.ui.form.Spinner";
qx.Class.define(bg,{extend:inspector.components.AbstractWindow,construct:function(){inspector.components.AbstractWindow.call(this,bj);
this._reloadButton=new qx.ui.toolbar.Button(null,bq);
this._reloadButton.setToolTipText(X);
this._toolbar.add(this._reloadButton);
this._reloadButton.addListener(Y,function(){this.load();
},this);
this._toolbar.addSpacer();
this._structureToggle=new qx.ui.toolbar.CheckBox(null,bn);
this._structureToggle.setToolTipText(R);
this._toolbar.add(this._structureToggle);
this._structureToggle.setValue(false);
this._tree=new qx.ui.tree.Tree();
this._tree.setDecorator(null);
this._tree.setRootOpenClose(true);
this.add(this._tree,{flex:1});
this._tree.addListener(bf,function(e){if(e.getData()[0]){var cb=e.getData()[0].getUserData(s);
qx.core.Init.getApplication().select(cb,this);
}},this);
},members:{setInitSizeAndPosition:function(){var bW=qx.bom.Viewport.getWidth()-this.getWidth();
var bV=parseInt((qx.bom.Viewport.getHeight()-30)/3);
this.moveTo(bW,30+bV);
this.setHeight(bV);
},select:function(cc){this._selectWidgetInTheTree(cc);
},getSelection:function(){var cf=this._tree.getSelection()[0];
if(cf!=null){return cf.getUserData(s);
}return null;
},load:function(bX){if(bX==undefined){this._iFrameWindow=qx.core.Init.getApplication().getIframeWindowObject();
}else{this._iFrameWindow=bX;
}var bY=this._iFrameWindow.qx.core.Init.getApplication().getRoot();
var ca=new qx.ui.tree.TreeFolder(bY.classname+p+bY.toHashCode()+r);
ca.setUserData(s,bY);
this._tree.setRoot(ca);
this._fillTree(bY,ca,2);
},_fillTree:function(bD,bE,bF){var bK=bE.getItems(false,true);
var bG=this._structureToggle.isValue()?h:g;
if(bD[bG]==undefined){if(bG===g){bG=h;

if(bD[bG]==undefined){return;
}}else{return;
}}if(bD[bG]().length==0){if(bK.length>1){for(var m=0;m<bK.length;m++){if(bK[m+1]==this._tree.getSelection()[0]){this._tree.resetSelection();
}bE.removeAt(0);
}}}var bL=qx.core.Init.getApplication().getExcludes();
var i=0;
bF--;
for(var k=0;k<bD[bG]().length;k++){var bI=bD[bG]()[k];
var bH=false;

for(var j=0;j<bL.length;j++){if(bI==bL[j]){bH=true;
break;
}}if(bH){continue;
}if(bK[i]==null){var bM=new qx.ui.tree.TreeFolder(bI.classname+p+bI.toHashCode()+r);
bM.setIcon(this._getIconPath(bI.classname));
bE.addAt(bM,i);
bM.setUserData(o,bI);
bM.setUserData(q,bI.toHashCode());
bM.addListener(n,this._treeOpenHandler,this);
}else{if(bK[i].getLabel()==bI.classname+p+bI.toHashCode()+r){var bM=bK[i];
}else{if(bE.getItems()[i]!=null){if(bE.getItems()[i]==this._tree.getSelection()[0]){this._tree.resetSelection();
}}bE.removeAt(i);
var bM=new qx.ui.tree.TreeFolder(bI.classname+p+bI.toHashCode()+r);
bE.addAt(bM,i);
bM.setUserData(o,bI);
bM.setUserData(q,bI.toHashCode());
bM.addListener(n,this._treeOpenHandler,this);
}}if(bF>0){this._fillTree(bI,bM,bF);
}if(i+1==bD[bG]().length){var bJ=bE.getItems(false,true);
if(bJ.length-2!=i){for(var l=i+1;l<bJ.length;l++){bE.removeAt(i+1);
}}}i++;
}},_treeOpenHandler:function(e){if(e.getData()){var ce=e.getTarget().getUserData(o);
this._fillTree(ce,e.getTarget(),2);
}},_getIconPath:function(cd){switch(cd){case A:return f;
case B:return bv;
case V:return bm;
case bp:case bt:return a;
case bc:return c;
case bi:case D:case b:case bz:case E:case y:case C:return I;
case O:case bC:case bd:case bl:case bh:return G;
case bb:return by;
case bk:return bw;
case v:case L:return z;
case S:return x;
case T:case bu:case bx:return br;
case Q:return be;
case N:return K;
case d:return bs;
case F:return J;
case H:return bo;
case U:return ba;
case P:return M;
case W:return bB;
default:return null;
}},_selectWidgetInTheTree:function(bQ){this._iFrameWindow=qx.core.Init.getApplication().getIframeWindowObject();
if(!(bQ instanceof this._iFrameWindow.qx.ui.core.Widget)){return;
}var bS=[];
var w=bQ;

if(this._structureToggle.isValue()){while(w.getLayoutParent()!=null){bS.push(w);
w=w.getLayoutParent();
}}else{while(w.getParent!=undefined&&w.getParent()!=null||w.getLayoutParent()!=null){if(w.getParent!=undefined&&w.getParent()!=null){bS.push(w);
w=w.getParent();
}else if(w.getLayoutParent()!=null){bS.push(w);
w=w.getLayoutParent();
}}}for(var i=bS.length-1;i>0;i--){this._openFolder(bS[i]);
}this._tree.getRoot().setOpen(true);
var bU=bQ.toHashCode();
var bR=this._tree.getItems(true,true);
var bT=false;
if(this._tree.getRoot().getUserData(s).toHashCode()==bU){this._tree.resetSelection();
this._tree.addToSelection(this._tree.getRoot());
return;
}for(var i=0;i<bR.length;i++){if(bR[i].getUserData(q)==bU){bT=true;
this._tree.resetSelection();
this._tree.addToSelection(bR[i]);
break;
}}if(!bT){this._tree.resetSelection();
}},_openFolder:function(bN){var bP=bN.toHashCode();
var bO=this._tree.getItems(true,true);
if(this._tree.getRoot().getUserData(s).toHashCode()==bP){this._tree.resetSelection();
this._tree.addToSelection(this._tree.getRoot());
return ;
}for(var i=0;i<bO.length;i++){if(bO[i].getUserData(q)==bP){bO[i].setOpen(true);
break;
}}}},destruct:function(){this._iFrameWindow=null;
this._disposeObjects(t,bA,u);
}});
})();
(function(){var v="scrollbar-y",u="scrollbar-x",t="pane",s="auto",r="corner",q="on",p="changeVisibility",o="scroll",n="_computeScrollbars",m="off",f="scrollY",l="qx.ui.core.scroll.AbstractScrollArea",i="abstract",c="update",b="scrollX",h="mousewheel",g="scrollbarY",j="scrollbarX",a="horizontal",k="scrollarea",d="vertical";
qx.Class.define(l,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,type:i,construct:function(){qx.ui.core.Widget.call(this);
var P=new qx.ui.layout.Grid();
P.setColumnFlex(0,1);
P.setRowFlex(0,1);
this._setLayout(P);
this.addListener(h,this._onMouseWheel,this);
},properties:{appearance:{refine:true,init:k},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[s,q,m],init:s,themeable:true,apply:n},scrollbarY:{check:[s,q,m],init:s,themeable:true,apply:n},scrollbar:{group:[j,g]}},members:{_createChildControlImpl:function(Q){var R;

switch(Q){case t:R=new qx.ui.core.scroll.ScrollPane();
R.addListener(c,this._computeScrollbars,this);
R.addListener(b,this._onScrollPaneX,this);
R.addListener(f,this._onScrollPaneY,this);
this._add(R,{row:0,column:0});
break;
case u:R=this._createScrollBar(a);
R.setMinWidth(0);
R.exclude();
R.addListener(o,this._onScrollBarX,this);
R.addListener(p,this._onChangeScrollbarXVisibility,this);
this._add(R,{row:1,column:0});
break;
case v:R=this._createScrollBar(d);
R.setMinHeight(0);
R.exclude();
R.addListener(o,this._onScrollBarY,this);
R.addListener(p,this._onChangeScrollbarYVisibility,this);
this._add(R,{row:0,column:1});
break;
case r:R=new qx.ui.core.Widget();
R.setWidth(0);
R.setHeight(0);
R.exclude();
this._add(R,{row:1,column:1});
break;
}return R||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,Q);
},getPaneSize:function(){return this.getChildControl(t).getInnerSize();
},getItemTop:function(N){return this.getChildControl(t).getItemTop(N);
},getItemBottom:function(S){return this.getChildControl(t).getItemBottom(S);
},getItemLeft:function(ba){return this.getChildControl(t).getItemLeft(ba);
},getItemRight:function(V){return this.getChildControl(t).getItemRight(V);
},scrollToX:function(I){qx.ui.core.queue.Manager.flush();
this.getChildControl(u).scrollTo(I);
},scrollByX:function(O){qx.ui.core.queue.Manager.flush();
this.getChildControl(u).scrollBy(O);
},getScrollX:function(){var J=this.getChildControl(u,true);
return J?J.getPosition():0;
},scrollToY:function(U){qx.ui.core.queue.Manager.flush();
this.getChildControl(v).scrollTo(U);
},scrollByY:function(T){qx.ui.core.queue.Manager.flush();
this.getChildControl(v).scrollBy(T);
},getScrollY:function(){var M=this.getChildControl(v,true);
return M?M.getPosition():0;
},_onScrollBarX:function(e){this.getChildControl(t).scrollToX(e.getData());
},_onScrollBarY:function(e){this.getChildControl(t).scrollToY(e.getData());
},_onScrollPaneX:function(e){this.scrollToX(e.getData());
},_onScrollPaneY:function(e){this.scrollToY(e.getData());
},_onMouseWheel:function(e){var X=this._isChildControlVisible(u);
var Y=this._isChildControlVisible(v);
var W=(Y)?this.getChildControl(v,true):(X?this.getChildControl(u,true):null);

if(W){W.scrollBySteps(e.getWheelDelta());
}e.stop();
},_onChangeScrollbarXVisibility:function(e){var w=this._isChildControlVisible(u);
var x=this._isChildControlVisible(v);

if(!w){this.scrollToX(0);
}w&&x?this._showChildControl(r):this._excludeChildControl(r);
},_onChangeScrollbarYVisibility:function(e){var K=this._isChildControlVisible(u);
var L=this._isChildControlVisible(v);

if(!L){this.scrollToY(0);
}K&&L?this._showChildControl(r):this._excludeChildControl(r);
},_computeScrollbars:function(){var E=this.getChildControl(t);
var content=E.getChildren()[0];

if(!content){this._excludeChildControl(u);
this._excludeChildControl(v);
return;
}var y=this.getInnerSize();
var D=E.getInnerSize();
var B=E.getScrollSize();
if(!D||!B){return;
}var F=this.getScrollbarX();
var G=this.getScrollbarY();

if(F===s&&G===s){var C=B.width>y.width;
var H=B.height>y.height;
if((C||H)&&!(C&&H)){if(C){H=B.height>D.height;
}else if(H){C=B.width>D.width;
}}}else{var C=F===q;
var H=G===q;
if(B.width>(C?D.width:y.width)&&F===s){C=true;
}
if(B.height>(C?D.height:y.height)&&G===s){H=true;
}}if(C){var A=this.getChildControl(u);
A.show();
A.setMaximum(Math.max(0,B.width-D.width));
A.setKnobFactor((B.width===0)?0:D.width/B.width);
}else{this._excludeChildControl(u);
}
if(H){var z=this.getChildControl(v);
z.show();
z.setMaximum(Math.max(0,B.height-D.height));
z.setKnobFactor((B.height===0)?0:D.height/B.height);
}else{this._excludeChildControl(v);
}}}});
})();
(function(){var a="qx.ui.core.IMultiSelection";
qx.Interface.define(a,{extend:qx.ui.core.ISingleSelection,members:{selectAll:function(){return true;
},addToSelection:function(b){return arguments.length==1;
},removeFromSelection:function(c){return arguments.length==1;
}}});
})();
(function(){var w="single",v="Boolean",u="one",t="changeSelection",s="mouseup",r="mousedown",q="losecapture",p="multi",o="_applyQuickSelection",n="mouseover",f="_applySelectionMode",m="_applyDragSelection",j="qx.ui.core.MMultiSelectionHandling",d="removeItem",c="keypress",h="__os",g="qx.event.type.Data",k="addItem",b="additive",l="mousemove";
qx.Mixin.define(j,{construct:function(){var G=this.SELECTION_MANAGER;
var F=this.__os=new G(this);
this.addListener(r,F.handleMouseDown,F);
this.addListener(s,F.handleMouseUp,F);
this.addListener(n,F.handleMouseOver,F);
this.addListener(l,F.handleMouseMove,F);
this.addListener(q,F.handleLoseCapture,F);
this.addListener(c,F.handleKeyPress,F);
this.addListener(k,F.handleAddItem,F);
this.addListener(d,F.handleRemoveItem,F);
F.addListener(t,this._onSelectionChange,this);
},events:{"changeSelection":g},properties:{selectionMode:{check:[w,p,b,u],init:w,apply:f},dragSelection:{check:v,init:false,apply:m},quickSelection:{check:v,init:false,apply:o}},members:{__os:null,selectAll:function(){this.__os.selectAll();
},isSelected:function(z){if(!qx.ui.core.Widget.contains(this,z)){throw new Error("Could not test if "+z+" is selected, because it is not a child element!");
}return this.__os.isItemSelected(z);
},addToSelection:function(a){if(!qx.ui.core.Widget.contains(this,a)){throw new Error("Could not add + "+a+" to selection, because it is not a child element!");
}this.__os.addItem(a);
},removeFromSelection:function(C){if(!qx.ui.core.Widget.contains(this,C)){throw new Error("Could not remove "+C+" from selection, because it is not a child element!");
}this.__os.removeItem(C);
},selectRange:function(A,B){this.__os.selectItemRange(A,B);
},resetSelection:function(){this.__os.clearSelection();
},setSelection:function(K){for(var i=0;i<K.length;i++){if(!qx.ui.core.Widget.contains(this,K[i])){throw new Error("Could not select "+K[i]+", because it is not a child element!");
}}
if(K.length===0){this.resetSelection();
}else{var L=this.getSelection();

if(!qx.lang.Array.equals(L,K)){this.__os.replaceSelection(K);
}}},getSelection:function(){return this.__os.getSelection();
},getSortedSelection:function(){return this.__os.getSortedSelection();
},isSelectionEmpty:function(){return this.__os.isSelectionEmpty();
},getSelectionContext:function(){return this.__os.getSelectionContext();
},_getManager:function(){return this.__os;
},getSelectables:function(J){return this.__os.getSelectables(J);
},invertSelection:function(){this.__os.invertSelection();
},_getLeadItem:function(){var M=this.__os.getMode();

if(M===w||M===u){return this.__os.getSelectedItem();
}else{return this.__os.getLeadItem();
}},_applySelectionMode:function(D,E){this.__os.setMode(D);
},_applyDragSelection:function(x,y){this.__os.setDrag(x);
},_applyQuickSelection:function(H,I){this.__os.setQuick(H);
},_onSelectionChange:function(e){this.fireDataEvent(t,e.getData());
}},destruct:function(){this._disposeObjects(h);
}});
})();
(function(){var H="one",G="single",F="selected",E="additive",D="multi",C="PageUp",B="under",A="Left",z="lead",y="Down",bg="Up",bf="Boolean",be="PageDown",bd="anchor",bc="End",bb="Home",ba="Right",Y="right",X="click",W="above",O="left",P="Escape",M="A",N="Space",K="_applyMode",L="interval",I="changeSelection",J="qx.event.type.Data",Q="quick",R="key",T="abstract",S="__ow",V="drag",U="qx.ui.core.selection.Abstract";
qx.Class.define(U,{type:T,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__ot={};
},events:{"changeSelection":J},properties:{mode:{check:[G,D,E,H],init:G,apply:K},drag:{check:bf,init:false},quick:{check:bf,init:false}},members:{__ou:0,__ov:0,__ow:null,__ox:null,__oy:null,__oz:null,__oA:null,__oB:null,__oC:null,__oD:null,__oE:null,__oF:null,__oG:null,__oH:null,__oI:null,__oJ:null,__oK:null,__ot:null,__oL:null,__oM:null,_userInteraction:false,getSelectionContext:function(){return this.__oJ;
},selectAll:function(){var cx=this.getMode();

if(cx==G||cx==H){throw new Error("Can not select all items in selection mode: "+cx);
}this._selectAllItems();
this._fireChange();
},selectItem:function(bL){this._setSelectedItem(bL);
var bM=this.getMode();

if(bM!==G&&bM!==H){this._setLeadItem(bL);
this._setAnchorItem(bL);
}this._scrollItemIntoView(bL);
this._fireChange();
},addItem:function(cB){var cC=this.getMode();

if(cC===G||cC===H){this._setSelectedItem(cB);
}else{if(!this._getAnchorItem()){this._setAnchorItem(cB);
}this._setLeadItem(cB);
this._addToSelection(cB);
}this._scrollItemIntoView(cB);
this._fireChange();
},removeItem:function(cD){this._removeFromSelection(cD);

if(this.getMode()===H&&this.isSelectionEmpty()){var cE=this._getFirstSelectable();

if(cE){this.addItem(cE);
}if(cE==cD){return;
}}
if(this.getLeadItem()==cD){this._setLeadItem(null);
}
if(this._getAnchorItem()==cD){this._setAnchorItem(null);
}this._fireChange();
},selectItemRange:function(bN,bO){var bP=this.getMode();

if(bP==G||bP==H){throw new Error("Can not select multiple items in selection mode: "+bP);
}this._selectItemRange(bN,bO);
this._setAnchorItem(bN);
this._setLeadItem(bO);
this._scrollItemIntoView(bO);
this._fireChange();
},clearSelection:function(){if(this.getMode()==H){return;
}this._clearSelection();
this._setLeadItem(null);
this._setAnchorItem(null);
this._fireChange();
},replaceSelection:function(cS){var cT=this.getMode();

if(cT==H||cT===G){if(cS.length>1){throw new Error("Could not select more than one items in mode: "+cT+"!");
}
if(cS.length==1){this.selectItem(cS[0]);
}else{this.clearSelection();
}return;
}else{this._replaceMultiSelection(cS);
}},getSelectedItem:function(){var m=this.getMode();

if(m===G||m===H){return this._getSelectedItem()||null;
}throw new Error("The method getSelectedItem() is only supported in 'single' and 'one' selection mode!");
},getSelection:function(){return qx.lang.Object.getValues(this.__ot);
},getSortedSelection:function(){var k=this.getSelectables();
var j=qx.lang.Object.getValues(this.__ot);
j.sort(function(a,b){return k.indexOf(a)-k.indexOf(b);
});
return j;
},isItemSelected:function(bT){var bU=this._selectableToHashCode(bT);
return this.__ot[bU]!==undefined;
},isSelectionEmpty:function(){return qx.lang.Object.isEmpty(this.__ot);
},invertSelection:function(){var bi=this.getMode();

if(bi===G||bi===H){throw new Error("The method invertSelection() is only supported in 'multi' and 'additive' selection mode!");
}var bh=this.getSelectables();

for(var i=0;i<bh.length;i++){this._toggleInSelection(bh[i]);
}this._fireChange();
},_setLeadItem:function(u){var v=this.__oK;

if(v!==null){this._styleSelectable(v,z,false);
}
if(u!==null){this._styleSelectable(u,z,true);
}this.__oK=u;
},getLeadItem:function(){return this.__oK!==null?this.__oK:null;
},_setAnchorItem:function(cN){var cO=this.__oL;

if(cO){this._styleSelectable(cO,bd,false);
}
if(cN){this._styleSelectable(cN,bd,true);
}this.__oL=cN;
},_getAnchorItem:function(){return this.__oL!==null?this.__oL:null;
},_isSelectable:function(cQ){throw new Error("Abstract method call: _isSelectable()");
},_getSelectableFromMouseEvent:function(event){var bF=event.getTarget();
return this._isSelectable(bF)?bF:null;
},_selectableToHashCode:function(cR){throw new Error("Abstract method call: _selectableToHashCode()");
},_styleSelectable:function(cU,cV,cW){throw new Error("Abstract method call: _styleSelectable()");
},_capture:function(){throw new Error("Abstract method call: _capture()");
},_releaseCapture:function(){throw new Error("Abstract method call: _releaseCapture()");
},_getLocation:function(){throw new Error("Abstract method call: _getLocation()");
},_getDimension:function(){throw new Error("Abstract method call: _getDimension()");
},_getSelectableLocationX:function(cA){throw new Error("Abstract method call: _getSelectableLocationX()");
},_getSelectableLocationY:function(bW){throw new Error("Abstract method call: _getSelectableLocationY()");
},_getScroll:function(){throw new Error("Abstract method call: _getScroll()");
},_scrollBy:function(cL,cM){throw new Error("Abstract method call: _scrollBy()");
},_scrollItemIntoView:function(bu){throw new Error("Abstract method call: _scrollItemIntoView()");
},getSelectables:function(cP){throw new Error("Abstract method call: getSelectables()");
},_getSelectableRange:function(w,x){throw new Error("Abstract method call: _getSelectableRange()");
},_getFirstSelectable:function(){throw new Error("Abstract method call: _getFirstSelectable()");
},_getLastSelectable:function(){throw new Error("Abstract method call: _getLastSelectable()");
},_getRelatedSelectable:function(cX,cY){throw new Error("Abstract method call: _getRelatedSelectable()");
},_getPage:function(cy,cz){throw new Error("Abstract method call: _getPage()");
},_applyMode:function(r,s){this._setLeadItem(null);
this._setAnchorItem(null);
this._clearSelection();
if(r===H){var t=this._getFirstSelectable();

if(t){this._setSelectedItem(t);
this._scrollItemIntoView(t);
}}this._fireChange();
},handleMouseOver:function(event){this._userInteraction=true;

if(!this.getQuick()){this._userInteraction=false;
return;
}var q=this.getMode();

if(q!==H&&q!==G){this._userInteraction=false;
return;
}var p=this._getSelectableFromMouseEvent(event);

if(p===null){this._userInteraction=false;
return;
}this._setSelectedItem(p);
this._fireChange(Q);
this._userInteraction=false;
},handleMouseDown:function(event){this._userInteraction=true;
var bH=this._getSelectableFromMouseEvent(event);

if(bH===null){this._userInteraction=false;
return;
}var bJ=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var bG=event.isShiftPressed();
if(this.isItemSelected(bH)&&!bG&&!bJ&&!this.getDrag()){this.__oM=bH;
this._userInteraction=false;
return;
}else{this.__oM=null;
}this._scrollItemIntoView(bH);
switch(this.getMode()){case G:case H:this._setSelectedItem(bH);
break;
case E:this._setLeadItem(bH);
this._setAnchorItem(bH);
this._toggleInSelection(bH);
break;
case D:this._setLeadItem(bH);
if(bG){var bI=this._getAnchorItem();

if(bI===null){bI=this._getFirstSelectable();
this._setAnchorItem(bI);
}this._selectItemRange(bI,bH,bJ);
}else if(bJ){this._setAnchorItem(bH);
this._toggleInSelection(bH);
}else{this._setAnchorItem(bH);
this._setSelectedItem(bH);
}break;
}var bK=this.getMode();

if(this.getDrag()&&bK!==G&&bK!==H&&!bG&&!bJ){this.__oA=this._getLocation();
this.__ox=this._getScroll();
this.__oB=event.getDocumentLeft()+this.__ox.left;
this.__oC=event.getDocumentTop()+this.__ox.top;
this.__oD=true;
this._capture();
}this._fireChange(X);
this._userInteraction=false;
},handleMouseUp:function(event){this._userInteraction=true;
var cJ=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cG=event.isShiftPressed();

if(!cJ&&!cG&&this.__oM){var cH=this._getSelectableFromMouseEvent(event);

if(cH===null||!this.isItemSelected(cH)){this._userInteraction=false;
return;
}var cI=this.getMode();

if(cI===E){this._removeFromSelection(cH);
}else{this._setSelectedItem(cH);

if(this.getMode()===D){this._setLeadItem(cH);
this._setAnchorItem(cH);
}}this._userInteraction=false;
}this._cleanup();
},handleLoseCapture:function(event){this._cleanup();
},handleMouseMove:function(event){if(!this.__oD){return;
}this.__oE=event.getDocumentLeft();
this.__oF=event.getDocumentTop();
this._userInteraction=true;
var bk=this.__oE+this.__ox.left;

if(bk>this.__oB){this.__oG=1;
}else if(bk<this.__oB){this.__oG=-1;
}else{this.__oG=0;
}var bj=this.__oF+this.__ox.top;

if(bj>this.__oC){this.__oH=1;
}else if(bj<this.__oC){this.__oH=-1;
}else{this.__oH=0;
}var location=this.__oA;

if(this.__oE<location.left){this.__ou=this.__oE-location.left;
}else if(this.__oE>location.right){this.__ou=this.__oE-location.right;
}else{this.__ou=0;
}
if(this.__oF<location.top){this.__ov=this.__oF-location.top;
}else if(this.__oF>location.bottom){this.__ov=this.__oF-location.bottom;
}else{this.__ov=0;
}if(!this.__ow){this.__ow=new qx.event.Timer(100);
this.__ow.addListener(L,this._onInterval,this);
}this.__ow.start();
this._autoSelect();
event.stopPropagation();
this._userInteraction=false;
},handleAddItem:function(e){var cF=e.getData();

if(this.getMode()===H&&this.isSelectionEmpty()){this.addItem(cF);
}},handleRemoveItem:function(e){this.removeItem(e.getData());
},_cleanup:function(){if(!this.getDrag()&&this.__oD){return;
}if(this.__oI){this._fireChange(X);
}delete this.__oD;
delete this.__oy;
delete this.__oz;
this._releaseCapture();
if(this.__ow){this.__ow.stop();
}},_onInterval:function(e){this._scrollBy(this.__ou,this.__ov);
this.__ox=this._getScroll();
this._autoSelect();
},_autoSelect:function(){var ci=this._getDimension();
var cb=Math.max(0,Math.min(this.__oE-this.__oA.left,ci.width))+this.__ox.left;
var ca=Math.max(0,Math.min(this.__oF-this.__oA.top,ci.height))+this.__ox.top;
if(this.__oy===cb&&this.__oz===ca){return;
}this.__oy=cb;
this.__oz=ca;
var ck=this._getAnchorItem();
var cd=ck;
var cg=this.__oG;
var cj,cc;

while(cg!==0){cj=cg>0?this._getRelatedSelectable(cd,Y):this._getRelatedSelectable(cd,O);
if(cj!==null){cc=this._getSelectableLocationX(cj);
if((cg>0&&cc.left<=cb)||(cg<0&&cc.right>=cb)){cd=cj;
continue;
}}break;
}var ch=this.__oH;
var cf,ce;

while(ch!==0){cf=ch>0?this._getRelatedSelectable(cd,B):this._getRelatedSelectable(cd,W);
if(cf!==null){ce=this._getSelectableLocationY(cf);
if((ch>0&&ce.top<=ca)||(ch<0&&ce.bottom>=ca)){cd=cf;
continue;
}}break;
}var cl=this.getMode();

if(cl===D){this._selectItemRange(ck,cd);
}else if(cl===E){if(this.isItemSelected(ck)){this._selectItemRange(ck,cd,true);
}else{this._deselectItemRange(ck,cd);
}this._setAnchorItem(cd);
}this._fireChange(V);
},__oN:{Home:1,Down:1,Right:1,PageDown:1,End:1,Up:1,Left:1,PageUp:1},handleKeyPress:function(event){this._userInteraction=true;
var ct,cs;
var cv=event.getKeyIdentifier();
var cu=this.getMode();
var cp=event.isCtrlPressed()||(qx.bom.client.Platform.MAC&&event.isMetaPressed());
var cq=event.isShiftPressed();
var cr=false;

if(cv===M&&cp){if(cu!==G&&cu!==H){this._selectAllItems();
cr=true;
}}else if(cv===P){if(cu!==G&&cu!==H){this._clearSelection();
cr=true;
}}else if(cv===N){var co=this.getLeadItem();

if(co&&!cq){if(cp||cu===E){this._toggleInSelection(co);
}else{this._setSelectedItem(co);
}cr=true;
}}else if(this.__oN[cv]){cr=true;

if(cu===G||cu==H){ct=this._getSelectedItem();
}else{ct=this.getLeadItem();
}
if(ct!==null){switch(cv){case bb:cs=this._getFirstSelectable();
break;
case bc:cs=this._getLastSelectable();
break;
case bg:cs=this._getRelatedSelectable(ct,W);
break;
case y:cs=this._getRelatedSelectable(ct,B);
break;
case A:cs=this._getRelatedSelectable(ct,O);
break;
case ba:cs=this._getRelatedSelectable(ct,Y);
break;
case C:cs=this._getPage(ct,true);
break;
case be:cs=this._getPage(ct,false);
break;
}}else{switch(cv){case bb:case y:case ba:case be:cs=this._getFirstSelectable();
break;
case bc:case bg:case A:case C:cs=this._getLastSelectable();
break;
}}if(cs!==null){switch(cu){case G:case H:this._setSelectedItem(cs);
break;
case E:this._setLeadItem(cs);
break;
case D:if(cq){var cw=this._getAnchorItem();

if(cw===null){this._setAnchorItem(cw=this._getFirstSelectable());
}this._setLeadItem(cs);
this._selectItemRange(cw,cs,cp);
}else{this._setAnchorItem(cs);
this._setLeadItem(cs);

if(!cp){this._setSelectedItem(cs);
}}break;
}this._scrollItemIntoView(cs);
}}
if(cr){event.stop();
this._fireChange(R);
}this._userInteraction=false;
},_selectAllItems:function(){var bt=this.getSelectables();

for(var i=0,l=bt.length;i<l;i++){this._addToSelection(bt[i]);
}},_clearSelection:function(){var n=this.__ot;

for(var o in n){this._removeFromSelection(n[o]);
}this.__ot={};
},_selectItemRange:function(by,bz,bA){var bD=this._getSelectableRange(by,bz);
if(!bA){var bC=this.__ot;
var bE=this.__oO(bD);

for(var bB in bC){if(!bE[bB]){this._removeFromSelection(bC[bB]);
}}}for(var i=0,l=bD.length;i<l;i++){this._addToSelection(bD[i]);
}},_deselectItemRange:function(bv,bw){var bx=this._getSelectableRange(bv,bw);

for(var i=0,l=bx.length;i<l;i++){this._removeFromSelection(bx[i]);
}},__oO:function(bQ){var bS={};
var bR;

for(var i=0,l=bQ.length;i<l;i++){bR=bQ[i];
bS[this._selectableToHashCode(bR)]=bR;
}return bS;
},_getSelectedItem:function(){for(var bV in this.__ot){return this.__ot[bV];
}return null;
},_setSelectedItem:function(f){if(this._isSelectable(f)){var g=this.__ot;
var h=this._selectableToHashCode(f);

if(!g[h]||qx.lang.Object.hasMinLength(g,2)){this._clearSelection();
this._addToSelection(f);
}}},_addToSelection:function(cm){var cn=this._selectableToHashCode(cm);

if(!this.__ot[cn]&&this._isSelectable(cm)){this.__ot[cn]=cm;
this._styleSelectable(cm,F,true);
this.__oI=true;
}},_toggleInSelection:function(c){var d=this._selectableToHashCode(c);

if(!this.__ot[d]){this.__ot[d]=c;
this._styleSelectable(c,F,true);
}else{delete this.__ot[d];
this._styleSelectable(c,F,false);
}this.__oI=true;
},_removeFromSelection:function(bX){var bY=this._selectableToHashCode(bX);

if(this.__ot[bY]!=null){delete this.__ot[bY];
this._styleSelectable(bX,F,false);
this.__oI=true;
}},_replaceMultiSelection:function(bl){var bo=false;
var br,bq;
var bm={};

for(var i=0,l=bl.length;i<l;i++){br=bl[i];

if(this._isSelectable(br)){bq=this._selectableToHashCode(br);
bm[bq]=br;
}}var bs=bl[0];
var bn=br;
var bp=this.__ot;

for(var bq in bp){if(bm[bq]){delete bm[bq];
}else{br=bp[bq];
delete bp[bq];
this._styleSelectable(br,F,false);
bo=true;
}}for(var bq in bm){br=bp[bq]=bm[bq];
this._styleSelectable(br,F,true);
bo=true;
}if(!bo){return false;
}this._scrollItemIntoView(bn);
this._setLeadItem(bs);
this._setAnchorItem(bs);
this.__oI=true;
this._fireChange();
},_fireChange:function(cK){if(this.__oI){this.__oJ=cK||null;
this.fireDataEvent(I,this.getSelection());
delete this.__oI;
}}},destruct:function(){this._disposeObjects(S);
this.__ot=this.__oM=this.__oL=null;
this.__oK=null;
}});
})();
(function(){var K="vertical",J="under",I="above",H="qx.ui.core.selection.Widget",G="left",F="right";
qx.Class.define(H,{extend:qx.ui.core.selection.Abstract,construct:function(j){qx.ui.core.selection.Abstract.call(this);
this.__oP=j;
},members:{__oP:null,_isSelectable:function(u){return this._isItemSelectable(u)&&u.getLayoutParent()===this.__oP;
},_selectableToHashCode:function(O){return O.$$hash;
},_styleSelectable:function(P,Q,R){R?P.addState(Q):P.removeState(Q);
},_capture:function(){this.__oP.capture();
},_releaseCapture:function(){this.__oP.releaseCapture();
},_isItemSelectable:function(E){if(this._userInteraction){return E.isVisible()&&E.isEnabled();
}else{return E.isVisible();
}},_getWidget:function(){return this.__oP;
},_getLocation:function(){var D=this.__oP.getContentElement().getDomElement();
return D?qx.bom.element.Location.get(D):null;
},_getDimension:function(){return this.__oP.getInnerSize();
},_getSelectableLocationX:function(n){var o=n.getBounds();

if(o){return {left:o.left,right:o.left+o.width};
}},_getSelectableLocationY:function(v){var w=v.getBounds();

if(w){return {top:w.top,bottom:w.top+w.height};
}},_getScroll:function(){return {left:0,top:0};
},_scrollBy:function(k,m){},_scrollItemIntoView:function(M){this.__oP.scrollChildIntoView(M);
},getSelectables:function(p){var q=false;

if(!p){q=this._userInteraction;
this._userInteraction=true;
}var t=this.__oP.getChildren();
var r=[];
var s;

for(var i=0,l=t.length;i<l;i++){s=t[i];

if(this._isItemSelectable(s)){r.push(s);
}}this._userInteraction=q;
return r;
},_getSelectableRange:function(x,y){if(x===y){return [x];
}var C=this.__oP.getChildren();
var z=[];
var B=false;
var A;

for(var i=0,l=C.length;i<l;i++){A=C[i];

if(A===x||A===y){if(B){z.push(A);
break;
}else{B=true;
}}
if(B&&this._isItemSelectable(A)){z.push(A);
}}return z;
},_getFirstSelectable:function(){var L=this.__oP.getChildren();

for(var i=0,l=L.length;i<l;i++){if(this._isItemSelectable(L[i])){return L[i];
}}return null;
},_getLastSelectable:function(){var N=this.__oP.getChildren();

for(var i=N.length-1;i>0;i--){if(this._isItemSelectable(N[i])){return N[i];
}}return null;
},_getRelatedSelectable:function(a,b){var e=this.__oP.getOrientation()===K;
var d=this.__oP.getChildren();
var c=d.indexOf(a);
var f;

if((e&&b===I)||(!e&&b===G)){for(var i=c-1;i>=0;i--){f=d[i];

if(this._isItemSelectable(f)){return f;
}}}else if((e&&b===J)||(!e&&b===F)){for(var i=c+1;i<d.length;i++){f=d[i];

if(this._isItemSelectable(f)){return f;
}}}return null;
},_getPage:function(g,h){if(h){return this._getFirstSelectable();
}else{return this._getLastSelectable();
}}},destruct:function(){this.__oP=null;
}});
})();
(function(){var a="qx.ui.core.selection.ScrollArea";
qx.Class.define(a,{extend:qx.ui.core.selection.Widget,members:{_isSelectable:function(b){return this._isItemSelectable(b)&&b.getLayoutParent()===this._getWidget().getChildrenContainer();
},_getDimension:function(){return this._getWidget().getPaneSize();
},_getScroll:function(){var p=this._getWidget();
return {left:p.getScrollX(),top:p.getScrollY()};
},_scrollBy:function(q,r){var s=this._getWidget();
s.scrollByX(q);
s.scrollByY(r);
},_getPage:function(c,d){var h=this.getSelectables();
var length=h.length;
var l=h.indexOf(c);
if(l===-1){throw new Error("Invalid lead item: "+c);
}var e=this._getWidget();
var n=e.getScrollY();
var innerHeight=e.getInnerSize().height;
var top,g,m;

if(d){var k=n;
var i=l;
while(1){for(;i>=0;i--){top=e.getItemTop(h[i]);
if(top<k){m=i+1;
break;
}}if(m==null){var o=this._getFirstSelectable();
return o==c?null:o;
}if(m>=l){k-=innerHeight+n-e.getItemBottom(c);
m=null;
continue;
}return h[m];
}}else{var j=innerHeight+n;
var i=l;
while(1){for(;i<length;i++){g=e.getItemBottom(h[i]);
if(g>j){m=i-1;
break;
}}if(m==null){var f=this._getLastSelectable();
return f==c?null:f;
}if(m<=l){j+=e.getItemTop(c)-n;
m=null;
continue;
}return h[m];
}}}}});
})();
(function(){var e="right",d="above",c="left",b="under",a="qx.ui.tree.SelectionManager";
qx.Class.define(a,{extend:qx.ui.core.selection.ScrollArea,members:{_getSelectableLocationY:function(f){var g=f.getBounds();

if(g){var top=this._getWidget().getItemTop(f);
return {top:top,bottom:top+g.height};
}},_isSelectable:function(n){return this._isItemSelectable(n)&&n instanceof qx.ui.tree.AbstractTreeItem;
},_getSelectableFromMouseEvent:function(event){return this._getWidget().getTreeItem(event.getTarget());
},getSelectables:function(t){var w=false;

if(!t){w=this._userInteraction;
this._userInteraction=true;
}var v=this._getWidget();
var x=[];

if(v.getRoot()!=null){var u=v.getRoot().getItems(true,!!t,v.getHideRoot());

for(var i=0;i<u.length;i++){if(this._isSelectable(u[i])){x.push(u[i]);
}}}this._userInteraction=w;
return x;
},_getSelectableRange:function(o,p){if(o===p){return [o];
}var q=this.getSelectables();
var r=q.indexOf(o);
var s=q.indexOf(p);

if(r<0||s<0){return [];
}
if(r<s){return q.slice(r,s+1);
}else{return q.slice(s,r+1);
}},_getFirstSelectable:function(){return this.getSelectables()[0]||null;
},_getLastSelectable:function(){var m=this.getSelectables();

if(m.length>0){return m[m.length-1];
}else{return null;
}},_getRelatedSelectable:function(h,j){var k=this._getWidget();
var l=null;

switch(j){case d:l=k.getPreviousNodeOf(h,false);
break;
case b:l=k.getNextNodeOf(h,false);
break;
case c:case e:break;
}
if(!l){return null;
}
if(this._isSelectable(l)){return l;
}else{return this._getRelatedSelectable(l,j);
}}}});
})();
(function(){var l="dblclick",k="click",j="Boolean",h="excluded",g="visible",f="qx.event.type.Data",d="_applyOpenMode",c="Space",b="Left",a="Enter",z="changeOpenMode",y="_applyRootOpenClose",x="changeSelection",w="qx.ui.tree.Tree",v="tree",u="_applyHideRoot",t="changeRoot",s="_applyRoot",r="keypress",q="none",o="pane",p="Right",m="qx.ui.tree.AbstractTreeItem",n="__oQ";
qx.Class.define(w,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IModelSelection,qx.ui.form.IForm],include:[qx.ui.core.MMultiSelectionHandling,qx.ui.core.MContentPadding,qx.ui.form.MModelSelection,qx.ui.form.MForm],construct:function(){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__oQ=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowShrinkY:false,allowGrowX:true});
this.getChildControl(o).add(this.__oQ);
this.initOpenMode();
this.initRootOpenClose();
this.addListener(x,this._onChangeSelection,this);
this.addListener(r,this._onKeyPress,this);
},events:{addItem:f,removeItem:f},properties:{openMode:{check:[k,l,q],init:l,apply:d,event:z,themeable:true},root:{check:m,init:null,nullable:true,event:t,apply:s},hideRoot:{check:j,init:false,apply:u},rootOpenClose:{check:j,init:false,apply:y},appearance:{refine:true,init:v},focusable:{refine:true,init:true}},members:{__oQ:null,SELECTION_MANAGER:qx.ui.tree.SelectionManager,getChildrenContainer:function(){return this.__oQ;
},_applyRoot:function(U,V){var W=this.getChildrenContainer();

if(V){W.remove(V);

if(V.hasChildren()){W.remove(V.getChildrenContainer());
}}
if(U){W.add(U);

if(U.hasChildren()){W.add(U.getChildrenContainer());
}U.setVisibility(this.getHideRoot()?h:g);
U.recursiveAddToWidgetQueue();
}},_applyHideRoot:function(bd,be){var bf=this.getRoot();

if(!bf){return;
}bf.setVisibility(bd?h:g);
bf.recursiveAddToWidgetQueue();
},_applyRootOpenClose:function(K,L){var M=this.getRoot();

if(!M){return;
}M.recursiveAddToWidgetQueue();
},_getContentPaddingTarget:function(){return this.__oQ;
},getNextNodeOf:function(N,O){if((O!==false||N.isOpen())&&N.hasChildren()){return N.getChildren()[0];
}
while(N){var parent=N.getParent();

if(!parent){return null;
}var Q=parent.getChildren();
var P=Q.indexOf(N);

if(P>-1&&P<Q.length-1){return Q[P+1];
}N=parent;
}return null;
},getPreviousNodeOf:function(A,B){var parent=A.getParent();

if(!parent){return null;
}
if(this.getHideRoot()){if(parent==this.getRoot()){if(parent.getChildren()[0]==A){return null;
}}}else{if(A==this.getRoot()){return null;
}}var E=parent.getChildren();
var C=E.indexOf(A);

if(C>0){var D=E[C-1];

while((B!==false||D.isOpen())&&D.hasChildren()){var F=D.getChildren();
D=F[F.length-1];
}return D;
}else{return parent;
}},getNextSiblingOf:function(bg){if(bg==this.getRoot()){return null;
}var parent=bg.getParent();
var bh=parent.getChildren();
var bi=bh.indexOf(bg);

if(bi<bh.length-1){return bh[bi+1];
}return null;
},getPreviousSiblingOf:function(R){if(R==this.getRoot()){return null;
}var parent=R.getParent();
var S=parent.getChildren();
var T=S.indexOf(R);

if(T>0){return S[T-1];
}return null;
},getItems:function(bb,bc){if(this.getRoot()!=null){return this.getRoot().getItems(bb,bc,this.getHideRoot());
}else{return [];
}},getChildren:function(){if(this.getRoot()!=null){return [this.getRoot()];
}else{return [];
}},getTreeItem:function(I){while(I){if(I==this){return null;
}
if(I instanceof qx.ui.tree.AbstractTreeItem){return I;
}I=I.getLayoutParent();
}return null;
},_applyOpenMode:function(G,H){if(H==k){this.removeListener(k,this._onOpen,this);
}else if(H==l){this.removeListener(l,this._onOpen,this);
}
if(G==k){this.addListener(k,this._onOpen,this);
}else if(G==l){this.addListener(l,this._onOpen,this);
}},_onOpen:function(e){var X=this.getTreeItem(e.getTarget());

if(!X||!X.isOpenable()){return;
}X.setOpen(!X.isOpen());
e.stopPropagation();
},_onChangeSelection:function(e){var ba=e.getData();
for(var i=0;i<ba.length;i++){var Y=ba[i];
while(Y.getParent()!=null){Y=Y.getParent();
Y.setOpen(true);
}}},_onKeyPress:function(e){var J=this._getLeadItem();

if(J!==null){switch(e.getKeyIdentifier()){case b:if(J.isOpenable()&&J.isOpen()){J.setOpen(false);
}break;
case p:if(J.isOpenable()&&!J.isOpen()){J.setOpen(true);
}break;
case a:case c:if(J.isOpenable()){J.toggleOpen();
}break;
}}}},destruct:function(){this._disposeObjects(n);
}});
})();
(function(){var bs="open",br="auto",bq="middle",bp="icon",bo="label",bn="changeOpen",bm="excluded",bl="visible",bk="String",bj="opened",bL="always",bK="qx.ui.tree.AbstractTreeItem",bJ="addItem",bI="Boolean",bH="__oV",bG="Integer",bF="_applyIndent",bE="changeOpenSymbolMode",bD="_applyOpenSymbolMode",bC="__oR",bz="resize",bA="",bx="removeItem",by="__oS",bv="abstract",bw="never",bt="_applyIcon",bu="_applyOpen",bB="_applyLabel";
qx.Class.define(bK,{extend:qx.ui.core.Widget,type:bv,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel],construct:function(){qx.ui.core.Widget.call(this);
this.__oR=[];
this._setLayout(new qx.ui.layout.HBox());
this._addWidgets();
this.initOpen();
},properties:{open:{check:bI,init:false,event:bn,apply:bu},openSymbolMode:{check:[bL,bw,br],init:br,event:bE,apply:bD},indent:{check:bG,init:19,apply:bF,themeable:true},parent:{check:bK,nullable:true},icon:{check:bk,apply:bt,nullable:true,themeable:true},label:{check:bk,apply:bB,init:bA}},members:{__oR:null,__oS:null,__oT:null,__oU:null,__oV:null,_addWidgets:function(){throw new Error("Abstract method call.");
},_createChildControlImpl:function(P){var Q;

switch(P){case bo:Q=new qx.ui.basic.Label().set({alignY:bq,value:this.getLabel()});
break;
case bp:Q=new qx.ui.basic.Image().set({alignY:bq,source:this.getIcon()});
break;
case bs:Q=new qx.ui.tree.FolderOpenButton().set({alignY:bq});
Q.addListener(bn,this._onChangeOpen,this);
Q.addListener(bz,this._updateIndent,this);
break;
}return Q||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,P);
},getTree:function(){var bi=this;

while(bi.getParent()){bi=bi.getParent();
}var bh=bi.getLayoutParent()?bi.getLayoutParent().getLayoutParent():0;

if(bh&&bh instanceof qx.ui.core.scroll.ScrollPane){return bh.getLayoutParent();
}return null;
},addWidget:function(bb,bc){this._add(bb,bc);
},addSpacer:function(){if(!this.__oV){this.__oV=new qx.ui.core.Spacer();
}else{this._remove(this.__oV);
}this._add(this.__oV);
},addOpenButton:function(){this._add(this.getChildControl(bs));
},_onChangeOpen:function(e){if(this.isOpenable()){this.setOpen(e.getData());
}},addIcon:function(){var p=this.getChildControl(bp);

if(this.__oU){this._remove(p);
}this._add(p);
this.__oU=true;
},addLabel:function(x){var y=this.getChildControl(bo);

if(this.__oT){this._remove(y);
}
if(x){this.setLabel(x);
}else{y.setValue(this.getLabel());
}this._add(y);
this.__oT=true;
},addState:function(f){qx.ui.core.Widget.prototype.addState.call(this,f);
var h=this._getChildren();

for(var i=0,l=h.length;i<l;i++){var g=h[i];

if(g.addState){h[i].addState(f);
}}},removeState:function(B){qx.ui.core.Widget.prototype.removeState.call(this,B);
var D=this._getChildren();

for(var i=0,l=D.length;i<l;i++){var C=D[i];

if(C.addState){D[i].removeState(B);
}}},_applyIcon:function(j,k){var m=this.getChildControl(bp,true);

if(m){m.setSource(j);
}},_applyLabel:function(R,S){var T=this.getChildControl(bo,true);

if(T){T.setValue(R);
}},_applyOpen:function(bd,be){if(this.hasChildren()){this.getChildrenContainer().setVisibility(bd?bl:bm);
}var open=this.getChildControl(bs,true);

if(open){open.setOpen(bd);
}bd?this.addState(bj):this.removeState(bj);
},isOpenable:function(){var bS=this.getOpenSymbolMode();
return (bS===bL||bS===br&&this.hasChildren());
},_shouldShowOpenSymbol:function(){var open=this.getChildControl(bs,true);

if(!open){return false;
}var d=this.getTree();

if(!d.getRootOpenClose()){if(d.getHideRoot()){if(d.getRoot()==this.getParent()){return false;
}}else{if(d.getRoot()==this){return false;
}}}return this.isOpenable();
},_applyOpenSymbolMode:function(q,r){this._updateIndent();
},_updateIndent:function(){if(!this.getTree()){return;
}var o=0;
var open=this.getChildControl(bs,true);

if(open){if(this._shouldShowOpenSymbol()){open.show();
var n=open.getBounds();

if(n){o=n.width;
}else{return;
}}else{open.exclude();
}}
if(this.__oV){this.__oV.setWidth((this.getLevel()+1)*this.getIndent()-o);
}},_applyIndent:function(z,A){this._updateIndent();
},getLevel:function(){var a=this.getTree();

if(!a){return;
}var b=this;
var c=-1;

while(b){b=b.getParent();
c+=1;
}if(a.getHideRoot()){c-=1;
}
if(!a.getRootOpenClose()){c-=1;
}return c;
},syncWidget:function(){this._updateIndent();
},getChildrenContainer:function(){if(!this.__oS){this.__oS=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({visibility:this.isOpen()?bl:bm});
}return this.__oS;
},hasChildrenContainer:function(){return this.__oS;
},getParentChildrenContainer:function(){if(this.getParent()){return this.getParent().getChildrenContainer();
}else if(this.getLayoutParent()){return this.getLayoutParent();
}else{return null;
}},getChildren:function(){return this.__oR;
},hasChildren:function(){return this.__oR?this.__oR.length>0:false;
},getItems:function(I,J,K){if(K!==false){var L=[];
}else{var L=[this];
}var O=this.hasChildren()&&(J!==false||this.isOpen());

if(O){var N=this.getChildren();

if(I===false){L=L.concat(N);
}else{for(var i=0,M=N.length;i<M;i++){L=L.concat(N[i].getItems(I,J,false));
}}}return L;
},recursiveAddToWidgetQueue:function(){var bU=this.getItems(true,true,false);

for(var i=0,l=bU.length;i<l;i++){qx.ui.core.queue.Widget.add(bU[i]);
}},__oW:function(){if(this.getParentChildrenContainer()){this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(),this);
}},add:function(U){var V=this.getChildrenContainer();
var Y=this.getTree();

for(var i=0,l=arguments.length;i<l;i++){var ba=arguments[i];
var X=ba.getParent();

if(X){X.remove(ba);
}ba.setParent(this);
var W=this.hasChildren();
V.add(ba);

if(ba.hasChildren()){V.add(ba.getChildrenContainer());
}this.__oR.push(ba);

if(!W){this.__oW();
}
if(Y){ba.recursiveAddToWidgetQueue();
Y.fireNonBubblingEvent(bJ,qx.event.type.Data,[ba]);
}}
if(Y){qx.ui.core.queue.Widget.add(this);
}},addAt:function(bM,bN){{};

if(bN==this.__oR.length){this.add(bM);
return;
}var bR=bM.getParent();

if(bR){bR.remove(bM);
}var bP=this.getChildrenContainer();
bM.setParent(this);
var bQ=this.hasChildren();
var bO=this.__oR[bN];
bP.addBefore(bM,bO);

if(bM.hasChildren()){bP.addAfter(bM.getChildrenContainer(),bM);
}qx.lang.Array.insertAt(this.__oR,bM,bN);

if(!bQ){this.__oW();
}
if(this.getTree()){bM.recursiveAddToWidgetQueue();
qx.ui.core.queue.Widget.add(this);
}},addBefore:function(G,H){{};
this.addAt(G,this.__oR.indexOf(H));
},addAfter:function(bf,bg){{};
this.addAt(bf,this.__oR.indexOf(bg)+1);
},addAtBegin:function(bT){this.addAt(bT,0);
},remove:function(s){for(var i=0,l=arguments.length;i<l;i++){var w=arguments[i];

if(this.__oR.indexOf(w)==-1){this.warn("Cannot remove treeitem '"+w+"'. It is not a child of this tree item.");
return;
}var t=this.getChildrenContainer();

if(w.hasChildrenContainer()){var v=w.getChildrenContainer();

if(t.getChildren().indexOf(v)>=0){t.remove(v);
}}qx.lang.Array.remove(this.__oR,w);
w.setParent(null);
t.remove(w);
}var u=this.getTree();

if(u){u.fireNonBubblingEvent(bx,qx.event.type.Data,[w]);
}qx.ui.core.queue.Widget.add(this);
},removeAt:function(E){var F=this.__oR[E];

if(F){this.remove(F);
}},removeAll:function(){for(var i=this.__oR.length-1;i>=0;i--){this.remove(this.__oR[i]);
}}},destruct:function(){this._disposeArray(bC);
this._disposeObjects(bH,by);
}});
})();
(function(){var i="opened",h="click",g="changeOpen",f="Boolean",d="qx.ui.tree.FolderOpenButton",c="_applyOpen",b="mouseup",a="mousedown";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MExecutable,construct:function(){qx.ui.basic.Image.call(this);
this.initOpen();
this.addListener(h,this._onClick);
this.addListener(a,this._stopPropagation,this);
this.addListener(b,this._stopPropagation,this);
},properties:{open:{check:f,init:false,event:g,apply:c}},members:{_applyOpen:function(j,k){j?this.addState(i):this.removeState(i);
this.execute();
},_stopPropagation:function(e){e.stopPropagation();
},_onClick:function(e){this.toggleOpen();
e.stopPropagation();
}}});
})();
(function(){var b="tree-folder",a="qx.ui.tree.TreeFolder";
qx.Class.define(a,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:b}},members:{_addWidgets:function(){this.addSpacer();
this.addOpenButton();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var a="inspector.property.IPropertyListController";
qx.Interface.define(a,{members:{getQxObject:function(){return true;
},setSelectedProperty:function(b){return true;
},getSelectedProperty:function(){return true;
},getInheritedStatus:function(){return true;
},getGroupStatus:function(){return true;
},gotoSelectedWidget:function(){return true;
},getFilter:function(){return true;
}}});
})();
(function(){var t="key",s="classname",r="execute",q="changeValue",p="set",o="qx.version",n="Group by inheritance",m="inspector/images/icons/api.png",l="qx.ui.core.Widget",k="_filter",V="_propertyList",U="_setPropertyToDefaultButton",T="inspector/images/icons/highlight.png",S="http://demo.qooxdoo.org/",R="icon/22/actions/view-refresh.png",Q="#",P="_highlightCurrentPropertyButton",O="View",N="get",M="_reloadButton",A="/apiviewer/",B="_setNullButton",y="qx.ui.core.Parent",z="Property",w="inspector/images/icons/setnull.png",x="inspector/images/icons/goto.png",u="qx.ui.core.ClientDocument",v="_menu",C="Group by category",D="Show Inherited Porperties",G="_groupButton",F="~",I="_gotoSelectedPropertyButton",H="_inheritedButton",K="current",J="inspector/images/icons/setinit.png",E=" (Loading...)",L="inspector.property.PropertyWindow";
qx.Class.define(L,{extend:inspector.components.AbstractWindow,implement:inspector.property.IPropertyListController,construct:function(){inspector.components.AbstractWindow.call(this,z);
this._filter=new inspector.property.Filter();
this._addToolbarButtons();
this._createMainElement();
},statics:{RELOAD_BUTTON_TOOLTIP_TEXT:"Reload the window.",SHOW_API_BUTTON_TOOLTIP_TEXT:"Show the API of the selected object or property.",SET_NULL_BUTTON_TOOLTIP_TEXT:"Set the currently selected property to null.",SET_DEFAULT_BUTTON_TOOLTIP_TEXT:"Set the currently selected property to its initial value.",HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT:"Highlight the currently selected property.",GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT:"Go to the currently selected property.",PROPERTY_CAPTION_TITLE:"Properties"},members:{_propertyList:null,_propertyListFull:null,_propertyListHtmlTable:null,_reloadButton:null,_reloadToolTip:null,_apiButtonToolTip:null,_setNullButton:null,_setNullTooltip:null,_setPropertyToDefaultButton:null,_setPropertyToDefaultTooltip:null,_highlightCurrentPropertyButton:null,_highlightCurrentPropertyTooltip:null,_gotoSelectedPropertyButton:null,_gotoSelectedPropertyTooltip:null,_menu:null,_currentlySelectedProperty:null,_qxObject:null,_showInherited:false,_reloadTimer:null,_filter:null,setInitSizeAndPosition:function(){var bh=qx.bom.Viewport.getWidth()-this.getWidth();
var bg=parseInt((qx.bom.Viewport.getHeight()-30)/3);
this.moveTo(bh,30+2*bg);
this.setHeight(bg);
},select:function(i){if(this._qxObject==i){return;
}this._qxObject=i;
this.setCaption(this.self(arguments).PROPERTY_CAPTION_TITLE+E);
var self=this;
window.setTimeout(function(){self._propertyList.build();
if(self._currentlySelectedProperty!=null){var be=self._currentlySelectedProperty.getUserData(t);
var bd=self._currentlySelectedProperty.getUserData(s);
if(self._propertyList.containsProperty(be,bd)){self._switchPropertyButtons();
}else{self._currentlySelectedProperty=null;
self._setNullButton.setEnabled(false);
self._setPropertyToDefaultButton.setEnabled(false);
self._highlightCurrentPropertyButton.setEnabled(false);
self._gotoSelectedPropertyButton.setEnabled(false);
}}self.setCaption(inspector.property.PropertyWindow.PROPERTY_CAPTION_TITLE);
},0);
},getSelection:function(){return this._qxObject;
},getQxObject:function(){return this._qxObject;
},setSelectedProperty:function(bc){this._currentlySelectedProperty=bc;
this._switchPropertyButtons();
},getSelectedProperty:function(){return this._currentlySelectedProperty;
},getInheritedStatus:function(){return this._showInherited;
},getGroupStatus:function(){return this._groupButton.getValue();
},gotoSelectedWidget:function(){this._gotoSelectedPropertyButtonEventListener();
},getFilter:function(){return this._filter;
},_createMainElement:function(){this._propertyList=new inspector.property.PropertyList(this);
var bi=new qx.ui.container.Scroll();
this.add(bi,{flex:1});
bi.add(this._propertyList);
},_addToolbarButtons:function(){this._createMenu();
var bq=new qx.ui.toolbar.MenuButton(O,null,this._menu);
this._toolbar.add(bq);
this._toolbar.addSeparator();
this._reloadButton=new qx.ui.toolbar.Button(null,R);
this._reloadButton.setToolTipText(this.self(arguments).RELOAD_BUTTON_TOOLTIP_TEXT);
this._reloadButton.addListener(r,function(){this._propertyList.build();
},this);
this._toolbar.add(this._reloadButton);
this._toolbar.addSeparator();
var bp=new qx.ui.toolbar.Button(null,m);
bp.setToolTipText(this.self(arguments).SHOW_API_BUTTON_TOOLTIP_TEXT);
bp.addListener(r,this._onOpenApiWindow,this);
this._toolbar.add(bp);
this._toolbar.addSpacer();
this._setNullButton=new qx.ui.toolbar.Button(null,w);
this._setNullButton.setToolTipText(this.self(arguments).SET_NULL_BUTTON_TOOLTIP_TEXT);
this._setNullButton.addListener(r,this._setNullButtonEventListener,this);
this._setNullButton.setEnabled(false);
this._toolbar.add(this._setNullButton);
this._setPropertyToDefaultButton=new qx.ui.toolbar.Button(null,J);
this._setPropertyToDefaultButton.setToolTipText(this.self(arguments).SET_DEFAULT_BUTTON_TOOLTIP_TEXT);
this._setPropertyToDefaultButton.addListener(r,this._setPropertyToDefaultButtonEventListener,this);
this._setPropertyToDefaultButton.setEnabled(false);
this._toolbar.add(this._setPropertyToDefaultButton);
this._highlightCurrentPropertyButton=new qx.ui.toolbar.Button(null,T);
this._highlightCurrentPropertyButton.setToolTipText(this.self(arguments).HIGHLIGHT_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT);
this._highlightCurrentPropertyButton.addListener(r,this._highlightCurrentPropertyButtonEventListener,this);
this._highlightCurrentPropertyButton.setEnabled(false);
this._gotoSelectedPropertyButton=new qx.ui.toolbar.Button(null,x);
this._gotoSelectedPropertyButton.setToolTipText(this.self(arguments).GOTO_SELECTED_PROPERTY_BUTTON_TOOLTIP_TEXT);
this._gotoSelectedPropertyButton.addListener(r,this._gotoSelectedPropertyButtonEventListener,this);
this._gotoSelectedPropertyButton.setEnabled(false);
},_createMenu:function(){this._menu=new qx.ui.menu.Menu();
this._inheritedButton=new qx.ui.menu.CheckBox(D);
this._inheritedButton.addListener(q,this._switchInheritedStatus,this);
this._inheritedButton.setValue(true);
this._menu.add(this._inheritedButton);
this._menu.addSeparator();
var j=new qx.ui.menu.RadioButton(n);
j.addListener(q,function(e){if(this._qxObject!=null){this._propertyList.build();
}this._inheritedButton.setEnabled(true);
},this);
j.setValue(true);
this._menu.add(j);
this._groupButton=new qx.ui.menu.RadioButton(C);
this._groupButton.addListener(q,function(e){if(this._qxObject!=null){this._propertyList.build();
}this._inheritedButton.setEnabled(false);
},this);
this._menu.add(this._groupButton);
new qx.ui.form.RadioGroup(j,this._groupButton);
},_switchPropertyButtons:function(){if(this._currentlySelectedProperty==null){this._setNullButton.setEnabled(false);
this._setPropertyToDefaultButton.setEnabled(false);
this._highlightCurrentPropertyButton.setEnabled(false);
this._gotoSelectedPropertyButton.setEnabled(false);
return ;
}var c=this._currentlySelectedProperty.getUserData(s);
var d=this._currentlySelectedProperty.getUserData(t);
var a=qx.core.Init.getApplication().getIframeWindowObject();
var g=a.qx.Class.getByName(c).$$properties;
var f=g[d];
if(f.nullable){this._setNullButton.setEnabled(true);
}else{this._setNullButton.setEnabled(false);
}if(f.init){this._setPropertyToDefaultButton.setEnabled(true);
}else{this._setPropertyToDefaultButton.setEnabled(false);
}if(d!=undefined){try{var h=N+qx.lang.String.firstUp(d);
if(this._qxObject[h]==undefined){this._setNullButton.setEnabled(false);
this._setPropertyToDefaultButton.setEnabled(false);
this._highlightCurrentPropertyButton.setEnabled(false);
this._gotoSelectedPropertyButton.setEnabled(false);
return ;
}var b=this._qxObject[h].call(this._qxObject);
if((f.check==l||f.check==y)&&(this._qxObject.classname!=u)&&(b!=null)){this._highlightCurrentPropertyButton.setEnabled(true);
this._gotoSelectedPropertyButton.setEnabled(true);
}else{this._highlightCurrentPropertyButton.setEnabled(false);
this._gotoSelectedPropertyButton.setEnabled(false);
}}catch(bf){alert("Error during reading the selected Property: "+bf);
this._currentlySelectedProperty.setBackgroundColor(null);
this._currentlySelectedProperty=null;
this._highlightCurrentPropertyButton.setEnabled(false);
this._gotoSelectedPropertyButton.setEnabled(false);
}}},_onOpenApiWindow:function(){if(this._qxObject!=null){if(this._currentlySelectedProperty!=null){var ba=this._currentlySelectedProperty.getUserData(s);
var bb=this._currentlySelectedProperty.getUserData(t);
this._openApiWindow(ba,bb);
}else{this._openApiWindow(this._qxObject.classname);
}}else{this._openApiWindow();
}},_openApiWindow:function(br,bs){var bt=qx.core.Init.getApplication()._loadedWindow.qx.core.Setting.get(o);
var bu=S+(bt||K)+A;

if(br!=null){bu+=Q+br;
if(bs!=null){bu+=F+bs;
}}var bv=window.open(bu);
bv.focus();
},_setNullButtonEventListener:function(){var W=this._currentlySelectedProperty.getUserData(s);
var Y=this._currentlySelectedProperty.getUserData(t);
var X=p+qx.lang.String.firstUp(Y);
try{this._qxObject[X].call(this._qxObject,null);
var W=this._currentlySelectedProperty.getUserData(s);
var Y=this._currentlySelectedProperty.getUserData(t);
this._propertyList.update(Y,W);
this._switchPropertyButtons();
}catch(e){alert(e);
}},_setPropertyToDefaultButtonEventListener:function(){var bk=this._currentlySelectedProperty.getUserData(s);
var bl=this._currentlySelectedProperty.getUserData(t);
var bj=qx.core.Init.getApplication().getIframeWindowObject();
var bo=bj.qx.Class.getByName(bk).$$properties;
var bn=bo[bl];
var bm=p+qx.lang.String.firstUp(bl);
try{this._qxObject[bm].call(this._qxObject,bn.init);
var bk=this._currentlySelectedProperty.getUserData(s);
var bl=this._currentlySelectedProperty.getUserData(t);
this._propertyList.update(bl,bk);
}catch(e){alert(e);
}},_highlightCurrentPropertyButtonEventListener:function(){},_gotoSelectedPropertyButtonEventListener:function(){},_switchInheritedStatus:function(e){this._showInherited=e.getCurrentTarget().getValue();

if(this._propertyList){this._propertyList.switchInheritedStatus(this._showInherited);
}}},destruct:function(){this._qxObject=null;
this._disposeObjects(k,v,H,G,M,B,U,P,I,V);
}});
})();
(function(){var a="inspector.property.IFilter";
qx.Interface.define(a,{members:{sortIn:function(b,c,d){return true;
},getResult:function(){return true;
},empty:function(){return true;
}}});
})();
(function(){var k="Behavior",j="Content",h="Appearance",g="Dimension",f="Spacing",e="Tooltip & Context menu",d="Visibility",c="height",b="content",a="spacing",T="droppable",S="shadow",R="cursor",Q="decorator",P="opacity",O="zIndex",N="color",M="appearance",L="icon",K="inspector.property.Filter",r="value",s="font",p="keepfocus",q="focusable",n="enabled",o="allowShrink",l="keepactive",m="draggable",t="name",u="align",B="width",z="visibility",E="i",D="padding",G="selectable",F="rich",w="allowStretch",J="tabindex",I="anonymous",H="tooltip",v="label",x="margin",y="contextmenu",A="allowGrow",C="checked";
qx.Class.define(K,{extend:qx.core.Object,implement:inspector.property.IFilter,statics:{DEFAULT_CATEGORY_NAME:"Rest"},construct:function(){qx.core.Object.call(this);
this._tests=[];
this._defineTests();
this._createCategories();
},members:{_categories:null,_properties:null,_classnames:null,_tests:null,sortIn:function(U,V,W){for(var i=0;i<this._tests.length;i++){var X=new RegExp(this._tests[i][0],E);
if(X.test(U)){var Y=this._categories[this._tests[i][1]];
this._properties[Y][U]=V;
this._classnames[Y][U]=W;
return ;
}}this._properties[this._categories[this.self(arguments).DEFAULT_CATEGORY_NAME]][U]=V;
this._classnames[this._categories[this.self(arguments).DEFAULT_CATEGORY_NAME]][U]=W;
},getResult:function(){var ba=[];

for(var name in this._categories){ba[this._categories[name]]=name;
}return {names:ba,props:this._properties,classes:this._classnames};
},empty:function(){this.__tT();
},_createCategories:function(){this._categories=[];
var i=1;

for(var bb=0;bb<this._tests.length;bb++){if(this._categories[this._tests[bb][1]]==undefined){this._categories[this._tests[bb][1]]=i;
i++;
}}this._categories[this.self(arguments).DEFAULT_CATEGORY_NAME]=i;
this.__tT();
},__tT:function(){this._properties=[];
this._classnames=[];
for(var i=1;i<=this._categories[this.self(arguments).DEFAULT_CATEGORY_NAME];i++){this._properties[i]={};
this._classnames[i]=[];
}},_defineTests:function(){this._tests.push([x,f]);
this._tests.push([a,f]);
this._tests.push([D,f]);
this._tests.push([u,f]);
this._tests.push([M,h]);
this._tests.push([N,h]);
this._tests.push([Q,h]);
this._tests.push([S,h]);
this._tests.push([s,h]);
this._tests.push([P,h]);
this._tests.push([R,h]);
this._tests.push([B,g]);
this._tests.push([c,g]);
this._tests.push([A,g]);
this._tests.push([o,g]);
this._tests.push([w,g]);
this._tests.push([b,j]);
this._tests.push([F,j]);
this._tests.push([n,j]);
this._tests.push([C,j]);
this._tests.push([r,j]);
this._tests.push([t,j]);
this._tests.push([v,j]);
this._tests.push([L,j]);
this._tests.push([H,e]);
this._tests.push([y,e]);
this._tests.push([z,d]);
this._tests.push([O,d]);
this._tests.push([I,k]);
this._tests.push([J,k]);
this._tests.push([q,k]);
this._tests.push([p,k]);
this._tests.push([l,k]);
this._tests.push([m,k]);
this._tests.push([T,k]);
this._tests.push([G,k]);
}},destruct:function(){this._tests=this._categories=this._properties=this._classnames=null;
}});
})();
(function(){var c="abstract",b="qx.core.Object",a="inspector.property.AbstractPropertyList";
qx.Class.define(a,{extend:qx.ui.container.Composite,type:c,construct:function(d){qx.ui.container.Composite.call(this);
this.setLayout(new qx.ui.layout.VBox(8));
this._controller=d;
},members:{_controller:null,_filter:null,build:function(){throw new Error("Abstract method call (build) in 'PropertyList'!");
},update:function(g,h){throw new Error("Abstract method call (update) in 'PropertyList'!");
},getComponents:function(){throw new Error("Abstract method call (getComponents) in 'PropertyList'!");
},containsProperty:function(e,f){throw new Error("Abstract method call (containsProperty) in 'PropertyList'!");
},switchInheritedStatus:function(){throw new Error("Abstract method call (switchInheritedStatus) in 'PropertyList'!");
},recalculateLayout:function(){throw new Error("Abstract method call (recalculateLayout) in 'PropertyList'!");
},_getDataInherited:function(s){var w=s;
var t=qx.core.Init.getApplication().getIframeWindowObject();
var x=[];
var v=[];
var u=[];
for(var i=1;;i++){x[i]=t.qx.Class.getByName(w.classname).$$properties;
u[i]=w.classname;
v[i]=[];
for(var j in x[i]){v[i][j]=w.classname;
}if(t.qx.Class.getByName(b)==w){break;
}w=t.qx.Class.getByName(w.classname).superclass;
}return {names:u,props:x,classes:v};
},_getDataGrouped:function(k){var p=this._getDataInherited(k);
var o=p.props;
var n=this._controller.getFilter();
n.empty();
for(var l=0;l<o.length;l++){var q=p.names[l];

for(var m in o[l]){n.sortIn(m,o[l][m],q);
}}return n.getResult();
},_getData:function(r){if(this._controller.getGroupStatus()){return this._getDataGrouped(r);
}else{return this._getDataInherited(r);
}}},destruct:function(){this._controller=this._filter=null;
}});
})();
(function(){var bd=".",bc="",bb="key",ba="classname",Y="inspector/images/shell/errorIcon.png",X="click",W="visible",V="inherited",U="set",T="name",ce="row",cd="changeValue",cc="qx.ui.basic.Label",cb="qx.ui.core.Widget",ca="activate",bY="excluded",bX="inspector/images/close.png",bW="Integer",bV="inspector/images/null.png",bU="middle",bk="get",bl="getActiveWindow",bi="qx.ui.container.Composite",bj="qx.event.type.Focus",bg="Number",bh="NonEmptyString",be="blur",bf="mousedown",bq="Boolean",br="icon/16/actions/go-next.png",bA="#FFFFFF",bx="inspector.property.PropertyList",bI="qx.ui.form.TextField",bD="solid",bQ="_arrow",bN="execute",bt="Enter",bT="Double",bS="inspector/images/open.png",bR="#969696",bs="<u>",bv="pointer",bw=":",bz="Label",bB="String",bE="hidden",bK="<b>",bP="]</u>",bm="qx.ui.form.CheckBox",bn="</b>",bu=" objects",bH="Float",bG="cursor",bF="qx.ui.form.ComboBox",bM="keypress",bL="inherit",bC="Color",bJ=" [",S="Font",bO="qx.event.type.KeySequence",bo="white",bp="left",by="Choose Color";
qx.Class.define(bx,{extend:inspector.property.AbstractPropertyList,construct:function(L){inspector.property.AbstractPropertyList.call(this,L);
this._propertyRows={};
this._comboBoxPopups=[];
this._createColorPopup();
var M=new qx.ui.basic.Image(br);
M.setPaddingLeft(8);
this._arrow={arrow:M,container:null,row:null};
},members:{_propertyRows:null,_comboBoxPopups:null,_colorPopup:null,_colorFields:null,_currentColorProperty:null,_arrow:null,build:function(){if(this._controller.getQxObject()!=null){this._reloadPropertyListFull();
}},update:function(ck,cl){this._setPropertyValueFull(ck,cl);
},switchInheritedStatus:function(){var cY=this.getChildren();

for(var i=0;i<cY.length;i++){if(cY[i].getUserData(V)){if(this._controller.getInheritedStatus()){cY[i].setVisibility(W);
}else{cY[i].setVisibility(bY);
}}}},containsProperty:function(cp,cq){return this._propertyRows[cq+bd+cp]==null?false:true;
},_reloadPropertyListFull:function(){var u=false;
var y=true;
var E=this._getData(this._controller.getQxObject());
var v=E.names;
var F=E.props;
var w=E.classes;
if(!this._controller.getGroupStatus()){this._removeUnnecessaryClasses(v);
}for(var i=F.length-1;i>0;i--){if(!this._controller.getGroupStatus()){var B=this.getChildren();
if(!u&&B.length>0){var x=B.length-1-2*(F.length-i-1);
if(x>0){var H=B[x].getUserData(T);
if(H!=v[i]){var C=v[i+1];
u=true;
}}else{u=true;
y=false;
}}else{u=true;
y=false;
}}else{u=true;
if(y){this._clearList();
y=false;
}}if(u){if(y){this._removeOld(C);
y=false;
}var t=new qx.ui.basic.Atom(bK+v[i]+bn,bX);
t.setUserData(T,v[i]);
t.setRich(true);
this.addAt(t,0);
var r=new qx.ui.container.Composite(new qx.ui.layout.Grid(6,6));
r.getLayout().setColumnWidth(0,25);
r.setUserData(T,v[i]);
if(!this._controller.getGroupStatus()){if(i==1){r.setUserData(V,false);
t.setUserData(V,false);
}else{r.setUserData(V,true);
t.setUserData(V,true);
}}t.addListener(X,function(e){if(this.isVisible()){this.setVisibility(bY);
e.getTarget().setIcon(bS);
}else{this.setVisibility(W);
e.getTarget().setIcon(bX);
}},r);
this.addAfter(r,t);
var D=0;

for(var A in F[i]){if(F[i][A].group==null){var s=new qx.ui.basic.Label(A+bw);
s.setUserData(ba,w[i][A]);
s.setUserData(bb,A);
s.setUserData(ce,D);
r.add(s,{row:D,column:1});
var G=null;

try{G=this._getPropertyWidgetFull(F[i][A],A,w[i][A]);
}catch(R){G=new qx.ui.basic.Label(bc);
}G.setUserData(ba,w[i][A]);
G.setUserData(bb,A);
G.setUserData(ce,D);
r.add(G,{row:D,column:2});
var z=new qx.ui.basic.Image(bV);
z.setUserData(ba,w[i][A]);
z.setUserData(bb,A);
z.setUserData(ce,D);
r.add(z,{row:D,column:3});
this._propertyRows[w[i][A]+bd+A]={container:r,row:D};
r.getLayout().setRowAlign(D,bp,bU);
r.getLayout().setRowMinHeight(D,20);
s.addListener(X,this.__tU,this);
G.addListener(X,this.__tU,this);
G.addListener(ca,this.__tU,this);
z.addListener(X,this.__tU,this);
D++;
}}}}this.switchInheritedStatus();
this._refillPropertyListFull();
},_removeUnnecessaryClasses:function(cr){for(;(cr.length-1)*2<this.getChildren().length;){var cu=this.getChildren()[0];
this.removeAt(0);
cu.dispose();
var ct=this.getChildren()[0].getChildren();
for(var cv=0;cv<ct.length;cv++){if(ct[cv].classname==cc){var cs=ct[cv].getUserData(ba)+bd+ct[cv].getUserData(bb);
delete this._propertyRows[cs];
}}this.removeAt(0);
}},_removeOld:function(cN){if(cN==null){this._clearList();
return;
}while(true){var cS=this.getChildren()[0];
var cR=cS.getUserData(T);
if(cR==cN){break;
}else{if(cS.classname==bi){var cQ=cS.getChildren();
for(var cO=0;cO<cQ.length;cO++){if(cQ[cO].classname==cc){var cP=cQ[cO].getUserData(ba)+bd+cQ[cO].getUserData(bb);
delete this._propertyRows[cP];
}}}this.removeAt(0);
}}},_clearList:function(){for(var cX in this._porpertyColumns){delete this._porpertyColumns[cX];
}this.removeAll();
},_getPropertyWidgetFull:function(cw,cx,cy){var cL=bk+qx.lang.String.firstUp(cx);

try{if(cL===bl){throw new Error("Property activeWindow of an instance of qx.ui.root.Abstract is not (yet) ready!");
}else{var cD=this._controller.getQxObject()[cL]();
}}catch(cT){return new qx.ui.basic.Label();
}if(cw.check!==null){if(cw.check==bq){var cA=new qx.ui.form.CheckBox();
var cF=function(e){var Q=this._controller.getQxObject()[cL].call(this._controller.getQxObject());

if(e.getData()!=Q){var P=U+qx.lang.String.firstUp(cx);
try{this._controller.getQxObject()[P].call(this._controller.getQxObject(),e.getData());
this._setPropertyValueFull(cx,cy,true);
}catch(K){alert(K+" ["+P+"]");
cA.setValue(!Q);
}}};
cA.addListener(cd,cF,this);
return cA;
}else if(cw.check instanceof Array){var cz=new qx.ui.form.ComboBox();
var cG=cw.check;
for(var i=0;i<cG.length;i++){var cE=new qx.ui.form.ListItem(cG[i]);
cz.add(cE);
}cz.addListener(cd,function(e){var cg=null;
if(e.getTarget().getValue()!=null){var cg=e.getTarget().getValue();
}if(cg!=cD){var cf=U+qx.lang.String.firstUp(cx);
try{this._controller.getQxObject()[cf].call(this._controller.getQxObject(),cg);
cD=this._controller.getQxObject()[cL].call(this._controller.getQxObject());
this._setPropertyValueFull(cx,cy,true);
cD=this._controller.getQxObject()[cL].call(this._controller.getQxObject());
}catch(cn){alert(cn);
}}},this);
return cz;
}else if(cw.check==bW||cw.check==bB||cw.check==bh||cw.check==bz||cw.check==bH||cw.check==bT||cw.check==bg){var cJ=new qx.ui.form.TextField();
var cH=function(e){if(e.classname==bO){if(e.getKeyIdentifier()!=bt){return;
}}else if(e.classname==bj){}else{return ;
}var I=U+qx.lang.String.firstUp(cx);
try{var J=cJ.getValue();
cD=this._controller.getQxObject()[cL].call(this._controller.getQxObject());
if(e.classname==bj){if(J==bc&&cD==null){return;
}}if(cw.check==bW||cw.check==bg){J=parseFloat(J);
}this._controller.getQxObject()[I].call(this._controller.getQxObject(),J);
this._setPropertyValueFull(cx,cy,true);
cD=this._controller.getQxObject()[cL].call(this._controller.getQxObject());
}catch(cU){alert(cU);
cJ.setValue(cD+bc);
}};
cJ.addListener(be,cH,this);
cJ.addListener(bM,cH,this);
return cJ;
}else if(cw.check==bC){var cB=new qx.ui.container.Composite(new qx.ui.layout.HBox(6));
cB.getLayout().setAlignY(bU);
var cI=new qx.ui.core.Widget();
cI.setDecorator(new qx.ui.decoration.Single(1,bD,bR));
cI.setBackgroundColor(bo);
cI.setHeight(20);
cI.setWidth(20);
cI.setAllowGrowX(false);
cI.setAllowGrowY(false);
cB.add(cI);
this._colorFields[cy+bd+cx]=cI;
var cC=new qx.ui.form.Button(by);
cB.add(cC);
cC.addListener(bf,function(e){this._colorPopup.setValue(cI.getBackgroundColor());
this._currentColorProperty=cy+bd+cx;
this._colorPopup.placeToMouse(e);
this._colorPopup.show();
},this);
cC.addListener(bN,this.__tU,this);
cC.addListener(ca,this.__tU,this);
return cB;
}else if(cw.ckeck==cb){var cM=new qx.ui.basic.Label();
return cM;
}else{var cK=new qx.ui.basic.Label();
return cK;
}}else{var cK=new qx.ui.basic.Label();
return cK;
}},_refillPropertyListFull:function(){for(var db in this._propertyRows){try{var dc=db.substr(db.lastIndexOf(bd)+1);
var da=db.substring(0,db.lastIndexOf(bd));
this._setPropertyValueFull(dc,da);
}catch(p){}}},_setPropertyValueFull:function(a,b,c){var g=qx.core.Init.getApplication().getIframeWindowObject();
var f=this._propertyRows[b+bd+a].container.getLayout();
var o=this._propertyRows[b+bd+a].row;

if(!c&&f.getCellWidget(o,0)){this._arrow.container.remove(this._arrow.arrow);
this._arrow.container=null;
this._arrow.row=null;
}var n=bk+qx.lang.String.firstUp(a);

try{if(n===bl){throw new Error("Property activeWindow of an instance of qx.ui.root.Abstract is not (yet) ready!");
}else{var k=this._controller.getQxObject()[n]();
}}catch(q){f.getCellWidget(o,3).setVisibility(W);
f.getCellWidget(o,3).setSource(Y);
var h=f.getCellWidget(o,3).getToolTip();

if(!h){h=new qx.ui.tooltip.ToolTip(q+bc,Y);
}else{h.setLabel(q+bc);
h.setIcon(Y);
}f.getCellWidget(o,3).setToolTip(h);
return;
}if(k==null){f.getCellWidget(o,3).setVisibility(W);
f.getCellWidget(o,3).setSource(bV);
f.getCellWidget(o,3).resetToolTip();
}else{f.getCellWidget(o,3).setVisibility(bE);
}
try{var parent=this._controller.getQxObject();

while(k==bL){parent=parent.getLayoutParent();
k=parent[n].call(parent);
}}catch(N){f.getCellWidget(o,3).setVisibility(W);
f.getCellWidget(o,3).setSource(Y);
var h=f.getCellWidget(o,3).getToolTip();

if(!h){h=new qx.ui.tooltip.ToolTip(N+bc,Y);
}else{h.setLabel(N+bc);
h.setIcon(Y);
}f.getCellWidget(o,3).setToolTip(h);
return;
}if(f.getCellWidget(o,2).classname==bm){if(k==null){f.getCellWidget(o,2).setValue(false);
}else{f.getCellWidget(o,2).setValue(k);
}}else if(f.getCellWidget(o,2).classname==cc){if(k!=null){var m=g.qx.Class.getByName(b).$$properties;
var l=m[a];
if(k instanceof Array){f.getCellWidget(o,2).setValue(k.length+bu);
}else if((l.check==cb)&&(this._controller.getQxObject() instanceof qx.application.AbstractGui)){f.getCellWidget(o,2).setValue(bs+k.classname+bJ+k.toHashCode()+bP);
f.getCellWidget(o,2).setStyleProperty(bG,bv);
if(f.getCellWidget(o,2).hasListeners(X)===undefined){f.getCellWidget(o,2).addListener(X,function(e){if(this._controller.getSelectedProperty()!=null){this._controller.getSelectedProperty().setBackgroundColor(null);
}this._controller.setSelectedProperty(f.getCellWidget(o,1));
this._controller.gotoSelectedWidget();
},this);
}}else if(l.check==S){f.getCellWidget(o,2).setFont(k);
f.getCellWidget(o,2).setValue(k+bc);
}else{f.getCellWidget(o,2).setValue(k+bc);
}}else{f.getCellWidget(o,2).setValue(bc);
}}else if(f.getCellWidget(o,2).classname==bI){if(k!=null){f.getCellWidget(o,2).setValue(k+bc);
}else{f.getCellWidget(o,2).setValue(bc);
}}else if(f.getCellWidget(o,2).classname==bF){var d=f.getCellWidget(o,2);
if(k==null){d.resetSelection();
}else{for(var i=0;i<d.getChildren().length;i++){if(k==d.getChildren()[i].getLabel()){if(k){d.setValue(k);
}}}}}else if(f.getCellWidget(o,2).classname==bi){try{var j=g.qx.theme.manager.Color.getInstance().resolve(k);
f.getCellWidget(o,2).getChildren()[0].setBackgroundColor(j);
}catch(cm){f.getCellWidget(o,2).getChildren()[0].setBackgroundColor(bA);
}}},_createColorPopup:function(){this._colorPopup=new qx.ui.control.ColorPopup();
var co=qx.core.Init.getApplication();
co.getRoot().add(this._colorPopup);
this._colorFields={};
this._colorPopup.addListener(cd,function(e){if(this._currentColorProperty!=null){var ci=this._currentColorProperty.substr(this._currentColorProperty.lastIndexOf(bd)+1);
var ch=this._currentColorProperty.substring(0,this._currentColorProperty.lastIndexOf(bd));
var cj=U+qx.lang.String.firstUp(ci);
try{this._controller.getQxObject()[cj].call(this._controller.getQxObject(),e.getData());
this._colorFields[this._currentColorProperty].setBackgroundColor(e.getData());
this._setPropertyValueFull(ci,ch,true);
}catch(O){alert(O);
}this._currentColorProperty=null;
}},this);
},__tU:function(e){var cV=e.getTarget();

while(cV.getUserData(bb)==null){cV=cV.getLayoutParent();
}var cW=cV.getUserData(ba)+bd+cV.getUserData(bb);
if(this._arrow.container!=null){this._arrow.container.remove(this._arrow.arrow);
this._arrow.container=null;
this._arrow.row=null;
}if(this._propertyRows[cW]!=undefined){this._arrow.container=this._propertyRows[cW].container;
this._arrow.row=cV.getUserData(ce);
this._arrow.container.add(this._arrow.arrow,{row:this._arrow.row,column:0});
this._controller.setSelectedProperty(cV);
}else{this._controller.setSelectedProperty(null);
}}},destruct:function(){this._propertyRows=this._comboBoxPopups=this._colorPopup=this._colorFields=this._oldPropertyListPool=null;
this._disposeObjects(bQ);
}});
})();
(function(){var b="checkbox",a="qx.ui.form.CheckBox";
qx.Class.define(a,{extend:qx.ui.form.ToggleButton,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IForm,qx.ui.form.IModel],construct:function(c){{};
qx.ui.form.ToggleButton.call(this,c);
this.setValue(false);
},properties:{appearance:{refine:true,init:b},allowGrowX:{refine:true,init:false}}});
})();
(function(){var v="popup",u="list",t="",s="mousewheel",r="resize",q="Function",p="blur",o="abstract",n="keypress",m="Number",f="changeSelection",l="PageUp",i="_applyMaxListHeight",c="PageDown",b="mouseup",h="Escape",g="changeVisibility",j="one",a="middle",k="qx.ui.form.AbstractSelectBox",d="mousedown";
qx.Class.define(k,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.form.MForm],implement:[qx.ui.form.IForm],type:o,construct:function(){qx.ui.core.Widget.call(this);
var M=new qx.ui.layout.HBox();
this._setLayout(M);
M.setAlignY(a);
this.addListener(n,this._onKeyPress);
this.addListener(p,this._onBlur,this);
var L=qx.core.Init.getApplication().getRoot();
L.addListener(s,this._onMousewheel,this,true);
this.addListener(r,this._onResize,this);
},properties:{focusable:{refine:true,init:true},width:{refine:true,init:120},maxListHeight:{check:m,apply:i,nullable:true,init:200},format:{check:q,init:function(B){return this._defaultFormat(B);
},nullable:true}},members:{_createChildControlImpl:function(H){var I;

switch(H){case u:I=new qx.ui.form.List().set({focusable:false,keepFocus:true,height:null,width:null,maxHeight:this.getMaxListHeight(),selectionMode:j,quickSelection:true});
I.addListener(f,this._onListChangeSelection,this);
I.addListener(d,this._onListMouseDown,this);
break;
case v:I=new qx.ui.popup.Popup(new qx.ui.layout.VBox);
I.setAutoHide(false);
I.setKeepActive(true);
I.addListener(b,this.close,this);
I.add(this.getChildControl(u));
I.addListener(g,this._onPopupChangeVisibility,this);
break;
}return I||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,H);
},_applyMaxListHeight:function(w,x){this.getChildControl(u).setMaxHeight(w);
},getChildrenContainer:function(){return this.getChildControl(u);
},open:function(){var J=this.getChildControl(v);
J.placeToWidget(this,true);
J.show();
},close:function(){this.getChildControl(v).hide();
},toggle:function(){var K=this.getChildControl(v).isVisible();

if(K){this.close();
}else{this.open();
}},_defaultFormat:function(y){var z=y?y.getLabel():t;
var A=y?y.getRich():false;

if(A){z=z.replace(/<[^>]+?>/g,t);
z=qx.bom.String.unescape(z);
}return z;
},_onBlur:function(e){this.close();
},_onKeyPress:function(e){var C=e.getKeyIdentifier();
var D=this.getChildControl(v);
if(D.isHidden()&&(C==c||C==l)){e.stopPropagation();
}else if(!D.isHidden()&&C==h){this.close();
e.stop();
}else{this.getChildControl(u).handleKeyPress(e);
}},_onMousewheel:function(e){var G=e.getTarget();
var F=this.getChildControl(v,true);

if(F==null){return;
}
if(qx.ui.core.Widget.contains(F,G)){e.preventDefault();
}else{this.close();
}},_onResize:function(e){this.getChildControl(v).setMinWidth(e.getData().width);
},_onListChangeSelection:function(e){throw new Error("Abstract method: _onListChangeSelection()");
},_onListMouseDown:function(e){throw new Error("Abstract method: _onListMouseDown()");
},_onPopupChangeVisibility:function(e){throw new Error("Abstract method: _onPopupChangeVisibility()");
}},destruct:function(){var E=qx.core.Init.getApplication().getRoot();

if(E){E.removeListener(s,this._onMousewheel,this,true);
}}});
})();
(function(){var C="textfield",B="button",A="list",z="selected",y="focusout",x="inner",w="changeValue",v="popup",u="focusin",t="combobox",m="click",s="blur",p="Enter",l="quick",k="_applyPlaceholder",o="qx.ui.form.ComboBox",n="single",q="Down",j="String",r="qx.event.type.Data";
qx.Class.define(o,{extend:qx.ui.form.AbstractSelectBox,implement:[qx.ui.form.IStringForm],construct:function(){qx.ui.form.AbstractSelectBox.call(this);
var H=this._createChildControl(C);
this._createChildControl(B);
this.addListener(m,this._onClick);
this.addListener(u,function(e){H.fireNonBubblingEvent(u,qx.event.type.Focus);
},this);
this.addListener(y,function(e){H.fireNonBubblingEvent(y,qx.event.type.Focus);
},this);
},properties:{appearance:{refine:true,init:t},placeholder:{check:j,nullable:true,apply:k}},events:{"changeValue":r},members:{__tV:null,__tW:null,_applyPlaceholder:function(F,G){this.getChildControl(C).setPlaceholder(F);
},_createChildControlImpl:function(c){var d;

switch(c){case C:d=new qx.ui.form.TextField();
d.setFocusable(false);
d.addState(x);
d.addListener(w,this._onTextFieldChangeValue,this);
d.addListener(s,this.close,this);
this._add(d,{flex:1});
break;
case B:d=new qx.ui.form.Button();
d.setFocusable(false);
d.setKeepActive(true);
d.addState(x);
this._add(d);
break;
case A:d=qx.ui.form.AbstractSelectBox.prototype._createChildControlImpl.call(this,c);
d.setSelectionMode(n);
break;
}return d||qx.ui.form.AbstractSelectBox.prototype._createChildControlImpl.call(this,c);
},_forwardStates:{focused:true},tabFocus:function(){var i=this.getChildControl(C);
i.getFocusElement().focus();
i.selectAllText();
},setValue:function(Q){var R=this.getChildControl(C);

if(R.getValue()==Q){return;
}R.setValue(Q);
},getValue:function(){return this.getChildControl(C).getValue();
},resetValue:function(){this.getChildControl(C).setValue(null);
},_onKeyPress:function(e){var b=this.getChildControl(v);
var a=e.getKeyIdentifier();

if(a==q&&e.isAltPressed()){this.getChildControl(B).addState(z);
this.toggle();
e.stopPropagation();
}else if(a==p){if(b.isVisible()){this.close();
e.stop();
}}else if(b.isVisible()){qx.ui.form.AbstractSelectBox.prototype._onKeyPress.call(this,e);
}},_onClick:function(e){var I=e.getTarget();

if(I==this.getChildControl(B)){this.toggle();
}else{this.close();
}},_onListMouseDown:function(e){if(this.__tV){var S=this.__tV.getLabel();

if(this.getFormat()!=null){S=this.getFormat().call(this,this.__tV);
}if(S&&S.translate){S=S.translate();
}this.setValue(S);
this.__tV=null;
}},_onListChangeSelection:function(e){var J=e.getData();

if(J.length>0){var K=this.getChildControl(A);

if(K.getSelectionContext()==l){this.__tV=J[0];
}else{var L=J[0].getLabel();

if(this.getFormat()!=null){L=this.getFormat().call(this,J[0]);
}if(L&&L.translate){L=L.translate();
}this.setValue(L);
this.__tV=null;
}}},_onPopupChangeVisibility:function(e){var N=this.getChildControl(v);

if(N.isVisible()){var O=this.getChildControl(A);
var P=this.getValue();
var M=null;

if(P){M=O.findItem(P);
}
if(M){O.setSelection([M]);
}else{O.resetSelection();
}}else{this.tabFocus();
}this.getChildControl(B).removeState(z);
},_onTextFieldChangeValue:function(e){var h=e.getData();
var g=this.getChildControl(A);

if(h!=null){var f=g.findItem(h,false);

if(f){g.setSelection([f]);
}else{g.resetSelection();
}}else{g.resetSelection();
}this.fireDataEvent(w,h,e.getOldData());
},getTextSelection:function(){return this.getChildControl(C).getTextSelection();
},getTextSelectionLength:function(){return this.getChildControl(C).getTextSelectionLength();
},setTextSelection:function(D,E){this.getChildControl(C).setTextSelection(D,E);
},clearTextSelection:function(){this.getChildControl(C).clearTextSelection();
},selectAllText:function(){this.getChildControl(C).selectAllText();
}}});
})();
(function(){var m="horizontal",k="qx.event.type.Data",j="vertical",h="",g="qx.ui.form.List",f="__tX",d="Enter",c="one",b="addChildWidget",a="_applySpacing",y="Boolean",x="Integer",w="action",v="keyinput",u="addItem",t="removeChildWidget",s="_applyOrientation",r="single",q="keypress",p="list",n="pane",o="removeItem";
qx.Class.define(g,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MMultiSelectionHandling,qx.ui.form.MForm,qx.ui.form.MModelSelection],construct:function(Q){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__tX=new qx.ui.container.Composite();
this.__tX.addListener(b,this._onAddChild,this);
this.__tX.addListener(t,this._onRemoveChild,this);
this.getChildControl(n).add(this.__tX);
if(Q){this.setOrientation(m);
}else{this.initOrientation();
}this.addListener(q,this._onKeyPress);
this.addListener(v,this._onKeyInput);
this.__tY=h;
},events:{addItem:k,removeItem:k},properties:{appearance:{refine:true,init:p},focusable:{refine:true,init:true},orientation:{check:[m,j],init:j,apply:s},spacing:{check:x,init:0,apply:a,themeable:true},enableInlineFind:{check:y,init:true}},members:{__tY:null,__ua:null,__tX:null,SELECTION_MANAGER:qx.ui.core.selection.ScrollArea,getChildrenContainer:function(){return this.__tX;
},_onAddChild:function(e){this.fireDataEvent(u,e.getData());
},_onRemoveChild:function(e){this.fireDataEvent(o,e.getData());
},handleKeyPress:function(e){if(!this._onKeyPress(e)){this._getManager().handleKeyPress(e);
}},_applyOrientation:function(J,K){var L=J===m;
var M=L?new qx.ui.layout.HBox():new qx.ui.layout.VBox();
var content=this.__tX;
content.setLayout(M);
content.setAllowGrowX(!L);
content.setAllowGrowY(L);
this._applySpacing(this.getSpacing());
},_applySpacing:function(H,I){this.__tX.getLayout().setSpacing(H);
},_onKeyPress:function(e){if(e.getKeyIdentifier()==d&&!e.isAltPressed()){var P=this.getSelection();

for(var i=0;i<P.length;i++){P[i].fireEvent(w);
}return true;
}return false;
},_onKeyInput:function(e){if(!this.getEnableInlineFind()){return;
}var N=this.getSelectionMode();

if(!(N===r||N===c)){return;
}if(((new Date).valueOf()-this.__ua)>1000){this.__tY=h;
}this.__tY+=e.getChar();
var O=this.findItemByLabelFuzzy(this.__tY);
if(O){this.setSelection([O]);
}this.__ua=(new Date).valueOf();
},findItemByLabelFuzzy:function(z){z=z.toLowerCase();
var A=this.getChildren();
for(var i=0,l=A.length;i<l;i++){var B=A[i].getLabel();
if(B&&B.toLowerCase().indexOf(z)==0){return A[i];
}}return null;
},findItem:function(C,D){if(D!==false){C=C.toLowerCase();
}var E=this.getChildren();
var G;
for(var i=0,l=E.length;i<l;i++){G=E[i];
var F=G.getLabel();

if(F!=null){if(F.translate){F=F.translate();
}
if(D!==false){F=F.toLowerCase();
}
if(F.toString()==C.toString()){return G;
}}}return null;
}},destruct:function(){this._disposeObjects(f);
}});
})();
(function(){var c="listitem",b="qx.ui.form.ListItem",a="qx.event.type.Event";
qx.Class.define(b,{extend:qx.ui.basic.Atom,implement:[qx.ui.form.IModel],include:[qx.ui.form.MModelProperty],construct:function(d,e,f){qx.ui.basic.Atom.call(this,d,e);

if(f!=null){this.setModel(f);
}},events:{"action":a},properties:{appearance:{refine:true,init:c}},members:{_forwardStates:{focused:true,hovered:true,selected:true,dragover:true}}});
})();
(function(){var b="qx.ui.form.IColorForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var q="current-preview",p="execute",o="selected-preview",n="Number",m="preview-pane",l="selector-button",k="colorselector-cancelbutton",h="auto-button",g="colorselector-okbutton",f="__ud",bc="mousedown",bb="teal",ba="maroon",Y="qx.ui.control.ColorPopup",X="#666",W="changeValue",V="#333",U="#000",T="yellow",S="changeGreen",x="colorpopup",y="_applyValue",v="blue",w="changeRed",t="field#",u="#CCC",r="Color Selector",s="changeVisibility",z="recent",A="changeBlue",H="mouseover",F="Cancel",L="#FFF",J="right",O="Open ColorSelector",N="mouseout",C="#999",R="Automatic",Q="Basic Colors",P="Preview (Old/New)",B="visible",D="Recent Colors",E="OK",G="field",I="green",K="red",M="__ue";
qx.Class.define(Y,{extend:qx.ui.popup.Popup,implement:[qx.ui.form.IColorForm],construct:function(){qx.ui.popup.Popup.call(this);
this.setLayout(new qx.ui.layout.VBox(5));
this._createChildControl(h);
this._createBoxes();
this._createChildControl(m);
this._createChildControl(l);
this.addListener(s,this._onChangeVisibility,this);
},properties:{appearance:{refine:true,init:x},value:{nullable:true,apply:y,event:W},red:{check:n,init:null,nullable:true,event:w},green:{check:n,init:null,nullable:true,event:S},blue:{check:n,init:null,nullable:true,event:A}},members:{__ub:1e5,__uc:null,__ud:null,__ue:null,__uf:z,__ug:12,_createChildControlImpl:function(bD){var bE;

switch(bD){case G:bE=new qx.ui.core.Widget;
bE.addListener(bc,this._onFieldMouseDown,this);
bE.addListener(H,this._onFieldMouseOver,this);
bE.addListener(N,this._onFieldMouseOut,this);
break;
case h:bE=new qx.ui.form.Button(this.tr(R));
bE.setAllowStretchX(true);
bE.addListener(p,this._onAutomaticBtnExecute,this);
this.add(bE);
break;
case l:bE=new qx.ui.form.Button(this.tr(O));
bE.addListener(p,this._onSelectorButtonExecute,this);
this.add(bE);
break;
case m:bE=new qx.ui.groupbox.GroupBox(this.tr(P));
bE.setLayout(new qx.ui.layout.HBox);
bE.add(this._createChildControl(o,true),{flex:1});
bE.add(this._createChildControl(q,true),{flex:1});
this.add(bE);
break;
case o:bE=new qx.ui.container.Composite(new qx.ui.layout.Basic);
break;
case q:bE=new qx.ui.container.Composite(new qx.ui.layout.Basic);
break;
case g:bE=new qx.ui.form.Button(this.tr(E));
bE.addListener(p,this._onColorSelectorOk,this);
break;
case k:bE=new qx.ui.form.Button(this.tr(F));
bE.addListener(p,this._onColorSelectorCancel,this);
break;
}return bE||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,bD);
},_createBoxes:function(){this.__uc={};
var bf=this._tables;
var bi,be,bg;
var j=0;

for(var bh in bf){bi=bf[bh];
be=new qx.ui.groupbox.GroupBox(bi.label);
be.setLayout(new qx.ui.layout.HBox);
this.__uc[bh]=be;
this.add(be);

for(var i=0;i<this.__ug;i++){bg=this.getChildControl(t+(j++));
bg.setBackgroundColor(bi.values[i]||null);
be.add(bg);
}}},_createColorSelector:function(){if(this.__ue){return;
}var bz=new qx.ui.window.Window(this.tr(r));
this.__ud=bz;
bz.setLayout(new qx.ui.layout.VBox(16));
bz.setResizable(false);
bz.moveTo(20,20);
this.__ue=new qx.ui.control.ColorSelector;
bz.add(this.__ue);
var bA=new qx.ui.container.Composite(new qx.ui.layout.HBox(8,J));
bz.add(bA);
var bC=this._createChildControl(k);
var bB=this._createChildControl(g);
bA.add(bC);
bA.add(bB);
},_applyValue:function(bn,bo){if(bn===null){this.setRed(null);
this.setGreen(null);
this.setBlue(null);
}else{var bp=qx.util.ColorUtil.stringToRgb(bn);
this.setRed(bp[0]);
this.setGreen(bp[1]);
this.setBlue(bp[2]);
}this.getChildControl(o).setBackgroundColor(bn);
this._rotatePreviousColors();
},_rotatePreviousColors:function(){if(!this._tables){return;
}var bs=this._tables[this.__uf].values;
var bt=this.__uc[this.__uf];

if(!bs){return;
}var bu=this.getValue();

if(!bu){return;
}var br=bs.indexOf(bu);

if(br!=-1){qx.lang.Array.removeAt(bs,br);
}else if(bs.length==this.__ug){bs.shift();
}bs.push(bu);
var bq=bt.getChildren();

for(var i=0;i<bq.length;i++){bq[i].setBackgroundColor(bs[i]||null);
}},_onFieldMouseDown:function(e){var bd=this.getChildControl(q).getBackgroundColor();
this.setValue(bd);

if(bd){this.hide();
}},_onFieldMouseOver:function(e){this.getChildControl(q).setBackgroundColor(e.getTarget().getBackgroundColor());
},_onFieldMouseOut:function(e){var d=this.getRed();
var c=this.getGreen();
var a=this.getBlue();
var b=null;

if(d!==null||c!==null||a!==null){var b=qx.util.ColorUtil.rgbToRgbString([d,c,a]);
}this.getChildControl(q).setBackgroundColor(b);
},_onAutomaticBtnExecute:function(){this.setValue(null);
this.hide();
},_onSelectorButtonExecute:function(){this._createColorSelector();
this.exclude();
var bm=this.getRed();
var bl=this.getGreen();
var bk=this.getBlue();

if(bm===null||bl===null||bk===null){bm=255;
bl=255;
bk=255;
}this.__ue.setRed(bm);
this.__ue.setGreen(bl);
this.__ue.setBlue(bk);
this.__ud.open();
},_onColorSelectorOk:function(){var bj=this.__ue;
this.setValue(qx.util.ColorUtil.rgbToRgbString([bj.getRed(),bj.getGreen(),bj.getBlue()]));
this.__ud.close();
},_onColorSelectorCancel:function(){this.__ud.close();
},_onChangeVisibility:function(e){if(this.getVisibility()==B){var by=this.getRed();
var bx=this.getGreen();
var bv=this.getBlue();
var bw=null;

if(by!==null||bx!==null||bv!==null){var bw=qx.util.ColorUtil.rgbToRgbString([by,bx,bv]);
}this.getChildControl(o).setBackgroundColor(bw);
this.getChildControl(q).setBackgroundColor(bw);
}},_tables:{core:{label:Q,values:[U,V,X,C,u,L,K,I,v,T,bb,ba]},recent:{label:D,values:[]}}},destruct:function(){this._disposeObjects(f,M);
this._tables=this.__uc=null;
}});
})();
(function(){var i="legend",h="frame",g="middle",f="top",d="resize",c="qx.ui.groupbox.GroupBox",b="groupbox",a="_applyLegendPosition";
qx.Class.define(c,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MContentPadding,qx.ui.form.MForm],implement:[qx.ui.form.IForm],construct:function(j,k){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Canvas);
this._createChildControl(h);
this._createChildControl(i);
if(j!=null){this.setLegend(j);
}
if(k!=null){this.setIcon(k);
}},properties:{appearance:{refine:true,init:b},legendPosition:{check:[f,g],init:g,apply:a,themeable:true}},members:{_forwardStates:{invalid:true},_createChildControlImpl:function(l){var m;

switch(l){case h:m=new qx.ui.container.Composite();
this._add(m,{left:0,top:6,right:0,bottom:0});
break;
case i:m=new qx.ui.basic.Atom();
m.addListener(d,this._repositionFrame,this);
this._add(m);
break;
}return m||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,l);
},_getContentPaddingTarget:function(){return this.getChildControl(h);
},_applyLegendPosition:function(e){if(this.getChildControl(i).getBounds()){this._repositionFrame();
}},_repositionFrame:function(){var r=this.getChildControl(i);
var q=this.getChildControl(h);
var s=r.getBounds().height;
if(this.getLegendPosition()==g){q.setLayoutProperties({"top":Math.round(s/2)});
}else if(this.getLegendPosition()==f){q.setLayoutProperties({"top":s});
}},getChildrenContainer:function(){return this.getChildControl(h);
},setLegend:function(n){var o=this.getChildControl(i);

if(n!==null){o.setLabel(n);
o.show();
}else{o.exclude();
}},getLegend:function(){return this.getChildControl(i).getLabel();
},setIcon:function(p){this.getChildControl(i).setIcon(p);
},getIcon:function(){this.getChildControl(i).getIcon();
}}});
})();
(function(){var a="qx.ui.layout.Basic";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(k,m){var q=this._getLayoutChildren();
var n,p,o,r,top;
for(var i=0,l=q.length;i<l;i++){n=q[i];
p=n.getSizeHint();
o=n.getLayoutProperties();
r=(o.left||0)+n.getMarginLeft();
top=(o.top||0)+n.getMarginTop();
n.renderLayout(r,top,p.width,p.height);
}},_computeSizeHint:function(){var g=this._getLayoutChildren();
var d,j,e;
var h=0,f=0;
var b,c;
for(var i=0,l=g.length;i<l;i++){d=g[i];
j=d.getSizeHint();
e=d.getLayoutProperties();
b=j.width+(e.left||0)+d.getMarginLeft()+d.getMarginRight();
c=j.height+(e.top||0)+d.getMarginTop()+d.getMarginBottom();

if(b>h){h=b;
}
if(c>f){f=c;
}}return {width:h,height:f};
}}});
})();
(function(){var bW="brightness-handle",bV="hue-saturation-handle",bU="hsbSpinner",bT="rgbSpinner",bS="changeValue",bR="hexField",bQ="hueSaturationField",bP="brightness-field",bO="mousedown",bN="rgb-spinner-red",bC="preview-content-old",bB="rgb-spinner-green",bA="brightnessField",bz="hue-saturation-field",by="hsb-spinner-brightness",bx="preview-content-new",bw="hue-saturation-pane",bv="rgb-spinner-blue",bu="hsb-spinner-hue",bt="hsb-spinner-saturation",ce="hex-field",cf="brightnessModifier",cc="blueModifier",cd="saturationModifier",ca="middle",cb="Number",bX="#",bY="redModifier",cg="greenModifier",ch="hueModifier",bG="Integer",bF="brightness-pane",bI="control-pane",bH="preset-grid",bK="mouseup",bJ="preset-field-set",bM="qx.event.type.Event",bL="mousemove",bE="hex-field-composite",bD="rgb-spinner-composite",D="hsb-spinner-composite",E="control-bar",F="mousewheel",G="visual-pane",H="input-field-set",I="preview-field-set",J="black",K="_applyGreen",L="#333",M="aqua",cl="colorbucket",ck="qx.event.type.Data",cj="Hex",ci="#BBB",cp="decoration/colorselector/brightness-handle.gif",co="Visual",cn="_applySaturation",cm="Preview (Old/New)",cr="FFFFFF",cq="decoration/colorselector/brightness-field.png",bd="white",be="orange",bb="_applyRed",bc="_applyBlue",bh="maroon",bi="Presets",bf="_applyBrightness",bg="#999",Y="purple",ba="red",U="blue",T="_applyHue",W="decoration/colorselector/huesaturation-handle.gif",V="colorselector",Q="qx.ui.control.ColorSelector",P="lime",S="#EEE",R="olive",O="RGB",N="decoration/colorselector/huesaturation-field.jpg",bn="navy",bo="teal",bp="green",bq="yellow",bj="#666",bk="fuchsia",bl="Details",bm="",br="colorbucket#",bs="appear",X="HSB";
qx.Class.define(Q,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IColorForm],construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.VBox());
this._createChildControl(E);
this.addListener(bs,this._onAppear,this);
},events:{"dialogok":bM,"dialogcancel":bM,"changeValue":ck},properties:{appearance:{refine:true,init:V},red:{check:bG,init:255,apply:bb},green:{check:bG,init:255,apply:K},blue:{check:bG,init:255,apply:bc},hue:{check:cb,init:0,apply:T},saturation:{check:cb,init:0,apply:cn},brightness:{check:cb,init:100,apply:bf}},members:{__uh:null,__ui:[bh,ba,be,bq,R,Y,bk,P,bp,bn,U,M,bo,J,L,bj,bg,ci,S,bd],__uj:bm,__uk:0,__ul:0,__um:0,__un:true,__uo:false,_createChildControlImpl:function(l){var m;

switch(l){case E:m=new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
m.add(this.getChildControl(bI));
m.add(this.getChildControl(G));
this._add(m);
break;
case G:m=new qx.ui.groupbox.GroupBox(this.tr(co));
m.setLayout(new qx.ui.layout.HBox(10));
m.add(this.getChildControl(bw));
m.add(this.getChildControl(bF));
break;
case bI:m=new qx.ui.container.Composite(new qx.ui.layout.VBox(12));
m.add(this.getChildControl(bJ));
m.add(this.getChildControl(H));
m.add(this.getChildControl(I),{flex:1});
break;
case bw:m=new qx.ui.container.Composite(new qx.ui.layout.Canvas());
m.setAllowGrowY(false);
m.addListener(F,this._onHueSaturationPaneMouseWheel,this);
m.add(this.getChildControl(bz));
m.add(this.getChildControl(bV),{left:0,top:256});
break;
case bz:m=new qx.ui.basic.Image(N);
m.addListener(bO,this._onHueSaturationFieldMouseDown,this);
break;
case bV:m=new qx.ui.basic.Image(W);
m.addListener(bO,this._onHueSaturationFieldMouseDown,this);
m.addListener(bK,this._onHueSaturationHandleMouseUp,this);
m.addListener(bL,this._onHueSaturationHandleMouseMove,this);
break;
case bF:m=new qx.ui.container.Composite(new qx.ui.layout.Canvas());
m.setAllowGrowY(false);
m.addListener(F,this._onBrightnessPaneMouseWheel,this);
m.add(this.getChildControl(bP));
m.add(this.getChildControl(bW));
break;
case bP:m=new qx.ui.basic.Image(cq);
m.addListener(bO,this._onBrightnessFieldMouseDown,this);
break;
case bW:m=new qx.ui.basic.Image(cp);
m.addListener(bO,this._onBrightnessHandleMouseDown,this);
m.addListener(bK,this._onBrightnessHandleMouseUp,this);
m.addListener(bL,this._onBrightnessHandleMouseMove,this);
break;
case bJ:m=new qx.ui.groupbox.GroupBox(this.tr(bi));
m.setLayout(new qx.ui.layout.Grow());
m.add(this.getChildControl(bH));
break;
case cl:m=new qx.ui.core.Widget();
m.addListener(bO,this._onColorFieldClick,this);
break;
case bH:r=new qx.ui.layout.Grid(3,3);
m=new qx.ui.container.Composite(r);
var s;
var q;

for(var i=0;i<2;i++){for(var j=0;j<10;j++){q=i*10+j;
s=this.getChildControl(br+q);
s.setBackgroundColor(this.__ui[q]);
m.add(s,{column:j,row:i});
}}break;
case H:m=new qx.ui.groupbox.GroupBox(this.tr(bl));
var r=new qx.ui.layout.VBox();
r.setSpacing(10);
m.setLayout(r);
m.add(this.getChildControl(bE));
m.add(this.getChildControl(bD));
m.add(this.getChildControl(D));
break;
case I:m=new qx.ui.groupbox.GroupBox(this.tr(cm));
var r=new qx.ui.layout.HBox(10);
m.setLayout(r);
m.add(this.getChildControl(bC),{flex:1});
m.add(this.getChildControl(bx),{flex:1});
break;
case bE:var p=new qx.ui.layout.HBox(4);
p.setAlignY(ca);
m=new qx.ui.container.Composite(p);
var u=new qx.ui.basic.Label(this.tr(cj));
m.add(u);
var t=new qx.ui.basic.Label(bX);
m.add(t);
m.add(this.getChildControl(ce));
break;
case ce:m=new qx.ui.form.TextField(cr);
m.setMaxLength(6);
m.setFilter(/[0-9A-Fa-f]/);
m.setWidth(55);
m.addListener(bS,this._onHexFieldChange,this);
break;
case bD:var p=new qx.ui.layout.HBox(4);
p.setAlignY(ca);
m=new qx.ui.container.Composite(p);
var n=new qx.ui.basic.Label(this.tr(O));
n.setWidth(25);
m.add(n);
m.add(this.getChildControl(bN));
m.add(this.getChildControl(bB));
m.add(this.getChildControl(bv));
break;
case bN:m=new qx.ui.form.Spinner(0,255,255);
m.setWidth(50);
m.addListener(bS,this._setRedFromSpinner,this);
break;
case bB:m=new qx.ui.form.Spinner(0,255,255);
m.setWidth(50);
m.addListener(bS,this._setGreenFromSpinner,this);
break;
case bv:m=new qx.ui.form.Spinner(0,255,255);
m.setWidth(50);
m.addListener(bS,this._setBlueFromSpinner,this);
break;
case D:var p=new qx.ui.layout.HBox(4);
p.setAlignY(ca);
m=new qx.ui.container.Composite(p);
var o=new qx.ui.basic.Label(this.tr(X));
o.setWidth(25);
m.add(o);
m.add(this.getChildControl(bu));
m.add(this.getChildControl(bt));
m.add(this.getChildControl(by));
break;
case bu:m=new qx.ui.form.Spinner(0,0,360);
m.setWidth(50);
m.addListener(bS,this._setHueFromSpinner,this);
break;
case bt:m=new qx.ui.form.Spinner(0,0,100);
m.setWidth(50);
m.addListener(bS,this._setSaturationFromSpinner,this);
break;
case by:m=new qx.ui.form.Spinner(0,100,100);
m.setWidth(50);
m.addListener(bS,this._setBrightnessFromSpinner,this);
break;
case bC:m=new qx.ui.core.Widget();
break;
case bx:m=new qx.ui.core.Widget();
break;
}return m||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,l);
},setValue:function(cK){var cL;

if(cK==null){this.__un=true;
cL=[255,255,255];
}else{cL=qx.util.ColorUtil.stringToRgb(cK);
this.__un=false;
}this.__uo=true;
this.setRed(cL[0]);
this.setGreen(cL[1]);
this.__uo=false;
this.setBlue(cL[2]);
},getValue:function(){return this.__un?null:bX+qx.util.ColorUtil.rgbToHexString([this.getRed(),this.getGreen(),this.getBlue()]);
},resetValue:function(){this.__un=true;
this.__uo=true;
this.setRed(255);
this.setGreen(255);
this.__uo=false;
this.setBlue(255);
},__up:function(){if(!this.__uo){this.__un=false;
this.fireDataEvent(bS,this.getValue());
}},_applyRed:function(cv,cw){if(this.__uh===null){this.__uh=bY;
}
if(this.__uh!==bT){this.getChildControl(bN).setValue(cv);
}
if(this.__uh!==bR){this._setHexFromRgb();
}
switch(this.__uh){case bT:case bR:case bY:this._setHueFromRgb();
}this._setPreviewFromRgb();
this.__up();

if(this.__uh===bY){this.__uh=null;
}},_applyGreen:function(cC,cD){if(this.__uh===null){this.__uh=cg;
}
if(this.__uh!==bT){this.getChildControl(bB).setValue(cC);
}
if(this.__uh!==bR){this._setHexFromRgb();
}
switch(this.__uh){case bT:case bR:case cg:this._setHueFromRgb();
}this._setPreviewFromRgb();
this.__up();

if(this.__uh===cg){this.__uh=null;
}},_applyBlue:function(cH,cI){if(this.__uh===null){this.__uh=cc;
}
if(this.__uh!==bT){this.getChildControl(bv).setValue(cH);
}
if(this.__uh!==bR){this._setHexFromRgb();
}
switch(this.__uh){case bT:case bR:case cc:this._setHueFromRgb();
}this._setPreviewFromRgb();
this.__up();

if(this.__uh===cc){this.__uh=null;
}},_applyHue:function(y,z){if(this.__uh===null){this.__uh=ch;
}
if(this.__uh!==bU){this.getChildControl(bu).setValue(y);
}
if(this.__uh!==bQ){if(this.getChildControl(bV).getBounds()){this.getChildControl(bV).setDomLeft(Math.round(y/1.40625)+this.getChildControl(bw).getPaddingLeft());
}else{this.getChildControl(bV).setLayoutProperties({left:Math.round(y/1.40625)});
}}
switch(this.__uh){case bU:case bQ:case ch:this._setRgbFromHue();
}this._setBrightnessGradiant();

if(this.__uh===ch){this.__uh=null;
}},_applySaturation:function(B,C){if(this.__uh===null){this.__uh=cd;
}
if(this.__uh!==bU){this.getChildControl(bt).setValue(B);
}
if(this.__uh!==bQ){this._setBrightnessGradiant();

if(this.getChildControl(bV).getBounds()){this.getChildControl(bV).setDomTop(256-Math.round(B*2.56)+this.getChildControl(bw).getPaddingTop());
}else{this.getChildControl(bV).setLayoutProperties({top:256-Math.round(B*2.56)});
}}
switch(this.__uh){case bU:case bQ:case cd:this._setRgbFromHue();
}
if(this.__uh===cd){this.__uh=null;
}},_applyBrightness:function(cO,cP){if(this.__uh===null){this.__uh=cf;
}
if(this.__uh!==bU){this.getChildControl(by).setValue(cO);
}
if(this.__uh!==bA){var cQ=256-Math.round(cO*2.56);

if(this.getChildControl(bW).getBounds()){this.getChildControl(bW).setDomTop(cQ+this.getChildControl(bF).getPaddingTop());
}else{this.getChildControl(bW).setLayoutProperties({top:cQ});
}}
switch(this.__uh){case bU:case bA:case cf:this._setRgbFromHue();
}
if(this.__uh===cf){this.__uh=null;
}},_onBrightnessHandleMouseDown:function(e){this.getChildControl(bW).capture();
this.__uj=bW;
var cG=this.getChildControl(bP).getContainerLocation();
var cF=this.getChildControl(bW).getContainerLocation();
var cE=this.getChildControl(bP).getBounds();
this.__uk=cG.top+(e.getDocumentTop()-cF.top)-cE.top;
e.stopPropagation();
},_onBrightnessHandleMouseUp:function(e){this.getChildControl(bW).releaseCapture();
this.__uj=null;
},_onBrightnessHandleMouseMove:function(e){if(this.__uj===bW){this._setBrightnessOnFieldEvent(e);
e.stopPropagation();
}},_onBrightnessFieldMouseDown:function(e){var location=this.getChildControl(bP).getContainerLocation();
var A=this.getChildControl(bW).getBounds();
this.__uk=location.top+(A.height/2);
this._setBrightnessOnFieldEvent(e);
this.getChildControl(bW).capture();
this.__uj=bW;
},_onBrightnessPaneMouseWheel:function(e){this.setBrightness(qx.lang.Number.limit(this.getBrightness()+e.getWheelDelta(),0,100));
e.stop();
},_setBrightnessOnFieldEvent:function(e){var cB=qx.lang.Number.limit(e.getDocumentTop()-this.__uk,0,256);
this.__uh=bA;

if(this.getChildControl(bW).getBounds()){this.getChildControl(bW).setDomTop(cB);
}else{this.getChildControl(bW).setLayoutProperties({top:cB});
}this.setBrightness(100-Math.round(cB/2.56));
this.__uh=null;
},_onHueSaturationHandleMouseUp:function(e){if(this.__uj){e.stopPropagation();
this.getChildControl(bV).releaseCapture();
this.__uj=null;
}},_onHueSaturationHandleMouseMove:function(e){if(this.__uj===bV){this._setHueSaturationOnFieldEvent(e);
e.stopPropagation();
}},_onHueSaturationFieldMouseDown:function(e){var location=this.getChildControl(bz).getContainerLocation();
var cy=this.getChildControl(bV).getBounds();
var cz=this.getChildControl(bz).getBounds();
this.__ul=location.top+(cy.height/2)-cz.top;
this.__um=location.left+(cy.width/2)-cz.left;
this._setHueSaturationOnFieldEvent(e);
this.getChildControl(bV).capture();
this.__uj=bV;
},_onHueSaturationPaneMouseWheel:function(e){this.setSaturation(qx.lang.Number.limit(this.getSaturation()+e.getWheelDelta(),0,100));
e.stop();
},_setHueSaturationOnFieldEvent:function(e){var cu=qx.lang.Number.limit(e.getDocumentTop()-this.__ul,0,256);
var ct=qx.lang.Number.limit(e.getDocumentLeft()-this.__um,0,256);
this.getChildControl(bV).setDomPosition(ct,cu);
this.__uh=bQ;
this.setSaturation(100-Math.round(cu/2.56));
this.setHue(Math.round(ct*1.40625));
this.__uh=null;
},_setRedFromSpinner:function(){if(this.__uh!==null){return;
}this.__uh=bT;
this.setRed(this.getChildControl(bN).getValue());
this.__uh=null;
},_setGreenFromSpinner:function(){if(this.__uh!==null){return;
}this.__uh=bT;
this.setGreen(this.getChildControl(bB).getValue());
this.__uh=null;
},_setBlueFromSpinner:function(){if(this.__uh!==null){return;
}this.__uh=bT;
this.setBlue(this.getChildControl(bv).getValue());
this.__uh=null;
},_setHueFromSpinner:function(){if(this.__uh!==null){return;
}this.__uh=bU;
this.setHue(this.getChildControl(bu).getValue());
this.__uh=null;
},_setSaturationFromSpinner:function(){if(this.__uh!==null){return;
}this.__uh=bU;
this.setSaturation(this.getChildControl(bt).getValue());
this.__uh=null;
},_setBrightnessFromSpinner:function(){if(this.__uh!==null){return;
}this.__uh=bU;
this.setBrightness(this.getChildControl(by).getValue());
this.__uh=null;
},_onHexFieldChange:function(e){if(this.__uh!==null){return;
}
try{var cN=this.getChildControl(ce);
var cM=qx.util.ColorUtil.hexStringToRgb(bX+cN.getValue());
}catch(cs){return;
}this.__uh=bR;
this.setRed(cM[0]);
this.setGreen(cM[1]);
this.setBlue(cM[2]);
this.__uh=null;
},_setHexFromRgb:function(){var v=qx.util.ColorUtil.rgbToHexString([this.getRed(),this.getGreen(),this.getBlue()]);
this.getChildControl(ce).setValue(v);
},_onColorFieldClick:function(e){var w=e.getTarget().getBackgroundColor();

if(!w){return this.error("Missing backgroundColor value for field: "+e.getTarget());
}var x=qx.util.ColorUtil.stringToRgb(w);
this.setRed(x[0]);
this.setGreen(x[1]);
this.setBlue(x[2]);
},_setHueFromRgb:function(){switch(this.__uh){case bU:case bQ:case bA:break;
default:var cA=qx.util.ColorUtil.rgbToHsb([this.getRed(),this.getGreen(),this.getBlue()]);
this.setHue(cA[0]);
this.setSaturation(cA[1]);
this.setBrightness(cA[2]);
}},_setRgbFromHue:function(){switch(this.__uh){case bT:case bR:break;
default:var f=qx.util.ColorUtil.hsbToRgb([this.getHue(),this.getSaturation(),this.getBrightness()]);
this.setRed(f[0]);
this.setGreen(f[1]);
this.setBlue(f[2]);
}},_setPreviewFromRgb:function(){var cx=qx.util.ColorUtil.rgbToRgbString([this.getRed(),this.getGreen(),this.getBlue()]);
this.getChildControl(bx).setBackgroundColor(cx);
},setPreviousColor:function(a,b,c){var d=qx.util.ColorUtil.rgbToRgbString([a,b,c]);
this.getChildControl(bC).setBackgroundColor(d);
this.setRed(a);
this.setGreen(b);
this.setBlue(c);
},_setBrightnessGradiant:function(){var g=qx.util.ColorUtil;
var h=g.hsbToRgb([this.getHue(),this.getSaturation(),255]);
var k=g.rgbToRgbString(h);
this.getChildControl(bP).setBackgroundColor(k);
},_onAppear:function(e){var cJ=qx.util.ColorUtil.rgbToRgbString([this.getRed(),this.getGreen(),this.getBlue()]);
this.getChildControl(bC).setBackgroundColor(cJ);
this.getChildControl(bx).setBackgroundColor(cJ);
}}});
})();
(function(){var Y="textfield",X="",W="downbutton",V="upbutton",U="Number",T="inner",S="PageUp",R="Boolean",Q="changeValue",P="Down",by="Up",bx="execute",bw="PageDown",bv="changeLocale",bu="qx.dynlocale",bt="on",bs="_applyEditable",br="_applyWrap",bq="keydown",bp="\-]",bg="mousewheel",bh="_applyValue",be="number",bf="_applyMinimum",bc="qx.util.format.NumberFormat",bd="[0-9",ba="keyup",bb="spinner",bi="this._checkValue(value)",bj="_applyMaximum",bl="changeNumberFormat",bk="changeMaximum",bn="changeMinimum",bm="_applyNumberFormat",bo="qx.ui.form.Spinner";
qx.Class.define(bo,{extend:qx.ui.core.Widget,implement:[qx.ui.form.INumberForm,qx.ui.form.IRange,qx.ui.form.IForm],include:[qx.ui.core.MContentPadding,qx.ui.form.MForm],construct:function(j,k,l){qx.ui.core.Widget.call(this);
var m=new qx.ui.layout.Grid();
m.setColumnFlex(0,1);
m.setRowFlex(0,1);
m.setRowFlex(1,1);
this._setLayout(m);
this.addListener(bq,this._onKeyDown,this);
this.addListener(ba,this._onKeyUp,this);
this.addListener(bg,this._onMouseWheel,this);

if(qx.core.Variant.isSet(bu,bt)){qx.locale.Manager.getInstance().addListener(bv,this._onChangeLocale,this);
}this._createChildControl(Y);
this._createChildControl(V);
this._createChildControl(W);
if(j!=null){this.setMinimum(j);
}
if(l!=null){this.setMaximum(l);
}
if(k!==undefined){this.setValue(k);
}else{this.initValue();
}},properties:{appearance:{refine:true,init:bb},focusable:{refine:true,init:true},singleStep:{check:U,init:1},pageStep:{check:U,init:10},minimum:{check:U,apply:bf,init:0,event:bn},value:{check:bi,nullable:true,apply:bh,init:0,event:Q},maximum:{check:U,apply:bj,init:100,event:bk},wrap:{check:R,init:false,apply:br},editable:{check:R,init:true,apply:bs},numberFormat:{check:bc,apply:bm,nullable:true},allowShrinkY:{refine:true,init:false}},members:{__mY:null,__na:false,__nb:false,_createChildControlImpl:function(H){var I;

switch(H){case Y:I=new qx.ui.form.TextField();
I.setFilter(this._getFilterRegExp());
I.addState(T);
I.setWidth(40);
I.setFocusable(false);
I.addListener(Q,this._onTextChange,this);
this._add(I,{column:0,row:0,rowSpan:2});
break;
case V:I=new qx.ui.form.RepeatButton();
I.addState(T);
I.setFocusable(false);
I.addListener(bx,this._countUp,this);
this._add(I,{column:1,row:0});
break;
case W:I=new qx.ui.form.RepeatButton();
I.addState(T);
I.setFocusable(false);
I.addListener(bx,this._countDown,this);
this._add(I,{column:1,row:1});
break;
}return I||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,H);
},_getFilterRegExp:function(){var g=qx.locale.Number.getDecimalSeparator(qx.locale.Manager.getInstance().getLocale());
var f=qx.locale.Number.getGroupSeparator(qx.locale.Manager.getInstance().getLocale());
var d=X;
var b=X;

if(this.getNumberFormat()!==null){d=this.getNumberFormat().getPrefix()||X;
b=this.getNumberFormat().getPostfix()||X;
}var c=new RegExp(bd+qx.lang.String.escapeRegexpChars(g)+qx.lang.String.escapeRegexpChars(f)+qx.lang.String.escapeRegexpChars(d)+qx.lang.String.escapeRegexpChars(b)+bp);
return c;
},_forwardStates:{focused:true,invalid:true},tabFocus:function(){var A=this.getChildControl(Y);
A.getFocusElement().focus();
A.selectAllText();
},_applyMinimum:function(N,O){if(this.getMaximum()<N){this.setMaximum(N);
}
if(this.getValue()<N){this.setValue(N);
}else{this._updateButtons();
}},_applyMaximum:function(F,G){if(this.getMinimum()>F){this.setMin(F);
}
if(this.getValue()>F){this.setValue(F);
}else{this._updateButtons();
}},_applyEnabled:function(D,E){qx.ui.core.Widget.prototype._applyEnabled.call(this,D,E);
this._updateButtons();
},_checkValue:function(J){return typeof J===be&&J>=this.getMinimum()&&J<=this.getMaximum();
},_applyValue:function(n,o){var p=this.getChildControl(Y);
this._updateButtons();
this.__mY=n;
if(n!==null){if(this.getNumberFormat()){p.setValue(this.getNumberFormat().format(n));
}else{p.setValue(n+X);
}}else{p.setValue(X);
}},_applyEditable:function(q,r){var s=this.getChildControl(Y);

if(s){s.setReadOnly(!q);
}},_applyWrap:function(bz,bA){this._updateButtons();
},_applyNumberFormat:function(K,L){var M=this.getChildControl(Y);
M.setFilter(this._getFilterRegExp());
this.getNumberFormat().addListener(bl,this._onChangeNumberFormat,this);
this._applyValue(this.__mY,undefined);
},_getContentPaddingTarget:function(){return this.getChildControl(Y);
},_updateButtons:function(){var w=this.getChildControl(V);
var v=this.getChildControl(W);
var x=this.getValue();

if(!this.getEnabled()){w.setEnabled(false);
v.setEnabled(false);
}else{if(this.getWrap()){w.setEnabled(true);
v.setEnabled(true);
}else{if(x!==null&&x<this.getMaximum()){w.setEnabled(true);
}else{w.setEnabled(false);
}if(x!==null&&x>this.getMinimum()){v.setEnabled(true);
}else{v.setEnabled(false);
}}}},_onKeyDown:function(e){switch(e.getKeyIdentifier()){case S:this.__na=true;
case by:this.getChildControl(V).press();
break;
case bw:this.__nb=true;
case P:this.getChildControl(W).press();
break;
default:return ;
}e.stopPropagation();
e.preventDefault();
},_onKeyUp:function(e){switch(e.getKeyIdentifier()){case S:this.getChildControl(V).release();
this.__na=false;
break;
case by:this.getChildControl(V).release();
break;
case bw:this.getChildControl(W).release();
this.__nb=false;
break;
case P:this.getChildControl(W).release();
break;
}},_onMouseWheel:function(e){if(e.getWheelDelta()>0){this._countDown();
}else{this._countUp();
}e.stop();
},_onTextChange:function(e){var t=this.getChildControl(Y);
var u;
if(this.getNumberFormat()){try{u=this.getNumberFormat().parse(t.getValue());
}catch(a){}}if(u===undefined){u=parseFloat(t.getValue(),10);
}if(!isNaN(u)){if(u>this.getMaximum()){t.setValue(this.getMaximum()+X);
return;
}else if(u<this.getMinimum()){t.setValue(this.getMinimum()+X);
return;
}this.setValue(u);
}else{this._applyValue(this.__mY,undefined);
}},_onChangeLocale:function(h){if(this.getNumberFormat()!==null){this.setNumberFormat(this.getNumberFormat());
var i=this.getChildControl(Y);
i.setFilter(this._getFilterRegExp());
i.setValue(this.getNumberFormat().format(this.getValue()));
}},_onChangeNumberFormat:function(bC){var bD=this.getChildControl(Y);
bD.setFilter(this._getFilterRegExp());
bD.setValue(this.getNumberFormat().format(this.getValue()));
},_countUp:function(){if(this.__na){var z=this.getValue()+this.getPageStep();
}else{var z=this.getValue()+this.getSingleStep();
}if(this.getWrap()){if(z>this.getMaximum()){var y=this.getMaximum()-z;
z=this.getMinimum()+y;
}}this.gotoValue(z);
},_countDown:function(){if(this.__nb){var C=this.getValue()-this.getPageStep();
}else{var C=this.getValue()-this.getSingleStep();
}if(this.getWrap()){if(C<this.getMinimum()){var B=this.getMinimum()+C;
C=this.getMaximum()-B;
}}this.gotoValue(C);
},gotoValue:function(bB){return this.setValue(Math.min(this.getMaximum(),Math.max(this.getMinimum(),bB)));
}},destruct:function(){if(qx.core.Variant.isSet(bu,bt)){qx.locale.Manager.getInstance().removeListener(bv,this._onChangeLocale,this);
}}});
})();
(function(){var b="pane",a="qx.ui.container.Scroll";
qx.Class.define(a,{extend:qx.ui.core.scroll.AbstractScrollArea,include:[qx.ui.core.MContentPadding],construct:function(content){qx.ui.core.scroll.AbstractScrollArea.call(this);

if(content){this.add(content);
}},members:{add:function(d){this.getChildControl(b).add(d);
},remove:function(c){this.getChildControl(b).remove(c);
},getChildren:function(){return this.getChildControl(b).getChildren();
},_getContentPaddingTarget:function(){return this.getChildControl(b);
}}});
})();
(function(){var e="arrow",d="qx.ui.toolbar.MenuButton",c="Boolean",b="_applyShowArrow",a="toolbar-menubutton";
qx.Class.define(d,{extend:qx.ui.menubar.Button,properties:{appearance:{refine:true,init:a},showArrow:{check:c,init:false,themeable:true,apply:b}},members:{_createChildControlImpl:function(f){var g;

switch(f){case e:g=new qx.ui.basic.Image();
g.setAnonymous(true);
this._addAt(g,10);
break;
}return g||qx.ui.menubar.Button.prototype._createChildControlImpl.call(this,f);
},_applyShowArrow:function(h,i){if(h){this._showChildControl(e);
}else{this._excludeChildControl(e);
}}}});
})();
(function(){var j="checked",i="qx.ui.form.RadioGroup",h="Boolean",g="menu-radiobutton",f="_applyValue",d="qx.ui.menu.RadioButton",c="changeValue",b="_applyGroup",a="execute";
qx.Class.define(d,{extend:qx.ui.menu.AbstractButton,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(k,l){qx.ui.menu.AbstractButton.call(this);
if(k!=null){this.setLabel(k);
}
if(l!=null){this.setMenu(l);
}this.addListener(a,this._onExecute,this);
},properties:{appearance:{refine:true,init:g},value:{check:h,nullable:true,event:c,apply:f,init:false},group:{check:i,nullable:true,apply:b}},members:{_applyValue:function(m,n){m?this.addState(j):this.removeState(j);
},_applyGroup:function(o,p){if(p){p.remove(this);
}
if(o){o.add(this);
}},_onExecute:function(e){this.setValue(true);
},_onMouseUp:function(e){if(e.isLeftPressed()){this.execute();
}qx.ui.menu.Manager.getInstance().hideAll();
},_onKeyPress:function(e){this.execute();
}}});
})();
(function(){var m="",l="Console",k="_consoleButton",j="_findField",i="&gt;",h="changeValue",g="_stack",f="execute",d="Filter...",c='"',E="'",D="&lt;",C=">",B="_consoleView",A="<",z="changeSelection",y="&amp;",x="&#39;",w="DOM",v="inspector.console.ConsoleWindow",t="_domButton",u="&quot;",r="&",s="?",p="Clear",q="_domView",n="_clearButton";
qx.Class.define(v,{extend:inspector.components.AbstractWindow,construct:function(){inspector.components.AbstractWindow.call(this,l);
this._clearButton=new qx.ui.toolbar.Button(p);
this._toolbar.add(this._clearButton);
this._clearButton.addListener(f,function(){this._stack.getSelection()[0].clear();
},this);
this._toolbar.add(new qx.ui.toolbar.Separator());
this._consoleButton=new qx.ui.toolbar.RadioButton(l);
this._toolbar.add(this._consoleButton);
this._domButton=new qx.ui.toolbar.RadioButton(w);
this._toolbar.add(this._domButton);
this._toolbar.addSpacer();
this._findField=new qx.ui.form.TextField();
this._findField.setPlaceholder(d);
this._findField.setLiveUpdate(true);
this._findField.setMarginRight(5);
this._toolbar.add(this._findField);
this._findField.addListener(h,function(e){this._stack.getSelection()[0].filter(e.getData());
},this);
this._stack=new qx.ui.container.Stack();
this.add(this._stack,{flex:1});
this._consoleView=new inspector.console.ConsoleView(this);
this._stack.add(this._consoleView,{flex:1});
this._domView=new inspector.console.DomView(this);
this._stack.add(this._domView,{flex:1});
var G=new qx.ui.form.RadioGroup(this._consoleButton,this._domButton);
G.addListener(z,function(e){this._findField.setValue(m);

if(G.getSelection()[0]==this._consoleButton){this._stack.setSelection([this._consoleView]);
}else if(G.getSelection()[0]==this._domButton){this._stack.setSelection([this._domView]);
}else{this._consoleButton.setValue(true);
}},this);
},members:{setInitSizeAndPosition:function(){var H=qx.bom.Viewport.getWidth()-300;
var I=parseInt((qx.bom.Viewport.getHeight()-30)/3);
this.moveTo(0,2*I+30);
this.setWidth(H);
this.setHeight(I);
},escapeHtml:function(a){function b(F){switch(F){case A:return D;
case C:return i;
case r:return y;
case E:return x;
case c:return u;
}return s;
}return String(a).replace(/[<>&"']/g,b);
},inspectObjectByInternalId:function(J){var o=this._consoleView.getObjectById(J);
this.inspectObject(o);
},inspectObjectByDomSelecet:function(K,L){this._domView.setObjectByIndex(K,L);
this._findField.setValue(m);
},inspectObject:function(M){this._domView.setObject(M.object,M.name);
this._domButton.setValue(true);
},goToDefaultView:function(){this._consoleButton.setValue(true);
this._domView.clear();
}},destruct:function(){this._disposeObjects(n,k,t,j,g,B,q);
}});
})();
(function(){var d="_applyDynamic",c="changeSelection",b="Boolean",a="qx.ui.container.Stack";
qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.ISingleSelection,include:qx.ui.core.MSingleSelectionHandling,construct:function(){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.Grow);
this.addListener(c,this.__uq,this);
},properties:{dynamic:{check:b,init:false,apply:d}},members:{_applyDynamic:function(x){var z=this._getChildren();
var y=this.getSelection()[0];
var A;

for(var i=0,l=z.length;i<l;i++){A=z[i];

if(A!=y){if(x){z[i].exclude();
}else{z[i].hide();
}}}},_getItems:function(){return this.getChildren();
},_isAllowEmptySelection:function(){return true;
},_isItemSelectable:function(w){return true;
},__uq:function(e){var f=e.getOldData()[0];
var g=e.getData()[0];

if(f){if(this.isDynamic()){f.exclude();
}else{f.hide();
}}
if(g){g.show();
}},add:function(t){this._add(t);
var u=this.getSelection()[0];

if(!u){this.setSelection([t]);
}else if(u!==t){if(this.isDynamic()){t.exclude();
}else{t.hide();
}}},remove:function(r){this._remove(r);

if(this.getSelection()[0]===r){var s=this._getChildren()[0];

if(s){this.setSelection([s]);
}else{this.resetSelection();
}}},indexOf:function(v){return this._indexOf(v);
},getChildren:function(){return this._getChildren();
},previous:function(){var k=this.getSelection()[0];
var h=this._indexOf(k)-1;
var m=this._getChildren();

if(h<0){h=m.length-1;
}var j=m[h];
this.setSelection([j]);
},next:function(){var o=this.getSelection()[0];
var n=this._indexOf(o)+1;
var p=this._getChildren();
var q=p[n]||p[0];
this.setSelection([q]);
}}});
})();
(function(){var P="",O=")",N="Tab",M="'>",L="qx.core.Init.getApplication().inspectObjectByInternalId(",K="Down",J="Up",I="warning",H="error",G="Control",bP="info",bO="(",bN="<span class='ins_console_link' onclick='",bM="display",bL="<div class='ins_console_common'><div class='",bK="Escape",bJ="Enter",bI="ins_console_warn",bH="]</span> ",bG="ins_console_return_qxobject",W="changeValue",X="qx.client",U="keydown",V="Courier New",S=", ...",T="' class='ins_console_icon'>",Q="\"qx.core.Init.getApplication().setWidgetByHash('",R="<img src='",bd="ins_console_return_primitive",be="ins_console_debug",bm="&nbsp;",bk="<span class='ins_console_dom_link' onclick='",bu="input",bp="Space",bC=">>>&nbsp;",bz="ins_console_text",bg="middle",bF=" more",bE="<span class='ins_console_link' onclick=",bD="ins_console_error",bf="inspector.console.ConsoleView",bi="ins_console_info",bj=" </span>",bl="</div></div>",bn="]",bq="[",bw="inspector/images/shell/",bB=", ",Y="keyup",ba="ins_console_return_object",bh="ins_console_return_array",bt="</span>",bs="mshtml",br="'>inspect Object</span>",by="keypress",bx="none",bo="', 'console');\"> ",bv=" [",F=">>>",bA=".",bb="Icon.png",bc="scroll";
qx.Class.define(bf,{extend:qx.ui.core.Widget,construct:function(console){qx.ui.core.Widget.call(this);
this._console=console;
this._autoCompletePopup=new inspector.console.AutoCompletePopup(this);
this._history=[];
this._historyCounter=-1;
this._objectFolder=[];
this._objectFolderIndex=0;
this._filter=P;
this._setLayout(new qx.ui.layout.VBox());
this._content=new qx.ui.embed.Html(P);
this._content.setOverflowY(bc);
this._add(this._content,{flex:1});
var t=new qx.ui.container.Composite();
t.setDecorator(bu);
var u=new qx.ui.layout.HBox();
u.setAlignY(bg);
t.setLayout(u);
this._add(t);
var s=new qx.ui.basic.Label(F);
var r=new qx.bom.Font(12,[V]);
s.setFont(r);
t.add(s);
this._inputTextField=new qx.ui.form.TextField(P);
this._inputTextField.setLiveUpdate(true);
this._inputTextField.setDecorator(null);
this._inputTextField.setFont(r);
t.add(this._inputTextField,{flex:1});
this._inputTextField.addListener(U,this._keyDownHandler,this);
this._inputTextField.addListener(Y,this._keyUpHandler,this);
this._inputTextField.addListener(by,this._keyPressHandler,this);
this._inputTextField.addListener(W,function(e){if(this._autoCompletePopup.isOnScreen()){this._autoCompletePopup.load(e.getData());
}},this);
var v=qx.core.Init.getApplication().getIframeWindowObject();
v.qx.log.Logger.register(inspector.console.Appender);
inspector.console.Appender.consoleView=this;
},members:{clear:function(){this._content.setHtml(P);
},getObjectById:function(y){return this._objectFolder[y];
},filter:function(bY){this._filter=bY;
try{var cb=this._content.getContentElement().getDomElement().childNodes;
var ca=new RegExp(this._filter);
for(var i=0;i<cb.length;i++){if(qx.core.Variant.isSet(X,bs)){var content=cb[i].innerText;
}else{var content=cb[i].textContent;
}if(qx.dom.Node.isElement(cb[i])){if(ca.test(content)){qx.bom.element.Style.set(cb[i],bM,null);
}else{qx.bom.element.Style.set(cb[i],bM,bx);
}}}}catch(e){alert("Unable to filter: "+e);
}},chooseAutoCompleteValue:function(){var E=this._inputTextField.getValue();
var name=this._autoCompletePopup.getCurrentSelection();
if(name){var D=E.substring(E.lastIndexOf(bA)+1);
name=name.substring(D.length,name.length);
this.appendString(name);
}this._autoCompletePopup.hide();
this._inputTextField.focus();
},appendString:function(o){if(o!=null){this._inputTextField.setValue(this._inputTextField.getValue()+o);
if(this._inputTextField.getValue().lastIndexOf(bO)!=-1){var p=this._inputTextField.getValue().lastIndexOf(bO)+1;
var q=this._inputTextField.getValue().length-1;
this._inputTextField.setTextSelection(p,q);
}}},_process:function(ch){this._printText(this._console.escapeHtml(ch));

try{var ci=inspector.console.Util.evalOnIframe(ch);

if(ci!=null){this._objectFolder[this._objectFolderIndex]={name:ch,object:ci};
this._printReturnValue(ci);
this._objectFolderIndex++;
}}catch(f){this.error(f);
}},_keyDownHandler:function(e){if(e.getKeyIdentifier()==bK){this._autoCompletePopup.hide();
return;
}if(e.getKeyIdentifier()==bJ){if(!this._autoCompletePopup.isOnScreen()){this._history.unshift(this._inputTextField.getValue());
this._process(this._inputTextField.getValue());
this._inputTextField.setValue(P);
this._historyCounter=-1;
if(this._history.length>20){this._history.pop();
}}else{this.chooseAutoCompleteValue();
}return;
}if(e.getKeyIdentifier()==J){e.preventDefault();
if(!this._autoCompletePopup.isOnScreen()){if(this._history[this._historyCounter+1]!=undefined){this._historyCounter++;
this._inputTextField.setValue(this._history[this._historyCounter]);
}}return;
}if(e.getKeyIdentifier()==K){e.preventDefault();
if(!this._autoCompletePopup.isOnScreen()){if(this._historyCounter>0){this._historyCounter--;
this._inputTextField.setValue(this._history[this._historyCounter]);
}}return;
}if(e.getKeyIdentifier()==G){this._ctrl=true;
return;
}if(e.getKeyIdentifier()==bp||e.getKeyIdentifier()==N){if(this._ctrl||e.getKeyIdentifier()==N){e.preventDefault();
if(e.getKeyIdentifier()==N){var self=this;
window.setTimeout(function(){var length=self._inputTextField.getValue().length;
self._inputTextField.setTextSelection(length,length);
},0);
}try{var bU=qx.bom.element.Location.getLeft(this.getContainerElement().getDomElement());
var top=qx.bom.element.Location.getTop(this._inputTextField.getContentElement().getDomElement())-this._autoCompletePopup.getHeight();
this._autoCompletePopup.open(this._inputTextField.getValue(),bU,top);
var self=this;
window.setTimeout(function(){self._inputTextField.focus();
},0);
}catch(bV){this.info(bV);
}}return;
}},_keyUpHandler:function(e){if(e.getKeyIdentifier()==G){this._ctrl=false;
}},_keyPressHandler:function(e){if(this._autoCompletePopup.isOnScreen()){if(e.getKeyIdentifier()==K){this._autoCompletePopup.selectionDown();
}else if(e.getKeyIdentifier()==J){this._autoCompletePopup.selectionUp();
}}},_scrollToLastLine:function(){qx.ui.core.queue.Manager.flush();
var self=this;
window.setTimeout(function(){var l=self._content.getContentElement();
var k=qx.bom.element.Dimension.getContentHeight(self._content.getContentElement().getDomElement());
l.scrollToY(k);
},0);
},_printReturnValue:function(a){var b=qx.core.Init.getApplication().getIframeWindowObject();
if(b&&a instanceof b.qx.core.Object){this._printQxObject(a);
}else if(a instanceof b.Array){var c=this._printArray(a);
var d=this._getLabel(bN+L+this._objectFolderIndex+O+M+c+bt,bh);
this._content.setHtml(this._content.getHtml()+d);
return;
}else if(b&&(a instanceof b.Object||a==b.window||a==b.document)){var d=this._getLabel(bN+L+this._objectFolderIndex+O+M+a+bj,ba);
this._content.setHtml(this._content.getHtml()+d);
return;
}else{var d=this._getLabel(a,bd);
this._content.setHtml(this._content.getHtml()+d);
}this._scrollToLastLine();
},_printQxObject:function(g){var h=this._getLabel(bE+Q+g.toHashCode()+bo+g.classname+bv+g.toHashCode()+bH+bk+L+this._objectFolderIndex+O+br,bG);
this._content.setHtml(this._content.getHtml()+h);
this._scrollToLastLine();
},_printText:function(B){var C=this._getLabel(bC+B,bz);
this._content.setHtml(this._content.getHtml()+C);
this._scrollToLastLine();
},_getLabel:function(cc,cd,ce){var cc=cc;
if(ce==bP||ce==H||ce==I){var cg=qx.util.ResourceManager.getInstance().toUri(bw+ce+bb);
var cf=R+cg+T;
cc=cf+bm+cc;
}cc=bL+cd+M+cc+bl;
return cc;
},_printArray:function(bQ){var bR=qx.core.Init.getApplication().getIframeWindowObject();

if(bQ instanceof bR.Array){var bS=new qx.util.StringBuilder();
var length=bQ.length;
var bT=P;

if(length>2){bT=S+(length-2)+bF;
length=2;
}
for(var i=0;i<length;i++){if(!bS.isEmpty()){bS.add(bB);
}bS.add(this._printArray(bQ[i]));
}return bq+bS.get()+bT+bn;
}else{return bQ;
}},error:function(z){if(!this._console.isVisible()){this._console.open();
}var A=this._getLabel(z,bD,H);
this._content.setHtml(this._content.getHtml()+A);
this._scrollToLastLine();
},warn:function(bW){if(!this._console.isVisible()){this._console.open();
}var bX=this._getLabel(bW,bI,I);
this._content.setHtml(this._content.getHtml()+bX);
this._scrollToLastLine();
},info:function(m){if(!this._console.isVisible()){this._console.open();
}var n=this._getLabel(m,bi,bP);
this._content.setHtml(this._content.getHtml()+n);
this._scrollToLastLine();
},debug:function(w){if(!this._console.isVisible()){this._console.open();
}var x=this._getLabel(w,be);
this._content.setHtml(this._content.getHtml()+x);
this._scrollToLastLine();
},dispose:function(){var j=qx.core.Init.getApplication().getIframeWindowObject();
j.qx.log.Logger.unregister(inspector.console.Appender);
}}});
})();
(function(){var l="",k="18.gif",i="%",h=".",g="function",f="#FFFFFF",d="inspector/images/autocomplete/property_",c="qx.ui.table.pane.Pane",b="_table",a="inspector/images/autocomplete/method_",z="visible",y="^",x="__",w="public",v=")",u="_",t="(",s="_tableModel",r="inspector.console.AutoCompletePopup",q=", ",o="private",p="click",m="protected",n="window.";
qx.Class.define(r,{extend:qx.ui.popup.Popup,construct:function(F){qx.ui.popup.Popup.call(this);
this._controller=F;
this.setLayout(new qx.ui.layout.VBox());
this.setBackgroundColor(f);
this.setHeight(140);
this.setWidth(300);
qx.core.Init.getApplication().getRoot().add(this);
this._tableModel=new qx.ui.table.model.Simple();
this._tableModel.setColumns([l,g]);
this._table=new qx.ui.table.Table(this._tableModel);
this._table.setWidth(298);
this._table.setHeight(138);
this._table.setShowCellFocusIndicator(false);
this._table.setColumnVisibilityButtonVisible(false);
this._table.setStatusBarVisible(false);
this._table.getTableColumnModel().setColumnWidth(0,22);
this._table.getTableColumnModel().setColumnWidth(1,260);
var G=new qx.ui.table.cellrenderer.Image(18,18);
this._table.getTableColumnModel().setDataCellRenderer(0,G);
this._table.setRowHeight(20);
this.add(this._table);
this._table.addListener(p,function(e){if(e.getTarget().classname==c){this._controller.chooseAutoCompleteValue();
}},this);
},members:{selectionUp:function(){var E=this._table.getSelectionModel().getLeadSelectionIndex();
if(E>0){E--;
}else{E=this._tableModel.getData().length-1;
}this._table.getSelectionModel().addSelectionInterval(E,E);
this._table.setFocusedCell(0,E,true);
},selectionDown:function(){var B=this._table.getSelectionModel().getLeadSelectionIndex();
var C=this._tableModel.getData().length-1;
if(B!=C){B++;
}else{B=0;
}this._table.getSelectionModel().addSelectionInterval(B,B);
this._table.setFocusedCell(0,B,true);
},open:function(H,I,top){this.moveTo(I,top);
this.show();
this.load(H);
},load:function(J){var K=qx.core.Init.getApplication().getIframeWindowObject();
this._table.getSelectionModel().setSelectionInterval(0,0);
this._table.setFocusedCell(0,0,true);
this._tableModel.setData([]);
var O=J.substring(J.lastIndexOf(h)+1);
if(J==O){J=n+J;
}J=J.substring(0,J.lastIndexOf(h));
var M=null;

try{M=inspector.console.Util.evalOnIframe(J);
}catch(S){this.hide();
return;
}if(!(M instanceof K.Object)&&!M==K.window){this.hide();
return ;
}if(M instanceof K.qx.core.Object){this._tableModel.setColumnNamesByIndex([l,M.classname]);
}else{this._tableModel.setColumnNamesByIndex([l,J]);
}var P=new RegExp(y+O);
var Q=[];
for(var name in M){try{if(P.test(name)){if(name.substring(0,2)==x){var N=o;
}else if(name.substring(0,1)==u){var N=m;
}else{var N=w;
}if(M[name] instanceof K.Function){var R=name+t;
for(var j=0;j<M[name].length;j++){if(j==M[name].length-1){R+=unescape(i+(61+j));
}else{R+=unescape(i+(61+j)+q);
}}R+=v;
var L=a+N+k;
Q.push([L,R]);
}else{var L=d+N+k;
Q.push([L,name]);
}}}catch(A){}}
if(Q.length<1){this._table.resetSelection();
}this._tableModel.setData(Q);
this._tableModel.sortByColumn(1,true);
},isOnScreen:function(){return this.getVisibility()==z;
},getCurrentSelection:function(){var D=this._table.getSelectionModel().getLeadSelectionIndex();
if(D!=-1){return this._tableModel.getData()[D][1]+l;
}return null;
}},destruct:function(){this._controller=null;
this._disposeObjects(s,b);
}});
})();
(function(){var r="px",q=".qooxdoo-table-cell-icon {",p="abstract",o="",n="qx.ui.table.cellrenderer.AbstractImage",m=" qooxdoo-table-cell-icon",l="<div></div>",k="'",j="no-repeat",i="}",c="  text-align:center;",h="inline-block",f="static",b="top",a="  padding-top:1px;",e="title='",d="string",g="-moz-inline-box";
qx.Class.define(n,{extend:qx.ui.table.cellrenderer.Abstract,type:p,construct:function(){qx.ui.table.cellrenderer.Abstract.call(this);
var H=this.self(arguments);

if(!H.stylesheet){H.stylesheet=qx.bom.Stylesheet.createElement(q+c+a+i);
}},members:{__ur:16,__us:16,_insetY:2,__ut:null,_identifyImage:function(s){throw new Error("_identifyImage is abstract");
},_getImageInfos:function(u){var v=this._identifyImage(u);
if(v==null||typeof u==d){v={url:v,tooltip:null};
}
if(u.width&&u.height){var w={width:u.imageWidth,height:u.imageHeight};
}else{w=this.__uu(v.url);
}v.width=w.width;
v.height=w.height;
return v;
},__uu:function(C){var F=qx.util.ResourceManager.getInstance();
var E=qx.io.ImageLoader;
var D,G;
if(F.has(C)){D=F.getImageWidth(C);
G=F.getImageHeight(C);
}else if(E.isLoaded(C)){D=E.getWidth(C);
G=E.getHeight(C);
}else{D=this.__ur;
G=this.__us;
}return {width:D,height:G};
},createDataCellHtml:function(z,A){this.__ut=this._getImageInfos(z);
return qx.ui.table.cellrenderer.Abstract.prototype.createDataCellHtml.call(this,z,A);
},_getCellClass:function(t){return qx.ui.table.cellrenderer.Abstract.prototype._getCellClass.call(this)+m;
},_getContentHtml:function(B){var content=l;
if(this.__ut.url){var content=qx.bom.element.Decoration.create(this.__ut.url,j,{width:this.__ut.width+r,height:this.__ut.height+r,display:qx.bom.client.Engine.GECKO&&qx.bom.client.Engine.VERSION<1.9?g:h,verticalAlign:b,position:f});
}return content;
},_getCellAttributes:function(x){var y=this.__ut.tooltip;

if(y){return e+y+k;
}else{return o;
}}},destruct:function(){this.__ut=null;
}});
})();
(function(){var b="qx.ui.table.cellrenderer.Image",a="";
qx.Class.define(b,{extend:qx.ui.table.cellrenderer.AbstractImage,construct:function(c,d){qx.ui.table.cellrenderer.AbstractImage.call(this);

if(c){this.__uv=c;
}
if(d){this.__uw=d;
}this.__ux=qx.util.AliasManager.getInstance();
},members:{__ux:null,__uw:16,__uv:16,_identifyImage:function(e){var f={imageWidth:this.__uv,imageHeight:this.__uw};

if(e.value==a){f.url=null;
}else{f.url=this.__ux.resolve(e.value);
}f.tooltip=e.tooltip;
return f;
}},destruct:function(){this.__ux=null;
}});
})();
(function(){var r="qx.client",q="",p="');",o="webkit",n="webkit|mshtml|gecko",m="  } catch (ex) {",l="inspector.console.Util",k="  }",j="mshtml",i="  try {",c="return eval('",h="};",f="window.top.inspector.$$inspector = function()",b="{",a="    return ex;",e="opera",d="$2",g="return eval.call(window, '";
qx.Class.define(l,{statics:{evalOnIframe:function(s){var t=qx.core.Init.getApplication().getIframeWindowObject();
var v=null;

try{if(qx.core.Variant.isSet(r,n)){if(qx.core.Variant.isSet(r,j)||qx.core.Variant.isSet(r,o)){s=s.replace(/^(\s*var\s+)(.*)$/,d);
}var u=q;
if(qx.core.Variant.isSet(r,o)&&qx.bom.client.Engine.FULLVERSION>=528){u=c+s+p;
}else{u=g+s+p;
}t.qx.lang.Function.globalEval([f,b,i,u,m,a,k,h].join(q));
v=inspector.$$inspector.call(qx.core.Init.getApplication().getSelectedObject());
}else if(qx.core.Variant.isSet(r,e)){v=(function(x){return t.eval(x);
}).call(qx.core.Init.getApplication().getSelectedObject(),s);
}if(v instanceof t.Error){throw v;
}}catch(w){throw w;
}return v;
}}});
})();
(function(){var i="auto",h="overflowX",g="visible",f="hidden",e="scroll",d="overflowY",c="_applyOverflowX",b="_applyOverflowY",a="qx.ui.core.MNativeOverflow";
qx.Mixin.define(a,{properties:{overflowX:{check:[f,g,e,i],nullable:true,apply:c},overflowY:{check:[f,g,e,i],nullable:true,apply:b},overflow:{group:[h,d]}},members:{_applyOverflowX:function(j){this.getContentElement().setStyle(h,j);
},_applyOverflowY:function(k){this.getContentElement().setStyle(d,k);
}}});
})();
(function(){var o="none",n="text",m="",l="userSelect",k="color",j="String",i="0px",h="webkit",g="changeHtml",f="_applyCssClass",c="class",e="qx.ui.embed.Html",d="_applyHtml",b="qx.client",a="html";
qx.Class.define(e,{extend:qx.ui.core.Widget,include:[qx.ui.core.MNativeOverflow],construct:function(x){qx.ui.core.Widget.call(this);

if(x!=null){this.setHtml(x);
}},properties:{html:{check:j,apply:d,event:g,nullable:true},cssClass:{check:j,init:m,apply:f},selectable:{refine:true,init:true},focusable:{refine:true,init:true}},members:{getFocusElement:function(){return this.getContentElement();
},_applyHtml:function(y,z){var A=this.getContentElement();
A.setAttribute(a,y||m);
A.setStyles({"padding":i,"border":o});
},_applyCssClass:function(t,u){this.getContentElement().setAttribute(c,t);
},_applySelectable:function(s){qx.ui.core.Widget.prototype._applySelectable.call(this,s);
if(qx.core.Variant.isSet(b,h)){this.getContainerElement().setStyle(l,s?n:o);
this.getContentElement().setStyle(l,s?n:o);
}},_applyFont:function(p,q){var r=p?qx.theme.manager.Font.getInstance().resolve(p).getStyles():qx.bom.Font.getDefaultStyles();
this.getContentElement().setStyles(r);
},_applyTextColor:function(v,w){if(v){this.getContentElement().setStyle(k,qx.theme.manager.Color.getInstance().resolve(v));
}else{this.getContentElement().removeStyle(k);
}}}});
})();
(function(){var q=": ",p=", ",o="info",n="{ ",m="]: ",l="ms ",k=" ]",h="map",g="warn",f=" }",c="[ ",e="[",d="inspector.console.Appender",b="string",a="error";
qx.Class.define(d,{statics:{consoleView:null,process:function(s){if(this.consoleView){var t=this.__uy(s);

if(s.level==o){this.consoleView.info(t);
}else if(s.level==g){this.consoleView.warn(t);
}else if(s.level==a){this.consoleView.error(t);
}else{this.consoleView.debug(t);
}}},__uy:function(u){var x=qx.core.Init.getApplication().getIframeWindowObject();
var E=new qx.util.StringBuilder();
var B,D,w,z;
E.add(u.offset,l);

if(u.object){var v=x.qx.core.ObjectRegistry.fromHashCode(u.object);

if(v){E.add(v.classname,e,v.$$hash,m);
}}else if(u.clazz){E.add(u.clazz.classname,q);
}var y=u.items;

for(var i=0,C=y.length;i<C;i++){B=y[i];
D=B.text;

if(D instanceof x.Array){var z=[];

for(var j=0,A=D.length;j<A;j++){w=D[j];

if(typeof w===b){z.push(this.__uz(w));
}else if(w.key){z.push(w.key+q+this.__uz(w.text));
}else{z.push(this.__uz(w.text));
}}
if(B.type===h){E.add(n,z.join(p),f);
}else{E.add(c,z.join(p),k);
}}else{E.add(this.__uz(D));
}}return E.get();
},__uz:function(r){return this.consoleView._console.escapeHtml(r);
}}});
})();
(function(){var f="mshtml",e="pop.push.reverse.shift.sort.splice.unshift.join.slice",d="number",c="qx.type.BaseArray",b="qx.client",a=".";
qx.Class.define(c,{extend:Array,construct:function(length){},members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});
(function(){function r(k){if(qx.core.Variant.isSet(b,f)){q.prototype={length:0,$$isArray:true};
var n=e.split(a);

for(var length=n.length;length;){q.prototype[n[--length]]=Array.prototype[n[length]];
}}var o=Array.prototype.slice;
q.prototype.concat=function(){var j=this.slice(0);

for(var i=0,length=arguments.length;i<length;i++){var h;

if(arguments[i] instanceof q){h=o.call(arguments[i],0);
}else if(arguments[i] instanceof Array){h=arguments[i];
}else{h=[arguments[i]];
}j.push.apply(j,h);
}return j;
};
q.prototype.toString=function(){return o.call(this,0).toString();
};
q.prototype.toLocaleString=function(){return o.call(this,0).toLocaleString();
};
q.prototype.constructor=q;
q.prototype.indexOf=qx.lang.Core.arrayIndexOf;
q.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;
q.prototype.forEach=qx.lang.Core.arrayForEach;
q.prototype.some=qx.lang.Core.arraySome;
q.prototype.every=qx.lang.Core.arrayEvery;
var l=qx.lang.Core.arrayFilter;
var m=qx.lang.Core.arrayMap;
q.prototype.filter=function(){var u=new this.constructor;
u.push.apply(u,l.apply(this,arguments));
return u;
};
q.prototype.map=function(){var g=new this.constructor;
g.push.apply(g,m.apply(this,arguments));
return g;
};
q.prototype.slice=function(){var s=new this.constructor;
s.push.apply(s,Array.prototype.slice.apply(this,arguments));
return s;
};
q.prototype.splice=function(){var t=new this.constructor;
t.push.apply(t,Array.prototype.splice.apply(this,arguments));
return t;
};
q.prototype.toArray=function(){return Array.prototype.slice.call(this,0);
};
q.prototype.valueOf=function(){return this.length;
};
return q;
}function q(length){if(arguments.length===1&&typeof length===d){this.length=-1<length&&length===length>>.5?length:this.push(length);
}else if(arguments.length){this.push.apply(this,arguments);
}}function p(){}p.prototype=[];
q.prototype=new p;
q.prototype.length=0;
qx.type.BaseArray=r(q);
})();
})();
(function(){var b="",a="qx.util.StringBuilder";
qx.Class.define(a,{extend:qx.type.BaseArray,members:{clear:function(){this.length=0;
},get:function(){return this.join(b);
},add:null,isEmpty:function(){return this.length===0;
},size:function(){return this.join(b).length;
}},defer:function(c,d){d.add=d.push;
d.toString=d.get;
d.valueOf=d.get;
}});
})();
(function(){var W="",V="'>",U="inspector/images/spacer.gif",T="</td></tr>",S="</td>",R="</span>",Q="'><img class='ins_dom_front_image' src='",P="qx.core.Init.getApplication().inspectObjectByDomSelecet(",O="<tr><td class='",N="</div>",bY=")",bX="</span></td></tr>",bW="string",bV="<div class='ins_dom_no_prop'>No object selected.</div>",bU="<td><span class='ins_dom_null'>",bT="\")",bS="<td class='ins_dom_object'>",bR=", \"",bQ="<tr><td class='ins_dom_key'><img class='ins_dom_front_image' src='",bP=".",be="<div class='ins_dom_func'>",bf=" &raquo; <span class='ins_dom_return_path_link' onclick='",bc="<div class='ins_dom_return_path_main'>",bd="<td class='ins_dom_self_ref'>self reference</td></tr>",ba="<table class='ins_dom_table'>",bb=" more</span> ]",X="'><a onclick='",Y="&quot;</span>",bk="<td class='ins_dom_string'>&quot;Error occurs by reading value!&quot;</td></tr>",bl="Object",bv="inspector/images/open.png",bs="', 'console');\">select Object</u>",bD="toString",by=", ",bL="<a onclick='",bI="<td class='ins_dom_string'>&quot;",bo="<td class='ins_dom_basic'>",bO="ins_dom_key_number",bN="<td class='ins_dom_func_object'>",bM="<span class='ins_dom_func_object'>function()</span>",bn=")'>",bq="</a>",br=" ]",bu="</a></td>",bw="<span class='ins_dom_basic'>",bz="<div class='ins_dom_no_prop'>There are no properties to show for this object.</div>",bF="&quot;</td></tr>",bK="_htmlEmbed",bg="ins_dom_key",bh="</table>",bp="</a> <a style='color: #000000;' onclick=\"qx.core.Init.getApplication().setWidgetByHash('",bC="<span class='ins_dom_object'>",bB=" &raquo; <span class='ins_dom_return_path_selected'>",bA=", ... <span class='ins_dom_array_more'>",bH="[Class ",bG="qx_srcview",bx="[ ",bE="Error occurs by reading value!",K="<pre>",bJ="appear",bi="]</span>",bj="scroll",bt="<span class='ins_dom_string'>&quot;",L="</pre>",M="inspector.console.DomView",bm="<span class='ins_dom_object'>[";
qx.Class.define(M,{extend:qx.ui.core.Widget,statics:{SEARCH_TERM:"Search..."},construct:function(console){qx.ui.core.Widget.call(this);
this._console=console;
this._filter=W;
this._setLayout(new qx.ui.layout.VBox());
this._htmlEmbed=new qx.ui.embed.Html(bV);
this._htmlEmbed.setOverflowY(bj);
this._add(this._htmlEmbed,{flex:1});
this.addListenerOnce(bJ,function(){this._htmlEmbed.getContentElement().getDomElement().id=bG;
},this);
this._breadCrumb=[];
},members:{clear:function(){this._htmlEmbed.setHtml(bV);
},setObject:function(G,name){this._iFrameWindow=qx.core.Init.getApplication().getIframeWindowObject();
this._breadCrumb=[];
var I=name.split(bP);
for(var i=0;i<I.length-1;i++){var J=W;
for(var j=0;j<=i;j++){J+=I[j];
if(j!=i){J+=bP;
}}var H=eval(J);
this._breadCrumb[i]={object:H,name:I[i]};
}name=I[I.length-1];
this._htmlEmbed.setHtml(this._getHtmlToObject(G,i,name));
},setObjectByIndex:function(ca,cb){this._filter=W;

try{if(cb){var cd=this._breadCrumb[ca].object[cb];
for(var i=0;i<this._breadCrumb.length;i++){if(this._breadCrumb[i].object==cd){this._htmlEmbed.setHtml(this._getHtmlToObject(cd,i,cb));
this._htmlEmbed.getContentElement().scrollToY(0);
return ;
}}this._htmlEmbed.setHtml(this._getHtmlToObject(cd,(ca)+1,cb));
this._htmlEmbed.getContentElement().scrollToY(0);
}else{var cd=this._breadCrumb[ca].object;
var cc=this._breadCrumb[ca].name;
this._htmlEmbed.setHtml(this._getHtmlToObject(cd,ca,cc));
this._htmlEmbed.getContentElement().scrollToY(0);
this._breadCrumb.splice(ca+1,this._breadCrumb.length-ca+1);
}}catch(e){alert("Can not select this Object: "+e);
}},filter:function(c){this._filter=c;
if(this._breadCrumb.length>0){var d=this._breadCrumb.length-1;
var f=this._breadCrumb[d].object;
var name=this._breadCrumb[d].name;
this._htmlEmbed.setHtml(this._getHtmlToObject(f,d,name));
}},getFilter:function(){if(this._filter==W){return inspector.console.DomView.SEARCH_TERM;
}else{return this._filter;
}},getCurrentSelectedClassname:function(){if(this._breadCrumb.length>0){var h=this._breadCrumb[this._breadCrumb.length-1].object;
if(h.classname!=undefined){if(qx.Class.isDefined(h.classname)||qx.Interface.isDefined(h.classname)||qx.Mixin.isDefined(h.classname)||qx.Theme.isDefined(h.classname)){return h.classname;
}}}return null;
},_getHtmlToObject:function(o,r,name){var v=new qx.util.StringBuilder();
if(name==undefined){var name=bl;
}this._breadCrumb[r]={object:o,name:name};
v.add(this._getReturnPath(r));
var x=true;
var z=this._sortAndFilterProperties(o);
v.add(ba);
for(var i=0;i<z.length;i++){x=false;
v.add(W);
if(!isNaN(z[i].key)){var s=bO;
}else{var s=bg;
}try{z[i].value instanceof this._iFrameWindow.Object;
}catch(A){var u=qx.util.ResourceManager.getInstance().toUri(U);
v.add(O+s+Q+u+V+this._console.escapeHtml(z[i].key)+S);
v.add(bU+z[i].value+bX);
continue;
}if(!(z[i].value instanceof this._iFrameWindow.Object)&&z[i].value!=this._iFrameWindow.window&&z[i].value!=this._iFrameWindow.document){var u=qx.util.ResourceManager.getInstance().toUri(U);
v.add(O+s+Q+u+V+this._console.escapeHtml(z[i].key)+S);
if(z[i].value==null){v.add(bU+z[i].value+bX);
}else if(typeof z[i].value==bW){v.add(bI+this._console.escapeHtml(z[i].value)+bF);
}else{v.add(bo+z[i].value+T);
}}else{if(z[i].value instanceof this._iFrameWindow.Function){var t=z[i].value.toString();
if(t.search(/native code/)!=-1){continue;
}}var y=null;

if(y==null){y=new qx.util.StringBuilder();
}else{y.clear();
}if(z[i].value!=o){var u=qx.util.ResourceManager.getInstance().toUri(bv);
y.add(O+s+X+P+r+bR+z[i].key+bT+Q+u+V+this._console.escapeHtml(z[i].key)+bu);
}if(z[i].value==o){var u=qx.util.ResourceManager.getInstance().toUri(U);
v.add(bQ+u+V+z[i].key+S);
v.add(bd);
}else if(z[i].value instanceof this._iFrameWindow.Function){v.add(y.get());
if(z[i].value.toString().substr(0,7)==bH){v.add(bS+this._getObject(z[i].value,r,z[i].key)+T);
}else{v.add(bN+this._getObject(z[i].value,r,z[i].key)+T);
}}else{try{var w=this._getObject(z[i].value,r,z[i].key);
v.add(y.get());
v.add(bS+w+T);
}catch(k){var u=qx.util.ResourceManager.getInstance().toUri(U);
v.add(bQ+u+V+z[i].key+S);
v.add(bk);
}}}}v.add(bh);
if(x){v.add(bz);
}v.add(this._getFunctionCode(o));
return v.get();
},_getFunctionCode:function(o){if(o instanceof this._iFrameWindow.Function&&!o.hasOwnProperty(bD)){var B=o.toString();
B=K+qx.dev.Tokenizer.javaScriptToHtml(B)+L;
return be+B+N;
}else{return W;
}},_sortAndFilterProperties:function(o){if(this._filter!=W){try{var n=new RegExp(this._filter);
}catch(e){alert("Unable to filter: "+e);
}}var p=[];
for(var q in o){try{if(n!=null){if(n.test(q)){p.push({key:q,value:o[q]});
}}else{p.push({key:q,value:o[q]});
}}catch(g){p.push({key:q,value:bE});
}}p.sort(function(a,b){if(isNaN(a.key)||isNaN(b.key)){return ((a.key<b.key)?-1:((a.key>b.key)?1:0));
}else{return a.key-b.key;
}});
return p;
},_getReturnPath:function(l){var m=new qx.util.StringBuilder();
m.add(bc);
for(var i=0;i<=l;i++){if(i==l){m.add(bB);
}else{m.add(bf+P+i+bn);
}m.add(this._breadCrumb[i].name);
m.add(R);
}m.add(N);
return m.get();
},_getObject:function(C,D,E){var F=new qx.util.StringBuilder();
F.add(bL+P+D+bR+E+bT+V);
if(C instanceof this._iFrameWindow.Function){if(C.toString().indexOf(bY)!=-1){F.add(C.toString().substring(0,C.toString().indexOf(bY)+1));
}else{F.add(C.toString());
}}else if(C instanceof this._iFrameWindow.Array){F.add(bx);
for(var j=0;j<2&&j<C.length;j++){if(C[j] instanceof this._iFrameWindow.Function){F.add(bM);
}else if(typeof C[j]==bW){F.add(bt+C[j]+Y);
}else if(C[j] instanceof this._iFrameWindow.Array){F.add(bm+C[j]+bi);
}else if(C[j] instanceof this._iFrameWindow.Object){F.add(bC+C[j]+R);
}else{F.add(bw+C[j]+R);
}if(j!=1&&j!=C.length-1){F.add(by);
}}if(C.length>2){F.add(bA+(C.length-2)+bb);
}else{F.add(br);
}}else if(C instanceof this._iFrameWindow.qx.core.Object){F.add(C+bp+C.toHashCode()+bs);
}else{F.add(C);
}F.add(bq);
return F.get();
}},destruct:function(){this._console=this._breadCrumb=null;
this._disposeObjects(bK);
}});
})();
(function(){var l="</span>",k="sym",j="nl",h="qxkey",g="ws",f=">",e="qqstr",d="<",c="qstr",b="linecomment",bg="ident",bf="keyword",be="regexp",bd="&",bc="|",bb="fullcomment",ba="atom",Y="\\r\\n|\\r|\\n",X="\\s*\\)*",W="\\s",s="^",t='["][^"]*["]',q="real",r="\\s*[,\\)]",o="<span class='string'>",p="[a-zA-Z_][a-zA-Z0-9_]*\\b",m="<span class='comment'>",n="[+-]?\\d+",w="\\s*\\(*\\s*",x="&nbsp;",F="qx.dev.Tokenizer",D="\\t",M="\\s*\\)*\\s*\\)",H="\\.(?:replace)\\s*\\(\\s*\\(*\\s*",S="\\)*\\.(?:test|exec)\\s*\\(\\s*",Q="<span class='regexp'>",z="int",V="'>",U="<span class='",T="(?:\\/(?!\\*)[^\\t\\n\\r\\f\\v\\/]+?\\/[mgi]*)",y=".",B="\\s*\\)*\\s*?,?",C="[\\(,]\\s*",E="<span class='ident'>",G="g",I="[+-]?\\d+(([.]\\d+)*([eE][+-]?\\d+))?",N="\\/\\*(?:.|[\\n\\r])*?\\*\\/",R="\n",u="$",v="['][^']*[']",A="tab",L="\\/\\/.*?[\\n\\r$]",K="<br>",J=" ",P="(?::|=|\\?)\\s*\\(*\\s*",O="\\.(?:match|search|split)\\s*\\(\\s*\\(*\\s*";
qx.Class.define(F,{extend:qx.core.Object,statics:{tokenizeJavaScript:function(bh){var bL={"break":1,"case":1,"catch":1,"continue":1,"default":1,"delete":1,"do":1,"else":1,"finally":1,"for":1,"function":1,"if":1,"in":1,"instanceof":1,"new":1,"return":1,"switch":1,"throw":1,"try":1,"typeof":1,"var":1,"while":1,"with":1};
var by={"void":1,"null":1,"true":1,"false":1,"NaN":1,"Infinity":1,"this":1};
var bk={"statics":1,"members":1,"construct":1,"destruct":1,"events":1,"properties":1,"extend":1,"implement":1};
var bu=function(bM){return new RegExp(s+bM+u);
};
var bE=L;
var bv=N;
var bo=p;
var bx=n;
var bs=I;
var bA=t;
var bz=v;
var bm=D;
var bH=Y;
var bJ=W;
var bt=T;
var bw=[O+bt+M,H+bt+B,w+bt+S,P+bt+X,C+bt+r].join(bc);
var bF=bu(bE);
var bp=bu(bv);
var bC=bu(bo);
var bl=bu(bx);
var bI=bu(bs);
var br=bu(bA);
var bj=bu(bz);
var bD=bu(bm);
var bq=bu(bH);
var bi=bu(bJ);
var bn=bu(bw);
var bB=new RegExp([bE,bv,bo,bx,bs,bA,bz,bz,bm,bH,bJ,bw,y].join(bc),G);
var bG=[];
var a=bh.match(bB);

for(var i=0;i<a.length;i++){var bK=a[i];

if(bK.match(bF)){bG.push({type:b,value:bK});
}else if(bK.match(bp)){bG.push({type:bb,value:bK});
}else if(bK.match(bn)){bG.push({type:be,value:bK});
}else if(bK.match(bj)){bG.push({type:c,value:bK});
}else if(bK.match(br)){bG.push({type:e,value:bK});
}else if(bL[bK]){bG.push({type:bf,value:bK});
}else if(by[bK]){bG.push({type:ba,value:bK});
}else if(bk[bK]){bG.push({type:h,value:bK});
}else if(bK.match(bC)){bG.push({type:bg,value:bK});
}else if(bK.match(bI)){bG.push({type:q,value:bK});
}else if(bK.match(bl)){bG.push({type:z,value:bK});
}else if(bK.match(bq)){bG.push({type:j,value:bK});
}else if(bK.match(bu(bi))){bG.push({type:g,value:bK});
}else if(bK.match(bD)){bG.push({type:A,value:bK});
}else if(bK==f){bG.push({type:k,value:f});
}else if(bK==d){bG.push({type:k,value:d});
}else if(bK==bd){bG.push({type:k,value:bd});
}else{bG.push({type:k,value:bK});
}}return bG;
},javaScriptToHtml:function(bN){var bR=qx.dev.Tokenizer.tokenizeJavaScript(bN);
var bQ=new qx.util.StringBuilder();

for(var i=0;i<bR.length;i++){var bS=bR[i];
var bP=qx.bom.String.escape(bS.value);

switch(bS.type){case be:bQ.add(Q,bP,l);
break;
case bg:bQ.add(E,bP,l);
break;
case b:case bb:bQ.add(m,bP,l);
break;
case c:case e:bQ.add(o,bP,l);
break;
case bf:case ba:case h:bQ.add(U,bS.type,V,bP,l);
break;
case j:var bO=qx.bom.client.Engine.MSHTML?K:R;
bQ.add(bO);
break;
case g:var bT=qx.bom.client.Engine.MSHTML?x:J;
bQ.add(bT);
break;
default:bQ.add(bP);
}}return bQ.get();
}}});
})();
(function(){var C="",B="execute",A="value",z="appear",y="coreScripts",x="visible",w="visibility",v="userExt",u="do",t="finished",bW="function",bV="/core/scripts/selenium-api.js",bU='.seleniumLog .warn  { color: #FFA500 }',bT="icon/22/actions/list-remove.png",bS="/core/xpath/xmltoken.js",bR="/core/scripts/selenium-commandhandlers.js",bQ="Run selected command(s)",bP=" ms",bO="/core/scripts/selenium-executionloop.js",bN="50%",J="/core/xpath/javascript-xpath-0.1.11.js",K="changeValue",H="info",I="auto",F="instance",G="icon/22/categories/system.png",D="Command",E="/core/xpath/xpath.js",R="qxClick",S="Selenium",bo="/core/scripts/selenium-browserbot.js",bk="20%",bw="icon/22/actions/media-record.png",br="_speedSlider",bI="icon/22/actions/window-new.png",bC="/core/scripts/ui-element.js",bc='<div class="',bM="/core/scripts/htmlutils.js",bK="Target",bJ="Add locator for inspected widget",ba="qx.event.type.Event",bg="_logArea",bi="_toolbar",bm="/core/scripts/selenium-browserdetect.js",bp="/",bs="/core/lib/cssQuery/cssQuery-p.js",by="/core/lib/prototype.js",bE="_optionsButton",L="Options",M="seleniumLog",be="/core/scripts/selenium-logging.js",bv="_applySeleniumScripts",bu="vertical",bt='.seleniumLog .debug { color: #008000 }',bA="qx.application",bz='.seleniumLog .error { color: #E50000; font-weight: bold }',bq="/core/scripts/selenium-remoterunner.js",bx="_recordButton",p="changeHtml",bD="Value",N="icon/22/actions/media-playback-start.png",O="Convert the current test case to Selenese format",bl="inspector.selenium.SeleniumWindow",q="Automatically add a new command for each inspected widget",s="/core/scripts/selenium-version.js",X="Remove selected command(s)",P="/core/xpath/util.js",Q="/core/lib/snapsie.js",W="icon/22/actions/list-add.png",bn="Step speed (Selenium command execution delay)",bG="_table",bF="changeSeleniumScripts",bh='">',bH="_optionsWindow",bb="Selenium Options",bB="/core/xpath/dom.js",T="/core/scripts/find_matching_child.js",V="hidden",bd='.seleniumLog .info  { color: #000000 }',bj="white",U='</div><hr/>',bL="/core/scripts/xmlextras.js",bf="main",r="commands",Y="30%";
qx.Class.define(bl,{extend:inspector.components.AbstractWindow,construct:function(){inspector.components.AbstractWindow.call(this,S);
this.__uA=[bL,by,bs,Q,bM,bC,bm,bo,T,bV,bR,bO,bq,be,s,P,bS,bB,E,J];
this.__uB=[];
var dl=this.__uG();
dl.setEnabled(false);
this._toolbar.add(dl);
var dm=this.__uH();
dm.setEnabled(false);
this._toolbar.add(dm);
this._toolbar.addSpacer();
this._toolbar.add(this.__uI());
this._optionsWindow=new inspector.selenium.OptionsWindow(bb,null,this);
var dp=new qx.ui.splitpane.Pane(bu);
this.add(dp,{flex:1});
window.pane=dp;
this._table=this.__uL();
dp.add(this._table,2);
this._logArea=this.__uM();
dp.add(this._logArea,1);
var dk=qx.bom.Cookie.get(y);
var dn=qx.bom.Cookie.get(v);

if(dk&&dn){this.setSeleniumScripts([dk,dn]);
}},events:{"open":ba},properties:{seleniumScripts:{init:null,apply:bv,event:bF}},members:{__uB:null,__uC:null,__uD:null,__uE:null,__uA:null,__uF:null,setInitSizeAndPosition:function(){this.moveTo(0,35);
this.setHeight(300);
this.setWidth(400);
},select:function(da){if(da==this.__uC){return;
}this.__uC=da;

if(this._recordButton.getValue()){this.__uJ();
}},getSelection:function(){var cm=this.__uC;
if(cm!=null){return cm.getUserData(F);
}return null;
},getSelenium:function(){if(this.__uD){return this.__uD;
}var dj=qx.core.Init.getApplication().getIframeWindowObject();
this.__uD=window.Selenium.createForWindow(dj);
this.setLogHook();
return this.__uD;
},__uG:function(){var dg=new qx.ui.toolbar.Part();
var df=new qx.ui.toolbar.Button(null,W);
dg.add(df);
df.addListener(B,this.__uJ,this);
df.setToolTipText(bJ);
var dh=new qx.ui.toolbar.Button(null,bT);
dg.add(dh);
dh.addListener(B,this.__uK,this);
dh.setToolTipText(X);
return dg;
},__uH:function(){var d=new qx.ui.toolbar.Part();
this._speedSlider=new qx.ui.form.Slider();
this._speedSlider.set({toolTipText:bn,minimum:2,maximum:50,singleStep:1,pageStep:10,allowGrowY:false,width:50,marginTop:10,marginLeft:5});
this._speedSlider.setValue(5);
d.add(this._speedSlider);
var e=new qx.ui.basic.Label(C);
e.set({marginTop:10,marginLeft:4});
d.add(e);
var f={converter:function(db){return (db*100)+bP;
}};
this._speedSlider.bind(A,e,A,f);
var g=new qx.ui.toolbar.Button(null,N);
d.add(g);
g.addListener(B,this.runSeleniumCommands,this);
g.setToolTipText(bQ);
this._recordButton=new qx.ui.toolbar.CheckBox(null,bw);
d.add(this._recordButton);
this._recordButton.setToolTipText(q);
this._exportButton=new qx.ui.toolbar.CheckBox(null,bI);
d.add(this._exportButton);
this._exportButton.setToolTipText(O);
this._exportButton.addListenerOnce(K,function(ce){this.__uO();
},this);
return d;
},__uI:function(){var dq=new qx.ui.toolbar.Part();
this._optionsButton=new qx.ui.toolbar.Button(null,G);
this._optionsButton.setToolTipText(L);
dq.add(this._optionsButton);
this._optionsButton.addListener(B,function(cP){if(!this._optionsWindow.isVisible()){this._optionsWindow.open();
}},this);
return dq;
},__uJ:function(){var cT=[C,C,C];

if(this.__uC){var cQ=qx.core.Init.getApplication().getIframeWindowObject();
var cS=cQ.qx.core.Init.getApplication().getRoot();
var cR=inspector.selenium.SeleniumUtil.getQxhLocator(this.__uC,cS);
var cU=R;
cT=[cU,cR,C,this.__uB];
}this._table.getTableModel().addRows([cT]);
},__uK:function(){var cv=this._table.getTableModel();
var cu=[];
this._table.getSelectionModel().iterateSelection(function(cn){cu.push(cn);
this;
},this);

for(var i=0,l=cu.length;i<l;i++){var cw=cu[i];
cv.removeRows(cw-i,1);
}},__uL:function(){var cB=new qx.ui.table.model.Simple();
cB.setColumns([D,bK,bD,r]);
cB.setColumnEditable(0,true);
cB.setColumnEditable(1,true);
cB.setColumnEditable(2,true);
var cA=function(cg){var ch=cg.table;
var cl=ch.getTableModel();
var cj=cl.getRowData(cg.row);
var ci=cj[3];
var ck=new qx.ui.table.celleditor.ComboBox();
ck.setListData(ci);
return ck;
};
var cz=new qx.ui.table.celleditor.Dynamic(cA);
var cx={tableColumnModel:function(dd){return new qx.ui.table.columnmodel.Resize(dd);
}};
var cD=new qx.ui.table.Table(cB,cx);
cD.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
var cC=cD.getTableColumnModel();
cC.setColumnVisible(3,false);
cC.setCellEditorFactory(0,cz);
var cy=cC.getBehavior();
cy.setWidth(0,bk);
cy.setWidth(1,bN);
cy.setWidth(2,Y);
return cD;
},__uM:function(){var cX=new qx.ui.embed.Html();
cX.set({padding:5,cssClass:M,overflowY:I,decorator:bf,backgroundColor:bj});
cX.addListener(p,function(cI){qx.event.Timer.once(function(){var ds=this.getContentElement().getDomElement();
var dr=ds.childNodes.length-1;

if(dr>0){var dt=ds.childNodes[dr];
qx.bom.element.Scroll.intoViewY(dt);
}},this,0);
});
var cY=bt;
cY+=bd;
cY+=bU;
cY+=bz;
qx.bom.Stylesheet.createElement(cY);
return cX;
},runSeleniumCommands:function(cE){var cF=this._table.getTableModel();
var cH=this._table.getSelectionModel().getSelectedCount();

if(cH>0){var cG=[];
this._table.getSelectionModel().iterateSelection(function(cJ){cG.push(cF.getRowData(cJ));
});
}else{var cG=[];

for(var i=0;i<cF.getRowCount();i++){cG.push(cF.getRowData(i));
}}
if(cG.length>0){this.__uE=cG;
this.__uN();
}},__uN:function(){if(this.__uE.length==0){return;
}var h=this.__uE.shift();
var n=h[0];
var m=h[1];
var o=h[2];
var j=this.getSelenium();
n=u+n.replace(/^.{1}/,n.substr(0,1).toUpperCase());

try{j[n](m,o);
}catch(cf){window.LOG.error(cf.message);
}var k=this._speedSlider.getValue()*100;
qx.event.Timer.once(this.__uN,this,k);
},__uO:function(){var cV=qx.core.Init.getApplication().getIframeWindowObject().location.href;
var cW=qx.core.Init.getApplication().getIframeWindowObject().qx.core.Setting.get(bA);
this.__uF=new inspector.selenium.SeleneseTestCase(cV,cW);
this.__uF.addListenerOnce(z,function(event){var ct={converter:function(du){return du?x:V;
}};
this._exportButton.bind(A,this.__uF,w,ct);
var cs={converter:function(de){return de==x;
}};
this.__uF.bind(w,this._exportButton,A,cs);
},this);
this.__uF.addListener(z,function(a){this.__uF.reset();
var b=this._table.getTableModel();

for(var i=0,l=b.getRowCount();i<l;i++){var c=b.getRowData(i);
this.__uF.addCommand(c.slice(0,3));
}this.__uF.showSelenese();
},this);
this.__uF.open();
},getAvailableCommands:function(){var cp=[];
var cq=this.getSelenium();

for(var cr in cq){if(typeof cq[cr]==bW&&cr.indexOf(u)==0){var co=cr.substr(2);
co=co.replace(/^.{1}/,co.substr(0,1).toLowerCase());
cp.push(co);
}}cp.sort();
return cp;
},setLogHook:function(){if(!window.Logger){this.warn("Selenium Logger not ready!");
return;
}var self=this;
window.Logger.prototype.logHook=function(cK,cL){if(!cL){return;
}var cO=cK||H;
var cN=self._logArea.getHtml()||C;
var cM=cN+bc+cO+bh+cL+U;
self._logArea.setHtml(cM);
};
},_applySeleniumScripts:function(bX,bY){if(bX==bY){return;
}this._toolbar.getChildren()[0].setEnabled(false);
this._toolbar.getChildren()[1].setEnabled(false);

if(window.Selenium){window.Selenium=null;
}var cc=bX[0];
var cd=bX[1];
if(cc.substr(cc.length-1)==bp){cc=cc.substr(0,cc.length-1);
}var cb=new inspector.selenium.QueuedScriptLoader();
cb.addListenerOnce(t,function(dc){if(dc.getData().fail>0){alert("Couldn't load Selenium Core scripts, make sure the path is correct!");
return;
}cb.addListenerOnce(t,this.__uP,this);
cb.load([cd]);
},this);
var ca=[];

for(var i=0,l=this.__uA.length;i<l;i++){ca.push(cc+this.__uA[i]);
}cb.load(ca);
},__uP:function(di){if(di.getData().fail>0){alert("Couldn't load qooxdoo Selenium user extensions, make sure the path is correct!");
return;
}
if(!window.Selenium){alert("Unexpected error: Selenium instance not created!");
return;
}qx.bom.Cookie.set(y,this.getSeleniumScripts()[0],365);
qx.bom.Cookie.set(v,this.getSeleniumScripts()[1],365);
this._toolbar.getChildren()[0].setEnabled(true);
this._toolbar.getChildren()[1].setEnabled(true);
this.__uB=this.getAvailableCommands();
}},destruct:function(){this.__uD=null;
window.selenium=null;
window.LOG=null;
this._disposeObjects(bi,bx,br,bE,bH,bG,bg);
}});
})();
(function(){var m="",l="value",k="execute",j="seleniumScripts",i="URI of a directory containing the contents of a Selenium Core Zip file (seleniumhq.org/download)",h="Cancel",g="inspector.selenium.OptionsWindow",f="URI of the qooxdoo Selenium user extensions from the Simulator contribution",e="Selenium Core",d="Script Locations",a='See the <a href="http://manual.qooxdoo.org/1.2/pages/application/inspector_selenium.html" target="_blank">manual page</a> for an explanation of these settings.',c="OK",b="qooxdoo User Extensions";
qx.Class.define(g,{extend:qx.ui.window.Window,construct:function(p,q,r){qx.ui.window.Window.call(this,p,q);
this.set({layout:new qx.ui.layout.VBox(20),modal:true,width:300});
this.moveTo(160,0);
var C=new qx.ui.container.Composite(new qx.ui.layout.Grow());
this.add(C);
var w=new qx.ui.form.Form();
w.addGroupHeader(d);
var s=new qx.ui.form.TextField();
s.setToolTipText(i);
s.setRequired(true);
w.add(s,e);
var B=new qx.ui.form.TextField();
B.setToolTipText(f);
B.setRequired(true);
w.add(B,b);
var x=new qx.ui.form.Button(c);
x.addListener(k,function(){if(w.validate()){this.setSeleniumScripts([s.getValue(),B.getValue()]);
this._optionsWindow.close();
}},r);
w.addButton(x);
var z=new qx.ui.form.Button(h);
z.addListener(k,function(){if(this.getSeleniumScripts()){s.setValue(this.getSeleniumScripts()[0]);
B.setValue(this.getSeleniumScripts()[1]);
}this._optionsWindow.close();
},r);
w.addButton(z);
var A=new qx.ui.form.renderer.Single(w);
A._getLayout().setColumnFlex(0,0);
A._getLayout().setColumnFlex(1,1);
C.add(A);
var D={converter:function(n,o){if(!n){return m;
}return n[0];
}};
r.bind(j,s,l,D);
var t={converter:function(E,F){if(!E){return m;
}return E[1];
}};
r.bind(j,B,l,t);
var y=new qx.ui.container.Composite(new qx.ui.layout.Grow());
this.add(y);
var v=a;
var u=new qx.ui.basic.Label(m);
u.setRich(true);
u.setValue(v);
y.add(u);
}});
})();
(function(){var b="qx.ui.form.Form",a="";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__uQ=[];
this.__uR=[];
this._validationManager=new qx.ui.form.validation.Manager();
this._resetter=new qx.ui.form.Resetter();
},members:{__uQ:null,_validationManager:null,__uS:0,__uR:null,_resetter:null,add:function(f,g,h,name,k){if(this.__uT()){this.__uQ.push({title:null,items:[],labels:[],names:[]});
}this.__uQ[this.__uS].items.push(f);
this.__uQ[this.__uS].labels.push(g);
if(name==null){name=g.replace(/\s+|&|-|\+|\*|\/|\||!|\.|,|:|\?|;|~|%|\{|\}|\(|\)|\[|\]|<|>|=|\^|@|\\/g,a);
}this.__uQ[this.__uS].names.push(name);
this._validationManager.add(f,h,k);
this._resetter.add(f);
},addGroupHeader:function(e){if(!this.__uT()){this.__uS++;
}this.__uQ.push({title:e,items:[],labels:[],names:[]});
},addButton:function(l){this.__uR.push(l);
},__uT:function(){return this.__uQ.length===0;
},reset:function(){this._resetter.reset();
this._validationManager.reset();
},redefineResetter:function(){this._resetter.redefine();
},validate:function(){return this._validationManager.validate();
},getValidationManager:function(){return this._validationManager;
},getGroups:function(){return this.__uQ;
},getButtons:function(){return this.__uR;
},getItems:function(){var c={};
for(var i=0;i<this.__uQ.length;i++){var d=this.__uQ[i];
for(var j=0;j<d.names.length;j++){var name=d.names[j];
c[name]=d.items[j];
}}return c;
}}});
})();
(function(){var be="",bd="complete",bc="String",bb="changeValid",ba="qx.event.type.Event",Y="value instanceof Function || qx.Class.isSubClassOf(value.constructor, qx.ui.form.validation.AsyncValidator)",X="qx.ui.form.validation.Manager",W="This field is required",V="qx.event.type.Data";
qx.Class.define(X,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__uU=[];
this.__uV={};
this.setRequiredFieldMessage(qx.locale.Manager.tr(W));
},events:{"changeValid":V,"complete":ba},properties:{validator:{check:Y,init:null,nullable:true},invalidMessage:{check:bc,init:be},requiredFieldMessage:{check:bc,init:be},context:{nullable:true}},members:{__uU:null,__uW:null,__uV:null,__uX:null,add:function(L,M,N){if(!this.__vd(L)){throw new Error("Added widget not supported.");
}if(this.__ve(L)){if(M!=null){throw new Error("Widgets suporting selection can only be validated "+"in the form validator");
}}var O={item:L,validator:M,valid:null,context:N};
this.__uU.push(O);
},validate:function(){var H=true;
this.__uX=true;
var E=[];
for(var i=0;i<this.__uU.length;i++){var F=this.__uU[i].item;
var I=this.__uU[i].validator;
E.push(F);
if(I==null){var D=this.__uY(F);
H=H&&D;
this.__uX=D&&this.__uX;
continue;
}var D=this.__va(this.__uU[i],F.getValue());
H=D&&H;

if(D!=null){this.__uX=D&&this.__uX;
}}var G=this.__vb(E);

if(qx.lang.Type.isBoolean(G)){this.__uX=G&&this.__uX;
}H=G&&H;
this.__vg(H);

if(qx.lang.Object.isEmpty(this.__uV)){this.fireEvent(bd);
}return H;
},__uY:function(a){if(a.getRequired()){if(this.__ve(a)){var b=!!a.getSelection()[0];
}else{var b=!!a.getValue();
}a.setValid(b);
var d=a.getRequiredInvalidMessage();
var c=d?d:this.getRequiredFieldMessage();
a.setInvalidMessage(c);
return b;
}return true;
},__va:function(w,x){var C=w.item;
var B=w.context;
var A=w.validator;
if(this.__vc(A)){this.__uV[C.toHashCode()]=null;
A.validate(C,C.getValue(),this,B);
return null;
}var z=null;

try{var z=A.call(B||this,x,C);

if(z===undefined){z=true;
}}catch(e){if(e instanceof qx.core.ValidationError){z=false;

if(e.message&&e.message!=qx.type.BaseError.DEFAULTMESSAGE){var y=e.message;
}else{var y=e.getComment();
}C.setInvalidMessage(y);
}else{throw e;
}}C.setValid(z);
w.valid=z;
return z;
},__vb:function(p){var r=this.getValidator();
var s=this.getContext()||this;

if(r==null){return true;
}this.setInvalidMessage(be);

if(this.__vc(r)){this.__uV[this.toHashCode()]=null;
r.validateForm(p,this,s);
return null;
}
try{var t=r.call(s,p,this);

if(t===undefined){t=true;
}}catch(e){if(e instanceof qx.core.ValidationError){t=false;

if(e.message&&e.message!=qx.type.BaseError.DEFAULTMESSAGE){var q=e.message;
}else{var q=e.getComment();
}this.setInvalidMessage(q);
}else{throw e;
}}return t;
},__vc:function(J){var K=false;

if(!qx.lang.Type.isFunction(J)){K=qx.Class.isSubClassOf(J.constructor,qx.ui.form.validation.AsyncValidator);
}return K;
},__vd:function(u){var v=u.constructor;
return qx.Class.hasInterface(v,qx.ui.form.IForm);
},__ve:function(f){var g=f.constructor;
return qx.Class.hasInterface(g,qx.ui.core.ISingleSelection);
},__vf:function(l){var m=l.constructor;
return (qx.Class.hasInterface(m,qx.ui.form.IBooleanForm)||qx.Class.hasInterface(m,qx.ui.form.IColorForm)||qx.Class.hasInterface(m,qx.ui.form.IDateForm)||qx.Class.hasInterface(m,qx.ui.form.INumberForm)||qx.Class.hasInterface(m,qx.ui.form.IStringForm));
},__vg:function(n){var o=this.__uW;
this.__uW=n;
if(o!=n){this.fireDataEvent(bb,n,o);
}},getValid:function(){return this.__uW;
},isValid:function(){return this.getValid();
},getInvalidMessages:function(){var T=[];
for(var i=0;i<this.__uU.length;i++){var U=this.__uU[i].item;

if(!U.getValid()){T.push(U.getInvalidMessage());
}}if(this.getInvalidMessage()!=be){T.push(this.getInvalidMessage());
}return T;
},reset:function(){for(var i=0;i<this.__uU.length;i++){var P=this.__uU[i];
P.item.setValid(true);
}this.__uW=null;
},setItemValid:function(j,k){this.__uV[j.toHashCode()]=k;
j.setValid(k);
this.__vh();
},setFormValid:function(h){this.__uV[this.toHashCode()]=h;
this.__vh();
},__vh:function(){var R=this.__uX;
for(var S in this.__uV){var Q=this.__uV[S];
R=Q&&R;
if(Q==null){return;
}}this.__vg(R);
this.__uV={};
this.fireEvent(bd);
}},destruct:function(){this.__uU=null;
}});
})();
(function(){var b="qx.ui.form.validation.AsyncValidator";
qx.Class.define(b,{extend:qx.core.Object,construct:function(a){qx.core.Object.call(this);
this.__vi=a;
},members:{__vi:null,__vj:null,__vk:null,__vl:null,validate:function(h,i,j,k){this.__vl=false;
this.__vj=h;
this.__vk=j;
this.__vi.call(k||this,this,i);
},validateForm:function(c,d,e){this.__vl=true;
this.__vk=d;
this.__vi.call(e,c,this);
},setValid:function(f,g){if(this.__vl){if(g!==undefined){this.__vk.setInvalidMessage(g);
}this.__vk.setFormValid(f);
}else{if(g!==undefined){this.__vj.setInvalidMessage(g);
}this.__vk.setItemValid(this.__vj,f);
}}},destruct:function(){this.__vk=this.__vj=null;
}});
})();
(function(){var b="qx.ui.form.IDateForm",a="qx.event.type.Data";
qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;
},resetValue:function(){},getValue:function(){}}});
})();
(function(){var a="qx.ui.form.Resetter";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__vm=[];
},members:{__vm:null,add:function(b){if(this.__vq(b)){var c=b.getValue();
}else if(this.__vp(b)){var c=b.getSelection();
}else{throw new Error("Item "+b+" not supported for reseting.");
}this.__vm.push({item:b,init:c});
},reset:function(){for(var i=0;i<this.__vm.length;i++){var d=this.__vm[i];
this.__vn(d.item,d.init);
}},resetItem:function(e){var f;

for(var i=0;i<this.__vm.length;i++){var g=this.__vm[i];

if(g.item===e){f=g.init;
break;
}}if(f===undefined){throw new Error("The given item has not been added.");
}this.__vn(e,f);
},__vn:function(n,o){if(this.__vq(n)){n.setValue(o);
}else if(this.__vp(n)){n.setSelection(o);
}},redefine:function(){for(var i=0;i<this.__vm.length;i++){var h=this.__vm[i].item;
this.__vm[i].init=this.__vo(h);
}},redefineItem:function(j){var k;

for(var i=0;i<this.__vm.length;i++){if(this.__vm[i].item===j){k=this.__vm[i];
break;
}}if(k===undefined){throw new Error("The given item has not been added.");
}k.init=this.__vo(k.item);
},__vo:function(r){if(this.__vq(r)){return r.getValue();
}else if(this.__vp(r)){return r.getSelection();
}},__vp:function(l){var m=l.constructor;
return qx.Class.hasInterface(m,qx.ui.core.ISingleSelection);
},__vq:function(p){var q=p.constructor;
return (qx.Class.hasInterface(q,qx.ui.form.IBooleanForm)||qx.Class.hasInterface(q,qx.ui.form.IColorForm)||qx.Class.hasInterface(q,qx.ui.form.IDateForm)||qx.Class.hasInterface(q,qx.ui.form.INumberForm)||qx.Class.hasInterface(q,qx.ui.form.IStringForm));
}}});
})();
(function(){var a="qx.ui.form.renderer.IFormRenderer";
qx.Interface.define(a,{members:{addItems:function(c,d,e){},addButton:function(b){}}});
})();
(function(){var n="qx.dynlocale",m="",l="changeLocale",k="visibility",j="on",h=" <span style='color:red'>*</span> ",g="abstract",f="qx.ui.form.renderer.AbstractRenderer",d=" :";
qx.Class.define(f,{type:g,extend:qx.ui.core.Widget,implement:qx.ui.form.renderer.IFormRenderer,construct:function(q){qx.ui.core.Widget.call(this);
this._visibilityBindingIds=[];
if(qx.core.Variant.isSet(n,j)){qx.locale.Manager.getInstance().addListener(l,this._onChangeLocale,this);
this._names=[];
}var t=q.getGroups();

for(var i=0;i<t.length;i++){var s=t[i];
this.addItems(s.items,s.labels,s.title);
}var r=q.getButtons();

for(var i=0;i<r.length;i++){this.addButton(r[i]);
}},members:{_names:null,_visibilityBindingIds:null,_connectVisibility:function(a,b){var c=a.bind(k,b,k);
this._visibilityBindingIds.push({id:c,item:a});
},_onChangeLocale:qx.core.Variant.select(n,{"on":function(e){for(var i=0;i<this._names.length;i++){var x=this._names[i];

if(x.name&&x.name.translate){x.name=x.name.translate();
}var y=this._createLabelText(x.name,x.item);
x.label.setValue(y);
}},"off":null}),_createLabelText:function(name,z){var A=m;

if(z.getRequired()){A=h;
}var B=name.length>0||z.getRequired()?d:m;
return name+A+B;
},addItems:function(u,v,w){throw new Error("Abstract method call");
},addButton:function(p){throw new Error("Abstract method call");
}},destruct:function(){if(qx.core.Variant.isSet(n,j)){qx.locale.Manager.getInstance().removeListener(l,this._onChangeLocale,this);
}this._names=null;
for(var i=0;i<this._visibilityBindingIds.length;i++){var o=this._visibilityBindingIds[i];
o.item.removeBinding(o.id);
}}});
})();
(function(){var h="right",g="bold",f="_buttonRow",e="qx.ui.form.renderer.Single",d="left",c="qx.dynlocale",b="top",a="on";
qx.Class.define(e,{extend:qx.ui.form.renderer.AbstractRenderer,construct:function(n){var o=new qx.ui.layout.Grid();
o.setSpacing(6);
o.setColumnFlex(0,1);
o.setColumnAlign(0,h,b);
this._setLayout(o);
qx.ui.form.renderer.AbstractRenderer.call(this,n);
},members:{_row:0,_buttonRow:null,addItems:function(p,q,r){if(r!=null){this._add(this._createHeader(r),{row:this._row,column:0,colSpan:2});
this._row++;
}for(var i=0;i<p.length;i++){var t=this._createLabel(q[i],p[i]);
this._add(t,{row:this._row,column:0});
var s=p[i];
t.setBuddy(s);
this._add(s,{row:this._row,column:1});
this._row++;
this._connectVisibility(s,t);
if(qx.core.Variant.isSet(c,a)){this._names.push({name:q[i],label:t,item:p[i]});
}}},addButton:function(u){if(this._buttonRow==null){this._buttonRow=new qx.ui.container.Composite();
this._buttonRow.setMarginTop(5);
var v=new qx.ui.layout.HBox();
v.setAlignX(h);
v.setSpacing(5);
this._buttonRow.setLayout(v);
this._add(this._buttonRow,{row:this._row,column:0,colSpan:2});
this._row++;
}this._buttonRow.add(u);
},getLayout:function(){return this._getLayout();
},_createLabel:function(name,l){var m=new qx.ui.basic.Label(this._createLabelText(name,l));
m.setRich(true);
return m;
},_createHeader:function(j){var k=new qx.ui.basic.Label(j);
k.setFont(g);

if(this._row!=0){k.setMarginTop(10);
}k.setAlignX(d);
return k;
}},destruct:function(){if(this._buttonRow){this._buttonRow.removeAll();
this._disposeObjects(f);
}}});
})();
(function(){var z="splitter",w="slider",v="mousedown",u="mouseout",t="mousemove",s="mouseup",r="losecapture",q="active",p="horizontal",o="vertical",P="knob",O="Integer",N="height",M="row-resize",L="move",K="maxHeight",J="width",I="_applyOrientation",H="mouseover",G="splitpane",E="qx.ui.splitpane.Pane",F="_applyOffset",C="minHeight",D="minWidth",A="col-resize",B="maxWidth";
qx.Class.define(E,{extend:qx.ui.core.Widget,construct:function(be){qx.ui.core.Widget.call(this);
this.__me=[];
if(be){this.setOrientation(be);
}else{this.initOrientation();
}this.addListener(v,this._onMouseDown);
this.addListener(s,this._onMouseUp);
this.addListener(t,this._onMouseMove);
this.addListener(u,this._onMouseOut);
this.addListener(r,this._onMouseUp);
},properties:{appearance:{refine:true,init:G},offset:{check:O,init:6,apply:F},orientation:{init:p,check:[p,o],apply:I}},members:{__mf:null,__mg:false,__mh:null,__mi:null,__mj:null,__mk:null,__ml:null,__me:null,_createChildControlImpl:function(Q){var R;

switch(Q){case w:R=new qx.ui.splitpane.Slider(this);
R.exclude();
this._add(R,{type:Q});
break;
case z:R=new qx.ui.splitpane.Splitter(this);
this._add(R,{type:Q});
R.addListener(L,this._onSplitterMove,this);
if(qx.bom.client.Engine.OPERA){R.addListener(H,this._onSplitterMouseOver,R);
}break;
}return R||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,Q);
},_applyOrientation:function(V,W){var X=this.getChildControl(w);
var bb=this.getChildControl(z);
this.__mj=V===p;
var ba=this._getLayout();

if(ba){ba.dispose();
}var Y=V===o?new qx.ui.splitpane.VLayout:new qx.ui.splitpane.HLayout;
this._setLayout(Y);
bb.removeState(W);
bb.addState(V);
bb.getChildControl(P).removeState(W);
bb.getChildControl(P).addState(V);
X.removeState(W);
X.addState(V);
},_applyOffset:function(a,b){var c=this.getChildControl(z);

if(b===0){c.removeListener(v,this._onMouseDown,this);
c.removeListener(t,this._onMouseMove,this);
c.removeListener(u,this._onMouseOut,this);
c.removeListener(s,this._onMouseUp,this);
c.removeListener(r,this._onMouseUp,this);
this.addListener(v,this._onMouseDown);
this.addListener(s,this._onMouseUp);
this.addListener(t,this._onMouseMove);
this.addListener(u,this._onMouseOut);
this.addListener(r,this._onMouseUp);
}
if(a===0){this.removeListener(v,this._onMouseDown);
this.removeListener(s,this._onMouseUp);
this.removeListener(t,this._onMouseMove);
this.removeListener(u,this._onMouseOut);
this.removeListener(r,this._onMouseUp);
c.addListener(v,this._onMouseDown,this);
c.addListener(t,this._onMouseMove,this);
c.addListener(u,this._onMouseOut,this);
c.addListener(s,this._onMouseUp,this);
c.addListener(r,this._onMouseUp,this);
}},add:function(bc,bd){if(bd==null){this._add(bc);
}else{this._add(bc,{flex:bd});
}this.__me.push(bc);
},remove:function(bt){this._remove(bt);
qx.lang.Array.remove(this.__me,bt);
},getChildren:function(){return this.__me;
},_onMouseDown:function(e){if(!e.isLeftPressed()||!this._isNear()){return;
}var bo=this.getChildControl(z);
var bq=bo.getContainerLocation();
var bp=this.getContentLocation();
this.__mf=this.__mj?e.getDocumentLeft()-bq.left+bp.left:e.getDocumentTop()-bq.top+bp.top;
var bs=this.getChildControl(w);
var br=bo.getBounds();
bs.setUserBounds(br.left,br.top,br.width,br.height);
bs.setZIndex(bo.getZIndex()+1);
bs.show();
this.__mg=true;
e.getCurrentTarget().capture();
e.stop();
},_onMouseMove:function(e){this._setLastMousePosition(e.getDocumentLeft(),e.getDocumentTop());
if(this.__mg){this.__mn();
var bf=this.getChildControl(w);
var bg=this.__mk;

if(this.__mj){bf.setDomLeft(bg);
}else{bf.setDomTop(bg);
}e.stop();
}else{this.__mm();
}},_onMouseOut:function(e){this._setLastMousePosition(-100,-100);
this.__mm();
},_onMouseUp:function(e){if(!this.__mg){return;
}this._finalizeSizes();
var bB=this.getChildControl(w);
bB.exclude();
this.__mg=false;
this.releaseCapture();
this.__mm();
e.stop();
},_onSplitterMove:function(){this.__mm();
},_onSplitterMouseOver:function(){this.addState(q);
},_finalizeSizes:function(){var bk=this.__mk;
var bh=this.__ml;

if(bk==null){return;
}var bm=this._getChildren();
var bl=bm[2];
var bi=bm[3];
var bj=bl.getLayoutProperties().flex;
var bn=bi.getLayoutProperties().flex;
if((bj!=0)&&(bn!=0)){bl.setLayoutProperties({flex:bk});
bi.setLayoutProperties({flex:bh});
}else{if(this.__mj){bl.setWidth(bk);
bi.setWidth(bh);
}else{bl.setHeight(bk);
bi.setHeight(bh);
}}},_isNear:function(){var bu=this.getChildControl(z);
var bw=bu.getBounds();
var by=bu.getContainerLocation();
var bv=this.getOffset();
if(!by){return;
}var bz=this.__mh;
var bA=bw.width;
var bx=by.left;

if(bA<bv){bx-=Math.floor((bv-bA)/2);
bA=bv;
}
if(bz<bx||bz>(bx+bA)){return false;
}var bz=this.__mi;
var bA=bw.height;
var bx=by.top;

if(bA<bv){bx-=Math.floor((bv-bA)/2);
bA=bv;
}
if(bz<bx||bz>(bx+bA)){return false;
}return true;
},__mm:function(){var T=this.getChildControl(z);
var U=this.getApplicationRoot();
if(this.__mg||this._isNear()){var S=this.__mj?A:M;
this.setCursor(S);
U.setGlobalCursor(S);
T.addState(q);
}else if(T.hasState(q)){this.resetCursor();
U.resetGlobalCursor();
T.removeState(q);
}},__mn:function(){if(this.__mj){var g=D,n=J,h=B,l=this.__mh;
}else{var g=C,n=N,h=K,l=this.__mi;
}var m=this._getChildren();
var d=m[2].getSizeHint();
var j=m[3].getSizeHint();
var k=m[2].getBounds()[n]+m[3].getBounds()[n];
var i=l-this.__mf;
var f=k-i;
if(i<d[g]){f-=d[g]-i;
i=d[g];
}else if(f<j[g]){i-=j[g]-f;
f=j[g];
}if(i>d[h]){f+=i-d[h];
i=d[h];
}else if(f>j[h]){i+=f-j[h];
f=j[h];
}this.__mk=i;
this.__ml=f;
},_isActiveDragSession:function(){return this.__mg;
},_setLastMousePosition:function(x,y){this.__mh=x;
this.__mi=y;
}},destruct:function(){this.__me=null;
}});
})();
(function(){var a="qx.ui.splitpane.Slider";
qx.Class.define(a,{extend:qx.ui.core.Widget,properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}}});
})();
(function(){var e="center",d="knob",c="middle",b="qx.ui.splitpane.Splitter",a="vertical";
qx.Class.define(b,{extend:qx.ui.core.Widget,construct:function(f){qx.ui.core.Widget.call(this);
if(f.getOrientation()==a){this._setLayout(new qx.ui.layout.HBox(0,e));
this._getLayout().setAlignY(c);
}else{this._setLayout(new qx.ui.layout.VBox(0,c));
this._getLayout().setAlignX(e);
}this._createChildControl(d);
},properties:{allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_createChildControlImpl:function(g){var h;

switch(g){case d:h=new qx.ui.basic.Image;
this._add(h);
break;
}return h||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,g);
}}});
})();
(function(){var c="slider",b="splitter",a="qx.ui.splitpane.VLayout";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(d,e){var v=this._getLayoutChildren();
var length=v.length;
var r,u;
var g,f,p,h;

for(var i=0;i<length;i++){r=v[i];
u=r.getLayoutProperties().type;

if(u===b){f=r;
}else if(u===c){p=r;
}else if(!g){g=r;
}else{h=r;
}}
if(g&&h){var x=g.getLayoutProperties().flex;
var k=h.getLayoutProperties().flex;

if(x==null){x=1;
}
if(k==null){k=1;
}var w=g.getSizeHint();
var n=f.getSizeHint();
var o=h.getSizeHint();
var j=w.height;
var s=n.height;
var t=o.height;

if(x>0&&k>0){var l=x+k;
var m=e-s;
var j=Math.round((m/l)*x);
var t=m-j;
var q=qx.ui.layout.Util.arrangeIdeals(w.minHeight,j,w.maxHeight,o.minHeight,t,o.maxHeight);
j=q.begin;
t=q.end;
}else if(x>0){j=e-s-t;

if(j<w.minHeight){j=w.minHeight;
}
if(j>w.maxHeight){j=w.maxHeight;
}}else if(k>0){t=e-j-s;

if(t<o.minHeight){t=o.minHeight;
}
if(t>o.maxHeight){t=o.maxHeight;
}}g.renderLayout(0,0,d,j);
f.renderLayout(0,j,d,s);
h.renderLayout(0,j+s,d,t);
}else{f.renderLayout(0,0,0,0);
if(g){g.renderLayout(0,0,d,e);
}else if(h){h.renderLayout(0,0,d,e);
}}},_computeSizeHint:function(){var H=this._getLayoutChildren();
var length=H.length;
var A,z,G;
var B=0,D=0,C=0;
var E=0,F=0,y=0;

for(var i=0;i<length;i++){A=H[i];
G=A.getLayoutProperties();
if(G.type===c){continue;
}z=A.getSizeHint();
B+=z.minHeight;
D+=z.height;
C+=z.maxHeight;

if(z.minWidth>E){E=z.minWidth;
}
if(z.width>F){F=z.width;
}
if(z.maxWidth>y){y=z.maxWidth;
}}return {minHeight:B,height:D,maxHeight:C,minWidth:E,width:F,maxWidth:y};
}}});
})();
(function(){var c="slider",b="splitter",a="qx.ui.splitpane.HLayout";
qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(o,p){var F=this._getLayoutChildren();
var length=F.length;
var C,E;
var r,q,z,s;

for(var i=0;i<length;i++){C=F[i];
E=C.getLayoutProperties().type;

if(E===b){q=C;
}else if(E===c){z=C;
}else if(!r){r=C;
}else{s=C;
}}
if(r&&s){var H=r.getLayoutProperties().flex;
var t=s.getLayoutProperties().flex;

if(H==null){H=1;
}
if(t==null){t=1;
}var G=r.getSizeHint();
var w=q.getSizeHint();
var y=s.getSizeHint();
var D=G.width;
var B=w.width;
var A=y.width;

if(H>0&&t>0){var u=H+t;
var v=o-B;
var D=Math.round((v/u)*H);
var A=v-D;
var x=qx.ui.layout.Util.arrangeIdeals(G.minWidth,D,G.maxWidth,y.minWidth,A,y.maxWidth);
D=x.begin;
A=x.end;
}else if(H>0){D=o-B-A;

if(D<G.minWidth){D=G.minWidth;
}
if(D>G.maxWidth){D=G.maxWidth;
}}else if(t>0){A=o-D-B;

if(A<y.minWidth){A=y.minWidth;
}
if(A>y.maxWidth){A=y.maxWidth;
}}r.renderLayout(0,0,D,p);
q.renderLayout(D,0,B,p);
s.renderLayout(D+B,0,A,p);
}else{q.renderLayout(0,0,0,0);
if(r){r.renderLayout(0,0,o,p);
}else if(s){s.renderLayout(0,0,o,p);
}}},_computeSizeHint:function(){var n=this._getLayoutChildren();
var length=n.length;
var f,e,m;
var k=0,l=0,d=0;
var g=0,j=0,h=0;

for(var i=0;i<length;i++){f=n[i];
m=f.getLayoutProperties();
if(m.type===c){continue;
}e=f.getSizeHint();
k+=e.minWidth;
l+=e.width;
d+=e.maxWidth;

if(e.minHeight>g){g=e.minHeight;
}
if(e.height>j){j=e.height;
}
if(e.maxHeight>h){h=e.maxHeight;
}}return {minWidth:k,width:l,maxWidth:d,minHeight:g,height:j,maxHeight:h};
}}});
})();
(function(){var h="inspector.selenium.SeleniumUtil",g="qxh=",f='"]',e="qx.",d="]",c="child[",b="/",a='[@classname="';
qx.Class.define(h,{statics:{getQxhLocator:function(j,k){if(!k){var k=qx.core.Init.getApplication().getRoot();
}var m=[];

while(j){if(j===k){break;
}var n=inspector.selenium.SeleniumUtil.getQxhLocatorStep(j);
m.push(n);
j=j.getLayoutParent();
}m.reverse();
return g+m.join(b);
},getQxhLocatorStep:function(q){var t=q.classname;
var u=a+t+f;

if(t.indexOf(e)==0){u=q.classname;
}var parent=q.getLayoutParent();
var s=false;
var r=0;
var v=[];

try{v=v.concat(parent.getChildren());
}catch(p){}try{v=v.concat(parent._getChildren());
}catch(o){}for(var i=0,l=v.length;i<l;i++){if(v[i]==q){r=i;
}else if(v[i].classname==q.classname){s=true;
}}
if(s){u=c+r+d;
}return u;
}}});
})();
(function(){var g="",f="Function",e="qx.ui.table.celleditor.ComboBox",d="number",c="Array",b="table-editor-combobox",a="appear";
qx.Class.define(e,{extend:qx.core.Object,implement:qx.ui.table.ICellEditorFactory,properties:{validationFunction:{check:f,nullable:true,init:null},listData:{check:c,init:null,nullable:true}},members:{createCellEditor:function(h){var k=new qx.ui.form.ComboBox().set({appearance:b});
var m=h.value;
k.originalValue=m;
var p=h.table.getTableColumnModel().getDataCellRenderer(h.col);
var n=p._getContentHtml(h);

if(m!=n){m=n;
}if(m===null||m===undefined){m=g;
}var j=this.getListData();

if(j){var o;

for(var i=0,l=j.length;i<l;i++){var q=j[i];

if(q instanceof Array){o=new qx.ui.form.ListItem(q[0],q[1]);
}else{o=new qx.ui.form.ListItem(q,null);
}k.add(o);
}}k.setValue(g+m);
k.addListener(a,function(){k.selectAllText();
});
return k;
},getCellEditorValue:function(r){var t=r.getValue()||g;
var s=this.getValidationFunction();

if(s){t=s(t,r.originalValue);
}
if(typeof r.originalValue==d){t=parseFloat(t);
}return t;
}}});
})();
(function(){var b="Function",a="qx.ui.table.celleditor.Dynamic";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.ui.table.ICellEditorFactory,construct:function(f){qx.core.Object.call(this);

if(f){this.setCellEditorFactoryFunction(f);
}},properties:{cellEditorFactoryFunction:{check:b,nullable:true,init:null}},members:{__vr:null,createCellEditor:function(g){var h=this.getCellEditorFactoryFunction();
{};
this.__vr=h(g);
var i=this.__vr.createCellEditor(g);
return i;
},getCellEditorValue:function(c){var d=this.getCellEditorFactoryFunction();
{};
var e=this.__vr.getCellEditorValue(c);
return e;
}},destruct:function(){this.__vr=null;
}});
})();
(function(){var m="\n",k='  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',h="</td>\n",g='      <tr>',f='  <title>',e='  <table cellpadding="1" cellspacing="1" border="1">',d='</title>',c='    </thead>',b='    </tbody>',a='" />',I='</td>',H='<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">',G="      </tr>\n",F='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',E='  <link rel="selenium.base" href="',D='      </tr>',C="\n      <tr>\n",B='</head>',A='<head profile="http://selenium-ide.openqa.org/profiles/test-case">',z="Selenese Test Case",t='    <thead>',u="",r="        <td>",s='    <tbody>',p='<?xml version="1.0" encoding="UTF-8"?>',q='<body>',n='        <td rowspan="1" colspan="3">',o="inspector.selenium.SeleneseTestCase",v='  </table>',w="untitled",y='</html>',x='</body>';
qx.Class.define(o,{extend:qx.ui.window.Window,construct:function(K,L){qx.ui.window.Window.call(this,z);
this.set({layout:new qx.ui.layout.Grow(),width:500,height:450,contentPadding:5});
var scroll=new qx.ui.container.Scroll();
this.add(scroll);
this._textArea=new qx.ui.form.TextArea();
scroll.add(this._textArea,{edge:0});
var K=K||u;
var L=L||w;
this._header=[p,F,H,A,k,E+K+a,f+L+d,B,q,e,t,g,n+L+I,D,c,s];
this._footer=[b,v,x,y];
this.__vs=[];
},members:{_textArea:null,_header:null,_footer:null,__vs:null,addCommand:function(J){if(!J instanceof Array){return;
}this.__vs.push(J.slice(0,3));
},reset:function(){this.__vs=[];
},getSelenese:function(){var M=this._header.join(m);

for(var i=0,l=this.__vs.length;i<l;i++){var N=this.__vs[i];
M+=C;

for(var j=0;j<N.length;j++){M+=r+N[j]+h;
}M+=G;
}M+=this._footer.join(m);
return M;
},showSelenese:function(){this._textArea.setValue(this.getSelenese());
}}});
})();
(function(){var h="auto",g="textarea",f="Boolean",d="qx.ui.form.TextArea",c="_applyWrap",b="Integer",a="mousewheel";
qx.Class.define(d,{extend:qx.ui.form.AbstractField,construct:function(n){qx.ui.form.AbstractField.call(this,n);
this.initWrap();
this.addListener(a,this._onMousewheel,this);
},properties:{wrap:{check:f,init:true,apply:c},appearance:{refine:true,init:g},singleStep:{check:b,init:20}},members:{_onMousewheel:function(e){var l=this.getContentElement();
var scrollY=l.getScrollY();
l.scrollToY(scrollY+e.getWheelDelta()*this.getSingleStep());
var m=l.getScrollY();

if(m!=scrollY){e.stop();
}},_createInputElement:function(){return new qx.html.Input(g,{overflowX:h,overflowY:h});
},_applyWrap:function(i,j){this.getContentElement().setWrap(i);
},_getContentHint:function(){var k=qx.ui.form.AbstractField.prototype._getContentHint.call(this);
k.height=k.height*4;
k.width=this._getTextSize().width*20;
return k;
}}});
})();
(function(){var f="init",e="finished",d="fail",c="inspector.selenium.QueuedScriptLoader",b="success",a="qx.event.type.Data";
qx.Class.define(c,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__vt=[];
},events:{"finished":a},members:{__vt:null,__vu:null,load:function(i){this.__vt=this.__vt.concat(i);
this.__vv(f);
},__vv:function(status){switch(status){case f:this.__vu={"success":0,"fail":0};
break;
case b:this.__vu.success++;
break;
case d:this.__vu.fail++;
break;
}
if(this.__vt.length==0){this.fireDataEvent(e,this.__vu);
return;
}var g=this.__vt.shift();
var h=new qx.io.ScriptLoader();
h.load(g,this.__vv,this);
}}});
})();
(function(){var o="success",n="complete",m="error",l="load",k="fail",j="qx.client",i="loaded",h="readystatechange",g="head",f="qx.io.ScriptLoader",b="mshtml|webkit",d="script",c="text/javascript",a="abort";
qx.Bootstrap.define(f,{construct:function(){this.__kq=qx.Bootstrap.bind(this.__kv,this);
this.__kr=document.createElement(d);
},members:{__ks:null,__kt:null,__ku:null,__kq:null,__kr:null,load:function(p,q,r){if(this.__ks){throw new Error("Another request is still running!");
}this.__ks=true;
var s=document.getElementsByTagName(g)[0];
var t=this.__kr;
this.__kt=q||null;
this.__ku=r||window;
t.type=c;
t.onerror=t.onload=t.onreadystatechange=this.__kq;
t.src=p;
setTimeout(function(){s.appendChild(t);
},0);
},abort:function(){if(this.__ks){this.dispose(a);
}},dispose:function(status){if(this._disposed){return;
}this._disposed=true;
var v=this.__kr;
v.onerror=v.onload=v.onreadystatechange=null;
var u=v.parentNode;

if(u){u.removeChild(v);
}delete this.__ks;
if(this.__kt){if(qx.core.Variant.isSet(j,b)){var self=this;
setTimeout(qx.event.GlobalError.observeMethod(function(){self.__kt.call(self.__ku,status);
delete self.__kt;
}),0);
}else{this.__kt.call(this.__ku,status);
delete this.__kt;
}}},__kv:qx.event.GlobalError.observeMethod(qx.core.Variant.select(j,{"mshtml":function(e){var w=this.__kr.readyState;

if(w==i){this.dispose(o);
}else if(w==n){this.dispose(o);
}else{return;
}},"opera":function(e){if(qx.Bootstrap.isString(e)||e.type===m){return this.dispose(k);
}else if(e.type===l){return this.dispose(o);
}else{return;
}},"default":function(e){if(qx.Bootstrap.isString(e)||e.type===m){this.dispose(k);
}else if(e.type===l){this.dispose(o);
}else if(e.type===h&&(e.target.readyState===n||e.target.readyState===i)){this.dispose(o);
}else{return;
}}}))}});
})();


qx.$$loader.init();

