import { ConversationRepository } from '../../repositories/conversationRepository';

export default class ReadManyConversationService {
  private conversationRepository: ConversationRepository;

  constructor(conversationRepository: ConversationRepository) {
    this.conversationRepository = conversationRepository;
  }

  public async handle() {
    return await this.conversationRepository.readMany();
  }
}
