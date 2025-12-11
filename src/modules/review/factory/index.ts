import { ObjectId, Types } from "mongoose";
import { ReviewDTO, UpdateReviewDTO } from "../review.DTO";
import { NewReview } from "../entity";
import { IReview } from "../../../utils";

export class ReviewFactory {
  create(reviewDTO: ReviewDTO, userId: ObjectId) {
    const newReview = new NewReview();
    newReview.comment = reviewDTO.comment ?? undefined;
    newReview.productId = new Types.ObjectId(
      reviewDTO.productId
    ) as unknown as ObjectId;
    newReview.userId = userId;
    return newReview;
  }
  updateReview(updateReviewDTO: UpdateReviewDTO, reviewExist: IReview) {
    reviewExist.rating = updateReviewDTO.rating ?? reviewExist.rating;
    reviewExist.comment = updateReviewDTO.comment ?? reviewExist.comment;
    return reviewExist;
  }
}
