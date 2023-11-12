import { ResponseError } from '../middleware/errorMiddleware';

export interface ConversationInterface {
  user_id: string;
  group_id?: string;
  is_pinned?: boolean;
  is_muted?: boolean;
  created_at?: number;
}

export class ConversationEntity {
  public conversation: ConversationInterface;

  constructor(conversation: ConversationInterface) {
    if (typeof conversation.user_id !== 'string') {
      throw new ResponseError(400, 'user_id harus bertipe string');
    }

    if (conversation.group_id !== undefined && typeof conversation.group_id !== 'string') {
      throw new ResponseError(400, 'group_id harus bertipe boolean jika didefinisikan');
    }

    if (conversation.is_pinned !== undefined && typeof conversation.is_pinned !== 'boolean') {
      throw new ResponseError(400, 'is_pinned harus bertipe boolean jika didefinisikan');
    }

    if (conversation.is_muted !== undefined && typeof conversation.is_muted !== 'boolean') {
      throw new ResponseError(400, 'is_muted harus bertipe boolean jika didefinisikan');
    }

    if (conversation.created_at !== undefined && typeof conversation.created_at !== 'number') {
      throw new ResponseError(400, 'created_at harus bertipe number jika didefinisikan');
    }

    this.conversation = conversation;
  }
}
