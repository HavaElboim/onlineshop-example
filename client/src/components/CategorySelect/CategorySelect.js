import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ListCategories from "../ListCategories/ListCategories";
import ThemeContext from "../../contexts/ThemeContexts";

const CategorySelect = (props) => {
  const { selectedCategory, setSelectedCategory, products } = props;
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    console.log(
      "In CategorySelect, number of products from props: ",
      products.length
    );
  }, [products]);

  return (
    <div style={{ color: theme.color, background: theme.background }}>
      <div>What do you want to buy?</div>
      {products.length > 0 && (
        <select
          id="selectCat"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
