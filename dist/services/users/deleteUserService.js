"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteUserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(id) {
        return await this.userRepository.delete(id);
    }
}
exports.default = DeleteUserService;
