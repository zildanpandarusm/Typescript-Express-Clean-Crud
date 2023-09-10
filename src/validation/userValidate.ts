import { DocInterface } from '../entities/docInterface';

export function userValidate(data: DocInterface) {
  const errors = [];

  if (!data.name) {
    errors.push('Name is required');
  }

  if (!data.email) {
    errors.push('Email is required');
  }

  if (!data.address) {
    errors.push('Address is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
