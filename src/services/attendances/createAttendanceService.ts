import { attendanceValidate } from '../../validation/attendanceValidate';
import { AttendanceEntity } from '../../entities/attendances';
import { AttendanceRepository } from '../../repositories/attendanceRepository';
import { DocInterface } from '../../entities/docInterface';
import { ResponseError } from '../../middleware/errorMiddleware';
import ReadOneAttendanceService from './readOneAttendanceService';

export default class CreateAttendanceService {
  private attendanceRepository: AttendanceRepository;

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }

  public async handle(idUser: string, data: DocInterface) {
    const attendanceValidation = attendanceValidate(data);

    if (attendanceValidation?.result == false) {
      throw new ResponseError(400, attendanceValidation.message);
    }

    const attendanceEntity = new AttendanceEntity({
      id_group: data.id_group,
      id_user: idUser,
      id_location: data.id_location,
      photo: data.photo,
      created_at: data.created_at,
    });

    let attendanceData = attendanceEntity.CheckData();

    let attendance = await this.attendanceRepository.create(attendanceData);

    const readOneAttendance = new ReadOneAttendanceService(this.attendanceRepository);
    const dataAttendance = await readOneAttendance.handle(attendance.insertedId.toString());

    return {
      _id: dataAttendance._id,
      id_group: dataAttendance.id_group,
      id_user: dataAttendance.id_user,
      id_location: dataAttendance.id_location,
      photo: dataAttendance.photo,
      created_at: dataAttendance.created_at,
    };
  }
}
