import { ResponseError } from '../../middleware/errorMiddleware';
import { ConversationRepository } from '../../repositories/conversationRepository';

export default class ReadOneConversationService {
  private conversationRepository: ConversationRepository;

  constructor(conversationRepository: ConversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  public async handle(id: string) {
    const conversation = await this.conversationRepository.readOne(id);

    if (!conversation) {
      throw new ResponseError(404, 'Conversation is not found');
    }

    return conversation;
  }
}
