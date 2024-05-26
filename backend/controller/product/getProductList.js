const brandModel = require("../../models/brandModel");
const productModel = require("../../models/productModel");

async function getProductListController(req, res) {
  try {
    const { brandCode, search, limit, page, sort, sortDirection } = req.query;
    const query = { status: true };

    if (brandCode) {
      const brand = await brandModel.findOne({ code: brandCode });
      if (brand) {
        query.brand = brand._id;
      }
    }

    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }

    const sizeLimit = parseInt(limit) || 10;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * sizeLimit;

    let sortOrder = {};
    if (sort) {
      sortOrder[sort] = sortDirection === "desc" ? -1 : 1;
    } else {
      sortOrder = { createdAt: -1 };
    }

    const products = await productModel
      .find(query)
      .populate("brand")
      .limit(sizeLimit)
      .skip(skip)
      .sort(sortOrder);
      
    const totalCount = await productModel.countDocuments(query);

    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
      totalCount: totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / sizeLimit),
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = getProductListController;
