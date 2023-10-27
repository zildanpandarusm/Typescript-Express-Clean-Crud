"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadManyUserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle() {
        return await this.userRepository.readMany();
    }
}
exports.default = ReadManyUserService;
