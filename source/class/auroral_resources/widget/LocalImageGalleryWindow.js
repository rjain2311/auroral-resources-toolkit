/*************************************************************************

Copyright:

License:

Authors:

*************************************************************************/


qx.Class.define("auroral_resources.widget.LocalImageGalleryWindow",
{

  extend : qx.ui.window.Window,

  	
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(title)
  {
	  this.base(arguments, title);
	  
      this.set({
          allowMaximize: false,
          allowMinimize: false,
          showMaximize: false,
          showMinimize: false,
          showClose: true,
          layout: new qx.ui.layout.Grow()
      });
      
      // hard coded example. need a JSON mapping of what's in the local folder 
      // so it can be randomly walked
      this.add(new qx.ui.basic.Image("resource/auroral_resources/imagery/Milner.jpg"));
      
      return this;
  },
  

  /*
  *****************************************************************************
  *****************************************************************************
  */
  statics :
  {
  },
  

  /*
  *****************************************************************************
  *****************************************************************************
  */
  members :
  {
  }


});
