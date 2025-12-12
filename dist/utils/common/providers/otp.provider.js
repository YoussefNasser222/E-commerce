"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOtp = checkOtp;
const error_1 = require("../../error");
async function checkOtp(verifyAccountDTO, userRepository) {
    const userExist = await userRepository.getOne({
        email: verifyAccountDTO.email,
    });
    if (!userExist) {
        throw new error_1.NotFoundException("user not found");
    }
    if (verifyAccountDTO.otp !== userExist.otp) {
        throw new error_1.BadRequestException("invalid otp");
    }
    if (!userExist.otpExpire || userExist.otpExpire < new Date()) {
        throw new error_1.BadRequestException("invalid otp");
    }
    userExist.otp = undefined;
    userExist.otpExpire = undefined;
    userExist.isVerified = true;
    await userExist.save();
}
