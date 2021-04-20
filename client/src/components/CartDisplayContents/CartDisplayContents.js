import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import CartItem from "../CartItem/CartItem";

// old version before installing use-persisted-state:
//import "../storagetools/LocalStorageArrayTools.js";
import createPersistedState from "use-persisted-state";

import "./CartDisplayContents.css";

const useCartState = createPersistedState("cart");

const CartDisplayContents = () => {
  const { theme } = useContext(ThemeContext);
  //const cartItemsArray = JSON.parse(localStorage.getItem("cartArray"));
  const [cart, setCart] = useCartState({});

  return (
    <div>
      {cart.length > 0 && (
        <div
          className="shoppingList"
          style={{
            background: theme.listBackground,
          }}
        >
          {cart.map((item, i) => (
            <CartItem item={item} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartDisplayContents;

// old version of displaying cart from localStorage,
// before installing use-persisted-state:
/*
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

    */
