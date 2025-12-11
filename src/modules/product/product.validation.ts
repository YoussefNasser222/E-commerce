import z from "zod";
import { Types } from "mongoose";

// validate Mongo ObjectId
export const objectIdSchema = z.string().refine((val) => {
  return Types.ObjectId.isValid(val);
}, {
  message: "invalid ObjectId format"
});

export const addProductValidation = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  priceAfterDiscount: z.number().positive().optional(),
  stock: z.number().nonnegative(),
  sold: z.number().nonnegative().optional(),
  categoryId: objectIdSchema,
  brand: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  price: z.number().positive().optional(),
  priceAfterDiscount: z.number().positive().optional(),
  stock: z.number().nonnegative().optional(),
  sold: z.number().nonnegative().optional(),
  brand: z.string().optional(),
});
