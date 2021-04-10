import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import "./CartItem.css";
import sale from "../icons/sale.png";

const CartItem = ({ item }) => {
  //const { name, image, price, isSale, finalPrice, quantity } = props;

  const { theme, toggleTheme } = useContext(ThemeContext);
  const isSale = true;
  console.log("cart item: ", item);
  console.log(`cart item: ${item.title}, ${item.price}`);

  return (
    <div className="cartItemDisplay">
      <img className="itemIcon" src={item.image} alt="showing the item" />
      <div className="itemName">{item.title}</div>
      <div className="itemPrice">{item.price} shekel</div>
      <div className="itemQuantity">{item.quantity}</div>
      {isSale && <img className="saleIcon" src={sale} alt="sale icon" />}
    </div>
  );
};
export default CartItem;
