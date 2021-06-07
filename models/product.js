const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    //title: { type: String, required: true },
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    quantityInStock: Number,
    onSale: {
      type: Boolean,
      default: false,
    },
    saleReductionPercent: Number,
  });
  
  const Product = mongoose.model("Product", productSchema);

module.exports = Product;
  