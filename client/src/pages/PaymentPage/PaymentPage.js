/*********************************************************/
/*                                                       */ 
/*    Payment page for regular user (Customer) with cart */
/*                                                       */
/*********************************************************/

import { React,  useContext } from "react";
import ThemeContext, { themes } from "../../contexts/ThemeContexts";

const PaymentPage = ({numInCart, setNumInCart}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div >
        </div>
 );
};

export default PaymentPage;