import { groupValidate } from '../../validation/groupValidate';
import { GroupEntity } from '../../entities/groups';
import { GroupRepository } from '../../repositories/groupRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import ReadOneGroupService from './readOneGroupService';

export default class CreateUserService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle(idAdmin: string, data: DocInterface) {
    const groupValidation = groupValidate(data);

    if (groupValidation?.result == false) {
      throw new ResponseError(400, groupValidation.message);
    }

    if ((await this.groupRepository.getGroupByName(data.name)) !== null) {
      throw new ResponseError(400, 'Name already exists');
    }

    const groupEntity = new GroupEntity({
      name: data.name,
      id_admin: idAdmin,
      created_at: data.created_at,
    });

    let groupData = groupEntity.CheckData();

    let group = await this.groupRepository.create(groupData);

    const readOneGroup = new ReadOneGroupService(this.groupRepository);
    const dataGroup = await readOneGroup.handle(group.insertedId.toString());

    return {
      _id: dataGroup._id,
      name: dataGroup.name,
      id_admin: dataGroup.id_admin,
      member: dataGroup.member,
      invitations: dataGroup.invitations,
      created_at: dataGroup.created_at,
    };
  }
}
