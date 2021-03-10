import React, { useEffect } from "react";
import ProductDisplayClass from "../ProductDisplayClass/ProductDisplayClass";
import "./Products.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Products = (props) => {
  const {
    color,
    secondsLeft,
    salesProductsIds,
    selectedCategory,
    products,
    isSale,
    priceRange,
  } = props;

  /* the line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    stops the warning
    "React Hook useEffect has a missing dependency: ''"
    where it expects to see [products] instead of []
    */
  useEffect(() => {
    console.log("In Products, products are: ", products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // maps the array containing the shop information to set up individual products items
  // and passes via to the ProductsDisplayClass which will starts the sale countdown and which calls the  */

  return (
    <div>
      {products.length > 0 && (
        <div className="product-filter">
          {products.map((product) => (
            <Link
              className="product-card"
              to={`/products/${product.id}`}
              key={product.id}
            >
              <ProductDisplayClass
                color={color}
                secondsLeft={secondsLeft}
                salesProductsIds={salesProductsIds}
                selectedCategory={selectedCategory}
                title={product.title}
                image={product.image}
                price={product.price}
                productid={product.id}
                category={product.category}
                isSale={isSale}
                priceRange={priceRange}
                key={product.id}
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
