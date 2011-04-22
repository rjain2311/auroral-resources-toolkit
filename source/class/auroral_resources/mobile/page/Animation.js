//
// AUTHOR(S) OF THIS FILE:
// Peter R. Elespuru - peter.elespuru@noaa.gov

qx.Class.define("auroral_resources.mobile.page.Animation",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("Animation");
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
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
          item.setShowArrow(true);
        }
      });

      var data = [
          {title: "Slide", animation: "slide"},
          {title: "Pop", animation: "pop"},
          {title: "Fade", animation: "fade"},
          {title: "Dissolve", animation: "dissolve"},
          {title: "Slide up", animation: "slideup"},
          {title: "Flip", animation: "flip"},
          {title: "Swap", animation: "swap"},
          {title: "Cube", animation: "cube"}
      ];

      list.setModel(new qx.data.Array(data));
      list.addListener("changeSelection", function(evt) {
        var animation = data[evt.getData()].animation;
        qx.ui.mobile.navigation.Manager.getInstance().executeGet("/animation/" + animation);
      }, this);
      this.getContent().add(list);
    },

    _back : function()
    {
      qx.ui.mobile.navigation.Manager.getInstance().executeGet("/", {reverse:true});
    }
  }
});