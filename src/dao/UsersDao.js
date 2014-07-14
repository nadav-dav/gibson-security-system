var guid = require('guid');
var Promise = require('q').Promise;
var rek = require("rekuire");
var User = rek("User");

var UsersDao = (function () {
    function UsersDao(db) {
        this.db = db;
    }

    UsersDao.prototype.createTableIfNotExists = function () {
        var db = this.db;
        return new Promise(function (resolve, reject) {
            db.prepare("CREATE TABLE IF NOT EXISTS users (" +
                    "id varchar(40) PRIMARY KEY NOT NULL, " +
                    "name varchar(100) NOT NULL, " +
                    "password varchar(100) NOT NULL, " +
                    "dateCreated BIGINT NOT NULL" +
                    ");")
                .run()
                .finalize(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    };

    UsersDao.prototype.save = function (user) {
        var db = this.db;
        return new Promise(function (resolve, reject) {
            db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)")
                .run(
                    user.id,
                    user.name,
                    user.password,
                    user.dateCreated
                ).finalize(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    };
    UsersDao.prototype.getUserById = function (userId) {
        var db = this.db;
        return new Promise(function (resolve, reject) {
            var user;
            db.prepare(
                "SELECT id, name, password, dateCreated " +
                "FROM users " +
                "WHERE id = ?")
                .get(userId, function (err, row) {
                    if (err) {
                        reject(err)
                    } else {
                        try {
                            user = User.create(row);
                            resolve(user);
                        } catch (e){
                            reject(e);
                        }
                    }
                });
        });

    };

    return UsersDao;
})();

module.exports = UsersDao;