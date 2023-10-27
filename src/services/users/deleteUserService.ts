import { ResponseError } from '../../middleware/errorMiddleware';
import { UserRepository } from '../../repositories/userRepository';

export default class DeleteUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(id: string) {
    const user = await this.userRepository.readOne(id);

    if (!user) {
      throw new ResponseError(404, 'User is not found');
    }

    return await this.userRepository.delete(id);
  }
}
