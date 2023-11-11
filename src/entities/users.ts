import { ResponseError } from '../middleware/errorMiddleware';

export interface UserInterface {
  username: string;
  phone_number: string;
  avatar_url?: string | null;
  display_name?: string;
  info?: string;
  security_notification?: boolean;
  reduce_call_data?: boolean;
  language?: string;
  block_users?: [];
  last_active_at?: number;
  created_at?: number;
}

export class UserEntity {
  public user: UserInterface;

  constructor(user: UserInterface) {
    if (typeof user.username !== 'string' || typeof user.phone_number !== 'string') {
      throw new ResponseError(400, 'username dan phone_number harus bertipe string');
    }

    if (user.avatar_url !== undefined && user.avatar_url !== null && typeof user.avatar_url !== 'string') {
      throw new ResponseError(400, 'avatar_url harus bertipe string atau null');
    }

    if (user.display_name !== undefined && typeof user.display_name !== 'string') {
      throw new ResponseError(400, 'display_name harus bertipe string atau tidak terdefinisi');
    }

    if (user.security_notification !== undefined && typeof user.security_notification !== 'boolean') {
      throw new ResponseError(400, 'security_notification harus bertipe boolean atau tidak terdefinisi');
    }

    if (user.reduce_call_data !== undefined && typeof user.reduce_call_data !== 'boolean') {
      throw new ResponseError(400, 'reduce_call_data harus bertipe boolean atau tidak terdefinisi');
    }

    if (user.language !== undefined && typeof user.language !== 'string') {
      throw new ResponseError(400, 'language harus bertipe string atau tidak terdefinisi');
    }

    if (user.last_active_at !== undefined && typeof user.last_active_at !== 'number') {
      throw new ResponseError(400, 'last_active_at harus bertipe string atau tidak terdefinisi');
    }

    if (user.created_at !== undefined && typeof user.created_at !== 'number') {
      throw new ResponseError(400, 'created_at harus bertipe number atau tidak terdefinisi');
    }

    this.user = user;
  }
}
