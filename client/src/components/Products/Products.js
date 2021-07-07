import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductDisplayClass from "../ProductDisplayClass/ProductDisplayClass";
import "./Products.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Products = (props) => {
  const { secondsLeft, selectedCategory, products, isSale, priceRange, searchKeyword } = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const [filteredData, setFilteredData]= useState(products);
  const [addWarning, setAddWarning] = useState(null);
    
  useEffect(() => {

    let tempProds1, tempProds2;
    
    tempProds1 = products.filter( (item) => ( item.price <= priceRange[1] && item.price >= priceRange[0]));
    tempProds2 = (selectedCategory !== "") ? tempProds1.filter( (item) => ( item.category === selectedCategory)) : tempProds1;
    tempProds1 = (searchKeyword !== "") ? tempProds2.filter( (item) => ( item.category.includes(searchKeyword) || item.description.includes(searchKeyword) || item.title.includes(searchKeyword))) : tempProds2;
    setFilteredData(tempProds1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceRange, selectedCategory, searchKeyword]);

  const addNewProduct =() => {
    if (currentUser.role === ("admin")) {

    }
    else {
      setAddWarning("Public testing of admin user. You have to be a real Admin to add a product (We never know what you might add here!) ")
    }
  }

  // maps the array containing the shop information to set up individual products items
  // and passes via to the ProductsDisplayClass which will starts the sale countdown and which calls the  */

  return (
    <div>
      <div className="instructionRow">
           {currentUser && (currentUser.role === ("admin") || currentUser.role===("testadmin") )? (<div className="user-instructions">Admin user - Click on product to see details or edit it</div>) :
           (<div className="user-instructions">Non-admin user - Click on product to see details and order</div>)}
           {currentUser && ((currentUser.role === ("admin") || currentUser.role===("testadmin") )&& <button className="addItemButton" onClick={(e) => addNewProduct()}>Add new product</button>)}
           <div className="warningStyle">{addWarning}</div>
           </div>
      {filteredData.length > 0 && (
        <div className="product-filter">
          {filteredData.map((product) => (
            <Link
              className="product-card  hvr-shutter-out-vertical"
              to={`/products/${product._id}`}
              key={product._id}
            >
              <ProductDisplayClass
                secondsLeft={secondsLeft}
                selectedCategory={selectedCategory}
                title={product.title}
                image={product.image}
                price={product.price}
                // productid={product._id}
                category={product.category}
                onSale={product.onSale}
                saleReductionPercent={product.saleReductionPercent}
                isSale={isSale}
                quantityInStock={product.quantityInStock}
                priceRange={priceRange}
                key={product._id}
              ></ProductDisplayClass>
            </Link>
          ))}
        </div>
      )}
      {filteredData.length === 0 && (<div className="NoProdsWarning">No products in the shop match your search</div>)}
    </div>
  );
};

Products.propTypes = {
  selectedCategory: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  secondsLeft: PropTypes.number,
  salesProductsIds: PropTypes.arrayOf(PropTypes.number),
};

/* need propTypes for products and setProducts */

export default Products;
