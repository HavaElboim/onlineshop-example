const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    phone: Number,
    city: String,
    zip: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
