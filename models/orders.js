const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

const Redis = require("ioredis");
// const redis = new Redis();
const redis = new Redis({
  port: 14909,
  host: "redis-14909.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASS,
});

const getOrderDetail = async (orders) => {
  const db = await getDatabase();
  await Promise.all(
    orders.map(async (e) => {
      const products = [];
      if (e.ProductId.length > 0 || Array.isArray(e.ProductId))
        e.ProductId.forEach(async (el) => {
          const product = await db
            .collection("products")
            .findOne({ _id: ObjectId(el.ProductId) });
          products.push({
            ProductId: el.ProductId,
            name: product ? product.name : "-",
            quantity: el.quantity,
            price: product ? product.price : "-",
          });
        });
      const seller = await db
        .collection("sellers")
        .findOne({ _id: ObjectId(e.SellerId) });
      const customer = await db
        .collection("customers")
        .findOne({ _id: ObjectId(e.CustomerId) });
      e.customerName = customer ? customer.username : "-";
      e.customerLocation = customer ? customer.location : false;
      e.ProductId = products.length > 0 ? products : e.ProductId;
      e.sellerName = seller ? seller.username : "-";
      e.sellerStoreName = seller ? seller.storeName : "-";
      e.sellerLocation = seller ? seller.location : false;
      return e;
    })
  ).then((result) => {
    orders = result;
  });
  return orders;
};

const fetchOrders = async (payload) => {
  try {
    const db = await getDatabase();
    const { id, status, SellerId } = payload;
    if (id) {
      const _id = ObjectId(id);
      const order = await db.collection("orders").findOne({ _id });
      return order;
    } else if (status) {
      let filteredOrders = await db
        .collection("orders")
        .find({ status, SellerId })
        .toArray();
      filteredOrders = await getOrderDetail(filteredOrders);
      return filteredOrders;
    } else {
      let orders = await db.collection("orders").find({}).toArray();
      const detailOrders = await Promise.all(
        orders.map(async (e) => {
          const products = [];
          if (Array.isArray(e.ProductId)) {
            e.ProductId.forEach(async (el) => {
              const product = await db
                .collection("products")
                .findOne({ _id: ObjectId(el.ProductId) });
              products.push({
                ProductId: el.ProductId,
                name: product ? product.name : "-",
                quantity: el.quantity,
              });
            });
          } else {
            // const getProductData = await db
            //   .collection("products")
            //   .findOne({ _id: ObjectId(e.ProductId.ProductId) });
            // products.push({
            //   ProductId: e.ProductId.ProductId,
            //   name: getProductData ? getProductData.name : "-",
            //   quantity: e.ProductId.quantity,
            // });
          }

          const seller = await db
            .collection("sellers")
            .findOne({ _id: ObjectId(e.SellerId) });
          const customer = await db
            .collection("customers")
            .findOne({ _id: ObjectId(e.CustomerId) });
          e.customerName = customer ? customer.username : "-";
          e.customerLocation = customer ? customer.location : false;
          e.ProductId = products;
          e.sellerName = seller ? seller.username : "-";
          e.sellerStoreName = seller ? seller.storeName : "-";
          e.sellerLocation = seller ? seller.location : false;
          return e;
        })
      ).then((result) => {
        orders = result;
      });
      return orders;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchOrderOngoing = async ({ id, role }) => {
  try {
    const db = await getDatabase();
    let data;
    if (role == "customer") {
      data = await db
        .collection("orders")
        .find({ status: "ongoing", CustomerId: id })
        .toArray();
    } else if (role == "seller") {
      data = await db
        .collection("orders")
        .find({ status: "ongoing", SellerId: id })
        .toArray();
    }

    data = await getOrderDetail(data);
    console.log(data, '+++++++++model data');
    return data;
  } catch (err) {
    // throw err;
  }
};

const fetchOrderWaiting = async (payload) => {
  try {
    console.log(payload, "<<<< dari model");
    const db = await getDatabase();
    let data;
    if (payload.role == "customer") {
      data = await db
        .collection("orders")
        .find({ status: "waiting", CustomerId: payload.id })
        .toArray();
    } else if (payload.role == "seller") {
      data = await db
        .collection("orders")
        .find({ status: "waiting", SellerId: payload.id })
        .toArray();
    }

    return data;
  } catch (err) {
    // throw err;
  }
};

const fetchOrderHistory = async ({ id, role }) => {
  try {
    const db = await getDatabase();
    let data;
    if (role == "customer") {
      data = await db
        .collection("orders")
        .find({ status: "complete", CustomerId: id })
        .toArray();
    } else if (role == "seller") {
      data = await db
        .collection("orders")
        .find({ status: "complete", SellerId: id })
        .toArray();
    }

    return data;
  } catch (err) {
    // throw err;
  }
};

const createOrder = async (payload) => {
  try {
    const db = await getDatabase();
    const { CustomerId, SellerId, ProductId } = payload;
    const create = await db.collection("orders").insertOne({
      status: "waiting",
      createdAt: new Date(),
      updatedAt: new Date(),
      CustomerId,
      SellerId,
      ProductId,
    });
    return create;
  } catch (error) {
    // throw error;
  }
};

const updateStatus = async (id, newStatus) => {
  try {
    const db = await getDatabase();
    const _id = ObjectId(id);
    const update = await db
      .collection("orders")
      .updateOne({ _id }, { $set: { status: newStatus } });
    return update;
  } catch (error) {
    // throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const db = getDatabase();
    const _id = ObjectId(id);
    const rmOrder = db.collection("orders").deleteOne({ _id });
    return rmOrder;
  } catch (error) {
    // throw error;
  }
};

module.exports = {
  fetchOrders,
  fetchOrderOngoing,
  fetchOrderWaiting,
  fetchOrderHistory,
  createOrder,
  updateStatus,
  deleteOrder,
  getOrderDetail,
};
