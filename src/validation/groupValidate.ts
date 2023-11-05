import { DocInterface } from '../entities/docInterface';

export function groupValidate(data: DocInterface) {
  const errors = [];

  if (!data.name) {
    errors.push('Name is required');
  }

  if (!data.description) {
    errors.push('Description is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
