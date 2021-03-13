import React, { useState, useEffect, useContext } from "react";
import Link from "react-router-dom";

//components of content:
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
//import SearchKeyword from "../SearchKeyword/SearchKeyword";
import CategorySelect from "../../components/CategorySelect/CategorySelect";
import ThemeContext from "../../contexts/ThemeContexts";

const Admin = () => {
  const [color] = useState("red");
  const [secondsLeft, setSecondsLeft] = useState(65);
  const [salesProductsIds] = useState([1, 3, 5, 6]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isSale, setSale] = useState("true");
  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [productURL, setURL] = useState("");
  const [productPrice, setPrice] = useState("");

  const [theme] = useContext(ThemeContext);

  console.log("theme", theme);

  useEffect(() => {
    fetch("/api/products")
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
      });
    console.log("fetched ");
  }, []);

  const addProduct = async (title, description, price, category, url) => {
    console.log("in add product in client");
    const res = await fetch("/api/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description, price, category, url }),
    });

    const product = await res.json();

    console.log("adding product ", product);

    setProducts([products, ...products]);
  };

  return (
    <div style={{ background: theme.background }}>
      <div>Input name of new product:</div>
      <input
        id="productName"
        value={productName}
        onChange={(e) => setName(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      <div>Input description of new product:</div>
      <input
        id="productDescription"
        value={productDescription}
        onChange={(e) => setDescription(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      <div>Input image URL of new product:</div>
      <input
        id="productURL"
        value={productURL}
        onChange={(e) => setURL(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      <div>Input price of new product:</div>
      <input
        id="productPrice"
        value={productPrice}
        onChange={(e) => setPrice(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {products.length > 0 && (
        <CategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
          style={{ color: theme.background, background: theme.foreground }}
        ></CategorySelect>
      )}
      <div>selected category of new product: {selectedCategory}</div>
      <button
        id="addProductButton"
        style={{ color: theme.background, background: theme.foreground }}
        onClick={(e) => {
          addProduct(
            productName,
            productDescription,
            productPrice,
            selectedCategory,
            productURL
          );
        }}
      >
        Add new Prod
      </button>
    </div>
  );
};

export default Admin;

/*
 addProduct(
            productName,
            productDescription,
            productPrice,
            selectedCategory,
            productURL
          );
          */
