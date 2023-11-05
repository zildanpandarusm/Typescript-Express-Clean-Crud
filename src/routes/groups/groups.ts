import { Router } from 'express';
import CreateGroupService from '../../services/groups/createGroupService';
import DeleteGroupService from '../../services/groups/deleteGroupService';
import ReadManyGroupService from '../../services/groups/readManyGroupService';
import ReadOneGroupService from '../../services/groups/readOneGroupService';
import UpdateGroupService from '../../services/groups/updateGroupService';
import GroupController from '../../controllers/groupController';
import { GroupRepository } from '../../repositories/groupRepository';

const router = Router();
const groupRepository = new GroupRepository();
const createGroup = new CreateGroupService(groupRepository);
const deleteGroup = new DeleteGroupService(groupRepository);
const readManyGroup = new ReadManyGroupService(groupRepository);
const readOneGroup = new ReadOneGroupService(groupRepository);
const updateGroup = new UpdateGroupService(groupRepository);
const groupController = new GroupController(createGroup, readManyGroup, readOneGroup, updateGroup, deleteGroup);

router.post('/', (req, res, next) => groupController.createGroup(req, res, next));

router.get('/', (req, res, next) => groupController.readManyGroup(req, res, next));

router.get('/:id', (req, res, next) => groupController.readOneGroup(req, res, next));

router.put('/:id', (req, res, next) => groupController.updateGroup(req, res, next));

router.delete('/:id', (req, res, next) => groupController.deleteGroup(req, res, next));

export default router;
