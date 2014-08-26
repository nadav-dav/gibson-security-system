var CryptoJS = require("crypto-js");

var CsrfTokenizer = (function () {
    var _pass;

    function CsrfTokenizer(pass) {
        _pass = pass;
    }

    CsrfTokenizer.prototype.createTokenFor = function (identifier) {
        return encrypt(identifier);
    };

    CsrfTokenizer.prototype.validate = function (encryptedIdentifier, identifier) {
        var decrypted = decrypt(encryptedIdentifier);
        return decrypted === identifier;
    };


    function encrypt(msg){
        return CryptoJS.AES.encrypt(msg, _pass).toString();
    }

    function decrypt(encMsg){
        return CryptoJS.AES.decrypt(encMsg, _pass).toString(CryptoJS.enc.Utf8)
    }

    return CsrfTokenizer;
})();

module.exports = CsrfTokenizer;