const express = require("express");
const {
  addOrderItems,
  getOrderById,
} = require("../controllers/orderController");
const protectRoute = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @desc: add order
 * @route: POST api/orders
 * @access: Private
 */
router.post("/", protectRoute, addOrderItems);
/**
 * @desc: get order by id
 * @route: POST api/orders/:id
 * @access: Private
 */
router.post("/:id", protectRoute, getOrderById);

module.exports = router;
