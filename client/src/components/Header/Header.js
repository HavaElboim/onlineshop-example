import { React, useContext, useState } from "react";
import createPersistedState from "use-persisted-state";
import SaleCountdown from "../SaleCountdown/SaleCountdown";
import PropTypes from "prop-types";
import CategorySelect from "../CategorySelect/CategorySelect";
import SliderFilterPrice from "../SliderFilterPrice/SliderFilterPrice";
import "./Header.css";
import SearchKeyword from "../SearchKeyword/SearchKeyword";
import "../../components/storagetools/LocalStorageArrayTools.js";
import CartIcon from "../CartIcon/CartIcon";
import UserContext from "../../contexts/UserContexts";
const useCartState = createPersistedState("cart");

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

  const { user, toggleUser } = useContext(UserContext);

  const [cart, setCart] = useCartState({});
  const [numInCart, setNumInCart] = useState((cart.length>0? cart.reduce((n, { quantity }) => n + quantity, 0): 0));

  return (
    <div className="headerDiv">
      {user.name === "Guest" && <CartIcon numInCart={numInCart} setNumInCart={setNumInCart}/>}
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
      )}
      {products.length > 0 && (
        <SearchKeyword
          searchKeyword={searchKeyword}
          setSearch={setSearch}
          products={products}
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
