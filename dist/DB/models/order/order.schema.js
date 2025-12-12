"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
const itemSchema = new mongoose_1.Schema({
    price: {
        type: Number,
        required: true,
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
    },
});
exports.orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String, required: true },
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: utils_1.Payment,
        default: utils_1.Payment.cash,
    },
    status: {
        type: String,
        enum: utils_1.StatusOrder,
        default: utils_1.StatusOrder.pending,
    },
    items: {
        type: [itemSchema],
    },
    orderNumber: {
        type: String,
        unique: true,
    },
}, { timestamps: true });
exports.orderSchema.pre("save", async function (next) {
    if (!this.orderNumber) {
        this.orderNumber = `ORDN-${Date.now()}`;
    }
});
