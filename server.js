// import the express package, installed earlier using: npm install express
const express = require("express");

// call the express function which returns an express server application
const app = express();

const products = [
  {
    id: 1,
    title: "Cactus mix",
    price: 50,
    description: "assortment of 3 potted cactuses",
    category: "cacti",
    image:
      "https://cdn.pixabay.com/photo/2019/04/27/21/56/cactus-4161381_960_720.jpg",
  },
  {
    id: 2,
    title: "white hyacinth",
    price: 15,
    description: "3 white hyacynth bulbs",
    category: "flowering bulbs",
    image:
      "https://cdn.pixabay.com/photo/2019/04/27/21/56/cactus-4161381_960_720.jpg",
  },
  {
    id: 3,
    title: "blue hydrangea",
    price: 50,
    description: "potted hydrangea, blue, 30cm",
    category: "flowering bushes",
    image:
      "https://cdn.pixabay.com/photo/2016/04/22/08/54/flowerpot-1345371_960_720.jpg",
  },
  {
    id: 4,
    title: "miniature sabras",
    price: 25,
    description: "miniature sabras cactus (non-fruiting)",
    category: "cacti",
    image:
      "https://cdn.pixabay.com/photo/2017/12/22/08/27/flowerpot-3033251_960_720.jpg",
  },
  {
    id: 5,
    title: "potted cactus houseplant",
    price: 50,
    description: "miniature hairy cactus in white china pot",
    category: "cacti",
    image:
      "https://cdn.pixabay.com/photo/2018/05/24/14/02/cactus-3426685_960_720.jpg",
  },
  {
    id: 6,
    title: "dotted succulent",
    price: 20,
    description: "spiky dotted succulent aloe",
    category: "succulents",
    image:
      "https://cdn.pixabay.com/photo/2019/02/11/21/20/flower-3990796_960_720.jpg",
  },
  {
    id: 7,
    title: "flowering succulent",
    price: 15,
    description: "succulent with white flowers",
    category: "succulent",
    image:
      "https://cdn.pixabay.com/photo/2017/12/28/15/36/plant-3045473_960_720.jpg",
  },
  {
    id: 8,
    title: "pink cyclamen",
    price: 20,
    description: "pink cyclamen",
    category: "flowering bulbs",
    image:
      "https://cdn.pixabay.com/photo/2018/11/11/09/54/cyclamen-3808413_960_720.jpg",
  },
  {
    id: 9,
    title: "dark pink cyclamen in gift pot",
    price: 50,
    description: "dark pink cyclamen potted in pink designer china pot",
    category: "flowering bulbs",
    image:
      "https://cdn.pixabay.com/photo/2017/11/16/10/48/violet-2954051_960_720.jpg",
  },
  {
    id: 10,
    title: "small cactus",
    price: 10,
    description: "small spiky cactus, flowers in winter",
    category: "cacti",
    image:
      "https://cdn.pixabay.com/photo/2018/11/11/15/53/cactus-3809016_960_720.jpg",
  },
  {
    id: 11,
    title: "white and pink geranium",
    price: 15,
    description:
      "creeping geranium, white and pink striped flowers. Good for ground cover.",
    category: "garden flowers",
    image:
      "https://cdn.pixabay.com/photo/2017/06/14/15/59/flowers-2402554_960_720.jpg",
  },
  {
    id: 12,
    title: "fuscia",
    price: 30,
    description: "pink and purple miniature fuscia",
    category: "garden flowers",
    image:
      "https://cdn.pixabay.com/photo/2018/05/12/18/35/fuchsia-3394249_960_720.jpg",
  },
  {
    id: 13,
    title: "bi-colored succulent",
    price: 25,
    description: "compact succulent with purple center leaf clusters",
    category: "succulents",
    image:
      "https://cdn.pixabay.com/photo/2020/08/01/06/56/plant-5454779_960_720.jpg",
  },
  {
    id: 14,
    title: "large potted cactus",
    price: 30,
    description: "cactus with dense spikes",
    category: "cacti",
    image:
      "https://cdn.pixabay.com/photo/2017/06/27/07/36/cactus-2446526_960_720.jpg",
  },
  {
    id: 15,
    title: "orchid",
    price: 35,
    description: "white and pink dotted orchid",
    category: "houseplants",
    image:
      "https://cdn.pixabay.com/photo/2017/06/21/13/35/orchid-2427237_960_720.jpg",
  },
  {
    id: 16,
    title: "draping succulent",
    price: 25,
    description: "draping succulent with grape-clustered leaves",
    category: "succulents",
    image:
      "https://cdn.pixabay.com/photo/2017/06/22/05/29/succulent-2429646_960_720.jpg",
  },
  {
    id: 17,
    title: "yellow chrysanthemum",
    price: 10,
    description: "small yellow chrysanthemum. Spreads to half a meter",
    category: "garden flowers",
    image:
      "https://cdn.pixabay.com/photo/2013/09/27/17/41/flowers-187374_960_720.jpg",
  },
  {
    id: 18,
    title: "pink and white geranium",
    price: 10,
    description: "hardy geranium, white with pink center",
    category: "garden flowers",
    image:
      "https://cdn.pixabay.com/photo/2020/04/08/20/01/geranium-5018752_960_720.jpg",
  },
  {
    id: 19,
    title: "violet",
    price: 15,
    description: "violet blue ground cover",
    category: "garden flowers",
    image:
      "https://cdn.pixabay.com/photo/2018/09/13/20/31/ringtone-3675688_960_720.jpg",
  },
  {
    id: 20,
    title: "pink hyacinth",
    price: 10,
    description: "bag of 5 hyacinth bulbs, pink",
    category: "flowering bulbs",
    image:
      "https://cdn.pixabay.com/photo/2019/01/05/08/29/hyacinth-3914697_960_720.jpg",
  },
  {
    id: 21,
    title: "pink and white fuscia",
    price: 25,
    description: "pink and white fuscia, enjoys plenfitul sunshine",
    category: "flowering bushes",
    image:
      "https://cdn.pixabay.com/photo/2018/05/13/07/36/fuchsia-3395576_960_720.jpg",
  },
  {
    id: 22,
    title: "margaritte",
    price: 30,
    description: "pink margaritte with yellow centers",
    category: "garden flowers",
    image:
      "https://cdn.pixabay.com/photo/2015/06/29/14/21/margaritte-825617_960_720.jpg",
  },
  {
    id: 23,
    title: "burghundy tiger lilly",
    price: 15,
    description: "special! 3 tiger lillies in one pot, deep burghundy color.",
    category: "houseplants",
    image:
      "https://cdn.pixabay.com/photo/2018/04/15/05/37/red-lillies-3320924_960_720.jpg",
  },
  {
    id: 24,
    title: "compact succulent",
    price: 10,
    description: "compact aloe with red outer leaves",
    category: "succulents",
    image:
      "https://cdn.pixabay.com/photo/2020/08/06/17/52/plant-5468729_960_720.jpg",
  },
  {
    id: 25,
    title: "bougainvillea",
    price: 40,
    description: "pink bougainvillea",
    category: "flowering bushes",
    image:
      "https://cdn.pixabay.com/photo/2018/11/06/14/27/bougainvillea-3798402_960_720.jpg",
  },
];

// serve the 'public' folder which contains the json data:
//app.use(express.static("public"));

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

//var cors = require("cors");
//app.use(cors());

// provide data to be displayed on the / page of the server's website
app.get("/", (req, res) => {
  res.send("Hello world");
});

// provide data to be displayed on the /shuki page of the server's website
app.get("/products", (req, res) => {
  res.send(products);
});

//adding option to serve queries:
// client will access a product containing a keyword using:
// https://localhost:8000?q=keyword
app.get("/products", (req, res) => {
  console.log("received request for product category: ", req.query);
  const { q } = req.query;
  if (q) {
    res.send(
      products.filter(
        (product) => product.category.includes(q) || product.title.includes(q)
      )
    );
  } else {
    res.send(products);
  }
});

//adding option to serve requests with parameters:
// client will access a product with given productid using:
// https://localhost:8000/:idnum
app.get("/products/:id", (req, res) => {
  console.log("received request for product category: ", req.query);
  const { productId } = req.params;
  const product = products.find((product) => product.id === +productId);
  res.send(product ?? {});
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
