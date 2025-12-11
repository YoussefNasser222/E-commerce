import { model } from "mongoose";
import { cartSchema } from "./cart.schema";

export const Cart = model("Cart", cartSchema);
