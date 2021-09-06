const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProductById,
  addProducts,
  updateProductById,
  addReview,
  getTopProducts,
} = require("../controllers/productController");
const router = express.Router();
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");

/**
 * imports end here
 */

router.get("/", getProducts);
router.post("/", protectRoute, adminRoute, addProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.delete("/:id", protectRoute, adminRoute, deleteProductById);
router.put("/:id", protectRoute, adminRoute, updateProductById);
router.post("/:id/review", protectRoute, addReview);

module.exports = router;
