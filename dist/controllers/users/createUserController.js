"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUserService_1 = __importDefault(require("../../services/users/createUserService"));
const userValidate_1 = require("../../validation/userValidate");
const createUser = async (req, res) => {
    try {
        const userValidation = (0, userValidate_1.userValidate)(req.body);
        if (userValidation?.result == false) {
            return res.status(400).json({ message: userValidation?.message });
        }
        const createUser = new createUserService_1.default();
        const result = await createUser.handle(req.body);
        return res.status(200).json({ message: 'User created successfully', data: result });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.createUser = createUser;
