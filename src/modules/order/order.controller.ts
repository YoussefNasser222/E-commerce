import { Router } from "express";
import { isAdmin, isAuth, isValid } from "../../middleware";
import { orderValidationSchema } from "./order.validation";
import orderService from "./order.service";
const router = Router();

router.post(
  "/",
  isAuth,
  isValid(orderValidationSchema),
  orderService.createOrder
);
router.get("/get-my-order", isAuth, orderService.getMyOrder);
router.get("/admin/orders", isAuth, isAdmin, orderService.getAllOrder);
router.patch("/admin/:id" , isAuth , isAdmin , orderService.updateOrder)
router.delete("/:id", isAuth, orderService.cancelOrder);
router.delete("/admin/:id", isAuth, isAdmin, orderService.deleteOrder);
export default router;
