

/* ************************************************************************

#asset(auroral_resources_mobile/*)
#asset(qx/mobile/icon/ios/*)

************************************************************************ */

/**
 */
qx.Class.define("auroral_resources.mobile.Application",
{
  extend : qx.application.Mobile,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    main : function()
    {
      this.base(arguments);

      var overview = new auroral_resources.mobile.page.Overview();
      var events = new auroral_resources.mobile.page.Event();
      var list = new auroral_resources.mobile.page.List();
      var tab = new auroral_resources.mobile.page.Tab();
      var form = new auroral_resources.mobile.page.Form();
      var animation = new auroral_resources.mobile.page.Animation();
      var animationLanding = new auroral_resources.mobile.page.AnimationLanding();

      var nm = qx.ui.mobile.navigation.Manager.getInstance();
      
      nm.onGet("/", function(data) {
        overview.show(data.customData);
      },this);

      nm.onGet("/event", function(data)
      {
        events.show();
      },this);

      nm.onGet("/tab", function(data)
      {
        tab.show();
      },this);

      nm.onGet("/list", function(data)
      {
        list.show();
      },this);

      nm.onGet("/form", function(data)
      {
        form.show();
      },this);

      nm.onGet("/animation", function(data) {
        animation.show(data.customData);
      },this);

      nm.onGet("/animation/:animation", function(data) {
        var animation = data.params.animation;
        animationLanding.setAnimation(animation);
        animationLanding.show({animation:animation});
      },this);

    }
  }
});
