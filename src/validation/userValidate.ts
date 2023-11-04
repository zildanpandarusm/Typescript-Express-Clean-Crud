import { DocInterface } from '../entities/docInterface';

export function userValidate(data: DocInterface) {
  const errors = [];

  if (!data.username) {
    errors.push('Username is required');
  }

  if (!data.phone_number) {
    errors.push('Phone number is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
