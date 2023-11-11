import { ConversationEntity } from '../../entities/conversations';
import { ConversationRepository } from '../../repositories/conversationRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import { conversationValidate } from '../../validation/conversationValidate';

export default class UpdateConversationService {
  private conversationRepository: ConversationRepository;

  constructor(conversationRepository: ConversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  public async handle(id: string, data: DocInterface) {
    let conversation = await this.conversationRepository.readOne(id);

    if (!conversation) {
      throw new ResponseError(404, 'Conversation is not found');
    }

    const conversationValidation = conversationValidate(data);

    if (conversationValidation?.result == false) {
      throw new ResponseError(400, conversationValidation.message);
    }

    const conversationEntity = new ConversationEntity({
      user_id: data.user_id,
      group_id: data.group_id,
      is_pinned: data.is_pinned,
      is_muted: data.is_muted,
      created_at: conversation.created_at,
    });

    return await this.conversationRepository.update(id, conversationEntity.conversation);
  }
}
