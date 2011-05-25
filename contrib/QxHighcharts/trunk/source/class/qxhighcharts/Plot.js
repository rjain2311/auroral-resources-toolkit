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
Originally derived from the qxjqplot contrib
Peter R. Elespuru - peter.elespuru@noaa.gov

THIS WIDGET USES HIGHCHARTS, WHICH IS !!! ___NOT___ !!! FREE FOR COMMERCIAL USE

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
 * Originally derived from qxjqplot
 * 
 */
qx.Class.define("qxhighcharts.Plot", 
{

    extend : qx.ui.core.Widget,


    statics : 
    { 
        INSTANCE_COUNTER : 0,
        LOADED: {},
        LOADING: {}
    },


    events : 
    {
        plotCreated: 'qx.event.type.Event',
        scriptLoaded: 'qx.event.type.Event'
    },


    construct: function(parameters)
    {
        this.base(arguments);

        // bring in deps and hc itself, choosing to use jquery
        // and explicitly compressed variants since our sys admins won't
        // change server config to support 'Accept-Encoding' headers 
        // for .js gzip requests

        // version of jquery
        var jqv = '1.5.2';

        // whether to use the minified version
        var min = '.min';

        if (qx.core.Variant.isSet("qx.debug", "on")) {
            min = '';
        }

        var codeArr = [
            "jquery-"+jqv+min+".js.gz",
            "highcharts.js.gz",
            "modules/exporting.js.gz" 
        ];

        // load'em
        this.__loadScriptArr(codeArr,qx.lang.Function.bind(this.__addCanvas,this,parameters));
    },


    members : 
    {

        __element: null,
        __parameters: null,
        __plotObject: null,


        //
        // returns the low level HC plot object, if created, or null if not
        //
        getPlotObject: function()
        {
            return this.__plotObject;
        },


        //
        // loads external resources and triggers initialization accordingly
        //
        __loadScriptArr: function(codeArr,handler)
        {
            var script = codeArr.shift();

            if (script) {

                if (qxhighcharts.Plot.LOADING[script]) {

                    qxhighcharts.Plot.LOADING[script].addListenerOnce('scriptLoaded',function() {

                        this.__loadScriptArr(codeArr,handler);

                    },this);

                } else if ( qxhighcharts.Plot.LOADED[script]) {

                     this.__loadScriptArr(codeArr,handler);

                } else {

                    qxhighcharts.Plot.LOADING[script] = this;
                    var sl = new qx.io.ScriptLoader();
                    var src = qx.util.ResourceManager.getInstance().toUri("highcharts/js/"+script);

                    sl.load(src, function(status) {

                        if (status == 'success') {

                            this.__loadScriptArr(codeArr,handler);
                            qxhighcharts.Plot.LOADED[script] = true;

                            if (script === "highcharts.js.gz") {

                                this.__init();
                            }
                        }

                        qxhighcharts.Plot.LOADING[script] = null;
                        this.fireDataEvent('scriptLoaded',script);

                    },this);
                } 

            } else {

                handler();
            }
        },


        //
        // initialize some of the things that cannot be done on an object, which 
        // must take place on the HC namespace at large
        //
        __init: function() {

            // TODO: add something to ensure this only happens once, not a big deal
            // just a minor efficiency improvement

            // global and lang cannot be set plot by plot, must be applied globally to HC
            // after the HC JS module has been included
            Highcharts.setOptions({

                global: {

                    useUTC: false

                },

                lang: {

                    downloadPNG: "Download PNG",
                    downloadJPEG: "Download JPG",
                    downloadPDF: "Download PDF",
                    downloadSVG: "Download SVG",
                    loading: "Loading data, please stand by...",
                    resetZoom: "restore zoom"

                }

            });
        },


        //
        // add the plot canvas, trigger loading message, and notify listeners of completion
        //
        __addCanvas: function(parameters)
        {
            this.__element = this.getContentElement().getDomElement();
            var qxThis = this;
            var qxParm = parameters;

            if (this.__element == null){

                this.addListenerOnce('appear',qx.lang.Function.bind(this.__addCanvas,this,parameters),this);

            } else {

                var id = 'hcId'+(qxhighcharts.Plot.INSTANCE_COUNTER++);
                qx.bom.element.Attribute.set(this.__element, 'id', id);
                qxParm.chart.renderTo = id;
                
                var plot = qxThis.__plotObject = new Highcharts.Chart(qxParm);
                plot.showLoading();
                qxThis.fireDataEvent('plotCreated', plot);

            }
        }
    }
});
