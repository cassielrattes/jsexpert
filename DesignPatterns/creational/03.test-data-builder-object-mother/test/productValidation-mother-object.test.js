const { expect } = require("chai");
const { it, describe } = require("mocha");

const { productValidator } = require("../src/index");
const ProductMotherObject = require("./model/productMotherObject");


describe("Test Mother Object", () => {
    it("Shouldn\'t return error with valid product", () => {
        const product = ProductMotherObject.valid();
        const result = productValidator(product);

        const expected = {
            errors: [],
            result: true
        };

        expect(result).to.be.deep.equal(expected);
    });

    describe("Product Validation Rules", () => {
        it("Should return an object error when creating a Product with invalid id", () => {
            const product = ProductMotherObject.withInvalidId();
            const result = productValidator(product);

            const expected = {
                errors: ["id: invalid length, current [1], expected to be between 2 and 20"],
                result: false
            };

            expect(result).to.be.deep.equal(expected);
        });

        it("Should return an object error when creating a Product with invalid name", () => {
            const product = ProductMotherObject.withInvalidName();
            const result = productValidator(product);

            const expected = {
                errors: ["name: invalid value, current [abc123], expected to have only words"],
                result: false
            };

            expect(result).to.be.deep.equal(expected);
        });

        it("Should return an object error when creating a Product with invalid price", () => {
            const product = ProductMotherObject.withInvalidPrice();
            const result = productValidator(product);

            const expected = {
                errors: ["price: invalid value, current [2000], expected to between 1 and 1000"],
                result: false
            };

            expect(result).to.be.deep.equal(expected);
        });

        it("Should return an object error when creating a Product with invalid category", () => {
            const product = ProductMotherObject.withInvalidCategory();
            const result = productValidator(product);

            const expected = {
                errors: ["category: invalid value, current [mecanic], expected to be either electronic or organic"],
                result: false
            };

            expect(result).to.be.deep.equal(expected);
        });
    });
});