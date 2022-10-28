import database from "../database.js";
import Cart from "./entities/cart.js";
import Product from "./entities/product.js";

const cart = new Cart(database);

console.log(cart);