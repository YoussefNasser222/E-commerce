"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpExpireAt = exports.generateOtp = void 0;
const generateOtp = () => {
    const otp = Math.floor(Math.random() * 90000 + 10000);
    return otp;
};
exports.generateOtp = generateOtp;
const generateOtpExpireAt = (time) => {
    return Date.now() + time;
};
exports.generateOtpExpireAt = generateOtpExpireAt;
