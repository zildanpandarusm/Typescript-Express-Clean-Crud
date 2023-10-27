"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReadOneUserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(id) {
        return await this.userRepository.readOne(id);
    }
}
exports.default = ReadOneUserService;
