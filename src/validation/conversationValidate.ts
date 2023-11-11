import { DocInterface } from '../entities/docInterface';

export function conversationValidate(data: DocInterface) {
  const errors = [];

  if (!data.user_id) {
    errors.push('User ID is required');
  }

  if (!data.group_id) {
    errors.push('Group ID is required');
  }

  if (errors.length === 0) {
    return { result: true, message: 'Data is valid' };
  } else {
    return { result: false, message: errors.join(', ') };
  }
}
