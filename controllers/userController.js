const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET USER INFO
const getUserController=async(req,res)=>{
    try {
        // Find user by id
        const user=await userModel.findById({_id:req.body.id});
        // validation
        if(!user){
            res.status(404).send({
                success:false,
                message:"User not found",
            });
        }
        // hide password
        user.password=undefined;

        // response
        res.status(200).send({
            success:true,
            message:"User fetched successfully",
            user,
        }); 
    } catch (error) {
        console.log("Error in getUserController",error);
        res.status(500).send({
            success:false,
            message:"Error in getUserController",
            error,
        });
        
    }
};
// Update user info
const updateUserController=async (req,res)=>{
    try{
        // find user by id
        const user=await userModel.findById({_id:req.body.id});
        // validation   
        if(!user){
            res.status(404).send({
                success:false,
                message:"User not found",
            });
        }
        const{userName,address,phone}=req.body;  
        if(userName) user.userName=userName;
        if(address) user.address=address;    
        if(phone) user.phone=phone;
        //  save user
        await user.save();
        // response
        res.status(200).send({
            success:true,
            message:"User updated successfully",
            user,
        });

    }catch(error){
        console.log("Error in updateUserController",error);
        res.status(500).send({
            success:false,
            message:"Error in updateUserController",
            error,
        });

    }
}
// update password
const updatePasswordController = async (req, res) => {
    try {
      // find user by id
      const user = await userModel.findById({ _id: req.body.id });
  
      // validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      const { currentPassword, newPassword } = req.body;
  
      if (!currentPassword || !newPassword) {
        return res.status(400).send({
          success: false,
          message: "All fields are required",
        });
      }
  
      // compare old password with hashed password
      const isMatch = await bcrypt.compare(currentPassword, user.password); // ✅ Use bcrypt.compare
      if (!isMatch) {
        return res.status(400).send({
          success: false,
          message: "Old password is incorrect",
        });
      }
  
      // hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // save updated user
      await user.save();
  
      res.status(200).send({
        success: true,
        message: "Password updated successfully",
      });
  
    } catch (error) {
      console.log("Error in updatePasswordController", error);
      res.status(500).send({
        success: false,
        message: "Error in updatePasswordController",
        error,
      });
    }
  };
// Reset password
const forgotPasswordController=async(req,res)=>{
    try {
        const user=await userModel.findById({_id:req.body.id});
        // validation   
        if(!user){
            res.status(404).send({
                success:false,
                message:"User not found",
            });
        }
        const { answer, newPassword } = req.body;
        if (!answer || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }
        // compare answer with hashed answer
        const isMatch = await bcrypt.compare(answer, user.answer); // ✅ Use bcrypt.compare
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Answer is incorrect",
            });
        }
        // hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        // save updated user
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log("Error in forgotPasswordController",error);
        res.status(500).send({
            success:false,
            message:"Error in forgotPasswordController",
            error,
        });
        
    }
}
// Delete user
const deleteUserController=async(req,res)=>{
    try {
        const user=await userModel.findById({_id:req.params.id});
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found",
            });
        }
        await userModel.findByIdAndDelete({_id:req.params.id});
        return res.status(200).send({
            success:true,
            message:"User deleted successfully",
        }); 
        
    } catch (error) {
        console.log("Error in deleteUserController",error);
        res.status(500).send({
            success:false,
            message:"Error in deleteUserController",
            error,
        });
        
    }
}


module.exports={
    getUserController,
    updateUserController,
    updatePasswordController,
    forgotPasswordController,
    deleteUserController,
}