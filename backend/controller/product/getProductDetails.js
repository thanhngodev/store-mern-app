const productModel = require("../../models/productModel");

async function productDetailsController(req, res) {
  try {
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    res.json({
      message: "Get product details successfully",
      data: product,
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

module.exports = productDetailsController;
