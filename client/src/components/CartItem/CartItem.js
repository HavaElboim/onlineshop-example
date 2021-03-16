import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import "./CartItem.css";
import sale from "../sale.png";

const CartItem = (props) => {
  const { name, image, price, isSale, finalPrice, quantity } = props;

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="cartItemDisplay">
      <div className="itemIcon">{image}</div>
      <div className="itemName">{name}</div>
      <div className="itemPrice">{finalPrice}</div>
      {isSale && <image className="saleIcon" src={sale} alt="sale icon" />}
    </div>
  );
};
export default CartItem;
