
// import Joi from 'joi'; /* for input validation */
// 'import' is ES6 notation, not supported here in the backend.
// using instead the CommonJS format - 'require':
// const joi = require('joi'); /* for input validation */
// import express from 'express';
const express = require("express");
// import User from '../models/user';
const User = require('../models/user');

const bcrypt = require('bcrypt');
// const jwt = require('jwt');
const jwt = require('jsonwebtoken');
const salt = 10;
const secret = process.env.TOKEN_SECRET;


/* import signUp validator: */
// import { signUp } from '../validations/user.mjs';
// const signUp = require('../validations/user');
const router = express.Router();
/* we used an empty string for our path in routes/user.js—because we provide the “/users” path in index.js: */
router.post('add-user', async (req, res) => {
    /*
        modify our post method to use async and a try/catch block:
    */
//   res.send(req.body);
try {
    /* destructure the req.body, 
     and call the Joi.validate method passing in an object 
     containing input from the user and our signUp validator:*/
    const { user:userReq } = req.body;
    const {password, ...userDetails} = userReq;
    const user = new User({userDetails, hash: await bcrypt.hash(password, salt)});
    const savedUser = await user.save();
    res.json(savedUser);
    // await Joi.validate({ email, password }, allowUnknown, signUp);
    // const newUser = new User({ email, password });
    /*
        If that passes, we define a new User instance 
        and attempt to save that user:
    */
    // await newUser.save();
    /*
        And ff that also passes, we send back exactly what we want 
        our frontend to have access to:
    */
    // res.send({ userId: newUser.id, email });
  } catch (err) {
      /*
        If anything fails, it will be caught and we respond by setting the status code to 400 
        and sending the error back:
      */
    // res.status(400).send(err);
    res.send(err.message);
  }
});

router.post('/login', async (req, res) => {
    const {user:userReq} = req.body;
    const user = await User.findOne({email: userReq.email});
    try{
        const {hash, userSign} = user;
        const match = await bcrypt.compare(userReq.password, user.hash);
        const accessToken = jwt.sign(userSign, process.env.TOKEN_SECRET, {
            expiresIn: "30000s"
        })
        if(match){
            res.json({accessToken: accessToken});
        } else {
            res.json({message: "Invalid Credentials"});
        }
    } catch(e) {
        console.log(e);
    }
});

// export default userRoutes;
module.exports = router;

