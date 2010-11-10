/* ************************************************************************

Copyright:

License:

Authors:

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

    var quesLink = new qx.ui.basic.Label().set({
	    value: "<a style='color:white;text-decoration:none;' href='mailto:ionosphere@noaa.gov?Subject=Auroral%20Resources%20Question'>questions: ionosphere@noaa.gov</a>",
	    rich : true
	});
    this.add(quesLink);

  }
});
