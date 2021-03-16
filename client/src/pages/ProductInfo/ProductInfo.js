import { React, useState, useEffect, useContext } from "react";
import "./ProductInfo.css";
import UserContext from "../../contexts/UserContexts";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import "../../components/storagetools/LocalStorageArrayTools.js";

/*
mongodb+srv://test-user1:12345@cluster0.u00wy.mongodb.net/gocodeshop-hava?retryWrites=true&w=majority&tlsInsecure=true
*/

/* mongoDB version on localhost:
useEffect(() => {
    fetch(`http://10.0.0.193:8000/products/${match.params.productid}`)
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(
      "descr is ",
      productData,
      ` from http://10.0.0.193:8000/products/${match.params.productid}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

const ProductInfo = ({ match }) => {
  const [products, setProducts] = useState({});
  const { user, toggleUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [editingMode, setEditingMode] = useState(false);

  console.log("in productinfo, theme is: ", theme.foreground);

  useEffect(() => {
    fetch(`/api/products/${match.params._id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log("descr is ", products, ` /api/products/${match.params._id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProduct = async (title, description, price, category, url) => {
    console.log("in add product in client");
    const res = await fetch(`/api/products/${match.params._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description, price, category, url }),
    });

    const product = await res.json();

    console.log("editing product ", product);

    //setProducts(products);
  };

  // see here for how to add objects to localStorage:
  // https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage/23516713#23516713
  const addToCart = (title, price, image) => {
    localStorage.pushArrayItem(
      "cartArray",
      `title: ${title}, price: ${price}, image: ${image}`
    );
  };

  if (products) {
    return (
      <div>
        <div className="product-title">{products.title}</div>
        {user.name !== "Admin" && (
          <button
            style={{ background: theme.background, color: theme.foreground }}
            id="addToCartButton"
            onClick={(e) => {
              addToCart(products.title, products.price, products.image);
            }}
          >
            Add to cart{" "}
          </button>
        )}
        <div className="product-image">
          <img src={products.image} alt={""} />
        </div>
        <div>
          <div className="product-info">{products.description}</div>
          <div className="product-info">$ {products.price}</div>
        </div>
        <div className="product-info">{products.category}</div>
        <div>color: {theme.foreground}</div>
        {user.name === "Admin" && (
          <button
            id="setEditingButton"
            style={{ background: theme.background, color: theme.foreground }}
            onClick={(e) => {
              setEditingMode(!editingMode);
            }}
          >
            Edit product
          </button>
        )}
        {user.name === "Admin" && editingMode && (
          <button
            id="editProductButton"
            style={{ color: theme.foreground, background: theme.background }}
            onClick={(e) => {
              editProduct(
                products.title,
                products.description,
                products.price,
                products.category,
                products.url
              );
            }}
          >
            Edit product in store
          </button>
        )}
      </div>
    );
  }
};
export default ProductInfo;
