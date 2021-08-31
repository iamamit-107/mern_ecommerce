const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

/**
 * @desc: Post Order Items
 * @route: POST api/orders
 * @access: Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  try {
    const data = await Order.create({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      orderItems,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    res.status(201).json(data);
  } catch (err) {
    throw new Error("Something went wrong!");
  }
});

module.exports = {
  addOrderItems,
};
