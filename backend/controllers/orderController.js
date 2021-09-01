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

/**
 * @desc: GET Order by id
 * @route: GET api/orders/:id
 * @access: Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

/**
 * @desc: PUT Order by id
 * @route: PUT api/orders/:id/pay
 * @access: Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
};
