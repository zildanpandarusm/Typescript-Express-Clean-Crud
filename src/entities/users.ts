import { ResponseError } from '../middleware/errorMiddleware';

export interface UserInterface {
  username: string;
  email: string;
  password: string;
  photo?: string;
  role?: string;
  created_at: Date;
}

export class UserEntity {
  private user: UserInterface;

  constructor(user: UserInterface) {
    this.user = {
      username: user.username,
      email: user.email.toLowerCase(),
      password: user.password,
      photo: user.photo,
      role: user.role?.toLowerCase() || 'user',
      created_at: user.created_at || new Date(),
    };
  }

  CheckData() {
    const errors: string[] = [];

    if (typeof this.user.username !== 'string') {
      errors.push('username must be a string.');
    }

    if (typeof this.user.email !== 'string') {
      errors.push('email must be a string.');
    }

    if (typeof this.user.password !== 'string') {
      errors.push('password must be a string.');
    }

    if (this.user.photo !== undefined && typeof this.user.photo !== 'string') {
      errors.push('photo must be a string or null.');
    }

    if (this.user.role !== undefined && typeof this.user.role !== 'string') {
      errors.push('role must be a string or undefined.');
    }

    if (this.user.created_at !== undefined && !(this.user.created_at instanceof Date)) {
      errors.push('created_at must be a Date.');
    }

    if (errors.length > 0) {
      throw new ResponseError(400, errors.join(' '));
    }

    return {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      photo: this.user.photo,
      role: this.user.role,
      created_at: this.user.created_at,
    };
  }
}
