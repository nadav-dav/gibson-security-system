var rek = require("rekuire");
var expect = require('expect');
var User = rek("User");
var UsersDao = rek("UsersDao");
var sqlite3 = require('sqlite3').verbose();
var guid = require('guid');

describe("UsersDao", function () {
    var db, userDao;

    beforeEach(function (done) {
        db = new sqlite3.Database(':memory:');
        userDao = new UsersDao(db)
        userDao.createTableIfNotExists()
            .then(done)
            .fin(done)
    });

    it("should add and retrieve users", function (done) {
        var user = aUser();
        userDao.save(user)
            .then(function(){
                return userDao.getUserById(user.id);
            })
            .then(function(retrievedUser){
                expect(User.areEqual(user, retrievedUser)).toBe(true);
            })
            .fin(done)

    });

    it("should not allow two users with the same name", function () {

    });

    function aUser() {
        return User.create({id: guid.raw(), name: "Foo Bar", password: "mypass"});
    };
});