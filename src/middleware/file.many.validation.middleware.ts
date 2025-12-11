import { NextFunction, Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";

export const manyFilesValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return next();
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  // Loop on all files
  for (const file of files) {
      // Read file buffer
      const buffer = fs.readFileSync(file.path);
      // Get type using magic number
      const type = await fileTypeFromBuffer(buffer);
      if (!type || !allowedTypes.includes(type.mime)) {
        return next(new Error(`Invalid file format ${file}`));
      }
  }
  return next();
};
