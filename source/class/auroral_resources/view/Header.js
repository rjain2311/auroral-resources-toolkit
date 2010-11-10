/* ************************************************************************

Copyright:

License:

Authors:

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

    // add the logo
    var logo = new qx.ui.basic.Image("resource/auroral_resources/ngdclogo.png");
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
    /* I don't like the way this gets stretched right now, nor in general. revisit later
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
