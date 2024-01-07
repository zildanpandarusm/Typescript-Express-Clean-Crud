import { DocInterface } from '../entities/docInterface';

export function locationValidate(data: DocInterface) {
  const errors = [];

  if (!data.name) {
    errors.push('Name is required');
  }

  if (!data.location_latitude) {
    errors.push('Location latitude is required');
  }

  if (!data.location_longitude) {
    errors.push('Location longitude is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
