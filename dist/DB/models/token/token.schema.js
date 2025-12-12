"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
exports.tokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: utils_1.TokenType,
        default: utils_1.TokenType.access,
    },
}, { timestamps: true });
