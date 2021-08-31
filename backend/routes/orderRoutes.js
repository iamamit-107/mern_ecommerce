const express = require("express");
const { addOrderItems } = require("../controllers/orderController");
const protectRoute = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @desc: add order
 * @route: GET api/order
 * @access: Private
 */
router.post("/", protectRoute, addOrderItems);

module.exports = router;
