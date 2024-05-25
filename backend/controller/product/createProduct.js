const brandModel = require("../../models/brandModel");
const productModel = require("../../models/productModel");

async function productCreateController(req, res) {
  try {
    const {
      productName,
      brand,
      productImage,
      description,
      price,
      sellingPrice,
      status,
    } = req.body;

    if (!productName || !price || !brand) {
      throw new Error("Product name, brand and price are required");
    }

    const existingBrand = await brandModel.findOne({
      code: brand,
      status: true,
    });
    if (!existingBrand) {
      throw new Error("Brand not found");
    }

    const newProduct = new productModel({
      productName,
      brand: existingBrand._id,
      productImage,
      description,
      price,
      sellingPrice,
      status,
    });

    const savedProduct = await newProduct.save();
    const populatedProduct = await productModel
      .findById(savedProduct._id)
      .populate("brand");

    res.status(201).json({
      message: "Product created successfully",
      error: false,
      success: true,
      data: populatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = productCreateController;
