
var kraken = require('kraken-js'),
    express = require('express');

module.exports = {
    create: function(callback){
        var app = express();
        app.on('start', callback);
        app.use(kraken({
            basedir: process.cwd()
        }));
        return app.listen(1337);
    }
};