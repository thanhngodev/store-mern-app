const brandModel = require("../../models/brandModel");

async function brandListUserController(req, res) {
  try {
    const allBrands = await brandModel.find({ status: true });
    const brandsWithStatus = allBrands.filter((brand) => brand.status);

    res.json({
      message: "Get brand list successfully",
      data: brandsWithStatus,
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

module.exports = brandListUserController;
