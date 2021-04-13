import React, { useContext, useState, useReducer } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import "./CartItem.css";
import sale from "../icons/saleGreen.png";
import deleteIcon from "../icons/trash.png";
import editIcon from "../icons/editIcon.png";
import upArrow from "../icons/upArrow.png";
import downArrow from "../icons/downArrow.png";
import "../../components/storagetools/LocalStorageArrayTools.js";

const CartItem = ({ item }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [qtyLabe, setQtyLabel] = useState("");

  const isSale = true;
  //console.log("cart item: ", item);
  //console.log(`cart item: ${item.title}, ${item.price}`);

  const removeFromCart = (id) => {
    // currentItems is given an empty array if getItem returns null (i.e. if no items have yet been added to cart):
    let currentItems = JSON.parse(localStorage.getItem("cartArray") || "[]");

    // find index of item in cart array
    const index = currentItems.findIndex(
      (findItem) => findItem.productid === id
    );

    // then use index to take item out of array
    console.log("id of item: ", id);
    const quantityInCart = currentItems[index].quantity;
    console.log("index of item to remove: ", index);
    currentItems = [
      ...currentItems.slice(0, index),
      ...currentItems.slice(index + 1),
    ];

    // localStorage.pushArrayItem(
    //   "cartArray",
    //   `title: ${title}, price: ${price}, image: ${image}`
    // );

    localStorage.setItem("cartArray", JSON.stringify(currentItems));
    let origCartQty = JSON.parse(localStorage.getItem("cartQty"));
    alert("orig qty:", origCartQty);

    origCartQty -= quantityInCart;
    alert("orig qty:", origCartQty);

    localStorage.setItem("cartQty", origCartQty);
  };

  const editItemCartQty = (id, quantityInStock, qty) => {
    // currentItems is given an empty array if getItem returns null (i.e. if no items have yet been added to cart):
    let currentItems = JSON.parse(localStorage.getItem("cartArray") || "[]");

    // find index of item in cart array
    const index = currentItems.findIndex(
      (findItem) => findItem.productid === id
    );

    // then use index to take item out of array
    if (currentItems[index].quantity + qty <= quantityInStock)
      currentItems[index].quantity += qty;

    // localStorage.pushArrayItem(
    //   "cartArray",
    //   `title: ${title}, price: ${price}, image: ${image}`
    // );

    localStorage.setItem("cartArray", JSON.stringify(currentItems));

    // update as well total number of items in cart
    let origCartQty = JSON.parse(localStorage.getItem("cartQty"));
    origCartQty += qty;
    localStorage.setItem("cartQty", origCartQty);
  };

  return (
    <div className="cartItemDisplay">
      <div className="itemIconImage">
        {isSale && <img className="saleIcon" src={sale} alt="sale icon" />}
        <img className="itemIcon" src={item.image} alt="showing the item" />
      </div>
      <div className="itemName">{item.title}</div>
      {item.saleReductionPercent > 0 && (
        <div style={{ color: "red" }} className="itemPrice">
          sale price: ${(item.price * (100 - item.saleReductionPercent)) / 100}
        </div>
      )}
      {item.saleReductionPercent === 0 && (
        <div className="itemPrice">price: ${item.price} </div>
      )}

      <div className="itemQtyBoxContainer">
        <div className="itemQtyBox">
          <div className="itemPrice">quantity: </div>

          <div className="itemQtyNumArrows">
            <img
              className="upDownIcon"
              src={downArrow}
              alt="click here to reduce item quantity"
              onClick={(e) =>
                editItemCartQty(item.productid, item.quantityInStock, -1)
              }
            />
            <div id="itemQuantity" className="itemQuantity">
              {item.quantity}
            </div>
            <img
              className="upDownIcon"
              src={upArrow}
              alt="click here to increase item quantity"
              onClick={(e) =>
                editItemCartQty(item.productid, item.quantityInStock, 1)
              }
            />
          </div>

          <img
            className="deleteIcon"
            src={deleteIcon}
            alt="click here to remove item from cart"
            onClick={(e) => removeFromCart(item.productid)}
          />
        </div>

        <label for="itemQuantity">
          There are only {item.quantityInStock} items in stock
        </label>
      </div>
    </div>
  );
};
export default CartItem;
