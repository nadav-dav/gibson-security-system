/*global require:false, describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var request = require('supertest');
var expect = require('expect');
var rek = require("rekuire");
var Promise = require("q").Promise;


describe('Users IT', function () {

    var gibson, server;


    it("should register a new user", function (done) {
        attemptLoginAndFail()
            .then(register)
            .then(attemptLoginAndSucceed)
            .then(done).catch(done);
    });

    /* -------------------------------------- */

    beforeEach(function (done) {
        gibson = rek('GibsonServer').create(done);
        server = request(gibson);
    });

    afterEach(function (done) {
        gibson.close(done);
    });

    var attemptLoginAndFail = requestPromise(function () {
        return server
            .post("/services/login")
            .send({ name: 'foo@bar.com', password: 'mypass' })
            .expect(500)
    });

    var register = requestPromise(function () {
        return server
            .post("/services/register")
            .send({ name: 'foo@bar.com', password: 'mypass' })
            .expect(200)
    });

    var attemptLoginAndSucceed = requestPromise(function () {
        return server
            .post("/services/login")
            .send({ name: 'foo@bar.com', password: 'mypass' })
            .expect(200)
    });
});

function requestPromise(fn) {
    return function () {
        return new Promise(function (resolve, reject) {
            fn().end(function (e) {
                return e ? reject(e) : resolve()
            })
        });
    };
}
