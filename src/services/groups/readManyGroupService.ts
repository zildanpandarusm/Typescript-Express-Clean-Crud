import { GroupRepository } from '../../repositories/groupRepository';

export default class ReadManyGroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle() {
    return await this.groupRepository.readMany();
  }
}
