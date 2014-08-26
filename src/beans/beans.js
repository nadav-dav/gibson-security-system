var rek = require("rekuire");
var sqlite3 = require('sqlite3').verbose();
var UsersDao = rek("UsersDao");
var MessagesDao = rek("MessagesDao");
var Session = rek("Session");
var ExpressSessionHelper = rek("ExpressSessionHelper");
var CsrfTokenizer = rek("CsrfTokenizer");

var dataStore = isDevelopment() ? new sqlite3.Database(':memory:') : new sqlite3.Database('gibson.sqlite3')
var usersDao = new UsersDao(dataStore);
    usersDao.createTableIfNotExists();
var messagesDao = new MessagesDao(dataStore);
    messagesDao.createTableIfNotExists();
var session = new Session();
var expressSessionHelper = new ExpressSessionHelper(usersDao);
var tokenizer = new CsrfTokenizer("password for csrf token + vdbo;jnuerglknxcv,me?AS?D");

module.exports = {
    db: {
        datastore: dataStore,
        usersDao: usersDao,
        messagesDao: messagesDao
    },
    session: {
        session: session,
        expressSessionHelper: expressSessionHelper,
        tokenizer: tokenizer
    }
};

function isDevelopment(){
    return process.env.NODE_ENV !== "production"
}