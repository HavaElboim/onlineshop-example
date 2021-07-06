import React, { useContext } from "react";
import { Link } from "react-router-dom";

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
  const [cart] = useCartState({});
  
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
          {/*Use the toFixed() method in JavaScript to format a number with two decimals. */}
         <div className="TotalRow"><span className="shoppingListTitle">Total:</span> ${cart.reduce((accumulator, current) => accumulator + (current.saleReductionPercent > 0 ? current.quantity*(100-current.saleReductionPercent)*current.price/100 : current.quantity*current.price), 0).toFixed(2)}</div>
         <Link to={`/Cart`} className="PaymentLink">I've finished choosing plants!</Link>

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
