var request = require("request");
var q = require("q");

var TestTools = (function () {
    var methods = ['get', 'post', 'del', 'options', 'head'];

    function TestTools(server) {
        this.basePath = "http://" + server.address().address + ":" + server.address().port;
        this.jar = request.jar()
    }

    TestTools.prototype.run = function (commands, done) {
        resetCookies();
        runCommands(commands).then(function () {
            done()
        }).catch(done);
    };

    function resetCookies(){
        var jar = request.jar();
        request = require("request").defaults({jar:jar, followRedirect: false});
    }

    proxyRequestMethods();

    /** PRIVATES **/

    function runCommands(commands) {
        var result = q();
        commands.forEach(function (f) {
            result = result.then(f).fail(function (e) {
                throw e
            });
        });
        return result;
    }

    function proxyRequestMethods() {
        methods.forEach(function (method) {
            TestTools.prototype[method] = function get(uri) {
                var args = Array.prototype.slice.call(arguments, 0);

                if (typeof args[0] === "string") {
                    args[0] = this.basePath + uri;
                } else {
                    args[0] = this.basePath + args[0].uri;
                }

                return new q.Promise(function (resolve, reject) {
                    args.push(function (err, res, body) {
                        if (res === undefined) {
                            return reject(err);
                        } else {
                            return resolve({err: err, res: res, body: body});
                        }
                    });
                    request[method].apply(request, args);
                });
            };
        });
    }

    return TestTools;
})();


module.exports = TestTools;