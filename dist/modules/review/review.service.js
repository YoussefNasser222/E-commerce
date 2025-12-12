"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
const mongoose_1 = require("mongoose");
class ReviewService {
    constructor() {
        this.reviewRepository = new DB_1.ReviewRepository();
        this.productRepository = new DB_1.ProductRepository();
        this.reviewFactory = new factory_1.ReviewFactory();
        this.orderRepository = new DB_1.OrderRepository();
        this.addReview = async (req, res) => {
            const reviewDTO = req.body;
            const productExist = await this.productRepository.getOne({
                _id: reviewDTO.productId,
            });
            if (!productExist) {
                throw new utils_1.NotFoundException("product not found");
            }
            const order = await this.orderRepository.getOne({
                userId: req.user._id,
                status: utils_1.StatusOrder.confirmed,
                "items.productId": reviewDTO.productId,
            });
            if (!order) {
                throw new utils_1.BadRequestException("order not confirmed");
            }
            const newReview = this.reviewFactory.create(reviewDTO, req.user._id);
            const createdReview = await this.reviewRepository.create(newReview);
            return res.status(201).json({
                message: "review created successfully",
                success: true,
                data: { createdReview },
            });
        };
        this.getMyReview = async (req, res) => {
            const { id } = req.params;
            const review = await this.reviewRepository.getOne({ _id: id }, {}, {
                populate: [
                    { path: "userId", select: "firstName lastName" },
                    { path: "productId", select: "name" },
                ],
            });
            if (!review) {
                throw new utils_1.NotFoundException("review not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { review } });
        };
        this.updateReview = async (req, res) => {
            const updateReviewDTO = req.body;
            const reviewExist = await this.reviewRepository.getOne({
                userId: req.user._id,
            });
            if (!reviewExist) {
                throw new utils_1.NotFoundException("review not found");
            }
            const updateReview = await this.reviewFactory.updateReview(updateReviewDTO, reviewExist);
            await this.reviewRepository.update({ _id: reviewExist._id }, updateReview);
            return res.sendStatus(204);
        };
        this.getAllReviews = async (req, res) => {
            const { id } = req.params;
            const objectId = new mongoose_1.Types.ObjectId(id);
            const reviews = await this.reviewRepository.getAll({ productId: objectId }, {}, {
                populate: [
                    { path: "userId", select: "firstName lastName" },
                    { path: "productId", select: "name" },
                ],
            });
            if (!reviews || reviews.length === 0) {
                throw new utils_1.NotFoundException("reviews not found");
            }
            return res
                .status(200)
                .json({ message: "done", success: true, data: { reviews } });
        };
    }
}
exports.default = new ReviewService();
