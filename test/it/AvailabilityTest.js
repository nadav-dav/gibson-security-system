/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var request = require('supertest');
var rek = require("rekuire");


describe('Availability Test', function () {

    var mock;

    beforeEach(function (done) {
        mock = rek('GibsonServer').create(done);
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
