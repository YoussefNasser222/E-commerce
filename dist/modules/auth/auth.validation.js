"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetpasswordSchema = exports.logInValidationSchema = exports.verifyAccountSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const utils_1 = require("../../utils");
exports.registerSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(3).max(10),
    lastName: zod_1.default.string().min(3).max(10),
    password: zod_1.default.string().min(5),
    phoneNumber: zod_1.default.string().length(11).optional(),
    gender: zod_1.default.enum(utils_1.Gender),
    dob: zod_1.default.string(),
    email: zod_1.default.email(),
    address: zod_1.default.string().optional(),
});
exports.verifyAccountSchema = zod_1.default.object({
    email: zod_1.default.email(),
    otp: zod_1.default.string().length(5),
});
exports.logInValidationSchema = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(3),
});
exports.resetpasswordSchema = zod_1.default.object({
    email: zod_1.default.email(),
    otp: zod_1.default.string().length(5),
    newPassword: zod_1.default.string().min(5),
});
