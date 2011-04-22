//
// AUTHOR(S) OF THIS FILE:
// Peter R. Elespuru - peter.elespuru@noaa.gov

/* ************************************************************************

#asset(qx/icon/Tango/22/apps/internet-mail.png)

************************************************************************ */

qx.Class.define("auroral_resources.mobile.page.List",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("List");
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
          item.setImage("qx/icon/Tango/22/apps/internet-mail.png");
          item.setTitle(row<4 ? ("Selectable " + data.title) : data.title);
          item.setSubTitle(data.subTitle);
          item.setSelectable(row<4);
          item.setShowArrow(row<4);
        }
      });

      var data = [];
      for (var i=0; i < 100; i++) {
        data.push({title:"Item" + i, subTitle:"Subtitle for Item #" + i});
      }

      list.setModel(new qx.data.Array(data));
      list.addListener("changeSelection", function(evt) {
        alert("Item Selected #" + evt.getData());
      }, this);
      this.getContent().add(list);
    },

    _back : function()
    {
      qx.ui.mobile.navigation.Manager.getInstance().executeGet("/", {reverse:true});
    }
  }
});