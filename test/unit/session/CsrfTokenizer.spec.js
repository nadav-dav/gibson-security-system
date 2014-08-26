var rek = require("rekuire");
var CsrfTokenizer = rek("CsrfTokenizer");
var expect = require("expect");
var guid = require("guid");

describe("CSRF Tokenizer", function () {

    var tokenizer = new CsrfTokenizer("mypassword");
    var userId = guid.raw();

    it("should create and validate a token", function () {
        var token = tokenizer.createTokenFor(userId);

        expect(tokenizer.validate(token, userId)).toBe(true);
        expect(tokenizer.validate(token, "not userId")).toBe(false);
    });
});