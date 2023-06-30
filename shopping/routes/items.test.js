process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");
const { ExpressError } = require("../expressError");

let soap = { name: "soap" };

beforeEach(function () {
  items.push(soap);
});

afterEach(function() {
  items.length = 0;
});

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([{ name: "soap" }]);
  });
});

describe("GET /items/:name", function() {
  it("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${soap.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item.name).toEqual(soap.name);
  });

  it("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/tires`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("POST /items", function() {
  it("Adds a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "pillow"
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: { name: "pillow" } });
  });
});

describe("PATCH /items/:name", function() {
  it("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${soap.name}`)
      .send({ name: "Mud" });
  });

  it("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", function() {
  it("Deletes a single item", async function() {
    const resp = await request(app).delete(`/items/${soap.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
