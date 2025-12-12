"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
const utils_3 = require("../../utils");
const factory_1 = require("./factory");
const DB_2 = require("../../DB");
const email_1 = require("../../utils/email");
const console_1 = require("console");
class AuthService {
    constructor() {
        this.userRepository = new DB_1.UserRepository();
        this.userFactory = new factory_1.UserFactory();
        this.tokenRepository = new DB_2.TokenRepository();
        this.register = async (req, res) => {
            const registerDTo = req.body;
            const userExist = await this.userRepository.getOne({
                email: registerDTo.email,
            });
            if (userExist) {
                throw new utils_1.ConflictException("user already existence");
            }
            const newUser = await this.userFactory.createUser(registerDTo);
            const createdUser = await this.userRepository.create(newUser);
            await (0, email_1.sendMail)({
                to: newUser.email,
                subject: "verify your account",
                html: `your otp is ${newUser.otp}`,
            });
            const { password, otp, otpExpire, isVerified, role, userAgent, ...other } = newUser;
            return res.status(201).json({
                message: "user created successfully",
                success: true,
                data: { user: other },
            });
        };
        this.verifyAccount = async (req, res) => {
            const verifyAccountDTO = req.body;
            await (0, utils_3.checkOtp)(verifyAccountDTO, this.userRepository);
            return res.sendStatus(204);
        };
        this.logIn = async (req, res) => {
            const logInDTO = req.body;
            const userExist = await this.userRepository.getOne({
                email: logInDTO.email,
            });
            if (!userExist) {
                throw new utils_1.NotFoundException("user not found");
            }
            const password = await (0, utils_2.comparePassword)(logInDTO.password, userExist.password);
            if (!password) {
                throw new utils_1.BadRequestException("invalid credential");
            }
            if (userExist.isVerified != true) {
                throw new utils_1.BadRequestException("account is not verified");
            }
            const accessToken = (0, utils_1.generateToken)({
                payload: { _id: userExist._id, role: userExist.role },
                options: { expiresIn: "1d" },
            });
            const refreshToken = (0, utils_1.generateToken)({
                payload: { _id: userExist._id, role: userExist.role },
                options: { expiresIn: "7d" },
            });
            await this.tokenRepository.create({
                token: refreshToken,
                userId: userExist._id,
                type: utils_1.TokenType.refresh,
            });
            return res.status(200).json({
                message: "user log in successfully",
                success: true,
                data: { accessToken, refreshToken },
            });
        };
        this.resendOtp = async (req, res) => {
            const { email } = req.body;
            const userExist = await this.userRepository.getOne({ email });
            if (!userExist)
                throw new utils_1.NotFoundException("user not found");
            const otp = (0, utils_1.generateOtp)();
            const otpExpire = (0, utils_1.generateOtpExpireAt)(15 * 60 * 1000);
            await this.userRepository.update({ email }, { otp, otpExpire, isVerified: false });
            await (0, email_1.sendMail)({
                to: email,
                subject: "resend otp",
                html: `your otp is ${otp}`,
            });
            return res.sendStatus(204);
        };
        this.resetpassword = async (req, res) => {
            const resetPasswordDTO = req.body;
            (0, console_1.log)(resetPasswordDTO);
            await (0, utils_3.checkOtp)(resetPasswordDTO, this.userRepository);
            const user = await this.userRepository.getOne({
                email: resetPasswordDTO.email,
            });
            user.password = await (0, utils_1.hashPassword)(resetPasswordDTO.newPassword);
            user.otp = undefined;
            user.otpExpire = undefined;
            user.isVerified = true;
            user.credentialUpdatedAt = new Date();
            await user.save();
            await this.tokenRepository.deleteMany({ userId: user._id });
            return res.sendStatus(204);
        };
        this.logOut = async (req, res) => {
            const accessToken = req.headers.authorization;
            (0, console_1.log)(accessToken);
            await this.tokenRepository.create({
                token: accessToken,
                type: utils_1.TokenType.access,
                userId: req.user._id,
            });
            await this.tokenRepository.deleteMany({
                userId: req.user._id,
                type: utils_1.TokenType.refresh,
            });
            return res.sendStatus(204);
        };
        this.refreshToken = async (req, res) => {
            const refreshToken = req.headers.authorization;
            const payload = (0, utils_1.verifyToken)(refreshToken);
            const refreshTokenExist = await this.tokenRepository.findOneAndDelete({
                token: refreshToken,
                type: utils_1.TokenType.refresh,
                userId: payload._id
            });
            if (!refreshTokenExist) {
                throw new utils_1.UnAuthorizedException("invalid refresh token");
            }
            const accessToken = (0, utils_1.generateToken)({
                payload: {
                    _id: payload._id,
                    role: payload.role
                },
                options: { expiresIn: "1d" },
            });
            const newRefreshToken = (0, utils_1.generateToken)({
                payload: {
                    _id: refreshTokenExist._id,
                },
                options: { expiresIn: "7d" },
            });
            await this.tokenRepository.create({
                token: newRefreshToken,
                userId: req.user._id,
                type: utils_1.TokenType.refresh,
            });
            return res.status(200).json({
                message: "done",
                success: true,
                data: { accessToken, refreshToken: newRefreshToken },
            });
        };
    }
}
exports.default = new AuthService();
