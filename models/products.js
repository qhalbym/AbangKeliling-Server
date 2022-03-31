const Redis = require("ioredis");
const { ObjectId } = require("mongodb");
const redis = new Redis({
  port: 14909,
  host: "redis-14909.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASS,
});
const { getDatabase } = require("../config/mongoConnection");

class Product {
  static async getProduct(SellerId) {
    try {
      // redis.del("products");
      // const productCache = await redis.get("products");
      // if (productCache) {
      //   const products = JSON.parse(productCache);
      //   console.log("from redis");
      //   return products;
      // } else {
      console.log("from db");
      const db = getDatabase();
      const data = await db
        .collection("products")
        .find({ SellerId })
        .toArray();
      // if (data) {
      //   await redis.set("products", JSON.stringify(data));
      // }
      return data;
    }
    // }
    catch (err) {

    }
  }
  static async getDetailProduct(id) {
    try {
      const db = getDatabase();
      const data = await db
        .collection("products")
        .findOne({ _id: ObjectId(id) });
      return data;
    } catch (err) {
      // console.log(err);
      // throw err;
    }
  }
  static async findBySellerId(SellerId) {
    try {
      const db = getDatabase();

      const data = await db.collection("products").find({ SellerId }).toArray();
      return data;
    } catch (err) {
      // console.log(err);
      // throw err;
    }
  }
  static async findById(id) {
    try {
      const db = getDatabase();
      const data = await db
        .collection("products")
        .findOne({ _id: ObjectId(id) });
      return data;
    } catch (err) {
      // console.log(err);
      // throw err;
    }
  }

  static async postProduct(body, SellerId, image, imageName) {
    try {
      const { name, price, description } = body;
      const db = getDatabase();
      const data = await db.collection("products").insertOne({
        name,
        price,
        image,
        imageName,
        description,
        SellerId,
      });
      // if (data) {
      //   await redis.del("products");
      // }
      return data;
    } catch (err) {
      // console.log(err);
      // throw err;
    }
  }
  static async putProduct(id, body, SellerId, image, imageName) {
    try {
      const { name, price, description } = body;

      const db = getDatabase();
      const data = await db.collection("products").updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            name,
            price,
            image,
            imageName,
            description,
            SellerId,
          },
        }
      );
      // if (data) {
      //   await redis.del("products");
      // }
      return data;
    } catch (err) {
      // console.log(err);
      // throw err;
    }
  }
  static async deleteProduct(id) {
    try {
      const db = getDatabase();
      const data = await db
        .collection("products")
        .deleteOne({ _id: ObjectId(id) });
      // if (data) {
      //   await redis.del("products");
      // }
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
module.exports = Product;
