const userModel = require("../../models/userModel");

async function userDeleteController(req, res) {
  try {
    await userModel.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      message: "Deleted user successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = userDeleteController;
