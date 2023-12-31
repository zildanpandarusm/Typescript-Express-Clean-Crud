import { NextFunction, Request, Response } from 'express';
import CreateUserService from '../services/users/createUserService';
import { ResponseError } from '../middleware/errorMiddleware';
import ReadManyUserService from '../services/users/readManyUserService';
import ReadOneUserService from '../services/users/readOneUserService';
import UpdateUserService from '../services/users/updateUserService';
import DeleteUserService from '../services/users/deleteUserService';

export default class UserController {
  private createUserService: CreateUserService;
  private readManyUserService: ReadManyUserService;
  private readOneUserService: ReadOneUserService;
  private updateUserService: UpdateUserService;
  private deleteUserService: DeleteUserService;

  constructor(createUserService: CreateUserService, readOneUserService: ReadOneUserService, readManyUserService: ReadManyUserService, updateUserService: UpdateUserService, deleteUserService: DeleteUserService) {
    this.createUserService = createUserService;
    this.readManyUserService = readManyUserService;
    this.updateUserService = updateUserService;
    this.deleteUserService = deleteUserService;
    this.readOneUserService = readOneUserService;
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      if (data.password !== data.confirmPassword) {
        throw new ResponseError(400, 'password and confirm password is not match');
      }

      const result = await this.createUserService.handle(data);

      return res.status(200).json({ message: 'User created successfully', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.readOneUserService.handle(id);

      return res.status(200).json({ message: 'User', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.readManyUserService.handle();

      return res.status(200).json({ message: 'All users!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.userData._id;
      const data = req.body;

      if (data.password !== null && data.password !== data.confirmPassword) {
        throw new ResponseError(400, 'password and confirm password is not match');
      }

      let result = await this.updateUserService.handle(id, req.body);

      return res.status(200).json({ message: 'User updated successfully!', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.deleteUserService.handle(id);

      return res.status(200).json({ message: 'User deleted successfully!' });
    } catch (e) {
      next(e);
    }
  }
}
