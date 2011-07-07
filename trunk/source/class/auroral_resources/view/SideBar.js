/* ************************************************************************

COPYRIGHTS:

Copyright (c) 2011, National Geophysical Data Center, NOAA
Copyright (c) 2011, Geophysical Center, Russian Academy of Sciences
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer. Redistributions in binary
form must reproduce the above copyright notice, this list of conditions and
the following disclaimer in the documentation and/or other materials
provided with the distribution. Neither the names of the National Geophysical
Data Center, NOAA and the Geophysical Center, RAS nor the names of their
contributors may be used to endorse or promote products derived from this
software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.

LICENSE:

LGPL: http://www.gnu.org/licenses/lgpl.html
or
EPL: http://www.eclipse.org/org/documents/epl-v10.php

AUTHOR(S) OF THIS FILE:
Peter R. Elespuru - peter.elespuru@noaa.gov

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

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();

        this.__dateFormat = new qx.util.format.DateFormat("MM/dd/yy");
        this.__dateFormatTime = new qx.util.format.DateFormat("MM/dd/yy HH:mm");

        this.__resize = new qx.ui.container.Resizer();
        this.__resize.setLayout(new qx.ui.layout.Grow);
        this.__resize.setDecorator("pane");
        this.__resize.setWidth(100);
        this.__resize.setHeight(50);
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
        var toolLabels = ["Time-Series Data", "Maps and Imagery", "Photos and Videos"];
        for ( var i=0; i < toolLabels.length; i++) {

            var panel = new collapsablepanel.Panel( toolLabels[i] );
            panel.setAppearance( "collapsable-panel" );
            panel.setValue(false);
            panel.setGroup(group);
            panel.setToolTipText("Click to expand this folder and see the items within");
            panels.push(panel);

            // arbitrary sizes, these look decent
            var tree = new qx.ui.tree.Tree().set( { 
                width : 280,
                minWidth : 190,
                maxWidth : 600,
                height : document.body.clientHeight - 450,
                minHeight : 200,
                maxHeight : 1024,
                rootOpenClose: true 
            });

            var root = new auroral_resources.ui.tree.TouchEnabledTreeFolder(toolLabels[i]);

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

        this.__timeBus.getBus().subscribe("time.startDate", this._startDateChangeBusCallback, this);
//        this.__timeBus.getBus().subscribe("time.now", this._nowChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.stopDate", this._stopDateChangeBusCallback, this);

        return this.__resize;
    },


    /*
    *****************************************************************************
        CLASS VARIABLES AND METHODS
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
        __stopChooser : null,
        __dateFormat : null,
        __dateFormatTime : null,
        __testLabel : null,
        __timeBus : null,


        //
        // callback for the 'startDate' message channel
        //
        _startDateChangeBusCallback : function(e) {
        },


        //
        // callback for the 'stopDate' message channel
        //
        _stopDateChangeBusCallback : function(e) {
        },


        //
        // adds all of the items to the collapsable panel(s)
        //
        _addItems : function(index, parent) {

            if (index == 0) {

                var item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Ionosphere");                
                var item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Ionosonde");

                var item3 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("h'F");
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsGA762','iono_hpF.GA762',"Gakona (GA762) h'F {Km}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsSMJ67','iono_hpF.SMJ67',"Sondrestrom (SMJ67) h'F {Km}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsTR170','iono_hpF.TR170',"Tromso (TR170) h'F {Km}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsNO369','iono_hpF.NO369',"Norilsk (NO369) h'F {Km}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsBC840','iono_hpF.BC840',"Boulder (BC840) h'F {Km}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsMW26P','iono_hpF.MW26P',"Mawson (MW26P) h'F {Km}"));
                item2.add(item3);
                item.add(item2);
                parent.add(item);

                item3 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("foF2");
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsGA762','iono_foF2.GA762',"Gakona (GA762) foF2 {MHz}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsSMJ67','iono_foF2.SMJ67',"Sondrestrom (SMJ67) foF2 {MHz}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsTR170','iono_foF2.TR170',"Tromso (TR170) foF2 {MHz}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsNO369','iono_foF2.NO369',"Norilsk (NO369) foF2 {MHz}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsBC840','iono_foF2.BC840',"Boulder (BC840) foF2 {MHz}"));
                item3.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('IonoStationsMW26P','iono_foF2.MW26P',"Mawson (MW26P) foF2 {MHz}"));
                item2.add(item3);
                item.add(item2);
                parent.add(item);

                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("DMSP");
                //item2.add(new auroral_resources.ui.tree.SpectrogramTreeFile("SSJ Spectrogram","#"));
                item2.add(new auroral_resources.ui.tree.JHUAPLTreeFile("SSJ Spectrogram Viewer"));
                item3 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("F16 (2011 Jan.-March)");
                var item4 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("SSJ Precipitating Electrons {keV}");
                item4.add(new auroral_resources.ui.tree.AutoplotTreeFile("Average Energy", "AVG_ENERGY_ELECTRONS"));
                item4.add(new auroral_resources.ui.tree.AutoplotTreeFile("Total Energy Flux", "TOTAL_ENERGY_FLUX_ELECTRONS"));
                item3.add(item4);
                item4 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("SSJ Precipitating Ions {keV}");
                item4.add(new auroral_resources.ui.tree.AutoplotTreeFile("Average Energy", "AVG_ENERGY_IONS"));
                item4.add(new auroral_resources.ui.tree.AutoplotTreeFile("Total Energy Flux", "TOTAL_ENERGY_FLUX_IONS"));
                item3.add(item4);
                item2.add(item3);
                item.add(item2);
                parent.add(item);

                item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Solar Wind");
                item.add(new auroral_resources.ui.tree.ACETimeSeriesTreeFile('','Bmag@ACE.mag_level2_data_1hr','ACE Bmag 1hr lvl2'));
                item.add(new auroral_resources.ui.tree.ACETimeSeriesTreeFile('','Bmag@ACE.mag_level2_data_4min','ACE Bmag 4min lvl2'));
                item.add(new auroral_resources.ui.tree.ACETimeSeriesTreeFile('','Bmag@ACE.mag_level2_data_16sec','ACE Bmag 16sec lvl2'));
                item.add(new auroral_resources.ui.tree.ACETimeSeriesTreeFile('','Bmag@ACE.mag_level2_data_1sec','ACE Bmag 1sec lvl2'));
                item.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('78A5B86C-71AF-3D4D-A054-EE8E765CF8D6','imf_bz.ACE_RT',"ACE-RT Bz {nT}","nT"));
                item.add(new auroral_resources.ui.tree.TimeSeriesTreeFile('78A5B86C-71AF-3D4D-A054-EE8E765CF8D6','vsw_x.ACE_RT',"ACE-RT Flow {Km/s}","Km/s"));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','BX_GSE@CDAS.OMNI_HRO_1MIN','OMNI BX_GSE 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','BY_GSE@CDAS.OMNI_HRO_1MIN','OMNI BY_GSE 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','BZ_GSE@CDAS.OMNI_HRO_1MIN','OMNI BZ_GSE 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','BY_GSM@CDAS.OMNI_HRO_1MIN','OMNI BY_GSM 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','BZ_GSM@CDAS.OMNI_HRO_1MIN','OMNI BZ_GSM 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','flow_speed@CDAS.OMNI_HRO_1MIN','OMNI Flow Spd. 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','Vx@CDAS.OMNI_HRO_1MIN','OMNI Vx 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','Vy@CDAS.OMNI_HRO_1MIN','OMNI Vy 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','Vz@CDAS.OMNI_HRO_1MIN','OMNI Vz 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','proton_density@CDAS.OMNI_HRO_1MIN','OMNI Pr. Dens. 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','T@CDAS.OMNI_HRO_1MIN','OMNI T 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','Pressure@CDAS.OMNI_HRO_1MIN','OMNI Pressure 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','E@CDAS.OMNI_HRO_1MIN','OMNI E 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','Beta@CDAS.OMNI_HRO_1MIN','OMNI Beta 1min'));
                item.add(new auroral_resources.ui.tree.CDAWebTimeSeriesTreeFile('','Mach_num@CDAS.OMNI_HRO_1MIN','OMNI Mach# 1min'));
                item.add(new auroral_resources.ui.tree.ProxiedTimeSeriesTreeFile("http://lasp.colorado.edu/lisird/tss/sorce_tsi_6hr.html","SORCE 6hr TSI {W/m^2}","lasp","lasp24.png"));
                parent.add(item);

                item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Indices");
                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Geomagnetic");
                item2.add(new auroral_resources.ui.tree.TimeSeriesIndexTreeFile('geomInd','index_dstql', "Dst {nT}"));
                item2.add(new auroral_resources.ui.tree.TimeSeriesIndexTreeFile('geomInd','index_kp.est', "Kp"));
                item2.add(new auroral_resources.ui.tree.TimeSeriesIndexTreeFile('geomInd','index_ap', "Ap"));
                item.add(item2);
                parent.add(item);

            } else if (index == 1) {
                
                var item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Ovation Aurora");
                var item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Real-Time (static)");
                item2.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://www.ngdc.noaa.gov/stp/ovation_prime/data/north_nowcast_aacgm.png","Latest Nowcast {Ergs/cm^2/s}"));
                item2.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://www.ngdc.noaa.gov/stp/ovation_prime/data/north_forecast_aacgm.png","Latest Forecast {Ergs/cm^2/s}"));
                item.add(item2);
                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Coastal Relief (interactive)");
                item2.add(new auroral_resources.ui.tree.MapTreeFile('21EFE0E5-C280-9A20-D309-61938C843585','openlayers', 'ECS', 'north_nowcast', "Nowcast {Ergs/cm^2/s}"));
                item2.add(new auroral_resources.ui.tree.MapTreeFile('21EFE0E5-C280-9A20-D309-61938C843585','openlayers', 'ECS', 'north_forecast', "Forecast {Ergs/cm^2/s}"));
                item.add(item2);
                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Nighttime Lights (interactive)");
                item2.add(new auroral_resources.ui.tree.MapTreeFile('21EFE0E5-C280-9A20-D309-61938C843585','openlayers', 'DMSP', 'north_nowcast', "Nowcast {Ergs/cm^2/s}"));
                item2.add(new auroral_resources.ui.tree.MapTreeFile('21EFE0E5-C280-9A20-D309-61938C843585','openlayers', 'DMSP', 'north_forecast', "Forecast {Ergs/cm^2/s}"));
                item.add(item2);
                parent.add(item);
                
                item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Imagery");
                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("SWPC");
                item2.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://www.swpc.noaa.gov/pmap/gif/pmapN.gif","Latest POES Northern Auroral Oval"));
                item2.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://www.swpc.noaa.gov/pmap/gif/pmapS.gif","Latest POES Southern Auroral Oval"));
                item.add(item2);
                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("NASA");
                var item3 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("SOHO");
                item3.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://sohowww.nascom.nasa.gov/data/realtime/mdi_igr/512/latest.jpg","Latest MDI Continuum"));
                item3.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://sohowww.nascom.nasa.gov/data/realtime/mdi_mag/512/latest.jpg","Latest MDI Magnetogram"));
                item3.add(new auroral_resources.ui.tree.ExternalImageTreeFile("http://sohowww.nascom.nasa.gov/data/realtime/eit_304/512/latest.jpg","Latest EIT 304"));
                item2.add(item3);
                item.add(item2);
                parent.add(item);

                item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("*Experimental*");
                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("3D");
                item2.add(new auroral_resources.ui.tree.SceneJSTreeFile("http://scenejs.org/","WebGL Earth,Lights,Clouds"));
                item2.add(new auroral_resources.ui.tree.GoogleEarthTreeFile("Google Earth w/TEC from ES4D"));
                item.add(item2);
                parent.add(item);

            } else if (index == 2) {

                var item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Photos");
                item.add(new auroral_resources.ui.tree.ImageryTreeFile("Chapman2011 Alaska Gallery"));
                item.add(new auroral_resources.ui.tree.FlickrImageTreeFile("Flickr Map Gallery"));
                item.add(new auroral_resources.ui.tree.MapTreeFile('','olayerskml', 'ECS', '', "Solar Storm Watch Map Gallery"));
                parent.add(item);
                
                item = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Videos");

                var item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("YouTube");
                item2.add(new auroral_resources.ui.tree.ExternalVidTreeFile("_Y2gv-MoQx4","Halloween Storm (NASA) 2003"));
                item2.add(new auroral_resources.ui.tree.ExternalVidTreeFile("v/9AoIBt-zgn0","Tromsø Norway 2009"));
                item.add(item2);
                parent.add(item);

                item2 = new auroral_resources.ui.tree.TouchEnabledTreeFolder("Vimeo");
                item2.add(new auroral_resources.ui.tree.VimeoTreeFile(640,385,"Terje Sorgjerd's 'The Aurora'","21294655","terjes"));
                item.add(item2);
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

            var begin = this.__timeBus.getStartDate();
            var cur = this.__timeBus.getNow();
            cur = Math.ceil(cur/(5000*60))*(5000*60);
            var end = this.__timeBus.getStopDate();

            var slider = new qx.ui.form.Slider();
            slider.set({
                minimum: begin,
                maximum: end,
                singleStep: (60 * 5  * 1000), //5 minutes per step
                pageStep:   (60 * 60 * 1000), //1 hr per step
                value: cur
            });

            var calchooseb = new qx.ui.control.DateChooser();
            calchooseb.setFocusable(false);
            calchooseb.setKeepFocus(true);
            calchooseb.addListener("execute", this._startDateChanged, this);
            var cbd = new Date(begin);
            //cbd = new Date(cbd.toUTCString());
            calchooseb.setValue(cbd);
            this.__startChooser = calchooseb;

            var calchoosee = new qx.ui.control.DateChooser();
            calchoosee.setFocusable(false);
            calchoosee.setKeepFocus(true);
            calchoosee.addListener("execute", this._endDateChanged, this);
            var ced = new Date(end);
            // ced = new Date(ced.toUTCString());
            calchoosee.setValue(ced);
            this.__stopChooser = calchoosee;

            var calpopupb = new qx.ui.popup.Popup(new qx.ui.layout.VBox);
            calpopupb.setAutoHide(true);
            calpopupb.addListener("mouseup", this._startDateChanged, this);
            calpopupb.add(calchooseb);
            this.__startPopup = calpopupb;

            var calpopupe = new qx.ui.popup.Popup(new qx.ui.layout.VBox);
            calpopupe.setAutoHide(true);
            calpopupe.addListener("mouseup", this._endDateChanged, this);
            calpopupe.add(calchoosee);
            this.__stopPopup = calpopupe;

            var calb = new qx.ui.basic.Image("resource/auroral_resources/calico16x18.png");
            calb.addListener("click", function(evt) {
                calpopupb.placeToMouse(evt);
                calpopupb.show();
            });
            calb.addListener("mouseover", function() {
                calb.set({cursor: "pointer"});
            });
            calb.addListener("mouseout", function() {
                calb.set({cursor: "default"});
            });

            var cale = new qx.ui.basic.Image("resource/auroral_resources/calico16x18.png");
            cale.addListener("click", function(evt) {
                calpopupe.placeToMouse(evt);
                calpopupe.show();
            });
            cale.addListener("mouseover", function() {
                cale.set({cursor: "pointer"});
            });
            cale.addListener("mouseout", function() {
                cale.set({cursor: "default"});
            });

            //var minn = this._formatMDYtoUTC(new Date(slider.getMinimum()));
            var minn = this._formatMDYtoTime(new Date(slider.getMinimum()));
            //var maxx = this._formatMDYtoUTC(new Date(slider.getMaximum()));
            var maxx = this._formatMDYtoTime(new Date(slider.getMaximum()));
            //var noww = this._formatMDYHMStoUTC(new Date(slider.getValue()));
            var noww = this._formatMDYHMStoTime(new Date(slider.getValue()));

            var group = {
                slider: slider,
                calb: calb,
                cale: cale,
                minimum: new qx.ui.basic.Label(minn),
                maximum: new qx.ui.basic.Label(maxx),
                value: new qx.ui.basic.Label(noww)
            };

            group.slider.setOrientation("horizontal");
            group.value.setWidth(220);
            group.value.setTextAlign("center");
            slider.addListener("changeValue", this._sliderChanged, this);
            slider.addListener("touchmove", this._sliderChanged, this);
            slider.addListener("mouseup", this._sliderChangeDone, this);
            slider.addListener("keyup", this._sliderKeyChangeDone, this);
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
            var cur = this.__sliderGroup.slider.getValue();
            // round up to the nearest 5 min interval
            cur = Math.ceil(cur/(5000*60))*(5000*60);
            var d = new Date(cur);
            
            // has issues with displaying UTC, doing it manually instead...
            //var val = this.__dateFormatTime.format(new Date(cur));
            //var val = this._formatMDYHMStoUTC(d);
            var val = this._formatMDYHMStoTime(d);
            this.__sliderGroup.value.setValue(val);
        },
        
        
        //
        //
        //
        _formatMDYtoUTC : function(d) {
            // manually build the UTC m/d/y hh:mm
            var yr = d.getUTCFullYear();
            yr = yr.toString().substring(2,4); //last 2 only
            
            var mo = d.getUTCMonth() + 1;
            mo = "" + mo;
            if (mo.length == 1 ) { mo = "0" + mo; }
            
            var dy = d.getUTCDate();
            dy = "" + dy;
            if (dy.length == 1) { dy = "0" + dy; }
            
            return mo + '/' + dy + '/' + yr;
        },


        //
        //
        //
        _formatMDYtoTime : function(d) {
            // manually build the UTC m/d/y hh:mm
            var yr = d.getFullYear();
            yr = yr.toString().substring(2,4); //last 2 only
            
            var mo = d.getMonth() + 1;
            mo = "" + mo;
            if (mo.length == 1 ) { mo = "0" + mo; }
            
            var dy = d.getDate();
            dy = "" + dy;
            if (dy.length == 1) { dy = "0" + dy; }
            
            return mo + '/' + dy + '/' + yr;
        },


        //
        //
        //
        _formatMDYHMStoUTC : function(d) {
            // manually build the time m/d/y hh:mm            
            var mo = d.getUTCMonth() + 1;
            mo = "" + mo;
            if (mo.length == 1 ) { mo = "0" + mo; }
            
            var dy = d.getUTCDate();
            dy = "" + dy;
            if (dy.length == 1) { dy = "0" + dy; }
            
            var yr = d.getUTCFullYear();
            yr = yr.toString().substring(2,4); //last 2 only
            
            var hr = d.getUTCHours();
            hr = "" + hr;
            if (hr.length == 1) { hr = "0" + hr; }
            
            var mn = d.getUTCMinutes();
            mn = "" + mn;
            if (mn.length == 1) { mn = "0" + mn; }
            
            return mo + '/' + dy + '/' + yr + ' ' + hr + ':' + mn;
        },


        //
        //
        //
        _formatMDYHMStoTime : function(d) {
            // manually build the time m/d/y hh:mm            
            var mo = d.getMonth() + 1;
            mo = "" + mo;
            if (mo.length == 1 ) { mo = "0" + mo; }
            
            var dy = d.getDate();
            dy = "" + dy;
            if (dy.length == 1) { dy = "0" + dy; }
            
            var yr = d.getFullYear();
            yr = yr.toString().substring(2,4); //last 2 only
            
            var hr = d.getHours();
            hr = "" + hr;
            if (hr.length == 1) { hr = "0" + hr; }
            
            var mn = d.getMinutes();
            mn = "" + mn;
            if (mn.length == 1) { mn = "0" + mn; }
            
            return mo + '/' + dy + '/' + yr + ' ' + hr + ':' + mn;
        },
        
        
        //
        // the slider has been released, publish a message on the bus
        //
        _sliderChangeDone : function(e) {
            this.__timeBus.dispatch(new qx.event.message.Message("time.now", this.__sliderGroup.slider.getValue()));
        },


        //
        // the slider has been moved by keyboard, publish a message on the bus
        //
        _sliderKeyChangeDone : function(e) {
            var key = e.getKeyIdentifier().toLowerCase();
            // if it was left or right arrow only
            if (key == "left" || key == "right") {
                this.__timeBus.dispatch(new qx.event.message.Message("time.now", this.__sliderGroup.slider.getValue()));
            }
        },
        

        //
        // a new start date has been chosen, update label, publish a message on the bus
        //
        _startDateChanged : function(e) {

            var val = this.__startChooser.getValue();
            //var min = Date.UTC(val.getUTCFullYear(),val.getUTCMonth(),val.getUTCDate(),val.getUTCMinutes(),val.getUTCSeconds(),val.getUTCMilliseconds());
            var min = new Date(val.getFullYear(),val.getMonth(),val.getDate(),val.getMinutes(),val.getSeconds(),val.getMilliseconds()).getTime();
            var max = this.__sliderGroup.slider.getMaximum();

            // do nothing if invalid selection
            if (min >= max) {
                dialog.Dialog.error("You attempted to specify a start time greater or equal to your stop time. Try again.");
                this.__startPopup.hide();
                return;
            }

            // 1 month currently
            var delta = max - min;
            var max_range_allowed = (60*60*24*30)*1000;

            if ( delta >= max_range_allowed ) {

                // change the stop time too
                var newStop = min + max_range_allowed;
                this.__timeBus.setStopDate(newStop);
                newStop = new Date(newStop);
                this.__sliderGroup.maximum.setValue(this.__dateFormat.format(newStop));
                this.__stopChooser.setValue(newStop);
                this.__sliderGroup.slider.setMaximum(newStop);

                /* or bomb completely
                var msg = "You're only allowed to display up to a month of data.  Please adjust the time range accordingly.";
                dialog.Dialog.error(msg);
                this.__startPopup.hide();
                return;
                */
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
            //var max = Date.UTC(val.getUTCFullYear(),val.getUTCMonth(),val.getUTCDate(),val.getUTCMinutes(),val.getUTCSeconds(),val.getUTCMilliseconds());
            var max = new Date(val.getFullYear(),val.getMonth(),val.getDate(),val.getMinutes(),val.getSeconds(),val.getMilliseconds()).getTime();

            // do nothing if invalid selection
            if (max <= min) {
                dialog.Dialog.error("You attempted to specify a stop time less than or equal to your start time. Try again.");
                this.__stopPopup.hide();
                return;
            }

            // 1 month currently
            var delta = max - min;
            var max_range_allowed = (60*60*24*30)*1000;

            if ( delta >= max_range_allowed ) {

                // change the start time too
                var newStart = max - max_range_allowed;
                this.__timeBus.setStartDate(newStart);
                newStart = new Date(newStart);
                this.__sliderGroup.minimum.setValue(this.__dateFormat.format(newStart));
                this.__startChooser.setValue(newStart);
                this.__sliderGroup.slider.setMinimum(newStart);

                /* bomb completely
                dialog.Dialog.error("At present you may only view up to a month at a time, please try again, you've attempted to view more than a month");
                this.__startPopup.hide();
                return;
                */
            }

            this.__sliderGroup.slider.setMaximum(max);
            this.__sliderGroup.maximum.setValue(this.__dateFormat.format(this.__stopChooser.getValue()));
            this.__stopPopup.hide();

            this.__timeBus.dispatch(new qx.event.message.Message("time.stopDate", max));
        }

    },


    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct : function()
    {
        this.__resize = null;
        this.__beginDate = null;
        this.__endDate = null;
        this.__sliderGroup = null;
        this.__startPopup = null;
        this.__startChooser = null;
        this.__stopPopup = null;
        this.__stopChooser = null;
        this.__dateFormat = null;
        this.__dateFormatTime = null;
        this.__testLabel = null;
        this.__timeBus = null;
    }


});
