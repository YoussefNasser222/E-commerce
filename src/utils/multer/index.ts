import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { BadRequestException } from "../error";
export const UploadFile = () => {
  const storage = multer.diskStorage({});
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedType = ["image/jpg", "image/png", "image/jpeg"];
    if (allowedType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException("invalid file format"));
    }
  };
  return multer({storage ,fileFilter});
};
