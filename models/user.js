//const mongoose = require("mongoose");
import mongoose from 'mongoose';
/* new for login: */
import { compareSync, hashSync } from 'bcryptjs';

/*define schema for how user willbe saved in DB: */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // unique: true,
      required: true,
      validate: {
        validator: email => User.doesNotExist({ email }),
        message: "Email already exists"
      }
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
