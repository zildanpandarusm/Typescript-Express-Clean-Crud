import { UserRepository } from '../../repositories/userRepository';

export default class ReadOneUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(id: string) {
    return await this.userRepository.readOne(id);
  }
}
