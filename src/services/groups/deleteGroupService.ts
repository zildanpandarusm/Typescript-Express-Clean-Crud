import { ResponseError } from '../../middleware/errorMiddleware';
import { GroupRepository } from '../../repositories/groupRepository';

export default class DeleteGroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async handle(id: string) {
    const user = await this.groupRepository.readOne(id);

    if (!user) {
      throw new ResponseError(404, 'Group is not found');
    }

    return await this.groupRepository.delete(id);
  }
}
