"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const utils_1 = require("../utils");
const isValid = (schema) => {
    return (req, res, next) => {
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
            return next(new utils_1.BadRequestException("validation error", errMessage));
        }
        next();
    };
};
exports.isValid = isValid;
