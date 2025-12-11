import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../utils";

export const isValid = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      priceAfterDiscount: req.body.priceAfterDiscount ? Number(req.body.priceAfterDiscount) : undefined,
      stock: req.body.stock ? Number(req.body.stock) : undefined,
      sold: req.body.sold ? Number(req.body.sold) : undefined,
      ...req.params,
      ...req.query,
    };
    const result = schema.safeParse(body);
    if (result.success == false) {
      let errMessage = result.error.issues.map((issues) => ({
        path: issues.path[0],
        message: issues.message,
      }));
      return next(new BadRequestException("validation error", errMessage));
    }
    next();
  };
};
