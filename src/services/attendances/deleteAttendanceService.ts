import { ResponseError } from '../../middleware/errorMiddleware';
import { AttendanceRepository } from '../../repositories/attendanceRepository';

export default class DeleteAttendanceService {
  private attendanceRepository: AttendanceRepository;

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }

  public async handle(id: string) {
    const attendance = await this.attendanceRepository.readOne(id);

    if (!attendance) {
      throw new ResponseError(404, 'Attendance is not found');
    }

    return await this.attendanceRepository.delete(id);
  }
}
