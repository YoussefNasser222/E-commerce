import { Gender } from "../../utils";

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dob: Date;
  address?: string;
  gender?: Gender;
}

export interface VerifyAccountDTO {
  email: string;
  otp: string;
}
export interface LogInDTO {
  email: string;
  password: string;
}
export interface ResetPasswordDTO{
  newPassword: string;
  otp: string;
  email: string;
}
