import { RequestHandler } from 'express';
import ReadOneUserService from '../../services/users/readOneUserService';

export const readOneUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const readOneUser = new ReadOneUserService();
    const result = await readOneUser.handle(id);

    return res.status(200).json({ message: 'User', data: result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
