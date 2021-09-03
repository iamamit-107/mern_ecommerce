const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProductById,
} = require("../controllers/productController");
const router = express.Router();
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");

/**
 * imports end here
 */

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protectRoute, adminRoute, deleteProductById);

module.exports = router;
