const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("No authorization, no token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No authorization, no token");
  }
});

const adminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authrized as admin");
  }
};

module.exports = {
  protectRoute,
  adminRoute,
};
