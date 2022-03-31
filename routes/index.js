const express = require("express");
const router = express.Router();
const customersRouter = require("./customers");
const sellersRouter = require("./sellers");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const categoriesRouter = require("./categories");


router.use("/customers", customersRouter);
router.use("/sellers", sellersRouter);
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
