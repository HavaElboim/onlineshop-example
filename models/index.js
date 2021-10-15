const mongoose = require("mongoose");

const User = require("./user");
const Role = require("./role");
const Product = require("./product");

const connectDb = async () => {
//   const mongoUrl = (process.env.NODE_ENV === "test" && process.env.MONGO_TEST_URL) || process.env.MONGO_URL;
  const mongoUrl = process.env.MONGO_URI;
  console.log("Connecting to mongo server: " + mongoUrl);
  return await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const ROLES = ["user", "testadmin", "admin"];

const models = { User, Product, Role};

module.exports = { connectDb, models };
