import { userValidate } from '../../validation/userValidate';
import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import path from 'path';

export default class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(data: DocInterface, files: any, protocol: any, host: any) {
    let url = null;
    if (files !== null) {
      const photo = files.file;
      const uploadDir = path.join(__dirname, '../../uploads');
      const fileName = `${Date.now()}_${photo.name}`;

      url = `${protocol}://${host}/upload/${fileName}`;
      const filePath = path.join(uploadDir, fileName);
      await photo.mv(filePath);
    }

    const userValidation = userValidate(data);

    if (userValidation?.result == false) {
      throw new ResponseError(400, userValidation.message);
    }

    let createdAt: number = Math.floor(new Date().getTime() / 1000);

    const userEntity = new UserEntity({
      username: data.username,
      phone_number: data.phone_number,
      avatar_url: url,
      display_name: data.display_name,
      info: data.info,
      security_notification: data.security_notification,
      reduce_call_data: data.reduce_call_data,
      language: data.language,
      block_users: data.block_users,
      last_active_at: data.last_active_at,
      created_at: createdAt,
    });

    return await this.userRepository.create(userEntity.user);
  }
}
