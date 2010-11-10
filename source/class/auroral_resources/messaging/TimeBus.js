/*************************************************************************

Copyright:

License:

Authors:

*************************************************************************/

qx.Class.define("auroral_resources.messaging.TimeBus",
{
	
  //
  // This class is largely a placeholder if/when we need more
  // functionality boiled into the messaging bus for unified time.
  // It implements the singleton design pattern.
  //
  type: "singleton",
  extend : qx.core.Object,
  	
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function()
  {
	  this.base(arguments);
	  this.__bus = qx.event.message.Bus;
	  return this.__bus;
  },


  /*
  *****************************************************************************
  *****************************************************************************
  */
  members :
  {
      __bus : null,
	
	  //
	  // wraps the get instance and dispatch into a convenience function
	  //
	  dispatch : function(msg) {
	      this.__bus.getInstance().dispatch(msg);
	  }
  }

});
