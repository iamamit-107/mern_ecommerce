const express = require("express");
const {
  authUser,
  getProfileById,
  registerUser,
  updateProfile,
  getAllUsers,
  deleteUserById,
} = require("../controllers/userController");
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * imports end here
 */

router.post("/", registerUser);
router.get("/", protectRoute, adminRoute, getAllUsers);
router.post("/login", authUser);
router.get("/profile", protectRoute, getProfileById);
router.put("/profile", protectRoute, updateProfile);
router.delete("/:id", protectRoute, adminRoute, deleteUserById);
module.exports = router;
