var rek = require("rekuire");
var Session = rek("Session");
var expect = rek("expect");
var build = rek("Builders");

describe("Session", function () {
    var session, user;

    beforeEach(function () {
        session = new Session();
        user = build.aUser();
    });

    it("should allow to log users in and get a session", function () {
        var sessionId = session.loginUser(user);
        expect(sessionId).toNotBe(null);
    });


    it("should allow set 'user' field to the user object", function () {
        var sessionId = session.loginUser(user);
        var sessionData = session.getSessionData(sessionId);
        expect(sessionData.user).toEqual(user);
    });

    it("should be able to store are retrieve data", function () {
        var sessionId = session.loginUser(user);
        session.getSessionData(sessionId)["foo"] = "bar";

        expect(session.getSessionData(sessionId)["foo"]).toBe("bar");
    });

    it("should be able to logout a session", function () {
        var sessionId = session.loginUser(user);
        session.logout(sessionId);
        var sessionData = session.getSessionData(sessionId);
        expect(sessionData).toBe(undefined);
    });

    it("should be able to support more than one user", function () {
        var user1 = build.aUser({name: "User1"});
        var user2 = build.aUser({name: "User2"});
        var sessionId1 = session.loginUser(user1);
        var sessionId2 = session.loginUser(user2);

        expect
            (session.getSessionData(sessionId1).user)
            .toEqual(user1)

        expect
            (session.getSessionData(sessionId2).user)
            .toEqual(user2)

    });

    it("should create a different session after every login", function () {
        var firstSessionId =    session.loginUser(user);
                                session.logout(firstSessionId);
        var secondSessionId =   session.loginUser(user);

        expect(firstSessionId).toNotEqual(secondSessionId);
    });

});