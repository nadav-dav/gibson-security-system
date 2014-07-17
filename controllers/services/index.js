"use strict";

var rek = require("rekuire");
var usersDao = rek("beans").db.usersDao;
var session = rek("beans").session;
var User = rek("User");
var q = rek("q");

module.exports = function (router) {

    router.post("/login", function (req, res) {
        usersDao.getUserByNameAndPassword(req.body.name, req.body.password)
            .then(function (user) {
                var sessionId = session.loginUser(user);
                res.cookie("_gib_session", sessionId, {});
                res.send();
            })
            .catch(function (e) {
                res.status(500).send("Failed to login. Please check your credentials.");
            });
    });

    router.post("/register", function (req, res) {
        q.fcall(function () {
            return User.create({name: req.body.name, password: req.body.password});
        })
            .then(function (user) {
                return usersDao.save(user);
            })
            .then(function(user){
                var sessionId = session.loginUser(user);
                res.cookie("_gib_session", sessionId, {});
            })
            .then(function () {
                res.send();
            })
            .catch(function (e) {
                var msg = "";
                if (e.toString().indexOf("UNIQUE") !== -1) {
                    msg = "The username you chose is already taken.";
                } else {
                    msg = "Failed to register. Please try again later.";
                }
                res.status(500).send(msg);
            });
    });
};
