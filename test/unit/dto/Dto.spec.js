var rek = require("rekuire");
var Dto = rek('Dto');
var expect = require('expect');

describe("Dto", function () {
    var fields, Person;
    beforeEach(function () {
        fields = ['fname', 'lname'];
        Person = function Person() {
        };
    });

    it("should not allow to create a Dto without a name", function () {
        var MyClass = function () {};
        expect(function () {
            Dto.generate(fields, MyClass);
        }).toThrow()

        MyClass = function MyClass () {};
        expect(function () {
            Dto.generate(fields, MyClass);
        }).toNotThrow()
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
        expect(person.lname).toBe(null);
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

    it("should make the dto immutable", function () {
        Dto.generate(fields, Person);
        var person = Person.create({fname: 'foo', lname: 'bar'});
        person.fname = 'not foo';
        expect(person.fname).toBe('foo');
    });

    it("should have a copy method", function () {
        Dto.generate(fields, Person);
        var person = Person.create({fname: 'foo', lname: 'bar'});
        var personCopy = Person.copy(person, {lname: 'baz'});

        expect(personCopy.fname).toBe('foo');
        expect(personCopy.lname).toBe('baz');
    });

    it("should have toString that does not show the '__private' objects", function () {
        Dto.generate(fields, Person);
        var person = Person.create({fname: 'foo', lname: 'bar'});
        var personString = person.toString();
        expect(personString.indexOf("__privates")).toBe(-1);
    });
});