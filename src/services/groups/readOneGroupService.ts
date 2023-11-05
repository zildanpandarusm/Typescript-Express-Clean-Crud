import { ResponseError } from '../../middleware/errorMiddleware';
import { GroupRepository } from '../../repositories/groupRepository';

export default class ReadOneGroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle(id: string) {
    const group = await this.groupRepository.readOne(id);

    if (!group) {
      throw new ResponseError(404, 'Group is not found');
    }

    return group;
  }
}
