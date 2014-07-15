/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var request = require('supertest');
var expect = require('expect');
var rek = require("rekuire");


describe('Users IT', function () {

    var gibson;

    beforeEach(function (done) {
        gibson = rek('GibsonServer').create(done);
    });

    afterEach(function (done) {
        gibson.close(done);
    });

    it("should register a new user", function (done) {
        var server = request(gibson)

        server.post("/services/login")
            .send({ name: 'foo@bar.com', password: 'mypass' })
            .expect(500)
            .end(function(){
                server.post("/services/register")
                    .send({ name: 'foo@bar.com', password: 'mypass' })
                    .expect(200)
                    .end(function(){
                        server.post("/services/login")
                            .send({ name: 'foo@bar.com', password: 'mypass' })
                            .expect(200)
                            .end(done)
                    });
            })
    });
});
