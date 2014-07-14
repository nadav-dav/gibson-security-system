var rek = require("rekuire");
var Dto = rek('Dto');
var expect = require('expect');

describe("Dto", function () {
    var fields, Person;
    beforeEach(function () {
        fields = ['fname', 'lname'];
        Person = function () {
        };
    });

    it("should generate new Dto's", function () {
        Dto.generate(fields, Person);

        var person = Person.create({fname: 'foo', lname: 'bar'});
        expect(person.fname).toBe('foo');
        expect(person.lname).toEqual('bar')
    });

    it("should validate all fields are populated", function () {
        Dto.generate(fields, Person);
        expect(function () {
            Person.create({lname: 'bar'});
        }).toThrow();
    });

    it("should allow null values", function () {
        Dto.generate(fields, Person);

        var person = Person.create({fname: 'foo', lname: null});
        expect(person.fname).toBe('foo');
        expect(person.lname).toEqual(null);
    });

    it("should allow for default values creation", function () {
        Dto.generate(fields, Person, function (person) {
            person.fname = person.lname;
        });
        expect(function () {
            Person.create({lname: 'bar'});
        }).toNotThrow();
    });

    it("should allow comparison between dtos", function () {
        Dto.generate(fields, Person);
        var person1 = Person.create({fname: 'foo', lname: 'bar'});
        var person2 = Person.create({fname: 'foo', lname: 'bar'});
        var person3 = Person.create({fname: 'foo', lname: 'baz'});
        expect(Person.areEqual(person1, person2)).toBe(true);
        expect(Person.areEqual(person1, person3)).toBe(false);
    });
});