const express = require("express");
const router = express.Router();
const ControllerCus = require('../controllers/customers')
const { authentication } = require("../middlewares/authn");

router.get('/', authentication, ControllerCus.findByToken);
router.get('/:_id', ControllerCus.findById);
router.post('/register', ControllerCus.addCustomer);
router.post('/login', ControllerCus.login);
router.patch('/:_id', ControllerCus.updateLocation);

module.exports = router;
