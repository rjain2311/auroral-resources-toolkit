/*************************************************************************

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

*************************************************************************/


qx.Class.define("auroral_resources.ui.spectrogram.Window",
{

    extend : qx.ui.window.Window,

    /*
    *****************************************************************************
        STATICS
    *****************************************************************************
    */
    statics : 
    {
        fromArray : function(argArray) { 
            return new auroral_resources.ui.spectrogram.Window(
                parseInt(decodeURI(argArray[3])), 
                parseInt(decodeURI(argArray[4])), 
                decodeURI(argArray[5]), 
                decodeURI(argArray[6])
            );
        }
    },


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(width, height, title, mddocname)
    {
        this.base(arguments, title);

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__title = title;
        this.__mddocname = mddocname;

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            status: title + ',' + mddocname,
            layout: new qx.ui.layout.Grow()
        });
        
        this.setWidth(width);
        this.setHeight(height);

        var movieUri = qx.util.ResourceManager.getInstance().toUri("auroral_resources/heatmap.swf");
        this.__flash = new qx.ui.embed.Flash(movieUri);
        this.__flash.set({
            bgcolor: "#CCCCCC",
            scale: "showall",
            play: "true",
            loop: "true",
            quality: "high",
            devicefont: "false",
            allowScriptAccess: "sameDomain",
            wmode: "gpu"
        });
        this.add(this.__flash);

        /*
        this.__flash.setRequestStr('http://localhost:8080/proxy/TestProxy?');
        this.__flash.setTimeRangeFromJS(dateFrom, dateTo);
        this.__flash.setTimeCenterFromJS(dateCenter, dateInterval);
        */

        this.addListener("close", this._destroy, this); //function(evt) { this.destroy() });
        this.addListener("mouseup", this._rightClick, this);

        this.__timeBus.getBus().subscribe("time.startDate", this._startDateChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.now", this._nowChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.stopDate", this._stopDateChangeBusCallback, this);

        return this;
    },


    /*
    *****************************************************************************
        CLASS VARIABLES AND METHODS
    *****************************************************************************
    */
    members :
    {
        __flash : null,
        __title : null,
        __mddocname : null,
        __timeBus : null,
        __startDate : null,
        __stopDate : null,
        

        //
        //
        //
        _rightClick : function(evt) { 
            if(evt.isRightPressed()) {
                
                var popup = new qx.ui.popup.Popup(new qx.ui.layout.VBox()).set({
                     autoHide: true
                });
                
                var param = this.__parameter;
                var start = this.__startDate;
                var stop = this.__stopDate;
                var mddoc = this.__mddocname;
                
                var data = new qx.ui.form.Button("Download Data");
                data.addListener("click", function(evt) {
                    var dlurl = "http://"+auroral_resources.Application.getHost()+"/spidr/servlet/GetData?param="+param+"&format=zip&dateFrom="+start+"&dateTo="+stop;
                    window.open(dlurl,"");
                    popup.hide();
                });
                
                var mdata = new qx.ui.form.Button("View Metadata");
                mdata.addListener("click", function(evt) {
                    var mdurl = "http://"+auroral_resources.Application.getHost()+"/spidrvo/viewdata.do?docname="+mddoc;
                    window.open(mdurl,"");
                    popup.hide();
                });
                
                popup.add(new qx.ui.basic.Label("Additional Options"));
                popup.add(data);
                popup.add(mdata);
                popup.placeToMouse(evt);
                popup.show();            
            }
        },


        //
        //
        //
        _destroy : function () 
        {
            auroral_resources.Application.__N_WIDGETS_ON_WORKSPACE -= 1;        
            this.destroy();
        }
    },


    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct : function()
    {
        this.__flash = null;
        this.__title = null;
        this.__mddocname = null;
        this.__timeBus = null;
        this.__startDate = null;
        this.__stopDate = null;        
    }


});
