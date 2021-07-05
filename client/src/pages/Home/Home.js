import React, { useState, useEffect, useContext } from "react";
import DisplayUser from "../../components/DisplayUser/DisplayUser";
import {UserContext} from "../../contexts/UserContexts";
import SaleContext, { sales } from "../../contexts/SaleContexts";

//components of content:
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";

//user information:
import UserService from "../../services/user.service";

const Home = () => {
  // const [secondsLeft, setSecondsLeft] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isSale, setSale] = useState("true");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [searchKeyword, setSearch] = useState("");
  const [numProducts, setNumProds] = useState("");
  // const { user, toggleUser } = useContext(UserContext);

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

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getCustomerBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

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
}, [products.length] );

  return (
    <div>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        // secondsLeft={secondsLeft}
        // setSecondsLeft={setSecondsLeft}
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
        // secondsLeft={secondsLeft}
        selectedCategory={selectedCategory}
        products={products}
        setProducts={setProducts}
        isSale={isSale}
        priceRange={priceRange}
        searchKeyword={searchKeyword}
      ></Products>
    </div>
  );
};

export default Home;

/*
 */
