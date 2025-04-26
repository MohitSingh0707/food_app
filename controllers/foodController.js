const foodModel = require("../model/foodModel");

// create food controller
const createFoodController = async (req, res) => {
  try {
    const { title, description, imageUrl, category, price } = req.body;
    if (!title || !description || !category || !price) {
      return res.status(500).send({
        message: "All fields required",
        success: false,
      });
    }
    const newFood = new foodModel({
      title,
      description,
      imageUrl,
      category,
      price,
    });
    // save food
    await newFood.save();
    // response
    return res.status(201).send({
      success: true,
      message: "Food created successfully",
      newFood,
    });
  } catch (error) {
    console.log("Error in createFoodController", error);
    return res.status(500).send({
      success: false,
      message: "Error in createFoodController",
      error,
    });
  }
};

// get all food controller
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    // validation
    if (!foods) {
      return res.status(500).send({
        success: false,
        message: "No food found",
      });
    }
    // response
    return res.status(200).send({
      success: true,
      message: "All food fetched successfully",
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log("Error in getAllFoodController", error);
    return res.status(500).send({
      success: false,
      message: "Error in getAllFoodController",
      error,
    });
  }
};

// get food by id controller
const getFoodByIdController = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    // validation
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    // response
    return res.status(200).send({
      success: true,
      message: "Food fetched successfully",
      food,
    });
  } catch (error) {
    console.log("Error in getFoodByIdController", error);
    return res.status(500).send({
      success: false,
      message: "Error in getFoodByIdController",
      error,
    });
  }
};

// get food by resturant id controller
const getFoodByResturantIdController = async (req, res) => {
  try {
    const foods = await foodModel.find({ resturant: req.params.resturantId });
    // validation
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    // response
    return res.status(200).send({
      success: true,
      message: "Food fetched successfully",
      foods,
    });
  } catch (error) {
    console.log("Error in getFoodByResturantIdController", error);
    return res.status(500).send({
      success: false,
      message: "Error in getFoodByResturantIdController",
      error,
    });
    1;
  }
};

// Update food controller
const updateFoodController = async (req, res) => {
  try {
    const { title, description, imageUrl, category, price } = req.body;
    const updateFood = await foodModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        imageUrl,
        category,
        price,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Food updated successfully",
      updateFood,
    });
  } catch (error) {
    console.log("Error in updateFoodController", error);
    return res.status(500).send({
      success: false,
      message: "Error in updateFoodController",
      error,
    });
  }
};

// Delete food controller
const deleteFoodController = async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteFoodController", error);
    return res.status(500).send({
      success: false,
      message: "Error in deleteFoodController",
      error,
    });
  }
};
module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  updateFoodController,
  deleteFoodController,
  getFoodByResturantIdController,
};
