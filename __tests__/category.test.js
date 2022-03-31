const request = require("supertest");
const app = require("../app");
const { Category } = require("../models/categories");
const { MongoClient, ObjectId } = require("mongodb");
const { getOrderDetail } = require("../models/orders");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const category1 = {
  name: 'snacks'
};
// describe('Category Routes Test', () => {
let connection;
let db;

beforeAll(async () => {
  connection = await client.connect();
  console.log(connection, '=====kons');
  db = connection.db("abangKeliling");
  console.log(db, '====coibe');
  const tes = await db.collection('categories').insertOne(category1);
  console.log(tes, '========inites');
});

afterAll(async () => {
  db.collection('categories').deleteMany({});
});

describe("GET /categories", () => {
  test("200 success get categories", (done) => {
    request(app)
      .get("/categories")
      .then((response) => {
        const { body, status } = response;
        console.log(body, '========== bodyyyyyyy');
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
// });

