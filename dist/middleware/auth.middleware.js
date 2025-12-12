"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const utils_1 = require("../utils");
const DB_1 = require("../DB");
const isAuth = async (req, res, next) => {
    const userRepository = new DB_1.UserRepository();
    const tokenRepository = new DB_1.TokenRepository();
    const token = req.headers.authorization;
    if (!token)
        return next(new utils_1.BadRequestException("token is required"));
    const payload = (0, utils_1.verifyToken)(token);
    const userExist = await userRepository.getOne({ _id: payload._id });
    if (!userExist)
        return next(new utils_1.NotFoundException("user not found"));
    const blockedToken = await tokenRepository.getOne({
        token,
        type: utils_1.TokenType.access,
    });
    if (blockedToken) {
        return next(new utils_1.BadRequestException("your account is log out"));
    }
    if (userExist.credentialUpdatedAt > new Date(payload.iat * 1000)) {
        throw new utils_1.UnAuthorizedException("token is not valid");
    }
    req.user = userExist;
    req.role = userExist.role;
    return next();
};
exports.isAuth = isAuth;
