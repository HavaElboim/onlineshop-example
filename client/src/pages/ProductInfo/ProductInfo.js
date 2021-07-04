/****************************************************/
/*                                                  */ 
/*    ProductInfo page for regular user (Customer)  */
/*                                                  */
/****************************************************/

import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./ProductInfo.css";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import SaleContext, { sales } from "../../contexts/SaleContexts";

import "../../components/storagetools/LocalStorageArrayTools.js";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";
// import saleIcon from "../../components/icons/sale-icon-png-19.png";
//import saleIcon from "../../components/icons/saleGreenBig.png";
import saleIcon from "../../components/icons/green-leaf-sale-icon.png";
import LeavesFrame from "../../components/icons/green-leaves-left-frame-1.svg";
import CartIcon from "../../components/CartIcon/CartIcon";

// custom hook for updating state from local storage
import createPersistedState from "use-persisted-state";
const useCartState = createPersistedState("cart");
/*
mongodb+srv://test-user1:12345@cluster0.u00wy.mongodb.net/gocodeshop-hava?retryWrites=true&w=majority&tlsInsecure=true
*/

/* mongoDB version on localhost:
useEffect(() => {
    fetch(`http://10.0.0.193:8000/products/${match.params.productid}`)
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(
      "descr is ",
      productData,
      ` from http://10.0.0.193:8000/products/${match.params.productid}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

const ProductInfo = ({ match }) => {
  const [products, setProducts] = useState({});

  const { theme } = useContext(ThemeContext);
  const { sale } = useContext(SaleContext);
  const [quantity, setQuantity] = useState(1);
  const [editProduct, setEditProduct] = useState(false);
  const [notAllFieldsFilled, setFieldsFilled] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [onSale, setSale] = useState("false");
  const [saleReductionPercent, setReduction] = useState("");

  const [productId, setId] = useState("");
  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [productURL, setURL] = useState("");
  const [productPrice, setPrice] = useState("");
  const [quantityInStock, setStockQuantity] = useState("");

  const [stopEditText, setStopEditText] = useState("Exit product update");
  const [quantityWarnText, setQtyWarn] = useState("");

  const deleteProductText = "Delete product";
  console.log("in productinfo, theme is: ", theme.foreground);
  //console.log("sale is", sale.isSale);
  const [cart, setCart] = useCartState({});
  const [numInCart, setNumInCart] = useState(cart.length>0 ? cart.reduce((n, { quantity }) => n + quantity, 0): 0);

  useEffect(() => {
    fetch(`/api/products/${match.params._id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log("descr is ", products, ` /api/products/${match.params._id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const newPrice = +(productPrice * 0.9).toFixed(2);

  const deleteProductFn = async (id) => {
    console.log(`deleting product ${id}`);

    if (window.confirm("Delete this product?")) {
      const res = await fetch(`/api/products/${match.params._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
    }
  };

  const editProductFn = async (
    title,
    description,
    price,
    category,
    url,
    quantityInStock,
    onSale,
    saleReductionPercent,
    id
  ) => {
    console.log("in edit product in client");

    setStockQuantity(quantityInStock);
    setDescription(description);
    setPrice(price);
    setName(title);
    setSelectedCategory(category);
    setSale(onSale);

    setEditProduct(false);
    setStopEditText("Done");
    setReduction(saleReductionPercent);

    const res = await fetch(`/api/products/${match.params._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description,
        price,
        category,
        url,
        quantityInStock,
        onSale,
        saleReductionPercent,
      }),
    });

    const product = await res.json();

    console.log("editing product ", product);
  };

  const copyProductDetails = () => {
    setStockQuantity(products.quantityInStock);
    setDescription(products.description);
    setPrice(products.price);
    setName(products.title);
    setSelectedCategory(products.category);
    setSale(products.onSale);
    setReduction(products.saleReductionPercent);
    setId(match.params._id);
  };

  const selectNumberToBuyAddOrRemoveOne = (qty) => {
    if (quantity + qty < 0) {
      setQtyWarn("");
    } else if (quantity + qty <= products.quantityInStock) {
      setQuantity(quantity + qty);
      setQtyWarn("");
    } else {
      switch (products.quantityInStock) {
        case 0:
          setQtyWarn(`There are no more ${products.title}s in stock`);
          break;
        case 1:
          setQtyWarn(`There is only 1 ${products.title} in stock`);
          break;
        default: {
          setQtyWarn(
            `There are only ${products.quantityInStock} ${products.title}s in stock`
          );
        }
      }
    }
  };

  // see here for how to add objects to localStorage:
  // https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage/23516713#23516713
  // https://stackoverflow.com/questions/62504525/persistence-with-localstorage-with-usestate-and-usecontext-react-hooks
  // https://stackoverflow.com/questions/63925254/useeffect-localstorage-loop
  // https://egghead.io/lessons/react-store-values-in-localstorage-with-the-react-useeffect-hook

  const addToCart = (
    title,
    price,
    image,
    quantity,
    id,
    onSale,
    saleReductionPercent
  ) => {
    setQtyWarn("");

    // if item is not on sale, change price reduction to 0
    if (!onSale) saleReductionPercent = 0;
 
    console.log("adding to cart.................");
    console.log("cart contains ", cart);

    let currentItems = cart.length > 0 ? cart : [];

    // new version using custom hook:

    console.log("current # of cart items: " + currentItems.length);
    console.log("cart contains ", currentItems);
    console.log("first item is currentItems[0] = ", currentItems[0]);

    // If there is already at least one item in the cart:
    //// opened if currentItems.length
    if (currentItems.length !== 0) {
      console.log("there is already at least one item in the cart");
      currentItems.forEach(function (cartItem, index) {
        console.log("currentItems[" + index + "]: " + cartItem.productid  + cartItem.quantity);
      });

      cart.forEach(function (cartItem, index) {
        console.log("cart[" + index + "]: " + cartItem);
      });

      console.log("###### searching for id ", id, "in currentItems ", currentItems);

      // search to see if item already exists in cart
      var checkItem = currentItems.find(
        (checkItem) => checkItem.productid === id
      );
      console.log("checkitme is ", checkItem);

      //// opened if checkItem undefined
      // if checkItem is undefined, this particular item has not yet been added to the cart
    if (checkItem !== undefined) {
      // check if there is enough in stock
      console.log("products are: ", products);
         console.log(`there are ${checkItem.quantityInStock} in stock, ${checkItem.quantity} in the cart, and you want to add another ${quantity}`)
      
      //// opened if checkItem quantity
      // check if there are enough items in stock to add the new quantity:
      if(checkItem.quantity + quantity <= products.quantityInStock) {
        //update the number of items of this item in the cart
      checkItem.quantity += quantity;
      //id = checkItem.productid;
      console.log("item found in cart, need to update qty of item ", id);
      // update the state displaying the total number of items in the cart
      setNumInCart(numInCart+quantity);
      }
      else {
        // warn user that there are not enough items in stock
        switch (checkItem.quantityInStock - checkItem.quantity) {
          case 0:
            setQtyWarn(`There are no more ${products.title}s in stock`);
            break;
          case 1:
            setQtyWarn(`There is only 1 more ${products.title} in stock`);
            break;
          default: {
            setQtyWarn(
              `There are only ${products.quantityInStock} ${products.title}s in stock`
            );
            ///end default case:
          }
          console.log("got to end block 2");
         /// end switch of number of products left in stock, when not enough:
        }
        console.log("got to end block 3");
         //// end of check for enough items in stock:
      }
      console.log("got to end block 4");
      ///// end of situation that this item is already in the cart:
    } 
    //// if this item is not yet in the cart (but the cart is not empty):
  else {
    console.log("item not yet in cart, adding..");
      currentItems.push({
        title: title,
        price: price,
        image: image,
        quantity: quantity,
        productid: id,
        saleReductionPercent,
      });
            // update the state displaying the total number of items in the cart
      setNumInCart(numInCart+quantity);
      //// end of situation that the cart is not empty but this item was not yet in it
    }
    

    /* old version - accessing localstorage directly:
    localStorage.setItem("cartArray", JSON.stringify(currentItems));

    if (localStorage.getItem("cartQty")) {
      localStorage.setItem(
        "cartQty",
        +localStorage.getItem("cartQty") + quantity
      );
      console.log("added to cart qty, total:", localStorage.getItem("cartQty"));
    } else {
      localStorage.setItem("cartQty", quantity);
      console.log(
        "initialized cart qty, total:",
        localStorage.getItem("cartQty")
      );
    }
    */
    // new version, load array of items into cart state using custom hook:
    setCart(currentItems);
    console.log("added to cart qty, cart length:", cart.length);

    //// end of situation that the cart is non-empty
  }
  else {
    // shopping cart was still empty. Add item directly
    console.log("item not yet in cart, adding..");
      currentItems = [{
        title: title,
        price: price,
        image: image,
        quantity: quantity,
        productid: id,
        saleReductionPercent,
      }];
       // update the state displaying the total number of items in the cart
      setNumInCart(numInCart+quantity);
       // load array of items into cart state using custom hook:
    setCart(currentItems);
  }
};

  // defining the key={numInCart} in the CartIcon component below forces it to
  // rerender if numInCart changes
  if (products) {
    return (
      <div>
        <div>
        <CartIcon key={numInCart} numInCart={numInCart} setNumInCart={setNumInCart}/>
        <div className="outer-group">
          <div className="quantity-group">
            <button
                style={{
                  background: theme.background,
                  color: theme.foreground,
                }}
                className="quantityBox quantityButton"
                onClick={() => {
                  selectNumberToBuyAddOrRemoveOne(-1);
                }}
            >
                -
            </button>
            <div className="quantityBox quantity-display">{quantity}</div>
            <button
                style={{
                  background: theme.background,
                  color: theme.foreground,
                }}
                className="quantityBox quantityButton"
                onClick={() => {
                  selectNumberToBuyAddOrRemoveOne(1);
                }}
            >
                +
            </button>
            <button
                className="addToCartButton"
                style={{
                  background: theme.background,
                  color: theme.foreground,
                }}
                id="addToCartButton"
                onClick={(e) => {
                  addToCart(
                    products.title,
                    products.price,
                    products.image,
                    quantity,
                    match.params._id,
                    products.onSale,
                    products.saleReductionPercent
                  );
                }}
            >
                Add to cart{" "}
            </button>
          </div>
          <div style={{ color: "red" }}>{quantityWarnText}</div>
          </div>
    
          <div className="product-title">{productName || products.title}</div>
 
        <div className="displayImageOuterBox">
          <div className="displayImageInnerBox">
        {products.onSale && (
          <div className="saleIconImg">
            <img  src={saleIcon} alt="on sale"className="product-image" />
          </div>
        )}
        {!products.onSale && (
          <div className="saleIconImg">
          <img  src={LeavesFrame} alt="not on sale" className="product-image"/>
        </div>
        )}
          <img src={products.image} alt={""} className="product-image"/>
        </div>
        </div>
        <div>
 
              <div className="product-info">
                {productDescription || products.description}
              </div>
              <div className="product-info">
                {products.quantityInStock} items in stock
              </div>

          {!products.onSale && (
            <div className="product-info">
              $ {productPrice || products.price}
            </div>
          )}

            </div>

          {products.onSale && (
            <div>
              <div className="product-info" style={{ color: "red" }}>
                Product on sale -{" "}
                {saleReductionPercent || products.saleReductionPercent}% off!
                Original price: $ {productPrice || products.price} Reduced to $
                {(
                  ((productPrice || products.price) *
                    (100 -
                      (saleReductionPercent ||
                        products.saleReductionPercent))) /
                  100
                ).toFixed(2)}
            </div>
          </div>
        )}
      </div>
        
      <div className="product-info">
            Category: {selectedCategory || products.category}
      </div>

      <div className="product-info">
            Number of product in stock: {products.quantityInStock}{" "}
      </div>
    </div>
    )
  }
};

export default ProductInfo;


