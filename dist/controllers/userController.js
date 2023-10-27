"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    async createUser(req, res, next) {
        try {
            const result = await this.createUserService.handle(req.body);
            return res.status(200).json({ message: 'User created successfully', data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async readOneUser(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.readOneUserService.handle(id);
            return res.status(200).json({ message: 'User', data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async readManyUser(req, res, next) {
        try {
            const result = await this.readManyUserService.handle();
            return res.status(200).json({ message: 'All users!', data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.updateUserService.handle(id, req.body);
            return res.status(200).json({ message: 'User updated successfully!', data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.deleteUserService.handle(id);
            return res.status(200).json({ message: 'User deleted successfully!' });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.default = UserController;
