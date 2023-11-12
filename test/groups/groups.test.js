import app, { server } from '../../src/app';
import request from 'supertest';
import { createTestGroup, getTestGroup, deleteTestGroup } from './test-util-groups';
import path from 'path';

afterAll(async () => {
  await server.close();
  console.log('Server ditutup');
  await new Promise(resolve => setTimeout(() => resolve(), 1000));
});

describe('GET /v1/groups/', () => {
  beforeAll(async () => {
    await createTestGroup();
  });

  afterAll(async () => {
    await deleteTestGroup();
  });

  it('should return the expected response groups', async () => {
    const response = await request(app).get('/v1/groups');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All groups!');

    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe('GET /v1/groups/:id', function () {
  beforeEach(async () => {
    await createTestGroup();
  });

  afterEach(async () => {
    await deleteTestGroup();
  });

  it('should can get group by id', async () => {
    const testGroup = await getTestGroup();

    const response = await request(app).get(`/v1/groups/${testGroup.body.data._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Group');
    expect(response.body.data._id).toBe(testGroup.body.data._id);
    expect(response.body.data.name).toBe(testGroup.body.data.name);
    expect(response.body.data.description).toBe(testGroup.body.data.description);
    expect(response.body.data.user_member).toBe(testGroup.body.data.user_member);
    expect(response.body.data.avatar_url).toBeDefined();
    expect(response.body.data.created_at).toBeDefined();
  });

  it('should return 404 if group id is not found', async () => {
    const response = await request(app).get(`/v1/groups/653b6a8731907cb1cd505459`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('Group is not found');
  });

  it('should return 500', async () => {
    const response = await request(app).get(`/v1/groups/3ab82wu5v`);

    expect(response.status).toBe(500);
    expect(response.body.errors).toBeDefined();
  });
});

describe('POST v1/groups/', () => {
  const userMember = [
    {
      id: '98472479813',
    },
    {
      id: '26736263288',
    },
  ];
  it('should can create new group', async () => {
    const response = await request(app)
      .post('/v1/groups')
      .field('name', 'Informatika')
      .field('description', 'Kelas Informtika')
      .field('user_member', JSON.stringify(userMember))
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_2.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should can create new group without file', async () => {
    const response = await request(app).post('/v1/groups').field('name', 'Informatika').field('description', 'Kelas Informtika').set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should reject if request typeof description is not valid', async () => {
    const response = await request(app).post('/v1/groups').send({
      name: 'grup belajar ipa',
      description: 812345678,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('name dan description harus bertipe string');
  });

  it('should reject if request is not valid', async () => {
    const response = await request(app)
      .post('/v1/groups')
      .field('name', '')
      .field('description', '')
      .field('user_member', JSON.stringify(userMember))
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_2.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Name is required, Description is required');
  });
});

describe('PUT /v1/groups/:id', function () {
  const userMember = [
    {
      id: '98472479813',
    },
    {
      id: '26736263288',
    },
  ];

  beforeEach(async () => {
    await createTestGroup();
  });

  afterEach(async () => {
    await deleteTestGroup();
  });

  it('should can update existing group', async () => {
    const testGroup = await getTestGroup();

    const response = await request(app)
      .put('/v1/groups/' + testGroup.body.data._id)
      .field('name', 'Kelas A')
      .field('description', 'Kelas A Prodi Informtika')
      .field('user_member', JSON.stringify(userMember))
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Group updated successfully!');
  });

  it('should can update without file', async () => {
    const testGroup = await getTestGroup();

    const response = await request(app)
      .put('/v1/groups/' + testGroup.body.data._id)
      .field('name', 'Kelas A')
      .field('description', 'Kelas A Prodi Informtika')
      .field('user_member', JSON.stringify(userMember))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Group updated successfully!');
  });

  it('should reject if request is invalid', async () => {
    const testGroup = await getTestGroup();

    const response = await request(app)
      .put('/v1/groups/' + testGroup.body.data._id)
      .field('name', '')
      .field('description', '')
      .field('user_member', JSON.stringify(userMember))
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('Name is required, Description is required');
  });

  it('should reject if group is not found', async () => {
    const response = await request(app)
      .put('/v1/groups/653b6a8731907cb1cd505459')
      .field('name', 'Kelas A')
      .field('description', 'Kelas A Prodi Informtika')
      .field('user_member', JSON.stringify(userMember))
      .attach('file', path.join(__dirname, '..', 'photo', 'photo_1.jpg'))
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('Group is not found');
  });
});

describe('DELETE /v1/groups/:id', function () {
  beforeEach(async () => {
    await createTestGroup();
  });

  afterEach(async () => {
    await deleteTestGroup();
  });

  it('should can delete group', async () => {
    let testGroup = await getTestGroup();
    const result = await request(app).delete('/v1/groups/' + testGroup.body.data._id);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Group deleted successfully!');

    testGroup = await getTestGroup();
    expect(testGroup.status).toBe(404);
    expect(testGroup.body.errors).toBe('Group is not found');
  });

  it('should reject if group is not found', async () => {
    const result = await request(app).delete('/v1/groups/653b6a8731907cb1cd505459');

    expect(result.status).toBe(404);
  });
});
