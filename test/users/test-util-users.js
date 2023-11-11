import request from 'supertest';
import app from '../../src/app';

let createdUserId;

export const createTestUser = async () => {
  const response = await request(app).post('/v1/users').send({
    username: 'lintang271',
    phone_number: '0812345678',
    display_name: 'lintang',
    info: 'Busy',
    security_notification: false,
    reduce_call_data: false,
    language: 'English',
    last_active_at: 3215683579,
  });

  createdUserId = response.body.data.insertedId;
};

export const getTestUser = async () => {
  if (createdUserId) {
    const response = await request(app).get(`/v1/users/${createdUserId}`);
    return response;
  }
};

export const deleteTestUser = async () => {
  if (createdUserId) {
    await request(app).delete(`/v1/users/${createdUserId}`);
  }
};
