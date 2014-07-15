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
            db.run("CREATE TABLE IF NOT EXISTS users (" +
                "id varchar(40) PRIMARY KEY NOT NULL, " +
                "name varchar(100) NOT NULL UNIQUE, " +
                "password varchar(100) NOT NULL, " +
                "dateCreated BIGINT NOT NULL" +
                ");", function (err) {
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
            db.run("INSERT INTO users VALUES (?, ?, ?, ?)",
                user.id,
                user.name,
                user.password,
                user.dateCreated,
                function (err) {
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
            db.get(
                "SELECT id, name, password, dateCreated " +
                    "FROM users " +
                    "WHERE id = ?",
                userId,
                function (err, row) {
                    if (err) {
                        reject(err)
                    } else {
                        try {
                            user = User.create(row);
                            resolve(user);
                        } catch (e) {
                            reject(e);
                        }
                    }
                });
        });
    };

    UsersDao.prototype.getUserByNameAndPassword = function (name, password) {
        var db = this.db;
        return new Promise(function (resolve, reject) {
            db.get(
                "SELECT id, name, password, dateCreated " +
                    "FROM users " +
                    "WHERE name = '" + name + "' AND" +
                    "      password = '" + password + "'",
                function (err, row) {
                    if (err) {
                        reject(err)
                    } else {
                        try {
                            var user = User.create(row);
                            resolve(user);
                        } catch (e) {
                            reject(e);
                        }
                    }
                });
        });
    };

    return UsersDao;
})();

module.exports = UsersDao;