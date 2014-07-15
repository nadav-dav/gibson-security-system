var sqlite3 = require('sqlite3').verbose();

module.exports = {
    create: function(){
        return new sqlite3.Database(':memory:');
    }
};