// import the express package, installed earlier using: npm install express
const express = require("express");

// call the express function which returns an express server application
const app = express();

// serve the 'public' folder which contains the json data:
app.use(express.static("public"));

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
  console.log(`server listening on port ${PORT}`);
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
