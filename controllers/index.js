"use strict";


var rek = require("rekuire");
var session = rek("beans").session;


var IndexModel = require("../models/index");

module.exports = function (router) {
    var model = new IndexModel();
    router.get("/", function (req, res) {
        onlyForLoggedInUsers(req, res, function(){
            res.redirect(302, "/wall");
        });
    });

    router.get("/register", function (req, res) {
        onlyForNewUsers(req, res, function(){
            res.render("register");
        });
    });

    router.get("/login", function (req, res) {
        onlyForNewUsers(req, res, function(){
            res.render("login");
        });
    });

    router.get("/wall", function (req, res) {
        onlyForLoggedInUsers(req, res, function(){
            res.render("wall");
        });
    });

    function onlyForLoggedInUsers(req, res, fn){
        var sessionData = session.sessionOf(req);
        if(sessionData){
            fn();
        }else{
            res.redirect(302, "/login");
        }
    }

    function onlyForNewUsers(req, res, fn){
        var sessionData = session.sessionOf(req);
        if(sessionData){
            res.redirect(302, "/wall");
        }else{
            fn();
        }
    }

};
