import request from 'supertest';
import app, { server } from '../../src/app';
import { createTestUser, getTestUser, deleteTestUser } from './test-util-users';
import path from 'path';
import Database from '../../src/database/database';

afterAll(() => {
  server.close();
  console.log('Server ditutup');
});

describe('GET v1/users/', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await deleteTestUser();
  });

  it('should return the expected response', async () => {
    const response = await request(app).get('/v1/users').set('Host', `localhost:3000`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All users!');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe('GET /v1/users/:id', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await deleteTestUser();
  });

  it('should can get user by id', async () => {
    const testUser = await getTestUser();

    const response = await request(app).get(`/v1/users/${testUser.body.data._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User');
    expect(response.body.data._id).toBe(testUser.body.data._id);
    expect(response.body.data.username).toBe(testUser.body.data.username);
    expect(response.body.data.phone_number).toBe(testUser.body.data.phone_number);
    expect(response.body.data.display_name).toBe(testUser.body.data.display_name);
    expect(response.body.data.info).toBe(testUser.body.data.info);
    expect(response.body.data.security_notification).toBe(testUser.body.data.security_notification);
    expect(response.body.data.reduce_call_data).toBe(testUser.body.data.reduce_call_data);
    expect(response.body.data.language).toBe(testUser.body.data.language);
    expect(response.body.data.last_active_at).toBe(testUser.body.data.last_active_at);
    expect(response.body.data.created_at).toBeDefined();
    expect(response.body.data.avatar_url).toBeDefined();
  });

  it('should return 404 if user id is not found', async () => {
    const response = await request(app).get(`/v1/users/653b6a8731907cb1cd505459`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('User is not found');
  });

  it('should return 500', async () => {
    const response = await request(app).get(`/v1/users/3ab82wu5v`);

    expect(response.status).toBe(500);
    expect(response.body.errors).toBeDefined();
  });
});

describe('POST v1/users/', () => {
  it('should can create new user', async () => {
    const response = await request(app)
      .post('/v1/users')
      .field('username', 'donirudh')
      .field('phone_number', '0812345678')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should can create new user without file', async () => {
    const response = await request(app)
      .post('/v1/users')
      .field('username', 'donirudh')
      .field('phone_number', '0812345678')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should reject if request is not valid', async () => {
    const response = await request(app)
      .post('/v1/users')
      .field('username', '')
      .field('phone_number', '')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Username is required, Phone number is required');
  });
});

describe('PUT /v1/users/:id', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await deleteTestUser();
  });

  it('should can update existing user', async () => {
    const testUser = await getTestUser();

    const response = await request(app)
      .put('/v1/users/' + testUser.body.data._id)
      .field('username', 'donirudh')
      .field('phone_number', '08123456789')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_2.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully!');
  });

  it('should can update without file', async () => {
    const testUser = await getTestUser();

    const response = await request(app)
      .put('/v1/users/' + testUser.body.data._id)
      .field('username', 'donirudh')
      .field('phone_number', '08123456789')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully!');
  });

  it('should reject if request is invalid', async () => {
    const testUser = await getTestUser();

    const response = await request(app)
      .put('/v1/users/' + testUser.body.data._id)
      .field('username', '')
      .field('phone_number', '')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Username is required, Phone number is required');
  });

  it('should reject if user is not found', async () => {
    const response = await request(app)
      .put('/v1/users/653b6a8731907cb1cd505459')
      .field('username', 'donirudh')
      .field('phone_number', '08123456789')
      .field('display_name', 'Doni Rudh')
      .field('info', 'Busy')
      .field('security_notification', false)
      .field('reduce_call_data', false)
      .field('language', 'English')
      .field('last_active_at', '63539426')
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('User is not found');
  });
});

describe('DELETE /v1/users/:id', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await deleteTestUser();
  });

  it('should can delete user', async () => {
    let testUser = await getTestUser();
    const result = await request(app).delete('/v1/users/' + testUser.body.data._id);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('User deleted successfully!');

    testUser = await getTestUser();
    console.log(testUser.body.errors);
    expect(testUser.status).toBe(404);
    expect(testUser.body.errors).toBe('User is not found');
  });

  it('should reject if user is not found', async () => {
    const result = await request(app).delete('/v1/users/653b6a8731907cb1cd505459');

    expect(result.status).toBe(404);
  });
});
