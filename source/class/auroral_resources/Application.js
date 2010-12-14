/* ************************************************************************

COPYRIGHTS:

Copyright (c) 2010, National Geophysical Data Center, NOAA
Copyright (c) 2010, Geophysical Center, Russian Academy of Sciences
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

AUTHORS:

Peter Elespuru - peter.elespuru@noaa.gov
Dmitry Medvedev - dmedv@wdcb.ru
Mikhail Zhizhin - jjn@wdcb.ru
Rob Redmon - rob.redmon@noaa.gov

************************************************************************ */

/* ************************************************************************

#asset(auroral_resources/*)
#asset(collapsablepanel/*)
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
        __mainWindow : null,
        __sideBar : null,
        __mouseX : null,
        __mouseY : null,
        __widgets : null,

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
            // Call super class
            this.base(arguments);

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
            
            this.monkeyPatch();
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
            begin -= (((86400) * 7) * 1000); //one week of millis
            var end = now;
            var cur = end - (((86400) * 3.5) * 1000); //half a week of millis
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
            dockLayoutComposite.add(this.__footer, {edge: "south"});

            // Create toolbar (0) or menubar (1)
            var menubar = 0;

            // create toolbar
            if (menubar == 0) {
                this.__toolBarView = new auroral_resources.view.ToolBar(this);
                dockLayoutComposite.add(this.__toolBarView, {edge: "north"});
            }

            // Or create menubar
            if(menubar == 1) {
                this.__menuBarView = new auroral_resources.view.MenuBar(this);
                dockLayoutComposite.add(this.__menuBarView,{edge: "north"});
            }

            // Create horizontal splitpane
            this.__horizontalSplitPane = new qx.ui.splitpane.Pane();
            dockLayoutComposite.add(this.__horizontalSplitPane);

            var scroller = new qx.ui.container.Scroll();
            var box = new qx.ui.layout.Basic();

            var container = new qx.ui.container.Composite(box).set({
                allowStretchY : false,
                allowStretchX : false
            });

            // define the workspace container
            this.__mainWindow = new qx.ui.window.Desktop(new qx.ui.window.Manager());
            this.__mainWindow.set({
                decorator: "main", 
                backgroundColor: "silver",
                width: 700,
                droppable: true,
                enabled: true
            });

            this.__mainWindow.addListener("drop", this._widgetDropListener, this);
            this.__mainWindow.addListener("mousemove", this._mouseMove, this);

            // create and add the date/time chooser
            //var utc = this.getNowUTC();
            var time = this.__timeBus.getCurrentTime();
            var chooser = new timechooser.TimeChooser(Math.floor(time/1000));
            chooser.setLayoutFormat("below/vertical");
            container.add(chooser);

            scroller.add(container);
            scroller.setWidth(280);
            scroller.setBackgroundColor("silver");

            // add the sidebar
            this.__sideBar = new auroral_resources.view.SideBar(this, this.__mainWindow);
            scroller.add(this.__sideBar);

            // add any query added widgets to the display
            this._parseQueryStringForWidgets();
            
            // LAST: add the introduction window if the user hasn't requested that it be ignored from now on
            // TODO: add a generic cookie get/set class(es) so we aren't doing this low level everywhere...
            var intro = auroral_resources.persistence.KVStore.getInstance().get("intro");            
            
            if (intro == null || intro != "false") {
                var iwin = new auroral_resources.widget.IntroductionWindow("Introduction");
                iwin.open();
                this.__mainWindow.add( iwin, { left: 50, top: 50 } );
            }

            // put it all together
            this.__horizontalSplitPane.add(scroller, 0);
            var scroller2 = new qx.ui.container.Scroll();
            scroller2.add(this.__mainWindow);
            this.__horizontalSplitPane.add(scroller2, 1);

        }, // end buildGui
        
        //
        // empty the workspace, nuke all widgets
        //
        emptyWorkspace : function() {
            this.__mainWindow.removeAll();
        },

        //
        // parse the workspace for widgets and build a URL that can be copied+pasted
        // and shared via email etc.
        //
        // TODO: add server side serialization of the workspace so that sharing
        // doesn't involve such a long URL... as it stands now, it's parsed
        // and handled entirely from the client.
        //
        shareUrl : function() {
            
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
            var windows = this.__mainWindow.getWindows();
            
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
                    className = className.substring(className.lastIndexOf('.')+1,className.length);
                    
                    if (className.toLowerCase() != "introductionwindow") {
                        url = url + "&w" + i + '=' + x + ',' + y + ',' + className + ',' + w + ',' + h + ',' + win.getStatus();
                    }
                }
            }
            
            url = encodeURI(url);
            
            var pageData = [{
                "message" : "Copy this URL to share your workspace with others.",
                "formData" : {
                    'url' : {
                        'type'  : "TextArea",
                        'label' : "URL",
                        'lines' : 12,
                        'value' : url
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
            wizard.start();
        }, // end shareUrl

        //
        // does the request include modifications to time ?
        //
        _parseQueryStringForTimes : function() {
            // check for time mods
            var startDate = getQueryVariable("time.startDate");
            if (startDate != null) { this.__timeBus.setStartDate(parseInt(startDate)); }
            
            var now = getQueryVariable("time.now");
            if (now != null) { this.__timeBus.setNow(now); }
            
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
                
                var mW = this.__mainWindow;
                var wD = this.__widgets;
                var pieces = [];
                
                // IE bombs on the volume of data in these ACE data sets
                // don't add them if IE until this is resolved 
                if (!qx.bom.client.Engine.MSHTML && qx.bom.client.Engine.NAME != "mshtml") {
                    pieces = [0,487,"TimeSeriesWindow",445,209,"vsw_x.ACE_RT","ACE%20Flow%20%7BKm/s%7D","78A5B86C-71AF-3D4D-A054-EE8E765CF8D6"];
                    addWidget(stringToClass, mW, pieces, wD);

                    pieces = [0,684,"TimeSeriesWindow",445,197,"imf_bz.ACE_RT","ACE%20Bz%20%7BnT%7D","78A5B86C-71AF-3D4D-A054-EE8E765CF8D6"];
                    addWidget(stringToClass, mW, pieces, wD);
                }
                
                pieces = [0,0,"TimeSeriesIndexWindow",445,161,"index_kp.est","Kp","geomInd"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [0,161,"TimeSeriesWindow",445,161,"iono_foF2.BC840","Boulder%20(BC840)%20foF2%20%7BMHz%7D","IonoStationsBC840"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [0,321,"TimeSeriesWindow",445,161,"iono_foF2.GA762","Gakona%20(GA762)%20foF2%20%7BMHz%7D","IonoStationsGA762"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [446,0,"ExternalImageWindow",456,506,"http://www.swpc.noaa.gov/pmap/gif/pmapN.gif","Northern%20Statistical%20Auroral%20Oval"];
                addWidget(stringToClass, mW, pieces, wD);
                
                pieces = [447,480,"ExternalImageWindow",454,504,"http://www.ngdc.noaa.gov/stp/ovation_prime/data/north_nowcast_aacgm.png","Ovation%20Prime%20Real-Time%20Nowcast"];
                addWidget(stringToClass, mW, pieces, wD);
                            
                return;
                
            //
            // or they've requested a specific layout/workspace
            //
            } else {
            
                // parse get query for initial state modifications
                // check for widget additions
                var i = 0;
                for (i=0;i<42;i++) {
                    var w = getQueryVariable("w"+i);
                    if (w != null) {

                        // parse
                        var pieces = qx.util.StringSplit.split(w,',');

                        // instantiate
                        var x = parseInt(pieces[0]);
                        var y = parseInt(pieces[1]);
                        var className = pieces[2];
                        var instance = stringToClass("auroral_resources.widget."+className);
                        var win = instance.fromArray(pieces);
                        win.open();

                        // add
                        this.__mainWindow.add(win, { left: x, top: y });

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
                var prfx = "auroral_resources.widget.";
                var instance = stringToClass(prfx+pieces[2]);
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
        // keep track of the mouse cursor's location
        // so we can drop widgets right under the cursor
        //
        _mouseMove : function(e) {
            this.__mouseX = e.getDocumentLeft();
            this.__mouseY = e.getDocumentTop();
        }, // end mouseMove

        //
        // add the widget to the workspace at the cursor
        //
        _widgetDropListener : function(e) {
            var w = e.getData("widget");
            w.open();
            var x = this.__mouseX - 285; //sub off extra to center it more
            var y = this.__mouseY - 97;  //ditto
            this.__mainWindow.add( w, { left:x, top:y });
        } // end widgetDropListener
    } // end members
});
