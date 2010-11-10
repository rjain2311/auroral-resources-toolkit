/* ************************************************************************

Copyright:

License:

Authors:

************************************************************************ */

/*
*****************************************************************************
*****************************************************************************
*/
qx.Class.define("auroral_resources.widget.IntroductionWindow",
{

  extend : qx.ui.window.Window,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(title)
  {
	// proceed with normal instantiation
	this.base(arguments, title);
	
	this.set({
	    caption: "Introduction", //ignore any passed in title/caption
    	width: 640,
    	height: 480,
    	padding: 10,
   	 	shadow: true,
        allowMaximize: false,
        allowMinimize: false,
    	showMaximize: false,
    	showMinimize: false,
    	showClose: true,
    	layout: new qx.ui.layout.VBox(10)
	});
	/*
	// add introductory text here 
    var req = new qx.io.remote.Request(
		"resource/auroral_resources/static/html/IntroductionWindow.html",
		"GET",
		"text/html"
	);

	// ensure this content is grabbed fresh
	req.setProhibitCaching(false);
	req.addListener("completed", this._onIntroRequestComplete, this);
	req.send();

	// populate the initial content so something is there until the AJAX response comes back
	this.__html = "<h2>Loading...</h2>";
    this.__content = new qx.ui.embed.Html(this.__html);
	this.__content.setOverflow("auto", "auto");
    this.__content.setDecorator("main");
    this.__content.setBackgroundColor("white"); 
	this.__content.setWidth(640);
	this.__content.setHeight(430);
	this.add(this.__content);
	
	// add the hide me button
	var hideMe = new qx.ui.form.Button("Close, and don't show me this window again");
	hideMe.setWidth(150);
	
	// and it's clicked listener
	hideMe.addListener("click", this._setCookie, this);
	
	// add it to the mix
	this.add(hideMe);
	*/
	
	return this;
  }, 


  /*
  *****************************************************************************
  *****************************************************************************
  */
  members :
  {
	
    __html : null,
    __content : null,
	
	//
	//
	//
	_onIntroRequestComplete : function(result) {
		this.__html = result.getContent();
		this.remove(this.__content);
	    this.__content = new qx.ui.embed.Html(this.__html);
		this.__content.setOverflow("auto", "auto");
	    this.__content.setDecorator("main");
	    this.__content.setBackgroundColor("white"); 
		this.__content.setWidth(640);
		this.__content.setHeight(430);
		this.add(this.__content);
	},
	
	//
	//
	//
	_setCookie : function() {
		
		qx.bom.Cookie.set("NGDC.AR.intro", "ignore", 100000, null, null, null);
		this.close();
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
