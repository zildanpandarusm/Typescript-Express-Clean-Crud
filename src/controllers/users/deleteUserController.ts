import { RequestHandler } from 'express';
import DeleteUserService from '../../services/users/deleteUserService';

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = new DeleteUserService();
    const result = await deleteUser.handle(id);

    return res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
