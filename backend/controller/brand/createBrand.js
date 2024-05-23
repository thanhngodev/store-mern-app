const brandModel = require("../../models/brandModel");

async function brandCreateController(req, res) {
  try {
    const { name, code } = req.body;
    const brand = await brandModel.findOne({ code });

    if (brand) {
      throw new Error("Already brand exists");
    }

    if (!name) {
      throw new Error("Please enter a valid name");
    }

    if (!code) {
      throw new Error("Please enter a valid code");
    }

    const brandData = new brandModel({ name, code });
    const saveBrand = await brandData.save();

    res.status(201).json({
      data: saveBrand,
      success: true,
      error: false,
      message: "Brand created successfully!!!",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


module.exports = brandCreateController;