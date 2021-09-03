const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

/**
 * @desc: Fetch all products
 * @route: GET api/products
 * @access: Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc: Fetch single product
 * @route: GET api/products/:id
 * @access: Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc: delete a product
 * @route: DELETE api/products/:id
 * @access: Private/admin
 */
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.deleteOne({ _id: req.params.id });

  if (product) {
    res.json({ message: "Product deleted successfully!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProductById,
  getProducts,
  deleteProductById,
};
