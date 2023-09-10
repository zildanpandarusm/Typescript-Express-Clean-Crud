import { RequestHandler } from 'express';
import ReadManyUserService from '../../services/users/readManyUserService';

export const readManyUser: RequestHandler = async (req, res) => {
  try {
    const readManyUser = new ReadManyUserService();
    const result = await readManyUser.handle();

    return res.status(200).json({ message: 'All users!', data: result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
