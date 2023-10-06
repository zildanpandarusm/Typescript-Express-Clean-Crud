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

router.post('/', (req, res) => userController.createUser(req, res));

router.get('/', (req, res) => userController.readManyUser(req, res));

router.get('/:id', (req, res) => userController.readOneUser(req, res));

router.patch('/:id', (req, res) => userController.updateUser(req, res));

router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
