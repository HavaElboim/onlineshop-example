import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./ProductInfo.css";
import UserContext from "../../contexts/UserContexts";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import SaleContext, { sales } from "../../contexts/SaleContexts";

import "../../components/storagetools/LocalStorageArrayTools.js";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";
import saleIcon from "../../components/icons/sale-icon-png-19.png";

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
  const [saleReductionPercent, setReduction] = useState(10);

  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [productURL, setURL] = useState("");
  const [productPrice, setPrice] = useState("");
  const [quantityInStock, setStockQuantity] = useState("");

  const [stopEditText, setStopEditText] = useState("Exit product update");

  const deleteProductText = "Delete product";
  console.log("in productinfo, theme is: ", theme.foreground);
  //console.log("sale is", sale.isSale);

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
  };
  // see here for how to add objects to localStorage:
  // https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage/23516713#23516713
  const addToCart = (title, price, image, quantity) => {
    localStorage.pushArrayItem(
      "cartArray",
      `title: ${title}, price: ${price}, image: ${image}`
    );
  };

  if (products) {
    //copyProductDetails();

    return (
      <div>
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
                className="quantityButton"
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <div className="quantity-display">{quantity}</div>
              <button
                style={{
                  background: theme.background,
                  color: theme.foreground,
                }}
                className="quantityButton"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
              <button
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
                    quantity
                  );
                }}
              >
                Add to cart{" "}
              </button>
            </div>
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
            <div className="product-info">
              {productDescription || products.description}
            </div>
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
          {!editProduct && (
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
              <div style={{ color: "red" }}>
                Product on sale! Original price: $ {productPrice} Reduced to ${" "}
                {
                  +(
                    productPrice *
                    ((100 - saleReductionPercent) / 100).toFixed(2)
                  )
                }
              </div>
              <div>{saleReductionPercent}</div>
              <div>{(100 - saleReductionPercent) / 100}</div>
            </div>
          )}
        </div>
        {!editProduct && (
          <div className="product-info">
            {selectedCategory || products.category}
          </div>
        )}
        {user.name === "Admin" && !editProduct && (
          <div>Number of product in stock: {products.quantityInStock} </div>
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
