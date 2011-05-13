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

qx.Class.define("auroral_resources.mobile.page.Form",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.base(arguments);
    this.setTitle("Form");
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
  },

  members :
  {
    __password : null,
    __name : null,
    __info : null,
    __save : null,
    __result : null,
    __slide : null,

    _initialize : function()
    {
      this.base(arguments);
      var title = new qx.ui.mobile.form.Title("Form");
      this.getContent().add(title);
      this.getContent().add(this.__createForm());

      var button = new qx.ui.mobile.form.Button("Submit");
      button.addListener("tap", this._onButtonTap, this);
      this.getContent().add(button);

      var title = new qx.ui.mobile.form.Title("Form Content");
      this.getContent().add(title);
      this.__result = new qx.ui.mobile.embed.Html();
      this.getContent().add(this.__result);
    },

    __createForm : function()
    {
      var form = new qx.ui.mobile.form.Form();

      var row = new qx.ui.mobile.form.Row();
      this.__name = new qx.ui.mobile.form.TextField().set({placeholder:"Username"});
      row.add(this.__name);
      form.add(row);

      var row = new qx.ui.mobile.form.Row();
      form.add(row);
      this.__password = new qx.ui.mobile.form.PasswordField().set({placeholder:"Password"});
      row.add(this.__password);

      var row = new qx.ui.mobile.form.Row();
      form.add(row);
      this.__info = new qx.ui.mobile.form.TextArea().set({placeholder:"Some Info"});
      row.add(this.__info);

      var row = new qx.ui.mobile.form.Row(new qx.ui.mobile.layout.HBox());
      form.add(row);
      row.add(new qx.ui.mobile.basic.Label("Save"), {flex:1});
      this.__save = new qx.ui.mobile.form.ToggleButton();
      row.add(this.__save);

      var row = new qx.ui.mobile.form.Row(new qx.ui.mobile.layout.HBox());
      form.add(row);
      this.__slide = new qx.ui.mobile.form.Slider();
      row.add(this.__slide, {flex:1});
      return form;
    },

    _onButtonTap : function(evt)
    {
      var result = [];
      result.push("Username: " +  this.__name.getValue());
      result.push("Password: " +  this.__password.getValue());
      result.push("Info: " +  this.__info.getValue());
      result.push("Save: " +  this.__save.getValue());
      result.push("Slider: " +  this.__slide.getValue());
      this.__result.setHtml(result.join("<br>"));
    },

    _back : function()
    {
      qx.ui.mobile.navigation.Manager.getInstance().executeGet("/", {reverse:true});
    }
  }
});