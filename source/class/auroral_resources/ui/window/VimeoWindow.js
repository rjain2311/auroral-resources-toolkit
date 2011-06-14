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

qx.Class.define("auroral_resources.ui.window.VimeoWindow",
{

    extend : qx.ui.window.Window,


    /*
    *****************************************************************************
        STATICS
    *****************************************************************************
    */
    statics : 
    {
        __playerUrlPrfx : "http://player.vimeo.com/video/",
        __userUrlPrfx : "http://vimeo.com/",
        __vimeoUrlPrfx : "http://vimeo.com/",

        //
        // allow static creation of a parameterized instance of this class
        // used to restore from URL
        //
        fromArray : function(argArray) { 
            return new auroral_resources.ui.window.VimeoWindow(
                parseInt(decodeURI(argArray[3])),
                parseInt(decodeURI(argArray[4])),
                decodeURI(argArray[5]), 
                decodeURI(argArray[6]),
                decodeURI(argArray[7])
            );
        }
    },


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(width, height, title, uri, vuser)
    {
        this.base(arguments, title);

        this.__uri = uri;
        this.__title = title;
        this.__vuser = vuser;

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            status: title + ',' + uri,
            layout: new qx.ui.layout.Grow()
        });

        this.setCaption(this.getCaption()+" -- (Flashblockers break Vimeo, enable Flash 'always' for ART)");

        this.setWidth(width);
        this.setHeight(height);
        this.setContentPadding(0,0,0,0);
        
        this.addListener("close", this._destroy, this); //function(evt) { this.destroy() });
        this.addListener("mouseup", this._rightClick, this);
        
        var frame = new qx.ui.embed.Iframe(auroral_resources.ui.window.VimeoWindow.__playerUrlPrfx+this.__uri+"?autoplay=1&portrait=1&loop=1");
        this.add(frame);
               
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
        __uri : null,
        __vuser : null,

        //
        //
        //
        _rightClick : function(evt) { 
            // it's an embedded flash video, which overrides with it's own right click
            // nothing we can do here that will ever take affect on more than the title
            // bar....
            return;
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
        this.__title = null;
        this.__uri = null;
        this.__vuser = null;        
    }


});
