"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const node_console_1 = require("node:console");
const utils_1 = require("../../../utils");
const entity_1 = require("../entity");
const DB_1 = require("../../../DB");
class UserFactory {
    constructor() {
        this.userRepository = new DB_1.UserRepository();
        this.updateUser = async (userDto, existingUser) => {
            return {
                firstName: userDto.firstName ?? existingUser.firstName,
                lastName: userDto.lastName ?? existingUser.lastName,
                email: userDto.email ?? existingUser.email,
                password: userDto.password
                    ? await (0, utils_1.hashPassword)(userDto.password)
                    : existingUser.password,
                dob: userDto.dob ?? existingUser.dob,
                gender: userDto.gender ?? existingUser.gender,
            };
        };
    }
    async createUser(user) {
        const newUser = new entity_1.NewUser();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = await (0, utils_1.hashPassword)(user.password);
        newUser.address = user.address;
        newUser.otp = (0, utils_1.generateOtp)();
        newUser.otpExpire = new Date((0, utils_1.generateOtpExpireAt)(15 * 60 * 1000));
        (0, node_console_1.log)(newUser.otpExpire);
        newUser.dob = user.dob;
        newUser.gender = user.gender;
        newUser.role = utils_1.Role.user;
        newUser.isVerified = false;
        newUser.userAgent = utils_1.Agent.local;
        newUser.phoneNumber = user.phoneNumber;
        newUser.credentialUpdatedAt = new Date();
        return newUser;
    }
}
exports.UserFactory = UserFactory;
;
