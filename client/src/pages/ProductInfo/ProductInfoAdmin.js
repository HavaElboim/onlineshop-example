/************************************************/
/*                                              */ 
/*    ProductInfo page for Admin user           */
/*                                              */
/************************************************/

import { React, useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import "./ProductInfo.css";
import ThemeContext from "../../contexts/ThemeContexts";
import SaleContext from "../../contexts/SaleContexts";

import "../../components/storagetools/LocalStorageArrayTools.js";
import CategorySelectAdmin from "../../components/CategorySelectAdmin/CategorySelectAdmin";

import saleIcon from "../../components/icons/green-leaf-sale-icon.png";
import LeavesFrame from "../../components/icons/green-leaves-left-frame-1.svg";

const ProductInfoAdmin = ({ match }) => {
  const [products, setProducts] = useState({});

  const { theme } = useContext(ThemeContext);
  const { sale } = useContext(SaleContext);
  
  const [editProduct, setEditProduct] = useState(false);
  const [notAllFieldsFilled] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [onSale, setSale] = useState("false");
  const [saleReductionPercent, setReduction] = useState("");

  const [ setId] = useState("");
  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [productURL, setURL] = useState("");
  const [productPrice, setPrice] = useState("");
  const [quantityInStock, setStockQuantity] = useState("");

  const [stopEditText, setStopEditText] = useState("Exit product update");

  const deleteProductText = "Delete product";

  useEffect(() => {
    fetch(`/api/products/${match.params._id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log("descr is ", products, ` /api/products/${match.params._id}`);
  }, []);


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
    setURL(url); /* I put this back in today 5/7 */
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
    setURL(products.url); /* I put this back in today 5/7 */
  };
  
  if (products) {
    return (
           <div className="outer-group">       
            {editProduct ? 
            
            
            (
              <div>
                <div>
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
              </div>
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
               
               <div className="displayImageOuterBox">
                  <div className="displayImageInnerBox">
                    {products.onSale ? (
                      <div className="saleIconImg">
                        <img  src={saleIcon} alt="on sale"className="product-image" />
                  </div>
                ): (
                  <div className="saleIconImg">
                  <img  src={LeavesFrame} alt="not on sale" className="product-image"/>
                </div>
                )}
                 <img src={products.image} alt={""} className="product-image"/>
                 </div>
              </div>
     
                <div>
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
          </div>
          </div>

        ) : (


          <div>
              <div>
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
                <div className="product-title">{productName || products.title}</div>
            </div>
            <div className="displayImageOuterBox">
              <div className="displayImageInnerBox">
                {products.onSale ? (
                  <div className="saleIconImg">
                    <img  src={saleIcon} alt="on sale"className="product-image" />
                  </div>
                ): (
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
              (products.onSale ? (
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


            ) : (


              <div className="product-info">
                $ {productPrice || products.price}
              </div>
            ))
            <div className="product-info">
            Category: {selectedCategory || products.category}
          </div>
          <div className="product-info">
            Number of product in stock: {products.quantityInStock}{" "}
          </div>
          <div className="product-info">
                {productDescription || products.description}
          </div>
        </div>
      </div>


    )}
    </div>
    );
  }
}
 
  
export default ProductInfoAdmin;

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
