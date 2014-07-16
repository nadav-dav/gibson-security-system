var Session = (function () {
    var loggedUsers = {};

    function Session() {
    }

    Session.prototype.loginUser = function (user) {
        var sessionId = user.id;
        if (loggedUsers[sessionId] === undefined){
            loggedUsers[sessionId] = {};
        }
        loggedUsers[sessionId].user = user;
        return sessionId;
    };

    Session.prototype.sessionOf = function (sessionId) {
        return loggedUsers[sessionId];
    };

    Session.prototype.logout = function (sessionId){
        delete loggedUsers[sessionId];
    };

    return Session;
})();

module.exports = Session;