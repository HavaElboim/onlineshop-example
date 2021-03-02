// import the express package, installed earlier using: npm install express
const express = require("express");

// call the express function which returns an express server application
const app = express();

// serve the 'public' folder which contains the json data:
app.use(express.static("public"));
// then the products.json will be accessible directly from:
// http://192.168.43.81:8000/products.json

// !! The attempt to fetch data from this server was refused with:
//
// Access to fetch at 'http://localhost:8000/products.json' from origin
// 'http://localhost:3000' has been blocked by CORS policy:
// No 'Access-Control-Allow-Origin' header is present on the requested
// resource. If an opaque response serves your needs, set the request's
// mode to 'no-cors' to fetch the resource with CORS disabled.
//
// Found a solution to the problem here:
// https://www.codegrepper.com/code-examples/javascript/express+cors+allow+all+origins
// and here:
// https://www.codegrepper.com/code-examples/javascript/cors+allow+all+origins+nodejs
//
// installing cors:
// npm install -save cors
//
// & need to add:
// var cors = require('cors')  //use this
// app.use(cors());
//
// but see also here an explanation for why CORS blocks the fetch here:
// https://flaviocopes.com/express-cors/
//
// The fetch is blocked if it comes from a different port than that which the
// server sits on.
// So if npm start accesses localhost on port 3000,
// set the server to serve at port 3000 also.
//
// But then npm start gives the following error:
// Something is already running on port 3000.
// Would you like to run the app on another port instead?

var cors = require("cors");
app.use(cors());

// provide data to be displayed on the / page of the server's website
app.get("/", (req, res) => {
  res.send("Hello world");
});

// provide data to be displayed on the /shuki page of the server's website
app.get("/shuki", (req, res) => {
  res.send("Hello Shuki");
});

// set a port number to be used for the server
const PORT = 8000;

//  listen for any requests that come in on port PORT (8000)
app.listen(PORT, () => {
  //  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

// running ipconfig in terminal to find local IP address:
// gave:
// IPv4 Address. . . . . . . . . . . : 192.168.43.81

// installed express using: npm install express
// and called: npm init
// to create package.json file.

// created json  database of products for shop in: products.json

// run server using: node server.js

// access server's webpage by this address in the browser:
// http://192.168.43.81:8000/
// This shows "Hello world" on the webpage

// see the shuki page here:
// http://192.168.43.81:8000/shuki
