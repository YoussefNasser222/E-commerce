import { Schema } from "mongoose";
import { IProduct } from "../../../utils";

export const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    brand : {
        type : String
    },
    categoryId : {
        type : Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    mainImage : {
        public_id : String,
        secure_url : String
    },
    images : [{
      public_id : String,
        secure_url : String
    }],
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    sold : {
        type : Number,
        default : 0
    },
    stock : {
        type : Number ,
        default : 0
    },
    updatedBy : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
