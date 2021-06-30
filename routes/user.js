import Joi from 'joi'; /* for input validation */
import express from 'express';
import User from '../models/user';
/* import signUp validator: */
import { signUp } from '../validations/user';

const userRouter = express.Router();
/* we used an empty string for our path in routes/user.js—because we provide the “/users” path in index.js: */
userRouter.post("", async (req, res) => {
    /*
        modify our post method to use async and a try/catch block:
    */
//   res.send(req.body);
try {
    /* destructure the req.body, 
     and call the Joi.validate method passing in an object 
     containing input from the user and our signUp validator:*/
    const { username, email, password } = req.body
    await Joi.validate({ username, email, password }, signUp);
    const newUser = new User({ username, email, password });
    /*
        If that passes, we define a new User instance 
        and attempt to save that user:
    */
    await newUser.save();
    /*
        And ff that also passes, we send back exactly what we want 
        our frontend to have access to:
    */
    res.send({ userId: newUser.id, username });
  } catch (err) {
      /*
        If anything fails, it will be caught and we respond by setting the status code to 400 
        and sending the error back:
      */
    res.status(400).send(err);
  }
});
export default userRouter;

/* add a “pre-hook” or “middleware” for our UserSchema. 
This code will run right before our User instance saves. 

“this” is our pre method refers to the User instance. 
We double check that a password has been provided, 
then reset that password to its salted and hashed version.
*/
UserSchema.pre('save', function () {
    if (this.isModified('password')) {
      this.password = hashSync(this.password, 10);
    }
  });

  /* 
  our custom validator, doesNotExist, which is a class method defined on our UserSchema. 
  Using two mongoose methods and a comparison operator we can determine if a user exists or not. 
  This is an asynchronous step, so we use async/await.
  */
  UserSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
  };

  /*
We also define an instance method, comparePasswords, which simply compares a 
plain text password with a User instance’s hashed password.
  */
  UserSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
  };

  /*
Lastly, we explicitly define our User model and export:
  */
  const User = mongoose.model('User', UserSchema);
  export default User;