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

    Session.prototype.getSessionData = function (sessionId) {
        return loggedUsers[sessionId];
    };

    Session.prototype.logout = function (sessionId) {
        delete loggedUsers[sessionId];
    };

    return Session;
})();

module.exports = Session;