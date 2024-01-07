import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { ResponseError } from '../middleware/errorMiddleware';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthController {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.getUserByEmail(email.toLowerCase());

      if (!user) {
        throw new ResponseError(401, 'Email not found');
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new ResponseError(401, 'Password is wrong');
      }

      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        photo: user.photo,
        role: user.role,
      };

      const secret = process.env.JWT_SECRET!;

      const token = jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_EXPIRES,
      });
      const cookieOptions = {
        expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie('userRegistered', token, cookieOptions);

      return res.json({
        message: 'Login succesfully',
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          photo: user.photo,
          role: user.role,
        },
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response) {
    console.log('Before clearing cookie:', req.cookies);

    res.clearCookie('userRegistered');

    console.log('After clearing cookie:', req.cookies);

    return res.json({ message: 'Logout successfully' });
  }
}
