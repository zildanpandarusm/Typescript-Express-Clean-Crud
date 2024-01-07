import { locationValidate } from '../../validation/locationValidate';
import { LocationEntity } from '../../entities/locations';
import { LocationRepository } from '../../repositories/locationRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import ReadOneLocationService from './readOneLocationService';

export default class CreateLocationService {
  private locationRepository: LocationRepository;

  constructor(locationRepository: LocationRepository) {
    this.locationRepository = locationRepository;
  }

  public async handle(idUser: string, data: DocInterface) {
    if ((await this.locationRepository.getLocationByName(data.name)) !== null) {
      throw new ResponseError(400, 'Name already registered');
    }

    const locationValidation = locationValidate(data);

    if (locationValidation?.result == false) {
      throw new ResponseError(400, locationValidation.message);
    }

    const locationEntity = new LocationEntity({
      id_user: idUser,
      name: data.name,
      location_latitude: data.location_latitude,
      location_longitude: data.location_longitude,
    });

    let locationData = locationEntity.CheckData();

    let location = await this.locationRepository.create(locationData);

    const readOneLocation = new ReadOneLocationService(this.locationRepository);
    const dataLocation = await readOneLocation.handle(location.insertedId.toString());

    return {
      _id: dataLocation._id,
      id_user: dataLocation.id_user,
      name: dataLocation.name,
      location_latitude: dataLocation.location_latitude,
      location_longitude: dataLocation.location_longitude,
    };
  }
}
