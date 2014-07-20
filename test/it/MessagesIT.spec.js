/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var rek = require("rekuire");
var q = require("q");
var TestTools = rek("TestTools");
var makeSure = rek("makeSureMatchers");
var Message = rek("Message");
var User = rek("User");
var assert = require("assert");


describe('Massages IT', function () {

    var app, server, user;

    it("Should be able to post messages", function (done) {
        var message = Message.create({author: user.name, body: "Hello World"});
        server.run([
            register(user),
            postMessage(message),
            makeSure.statusCodeIs(200),
            readMessages,
            makeSure.statusCodeIs(200),
            parseResponseJson(function(data){
                assert(data[0].body, message.body)
            })

        ], done);
    });

    /* -------------------------------------- */

    beforeEach(function (done) {
        app = rek('TestServer').create(function () {
            done();
        });
        server = new TestTools(app);
        user = User.create({ name: 'name' + Math.random(), password: 'pass' + Math.random() })
    });

    afterEach(function (done) {
        app.close(done);
    });

    var postMessage = function (message) {
        return function () {
            return server.post("/services/messages", {form: {message: message.body}});
        }
    };

    var parseResponseJson = function (fn) {
        return function (data) {
            var json = JSON.parse(data.body);
            return fn(json);
        }
    };

    var register = function (fn) {
        return function () {
            return server.post("/services/register", {form: {name: user.name, password: user.password}})
        }
    };

    var readMessages = function () {
        return server.get("/services/messages");
    };

    var register = function (user) {
        return function () {
            return server.post("/services/register", {form: {name: user.name, password: user.password}})
        }
    };

    var goTo = function (uri) {
        return function () {
            return server.get(uri);
        }
    };
});
