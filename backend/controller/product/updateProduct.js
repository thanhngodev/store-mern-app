const brandModel = require("../../models/brandModel");
const productModel = require("../../models/productModel");

async function productUpdateController(req, res) {
  try {
    const productId = req.params.productId;
    const {
      productName,
      brand,
      productImage,
      description,
      price,
      sellingPrice,
      status
    } = req.body;

    // Validate
    if (!productName || !price || !brand) {
      throw new Error("Product name, brand and price are required");
    }

    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const existingBrand = await brandModel.findOne({ code: brand });
    if (!existingBrand) {
      throw new Error("Brand not found");
    }

    if(!existingBrand.status) {
        throw new Error("Brand is not active, re-check active brand");
    }
 
    // Update
    existingProduct.productName = productName;
    existingProduct.brand = existingBrand._id;
    existingProduct.productImage = productImage;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.sellingPrice = sellingPrice;
    existingProduct.status = status;

    // Save
    const updatedProduct = await existingProduct.save();
    const populatedProduct = await productModel
      .findById(updatedProduct._id)
      .populate("brand");

    return res.status(200).json({
      message: "Product updated successfully",
      error: false,
      success: true,
      data: populatedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "An error occurred while updating the product",
      error: true,
      success: false,
    });
  }
}

module.exports = productUpdateController;
