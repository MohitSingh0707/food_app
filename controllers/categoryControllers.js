const categoryModel = require("../model/categoryModel");

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        message: "All fields required",
        success: false,
      });
    }
    const newCategory = new categoryModel({
      title,
      imageUrl,
    });
    // save category
    await newCategory.save();
    // response
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log("Error in createCategoryController", error);
    res.status(500).send({
      success: false,
      message: "Error in createCategoryController",
      error,
    });
  }
};

// get all categories
const getAllCategoryController = async (req, res) => {
    try {
        const categories=await categoryModel.find({});
        // Validation
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found",
            });
        }
        // response
        res.status(200).send({
            success: true,
            message: "All categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.log("Error in getAllCategoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in getAllCategoryController",
            error,
        });
        
    }
    
}

// update Category by id
const updateCategoryController = async (req, res) => {
    try {
        const {title,imageUrl} = req.body;
        const updateCategory = await categoryModel.findByIdAndUpdate(
            req.params.id,
            {
                title,
                imageUrl,
            },
            { new: true }
        );
        // response
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updateCategory,
        });
    } catch (error) {
        console.log("Error in updateCategoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in updateCategoryController",
            error,
        });
        
    }
};

// Delete Category by id
const deleteCategoryController = async (req, res) => {
    try {
        const Category=await categoryModel.findByIdAndDelete(req.params.id);
        // Validation
        if(!Category){
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
        // response
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            Category,
        });
    } catch (error) {
        console.log("Error in deleteCategoryController", error);
        res.status(500).send({
            success: false,
            message: "Error in deleteCategoryController",
            error,
        });
        
    }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  deleteCategoryController
};
