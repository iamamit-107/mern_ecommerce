const connectDb = require("./config/db");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Order = require("./models/OrderModel");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const users = require("./users");
const products = require("./products");

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const admin = createdUsers[0]._id;

    const createdProducts = products.map((product) => {
      return { ...product, user: admin };
    });

    await Product.insertMany(createdProducts);

    console.log("Data imported!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
