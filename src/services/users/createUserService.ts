import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';

export default class CreateUserService {
  public async handle(data: DocInterface) {
    const userEntity = new UserEntity({
      name: data.name,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });

    const userRepository = new UserRepository();
    return await userRepository.create(userEntity.user);
  }
}
