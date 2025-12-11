import { Schema } from "mongoose";
import { ICategory } from "../../../utils";

export const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);
