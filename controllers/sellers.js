// const Redis = require("ioredis");
const { encryptPass, comparePass } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");
const { Seller } = require("../models/sellers");

class sellerController {
  static loginSeller = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const payload = {
        email,
      };
      const seller = await Seller.findByEmail(payload);
      console.log(seller, "<<<<Dasjdsa");
      if (seller) {
        if (comparePass(password, seller.password)) {
          const payload = {
            id: seller._id,
            username: seller.username,
            email: seller.email,
            storeName: seller.storeName,
          };
          res.status(200).json({ access_token: payloadToToken(payload) });
        } else {
          throw {
            name: "invalidEmailPassword",
            message: "Invalid email/password",
          };
        }
      } else {
        throw {
          name: "invalidEmailPassword",
          message: "Invalid email/password",
        };
      }
    } catch (err) {
      next(err);
    }
  };

  static getSeller = async (req, res, next) => {
    const seller = await Seller.findAll();
    res.status(200).json(seller);
  };

  static getCurrentSeller = async (req, res, next) => {
    try {
      console.log('masuk');
      if (req.login) {
        const { id } = req.login;
        const seller = await Seller.findById(id);
        res.status(200).json(seller);
      } else {
        throw error;
      }
    } catch (error) {
      next(error);
    }
  };

  static addSeller = async (req, res, next) => {
    try {
      const {
        username,
        email,
        password,
        phoneNumber,
        storeName,
        storeDescription,
        categoryId,
      } = req.body;

      if (
        !username ||
        !email ||
        !password ||
        !phoneNumber ||
        !storeName ||
        !storeDescription ||
        !categoryId
      ) {
        throw {
          name: "badRequest",
          message: "Field Can't be Empty",
        };
      }
      const payloadEmail = {
        email,
      };
      const checkEmail = await Seller.findByEmail(payloadEmail);
      if (checkEmail) {
        throw {
          name: "UniqueConstraintError",
          message: "Email is already in use! Please use another email",
        };
      } else {
        const payload = {
          username,
          email,
          password: encryptPass(password),
          phoneNumber,
          location: {},
          storeName,
          storeDescription,
          status: "close",
        };

        const seller = await Seller.create(payload);
        console.log(seller);
        res.status(201).json(seller);
      }
    } catch (err) {
      next(err);
    }
  };

  static findOneSeller = async (req, res, next) => {
    try {
      const { id } = req.params;
      const seller = await Seller.findById(id);
      res.status(200).json(seller);
    } catch (err) {
      next(err);
    }
  };

  static editLocationOrStatus = async (req, res, next) => {
    try {
      const { location, status } = req.body;
      const { id } = req.params;
      // console.log(id, location, status);
      if (location) {
        const payload = {
          id,
          location,
        };
        await Seller.updateOneLocation(payload);
        res.status(200).json({ message: "success update location" });
      }
      if (status) {
        const payload = {
          id,
          status,
        };
        await Seller.updateOneStatus(payload);
        res.status(200).json({ message: "success update status" });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = sellerController;
