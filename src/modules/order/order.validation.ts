import z from "zod";
export const addressSchema = z.object({
 city: z.string(),
 street: z.string(),
 building: z.string()
});

export const orderValidationSchema = z.object({
 address: addressSchema,
});