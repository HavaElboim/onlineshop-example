import React, { useState, useEffect, useContext } from "react";
import "./Admin.css";

//components of content:
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
//import SearchKeyword from "../SearchKeyword/SearchKeyword";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";
import ThemeContext from "../../contexts/ThemeContexts";

/*****
 * NEED TO ADD NEW FIELDS TO FORM
 * *******
 */

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
  const [quantityInStock, setStockQuantity] = useState("");
  const [notAllFieldsFilled, setFieldsFilled] = useState(false);

  const { theme } = useContext(ThemeContext);

  console.log("theme", theme);

  useEffect(() => {
    fetch("/api/products")
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
      });
    console.log("fetched ");
  }, []);

  const addButtonLabelStyle = {
    display: "block",
  };

  const addProduct = async (
    title,
    description,
    price,
    category,
    image,
    quantityInStock
  ) => {
    console.log("in add product in client");
    // check here if all fields have been filled in:
    if (
      title.length === 0 ||
      description.length === 0 ||
      price.length === 0 ||
      category.length === 0 ||
      image.length === 0 ||
      quantityInStock.length === 0
    ) {
      setFieldsFilled(true);
    } else {
      setFieldsFilled(false);
      // upload new product to server
      const res = await fetch("/api/products", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description,
          price,
          category,
          image,
          quantityInStock,
        }),
      });

      const product = await res.json();

      console.log("adding product ", product);

      setProducts([products, ...products]);

      // clear Add Product form
      setName("");
      setSelectedCategory("");
      setDescription("");
      setURL("");
      setPrice("");
      setStockQuantity("");
    }
  };

  return (
    <div style={{ background: theme.background }}>
      <div>Input name of product:</div>
      <input
        id="productName"
        value={productName}
        onChange={(e) => setName(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productName.length === 0 && notAllFieldsFilled && (
        <label for="productName">Enter name of product</label>
      )}
      <div>Input description of product:</div>
      <input
        id="productDescription"
        value={productDescription}
        onChange={(e) => setDescription(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productDescription.length === 0 && notAllFieldsFilled && (
        <label for="productDescription">Enter description of product</label>
      )}
      <div>Input image URL of product:</div>
      <input
        id="productURL"
        value={productURL}
        onChange={(e) => setURL(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productURL.length === 0 && notAllFieldsFilled && (
        <label for="productURL">Enter url of picture of product</label>
      )}
      {productURL.length !== 0 && (
        <div>
          <img
            className="thumbImg"
            src={productURL}
            alt={{ productName }}
          ></img>
        </div>
      )}
      <div>Input price of new product:</div>
      <input
        id="productPrice"
        value={productPrice}
        onChange={(e) => setPrice(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productPrice.length === 0 && notAllFieldsFilled && (
        <label for="productPrice">Enter price of product</label>
      )}
      {products.length > 0 && (
        <CategorySelectAdmin
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        ></CategorySelectAdmin>
      )}
      <div>Number of product in stock:</div>
      <input
        id="quantityInStock"
        value={quantityInStock}
        onChange={(e) => setStockQuantity(e.target.value)}
        style={{ color: theme.background, background: theme.foreground }}
      />

      {quantityInStock.length === 0 && notAllFieldsFilled && (
        <label for="quantityInStock">How many of product are in stock?</label>
      )}
      <button
        id="addNewProductButton"
        style={{ background: theme.background, color: theme.foreground }}
        onClick={(e) =>
          addProduct(
            productName,
            productDescription,
            productPrice,
            selectedCategory,
            productURL,
            quantityInStock
          )
        }
      >
        Add new product
      </button>
      {notAllFieldsFilled && (
        <label for="addNewProductButton" style={{ display: "block" }}>
          Complete all fields before uploading new product.
        </label>
      )}
    </div>
  );
};

export default Admin;
