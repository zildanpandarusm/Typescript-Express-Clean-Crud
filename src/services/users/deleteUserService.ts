import { UserRepository } from '../../repositories/userRepository';

export default class DeleteUserService {
  public async handle(id: string) {
    const userRepository = new UserRepository();
    return await userRepository.delete(id);
  }
}
