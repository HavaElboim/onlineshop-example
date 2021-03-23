import { React, useState, useEffect, useContext } from "react";
import "./ProductInfo.css";
import UserContext from "../../contexts/UserContexts";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import "../../components/storagetools/LocalStorageArrayTools.js";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";

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
  const [editingMode, setEditingMode] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [editProduct, setEditProduct] = useState(false);
  const [notAllFieldsFilled, setFieldsFilled] = useState(false);

  const [salesProductsIds] = useState([1, 3, 5, 6]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSale, setSale] = useState("true");
  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [productURL, setURL] = useState("");
  const [productPrice, setPrice] = useState("");
  const [quantityInStock, setStockQuantity] = useState("");

  console.log("in productinfo, theme is: ", theme.foreground);

  useEffect(() => {
    fetch(`/api/products/${match.params._id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log("descr is ", products, ` /api/products/${match.params._id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProductFn = async (
    title,
    description,
    price,
    category,
    url,
    quantityInStock,
    id
  ) => {
    console.log("in edit product in client");
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
      }),
    });

    const product = await res.json();

    console.log("editing product ", product);

    setEditProduct(false);

    //setProducts(products);
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
    return (
      <div>
        {user.name === "Admin" && (
          <div className="outer-group">
            <button
              id="setEditingButton"
              style={{ background: theme.background, color: theme.foreground }}
              onClick={(e) => {
                setEditProduct(!editProduct);
              }}
            >
              Edit product
            </button>
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
        {!editProduct && <div className="product-title">{products.title}</div>}
        {user.name === "Admin" && editProduct && (
          <div>
            <div>Input name of product:</div>
            <input
              id="productName"
              value={products.title}
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
            <div className="product-info">{products.description}</div>
          )}
          {user.name === "Admin" && editProduct && (
            <div>
              <div>Input description of product:</div>
              <input
                id="productDescription"
                value={products.description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  color: theme.background,
                  background: theme.foreground,
                }}
              />{" "}
            </div>
          )}
          {!editProduct && (
            <div className="product-info">$ {products.price}</div>
          )}
          {user.name === "Admin" && editProduct && (
            <div>
              <div>Input price of new product:</div>
              <input
                id="productPrice"
                value={products.price}
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
        </div>
        {!editProduct && (
          <div className="product-info">{products.category}</div>
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
              value={products.quantityInStock}
              onChange={(e) => setStockQuantity(e.target.value)}
              style={{ color: theme.background, background: theme.foreground }}
            />

            {products.quantityInStock.length === 0 && notAllFieldsFilled && (
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
                  match.params._id
                )
              }
            >
              Update product details
            </button>
            <button
              id="exitEditButton"
              style={{ background: theme.background, color: theme.foreground }}
              onClick={(e) => setEditingMode(false)}
            >
              Cancel product update
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
