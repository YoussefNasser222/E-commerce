"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidation = void 0;
const file_type_1 = require("file-type");
const node_fs_1 = __importDefault(require("node:fs"));
const fileValidation = async (req, res, next) => {
    const filePath = req.file.path;
    const buffer = node_fs_1.default.readFileSync(filePath);
    const type = await (0, file_type_1.fileTypeFromBuffer)(buffer);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!type || !allowedTypes.includes(type.mime))
        return next(new Error("Invalid file type"));
    return next();
};
exports.fileValidation = fileValidation;
