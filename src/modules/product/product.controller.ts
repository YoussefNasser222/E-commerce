import { Router } from "express";
import { UploadFile } from "../../utils/multer";
import { fileValidation, isAdmin, isAuth } from "../../middleware";
import productService from "./product.service";
import { isValid } from "../../middleware";
import {
  addProductValidation,
  updateProductSchema,
} from "./product.validation";
import { manyFilesValidation } from "../../middleware/file.many.validation.middleware";
const router = Router();
router.post(
  "/",
  isAuth,
  isAdmin,
  UploadFile().single("mainImage"),
  fileValidation,
  isValid(addProductValidation),
  productService.addProduct
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  UploadFile().array("images", 5),
  manyFilesValidation,
  isValid(updateProductSchema),
  productService.updateProduct
);
router.get("/search", productService.searchProduct);
router.get("/:id", productService.getSpecificProduct);
router.delete("/:id", isAuth, isAdmin, productService.deleteProduct);
router.get("/", productService.getAllProduct);
export default router;
