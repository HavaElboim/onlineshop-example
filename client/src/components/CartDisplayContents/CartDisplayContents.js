import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import CartItem from "../CartItem/CartItem";

// old version before installing use-persisted-state:
//import "../storagetools/LocalStorageArrayTools.js";
import createPersistedState from "use-persisted-state";

import "./CartDisplayContents.css";

const useCartState = createPersistedState("cart");

const CartDisplayContents = ({numInCart, setNumInCart}) => {
  const { theme } = useContext(ThemeContext);
  //const cartItemsArray = JSON.parse(localStorage.getItem("cartArray"));
  const [cart, setCart] = useCartState({});

  return (
    <div>
      {cart.length > 0 && (
        <div
          className="shoppingList"
          style={{
            color: theme.listColor,
          }}
        >
         <div className="shoppingListTitle">In your shopping cart:</div>

          {cart.map((item, i) => (
            <CartItem item={item} key={i} numInCart={numInCart} setNumInCart={setNumInCart}/>
          ))}
         <div><span className="shoppingListTitle">Total:</span> ${cart.reduce((accumulator, current) => accumulator + (current.saleReductionPercent > 0 ? current.quantity*(100-current.saleReductionPercent)*current.price/100 : current.quantity*current.price), 0)}</div>

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
