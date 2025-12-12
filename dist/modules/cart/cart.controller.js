"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const cart_validation_1 = require("./cart.validation");
const cart_service_1 = __importDefault(require("./cart.service"));
const router = (0, express_1.Router)();
router.patch("/", middleware_1.isAuth, (0, middleware_1.isValid)(cart_validation_1.addToCartValidationSchema), cart_service_1.default.addToCart);
router.get("/", middleware_1.isAuth, cart_service_1.default.getMyCart);
router.delete("/remove", middleware_1.isAuth, cart_service_1.default.removeItem);
router.delete("/clear", middleware_1.isAuth, cart_service_1.default.clearCart);
exports.default = router;
