import request from 'supertest';
import { app } from '../app';
import { getTestOneUser, loginAdmin, loginUser } from './test-util-users';
import { GroupInterface } from '../entities/groups';

let createdGroupId: string;

export const createTestGroup = async () => {
  const token = await loginAdmin();

  const response = await request(app)
    .post('/groups')
    .send({
      name: 'Cabang Jakarta',
    })
    .set('Authorization', `Bearer ${token}`)
    .set('Cookie', `userRegistered=${token}`);

  createdGroupId = response.body.data._id;
};

export const getTestOneGroup = async () => {
  const token = await loginAdmin();

  if (createdGroupId) {
    const response = await request(app).get(`/groups/${createdGroupId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    return response;
  }
};

export const updateGroup = async () => {
  const token = await loginUser();

  const user = await getTestOneUser();
  const idUser = user?.body.data._id;

  if (createdGroupId) {
    const response = await request(app)
      .put(`/groups/${createdGroupId}`)
      .send({
        name: 'Cabang Jakarta',
        member: [
          {
            id_user: idUser,
            name: 'Zildan',
            role: 'user',
          },
        ],
        invitations: [
          {
            id_user: idUser,
            role: 'user',
            status: 'accepted',
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`)
      .set('Cookie', `userRegistered=${token}`);

    return response;
  }
};

export const deleteTestGroup = async () => {
  const token = await loginAdmin();

  if (createdGroupId) {
    await request(app).delete(`/groups/${createdGroupId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
  }
};
