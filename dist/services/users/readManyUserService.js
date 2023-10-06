"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../../repositories/userRepository");
class ReadManyUserService {
    async handle() {
        const userRepository = new userRepository_1.UserRepository();
        return await userRepository.readMany();
    }
}
exports.default = ReadManyUserService;
