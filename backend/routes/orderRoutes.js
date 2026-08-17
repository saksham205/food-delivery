const express = require("express");
const jwt = require("jsonwebtoken");

const Order = require("../models/Order");
const User = require("../models/User");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const order = await Order.create({
      user: decoded.id,
      ...req.body,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);

    res.status(500).json({
      message: "Order creation failed",
    });
  }
});

// GET MY ORDERS
router.get("/my-orders", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const orders = await Order.find({
      user: decoded.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("My orders error:", error);

    res.status(500).json({
      message: "Could not fetch orders",
    });
  }
});

// GET ALL ORDERS - ADMIN
router.get("/admin/all", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Admin orders error:", error);

    res.status(500).json({
      message: "Could not fetch all orders",
    });
  }
});

// UPDATE ORDER STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Placed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      message: "Failed to update order status",
    });
  }
});

module.exports = router;