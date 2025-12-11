import { model } from "mongoose";
import { reviewSchema } from "./review.schema";

export const Review = model("Review", reviewSchema);
