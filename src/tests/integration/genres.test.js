/* eslint-disable no-undef */
const request = require('supertest');
const { Genre } = require('../../models/genreSchema');
const { User } = require('../../models/userSchema');
const genreService = require('../../services/genreService');

let server;

describe('/api/genres', () => {
  beforeEach(async () => {
    server = require('../../index');
    await Genre.collection.insertMany([
      { name: 'genre1' },
      { name: 'genre2' },
    ]);
  });
  afterEach(async () => {
    await Genre.collection.deleteMany();
    server.close();
  });

  describe('GET /', () => {
    it('Should return all genres', async () => {
      const response = await request(server).get('/api/genres');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ name: 'genre1' }, { name: 'genre2' }]);
    });
  });

  describe('GET /:id', () => {
    it('Should return a specific Genre object', async () => {
      const [genre] = await Genre.find({ name: 'genre1' });
      const genreId = String(genre._id);

      const response = await request(server).get(`/api/genres/${genreId}`);

      expect(response.body).toEqual({ name: 'genre1' });
      expect(response.status).toBe(200);
    });

    it('Should return a 404 error', async () => {
      const response = await request(server).get('/api/genres/5');

      expect(response.status).toBe(404);
      expect(response.error.text).toContain('could not be found');
    });
  });

  describe('POST /', () => {
    it('Should return a 401 error if client is not logged in', async () => {
      const response = await request(server)
        .post('/api/genres')
        .send(new Genre({ name: 'genre1' }));

      expect(response.status).toBe(401);
      expect(response.text).toContain('token');
    });

    it('Should return a 400 error if invalid Genre is provided', async () => {
      const token = new User().generateAuthToken();

      const response = await request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: '' });

      expect(response.status).toBe(400);
      expect(response.text).toMatch(/.*name.*empty.*/);
    });
  });
});
