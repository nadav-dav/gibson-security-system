var rek = require("rekuire");
var expect = rek("expect");
var MessagesDao = rek("MessagesDao");
var guid = rek("guid");
var build = rek("Builders");
var Message = rek("Message");

describe("MessagesDao", function () {
    var db, messagesDao, message, user;

    beforeEach(function (done) {
        db = rek("InMemoryDb").create();
        messagesDao = new MessagesDao(db);
        messagesDao.createTableIfNotExists()
            .then(done)
            .catch(done);
        user = build.aUser();
        message = Message.create({author: user.name, body: "Hello"})
    });

    it("should save a get a message", function (done) {
        messagesDao.post(message)
            .then(function () {
                return messagesDao.getMessages();
            })
            .then(function (messages) {
                expect(messages).toEqual([message]);
            })
            .then(done)
            .catch(done)
    });

    it("should save more than one message", function (done) {
        var message1 = Message.create({author: user.name, body: "Hello1"});
        var message2 = Message.create({author: user.name, body: "Hello2"});

        messagesDao.post(message1)
            .then(function(){
                messagesDao.post(message2)
            })
            .then(function () {
                return messagesDao.getMessages();
            })
            .then(function (messages) {
                expect(messages).toEqual([message1, message2]);
            })
            .then(done)
            .catch(done)
    });

    it("should sort messages according to dateCreated and not when it was posted into the system", function (done) {
        var now = Date.now();
        var message1 = Message.create({author: user.name, body: "Hello1", dateCreated: now});
        var message2 = Message.create({author: user.name, body: "Hello2", dateCreated: now - 10});

        messagesDao.post(message1)
            .then(function(){
                messagesDao.post(message2)
            })
            .then(function () {
                return messagesDao.getMessages();
            })
            .then(function (messages) {
                expect(messages).toEqual([message2, message1]);
            })
            .then(done)
            .catch(done)
    });
});