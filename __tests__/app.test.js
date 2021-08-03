const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('fruity routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a single fruit', async () => {

    const fruit1 = {
      name: 'banana',
      color: 'yellow',
      ripe: false
    };
    
    const res = await request(app).post('/api/v1/fruits').send(fruit1);
    
    expect(res.body).toEqual({
      id: '1',
      ...fruit1, 
    });
    
  });
});
