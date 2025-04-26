const express = require("express");
const { registerUserController, loginUserController } = require("../controllers/authController");

const router=express.Router();

// Routes
// Register || POST
router.post("/register",registerUserController);

// LogIn || POST
router.post("/login",loginUserController);

module.exports=router;  