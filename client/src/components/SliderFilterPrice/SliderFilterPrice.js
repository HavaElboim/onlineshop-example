import React, { useEffect, useContext, useState } from "react";
// need to install and design: npm install antd
import { Slider, InputNumber } from "antd";
import "antd/dist/antd.css";
import ThemeContext, { currentTheme } from "../../contexts/ThemeContexts";

const SliderFilterPrice = (props) => {
  const { priceRange, setPriceRange, products } = props;
  const { theme } = useContext(ThemeContext);

  

  const formatter = (value) =>{
    return `${value}%`;
  }
  useEffect(() => {
  if (products.length) {
        console.log("prods are ", products);
        let max = 0;
        for (let i = 0; i < products.length; i++) {
          max = products[i].price > max ? products[i].price : max;
          console.log("max: ", max);
        }
        setPriceRange([0, max + 5]);
        console.log("max price is: ", max);
      }
    }, [products, setPriceRange]);

      const storeMaxPrice = priceRange[1]; //use spread to copy over values, 
                                                //otherwise storeMaxPrice changes dynamically when priceRange changes
console.log("storeMaxPrice is:", storeMaxPrice);
  
                                                // useEffect(() => {
  //   if (products.length) {
  //     console.log("prods are ", products);
  //     let max = 0;
  //     for (let i = 0; i < products.length; i++) {
  //       max = products[i].price > max ? products[i].price : max;
  //       console.log("max: ", max);
  //     }
  //     setPriceRange([0, max + 5]);
  //     console.log("max price is: ", max);
  //   }
  // }, [products, setPriceRange]);

  //const [disabled] = useState(false);

  return (
    <>
      <div style={{ color: theme.foreground, background: theme.background }}>
        Select Price range:
      </div>
      <Slider
        range
        min={0}
        max={50}
        value={priceRange}
        onChange={setPriceRange}
      />
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <InputNumber
            min={0}
            style={{ margin: '0 16px' }}
            value={priceRange[0]}
            onChange={setPriceRange}
          />
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
