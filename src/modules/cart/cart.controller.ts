import { Router } from "express";
import { isAuth, isValid } from "../../middleware";
import { addToCartValidationSchema } from "./cart.validation";
import cartService from "./cart.service";
const router = Router();
router.patch(
  "/",
  isAuth,
  isValid(addToCartValidationSchema),
  cartService.addToCart
);
router.get("/", isAuth, cartService.getMyCart);
router.delete("/remove", isAuth, cartService.removeItem);
router.delete("/clear", isAuth, cartService.clearCart);

export default router;
