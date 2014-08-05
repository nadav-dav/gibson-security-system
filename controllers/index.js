"use strict";


var rek = require("rekuire");
var expressSessionHelper = rek("beans").session.expressSessionHelper;

module.exports = function(router) {
    router.get("/", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            res.redirect(302, "/wall");
        });
    });

    router.get("/register", function(req, res) {
        onlyForNewUsers(req, res, function() {
            res.render("register",{});
        });
    });

    router.get("/login", function(req, res) {
        onlyForNewUsers(req, res, function() {
            res.render("login",{});
        });
    });

    router.get("/wall", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            var user = sessionData.user;
            res.render("wall", {
                user: user,
                debugscript: getDebugScripts(req),
                csrfToken: createCsrfToken(user.id)
            });
        });
    });

    function onlyForLoggedInUsers(req, res, fn) {
        var sessionData = expressSessionHelper.getSessionData(req, res);
        if (sessionData !== undefined) {
            fn(sessionData);
        } else {
            res.redirect(302, "/login");
        }
    }

    function onlyForNewUsers(req, res, fn) {
        var isLoggedIn = expressSessionHelper.isLoggedIn(req, res);
        if (isLoggedIn) {
            res.redirect(302, "/wall");
        } else {
            fn();
        }
    }

    function getDebugScripts(req) {        
        return req.param("debugscript") ? "<script type=\"text/javascript\" src=\"" + req.param("debugscript") + "\"></script>" : "<!-- debugscript -->";
    }

    function createCsrfToken (userId) {
        return "to be completed";
    }

};