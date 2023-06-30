const request = require('supertest');
const app = require('../app');

// Test GET /items
describe('GET /items', () => {
  it('responds with a list of shopping items', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

// Test POST /items
describe('POST /items', () => {
  it('adds an item to the shopping list', async () => {
    const newItem = { name: 'popsicle', price: 1.45 };
    const response = await request(app).post('/items').send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ added: newItem });
  });
});

// Test GET /items/:name
describe('GET /items/:name', () => {
  it('responds with a single item', async () => {
    const itemName = 'popsicle';
    const response = await request(app).get(`/items/${itemName}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'popsicle', price: 1.45 });
  });

  it('returns 404 if item not found', async () => {
    const response = await request(app).get('/items/nonexistent');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

// Test PATCH /items/:name
describe('PATCH /items/:name', () => {
  it('modifies a single item', async () => {
    const itemName = 'popsicle';
    const updatedItem = { name: 'new popsicle', price: 2.45 };
    const response = await request(app)
      .patch(`/items/${itemName}`)
      .send(updatedItem);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ updated: updatedItem });
  });

  it('returns 404 if item not found', async () => {
    const response = await request(app).patch('/items/nonexistent');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

// Test DELETE /items/:name
describe('DELETE /items/:name', () => {
  it('deletes a specific item', async () => {
    const itemName = 'new popsicle';
    const response = await request(app).delete(`/items/${itemName}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });

  it('returns 404 if item not found', async () => {
    const response = await request(app).delete('/items/nonexistent');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});
