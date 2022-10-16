import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe('Test Suite for Template Method design pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('#OrderBusines', () => {
        test('executing Order Business without Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            });

            const orderBusiness = new OrderBusiness();
            // todos devs devem obrigatoriamente lembrar de seguir a rica esse fluxo de execucao
            // se algum eesquecer de chamar a funcao de validaca, pode quebrar todo o sistema
            const isValid = orderBusiness._validateRequiredFields(order);
            expect(isValid).toBeTruthy();

            const result = orderBusiness._create(order);
            expect(result).toBeTruthy();
        });

        test('executing Order Business with Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            });

            const orderBusiness = new OrderBusiness();
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            );

            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            );

            // com Template Method a sequencia de passos e sempre executado
            // evita a replicacao de logica
            const result = orderBusiness.create(order);
            expect(result).toBeTruthy();
            expect(calledValidationFn).toHaveBeenCalled();
            expect(calledCreateFn).toHaveBeenCalled();

        });
    });
});