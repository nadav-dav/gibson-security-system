var rek = require("rekuire");
var Session = rek("Session");
var User = rek("User");
var expect = rek("expect");

describe("Session", function () {
    var session, user;

    beforeEach(function () {
        session = new Session();
        user = User.create({name: "User", password: "Password"});
    });

    it("should allow to log users in and get a session", function () {
        var sessionId = session.loginUser(user);
        expect(sessionId).toNotBe(null);
    });


    it("should allow set 'user' field to the user object", function () {
        var sessionId = session.loginUser(user);
        var sessionData = session.sessionOf(sessionId);
        expect(User.areEqual(sessionData.user, user)).toBe(true);
    });

    it("should be able to store are retrieve data", function () {
        var sessionId = session.loginUser(user);
        session.sessionOf(sessionId)["foo"] = "bar";

        sessionId = session.loginUser(user);
        expect(session.sessionOf(sessionId)["foo"]).toBe("bar");
    });

    it("should be able to delete session", function () {
        var sessionId = session.loginUser(user);
        session.logout(sessionId);
        var sessionData = session.sessionOf(sessionId);
        expect(sessionData).toBe(undefined);
    });
});