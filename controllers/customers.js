const { payloadToToken } = require("../helpers/jwt");
const { encryptPass, comparePass } = require("../helpers/bcrypt");

const Customer = require("../models/customers");

class ControllerCus {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          code: 401,
          name: "invalidEmailPassword",
          message: "Invalid email or password",
        };
      }
      const detailCust = await Customer.findByEmail(email);
      if (!detailCust) {
        throw {
          code: 401,
          name: "invalidEmailPassword",
          message: "Invalid email or password",
        };
      }
      if (comparePass(password, detailCust.password)) {
        console.log(detailCust, "xxxxxxxxxxxxxxxxxxx");
        const payload = { id: detailCust._id, email: detailCust.email };
        const access_token = payloadToToken(payload);
        res.status(200).json({ message: "Login Successfull", access_token });
      } else {
        throw {
          code: 401,
          name: "invalidEmailPassword",
          message: "Invalid email or password",
        };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findById(req, res, next) {
    try {
      const { _id } = req.params;
      const customer = await Customer.findById(_id);
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  }

  static async findByToken(req, res, next) {
    try {
      const { id } = req.login
      const customer = await Customer.findById(id)
      res.status(200).json(customer)
    }
    catch (err) {
      next(err)
    }
  }

  static async addCustomer(req, res, next) {
    try {
      let { username, email, password, phoneNumber } = req.body;
      const found = await Customer.findByEmail(email);
      if (found)
        throw {
          code: 400,
          name: "UniqueConstraintError",
          message: "Email must be unique",
        };
      if (!email || !password || !username || !phoneNumber) {
        throw {
          code: 400,
          name: "BadRequest",
          message: "All input need to be filled",
        };
      }
      password = encryptPass(password);
      const payload = { username, email, password, phoneNumber };
      await Customer.addCustomer(payload);
      res.status(201).json("Register User Success");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static updateLocation = async (req, res, next) => {
    try {
      const { location } = req.body;
      const { _id } = req.params;
      const payload = {
        _id,
        location,
      };
      await Customer.updateLocation(payload);
      res.status(200).json({ message: "success update location" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ControllerCus;
