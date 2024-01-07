import request from 'supertest';
import { app } from '../app';

let createdUserAdminId: string;
let createdUserId: string;
let tokenLoginAdmin: string;
let tokenLoginUser: string;

export const createTestUserAdmin = async () => {
  const response = await request(app).post('/users').send({
    username: 'lintang271',
    email: 'lintang@gmail.com',
    password: '1234',
    confirmPassword: '1234',
    photo: 'http://example.com/path/to/image.jpg',
    role: 'admin',
  });

  createdUserAdminId = response.body.data._id;
};

export const createTestUser = async () => {
  const response = await request(app).post('/users').send({
    username: 'zildan',
    email: 'zildan@gmail.com',
    password: '1234',
    confirmPassword: '1234',
    photo: 'http://example.com/path/to/image.jpg',
    role: 'user',
  });

  createdUserId = response.body.data._id;
  return response.body;
};

export const loginAdmin = async () => {
  const response = await request(app).post('/auth/login').send({
    email: 'lintang@gmail.com',
    password: '1234',
  });

  return (tokenLoginAdmin = response.body.token);
};

export const loginUser = async () => {
  const response = await request(app).post('/auth/login').send({
    email: 'zildan@gmail.com',
    password: '1234',
  });

  return (tokenLoginUser = response.body.token);
};

export const getTestOneAdmin = async () => {
  const token = await loginAdmin();

  if (createdUserAdminId) {
    const response = await request(app).get(`/users/${createdUserAdminId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    return response;
  }
};

export const getTestOneUser = async () => {
  const token = await loginUser();

  if (createdUserId) {
    const response = await request(app).get(`/users/${createdUserId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    return response;
  }
};

export const deleteTestAdmin = async () => {
  const token = await loginAdmin();

  if (createdUserAdminId) {
    await request(app).delete(`/users/${createdUserAdminId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
  }
};

export const deleteTestUser = async () => {
  const token = await loginAdmin();

  if (createdUserId) {
    await request(app).delete(`/users/${createdUserId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
  }
};
