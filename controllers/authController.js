const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const registerUserController = async (req, res) => {
  try {
    const { userName, email, password, phone, address ,answer} = req.body;

    // Validation
    if (!userName || !email || !password || !phone || !address ||!answer) {
      return res
        .status(500)
        .send({ success: false, message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(500)
        .send({ success: false, message: "User already exists" });
    }
    // Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Hashing answer
    const saltAnswer = bcrypt.genSaltSync(10);
    const hashedAnswer = await bcrypt.hash(answer, saltAnswer);
    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      address,
      answer:hashedAnswer,
    });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Registeration", error });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "All fields are required" });
    }
    // check if user already exists
    const user = await userModel.findOne({ email});
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // check user password by decrypting the password present in mongoDB
    const isMatch = await bcrypt.compare(password, user.password); 
    if(!isMatch){
      return res.status(500).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined; // remove password from user object
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Login", error });
  }
};
module.exports = {
  registerUserController,
  loginUserController,
};
