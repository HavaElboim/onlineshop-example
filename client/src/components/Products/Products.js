import React, { useEffect, useState } from "react";
import ProductDisplayClass from "../ProductDisplayClass/ProductDisplayClass";
import "./Products.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Products = (props) => {
  const { secondsLeft, selectedCategory, products, isSale, priceRange, searchKeyword } = props;

  const [filteredData, setFilteredData]= useState(products);
  
  console.log(`in products, cat: ${selectedCategory}, search: ${selectedCategory}, price rng: ${priceRange[0]} ${priceRange[1]}`);
  
  useEffect(() => {

    let tempProds1, tempProds2, tempProds3;
    
    tempProds1 = products.filter( (item) => ( item.price <= priceRange[1] && item.price >= priceRange[0]));
    tempProds2 = (selectedCategory != "") ? tempProds1.filter( (item) => ( item.category === selectedCategory)) : tempProds1;
    tempProds3 = (searchKeyword != "") ? tempProds2.filter( (item) => ( item.category.includes(searchKeyword) || item.description.includes(searchKeyword) || item.title.includes(searchKeyword))) : tempProds2;
    setFilteredData(tempProds3);

  console.log("In Products. selected cat: ", selectedCategory, "search keyword", searchKeyword, "filtered shop", filteredData);

  }, [priceRange, selectedCategory, searchKeyword]);

console.log("filtered shop: ", filteredData);

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
