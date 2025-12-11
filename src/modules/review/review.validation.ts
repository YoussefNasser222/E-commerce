import z from "zod";
import { objectIdSchema } from "../product/product.validation";

export const reviewValidationSchema = z.object({
  comment: z.string().min(3).optional(),
  productId: objectIdSchema,
  rating: z.number().int().min(1).max(5),
});
