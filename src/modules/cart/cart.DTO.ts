import { ObjectId } from "mongoose";

export interface AddToCartDTO {
  productId: ObjectId;
  quantity?: number;
}
