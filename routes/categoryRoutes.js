const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createCategoryController, updateCategoryController, getAllCategoryController, deleteCategoryController } = require("../controllers/categoryControllers");


const router = express.Router();

// Routes
// Create Category || POST
router.post("/create", authMiddleware, createCategoryController);

// get all categories || GET
router.get("/getAll",getAllCategoryController);

// update Category || PUT
router.put("/update/:id", authMiddleware,updateCategoryController);

// Delete Category || DELETE
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
