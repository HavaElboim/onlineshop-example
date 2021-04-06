import React from "react";
import SaleCountdown from "../SaleCountdown/SaleCountdown";
import PropTypes from "prop-types";
import CategorySelect from "../CategorySelect/CategorySelect";
import SliderFilterPrice from "../SliderFilterPrice/SliderFilterPrice";
import "./Header.css";
import SearchKeyword from "../SearchKeyword/SearchKeyword";
import "../../components/storagetools/LocalStorageArrayTools.js";
import CartIcon from "../CartIcon/CartIcon";

const Header = (props) => {
  const {
    selectedCategory,
    setSelectedCategory,
    secondsLeft,
    setSecondsLeft,
    isSale,
    setSale,
    products,
    setProducts,
    priceRange,
    setPriceRange,
    searchKeyword,
    setSearch,
  } = props;

  //const theme = useContext(ThemeContext);

  return (
    <div>
      <CartIcon />
      <SaleCountdown
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        isSale={isSale}
        setSale={setSale}
      ></SaleCountdown>
      {products.length > 0 && (
        <CategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
          setProducts={setProducts}
        ></CategorySelect>
      )}
      {products.length > 0 && (
        <SearchKeyword
          searchKeyword={searchKeyword}
          setSearch={setSearch}
          products={products}
          setProducts={setProducts}
        ></SearchKeyword>
      )}
      <div className="price-range">
        <SliderFilterPrice
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          products={products}
        ></SliderFilterPrice>
      </div>
    </div>
  );
};

Header.propTypes = {
  secondsLeft: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
};
/* need to add proptypes of products*/

export default Header;

/*      return (
        <div>
          <h1> App</h1>
          <SaleCountdown
            secondsLeft={secondsLeft}
            setSecondsLeft={setSecondsLeft}
            isSale={isSale}
            setSale={setSale}
          ></SaleCountdown>
          {products.length > 0 && (
            <CategorySelect
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              products={products}
            ></CategorySelect>
            <SliderFilterPrice priceRange={priceRange}></SliderFilterPrice}
          )}
        </div>
      );
      */
