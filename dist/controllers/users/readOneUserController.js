"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOneUser = void 0;
const readOneUserService_1 = __importDefault(require("../../services/users/readOneUserService"));
const readOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const readOneUser = new readOneUserService_1.default();
        const result = await readOneUser.handle(id);
        return res.status(200).json({ message: 'User', data: result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.readOneUser = readOneUser;
