import { Request, Response } from "express";
import { OrderRepository, ProductRepository, ReviewRepository } from "../../DB";
import { ReviewDTO, UpdateReviewDTO } from "./review.DTO";
import {
  BadRequestException,
  IProduct,
  NotFoundException,
  Role,
  StatusOrder,
  UnAuthorizedException,
} from "../../utils";
import { ReviewFactory } from "./factory";
import { ObjectId, Types } from "mongoose";

class ReviewService {
  private readonly reviewRepository = new ReviewRepository();
  private readonly productRepository = new ProductRepository();
  private readonly reviewFactory = new ReviewFactory();
  private readonly orderRepository = new OrderRepository();
  public addReview = async (req: Request, res: Response) => {
    const reviewDTO: ReviewDTO = req.body;
    const productExist = await this.productRepository.getOne({
      _id: reviewDTO.productId,
    });
    if (!productExist) {
      throw new NotFoundException("product not found");
    }
    const order = await this.orderRepository.getOne({
      userId: req.user._id,
      status: StatusOrder.confirmed,
      "items.productId": reviewDTO.productId,
    });
    if (!order) {
      throw new BadRequestException("order not confirmed");
    }
    const newReview = this.reviewFactory.create(reviewDTO, req.user._id);
    const createdReview = await this.reviewRepository.create(newReview);
    return res.status(201).json({
      message: "review created successfully",
      success: true,
      data: { createdReview },
    });
  };
  public getMyReview = async (req: Request, res: Response) => {
    const { id } = req.params;
    const review = await this.reviewRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: "userId", select: "firstName lastName" },
          { path: "productId", select: "name" },
        ],
      }
    );
    if (!review) {
      throw new NotFoundException("review not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { review } });
  };
  public updateReview = async (req: Request, res: Response) => {
    const updateReviewDTO: UpdateReviewDTO = req.body;
    const reviewExist = await this.reviewRepository.getOne({
      userId: req.user._id,
    });
    if (!reviewExist) {
      throw new NotFoundException("review not found");
    }
    const updateReview = await this.reviewFactory.updateReview(
      updateReviewDTO,
      reviewExist
    );
    await this.reviewRepository.update({ _id: reviewExist._id }, updateReview);
    return res.sendStatus(204);
  };
  public getAllReviews = async (req: Request, res: Response) => {
    const { id } = req.params;
    const objectId = new Types.ObjectId(id) as unknown as ObjectId;
    const reviews = await this.reviewRepository.getAll(
      { productId: objectId },
      {},
      {
        populate: [
          { path: "userId", select: "firstName lastName" },
          { path: "productId", select: "name" },
        ],
      }
    );
    if (!reviews || reviews.length === 0) {
      throw new NotFoundException("reviews not found");
    }
    return res
      .status(200)
      .json({ message: "done", success: true, data: { reviews } });
  };
}

export default new ReviewService();
