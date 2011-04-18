qx.Class.define("auroral_resources.mobile.page.AnimationLanding",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("Animation");
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
  },

  properties :
  {
    animation :
    {
      check : "String",
      init : ""
    }
  },

  members :
  {
    _initialize : function()
    {
      this.base(arguments);
      var embed = new qx.ui.mobile.embed.Html('<strong>Tap "back" button for the reverse animation</strong>');
      this.getContent().add(embed);
    },

    _back : function()
    {
     qx.ui.mobile.navigation.Manager.getInstance().executeGet("/animation", {animation:this.getAnimation(), reverse:true});
    }
  }
});