const productModel = require("../../models/productModel");

async function productAllUserController(req, res) {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 }).populate("brand");
    const productsWithStatus = allProducts.filter((product) => product.status);
    res.json({
      message: "Get all products successfully",
      data: productsWithStatus,
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

module.exports = productAllUserController;
