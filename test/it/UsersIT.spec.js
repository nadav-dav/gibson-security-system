/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var rek = require("rekuire");
var q = require("q");
var match = rek("responseMatchers");
var TestTools = rek("TestTools");


describe('Users IT', function () {

    var app, server, credentials;

    it("should register a new user", function (done) {
        server.run([

            login(credentials),
            makeSure.statusCodeIs(500),

            register(credentials),
            makeSure.statusCodeIs(200),

            login(credentials),
            makeSure.statusCodeIs(200)

        ], done);
    });

    it("should create a new session cookie", function (done) {
        server.run([
            register(credentials),
            makeSure.statusCodeIs(200),
            makeSure.haveCookie("_gib_session")
        ], done);
    });

    it("should redirect '/' to '/wall' page if already registered", function (done) {
        server.run([
            register(credentials),
            goTo("/"),
            makeSure.hasTemporaryRedirectTo("/wall")
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

    var login = function (credentials) {
        return function () {
            return server.post("/services/login", {form: credentials});
        }
    };

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



var makeSure = {};
makeSure.statusCodeIs = function (expectedStatusCode) {
    return function (data) {
        match(data.res).haveStatusCode(expectedStatusCode);
        return data;
    }
};

makeSure.hasTemporaryRedirectTo = function (url) {
    return function (data) {
        match(data.res).hasTemporaryRedirectTo(url);
        return data;
    }
};

makeSure.haveCookie = function (cookieName, expectedCookieValue) {
    return function (data) {
        match(data.res).hasCookie(cookieName, expectedCookieValue);
        return data;
    }
};