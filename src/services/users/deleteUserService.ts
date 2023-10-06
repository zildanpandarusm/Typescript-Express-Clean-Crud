import { UserRepository } from '../../repositories/userRepository';

export default class DeleteUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(id: string) {
    return await this.userRepository.delete(id);
  }
}
