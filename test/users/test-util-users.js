import supertest from 'supertest';
import app from '../../src/app';
import { response } from 'express';

let createdUserId;

export const createTestUser = async () => {
  const response = await supertest(app).post('/v1/users').set('Content-Type', 'application/json').send({ name: 'Lintang', email: 'lintang@gmail.com', address: 'Yogyakarta', phoneNumber: '0812345678' });

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
