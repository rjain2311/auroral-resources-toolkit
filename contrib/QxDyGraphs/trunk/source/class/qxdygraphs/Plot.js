/* ************************************************************************

   Copyright:
     2010 OETIKER+PARTNER AG, Tobi Oetiker, http://www.oetiker.ch
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tobi Oetiker (oetiker)

************************************************************************ */

/* ************************************************************************

#asset(dygraphs/*)

************************************************************************ */

/**
 * A qooxdoo wrapper for the dygraphs JavsScript Visualization Library.
 * The wrapper assumes to find a copy of dygraph-combined.js
 * in the resource/qxdygraph directory. See the <a href="http://danvk.org/dygraphs / target="_blank">dygraph</a> website
 * for further information.
 *
 * Note that dygraph likes its data best coming in a csv file, you can also supplay an array of arrays where the first
 * element is an object with a getTime function that returns the number of ms since 1970 (like the Date object does).
 *
 * <pre class='javascript'>
 * var data = [];
 * for (var i=1;i<100;i++){
 *     data.push([new Date(1000000000+i*3600*1000),Math.random(),Math.sin(i/50)]);
 * }
 * var options = {
 *    lables: [ 'Random','Sin' ]
 * };
 * var plot = new qxdygraphs.Plot(data,options); 
 * </pre>
 */
qx.Class.define("qxdygraphs.Plot", {
    extend : qx.ui.core.Widget,

    /**
     * @param data {Any} a csv file requestable via XHR, a csv file in string format, an array pointer or a GViz object.
     * @param options {Map} the option map.
     */

    construct: function(data, options, parent){
        this.base(arguments);

        this.__parent = parent;

        var min = '.min';
        if (qx.core.Environment.get("qx.debug") === "on") {
            min = '';
        }
        var codeArr = [];

        // account for IE < 9 and !canvas
        if ( !document.createElement('canvas').getContext && qx.bom.client.Engine.MSHTML ) {
//            codeArr.push("iefriendly/excanvas"+min+".js.gz");
            codeArr.push("iefriendly/excanvas.js.gz");
//            codeArr.push("latest/excanvas.js.gz");
        }

        //codeArr.push("dygraph-combined.js.gz");
        codeArr.push("iefriendly/strftime-min.js.gz");
        codeArr.push("iefriendly/rgbcolor.js.gz");
        codeArr.push("iefriendly/dygraph-canvas.js.gz");
        codeArr.push("iefriendly/dygraph.js.gz");
//        codeArr.push("latest/dygraph-combined.js.gz");
//        codeArr.push("latest/dygraph-canvas.js.gz");
//        codeArr.push("latest/dygraph.js.gz");

        this.__loadScriptArr(codeArr,qx.lang.Function.bind(this.__addCanvas,this,data,options));
    },
    statics : { 

        /**
         * map of loaded scripts
         */
        LOADED: {},
        /**
         * map of objects in the process of loading a particular script
         */
        LOADING: {},
        /**
         * Default Options for graphs. They get merged (non overwriting to the graph object).
         */
        DEFAULT_OPTIONS: {
            // thanks to http://ui.openoffice.org/VisualDesign/OOoChart_colors_drafts.html
            colors:  [
                '#005796',  '#46b535', '#e93f80', '#bbe3ff',
                '#ff811b', '#007333', '#ffe370', '#a6004f', '#a6004f',
                '#bde734', '#0094d8', '#ffbedd', '#ffbf17'
            ],
            axisLabelFontSize: 12,
            labelsDivStyles: {
                fontSize: 13,
                textAlign: 'right'
            },
            labelsDivWidth: 230
        }
    },
    events : {
        /**
         * returns the plot object
         */
        plotCreated: 'qx.event.type.Event',
        /**
         * fires when a script is loaded
         */
        scriptLoaded: 'qx.event.type.Event'
    },
    members : {        
        /**
         * our copy of the plot object
         */        
        __plotObject: null,
        __parent: null,

        getPlotObject: function(){
            return this.__plotObject;
        },

        /**
         * Chain loading scripts.
         */
        __loadScriptArr: function(codeArr,handler){
            var script = codeArr.shift();
            if (script){
                if (qxdygraphs.Plot.LOADING[script]){
                    qxdygraphs.Plot.LOADING[script].addListenerOnce('scriptLoaded',function(){
                        this.__loadScriptArr(codeArr,handler);
                    },this);
                }
                else if ( qxdygraphs.Plot.LOADED[script]){
                     this.__loadScriptArr(codeArr,handler);
                }
                else {
                    qxdygraphs.Plot.LOADING[script] = this;
                    var sl = new qx.io.ScriptLoader();
                    var src = qx.util.ResourceManager.getInstance().toUri("dygraphs/"+script);
                    sl.load(src, function(status){
                        if (status == 'success'){
                            this.__loadScriptArr(codeArr,handler);
                            qxdygraphs.Plot.LOADED[script] = true;
                        }
                        qxdygraphs.Plot.LOADING[script] = null;
                        this.fireDataEvent('scriptLoaded',script);
                    },this);
                }
            } else {
                handler();
            }
        },

        /**
         * Create the canvas once everything is renderad
         * 
         * @lint ignoreUndefined(Dygraph)
         */
        __addCanvas: function(data, options){

            var el = this.getContentElement().getDomElement();

            // ensure element is present or wait until event triggers apperance
            if (el == null){

                this.addListenerOnce('appear',qx.lang.Function.bind(this.__addCanvas,this,data,options),this);

            } else {

                // make it use theme fonts
                qx.bom.element.Style.setStyles(this.getContentElement().getDomElement(),
                    qx.theme.manager.Font.getInstance().resolve('default').getStyles(),
                    true
                );

                qx.lang.Object.mergeWith(options,qxdygraphs.Plot.DEFAULT_OPTIONS,false);

                // clear out any children...
                var plot = this.__plotObject = new Dygraph(el, data, options);

                this.fireDataEvent('plotCreated', plot);

                this.__parent._hideLoading();
                this.__parent._hideNoData();

                this.addListener('resize',function(e){
                    qx.html.Element.flush();
                    plot.resize();
                });
            }
        }
    }
});
