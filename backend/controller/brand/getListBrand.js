const brandModel = require("../../models/brandModel");


async function brandListController(req, res) {
  try {
    const allBrands = await brandModel.find();

    res.json({
      message: "Get all brand successfully",
      data: allBrands,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = brandListController;