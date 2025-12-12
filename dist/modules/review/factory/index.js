"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewFactory = void 0;
const mongoose_1 = require("mongoose");
const entity_1 = require("../entity");
class ReviewFactory {
    create(reviewDTO, userId) {
        const newReview = new entity_1.NewReview();
        newReview.comment = reviewDTO.comment ?? undefined;
        newReview.productId = new mongoose_1.Types.ObjectId(reviewDTO.productId);
        newReview.userId = userId;
        return newReview;
    }
    updateReview(updateReviewDTO, reviewExist) {
        reviewExist.rating = updateReviewDTO.rating ?? reviewExist.rating;
        reviewExist.comment = updateReviewDTO.comment ?? reviewExist.comment;
        return reviewExist;
    }
}
exports.ReviewFactory = ReviewFactory;
