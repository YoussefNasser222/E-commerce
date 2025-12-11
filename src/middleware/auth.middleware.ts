import { NextFunction, Request, Response } from "express";
import {
  BadRequestException,
  NotFoundException,
  TokenType,
  UnAuthorizedException,
  verifyToken,
} from "../utils";
import { TokenRepository, UserRepository } from "../DB";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = new UserRepository();
  const tokenRepository = new TokenRepository();
  const token = req.headers.authorization;
  if (!token) return next(new BadRequestException("token is required"));
  const payload = verifyToken(token);
  const userExist = await userRepository.getOne({ _id: payload._id });
  if (!userExist) return next(new NotFoundException("user not found"));
  // check blocked token
  const blockedToken = await tokenRepository.getOne({
    token,
    type: TokenType.access,
  });
  if (blockedToken) {
    return next(new BadRequestException("your account is log out"));
  }
  if (userExist.credentialUpdatedAt > new Date(payload.iat * 1000)) {
    throw new UnAuthorizedException("token is not valid");
  }
  req.user = userExist;
  req.role = userExist.role;
  return next();
};
