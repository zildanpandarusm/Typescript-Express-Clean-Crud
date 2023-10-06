import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';

export default class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(data: DocInterface) {
    const userEntity = new UserEntity({
      name: data.name,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });

    return await this.userRepository.create(userEntity.user);
  }
}
