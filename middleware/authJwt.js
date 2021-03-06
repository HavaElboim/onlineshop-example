const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const {User} = require("../models");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token not verified - Access Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      console.log("user status 500, message: ", err);
      return;
    }
    console.log("found user: ", User);
    console.log("looking for user role: ", User.role);
    if(User.role === "admin"){
      next();
      return;
    };
  });
};

const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;