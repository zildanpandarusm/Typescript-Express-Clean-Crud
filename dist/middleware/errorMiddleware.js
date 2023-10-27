"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.ResponseError = void 0;
class ResponseError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ResponseError = ResponseError;
const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof ResponseError) {
        res
            .status(err.status)
            .json({
            errors: err.message,
        })
            .end();
    }
    else {
        res
            .status(500)
            .json({
            errors: err.message,
        })
            .end();
    }
};
exports.errorMiddleware = errorMiddleware;
