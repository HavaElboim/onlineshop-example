import { React, useState, useEffect } from "react";
import "./ProductInfo.css";
import UserContext from "./contexts/UserContexts";

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
  const [productData, setData] = useState({});
  const [user, setUser] = useState(users.guest);

  useEffect(() => {
    fetch(`/api/products/${match.params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log("descr is ", productData, ` /api/products/${match.params.id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProduct = async (title, description, price, category, url) => {
    console.log("in add product in client");
    const res = await fetch(`/api/products/${match.params.id}`, {
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

  if (productData) {
    return (
      <div>
        <div className="product-title">{productData.title}</div>
        <div className="product-image">
          <img src={productData.image} alt={""} />
        </div>
        <div>
          <div className="product-info">{productData.description}</div>
          <div className="product-info">$ {productData.price}</div>
        </div>
        <div className="product-info">{productData.category}</div>
        {user.name === "Admin" && (
          <button
            id="editProductButton"
            style={{ color: theme.background, background: theme.foreground }}
            onClick={(e) => {
              editProduct(
                productData.title,
                productData.description,
                productData.price,
                productData.category,
                productData.url
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
