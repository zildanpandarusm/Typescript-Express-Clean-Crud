import { ResponseError } from '../middleware/errorMiddleware';

export interface Invitation {
  id_user: string;
  role: string;
  status: string;
}

export interface GroupInterface {
  name: string;
  id_admin: string;
  member?: Array<{
    id_user: string;
    name: string;
    role: string;
  }>;
  invitations?: Array<Invitation>;
  created_at?: Date;
}

export class GroupEntity {
  public group: GroupInterface;

  constructor(group: GroupInterface) {
    if (!group.name || !group.id_admin) {
      throw new ResponseError(400, 'Name and Id Admin are required.');
    }

    this.group = {
      name: group.name,
      id_admin: group.id_admin,
      member: group.member || [],
      invitations: group.invitations || [],
      created_at: group.created_at || new Date(),
    };
  }

  CheckData() {
    const errors: string[] = [];

    if (typeof this.group.name !== 'string') {
      errors.push('name must be a string.');
    }

    if (typeof this.group.id_admin !== 'string') {
      errors.push('id_admin must be a string.');
    }

    if (!Array.isArray(this.group.member)) {
      errors.push('member must be an array.');
    } else {
      this.group.member.forEach((member, index) => {
        if (typeof member.id_user !== 'string') {
          errors.push(`member[${index}].id_user must be a string.`);
        }
        if (typeof member.name !== 'string') {
          errors.push(`member[${index}].name must be a string.`);
        }
        if (typeof member.role !== 'string') {
          errors.push(`member[${index}].role must be a string.`);
        }
      });
    }

    if (!Array.isArray(this.group.invitations)) {
      errors.push('invitations must be an array.');
    } else {
      this.group.invitations.forEach((invitation, index) => {
        if (typeof invitation.id_user !== 'string') {
          errors.push(`invitations[${index}].id_user must be a string.`);
        }
        if (typeof invitation.role !== 'string') {
          errors.push(`invitations[${index}].role must be a string.`);
        }
        if (typeof invitation.status !== 'string') {
          errors.push(`invitations[${index}].status must be a string.`);
        }
      });
    }

    if (!(this.group.created_at instanceof Date)) {
      errors.push('created_at must be a Date.');
    }

    if (errors.length > 0) {
      throw new ResponseError(400, errors.join(' '));
    }

    return {
      name: this.group.name,
      id_admin: this.group.id_admin,
      member: this.group.member,
      invitations: this.group.invitations,
      created_at: this.group.created_at,
    };
  }
}
