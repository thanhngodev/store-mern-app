const brandModel = require("../../models/brandModel");

async function brandUpdateController(req, res) {
  const { id } = req.params;
  const { code, name, status } = req.body;
  const patternCode = /^[a-zA-Z0-9]+$/;

  // Basic validation
  if (!code || !name || status === undefined) {
    return res.status(400).json({
      message: "Code, name, and status are required",
      error: true,
      success: false,
    });
  }

  try {
    if (!patternCode.test(code)) {
      throw new Error(
        "The value of the Code field is invalid, please re-enter."
      );
    }

    const updateBrand = await brandModel.findByIdAndUpdate(
      id,
      {
        $set: { code, name, status },
      },
      { new: true, runValidators: true }
    );

    if (!updateBrand) {
      return res.status(404).json({
        message: "Brand not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: updateBrand,
      message: "Brand updated successfully",
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

module.exports = brandUpdateController;
