/*************************************************************************

Copyright:

License:

Authors:

*************************************************************************/


qx.Class.define("auroral_resources.widget.TimeSeriesTreeFile",
{

  extend : qx.ui.tree.TreeFile,

  	
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(title)
  {
	  this.base(arguments, title);
      this.setDraggable(true);
      this.addListener("dragstart", this._dragStart, this);
      this.addListener("droprequest", this._dropRequest, this);
      this.__title = title;
      return this;
  },
  

  /*
  *****************************************************************************
  *****************************************************************************
  */
  statics :
  {
      // none yet...
  },
  

  /*
  *****************************************************************************
  *****************************************************************************
  */
  members :
  {
      __window : null,
      __title : null,
      
      //
      //
      //
      _dragStart : function(e) {
          e.addAction("copy");
          e.addAction("move");
          e.addType("widget");
      },
      
      //
      //
      //
      _dropRequest : function(e) {
          var action = e.getCurrentAction();
          var type = e.getCurrentType();
          var result = null;
          
      	  this.__window = new auroral_resources.widget.Window(this.__title);
          
          if (type === "widget") {
              result = this.__window;
              e.addData(type, result);
          }
      }
  }


});
