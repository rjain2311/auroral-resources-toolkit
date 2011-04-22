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

AUTHOR(S) OF THE CODE IN THIS FILE:
Peter R. Elespuru - peter.elespuru@noaa.gov

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
        __AUTOPLOT_URL_PREFIX : "http://autoplot.org/autoplot.jnlp?"        
    },

    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(title, uri, format, parameters)
    {
        this.base(arguments, title);
        this.setDraggable(false);
        this.addListener("dblclick", this._doubleClicked, this);
        this.__title = title;
        this.__uri = uri;
        this.__format = format;
        this.__parameters = parameters;
        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.setToolTipText("(external) Double-click to launch AutoPlot and load this data set within autoplot");
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
        __title : null,
        __timeBus : null,
        __uri : null,
        __format : null,
        __parameters : null,

        _doubleClicked : function(e) {

            if (this.__uri !== undefined) {
/*
                var cur = this.__timeBus.getNow();
                cur = new Date(cur);
                var yr = cur.getUTCFullYear();
                var yy = yr.toString().substring(2,4);
                var mo = cur.getUTCMonth()+1; //0-based indexing
                if ( mo.toString().length == 1 ) { mo = "0" + mo; }
                var doy = cur.getDOY();
                if ( doy.toString().length == 2 ) { doy = "0" + doy; }
                if ( doy.toString().length == 1 ) { doy = "00" + doy; }

                var url = this.__uri+"/"+yr+"/"+mo+"/"+"j5f16"+yy+doy+".gz?"+this.__title;
                window.open(url);
*/
                window.open(this.__uri);
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
    }

});
