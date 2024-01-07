import { LocationRepository } from '../../repositories/locationRepository';

export default class ReadManyLocationByUserService {
  private locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  public async handle(idUser: string) {
    const location = await this.locationRepository.readMany(idUser);

    return location;
  }
}
