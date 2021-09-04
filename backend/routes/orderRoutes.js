const express = require("express");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protectRoute, addOrderItems);
router.get("/myorders", protectRoute, getMyOrders);
router.get("/all-orders", protectRoute, adminRoute, getAllOrders);
router.get("/:id", protectRoute, getOrderById);
router.put("/:id/pay", protectRoute, updateOrderToPaid);

module.exports = router;
