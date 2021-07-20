import React, { useEffect, useContext} from "react";
 
import { Slider, InputNumber } from "antd";
import "antd/dist/antd.css";

import "../Header/Header.css";
import ThemeContext from "../../contexts/ThemeContexts";
 import "./SliderFilterPrice.css";

const SliderFilterPrice = (props) => {
  const { priceRange, setPriceRange, products } = props;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
  if (products.length) {
        let max = 0;
        for (let i = 0; i < products.length; i++) {
          max = products[i].price > max ? products[i].price : max;
        }
        setPriceRange([0, max + 5]);
      }
    }, [products, setPriceRange]);

      const storeMaxPrice = priceRange[1]; //use spread to copy over values, 
                                                //otherwise storeMaxPrice changes dynamically when priceRange changes

  return (
    <>
      <div style={{ color: theme.foreground, background: theme.background }}>
        I'd like something in the price range:
      </div>
      <Slider
        range
        min={0}
        max={50}
        value={priceRange}
        onChange={setPriceRange}
        trackStyle={{backgroundColor:'red'}}
      />
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <InputNumber
            min={0}
            style={{ margin: '0 16px' }}
            value={priceRange[0]}
            onChange={setPriceRange}
          />
             <button
        id="clearButton"
        onClick={(e) => setPriceRange([1,50])}
        title="examples of words to search: potted, blue, bulb"
      >
        Clear price filter
      </button>
          <InputNumber
            max={storeMaxPrice}
            style={{ margin: '0 16px' }}
            value={priceRange[1]}
            onChange={setPriceRange}
          />
          </div>
    </>
  );
};

export default SliderFilterPrice;

/*
 /* {
    Object.keys(groupBy(products, "price")).map((price) => price);
  }*/

// useEffect(() => {
/* setPriceRange(() => [
      0,
      Math.max(
        ...products.map(
          (product) => product.price.map((o) => o.y).map((o) => o.y),
          0
        )
      ),
    ]);*/
//products.map((product) => product.price.map((o) => console.log(o)));
/*console.log(
      "max: ",
      Math.max(...products.map((product) => product.price), 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
 // }, []);
  // const maxValueOfY = Math.max(...arrayToSearchIn.map(o => o.y), 0);
*/
