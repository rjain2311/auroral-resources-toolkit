/* ************************************************************************

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

AUTHOR(S) OF THIS FILE:
Peter R. Elespuru - peter.elespuru@noaa.gov

************************************************************************ */

qx.Class.define("auroral_resources.ui.window.IntroductionWindow",
{

    extend : qx.ui.window.Window,

    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(title)
    {
        // proceed with normal instantiation
        this.base(arguments, title);

        this.set({
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            layout: new qx.ui.layout.VBox(10)
        });

        this.setWidth(640);
        this.setHeight(480);

        // add introductory/welcome text
        var req = new qx.io.remote.Request(
            "resource/auroral_resources/static/html/IntroductionWindow.html",
            "GET",
            "text/html"
        );

        // ensure this content is grabbed fresh
        req.setProhibitCaching(false);
        req.addListener("completed", this._onIntroRequestComplete, this);
        req.send();

        // populate the initial content so something is there until the AJAX response comes back
        this.__html = "<h2>Loading...</h2>";
        this.__content = new qx.ui.embed.Html(this.__html);
        this.__content.setOverflow("auto", "auto");
        this.__content.setDecorator("main");
        this.__content.setBackgroundColor("white"); 
        this.__content.setWidth(640);
        this.__content.setHeight(430);
        this.add(this.__content);

        // add the hide me button
        var hideMe = new qx.ui.form.Button("Close, and don't show me this window again");
        hideMe.setWidth(150);

        // and it's clicked listener
        hideMe.addListener("click", this._setIgnore, this);
        
        // make sure cleanup occurs in all cases
        this.addListener("close", function(evt) { this.destroy() });

        // add it to the mix
        this.add(hideMe);

        return this;
    }, 


    /*
    *****************************************************************************
        CLASS VARIABLES AND MEMBERS
    *****************************************************************************
    */
    members :
    {

        __html : null,
        __content : null,

        _onIntroRequestComplete : function(result) {
            this.__html = result.getContent();
            this.remove(this.__content);
            this.__content = new qx.ui.embed.Html(this.__html);
            this.__content.setOverflow("auto", "auto");
            this.__content.setDecorator("main");
            this.__content.setBackgroundColor("#e4e4e4");
            this.__content.setWidth(640);
            this.__content.setHeight(430);
            this.add(this.__content);
        },

        _setIgnore : function() {
            //qx.bom.Cookie.set("NGDC.AR.intro", "ignore", 100000, null, null, null);
            auroral_resources.persistence.KVStore.getInstance().set("intro", "false");
            this.close();
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
