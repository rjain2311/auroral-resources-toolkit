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

*************************************************************************/

qx.Class.define("auroral_resources.widget.MapTreeFile",
{
    extend : qx.ui.tree.TreeFile,

    statics :
    {
        LOADED: {},
        LOADING: {},

        //
        //
        //
        __loadScript: function(script) {

            if ( !(script in LOADING) || LOADING[script] !== true) {

                if ( !(script in LOADED) || LOADED[script] !== true) {

                    LOADING[script] = true;

                    var sl = new qx.io.ScriptLoader();
                    sl.load(script, function(status) {

                        if (status === 'success') {
                            LOADED[script] = true;
                            alert('loaded '+script);
                        } else {
                            LOADED[script] = false;
                        }

                    });

                    LOADING[script] = false;
                }
            }
        }

    },

    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(mddocname, mapper, baselayer, period, title)
    {
        this.base(arguments, title);
        this.setDraggable(true);
        this.addListener("dragstart", this._dragStart, this);
        this.addListener("droprequest", this._dropRequest, this);
        this.__mddocname = mddocname;
        this.__mapper = mapper;
        this.__baselayer = baselayer;
        this.__title = title;
        this.__period = period;
        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.setToolTipText("Drag to the gray workspace to the right");
        return this;
    },


    /*
    *****************************************************************************
        CLASS VARIABLES AND METHODS
    *****************************************************************************
    */
    members :
    {
        __window : null,
        __title : null,
        __timeBus : null,
        __mapper : null,
        __baseLayer : null,
        __period : null,
        __mddocname : null,

        //
        //
        //
        _dragStart : function(e) {
            e.addAction("copy");
            e.addAction("move");
            e.addType("widget");
        },

        //
        //
        //
        _dropRequest : function(e) {
            var action = e.getCurrentAction();
            var type = e.getCurrentType();
            var result = null;

            // load all the JS dependencies first
            if (this.__baseLayer === 'openlayers') {
                auroral_resources.widget.MapTreeFile.__loadScript("/art/resource/auroral_resources/proj4js-combined.js.gz");
                auroral_resources.widget.MapTreeFile.__loadScript("/art/resource/auroral_resources/OpenLayers/OpenLayers.js.gz");
            }

            this.__window = new auroral_resources.widget.MapWindow(512,512,this.__mapper, this.__baselayer, this.__period, this.__title, this.__mddocname);

            if (type === "widget") {
                result = this.__window;
                e.addData(type, result);
            }
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
