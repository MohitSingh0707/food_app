const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  forgotPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
// Get User || GET
router.get("/getUser", authMiddleware, getUserController);

// Update User || PUT
router.put("/updateUser", authMiddleware, updateUserController);

// password reset || POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

// reset password || POST
router.post("/resetPassword", authMiddleware, forgotPasswordController);

// delete user || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
