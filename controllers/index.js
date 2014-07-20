"use strict";


var rek = require("rekuire");
var expressSessionHelper = rek("beans").session.expressSessionHelper;

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
        var isLoggedIn = expressSessionHelper.isLoggedIn(req, res);
        if(isLoggedIn){
            fn();
        }else{
            res.redirect(302, "/login");
        }
    }

    function onlyForNewUsers(req, res, fn){
        var isLoggedIn = expressSessionHelper.isLoggedIn(req, res);
        if(isLoggedIn){
            res.redirect(302, "/wall");
        }else{
            fn();
        }
    }

};
