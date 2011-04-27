/* ************************************************************************

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
Peter R. Elespuru - peter.elespuru@noaa.gov

************************************************************************ */

/* ************************************************************************

#asset(qx/icon/Tango/22/actions/dialog-ok.png)
#asset(qx/icon/Tango/22/actions/dialog-cancel.png)
#asset(qx/icon/Tango/22/actions/view-refresh.png)
#asset(qx/icon/Tango/22/apps/preferences-theme.png)
#asset(qx/icon/Tango/22/actions/help-about.png)
#asset(qx/icon/Tango/22/actions/help-contents.png)
#asset(qx/icon/Tango/22/actions/mail-forward.png)
#asset(qx/icon/Tango/22/actions/view-fullscreen.png)
#asset(qx/icon/Tango/22/emblems/emblem-important.png)

************************************************************************ */

/**
* The main tool bar widget
*/
qx.Class.define("auroral_resources.view.ToolBar",
{
    
    extend : qx.ui.toolbar.ToolBar,


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */

    /**
    * @param application {auroral_resources.Application} The main application class
    */
    construct : function(application)
    {
        this.base(arguments);

        var mainPart = new qx.ui.toolbar.Part;
        this.add(mainPart);

        var urlbtn = new qx.ui.toolbar.Button(this.tr("URL"), "icon/22/actions/document-send.png");
        urlbtn.setToolTipText(this.tr("Display the URL for your current workspace"));
        urlbtn.addListener("mouseup", application.showUrl, application);
        mainPart.add(urlbtn);

        // Add a sepearator

        mainPart.addSeparator();
        
        var sharebtn = new qx.ui.toolbar.Button(this.tr("Share"), "icon/22/actions/mail-forward.png");
        sharebtn.setToolTipText(this.tr("Share your current workspaace via URL"));
        sharebtn.addListener("mouseup", application.shareUrl, application);
        mainPart.add(sharebtn);

        // Add a sepearator
        mainPart.addSeparator();

        var clearbtn = new qx.ui.toolbar.Button(this.tr("Empty"), "icon/22/actions/edit-clear.png");
        clearbtn.setToolTipText(this.tr("Clean off your workspace, remove all widgets"));
        clearbtn.addListener("mouseup", application.emptyWorkspace, application);
        mainPart.add(clearbtn);

        // Add a sepearator
        mainPart.addSeparator();

        var refreshbtn = new qx.ui.toolbar.Button(this.tr("Revert"), "icon/22/actions/view-refresh.png");
        refreshbtn.setToolTipText(this.tr("Revert the workspace to its state when you started"));
        refreshbtn.addListener("mouseup", application.revertWorkspace, application);
        mainPart.add(refreshbtn);

        // Add a sepearator
        mainPart.addSeparator();

        var fullscrnbtn = new qx.ui.toolbar.Button(this.tr("Hide"), "icon/22/actions/view-fullscreen.png");
        fullscrnbtn.setToolTipText(this.tr("Hide both the top and side tool bars, enter full screen mode"));
        fullscrnbtn.addListener("mouseup", application.goFullScreen, application);
        mainPart.add(fullscrnbtn);

        // Add a sepearator

        mainPart.addSeparator();

        // Add a spacer
        this.addSpacer();

        // Info part
        var infoPart = new qx.ui.toolbar.Part;
        this.add(infoPart);

        // about button
        var aboutBtn = new qx.ui.toolbar.Button(this.tr("About"), "icon/22/actions/help-about.png");
        aboutBtn.setToolTipText(this.tr("Credits"));
        aboutBtn.addListener("mouseup", function() {
            
            // add about
            var req = new qx.io.remote.Request(
                "resource/auroral_resources/static/html/about.html",
                "GET",
                "text/html"
            );

            // ensure this content is grabbed fresh
            req.setProhibitCaching(false);
            req.addListener("completed", function(result){
                var d = dialog.Dialog.med_alert(result.getContent());
                d.setWidth(600);
            });
            req.send();
        });
        infoPart.add(aboutBtn);

        // Add a sepearator
        infoPart.addSeparator();
        
        // Tutorial button
        var tutBtn = new qx.ui.toolbar.Button(this.tr("Tutorials"), "icon/22/actions/help-contents.png");
        tutBtn.setToolTipText(this.tr("Opens a quick start guide, with links and videos"));
        tutBtn.addListener("mouseup", function() {
            
            // add introductory/welcome text
            var req = new qx.io.remote.Request(
                "resource/auroral_resources/static/html/IntroductionWindow.html",
                "GET",
                "text/html"
            );

            // ensure this content is grabbed fresh
            req.setProhibitCaching(false);
            req.addListener("completed", function(result) {
                dialog.Dialog.wide_alert(result.getContent());
            });
            req.send();
        });
        infoPart.add(tutBtn);
        
        // Add a sepearator
        infoPart.addSeparator();

        // Bug button
        var bugBtn = new qx.ui.toolbar.Button(this.tr("Report A Bug"), "icon/22/emblems/emblem-important.png");
        bugBtn.setToolTipText(this.tr("Report A Bug"));
        bugBtn.addListener("mouseup", function() {
            window.open("http://code.google.com/p/auroral-resources-toolkit/issues/entry","Report A Bug");
        });
        infoPart.add(bugBtn);

    },


    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct : function() 
    {
        // TBD
    }
});
