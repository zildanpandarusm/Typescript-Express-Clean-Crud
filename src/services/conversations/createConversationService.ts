import { conversationValidate } from '../../validation/conversationValidate';
import { ConversationEntity } from '../../entities/conversations';
import { ConversationRepository } from '../../repositories/conversationRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';

export default class CreateConversationService {
  private conversationRepository: ConversationRepository;

  constructor(conversationRepository: ConversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  public async handle(data: DocInterface) {
    const conversationValidation = conversationValidate(data);

    if (conversationValidation?.result == false) {
      throw new ResponseError(400, conversationValidation.message);
    }

    let createdAt: number = Math.floor(new Date().getTime() / 1000);

    const conversationEntity = new ConversationEntity({
      user_id: data.user_id,
      group_id: data.group_id,
      is_pinned: data.is_pinned,
      is_muted: data.is_muted,
      created_at: createdAt,
    });

    return await this.conversationRepository.create(conversationEntity.conversation);
  }
}
