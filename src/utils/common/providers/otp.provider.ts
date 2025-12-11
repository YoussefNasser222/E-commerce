import { UserRepository } from "../../../DB";
import { BadRequestException, NotFoundException } from "../../error";
import { IVerifyAccount } from "../interface";

export async function checkOtp(
    verifyAccountDTO : IVerifyAccount,
    userRepository : UserRepository
    
) {
    const userExist = await userRepository.getOne({
      email: verifyAccountDTO.email,
    });
    if (!userExist) {
      throw new NotFoundException("user not found");
    }
    // check otp
    if (verifyAccountDTO.otp !== userExist.otp) {
      throw new BadRequestException("invalid otp");
    }
    // check otp Expire
    if (!userExist.otpExpire ||userExist.otpExpire < new Date()) {
      throw new BadRequestException("invalid otp");
    }
    userExist.otp = undefined ;
    userExist.otpExpire = undefined;
    userExist.isVerified = true;
    await userExist.save();
}