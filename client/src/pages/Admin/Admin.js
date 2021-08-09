import React, { useState, useEffect, useContext } from "react";
import {  useSelector } from "react-redux";
import "./Admin.css";

//components of content:
// import Header from "../../components/Header/Header";
// import Products from "../../components/Products/Products";
//import SearchKeyword from "../SearchKeyword/SearchKeyword";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";
import ThemeContext from "../../contexts/ThemeContexts";
import SaleContext, { sales } from "../../contexts/SaleContexts";

// user state information
import UserService from "../../services/user.service";

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
  const [onSale, setSale] = useState(false);
  const [saleReductionPercent, setReduction] = useState(10);
  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [productURL, setURL] = useState("");
  const [productPrice, setPrice] = useState("");
  const [quantityInStock, setStockQuantity] = useState("");
  const [notAllFieldsFilled, setFieldsFilled] = useState(false);
  const [testAdminWarning, setTestWarning] = useState(null);

  const { theme } = useContext(ThemeContext);
  const { sale } = useContext(SaleContext);

  const { user: currentUser } = useSelector((state) => state.auth);

  console.log("theme", theme, "on sale?", onSale);

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
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
    console.log("fetched ");
  }, []);

  

  const addProduct = async (
    title,
    description,
    price,
    category,
    image,
    quantityInStock,
    onSale,
    saleReductionPercent
  ) => {
    if(currentUser.role !== ("admin") ) {
      setTestWarning("Sorry adding new products is allowed for real Admins only, we never know what a visitor might enter in our database!")
      return;
    }
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
          onSale,
          saleReductionPercent,
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
      setSale(false);
      setReduction(10);
    }
  };

  return (
    <div className="add-product">
      
    <div style={{ background: theme.background }}>
    <div className="add-product-title">
        Add New Product
      </div>
         <div className="input-div">
      <div className="input-title">Input name of product:</div>
      <input
        id="productName"
        value={productName}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e)=>{setTestWarning(null)}}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productName.length === 0 && notAllFieldsFilled && (
        <label for="productName">Enter name of product</label>
      )}
      </div>
        <div className="input-div">
      <div className="input-title">Input description of product:</div>
      <input
        id="productDescription"
        value={productDescription}
        onChange={(e) => setDescription(e.target.value)}
        onFocus={(e)=>{setTestWarning(null)}}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productDescription.length === 0 && notAllFieldsFilled && (
        <label for="productDescription">Enter description of product</label>
      )}
      </div>
      <div className="input-div-col">
      <div className="input-div">
      <div className="input-title">Input image URL of product:</div>
      <input
        id="productURL"
        value={productURL}
        onChange={(e) => setURL(e.target.value)}
        onFocus={(e)=>{setTestWarning(null)}}
        style={{ color: theme.background, background: theme.foreground }}
      />
      </div>
      {productURL.length === 0 && notAllFieldsFilled && (
        <label for="productURL">Enter url of picture of product</label>
      )}
      {productURL.length !== 0 && (
        <div className="image-display-div">
        <div className="input-title"></div>
        <div>
          <img
            className="thumbImg"
            src={productURL}
            alt={{ productName }}
          ></img>
        </div>
        </div>
      )}
      </div>
      <div className="input-div">
        <div className="input-title">Input price of new product:</div>
      <input
        id="productPrice"
        value={productPrice}
        onChange={(e) => setPrice(e.target.value)}
        onFocus={(e)=>{setTestWarning(null)}}
        style={{ color: theme.background, background: theme.foreground }}
      />
      {productPrice.length === 0 && notAllFieldsFilled && (
        <label for="productPrice">Enter price of product</label>
      )}
      </div>
      {products.length > 0 && (
        <CategorySelectAdmin
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        ></CategorySelectAdmin>
      )}
      <div className="input-div">
      <div className="input-title">Number of product in stock:</div>
      <input
        id="quantityInStock"
        value={quantityInStock}
        onChange={(e) => setStockQuantity(e.target.value)}
        onFocus={(e)=>{setTestWarning(null)}}
        style={{ color: theme.background, background: theme.foreground }}
      />

      {quantityInStock.length === 0 && notAllFieldsFilled && (
        <label for="quantityInStock">How many of product are in stock?</label>
      )}
      </div>
      <div className="input-div-col">
      <div className="input-div">
      <div className="input-title">Put item on sale:</div>
      <input
        id="setSale"
        type="checkbox"
        value={onSale}
        onChange={(e) => setSale(!onSale)}
        onFocus={(e)=>{setTestWarning(null)}}
        style={{ color: theme.background, background: theme.foreground }}
      />
      </div>
      {onSale && (
        <div className="input-div">
          <div className="input-title">Percentage price reduction: </div>
          <input
            id="reductionInput"
            value={saleReductionPercent}
            onChange={(e) => {
              setReduction(e.target.value);
            }}
            onFocus={(e)=>{setTestWarning(null)}}
            style={{ color: theme.background, background: theme.foreground }}
          ></input>
        </div>
      )}
      </div>

<div className="add-product-button-div">
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
            quantityInStock,
            onSale,
            saleReductionPercent
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

        <label for="addNewProductButton" style={{ display: "block" }}>
          {testAdminWarning}
        </label>
        </div>
    </div>
    </div>
  );
};

export default Admin;