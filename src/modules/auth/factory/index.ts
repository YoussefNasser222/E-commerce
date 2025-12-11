import { log } from "node:console";
import {
  Agent,
  generateOtp,
  generateOtpExpireAt,
  hashPassword,
  Role,
} from "../../../utils";
import { RegisterDTO } from "../auth.DTO";
import { NewUser } from "../entity";
import { UserRepository } from "../../../DB";
import { UpdateUserDTO } from "../../user/user.dto";

export class UserFactory {
  private userRepository = new UserRepository();
  async createUser(user: RegisterDTO) {
    const newUser = new NewUser();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.password = await hashPassword(user.password);
    newUser.address = user.address;
    newUser.otp = generateOtp();
    newUser.otpExpire = new Date(generateOtpExpireAt(15 * 60 * 1000));
    log(newUser.otpExpire);
    newUser.dob = user.dob;
    newUser.gender = user.gender;
    newUser.role = Role.user;
    newUser.isVerified = false;
    newUser.userAgent = Agent.local;
    newUser.phoneNumber = user.phoneNumber;
    newUser.credentialUpdatedAt = new Date();
    return newUser;
  }
   updateUser = async (userDto: UpdateUserDTO, existingUser: NewUser) => {
  return {
    firstName: userDto.firstName ?? existingUser.firstName,
    lastName: userDto.lastName ?? existingUser.lastName,
    email: userDto.email ?? existingUser.email,
    password: userDto.password
      ? await hashPassword(userDto.password)
      : existingUser.password,
    dob: userDto.dob ?? existingUser.dob,
    gender: userDto.gender ?? existingUser.gender,
  };
};

  };

