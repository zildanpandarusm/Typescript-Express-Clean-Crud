import { Router } from 'express';
import CreateAttendanceService from '../../services/attendances/createAttendanceService';
import DeleteAttendanceService from '../../services/attendances/deleteAttendanceService';
import ReadManyAttendanceService from '../../services/attendances/readManyAttendanceService';
import ReadOneAttendanceService from '../../services/attendances/readOneAttendanceService';
import AttendanceController from '../../controllers/attendanceController';
import { AttendanceRepository } from '../../repositories/attendanceRepository';
import { adminOnly, verifyUser } from '../../middleware/authMiddleware';
import ReadManyAttendanceByUserService from '../../services/attendances/readManyAttendanceByUserService';

const router = Router();
const attendanceRepository = new AttendanceRepository();
const createAttendance = new CreateAttendanceService(attendanceRepository);
const deleteAttendance = new DeleteAttendanceService(attendanceRepository);
const readManyAttendance = new ReadManyAttendanceService(attendanceRepository);
const readOneAttendance = new ReadOneAttendanceService(attendanceRepository);
const readManyAttendanceByUser = new ReadManyAttendanceByUserService(attendanceRepository);
const attendanceController = new AttendanceController(createAttendance, readManyAttendance, readManyAttendanceByUser, readOneAttendance, deleteAttendance);

router.post('/', verifyUser, (req, res, next) => attendanceController.createAttendance(req, res, next));

router.get('/users/list/get', verifyUser, adminOnly, (req, res, next) => attendanceController.readManyAttendance(req, res, next));

router.get('/:id', verifyUser, adminOnly, (req, res, next) => attendanceController.readOneAttendance(req, res, next));

router.get('/users/me', verifyUser, (req, res, next) => attendanceController.readManyAttendanceByUser(req, res, next));

router.delete('/:id', verifyUser, adminOnly, (req, res, next) => attendanceController.deleteAttendance(req, res, next));

export default router;
