const request = require("supertest");
const app = require("../app");
const { ObjectId } = require('mongodb');
let productId;
const { MongoClient } = require('mongodb');
const { getDatabase } = require("../config/mongoConnection");
const { payloadToToken, tokenToPayload } = require("../helpers/jwt");
const user1 = {
  username: "seller Test",
  email: "seller.test@mail.com",
  password: "sellertest",
  phoneNumber: '0888888',
  storeName: 'store seller test',
  storeDescription: 'desc seller test',
  categoryId: '3434039disfsd'
};
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// describe('Customer Routes Test', () => {
let connection;
let db;
let access_token;
beforeAll(async () => {
  connection = await client.connect();
  console.log(connection, '=====kons');
  db = connection.db("abangKeliling");
  console.log(db, '====coibe');
  const cus = await db.collection('sellers').insertOne(user1);
  console.log(JSON.stringify(cus.insertedId), '========cuuus');
  access_token = payloadToToken({ id: cus.insertedId });
});

afterAll(async () => {
  db.collection('products').deleteMany({});
  db.collection('sellers').deleteMany({});
});


describe("POST /products", () => {
  test("201 success add products", (done) => {
    const product = {
      name: "test",
      price: 1000,
      description: "untuk test",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        productId = response.body.insertedId;
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("insertedId", expect.any(String));
        expect(body).toHaveProperty("acknowledged", true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("GET /products", () => {
  test("200 success get products", (done) => {
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        console.log(tokenToPayload(access_token));
        console.log(body, '=====');
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
describe("GET /products", () => {
  test("200 success get products detail", (done) => {
    request(app)
      .get(`/products/detail/${productId}`)
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        console.log(tokenToPayload(access_token));
        console.log(body, '=====');
        expect(status).toBe(200);
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("price");
        expect(body).toHaveProperty("description");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("POST /products", () => {
  test("400 failed add product", (done) => {
    const product = {
      name: "",
      price: 1000,
      description: "untuk test",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "data must be filled");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("POST /products", () => {
  test("400 failed add product", (done) => {
    const product = {
      name: "test",
      price: 0,
      description: "untuk test",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "data must be filled");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("POST /products", () => {
  test("400 failed add product", (done) => {
    const product = {
      name: "test",
      price: 1000,
      description: "",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "data must be filled");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /products", () => {
  test("200 success edit products", (done) => {
    const product = {
      name: "test-edit",
      price: 1000,
      description: "untuk test",
    };
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("acknowledged", true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("PUT /products", () => {
  test("400 failed edit product", (done) => {
    const product = {
      name: "",
      price: 1000,
      description: "untuk test",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .put(`/products/${productId}`)
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "data must be filled");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("PUT /products", () => {
  test("400 failed edit product", (done) => {
    const product = {
      name: "test",
      price: 0,
      description: "untuk test",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .put(`/products/${productId}`)
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "data must be filled");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("PUT /products", () => {
  test("400 failed edit product", (done) => {
    const product = {
      name: "test",
      price: 10000,
      description: "",
      SellerId: "1",
      CategoryId: "1",
    };
    request(app)
      .put(`/products/${productId}`)
      .set("access_token", access_token)
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "data must be filled");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("PUT /products", () => {
  test("400 failed edit product", (done) => {
    const product = {
      name: "test",
      price: 1000,
      description: "untuk test",

    };
    request(app)
      .put(`/products/${productId}`)
      .set('access_token', "asdjasldjasldjasldjasldjasdsa;djksadjas2132")
      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("PUT /products", () => {
  test("400 failed edit product", (done) => {
    const product = {
      name: "test",
      price: 1000,
      description: "untuk test",
      SellerId: "1",
      CategoryId: "",
    };
    request(app)
      .put(`/products/${productId}`)

      .send(product)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("DELETE /products", () => {
  test("200 success delete product", (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("deletedCount", 1);
        expect(body).toHaveProperty("acknowledged", true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("DELETE /products", () => {
  test("404 failed delete product", (done) => {
    request(app)
      .delete(`/products/idas`)
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Invalid Id");

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// });



