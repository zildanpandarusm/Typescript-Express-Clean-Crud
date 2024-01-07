import { userValidate } from '../../validation/userValidate';
import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import bcrypt from 'bcrypt';
import ReadOneUserService from './readOneUserService';

export default class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(data: DocInterface) {
    const userValidation = userValidate(data);

    if (userValidation?.result == false) {
      throw new ResponseError(400, userValidation.message);
    }

    if ((await this.userRepository.getUserByEmail(data.email)) !== null) {
      throw new ResponseError(400, 'Email already registered');
    }

    const hashedPass = await bcrypt.hash(data.password, 12);
    const created_at = new Date();

    const userEntity = new UserEntity({
      username: data.username,
      email: data.email,
      password: hashedPass,
      photo: data.photo,
      role: data.role,
      created_at: created_at,
    });

    let userData = userEntity.CheckData();

    let user = await this.userRepository.create(userData);

    const readOneUser = new ReadOneUserService(this.userRepository);
    const dataUser = await readOneUser.handle(user.insertedId.toString());

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
