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

AUTHORS:

Peter Elespuru - peter.elespuru@noaa.gov




************************************************************************ */

/**
* The Application's header
*/

qx.Class.define("auroral_resources.view.Header",
{

    extend : qx.ui.container.Composite,

    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */

    construct : function()
    {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.HBox);
        this.setAppearance("app-header");
        this.setPaddingTop(0);
        this.setPaddingBottom(0);
        this.setPaddingRight(0);
        this.setMarginTop(0);
        this.setMarginBottom(0);
        this.setMarginRight(0);

        // add the logo
        var logo = new qx.ui.basic.Image("resource/auroral_resources/ngdclogo_small.png");
        logo.addListener("mouseup", function() {
            window.location = "http://www.ngdc.noaa.gov";
        });

        logo.addListener("mouseover", function() {
            logo.set({cursor: "pointer"});
        });

        logo.addListener("mouseout", function() {
            logo.set({cursor: "default"});
        });
        this.add(logo);

        this.add(new qx.ui.core.Spacer, {flex : 1});

        // add the right logo
        //var rlogo = new qx.ui.basic.Image("resource/auroral_resources/logo_beta.png");
        var rlogo = new qx.ui.basic.Image("resource/auroral_resources/logo.png");
        rlogo.addListener("mouseup", function() {
            window.location = "http://spidr.ngdc.noaa.gov/art/";
        });

        rlogo.addListener("mouseover", function() {
            rlogo.set({cursor: "pointer"});
        });

        rlogo.addListener("mouseout", function() {
            rlogo.set({cursor: "default"});
        });
        this.add(rlogo);

        /* using the image based right side now above
        var title = new qx.ui.basic.Label().set({
            value: "<a style='font-style:italic;font-size:2.5em;color:white;text-decoration:none;' href='http://en.wikipedia.org/wiki/Aurora_(astronomy)'>Auroral Resources Toolkit</a>",
            rich: true
        });
        this.add(title);
        */

        // add the right logo
        /* I don't like the way this gets stretched right now, nor in general. revisit later if/when time
        var rlogo = new qx.ui.basic.Image("resource/auroral_resources/headerright.png").set({
        alignX: "right",
        margin: 0,
        padding: 0,
        scale: true,
        height: 50
        });
        this.add(rlogo);
        */
    }

});
