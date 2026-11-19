const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false }, // stored hashed, never as plain text
  role: { type: String, enum: ["customer", "store"], default: "customer" },
});

module.exports = mongoose.model("User", userSchema);