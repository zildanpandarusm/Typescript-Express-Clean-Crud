import { NextFunction, Request, Response } from 'express';
import CreateConversationService from '../services/conversations/createConversationService';
import ReadManyConversationService from '../services/conversations/readManyConversationService';
import ReadOneConversationService from '../services/conversations/readOneConversationService';
import UpdateConversationService from '../services/conversations/updateConversationService';
import DeleteConversationService from '../services/conversations/deleteConversationService';

export default class ConversationController {
  private createConversationService: CreateConversationService;
  private readManyConversationService: ReadManyConversationService;
  private readOneConversationService: ReadOneConversationService;
  private updateConversationService: UpdateConversationService;
  private deleteConversationService: DeleteConversationService;

  constructor(
    createConversationService: CreateConversationService,
    readManyConversationService: ReadManyConversationService,
    readOneConversationService: ReadOneConversationService,
    updateConversationService: UpdateConversationService,
    deleteConversationService: DeleteConversationService
  ) {
    this.createConversationService = createConversationService;
    this.readManyConversationService = readManyConversationService;
    this.updateConversationService = updateConversationService;
    this.deleteConversationService = deleteConversationService;
    this.readOneConversationService = readOneConversationService;
  }

  public async createConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createConversationService.handle(req.body);

      return res.status(200).json({ message: 'Conversation created successfully', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readOneConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.readOneConversationService.handle(id);

      return res.status(200).json({ message: 'Conversation', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.readManyConversationService.handle();

      return res.status(200).json({ message: 'All conversations!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async updateConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.updateConversationService.handle(id, req.body);

      return res.status(200).json({ message: 'Conversation updated successfully!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async deleteConversation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.deleteConversationService.handle(id);

      return res.status(200).json({ message: 'Conversation deleted successfully!' });
    } catch (e) {
      next(e);
    }
  }
}
