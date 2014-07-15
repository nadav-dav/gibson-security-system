var Dto = (function () {
    function Dto() {}

    Dto.generate = function (fields, cls, defs) {
        if (cls.name === ""){
            throw new Error("Cannot create a Dto without a name, " +
                "please make sure you name the class function: for example: `var ClassName = function ClassName (){}` ")
        }

        var addDefaults = defs || function (a) {
            return a
        };

        cls.create = function (data) {
            var instance = new cls();
            fields.forEach(function (fieldName) {
                instance[fieldName] = data[fieldName];
            });
            addDefaults(instance);
            Dto.validate (fields, cls, instance);
            Dto.makeImmutable (fields, instance);

            return instance;
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

        cls.copy = function(original, changes){
            var data = {};
            fields.forEach(function (fieldName) {
                if (changes[fieldName] !== undefined) {
                    data[fieldName] = changes[fieldName];
                } else {
                    data[fieldName] = original[fieldName];
                }
            });
            return cls.create(data);
        };
    };





    Dto.validate = function (fields, cls, instance) {
        fields.forEach(function (fieldName) {
            if (instance[fieldName] === undefined) {
                throw new Error("Failed to create a '" + cls.name + "' object, missing [" + fieldName + "]");
            }
        });
    };

    Dto.makeImmutable = function(fields, instance) {
        instance.__privates = {};
        fields.forEach(function (fieldName) {
            instance.__privates[fieldName] = instance[fieldName];
            instance.__defineGetter__(fieldName, function(){
                return instance.__privates[fieldName];
            });
            instance.__defineSetter__("fieldName", function(val){
                //do nothing
            });
        });
    };

    return Dto;
})();

module.exports = Dto;
