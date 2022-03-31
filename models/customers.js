const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class Customer {

  static async addCustomer(payload) {
    try {
      let db = getDatabase();
      const customer = await db.collection('customers').insertOne(payload);
      return customer;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(data) {
    try {
      let db = getDatabase();
      const customer = await db.collection('customers').findOne({ email: data });
      return customer;
    } catch (err) {
      throw err;
    }
  }

  static async findById(_id) {
    try {
      let db = getDatabase();
      const customer = await db.collection('customers').findOne({
        _id: ObjectId(_id)
      });
      return customer;
    } catch (err) {
      throw err;
    }
  }

  static async updateLocation(payload) {
    try {
      let db = getDatabase();
      const customer = await db.collection('customers').updateOne({
        _id: ObjectId(payload._id)
      },
        {
          $set: {
            location: payload.location
          }
        });
      return customer;
    } catch (err) {
      throw err;
    }
  }

}


module.exports = Customer; 