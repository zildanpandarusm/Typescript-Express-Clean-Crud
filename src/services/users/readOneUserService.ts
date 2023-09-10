import { UserRepository } from '../../repositories/userRepository';

export default class ReadOneUserService {
  public async handle(id: string) {
    const userRepository = new UserRepository();
    return await userRepository.readOne(id);
  }
}
