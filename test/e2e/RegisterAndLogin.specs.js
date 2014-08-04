var rek = require("rekuire");
var Browser = require("zombie");
var assert = require("assert");

xdescribe("Register And Login end 2 end", function() {
    var server, browser, base;

    it("should be able to perform a register", function(done) {
        browser.visit(base + "/register", function() {
            browser
                .fill("username", "zombie@underworld.dead")
                .fill("password", "eat-the-living")
                .pressButton("Register", function() {
                    assert.ok(browser.success);
                    assert.equal(browser.location.pathname, "/wall");
                    done();
                })
        });
    });

    beforeEach(function(done) {
        server = rek("TestServer").create(done);
        browser = new Browser();
        base = "http://" + server.address().address + ":" + server.address().port;
    });
    afterEach(function() {
        server.close();
    })
});