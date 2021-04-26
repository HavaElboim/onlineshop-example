import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./ProductInfo.css";
import UserContext from "../../contexts/UserContexts";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import SaleContext, { sales } from "../../contexts/SaleContexts";

import "../../components/storagetools/LocalStorageArrayTools.js";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";
// import saleIcon from "../../components/icons/sale-icon-png-19.png";
import saleIcon from "../../components/icons/saleGreenBig.png";
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
  const { user, toggleUser } = useContext(UserContext);
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
  const [numInCart, setNumInCart] = useState(cart.reduce((n, { quantity }) => n + quantity, 0));

  console.log("!!!!!!!!!!!!!!!!!!!!! In ProductInfo, numInCart is: ", numInCart);
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
    // currentItems is given an empty array if getItem returns null (i.e. if no items have yet been added to cart):
    // old version directly accessing localstorage:
    //let currentItems = JSON.parse(localStorage.getItem("cart") || "[]");

    console.log("adding to cart.................");
    console.log("cart contains ", cart);

    let currentItems = cart.length > 0 ? cart : [];

    // new version using custom hook:

    console.log("current # of cart items: " + currentItems.length);
    console.log("cart contains ", currentItems);
    console.log("first item is currentItems[0] = ", currentItems[0]);
    if (currentItems.length !== 0) {
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
    if (checkItem !== undefined) {
      // check if there is enough in stock
      console.log("products are: ", products);
      // var checkStockItem = products.find (
      //   (checkStockItem) => checkStockItem.productId === id
      // )
      console.log(`there are ${checkItem.quantityInStock} in stock, ${checkItem.quantity} in the cart, and you want to add another ${quantity}`)
      if(checkItem.quantity + quantity <= products.quantityInStock) {
      checkItem.quantity += quantity;
      //id = checkItem.productid;
      console.log("item found in cart, need to update qty of item ", id);}
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
          }
        }
      }
    } 
  
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
    }
    setNumInCart(numInCart+quantity);
    // localStorage.pushArrayItem(
    //   "cartArray",
    //   `title: ${title}, price: ${price}, image: ${image}`
    // );

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
    // new version, using custom hook:
    setCart(currentItems);
    console.log("added to cart qty, cart length:", cart.length);
  }
  };

  // defining the key={numInCart} in the CartIcon component below forces it to
  // rerender if numInCart changes
  if (products) {
    return (
      <div>
        <CartIcon key={numInCart} numInCart={numInCart} setNumInCart={setNumInCart}/>
        {user.name === "Admin" && (
          <div className="outer-group">
            {!editProduct && (
              <button
                id="setEditingButton"
                style={{
                  background: theme.background,
                  color: theme.foreground,
                }}
                onClick={(e) => {
                  setEditProduct(!editProduct);
                  copyProductDetails();
                }}
              >
                Edit/delete product
              </button>
            )}
            {editProduct && (
              <>
                <button
                  id="exitEditButton"
                  style={{
                    background: theme.background,
                    color: theme.foreground,
                  }}
                  onClick={(e) => setEditProduct(false)}
                >
                  {stopEditText}
                </button>
                <Link to={`/products`}>
                  <button
                    id="deleteProductButton"
                    style={{
                      background: theme.background,
                      color: theme.foreground,
                    }}
                    onClick={(e) => deleteProductFn()}
                  >
                    {deleteProductText}
                  </button>
                </Link>
              </>
            )}
          </div>
        )}

        {user.name !== "Admin" && (
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
        )}
        {products.onSale && (
          <div>
            <img className="saleIconImg" src={saleIcon} alt="on sale" />
          </div>
        )}
        {!editProduct && (
          <div className="product-title">{productName || products.title}</div>
        )}
        {user.name === "Admin" && editProduct && (
          <div>
            <div>Input name of product:</div>
            <input
              id="productName"
              value={productName}
              onChange={(e) => setName(e.target.value)}
              style={{ color: theme.background, background: theme.foreground }}
            />
            {productName.length === 0 && notAllFieldsFilled && (
              <label for="productName">Enter name of product</label>
            )}
          </div>
        )}
        <div className="product-image">
          <img src={products.image} alt={""} />
        </div>
        <div>
          {!editProduct && (
            <>
              <div className="product-info">
                {productDescription || products.description}
              </div>
              <div className="product-info">
                {products.quantityInStock} items in stock
              </div>
            </>
          )}
          {user.name === "Admin" && editProduct && (
            <div>
              <div>Input description of product:</div>
              <input
                id="productDescription"
                value={productDescription}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  color: theme.background,
                  background: theme.foreground,
                }}
              />{" "}
            </div>
          )}
          {!editProduct && !products.onSale && (
            <div className="product-info">
              $ {productPrice || products.price}
            </div>
          )}
          {user.name === "Admin" && editProduct && (
            <div>
              <div>Input price of product:</div>
              <input
                id="productPrice"
                value={productPrice}
                onChange={(e) => setPrice(e.target.value)}
                style={{
                  color: theme.background,
                  background: theme.foreground,
                }}
              />
              {products.price.length === 0 && notAllFieldsFilled && (
                <label for="productPrice">Enter price of product</label>
              )}
            </div>
          )}
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
        {!editProduct && (
          <div className="product-info">
            Category: {selectedCategory || products.category}
          </div>
        )}
        {user.name === "Admin" && !editProduct && (
          <div className="product-info">
            Number of product in stock: {products.quantityInStock}{" "}
          </div>
        )}
        {user.name === "Admin" && editProduct && (
          <div>
            {products.length > 0 && (
              <CategorySelectAdmin
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                products={products}
              ></CategorySelectAdmin>
            )}
            <div>Number of product in stock:</div>
            <input
              id="quantityInStock"
              value={quantityInStock}
              onChange={(e) => setStockQuantity(e.target.value)}
              style={{ color: theme.background, background: theme.foreground }}
            />
            <div>Put item on sale:</div>
            <input
              id="setSale"
              type="checkbox"
              value={onSale}
              onChange={(e) => setSale(!onSale)}
              style={{ color: theme.background, background: theme.foreground }}
            />
            {onSale && (
              <div>
                <div>Percentage price reduction: </div>
                <input
                  id="reductionInput"
                  value={saleReductionPercent}
                  onChange={(e) => {
                    setReduction(e.target.value);
                  }}
                  style={{
                    color: theme.background,
                    background: theme.foreground,
                  }}
                ></input>
                <div>{saleReductionPercent}</div>
              </div>
            )}
            {quantityInStock.length === 0 && notAllFieldsFilled && (
              <label for="quantityInStock">
                How many of product are in stock?
              </label>
            )}

            <button
              id="addNewProductButton"
              style={{ background: theme.background, color: theme.foreground }}
              onClick={(e) =>
                editProductFn(
                  productName,
                  productDescription,
                  productPrice,
                  selectedCategory,
                  productURL,
                  quantityInStock,
                  onSale,
                  saleReductionPercent,
                  match.params._id
                )
              }
            >
              Update product details
            </button>

            {notAllFieldsFilled && (
              <label for="addNewProductButton" style={{ display: "block" }}>
                Complete all fields before uploading product update.
              </label>
            )}
          </div>
        )}
      </div>
    );
  }
};
export default ProductInfo;

// {sale.isSale && onSale && (
//   <div>
//     <img src={saleIcon} alt="on sale" />
//   </div>
// )}

/*
<div style={{ color: "red" }}>
                Product on sale! Original price: $ {productPrice} Reduced to ${" "}
                {
                  +(
                    productPrice *
                    ((100 - saleReductionPercent) / 100).toFixed(2)
                  )
                }
              </div>
              */
