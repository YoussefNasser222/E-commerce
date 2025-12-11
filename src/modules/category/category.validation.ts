import z from "zod";
import { ICategory } from "../../utils";
export const categoryValidationSchema = z.object<ICategory>({
  name: z.string().min(2) as unknown as string,
});
