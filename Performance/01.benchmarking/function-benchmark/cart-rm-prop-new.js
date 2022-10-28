
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
        const result = [];
        for (const product of products) {
            const keys = Reflect.ownKeys(product);
            if (!keys.length) continue;

            // 2
            // keys.forEach(key => product[key] || delete product[key]);
            // keys.forEach(key => product[key] || Reflect.deleteProperty(product, key));
            // result.push(new Product(product));

            // 3
            let newObject = {};
            keys.forEach(key => {
                if (!keys[key]) return;

                newObject[key] = keys[key];
            });

            result.push(new Product(product));

            // 1
            // result.push(JSON.parse(JSON.stringify(new Product(product))));
        }

        return result;
    }

}