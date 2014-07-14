var Dto = require('./Dto');

var User = (function () {
    var fields = ['id', 'name', 'password', 'dateCreated'];

    function User() {}

    Dto.generate(fields, User, function (user) {
        user.id = user.id || null;
        user.dateCreated = user.dateCreated || Date.now();
    });

    return User;
})();

module.exports = User;