const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

// GET all food
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch food",
    });
  }
});

// GET single food
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.json(food);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch food",
    });
  }
});

// ADD food
router.post("/", async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add food",
    });
  }
});

// UPDATE food
router.put("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        category: req.body.category,
        image: req.body.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.json({
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update food",
    });
  }
});

// DELETE food
router.delete("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete food",
    });
  }
});

module.exports = router;