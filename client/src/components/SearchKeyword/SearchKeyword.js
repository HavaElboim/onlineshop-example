import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../../contexts/ThemeContexts";
import "../Header/Header.css";

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
    <div className="innerSelectionBox" style={{ color: theme.color, background: theme.background}}>
      <div className="innerSelectionElements innerSelectionLabel">I'm looking for (free text): </div>
      {products.length > 0 && (
        <input
        className="innerSelectionElements"
          id="setSearch"
          value={searchKeyword}
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: theme.background, background: theme.foreground }}
          title="examples of words to search: potted, blue, bulb"
        />
      )}
      <button
       className="innerSelectionElements"
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
