import { ResponseError } from '../middleware/errorMiddleware';

export interface GroupInterface {
  name: string;
  description: string;
  avatar_url?: string | null;
  user_member?: [];
  created_at?: number;
}

export class GroupEntity {
  public group: GroupInterface;

  constructor(group: GroupInterface) {
    if (typeof group.name !== 'string' || typeof group.description !== 'string') {
      throw new ResponseError(400, 'name dan description harus bertipe string');
    }

    if (group.avatar_url !== undefined && group.avatar_url !== null && typeof group.avatar_url !== 'string') {
      throw new ResponseError(400, 'avatar_url harus bertipe string atau null');
    }

    if (group.created_at !== undefined && typeof group.created_at !== 'number') {
      throw new ResponseError(400, 'created_at harus bertipe number atau tidak terdefinisi');
    }

    this.group = group;
  }
}
