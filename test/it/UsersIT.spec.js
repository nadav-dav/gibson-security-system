/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var rek = require("rekuire");
var Promise = require("q").Promise;
var q = require("q");
var request = require("request");
var cookie = require("cookie");


describe('Users IT', function () {

    var gibson, tt;

    it("should register a new user", function (done) {
        var credentials = { name: 'foo@bar.com', password: 'mypass' };

        tt.run([

            login(credentials),
            makeSure.statusCodeIs(500),

            register(credentials),
            makeSure.statusCodeIs(200),

            login(credentials),
            makeSure.statusCodeIs(200)

        ], done);
    });

    it("should create a new session cookie", function (done) {
        var credentials = { name: 'bar@foo.com', password: 'mypass' };
        tt.run([
            register(credentials),
            makeSure.statusCodeIs(200),
            makeSure.haveCookie("_gib_session")
        ], done);
    });

    /* -------------------------------------- */

    beforeEach(function (done) {
        gibson = rek('TestServer').create(function () {
            done();
        });
        tt = new TestTools(gibson);
    });

    afterEach(function (done) {
        gibson.close(done);
    });

    var login = function(credentials){
        return function(){
            return tt.post("/services/login", {form: credentials});
        }
    };

    var register = function(credentials){
        return function(){
            return tt.post("/services/register", {form: credentials});
        }
    };

});

var TestTools = (function () {
    var methods = ['get','post','del','options','head'];

    function TestTools(server) {
        this.basePath = "http://" + server.address().address + ":" + server.address().port;
    }

    methods.forEach(function(method){
        TestTools.prototype[method] = function get(uri, options) {
            var args = Array.prototype.slice.call(arguments, 0);;
            if (typeof args[0] === "string"){
                args[0] = this.basePath + uri;
            } else {
                args[0].url = this.basePath + uri;
            }

            return new Promise(function (resolve, reject) {
                args.push(function (err, res, body) {
                    res.body = body;
                    resolve(res);
                });

                request[method].apply(request, args);
            });
        };
    });

    TestTools.prototype.run = function (commands, done) {
        var result = q();
        commands.forEach(function (f) {
            result = result.then(f).fail(function (e) {
                throw e
            });
        });
        result.then(function () {
            done()
        }).catch(done);
    };

    return TestTools;
})();

var makeSure = {};
makeSure.statusCodeIs = function (expectedStatusCode) {
    return function (res) {
        if (res.statusCode !== expectedStatusCode) {
            throw new Error("Expected status code to be " + expectedStatusCode + " but got " + res.statusCode)
        }
        return res;
    }
};

makeSure.haveCookie = function (cookieName, expectedCookieValue) {
    return function (res) {
        var cookies = res.headers['set-cookie'] || [];
        var cookieValue = getCookieData(cookies, cookieName);
        if (expectedCookieValue){
            if ( cookieValue !== expectedCookieValue){
                throw new Error("Expected cookie ["+cookieName+"], to have value of '"+expectedCookieValue+"', but got '"+cookieValue+"'");
            }
        } else {
            if (cookieValue !== null){
                throw new Error("Expected response to have a cookie  named ["+cookieName+"]");
            }
        }
        return res;
    }

    function getCookieData(setCookieHeaders, cookieName){
        setCookieHeaders.forEach(function(cookieString){
            var cookieData = cookie.parse(cookieString);
            if (cookieData[cookieName]){
                return cookieData[cookieName];
            }
        });
        return null;
    }
};


function requestPromise(fn) {
    return function () {
        return new Promise(function (resolve, reject) {
            fn().end(function (e, res) {
                return e ? reject(e) : resolve(res)
            })
        });
    };
}