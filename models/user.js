// CommonJS format:
const mongoose = require("mongoose");
require('mongoose-type-email');
const jwt = require("jsonwebtoken");

//ES6 format - won't work here:
// import mongoose from 'mongoose';
/* new for login: */
// import { compareSync, hashSync } from 'bcryptjs';
const {compareSync, hashSync} = require('bcryptjs');

/*define schema for how user willbe saved in DB: */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      unique: true,
      required: true
      // validate: {
      //   validator: email => User.doesNotExist({ email }),
      //   message: "Email already exists"
      // }
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    hash: {
      type: String,
      // required: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    firstName: {
      type: String,
      default: ''},
    lastName: {
      type: String,
      default: ''},
    phone: {
      type: Number,
      default: ''},
    city: {
      type: String,
      default: ''},
    zip: {
      type: Number,
      default: ''}
  },
  { timestamps: true }
);

// first assign method and then create model from it
UserSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
  return token;
}

/* add a “pre-hook” or “middleware” for our UserSchema. 
This code will run right before our User instance saves. 

“this” is our pre method refers to the User instance. 
We double check that a password has been provided, 
then reset that password to its salted and hashed version.
*/
// UserSchema.pre('save', function () {
//   if (this.isModified('password')) {
//     this.password = hashSync(this.password, 10);
//   }
// });

/* 
our custom validator, doesNotExist, which is a class method defined on our UserSchema. 
Using two mongoose methods and a comparison operator we can determine if a user exists or not. 
This is an asynchronous step, so we use async/await.
*/
// UserSchema.statics.doesNotExist = async function (field) {
//   return await this.where(field).countDocuments() === 0;
// };

/*
We also define an instance method, comparePasswords, which simply compares a 
plain text password with a User instance’s hashed password.
*/
// UserSchema.methods.comparePasswords = function (password) {
//   return compareSync(password, this.password);
// };


const User = mongoose.model('User', UserSchema);

// export default User;
module.exports = User;
