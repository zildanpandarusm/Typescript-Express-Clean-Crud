import request from 'supertest';
import app, { server } from '../../src/app';
import { createTestUser, getTestUser, deleteTestUser } from './test-util-users';
import path from 'path';

afterAll(async () => {
  await server.close();
  console.log('Server ditutup');
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
});

describe('GET /v1/users/', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser();
  });

  it('should return the expected response users', async () => {
    const response = await request(app).get('/v1/users');

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
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: '0812345678',
      display_name: 'doni rudhi',
      info: 'Busy',
      security_notification: false,
      reduce_call_data: false,
      language: 'English',
      last_active_at: 3215683579,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should can create new user with file', async () => {
    const response = await request(app).post('/v1/users').field('username', 'donirudh').field('phone_number', '0812345678').attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg')).set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should reject if typeof phone_number is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: 812345678,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('username dan phone_number harus bertipe string');
  });

  it('should reject if typeof display_name is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: '0812345678',
      display_name: 999,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('display_name harus bertipe string atau tidak terdefinisi');
  });

  it('should reject if typeof security_notification is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: '0812345678',
      security_notification: 'gagal',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('security_notification harus bertipe boolean atau tidak terdefinisi');
  });

  it('should reject if typeof reduce_call_data is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: '0812345678',
      reduce_call_data: 'gagal',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('reduce_call_data harus bertipe boolean atau tidak terdefinisi');
  });

  it('should reject if typeof language is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: '0812345678',
      language: false,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('language harus bertipe string atau tidak terdefinisi');
  });

  it('should reject if typeof last_active_at is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: '0812345678',
      last_active_at: false,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('last_active_at harus bertipe string atau tidak terdefinisi');
  });

  it('should reject if request is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: '',
      phone_number: '',
      display_name: 'doni rudhi',
      info: 'Busy',
      security_notification: false,
      reduce_call_data: false,
      language: 'English',
      last_active_at: 3215683579,
    });

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
      .send({
        username: 'donirudh',
        phone_number: '0812345678',
        display_name: 'doni rudhi',
        info: 'Busy',
        security_notification: false,
        reduce_call_data: false,
        language: 'English',
        last_active_at: 3215683579,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully!');
  });

  it('should can update with file', async () => {
    const testUser = await getTestUser();

    const response = await request(app)
      .put('/v1/users/' + testUser.body.data._id)
      .field('username', 'donirudh')
      .field('phone_number', '0812345678')
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully!');
  });

  it('should reject if request typeof value is not valid', async () => {
    const response = await request(app).post('/v1/users').send({
      username: 'donirudh',
      phone_number: 812345678,
      display_name: 'doni rudhi',
      info: 'Busy',
      security_notification: false,
      reduce_call_data: false,
      language: 'English',
      last_active_at: 3215683579,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('username dan phone_number harus bertipe string');
  });

  it('should reject if request is invalid', async () => {
    const testUser = await getTestUser();

    const response = await request(app)
      .put('/v1/users/' + testUser.body.data._id)
      .send({
        username: '',
        phone_number: '',
        display_name: 'doni rudhi',
        info: 'Busy',
        security_notification: false,
        reduce_call_data: false,
        language: 'English',
        last_active_at: 3215683579,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Username is required, Phone number is required');
  });

  it('should reject if user is not found', async () => {
    const response = await request(app).put('/v1/users/653b6a8731907cb1cd505459').send({
      username: 'donirudh',
      phone_number: '0812345678',
      display_name: 'doni rudhi',
      info: 'Busy',
      security_notification: false,
      reduce_call_data: false,
      language: 'English',
      last_active_at: 3215683579,
    });

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
    expect(testUser.status).toBe(404);
    expect(testUser.body.errors).toBe('User is not found');
  });

  it('should reject if user is not found', async () => {
    const result = await request(app).delete('/v1/users/653b6a8731907cb1cd505459');

    expect(result.status).toBe(404);
  });
});
