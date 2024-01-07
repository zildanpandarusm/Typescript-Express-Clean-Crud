import { GroupEntity } from '../../entities/groups';
import { GroupRepository } from '../../repositories/groupRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import { groupValidate } from '../../validation/groupValidate';
import ReadOneGroupService from './readOneGroupService';
import { Invitation } from '../../entities/groups';

export default class UpdateGroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle(id: string, data: DocInterface) {
    let group = await this.groupRepository.readOne(id);

    if (!group) {
      throw new ResponseError(404, 'Group is not found');
    }

    const groupValidation = groupValidate(data);

    if (groupValidation?.result === false) {
      throw new ResponseError(400, groupValidation.message);
    }

    const memberIds = new Set<string>();
    for (const member of data.member || []) {
      if (memberIds.has(member.id_user)) {
        throw new ResponseError(400, 'Duplicate id_user in member array');
      }
      memberIds.add(member.id_user);

      const existingInvitation = data.invitations.find((invitation: Invitation) => invitation.id_user === member.id_user);
      if (existingInvitation) {
        if (existingInvitation.status !== 'accepted') {
          throw new ResponseError(400, 'id_user in invitations must have status "accepted" if already in member array');
        }
      } else {
        throw new ResponseError(400, 'id_user in member array must have corresponding entry in invitations with status "accepted"');
      }
    }

    const invitationIds = new Set<string>();
    for (const invitation of data.invitations || []) {
      if (!invitation.id_user) {
        throw new ResponseError(400, 'Invalid id_user in invitations array');
      }

      if (invitationIds.has(invitation.id_user)) {
        throw new ResponseError(400, 'Duplicate id_user in invitations array');
      }

      invitationIds.add(invitation.id_user);
    }

    const groupEntity = new GroupEntity({
      name: data.name,
      id_admin: group.id_admin,
      member: data.member,
      invitations: data.invitations,
      created_at: group.created_at,
    });

    let groupData = groupEntity.CheckData();

    await this.groupRepository.update(id, groupData);

    const readOneGroup = new ReadOneGroupService(this.groupRepository);
    const dataGroup = await readOneGroup.handle(id);

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
