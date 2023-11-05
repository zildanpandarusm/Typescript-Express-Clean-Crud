import { NextFunction, Request, Response } from 'express';
import CreateGroupService from '../services/groups/createGroupService';
import ReadManyGroupService from '../services/groups/readManyGroupService';
import ReadOneGroupService from '../services/groups/readOneGroupService';
import UpdateGroupService from '../services/groups/updateGroupService';
import DeleteGroupService from '../services/groups/deleteGroupService';

export default class GroupController {
  private createGroupService: CreateGroupService;
  private readManyGroupService: ReadManyGroupService;
  private readOneGroupService: ReadOneGroupService;
  private updateGroupService: UpdateGroupService;
  private deleteGroupService: DeleteGroupService;

  constructor(createGroupService: CreateGroupService, readManyGroupService: ReadManyGroupService, readOneGroupService: ReadOneGroupService, updateGroupService: UpdateGroupService, deleteGroupService: DeleteGroupService) {
    this.createGroupService = createGroupService;
    this.readManyGroupService = readManyGroupService;
    this.updateGroupService = updateGroupService;
    this.deleteGroupService = deleteGroupService;
    this.readOneGroupService = readOneGroupService;
  }

  public async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      let result;
      if (req.files) {
        let files = req.files;
        result = await this.createGroupService.handle(req.body, files, req.protocol, req.get('host'));
      } else {
        result = await this.createGroupService.handle(req.body, null, null, null);
      }

      return res.status(200).json({ message: 'Group created successfully', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readOneGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.readOneGroupService.handle(id);

      return res.status(200).json({ message: 'Group', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.readManyGroupService.handle();

      return res.status(200).json({ message: 'All groups!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      let result;
      if (req.files) {
        let files = req.files;
        result = await this.updateGroupService.handle(id, req.body, files, req.protocol, req.get('host'));
      } else {
        result = await this.updateGroupService.handle(id, req.body, null, null, null);
      }

      return res.status(200).json({ message: 'Group updated successfully!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.deleteGroupService.handle(id);

      return res.status(200).json({ message: 'Group deleted successfully!' });
    } catch (e) {
      next(e);
    }
  }
}
