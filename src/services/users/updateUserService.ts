import { UserEntity } from '../../entities/users';
import { UserRepository } from '../../repositories/userRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import { userValidate } from '../../validation/userValidate';
import path from 'path';
import fs from 'fs';

export default class UpdateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async handle(id: string, data: DocInterface, files: any, protocol: any, host: any) {
    let user = await this.userRepository.readOne(id);

    if (!user) {
      throw new ResponseError(404, 'User is not found');
    }
    console.log('isi avatar_url', user.avatar_url);

    let url: string | null = null;
    if (files === null) {
      if (user.avatar_url !== null) {
        url = user.avatar_url;
        console.log('JIka tidak ada file yang dikirim tapi ada file sebelumnya ', url);
      }
    } else {
      const photo = files.file;
      const uploadDir = path.join(__dirname, '../../uploads');
      const fileName = `${Date.now()}_${photo.name}`;

      url = `${protocol}://${host}/upload/${fileName}`;
      const filePath = path.join(uploadDir, fileName);

      if (user.avatar_url !== null) {
        const segments = user.avatar_url.split('/');
        const oldName = segments[segments.length - 1];
        const pathFile = path.join(__dirname, `../../uploads/${oldName}`);
        fs.unlinkSync(pathFile);
      }

      await photo.mv(filePath);
    }

    const userValidation = userValidate(data);

    if (userValidation?.result == false) {
      throw new ResponseError(400, userValidation.message);
    }

    const userEntity = new UserEntity({
      username: data.username,
      phone_number: data.phone_number,
      avatar_url: url,
      display_name: data.display_name,
      info: data.info,
      security_notification: data.security_notification,
      reduce_call_data: data.reduce_call_data,
      proxy: data.proxy,
      language: data.language,
      linked_device: data.linked_device,
      last_active_at: data.last_active_at,
      created_at: user.created_at,
    });

    return await this.userRepository.update(id, userEntity.user);
  }
}
