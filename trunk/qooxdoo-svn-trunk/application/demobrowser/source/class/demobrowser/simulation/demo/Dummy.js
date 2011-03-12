qx.Class.define("demobrowser.simulation.demo.Dummy", {

  extend : demobrowser.simulation.demo.Abstract,
  
  members :
  {
    __demoList : null,
    /** 
     * List of demos that must not be loaded.
     * The iframe demos somehow confuse Selenium: selenium.browserbot is a 
     * reference to the HTML iframe element after they're loaded.
     **/
    __ignoredDemos : ["bom.Iframe", "showcase.Browser", "widget.Iframe"],
    
    //overridden
    setUp : function() {
      if (!this.__demoList) {
        this.__demoList = this._getDemoList();
        this._removeDemosWithTests();
        this._removeIgnoredDemos();
      }
    },
    
    //overridden
    tearDown : function() {
    
    },
    
    
    /**
     * Looks at the demo tree items' labels to get a list of category/demo names 
     * 
     * @return {String[]} List of demos (format: categoryName.demoName)
     */
    _getDemoList : function()
    {
      var getDemoNames = function() {
        var items = selenium.qxStoredVars['autWindow'].qx.core.Init.getApplication().viewer.tree.getItems();
        var demos = [];
        var category = "";
        for (var i=0,l=items.length; i<l; i++) {
          var label = items[i].getLabel();
          if (label[0] === label[0].toLowerCase()) {
            category = label;
          }
          else if (label !== "Demos") {
            demos.push(category + "." + label.replace(/\ /, "_"));
          }
        }
        return demos.join("|");
      }
      
      this.getSimulation()._addOwnFunction("getDemoNames", getDemoNames);
      var demos = String(this.getQxSelenium().getEval(simulator.Simulation.AUTWINDOW + ".qx.Simulation.getDemoNames()"));
      return demos.split("|");
    },
    
    
    /**
     * Removes the names of all demos that have custom test classes from the 
     * list 
     */
    _removeDemosWithTests : function()
    {
      var demoList = this.__demoList.concat();
      for (var i=0,l=this.__demoList.length; i<l; i++) {
        var testClass = "demobrowser.simulation.demo." + this.__demoList[i];
        if (String(qx.Class.getByName(testClass)) !== "undefined") {
          qx.lang.Array.remove(demoList, this.__demoList[i]);
        }
      }
      this.__demoList = demoList;
    },
    
    
    /**
     * Removes all demos in the ignore list from the list of demos to be tested
     */
    _removeIgnoredDemos : function()
    {
      for (var i=0,l=this.__ignoredDemos.length; i<l; i++) {
        qx.lang.Array.remove(this.__demoList, this.__ignoredDemos[i]);
      }
    },
    
    
    //overridden
    loadDemo : function(demoName) {
      var hash = demoName.replace(/\./, "~") + ".html";
      
      var fullUrl = qx.core.Setting.get("simulator.autHost") 
      + qx.core.Setting.get("simulator.autPath") + "#" + hash;
      this.getSimulation().qxOpen(fullUrl);
      this.getSimulation().waitForQxApplication(10000, this.demoWindow);
      this.getSimulation()._prepareNameSpace(this.demoWindow);
      this.demoName = demoName;
    },
    
    
    /**
     * Loads each demo in the list and logs any errors/warnings found in the
     * demo application's log or caught by the global error handler
     */
    testDummy : function()
    {
      for (var i=0,l=this.__demoList.length; i<l; i++) {
        this.info("Loading Demo " + this.__demoList[i]);
        try {
          this.loadDemo(this.__demoList[i]);
          this.prepareDemo();
          this.getSimulation().wait(2000);
          this.logAutLog();
          this.getSimulation().throwGlobalErrors(this.demoWindow);
        }
        catch(ex) {
          this.error(this.__demoList[i], ex);
        }
      }
    }
  }
});