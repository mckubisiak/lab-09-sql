const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fruit = require('../lib/models/fruit');

describe('fruity routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a single fruit', async () => {
    const fruit1 = {
      name: 'banana',
      color: 'yellow',
      ripe: false,
    };

    const res = await request(app).post('/api/v1/fruits').send(fruit1);

    expect(res.body).toEqual({
      id: '1',
      ...fruit1,
    });
  });

  it('GET get a single fruit', async () => {
    const fruit1 = await Fruit.insert({
      name: 'banana',
      color: 'yellow',
      ripe: false,
    });

    const res = await request(app).get(`/api/v1/fruits/${fruit1.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...fruit1,
    });
  });

  it('GET get all fruit', async () => {
    const fruit1 = await Fruit.insert({
      name: 'banana',
      color: 'yellow',
      ripe: false,
    });

    const fruit2 = await Fruit.insert({
      name: 'apple',
      color: 'red',
      ripe: true,
    });

    const fruit3 = await Fruit.insert({
      name: 'tangelo',
      color: 'orange',
      ripe: false,
    });

    return request(app)
      .get('/api/v1/fruits/')
      .then((res) => {
        expect(res.body).toEqual([fruit1, fruit2, fruit3]);
      });
  });
});
