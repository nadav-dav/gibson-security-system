'use strict';

var rek = require('rekuire');
var usersDao = rek('beans').db.usersDao;
var User = rek('User');
var q = rek('q');

module.exports = function (router) {

    router.post('/login', function (req, res) {
        usersDao.getUserByNameAndPassword(req.body.name, req.body.password)
            .then(function (user) {
                res.send();
            })
            .catch(function (e) {
                res.status(500).send(e);
            });
    });

    router.post('/register', function (req, res) {
        q.fcall(function(){
            return User.create({name: req.body.name, password: req.body.password});
        })
        .then(function(user){
            return usersDao.save(user);
        })
        .then(function () {
            res.send();
        })
        .catch(function (e) {
            res.status(500).send(e);
        });
    });
};
