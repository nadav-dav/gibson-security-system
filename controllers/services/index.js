"use strict";

var rek = require("rekuire");
var usersDao = rek("beans").db.usersDao;
var messagesDao = rek("beans").db.messagesDao;
var expressSessionHelper = rek("beans").session.expressSessionHelper;
var User = rek("User");
var Message = rek("Message");
var q = rek("q");
var EventEmitter = require("events").EventEmitter;


var serverEvent = new EventEmitter();

module.exports = function(router) {

    router.post("/login", function(req, res) {
        expressSessionHelper.login(req, res, {
            name: req.body.name,
            password: req.body.password
        })
            .then(function() {
                res.json({});
            })
            .catch(function(e) {
                res.status(500).json(errorResponse("Failed to login. Please check your credentials.", e));
            });
    });

    router.post("/register", function(req, res) {
        q()
            .then(function() {
                var user = User.create({
                    name: req.body.name,
                    password: req.body.password
                });
                return usersDao.save(user);
            })
            .then(function() {
                return expressSessionHelper.login(req, res, {
                    name: req.body.name,
                    password: req.body.password
                });
            })
            .then(function() {
                res.json({});
            })
            .catch(function(e) {
                var msg = "";
                if (e.toString().indexOf("UNIQUE") !== -1) {
                    msg = "The username you chose is already taken.";
                } else {
                    msg = "Failed to register. Please try again later.";
                }
                res.status(500).json(msg, e);
            });
    });

    router.post("/logout", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            expressSessionHelper.logout(req, res);
            res.json({});
        });
    });

    router.post("/messages", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            var user = sessionData.user;
            var msg = Message.create({
                author: {
                    name: user.name,
                    id: user.id,
                    color: user.color
                },
                body: req.body.message
            });

            messagesDao.post(msg)
                .then(function() {
                    res.json({});
                    serverEvent.emit("new-message-posted");
                }).catch(function(e) {
                    res.status(500).json(errorResponse("Failed to post a message, Please try again later.", e));
                });

        });

    });

    router.get("/messages/wait", function(req, res){
        onlyForLoggedInUsers(req, res, function(sessionData) {
            var timeout;
            var onUpdate = function onUpdate(){
                clearTimeout(timeout);
                res.send(true);
                serverEvent.removeListener("new-message-posted",onUpdate);
            };  

            var cancel = function cancel(){
                res.send(false);
                serverEvent.removeListener("new-message-posted",onUpdate);
            };

            serverEvent.addListener("new-message-posted",onUpdate);
            timeout = setTimeout(cancel, 10000);
        })
    });

    router.get("/messages", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            messagesDao.getMessages()
                .then(function(messages) {
                    res.send("[" + messages.toString() + "]");
                })
                .catch(function(e) {
                    res.status(500).json(errorResponse("Failed to retrieve messages. ", e));
                });
        });
    });

    function errorResponse(message, error) {
        return {
            error: error.toString(),
            message: message
        };
    }

    function onlyForLoggedInUsers(req, res, fn) {
        var sessionData = expressSessionHelper.getSessionData(req, res);
        if (sessionData) {
            csrfProtection(req, res, sessionData, function () {
                fn(sessionData);
            });
        } else {
            res.redirect(302, "/login");
        }
    }

    function csrfProtection(req, res, sessionData, fn) {
        var isCsrfTokenValid = true; 
        /** 
        ADD CSRF SUPPORT HERE 
        you can user sessionData.user.id to validate the token
        **/
        if (isCsrfTokenValid) {
            fn();
        } else {
            res.status(500).json(errorResponse("Missing CSRF token"));
        }
    }
};