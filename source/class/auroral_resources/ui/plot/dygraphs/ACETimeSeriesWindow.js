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


qx.Class.define("auroral_resources.ui.plot.dygraphs.ACETimeSeriesWindow",
{

    extend : qx.ui.window.Window,

    /*
    *****************************************************************************
        STATICS
    *****************************************************************************
    */
    statics : 
    {
        getCsvUrl : function(parameter, start, stop) {
            return "http://"+auroral_resources.Application.getHost()+"/spidr/servlet/GetData2?compress=true&format=csv_noheader&location=ALL&datefrom="+start+"&dateto="+stop+"&dataset="+parameter;
        },

        fromArray : function(argArray) { 
            return new auroral_resources.ui.plot.dygraphs.ACETimeSeriesWindow(
                parseInt(decodeURI(argArray[3])), 
                parseInt(decodeURI(argArray[4])), 
                decodeURI(argArray[5]), 
                decodeURI(argArray[6]),
                decodeURI(argArray[7])
            );
        }
    },


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(width, height, parameter, title, mddocname)
    {
        this.base(arguments, title);

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__parameter = parameter;
        this.__mddocname = mddocname;
        this.__title = title;

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            status: parameter + ',' + title + ',' + mddocname,
            layout: new qx.ui.layout.Grow()
        });
        
        this.setCaption(' (ACE Science Center) ' + this.getCaption());

        this.setWidth(width);
        this.setHeight(height);

        this.__error = new qx.ui.basic.Label().set({
            width: width,
            height: height,
            value: "<center><h1 style='color:red'>Cannot obtain data!</h1></center>",
            rich : true
        });
        
        this.__loading = new qx.ui.basic.Label().set({
            width: width,
            height: height,
            value: "<center><h1 style='color:red'>Loading...</h1></center>",
            rich : true
        });

        this.__nodata = new qx.ui.basic.Label().set({
            width: width,
            height: height,
            value: "<center><h1 style='color:red'>No data for your time range. Right click and 'View Metadata'</h1></center>",
            rich : true
        });

        this._showLoading();

        var start = this.__timeBus.getStartDateForSPIDRWS2();
        var stop = this.__timeBus.getStopDateForSPIDRWS2();
        var that = this;
        this.__startDate = start;
        this.__stopDate = stop;

        try {

            // make the data ajax call ourselves to avoid any
            // timing issues between all the pieces...
            var h = new qx.io.request.Xhr();
            h.setAsync(true);
            h.addListener("success", function() {

                that.__csvData = h.getResponseText();

                try {
                    that.__plot = that._createPlot(parameter, start, stop, that.__title);
                    that.add(that.__plot);
                } catch (e) {
                    that._showNoData();
                }
                
                /* w/o error handling
                that.__csvData = h.getResponseText();
                that.__plot = that._createPlot(parameter, start, stop, title);
                that.add(that.__plot);
                */
            });
            h.addListener("error", function() {
                this.error("Unable to create initial plot!");
                this.remove(this.__loading);
                this.add(this.__error);
            });
            h.setMethod("GET");
            h.setUrl(auroral_resources.ui.plot.dygraphs.ACETimeSeriesWindow.getCsvUrl(parameter,start,stop));
            h.send();

        } catch (e) {
            this.error("Unable to create initial plot! '"+e+"'");
            this.remove(this.__loading);
            this.add(this.__nodata);
        }

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
        __error : null,
        __title : null,
        __loading : null,
        __nodata : null,
        __parameter : null,
        __mddocname : null,
        __timeBus : null,
        __startDate : null,
        __stopDate : null,
        __plot : null,
        __now : null,
        __csvUrl : null,
        __csvData : null,


        //
        //
        //
        _createPlot : function(parameter, start, stop, title) {

            var that = this;

            // not enough data to do anything meaningful
            if ( that.__csvData.length <= 256 ) { 
                throw "no data for "+parameter+" between "+start+" and "+stop;
            }
            
            var plot = new qxdygraphs.Plot(
                that.__csvData,
                {
                    labelsKMB: true,
                    drawPoints: true,
                    errorBars: false,
                    lables: [that.__title],
                    highlightCircleSize: 3,
                    strokeWidth: 1,
                    underlayCallback: that._vline,
                    zoomCallback: that._zoom
                },
                that
            );

            return plot;
        },


        //
        //
        //
        _showLoading : function() {
            if ( this.indexOf(this.__loading) === -1 ) { 
                this._hideNoData();
                this.add(this.__loading);
            }
        },


        //
        //
        //
        _hideLoading : function() {
            if ( this.indexOf(this.__loading) !== -1 ) { 
                this.remove(this.__loading);
            }
        },


        //
        //
        //
        _showNoData : function() {
            if ( this.indexOf(this.__nodata) === -1 ) { 
                this._hideLoading();
                this.add(this.__nodata);
            }
        },


        //
        //
        //
        _hideNoData : function() {
            if ( this.indexOf(this.__nodata) !== -1 ) { 
                this.remove(this.__nodata);
            }
        },
        

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
                var that = this;
                
                var png = new qx.ui.form.Button("Download Image (PNG)");
                png.addListener("click", function(evt) {
                    // TBD add axix content to PNG via the canvas... add some code to dygraphs for this. clone the canvas, add the text, return the object
                    var canvas = that.__plot.getPlotObject().getStaticCanvas();
                    Canvas2Image.saveAsPNG(canvas);
                    popup.hide();
                });

                var data = new qx.ui.form.Button("Download Data");
                data.addListener("click", function(evt) {
                    var dlurl = "http://www.srl.caltech.edu/ACE/ASC/level2/new/";
                    window.open(dlurl,"");
                    popup.hide();
                });
                
                var mdata = new qx.ui.form.Button("View Metadata");
                mdata.addListener("click", function(evt) {
                    //var mdurl = "http://www.srl.caltech.edu/ACE/ASC/level2/new/metadata/";
                    var mdurl = "http://www.srl.caltech.edu/ACE/ASC/level2/mag_l2desc.html";
                    window.open(mdurl,"");
                    popup.hide();

                });
                
                popup.add(new qx.ui.basic.Label("Additional Options"));
                //popup.add(png);
                popup.add(data);
                popup.add(mdata);
                popup.placeToMouse(evt);
                popup.show();            
            }
        },
        
        
        //
        //
        //
        _zoom : function(minDate, maxDate, minValue, maxValue) {
            // not doing anything here yet
        },
        
        
        //
        // vertical line function
        //
        _vline : function(canvas, area, g) {
            
            var timeBus = auroral_resources.messaging.TimeBus.getInstance();
            var now = timeBus.getNow();
            var xp = g.toDomCoords(parseInt(now),0); //only care about X
            xp = xp[0];
            
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

            // cleanup, if available
            if (typeof this.__plot !== undefined && this.__plot !== null) {
                var g = this.__plot.getPlotObject();
                if (typeof g !== undefined && g !== null) {
                    g.destroy();
                    this.remove(this.__plot);
                    qx.util.DisposeUtil.disposeObjects(this, "__plot", false);
                }
            }

            this._showLoading();
            this.__plot = null;
            this.__csvData = null;
            
            var start = this.__timeBus.convertToSPIDRWS2(e.getData());
            this.__start = start;
            var stop = this.__timeBus.getStopDateForSPIDRWS2();
            var now = this.__timeBus.getNow();
            var parameter = this.__parameter;
            var that = this;

            try {

                // make the data ajax call ourselves to avoid any
                // timing issues between all the pieces...
                var h = new qx.io.request.Xhr();
                h.setAsync(true);
                h.addListener("success", function() {

                    that.__csvData = h.getResponseText();
                    try {
                        that.__plot = that._createPlot(parameter, start, stop, that.__title);
                        that.add(that.__plot);
                    } catch (e) {
                        that._showNoData();
                    }

                    /* w/o error handling
                    that.__csvData = h.getResponseText();
                    that.__plot = that._createPlot(parameter, start, stop, that.__title);
                    that.add(that.__plot);
                    */
                });
                h.setMethod("GET");
                h.setUrl(auroral_resources.ui.plot.dygraphs.ACETimeSeriesWindow.getCsvUrl(parameter,start,stop));
                h.send();

            } catch(e) {
                this.error("Unable to update start time for plot!");
                this._showNoData();
            }
        },


        //
        // callback for the 'stopDate' message channel
        //
        _stopDateChangeBusCallback : function(e) {

            // cleanup, if available
            if (typeof this.__plot !== undefined && this.__plot !== null) {
                var g = this.__plot.getPlotObject();
                if (typeof g !== undefined && g !== null) {
                    g.destroy();
                    this.remove(this.__plot);
                    qx.util.DisposeUtil.disposeObjects(this, "__plot", false);
                }
            }

            this._showLoading();
            this.__plot = null;
            this.__csvData = null;
            
            var start = this.__timeBus.getStartDateForSPIDRWS2();
            var stop = this.__timeBus.convertToSPIDRWS2(e.getData());
            this.__stop = stop;
            var now = this.__timeBus.getNow();
            var parameter = this.__parameter;
            var that = this;

            try {

                // make the data ajax call ourselves to avoid any
                // timing issues between all the pieces...
                var h = new qx.io.request.Xhr();
                h.setAsync(true);
                h.addListener("success", function() {

                    that.__csvData = h.getResponseText();
                    try {
                        that.__plot = that._createPlot(parameter, start, stop, that.__title);
                        that.add(that.__plot);
                    } catch (e) {
                        that._showNoData();
                    }

                    /* w/o error handling 
                    that.__csvData = h.getResponseText();
                    that.__plot = that._createPlot(parameter, start, stop, that.__title);
                    that.add(that.__plot);
                    */
                });
                h.setMethod("GET");
                h.setUrl(auroral_resources.ui.plot.dygraphs.ACETimeSeriesWindow.getCsvUrl(parameter,start,stop));
                h.send();

            } catch(e) {
                this.error("Unable to update stop time for plot!");
                this._showNoData();
            }
        },	


        //
        //
        //
        _nowChangeBusCallback : function(e) {

            // sanity checking
            if (typeof this.__plot === undefined || this.__plot === null) { return; }
            var that = this;
            var g = that.__plot.getPlotObject();
            if (typeof g === undefined || g === null) { return; }

            var start = this.__timeBus.getStartDateForSPIDRWS2();
            var stop = this.__timeBus.getStopDateForSPIDRWS2();
            var now = e.getData();
            this.__now = now;
            var parameter = this.__parameter;

            var h = new qx.io.request.Xhr();
            h.setAsync(true);
            h.addListener("success", function() {
                that.__csvData = h.responseText;
                if (typeof g === undefined || g === null) { return; }
                g.updateOptions({ 'file' : this.__csvData });
            });
            h.setMethod("GET");
            h.setUrl(auroral_resources.ui.plot.dygraphs.ACETimeSeriesWindow.getCsvUrl(parameter,start,stop));
            h.send();

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
        // cleanup, if available
        if (typeof this.__plot !== undefined && this.__plot !== null) {
            var g = this.__plot.getPlotObject();
            if (typeof g !== undefined && g !== null) {
                g.destroy();
            }
        }
        
        this.__error = null;
        this.__title = null;
        this.__loading = null;
        this.__nodata = null;
        this.__parameter = null;
        this.__mddocname = null;
        this.__timeBus = null;
        this.__startDate = null;
        this.__stopDate = null;
        this.__plot = null;
        this.__now = null;
        this.__csvUrl = null;
        this.__csvData = null;        
    }


});
