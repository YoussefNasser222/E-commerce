import { Router } from "express";
import { isAuth, isValid } from "../../middleware";
import { categoryValidationSchema } from "./category.validation";
import categoryService from "./category.service";
import { isAdmin } from "../../middleware/isAdmin.middleware";
const router = Router();

router.post(
  "/",
  isAuth,
  isAdmin,
  isValid(categoryValidationSchema),
  categoryService.addCategory
);
router.delete("/:id", isAuth, isAdmin, categoryService.deleteCategory);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  isValid(categoryValidationSchema),
  categoryService.updateCategory
);
router.get("/", categoryService.getAllCategory);
router.get("/:id", categoryService.getSpecifyCategory);
export default router;
