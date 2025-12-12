"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cart_schema_1 = require("./cart.schema");
exports.Cart = (0, mongoose_1.model)("Cart", cart_schema_1.cartSchema);
