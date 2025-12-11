import { Router } from "express";
import { isAuth } from "../../middleware";
import userService from "./user.service";

const router = Router();

router.get("/:id", isAuth, userService.getUser);
router.patch("/:id", isAuth, userService.updateUser);
export default router;
