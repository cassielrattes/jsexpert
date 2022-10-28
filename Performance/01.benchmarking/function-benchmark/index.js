import Benchmark from "benchmark";
import CartOld from "./cart-id-old.js";
import CartNew from "./cart-id-new.js";
import CartRmPropNew from "./cart-rm-prop-new.js";
import CartRmPropOld from "./cart-rm-prop-old.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";
import database from "../database.js";

const suite = new Benchmark.Suite;

// suite
//     .add('Cart#cartIdUUID', function () {
//         new CartOld();
//     })
//     .add('Cart#CartIdCrypto', function () {
//         new CartNew();

//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function (event) {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//     })
//     .run();

// const data = {
//     at: new Date().toISOString(),
//     products: [
//         {
//             id: 'ae',
//             n: undefined,
//             abc: undefined,
//             a: null,
//             b: 123
//         },
//         {
//             id: 'ae',
//             n: undefined,
//             abc: undefined,
//             a: null,
//             b: 123
//         },
//     ]
// };

// suite
//     .add('Cart#rmEmptyPropsMapReduce', function () {
//         new CartRmPropOld(data);
//     })
//     .add('Cart#rmEmptyPropsFor', function () {
//         new CartRmPropNew(data);

//     })
//     .on('cycle', (event) => console.log(String(event.target)))
//     .on('complete', function (event) {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`);
//     })
//     .run({ async: true });



suite
    .add('Cart#calcPriceMapReduce', function () {
        new CartPriceOld(database).getCartPrice();
    })
    .add('Cart#calcPriceFor', function () {
        new CartPriceNew(database).getCartPrice();

    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function (event) {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });
