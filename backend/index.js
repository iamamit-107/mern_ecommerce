const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const products = require("./products");
const connectDb = require("./config/db");

// Router import
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Middlewares
const {
  notFound,
  defaultErrorHandler,
} = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

dotenv.config();

// make upload folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Routers
app.get("/", (req, res) => {
  res.send("Api is running..");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
