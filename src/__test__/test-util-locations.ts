import request from 'supertest';
import { app } from '../app';
import { getTestOneUser, loginUser } from './test-util-users';

let createdLocationId: string;

export const createTestLocation = async () => {
  const token = await loginUser();

  const response = await request(app)
    .post('/locations')
    .send({
      name: 'Rumah',
      location_latitude: '34606426',
      location_longitude: '23456787',
    })
    .set('Authorization', `Bearer ${token}`)
    .set('Cookie', `userRegistered=${token}`);

  createdLocationId = response.body.data._id;
};

export const getTestOneLocation = async () => {
  const token = await loginUser();

  if (createdLocationId) {
    const response = await request(app).get(`/locations/${createdLocationId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    return response;
  }
};

export const deleteTestLocation = async () => {
  const token = await loginUser();

  if (createdLocationId) {
    await request(app).delete(`/locations/${createdLocationId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
  }
};
