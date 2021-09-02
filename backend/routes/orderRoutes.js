const express = require("express");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
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
 * @desc: Get Order of logged in user
 * @route: PUT api/orders/myorders
 * @access: Private
 */
router.get("/myorders", protectRoute, getMyOrders);
/**
 * @desc: get order by id
 * @route: POST api/orders/:id
 * @access: Private
 */
router.get("/:id", protectRoute, getOrderById);
/**
 * @desc: PUT Order by id
 * @route: PUT api/orders/:id/pay
 * @access: Private
 */
router.put("/:id/pay", protectRoute, updateOrderToPaid);

module.exports = router;
