import request from 'supertest';
import { app, server } from '../app';
import { createTestUserAdmin, getTestOneAdmin, deleteTestAdmin, loginAdmin, getTestOneUser, loginUser, createTestUser, deleteTestUser } from './test-util-users';
import { createTestGroup, deleteTestGroup, getTestOneGroup } from './test-util-groups';
import { createTestAttendance, deleteTestAttendance, getTestOneAttendance } from './test-util-attendances';
import { createTestLocation, deleteTestLocation, getTestOneLocation } from './test-util-locations';

describe('Users Testing', () => {
  describe('GET /users', () => {
    beforeAll(async () => {
      await createTestUserAdmin();
    });

    afterAll(async () => {
      await deleteTestAdmin();
    });

    it('should return the expected response users', async () => {
      const token = await loginAdmin();
      const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('All users!');

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /users/:id', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
    });

    afterEach(async () => {
      await deleteTestAdmin();
    });

    it('should can get user by id', async () => {
      const token = await loginAdmin();
      const testUser: any = await getTestOneAdmin();

      const response = await request(app).get(`/users/${testUser.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User');
      expect(response.body.data._id).toBe(testUser.body.data._id);
      expect(response.body.data.username).toBe(testUser.body.data.username);
      expect(response.body.data.email).toBe(testUser.body.data.email);
      expect(response.body.data.password).toBe(testUser.body.data.password);
      expect(response.body.data.photo).toBe(testUser.body.data.photo);
      expect(response.body.data.role).toBe(testUser.body.data.role);
      expect(response.body.data.created_at).toBeDefined();
    });

    it('should return 404 if user id is not found', async () => {
      const token = await loginAdmin();
      const response = await request(app).get(`/users/653b6a8731907cb1cd505459`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('User is not found');
    });

    it('should return 500', async () => {
      const token = await loginAdmin();
      const response = await request(app).get(`/users/3ab82wu5v`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(500);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /users/', () => {
    beforeEach(async () => {});

    beforeAll(async () => {
      await createTestUserAdmin();
    });

    afterAll(async () => {
      await deleteTestAdmin();
    });

    it('should can create new user', async () => {
      const token = await loginAdmin();
      let createdUserId: string;
      const response = await request(app).post('/users').send({
        username: 'arga',
        email: 'arga@gmail.com',
        password: '1234',
        confirmPassword: '1234',
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });
      createdUserId = response.body.data._id;

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.username).toBe('arga');
      expect(response.body.data.email).toBe('arga@gmail.com');
      expect(response.body.data.photo).toBe('http://example.com/path/to/image.jpg');
      expect(response.body.data.role).toBe('admin');
      expect(response.body.data.created_at).toBeDefined();

      await request(app).delete(`/users/${createdUserId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    });

    it('should reject if email already registered', async () => {
      const response = await request(app).post('/users').send({
        username: 'lintang271',
        email: 'lintang@gmail.com',
        password: '1234',
        confirmPassword: '1234',
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Email already registered');
    });

    it('should reject if username or email or password or confirmPassword is null', async () => {
      const response = await request(app).post('/users').send({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Username is required, Email is required, Password is required, Konfirmasi password is required');
    });

    it('should reject if typeof username is not valid', async () => {
      const response = await request(app).post('/users').send({
        username: 7864,
        email: 'arga@gmail.com',
        password: '1234',
        confirmPassword: '1234',
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('username must be a string.');
    });

    it('should reject if typeof email is not valid', async () => {
      const response = await request(app).post('/users').send({
        username: 'arga',
        email: true,
        password: '1234',
        confirmPassword: '1234',
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });

      expect(response.body.errors).toBeDefined();
    });

    it('should reject if typeof password is not valid', async () => {
      const response = await request(app).post('/users').send({
        username: 'arga',
        email: 'arga@gmail.com',
        password: 1234,
        confirmPassword: 1234,
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });

      expect(response.body.errors).toBeDefined();
    });

    it('should reject if password and confirmPassword is not match', async () => {
      const response = await request(app).post('/users').send({
        username: 'arga',
        email: 'arga@gmail.com',
        password: '1234',
        confirmPassword: false,
        photo: 'http://example.com/path/to/image.jpg',
        role: 'admin',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('password and confirm password is not match');
    });

    it('should reject if typeof photo is not valid', async () => {
      const response = await request(app).post('/users').send({
        username: 'arga',
        email: 'arga@gmail.com',
        password: '1234',
        confirmPassword: '1234',
        photo: true,
        role: 'admin',
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('photo must be a string or null.');
    });
  });

  describe('PUT /users', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
    });

    afterEach(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can update current user', async () => {
      let user = await createTestUser();
      const createdUserId = user.data._id;
      const token = await loginUser();
      const testUser = await request(app).get(`/users/${createdUserId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      const response = await request(app)
        .put('/users')
        .send({
          username: 'donirudh',
          email: `${testUser.body.data.email}`,
          password: '4321',
          confirmPassword: '4321',
          photo: 'http://example.com/path/to/doni.jpg',
          role: 'admin',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User updated successfully!');
      expect(response.body.data._id).toBe(testUser.body.data._id);
      expect(response.body.data.username).toBe('donirudh');
      expect(response.body.data.email).toBe(testUser.body.data.email);
      expect(response.body.data.photo).toBe('http://example.com/path/to/doni.jpg');
      expect(response.body.data.role).toBe('admin');
      expect(response.body.data.created_at).toBe(testUser.body.data.created_at);
    });

    it('should reject if password and confirm password is not match', async () => {
      let user = await createTestUser();
      const createdUserId = user.data._id;
      const token = await loginUser();
      const testUser = await request(app).get(`/users/${createdUserId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      const response = await request(app)
        .put('/users')
        .send({
          username: 'donirudh',
          email: `${testUser.body.data.email}`,
          password: '4321',
          confirmPassword: '43216',
          photo: 'http://example.com/path/to/doni.jpg',
          role: 'admin',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('password and confirm password is not match');
    });
  });

  describe('DELETE /users/:id', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
    });

    afterEach(async () => {
      await deleteTestAdmin();
    });

    it('should can delete user', async () => {
      let user = await createTestUser();
      const createdUserId = user.data._id;
      const token = await loginAdmin();
      const testUser = await request(app).get(`/users/${createdUserId}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      const response = await request(app)
        .delete('/users/' + testUser.body.data._id)
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User deleted successfully!');
    });

    it('should reject if user is not found', async () => {
      const token = await loginAdmin();
      const response = await request(app).delete('/users/653b6a8731907cb1cd505459').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('User is not found');
    });
  });
});

describe('Groups Testing', () => {
  describe('GET /groups', () => {
    beforeAll(async () => {
      await createTestUserAdmin();
      await createTestGroup();
    });

    afterAll(async () => {
      await deleteTestGroup();
      await deleteTestAdmin();
    });

    it('should return the expected response users', async () => {
      const token = await loginAdmin();

      const response = await request(app).get('/groups').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('All Groups!');

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /groups/:id', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestGroup();
    });

    afterEach(async () => {
      await deleteTestGroup();
      await deleteTestAdmin();
    });

    it('should can get group by id', async () => {
      const token = await loginAdmin();
      const testUser: any = await getTestOneGroup();

      const response = await request(app).get(`/groups/${testUser.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Group');
      expect(response.body.data._id).toBe(testUser.body.data._id);
      expect(response.body.data.name).toBe(testUser.body.data.name);
      expect(response.body.data.id_admin).toBe(testUser.body.data.id_admin);
      expect(response.body.data.member).toEqual(testUser.body.data.member);
      expect(response.body.data.invitations).toEqual(testUser.body.data.invitations);
      expect(response.body.data.created_at).toBe(testUser.body.data.created_at);
    });

    it('should return 404 if group id is not found', async () => {
      const token = await loginAdmin();
      const response = await request(app).get(`/groups/653b6a8731907cb1cd505459`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Group is not found');
    });

    it('should return 500', async () => {
      const token = await loginAdmin();
      const response = await request(app).get(`/groups/3ab82wu5v`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(500);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /groups/users/invitations', () => {
    let testUser: any;

    beforeAll(async () => {
      await createTestUserAdmin();
      testUser = await createTestUser();
      await createTestGroup();
    });

    afterAll(async () => {
      await deleteTestGroup();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should return the expected response users', async () => {
      const token = await loginUser();
      const group = await getTestOneGroup();
      const user = await request(app).get(`/users/${testUser.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      await request(app)
        .put(`/groups/${group?.body.data._id}`)
        .send({
          name: 'Cabang Jakarta',
          invitations: [
            {
              id_user: `${user?.body.data._id}`,
              role: 'user',
              status: 'pending',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      const response = await request(app).get('/groups/users/invitations').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Group');

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /groups/', () => {
    beforeAll(async () => {
      await createTestUserAdmin();
    });

    afterAll(async () => {
      await deleteTestAdmin();
    });

    it('should can create group', async () => {
      const token = await loginAdmin();

      const response = await request(app)
        .post('/groups')
        .send({
          name: 'Cabang Surabaya',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Group created successfully');
      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.name).toBe('Cabang Surabaya');
      expect(response.body.data.id_admin).toBeDefined();
      expect(response.body.data.member).toBeDefined();
      expect(response.body.data.invitations).toBeDefined();
      expect(response.body.data.created_at).toBeDefined();

      await request(app).delete(`/groups/${response.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    });

    it('should reject if name already exist', async () => {
      const token = await loginAdmin();
      await createTestGroup();

      const response = await request(app)
        .post('/groups')
        .send({
          name: 'Cabang Jakarta',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Name already exists');
      await deleteTestGroup();
    });

    it('should reject if name is empty', async () => {
      const token = await loginAdmin();

      const response = await request(app)
        .post('/groups')
        .send({
          name: '',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Name is required');
    });
  });

  describe('PUT /groups/:id', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestGroup();
    });

    afterEach(async () => {
      await deleteTestGroup();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can update current group', async () => {
      let user = await createTestUser();
      const idUser = user.data._id;
      const token = await loginAdmin();
      const testGroupGetId: any = await getTestOneGroup();

      const response = await request(app)
        .put(`/groups/${testGroupGetId.body.data._id}`)
        .send({
          name: 'Cabang Jakarta',
          member: [
            {
              id_user: `${idUser}`,
              name: 'Zildan',
              role: 'user',
            },
          ],
          invitations: [
            {
              id_user: `${idUser}`,
              role: 'user',
              status: 'accepted',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      const testGroup = await request(app).get(`/groups/${testGroupGetId.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Group updated successfully!');
      expect(response.body.data._id).toBe(testGroup.body.data._id);
      expect(response.body.data.name).toBe(testGroup.body.data.name);
      expect(response.body.data.id_admin).toBe(testGroup.body.data.id_admin);
      expect(response.body.data.member).toEqual(testGroup.body.data.member);
      expect(response.body.data.invitations).toEqual(testGroup.body.data.invitations);
      expect(response.body.data.created_at).toBe(testGroup.body.data.created_at);
    });

    it('should reject if group is not found', async () => {
      const token = await loginAdmin();

      const response = await request(app)
        .put(`/groups/6593a5b2a5b086708c3a3e67`)
        .send({
          name: 'Cabang Jakarta',
          member: [
            {
              id_user: '5593a5b2a5b086708c3a3e62',
              name: 'Zildan',
              role: 'user',
            },
          ],
          invitations: [
            {
              id_user: '5593a5b2a5b086708c3a3e62',
              role: 'user',
              status: 'accepted',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Group is not found');
    });

    it('should reject if member already have user but in invitations the status is not accepted', async () => {
      const token = await loginAdmin();
      const testGroupGetId: any = await getTestOneGroup();

      const response = await request(app)
        .put(`/groups/${testGroupGetId.body.data._id}`)
        .send({
          name: 'Cabang Jakarta',
          member: [
            {
              id_user: '5593a5b2a5b086708c3a3e62',
              name: 'Zildan',
              role: 'user',
            },
          ],
          invitations: [
            {
              id_user: '5593a5b2a5b086708c3a3e62',
              role: 'user',
              status: 'pending',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('id_user in invitations must have status "accepted" if already in member array');
    });

    it('should reject if member already have user but in invitations dont have', async () => {
      const token = await loginAdmin();
      const testGroupGetId: any = await getTestOneGroup();

      const response = await request(app)
        .put(`/groups/${testGroupGetId.body.data._id}`)
        .send({
          name: 'Cabang Jakarta',
          member: [
            {
              id_user: '5593a5b2a5b086708c3a3e65',
              name: 'Zildan',
              role: 'user',
            },
          ],
          invitations: [
            {
              id_user: '5593a5b2a5b086708c3a3e62',
              role: 'user',
              status: 'pending',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('id_user in member array must have corresponding entry in invitations with status "accepted"');
    });

    it('should reject if invalid id_user in invitations array', async () => {
      const token = await loginAdmin();
      const testGroupGetId: any = await getTestOneGroup();

      const response = await request(app)
        .put(`/groups/${testGroupGetId.body.data._id}`)
        .send({
          name: 'Cabang Jakarta',
          member: [
            {
              id_user: '5593a5b2a5b086708c3a3e65',
              name: 'Zildan',
              role: 'user',
            },
          ],
          invitations: [
            {
              id_user: '',
              role: 'user',
              status: 'pending',
            },
            {
              id_user: '5593a5b2a5b086708c3a3e65',
              role: 'user',
              status: 'accepted',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Invalid id_user in invitations array');
    });

    it('should reject if duplicate id_user in invitations array', async () => {
      const token = await loginAdmin();
      const testGroupGetId: any = await getTestOneGroup();

      const response = await request(app)
        .put(`/groups/${testGroupGetId.body.data._id}`)
        .send({
          name: 'Cabang Jakarta',
          member: [
            {
              id_user: '5593a5b2a5b086708c3a3e65',
              name: 'Zildan',
              role: 'user',
            },
          ],
          invitations: [
            {
              id_user: '5593a5b2a5b086708c3a3e68',
              role: 'user',
              status: 'pending',
            },
            {
              id_user: '5593a5b2a5b086708c3a3e68',
              role: 'user',
              status: 'pending',
            },
            {
              id_user: '5593a5b2a5b086708c3a3e65',
              role: 'user',
              status: 'accepted',
            },
          ],
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Duplicate id_user in invitations array');
    });
  });

  describe('DELETE /groups/:id', function () {
    beforeAll(async () => {
      await createTestUserAdmin();
      await createTestGroup();
    });

    afterAll(async () => {
      await deleteTestAdmin();
    });

    it('should can delete group', async () => {
      let group = await getTestOneGroup();
      group = group?.body.data._id;
      const token = await loginAdmin();

      const response = await request(app)
        .delete('/groups/' + group)
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Group deleted successfully!');
    });

    it('should reject if group is not found', async () => {
      const token = await loginAdmin();
      const response = await request(app).delete('/groups/653b6a8731907cb1cd505459').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Group is not found');
    });
  });
});

describe('Attendances Testing', () => {
  describe('GET /attendances/users/list/get', () => {
    beforeAll(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestAttendance();
    });

    afterAll(async () => {
      await deleteTestAttendance();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should return the expected response attendances', async () => {
      const token = await loginAdmin();
      const getUser = await getTestOneUser();
      const idUser = getUser?.body.data._id;
      const response = await request(app)
        .get('/attendances/users/list/get')
        .query({
          start_date: '2024-01-01',
          end_date: '2025-01-31',
          id_user: `${idUser}`,
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Attendances');

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /attendances/users/me', () => {
    beforeAll(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestAttendance();
    });

    afterAll(async () => {
      await deleteTestAttendance();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should return the expected response attendances by current user', async () => {
      const token = await loginUser();
      const response = await request(app)
        .get('/attendances/users/me')
        .query({
          start_date: '2024-01-01',
          end_date: '2025-01-31',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Attendances by user');

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /attendances/:id', () => {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestAttendance();
    });

    afterEach(async () => {
      await deleteTestAttendance();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should return the expected response attendance by id', async () => {
      const token = await loginAdmin();
      const getAttendance = await getTestOneAttendance();
      const response = await request(app).get(`/attendances/${getAttendance?.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Attendance');
      expect(response.body.data._id).toBe(getAttendance?.body.data._id);
      expect(response.body.data.id_group).toBe(getAttendance?.body.data.id_group);
      expect(response.body.data.id_user).toBe(getAttendance?.body.data.id_user);
      expect(response.body.data.id_location).toBe(getAttendance?.body.data.id_location);
      expect(response.body.data.photo).toBe(getAttendance?.body.data.photo);
      expect(response.body.data.created_at).toBe(getAttendance?.body.data.created_at);
    });

    it('should return 404 if attendance id is not found', async () => {
      const token = await loginAdmin();
      const response = await request(app).get(`/attendances/653b6a8731907cb1cd505459`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Attendance is not found');
    });
  });

  describe('POST /attendances/', () => {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
    });

    afterEach(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can create attendance', async () => {
      const tokenAdmin = await loginAdmin();
      const tokenUser = await loginUser();
      const getUser = await getTestOneUser();

      const response = await request(app)
        .post('/attendances')
        .send({
          id_group: '653b6a8731907cb1cd505459',
          id_location: '355b6a8731907gb1cd505487',
          photo: 'http://example.com/path/to/image.jpg',
        })
        .set('Authorization', `Bearer ${tokenUser}`)
        .set('Cookie', `userRegistered=${tokenUser}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Attendance created successfully');
      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.id_group).toBe('653b6a8731907cb1cd505459');
      expect(response.body.data.id_user).toBe(getUser?.body.data._id);
      expect(response.body.data.id_location).toBe('355b6a8731907gb1cd505487');
      expect(response.body.data.photo).toBe('http://example.com/path/to/image.jpg');
      expect(response.body.data.created_at).toBeDefined();

      await request(app).delete(`/attendances/${response.body.data._id}`).set('Authorization', `Bearer ${tokenAdmin}`).set('Cookie', `userRegistered=${tokenAdmin}`);
    });

    it('should reject if id_location, id_group, photo', async () => {
      const tokenUser = await loginUser();

      const response = await request(app)
        .post('/attendances')
        .send({
          id_group: '',
          id_location: '',
          photo: '',
        })
        .set('Authorization', `Bearer ${tokenUser}`)
        .set('Cookie', `userRegistered=${tokenUser}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Id group is required, Id location is required, Photo is required');
    });
  });

  describe('DELETE /attendances/:id', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestAttendance();
    });

    afterEach(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can delete attendance', async () => {
      let attendance = await getTestOneAttendance();
      attendance = attendance?.body.data._id;
      const token = await loginAdmin();

      const response = await request(app)
        .delete('/attendances/' + attendance)
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Attendance deleted successfully!');
    });

    it('should reject if attendance is not found', async () => {
      const token = await loginAdmin();
      const response = await request(app).delete('/attendances/653b6a8731907cb1cd505459').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Attendance is not found');
      await deleteTestAttendance();
    });
  });
});

describe('Locations Testing', () => {
  describe('GET /locations', () => {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestLocation();
    });

    afterEach(async () => {
      await deleteTestLocation();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should return the expected response locations', async () => {
      const token = await loginUser();
      const response = await request(app).get('/locations').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Locations');

      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /locations/:id', function () {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestLocation();
    });

    afterEach(async () => {
      await deleteTestLocation();
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can get attendance by id', async () => {
      const token = await loginUser();
      const testLocation: any = await getTestOneLocation();

      const response = await request(app).get(`/locations/${testLocation.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Location');
      expect(response.body.data._id).toBe(testLocation.body.data._id);
      expect(response.body.data.id_user).toBe(testLocation.body.data.id_user);
      expect(response.body.data.name).toBe(testLocation.body.data.name);
      expect(response.body.data.location_latitude).toBe(testLocation.body.data.location_latitude);
      expect(response.body.data.location_longitude).toBe(testLocation.body.data.location_longitude);
    });

    it('should return 404 if location id is not found', async () => {
      const token = await loginUser();
      const response = await request(app).get(`/locations/653b6a8731907cb1cd505459`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Location is not found');
    });
  });

  describe('POST /locations/', () => {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
    });

    afterEach(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can create location', async () => {
      const token = await loginUser();
      const getUser = await getTestOneUser();

      const response = await request(app)
        .post('/locations')
        .send({
          name: 'Rumah',
          location_latitude: '34606426',
          location_longitude: '23456787',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Location created successfully');
      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.id_user).toBe(getUser?.body.data._id);
      expect(response.body.data.name).toBe('Rumah');
      expect(response.body.data.location_latitude).toBe('34606426');
      expect(response.body.data.location_longitude).toBe('23456787');

      await request(app).delete(`/locations/${response.body.data._id}`).set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);
    });

    it('should reject if name already exist', async () => {
      const token = await loginUser();
      await createTestLocation();

      const response = await request(app)
        .post('/locations')
        .send({
          name: 'Rumah',
          location_latitude: '34606426',
          location_longitude: '23456787',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Name already registered');
      await deleteTestLocation();
    });

    it('should reject if name, location latitude, and location longitude is empty', async () => {
      const token = await loginUser();

      const response = await request(app)
        .post('/locations')
        .send({
          name: '',
          location_latitude: '',
          location_longitude: '',
        })
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBe('Name is required, Location latitude is required, Location longitude is required');
    });
  });

  describe('DELETE /locations/:id', function () {
    beforeAll(async () => {
      await createTestUserAdmin();
      await createTestUser();
      await createTestLocation();
    });

    afterAll(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can delete location', async () => {
      let location = await getTestOneLocation();
      location = location?.body.data._id;
      const token = await loginUser();

      const response = await request(app)
        .delete('/locations/' + location)
        .set('Authorization', `Bearer ${token}`)
        .set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Location deleted successfully!');
    });

    it('should reject if location is not found', async () => {
      const token = await loginUser();
      const response = await request(app).delete('/locations/653b6a8731907cb1cd505459').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBe('Location is not found');
    });
  });
});

describe('Auth Testing', () => {
  describe('POST /login/', () => {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
    });

    afterEach(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can login', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'zildan@gmail.com',
        password: '1234',
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login succesfully');
      expect(response.body.data._id).toBeDefined();
      expect(response.body.data.username).toBeDefined();
      expect(response.body.data.email).toBe('zildan@gmail.com');
      expect(response.body.data.photo).toBeDefined();
      expect(response.body.data.role).toBeDefined();
      expect(response.body.token).toBeDefined();
    });

    it('should reject if email not registered', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'hanuar@gmail.com',
        password: '1234',
      });

      expect(response.status).toBe(401);
      expect(response.body.errors).toBe('Email not found');
    });

    it('should reject if password wrong', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'zildan@gmail.com',
        password: '12345',
      });

      expect(response.status).toBe(401);
      expect(response.body.errors).toBe('Password is wrong');
    });
  });

  describe('GET /auth/logout', () => {
    beforeEach(async () => {
      await createTestUserAdmin();
      await createTestUser();
    });

    afterEach(async () => {
      await deleteTestUser();
      await deleteTestAdmin();
    });

    it('should can logout', async () => {
      const token = await loginUser();
      const getUser = await getTestOneUser();

      const response = await request(app).get('/auth/logout').set('Authorization', `Bearer ${token}`).set('Cookie', `userRegistered=${token}`);

      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logout successfully');
    });
  });
});
