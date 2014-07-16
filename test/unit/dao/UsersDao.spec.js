var rek = require("rekuire");
var expect = rek("expect");
var UsersDao = rek("UsersDao");
var guid = rek("guid");
var build = rek("Builders");

describe("UsersDao", function () {
    var db, userDao, user;

    beforeEach(function (done) {
        db = rek("InMemoryDb").create();
        userDao = new UsersDao(db);
        userDao.createTableIfNotExists()
            .then(done)
            .catch(done);
        user = build.aUser();
    });

    it("should add and retrieve users", function (done) {
        userDao.save(user)
            .then(function () {
                return userDao.getUserById(user.id);
            })
            .then(function (retrievedUser) {
                expect(user).toEqual(retrievedUser);
            })
            .then(done)
            .catch(done)
    });

    it("should get a user by its name and password", function (done) {
        userDao.save(user)
            .then(function () {
                return userDao.getUserByNameAndPassword(user.name, user.password);
            })
            .then(function (retrievedUser) {
                expect(user).toEqual(retrievedUser);
            })
            .then(done)
            .catch(done)
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
        var user1 = build.aUser({password: "mypass"});
        var user2 = build.aUser({password: "not mypass"});

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