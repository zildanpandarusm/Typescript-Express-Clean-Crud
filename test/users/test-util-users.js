import supertest from 'supertest';
import app from '../../src/app';
import path from 'path';

let createdUserId;

const filePath = path.join(__dirname, '..', 'photo', 'photo_1.jpg');

export const createTestUser = async () => {
  const response = await supertest(app)
    .post('/v1/users')
    .field('username', 'lintang271')
    .field('phone_number', '0812345678')
    .field('display_name', 'lintang')
    .field('info', 'Busy')
    .field('security_notification', false)
    .field('reduce_call_data', false)
    .field('language', 'English')
    .field('last_active_at', '3215683579')
    .attach('file', filePath)
    .set('Content-Type', 'multipart/form-data');

  createdUserId = response.body.data.insertedId;
};

export const getTestUser = async () => {
  if (createdUserId) {
    const response = await supertest(app).get(`/v1/users/${createdUserId}`);
    return response;
  }
};

export const deleteTestUser = async () => {
  if (createdUserId) {
    await supertest(app).delete(`/v1/users/${createdUserId}`);
  }
};
