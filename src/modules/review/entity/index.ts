import { ObjectId, Types } from "mongoose";

 export class NewReview {
      userId: ObjectId;
      productId: ObjectId;
      rating: number;
      comment?: string;
 }