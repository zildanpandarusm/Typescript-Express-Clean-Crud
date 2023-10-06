"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readManyUser = void 0;
const readManyUserService_1 = __importDefault(require("../../services/users/readManyUserService"));
const readManyUser = async (req, res) => {
    try {
        const readManyUser = new readManyUserService_1.default();
        const result = await readManyUser.handle();
        return res.status(200).json({ message: 'All users!', data: result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.readManyUser = readManyUser;
