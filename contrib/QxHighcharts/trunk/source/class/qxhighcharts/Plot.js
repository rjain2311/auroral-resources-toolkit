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

/* ************************************************************************

#asset(highcharts/*)
#asset(highcharts/js/*)
#asset(highcharts/js/adapters/*)
#asset(highcharts/js/modules/*)
#asset(highcharts/js/themes/*)

************************************************************************ */

/**
 * A wrapper around Highcharts. The wrapper assumes to find an unpacked copy of
 * the highcharts distribution in resource/highcharts. See <a
 * href='http://www.highcharts.com/' target='_blank'>Highcharts website</a>
 * for information on how to use highcharts.
 * 
 * Derived from qxjqplot
 * 
 */
qx.Class.define("qxhighcharts.Plot", 
{

    extend : qx.ui.core.Widget,


    //
    //
    //
    statics : 
    { 
        INSTANCE_COUNTER : 0,
        LOADED: {},
        LOADING: {}
    },


    //
    //
    //
    events : 
    {
        plotCreated: 'qx.event.type.Event',
        scriptLoaded: 'qx.event.type.Event'
    },


    //
    //
    //
    construct: function(parameters, data)
    {
        this.base(arguments);

        var jqv = '1.5.2';
        var min = '.min';

        if (qx.core.Variant.isSet("qx.debug", "on")) {
            min = '';
        }

        var codeArr = [
            "jquery-"+jqv+min+".js.gz",
            "highcharts.js.gz",
            "modules/exporting.js.gz",
            "themes/gray.js.gz"
        ];

        this.__loadScriptArr(codeArr,qx.lang.Function.bind(this.__addCanvas,this,parameters,data));
    },


    //
    //
    //
    members : 
    {

        __plotObject: null,

        //
        //
        //
        getPlotObject: function()
        {
            return this.__plotObject;
        },


        //
        //
        //
        __loadScriptArr: function(codeArr,handler)
        {
            var script = codeArr.shift();
            if (script){
                if (qxjqplot.Plot.LOADING[script]){
                    qxjqplot.Plot.LOADING[script].addListenerOnce('scriptLoaded',function(){
                        this.__loadScriptArr(codeArr,handler);
                    },this);
                }
                else if ( qxjqplot.Plot.LOADED[script]){
                     this.__loadScriptArr(codeArr,handler);
                }
                else {
                    qxjqplot.Plot.LOADING[script] = this;
                    var sl = new qx.io.ScriptLoader();
                    var src = qx.util.ResourceManager.getInstance().toUri("highcharts/js/"+script);
                    sl.load(src, function(status){
                        if (status == 'success'){
                            this.__loadScriptArr(codeArr,handler);
                            qxjqplot.Plot.LOADED[script] = true;
                        }
                        qxjqplot.Plot.LOADING[script] = null;
                        this.fireDataEvent('scriptLoaded',script);
                    },this);
                }
            } else {
                handler();
            }
        },

        //
        //
        //
        __addCanvas: function(parameters, dataResource)
        {
            var el = this.getContentElement().getDomElement();
            var qxThis = this;
            var qxParm = parameters;

            if (el == null){

                this.addListenerOnce('appear',qx.lang.Function.bind(this.__addCanvas,this,parameters,dataResource),this);

            } else {

                // highcharts already uses jQuery, may as well go with the flow and use jQuery
                // paradigms for retrieval instead of Qx's
                $.get(dataResource, function(data) {

                    // Split the lines
                    var lines = data.split('\n');
                    
                    // Iterate over the lines and add categories or series
                    $.each(lines, function(lineNo, line) {
                        var items = line.split(',');
                        
                        // header line containes categories
                        if (lineNo == 0) {

                            /* ignore
                            $.each(items, function(itemNo, item) {
                                if (itemNo > 0) qxParm.xAxis.categories.push(item);
                            });
                            */


                        } else {

                            // response will be time, data, ... stuff
                            // we'll be ignoring '... stuff' for now
                            //
                            // 0123456789012345678
                            // yyyy-mm-dd hh:mm:ss
                            //
                            var yr = items[0].substring(0,3);
                            var mo = items[0].substring(5,6);;
                            var dy = items[0].substring(8,9);
                            var hr = items[0].substring(11,12);
                            var mn = items[0].substring(14,15);
                            var sc = items[0].substring(17,18);
                            qxParm.series[0].data.push([ Date.UTC(yr,mo,dy,hr,mn,sc), parseFloat(items[1]) ]);
                        }
                    });

                    var id = 'hcId'+(qxhighcharts.Plot.INSTANCE_COUNTER++);
                    qx.bom.element.Attribute.set(el, 'id', id);
                    qxParm.chart.renderTo = id;
                    var plot = qxThis.__plotObject = new Highcharts.Chart(qxParm);
                    qxThis.fireDataEvent('plotCreated', plot);
                    // FIXME: sort out why it doesn't respond correctly if registered in here...
                    //qxThis.addListener('resize',qx.lang.Function.bind(qxThis.__redraw,qxThis,plot,w,h),qxThis);

                });
            }
        },

        //
        //
        //
        resize: function(plot, w, h) 
        {
            qx.html.Element.flush();                    

            if (!this.isSeeable()) {
                return;
            }

            var dWidth = 22;
            var dHeight = 48;
            plot.setSize(w - dWidth, h - dHeight, false);
        }
    }
});
