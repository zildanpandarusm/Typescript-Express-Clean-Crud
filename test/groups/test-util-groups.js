import request from 'supertest';
import app from '../../src/app';
import path from 'path';

let createdGroupId;

const filePath = path.join(__dirname, '..', 'photo', 'photo_1.jpg');
const userMember = [
  {
    id: '98472479813',
  },
  {
    id: '26736263288',
  },
];

export const createTestGroup = async () => {
  const response = await request(app)
    .post('/v1/groups')
    .field('name', 'Kelompok Ngoding')
    .field('description', 'Grup buat belajar ngoding')
    .field('user_member', JSON.stringify(userMember))
    .attach('file', filePath)
    .set('Content-Type', 'multipart/form-data');

  createdGroupId = response.body.data.insertedId;
};

export const getTestGroup = async () => {
  if (createdGroupId) {
    const response = await request(app).get(`/v1/groups/${createdGroupId}`);
    return response;
  }
};

export const deleteTestGroup = async () => {
  if (createdGroupId) {
    await request(app).delete(`/v1/groups/${createdGroupId}`);
  }
};
