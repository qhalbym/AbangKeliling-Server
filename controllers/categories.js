const Category = require("../models/categories");

class ControllerCategories {
  static getCategories = async (req, res, next) => {
    let categories = await Category.getCategories();
    res.status(200).json(categories);
  };
}

module.exports = ControllerCategories;
