const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
        type: String,
        required: true,
    },
    brand: {
      ref: "brand",
      type: String,
    },
    productImage: [],
    description: String,
    price: {
        type: Number,
        required: true,
    },
    sellingPrice: Number,
    status: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
