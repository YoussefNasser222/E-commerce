"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const product_validation_1 = require("../product/product.validation");
exports.reviewValidationSchema = zod_1.default.object({
    comment: zod_1.default.string().min(3).optional(),
    productId: product_validation_1.objectIdSchema,
    rating: zod_1.default.number().int().min(1).max(5),
});
