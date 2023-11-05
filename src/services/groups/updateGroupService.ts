import { GroupEntity } from '../../entities/groups';
import { GroupRepository } from '../../repositories/groupRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import { groupValidate } from '../../validation/groupValidate';
import path from 'path';
import fs from 'fs';

export default class UpdateGroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle(id: string, data: DocInterface, files: any, protocol: any, host: any) {
    let group = await this.groupRepository.readOne(id);

    if (!group) {
      throw new ResponseError(404, 'Group is not found');
    }

    let url: string | null = null;
    if (files === null) {
      if (group.avatar_url !== null) {
        url = group.avatar_url;
      }
    } else {
      const photo = files.file;
      const uploadDir = path.join(__dirname, '../../uploads');
      const fileName = `${Date.now()}_${photo.name}`;

      url = `${protocol}://${host}/upload/${fileName}`;
      const filePath = path.join(uploadDir, fileName);

      if (group.avatar_url !== null) {
        const segments = group.avatar_url.split('/');
        const oldName = segments[segments.length - 1];
        const pathFile = path.join(__dirname, `../../uploads/${oldName}`);
        fs.unlinkSync(pathFile);
      }

      await photo.mv(filePath);
    }

    const groupValidation = groupValidate(data);

    if (groupValidation?.result == false) {
      throw new ResponseError(400, groupValidation.message);
    }

    const groupEntity = new GroupEntity({
      name: data.name,
      description: data.description,
      avatar_url: url,
      user_member: data.user_member,
      created_at: group.created_at,
    });

    return await this.groupRepository.update(id, groupEntity.group);
  }
}
