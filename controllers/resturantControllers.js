const resturantModel = require("../model/resturantModel");

// Create resturant
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if(!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const newResturnat=new resturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
    });
    // save resturant
    await newResturnat.save();
    // response
    res.status(201).send({
      success: true,
      message: "Resturant created successfully",
      resturnat,
    });
  } catch (error) {
    console.log("Error in createResturantController", error);
    res.status(500).send({
      success: false,
      message: "Error in createResturantController",
      error,
    });
  }
};

// Get all resturants
const getAllResturantController = async (req, res) => {
    try {
        const resturants = await resturantModel.find({});
        // validation
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: "No resturants found",
            });
        }
        // response
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            message: "Resturants fetched successfully",
            resturants,
        });
    } catch (error) {
        console.log("Error in getAllResturantController", error);
        res.status(500).send({
            success: false,
            message: "Error in getAllResturantController",
            error,
        });
        
    }
}

// Get resturant by id
const getResturantByIdController=async(req,res)=>{
    try {
        const resturant=await resturantModel.findById(req.params.id);
        // validation
        if(!resturant) {
            return res.status(404).send({
                success: false,
                message: "Resturant not found",
            });
        }
        // response
        return res.status(200).send({
            success: true,
            message: "Resturant fetched successfully",
            resturant,
        });
    } catch (error) {
        console.log("Error in getResturantByIdController", error);
        res.status(500).send({
            success: false,
            message: "Error in getResturantByIdController",
            error,
        });
        
    }
}

// Delete resturant
const deleteResturantController=async(req,res)=>{
    try {
        const resturant=await resturantModel.findByIdAndDelete(req.params.id);
        // validation
        if(!resturant) {
            return res.status(404).send({
                success: false,
                message: "Resturant not found",
            });
        }
        // response
        return res.status(200).send({
            success: true,
            message: "Resturant deleted successfully",
            resturant,
        });
    } catch (error) {
        console.log("Error in deleteResturantController", error);
        res.status(500).send({
            success: false,
            message: "Error in deleteResturantController",
            error,
        });
        
    }
}

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
};
