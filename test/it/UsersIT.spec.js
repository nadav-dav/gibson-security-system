/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var rek = require("rekuire");
var q = require("q");
var TestTools = rek("TestTools");
var makeSure = rek("makeSureMatchers");


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

    it("should redirect '/login' to '/wall' page if already registered", function (done) {
        server.run([
            register(credentials),
            goTo("/login"),
            makeSure.hasTemporaryRedirectTo("/wall")
        ], done);
    });

    it("should redirect '/register' to '/wall' page if already registered", function (done) {
        server.run([
            register(credentials),
            goTo("/register"),
            makeSure.hasTemporaryRedirectTo("/wall")
        ], done);
    });

    it("should be able to log out", function (done) {
        server.run([
            register(credentials),

            goTo("/wall"),
            makeSure.statusCodeIs(200),

            logout,

            goTo("/wall"),
            makeSure.statusCodeIs(302)
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

    var logout = function(){
        return server.post("/services/logout")
    }

});