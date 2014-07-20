"use strict";

var rek = require("rekuire");
var usersDao = rek("beans").db.usersDao;
var expressSessionHelper = rek("beans").session.expressSessionHelper;
var User = rek("User");
var q = rek("q");

module.exports = function (router) {

    router.post("/login", function (req, res) {
        expressSessionHelper.login(req, res, {name: req.body.name, password: req.body.password})
            .then(function () {
                res.send();
            });
    });

    router.post("/register", function (req, res) {
        q()
            .then(function () {
                var user = User.create({name: req.body.name, password: req.body.password});
                return usersDao.save(user);
            })
            .then(function () {
                return expressSessionHelper.login(req, res, {name: req.body.name, password: req.body.password});
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

    router.post("/logout", function (req, res) {
        expressSessionHelper.logout(req, res);
        res.send();
    });
};
