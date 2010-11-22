/*************************************************************************

COPYRIGHTS:

Copyright (c) 2010, National Geophysical Data Center, NOAA
Copyright (c) 2010, Geophysical Center, Russian Academy of Sciences
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

AUTHORS:

Peter Elespuru - peter.elespuru@noaa.gov
Dmitry Medvedev - dmedv@wdcb.ru
Mikhail Zhizhin - jjn@wdcb.ru
Rob Redmon - rob.redmon@noaa.gov

*************************************************************************/


qx.Class.define("auroral_resources.widget.MapWindow",
{

    extend : qx.ui.window.Window,


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function(mapper, baselayer, period, title)
    {
        this.base(arguments, title);

        var winWidth = 600;

        this.__timeBus = auroral_resources.messaging.TimeBus.getInstance();
        this.__title = title;

        this.set({
            width: winWidth,
            height: 400,
            allowMaximize: false,
            allowMinimize: false,
            showMaximize: false,
            showMinimize: false,
            showClose: true,
            layout: new qx.ui.layout.Grow()
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

        //      this.add(dataButton, {left: xOffset, top: 0});
        //      this.add(metaDataButton, {left: buttonWidth + 5, top: 0});

        // maps currently support either google or openlayers based on what was requested
        if(mapper.toString().toLowerCase() == 'openlayers') {
            this.add(this._createOpenLayersMap(baselayer, period, this));
        } else if (mapper.toString().toLowerCase() == 'google') {
            this.add(this._createGoogleMap(baselayer, period, this));
        } else if (mapper.toString().toLowerCase() == 'olayerskml') {
            this.add(this._createOpenLayersMapKML(baselayer, period, this));
        } else {
            this.add(this._createOpenLayersMap(baselayer, period, this));
        }

        this.__timeBus.getBus().subscribe("time.startDate", this._startDateChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.now", this._nowChangeBusCallback, this);
        this.__timeBus.getBus().subscribe("time.stopDate", this._stopDateChangeBusCallback, this);

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
        __now : null,

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
        // callback for 'now' changes
        //
        _nowChangeBusCallback : function(e) {
        },

        //
        //
        //
        _getECSBaseLayer : function() {
            /*
            var angle = 0;
            Proj4js.defs["EPSG:0"] = "+proj=stere +lat_0=90 +lat_ts=70 +lon_0=" + angle
              + " +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

            var layer = new OpenLayers.Layer.TMS("Relief Polar N",
                      SITE.resource_prefix + angle + "/", {
                    type : 'png',
                    getURL : get_my_url,
                    maxExtent : new OpenLayers.Bounds(-12332000.0, -12332000.0,
                        12332000.0, 12332000.0),
                    maxResolution : 12332000.0 * 2 / 256.0,
                    isBaseLayer : true,
                    projection : "EPSG:0",
                    displayProjection : new OpenLayers.Projection("EPSG:4326")
                  });
              SITE.map.addLayer(SITE.tms);
            }
            */

        },

        //
        //
        //
        _getBlueMarbleBaseLayer : function() {
            var base = new OpenLayers.Layer.WMS(
                "GVAR", 
                "http://www.class.ngdc.noaa.gov/geoserver/wms", 
                { layers: 'bluemarble' }/*,
                { eventListeners: { "loadend": hideBaseLoading }} */ 
            );
            return base;
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
                var base = null;
                if (baselayer.toString().toLowerCase() == 'bluemarble') {
                    base = self._getBlueMarbleBaseLayer();
                } else if (baselayer.toString().toLowerCase() == 'ecs') {
                    base = self._getBlueMarbleBaseLayer();
                    //base = self._getECSBaseLayer();
                } else if (baselayer.toString().toLowerCase() == 'dmsp') {
                    base = self._getBlueMarbleBaseLayer();
                    //base = self._getDMSPBaseLayer();
                } else {
                    base = self._getBlueMarbleBaseLayer();
                }
                map.addLayer(base);

                // add the ovation layer
                var ovation = null;
                
                map.zoomToExtent(new OpenLayers.Bounds(-180, -90, 180, 90), true);
            });

            return isle;          
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
                var base = null;
                if (baselayer.toString().toLowerCase() == 'bluemarble') {
                    base = self._getBlueMarbleBaseLayer();
                } else if (baselayer.toString().toLowerCase() == 'ecs') {
                    base = self._getBlueMarbleBaseLayer();
                    //base = self._getECSBaseLayer();
                } else if (baselayer.toString().toLowerCase() == 'dmsp') {
                    base = self._getBlueMarbleBaseLayer();
                    //base = self._getDMSPBaseLayer();
                } else {
                    base = self._getBlueMarbleBaseLayer();
                }
                map.addLayer(base);

                var kml = new OpenLayers.Layer.GML(
                    "KML", 
                    "resource/auroral_resources/images.kml", 
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

            return isle;          
        },

        //
        //
        //
        _createGoogleMap : function(baselayer) {
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

            return isle;
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
