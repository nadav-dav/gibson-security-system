var guid = require("guid");

var Session = (function () {
    var loggedUsers = {};

    function Session() {
    }

    Session.prototype.loginUser = function (user) {
        var sessionId = guid.raw();
        loggedUsers[sessionId] = {};
        loggedUsers[sessionId].user = user;
        return sessionId;
    };

    Session.prototype.sessionOf = function (arg1) {
        var sessionId
        if (typeof arg1 === "string") {
            sessionId = arg1;
        } else {
            var request = arg1;
            try {
                sessionId = request.cookies["_gib_session"];
            } catch (e) {

            }
        }
        return loggedUsers[sessionId];
    };

    Session.prototype.logout = function (sessionId) {
        delete loggedUsers[sessionId];
    };

    return Session;
})();

module.exports = Session;