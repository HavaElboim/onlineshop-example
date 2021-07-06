import React, { useEffect } from "react";
import "./ListCategories.css";
//import PropTypes from "prop-types";

/*reduce:
 *
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 *
 * xs = name of array
 * (rv,x) => arrow fn passed to reduce
 * rv = The initialValue, or the previously returned value of the function
 *
 * The reduce() method reduces the array to a single value.
 * The reduce() method executes a provided function for each value of the array (from left-to-right).
 * The return value of the function is stored in an accumulator (result/total).
 * Note: reduce() does not execute the function for array elements without values.
 * Note: This method does not change the original array.
 *
 * Call this function with xs as the list of products and key as "category"
 */

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    rv[x[key]] = true || [];
    return rv;
  }, {});

const ListCategories = (props) => {
  const { products } = props;

  useEffect(() => {
  }, [products]);

 
  return (
    <>
      {Object.keys(groupBy(products, "category")).map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </>
  );
};

/*
ListCategories.propTypes = {

};
*/
export default ListCategories;
