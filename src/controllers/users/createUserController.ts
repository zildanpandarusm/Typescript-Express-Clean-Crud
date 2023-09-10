import { RequestHandler } from 'express';
import CreateUserService from '../../services/users/createUserService';
import { userValidate } from '../../validation/userValidate';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const userValidation = userValidate(req.body);
    if (userValidation?.result == false) {
      return res.status(400).json({ message: userValidation?.message });
    }

    const createUser = new CreateUserService();
    const result = await createUser.handle(req.body);
    return res.status(200).json({ message: 'User created successfully', data: result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
