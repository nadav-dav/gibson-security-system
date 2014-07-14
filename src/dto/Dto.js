var Dto = (function () {
    function Dto() {
    }

    Dto.generate = function (fields, cls, defs) {
        var addDefaults = defs || function (a) {
            return a
        };
        cls.create = function (data) {
            var instance = new cls();
            fields.forEach(function (fieldName) {
                instance[fieldName] = data[fieldName];
            });
            addDefaults(instance);
            cls.validate(instance);

            return instance;
        };

        cls.validate = function (instance) {
            fields.forEach(function (fieldName) {
                if (instance[fieldName] === undefined) {
                    throw new Error("Failed to create " + cls.name + " object, missing [" + fieldName + "]");
                }
            });
        };

        cls.areEqual = function(a, b){
            var isEqual = true;
            fields.forEach(function (fieldName) {
                if (a[fieldName] !== b[fieldName]) {
                    isEqual = false;
                }
            });
            return isEqual ;
        };
    };

    return Dto;
})();

module.exports = Dto;
