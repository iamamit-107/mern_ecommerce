const express = require("express");
const dotenv = require("dotenv");
const products = require("./products");
const connectDb = require("./config/db");

// Router import
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// Middlewares
const {
  notFound,
  defaultErrorHandler,
} = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

dotenv.config();

// Routers
app.get("/", (req, res) => {
  res.send("Api is running..");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);

/**
 * @Error handler middlewares
 */
app.use(notFound);
app.use(defaultErrorHandler);

// database connection
connectDb();

app.listen(
  process.env.PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${process.env.PORT} port`
  )
);
