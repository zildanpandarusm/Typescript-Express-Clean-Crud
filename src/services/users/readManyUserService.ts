import { UserRepository } from '../../repositories/userRepository';

export default class ReadManyUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle() {
    return await this.userRepository.readMany();
  }
}
