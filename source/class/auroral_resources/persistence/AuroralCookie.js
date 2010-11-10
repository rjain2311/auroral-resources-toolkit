/* ************************************************************************

Copyright:

License:

Authors:

************************************************************************ */

/*
*****************************************************************************
* Wraps qx.bom.Cookie to include some additional NGDC specific bits, mainly
* the key name
*****************************************************************************
*/
qx.Class.define("auroral_resources.persistence.AuroralCookie",
{
	
  statics :
  {
    __key : "NGDC_auroral_resources"
  },


  /*
  *****************************************************************************
  *****************************************************************************
  */
  members :
  {

	//
	//
	//
  	set : function(key, value) {
		qx.bom.Cookie.set(this.__key + '.' + key, value);
  	},


	//
	//
	//
	get : function(key) {
		return qx.bom.Cookie.get(this.__key + '.' + key);
	}
  },


  /*
  *****************************************************************************
  *****************************************************************************
  */
  destruct : function()
  {
	// TODO: add destructor code...
  }


});
