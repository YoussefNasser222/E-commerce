"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.addProductValidation = exports.objectIdSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = require("mongoose");
exports.objectIdSchema = zod_1.default.string().refine((val) => {
    return mongoose_1.Types.ObjectId.isValid(val);
}, {
    message: "invalid ObjectId format"
});
exports.addProductValidation = zod_1.default.object({
    name: zod_1.default.string().min(2),
    description: zod_1.default.string().min(5),
    price: zod_1.default.number().positive(),
    priceAfterDiscount: zod_1.default.number().positive().optional(),
    stock: zod_1.default.number().nonnegative(),
    sold: zod_1.default.number().nonnegative().optional(),
    categoryId: exports.objectIdSchema,
    brand: zod_1.default.string().optional(),
});
exports.updateProductSchema = zod_1.default.object({
    name: zod_1.default.string().min(2).optional(),
    description: zod_1.default.string().min(5).optional(),
    price: zod_1.default.number().positive().optional(),
    priceAfterDiscount: zod_1.default.number().positive().optional(),
    stock: zod_1.default.number().nonnegative().optional(),
    sold: zod_1.default.number().nonnegative().optional(),
    brand: zod_1.default.string().optional(),
});
