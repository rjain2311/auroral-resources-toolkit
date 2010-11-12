/* ************************************************************************

Copyright:

License:

Authors:

	Peter Elespuru - peter.elespuru@noaa.gov

************************************************************************ */

/**
 * The Application's SideBar
 */

qx.Class.define("auroral_resources.view.SideBar",
{
	
  extend : qx.ui.container.Resizer,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(app, workArea)
  {
	  this.base(arguments);
	
	  this.__dateFormat = new qx.util.format.DateFormat("MM/dd/yy");
	  this.__dateFormatTime = new qx.util.format.DateFormat("MM/dd/yy hh:mm");
	
	  this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
	
	  this.__resize = new qx.ui.container.Resizer();
	  this.__resize.setLayout(new qx.ui.layout.Grow);
      this.__resize.setDecorator("pane");
      this.__resize.setWidth(100);
      this.__resize.setHeight(100);
      this.__resize.setPadding(5);
      this.__resize.setBackgroundColor("gray");
	
	  var panels = [];
      var group = new qx.ui.form.RadioGroup();
      group.setAllowEmptySelection(true);

      var scroll = new qx.ui.container.Scroll();
      this.__resize.add(scroll);

      var vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10, null));
      vbox.set({
        decorator: "main",
        allowGrowY: false
      });
      vbox.setPadding(10);
      scroll.add(vbox);

      var timeLabel = new qx.ui.basic.Label().set({
	    value: app.tr("Active Time Range"),
	    rich : true,
	    alignX: "center"
      });
      vbox.add(timeLabel);
	
	  this.__beginDate = this._getDateTimeSlider();
	  vbox.add(this.__beginDate);
	
      var labelSource = new qx.ui.basic.Label().set({
	    value: app.tr("Available Resources"),
	    rich : true,
	    alignX: "center"
      });
      vbox.add(labelSource);

      // tool label and class index must match up 1-1 for the
      // introspective constructor call to work later in this block
      var toolLabels = ["Time-Series Data", "Maps and Overlays", "Imagery"];
      for ( var i=0; i < toolLabels.length; i++) {
	
	    var panel = new collapsablepanel.Panel( toolLabels[i] );
	    panel.setAppearance( "collapsable-panel" );
	    panel.setValue(false);
	    panel.setGroup(group);
	    panels.push(panel);
	    
        var tree = new qx.ui.tree.Tree().set({ width : 350, height : 400 });
   	    var root = new qx.ui.tree.TreeFolder(toolLabels[i]);

		root.setOpen(true);
		tree.setRoot(root);
		tree.setOpenMode("dblclick");
		tree.setHideRoot(1);

        // introspect the construction
        this._addItems(i, root);

        panel.add(tree);
        vbox.add(panel);
        panel.setValue(false);
      }

/* example for subsribing to now time component on the bus

      this.__testLabel = new qx.ui.basic.Label().set({
	    value: "ladadoo",
	    rich : true,
	    alignX: "center"
      });
      vbox.add(this.__testLabel);
	  this.__timeBus.subscribe("time.now", this._nowChangeBusCallback, this);
*/

      return this.__resize;
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
	__resize : null,
	__beginDate : null,
	__endDate : null,
	__sliderGroup : null,
	__startPopup : null,
	__startChooser : null,
	__stopPopup : null,
	__stopChooser: null,
    __dateFormat : null,
    __dateFormatTime : null,
    __testLabel : null,
	__timeBus : null,

	//
	// callback for the 'now' message channel
	//
/*
	_nowChangeBusCallback : function(e) {
		this.__testLabel.setValue(e.getData());
	},
*/

    //
    //
    //
    _addItems : function(index, parent) {
        
        if (index == 0) {
            var iono = new qx.ui.tree.TreeFolder("Ionosphere");
            var item = new qx.ui.tree.TreeFolder("foF2");            
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Gakona (GA762) foF2"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Sondrestrom (SMJ67) foF2"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Tromso (TR170) foF2"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Norilsk (NO369) foF2"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Boulder (BC840) foF2"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Mawson (MW26P) foF2"));
            iono.add(item);
            item = new qx.ui.tree.TreeFolder("h'F");
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Gakona (GA762) h'F"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Sondrestrom (SMJ67) h'F"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Tromso (TR170) h'F"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Norilsk (NO369) h'F"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Boulder (BC840) h'F"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("Mawson (MW26P) h'F"));
            iono.add(item);
            parent.add(iono);
            
            item = new qx.ui.tree.TreeFolder("Solar");
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("ACE Bz"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("ACE Flow"));
            item.add(new auroral_resources.widget.TimeSeriesTreeFile("F10.7"));
            parent.add(item);
            
            item = new qx.ui.tree.TreeFolder("Geomagnetic Indices");
            item.add(new auroral_resources.widget.HistogramTreeFile("Dst"));
            item.add(new auroral_resources.widget.HistogramTreeFile("Kp"));
            item.add(new auroral_resources.widget.HistogramTreeFile("Ap"));
            parent.add(item);
            
        } else if (index == 1) {
            var item = new qx.ui.tree.TreeFolder("Daytime");
            item.add(new auroral_resources.widget.MapTreeFile("ECS + Ovation"));
            item.add(new auroral_resources.widget.MapTreeFile("Blue Marble + Ovation"));
            parent.add(item);
            
            item = new qx.ui.tree.TreeFolder("Nighttime");
            item.add(new auroral_resources.widget.MapTreeFile("DMSP + Ovation"));
            parent.add(item);
            
        } else if (index == 2) {
            var item = new qx.ui.tree.TreeFolder("Aurorae");
            item.add(new auroral_resources.widget.ImageryTreeFile("Hand Picked Gallery"));
            item.add(new auroral_resources.widget.ImageryTreeFile("Flickr Gallery"));
            parent.add(item);
            
        } else {
            // unknown index
        }
    },


	//
	// builds the custom time/date control widget
	// TODO: break this out into its own widget class ASAP
	//
	_getDateTimeSlider : function() {
	
		var grid = new qx.ui.layout.Grid();
		grid.setSpacing(5);
        grid.setColumnFlex(0, 1);
        grid.setColumnFlex(1, 1);
        grid.setColumnFlex(2, 1);
        grid.setColumnFlex(3, 1);
        grid.setColumnFlex(4, 1);
        grid.setColumnAlign(0, "left", "bottom");
        grid.setColumnAlign(1, "left", "bottom");
        grid.setColumnAlign(2, "center", "bottom");
        grid.setColumnAlign(3, "right", "bottom");
        grid.setColumnAlign(4, "right", "bottom");

        var container = new qx.ui.container.Composite(grid);
	 	container.setPadding(1);
	    container.setWidth(280);
	    container.setHeight(60); 

		var begin = qx.lang.Date.now();
		begin -= (((86400) * 7) * 1000); //one week of millis
		var end = qx.lang.Date.now();
		var cur = end - (((86400) * 3.5) * 1000); //half a week of millis

		var slider = new qx.ui.form.Slider();
  	    slider.set({
	    	minimum: begin,
            maximum: end,
		    singleStep: (60 * 1000),
            pageStep: (3600 * 1000),
            value: cur
		});

		var calchooseb = new qx.ui.control.DateChooser();
        calchooseb.setFocusable(false);
        calchooseb.setKeepFocus(true);
        calchooseb.addListener("execute", this._startDateChanged, this);
		calchooseb.setValue(new Date(begin));
		this.__startChooser = calchooseb;

		var calchoosee = new qx.ui.control.DateChooser();
        calchoosee.setFocusable(false);
        calchoosee.setKeepFocus(true);
        calchoosee.addListener("execute", this._endDateChanged, this);
		calchoosee.setValue(new Date(end));
		this.__stopChooser = calchoosee;
		
		var calpopupb = new qx.ui.popup.Popup(new qx.ui.layout.VBox);
		calpopupb.setAutoHide(false);
        calpopupb.addListener("mouseup", this._startDateChanged, this);
        calpopupb.add(calchooseb);
		this.__startPopup = calpopupb;

		var calpopupe = new qx.ui.popup.Popup(new qx.ui.layout.VBox);
		calpopupe.setAutoHide(false);
        calpopupe.addListener("mouseup", this._endDateChanged, this);
        calpopupe.add(calchoosee);
		this.__stopPopup = calpopupe;
		
		var calb = new qx.ui.basic.Image("resource/auroral_resources/calico16x18.png");
	    calb.addListener("mouseup", function() {
			calpopupb.show();
	    });
	    calb.addListener("mouseover", function() {
			calb.set({cursor: "pointer"});
	    });
	    calb.addListener("mouseout", function() {
			calb.set({cursor: "default"});
	    });
	    
		var cale = new qx.ui.basic.Image("resource/auroral_resources/calico16x18.png");
	    cale.addListener("mouseup", function() {
			calpopupe.show();
	    });
	    cale.addListener("mouseover", function() {
			cale.set({cursor: "pointer"});
	    });
	    cale.addListener("mouseout", function() {
			cale.set({cursor: "default"});
	    });

		var group = {
			slider: slider,
			calb: calb,
			cale: cale,
		    minimum: new qx.ui.basic.Label(this.__dateFormat.format(new Date(slider.getMinimum()))),
		    maximum: new qx.ui.basic.Label(this.__dateFormat.format(new Date(slider.getMaximum()))),
		    value: new qx.ui.basic.Label(this.__dateFormatTime.format(new Date(slider.getValue())))
		};
		
		group.slider.setOrientation("horizontal");
	    group.value.setWidth(100);
        group.value.setTextAlign("center");
      	slider.addListener("changeValue", this._sliderChanged, this);
      	slider.addListener("mouseup", this._sliderChangeDone, this);
		this.__sliderGroup = group;

        container.add(group.value, {row: 0, column: 1, colSpan: 3});
        container.add(group.calb, {row: 1, column: 0});
        container.add(group.slider, {row: 1, column: 1, colSpan: 3, rowSpan: 1});
        container.add(group.cale, {row: 1, column: 4});
        container.add(group.minimum, {row: 2, column: 0, colSpan: 2});
        container.add(group.maximum, {row: 2, column: 3, colSpan: 2});

        grid.setRowHeight(0, 20);
        grid.setRowHeight(1, 20);
        grid.setRowHeight(2, 20);
	
		return container;
	},


	//
	// the slider is in the process of being dragged, only update the label
	//
	_sliderChanged : function(e) {
        this.__sliderGroup.value.setValue(this.__dateFormatTime.format(new Date(this.__sliderGroup.slider.getValue())));
	},


	//
	// the slider has been released, publish a message on the bus
	//
	_sliderChangeDone : function(e) {
		this.__timeBus.dispatch(new qx.event.message.Message("time.now",this.__sliderGroup.slider.getValue()));
	},

	
	//
	// a new start date has been chosen, update label, publish a message on the bus
	//
	_startDateChanged : function(e) {

        var val = this.__startChooser.getValue();
		var min = Date.UTC(val.getFullYear(),val.getMonth(),val.getDate(),val.getMinutes(),val.getSeconds(),val.getMilliseconds());
		var max = this.__sliderGroup.slider.getMaximum();

		// do nothing if invalid selection
		if (min >= max) {
			alert("ERROR: you attempted to specify a start time greater or equal to your stop time");
			this.__startPopup.hide();
			return;
		}

		this.__sliderGroup.slider.setMinimum(min);
		this.__sliderGroup.minimum.setValue(this.__dateFormat.format(this.__startChooser.getValue()));
		this.__startPopup.hide();
		
		this.__timeBus.dispatch(new qx.event.message.Message("time.startDate", min));
    },


	//
	// a new stop date has been chosen, update label, publish a message on the bus
	//
	_endDateChanged : function(e) {
		
        var val = this.__stopChooser.getValue();
		var min = this.__sliderGroup.slider.getMinimum();
		var max = Date.UTC(val.getFullYear(),val.getMonth(),val.getDate(),val.getMinutes(),val.getSeconds(),val.getMilliseconds());

		// do nothing if invalid selection
		if (max <= min) {
			alert("ERROR: you attempted to specify a stop time less than or equal to your start time");
			this.__stopPopup.hide();
			return;
		}
		
		this.__sliderGroup.slider.setMaximum(max);
		this.__sliderGroup.maximum.setValue(this.__dateFormat.format(this.__stopChooser.getValue()));
		this.__stopPopup.hide();
		
		this.__timeBus.dispatch(new qx.event.message.Message("time.stopDate", max));
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
