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