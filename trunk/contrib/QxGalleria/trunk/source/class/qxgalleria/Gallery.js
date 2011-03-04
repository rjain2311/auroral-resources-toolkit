/* ************************************************************************

   Copyright:
     2011 Peter Elespuru, US National Oceanic and Atmospheric Administration (NOAA)
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Peter Elespuru

************************************************************************ */

/* ************************************************************************

#asset(galleria/*)

************************************************************************ */

//
// A qooxdoo wrapper for the Galleria JavsScript Image Gallery Library.
// Only supports the classic theme at the moment, gotta start somewhere...
//
// Uses a loading model derived from the QxDyGraphs widget/contrib
// TODO: add link here
//
qx.Class.define("qxgalleria.Gallery", {
    
    extend : qx.ui.core.Widget,

    //
    //
    //
    construct: function(div, data, options){
        this.base(arguments);
        
        // default version, check for config item
        var ver = '1.2.2';
        /*
        var vername = "qxgalleria.version";
        
        if (qx.core.Variant.isSet(vername)) {
            ver = qx.core.Variant.get(vername);
        }
        
        // default version, check for config item
        */
        var jqver = '1.5.1';
        /*
        var jqvername = "jquery.version";        
        if (qx.core.Variant.isSet(jqvername)) {
            jqver = qx.core.Variant.get(jqvername);
        }
        
        // should use the minified version of the lib ?
        */
        var min = '.min';
        /*
        if (qx.core.Variant.isSet("qx.debug", "on")) {
            min = '';
        }
        */

        // now load all the JS
        var codeArr = [];
        codeArr.push("jquery-"+jqver+min+".js");
        codeArr.push("galleria-"+ver+min+".js");

        this.__loadScriptArr(codeArr,qx.lang.Function.bind(this.__addGallery,this,div,data,options));
    },
    
    //
    //
    //
    statics : { 
        
        LOADED: {},
        LOADING: {}
    },
    
    //
    //
    //
    events : {
        
        // when gallery completes
        galleryCreated: 'qx.event.type.Event',
        
        // when first loaded
        scriptLoaded: 'qx.event.type.Event'
    },
    
    //
    //
    //
    members : {
        
        //
        //
        //
        getGalleryObject: function(){
            return this.__galleryObject;
        },
        
        //
        //
        //
        __loadScriptArr: function(codeArr, handler) {
            
            var script = codeArr.shift();
            
            if (script) {
                
                if (qxgalleria.Gallery.LOADING[script]) {
                    
                    qxgalleria.Gallery.LOADING[script].addListenerOnce('scriptLoaded',
                        function() {
                            this.__loadScriptArr(codeArr,handler); 
                        }, 
                        this
                    );
                } else if ( qxgalleria.Gallery.LOADED[script]){
                    
                     this.__loadScriptArr(codeArr,handler);
                     
                } else {
                    
                    qxgalleria.Gallery.LOADING[script] = this;
                    var sl = new qx.io.ScriptLoader();
                    var src = qx.util.ResourceManager.getInstance().toUri("galleria/"+script);
                    
                    sl.load(src, function(status) {
                        
                        if (status == 'success') {
                            
                            this.__loadScriptArr(codeArr,handler);
                            qxgalleria.Gallery.LOADED[script] = true;
                            
                        }
                        
                        qxgalleria.Gallery.LOADING[script] = null;
                        this.fireDataEvent('scriptLoaded',script);
                        
                    }, this);
                }
            } else {
                handler();
            }
        },
        
        __galleryObject: null,
        
        /**
         * @lint ignoreUndefined(Galleria)
         */
        __addGallery: function(div, data, options){
            
            var el = this.getContentElement().getDomElement();
            
            // are we there yet ?
            if (el == null) {
                
                this.addListenerOnce('appear',qx.lang.Function.bind(this.__addGallery,this,div,data,options),this);
                
            } else {

                // static theme set
                Galleria.loadTheme('resource/galleria/themes/classic/galleria.classic.min.js');
                
                // make it use qx theme fonts
                qx.bom.element.Style.setStyles(
                    this.getContentElement().getDomElement(),
                    qx.theme.manager.Font.getInstance().resolve('default').getStyles(),
                    true
                );

                // build + add
                var gallery = this.__galleryObject = new Galleria();
                gallery.init( div, options );
                gallery.push({image: '/resource/auroral_resources/imagery/Cartin.jpg'});

                /*
                this.addListener('resize',function(e) {
                    qx.html.Element.flush();
                    gallery.fullscreen.scale();
                });
                */
                
                this.fireDataEvent('galleryCreated', gallery);
            }
        }
    }
});
