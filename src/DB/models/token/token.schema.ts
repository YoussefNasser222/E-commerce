import { Schema } from "mongoose";
import { IToken, TokenType } from "../../../utils";

export const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: TokenType,
      default: TokenType.access,
    },
  },
  { timestamps: true }
);
