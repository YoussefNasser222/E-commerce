import { Request, Response } from "express";
import { Document } from "mongoose";
import { UserRepository } from "../../DB";
import {
  BadRequestException,
  ConflictException,
  generateOtp,
  generateOtpExpireAt,
  generateToken,
  hashPassword,
  NotFoundException,
  TokenType,
  UnAuthorizedException,
  verifyToken,
} from "../../utils";
import { comparePassword } from "../../utils";
import { checkOtp } from "../../utils";
import {
  LogInDTO,
  RegisterDTO,
  ResetPasswordDTO,
  VerifyAccountDTO,
} from "./auth.DTO";
import { UserFactory } from "./factory";
import { TokenRepository } from "../../DB";
import { sendMail } from "../../utils/email";
import { log } from "console";

class AuthService {
  private readonly userRepository = new UserRepository();
  private readonly userFactory = new UserFactory();
  private readonly tokenRepository = new TokenRepository();
  public register = async (req: Request, res: Response) => {
    //  get data from req
    const registerDTo: RegisterDTO = req.body;
    // check user Exist
    const userExist = await this.userRepository.getOne({
      email: registerDTo.email,
    });
    if (userExist) {
      throw new ConflictException("user already existence");
    }
    // prepare data >> factory
    const newUser = await this.userFactory.createUser(registerDTo);
    const createdUser = await this.userRepository.create(newUser);
    // send mail
    await sendMail({
      to: newUser.email,
      subject: "verify your account",
      html: `your otp is ${newUser.otp}`,
    });
    // send response
    const { password, otp, otpExpire, isVerified, role, userAgent, ...other } =
      newUser;
    return res.status(201).json({
      message: "user created successfully",
      success: true,
      data: { user: other },
    });
  };
  public verifyAccount = async (req: Request, res: Response) => {
    // get data from req
    const verifyAccountDTO: VerifyAccountDTO = req.body;
    // check user Existence
    await checkOtp(verifyAccountDTO, this.userRepository);
    return res.sendStatus(204);
  };
  public logIn = async (req: Request, res: Response) => {
    // get data from req
    const logInDTO: LogInDTO = req.body;
    // check user existence
    const userExist = await this.userRepository.getOne({
      email: logInDTO.email,
    });
    if (!userExist) {
      throw new NotFoundException("user not found");
    }
    const password = await comparePassword(
      logInDTO.password,
      userExist.password
    );
    if (!password) {
      throw new BadRequestException("invalid credential");
    }
    if (userExist.isVerified != true) {
      throw new BadRequestException("account is not verified");
    }
    // generate token
    const accessToken = generateToken({
      payload: { _id: userExist._id, role: userExist.role },
      options: { expiresIn: "1d" },
    });
    const refreshToken = generateToken({
      payload: { _id: userExist._id, role: userExist.role },
      options: { expiresIn: "7d" },
    });
    await this.tokenRepository.create({
      token: refreshToken,
      userId: userExist._id,
      type: TokenType.refresh,
    });
    // send response
    return res.status(200).json({
      message: "user log in successfully",
      success: true,
      data: { accessToken, refreshToken },
    });
  };
  public resendOtp = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userExist = await this.userRepository.getOne({ email });
    if (!userExist) throw new NotFoundException("user not found");
    const otp = generateOtp();
    const otpExpire = generateOtpExpireAt(15 * 60 * 1000);
    await this.userRepository.update(
      { email },
      { otp, otpExpire, isVerified: false }
    );
    await sendMail({
      to: email,
      subject: "resend otp",
      html: `your otp is ${otp}`,
    });
    return res.sendStatus(204);
  };
  public resetpassword = async (req: Request, res: Response) => {
    const resetPasswordDTO: ResetPasswordDTO = req.body;
    log(resetPasswordDTO);
    await checkOtp(resetPasswordDTO, this.userRepository);
    const user = await this.userRepository.getOne({
      email: resetPasswordDTO.email,
    });
    user.password = await hashPassword(resetPasswordDTO.newPassword);
    user.otp = undefined;
    user.otpExpire = undefined;
    user.isVerified = true;
    user.credentialUpdatedAt = new Date();
    await user.save();
    await this.tokenRepository.deleteMany({ userId: user._id });
    return res.sendStatus(204);
  };
  public logOut = async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization;
    log(accessToken);
    await this.tokenRepository.create({
      token: accessToken,
      type: TokenType.access,
      userId: req.user._id,
    });
    await this.tokenRepository.deleteMany({
      userId: req.user._id,
      type: TokenType.refresh,
    });
    return res.sendStatus(204);
  };
  public refreshToken = async (req : Request , res : Response)=>{
    const refreshToken = req.headers.authorization;
      const payload = verifyToken(refreshToken);
      const refreshTokenExist = await this.tokenRepository.findOneAndDelete({
        token: refreshToken,
        type: TokenType.refresh,
        userId : payload._id
      });
      if (!refreshTokenExist) {
        throw new UnAuthorizedException("invalid refresh token");
      }
      const accessToken = generateToken({
        payload: {
          _id: payload._id,
          role : payload.role
        },
        options: { expiresIn: "1d" },
      });
      const newRefreshToken = generateToken({
        payload: {
          _id: refreshTokenExist._id,
        },
        options: { expiresIn: "7d" },
      });
      await this.tokenRepository.create({
        token: newRefreshToken,
        userId: req.user._id,
        type: TokenType.refresh,
      });
      return res.status(200).json({
        message: "done",
        success: true,
        data: { accessToken, refreshToken: newRefreshToken },
      });
  }
}

export default new AuthService();
