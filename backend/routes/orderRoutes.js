const express = require("express");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} = require("../controllers/orderController");
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protectRoute, addOrderItems);
router.get("/myorders", protectRoute, getMyOrders);
router.get("/all-orders", protectRoute, adminRoute, getAllOrders);
router.get("/:id", protectRoute, getOrderById);
router.put("/:id/pay", protectRoute, updateOrderToPaid);
router.put("/:id/delivered", protectRoute, adminRoute, updateOrderToDelivered);

module.exports = router;
