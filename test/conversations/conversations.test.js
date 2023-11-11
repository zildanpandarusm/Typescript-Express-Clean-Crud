import app, { server } from '../../src/app';
import request from 'supertest';
import { createTestConversation, getTestConversation, deleteTestConversation } from './test-util-conversations';

afterAll(() => {
  server.close();
  console.log('Server ditutup');
});

describe('GET /v1/conversations/', () => {
  beforeEach(async () => {
    await createTestConversation();
  });

  afterEach(async () => {
    await deleteTestConversation();
  });

  it('should return the expected response', async () => {
    const response = await request(app).get('/v1/conversations');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All conversations!');

    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe('GET /v1/conversations/:id', function () {
  beforeEach(async () => {
    await createTestConversation();
  });

  afterEach(async () => {
    await deleteTestConversation();
  });

  it('should can get conversation by id', async () => {
    const testConversation = await getTestConversation();

    const response = await request(app).get(`/v1/conversations/${testConversation.body.data._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Conversation');
    expect(response.body.data._id).toBe(testConversation.body.data._id);
    expect(response.body.data.user_id).toBe(testConversation.body.data.user_id);
    expect(response.body.data.group_id).toBe(testConversation.body.data.group_id);
    expect(response.body.data.is_pinned).toBe(testConversation.body.data.is_pinned);
    expect(response.body.data.is_muted).toBe(testConversation.body.data.is_muted);
    expect(response.body.data.created_at).toBeDefined();
  });

  it('should return 404 if conversation id is not found', async () => {
    const response = await request(app).get(`/v1/conversations/653b6a8731907cb1cd505459`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('Conversation is not found');
  });

  it('should return 500', async () => {
    const response = await request(app).get(`/v1/conversations/3ab82wu5v`);

    expect(response.status).toBe(500);
    expect(response.body.errors).toBeDefined();
  });
});

describe('POST v1/conversations/', () => {
  it('should can create new conversation', async () => {
    const response = await request(app).post('/v1/conversations').send({
      user_id: '853b8a8731907cb1cd50545',
      group_id: '729y7a8791407py1pd202424',
      is_pinned: false,
      is_muted: false,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.insertedId).toBeDefined();
  });

  it('should reject if request typeof value is not valid', async () => {
    const response = await request(app).post('/v1/conversations').send({
      user_id: 85348587319072318750545,
      group_id: '729y7a8791407py1pd202424',
      is_pinned: false,
      is_muted: false,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('user_id dan group_id harus bertipe string');
  });

  it('should reject if request is not valid', async () => {
    const response = await request(app).post('/v1/conversations').send({
      user_id: '',
      group_id: '',
      is_pinned: false,
      is_muted: false,
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('User ID is required, Group ID is required');
  });
});

describe('PUT /v1/conversations/:id', function () {
  beforeEach(async () => {
    await createTestConversation();
  });

  afterEach(async () => {
    await deleteTestConversation();
  });

  it('should can update existing conversation', async () => {
    const testConversation = await getTestConversation();

    const response = await request(app)
      .put('/v1/conversations/' + testConversation.body.data._id)
      .send({
        user_id: '853b8a8731907cb1cd50545',
        group_id: '729y7a8791407py1pd202424',
        is_pinned: false,
        is_muted: false,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Conversation updated successfully!');
  });

  it('should reject if request is invalid', async () => {
    const testConversation = await getTestConversation();

    const response = await request(app)
      .put('/v1/conversations/' + testConversation.body.data._id)
      .send({
        user_id: '',
        group_id: '',
        is_pinned: false,
        is_muted: false,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('User ID is required, Group ID is required');
  });

  it('should reject if conversation is not found', async () => {
    const response = await request(app).put('/v1/conversations/653b6a8731907cb1cd505459').send({
      user_id: '853b8a8731907cb1cd50545',
      group_id: '729y7a8791407py1pd202424',
      is_pinned: false,
      is_muted: false,
    });

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('Conversation is not found');
  });
});

describe('DELETE /v1/conversations/:id', function () {
  beforeEach(async () => {
    await createTestConversation();
  });

  afterEach(async () => {
    await deleteTestConversation();
  });

  it('should can delete Conversation', async () => {
    let testConversation = await getTestConversation();
    const result = await request(app).delete('/v1/conversations/' + testConversation.body.data._id);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Conversation deleted successfully!');

    testConversation = await getTestConversation();
    expect(testConversation.status).toBe(404);
    expect(testConversation.body.errors).toBe('Conversation is not found');
  });

  it('should reject if Conversation is not found', async () => {
    const result = await request(app).delete('/v1/conversations/653b6a8731907cb1cd505459');

    expect(result.status).toBe(404);
  });
});
