"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const console_1 = require("console");
const mongoose_1 = __importDefault(require("mongoose"));
const local_config_1 = require("../config/local.config");
const connectDB = () => {
    mongoose_1.default
        .connect(local_config_1.devConfig.DB_URL)
        .then(() => {
        (0, console_1.log)("connected db successfully");
    })
        .catch((err) => {
        (0, console_1.log)("field to connect to DB", err);
    });
};
exports.connectDB = connectDB;
