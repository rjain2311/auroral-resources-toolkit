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

*************************************************************************/

/* ************************************************************************

#asset(auroral_resources/*)

************************************************************************ */

qx.Class.define("auroral_resources.ui.window.SceneJSWindow",
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
        // allow static creation of a parameterized instance of this class
        // used to restore from URL
        //
        fromArray : function(argArray) { 
            return new auroral_resources.ui.window.SceneJSWindow(
                parseInt(decodeURI(argArray[3])),  // width
                parseInt(decodeURI(argArray[4])),  // height
                decodeURI(argArray[5]),            // mdurl
                decodeURI(argArray[6])             // title
            );
        }
    },


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(width, height, mdurl, title)
    {
        this.base(arguments, title);

        this.__mdurl = mdurl;
        this.__title = title;

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            width: width,
            height: height,
            status: this.__mdurl + "," + this.__title,
            layout: new qx.ui.layout.Grow()
        });

        this.addListener("close", this._destroy, this); //function(evt) { this.destroy() });
        this.addListener("mouseup", this._rightClick, this);

        this.setCaption(this.getCaption()+" -- *! EXPERIMENTAL !*");

        this.setWidth(width);
        this.setHeight(height);
        this.setContentPadding(0,0,0,0);
                
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

        var opts = {

            type: "scene",
            id: "the-scene",
            canvasId: "theCanvas",

            nodes: [
                {
                    type: "lookAt",
                    id: "the-lookat",
                    eye : { x: 0, y: 0, z: 10 },
                    look : { x: 0, y: 0, z: 0 },
                    up : { y: 1.0 },

                    nodes: [
                        {
                            type: "camera",
                            optics: {
                                type: "perspective",
                                fovy : 25.0,
                                aspect : 1.47,
                                near : 0.10,
                                far : 600.0
                            },
                            nodes: [

                              
                                    
                                {
                                    type: "light",
                                    mode:                   "dir",
                                    color:                  { r: 1.0, g: 1.0, b: 1.0 },
                                    diffuse:                true,
                                    specular:               true,
                                    dir:                    { x: 0.5, y: -0.5, z: -0.75 }
                                },
                                {
                                    type: "rotate",
                                    id: "pitch",
                                    x: 1,
                                    nodes: [
                                        {
                                            type: "rotate",
                                            id: "yaw",
                                            y: 1,
                                            nodes: [
                                                {
                                                    type: "rotate",
                                                    z: 1,
                                                    angle : 195,
                                                    nodes: [
                                                        {
                                                            type: "rotate",
                                                            y: 1,
                                                            id: "earth-rotate",

                                                            nodes: [
                                                                {
                                                                    type: "scale",
                                                                    x: 2,
                                                                    y: 2,
                                                                    z: 2,

                                                                    flags: {
                                                                        enabled: true
                                                                    },
                                                                    layer: "surface-layer",

                                                                    nodes: [

                                                                        /*------------------------------------------------------------------
                                                                         * Texture with texture layers applied to base color and specularity
                                                                         *----------------------------------------------------------------*/
                                                                        {
                                                                            type: "texture",
                                                                            layers: [

                                                                                /*---------------------------------------------------------
                                                                                 * Underlying texture layer applied to the Earth material's
                                                                                 * baseColor to render the continents, oceans etc.
                                                                                 *--------------------------------------------------------*/
                                                                                {
                                                                                    uri: "resource/scenejs/images/earth.jpg",
                                                                                    applyTo:"baseColor",
                                                                                    blendMode: "multiply",
                                                                                    flipY: true,
                                                                                    flipX: true
                                                                                },

                                                                                /*---------------------------------------------------------
                                                                                 * Second texture layer applied to the Earth material's
                                                                                 * specular component to make the ocean shiney.
                                                                                 *--------------------------------------------------------*/
                                                                                {
                                                                                    uri: "resource/scenejs/images/earth-specular.gif",
                                                                                    applyTo:"specular",
                                                                                    blendMode:"multiply",
                                                                                    flipY: true,
                                                                                    flipX: true
                                                                                } ,
                                                                                //

                                                                                /*---------------------------------------------------------
                                                                                 * Second texture layer applied to the Earth material's
                                                                                 * emission component to show lights on the dark side.
                                                                                 *--------------------------------------------------------*/
                                                                                {
                                                                                    uri: "resource/scenejs/images/earth-lights.gif",
                                                                                    applyTo:"emit",
                                                                                    blendMode:"add",
                                                                                    flipY: true,
                                                                                    flipX: true
                                                                                }
                                                                            ],

                                                                            /*---------------------------------------------------------
                                                                             * Sphere with some material
                                                                             *--------------------------------------------------------*/
                                                                            nodes: [

                                                                                {
                                                                                    type: "material",
                                                                                    specular: 5,
                                                                                    shine:100,
                                                                                    emit: 0.0,
                                                                                    baseColor: {r: 1, g: 1, b: 1},
                                                                                    nodes: [
                                                                                        {
                                                                                            type: "sphere"
                                                                                        }
                                                                                    ]

                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },

                                                                {
                                                                    type: "scale",
                                                                    x: 2.05,
                                                                    y: 2.05,
                                                                    z: 2.05,

                                                                    flags: {
                                                                        transparent: true,
                                                                        enabled: true,
                                                                        specular:false,
                                                                        blendFunc: {
                                                                            sfactor: "srcAlpha",
                                                                            dfactor: "one"
                                                                        }
                                                                    },

                                                                    layer: "cloud-layer",

                                                                    nodes: [

                                                                        /*------------------------------------------------------------------
                                                                         *
                                                                         *----------------------------------------------------------------*/

                                                                        {
                                                                            type: "texture",
                                                                            layers: [

                                                                                /*---------------------------------------------------------
                                                                                 *  Alpha map
                                                                                 *
                                                                                 *--------------------------------------------------------*/

                                                                                {
                                                                                    uri: "resource/scenejs/images/earthclouds.jpg",
                                                                                    applyTo:"alpha",
                                                                                    blendMode: "multiply",
                                                                                    flipY: true,
                                                                                    flipX: true
                                                                                }

                                                                            ],

                                                                            /*---------------------------------------------------------
                                                                             * Sphere with some material
                                                                             *--------------------------------------------------------*/

                                                                            nodes: [
                                                                                {
                                                                                    type: "node",
                                                                                    z: 1,
                                                                                    angle : 195,
                                                                                    nodes: [
                                                                                        {
                                                                                            type: "rotate",
                                                                                            y: 1,
                                                                                            id: "clouds-rotate",
                                                                                            nodes: [
                                                                                                {
                                                                                                    type: "material",
                                                                                                    specular: 0,
                                                                                                    shine:0.0001,
                                                                                                    emit: 0.0,
                                                                                                    alpha: 1,
                                                                                                    baseColor: {
                                                                                                        r: 1, g: 1, b: 1
                                                                                                    },
                                                                                                    nodes: [
                                                                                                        {
                                                                                                            type: "sphere"
                                                                                                        }
                                                                                                    ]

                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        this.__scene = new qxscenejs.Scene(opts);
        var scene = this.__scene;
        var that = this;

        this.__scene.addListener("sceneCreated",function() {

            var canvas = scene.getCanvas();
            var yaw = 0;
            var pitch = 0;
            var lastX;
            var lastY;
            var dragging = false;
            var posZ = 10;
            var earthRotate = 0;
            var cloudsRotate = 0;

            function mouseDown(event) {
                lastX = event.clientX;
                lastY = event.clientY;
                dragging = true;
            }

            function mouseUp() {
                dragging = false;
            }

            /* On a mouse drag, we'll re-render the scene, passing in
             * incremented angles in each time.
             */
            function mouseMove(event) {
                if (dragging) {
                    yaw += (event.clientX - lastX) * 0.3;
                    pitch += (event.clientY - lastY) * 0.3;

                    lastX = event.clientX;
                    lastY = event.clientY;
                }
            }

            function mouseWheel(event) {
                var delta = 0;
                if (!event) event = window.event;
                if (event.wheelDelta) {
                    delta = event.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } else if (event.detail) {
                    delta = -event.detail / 3;
                }
                if (delta) {
                    if (delta < 0) {
                        posZ -= 0.6;
                    } else {
                        posZ += 0.6;
                    }
                }
                if (event.preventDefault)
                    event.preventDefault();
                event.returnValue = false;


            }

            canvas.addEventListener('mousedown', mouseDown, true);
            canvas.addEventListener('mousemove', mouseMove, true);
            canvas.addEventListener('mouseup', mouseUp, true);
            canvas.addEventListener('mousewheel', mouseWheel, true);
            canvas.addEventListener('DOMMouseScroll', mouseWheel, true);

            SceneJS.withNode("the-scene").set("layers", [
                "surface-layer",
                "cloud-layer"
            ]);

            SceneJS.withNode("the-scene").start({
                idleFunc: function() {
                    SceneJS.withNode("earth-rotate").set("angle", earthRotate);
                    SceneJS.withNode("clouds-rotate").set("angle", cloudsRotate);
                    SceneJS.withNode("pitch").set("angle", pitch);
                    SceneJS.withNode("yaw").set("angle", yaw);
                    SceneJS.withNode("yaw").set("angle", yaw);
                    SceneJS.withNode("the-lookat").set({ eye: { x: 0, y: 0, z: posZ } });

                    //earthRotate -= 0.004;
                    cloudsRotate -= 0.06;
                }
            });

            var $dialog = $('<div></div>')
                    .html('<br/><p>Loading textures, please wait</p>')
                    .dialog({
                autoOpen: false,
                title: 'Just a second..'
            });

            var dialogOpen = false;
            SceneJS.withNode("the-scene").bind("loading-status", function(event) {
                    var params = event.params;

                    if (params.numNodesLoading > 0) {
                        if (!dialogOpen) {
                            $dialog.dialog('open');
                            dialogOpen = true;
                        }
                    } else {
                        if (dialogOpen) {
                            $dialog.dialog('close');
                            dialogOpen = false;
                        }
                    }
                }
            );

            that.add(scene);
            that._hideLoading();

        }, this);        


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
        __mdurl : null,
        __scene : null,

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
                
                var that = this;

                var popup = new qx.ui.popup.Popup(new qx.ui.layout.VBox()).set({
                     autoHide: true
                });

                var mdata = new qx.ui.form.Button("View Metadata");
                mdata.addListener("click", function(evt) {
                    window.open(that.__mdurl,"");
                    popup.hide();
                });
                
                popup.add(new qx.ui.basic.Label("Additional Options"));
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
        this.__scene = null;
        this.__title = null;
        this.__error = null;
        this.__loading = null;
        this.__nodata = null;
        this.__mdurl = null;
    }

});
