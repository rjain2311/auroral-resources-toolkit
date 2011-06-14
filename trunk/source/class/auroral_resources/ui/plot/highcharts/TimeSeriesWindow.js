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
Peter Elespuru - peter.elespuru@noaa.gov

THIS WIDGET USES HIGHCHARTS, WHICH IS !!! NOT !!! FREE FOR COMMERCIAL USE

Here is the email approval we received to use it for this project from
the owner of the company responsible for Highcharts. If at some point
ART gets funded, we'll buy a license, Highcharts is AWESOME!

> Hi Peter,
> 
> Yes, this is confirmed. As a non-commercial project you can use Highcharts JS under the free license.
>
> Best regards,
> Torstein Hønsi: torstein@highsoft.com
> CTO/owner
> Highslide Software
> 
>> 2011/5/2 Peter Elespuru wrote:
>>
>>    Hello,
>>
>>    I just wanted to confirm again that based on your description, we
>>    definitely fit in the non-commercial category, and if there's any
>>    way to get an email approval in response from you, that would
>>    be a huge help.
>>
>>    Thanks!
>>
>>    Regards,
>>    -Peter
>>
>>    __________________________________________________________________
>>    This is an enquiry e-mail via http://www.highcharts.com/ from:

*************************************************************************/

qx.Class.define("auroral_resources.ui.plot.highcharts.TimeSeriesWindow",
{

    extend : qx.ui.window.Window,


    /*
    *****************************************************************************
        STATICS
    *****************************************************************************
    */
    statics : 
    {

        //
        // centralized control of the URL used to obtain data given appropriate args
        // also helps for testing, giving a single place to change/update
        //
        getCsvUrl : function(parameter, start, stop) {
            return "http://"+auroral_resources.Application.getHost()+"/spidr/servlet/GetData?compress=true&param="+parameter+"&format=csv&header=false&fillmissing=false&dateFrom="+start+"&dateTo="+stop;
            //return "resource/auroral_resources/ionofof3.txt";
        },

        //
        // build an object from de-serialized HTTP get parameters statically
        //
        fromArray : function(argArray) { 
            return new auroral_resources.ui.plot.highcharts.TimeSeriesWindow(
                parseInt(decodeURI(argArray[3])), 
                parseInt(decodeURI(argArray[4])), 
                decodeURI(argArray[5]), 
                decodeURI(argArray[6]),
                decodeURI(argArray[7]),
                decodeURI(argArray[8])
            );
        }
    },


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(width, height, parameter, title, mddocname, units)
    {
        this.base(arguments, title);

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__parameter = parameter;
        this.__mddocname = mddocname;
        this.__title = title;
        this.__units = units;

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            allowGrowX: true,
            allowGrowY: true,
            contentPadding: 0,
            focusable: true,
            enabled: true,
            margin: 0,
            padding: 0,
            showClose: true,
            status: parameter + ',' + title + ',' + mddocname + ',' + units,
            layout: new qx.ui.layout.Grow()
        });
        
        this.setWidth(width);
        this.setHeight(height);

        var start = this.__timeBus.getStartDateForSPIDRWS();
        var stop = this.__timeBus.getStopDateForSPIDRWS();

        this.__startDate = start;
        this.__stopDate = stop;

        var parameters = {

            exporting: {
                buttons: {
                    exportButton: {
                        enabled: false  
                    },
                    printButton: {
                        enabled: false
                    }                    
                }
            },

            plotOptions: {

                scatter: {
                    marker: { enabled: false },
                    color: '#0000bb'
                },

                area:{ 
                    marker: { enabled: false },
                    color: '#0000bb'
                },

                line: {
                    marker: { enabled: false },
                    lineWidth: 1,
                    color: '#0000bb'
                }
            },

            chart: {
                renderTo: 0,
//                zoomType: 'xy',
                zoomType: 'x',
                spacingRight: 30,
                defaultSeriesType: 'line',
                type: 'line'
            },

            title: {
                text: null
            },

            xAxis: {
                //tickInterval: 15 * 60 * 1000,
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },

            yAxis: {
                allowDecimals: true,
                startOnTick: false,
                title: {
                    text: this.__units
                }
            },
            
            tooltip: {
                shared: true               
            },

            legend: {
                enabled: false
            },

            credits: {
                enabled: false
            },

            series: [{ xAxis: 0, name: parameter, type: 'line', data: [] }]
        };

        this.__parameters = parameters;
        this.__plot = new qxhighcharts.Plot(parameters);
        this.add(this.__plot);
        this.__plot.addListener("plotCreated",qx.lang.Function.bind(this._initData,this,auroral_resources.ui.plot.highcharts.TimeSeriesWindow.getCsvUrl(parameter,start,stop)),this);

        this.addListener("close", this._destroy, this); //function(evt) { this.destroy() });
        this.addListener("mouseup", this._rightClick, this);
        this.addListener('resize',qx.lang.Function.bind(this._resize),this);
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
        __parameters : null,
        __mddocname : null,
        __timeBus : null,
        __startDate : null,
        __stopDate : null,
        __plot : null,
        __now : null,
        __units : null,
        __series : null,
        

        //
        //
        //
        _initData : function(dataResource) {

            var req = new qx.io.remote.Request(
                dataResource,
                "GET",
                "text/plain"
            );

            req.setProhibitCaching(false);
            req.addListener("completed", this._getData, this);
            req.send();
            
        },


        //
        //
        //
        _getData : function(result) 
        {
            result = result.getContent();
            var lines = qx.util.StringSplit.split(result, /[\r\n]/);
            var start = 0;
            var delta = 100000;
            var qxThis = this;
            var dat = [];

            for(var i=0, l=lines.length; i<l; i++) {
                var items = qx.util.StringSplit.split(lines[i], /[,]/);
                if (i > 0) {
                    if (typeof items !== undefined && items !== null && items.length >= 2) {

                        // depends on date.js, which is used several places elsewhere so it's not in the deps for this lib
                        if(i === 1) { start = Date.parse(items[0]).getTime(); }
                        if(i === 2) { delta = Date.parse(items[0]).getTime() - start; }

                        // using both date and data to populate
                        // depends on date.js, which is used several places elsewhere so it's not in the deps for this lib
                        dat.push([ Date.parse(items[0]).getTime(), parseFloat(items[1]) ]);
                    }
                }
            }

            this.__plot.getPlotObject().hideLoading();

            this.__plot.getPlotObject().xAxis[0].plotLines = [{
                color: 'red',
                width: 2,
                value: auroral_resources.messaging.TimeBus.getInstance().getNow()
            }];

            this.__series = this.__plot.getPlotObject().addSeries({ xAxis: 0, name: this.__parameter, data: dat }, true, true);

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
                var plot = this.__plot.getPlotObject();
                
                var dlPdf = new qx.ui.form.Button("Download PDF");
                dlPdf.addListener("click", function(evt) {
                    plot.exportChart({
                        type: 'application/pdf',
                        filename: param
                    });
                    popup.hide();
                });

                var dlPng = new qx.ui.form.Button("Download PNG");
                dlPng.addListener("click", function(evt) {
                    plot.exportChart({
                        type: 'image/png',
                        filename: param
                    });
                    popup.hide();
                });

                var dlSvg = new qx.ui.form.Button("Download SVG");
                dlSvg.addListener("click", function(evt) {
                   plot.exportChart({
                        type: 'image/svg+xml',
                        filename: param
                    });
                    popup.hide();
                });

                var dlJpg = new qx.ui.form.Button("Download JPG");
                dlJpg.addListener("click", function(evt) {
                    plot.exportChart({
                        type: 'image/jpeg',
                        filename: param
                    });
                    popup.hide();
                });

                var data = new qx.ui.form.Button("Download Data");
                data.addListener("click", function(evt) {
                    var dlurl = "http://spidr.ngdc.noaa.gov/spidr/servlet/GetData?param="+param+"&format=zip&dateFrom="+start+"&dateTo="+stop;
                    window.open(dlurl,"");
                    popup.hide();
                });
                
                var mdata = new qx.ui.form.Button("View Metadata");
                mdata.addListener("click", function(evt) {
                    var mdurl = "http://spidr.ngdc.noaa.gov/spidrvo/viewdata.do?docname="+mddoc;
                    window.open(mdurl,"");
                    popup.hide();
                });
                
                popup.add(new qx.ui.basic.Label("Additional Options"));
                popup.add(dlPdf);
                popup.add(dlPng);
                popup.add(dlSvg);
                popup.add(dlJpg);
                popup.add(data);
                popup.add(mdata);
                popup.placeToMouse(evt);
                popup.show();            
            }
        },
        
        // 
        // callback for the 'startDate' message channel
        // 
        _startDateChangeBusCallback : function(e) {
            var parameter = this.__parameter;
            var start = this.__startDate;
            var stop = this.__stopDate;
            this.__plot.getPlotObject().showLoading();
            this.__series.remove(false);
            this._initData(auroral_resources.ui.plot.highcharts.TimeSeriesWindow.getCsvUrl(parameter,start,stop));
        },

        // 
        // callback for the 'stopDate' message channel
        // 
        _stopDateChangeBusCallback : function(e) {
            var parameter = this.__parameter;
            var start = this.__startDate;
            var stop = this.__stopDate;
            this.__plot.getPlotObject().showLoading();
            this.__series.remove(false);
            this._initData(auroral_resources.ui.plot.highcharts.TimeSeriesWindow.getCsvUrl(parameter,start,stop));
        },	

        // 
        // callback for the 'now' message channel
        // 
        _nowChangeBusCallback : function(e) {
            this.__plot.getPlotObject().xAxis.plotLines = [{
                color: 'red',
                width: 2,
                value: auroral_resources.messaging.TimeBus.getInstance().getNow()
            }];
            this.__plot.getPlotObject().redraw();
        },

        // 
        // window was resized take appropriate action
        // 
        _resize : function(e) {

            // account for the fact that the resize event gets called on initial size too, before the object exists...
            if (typeof this.__plot === undefined || this.__plot === null || this.__plot.getPlotObject() === null ) { 
                return; 
            }

            // values based on the gray theme for HC and the modern theme for Qx
            // FIXME: parameterize or dynamicize these ASAP
            var dWidth = 10;
            var dHeight = 24;

            // update it
            this.__plot.getPlotObject().setSize(this.getWidth() - dWidth, this.getHeight() - dHeight, false); 
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
        this.__title = null;
        this.__parameter = null;
        this.__parameters = null;
        this.__mddocname = null;
        this.__timeBus = null;
        this.__startDate = null;
        this.__stopDate = null;
        this.__plot = null;
        this.__now = null;
        this.__units = null;
        this.__series = null;        
    }


});
