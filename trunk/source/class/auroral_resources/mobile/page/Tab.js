/* ************************************************************************

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

************************************************************************ */

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