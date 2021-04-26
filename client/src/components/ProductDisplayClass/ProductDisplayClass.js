import React, { useContext } from "react";
import "./ProductDisplayClass.css";
import PropTypes from "prop-types";
//import saleIcon from "../icons/sale.png";
import SaleContext, { sales } from "../../contexts/SaleContexts";
//import ProductInfo from "../../pages/ProductInfo/ProductInfo";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";
import LeftFrame from "../../components/icons/green-leaves-left-frame.svg";

/* this component is called from the Products class.
   It renders individual products cards (product title, image, price).
   If the product is a sale item, its title and sale price are colored until the sale ends 
   */

const ProductDisplayClass = (props) => {
  const {
    secondsLeft,
    selectedCategory,
    title,
    image,
    price,
    productid,
    category,
    onSale,
    saleReductionPercent,
    isSale,
    quantityInStock,
    priceRange,
  } = props;

  const { theme } = useContext(ThemeContext);
  const { sale } = useContext(SaleContext);

  // const newPrice =
  //   onSale && sale.isSale ? ` Sale: $ ${+(price * 0.9).toFixed(2)}` : "";

  const newPrice = onSale
    ? ` Sale: $ ${+((price * (100 - saleReductionPercent)) / 100).toFixed(2)}`
    : "";

  /* renders an individual product card, containing product information and image.
  the information an image are obtained from the props which are passed from the ProductsContainerClass */

  return (
    (!selectedCategory || category === selectedCategory) &&
    price < priceRange[1] &&
    price > priceRange[0] && (
      <div
        className=" hvr-shutter-out-vertical"
        style={{ color: theme.foreground, background: "white" }}
      >
        <img src={LeftFrame} alt="frame of green leaves" className="leavesFrame"/>
        <div className="inner-card">
        <div className="product-info">
          {onSale && <div className="product-banner-sale">SALE</div>}
          {!onSale && <div className="product-banner-nosale"></div>}
          <h6
            style={{
              color: onSale ? theme.salePriceColor : "black",
            }}
          >
            {title}
          </h6>
        </div>
        <div className="product-image">
          <img src={image} alt={""} />
        </div>
        <div className="product-info">
          <h5>$ {price}</h5>
          <h5
            style={{
              color: theme.salePriceColor,
              display: newPrice && secondsLeft ? "block" : "none",
            }}
          >
            {saleReductionPercent}% off! {newPrice}
          </h5>
          <h5>{quantityInStock} in stock</h5>
        </div>
        </div>
      </div>
    )
  );
};

ProductDisplayClass.propTypes = {
  secondsLeft: PropTypes.number,
  color: PropTypes.string,
  price: PropTypes.number,
  selectedCategory: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  salesProductsIds: PropTypes.arrayOf(PropTypes.number),
  category: PropTypes.string,
  quantityInStock: PropTypes.number,
  onSale: PropTypes.bool,
};

export default ProductDisplayClass;

/* version with sale icon:
<div className="product-info">
          {onSale && <img src={saleIcon} alt="sale item"></img>}
          <h6
            style={{
              color: onSale ? theme.salePriceColor : "black",
            }}
          >
            {title}
          </h6>
        </div> */
