import { ResponseError } from '../../middleware/errorMiddleware';
import { LocationRepository } from '../../repositories/locationRepository';

export default class DeleteLocationService {
  private locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  public async handle(id: string) {
    const location = await this.locationRepository.readOne(id);

    if (!location) {
      throw new ResponseError(404, 'Location is not found');
    }

    return await this.locationRepository.delete(id);
  }
}
