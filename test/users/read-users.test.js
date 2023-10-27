import request from 'supertest';
import app from '../../src/app';

describe('Test Response Read Many', () => {
  let createdUserId;
  const expectedUser = { name: 'World', email: 'sasa@gmai.com', address: 'Yogyakarta' };

  beforeEach(async () => {
    const response = await request(app).post('/v1/users').set('Content-Type', 'application/json').send({ name: 'World', email: 'sasa@gmai.com', address: 'Yogyakarta' });

    createdUserId = response.body.data;
  });

  afterEach(async () => {
    console.log(createdUserId);
    if (createdUserId) {
      await request(app).delete(`/v1/users/${createdUserId}`);
    }
  });

  it('should return the expected response', async () => {
    const response = await request(app).get('/v1/users');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All users!');

    expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining(expectedUser)]));
  });
});
