"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manyFilesValidation = void 0;
const file_type_1 = require("file-type");
const node_fs_1 = __importDefault(require("node:fs"));
const manyFilesValidation = async (req, res, next) => {
    const files = req.files;
    if (!files || files.length === 0)
        return next();
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    for (const file of files) {
        const buffer = node_fs_1.default.readFileSync(file.path);
        const type = await (0, file_type_1.fileTypeFromBuffer)(buffer);
        if (!type || !allowedTypes.includes(type.mime)) {
            return next(new Error(`Invalid file format ${file}`));
        }
    }
    return next();
};
exports.manyFilesValidation = manyFilesValidation;
