/* ************************************************************************

Copyright:

License:

Authors:

************************************************************************ */

/* ************************************************************************

#asset(qx/icon/Tango/22/actions/dialog-ok.png)
#asset(qx/icon/Tango/22/actions/dialog-cancel.png)
#asset(qx/icon/Tango/22/actions/view-refresh.png)
#asset(qx/icon/Tango/22/apps/preferences-theme.png)
#asset(qx/icon/Tango/22/actions/help-about.png)

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
   * @param controller {auroral_resources.Application} The main application class
   */
  construct : function(controller)
  {
    this.base(arguments);

    var mainPart = new qx.ui.toolbar.Part;
    this.add(mainPart);

    // Preferences button
    var prefBtn = new qx.ui.toolbar.Button(this.tr("Preferences"), "icon/22/apps/preferences-theme.png");
    prefBtn.setToolTipText(this.tr("Open Preferences Window."));
    mainPart.add(prefBtn);

    // Add a sepearator
    mainPart.addSeparator();

    // Add a spacer
    this.addSpacer();

    // Info part
    var infoPart = new qx.ui.toolbar.Part;
    this.add(infoPart);

    // Help button
    var aboutBtn = new qx.ui.toolbar.Button(this.tr("Help"), "icon/22/actions/help-about.png");
    aboutBtn.setToolTipText(this.tr("Help"));
    infoPart.add(aboutBtn);
  },


  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

  destruct : function() {
	// TBD
  }
});
