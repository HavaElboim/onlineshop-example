import React from "react";
import cartIcon from "../../components/icons/iconfinder_cart_1814095.png";
import "../../components/storagetools/LocalStorageArrayTools.js";
import "./CartIcon.css";

const CartIcon = (props) => {
  const CartItems = localStorage.getItem("cartArray");
  console.log(localStorage.getItem("cartArray"));

  return (
    <div>
      <div class="cartContainer">
        <img className="cartIcon" src={cartIcon} alt="shopping cart icon" />
        <div className="numCartItemsDisplay">
          {localStorage.getItem("cartQty")}
        </div>
      </div>
    </div>
  );
};
export default CartIcon;
