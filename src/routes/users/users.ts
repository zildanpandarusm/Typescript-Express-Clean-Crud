import { Router } from 'express';
import * as controller from '../../controllers/users/index';

const router = Router();

router.post('/', controller.createUser);

router.get('/', controller.readManyUser);

router.get('/:id', controller.readOneUser);

router.patch('/:id', controller.updateUser);

router.delete('/:id', controller.deleteUser);

export default router;
