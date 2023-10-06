"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../../repositories/userRepository");
class DeleteUserService {
    async handle(id) {
        const userRepository = new userRepository_1.UserRepository();
        return await userRepository.delete(id);
    }
}
exports.default = DeleteUserService;
