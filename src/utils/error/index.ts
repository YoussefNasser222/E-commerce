import { NextFunction, Request, Response } from "express";
import { TokenRepository } from "../../DB";
import { TokenType } from "../common";
import { generateToken, verifyToken } from "../token";
import { log } from "console";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorDetails?: any
  ) {
    super(message);
  }
}
export class NotFoundException extends AppError {
  constructor(message: string, errorDetails?: any) {
    super(message, 404, errorDetails);
  }
}
export class ConflictException extends AppError {
  constructor(message: string, errorDetails?: any) {
    super(message, 409, errorDetails);
  }
}
export class UnAuthorizedException extends AppError {
  constructor(message: string, errorDetails?: any) {
    super(message, 401, errorDetails);
  }
}

export class BadRequestException extends AppError {
  constructor(message: string, errorDetails?: any) {
    super(message, 400, errorDetails);
  }
}

export const errorHandler = async (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    return res.status(err.statusCode || 500).json({
      message: err.message,
      success: false,
      stack: err.stack,
      errorDetails: err.errorDetails,
    });
  }
