const { ObjectId } = require("mongodb");
const { tokenToPayload } = require("../helpers/jwt");
const Customer = require("../models/customers");
const { Seller } = require("../models/sellers");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = tokenToPayload(access_token);
    const seller = await Seller.findById(payload.id);
    console.log(seller, "<<<");
    const customer = await Customer.findById(payload.id);
    if (!seller && !customer) {
      throw {
        name: "JsonWebTokenError",
      };
    }
    if (seller) {
      req.login = {
        id: ObjectId(seller._id).toString(),
        email: seller.email,
        username: seller.username,
        storeName: seller.storeName,
        role: "seller",
      };
    }
    if (customer) {
      req.login = {
        id: ObjectId(customer._id).toString(),
        email: customer.email,
        username: customer.username,
        role: "customer",
      };
    }

    console.log(req.login);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
