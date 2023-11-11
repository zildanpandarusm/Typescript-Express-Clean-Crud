import { Router } from 'express';
import userApi from './users/users';
import groupAPI from './groups/groups';
import conversationAPI from './conversations/conversations';

const router = Router();

router.use('/users', userApi);
router.use('/groups', groupAPI);
router.use('/conversations', conversationAPI);

export default router;
