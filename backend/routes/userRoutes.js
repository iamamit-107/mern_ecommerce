const express = require("express");
const { authUser } = require("../controllers/userController");
const router = express.Router();

/**
 * imports end here
 */

/**
 * @desc: Fetch all products
 * @route: GET api/products
 * @access: Public
 */
router.post("/login", authUser);

module.exports = router;
