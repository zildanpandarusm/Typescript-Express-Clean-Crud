import { ResponseError } from '../middleware/errorMiddleware';

export interface AttendanceInterface {
  id_group: string;
  id_user: string;
  id_location: string;
  photo: string;
  created_at: Date;
}

export class AttendanceEntity {
  public attendance: AttendanceInterface;

  constructor(attendance: AttendanceInterface) {
    this.attendance = {
      id_group: attendance.id_group,
      id_user: attendance.id_user,
      id_location: attendance.id_location,
      photo: attendance.photo,
      created_at: attendance.created_at || new Date(),
    };
  }

  CheckData() {
    const errors: string[] = [];

    if (typeof this.attendance.id_group !== 'string') {
      errors.push('id_group must be a string.');
    }

    if (typeof this.attendance.id_user !== 'string') {
      errors.push('id_user must be a string.');
    }

    if (typeof this.attendance.id_location !== 'string') {
      errors.push('id_location must be a string.');
    }

    if (typeof this.attendance.photo !== 'string') {
      errors.push('photo must be a string.');
    }

    if (this.attendance.created_at !== undefined && !(this.attendance.created_at instanceof Date)) {
      errors.push('created_at must be a Date.');
    }

    if (errors.length > 0) {
      throw new ResponseError(400, errors.join(' '));
    }

    return {
      id_group: this.attendance.id_group,
      id_user: this.attendance.id_user,
      id_location: this.attendance.id_location,
      photo: this.attendance.photo,
      created_at: this.attendance.created_at,
    };
  }
}
