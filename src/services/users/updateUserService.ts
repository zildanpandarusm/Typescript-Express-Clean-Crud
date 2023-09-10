import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';

export default class UpdateUserService {
  public async handle(id: string, data: DocInterface) {
    const userEntity = new UserEntity({
      name: data.name,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });

    const userRepository = new UserRepository();
    return await userRepository.update(id, userEntity.user);
  }
}
