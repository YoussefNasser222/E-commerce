"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_schema_1 = require("./order.schema");
exports.Order = (0, mongoose_1.model)("Order", order_schema_1.orderSchema);
