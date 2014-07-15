var Dto = require('./Dto');
var guid = require('guid');

var User = (function () {
    var fields = ['id', 'name', 'password', 'dateCreated'];

    function User() {}

    Dto.generate(fields, User, function (user) {
        user.id = user.id || guid.raw();
        user.dateCreated = user.dateCreated || Date.now();
    });

    return User;
})();

module.exports = User;