import { Router } from "express";
import { isAdmin, isAuth, isValid } from "../../middleware";
import { reviewValidationSchema } from "./review.validation";
import reviewService from "./review.service";
const router = Router();
router.post(
  "/",
  isAuth,
  isValid(reviewValidationSchema),
  reviewService.addReview
);
router.get("/:id", isAuth, reviewService.getMyReview);
router.patch("/:id", isAuth, reviewService.updateReview);
router.get("/admin/:id", isAuth, isAdmin, reviewService.getAllReviews);
export default router;
