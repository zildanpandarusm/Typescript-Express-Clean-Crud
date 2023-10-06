"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const deleteUserService_1 = __importDefault(require("../../services/users/deleteUserService"));
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = new deleteUserService_1.default();
        const result = await deleteUser.handle(id);
        return res.status(200).json({ message: 'User deleted successfully!' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
