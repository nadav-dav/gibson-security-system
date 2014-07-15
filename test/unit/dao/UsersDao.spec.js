var rek = require("rekuire");
var expect = require('expect');
var User = rek("User");
var UsersDao = rek("UsersDao");
var sqlite3 = require('sqlite3').verbose();
var guid = require('guid');

describe("UsersDao", function () {
    var db, userDao, user;

    beforeEach(function (done) {
        db = new sqlite3.Database(':memory:');
        userDao = new UsersDao(db);
        userDao.createTableIfNotExists()
            .then(done)
            .fin(done);
        user = User.create({id: guid.raw(), name: "Foo Bar", password: "mypass"});
    });

    it("should add and retrieve users", function (done) {
        userDao.save(user)
            .then(function () {
                return userDao.getUserById(user.id);
            })
            .then(function (retrievedUser) {
                expect(User.areEqual(user, retrievedUser)).toBe(true);
            })
            .fin(done)

    });

    it("should not allow two users with the same name", function (done) {
        userDao.save(user)
            .then(function () {
                return userDao.save(user)
            })
            .then(function () {
                done(new Error("Failing: Saving the same user twice should have failed."));
            })
            .catch(function (e) {
                done();
            })
    });

    it("should not allow two users to have the same name", function (done) {
        var user1 = User.create({id: guid.raw(), name: "Foo Bar", password: "mypass"});
        var user2 = User.create({id: guid.raw(), name: "Foo Bar", password: "otherpass"});

        userDao.save(user1)
            .then(function () {
                return userDao.save(user2)
            })
            .then(function () {
                done(new Error("Failing: Saving the a two users with the same name should have failed."));
            })
            .catch(function (e) {
                done();
            })
    });
});