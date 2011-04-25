/*************************************************************************

*** DERIVED FROM THIS ORIGINAL STANDALONE VERSION
*** https://gist.github.com/611123
*** JSONP implementation of the bit.ly API for dynamic
*** URL shortening
***
*** @author = "Kai Mallea (kmallea@gmail.com)"
***
*** TODO: Add domain param to choose between bit.ly and j.mp

!!! FOR NGDC PORTIONS/Qx'ification/etc ONLY, the license details below apply

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

AUTHOR(S) OF THE CODE IN THIS FILE:
Original Source - Kai Mallea - kmallea@gmail.com
Qx'ification/Mods - Peter R. Elespuru - peter.elespuru@noaa.gov

*************************************************************************/


qx.Class.define("auroral_resources.io.shortener.Bitly",
{

    extend : qx.core.Object,

    /*
    *****************************************************************************
        STATIC MEMBERS
    *****************************************************************************
    */
    statics: 
    {
        jsonCallback: function(response) 
        {
            return(response.data.url);
        },

        jsonCallbackEmail: function(response) 
        {
            // cross email client compat is worse than cross browser compat... sheesh
            // the only thing that works consistently is to ensure only certain aspects
            // of the URI are URL encoded... i.e. ?subject=whatever cannot have the '?'
            // or '=' encoded ?!? oh well...
            var shortUrl = response.data.url;
            var content = "subject=Sharing ART Workspace&body=Hello, I'd like to share a workspace I created with the Auroral Resources Toolkit.%0A";
            content += encodeURIComponent(shortUrl);
            content += "%0A%0AART is a web application maintained by the National Geophysical Data Center Solar Terrestrial Physics department.%0A";
//            content += encodeURIComponent("http://spidr.ngdc.noaa.gov/art/");
            content += "%0ARegards,%0A";
            window.location.href = "mailto:?"+content;
        }
    },


    /*
    *****************************************************************************
        CONSTRUCTOR
    *****************************************************************************
    */
    construct : function()
    {
        this.base(arguments);
        return this;
    },

    /*
    *****************************************************************************
        CLASS VARIABLES AND METHODS
    *****************************************************************************
    */
    members :
    {
        __x_login : "spidrbitly",
        __x_apiKey : "R_81fcab41bb429aef52fadbc4e710686d",
        __format : 'json',
        __apiUrl : "http://api.bit.ly/v3/shorten?",
        __callbackHandler : null,
 
        //
        //
        //
        setLogin: function (login) 
        {
            this.__x_login = login;
            return this;
        },
        
        //
        //
        //
        setKey: function (apiKey) 
        {
            this.__x_apiKey = apiKey;
            return this;
        },

        //
        //
        //
        setCallback: function (fn) 
        {

            if (typeof fn !== 'function') {
                throw new Error("Bitly: callback argument must be a function");
            }

            this.__callbackHandler = fn;
            return this;
        },

        //
        //
        //
        shorten: function (longUrl) 
        {
            this.__callbackHandler = "auroral_resources.io.shortener.Bitly.jsonCallback";
            var head = document.getElementsByTagName("head")[0];
            var e = document.createElement("script");
            e.src = this.constructUrl(longUrl);
            head.appendChild(e);
        },
        
        //
        //
        //
        shortenAndEmail: function (longUrl) 
        {
            this.__callbackHandler = "auroral_resources.io.shortener.Bitly.jsonCallbackEmail";
            var head = document.getElementsByTagName("head")[0];
            var e = document.createElement("script");
            e.src = this.constructUrl(longUrl);
            head.appendChild(e);
        },

        //
        //
        //
        expand: function (shortUrl) 
        {
            //TBD
        },

        //
        //
        //
        validate: function () 
        {
            //TBD
        },

        //
        //
        //
        callback: function (response) 
        {
            this.__callbackHandler(response);
        },

        //
        //
        //
        constructUrl: function (longUrl) 
        {
            var q = "";
            
            if (this.__x_login && this.__x_apiKey) {
                q += "login=" + this.__x_login + "&apiKey=" + this.__x_apiKey + "&";
            }
            
            q += "longUrl=" + encodeURIComponent(longUrl) + "&format=json&callback="+this.__callbackHandler;
            
            return this.__apiUrl + q;
        }
    },
    
    
    /*
    *****************************************************************************
        DESTRUCTOR
    *****************************************************************************
    */
    destruct : function()
    {
    }

});
