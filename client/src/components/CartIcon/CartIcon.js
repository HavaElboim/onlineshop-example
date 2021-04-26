import { React, useState, useEffect, useReducer } from "react";

// installed custom hook use-persisted-state from https://github.com/donavon/use-persisted-state
// to keep localStorage in state for automatic render update of
// cart values from localStorage
import createPersistedState from "use-persisted-state";

import cartIcon from "../../components/icons/shoppingCart.png";
import "../../components/storagetools/LocalStorageArrayTools.js";
import "./CartIcon.css";
import CartDisplayContents from "../CartDisplayContents/CartDisplayContents";

const useCartState = createPersistedState("cart");

const CartIcon = ({numInCart, setNumInCart}) => {
  const [cart, setCart] = useCartState({});
 // const [numInCart, setNumInCart] = useState(cart.reduce((n, { quantity }) => n + quantity, 0));

 const [ShowCart, setShowCart] = useState(false);
  //let showCart = true;
  console.log("in cartIcon, numincart is: ", numInCart);

  // old version using useState / useReducer / useEffect -
  // cart data doesn't re-render automatically on change
  //const [cartNumItems, setNumItems] = useState(0);
  // const [cartNumItems, setCartNumItems] = useReducer((prev, cur) => {
  //   localStorage.setItem("cartQty", JSON.stringify(cur));
  //   return cur;
  // }, JSON.parse(localStorage.getItem("cartQty")));

  /*  const [cartNumItems, setCartNumItems] = useReducer((prev, cur) => {
    localStorage.getItem("cartQty", JSON.stringify(cur));
    return cur;
    //localStorage.getItem("cartArray", JSON.stringify(cur));
    //return cur.length;
  }, JSON.parse(localStorage.getItem("cartArray")));*/

  // see google on "localstorage dependency in useeffect"
  // useEffect(() => {
  //   setCartNumItems(localStorage.getItem("cartQty"));
  // }, localStorage);

  console.log("show val now is ", ShowCart);

  const showCartFn = () => {
   // showCart = !showCart;
   setShowCart(!ShowCart);
  };

  return (
    <div className="cartWindow">
      <div className="cartContainer hvr-skew-forward">
        <img
          className="cartIcon "
          src={cartIcon}
          alt="Shopping cart icon"
          onClick={(e) => {
            showCartFn();
          }}
        />
        {cart.length > 0 && (
          <div>
            <div className="numCartItemsDisplay">
              {cart.reduce((n, { quantity }) => n + quantity, 0)}
            </div>
          </div>
        )}
      </div>
      {cart.length > 0 && ShowCart && <CartDisplayContents numInCart={numInCart} setNumInCart={setNumInCart}/>}
    </div>
  );
};
export default CartIcon;

/*onClick={(e) => {
            setShowCart(true);
          }}*/
/* onClick={alert} */

// old code to access localstorage, before installing the use-persisted-state
/* <div>
            <div className="numCartItemsDisplay">
              {localStorage.getItem("cartQty")}
            </div>
          </div> */
