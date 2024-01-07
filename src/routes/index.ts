import { Router } from 'express';
import userApi from './users/users';
import authApi from './auth/auth';
import groupAPI from './groups/groups';
import attendanceAPI from './attendances/attendances';
import locationAPI from './locations/locations';

const router = Router();

router.use('/users', userApi);
router.use('/auth', authApi);
router.use('/groups', groupAPI);
router.use('/attendances', attendanceAPI);
router.use('/locations', locationAPI);

export default router;
