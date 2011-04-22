/*************************************************************************

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

*************************************************************************/

/* ************************************************************************

#asset(auroral_resources/proj4js-combined.js)
#asset(auroral_resources/proj4js-combined.js.gz)
#asset(auroral_resources/OpenLayers/OpenLayers.js)
#asset(auroral_resources/OpenLayers/OpenLayers.js.gz)
#asset(auroral_resources/OpenLayers/img)
#asset(auroral_resources/OpenLayers/img/*)
#asset(auroral_resources/OpenLayers/theme)
#asset(auroral_resources/OpenLayers/theme/*)
#asset(auroral_resources/OpenLayers/theme/default)
#asset(auroral_resources/OpenLayers/theme/default/*)
#asset(auroral_resources/OpenLayers/theme/default/img)
#asset(auroral_resources/OpenLayers/theme/default/img/*)

************************************************************************ */

qx.Class.define("auroral_resources.widget.MapWindow",
{

    extend : qx.ui.window.Window,

    /*
    *****************************************************************************
        EVENTS
    *****************************************************************************
    */
    events : 
    {
        scriptLoaded: 'qx.event.type.Event'
    },


    /*
    *****************************************************************************
        STATICS
    *****************************************************************************
    */
    statics : 
    {
        //
        // used to account for async loaded dependencies
        //
        LOADED: {},
        LOADING: {},
        
        //
        //
        //
        fromArray : function(argArray) { 
            return new auroral_resources.widget.MapWindow(
                parseInt(decodeURI(argArray[3])), 
                parseInt(decodeURI(argArray[4])), 
                decodeURI(argArray[5]), 
                decodeURI(argArray[6]), 
                decodeURI(argArray[7]), 
                decodeURI(argArray[8]),
                decodeURI(argArray[9])
            );
        }
    },

    
    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(width, height, mapper, baselayer, period, title, mddocname)
    {
        this.base(arguments, title);

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__title = title;
        this.__period = period;
        this.__mddocname = mddocname;
        this.__mapper = mapper;
        
        this.set({
            resizable: false,
            allowGrowX: false,
            allowGrowY: false,
            allowShrinkX: false,
            allowShrinkY: false,
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            status: mapper + ',' + baselayer + ',' + period + ',' + title + ',' + mddocname,
            showClose: true,
            layout: new qx.ui.layout.Grow()
        });

        this.setWidth(width);
        this.setHeight(height);
        this.setContentPadding(0,0,0,0);

        this.add(new qx.ui.basic.Image(qx.util.ResourceManager.getInstance().toUri("auroral_resources/loading_map.png")));

        var olScripts = [
            qx.util.ResourceManager.getInstance().toUri("auroral_resources/proj4js-combined.js.gz"),
            qx.util.ResourceManager.getInstance().toUri("auroral_resources/OpenLayers/OpenLayers.js.gz")
        ];

        // maps currently support either google or openlayers based on what was requested
        // and these callback driven functions are asyncronous
        if(mapper.toString().toLowerCase() == 'openlayers') {
            this._loadScripts(olScripts, qx.lang.Function.bind(this._createOpenLayersMap,this,baselayer,period,this));
        } else if (mapper.toString().toLowerCase() == 'google') {
            this._loadScripts(null,qx.lang.Function.bind(this._createGoogleMap,this,baselayer,this));
        } else if (mapper.toString().toLowerCase() == 'olayerskml') {
            this._loadScripts(olScripts, qx.lang.Function.bind(this._createOpenLayersMapKML,this,baselayer,period,this));
        } else if (mapper.toString().toLowerCase() == 'olayersols') {
            this._loadScripts(olScripts, qx.lang.Function.bind(this._createOpenLayersMapOLS,this,baselayer,period,this));
        } else {
            this._loadScripts(olScripts, qx.lang.Function.bind(this._createOpenLayersMap,this,baselayer,period,this));
        }
        
        this.addListener("close", function(evt) { this.destroy() });
        this.addListener("mouseup", this._rightClick, this);
        
        //this.__timeBus.getBus().subscribe("time.startDate", this._startDateChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.now", this._nowChangeBusCallback, this);
        //this.__timeBus.getBus().subscribe("time.stopDate", this._stopDateChangeBusCallback, this);

        return this;
    },


    /*
    *****************************************************************************
        CLASS VARIABLES AND METHODS
    *****************************************************************************
    */
    members :
    {
        __title : null,
        __timeBus : null,
        __startDate : null,
        __stopDate : null,
        __map : null,
        __ovation : null,
        __ols : null,
        __baseLayer : null,
        __mapper : null,
        __base : null,
        __period : null,
        __now : null,
        __mddocname : null,

        //
        //
        //
        _rightClick : function(evt) { 
            if(evt.isRightPressed()) {
                
                var start = this.__startDate;
                var stop = this.__stopDate;
                var mddoc = this.__mddocname;
                var basename = this.__mapper;
                
                if (mddoc == null || mddoc == '') { 
                    dialog.Dialog.alert("This widget does not have any additional options.");
                    return; 
                }
                
                var popup = new qx.ui.popup.Popup(new qx.ui.layout.VBox()).set({
                     autoHide: true
                });
                
                var data = new qx.ui.form.Button("Download Data");
                data.addListener("click", function(evt) {
                    
                    var dlurl = '';
                    if (basename.toLowerCase() === "openlayers") {
                        dlurl = "http://www.ngdc.noaa.gov/stp/ovation_prime/data/";
                    } else if (basename.toLowerCase() === "olayersols") {
                        dlurl = "http://www.ngdc.noaa.gov/dmsp/";
                    } else {
                        dlurl = "http://spidr.ngdc.noaa.gov/spidr/";
                    }
                    
                    window.open(dlurl,"");
                    popup.hide();
                    
                });
                
                var mdata = new qx.ui.form.Button("View Metadata");
                mdata.addListener("click", function(evt) {
                    var mdurl = "http://spidr.ngdc.noaa.gov/spidrvo/viewdata.do?docname="+mddoc;
                    window.open(mdurl,"");
                    popup.hide();
                });
                
                /*
                var pdf = new qx.ui.form.Button("Download PDF");
                pdf.addListener("click", function(evt) {
                    dialog.Dialog.alert("Coming Soon!");
                    popup.hide();
                });
                
                var svg = new qx.ui.form.Button("Download SVG");
                svg.addListener("click", function(evt) {
                    dialog.Dialog.alert("Coming Soon!");
                    popup.hide();
                });
                */
                
                popup.add(new qx.ui.basic.Label("Additional Options"));
                popup.add(data);
                popup.add(mdata);
                //popup.add(pdf);
                //popup.add(svg);
                popup.placeToMouse(evt);
                popup.show();            
            }
        },

        //
        // callback for the 'startDate' message channel
        //
        _startDateChangeBusCallback : function(e) {
            // these maps are "now" sensitive, but do not need to listen
            // for start/stop updates, unless they pertain to now being outside
            // current range
        },

        //
        // callback for the 'stopDate' message channel
        //
        _stopDateChangeBusCallback : function(e) {
            // these maps are "now" sensitive, but do not need to listen
            // for start/stop updates, unless they pertain to now being outside
            // current range
        },	

        //
        //
        //
        toRadians : function(angle) {
            return Math.PI * angle / 180;
        },
        
        //
        //
        //
        toDegrees : function(angle) {
            return 180 * angle / Math.PI;
        },
        
        //
        //
        //
        SubsolarLat : function(dayofyear) {
            return -23.45 * Math.cos(2 * Math.PI / 365 * (dayofyear + 10));
        },
        
        //
        //
        //
        SubsolarLon : function(hourofday) {
            return (12 - hourofday) / 24 * 360;
        },
        
        //
        //
        //
        getAngle : function() {
            
            var cur = this.__timeBus.getNow();
            cur = Math.ceil(cur/(5000*60))*(5000*60);
            var d = new Date(cur);
            var hr = d.getHours();
            var min = d.getMinutes();
            var mon = d.getMonth() + 1;  //0 indexed
            var day = d.getDate();
            var doy = d.getDOY();
            var hod = hr + min / 60;
            var lat = this.SubsolarLat(doy);
            var lon = this.SubsolarLon(hod);
            var coords = this.GeoToMag(7.3, -114.4, lat, lon);
            var angle = coords[1] + 180;
            
            if (angle > 180) {
                angle = -360 + angle;
            }
            
            return angle;
        },
        
        //
        //
        //
        GeoToMag : function(dLat, dLon, geoLat, geoLon) {
            var dLatR = this.toRadians(dLat);
            var colatGeo = this.toRadians(90 - geoLat);
            var lonGeo = this.toRadians(geoLon);
            var theta = this.toRadians(geoLon - dLon);

            var colatMag = Math.acos(Math.cos(dLatR) * Math.cos(colatGeo)
            + Math.sin(dLatR) * Math.sin(colatGeo) * Math.cos(theta));

            var lonMag = Math.acos((Math.cos(dLatR) * Math.cos(colatMag) - Math
            .cos(colatGeo)) / (Math.sin(dLatR) * Math.sin(colatMag)));

            if (!(lonGeo >= this.toRadians(dLon) && lonGeo <= this.toRadians(180 + dLon))) {
                lonMag = -lonMag;
            }

            var array = new Array(2);
            array[0] = this.toDegrees(Math.PI / 2 - colatMag);
            array[1] = this.toDegrees(lonMag);
            return array;
        },

        //
        // callback for 'now' changes
        //
        _nowChangeBusCallback : function(e) {
            // rotate base layer and get the ovation layer based on current time
            this.__map.removeLayer(this.__baseLayer);
            var layer = this._getOvationBaseLayer(this.getAngle(), this.__base, this.__map, this.__period);
            this.__map.addLayer(layer);
            this.__baseLayer = layer;
            
            if (this.__mapper.toLowerCase() === "openlayers") {
                if (this.__ovation != null) {
                    this.__map.removeLayer(this.__ovation);
                }
                        
                layer = this._getOvationOverlay(this.__map, this.__period);

                if (layer != null) {
                    this.__map.addLayer(layer);
                }

                this.__ovation = layer;
                
            } else if (this.__mapper.toLowerCase() === "olayersols") {
            
                if (this.__ols != null) {
                    this.__map.removeLayer(this.__ols);
                }

                layer = this._getOLSOverlay(this.getAngle(), this.__map);

                if (layer != null) {
                    this.__map.addLayer(layer);
                }

                this.__ols = layer;
            }
        },
        
        
        //
        //
        //
        _getOLSOverlay : function(angle, map) {
            
      	    var layer = new OpenLayers.Layer.TMS(
      	        "DMSP",
      		    "/spidr/servlet/GetDmspTile/F14200310302135.2/north/"+angle+"/", 
      		    { 
      		        type: 'png',
      		        getURL: get_url, 
      		        maxExtent : new OpenLayers.Bounds(-12332000.0,-12332000.0,12332000.0,12332000.0),
      		        maxResolution : 12332000.0 * 2 / 256.0,
      		        isBaseLayer: false, 
      		        displayProjection: new OpenLayers.Projection("EPSG:4326")
      		    }
      	    );
            
            return layer;
            
            function get_url(bounds) {
                var res = map.getResolution();
                var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
                var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
                var z = map.getZoom();
                var path = z + "/" + x + "/" + y;
                var url = this.url;
                if (url instanceof Array) {
                    url = this.selectUrl(path, url);
                }
                return url + path;
            }            
        },

        
        //
        //
        //
        _getOvationOverlay : function(map, period) {
            
            var cur = this.__timeBus.getNow();
            cur = Math.ceil(cur/(5000*60))*(5000*60);
            var d = new Date(cur);
            var hr = d.getHours();
            var yr = d.getFullYear();
            var min = d.getMinutes();
            var mon = d.getMonth() + 1;  //0 indexed
            var day = d.getDate();
            var doy = d.getDOY();
            var hod = hr + min / 60;
            
            var request = new XMLHttpRequest();
            var servletPath = "/spidr/servlet/FileListServlet?year=" + yr + "&month="
                + mon + "&day=" + day + "&hour=" + hr + "&minute=" + min + "&type="
                + period;
                
            request.open("GET", servletPath, false);
            request.send(null);

            // validate response
            if (request.status != 200) {

                var ndmWidth = 512;
                var ndmHeight = 512;

                layer = new OpenLayers.Layer.Image(
                    "",
                    qx.util.ResourceManager.getInstance().toUri("auroral_resources/errorloading_map.png"),
                    map.maxExtent,
                    new OpenLayers.Size(ndmWidth, ndmHeight)
                );

                return layer;
            }

            response = request.responseText;

            var files = response.split('\n');
            var link = "";
            var layer = null;

            if (files != null && files.length != 0 && files[0] != "") {

                var baseUrl = "http://ngdc.noaa.gov/stp/ovation_prime/data/";
                
                link = baseUrl + yr + "/"
                       + (mon > 9 ? mon : ("0" + mon)) + "/"
                       + (day > 9 ? day : ("0" + day)) + "/" + files[0];
                 
                layer = new OpenLayers.Layer.TMS("Ovation", "/spidr/servlet/GetAuroraTile/" + files[0] + "/0/", {
                    type : 'png',
                    getURL : get_url,
                    maxExtent : new OpenLayers.Bounds(-12332000.0, -12332000.0, 12332000.0, 12332000.0),
                    maxResolution : 12332000.0 * 2 / 256.0,
                    isBaseLayer : false,
                    displayProjection : new OpenLayers.Projection("EPSG:4326")
                });

            } else {

                var ndmWidth = 512;
                var ndmHeight = 512;

                layer = new OpenLayers.Layer.Image(
                    "",
                    qx.util.ResourceManager.getInstance().toUri("auroral_resources/nodata_map.png"),
                    map.maxExtent,
                    new OpenLayers.Size(ndmWidth, ndmHeight)
                );

            }
            
            return layer;
            
            function get_url(bounds) {
                var res = map.getResolution();
                var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
                var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
                var z = map.getZoom();
                var path = z + "/" + x + "/" + y;
                var url = this.url;
                if (url instanceof Array) {
                    url = this.selectUrl(path, url);
                }
                return url + path;
            }
        },
        
        
        //
        //
        //
        _getOvationBaseLayer : function(angle, base, map, period) {
            
            // default to daytime, check for NTL
            var resource = "/spidr/servlet/GetPolarTile/Relief/north/";
            if (base.toString().toLowerCase() == 'dmsp') {
                resource = "/spidr/servlet/GetPolarTile_NTL/Relief/north/";
            }
            
            OpenLayers.ProxyHost = "proxy?url=";
            
            Proj4js.defs["EPSG:0"] = "+proj=stere +lat_0=90 +lat_ts=70 +lon_0=" + angle
            + " +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

            this.__baseLayer = new OpenLayers.Layer.TMS("North Relief Polar",
            resource + angle + "/", {
                type : 'png',
                getURL : get_url,
                maxExtent : new OpenLayers.Bounds(-12332000.0, -12332000.0,
                    12332000.0, 12332000.0),
                    maxResolution : 12332000.0 * 2 / 256.0,
                    isBaseLayer : true,
                    projection : "EPSG:0",
                    displayProjection : new OpenLayers.Projection("EPSG:4326")
            });
            
            this.__base = base;
            this.__period = period;
            return this.__baseLayer;
            
            function get_url(bounds) {
                var res = map.getResolution();
                var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
                var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
                var z = map.getZoom();
                var path = z + "/" + x + "/" + y;
                var url = this.url;
                if (url instanceof Array) {
                    url = this.selectUrl(path, url);
                }
                return url + path;
            }            
        },


        //
        //
        //
        _getBlueMarbleBaseLayer : function() {
            var base = new OpenLayers.Layer.WMS(
                "Blue Marble", 
                "http://www.class.ngdc.noaa.gov/geoserver/wms", 
                { layers: 'bluemarble' }
            );
            return base;
        },      


        //
        // generic load scripts function with callbacks
        //
        _loadScripts : function(scripts, handler) {

            var script = scripts.shift();

            if (script) {

                if (auroral_resources.widget.MapWindow.LOADING[script]) {

                    auroral_resources.widget.MapWindow.LOADING[script].addListenerOnce('scriptLoaded',function() {
                        this._loadScripts(scripts, handler);

                    }, this);

                } else if ( auroral_resources.widget.MapWindow.LOADED[script]) {

                    this._loadScripts(scripts, handler);

                } else {

                    auroral_resources.widget.MapWindow.LOADING[script] = this;
                    var sl = new qx.io.ScriptLoader();
                    var src = qx.util.ResourceManager.getInstance().toUri(script);

                    sl.load(src, function(status){

                        if (status == 'success'){
                            this._loadScripts(scripts, handler);
                            auroral_resources.widget.MapWindow.LOADED[script] = true;
                        }

                        auroral_resources.widget.MapWindow.LOADING[script] = null;
                        this.fireDataEvent('scriptLoaded',script);

                    },this);
                }

            } else {
                handler();
            }
        },


        //
        //
        //
        _createOpenLayersMapOLS : function(baselayer, period, self) {

            var isle = new qx.ui.core.Widget().set({
                width: 450,
                height: 400
            });

            isle.addListenerOnce("appear", function() {

                var map = new OpenLayers.Map(
                    isle.getContentElement().getDomElement(),
                    {
                        controls: [
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.PanZoomBar(),
                            new OpenLayers.Control.LayerSwitcher( { 'ascending' : true } ),
                            new OpenLayers.Control.MousePosition( { element : OpenLayers.Util.getElement("mousePos") })
                        ], 
                        displayProjection : new OpenLayers.Projection("EPSG:4326"),
                        units : 'meters',
                        numZoomLevels : 4,
                        zoom: 1
                    }
                );
                
                self.__map = map;

                // add the base layer
                var angle = self.getAngle();
                
                var base = null;
                // use the same relief base layer as ovation
                base = self._getOvationBaseLayer(angle, 'ecs', map, period);
                map.addLayer(base);
                
                self.__ols = self._getOLSOverlay(angle, map);
                if (self.__ols != null) {
                    map.addLayer(self.__ols);
                } 
                    
                map.setCenter(new OpenLayers.LonLat(0.0, 0.0), 1);
            });

            self.removeAll();
            self.add(isle);
        },
        
        
        //
        //
        //
        _createOpenLayersMap : function(baselayer, period, self) {

            var isle = new qx.ui.core.Widget().set({
                width: 450,
                height: 400
            });

            isle.addListenerOnce("appear", function() {
                                                
                var map = new OpenLayers.Map(
                    isle.getContentElement().getDomElement(),
                    {
                        controls: [
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.PanZoomBar(),
                            new OpenLayers.Control.LayerSwitcher( { 'ascending' : true }),
                            new OpenLayers.Control.MousePosition( { element : OpenLayers.Util.getElement("mousePos") })
                        ], 
                        displayProjection : new OpenLayers.Projection("EPSG:4326"),
                        units : 'meters',
                        numZoomLevels : 4,
                        zoom: 2
                    }
                );
                
                self.__map = map;

                // add the base layer
                var angle = self.getAngle();
                
                var base = null;
                if (baselayer.toString().toLowerCase() == 'bluemarble') {
                    base = self._getBlueMarbleBaseLayer();
                    map.addLayer(base);
                } else if (baselayer.toString().toLowerCase() == 'ecs') {
                    base = self._getOvationBaseLayer(angle, 'ecs', map, period);
                    map.addLayer(base);
                    self.__ovation = self._getOvationOverlay(map, period);
                    if (self.__ovation != null) {
                        map.addLayer(self.__ovation);
                    } 
                } else if (baselayer.toString().toLowerCase() == 'dmsp') {
                    base = self._getOvationBaseLayer(angle, 'dmsp', map, period);
                    map.addLayer(base);
                    self.__ovation = self._getOvationOverlay(map, period);
                    if (self.__ovation != null) {
                        map.addLayer(self.__ovation);
                    }
                } else {
                    base = self._getBlueMarbleBaseLayer();
                    map.addLayer(base);
                }
                
                if (baselayer.toString().toLowerCase() == 'ecs' ||
                    baselayer.toString().toLowerCase() == 'dmsp') {
                    map.setCenter(new OpenLayers.LonLat(0.0, 0.0), 2);
                } else {
                    map.zoomToExtent(new OpenLayers.Bounds(-180, -90, 180, 90), true);
                }
            });

            self.removeAll();
            self.add(isle);
        },
        
        
        //
        //
        //
        _createOpenLayersMapKML : function(baselayer, period, self) {

            var isle = new qx.ui.core.Widget().set({
                width: 450,
                height: 400
            });

            isle.addListenerOnce("appear", function() {

                var map = new OpenLayers.Map(
                    isle.getContentElement().getDomElement(),
                    {
                        controls: [
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.PanZoomBar()
                        ], 
                        minExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
                        maxExtent: new OpenLayers.Bounds(-180, -90, 180, 90),
                        displayProjection : new OpenLayers.Projection("EPSG:4326"),
                        units : 'meters',
                        zoom: 2
                    }
                );
                
                // add the base layer
                map.addLayer(self._getBlueMarbleBaseLayer());

                var kml = new OpenLayers.Layer.GML(
                    "KML", 
                    qx.util.ResourceManager.getInstance().toUri("auroral_resources/aurorae.kml"), 
                    {
                        format: OpenLayers.Format.KML,
                        formatOptions: 
                        {  
                            extractStyles: true,
                            extractAttributes: true,
                            maxDepth: 2
                        }
                    }
                );
                
                map.addLayer(kml);

                var selectControl = new OpenLayers.Control.SelectFeature(
                    kml, 
                    {
                        onSelect: onFeatureSelect, 
                        onUnselect: onFeatureUnselect
                    }
                );

                map.addControl(selectControl);
                selectControl.activate();
                map.addControl(new OpenLayers.Control.LayerSwitcher());

                function onFeatureSelect(feature) {
                    selectedFeature = feature;

                    popup = new OpenLayers.Popup.FramedCloud(
                        "metadata",
                        feature.geometry.getBounds().getCenterLonLat(),
                        new OpenLayers.Size(100, 100),
                        feature.attributes.description,
                        null, true, onPopupClose
                    );

                    feature.popup = popup;
                    map.addPopup(popup);
                }

                function onFeatureUnselect(feature) {
                    map.removePopup(feature.popup);
                    feature.popup.destroy();
                    feature.popup = null;
                }

                function onPopupClose(evt) {
                    selectControl.unselect(selectedFeature);
                }
                
                map.zoomToExtent(new OpenLayers.Bounds(-180, -90, 180, 90), true);
            });

            self.removeAll();
            self.add(isle);     
        },


        //
        //
        //
        _createGoogleMap : function(baselayer, self) {
            var isle = new qx.ui.core.Widget().set({
                width: 450,
                height: 400
            });

            //baselayer doesn't really apply to google maps, but we
            //could add it as another layer

            isle.addListenerOnce("appear", function() {
                new google.maps.Map(
                    isle.getContentElement().getDomElement(), 
                    {
                        zoom: 8,
                        center: new google.maps.LatLng(49.011899,8.403311),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                );
            });

            self.removeAll();
            self.add(isle);
        }
    },


    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct : function()
    {
        // TODO: add destructor code...
    }


});
