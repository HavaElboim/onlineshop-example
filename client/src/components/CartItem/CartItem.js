import React, { useContext, useState, useEffect } from "react";
import ThemeContext from "../../contexts/ThemeContexts";
import "./CartItem.css";
import sale from "../icons/green-leaves-sale.svg";
import deleteIcon from "../icons/trash.png";
import editIcon from "../icons/editIcon.png";
import upArrow from "../icons/upArrow.png";
import downArrow from "../icons/downArrow.png";
import "../../components/storagetools/LocalStorageArrayTools.js";

// custom hook for updating state from local storage
import createPersistedState from "use-persisted-state";
const useCartState = createPersistedState("cart");

const CartItem = ({ item, numInCart, setNumInCart, quantityWarnText = "", setQtyWarn }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [products, setProducts] = useState({});
  const [qtyLabel, setQtyLabel] = useState("");
  const [qty, setQty] = useState(item.quantity);
  const [cart, setCart] = useCartState({});
  //const {currentItems, setCurrentItems} = useState(cart.length > 0 ? cart : []);

  const isSale = true;
  //console.log("cart item: ", item);
  //console.log(`cart item: ${item.title}, ${item.price}`);
console.log("in cartItem, numincart is: ", numInCart);
  console.log("item is ", item);
  useEffect(() => {
    fetch(`/api/products/${item.productid}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromCart = (id) => {
    // currentItems is given an empty array if getItem returns null (i.e. if no items have yet been added to cart):
    // old version accessing localstorage directly
    //let currentItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // new version using custom hook to access localstorage
   let currentItems = cart.length > 0 ? cart : [];

    // find index of item in cart array
    if(currentItems.length > 0)  {
    const index = currentItems.findIndex(
      (findItem) => findItem.productid === id
    );

    // then use index to take item out of array
    console.log("id of item: ", id);
    //const quantityInCart = currentItems[index].quantity;
    console.log("index of item to remove: ", index);
    currentItems = [
      ...currentItems.slice(0, index),
      ...currentItems.slice(index + 1),
    ];
    // setCurrentItems([
    //   ...currentItems.slice(0, index),
    //   ...currentItems.slice(index + 1),
    // ]);

    // localStorage.pushArrayItem(
    //   "cartArray",
    //   `title: ${title}, price: ${price}, image: ${image}`
    // );

    // old version - accessing localstorage directly:
    // localStorage.setItem("cart", JSON.stringify(currentItems));
    // let origCartQty = JSON.parse(localStorage.getItem("cartQty"));
    // alert("orig qty:", origCartQty);

    // origCartQty -= quantityInCart;
    // alert("orig qty:", origCartQty);

    // localStorage.setItem("cartQty", origCartQty);

    // new version, using custom hook:
    setCart(currentItems);
    setNumInCart(numInCart-1)
    setQty(0);
    if(quantityWarnText!=="")setQtyWarn("");
  
  }
  };

  const editItemCartQty = (id, qty) => {
    // currentItems is given an empty array if getItem returns null (i.e. if no items have yet been added to cart):
    //let currentItems = JSON.parse(localStorage.getItem("cartArray") || "[]");
   let currentItems = cart.length > 0 ? cart : [];
    // let tempCartItem={};
    if (currentItems.length > 0){
    // let tempCartItems = currentItems;
    // console.log("cartitem curritemsL ", currentItems);
    // find index of item in cart array
    const index = currentItems.findIndex(
      (findItem) => findItem.productid === id
    );
    // const index = tempCartItems.findIndex(
    //   (findItem) => findItem.productid === id
    // );
    //alert("currentItems are: ", currentItems);
    if(quantityWarnText!=="")setQtyWarn("");

    console.log("item to change: ", index, "from id ", id);

    console.log("qty prev in cart ", currentItems[index].quantity);
    console.log("from API: ", products);
    // then use index to take item out of array
    if (currentItems[index].quantity + qty <= products.quantityInStock) {
      // tempCartItem = currentItems[index];
      // tempCartItem.quantity += qty;
      // setCurrentItems([
      //   ...currentItems.slice(0, index),
      //   tempCartItem,
      //   ...currentItems.slice(index + 1),
      // ]);
      currentItems[index].quantity += qty;
      console.log(`numInCart: ${numInCart} adding qty: ${qty}, num in stock: ${products.quantityInStock}`);

      setQtyLabel("");
     setNumInCart(numInCart+qty);
    } else {
      console.log("not enough in stock");
      console.log(`numInCart: ${numInCart} wanting to add qty: ${qty}, num in stock: ${products.quantityInStock}`);

      setQtyLabel(`There are only ${products.quantityInStock} items in stock`);
    }
    console.log(
      "num in stock: ",
      products.quantityInStock,
      " num wanted b4",
      currentItems[index].quantity,
      " more: ",
      qty
    );
    console.log("qty now in cart ", currentItems[index].quantity);
    // localStorage.pushArrayItem(
    //   "cartArray",
    //   `title: ${title}, price: ${price}, image: ${image}`
    // );

    // old way to update cart - directly via localstorage

    // localStorage.setItem("cartArray", JSON.stringify(currentItems));

    // // update as well total number of items in cart
    // let origCartQty = JSON.parse(localStorage.getItem("cartQty"));
    // origCartQty += qty;
    // localStorage.setItem("cartQty", origCartQty);

    // if reduce quantity to 0, remove item from cart:
    if (currentItems[index].quantity === 0)
      removeFromCart(currentItems[index].productid);
    else {
      // update cart with new quantity of item
      console.log("cartitem curritems ", currentItems);
      // new way to update localstorage - via custom hook :
      setCart(currentItems);
      setQty(currentItems[index].quantity);
    }
  }
  };

  return (
    <div className="cartItemDisplay">
      <div className="itemIconImage">
        {(item.saleReductionPercent>0) && <img className="saleIcon" src={sale} alt="sale icon" />}
        {(item.saleReductionPercent==0) && <div className="noSaleBox"></div>}
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
            <img
              className="upDownIcon"
              src={downArrow}
              alt="click here to reduce item quantity"
              onClick={(e) => editItemCartQty(item.productid, -1)}
            />
            <div id="itemQuantity" className="itemQuantity">
              {qty}
            </div>
            <img
              className="upDownIcon"
              src={upArrow}
              alt="click here to increase item quantity"
              onClick={(e) => editItemCartQty(item.productid, 1)}
            />
            <img
            className="deleteIcon"
            src={deleteIcon}
            alt="click here to remove item from cart"
            onClick={(e) => removeFromCart(item.productid)}
          />
          </div>

          
        </div>

        <label htmlFor="itemQuantity">{qtyLabel}</label>
      </div>
    </div>
  );
};
export default CartItem;
