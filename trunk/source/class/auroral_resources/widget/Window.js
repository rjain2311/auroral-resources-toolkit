/*************************************************************************

Copyright:

License:

Authors:

*************************************************************************/


qx.Class.define("auroral_resources.widget.Window",
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
	  
	  var winWidth = 600;
	  
      this.set({
          width: winWidth,
          height: 400,
          allowMaximize: false,
          allowMinimize: false,
          showMaximize: false,
          showMinimize: false,
          showClose: true,
          layout: new qx.ui.layout.Basic()
      });
      
      var xOffset = 0; //((winWidth/2)/2) - 10;
      var buttonWidth = 75;
      var buttonHeight = 10;

      var dataButton = new qx.ui.form.Button("Get Data");
      dataButton.setHeight(buttonHeight);
      dataButton.setWidth(buttonWidth);

      var metaDataButton = new qx.ui.form.Button("Get Meta");
      metaDataButton.setHeight(buttonHeight);
      metaDataButton.setWidth(buttonWidth);
      
      this.add(dataButton, {left: xOffset, top: 0});
      this.add(metaDataButton, {left: buttonWidth + 5, top: 0});
      
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
