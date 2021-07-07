import React, { useState, useEffect } from "react";
import "../CartItem/CartItem.css";
import sale from "../icons/green-leaves-sale.png";

import "../../components/storagetools/LocalStorageArrayTools.js";

// custom hook for updating state from local storage
import createPersistedState from "use-persisted-state";
const useCartState = createPersistedState("cart");


const CartItemPaid = ({ item, numInCart}) => {
  const [products, setProducts] = useState({});
  const [qtyLabel] = useState("");
  const [qty] = useState(item.quantity);

    /*if ShowCart is removed from the next line, the site throws an error.
  If left in, the compiler complains that it is defined but never used - 
  just ignore without deleting it from the code: */
  const [ShowCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${item.productid}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  return (
    <div className="cartItemDisplay">
      <div className="itemIconImage">
        {(item.saleReductionPercent>0) && <img className="saleIcon" src={sale} alt="sale icon" />}
        {(item.saleReductionPercent===0) && <div className="noSaleBox"></div>}
        <img className="itemIcon" src={item.image} alt="showing the item" />
      </div>
      <div className="itemNamePrice">
      <div className="itemName">{item.title}</div>
      {item.saleReductionPercent > 0 && (
        <div style={{ color: "red" }} className="itemPrice">
          sale price: ${(item.price * (100 - item.saleReductionPercent)) / 100}
        </div>
      )}
      {item.saleReductionPercent === 0 && (
        <div className="itemPrice">price: ${item.price} </div>
      )}
      </div>
      <div className="itemQtyBoxContainer">
        <div className="itemQtyBox">
          <div className="itemPrice">quantity: </div>

          <div className="itemQtyNumArrows">
            
            <div id="itemQuantity" className="itemQuantity">
              {qty}
            </div>
            
            
          </div>

          
        </div>

        <label htmlFor="itemQuantity">{qtyLabel}</label>
      </div>
    </div>
  );
};
export default CartItemPaid;
