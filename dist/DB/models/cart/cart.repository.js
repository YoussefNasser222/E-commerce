"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const abstraction_repository_1 = require("../../abstraction.repository");
const cart_model_1 = require("./cart.model");
class CartRepository extends abstraction_repository_1.AbstractRepository {
    constructor() {
        super(cart_model_1.Cart);
    }
}
exports.CartRepository = CartRepository;
