import { userValidate } from '../validation/userValidate';
import { Request, Response } from 'express';
import CreateUserService from '../services/users/createUserService';
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

  constructor(createUserService: CreateUserService, readManyUserService: ReadManyUserService, readOneUserService: ReadOneUserService, updateUserService: UpdateUserService, deleteUserService: DeleteUserService) {
    this.createUserService = createUserService;
    this.readManyUserService = readManyUserService;
    this.updateUserService = updateUserService;
    this.deleteUserService = deleteUserService;
    this.readOneUserService = readOneUserService;
  }

  public async createUser(req: Request, res: Response) {
    try {
      const userValidation = userValidate(req.body);
      if (userValidation?.result == false) {
        return res.status(400).json({ message: userValidation?.message });
      }

      const result = await this.createUserService.handle(req.body);
      return res.status(200).json({ message: 'User created successfully', data: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async readOneUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await this.readOneUserService.handle(id);

      return res.status(200).json({ message: 'User', data: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async readManyUser(req: Request, res: Response) {
    try {
      const result = await this.readManyUserService.handle();

      return res.status(200).json({ message: 'All users!', data: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userValidation = userValidate(req.body);
      if (userValidation?.result == false) {
        return res.status(400).json({ message: userValidation?.message });
      }

      const result = await this.updateUserService.handle(id, req.body);

      return res.status(200).json({ message: 'User updated successfully!', data: result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await this.deleteUserService.handle(id);

      return res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
