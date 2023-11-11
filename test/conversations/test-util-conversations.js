import request from 'supertest';
import app from '../../src/app';

let createdConversationId;

export const createTestConversation = async () => {
  const response = await request(app).post('/v1/conversations').send({
    user_id: '653b6a8731907cb1cd50545',
    group_id: '729y7a8791407py1pd202424',
    is_pinned: true,
    is_muted: false,
  });

  createdConversationId = response.body.data.insertedId;
};

export const getTestConversation = async () => {
  if (createdConversationId) {
    const response = await request(app).get(`/v1/conversations/${createdConversationId}`);
    return response;
  }
};

export const deleteTestConversation = async () => {
  if (createdConversationId) {
    await request(app).delete(`/v1/conversations/${createdConversationId}`);
  }
};
