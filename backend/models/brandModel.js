const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

const brandModel = mongoose.model("brand", brandSchema);

module.exports = brandModel;
