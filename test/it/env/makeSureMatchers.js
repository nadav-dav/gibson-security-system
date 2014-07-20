var rek = require("rekuire");
var match = rek("responseMatchers");
var assert = require("assert");

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

makeSure.responseBodyIs = function(expectedBody){
    return function(data){
        assert.equal(data.body, expectedBody, "Body expected to be: \n"+expectedBody+"\nBut got: \n"+data.body);
        return data;
    }
};


module.exports = makeSure;