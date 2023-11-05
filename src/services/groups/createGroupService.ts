import { groupValidate } from '../../validation/groupValidate';
import { GroupEntity } from '../../entities/groups';
import { GroupRepository } from '../../repositories/groupRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import path from 'path';

export default class CreateGroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
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

    const groupValidation = groupValidate(data);

    if (groupValidation?.result == false) {
      throw new ResponseError(400, groupValidation.message);
    }

    let createdAt: number = Math.floor(new Date().getTime() / 1000);

    const groupEntity = new GroupEntity({
      name: data.name,
      description: data.description,
      avatar_url: url,
      user_member: data.user_member,
      created_at: createdAt,
    });

    return await this.groupRepository.create(groupEntity.group);
  }
}
