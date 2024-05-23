const brandModel = require("../../models/brandModel");


async function brandDeleteController(req, res) {
  try {
    await brandModel.findByIdAndDelete(req.params.id);
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
}

module.exports = brandDeleteController;
