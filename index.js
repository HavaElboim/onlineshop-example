

/* new for login: */

const userRoutes = require('./routes/index'); 
// syntactic sugar for { userRoutes: userRoutes }
// export { userRoutes };
module.exports = userRoutes;


// import the express package, installed earlier using: npm install express
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { authenticateToken, generateAccessToken } = require('jsonwebtoken');
// const generateAccessToken = require('./middleware/jwt');
// routes for user authentication:

require('./routes/auth.routes');
require('./routes/user.routes');
require('./models/index');

const PORT = process.env.PORT || 5000;

// call the express function which returns an express server application
const app = express();
// for login:
const salt = 7; //could be any number



require("dotenv").config();


/* new addition: minimize disclosure of stack details, to make hacking site more difficult:*/
app.disable('x-powered-by');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());


/* new for login: */
/* this tells app to to use this router for any path beginning with “/api”.*/
const apiRouter = express.Router();
app.use('/api', apiRouter);
/* tell our apiRouter to use our userRoutes, for any path beginning with “/users”.: */
apiRouter.use('/users', userRoutes);

const {
  connectDb,
  models: { User, Product},
} = require("./models");

// app.use() to specify middleware as the callback function
// see here: https://expressjs.com/en/guide/routing.html
// and here: https://expressjs.com/en/guide/using-middleware.html :
// "Middleware functions are functions that have access to the request object (req), 
// the response object (res), and the next middleware function in the application’s 
// request-response cycle. The next middleware function is commonly denoted by a variable named next.
// Middleware functions can perform the following tasks:
// - Execute any code.
// - Make changes to the request and the response objects.
// - End the request-response cycle.
// - Call the next middleware function in the stack.
// - If the current middleware function does not end the request-response cycle, 
// it must call next() to pass control to the next middleware function. 
// Otherwise, the request will be left hanging."
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");

  // pass control to the next middleware function,
  // without this, a request to /api/auth/signup in postman is left hanging:
  next();
});



function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


app.post("/api/auth/signup", async (req, res) => {
  
  const { email, password } = req.body;
  console.log("attempting signup for user: ", email, password);
  if (!validateEmail(email)) {
    res.status(403).send("invalid email").end();
    return;
  }

  const existing = await User.findOne({ email }).exec();
  if (existing) {
    res.status(403).send("email already exists").end();
    return;
  }

  console.log("received email and password, hashing");

  const hash = bcrypt.hashSync(password, salt);
  console.log("hash is: ", hash);

  const user = await new User({
    email,
    password: hash,
  }).save();
  console.log("POST!", user);

  try {
    res.json(user);
  } catch (err) {
    console.log("error adding user ", err);
    res.status(400).json({ success: false });
  }
  console.log("POST successful, added user: ", user);

});

app.post("/api/auth/signin", async (req, res) => {

  console.log('attempting login');
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec()
  .catch(err => {
    if (err instanceof HttpError && err.response.status == 404) {
      alert("No such user, please reenter.");
    } else {
      throw err;
    }
  });
  if (!user) {
    res.status(404).send("user does not exist")
    .catch(err => {console.log("failed login, error: ", err)});
    return;
  }
  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    res.status(401).send({
      accessToken: null,
          message: "Invalid Password!"
        });
    return;
  }
  console.log('login - user and pwd are valid');
  // const token = generateAccessToken(user);
  // const userObject = user.toObject();
  // const { password: removed, ...resUser } = userObject;
  // res.send({ resUser, token });

  try {
    res.json(user);
  } catch (err) {
    console.log("error logging in user ", err);
    res.status(400).json({ success: false });
  }
  console.log("POST successful, logged in user: ", user);

});



// Serve static files from the React app
// app.use() to specify middleware as the callback function
// see here: https://expressjs.com/en/guide/routing.html
app.use(express.static(path.join(__dirname, "client/build")));

// add mongoose to communicate with mongoDB
// - see https://mongoosejs.com/docs/index.html
const mongoose = require("mongoose");
// use "useNewUrlParser: true", "mongoose.set('useFindAndModify', false);
// and  mongoose.set('useCreateIndex', true);" to attempt to avoid deprecation warning
// "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
// - see here: https://mongoosejs.com/docs/deprecations.html :
// "To test your app with { useNewUrlParser: true }, you only need to check whether 
// your app successfully connects. Once Mongoose has successfully connected, 
// the URL parser is no longer important. "
// & see also here:
// https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Successfully connected to MongoDB. Initializing admin user if does not exist:");
  initial();
})
.catch( err => {
  console.error("Connection error", err);
  process.exit();
});

