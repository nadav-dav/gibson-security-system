/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var rek = require("rekuire");
var q = require("q");
var TestTools = rek("TestTools");
var makeSure = rek("makeSureMatchers");


describe('Debug IT', function () {

    var app, server, credentials;

    it("should display the wall page with debug scripts", function (done) {
        server.run([
            register(credentials),
            goTo("/wall"),
            makeSure.responseBodyContains("<!--  use query param 'debugscript' parameter to add a debug script -->"),
            goTo("/wall?debugscript=/debug.js"),
            makeSure.responseBodyContains("<script type=\"text/javascript\" src=\"/debug.js\"></script>")
        ], done);
    });

    /* -------------------------------------- */

    beforeEach(function (done) {
        app = rek('TestServer').create(function () {
            done();
        });
        server = new TestTools(app);
        credentials = createCredentials();
    });

    afterEach(function (done) {
        app.close(done);
    });

    function createCredentials(){
        return { name: 'name'+Math.random(), password: 'pass'+Math.random() }
    }

    var register = function (credentials) {
        return function () {
            return server.post("/services/register", {form: credentials});
        }
    };

    var goTo = function (uri) {
        return function () {
            return server.get(uri);
        }
    };
});