var rek = require("rekuire");
var Session = rek("Session");

var session = new Session();
var cookieName = "_gib_session";
var ExpressSessionHelper = (function() {
    function ExpressSessionHelper(usersDao) {
        this.usersDao = usersDao;
    }

    /**
     * @param [Request] req
     * @param [Response] res
     */
    ExpressSessionHelper.prototype.getSessionData = function(req, res) {
        return session.getSessionData(getSessionId(req));
    };


    ExpressSessionHelper.prototype.login = function(req, res, credentials) {
        return this.usersDao.getUserByNameAndPassword(credentials.name, credentials.password)
            .then(function(user) {
                setSessionCookie(res, session.loginUser(user));
            })
    };

    ExpressSessionHelper.prototype.logout = function(req, res) {
        session.logout(getSessionId(req));
        deleteSessionCookie(res);
    };

    ExpressSessionHelper.prototype.isLoggedIn = function(req, res) {
        return this.getSessionData(req, res) != undefined;
    };

    function deleteSessionCookie(res) {
        setSessionCookie(res, null);
    }

    function setSessionCookie(res, sessionId) {
        res.cookie(cookieName, sessionId, {});
    }

    function getSessionId(req) {
        return req.cookies[cookieName];
    }


    return ExpressSessionHelper;
})();

module.exports = ExpressSessionHelper;