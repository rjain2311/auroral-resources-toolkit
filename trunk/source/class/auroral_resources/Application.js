/* ************************************************************************

COPYRIGHTS:

Copyright (c) 2011, National Geophysical Data Center, NOAA
Copyright (c) 2011, Geophysical Center, Russian Academy of Sciences
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer. Redistributions in binary
form must reproduce the above copyright notice, this list of conditions and
the following disclaimer in the documentation and/or other materials
provided with the distribution. Neither the names of the National Geophysical
Data Center, NOAA and the Geophysical Center, RAS nor the names of their
contributors may be used to endorse or promote products derived from this
software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.

LICENSE:

LGPL: http://www.gnu.org/licenses/lgpl.html
or
EPL: http://www.eclipse.org/org/documents/epl-v10.php

AUTHOR(S) OF THIS FILE:
Peter R. Elespuru - peter.elespuru@noaa.gov

************************************************************************ */

/* ************************************************************************

#asset(auroral_resources/*)
#asset(collapsablepanel/*)
#asset(galleria/*)
#asset(qx/icon/${qx.icontheme}/16/actions/*)
#asset(qx/icon/${qx.icontheme}/22/actions/*)
#asset(qx/icon/${qx.icontheme}/16/apps/utilities-help.png)
#asset(qx/icon/${qx.icontheme}/22/apps/preferences-users.png)

************************************************************************ */

