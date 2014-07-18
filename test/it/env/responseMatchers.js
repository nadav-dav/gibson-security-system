var assert = require("assert");
var cookie = require("cookie");

var ResponseMatchers = (function () {
    function ResponseMatchers(res) {
        this.res = res;
    }

    ResponseMatchers.prototype.haveStatusCode = function (expectedStatusCode) {
        var statusCode = this.res.statusCode;
        assert.equal(statusCode, expectedStatusCode, "Expected status code to be " + expectedStatusCode + " but got " + statusCode)
        return this;
    };

    ResponseMatchers.prototype.hasTemporaryRedirectTo = function (expectedRedirectLocation) {
        this.haveStatusCode(302);
        var redirectLocation = this.res.headers['location'];
        assert.equal(redirectLocation, expectedRedirectLocation,
            "Expected redirect url to be '" + expectedRedirectLocation + "' but got '" + redirectLocation + "'"
        );
        return this;
    };

    ResponseMatchers.prototype.hasCookie = function (cookieName, expectedCookieValue) {
        var cookies = this.res.headers['set-cookie'] || [];
        var cookieValue = getCookieData(cookies, cookieName);
        if (expectedCookieValue) {
            asset.equals(cookieValue, expectedCookieValue, "Expected cookie [" + cookieName + "], to have value of '" + expectedCookieValue + "', but got '")
        } else {
            assert.ok("Expected response to have a cookie  named [" + cookieName + "]");
        }
        return this;

        function getCookieData(setCookieHeaders, cookieName) {
            setCookieHeaders.forEach(function (cookieString) {
                var cookieData = cookie.parse(cookieString);
                if (cookieData[cookieName]) {
                    return cookieData[cookieName];
                }
            });
            return null;
        }
    };

    return ResponseMatchers;
})();

module.exports = function matcher(res) {
    return new ResponseMatchers(res);
};
