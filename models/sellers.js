const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class Seller {
  static async findAll() {
    let db = getDatabase();
    const sellers = await db.collection("sellers").find({ status: 'open' }).toArray();
    return sellers;
  }

  static async findById(_id) {
    try {
      let db = getDatabase();
      const seller = await db.collection("sellers").findOne({
        _id: ObjectId(_id),
      });
      return seller;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(payload) {
    console.log(payload, "fafafa");
    let db = getDatabase();
    const seller = await db.collection("sellers").findOne({
      email: payload.email,
    });
    return seller;
  }

  static async create(payload) {
    let db = getDatabase();
    const seller = await db.collection("sellers").insertOne(payload);
    return seller;
  }
  static async updateOneLocation(payload) {
    try {
      let db = getDatabase();
      const seller = await db.collection("sellers").updateOne(
        {
          _id: ObjectId(payload.id),
        },
        {
          $set: {
            location: payload.location,
          },
        }
      );
      return seller;
    } catch (err) {
      throw err;
    }
  }

  static async updateOneStatus(payload) {
    try {
      let db = getDatabase();
      const seller = await db.collection("sellers").updateOne(
        {
          _id: ObjectId(payload.id),
        },
        {
          $set: {
            status: `${payload.status}`,
          },
        }
      );
      return seller;
    } catch (err) {
      throw err;
    }
  }

  // static async deleteSeller(_id) {
  //   try {
  //     let db = getDatabase();
  //     const seller = await db.collection('sellers').deleteOne({
  //       _id: ObjectId(_id)
  //     });
  //     return seller;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}

module.exports = { Seller };
