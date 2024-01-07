import { NextFunction, Request, Response } from 'express';
import CreateGroupService from '../services/groups/createGroupService';
import { ResponseError } from '../middleware/errorMiddleware';
import ReadManyGroupService from '../services/groups/readManyGroupService';
import ReadOneGroupService from '../services/groups/readOneGroupService';
import UpdateGroupService from '../services/groups/updateGroupService';
import DeleteGroupService from '../services/groups/deleteGroupService';
import ReadManyGroupByUserService from '../services/groups/readManyGroupByUserService';

export default class UserController {
  private createGroupService: CreateGroupService;
  private readManyGroupService: ReadManyGroupService;
  private readOneGroupService: ReadOneGroupService;
  private readManyGroupByUserService: ReadManyGroupByUserService;
  private updateGroupService: UpdateGroupService;
  private deleteGroupService: DeleteGroupService;

  constructor(
    createGroupService: CreateGroupService,
    readOneGroupService: ReadOneGroupService,
    readManyGroupService: ReadManyGroupService,
    readManyGroupByUserService: ReadManyGroupByUserService,
    updateGroupService: UpdateGroupService,
    deleteGroupService: DeleteGroupService
  ) {
    this.createGroupService = createGroupService;
    this.readManyGroupService = readManyGroupService;
    this.updateGroupService = updateGroupService;
    this.deleteGroupService = deleteGroupService;
    this.readOneGroupService = readOneGroupService;
    this.readManyGroupByUserService = readManyGroupByUserService;
  }

  public async createGroup(req: any, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const idAdmin = req.userData._id;

      const result = await this.createGroupService.handle(idAdmin, data);

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

  public async readManyGroupByUser(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.userData._id;

      const result = await this.readManyGroupByUserService.handle(id);

      return res.status(200).json({ message: 'Group', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.readManyGroupService.handle();

      return res.status(200).json({ message: 'All Groups!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async updateGroup(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      let result = await this.updateGroupService.handle(id, req.body);

      return res.status(200).json({ message: 'Group updated successfully!', data: result });
    } catch (e) {
      next(e);
    }
  }

  // public async updateUserByAdmin(req: any, res: Response, next: NextFunction) {
  //   try {
  //     const id = req.params;

  //     let result = await this.updateGroupService.handle(id, req.body);

  //     return res.status(200).json({ message: 'Group updated successfully!', data: result });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

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
