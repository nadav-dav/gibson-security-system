var kraken = require('kraken-js'),
    express = require('express');
var rek = require("rekuire");

var TestServer = (function () {

    function TestServer() {}

    TestServer.create = function (done) {
        var app = express();
        app.use(kraken({
            basedir: process.cwd()
        }));
        app.on('start', done);
        return app.listen(1337);
    };

    return TestServer;
})();

module.exports = TestServer;