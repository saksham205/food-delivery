const express = require("express");
const adminRoutes = require("./routes/adminRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");
const foodRoutes = require("./routes/foodRoutes");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/food", foodRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Food Delivery API is running 🚀",
  });
});
app.get("/api/debug-db", (req, res) => {
  res.json({
    database: mongoose.connection.name,
    host: mongoose.connection.host,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

  const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
  })
  .catch((error) => {
    console.log("MongoDB connection failed ❌");
    console.log(error.message);
  });