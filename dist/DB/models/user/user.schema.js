"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        trim: true,
        minlength: 4,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    otp: {
        type: String,
    },
    otpExpire: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        trim: true,
    },
    dob: Date,
    gender: {
        type: String,
        enum: utils_1.Gender,
    },
    role: {
        type: String,
        enum: utils_1.Role,
        default: utils_1.Role.user,
    },
    userAgent: {
        type: String,
        enum: utils_1.Agent,
        default: utils_1.Agent.local,
    },
    credentialUpdatedAt: {
        type: Date
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userSchema.virtual("fullName").get(function () {
    return `${this.firstName}  ${this.lastName}`;
});
