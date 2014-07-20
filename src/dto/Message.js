var Dto = require('./Dto');
var guid = require('guid');

var Message = (function () {
    var fields = ['id', 'dateCreated', 'author', 'body'];

    function Message() {}

    Dto.generate(fields, Message, function (message) {
        message.id = message.id || guid.raw();
        message.dateCreated = message.dateCreated || Date.now();
    });

    return Message;
})();

module.exports = Message;