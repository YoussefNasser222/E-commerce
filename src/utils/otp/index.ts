import { log } from "node:console";

export const generateOtp = () => {
const otp = Math.floor(Math.random() * 90000 + 10000) as unknown as string;
return otp;
}

export const generateOtpExpireAt = (time : number) =>{ 
    return Date.now() + time ;
}