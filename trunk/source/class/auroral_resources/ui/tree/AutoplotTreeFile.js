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


qx.Class.define("auroral_resources.ui.tree.AutoplotTreeFile",
{

    extend : qx.ui.tree.TreeFile,

    /*
    *****************************************************************************
        STATIC MEMBERS
    *****************************************************************************
    */
    statics : {
        __AUTOPLOT_URL_PREFIX : "http://autoplot.org/autoplot.jnlp?",
        __DMSP_URL_PREFIX : "http://www.ngdc.noaa.gov/stp/satellite/dmsp/"
    },

    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(title, parameter)
    {
        this.base(arguments, title);
        this.setDraggable(true);
        this.addListener("dblclick", this._doubleClicked, this);
        this.addListener("dragstart", this._dragStart, this);
        this.addListener("droprequest", this._dropRequest, this);
        this.__title = title;
        this.__parameter = parameter;
        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.setToolTipText("(external-autoplot) Double-click to launch AutoPlot and load this data set within autoplot");
        this.setIcon("resource/auroral_resources/icons/autoplot24.png");
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
        __timeBus : null,
        __title : null,
        __parameter : null,

        //
        //
        //
        _doubleClicked : function(e) {

            if (this.__parameter !== undefined) {

                var cur = this.__timeBus.getNow();
                cur = new Date(cur);
                var yr = cur.getUTCFullYear();
                var yy = yr.toString().substring(2,4);
                var mo = cur.getUTCMonth()+1; //0-based indexing
                if ( mo.toString().length == 1 ) { mo = "0" + mo; }

                var dy = cur.getUTCDate(); //1-based indexing
                if ( dy.toString().length == 1 ) { dy = "0" + dy; }

                /* the old format needed day of year
                var doy = cur.getDOY();
                if ( doy.toString().length == 2 ) { doy = "0" + doy; }
                if ( doy.toString().length == 1 ) { doy = "00" + doy; }
                */

                // need to add this to the base URL e.g. f16/ssj/2011/03/f16_20110331_ssj.h5
                var url = auroral_resources.ui.tree.AutoplotTreeFile.__AUTOPLOT_URL_PREFIX +
                          "vap:" + auroral_resources.ui.tree.AutoplotTreeFile.__DMSP_URL_PREFIX +
                          "f16/"+"ssj/"+yr+"/"+mo+"/"+"f16_"+yr+mo+dy+"_ssj.h5?"+this.__parameter;

                window.open(url);
            }
        },

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
 
            if (type === "widget") {
                e.addData(type, "launcher");
                this._doubleClicked(e);
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
        this.__window = null;
        this.__timeBus = null;
        this.__title = null;
        this.__parameter = null;
    }

});
