"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const order_validation_1 = require("./order.validation");
const order_service_1 = __importDefault(require("./order.service"));
const router = (0, express_1.Router)();
router.post("/", middleware_1.isAuth, (0, middleware_1.isValid)(order_validation_1.orderValidationSchema), order_service_1.default.createOrder);
router.get("/get-my-order", middleware_1.isAuth, order_service_1.default.getMyOrder);
router.get("/admin/orders", middleware_1.isAuth, middleware_1.isAdmin, order_service_1.default.getAllOrder);
router.patch("/admin/:id", middleware_1.isAuth, middleware_1.isAdmin, order_service_1.default.updateOrder);
router.delete("/:id", middleware_1.isAuth, order_service_1.default.cancelOrder);
router.delete("/admin/:id", middleware_1.isAuth, middleware_1.isAdmin, order_service_1.default.deleteOrder);
exports.default = router;
