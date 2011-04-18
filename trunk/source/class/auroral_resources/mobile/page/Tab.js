qx.Class.define("auroral_resources.mobile.page.Tab",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("Tabs");
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
  },

  members :
  {
    _initialize : function()
    {
      this.base(arguments);
      this.add(this.__createTabBar());
    },

    __createTabBar : function()
    {
      var tabBar = new qx.ui.mobile.tabbar.TabBar();
      var tabButton1 = new qx.ui.mobile.tabbar.TabButton("1");

      tabBar.add(tabButton1);
      tabButton1.setView(this.__createView("View 1"));
      var tabButton2 = new qx.ui.mobile.tabbar.TabButton("2");
      tabButton2.setView(this.__createView("View 2"));
      tabBar.add(tabButton2);
      var tabButton3 = new qx.ui.mobile.tabbar.TabButton("3");
      tabButton3.setView(this.__createView("View 3"));
      tabBar.add(tabButton3);
      var tabButton4 = new qx.ui.mobile.tabbar.TabButton("4");
      tabButton4.setView(this.__createView("View 4"));
      tabBar.add(tabButton4);
      return tabBar;
    },

    __createView : function(text)
    {
      var label = new qx.ui.mobile.basic.Label(text);
      this.getContent().add(label);
      return label;
    },

    _back : function()
    {
      qx.ui.mobile.navigation.Manager.getInstance().executeGet("/", {reverse:true});
    }
  }
});