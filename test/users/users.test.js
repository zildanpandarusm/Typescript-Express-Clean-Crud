import app from '../../src/app';
import supertest from 'supertest';
import { createTestUser, getTestUser, deleteTestUser } from './test-util-users';

describe('GET v1/users/', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await deleteTestUser();
  });

  it('should return the expected response', async () => {
    const response = await supertest(app).get('/v1/users');
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

    const response = await supertest(app).get(`/v1/users/${testUser.body.data._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User');
    expect(response.body.data._id).toBe(testUser.body.data._id);
    expect(response.body.data.name).toBe(testUser.body.data.name);
    expect(response.body.data.email).toBe(testUser.body.data.email);
    expect(response.body.data.address).toBe(testUser.body.data.address);
    expect(response.body.data.phoneNumber).toBe(testUser.body.data.phoneNumber);
  });

  it('should return 404 if user id is not found', async () => {
    const response = await supertest(app).get(`/v1/users/653b6a8731907cb1cd505459`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('User is not found');
  });
});

describe('POST v1/users/', () => {
  it('should can create new user', async () => {
    const response = await supertest(app).post('/v1/users').set('Content-Type', 'application/json').send({
      name: 'Putri',
      email: 'putri@gmail.com',
      address: 'Yogyakarta',
      phoneNumber: '08090000000',
    });

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should reject if request is not valid', async () => {
    const response = await supertest(app).post('/v1/users').set('Content-Type', 'application/json').send({
      name: '',
      email: '',
      address: 'Yogyakarta',
      phoneNumber: '08090000000',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Name is required, Email is required');
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

    const response = await supertest(app)
      .put('/v1/users/' + testUser.body.data._id)
      .send({
        name: 'Nevan',
        email: 'nevan@gmail.com',
        address: 'Sleman',
        phoneNumber: '0823432567',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully!');
  });

  it('should reject if request is invalid', async () => {
    const testUser = await getTestUser();

    const response = await supertest(app)
      .put('/v1/users/' + testUser.body.data._id)
      .send({
        name: '',
        email: '',
        address: 'Sleman',
        phoneNumber: '0823432567',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Name is required, Email is required');
  });

  it('should reject if user is not found', async () => {
    const response = await supertest(app).put('/v1/users/653b6a8731907cb1cd505459').send({
      name: 'Nevan',
      email: 'nevan@gmail.com',
      address: 'Sleman',
      phoneNumber: '0823432567',
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
    const result = await supertest(app).delete('/v1/users/' + testUser.body.data._id);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('User deleted successfully!');

    testUser = await getTestUser();
    console.log(testUser.body.errors);
    expect(testUser.status).toBe(404);
    expect(testUser.body.errors).toBe('User is not found');
  });

  it('should reject if user is not found', async () => {
    const result = await supertest(app).delete('/v1/users/653b6a8731907cb1cd505459');

    expect(result.status).toBe(404);
  });
});
