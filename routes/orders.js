const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrderOngoing,
  getOrderWaiting,
  getHistory,
  addOrder,
  changeStatus,
  removeOrder,
} = require("../controllers/orders");
const { authentication } = require("../middlewares/authn");
router.use(authentication);
router.get("/", getOrders);
router.get("/ongoing", authentication, getOrderOngoing);
router.get("/waiting", getOrderWaiting);
router.get("/history", getHistory);
router.get("/:id", getOrders);
router.post("/", authentication, addOrder);
router.patch("/:id", changeStatus);
router.delete("/:id", removeOrder);

module.exports = router;
