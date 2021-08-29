const express = require("express");
const { authUser, getProfileById } = require("../controllers/userController");
const protectRoute = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * imports end here
 */

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

module.exports = router;
