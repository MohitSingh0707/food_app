const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Api is working",
    });
  } catch (error) {
    console.log("Error in testUserController", error);
  }
};

// multiple exports
module.exports = {
  testUserController,
};
