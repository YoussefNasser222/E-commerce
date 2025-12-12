"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const DB_1 = require("./DB");
const index_1 = require("./modules/index");
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
function bootstrap(app, express) {
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 5 * 60 * 100,
        limit: 5,
        handler: (req, res, next, options) => {
            throw new utils_1.BadRequestException(options.message);
        },
    });
    (0, DB_1.connectDB)();
    app.use(express.json());
    app.use("/auth", limiter, index_1.authRouter);
    app.use("/user", index_1.userRouter);
    app.use("/category", index_1.categoryRouter);
    app.use("/product", index_1.productRouter);
    app.use("/cart", index_1.cartRouter);
    app.use("/order", limiter, index_1.orderRouter);
    app.use("/review", limiter, index_1.reviewRouter);
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(400).json({ message: "invalid api", success: false });
    });
    app.use(utils_1.errorHandler);
}
