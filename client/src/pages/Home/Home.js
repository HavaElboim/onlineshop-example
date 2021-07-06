import React, { useState, useEffect, useContext } from "react";
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
