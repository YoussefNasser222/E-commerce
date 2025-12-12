"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const abstraction_repository_1 = require("../../abstraction.repository");
const review_model_1 = require("./review.model");
class ReviewRepository extends abstraction_repository_1.AbstractRepository {
    constructor() {
        super(review_model_1.Review);
    }
}
exports.ReviewRepository = ReviewRepository;
