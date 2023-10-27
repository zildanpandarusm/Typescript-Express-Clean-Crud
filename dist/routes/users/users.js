"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUserService_1 = __importDefault(require("../../services/users/createUserService"));
const deleteUserService_1 = __importDefault(require("../../services/users/deleteUserService"));
const readManyUserService_1 = __importDefault(require("../../services/users/readManyUserService"));
const readOneUserService_1 = __importDefault(require("../../services/users/readOneUserService"));
const updateUserService_1 = __importDefault(require("../../services/users/updateUserService"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const userRepository_1 = require("../../repositories/userRepository");
const router = (0, express_1.Router)();
const userRepository = new userRepository_1.UserRepository();
const createUser = new createUserService_1.default(userRepository);
const deleteUser = new deleteUserService_1.default(userRepository);
const readManyUser = new readManyUserService_1.default(userRepository);
const readOneUser = new readOneUserService_1.default(userRepository);
const updateUser = new updateUserService_1.default(userRepository);
const userController = new userController_1.default(createUser, readManyUser, readOneUser, updateUser, deleteUser);
router.post('/', (req, res, next) => userController.createUser(req, res, next));
router.get('/', (req, res, next) => userController.readManyUser(req, res, next));
router.get('/:id', (req, res, next) => userController.readOneUser(req, res, next));
router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));
router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));
exports.default = router;