/*
*****************************************************************************
*****************************************************************************
*/
qx.Class.define("auroral_resources.Application",
{

    extend : qx.application.Standalone,

    /*
    *****************************************************************************
        STATIC METHODS AND VARIABLES
    *****************************************************************************
    */
    statics :
    {
        __mainWindow : null,
        __originalUrl : null
    },

    /*
    *****************************************************************************
        CLASS VARIABLES AND METHODS
    *****************************************************************************
    */
    members :
    {
        __list : null,
        __currentListItem : null,
        __header : null,
        __footer : null,
        __toolBarView : null,
        __menuBarView : null,
        __timeBus : null,
        __horizontalSplitPane : null,
        __verticalSplitPane : null,
        __prefWindow : null,
        __sideBar : null,
        __sideBarScroller : null,
        __mouseX : null,
        __mouseY : null,
        __widgets : null,
        __toolBarHider : null,
        __sideBarHider : null,

        /**
        *****************************************************************************
        * This method contains the initial application code and gets called 
        * during startup of the application
        * 
        * @lint ignoreDeprecated(alert)
        *****************************************************************************
        */
        main : function()
        {
            auroral_resources.Application.__originalUrl = window.location.toString();  

            // Call super class
            this.base(arguments);

            // monkey patch the default namespace
            this.monkeyPatch();

            this.initializeTimeBus();
            this._parseQueryStringForTimes();
            
            this.__widgets = new Array();
            
            // Enable logging in debug variant
            if (qx.core.Variant.isSet("qx.debug", "on"))
            {
                // support native logging capabilities, e.g. Firebug for Firefox
                qx.log.appender.Native;

                // support additional cross-browser console. Press F7 to toggle visibility
                qx.log.appender.Console;
            }

            qx.io.PartLoader.getInstance().addListener("partLoaded", function(e) {
                this.debug("part loaded: " + e.getData().getName());
            }, this);
      
            // Load current locale part
            var currentLanguage = qx.locale.Manager.getInstance().getLanguage();
            var knownParts = qx.Part.getInstance().getParts();

            // if the locale is available as part
            if (knownParts[currentLanguage]) {
	
                // load this part
                qx.io.PartLoader.require([currentLanguage], function() {

                    // forcing identical locale
                    qx.locale.Manager.getInstance().setLocale(currentLanguage);

                    // build the GUI after the initial locals has been loaded
                    this.buildGui();

                    }, this);

                } else {

                    // if we cant find the default locale, print a warning and load the gui
                    this.warn(
                        "Cannot load locale part for current language " + 
                        currentLanguage + ", falling back to English."
                    );

                    this.buildGui();
            } // end if/else
            
        }, // end main


        /**
        *****************************************************************************
        * Add some extra functions to existing classes, mainly helpers that don't
        * already exist
        *****************************************************************************
        */
        monkeyPatch : function() 
        {
            Date.prototype.getDOY = function() {
                //var onejan = new Date(this.getUTCFullYear(),0,1);
                var onejan = new Date(this.getFullYear(),0,1);
                return Math.ceil((this - onejan) / 86400000);
            }            
        }, // end monkey patch


        /**
        *****************************************************************************
        * Ensure the time messaging bus is in a good inital state
        *****************************************************************************
        */
        initializeTimeBus : function()
        {
            // initialize the time bus
            // var now = this.getNowUTC();
            this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
            var now = this.__timeBus.getCurrentTime();
            var begin = now;
            var nDays = 2;
            begin -= (((86400) * nDays) * 1000); // nDays of millis
            var end = now;
            var cur = end - (((86400) * nDays/2) * 1000); //half nDays of millis
            // round to nearest 5 minutes
            cur = Math.ceil(cur/(5000*60))*(5000*60);
            cur = cur - 1000000;

            // initialize the time bus
            this.__timeBus.setStartDate(begin);
            this.__timeBus.setNow(cur);
            this.__timeBus.setStopDate(end);
        }, // end initialize time bus


        /**
        *****************************************************************************
        * Main routine which builds the GUI.
        *****************************************************************************
        */
        buildGui : function() 
        {
            // Create main layout
            var dockLayout = new qx.ui.layout.Dock();
            dockLayout.setSeparatorY("separator-vertical");
            var dockLayoutComposite = new qx.ui.container.Composite(dockLayout);
            this.getRoot().add(dockLayoutComposite, {edge:0});

            // Create header
            this.__header = new auroral_resources.view.Header();
            dockLayoutComposite.add(this.__header, {edge: "north"});

            // Create footer
            this.__footer = new auroral_resources.view.Footer();
            this.__footer.setMargin(0);
            this.__footer.setPadding(2);
            this.__footer.setPaddingLeft(5);
            this.__footer.setPaddingRight(5);
            this.__footer.setHeight(20);
            this.__footer.setMinHeight(20);
            this.__footer.setMaxHeight(20);
            dockLayoutComposite.add(this.__footer, {edge: "south"});

            // create the toggle for the toolbar
            this.__toolBarHider = new qx.ui.form.Button("", "resource/auroral_resources/icons/up_arrow_orange.png");
            this.__toolBarHider.setFocusable("false");
            this.__toolBarHider.setDecorator(null);
            this.__toolBarHider.setMargin(0);
            this.__toolBarHider.setPadding(0);
            this.__toolBarHider.setHeight(12);
            this.__toolBarHider.setMinHeight(12);
            this.__toolBarHider.setMaxHeight(12);
            this.__toolBarHider.setToolTipText(this.tr("Hide/Show the menu bar"));
            dockLayoutComposite.add(this.__toolBarHider, {edge: "north"});

            this.__toolBarHider.addListener("execute", function(e) {
                if(this.__toolBarView.isExcluded()) {
                    this.__toolBarView.show();
                    this.__toolBarHider.setIcon("resource/auroral_resources/icons/up_arrow_orange.png");
                } else {
                    this.__toolBarView.exclude();
                    this.__toolBarHider.setIcon("resource/auroral_resources/icons/down_arrow_orange.png");
                }
            }, this);

            // Add the toolbar
            this.__toolBarView = new auroral_resources.view.ToolBar(this);
            dockLayoutComposite.add(this.__toolBarView, {edge: "north"});

            // Create horizontal splitpane
            this.__horizontalSplitPane = new qx.ui.splitpane.Pane();
            dockLayoutComposite.add(this.__horizontalSplitPane);

            this.__sideBarScroller = new qx.ui.container.Scroll();
            var box = new qx.ui.layout.Basic();

            var container = new qx.ui.container.Composite(box).set({
                allowStretchY : false,
                allowStretchX : false
            });

            // define the workspace container
            auroral_resources.Application.__mainWindow = new qx.ui.window.Desktop(new qx.ui.window.Manager());
            auroral_resources.Application.__mainWindow.set({
                decorator: "main", 
                backgroundColor: "silver",
                width: 700,
                droppable: true,
                enabled: true
            });
            // behavior is too annoying...
            // toolTipText: "Drag components from the 'Available Resources' area at left, to anywhere inside this gray box's boundaries (even on top of other widgets)",

            auroral_resources.Application.__mainWindow.addListener("drop", this._widgetDropListener, this);

            // create and add the date/time chooser
            //var utc = this.getNowUTC();
            var time = this.__timeBus.getCurrentTime();
            var chooser = new timechooser.TimeChooser(Math.floor(time/1000));
            chooser.setLayoutFormat("below/vertical");
            container.add(chooser);

            this.__sideBarScroller.add(container);
            this.__sideBarScroller.setWidth(300);
            this.__sideBarScroller.setBackgroundColor("silver");

            // add the sidebar
            this.__sideBar = new auroral_resources.view.SideBar(this, auroral_resources.Application.__mainWindow);
            this.__sideBarScroller.add(this.__sideBar);
            
            // LAST: add the introduction window if the user hasn't requested that it be ignored from now on
            // TODO: add a generic cookie get/set class(es) so we aren't doing this low level everywhere...
            /* this window is more annoying than helpful apparently
            var intro = auroral_resources.persistence.KVStore.getInstance().get("intro");            
            
            if (intro == null || intro != "false") {
                var iwin = new auroral_resources.widget.IntroductionWindow("Introduction");
                iwin.open();
                auroral_resources.Application.__mainWindow.add( iwin, { left: 50, top: 50 } );
            }
            */

            // create the toggle for the sidebar
            this.__sideBarHider = new qx.ui.form.Button("", "resource/auroral_resources/icons/left_arrow_orange.png");
            this.__sideBarHider.setFocusable("false");
            this.__sideBarHider.setDecorator(null);
            this.__sideBarHider.setMargin(0);
            this.__sideBarHider.setPadding(0);
            this.__sideBarHider.setWidth(12);
            this.__sideBarHider.setMinWidth(12);
            this.__sideBarHider.setMaxWidth(12);
            this.__sideBarHider.setToolTipText(this.tr("Hide/Show the time settings and tools"));
            dockLayoutComposite.add(this.__sideBarHider, {edge: "west"});

            this.__sideBarHider.addListener("execute", function(e) {
                if(this.__sideBarScroller.isExcluded()) {
                    this.__sideBarScroller.show();
                    this.__sideBarHider.setIcon("resource/auroral_resources/icons/left_arrow_orange.png");
                } else {
                    this.__sideBarScroller.exclude();
                    this.__sideBarHider.setIcon("resource/auroral_resources/icons/right_arrow_orange.png");
                }
            }, this);

            // add side bar to the split pane
            this.__horizontalSplitPane.add(this.__sideBarScroller, 0);

            // main area
            var scroller2 = new qx.ui.container.Scroll();
            scroller2.add(auroral_resources.Application.__mainWindow);
            this.__horizontalSplitPane.add(scroller2, 1);

            // add any query added widgets to the display
            this._parseQueryStringForWidgets();
            
        }, // end buildGui

        //
        //
        //
        goFullScreen : function () {
            this.__sideBarHider.execute();
            this.__toolBarHider.execute();
        },
        
        //
        //
        //
        showUrl : function () {
            this.shareUrl("shorten-no");
        },

        //
        // empty the workspace, nuke all widgets
        //
        emptyWorkspace : function() {
            auroral_resources.Application.__mainWindow.removeAll();
        },

        //
        // revert workspace to its state when the session began
        //
        revertWorkspace : function() {
            window.location = auroral_resources.Application.__originalUrl;
        },

        //
        // toggle the tool area off/on
        //
        toggleTools : function() {
            if(this.__sideBarScroller.isExcluded()) {
                this.__sideBarScroller.show();
            } else {
                this.__sideBarScroller.exclude();
            }
        },

        //
        // parse the workspace for widgets and build a URL that can be copied+pasted
        // and shared via email etc.
        //
        // TODO: add server side serialization of the workspace so that sharing
        // doesn't involve such a long URL... as it stands now, it's parsed
        // and handled entirely from the client.
        //
        shareUrl : function(shorten) {
            
            var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
            url = url + '?time.startDate=' + this.__timeBus.getStartDate();
            url = url + '&time.now=' + this.__timeBus.getNow();
            url = url + '&time.stopDate=' + this.__timeBus.getStopDate();
            
            /* not needed, the probe below gets them all and ensures that any changed x,y are captured too
            // add any widgets specified in the URL until can probe for them
            var i = 0;
            for (i=0;i<this.__widgets.length;i++) {
                url = url + "&w" + i + '=' + this.__widgets[i];
            }
            */
            
            // add widgets by probing the workspace for details
            var windows = auroral_resources.Application.__mainWindow.getWindows();
            
            if (windows == null || windows.length == 0) {
                dialog.Dialog.error("You don't have any widgets on your workspace, there's nothing to share!");
                return;
            } else {
                var i = 0;
                for (i=0; i<windows.length; i++) {
                    var win = windows[i];
                    var b = win.getBounds();
                    var x = b["left"];
                    var y = b["top"];
                    var w = b["width"];
                    var h = b["height"];
                    var className = win.constructor.classname;
                    //className = className.substring(className.lastIndexOf('.')+1,className.length);
                    
                    if (className.toLowerCase() != "introductionwindow") {
                        url = url + "&w" + i + '=' + x + ',' + y + ',' + className + ',' + w + ',' + h + ',' + win.getStatus();
                    }
                }
            }
            
            if(typeof shorten !== undefined && shorten !== null && shorten === "shorten-no") {

                url = encodeURIComponent(url);
                
                var pageData = [{
                    "message" : "The encoded URL below represents your current workspace, pre-selected for copy+paste convenience",
                    "formData" : {

                        'share_url'   : {
                            'type'    : "TextArea",
                            'label'   : "URL",
                            'lines'   : 14,
                            'value'   : url
                        }
                    }
                }];
                
                var wizard = new dialog.BareWizard({
                    width: 600,
                    height: 300,
                    maxWidth: 600,
                    pageData : pageData,
                    allowCancel: false,
                    allowBack: false,
                    allowNext: false,
                    callback : function(map) {},
                    context : this
                });

                wizard.start('share_url');

            } else {

                var bitly = new auroral_resources.io.shortener.Bitly();
                bitly.shortenAndEmail(url);
                return;
                    
            }
        }, // end shareUrl

        //
        // does the request include modifications to time ?
        //
        _parseQueryStringForTimes : function() {
            // check for time mods
            var startDate = getQueryVariable("time.startDate");
            if (startDate != null) { this.__timeBus.setStartDate(parseInt(startDate)); }
            
            var now = getQueryVariable("time.now");
            if (now != null) { this.__timeBus.setNow(parseInt(now)); }
            
            var stopDate = getQueryVariable("time.stopDate");
            if (stopDate != null) { this.__timeBus.setStopDate(parseInt(stopDate)); }
            
            function getQueryVariable(variable) { 
                var query = window.location.search.substring(1); 
                var vars = query.split("&"); 
                for (var i=0;i<vars.length;i++) { 
                    var pair = vars[i].split("="); 
                    if (pair[0] == variable) { 
                        return pair[1]; 
                    } 
                }
            }
        },

        //
        // does the request include any widgets 
        //
        _parseQueryStringForWidgets : function() {
            
            //
            // either the user has requested nothing...
            //
            if (window.location.toString().indexOf("?") == -1) {
                
                //
                // IE bombs on this window.location via AJAX call...
                // gotta build the UI manually afterall when doing
                // the initial page redirect :(
                //
                /*
                // add introductory/welcome text
                var req = new qx.io.remote.Request(
                    "resource/auroral_resources/static/html/startpage.html",
                    "GET",
                    "text/html"
                );

                // ensure this content is grabbed fresh
                req.setProhibitCaching(false);
                req.addListener("completed", function(result) {
                    window.location = result.getContent();
                });
                req.send();
                */
                
                var mW = auroral_resources.Application.__mainWindow;
                var wD = this.__widgets;
                var pieces = [];
                                
                pieces = [0,487,"auroral_resources.widget.TimeSeriesWindow",445,209,"vsw_x.ACE_RT","ACE%20Flow%20%7BKm/s%7D","78A5B86C-71AF-3D4D-A054-EE8E765CF8D6"];
                addWidget(stringToClass, mW, pieces, wD);

                pieces = [0,684,"auroral_resources.widget.TimeSeriesWindow",445,197,"imf_bz.ACE_RT","ACE%20Bz%20%7BnT%7D","78A5B86C-71AF-3D4D-A054-EE8E765CF8D6"];
                addWidget(stringToClass, mW, pieces, wD);

                pieces = [0,0,"auroral_resources.widget.TimeSeriesIndexWindow",445,161,"index_kp.est","Kp","geomInd"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [0,161,"auroral_resources.widget.TimeSeriesWindow",445,161,"iono_foF2.BC840","Boulder%20(BC840)%20foF2%20%7BMHz%7D","IonoStationsBC840"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [0,321,"auroral_resources.widget.TimeSeriesWindow",445,161,"iono_foF2.TR169","Tromso%20(TR169)%20foF2%20%7BMHz%7D","IonoStationsTR169"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [446,0,"auroral_resources.widget.ExternalImageWindow",456,506,"http://www.swpc.noaa.gov/pmap/gif/pmapN.gif","Northern%20Statistical%20Auroral%20Oval"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [447,480,"auroral_resources.widget.ExternalImageWindow",454,504,"http://www.ngdc.noaa.gov/stp/ovation_prime/data/north_nowcast_aacgm.png","Ovation%20Prime%20Real-Time%20Nowcast"];
                addWidget(stringToClass, mW, pieces, wD);

                return;
                
            //
            // or they've requested a specific layout/workspace
            //
            } else {
                
                //
                // handle special initial pages
                // 
                var mW = auroral_resources.Application.__mainWindow;
                var wD = this.__widgets;
                var pieces = [];

                // check for special sites, like chapman 2011
                // TODO: make this more dynamic, so it doesn't require code changes here.
                // perhaps a separate file (rather than a DB or something similarly heavy)
                var special = getQueryVariable("special");
                if (special !== null) {
                    
                    if (special === "chapman2011") {
                        pieces = [0,0,"auroral_resources.widget.LocalImageGalleryWindow",625,450,"Chapman%20Conference%202011%20User%20Gallery"];
                        addWidget(stringToClass, mW, pieces, wD);
                        return;
                    } else if (special === "galaxy15") {
                        window.location = "http://1.usa.gov/galaxy15_2010";
                        return;
                    }
                }                

                // check for hides
                var hideMenuBar = getQueryVariable("hideMenuBar");
                if (hideMenuBar != null) {
                    if(hideMenuBar === "true") {
                        this.__toolBarView.exclude();
                        this.__toolBarHider.setIcon("resource/auroral_resources/icons/down_arrow_orange.png");
                    }
                }
                var hideSideBar = getQueryVariable("hideSideBar");
                if (hideSideBar != null) {
                    if(hideSideBar === "true") {
                        this.__sideBarScroller.exclude();
                        this.__sideBarHider.setIcon("resource/auroral_resources/icons/right_arrow_orange.png");
                    }
                }
                var hideCruft = getQueryVariable("hideCruft");
                if (hideCruft != null) {
                    if(hideCruft === "true") {
                        this.__header.exclude();
                        this.__footer.exclude();
                    }
                }
                var hideAll = getQueryVariable("hideAll");
                if (hideAll != null) {
                    if(hideAll === "true") {
                        this.__header.exclude();
                        this.__footer.exclude();
                        this.__sideBarScroller.exclude();
                        this.__toolBarView.exclude();
                        this.__toolBarHider.setIcon("resource/auroral_resources/icons/down_arrow_orange.png");
                        this.__sideBarHider.setIcon("resource/auroral_resources/icons/right_arrow_orange.png");
                    }
                }
            
                // parse get query for initial state modifications
                // check for widget additions
                var i = 0;
                // artificially limits to 16 widgets by URL at the moment
                for (i=0;i<16;i++) {
                    var w = getQueryVariable("w"+i);
                    if (w != null) {

                        // parse
                        var pieces = qx.util.StringSplit.split(w,',');

                        // instantiate
                        var x = parseInt(pieces[0]);
                        var y = parseInt(pieces[1]);
                        var className = pieces[2];
                        //var instance = stringToClass("auroral_resources.widget."+className);
                        var instance = stringToClass(className);
                        var win = instance.fromArray(pieces);
                        win.open();

                        // add
                        auroral_resources.Application.__mainWindow.add(win, { left: x, top: y });

                        var wid = x + ',' + y + ',' + className;
                        var j = 3;
                        for(j=3;j<pieces.length;j++) {
                            wid = wid + ',' + pieces[j];
                        }

                        this.__widgets.push(wid);
                    } else {
                        // do nothing
                    }
                }
            }
            
            function getQueryVariable(variable) { 
                var query = window.location.search.substring(1); 
                var vars = query.split("&"); 
                for (var i=0;i<vars.length;i++) { 
                    var pair = vars[i].split("="); 
                    if (pair[0] == variable) { 
                        return pair[1]; 
                    } 
                }
            }
            
            function stringToClass(str) {
                var arr = str.split(".");
                var fn = (window || this);
                for (var i = 0, len = arr.length; i < len; i++) {
                    fn = fn[arr[i]];
                }
                if (typeof fn !== "function") {
                    throw new Error("function not found");
                }
                return  fn;
            }
            
            function addWidget(stringToClass, mainWindow, pieces, widgets) {
                var instance = stringToClass(pieces[2]);
                var win = instance.fromArray(pieces);
                win.open();
                mainWindow.add(win, { left: pieces[0], top: pieces[1] });
                var wid = x + ',' + y + ',' + pieces[2];
                var j = 3;
                for(j=3;j<pieces.length;j++) {
                    wid = wid + ',' + pieces[j];
                }
                widgets.push(wid);
            }
            
        },

        //
        // add the widget to the workspace at the cursor
        //
        _widgetDropListener : function(e) {

            var w = e.getData("widget");
            if (typeof w !== undefined && w !== null && w === "launcher") { return; }
            var xBuffer = 285;
            var yBuffer = 97;
            var x = e.getDocumentLeft() - xBuffer; //sub off extra to center it more
            var y = e.getDocumentTop() - yBuffer;  //ditto
            auroral_resources.Application.__mainWindow.add( w, { left:x, top:y });
            w.open();
            //auroral_resources.Application.__mainWindow.setBlockToolTip(true);

        } // end widgetDropListener
    } // end members
});
