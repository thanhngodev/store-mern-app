const productModel = require("../../models/productModel");

async function productAllController(req, res) {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 }).populate("brand");
    res.json({
      message: "Get all products successfully",
      data: allProducts,
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

module.exports = productAllController;
