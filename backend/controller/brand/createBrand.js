const brandModel = require("../../models/brandModel");

async function brandCreateController(req, res) {
  try {
    const { name, code, status } = req.body;
    const brand = await brandModel.findOne({ code });
    const patternCode = /^[a-zA-Z0-9]+$/;

    if (brand) {
      throw new Error("Already brand exists");
    }

    if (!name) {
      throw new Error("Please enter a valid name");
    }

    if (!code) {
      throw new Error("Please enter a valid code");
    }

    if(!patternCode.test(code)) {
        throw new Error("The value of the Code field is invalid, please re-enter.");
    }

    const brandData = new brandModel({ name, code, status });
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