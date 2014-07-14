/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('Availability Test', function () {

    var app, mock;

    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));
        mock = app.listen(1337);
    });

    afterEach(function (done) {
        mock.close(done);
    });

    var entries = [
        '/',
        '/login',
        '/register',
        '/wall'
    ];

    entries.forEach(function(uri){
        it(uri, function (done) {
            request(mock)
                .get(uri)
                .expect(200)
                .end(done)
        });
    });
});
