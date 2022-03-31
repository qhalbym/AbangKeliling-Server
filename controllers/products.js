const Product = require("../models/products");
const { cloudinary } = require("../cloudinary/index");
class ControllerProduct {
  static async getProduct(req, res) {
    const SellerId = req.login.id;
    const product = await Product.getProduct(SellerId);
    res.status(200).json(product);
  }
  static async getDetailProduct(req, res, next) {

    const { id } = req.params;
    const productDetail = await Product.getDetailProduct(id);
    res.status(200).json(productDetail);

  }
  static async getProductBySellerId(req, res, next) {
    try {
      const { sellerId } = req.params;
      console.log(sellerId, "<<<<<<<<<< selelrID");
      const product = await Product.findBySellerId(sellerId);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async postProduct(req, res, next) {
    try {
      const SellerId = req.login.id;
      const { name, price, description } = req.body;
      if (!name || !price || !description) {
        throw { name: "required" };
      } else {
        let image = "";
        let imageName = "";
        console.log(req.file, 15);
        if (req.file) {
          image = req.file.path;
          image = image.replace("/upload", "/upload/w_300");
          imageName = req.file.filename;
        }
        const addProduct = await Product.postProduct(
          req.body,
          SellerId,
          image,
          imageName
        );
        res.status(201).json(addProduct);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async putProduct(req, res, next) {
    try {
      const SellerId = req.login.id;
      const { name, price, description } = req.body;
      if (!name || !price || !description) {
        throw { name: "required" };
      } else {
        let prod = await Product.findById(req.params.id);
        console.log(prod, "<<<kgghvmj");
        if (!prod) throw { name: "notFound", message: "Product not found" };
        let image = "";
        let imageName = "";
        if (req.file) {
          image = req.file.path;
          image = image.replace("/upload", "/upload/w_300");
          imageName = req.file.filename;
          await cloudinary.uploader.destroy(prod.imageName);
        }
        const putProduct = await Product.putProduct(
          req.params.id,
          req.body,
          SellerId,
          image,
          imageName
        );
        console.log(putProduct, "d;sakljdhk");
        res.status(200).json(putProduct);
      }
    } catch (err) {
      console.log(err, "<<<<<<<");
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const deleteProduct = await Product.deleteProduct(req.params.id);
      res.status(200).json(deleteProduct);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerProduct;
