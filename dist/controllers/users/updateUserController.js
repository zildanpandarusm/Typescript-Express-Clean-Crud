"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const updateUserService_1 = __importDefault(require("../../services/users/updateUserService"));
const userValidate_1 = require("../../validation/userValidate");
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userValidation = (0, userValidate_1.userValidate)(req.body);
        if (userValidation?.result == false) {
            return res.status(400).json({ message: userValidation?.message });
        }
        const updateUser = new updateUserService_1.default();
        const result = await updateUser.handle(id, req.body);
        return res.status(200).json({ message: 'User updated successfully!', data: result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
