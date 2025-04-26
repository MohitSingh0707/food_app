const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  updateFoodController,
  deleteFoodController,
  getFoodByIdController,
  getFoodByResturantIdController,
} = require("../controllers/foodController");

const router = express.Router();

// Routes
// Create Food|| POST
router.post("/create", authMiddleware, createFoodController);

// Get All Food || GET
router.get("/getAll", getAllFoodController);

// Get Food by ID || GET
router.get("/get/:id", getFoodByIdController);

// get food by Resturant ID || GET
router.get("/getByResturant/:resturantId", getFoodByResturantIdController);

// update food || PUT
router.put("/update/:id", authMiddleware, updateFoodController);

// Delete food || DELETE
router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router;
