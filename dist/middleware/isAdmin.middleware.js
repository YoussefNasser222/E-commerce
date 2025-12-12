"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const utils_1 = require("../utils");
const isAdmin = (req, res, next) => {
    if (req.user.role !== utils_1.Role.admin) {
        return next(new utils_1.UnAuthorizedException("you not admin"));
    }
    return next();
};
exports.isAdmin = isAdmin;
