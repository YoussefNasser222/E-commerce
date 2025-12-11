import { NextFunction, Request, Response } from "express";
import { Role, UnAuthorizedException } from "../utils";
import { log } from "console";

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== Role.admin) {
    return next(new UnAuthorizedException("you not admin"));
  }
  return next();
};
