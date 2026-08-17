const express = require("express");
const User = require("../models/User");
const Order = require("../models/Order");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: {
        $in: ["Placed", "Preparing", "Out for Delivery"],
      },
    });

    const salesResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total" },
        },
      },
    ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customer total status createdAt items");

    const salesChart = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000
            ),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          sales: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalSales,
      pendingOrders,
      recentOrders,
      salesChart,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
});

module.exports = router;