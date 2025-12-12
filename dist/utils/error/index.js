"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.BadRequestException = exports.UnAuthorizedException = exports.ConflictException = exports.NotFoundException = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, errorDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
    }
}
exports.AppError = AppError;
class NotFoundException extends AppError {
    constructor(message, errorDetails) {
        super(message, 404, errorDetails);
    }
}
exports.NotFoundException = NotFoundException;
class ConflictException extends AppError {
    constructor(message, errorDetails) {
        super(message, 409, errorDetails);
    }
}
exports.ConflictException = ConflictException;
class UnAuthorizedException extends AppError {
    constructor(message, errorDetails) {
        super(message, 401, errorDetails);
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
class BadRequestException extends AppError {
    constructor(message, errorDetails) {
        super(message, 400, errorDetails);
    }
}
exports.BadRequestException = BadRequestException;
const errorHandler = async (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message,
        success: false,
        stack: err.stack,
        errorDetails: err.errorDetails,
    });
};
exports.errorHandler = errorHandler;
