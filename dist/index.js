"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const console_1 = require("console");
const app_controller_1 = require("./app.controller");
const local_config_1 = require("./config/local.config");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = local_config_1.devConfig.port;
(0, app_controller_1.bootstrap)(app, express_1.default);
app.listen(port, () => {
    (0, console_1.log)("server is running on port", port);
});
