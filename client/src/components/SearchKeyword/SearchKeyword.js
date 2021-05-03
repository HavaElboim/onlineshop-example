import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../../contexts/ThemeContexts";
import "./SearchKeyword.css";

const SearchKeyword = (props) => {
  const { searchKeyword, setSearch, products } = props;

  const { theme } = useContext(ThemeContext);

  

  useEffect(() => {
    console.log(
      "In searchkeyword, searching for: ",
      searchKeyword
    );
  }, [searchKeyword]);

  return (
    <div style={{ color: theme.color, background: theme.background , display: "flex", flexDirection: "row", padding: "5px" }}>
      <div>Search for: </div>
      {products.length > 0 && (
        <input
          id="setSearch"
          value={searchKeyword}
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: theme.background, background: theme.foreground }}
          title="examples of words to search: potted, blue, bulb"
        />
      )}
      <button
        id="clearButton"
        onClick={(e) => setSearch("")}
        style={{ color: theme.background, background: theme.foreground }}
        title="examples of words to search: potted, blue, bulb"
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
