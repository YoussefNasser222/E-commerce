"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const product_validation_1 = require("../product/product.validation");
exports.addToCartValidationSchema = zod_1.default.object({
    productId: product_validation_1.objectIdSchema,
    quantity: zod_1.default.number().nonnegative(),
});
