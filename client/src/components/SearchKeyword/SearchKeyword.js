import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../../contexts/ThemeContexts";

const SearchKeyword = (props) => {
  const { searchKeyword, setSearch, products } = props;

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(
      "In searchkeyword, seargcujbg for: ",
      searchKeyword
    );
  }, [searchKeyword]);

  // const sendSearch = () => {
  //   console.log("starting search for words", searchKeyword);
  //   fetch(`http://10.0.0.193:8000/products?q=${searchKeyword}`)
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  //   console.log(
  //     "descr is ",
  //     products,
  //     ` from http://10.0.0.193:8000/products?q=${searchKeyword}`
  //   );
  // };

  return (
    <div style={{ color: theme.color, background: theme.background , display: "flex", flexDirection: "row", padding: "5px" }}>
      <div>Search for: </div>
      {products.length > 0 && (
        <input
          id="setSearch"
          value={searchKeyword}
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: theme.background, background: theme.foreground }}
        />
      )}
      <button
        id="clearButton"
        onClick={(e) => setSearch("")}
        style={{ color: theme.background, background: theme.foreground }}
      >
        Clear search
      </button>
    </div>
  );
};

SearchKeyword.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
};

/* add proptypes for products */
export default SearchKeyword;


/* <button
        id="searchButton"
        style={{ color: theme.background, background: theme.foreground }}
        value={searchKeyword}
        onClick={(e) => {
          setSearch(e.target.value);
        }}
      >
        Search
      </button> */
