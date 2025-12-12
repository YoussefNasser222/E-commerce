"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const error_1 = require("../error");
const UploadFile = () => {
    const storage = multer_1.default.diskStorage({});
    const fileFilter = (req, file, cb) => {
        const allowedType = ["image/jpg", "image/png", "image/jpeg"];
        if (allowedType.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new error_1.BadRequestException("invalid file format"));
        }
    };
    return (0, multer_1.default)({ storage, fileFilter });
};
exports.UploadFile = UploadFile;
