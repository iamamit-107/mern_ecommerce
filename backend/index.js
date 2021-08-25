const express = require("express");
const dotenv = require("dotenv");
const products = require("./products");

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("Api is running..");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(
  process.env.PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${process.env.PORT} port`
  )
);
