import { ObjectId } from "mongoose";
import { IImage } from "../../utils";

export interface AddProductDTO {
  name: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  stock: number;
  sold?: number;
  mainImage: IImage;
  images?: IImage[];
  brand?: string;
  categoryId: ObjectId;
  createdBy: ObjectId;
  updatedBy?: ObjectId;
}
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  priceAfterDiscount?: number;
  stock?: number;
  sold?: number;
  mainImage?: IImage;
  images?: IImage[];
  brand?: string;
  categoryId?: ObjectId;
  createdBy?: ObjectId;
  updatedBy?: ObjectId;
}
