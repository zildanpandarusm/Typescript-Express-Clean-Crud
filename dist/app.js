"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = require("body-parser");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
exports.app = (0, express_1.default)();
exports.app.use((0, body_parser_1.json)());
exports.app.use((0, body_parser_1.urlencoded)({ extended: true }));
exports.app.use('/v1', index_1.default);
exports.app.use(errorMiddleware_1.errorMiddleware);
exports.app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
exports.default = exports.app;
