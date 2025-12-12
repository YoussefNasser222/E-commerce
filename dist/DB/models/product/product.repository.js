"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const abstraction_repository_1 = require("../../abstraction.repository");
const product_model_1 = require("./product.model");
class ProductRepository extends abstraction_repository_1.AbstractRepository {
    constructor() {
        super(product_model_1.Product);
    }
}
exports.ProductRepository = ProductRepository;
