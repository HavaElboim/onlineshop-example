import { createContext } from "react";
import { withRouter } from "react-router";

const sales = {
  endOfYearSale: {
    isSale: "true",
    percentOff: 20,
    dateEnd: "2021-10-25",
    name: "End of Year Sale",
    color: "#002200",
  },
  noSale: {
    isSale: "false",
    percentOff: 0,
    dateEnd: "2015-03-25",
    name: "No special offers",
    color: "#002200",
  },
  summerSale: {
    isSale: "true",
    percentOff: 10,
    dateEnd: "2020-08-31",
    name: "Summer Sale",
    color: "#002200",
  },
};

let currentSale = sales.endOfYearSale;
const SaleContext = createContext(null);
export { sales, currentSale };
export default SaleContext;
