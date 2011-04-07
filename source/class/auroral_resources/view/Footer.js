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
* The Application's Footer
*/

qx.Class.define("auroral_resources.view.Footer",
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

        var noaaLink = new qx.ui.basic.Label().set({
            value: "<a style='color:white;text-decoration:none;' href='http://www.noaa.gov/'>NOAA</a> > ",
            rich: true
        });
        this.add(noaaLink);

        var nesdisLink = new qx.ui.basic.Label().set({
            value: "<a style='color:white;text-decoration:none;' href='http://www.nesdis.noaa.gov/'>&nbsp;NESDIS</a> > ",
            rich: true
        });
        this.add(nesdisLink);

        var ngdcLink = new qx.ui.basic.Label().set({
            value: "<a style='color:white;text-decoration:none;' href='http://www.ngdc.noaa.gov/'>&nbsp;NGDC</a> > ",
            rich: true
        });
        this.add(ngdcLink);

        var stpLink = new qx.ui.basic.Label().set({
            value: "<a style='color:white;text-decoration:none;' href='http://www.ngdc.noaa.gov/stp/'>&nbsp;Solar-Terrestrial Physics</a>",
            rich: true
        });
        this.add(stpLink);

        this.add(new qx.ui.core.Spacer, {flex : 1});

        var privLink = new qx.ui.basic.Label().set({
            value: "<a style='color:white;text-decoration:none;' href='http://ngdc.noaa.gov/ngdcinfo/privacy.html'>privacy policy</a>&nbsp;&nbsp;|&nbsp;&nbsp;",
            rich : true
        });
        this.add(privLink);

        var quesLink = new qx.ui.basic.Label().set({
            value: "<a style='color:white;text-decoration:none;' href='mailto:ionosphere@noaa.gov?Subject=Auroral%20Resources%20Question'>questions</a>",
            rich : true
        });
        this.add(quesLink);

    }
});
