"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const user_service_1 = __importDefault(require("./user.service"));
const router = (0, express_1.Router)();
router.get("/:id", middleware_1.isAuth, user_service_1.default.getUser);
router.patch("/:id", middleware_1.isAuth, user_service_1.default.updateUser);
exports.default = router;
