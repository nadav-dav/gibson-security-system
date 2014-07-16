var rek = require("rekuire");
var User = rek("User");

module.exports.aUser = function(option){
    option = option || {};
    var name = option.name || "User";
    var password = option.password || "Password";
    return User.create({name: name, password: password});
};