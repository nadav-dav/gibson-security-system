"use strict";

var rek = require("rekuire");
var usersDao = rek("beans").db.usersDao;
var messagesDao = rek("beans").db.messagesDao;
var expressSessionHelper = rek("beans").session.expressSessionHelper;
var User = rek("User");
var Message = rek("Message");
var q = rek("q");

module.exports = function(router) {

    router.post("/login", function(req, res) {
        expressSessionHelper.login(req, res, {
            name: req.body.name,
            password: req.body.password
        })
            .then(function() {
                res.send();
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
                res.send();
            })
            .catch(function(e) {
                var msg = "";
                if (e.toString().indexOf("UNIQUE") !== -1) {
                    msg = "The username you chose is already taken.";
                } else {
                    msg = "Failed to register. Please try again later.";
                }
                res.status(500).send(msg);
            });
    });

    router.post("/logout", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            expressSessionHelper.logout(req, res);
            res.send();
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
            messagesDao.post(msg).then(function() {
                res.send();
            }).catch(function(e) {
                res.status(500).send("Failed to post a message, Please try again later.");
            });

        });

    });

    router.get("/messages", function(req, res) {
        onlyForLoggedInUsers(req, res, function(sessionData) {
            messagesDao.getMessages()
                .then(function(messages) {
                    res.send("[" + messages.toString() + "]");
                })
                .catch(function(e) {
                    res.status(500).send("Failed to retrieve messages. " + e);
                });
        });
    });

    function onlyForLoggedInUsers(req, res, fn) {
        var sessionData = expressSessionHelper.getSessionData(req, res);
        if (sessionData) {
            fn(sessionData);
        } else {
            res.redirect(302, "/login");
        }
    }
};