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


qx.Class.define("auroral_resources.ui.tree.JHUAPLTreeFile",
{

    extend : qx.ui.tree.TreeFile,

    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(title)
    {
        this.base(arguments, title);
        this.setDraggable(true);
        this.addListener("dblclick", this._doubleClicked, this);
        this.addListener("dragstart", this._dragStart, this);
        this.addListener("droprequest", this._dropRequest, this);
        this.__title = title;
        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.setToolTipText("(external-jhuapl) Double-click to launch the JHUAPL Java desktop client spectrogram application");
        this.setIcon("resource/auroral_resources/icons/jhuapl24.png");
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
        __jnlpUrl : "http://sd-www.jhuapl.edu/Aurora/data/app/DMSP.jnlp",

        //
        //
        //
        _doubleClicked : function(e) {
            window.open(this.__jnlpUrl);
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
                window.open(this.__jnlpUrl);
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
