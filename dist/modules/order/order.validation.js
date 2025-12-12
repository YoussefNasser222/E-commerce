"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = exports.addressSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addressSchema = zod_1.default.object({
    city: zod_1.default.string(),
    street: zod_1.default.string(),
    building: zod_1.default.string()
});
exports.orderValidationSchema = zod_1.default.object({
    address: exports.addressSchema,
});
