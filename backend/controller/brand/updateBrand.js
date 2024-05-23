const brandModel = require("../../models/brandModel");


async function brandUpdateController(req, res) {
  try {
    const updateBrand = await brandModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          code: req.body.code,
          name: req.body.name,
          status: req.body.status,
        },
      },
      { new: true }
    );

    res.json({
      data: updateBrand,
      message: "Brand Updated",
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
