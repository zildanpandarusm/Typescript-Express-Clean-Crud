import { UserRepository } from '../../repositories/userRepository';

export default class ReadManyUserService {
  public async handle() {
    const userRepository = new UserRepository();
    return await userRepository.readMany();
  }
}
