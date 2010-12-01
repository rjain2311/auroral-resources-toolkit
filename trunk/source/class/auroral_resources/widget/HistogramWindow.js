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
Dmitry Medvedev - dmedv@wdcb.ru
Mikhail Zhizhin - jjn@wdcb.ru
Rob Redmon - rob.redmon@noaa.gov

*************************************************************************/


qx.Class.define("auroral_resources.widget.HistogramWindow",
{

    extend : qx.ui.window.Window,


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(parameter, title)
    {
        this.base(arguments, title);

        var winWidth = 600;

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__parameter = parameter;
        this.__title = title;

        this.set({
            width: winWidth,
            height: 400,
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            layout: new qx.ui.layout.Grow()
        });

        var xOffset = 0; //((winWidth/2)/2) - 10;
        var buttonWidth = 75;
        var buttonHeight = 10;

        var dataButton = new qx.ui.form.Button("Get Data");
        dataButton.setHeight(buttonHeight);
        dataButton.setWidth(buttonWidth);

        var metaDataButton = new qx.ui.form.Button("Get Meta");
        metaDataButton.setHeight(buttonHeight);
        metaDataButton.setWidth(buttonWidth);

        //this.add(dataButton, {left: xOffset, top: 0});
        //this.add(metaDataButton, {left: buttonWidth + 5, top: 0});

        var start = this.__timeBus.getStartDateForSPIDRWS();
        var stop = this.__timeBus.getStopDateForSPIDRWS();

        this.__startDate = start;
        this.__stopDate = stop;

        /////////////////////////////////////////////////////////////////////        
        // NEED MORE TIME TO INTEGRATE PROTOVIS DYNAMICALLY...
        // REVERTING TO DYGRAPHS FOR NOW
        /////////////////////////////////////////////////////////////////////        

        /*
        this.__timeBus.getBus().subscribe("time.startDate", this._startDateChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.now", this._nowChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.stopDate", this._stopDateChangeBusCallback, this);
        */

        this.addListener("close", function(evt) { this.destroy() });
        this.addListener("mouseup", this._rightClick, this);
        
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
        __timeBus : null,
        __startDate : null,
        __stopDate : null,
        __chart : null,
        __now : null,

        //
        //
        //
        _rightClick : function(evt) { 
            if(evt.isRightPressed()) { 
                dialog.Dialog.alert('This window does not have any additional options');
            }
        },
        
        //
        // callback for the 'startDate' message channel
        //
        _startDateChangeBusCallback : function(e) {
        },

        //
        // callback for the 'stopDate' message channel
        //
        _stopDateChangeBusCallback : function(e) {
        },	

        //
        //
        //
        _nowChangeBusCallback : function(e) {
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
