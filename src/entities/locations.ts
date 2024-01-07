import { ResponseError } from '../middleware/errorMiddleware';

export interface LocationInterface {
  id_user: string;
  name: string;
  location_latitude: string;
  location_longitude: string;
}

export class LocationEntity {
  public location: LocationInterface;

  constructor(location: LocationInterface) {
    this.location = {
      id_user: location.id_user,
      name: location.name,
      location_latitude: location.location_latitude,
      location_longitude: location.location_longitude,
    };
  }

  CheckData() {
    const errors: string[] = [];

    if (typeof this.location.id_user !== 'string') {
      errors.push('id_user must be a string.');
    }

    if (typeof this.location.name !== 'string') {
      errors.push('name must be a string.');
    }

    if (typeof this.location.location_latitude !== 'string') {
      errors.push('location_latitude must be a string.');
    }

    if (typeof this.location.location_longitude !== 'string') {
      errors.push('location_longitude must be a string.');
    }

    if (errors.length > 0) {
      throw new ResponseError(400, errors.join(' '));
    }

    return {
      id_user: this.location.id_user,
      name: this.location.name,
      location_latitude: this.location.location_latitude,
      location_longitude: this.location.location_longitude,
    };
  }
}
