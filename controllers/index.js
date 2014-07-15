'use strict';


var IndexModel = require('../models/index');

module.exports = function (router) {
    var model = new IndexModel();
    router.get('/', function (req, res) {
        res.render('index', model);        
    });

    router.get('/register', function (req, res) {
        res.render('register');
    });

    router.get('/login', function (req, res) {
        res.render('login');
    });

    router.get('/wall', function (req, res) {
        res.render('wall');
    });

};
