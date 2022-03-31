const Redis = require("ioredis");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
// const redis = new Redis();
const redis = new Redis({
  port: 14909,
  host: "redis-14909.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: process.env.REDIS_PASS,
});

class Category {
  static getCategories = async () => {
    try {
      // const categoriesCache = await redis.get("categories");
      // if (categoriesCache) {
      //   const categories = JSON.parse(categoriesCache);
      //   console.log("dari redis");
      //   return categories;
      // }

      const db = await getDatabase();
      const data = await db.collection("categories").find({}).toArray();

      // console.log(data, "<<<<<< categories");

      // if (data) {
      //   await redis.set("categories", JSON.stringify(data));
      // }

      // console.log("dari db");

      return data;
    } catch (err) {
      // return err;
    }
  };
}

module.exports = Category;
