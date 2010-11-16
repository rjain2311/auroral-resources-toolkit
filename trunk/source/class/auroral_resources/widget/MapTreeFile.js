/*************************************************************************

Copyright:

License:

Authors:

*************************************************************************/

qx.Class.define("auroral_resources.widget.MapTreeFile",
{
  extend : qx.ui.tree.TreeFile,
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(mapper, baselayer, period, title)
  {
	  this.base(arguments, title);
      this.setDraggable(true);
      this.addListener("dragstart", this._dragStart, this);
      this.addListener("droprequest", this._dropRequest, this);
      this.__mapper = mapper;
      this.__baselayer = baselayer;
      this.__title = title;
      this.__period = period;
      this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
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
      __window : null,
      __title : null,
      __timeBus : null,
      __mapper : null,
      __baseLayer : null,
      __period : null,
      
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
          
      	  this.__window = new auroral_resources.widget.MapWindow(this.__mapper, this.__baselayer, this.__period, this.__title);

          if (type === "widget") {
              result = this.__window;
              e.addData(type, result);
          }
      }
  }

});
