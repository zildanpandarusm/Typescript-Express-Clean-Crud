import { Router } from 'express';
import userApi from './users/users';
import groupAPI from './groups/groups';

const router = Router();

router.use('/users', userApi);
router.use('/groups', groupAPI);

export default router;
