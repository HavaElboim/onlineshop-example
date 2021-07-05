import { React, useContext, useState } from "react";
import { useSelector } from "react-redux";
import createPersistedState from "use-persisted-state";
import SaleCountdown from "../SaleCountdown/SaleCountdown";
import PropTypes from "prop-types";
import CategorySelect from "../CategorySelect/CategorySelect";
import SliderFilterPrice from "../SliderFilterPrice/SliderFilterPrice";
import "./Header.css";
import SearchKeyword from "../SearchKeyword/SearchKeyword";
import "../../components/storagetools/LocalStorageArrayTools.js";
import CartIcon from "../CartIcon/CartIcon";
import {UserContext} from "../../contexts/UserContexts";
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

  const { user: currentUser } = useSelector((state) => state.auth);

  const [cart, setCart] = useCartState({});
  const [numInCart, setNumInCart] = useState((cart.length>0? cart.reduce((n, { quantity }) => n + quantity, 0): 0));

  return (
    <div className="headerDiv">
      {currentUser && !currentUser.roles.includes("ROLE_ADMIN") && <CartIcon numInCart={numInCart} setNumInCart={setNumInCart}/>}
     {/* <SaleCountdown
        secondsLeft={secondsLeft}
        setSecondsLeft={setSecondsLeft}
        isSale={isSale}
        setSale={setSale}
      ></SaleCountdown> */}
      <div className="selectionOptions">
        <div className="selectionOptionsHeader">Can we help you look for something?</div>
      {products.length > 0 && (
        <div className="innerSelectionOptions">
        <CategorySelect
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
        ></CategorySelect>
        </div>
      )}
      {products.length > 0 && (
        <div className="innerSelectionOptions">
        <SearchKeyword
          searchKeyword={searchKeyword}
          setSearch={setSearch}
          products={products}
        ></SearchKeyword>
        </div>
      )}
      <div className="sliderDiv">
        <SliderFilterPrice
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          products={products}
        ></SliderFilterPrice>
      </div>
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

