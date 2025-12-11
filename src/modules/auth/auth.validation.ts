import z from "zod";
import { RegisterDTO } from "./auth.DTO";
import { Gender, ILogIn, IResetPassword, IVerifyAccount } from "../../utils";

export const registerSchema = z.object<RegisterDTO>({
  firstName: z.string().min(3).max(10) as unknown as string ,
  lastName: z.string().min(3).max(10) as unknown as string,
  password: z.string().min(5) as unknown as string,
  phoneNumber: z.string().length(11).optional() as unknown as string,
  gender: z.enum(Gender) as unknown as Gender,
  dob: z.string() as unknown as Date,
  email: z.email() as unknown as string,
  address: z.string().optional() as unknown as string,
})

export const verifyAccountSchema = z.object<IVerifyAccount>({
  email: z.email() as unknown as string,
  otp: z.string().length(5) as unknown as string,
});

export const logInValidationSchema = z.object<ILogIn>({
  email: z.email() as unknown as string,
  password: z.string().min(3) as unknown as string,
});
export const resetpasswordSchema = z.object<IResetPassword>({
  email: z.email() as unknown as string,
  otp: z.string().length(5) as unknown as string,
  newPassword: z.string().min(5) as unknown as string,
});
