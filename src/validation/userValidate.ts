import { DocInterface } from '../entities/docInterface';

export function userValidate(data: DocInterface) {
  const errors = [];

  if (!data.username) {
    errors.push('Username is required');
  }

  if (!data.email) {
    errors.push('Email is required');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  if (!data.confirmPassword) {
    errors.push('Konfirmasi password is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
