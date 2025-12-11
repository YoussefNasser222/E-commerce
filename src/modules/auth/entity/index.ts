import { Agent, Gender, Role } from "../../../utils";

export class NewUser {
     firstName : string;
        lastName : string;
        email : string;
        password : string;
        phoneNumber : string;
        otp : string;
        otpExpire : Date;
        dob : Date ;
        role : Role;
        address : string;
        userAgent : Agent;
        gender : Gender;
        isVerified : boolean; 
        credentialUpdatedAt : Date;
}