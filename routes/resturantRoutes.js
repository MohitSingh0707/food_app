const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantControllers");

const router = express.Router();

// Routes
// Create Restaurant || POST
router.post("/create", authMiddleware, createResturantController);

// get all restaurants || GET
router.get("/getAll", getAllResturantController);

// get restaurant by id || GET
router.get("/get/:id", authMiddleware, getResturantByIdController);

// Delete restaurant || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
