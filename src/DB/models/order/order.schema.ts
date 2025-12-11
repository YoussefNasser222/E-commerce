import { Schema } from "mongoose";
import { IOrder, IOrderItem, Payment, StatusOrder } from "../../../utils";
const itemSchema = new Schema<IOrderItem>({
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
  },
});
export const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      building: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: Payment,
      default: Payment.cash,
    },
    status: {
      type: String,
      enum: StatusOrder,
      default: StatusOrder.pending,
    },
    items: {
      type: [itemSchema],
    },
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save",async function(next){
  if(!this.orderNumber){
    this.orderNumber = `ORDN-${Date.now()}`
  }
})