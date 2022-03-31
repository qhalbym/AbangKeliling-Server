const app = require("../app");
const request = require("supertest");
const { getDatabase, connectMongo } = require("../config/mongoConnection");

const { MongoClient } = require('mongodb');

let sellerId;
const user1 = {
  username: "seller Test",
  email: "seller.test@mail.com",
  password: "sellertest",
  phoneNumber: '0888888',
  storeName: 'store seller test',
  storeDescription: 'desc seller test',
  categoryId: '3434039disfsd'
};
const user2 = {
  username: "seller2 Test",
  email: "seller2.test@mail.com",
  password: "sellert2est",
  phoneNumber: '08888288',
  storeName: 'store sell2er test',
  storeDescription: 'desc2 seller test',
  categoryId: '3434039disfsd'
};

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let connection;
let db;

// describe('Seller Routes Test', () => {

beforeAll(async () => {
  connection = await client.connect();
  db = connection.db("abangKeliling");

  db.collection('sellers').insertOne(user2);
});

afterAll(async () => {
  db.collection('sellers').deleteMany({});
  // await connection.close();
  // done();
});

describe("GET /sellers", () => {
  test("200 success get sellers ", (done) => {
    request(app)
      .get("/sellers")
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

describe("POST /sellers/register - create new seller", () => {
  test("201 Success register - should create new Seller ", (done) => {
    request(app)
      .post("/sellers/register")
      .send(user1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        console.log(body, '=========');
        expect(status).toBe(201);
        expect(body).toHaveProperty("acknowledged", true);
        expect(body).toHaveProperty("insertedId", expect.any(String));
        sellerId = body.insertedId;
        return done();
      });
  });

  test("400 Failed register - should return 'message:Field Can't be Empty' if USERNAME empty", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "",
        email: "seller.test@mail.com",
        password: "sellertest",
        phoneNumber: "0888888",
        storeName: 'store seller test',
        storeDescription: 'desc seller test',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });

  test("400 Failed register - should return 'message:Field Can't be Empty' if EMAIL empty", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "",
        password: "sellertest",
        phoneNumber: '0888888',
        storeName: 'store seller test',
        storeDescription: 'desc seller test',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });

  test("400 Failed register - should return 'message:Field Can't be Empty' if PASSWORD", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "seller.test@mail.com",
        password: "",
        phoneNumber: '0888888',
        storeName: 'store seller test',
        storeDescription: 'desc seller test',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });
  test("400 Failed register - should return 'message:Field Can't be Empty' if PHONENUMBER", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "seller.test@mail.com",
        password: "sellertest",
        phoneNumber: '',
        storeName: 'store seller test',
        storeDescription: 'desc seller test',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });
  test("400 Failed register - should return 'message:Field Can't be Empty' if STORENAME empty", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "seller.test@mail.com",
        password: "sellertest",
        phoneNumber: '0888888',
        storeName: '',
        storeDescription: 'desc seller test',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });
  test("400 Failed register - should return 'message:Field Can't be Empty' if STOREDESCRIPTION empty", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "seller.test@mail.com",
        password: "sellertest",
        phoneNumber: '0888888',
        storeName: 'store seller test',
        storeDescription: '',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });

  test("400 Failed register - should return 'message:Field Can't be Empty' if categoryId empty", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "seller.test@mail.com",
        password: "sellertest",
        phoneNumber: '0888888',
        storeName: 'store seller test',
        storeDescription: 'desc seller test',
        categoryId: ''
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Field Can't be Empty");
        return done();
      });
  });

  test("400 Failed register - should return error if email is already exists", (done) => {
    request(app)
      .post("/sellers/register")
      .send({
        username: "seller Test",
        email: "seller.test@mail.com",
        password: "sellertest",
        phoneNumber: '0888888',
        storeName: 'store seller test',
        storeDescription: 'desc seller test',
        categoryId: '3434039disfsd'
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email is already in use! Please use another email");
        return done();
      });
  });

});

describe("GET /sellers/:id", () => {
  test("200 success get one sellers ", (done) => {
    request(app)
      .get(`/sellers/${sellerId}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("_id", expect.any(String));
        expect(body).toHaveProperty("username", expect.any(String));
        expect(body).toHaveProperty("email", expect.any(String));
        expect(body).toHaveProperty("password", expect.any(String));
        expect(body).toHaveProperty("phoneNumber", expect.any(String));
        expect(body).toHaveProperty("location", expect.any(Object));
        expect(body).toHaveProperty("storeName", expect.any(String));
        expect(body).toHaveProperty("storeDescription", expect.any(String));
        expect(body).toHaveProperty("status", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 fail get one sellers ", (done) => {
    request(app)
      .get(`/sellers/asd90as9892`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Invalid Id");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /sellers/login - seller login", () => {
  test("200 Success login - should return access_token", (done) => {
    request(app)
      .post("/sellers/login")
      .send({
        email: user1.email,
        password: user1.password,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        return done();
      });
  });

  test("401 Failed login - WRONG PASSWORD should return error", (done) => {
    request(app)
      .post("/sellers/login")
      .send({
        email: user1.email,
        password: "salahpassword",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email/password");
        return done();
      });
  });

  test("401 Failed login - WRONG EMAIL should return error", (done) => {
    request(app)
      .post("/sellers/login")
      .send({
        email: "wrongemail",
        password: "salahpassword",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email/password");
        return done();
      });
  });
});

describe("UPDATE /sellers/:id - update location or status seller", () => {
  test("200 success update location", (done) => {
    request(app)
      .patch(`/sellers/${sellerId}`)
      .send({
        location: '3'
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



  test("200 success update status", (done) => {
    request(app)
      .patch(`/sellers/${sellerId}`)
      .send({
        status: 'open'
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "success update status");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 Fail update location wrong ID", (done) => {
    request(app)
      .patch(`/sellers/asd7as7das0`)
      .send({
        location: '3'
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 Fail update status wrong ID", (done) => {
    request(app)
      .patch(`/sellers/asd7as7das0`)
      .send({
        status: 'tes'
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});




// });

// afterAll(done => {
//   let db = getDatabase();
//   db.collection('sellers').deleteMany({})
//     .then(_ => {
//       done();
//     })
//     .catch(err => {
//       done(err);
//     });
// });
