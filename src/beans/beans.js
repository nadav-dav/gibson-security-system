var rek = require("rekuire");
var sqlite3 = require('sqlite3').verbose();
var UsersDao = rek("UsersDao");
var Session = rek("Session");
var ExpressSessionHelper = rek("ExpressSessionHelper");

var dataStore = isDevelopment() ? new sqlite3.Database(':memory:') : new sqlite3.Database('gibson.sqlite3')
var usersDao = new UsersDao(dataStore);
    usersDao.createTableIfNotExists();
var session = new Session();
var expressSessionHelper = new ExpressSessionHelper(usersDao);

module.exports = {
    db: {
        datastore: dataStore,
        usersDao: usersDao
    },
    session: {
        session: session,
        expressSessionHelper: expressSessionHelper
    }
};

function isDevelopment(){
    return process.env.NODE_ENV !== "production"
}