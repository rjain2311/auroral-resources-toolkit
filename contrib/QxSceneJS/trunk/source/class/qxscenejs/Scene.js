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

#asset(scenejs/*)
#asset(scenejs/utils/*)
#asset(scenejs/utils/optimize/*)
#asset(scenejs/utils/query/*)
#asset(scenejs/utils/raycasting/*)
#asset(scenejs/utils/validate/*)
#asset(scenejs/plugins/*)
#asset(scenejs/plugins/clip/*)
#asset(scenejs/plugins/event/*)
#asset(scenejs/plugins/fx/*)
#asset(scenejs/plugins/lookat/*)
#asset(scenejs/plugins/sound/*)

************************************************************************ */

/**
 * 
 * loading algorithms derived from the QxJqPlot contrib
 * 
 */
qx.Class.define("qxscenejs.Scene", 
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
        sceneCreated: 'qx.event.type.Event',
        scriptLoaded: 'qx.event.type.Event'
    },


    construct: function(parameters)
    {
        this.base(arguments);


        // whether to use the minified version
        var min = '.min';

        // always load the minified versions
        //if (qx.core.Environment.get("qx.debug") === "on") {
        //    min = '';
        //}

        // define'em
        var codeArr = [
            "jquery" + min + ".js",
            "jquery-ui" + min + ".js",
            "scenejs" + min + ".js"
        ];

        // load'em
        this.__addCss("jquery-ui.css");
        this.__addCss("style.css");
        this.__loadScriptArr(codeArr,qx.lang.Function.bind(this.__addCanvas,this,parameters));
    },


    members : 
    {
        __element: null,
        __parameters: null,
        __sceneObject: null,


        //
        //
        //
        getCanvas : function() {
            return this.__element;
        },

        //
        // returns the low level scene object, if created, or null if not
        //
        getSceneObject: function()
        {
            return this.__sceneObject;
        },


        //
        // Simple css loader without event support
        //
        __addCss: function(url){
            if (!qxscenejs.Scene.LOADED[url]){
                qxscenejs.Scene.LOADED[url]=true;
                var head = document.getElementsByTagName("head")[0];
                var el = document.createElement("link");
                el.type = "text/css";
                el.rel="stylesheet";
                el.href=qx.util.ResourceManager.getInstance().toUri("resource/css/scenejs/"+url);
                setTimeout(function() {
                    head.appendChild(el);
                }, 0);
            };
        },

        //
        // loads external resources and triggers initialization accordingly
        //
        __loadScriptArr: function(codeArr, handler)
        {
            var script = codeArr.shift();

            if (script) {

                if (qxscenejs.Scene.LOADING[script]) {

                    qxscenejs.Scene.LOADING[script].addListenerOnce('scriptLoaded',function() {

                        this.__loadScriptArr(codeArr,handler);

                    },this);

                } else if ( qxscenejs.Scene.LOADED[script]) {

                     this.__loadScriptArr(codeArr,handler);

                } else {

                    qxscenejs.Scene.LOADING[script] = this;
                    var sl = new qx.io.ScriptLoader();
                    var src = qx.util.ResourceManager.getInstance().toUri("resource/scenejs/"+script);

                    sl.load(src, function(status) {

                        if (status == 'success') {

                            this.__loadScriptArr(codeArr,handler);
                            qxscenejs.Scene.LOADED[script] = true;
                        }

                        qxscenejs.Scene.LOADING[script] = null;
                        this.fireDataEvent('scriptLoaded',script);

                    },this);
                } 

            } else {

                handler();
            }
        },


        //
        // add the canvas, trigger loading message, and notify listeners of completion
        //
        __addCanvas: function(parameters)
        {
            //this.__element = this.getContentElement().getDomElement();
            this.__element = new qx.ui.embed.Canvas().set({ canvasWidth: 512, canvasHeight: 512, syncDimension: true });

            var qxThis = this;
            var qxParm = parameters;

            if (this.__element == null){

                this.addListenerOnce('appear',qx.lang.Function.bind(this.__addCanvas,this,parameters),this);

            } else {

                var id = 'sjsId'+(qxscenejs.Scene.INSTANCE_COUNTER++);
                qx.bom.element.Attribute.set(this.__element, 'id', id);
                qxParm.canvasId = id;
                var scene = qxThis.__sceneObject = new SceneJS.createNode(qxParm);
                qxThis.fireDataEvent('sceneCreated', plot);

            }
        }
    }
});
