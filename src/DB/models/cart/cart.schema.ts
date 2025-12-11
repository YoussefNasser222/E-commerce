import { Schema } from "mongoose";
import { ICart, ICartItem } from "../../../utils";

const cartItemSchema = new Schema<ICartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required : true
  },
});

export const cartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  items: {
    type: [cartItemSchema],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});
