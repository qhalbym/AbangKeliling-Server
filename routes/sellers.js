const express = require("express");
const sellerController = require("../controllers/sellers");
const { authentication } = require("../middlewares/authn");

const router = express.Router();

module.exports = router;

router.post("/login", sellerController.loginSeller);
router.post("/register", sellerController.addSeller);
router.get("/", sellerController.getSeller);
router.get("/currents", authentication, sellerController.getCurrentSeller);
router.get("/:id", sellerController.findOneSeller);
router.patch("/:id", sellerController.editLocationOrStatus);
