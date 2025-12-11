import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middleware/validation.middleware";
import {
  logInValidationSchema,
  registerSchema,
  resetpasswordSchema,
  verifyAccountSchema,
} from "./auth.validation";
import { isAuth } from "../../middleware";
const router = Router();

router.post("/register", isValid(registerSchema), authService.register);
router.post(
  "/verify-account",
  isValid(verifyAccountSchema),
  authService.verifyAccount
);
router.post("/login", isValid(logInValidationSchema), authService.logIn);
router.post("/resend-otp", authService.resendOtp);
router.post(
  "/reset-password",
  isValid(resetpasswordSchema),
  authService.resetpassword
);
router.post("/log-out", isAuth, authService.logOut);
router.post("refresh-token", authService.refreshToken);
export default router;
