import { Invitation } from '../../entities/groups';
import { GroupRepository } from '../../repositories/groupRepository';

export default class ReadManyGroupByUserService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle(idUser: string) {
    const group = await this.groupRepository.readMany();

    const groupsWithUserId = group.filter((group) => group.invitations.some((invitation: Invitation) => invitation.id_user === idUser && invitation.status !== 'accepted'));

    return groupsWithUserId;
  }
}
