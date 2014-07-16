/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var request = require('supertest');
var rek = require("rekuire");
var expect = require("expect");


describe('Availability Test', function () {

    var mock, server;

    beforeEach(function (done) {
        mock = rek('GibsonServer').create(done);
        server = request(mock)
    });

    afterEach(function (done) {
        mock.close(done);
    });

    it("open /", function (done) {
        server
            .get("/")
            .expect(302)
            .expect(function(res){
                expect(res.header['location']).toBe("/login")
            })
            .end(done)

    });

    it("open /login", function (done) {
        server
            .get("/login")
            .expect(200)
            .end(done)
    });

    it("open /register", function (done) {
        server
            .get("/register")
            .expect(200)
            .end(done)
    });

    it("open /wall", function (done) {
        server
            .get("/wall")
            .expect(200)
            .end(done)
    });
});
