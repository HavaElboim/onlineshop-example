import React, { useEffect, useState } from "react";
import ProductDisplayClass from "../ProductDisplayClass/ProductDisplayClass";
import "./Products.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Products = (props) => {
  const { secondsLeft, selectedCategory, products, setProducts, isSale, priceRange } = props;

  const [filteredData, setFilteredData]= useState(products);
  
  useEffect(() => {

    setFilteredData(products.filter( (item) => ( item.price <= priceRange[1] && item.price >= priceRange[0])
    ));

  }, priceRange);


  // maps the array containing the shop information to set up individual products items
  // and passes via to the ProductsDisplayClass which will starts the sale countdown and which calls the  */

  return (
    <div>
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
                productid={product._id}
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
