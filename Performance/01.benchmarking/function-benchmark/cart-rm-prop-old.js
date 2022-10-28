
import Product from "../src/entities/product.js";

// import { v4 as uuid } from "uuid";
import { randomUUID as uuid } from "crypto";

export default class Cart {
    constructor({ at, products }) {
        this.id = uuid();
        this.at = at;
        this.products = this.removeUndefinedProps(products);
    }

    removeUndefinedProps(products) {
        const productEntities = products
            .filter(product => !!Reflect.ownKeys(product).length)
            .map(product => new Product(product));

        return JSON.parse(JSON.stringify(productEntities));
    }

}