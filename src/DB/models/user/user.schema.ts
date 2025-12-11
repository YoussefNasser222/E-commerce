import { Schema } from "mongoose";
import { Agent, Gender, IUser, Role } from "../../../utils";
import { sendMail } from "../../../utils/email";

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      trim: true,
      minlength: 4,
      required: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    otp: {
      type: String,
    },

    otpExpire: {
      type: Date,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    address: {
      type: String,
      trim: true,
    },
    dob: Date,
    gender: {
      type: String,
      enum: Gender,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.user,
    },

    userAgent: {
      type: String,
      enum: Agent,
      default: Agent.local,
    },
    credentialUpdatedAt : {
      type : Date
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName}  ${this.lastName}`;
});