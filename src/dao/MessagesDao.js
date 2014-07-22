var guid = require("guid");
var Promise = require("q").Promise;
var rek = require("rekuire");
var User = rek("User");
var Message = rek("Message");
var _ = require("lodash");

var MessagesDao = (function() {
    function MessagesDao(db) {
        this.db = db;
    }

    MessagesDao.prototype.createTableIfNotExists = function() {
        var db = this.db;
        return new Promise(function(resolve, reject) {
            db.run("CREATE TABLE IF NOT EXISTS messages (" +
                "id varchar(40) PRIMARY KEY NOT NULL, " +
                "author varchar(400) NOT NULL, " +
                "body varchar(1000) NOT NULL, " +
                "dateCreated BIGINT NOT NULL" +
                ");", function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    };

    MessagesDao.prototype.post = function(message) {
        var db = this.db;
        return new Promise(function(resolve, reject) {
            db.run("INSERT INTO messages VALUES (?, ?, ?, ?)",
                message.id,
                JSON.stringify(message.author),
                message.body,
                message.dateCreated,
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(message);
                    }
                });
        });
    };

    MessagesDao.prototype.getMessages = function() {
        var db = this.db;
        return new Promise(function(resolve, reject) {
            db.all(
                "SELECT id, author, body, dateCreated " +
                "FROM messages",
                function(err, rows) {
                    if (err) {
                        reject(err)
                    } else {
                        try {
                            var messages = _(rows)
                                .map(function(row) {
                                    return Message.create({
                                        id: row.id,
                                        author: JSON.parse(row.author),
                                        body: row.body,
                                        dateCreated: row.dateCreated
                                    });
                                })
                                .sortBy("dateCreated")
                                .value();
                            resolve(messages);
                        } catch (e) {
                            reject(e);
                        }
                    }
                });
        });
    };

    return MessagesDao;
})();

module.exports = MessagesDao;