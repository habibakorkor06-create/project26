const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  originalPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 0 },
  pickupTime: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Bag", bagSchema);