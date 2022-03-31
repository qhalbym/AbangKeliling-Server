const request = require("supertest");
const app = require("../app");
const { getDatabase, connectMongo } = require("../config/mongoConnection");
const { payloadToToken } = require("../helpers/jwt");
const Customer = require("../models/customers");
const { createOrder } = require("../models/orders");
const { MongoClient, ObjectId } = require("mongodb");
const { getOrderDetail } = require("../models/orders");

let getId;

let newOrder = {};

let orderTestFunction = {};

let order = {
  CustomerId: 1,
  SellerId: 3,
  ProductId: {},
};

let orderFail = {
  quantity: 0,
  CustomerId: 2,
  SellerId: 5,
  ProductId: 2,
};

let orderFail2 = {
  quantity: 0,
  CustomerId: 2,
  SellerId: 5,
  ProductId: 2,
};

const user1 = {
  username: "Customer Test",
  email: "customer1.test@mail.com",
  password: "customer",
  phoneNumber: "0888888",
};
const user2 = {
  username: "Customer2 Test",
  email: "customer2.test@mail.com",
  password: "seller",
  phoneNumber: "08888882",
};
const product = {
  name: "test",
  price: 1000,
  description: "untuk test",
  SellerId: "1",
  CategoryId: "1",
};

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const status = "complete";
// describe("Order Routes Test", () => {
let connection;
let db;
let access_token_customer;
let access_token_seller;
beforeAll(async () => {
  connection = await client.connect();
  console.log(connection, "=====kons");
  db = connection.db("abangKeliling");
  console.log(db, "====coibe");
  const cus = await db.collection("customers").insertOne(user1);
  const sel = await db.collection("sellers").insertOne(user2);
  const prod = await db.collection("products").insertOne(product);

  const orderData = {
    CustomerId: cus.insertedId,
    SellerId: sel.insertedId,
    ProductId: [
      {
        ProductId: prod.insertedId,
        quantity: 2,
      },
    ],
    status: "waiting",
  };
  newOrder = { order: orderData };
  orderFail = {
    order: {
      CustomerId: cus.insertedId,
      SellerId: sel.insertedId,
      ProductId: [
        {
          ProductId: prod.insertedId,
          quantity: 0,
        },
      ],
      status: "waiting",
    },
  };
  orderFail2 = {
    order: {
      CustomerId: cus.insertedId,
      SellerId: sel.insertedId,
      ProductId: [
        {
          ProductId: prod.insertedId,
        },
      ],
      status: "waiting",
    },
  };
  const order = await db.collection("orders").find().toArray();
  const findOrder = await db.collection('orders').findOne({ _id: ObjectId(order.insertedId) });
  orderTestFunction = order;
  console.log(findOrder, '=========otest');
  access_token_customer = payloadToToken({ id: cus.insertedId, role: 'customer' });
  access_token_seller = payloadToToken({ id: sel.insertedId, role: 'seller' });
});

afterAll(async () => {
  db.collection("customers").deleteMany({});
  db.collection("orders").deleteMany({});
});

describe("GET /orders", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders")
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        // expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status waiting", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders?status=waiting")
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status ongoing customer", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders/ongoing")
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status ongoing seller", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders/ongoing")
      .set("access_token", access_token_seller)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status waiting customer", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders/waiting")
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status waiting seller", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders/waiting")
      .set("access_token", access_token_seller)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status history customer", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders/history")
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders with status history seller", () => {
  test("get array of objects with 200 response code", (done) => {
    request(app)
      .get("/orders/history")
      .set("access_token", access_token_seller)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("POST /orders", () => {
  test("Return newly added order's ID with 201 response code", (done) => {
    request(app)
      .post("/orders")
      .set("access_token", access_token_customer)
      .send(newOrder)
      .then((response) => {
        getId = response.body.insertedId;
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

describe("GET /orders/:id", () => {
  test("get one order in object with 200 response code", (done) => {
    request(app)
      .get(`/orders/${getId}`)
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body");
        expect(status).toBe(200);
        expect(body).toHaveProperty("CustomerId");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("GET /orders/:id", () => {
  test("fail get one order in object with 404 response code with no match orderId", (done) => {
    request(app)
      .get(`/orders/023u02u3joadas`)
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        console.log(body.length, "ini body=======");
        expect(status).toBe(404);
        expect(Array.isArray(body)).toBe(false);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

describe("POST /orders with 0 quantity", () => {
  test("Failed to add Order with 400 status code", (done) => {
    request(app)
      .post("/orders")
      .set("access_token", access_token_customer)
      .send(orderFail)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Quantity cannot be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /orders with null quantity", () => {
  test("Failed to add Order with 400 status code", (done) => {
    request(app)
      .post("/orders")
      .set("access_token", access_token_customer)
      .send(orderFail2)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Quantity cannot be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /orders/:id", () => {
  test("successfully change status with 200 status code", (done) => {
    request(app)
      .patch(`/orders/${getId}`)
      .set("access_token", access_token_seller)
      .send(status)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("acknowledged", true);
        expect(body).toHaveProperty("modifiedCount", 1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /orders with wrong id", () => {
  test("Show Error Message with 404 response status", (done) => {
    request(app)
      .patch(`/orders/623309d7c7b1c503f6824345`)
      .set("access_token", access_token_customer)
      .send(status)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Order Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /orders with wrong id Format", () => {
  test("Show Error Message with 400 response status", (done) => {
    request(app)
      .patch(`/orders/1`)
      .set("access_token", access_token_customer)
      .send(status)
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

describe("DELETE /orders", () => {
  test("Succesfully delete order with 200 response code", (done) => {
    request(app)
      .delete(`/orders/${getId}`)
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("deletedCount", 1);
        expect(body).toHaveProperty("acknowledged", true);
        expect(body).toHaveProperty("deletedCount", 1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /orders with wrong id", () => {
  test("Show Error Message with 404 response status", (done) => {
    request(app)
      .delete(`/orders/623309d7c7b1c503f6824345`)
      .set("access_token", access_token_customer)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", "Order Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /orders with wrong id format", () => {
  test("Show Error Message with 400 response status", (done) => {
    request(app)
      .delete(`/orders/3`)
      .set("access_token", access_token_customer)
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
describe("Function to get details from other tables", () => {
  test("get array of objects promise", (done) => {
    expect(getOrderDetail(orderTestFunction)).resolves.toBe([]);
    done();
  });
});

// });
