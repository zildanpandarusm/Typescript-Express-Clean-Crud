import { AttendanceRepository } from '../../repositories/attendanceRepository';

export default class ReadManyAttendanceByUserService {
  private attendanceRepository: AttendanceRepository;

  constructor(attendanceRepository: AttendanceRepository) {
    this.attendanceRepository = attendanceRepository;
  }

  public async handle(idUser: string, startDate: string, endDate: string) {
    // Mengonversi string startDate dan endDate menjadi objek Date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Memanggil repository untuk membaca semua data kehadiran
    const allAttendance = await this.attendanceRepository.readMany(idUser);

    // Filter data berdasarkan rentang tanggal
    const filteredAttendance = allAttendance.filter((attendance) => {
      const attendanceDate = new Date(attendance.created_at);

      // Menyaring data yang berada dalam rentang tanggal yang ditentukan
      return attendanceDate >= startDateObj && attendanceDate <= endDateObj;
    });

    return filteredAttendance;
  }
}
