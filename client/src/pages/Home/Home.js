import React, { useState, useEffect, useContext } from "react";
import DisplayUser from "../../components/DisplayUser/DisplayUser";
import UserContext from "../../contexts/UserContexts";
import SaleContext, { sales } from "../../contexts/SaleContexts";

//components of content:
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";

const Home = () => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isSale, setSale] = useState("true");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchKeyword, setSearch] = useState("");
  const [numProducts, setNumProds] = useState("");
  const { user, toggleUser } = useContext(UserContext);

  // fetching from my server on localhost at 192.168.43.81 on port 8000:
  /*useEffect(() => {
    fetch("http://192.168.43.81:8000/products.json")
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
      });
    console.log("fetched ");
  }, []);
  */
  /* mongoose:
 fetch("http://10.0.0.193:8000/products")
 */

  useEffect(() => {
    fetch("/api/products")
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
      });
    console.log("fetched products in Home");
    setNumProds(products.length);

    // setProducts(products.filter( (price) => {
    //   {if (products.price<=priceRange[1] && products.price>=priceRange[0]) return products.price}
    // }));
    // console.log("%%%%%% In Home, new list of products: ", products);
  // }, products.length, priceRange );
}, products.length );

  return (
    <div>
      <div>Num products in shop: {numProducts}</div>
      {user.name === "Admin" && <div>Click on product to edit it</div>}
      {user.name !== "Admin" && (
        <div>Click on product to see details and order</div>
      )}
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        products={products}
        setProducts={setProducts}
        isSale={isSale}
        setSale={setSale}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        searchKeyword={searchKeyword}
        setSearch={setSearch}
      ></Header>
      <Products
        secondsLeft={secondsLeft}
        selectedCategory={selectedCategory}
        products={products}
        setProducts={setProducts}
        isSale={isSale}
        priceRange={priceRange}
      ></Products>
    </div>
  );
};

export default Home;

/*
 */
