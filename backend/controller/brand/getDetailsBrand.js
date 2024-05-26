const brandModel = require("../../models/brandModel");

async function brandDetailsController(req, res) {
  try {
    const brand = await brandModel.findById(req.params.id);

    res.status(200).json({
      data: brand,
      error: false,
      success: true,
      message: "Brand details",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = brandDetailsController;
