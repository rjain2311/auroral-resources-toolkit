/*************************************************************************

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

*************************************************************************/


qx.Class.define("auroral_resources.widget.TimeSeriesWindow",
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
            return new auroral_resources.widget.TimeSeriesWindow(
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
    construct : function(width, height, parameter, title)
    {
        this.base(arguments, title);

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__parameter = parameter;
        this.__title = title;

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            status: parameter + ',' + title,
            layout: new qx.ui.layout.Grow()
        });
        
        this.setWidth(width);
        this.setHeight(height);

        var xOffset = 0; //((winWidth/2)/2) - 10;
        var buttonWidth = 75;
        var buttonHeight = 10;

        var dataButton = new qx.ui.form.Button("Get Data");
        dataButton.setHeight(buttonHeight);
        dataButton.setWidth(buttonWidth);

        var metaDataButton = new qx.ui.form.Button("Get Meta");
        metaDataButton.setHeight(buttonHeight);
        metaDataButton.setWidth(buttonWidth);

        //this.add(dataButton, {left: xOffset, top: 0});
        //this.add(metaDataButton, {left: buttonWidth + 5, top: 0});

        var start = this.__timeBus.getStartDateForSPIDRWS();
        var stop = this.__timeBus.getStopDateForSPIDRWS();

        this.__startDate = start;
        this.__stopDate = stop;

        this.__plot = new qxdygraphs.Plot(
            //"http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop,
            'resource/auroral_resources/ionofof2.txt',
            {
                labelsKMB: true,
                drawPoints: true,
                errorBars: false,
                lables: [title],
                highlightCircleSize: 7,
                strokeWidth: 2,
                underlayCallback: this._vline
            }
        );

        this.add(this.__plot);
        
        this.addListener("close", function(evt) { this.destroy() });
        
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
        __title : null,
        __parameter : null,
        __timeBus : null,
        __startDate : null,
        __stopDate : null,
        __plot : null,
        __now : null,

        //
        // vertical line function
        //
        _vline : function(canvas, area, g) {
            // alert(area.toSource()); // MUST BE RUN IN FIREFOX! => debug output
            // note the way this method is registered as a callback prevents access
            // to class variables, must access them anew (e.g. timeBus)
            var timeBus = auroral_resources.messaging.TimeBus.getInstance();
            var start = timeBus.getStartDate();
            var stop = timeBus.getStopDate();
            var now = timeBus.getNow();
            
            var A = start;
            var B = stop;
            var C = area.x+1;
            var D = area.w+area.x;
            // normalize x-prime to determine how the time maps to pixel space
            var xp = ((D-C)*(now-A)) / (B-A) + C;
            
            canvas.beginPath();
            canvas.strokeStyle = "rgba(255, 0, 0, 1.0)";
            canvas.moveTo(xp, 0);
            canvas.lineTo(xp, area.h);
            canvas.closePath();
            canvas.stroke();
        },

        //
        // callback for the 'startDate' message channel
        //
        _startDateChangeBusCallback : function(e) {
            this.remove(this.__plot);

            qx.util.DisposeUtil.disposeObjects(this, "__plot", false);
            this.__plot = null;
            
            var start = this.__timeBus.convertToSPIDRWS(e.getData());
            this.__start = start;
            var stop = this.__timeBus.getStopDateForSPIDRWS();
            var now = this.__timeBus.getNow();
            var parameter = this.__parameter;
            
            var req = "http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop;
            //alert(req);

            this.__plot = new qxdygraphs.Plot(
                //"http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop,
                'resource/auroral_resources/ionofof2.txt',
                {
                    labelsKMB: true,
                    errorBars: false,
                    drawPoints: true,
                    lables: [this.__title],
                    highlightCircleSize: 7,
                    strokeWidth: 2,
                    underlayCallback: this._vline
                }
            );

            this.add(this.__plot);      	    
        },

        //
        // callback for the 'stopDate' message channel
        //
        _stopDateChangeBusCallback : function(e) {
            this.remove(this.__plot);

            qx.util.DisposeUtil.disposeObjects(this, "__plot", false);
            this.__plot = null;
            
            var start = this.__timeBus.getStartDateForSPIDRWS();
            var stop = this.__timeBus.convertToSPIDRWS(e.getData());
            this.__stop = stop;
            var now = this.__timeBus.getNow();
            var parameter = this.__parameter;

            var req = "http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop;
            //alert(req);
            
            this.__plot = new qxdygraphs.Plot(
                //"http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop,
                'resource/auroral_resources/ionofof2.txt',
                {
                    labelsKMB: true,
                    errorBars: false,
                    drawPoints: true,
                    lables: [this.__title],
                    highlightCircleSize: 7,
                    strokeWidth: 2,
                    underlayCallback: this._vline
                }
            );

            this.add(this.__plot);
        },	

        //
        //
        //
        _nowChangeBusCallback : function(e) {
            this.remove(this.__plot);

            qx.util.DisposeUtil.disposeObjects(this, "__plot", false);
            this.__plot = null;
            
            var start = this.__timeBus.getStartDateForSPIDRWS();
            var stop = this.__timeBus.getStopDateForSPIDRWS();
            var now = e.getData();
            this.__now = now;
            var parameter = this.__parameter;

            var req = "http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop;
            //alert(req);

            this.__plot = new qxdygraphs.Plot(
                //"http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+parameter+"&format=csv&header=false&dateFrom="+start+"&dateTo="+stop,            
                'resource/auroral_resources/ionofof2.txt',
                {
                    labelsKMB: true,
                    errorBars: false,
                    drawPoints: true,
                    lables: [this.__title],
                    highlightCircleSize: 7,
                    strokeWidth: 2,
                    underlayCallback: this._vline
                }
            );

            this.add(this.__plot);          
        }
    },


    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct : function()
    {
        // TODO: add destructor code...
    }


});
