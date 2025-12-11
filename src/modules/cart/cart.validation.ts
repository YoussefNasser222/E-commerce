import z from "zod";
import { objectIdSchema } from "../product/product.validation";

export const addToCartValidationSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().nonnegative(),
});
