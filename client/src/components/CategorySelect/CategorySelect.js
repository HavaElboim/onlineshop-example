import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ListCategories from "../ListCategories/ListCategories";
import ThemeContext from "../../contexts/ThemeContexts";

const CategorySelect = (props) => {
  const {
    selectedCategory,
    setSelectedCategory,
    products,
    setProducts,
  } = props;
  const { theme } = useContext(ThemeContext);

  /* useEffect(() => {
    console.log(
      "In CategorySelect, number of products from props: ",
      products.length
    );
  }, [products]);
*/

  useEffect(() => {
    fetch("/api/products")
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
      });
    console.log("fetched products in CategorySelect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchCategory = async (category) => {
    setSelectedCategory(category);
    fetch(`/api/products?cat=${category}`)
      .then((result) => result.json())
      .then((data) => {
        setProducts(data);
      });
    console.log(`fetched products in Category ${category}`);
  };

  return (
    <div style={{ color: theme.color, background: theme.background }}>
      <div>What do you want to buy?</div>
      {products.length > 0 && (
        <select
          id="selectCat"
          value={selectedCategory}
          onChange={(e) => searchCategory(e.target.value)}
          style={{ color: theme.background, background: theme.foreground }}
        >
          <option value="">All products</option>
          <ListCategories products={products}></ListCategories>
        </select>
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

CategorySelect.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
};

/* add proptypes for products */
export default CategorySelect;
