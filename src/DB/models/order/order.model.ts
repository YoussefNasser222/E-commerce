import { model } from "mongoose";
import { orderSchema } from "./order.schema";

export const Order = model("Order", orderSchema);
