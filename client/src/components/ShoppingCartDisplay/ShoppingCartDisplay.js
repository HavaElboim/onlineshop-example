import React, { useEffect, Link } from "react";
import CartItem from "../CartItem/CartItem";
import "../../components/storagetools/LocalStorageArrayTools.js";


const ShoppingCartDisplay = () => {
  const shoppingCartItems = localStorage.getItem("shoppingCart");

  return (
    <div>
       {shoppingCartItems.map((cartItem) => (
        <Link
          className="cart-item"
          to={`/shoppingCart/${cartItem.id}`}
          key={cartItem.id}
        >
          <CartItem
            itemName={cartItem.name}
            itemImage={cartItem.image}
            origPrice={cartItem.price}
            sale={cartItem.isSale}
            finalPrice={cartItem.finalPrice}
            quantity={cartItem.quantity}
          ></CartItem>
        </Link>
      ))}
    </div>
  );
};

ShoppingCartDisplay.propTypes = {
  /*  secondsLeft: PropTypes.number,
    color: PropTypes.string,
    price: PropTypes.number,
    selectedCategory: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    salesProductsIds: PropTypes.arrayOf(PropTypes.number),
    category: PropTypes.string,*/
};

export default ShoppingCartDisplay;
