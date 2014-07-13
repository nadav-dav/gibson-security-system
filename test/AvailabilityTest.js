/*global describe:false, it:false, beforeEach:false, afterEach:false*/

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


    it('/', function (done) {
        request(mock)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it("/login", function (done) {
        request(mock)
            .get("/login")
            .expect(200)
            .end(done)
    });

    it("/register", function (done) {
        request(mock)
            .get("/register")
            .expect(200)
            .end(done)
    });

});
