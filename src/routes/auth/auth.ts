import { Router } from 'express';
import { UserRepository } from '../../repositories/userRepository';
import AuthController from '../../controllers/authController';
import { verifyUser } from '../../middleware/authMiddleware';

const router = Router();
const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

router.post('/login', (req, res, next) => authController.login(req, res, next));
router.get('/logout', (req, res) => authController.logout(req, res));

export default router;
