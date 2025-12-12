"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const category_validation_1 = require("./category.validation");
const category_service_1 = __importDefault(require("./category.service"));
const isAdmin_middleware_1 = require("../../middleware/isAdmin.middleware");
const router = (0, express_1.Router)();
router.post("/", middleware_1.isAuth, isAdmin_middleware_1.isAdmin, (0, middleware_1.isValid)(category_validation_1.categoryValidationSchema), category_service_1.default.addCategory);
router.delete("/:id", middleware_1.isAuth, isAdmin_middleware_1.isAdmin, category_service_1.default.deleteCategory);
router.patch("/:id", middleware_1.isAuth, isAdmin_middleware_1.isAdmin, (0, middleware_1.isValid)(category_validation_1.categoryValidationSchema), category_service_1.default.updateCategory);
router.get("/", category_service_1.default.getAllCategory);
router.get("/:id", category_service_1.default.getSpecifyCategory);
exports.default = router;
