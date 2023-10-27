import { Router } from 'express';
import CreateUserService from '../../services/users/createUserService';
import DeleteUserService from '../../services/users/deleteUserService';
import ReadManyUserService from '../../services/users/readManyUserService';
import ReadOneUserService from '../../services/users/readOneUserService';
import UpdateUserService from '../../services/users/updateUserService';
import UserController from '../../controllers/userController';
import { UserRepository } from '../../repositories/userRepository';

const router = Router();
const userRepository = new UserRepository();
const createUser = new CreateUserService(userRepository);
const deleteUser = new DeleteUserService(userRepository);
const readManyUser = new ReadManyUserService(userRepository);
const readOneUser = new ReadOneUserService(userRepository);
const updateUser = new UpdateUserService(userRepository);
const userController = new UserController(createUser, readManyUser, readOneUser, updateUser, deleteUser);

router.post('/', (req, res, next) => userController.createUser(req, res, next));

router.get('/', (req, res, next) => userController.readManyUser(req, res, next));

router.get('/:id', (req, res, next) => userController.readOneUser(req, res, next));

router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));

router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));

export default router;
