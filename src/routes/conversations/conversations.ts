import { Router } from 'express';
import CreateConversationService from '../../services/conversations/createConversationService';
import DeleteConversationService from '../../services/conversations/deleteConversationService';
import ReadManyConversationService from '../../services/conversations/readManyConversationService';
import ReadOneConversationService from '../../services/conversations/readOneConversationService';
import UpdateConversationService from '../../services/conversations/updateConversationService';
import ConversationController from '../../controllers/conversationController';
import { ConversationRepository } from '../../repositories/conversationRepository';

const router = Router();
const conversationRepository = new ConversationRepository();
const createConversation = new CreateConversationService(conversationRepository);
const deleteConversation = new DeleteConversationService(conversationRepository);
const readManyConversation = new ReadManyConversationService(conversationRepository);
const readOneConversation = new ReadOneConversationService(conversationRepository);
const updateConversation = new UpdateConversationService(conversationRepository);
const conversationController = new ConversationController(createConversation, readManyConversation, readOneConversation, updateConversation, deleteConversation);

router.post('/', (req, res, next) => conversationController.createConversation(req, res, next));

router.get('/', (req, res, next) => conversationController.readManyConversation(req, res, next));

router.get('/:id', (req, res, next) => conversationController.readOneConversation(req, res, next));

router.put('/:id', (req, res, next) => conversationController.updateConversation(req, res, next));

router.delete('/:id', (req, res, next) => conversationController.deleteConversation(req, res, next));

export default router;
