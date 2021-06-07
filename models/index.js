const mongoose = require("mongoose");

const User = require("./user");
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


const models = { User, Product};

module.exports = { connectDb, models };
