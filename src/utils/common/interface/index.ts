import { Gender, Role, Agent, TokenType, Payment, StatusOrder } from "../enums";
import { ObjectId, Types } from "mongoose";
export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  otp: string;
  otpExpire: Date;
  dob: Date;
  role: Role;
  address: string;
  userAgent: Agent;
  gender: Gender;
  isVerified: boolean;
  credentialUpdatedAt: Date;
}
export interface IVerifyAccount {
  email: string;
  otp: string;
}
export interface ILogIn {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
  userId: ObjectId;
  type: TokenType;
}

declare module "express" {
  interface Request {
    user?: IUser;
    role?: Role;
  }
}
declare module "jsonwebtoken" {
  interface payload {
    _id?: ObjectId;
    role?: Role;
  }
}

declare module "JsonWebToken" {
  interface JwtPayload {
    _id?: ObjectId;
    role?: string;
  }
}

export interface IResetPassword {
  newPassword: string;
  otp: string;
  email: string;
}

export interface ICategory {
  name: string;
}
export interface IImage {
  public_id: string;
  secure_url: string;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  stock: number;
  sold: number;
  mainImage: IImage;
  images?: IImage[];
  brand?: string;
  categoryId: ObjectId;
  createdBy: ObjectId;
  updatedBy?: ObjectId;
}

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart {
  userId: ObjectId;
  items: ICartItem[];
  totalPrice?: number;
}
export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: ObjectId;
  address: {
    city: string;
    street: string;
    building: string;
  };
  totalPrice: number;
  paymentMethod: Payment;
  status: StatusOrder;
  items: IOrderItem[];
  orderNumber: string;
}

export interface IReview {
  userId: ObjectId;
  productId: ObjectId;
  rating: number;
  comment: string;
}
