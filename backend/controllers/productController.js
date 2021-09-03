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
 * @desc: post a products
 * @route: POST api/products
 * @access: Private/admin
 */
const addProducts = asyncHandler(async (req, res) => {
  const products = await Product.create({
    user: req.user._id,
    name: "Sample Product",
    price: 1000,
    image: "/images/sample.jpg",
    brand: "Sample Brandn",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
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

/**
 * @desc: update a product
 * @route: PUT api/products/:id
 * @access: Private/admin
 */
const updateProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.numReviews = req.body.numReviews || product.numReviews;
    product.description = req.body.description || product.description;

    try {
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(403);
      res.json({ message: "Something went wrong!" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  addProducts,
  getProductById,
  getProducts,
  deleteProductById,
  updateProductById,
};
