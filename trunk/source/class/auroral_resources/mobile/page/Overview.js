//
// AUTHOR(S) OF THIS FILE:
// Peter R. Elespuru - peter.elespuru@noaa.gov

qx.Class.define("auroral_resources.mobile.page.Overview",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("Mobile Edition");
  },

  events :
  {
    "show" : "qx.event.type.Data"
  },

  members :
  {
    _initialize : function()
    {
      this.base(arguments);

      var list = new qx.ui.mobile.list.List({
        configureItem : function(item, data, row)
        {
          item.setTitle(data.title);
          item.setSubTitle(data.subTitle);
          item.setShowArrow(true);
        }
      });

      this.getContent().add(new qx.ui.mobile.basic.Image("resource/auroral_resources/logo.png"));

      var data = [
          {title : "Form Elements", subTitle : "TextField, TextArea, ToggleButton, Button...", path:"form"},
          {title : "List", subTitle : "A large list", path:"list"},
          {title : "Tab Bar", subTitle : "Usings tabs to switch views", path:"tab"},
          {title : "Events", subTitle : "Touch, Tap, Swipe...", path:"event"},
          {title : "Page Transitions", subTitle : "Slide, Fade, Cube...", path:"animation"}
      ];

      list.setModel(new qx.data.Array(data));

      list.addListener("changeSelection", function(evt) {
        var path = data[evt.getData()].path;
        qx.ui.mobile.navigation.Manager.getInstance().executeGet("/"+path);
      }, this);

      this.getContent().add(list);
    }
  }
});