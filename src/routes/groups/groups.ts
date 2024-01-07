import { Router } from 'express';
import CreateGroupService from '../../services/groups/createGroupService';
import DeleteGroupService from '../../services/groups/deleteGroupService';
import ReadManyGroupService from '../../services/groups/readManyGroupService';
import ReadOneGroupService from '../../services/groups/readOneGroupService';
import UpdateGroupService from '../../services/groups/updateGroupService';
import GroupController from '../../controllers/groupController';
import { GroupRepository } from '../../repositories/groupRepository';
import { adminOnly, verifyUser } from '../../middleware/authMiddleware';
import ReadManyGroupByUserService from '../../services/groups/readManyGroupByUserService';

const router = Router();
const groupRepository = new GroupRepository();
const createGroup = new CreateGroupService(groupRepository);
const deleteGroup = new DeleteGroupService(groupRepository);
const readManyGroup = new ReadManyGroupService(groupRepository);
const readOneGroup = new ReadOneGroupService(groupRepository);
const readManyGroupByUser = new ReadManyGroupByUserService(groupRepository);
const updateGroup = new UpdateGroupService(groupRepository);
const groupController = new GroupController(createGroup, readOneGroup, readManyGroup, readManyGroupByUser, updateGroup, deleteGroup);

router.post('/', verifyUser, adminOnly, (req, res, next) => groupController.createGroup(req, res, next));

router.get('/', verifyUser, adminOnly, (req, res, next) => groupController.readManyGroup(req, res, next));

router.get('/:id', verifyUser, adminOnly, (req, res, next) => groupController.readOneGroup(req, res, next));

router.get('/users/invitations', verifyUser, (req, res, next) => groupController.readManyGroupByUser(req, res, next));

router.put('/:id', verifyUser, (req, res, next) => groupController.updateGroup(req, res, next));

router.delete('/:id', verifyUser, adminOnly, (req, res, next) => groupController.deleteGroup(req, res, next));

export default router;
