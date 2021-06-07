const jwt = require("jsonwebtoken");
const {
  models: { User },
} = require("./models");

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, process.env.TOKEN_SECRET, async (err,user) => {
    if (err) return res.status(403).send("invalid token");
    req.user = await User.findOne({_id:user._id}).exec();
    next(); // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(user) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "30000s",
  });
}

module.exports = { authenticateToken, generateAccessToken };
