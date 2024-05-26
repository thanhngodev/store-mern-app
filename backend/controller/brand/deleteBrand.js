const brandModel = require("../../models/brandModel");
const productModel = require("../../models/productModel");

async function brandDeleteController(req, res) {
  try {
    const products = await productModel
      .find({ brand: req.params.id })
      .populate("brand");
    await Promise.all(
      products.map(async (product) => {
        return await productModel.findByIdAndUpdate(
          product._id,
          { status: false },
          { new: true, runValidators: true }
        );
      })
    );
    await brandModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Deleted user successfully",
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

module.exports = brandDeleteController;
