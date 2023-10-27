"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../entities/users");
const errorMiddleware_1 = require("../../middleware/errorMiddleware");
const userValidate_1 = require("../../validation/userValidate");
class UpdateUserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(id, data) {
        const userValidation = (0, userValidate_1.userValidate)(data);
        if (userValidation?.result == false) {
            throw new errorMiddleware_1.ResponseError(400, userValidation.message);
        }
        const userEntity = new users_1.UserEntity({
            name: data.name,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
        });
        return await this.userRepository.update(id, userEntity.user);
    }
}
exports.default = UpdateUserService;
