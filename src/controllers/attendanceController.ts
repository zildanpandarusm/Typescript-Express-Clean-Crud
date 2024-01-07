import { NextFunction, Request, Response } from 'express';
import CreateAttendanceService from '../services/attendances/createAttendanceService';
import ReadManyAttendanceService from '../services/attendances/readManyAttendanceService';
import ReadOneAttendanceService from '../services/attendances/readOneAttendanceService';
import DeleteAttendanceService from '../services/attendances/deleteAttendanceService';
import ReadManyAttendanceByUserService from '../services/attendances/readManyAttendanceByUserService';

export default class AttendanceController {
  private createAttendanceService: CreateAttendanceService;
  private readManyAttendanceService: ReadManyAttendanceService;
  private readOneAttendanceService: ReadOneAttendanceService;
  private readManyAttendanceByUserService: ReadManyAttendanceByUserService;
  private deleteAttendanceService: DeleteAttendanceService;

  constructor(
    createAttendanceService: CreateAttendanceService,
    readManyAttendanceService: ReadManyAttendanceService,
    readManyAttendanceByUserService: ReadManyAttendanceByUserService,
    readOneAttendanceService: ReadOneAttendanceService,
    deleteAttendanceService: DeleteAttendanceService
  ) {
    this.createAttendanceService = createAttendanceService;
    this.readManyAttendanceService = readManyAttendanceService;
    this.deleteAttendanceService = deleteAttendanceService;
    this.readOneAttendanceService = readOneAttendanceService;
    this.readManyAttendanceByUserService = readManyAttendanceByUserService;
  }

  public async createAttendance(req: any, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const idUser = req.userData._id;

      const result = await this.createAttendanceService.handle(idUser, data);

      return res.status(200).json({ message: 'Attendance created successfully', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readOneAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.readOneAttendanceService.handle(id);

      return res.status(200).json({ message: 'Attendance', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyAttendanceByUser(req: any, res: Response, next: NextFunction) {
    try {
      const id = req.userData._id;
      const { start_date, end_date } = req.query;

      const result = await this.readManyAttendanceByUserService.handle(id, start_date, end_date);

      return res.status(200).json({ message: 'Attendances by user', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async readManyAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_user, start_date, end_date } = req.query;

      if (id_user === undefined || start_date === undefined || end_date === undefined) {
        return res.status(400).json({ message: 'Missing parameters' });
      }

      const result = await this.readManyAttendanceService.handle(id_user as string, start_date as string, end_date as string);

      return res.status(200).json({ message: 'Attendances', data: result });
    } catch (e) {
      next(e);
    }
  }

  public async deleteAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this.deleteAttendanceService.handle(id);

      return res.status(200).json({ message: 'Attendance deleted successfully!' });
    } catch (e) {
      next(e);
    }
  }
}
