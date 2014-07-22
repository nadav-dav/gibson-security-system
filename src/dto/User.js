var Dto = require('./Dto');
var guid = require('guid');
var randomcolor = require('randomcolor');

var User = (function() {
    var fields = ['id', 'name', 'password', 'dateCreated', 'color'];

    function User() {}

    Dto.generate(fields, User, function(user) {
        user.id = user.id || guid.raw();
        user.dateCreated = user.dateCreated || Date.now();
        user.color = user.color || randomcolor();
    });

    return User;
})();

module.exports = User;