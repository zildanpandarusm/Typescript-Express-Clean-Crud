"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../entities/users");
const userRepository_1 = require("../../repositories/userRepository");
class CreateUserService {
    async handle(data) {
        const userEntity = new users_1.UserEntity({
            name: data.name,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
        });
        const userRepository = new userRepository_1.UserRepository();
        return await userRepository.create(userEntity.user);
    }
}
exports.default = CreateUserService;
