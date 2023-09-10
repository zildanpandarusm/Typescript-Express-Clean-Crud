import { RequestHandler } from 'express';
import UpdateUserService from '../../services/users/updateUserService';
import { userValidate } from '../../validation/userValidate';

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const userValidation = userValidate(req.body);
    if (userValidation?.result == false) {
      return res.status(400).json({ message: userValidation?.message });
    }

    const updateUser = new UpdateUserService();
    const result = await updateUser.handle(id, req.body);

    return res.status(200).json({ message: 'User updated successfully!', data: result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
