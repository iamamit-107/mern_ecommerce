const express = require("express");
const {
  authUser,
  getProfileById,
  registerUser,
  updateProfile,
} = require("../controllers/userController");
const protectRoute = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * imports end here
 */

/**
 * @desc: User Profile
 * @route: GET api/users/register
 * @access: Private
 */
router.post("/", registerUser);

/**
 * @desc: AUTH USER
 * @route: POST api/users/login
 * @access: Public
 */
router.post("/login", authUser);

/**
 * @desc: User Profile
 * @route: GET api/users/profile
 * @access: Private
 */
router.get("/profile", protectRoute, getProfileById);
router.put("/profile", protectRoute, updateProfile);

module.exports = router;
