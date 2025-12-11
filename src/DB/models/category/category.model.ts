import { model } from "mongoose";
import { categorySchema } from "./category.schema";

export const Category = model("Category", categorySchema);
