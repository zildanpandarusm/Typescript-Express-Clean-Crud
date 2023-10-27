import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import { userValidate } from '../../validation/userValidate';

export default class UpdateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(id: string, data: DocInterface) {
    const userValidation = userValidate(data);

    if (userValidation?.result == false) {
      throw new ResponseError(400, userValidation.message);
    }

    const userEntity = new UserEntity({
      name: data.name,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });

    return await this.userRepository.update(id, userEntity.user);
  }
}
