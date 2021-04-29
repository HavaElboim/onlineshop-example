import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import ListCategories from "../ListCategories/ListCategories";
import ThemeContext from "../../contexts/ThemeContexts";

const CategorySelect = (props) => {
  const {
    selectedCategory,
    setSelectedCategory,
    products,
  } = props;
  
  const { theme } = useContext(ThemeContext);

  // useEffect(() => {
  //   if (products.length) {
  //     console.log("prods are ", products);
  //   console.log("IN Category Select. chosen category: ", selectedCategory);
  //   }
  // },[products, selectedCategory]);

  //  function searchCategory (category) {
  //       setSelectedCategory(category);
  //     }
    // }, selectedCategory);


  // const searchCategory = async (category) => {
  //   setSelectedCategory(category);
  //   fetch(`/api/products?cat=${category}`)
  //     .then((result) => result.json())
  //     .then((data) => {
  //       setProducts(data);
  //     });
  //   console.log(`fetched products in Category ${category}`);
  // };

  return (
    <div style={{ color: theme.color, background: theme.background,  display: "flex", flexDirection: "row", padding: "5px" }}>
      <div>Choose category of product:</div>
      {products.length > 0 && (
        <>
        <select
          id="selectCat"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ color: theme.background, background: theme.foreground }}
        >
          <option value="">All products</option>
          <ListCategories products={products}></ListCategories>
        </select>
        </>
      )}
      <button
        onClick={(e) => setSelectedCategory("")}
        style={{ color: theme.background, background: theme.foreground }}
      >
        Clear choice
      </button>
    </div>
  );
};

// CategorySelect.propTypes = {
//   selectedCategory: PropTypes.string,
//   setSelectedCategory: PropTypes.func,
// };

/* add proptypes for products */
export default CategorySelect;
