import { model } from "mongoose";
import { productSchema } from "./product.schema";

export const Product = model("Product", productSchema);
