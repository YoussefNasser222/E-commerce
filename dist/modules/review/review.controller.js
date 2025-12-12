"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const review_validation_1 = require("./review.validation");
const review_service_1 = __importDefault(require("./review.service"));
const router = (0, express_1.Router)();
router.post("/", middleware_1.isAuth, (0, middleware_1.isValid)(review_validation_1.reviewValidationSchema), review_service_1.default.addReview);
router.get("/:id", middleware_1.isAuth, review_service_1.default.getMyReview);
router.patch("/:id", middleware_1.isAuth, review_service_1.default.updateReview);
router.get("/admin/:id", middleware_1.isAuth, middleware_1.isAdmin, review_service_1.default.getAllReviews);
exports.default = router;
