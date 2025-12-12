"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const product_schema_1 = require("./product.schema");
exports.Product = (0, mongoose_1.model)("Product", product_schema_1.productSchema);
