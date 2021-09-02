const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../utils/generateToken");

/**
 * @desc: Auth Login
 * @route: GET api/users/login
 * @access: Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc: Auth Register
 * @route: GET api/users/register
 * @access: Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(403);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const createdUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };

    res.status(201).json({
      createdUser,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc: Auth Login
 * @route: GET api/users/profile
 * @access: Public
 */
const getProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

/**
 * @desc: Update Profile
 * @route: PUT api/users/profile
 * @access: Public
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const update = await user.save();

    res.json({
      _id: update._id,
      name: update.name,
      email: update.email,
      isAdmin: update.isAdmin,
      token: generateToken(update._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

/**
 * @desc: get all users
 * @route: PUT api/users
 * @access: Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @desc: delete user by id
 * @route: DELETE api/users/:id
 * @access: Private/admin
 */
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (user) {
    res.json({ message: "User deleted successfully" });
  }
});

/**
 * @desc: get  user by id
 * @route: DELETE api/users/:id
 * @access: Private/admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

/**
 * @desc: Update user by id
 * @route: PUT api/users/profile
 * @access: Private/admin
 */
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const update = await user.save();

    res.json({
      _id: update._id,
      name: update.name,
      email: update.email,
      isAdmin: update.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

module.exports = {
  authUser,
  getProfileById,
  registerUser,
  updateProfile,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
