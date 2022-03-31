const express = require("express");
const ControllerProduct = require("../controllers/products");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const { authentication } = require("../middlewares/authn");
const upload = multer({ storage });
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", authentication, ControllerProduct.getProduct);
router.get("/detail/:id", authentication, ControllerProduct.getDetailProduct);
router.get("/:sellerId", ControllerProduct.getProductBySellerId);
router.post(
  "/",
  authentication,
  upload.single("image"),
  ControllerProduct.postProduct
);
router.put(
  "/:id",
  authentication,
  upload.single("image"),
  ControllerProduct.putProduct
);
router.delete("/:id", authentication, ControllerProduct.deleteProduct);
module.exports = router;
