"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userValidate_1 = require("../validation/userValidate");
const createUserService_1 = __importDefault(require("../services/users/createUserService"));
const readManyUserService_1 = __importDefault(require("../services/users/readManyUserService"));
const readOneUserService_1 = __importDefault(require("../services/users/readOneUserService"));
const updateUserService_1 = __importDefault(require("../services/users/updateUserService"));
const deleteUserService_1 = __importDefault(require("../services/users/deleteUserService"));
class UserController {
    createUserService;
    readManyUserService;
    readOneUserService;
    updateUserService;
    deleteUserService;
    constructor(createUserService, readManyUserService, readOneUserService, updateUserService, deleteUserService) {
        this.createUserService = createUserService;
        this.readManyUserService = readManyUserService;
        this.updateUserService = updateUserService;
        this.deleteUserService = deleteUserService;
        this.readOneUserService = readOneUserService;
    }
    async createUser(req, res) {
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
    }
    async readOneUser(req, res) {
        try {
            const { id } = req.params;
            const readOneUser = new readOneUserService_1.default();
            const result = await readOneUser.handle(id);
            return res.status(200).json({ message: 'User', data: result });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async readManyUser(req, res) {
        try {
            const readManyUser = new readManyUserService_1.default();
            const result = await readManyUser.handle();
            return res.status(200).json({ message: 'All users!', data: result });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async updateUser(req, res) {
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
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleteUser = new deleteUserService_1.default();
            const result = await deleteUser.handle(id);
            return res.status(200).json({ message: 'User deleted successfully!' });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
exports.default = UserController;
