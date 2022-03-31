const express = require("express");
const router = express.Router();
const ControllerCategories = require("../controllers/categories");

router.get("/", ControllerCategories.getCategories);

module.exports = router;
