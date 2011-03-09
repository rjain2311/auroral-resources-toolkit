#!/usr/bin/env python
#
# (derivative) Copyright 2011 Peter Elespuru 
# (original)   Copyright 2008 Brett Slatkin
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Derived from this appengine app:
# http://gregdoesit.com/2010/12/using-google-app-engine-as-proxy-for-cross-domain-requests/
# modified to be a more specific resource caching proxy (not general url=?) 
# for the Auroral Resources Toolkit
#
# 

__author__ = "(Derivative) Peter Elespuru, (Original) Brett Slatkin"

import datetime
import hashlib
import logging
import pickle
import urllib
import re
import time
import urllib
import wsgiref.handlers

from google.appengine.api import memcache
from google.appengine.api import urlfetch
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.runtime import apiproxy_errors
from google.appengine.ext.webapp.util import run_wsgi_app


#
# currently 1-day cache TTL
#
CACHE_TIME = 1440


#
# support service prefixes, each requires a function that knows how to
# fill in parameters
#
SERVICES = { 
    'spidr.ngdc.GetData':     "http://spidr.ngdc.noaa.gov/spidr/servlet/GetData",
    'spidr.ngdc.GetMetadata': "http://spidr.ngdc.noaa.gov/spidr/servlet/GetMetadata",
    'lasp.tsi.sorce':         "http://lasp.colorado.edu/lisird/tss/sorce_tsi_6hr.csv",
    'lasp.tsi.sorce.meta':    "http://lasp.colorado.edu/lisird/tss/sorce_tsi_6hr.html"
}

SERVICES_DATA_TYPES = { 
    'spidr.ngdc.GetData':     "text/plain",
    'spidr.ngdc.GetMetadata': "application/xml",
    'lasp.tsi.sorce':         "text/plain",
    'lasp.tsi.sorce.meta':    "text/html"
}

    
#
#
#
def getMemcacheKey(mapping):
    url_hash = hashlib.sha256()
    url_hash.update(mapping)
    return "hash_" + url_hash.hexdigest()


#
# has an allowed service been reqested ?
#
def isAllowedService(service):
    for s in SERVICES:
        if s == service:
            return True
    return False


#
#
#
class ProxyHandler(webapp.RequestHandler):
        
    #
    #
    #
    def get(self):
        service = self.request.get('service')
        service = urllib.unquote(service)
        servarg = self.request.get('args')
        servarg = urllib.unquote(servarg)

        if not isAllowedService(service):
            return # sec check fail
            
        memcacheKey = getMemcacheKey(service+','+servarg)

        # Use memcache to store the request for CACHE_TIME
        proxiedContent = memcache.get(memcacheKey)
        proxiedContentInMemcache = True
        
        if proxiedContent is None:
            proxiedContentInMemcache = False
        try:
            response = urlfetch.fetch(SERVICES[service]+"?"+servarg)
        except (urlfetch.Error, apiproxy_errors.Error):
            return self.error(404)
        
        # did something legit come back ?
        proxiedContent = response.content
        if proxiedContent is None:
            return self.error(404)
        
        # Add the fetched content to memcache
        if (not proxiedContentInMemcache):
            memcache.add(memcacheKey, proxiedContent, CACHE_TIME)
            
        self.response.headers['Content-Type'] = SERVICES_DATA_TYPES[service]
        self.response.out.write(proxiedContent)

#
#
#
def main():
  app = webapp.WSGIApplication([("/proxy", ProxyHandler),], debug=False)
  run_wsgi_app(app)


#
#
#
if __name__ == "__main__":
  main()
