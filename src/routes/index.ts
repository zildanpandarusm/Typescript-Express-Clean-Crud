import { Router } from 'express';
import userApi from './users/users';

const router = Router();

router.use('/users', userApi);

export default router;