/* this function is activated once and creates an admin user if it doesn't yet exist
- using the email and password stored in the .env file */

const initial =  async () => {
  console.log("checking if Admin user exists:");
  const checkAdmin = await User.findOne({ role: 'admin' }).exec();
  if(checkAdmin) console.log("Admin user: ", checkAdmin) 
  else {
    console.log("no admin user exists, creating a new admin user");
    const newAdmin = await new User({
      email: process.env.ADMIN_MAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PWD, salt),
      role: "admin"
    }).save()
    .catch(err => {
      console.log("error creating admin user ", err);
      throw err;
    })
  }
  
}

app.use(cors());



// provide data to be displayed on the / page of the server's website
app.get("/api", (req, res) => {
  res.send("Hello world");
});

// res.json() allows for extra formatting of the JSON data
// - if this is not required res.send() can also be used to return a response object using Express.
app.get("/api/products", async (req, res) => {
  const { cat } = req.query;
  if (cat) {
    console.log(`search for products in category ${cat} `);
    Product.find({})
      .then((products) =>
        res.json(products.filter((product) => product.category.includes(cat)))
      )
      .catch((err) => res.status(404).json({ success: false }));
  } else {
    console.log("Searching for all products");
    Product.find({})
      .then((products) => res.json(products))
      .catch((err) => res.status(404).json({ success: false }));
  }
});


//adding option to serve requests with parameters:
app.get("/api/products/:_id", async (req, res) => {
  console.log("req.params are: ", req.params);
  console.log("Received request for product id: ", req.params._id);

  const { id } = req.params._id; ///here we do destructuring - we take out the params called id from the params array

Product.findById(req.params._id).exec(function (err, product) {
  if (err) {
    console.error("Error retrieving product by id! Error:", err);
  } else {
    console.log("server product = " + JSON.stringify(product));
    res.json(product);
  }
})
});



// post: to add an item to the database
// - must define Schema for documents (records) in the database
app.post("/api/products", async (req, res) => {
  // if have defined slug for each product, search by slug instead of by id:
  // app.get("products/:slug") etc

  // define "Product" as collection,
  // then Mongoose will go to "Products" (with `s` at the end)
  // during app.get later on in the code

  const {
    title,
    description,
    price,
    category,
    image,
    quantityInStock,
    onSale,
    saleReductionPercent,
  } = req.body;

  console.log(
    "adding product: ",
    title,
    description,
    price,
    category,
    image,
    quantityInStock,
    onSale,
    saleReductionPercent
  );

  const product = await new Product({
    title,
    description,
    price,
    category,
    image,
    quantityInStock,
    onSale,
    saleReductionPercent,
  }).save();

  //insertOne is in Mongo but not in Mongoose...
  //Product.insertOne({ title, description, price, category, url }).exec();

  try {
    res.json(product);
    // res.status(status).send(product);
  } catch (err) {
    console.log("error adding product ", err);
    res.status(400).json({ success: false });
  }
  console.log("POST successful, added", product);
});

// put : to change a value of an item in the database
// define the put as an async function
app.put("/api/products/:_id", async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    image,
    quantityInStock,
    onSale,
    saleReductionPercent,
  } = req.body; // pass the new title in the body of the put request
 
  
  console.log("*** request to update product id: ", req.params._id);
  console.log("req.body are: ", req.body);

  // identify the project by the id generated by the server, which has the
  // key _id
  // omitUndefined=true : If true, delete any properties whose value is undefined when casting an update.
  await Product.updateOne(
    { _id: req.params._id },
    {
      title,
      description,
      price,
      category,
      image,
      quantityInStock,
      onSale,
      saleReductionPercent,
    },
    { omitUndefined: true, returnOriginal: false }
  ).exec(function (err, result) {
    if (err) {
      console.error("Error retrieving product by id!");
      res.status(400).json({ success: false });
    } else {
      console.log("OK! updated reduction to ", saleReductionPercent);
      console.log("OK! updated server product = " + JSON.stringify(result));
      //res.json(product);
      res.status(200).send(result);
    }
  });
});



// delete: to delete an item in the db
// has to be async since need to first wait until db finished deleting record
// for async:
// 1. add async before (req, res)
// 2. add .exec() after the deleteOne
// 3. add await before the deleteOne
app.delete("/api/products/:_id", async (req, res) => {
  console.log("id to delete: ", req.params._id);

  /*
  alternative version:

  const productIndex = products.findIndex(
    (product) => product.id === +productId
  );
 */
  await Product.deleteOne({ _id: req.params._id }).exec();

  res.send("ok!");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});



//  listen for any requests that come in on port PORT (8000)

app.listen(PORT, () => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    // we're connected!
  });
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

