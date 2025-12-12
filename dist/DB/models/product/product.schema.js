"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    priceAfterDiscount: {
        type: Number,
    },
    brand: {
        type: String
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    mainImage: {
        public_id: String,
        secure_url: String
    },
    images: [{
            public_id: String,
            secure_url: String
        }],
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
