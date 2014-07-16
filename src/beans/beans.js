var rek = require("rekuire");
var sqlite3 = require('sqlite3').verbose();
var UsersDao = rek("UsersDao");

module.exports = {
    db: getDbBeans()
};

function isDevelopment(){
    return process.env.NODE_ENV !== "production"
}

function getDbBeans(){
    var dataStore = isDevelopment() ? new sqlite3.Database(':memory:') : new sqlite3.Database('gibson.sqlite3')
    var usersDao = new UsersDao(dataStore);
        usersDao.createTableIfNotExists();
    return {
        datastore: dataStore,
        usersDao: usersDao
    }
}