const app = require("../app");
const request = require("supertest");
const { getDatabase } = require("../config/mongoConnection");
const { payloadToToken, tokenToPayload } = require("../helpers/jwt");
const { MongoClient } = require('mongodb');

let customerId;
const user1 = {
  username: "Customer Test",
  email: "customer1.test@mail.com",
  password: "customer",
  phoneNumber: "0888888",
};


const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
// describe('Customer Routes Test', () => {
let connection;
let db;

beforeAll(async () => {
  connection = await client.connect();
  console.log(connection, '=====kons');
  db = connection.db("abangKeliling");
  console.log(db, '====coibe');

});

afterAll(async () => {
  db.collection('customers').deleteMany({});
});

describe("POST /customers/register - create new customers", () => {
  test("201 Success register - should create new Customers ", (done) => {
    request(app)
      .post("/customers/register")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toBe("Register User Success");

        return done();
      });
  });

  test("400 Failed register - should return 'message:All input need to be filled' if USERNAME empty", (done) => {
    request(app)
      .post("/customers/register")
      .send({
        username: "",
        email: "customer.test2@mail.com",
        password: "customertest",
        phoneNumber: "0888888",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "All input need to be filled");
        return done();
      });
  });

  test("400 Failed register - should return 'message:All input need to be filled' if EMAIL empty", (done) => {
    request(app)
      .post("/customers/register")
      .send({
        username: "customerrr",
        email: "",
        password: "customertest",
        phoneNumber: "0888888",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "All input need to be filled");
        return done();
      });
  });

  test("400 Failed register - should return 'message:All input need to be filled' if PASSWORD", (done) => {
    request(app)
      .post("/customers/register")
      .send({
        username: "customerrr",
        email: "customer.test2@mail.com",
        password: "",
        phoneNumber: "081111111",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "All input need to be filled");
        return done();
      });
  });
  test("400 Failed register - should return 'message:All input need to be filled' if PHONENUMBER", (done) => {
    request(app)
      .post("/customers/register")
      .send({
        username: "customerrr",
        email: "customer.test2@mail.com",
        password: "customertest",
        phoneNumber: "",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "All input need to be filled");
        return done();
      });
  });

  test("400 Failed register - should return error if email is already exists", (done) => {
    request(app)
      .post("/customers/register")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        return done();
      });
  });
});

describe("PATCH /customers/login - customer login", () => {
  test("200 Success login - should return access_token", (done) => {
    request(app)
      .post("/customers/login")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        customerId = tokenToPayload(body.access_token).id;
        return done();
      });
  });

  test("401 Failed login - should return error", (done) => {
    request(app)
      .post("/customers/login")
      .send({
        email: user1.email,
        password: "salahpassword",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email or password");
        return done();
      });
  });

  test("401 Failed login empty - should return error", (done) => {
    request(app)
      .post("/customers/login")
      .send({
        email: user1.email,
        password: "",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email or password");
        return done();
      });
  });

  test("401 Failed login email not found - should return error", (done) => {
    request(app)
      .post("/customers/login")
      .send({
        email: "hjkbayghn8hq8h",
        password: "aghduighdauna",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email or password");
        return done();
      });
  });
});

describe("UPDATE /customers/:id - update location or status seller", () => {
  test("200 success update location", (done) => {
    request(app)
      .patch(`/customers/${customerId}`)
      .send({
        location: "3",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "success update location");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 fail update location", (done) => {
    request(app)
      .patch(`/customers/hjfb78tg29rfrh1di`)
      .send({
        location: "3",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        // expect(body).toHaveProperty("message", "success update location");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /customers/:id - GET seller by Id", () => {
  test("200 success get seller by Id", (done) => {
    request(app)
      .get(`/customers/${customerId}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("email");
        expect(body).toHaveProperty("username");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 fail get seller by Id", (done) => {
    request(app)
      .get(`/customers/idh8fy38fh3fin3f83h`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        // expect(body).toHaveProperty("email");
        // expect(body).toHaveProperty("username");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
// });

