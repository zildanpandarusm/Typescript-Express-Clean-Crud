import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import { userValidate } from '../../validation/userValidate';
import ReadOneUserService from './readOneUserService';
import bcrypt from 'bcrypt';

export default class UpdateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(id: string, data: DocInterface) {
    let user = await this.userRepository.readOne(id);

    if (!user) {
      throw new ResponseError(404, 'User is not found');
    }

    let hashPassword;
    if (data.password === '' || data.password === null) {
      hashPassword = user.password;
    } else {
      hashPassword = await bcrypt.hash(data.password, 12);
    }

    const userValidation = userValidate(data);

    if (userValidation?.result == false) {
      throw new ResponseError(400, userValidation.message);
    }

    const userEntity = new UserEntity({
      username: data.username,
      email: user.email,
      password: hashPassword,
      photo: data.photo,
      role: data.role,
      created_at: user.created_at,
    });

    let userData = userEntity.CheckData();

    await this.userRepository.update(id, userData);

    const readOneUser = new ReadOneUserService(this.userRepository);
    const dataUser = await readOneUser.handle(id);

    return {
      _id: dataUser._id,
      username: dataUser.username,
      email: dataUser.email,
      photo: dataUser.photo,
      role: dataUser.role,
      created_at: dataUser.created_at,
    };
  }
}
