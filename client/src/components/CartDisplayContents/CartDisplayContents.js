import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import CartItem from "../CartItem/CartItem";
import "../storagetools/LocalStorageArrayTools.js";
import "./CartDisplayContents.css";

const CartDisplayContents = () => {
  const { theme } = useContext(ThemeContext);
  const cartItemsArray = JSON.parse(localStorage.getItem("cartArray"));
  console.log(cartItemsArray);
  return (
    <div>
      {cartItemsArray != null && cartItemsArray.length > 0 && (
        <div
          className="shoppingList"
          style={{
            background: theme.listBackground,
          }}
        >
          {cartItemsArray.map((item, i) => (
            <CartItem item={item} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartDisplayContents;
/*
<div>
      {cartItemsArray.map((item) => (
        <CartItem item={item} />
      ))}
    </div>
    */
