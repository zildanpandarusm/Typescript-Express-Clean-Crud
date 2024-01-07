import { DocInterface } from '../entities/docInterface';

export function attendanceValidate(data: DocInterface) {
  const errors = [];

  if (!data.id_group) {
    errors.push('Id group is required');
  }

  if (!data.id_location) {
    errors.push('Id location is required');
  }

  if (!data.photo) {
    errors.push('Photo is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
