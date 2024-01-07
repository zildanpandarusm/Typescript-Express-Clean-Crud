import request from 'supertest';
import { app } from '../app';
import { getTestOneUser, loginAdmin, loginUser } from './test-util-users';
import { AttendanceInterface } from '../entities/attendances';

let createdAttendanceId: string;

export const createTestAttendance = async () => {
  const token = await loginUser();

  const response = await request(app)
    .post('/attendances')
    .send({
      id_group: '653b6a8731907cb1cd505459',
      id_location: '355b6a8731907gb1cd505487',
      photo: 'http://example.com/path/to/image.jpg',
    })
    .set('Authorization', `Bearer ${token}`)
    .set('Cookie', `userRegistered=${token}`);

  createdAttendanceId = response.body.data._id;
};

export const getTestOneAttendance = async () => {
  const token = await loginAdmin();

  if (createdAttendanceId) {
    const response = await request(app).get(`/attendances/${createdAttendanceId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    return response;
  }
};

export const deleteTestAttendance = async () => {
  const token = await loginAdmin();

  if (createdAttendanceId) {
    await request(app).delete(`/attendances/${createdAttendanceId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
  }
};
