/* ************************************************************************

COPYRIGHTS:

Copyright (c) 2010, National Geophysical Data Center, NOAA
Copyright (c) 2010, Geophysical Center, Russian Academy of Sciences
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

Unchanged from the one provided by the Qx folks

************************************************************************ */

/**
* This class demonstrates how to define unit tests for your application.
*
* Execute <code>generate.py test</code> to generate a testrunner application 
* and open it from <tt>test/index.html</tt>
*
* The methods that contain the tests are instance methods with a 
* <code>test</code> prefix. You can create an arbitrary number of test 
* classes like this one. They can be organized in a regular class hierarchy, 
* i.e. using deeper namespaces and a corresponding file structure within the 
* <tt>test</tt> folder.
*/
qx.Class.define("auroral_resources.test.DemoTest",
{
    extend : qx.dev.unit.TestCase,

    members :
    {
        /*
        ---------------------------------------------------------------------------
        TESTS
        ---------------------------------------------------------------------------
        */

        /**
        * Here are some simple tests
        */
        testSimple : function()
        {
            this.assertEquals(4, 3+1, "This should never fail!");
            this.assertFalse(false, "Can false be true?!");
        },

        /**
        * Here are some more advanced tests
        */
        testAdvanced: function () 
        {
            var a = 3;
            var b = a;
            this.assertIdentical(a, b, "A rose by any other name is still a rose");
            this.assertInRange(3, 1, 10, "You must be kidding, 3 can never be outside [1,10]!");
        }
    }
});
