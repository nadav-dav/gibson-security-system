/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var request = require('supertest');
var rek = require("rekuire");
var expect = require("expect");


describe("Security IT", function () {

    var mock, server;

    beforeEach(function (done) {
        mock = rek("GibsonServer").create(done);
        server = request(mock)
    });

    afterEach(function (done) {
        mock.close(done);
    });

    var protectedPages = ['/wall', '/'];
    describe("if not logged in, it should redirect protected pages to login screen", function () {
        protectedPages.forEach(function (uri) {
            it("should protect the page: " + uri, function (done) {
                server
                    .get(uri)
                    .expect(302)
                    .expect(function (res) {
                        expect(res.header['location']).toBe("/login")
                    })
                    .end(done)
            });
        });
    });
});
