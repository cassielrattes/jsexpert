import mocha from "mocha";
const { describe, it } = mocha;
import chai from "chai";
const { expect } = chai;

import Person from "./../src/person.js";

describe("Person", () => {
    it("should return a person instance from a string", () => {
        const person = Person.generateInstanceFromString(
            '2 Bike,Navio 20000 2000-01-01 2002-01-01'
        );

        const expected = {
            from: '2000-01-01',
            to: '2002-01-01',
            vehicles: ['Bike', 'Navio'],
            kmTraveled: '20000',
            id: '2'
        };
        expect(person).to.be.deep.equal(expected);
    });

    it('should return values', () => {
        const person = new Person({
            from: '2000-01-01',
            to: '2002-01-01',
            vehicles: ['Bike', 'Navio'],
            kmTraveled: '20000',
            id: '2'
        });

        const result = person.formatted('pt-BR');

        const expected = {
            id: 2,
            vehicles: 'Bike e Navio',
            kmTraveled: '20.000 km',
            from: '01 de janeiro de 2000',
            to: '01 de janeiro de 2002'
        };

        expect(result).to.be.deep.equal(expected);


    });

});